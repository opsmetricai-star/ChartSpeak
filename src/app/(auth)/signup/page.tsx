import Link from "next/link";
import type { Metadata } from "next";
import { AuthForm } from "../AuthForm";
import { signup } from "../actions";

export const metadata: Metadata = { title: "Start free trial" };

export default function Page() {
  return (
    <>
      <h1 className="display display-sm mb-2">Start your free trial</h1>
      <p className="mb-8 text-[16px] text-ink/70">Includes 5 note generations. No card required.</p>
      <AuthForm
        action={signup}
        submit="Create account"
        fields={[
          { name: "full_name", label: "Full name", autoComplete: "name" },
          { name: "email", label: "Work email", type: "email", autoComplete: "email" },
          { name: "password", label: "Password (8+ characters)", type: "password", autoComplete: "new-password" },
        ]}
      />
      <p className="mt-6 text-[14px]">
        Already have an account? <Link href="/login" className="underline underline-offset-4">Log in</Link>
      </p>
      <p className="mt-6 text-[12.5px] leading-snug text-ink/60">
        Use only de-identified or synthetic patient data until the required healthcare agreements are in place. See the <Link href="/trust" className="underline">Trust Center</Link>.
      </p>
    </>
  );
}
