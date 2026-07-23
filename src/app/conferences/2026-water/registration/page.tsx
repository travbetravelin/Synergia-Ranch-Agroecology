import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration — Synergia 2026",
};

export default function RegistrationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 style={{ color: "var(--water-dark)" }} className="text-4xl font-bold mb-2">
        Registration
      </h1>
      <p className="opacity-60 mb-10">July 17–19, 2026 · Synergia Ranch</p>

      {/* Pricing card */}
      <div
        className="rounded-2xl overflow-hidden shadow-md border border-black/5 mb-10"
      >
        <div style={{ backgroundColor: "var(--water-dark)" }} className="px-8 py-6 text-white">
          <p className="text-sm uppercase tracking-widest opacity-70 mb-1">Conference Pass</p>
          <h2 className="text-3xl font-bold">General Admission</h2>
        </div>
        <div className="bg-white px-8 py-6">
          <p className="text-4xl font-bold mb-1" style={{ color: "var(--clay)" }}>
            TBD
          </p>
          <p className="text-sm opacity-50 mb-6">Pricing to be announced. Check back soon.</p>
          <ul className="space-y-2 text-sm mb-8">
            {[
              "Full three-day conference access",
              "All keynotes, panels, and breakout sessions",
              "Meals included (breakfast, lunch, dinner daily)",
              "Evening programming and performances",
              "Practical field workshops",
              "Access to ranch grounds and facilities",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span style={{ color: "var(--sage)" }} className="mt-0.5">✓</span>
                <span className="opacity-70">{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="https://crucescreatives.org/event-6623482?CalendarViewType=1&SelectedDate=7/25/2026"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "var(--clay)" }}
            className="block text-center text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Register Now
          </a>
        </div>
      </div>

      {/* Notes */}
      <div
        style={{ backgroundColor: "var(--sand)" }}
        className="rounded-xl p-6 text-sm space-y-2"
      >
        <h3 className="font-semibold mb-3">Important Notes</h3>
        <p className="opacity-70">
          <strong>Accommodations:</strong> On-site accommodation may be available — see the{" "}
          <a href="/accommodations" style={{ color: "var(--water)" }} className="underline">
            Accommodations page
          </a>{" "}
          for details. Off-site lodging options are also listed there.
        </p>
        <p className="opacity-70">
          <strong>Capacity:</strong> Space at Synergia Ranch is limited. We encourage early registration.
        </p>
        <p className="opacity-70">
          <strong>Questions?</strong> Reach out to the organizing team for dietary needs, accessibility
          requirements, or other inquiries.
        </p>
      </div>
    </div>
  );
}
