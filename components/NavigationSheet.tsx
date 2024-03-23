"use client";
import React from "react";
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { SheetClose } from "./ui/sheet";
import Link from "next/link";
import { HomeIcon, StarIcon, SunIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function NavigationSheet() {
    const pathname = usePathname();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="sm:hidden mt-9 ml-6 h-min">
                    <AlignJustify />
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:hidden">
                <SheetClose asChild>
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
                </SheetClose>
                <SheetClose asChild>
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
                </SheetClose>
                <SheetClose asChild>
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
                </SheetClose>
            </SheetContent>
        </Sheet>
    );
}
