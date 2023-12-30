"use client"
import { Sidebar } from "@/components/Sidebar";
import { Providers } from "./Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (<Providers>
    <Sidebar />
    {children}
  </Providers>)
}
