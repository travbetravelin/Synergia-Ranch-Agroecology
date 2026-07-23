import type { NextConfig } from "next";

const conferencePages = [
  "schedule",
  "speakers",
  "registration",
  "accommodations",
  "venue",
  "getting-there",
  "activities",
  "faq",
];

const nextConfig: NextConfig = {
  async redirects() {
    return conferencePages.map((page) => ({
      source: `/${page}`,
      destination: `/conferences/2026-water/${page}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
