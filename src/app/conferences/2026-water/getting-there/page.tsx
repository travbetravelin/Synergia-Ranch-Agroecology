import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Getting There — Synergia 2026",
};

export default function GettingTherePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 style={{ color: "var(--water-dark)" }} className="text-4xl font-bold mb-2">
        Getting There
      </h1>
      <p className="opacity-60 mb-10">Directions, travel options & parking</p>

      {/* Map link */}
      <div
        style={{ backgroundColor: "var(--sand)" }}
        className="rounded-xl p-6 mb-8 flex items-start gap-4"
      >
        <div className="text-2xl">📍</div>
        <div>
          <p className="font-semibold mb-1">Synergia Ranch</p>
          <p className="text-sm opacity-70 mb-3">26 Synergia Rd, Santa Fe, NM 87508</p>
          <a
            href="https://maps.app.goo.gl/ZmR5vg25fjRade64A"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--water)" }}
            className="text-sm font-medium underline underline-offset-2 hover:opacity-70"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>

      {/* Site map */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Ranch Map</h2>
        <div className="relative w-full rounded-xl overflow-hidden shadow-md border border-black/5" style={{ aspectRatio: "4/3" }}>
          <Image
            src="/images/sitemap.png"
            alt="Synergia Ranch site map"
            fill
            className="object-contain bg-white"
          />
        </div>
      </section>

      {/* Travel sections */}
      <div className="space-y-8 text-sm">
        <section>
          <h2 className="text-lg font-semibold mb-3">By Air</h2>
          <p className="opacity-70 leading-relaxed">
            The nearest major airport is <strong>Albuquerque International Sunport (ABQ)</strong>,
            approximately 60 miles from the ranch (about 1 hour by car). <strong>Santa Fe Regional
            Airport (SAF)</strong> is closer but serves limited routes. Most attendees will fly
            into ABQ.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">By Car</h2>
          <p className="opacity-70 leading-relaxed">
            Driving is the most practical option for most attendees. Detailed driving directions
            will be provided upon registration confirmation. Parking is available on-site at the
            ranch.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Shuttle & Carpooling</h2>
          <div
            style={{ backgroundColor: "var(--sand)" }}
            className="rounded-xl p-5"
          >
            <p className="opacity-70 leading-relaxed">
              We encourage carpooling to minimize travel impact. A shared ride coordination
              board will be available for registered attendees.
            </p>
            <p className="opacity-50 italic mt-2">
              Shuttle information will be posted here if arranged. Check back closer to the event.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Arrival</h2>
          <p className="opacity-70 leading-relaxed">
            Arrivals begin on <strong>Thursday, July 16</strong>. Hosts will be on-site to welcome
            guests and provide an orientation tour of the ranch. Dinner is at 7:00 pm.
          </p>
          <p className="opacity-70 leading-relaxed mt-2">
            <strong>Departure:</strong> Monday, July 20 — rooms must be cleared by 8:00 am.
            A light early breakfast buffet will be available from 7:30 am.
          </p>
        </section>
      </div>
    </div>
  );
}
