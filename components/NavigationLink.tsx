import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationLinkProps {
  resultsCount?: number;
  path: string;
  label: string;
  icon: React.ReactNode;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  resultsCount = 0,
  path,
  label,
  icon,
}) => {
  const pathname = usePathname();
  const isActive = pathname === path;
  return (
    <Link href={path} className="relative">
      {isActive && (
        <div className="block absolute left-0 w-0.5 bg-blue-500 top-0 bottom-0 animate-expand" />
      )}
      <div
        className={`flex gap-4 px-6 py-3 ${
          isActive ? "bg-blue-50" : "hover:bg-gray-100"
        }`}
      >
        {icon}
        <div className={isActive ? "font-semibold" : ""}>{label}</div>
        {resultsCount > 0 && <div className="ml-auto">{resultsCount}</div>}
      </div>
    </Link>
  );
};

export default NavigationLink;
