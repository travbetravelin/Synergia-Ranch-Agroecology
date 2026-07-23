"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/conferences/2026-water", label: "Home" },
  { href: "/conferences/2026-water/schedule", label: "Schedule" },
  { href: "/conferences/2026-water/speakers", label: "Speakers" },
  { href: "/conferences/2026-water/registration", label: "Registration" },
  { href: "/conferences/2026-water/accommodations", label: "Accommodations" },
  { href: "/conferences/2026-water/venue", label: "Venue" },
  { href: "/conferences/2026-water/getting-there", label: "Getting There" },
  { href: "/conferences/2026-water/activities", label: "Activities" },
  { href: "/conferences/2026-water/faq", label: "FAQ" },
];

export function ConferenceNav() {
  const pathname = usePathname();

  return (
    <div style={{ backgroundColor: "var(--sand)", borderBottom: "1px solid rgba(0,0,0,0.08)" }} className="sticky top-16 z-40">
      <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
        <ul className="flex items-center gap-1 py-2 min-w-max">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`px-3 py-1.5 rounded text-sm transition-colors whitespace-nowrap ${
                  pathname === href
                    ? "font-medium"
                    : "opacity-60 hover:opacity-100"
                }`}
                style={pathname === href ? { color: "var(--water-dark)", backgroundColor: "rgba(0,0,0,0.06)" } : { color: "var(--water-dark)" }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
