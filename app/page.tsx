import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/tasks/myday");
    }

    return (
        <main className="min-h-screen container flex flex-col mx-auto py-8 px-4">
            <Link href="/api/auth/signin" className="block ml-auto max-w-max">
                Sign In
            </Link>
            <div className="flex flex-col justify-center items-center flex-grow">
                <h1 className="text-4xl font-bold">Next Todo</h1>
                <p className="text-xl mt-4">
                    Your next step to getting organized
                </p>
                <Link
                    href="/api/auth/signin"
                    className="bg-blue-500 text-white py-4 font-medium px-5 rounded block max-w-max mt-8">
                    Get Started
                </Link>
            </div>
        </main>
    );
}
