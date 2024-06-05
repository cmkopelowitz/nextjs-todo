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
    <Link
      className={`flex gap-4 px-6 py-3 ${
        isActive ? "bg-blue-100 border-l-4 border-blue-500" : ""
      }`}
      href={path}
      aria-current={isActive ? "page" : undefined}
    >
      {icon}
      <div>{label}</div>
      {resultsCount > 0 && <div className="ml-auto">{resultsCount}</div>}
    </Link>
  );
};

export default NavigationLink;
