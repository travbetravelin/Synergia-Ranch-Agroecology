import { ConferenceNav } from "@/components/ConferenceNav";

export default function ConferenceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConferenceNav />
      {children}
    </>
  );
}
