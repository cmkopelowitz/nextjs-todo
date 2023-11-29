"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Signout() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center">
      <Link href="/" className="text-4xl font-bold">
        Next To-do
      </Link>
      <Card className='mt-5 w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Sign Out</CardTitle>
          <CardDescription>Are you sure you want to sign out?</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Button type="button" onClick={() => router.back()} variant="outline">
            Cancel
          </Button>
          <Button type="button" onClick={() => signOut({ callbackUrl: "/" })}>
            Sign out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
