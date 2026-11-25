import Link from "next/link";
import type { Metadata } from "next";
import { AuthForm } from "../AuthForm";
import { forgotPassword } from "../actions";

export const metadata: Metadata = { title: "Reset password" };

export default function Page() {
  return (
    <>
      <h1 className="display display-sm mb-8">Reset your password</h1>
      <AuthForm action={forgotPassword} submit="Send reset link" fields={[{ name: "email", label: "Email", type: "email", autoComplete: "email" }]} />
      <p className="mt-6 text-[14px]"><Link href="/login" className="underline underline-offset-4">Back to log in</Link></p>
    </>
  );
}
