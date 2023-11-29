import { Metadata } from "next";
import Link from "next/link";
import { UserAuthForm } from "./form";

export const metadata: Metadata = {
  title: "Signup | Next To-do",
  description: "Create an account",
};

export default function SignupPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        
          <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
    </>
  );
}
