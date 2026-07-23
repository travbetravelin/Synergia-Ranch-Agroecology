"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/conferences", label: "Conferences" },
  { href: "/workshops", label: "Workshops" },
  { href: "/volunteering", label: "Volunteering" },
  { href: "/blog", label: "Blog" },
];

export function OrgNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: "var(--water-dark)" }} className="sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Synergia Ranch Agroecology"
            width={120}
            height={32}
            style={{ filter: "brightness(0) invert(1)", height: "32px", width: "auto" }}
          />
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  pathname === href || (href !== "/" && pathname.startsWith(href))
                    ? "bg-white/20 text-white font-medium"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ backgroundColor: "var(--water-dark)" }} className="lg:hidden border-t border-white/10 px-4 pb-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm ${
                pathname === href || (href !== "/" && pathname.startsWith(href))
                  ? "text-white font-medium"
                  : "text-white/75"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
