import type { Metadata } from "next";
import { MaintenancePage } from "@/components/MaintenancePage";

export const metadata: Metadata = {
  title: "Zmieniamy się na lepsze",
  description: "Trwają prace modernizacyjne nad serwisem deloskiyt.",
};

export default function ZmieniamySieNaLepszePage() {
  return <MaintenancePage />;
}
