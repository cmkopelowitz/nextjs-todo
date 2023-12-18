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
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Sidebar: React.FC<{ items: SidebarItem[] }> = ({ items }) => {
  const pathname = usePathname();
  console.log(pathname)
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-white text-black"><svg
          className="block h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg></Button>
      </SheetTrigger>
      <SheetContent className="p-0 w-48" side='left'>
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
