import Link from "next/link";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--charcoal)", color: "var(--sand)" }} className="mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="font-semibold text-white mb-1">Synergia Ranch Agroecology</p>
          <p className="opacity-70">26 Synergia Rd</p>
          <p className="opacity-70">Santa Fe, NM 87508</p>
          <p className="opacity-70 mt-1">
            <a href="https://synergiaranch.com/" className="hover:text-white transition-colors">synergiaranch.com</a>
          </p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Quick Links</p>
          <ul className="space-y-1 opacity-70">
            {[
              { label: "About", href: "/about" },
              { label: "Conferences", href: "/conferences" },
              { label: "Workshops", href: "/workshops" },
              { label: "Volunteering", href: "/volunteering" },
              { label: "Blog", href: "/blog" },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Get Involved</p>
          <p className="opacity-70 leading-relaxed">[Contact or involvement info to be added.]</p>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs opacity-40 py-4">
        © 2026 Synergia Ranch Agroecology. All rights reserved.
      </div>
    </footer>
  );
}
