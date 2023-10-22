"use client";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ReactNode } from "react";

export default function ExpandingSection({
  buttonText,
  children,
  className,
}: {
  buttonText: string;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className={"font-bold flex flex-row items-center gap-x-1 " + className}>
            {buttonText}
            <ChevronDownIcon className={`h-5 w-5 ${open ? "rotate-180 transform" : ""}`} />
          </Disclosure.Button>
          <Disclosure.Panel>{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
