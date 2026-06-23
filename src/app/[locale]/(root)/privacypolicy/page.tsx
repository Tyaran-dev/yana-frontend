"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { 
  FaShieldAlt,
  FaBuilding,
  FaUserEdit,
  FaDatabase,
  FaUserCheck,
  FaShareAlt,
  FaGlobe,
  FaLock,
  FaHistory,
  FaUserCog,
  FaBell,
  FaSyncAlt,
  FaEnvelope,
  FaPlane,
  FaHotel,
  FaCreditCard,
  FaPassport,
  FaHeadset,
  FaGavel,
  FaServer,
  FaCookie,
  FaExternalLinkAlt,
  FaUser,
  FaPhone,
  FaAt,
  FaInfoCircle,
  FaIdCard,
  FaLaptop,
  FaFileAlt,
  FaTasks,
  FaHandshake,
  FaRegClock,
  FaUserShield,
  FaQuestionCircle
} from "react-icons/fa";

export default function PrivacyPolicyPage() {
  const t = useTranslations("PrivacyPolicy");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sections = [
    {
      id: "information-collect",
      icon: FaDatabase,
      title: t("sections.informationCollect.title"),
      content: t("sections.informationCollect.content"),
      points: t.raw("sections.informationCollect.points")
    },
    {
      id: "how-we-collect",
      icon: FaUserEdit,
      title: t("sections.howWeCollect.title"),
      content: t("sections.howWeCollect.content"),
      points: t.raw("sections.howWeCollect.points")
    },
    {
      id: "how-we-use",
      icon: FaUserCheck,
      title: t("sections.howWeUse.title"),
      content: t("sections.howWeUse.content"),
      points: t.raw("sections.howWeUse.points")
    },
    {
      id: "data-sharing",
      icon: FaShareAlt,
      title: t("sections.dataSharing.title"),
      content: t("sections.dataSharing.content"),
      points: t.raw("sections.dataSharing.points")
    },
    {
      id: "data-security",
      icon: FaLock,
      title: t("sections.dataSecurity.title"),
      content: t("sections.dataSecurity.content")
    },
    {
      id: "data-retention",
      icon: FaHistory,
      title: t("sections.dataRetention.title"),
      content: t("sections.dataRetention.content")
    },
    {
      id: "user-rights",
      icon: FaUserCog,
      title: t("sections.userRights.title"),
      content: t("sections.userRights.content"),
      points: t.raw("sections.userRights.points")
    },
    {
      id: "cookies",
      icon: FaCookie,
      title: t("sections.cookies.title"),
      content: t("sections.cookies.content")
    },
    {
      id: "external-links",
      icon: FaExternalLinkAlt,
      title: t("sections.externalLinks.title"),
      content: t("sections.externalLinks.content")
    },
    {
      id: "policy-changes",
      icon: FaSyncAlt,
      title: t("sections.policyChanges.title"),
      content: t("sections.policyChanges.content")
    },
    {
      id: "contact-us",
      icon: FaQuestionCircle,
      title: t("sections.contactUs.title"),
      content: t("sections.contactUs.content")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#016733] to-[#1c1466] rounded-full mb-6 shadow-lg">
            <FaShieldAlt className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t("title")}
          </h1>

          <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full mb-4">
            <FaPlane className="w-4 h-4 text-emerald-700" />
            <span className="text-sm font-semibold text-emerald-700">{t("companyName")}</span>
          </div>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mb-4 leading-relaxed">
            {t("subtitle")}
          </p>

          <p className="text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-lg inline-block">
            {t("lastUpdated")}
          </p>
        </div>

        {/* Privacy Information Card */}
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
                                let IconType = FaInfoCircle;
                                let iconColor = "text-emerald-700";
                                
                                if (point.includes("لا") || point.includes("not") || point.includes("غير") ||
                                    point.includes("does not") || point.includes("don't") || point.includes("not sell") ||
                                    point.includes("لا نبيع") || point.includes("لا نؤجر") || point.includes("not rent")) {
                                  IconType = FaTimesCircle;
                                  iconColor = "text-red-500";
                                } else if (point.includes("نحن") || point.includes("we") || point.includes("نستخدم") ||
                                    point.includes("use") || point.includes("نقوم") || point.includes("نقدم") ||
                                    point.includes("provide") || point.includes("نحتفظ") || point.includes("retain") ||
                                    point.includes("قد") || point.includes("may") || point.includes("نطبق") ||
                                    point.includes("implement") || point.includes("including") || point.includes("مثل") ||
                                    point.includes("for example") || point.includes("through") || point.includes("عبر") ||
                                    point.includes("via") || point.includes("such as") || point.includes("including")) {
                                  IconType = FaCheckCircle;
                                  iconColor = "text-green-500";
                                } else if (point.includes("تخضع") || point.includes("subject to") || point.includes("عند") ||
                                    point.includes("when") || point.includes("إذا") || point.includes("if") ||
                                    point.includes("where") || point.includes("حيث") || point.includes("in accordance") ||
                                    point.includes("وفقاً") || point.includes("as required") || point.includes("حسب") ||
                                    point.includes("depending") || point.includes("بموجب") || point.includes("under")) {
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

        {/* Contact Info Box */}
        <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-xl shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-[#016733] to-[#1c1466] rounded-lg flex items-center justify-center">
                <FaEnvelope className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                {t("contactTitle")}
              </h3>
              <p className="text-sm sm:text-base text-slate-700 mb-4">
                {t("contactDescription")}
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