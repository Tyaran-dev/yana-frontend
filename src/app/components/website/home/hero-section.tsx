import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Section from "../../shared/section";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import HotelSearch from "../hotel-search/HotelSearch";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

import { useAuthContext } from "@/context/AuthContext";
import { BedIcon } from "lucide-react";




export interface FlightSegment {
  id: string;
  origin: string;
  destination: string;
  date: Date;
}

interface FlightFormData {
  origin: string;
  destination: string;
  departure: Date;
  returnDate: Date;
  travelers: { adults: number; children: number; infants: number };
  flightClass: string;
  flightType: string;
  segments?: FlightSegment[];
}

interface Room {
  id: number;
  adults: number;
  children: number;
}

const HeroSection = () => {
  const t = useTranslations("HomePage");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return (
    <div
      className={`w-full relative bg-heroHotelsBanner bg-center bg-cover min-h-[70vh] 2xl:min-h-auto py-20 lg:py-32 flex md:items-center  bg-no-repeat `}
    >
      <Section className="">
        <div className="gap-24  flex flex-col  justify-center items-center ">
          {/* Teal gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(19,84,84,0.88) 0%, rgba(19,84,84,0.60) 20%, rgba(0,0,0,0.30) 100%)",
            }}
            aria-hidden="true"
          />
          <div className="text-center z-50 text-white max-w-3xl px-4">
              {/* <span
                className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
                style={{ background: "rgba(255,94,65,0.22)", color: "#FF5E41" }}
              >
                {t("heroSection.badge") ?? "Hotel Booking"}
              </span> */}
            <h1 className="font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-5">
              {t("heroSection.mainHeading")}
            </h1>
            <p
              className="text-base md:text-xl font-medium leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {t("heroSection.subHeading")}
            </p>
          </div>

          <div className=" relative bg-white w-[90%] md:w-[660px] min-h-[500px] md:min-h-[460px]  rounded-2xl py-6  bg-top-right  px-3 md:px-5  bg-no-repeat bg-contain min-w-[50%]">
            {/* form header */}
            <div
              className={`flex justify-between gap-4  md:justify-between md:gap-4 w-full  `}
            >
              <div className="flex items-center justify-between   gap-3  w-full">
                <div className="flex items-center gap-2 ">
                  <BedIcon color={"#000"} />
                  <h1 className="text-md font-[400]">
                    {t("heroSection.searchForm.formTypeHotels")}
                  </h1>
                </div>
              </div>
            </div>
            <div className="">
              <HotelSearch />
            </div>

          </div>
        </div>
      </Section>
    </div>
  );
};

export default HeroSection;
