'use client'
import { SidebarItem } from "@/app/types/SidebarItem"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Bars3Icon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext } from "react"

export const Sidebar: React.FC<{ items: SidebarItem[] }> = ({ items }) => {
  const pathname = usePathname();
  
  return (
    <Sheet open={JSON.parse(localStorage.getItem('tasks-ui')||'').sidebarVisible} >
      <SheetTrigger asChild onClick={() => localStorage.setItem('tasks-ui',JSON.stringify({sidebarVisible: true}))}>
        <Button className="bg-white hover:bg-white text-black">
          <Bars3Icon className="w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 w-72" side='left'>
        <nav>
          {items.map((item: SidebarItem,i: number) => (
            <Link className={`flex gap-4 px-6 py-3 ${pathname === item.href ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`} href={item.href} key={i}><div>{item.icon}</div>
              <div>{item.label}</div></Link>

          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
