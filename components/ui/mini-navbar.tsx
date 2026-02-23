"use client";

import React, { useState } from "react";
import { MAIN_HEADER_CONTAINER } from "@/lib/utils";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-sm text-white/90 hover:text-white transition-colors duration-200"
  >
    {children}
  </a>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinksData = [
    { label: "Discover", href: "#discover" },
    { label: "Integrations", href: "#integrations" },
    { label: "Features", href: "#features" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-black backdrop-blur-sm">
      <div className={`flex h-14 w-full items-center justify-between gap-4 ${MAIN_HEADER_CONTAINER}`}>
        {/* Слева — название */}
        <a href="/" className="flex shrink-0 items-center gap-2">
          <span className="font-heading text-lg font-semibold text-white sm:text-xl">Flex</span>
          <span className="font-sans text-sm text-white/80 sm:text-base">by net2phone</span>
        </a>

        {/* Справа — ссылки и кнопка */}
        <nav className="hidden items-center gap-6 sm:flex">
          {navLinksData.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
          <a
            href="#agent-start"
            className="ml-2 shrink-0 rounded-[10px] bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
          >
            Start for free
          </a>
        </nav>

        {/* Мобильное меню */}
        <div className="flex items-center gap-2 sm:hidden">
          <a
            href="#agent-start"
            className="rounded-[10px] bg-white px-3 py-1.5 text-xs font-medium text-black"
          >
            Start for free
          </a>
          <button
            className="flex h-8 w-8 items-center justify-center text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Выпадающее меню на мобильных */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-black transition-all duration-300 sm:hidden ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {navLinksData.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-2 text-white/90 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
