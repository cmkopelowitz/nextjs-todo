"use client";
import React, { useState } from "react";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { HomeIcon, StarIcon, SunIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function NavigationPanel() {
    const pathname = usePathname();
    const [show, setShow] = useState(false);
    return (
        <div>
            {!show && (
                <button
                    className="hidden sm:block ml-6 mt-9"
                    onClick={() => setShow(true)}>
                    <AlignJustify />

                    <span className="sr-only">Open</span>
                </button>
            )}
            {show && (
                <div className="border h-screen w-80 md:w-96 hidden sm:block">
                    <button
                        className="mx-6 mt-9"
                        onClick={() => setShow(false)}>
                        <AlignJustify />
                        <span className="sr-only">Close</span>
                    </button>
                    <Link
                        className={`flex gap-4 px-6 py-3 ${
                            pathname === "/tasks/myday"
                                ? "bg-blue-100 border-l-4 border-blue-500"
                                : ""
                        }`}
                        href="/tasks/myday">
                        <SunIcon className="h-6 w-6 inline" />
                        <div>My Day</div>
                    </Link>
                    <Link
                        className={`flex gap-4 px-6 py-3 ${
                            pathname === "/tasks/important"
                                ? "bg-blue-100 border-l-4 border-blue-500"
                                : ""
                        }`}
                        href="/tasks/important">
                        <StarIcon className="h-6 w-6 inline" />
                        <div>Important</div>
                    </Link>
                    <Link
                        className={`flex gap-4 px-6 py-3 ${
                            pathname === "/tasks/inbox"
                                ? "bg-blue-100 border-l-4 border-blue-500"
                                : ""
                        }`}
                        href="/tasks/inbox">
                        <HomeIcon className="h-6 w-6 inline" />
                        <div>All tasks</div>
                    </Link>
                </div>
            )}
        </div>
    );
}
