import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accommodations — Synergia 2026",
};

export default function AccommodationsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 style={{ color: "var(--water-dark)" }} className="text-4xl font-bold mb-2">
        Accommodations
      </h1>
      <p className="opacity-60 mb-10">Where to stay during Synergia 2026</p>

      {/* On-site */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">On-Site at Synergia Ranch</h2>
        <div
          style={{ backgroundColor: "var(--sand)" }}
          className="rounded-xl p-6 text-sm leading-relaxed"
        >
          <p className="opacity-70 mb-3">
            We are pleased to share that on-site camping is fully included in your registration!
            Camping takes place in a beautiful, scenic setting on the ranch, and we highly encourage
            participants to embrace this option. We may also have glamping options available as
            details are finalized.
          </p>
          <p className="opacity-70 mb-3">
            For those looking for indoor lodging, we have a very limited number of rooms available
            which utilize shared common shower facilities. Please note that indoor rooms are not
            included in the standard registration. If you would like to inquire about renting a
            room, please write directly to{" "}
            <a href="mailto:starrlight@ecotechnics.edu" style={{ color: "var(--water)" }} className="underline underline-offset-2 hover:opacity-70">
              starrlight@ecotechnics.edu
            </a>.
          </p>
          <p className="opacity-70">
            Full details on room types, pricing, and potential glamping upgrades will be shared as
            they are confirmed.
          </p>
        </div>
      </section>

      {/* Off-site */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Commuting to the event</h2>
        <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6 text-sm">
          <p className="opacity-70">
            While camping is included in the registration you may commute to the event if you so
            desire. There are hotels and various Booking.com or AirBnB rentals within a 30 min
            drive radius.
          </p>
        </div>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Planning Tips</h2>
        <ul className="space-y-3 text-sm">
          {[
            "Book accommodations early — July is peak travel season in the region.",
            "If you plan to stay on-site, reach out to confirm availability before making arrangements.",
            "Carpooling is encouraged — see the Getting There page for shuttle and carpool info.",
            "Meals are provided at the conference for all registered attendees.",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2 opacity-70">
              <span style={{ color: "var(--clay)" }} className="mt-0.5 shrink-0">→</span>
              {tip}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
