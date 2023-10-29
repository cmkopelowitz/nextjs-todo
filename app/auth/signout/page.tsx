"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signout() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center">
      <div className="sm:border flex flex-col p-4 w-full max-w-lg">
        <Link href="/" className="text-xl">
          Next Todo
        </Link>
        <h1 className="text-2xl font-bold mt-1">Sign Out</h1>
        <p className="mt-2">Are you sure you want to sign out?</p>
        <div className="flex flex-col sm:flex-row justify-center mt-4 gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="max-w-max border p-1"
          >
            No, go back
          </button>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="max-w-max border p-1"
          >
            Yes, sign out
          </button>
        </div>
      </div>
    </div>
  );
}
