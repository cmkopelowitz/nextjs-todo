"use client"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Bars3Icon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, StarIcon, SunIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react"

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false)
  
  return (
    <Sheet open={open} onOpenChange={setOpen} >
      <SheetTrigger asChild onClick={() => setOpen(true)}>
        <Button className="bg-white hover:bg-white text-black">
          <Bars3Icon className="w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 w-72" side='left'>
        <nav>
            <Link className={`flex gap-4 px-6 py-3 ${pathname === '/tasks' ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`} href='/tasks'><div><SunIcon className="h-6 w-6 inline" /></div>
              <div>My Day</div></Link>
            <Link className={`flex gap-4 px-6 py-3 ${pathname === '/important' ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`} href='/important'><div><StarIcon className="h-6 w-6 inline" /></div>
              <div>Important</div></Link>
            <Link className={`flex gap-4 px-6 py-3 ${pathname === '/all' ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`} href='/all'><div><HomeIcon className="h-6 w-6 inline" /></div>
              <div>All Tasks</div></Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}