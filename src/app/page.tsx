import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white" style={{ minHeight: "520px" }}>
        <Image
          src="/images/ranch-aerial.jpg"
          alt="Aerial view of Synergia Ranch"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,45,60,0.65)" }} />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-28">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
            Synergia Ranch Agroecology
          </h1>
          <p className="text-lg md:text-xl font-light mb-10 drop-shadow opacity-80 max-w-2xl">
            Regenerative land stewardship, ecological research, and community practice at Synergia Ranch, Santa Fe, NM.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              style={{ backgroundColor: "var(--clay)" }}
              className="px-8 py-3 rounded font-semibold text-white hover:opacity-90 transition-opacity shadow-lg"
            >
              About Us
            </Link>
            <Link
              href="/conferences"
              className="px-8 py-3 rounded font-semibold text-white border border-white/50 hover:bg-white/15 transition-colors"
            >
              Conferences
            </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ backgroundColor: "var(--sand)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: "var(--water-dark)" }} className="text-2xl font-bold mb-4">
            Our Mission
          </h2>
          <p className="text-base leading-relaxed opacity-80">
            [Mission statement copy to be added.]
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ color: "var(--water-dark)" }} className="text-2xl font-bold mb-8 text-center">
            What We Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm">
            {[
              { href: "/conferences", label: "Conferences", description: "Annual gatherings on regenerative land and water stewardship." },
              { href: "/workshops", label: "Workshops", description: "Hands-on skill-building in agroecology and land restoration." },
              { href: "/volunteering", label: "Volunteering", description: "Join us on the land at Synergia Ranch." },
              { href: "/blog", label: "Blog", description: "Research, reflections, and field reports from the ranch." },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white rounded-xl p-6 shadow-sm border border-black/5 hover:shadow-md transition-shadow"
              >
                <p className="font-semibold mb-2" style={{ color: "var(--water-dark)" }}>{item.label}</p>
                <p className="opacity-60 leading-relaxed">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Conference */}
      <section style={{ backgroundColor: "var(--sand)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest opacity-50 mb-2">Upcoming Event</p>
          <h2 style={{ color: "var(--water-dark)" }} className="text-2xl font-bold mb-2">
            Water | Wind | Wisdom
          </h2>
          <p className="opacity-60 mb-6">July 17–19, 2026 · Synergia Ranch · Santa Fe, NM</p>
          <Link
            href="/conferences/2026-water"
            style={{ backgroundColor: "var(--clay)" }}
            className="inline-block px-8 py-3 rounded font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{ backgroundColor: "var(--clay)" }}
        className="py-14 px-4 text-center text-white"
      >
        <h2 className="text-2xl font-bold mb-3">Get Involved</h2>
        <p className="opacity-80 mb-6 max-w-lg mx-auto">
          [Call to action copy to be added.]
        </p>
        <Link
          href="/volunteering"
          className="inline-block bg-white font-semibold px-8 py-3 rounded hover:opacity-90 transition-opacity"
          style={{ color: "var(--clay)" }}
        >
          Volunteer
        </Link>
      </section>
    </div>
  );
}
