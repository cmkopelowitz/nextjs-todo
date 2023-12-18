"use client"
import { Sidebar } from "@/components/Sidebar";
import { Providers } from "./Providers";
import { HomeIcon, StarIcon, SunIcon } from "@heroicons/react/20/solid";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (<Providers>
    <Sidebar items={[
      {
        label: 'My Day',
        icon: <SunIcon className="h-6 w-6 inline" />,
        href: '/tasks'
      },
      {
        label: 'Important',
        icon: <StarIcon className="h-6 w-6 inline" />,
        href: '/important'
      },
      {
        label: 'All Tasks',
        icon: <HomeIcon className="h-6 w-6 inline" />,
        href: '/all'
      },
    ]} />
    {children}
  </Providers>)
}
