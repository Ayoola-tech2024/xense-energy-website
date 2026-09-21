"use client";

import { useState } from "react";
import { ParticleCanvas } from "@/components/landing/ParticleCanvas";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsBar from "@/components/landing/StatsBar";
import OperatingModes from "@/components/landing/OperatingModes";
import ProductEcosystem from "@/components/landing/ProductEcosystem";
import DashboardShowcase from "@/components/landing/DashboardShowcase";
import BatterySimulator from "@/components/landing/BatterySimulator";
import { WaitlistSection } from "@/components/landing/WaitlistSection";
import { Modals } from "@/components/landing/Modals";
import { Footer } from "@/components/landing/Footer";

export default function MarketingWebsitePage() {
  const [activeModal, setActiveModal] = useState<"login" | "signup" | "demo" | null>(null);

  const handleOpenModal = (modal: "login" | "signup" | "demo") => {
    setActiveModal(modal);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans selection:bg-indigo-500/20 text-[#0f172a]">
      {/* Dynamic Ambient Background Canvas */}
      <ParticleCanvas />

      {/* Top Navigation */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection onOpenModal={handleOpenModal} />
        <StatsBar />
        <OperatingModes onOpenModal={handleOpenModal} />
        <ProductEcosystem />
        <DashboardShowcase onOpenModal={handleOpenModal} />
        <BatterySimulator />
        <WaitlistSection onRequestDemo={() => handleOpenModal("demo")} />
      </main>

      {/* Footer */}
      <Footer
        onOpenLogin={() => handleOpenModal("login")}
        onOpenSignup={() => handleOpenModal("signup")}
        onOpenDemo={() => handleOpenModal("demo")}
      />

      {/* Popups & Dialogs */}
      <Modals
        activeModal={activeModal}
        onClose={handleCloseModal}
        onSwitchModal={handleOpenModal}
      />
    </div>
  );
}
