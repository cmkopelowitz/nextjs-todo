"use client";
import React from "react";
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";
import NavigationLink from "./NavigationLink";
import { SheetClose } from "./ui/sheet";
import { usePathname } from "next/navigation";
import {
  WeatherSunny20Regular,
  LineHorizontal320Regular,
  Star20Regular,
  Home20Regular,
} from "@fluentui/react-icons";

export default function NavigationSheet() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button type="button" className="sm:hidden mt-9 ml-6 h-min">
          <span className="sr-only">Open Navigation</span>
          <LineHorizontal320Regular />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:hidden">
        <SheetClose asChild>
          <NavigationLink
            label="My Day"
            icon={<WeatherSunny20Regular />}
            path="/tasks/myday"
          />
        </SheetClose>
        <SheetClose asChild>
          <NavigationLink
            label="Important"
            icon={<Star20Regular />}
            path="/tasks/important"
          />
        </SheetClose>
        <SheetClose asChild>
          <NavigationLink
            label="Tasks"
            icon={<Home20Regular />}
            path="/tasks/inbox"
          />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
