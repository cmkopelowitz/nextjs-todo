import Link from "next/link";
import { LoginForm } from "./form";

export default async function Signin() {
  return (
    <div className="max-w-xl w-full mx-auto items-center justify-center gap-y-5 text-center min-h-screen flex flex-col">
      
        <Link href='/' className="text-4xl">Next Todo</Link>
        <h1 className="text-2xl font-medium">Sign in</h1>
        <LoginForm />
      
    </div>
  );
}
