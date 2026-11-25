import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const schema = z.object({
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  organization: z.string().trim().max(200).optional().default(""),
  existing_customer: z.string().max(10).optional().default("no"),
  topic: z.enum(["sales", "partner", "ehr", "nursing", "support"]).default("sales"),
  message: z.string().trim().min(5).max(5000),
  website: z.string().max(0).optional(), // honeypot
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  const { website: _hp, ...lead } = parsed.data;
  void _hp;
  const { error } = await createAdminClient().from("contact_leads").insert(lead);
  if (error) {
    console.error("contact insert failed", error.code);
    return NextResponse.json({ error: "We could not save your message. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
