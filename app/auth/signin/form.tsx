"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import googleImage from "@/public/google.svg";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  return (
    <>
      <a
        className="flex flex-row gap-x-1 border rounded py-4 px-2 max-w-max"
        onClick={() => signIn("google", {callbackUrl})}
        role="button"
      >
        <Image src={googleImage} alt="google" width={18} height={18} />
        Continue with Google
      </a>
    </>
  );
};
