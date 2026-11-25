import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <div className="relative hidden overflow-hidden bg-olive-deep text-white lg:block">
        <div className="blob-a absolute -left-[10%] -top-[20%] h-[80%] w-[80%] rounded-full bg-olive opacity-80 blur-[100px]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_90px,rgba(0,0,0,0.07)_90px_170px)]" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link href="/"><Logo className="text-white" /></Link>
          <h2 className="display display-md max-w-md">The AI engine for clinical documentation and revenue intelligence.</h2>
        </div>
      </div>
      <div className="flex flex-col justify-center px-6 py-12 sm:px-16">
        <Link href="/" className="mb-10 lg:hidden"><Logo /></Link>
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
