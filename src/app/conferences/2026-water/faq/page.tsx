import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "FAQ — Synergia 2026",
};

const REGISTRATION_URL =
  "https://crucescreatives.org/event-6623482?CalendarViewType=1&SelectedDate=7/25/2026";
const TEAM_EMAIL = "starrlight@ecotechnics.edu";

function Reg({ children }: { children: string }) {
  return (
    <a
      href={REGISTRATION_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "var(--water)" }}
      className="underline underline-offset-2 hover:opacity-70"
    >
      {children}
    </a>
  );
}

function Team() {
  return (
    <a
      href={`mailto:${TEAM_EMAIL}`}
      style={{ color: "var(--water)" }}
      className="underline underline-offset-2 hover:opacity-70"
    >
      organizing team
    </a>
  );
}

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "What is included in the registration fee?",
    a: (
      <>
        <Reg>Registration</Reg> includes full access to all conference sessions, keynotes, breakouts, and evening programming, as well as all meals (breakfast, lunch, and dinner) for each day of the conference.
      </>
    ),
  },
  {
    q: "Is on-site accommodation available?",
    a: (
      <>
        Synergia Ranch has limited on-site accommodation including camping. Availability is not guaranteed. Please contact the <Team /> to inquire. See the Accommodations page for more information.
      </>
    ),
  },
  {
    q: "What should I pack?",
    a: "The ranch is in the Sonoran Desert at elevation. July temperatures can be hot during the day and cool at night. We recommend light, sun-protective clothing for daytime activities, a warm layer for evenings, sturdy walking shoes for field work and walks, and sun protection (hat, sunscreen). Please bring a water bottle to have with you.",
  },
  {
    q: "Are there dietary accommodations?",
    a: (
      <>
        Please indicate any dietary needs or restrictions during <Reg>registration</Reg>. We will do our best to accommodate and will have meat and vegetarian options. We will serve gluten free breads in addition to the other breads. Contact the <Team /> with specific requirements. Be aware that allergens are present in our kitchen and we may not have very specialized meals (our food will have onions in it for example).
      </>
    ),
  },
  {
    q: "Is the venue accessible?",
    a: (
      <>
        We are working to ensure accessibility across the ranch for all participants. Please reach out to the <Team /> with specific accessibility needs so we can make arrangements.
      </>
    ),
  },
  {
    q: "What is the refund policy?",
    a: (
      <>
        Refund policy details will be provided with <Reg>registration</Reg>. Contact the <Team /> with questions.
      </>
    ),
  },
  {
    q: "Can I attend just part of the conference?",
    a: (
      <>
        The full conference <Reg>registration</Reg> gives access to all meals starting with dinner on the Thursday 16th, and ending with an early breakfast on Monday 20th. You will be able to participate in all events. It is also possible to purchase day passes which include lunch and dinner and the programs start at 9:00 am. It is possible to purchase half day passes which include dinner. See the <Reg>registration page</Reg> for prices and options. Contact the <Team /> for any questions.
      </>
    ),
  },
  {
    q: "How do I get to Synergia Ranch?",
    a: "Synergia Ranch is located at 26 Synergia Rd, Santa Fe, NM 87508. The nearest major airport is Albuquerque International Sunport (ABQ), about an hour away. Santa Fe Regional Airport (SAF) is closer but serves limited routes. See the Getting There page for full directions and carpool details.",
  },
  {
    q: "When is the deadline to register?",
    a: (
      <>
        <Reg>Registration</Reg> is open and there are limited spots available so please reserve when you can. It will be possible to still purchase day and half day passes during the conference itself.
      </>
    ),
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 style={{ color: "var(--water-dark)" }} className="text-4xl font-bold mb-2">
        FAQ
      </h1>
      <p className="opacity-60 mb-10">Frequently asked questions. More answers coming soon.</p>

      <div className="space-y-6">
        {faqs.map(({ q, a }) => (
          <div key={q} className="border-b border-black/10 pb-6">
            <h2 className="text-base font-semibold mb-2">{q}</h2>
            <p className="text-sm opacity-70 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <div
        style={{ backgroundColor: "var(--sand)" }}
        className="mt-12 rounded-xl p-6 text-sm"
      >
        <p className="font-semibold mb-1">Have a question not answered here?</p>
        <p className="opacity-70">
          Reach out to the{" "}
          <a
            href={`mailto:${TEAM_EMAIL}`}
            style={{ color: "var(--water)" }}
            className="underline underline-offset-2 hover:opacity-70"
          >
            organizing team
          </a>{" "}
          directly. We will continue updating this page as more details are confirmed.
        </p>
      </div>
    </div>
  );
}
