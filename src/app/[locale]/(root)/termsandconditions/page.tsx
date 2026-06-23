"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  FaFileContract,
  FaBuilding,
  FaUserCheck,
  FaSyncAlt,
  FaServer,
  FaShieldAlt,
  FaUserShield,
  FaCreditCard,
  FaExclamationTriangle,
  FaPlane,
  FaLock,
  FaHandshake,
  FaCopyright,
  FaEnvelope,
  FaGavel,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaRegFileAlt,
  FaHotel,
  FaMoneyBillWave,
  FaGlobe,
  FaBan,
  FaBalanceScale,
  FaUsers,
  FaBook,
  FaGavel as FaJustice,
  FaQuestionCircle
} from "react-icons/fa";

export default function TermsConditionsPage() {
  const t = useTranslations("TermsConditions");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sections = [
    {
      id: "definitions",
      icon: FaBook,
      title: t("sections.definitions.title"),
      content: t("sections.definitions.content"),
      points: t.raw("sections.definitions.points")
    },
    {
      id: "eligibility",
      icon: FaUserCheck,
      title: t("sections.eligibility.title"),
      content: t("sections.eligibility.content")
    },
    {
      id: "account-registration",
      icon: FaUserShield,
      title: t("sections.accountRegistration.title"),
      content: t("sections.accountRegistration.content"),
      points: t.raw("sections.accountRegistration.points")
    },
    {
      id: "use-of-platform",
      icon: FaGlobe,
      title: t("sections.useOfPlatform.title"),
      content: t("sections.useOfPlatform.content"),
      points: t.raw("sections.useOfPlatform.points")
    },
    {
      id: "bookings-pricing",
      icon: FaCreditCard,
      title: t("sections.bookingsPricing.title"),
      content: t("sections.bookingsPricing.content"),
      points: t.raw("sections.bookingsPricing.points")
    },
    {
      id: "amendments-cancellations-refunds",
      icon: FaSyncAlt,
      title: t("sections.amendmentsCancellationsRefunds.title"),
      content: t("sections.amendmentsCancellationsRefunds.content")
    },
    {
      id: "travel-agencies-corporate",
      icon: FaUsers,
      title: t("sections.travelAgenciesCorporate.title"),
      content: t("sections.travelAgenciesCorporate.content"),
      points: t.raw("sections.travelAgenciesCorporate.points")
    },
    {
      id: "intellectual-property",
      icon: FaCopyright,
      title: t("sections.intellectualProperty.title"),
      content: t("sections.intellectualProperty.content")
    },
    {
      id: "limitation-of-liability",
      icon: FaBalanceScale,
      title: t("sections.limitationOfLiability.title"),
      content: t("sections.limitationOfLiability.content"),
      points: t.raw("sections.limitationOfLiability.points")
    },
    {
      id: "indemnification",
      icon: FaHandshake,
      title: t("sections.indemnification.title"),
      content: t("sections.indemnification.content")
    },
    {
      id: "amendments-to-terms",
      icon: FaSyncAlt,
      title: t("sections.amendmentsToTerms.title"),
      content: t("sections.amendmentsToTerms.content")
    },
    {
      id: "suspension-termination",
      icon: FaBan,
      title: t("sections.suspensionTermination.title"),
      content: t("sections.suspensionTermination.content")
    },
    {
      id: "governing-law-jurisdiction",
      icon: FaJustice,
      title: t("sections.governingLawJurisdiction.title"),
      content: t("sections.governingLawJurisdiction.content")
    },
    {
      id: "contact-information",
      icon: FaQuestionCircle,
      title: t("sections.contactInformation.title"),
      content: t("sections.contactInformation.content")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#016733] to-[#1c1466] rounded-full mb-6 shadow-lg">
            <FaFileContract className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t("title")}
          </h1>

          <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full mb-4">
            <FaBuilding className="w-4 h-4 text-emerald-700" />
            <span className="text-sm font-semibold text-emerald-700">{t("companyName")}</span>
          </div>

          <p className="text-lg font-medium text-slate-700 max-w-3xl mx-auto mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            {t("agreementNotice")}
          </p>

          <p className="text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-lg inline-block">
            {t("lastUpdated")}
          </p>
        </div>

        {/* Terms Information Card */}
        <div className="bg-white shadow-xl border border-slate-200 rounded-2xl overflow-hidden mb-8">
          {/* Card Header */}
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-emerald-50/30 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              {t("cardTitle")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              {t("cardDescription")}
            </p>
          </div>

          {/* Accordion Sections */}
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              {sections.map((section) => {
                const Icon = section.icon;
                const isOpen = openSections[section.id];
                const hasPoints = section.points;

                return (
                  <div
                    key={section.id}
                    className="border border-slate-200 rounded-xl overflow-hidden hover:border-emerald-300 transition-all duration-300 hover:shadow-md"
                  >
                    {/* Accordion Trigger */}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-sm sm:text-base text-slate-900 block">
                            {section.title}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        {isOpen ? (
                          <span className="w-5 h-5 text-emerald-700 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </span>
                        ) : (
                          <span className="w-5 h-5 text-slate-400 flex items-center justify-center group-hover:text-emerald-700 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        )}
                      </div>
                    </button>

                    {/* Accordion Content */}
                    {isOpen && (
                      <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 bg-slate-50/50">
                        <div className="ml-12 sm:ml-14 pr-4">
                          <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line mb-4">
                            {section.content}
                          </div>

                          {/* Points List */}
                          {hasPoints && (
                            <div className="mt-4 space-y-3">
                              {hasPoints.map((point: string, index: number) => {
                                // Determine icon based on content
                                let IconType = FaInfoCircle;
                                let iconColor = "text-emerald-700";

                                if (point.includes("يمنع") || point.includes("prohibited") || point.includes("not allowed") ||
                                  point.includes("غير مسؤول") || point.includes("not responsible") || point.includes("لا تتحمل") ||
                                  point.includes("لا تضمن") || point.includes("does not guarantee") ||
                                  point.includes("غير قانوني") || point.includes("unlawful") ||
                                  point.includes("غير مصرح") || point.includes("unauthorized") ||
                                  point.includes("ضار") || point.includes("harmful") ||
                                  point.includes("احتيال") || point.includes("fraud")) {
                                  IconType = FaTimesCircle;
                                  iconColor = "text-red-500";
                                } else if (point.startsWith("يحق") || point.includes("right to") || point.includes("entitled") ||
                                  point.includes("يتحمل") || point.includes("responsible for") || point.includes("يلتزم") ||
                                  point.includes("حق") || point.includes("reserves the right") ||
                                  point.includes("يجب") || point.includes("must") || point.includes("shall")) {
                                  IconType = FaCheckCircle;
                                  iconColor = "text-green-500";
                                } else if (point.includes("تخضع") || point.includes("subject to") || point.includes("يتم") ||
                                  point.includes("processed") || point.includes("تتضمن") || point.includes("includes") ||
                                  point.includes("تطبق") || point.includes("apply") || point.includes("قد") ||
                                  point.includes("may") || point.includes("مشروطة") || point.includes("condition")) {
                                  IconType = FaInfoCircle;
                                  iconColor = "text-blue-500";
                                }

                                return (
                                  <div key={index} className="flex items-start gap-3">
                                    <IconType className={`w-5 h-5 ${iconColor} mt-0.5 flex-shrink-0`} />
                                    <span className="text-sm sm:text-base text-slate-700">{point}</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Important Notice Box */}
        <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-xl shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-[#016733] to-[#1c1466] rounded-lg flex items-center justify-center">
                <FaRegFileAlt className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                {t("importantNoticeTitle")}
              </h3>
              <p className="text-sm sm:text-base text-slate-700 mb-4">
                {t("importantNoticeDescription")}
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:info@tayyran.com"
                  className="inline-flex items-center gap-3 text-emerald-700 hover:text-emerald-800 font-medium text-sm sm:text-base transition-colors group"
                >
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-emerald-200 group-hover:border-emerald-300 transition-colors">
                    <FaEnvelope className="w-4 h-4" />
                  </div>
                  <span>info@yanaholidays.com</span>
                </a>
                <div className="flex items-start gap-3 text-slate-600">
                  <FaBuilding className="w-4 h-4 mt-1 flex-shrink-0 text-emerald-700" />
                  <p className="text-sm">
                    {t("companyAddress")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}