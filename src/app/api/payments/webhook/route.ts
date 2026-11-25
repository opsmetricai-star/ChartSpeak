import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

// Trusted payment confirmation endpoint.
// Call it from an automation/webhook relay with header `x-webhook-secret: $PAYMENT_WEBHOOK_SECRET`.
// A redirect back from checkout NEVER activates a plan. Only this endpoint or an admin does.
// NOTE: Selar's native webhook payload/signature format must be mapped to this body before going live.

const body = z.object({
  email: z.string().email(),
  plan: z.enum(["starter", "professional", "practice"]),
  amount: z.number().nonnegative().optional(),
  reference: z.string().min(3).max(200),
});

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export async function POST(req: Request) {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  const given = req.headers.get("x-webhook-secret") ?? "";
  if (!secret || !safeEqual(given, secret)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const raw = await req.json().catch(() => null);
  const parsed = body.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const { data, error } = await createAdminClient().rpc("apply_payment", {
    p_email: parsed.data.email,
    p_plan: parsed.data.plan,
    p_amount: parsed.data.amount ?? null,
    p_ref: parsed.data.reference,
    p_raw: raw,
  });
  if (error) return NextResponse.json({ error: "Could not record payment" }, { status: 500 });
  return NextResponse.json({ result: data });
}
