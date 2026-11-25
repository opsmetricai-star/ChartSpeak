import Link from "next/link";
import type { Metadata } from "next";
import { AuthForm } from "../AuthForm";
import { login } from "../actions";

export const metadata: Metadata = { title: "Log in" };

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  return (
    <>
      <h1 className="display display-sm mb-8">Log in</h1>
      {error && <p className="mb-5 text-[15px] font-semibold text-red-700">That link is invalid or has expired. Please try again.</p>}
      <AuthForm
        action={login}
        hidden={{ next: next ?? "" }}
        submit="Log in"
        fields={[
          { name: "email", label: "Email", type: "email", autoComplete: "email" },
          { name: "password", label: "Password", type: "password", autoComplete: "current-password" },
        ]}
      />
      <div className="mt-6 flex justify-between text-[14px]">
        <Link href="/forgot-password" className="underline underline-offset-4">Forgot password?</Link>
        <Link href="/signup" className="underline underline-offset-4">Create account</Link>
      </div>
    </>
  );
}
