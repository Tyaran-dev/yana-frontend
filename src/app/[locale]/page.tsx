"use client";

import { useState, useEffect } from "react";
import HeroSection from "../components/website/home/hero-section";
import TripsSection from "../components/website/home/TripsSection";
import { Toaster } from "react-hot-toast";
import { useTranslations, useLocale } from "next-intl";
import EnhancedIntro from "../components/shared/Feedback/EnhancedIntro";

export default function Home() {
  const t = useTranslations("HomePage");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let current = 0;

    interval = setInterval(() => {
      current += 5;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 700);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <EnhancedIntro onComplete={() => setLoading(false)} />;
  }
  // ✅ Main Content
  return (
    <div className="animate-fadeInSlow fade-in transition-opacity duration-700">
      <Toaster />
      <div className="sticky top-0 left-0 z-50">
      </div>
      <HeroSection />
      <TripsSection t={t} />
    </div>
  );

}
