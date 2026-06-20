"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { LoaderPinwheel } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { useHotelSearchForm } from "@/hooks/useSearchHotels";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CustomDatePicker from "@/app/components/shared/custom-date-picker";
import DropdownWithSearch from "@/app/components/shared/custom-hotel-dropdown";
import DestinationSearch from "./DestinationSearch";
import HotelLocationSearchField, { SearchResultItem } from "@/app/components/website/hotel-search/HotelLocationSearchField";
import { useLocale } from "next-intl";
import { setHotelFormData, setHotelSearchData } from "@/redux/hotels/hotelsSlice";

// ── Helper Components ──────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-xs font-semibold mb-1.5 tracking-wide uppercase text-primary">
      {children}
    </span>
  );
}

function CounterButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center rounded-lg font-bold text-lg transition-all duration-150 border-primary text-primary hover:bg-primary hover:text-white"
    >
      {children}
    </button>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

const HotelSearch = ({ className }: { className?: string }) => {
  const t = useTranslations("HomePage");
  const e = useTranslations("errors");
  const router = useRouter();
  const dispatch = useDispatch();

  const formData = useSelector((state: RootState) => state.hotelData.formData);

  console.log(formData, "searchParams");

  const {
    countries,
    cities,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    rooms,
    selectedNationality,
    setSelectedNationality,
    addRoom,
    removeRoom,
    handleAdultChange,
    handleChildChange,
    handleAgeChange,
    totalSummary,
    open,
    setOpen,
    setRooms,
    today,
    destination,
    setDestination,
  } = useHotelSearchForm();

  useEffect(() => {
    if (!formData) return;

    if (formData.selectedCity) {
      // TODO: We might need to store the full destination object in Redux to restore it properly
      // For now, we can't easily restore the label without fetching it again or storing it.
      // This is a known limitation of the refactor until Redux state is updated to store { label, value }
    }
    if (formData.selectedNationality)
      setSelectedNationality(formData.selectedNationality);

    if (formData.checkIn) setCheckIn(new Date(formData.checkIn));
    if (formData.checkOut) setCheckOut(new Date(formData.checkOut));

    if (formData.rooms && formData.rooms.length > 0) {
      if (typeof setRooms === "function") {
        setRooms(formData.rooms);
      }
    }
  }, [formData]);

  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<SearchResultItem | null>(null);
  const locale = useLocale();

  const searchParams = {
    CheckIn: checkIn,
    CheckOut: checkOut,
    Code: selectedLocation?.code,
    Type: selectedLocation?.type,
    Language: locale,
    GuestNationality: selectedNationality || "SA",
    PreferredCurrencyCode: "SAR",
    PaxRooms: rooms,
    IsDetailResponse: true,
    ResponseTime: 23,
    page: 1,
    Filters: {
      MealType: "All",
      Refundable: true,
      NoOfRooms: rooms.length.toString(),
    },
  };

  const handleSearch = async () => {
    if (!selectedLocation || !checkIn || !checkOut) {
      alert("Please select a location/hotel, check-in, and check-out dates.");
      return;
    }

    setLoading(true);

    try {
      dispatch(setHotelSearchData(searchParams));

      dispatch(
        setHotelFormData({
          selectedCountry: selectedLocation.originalData.country_name,
          selectedCity: selectedLocation.label,
          selectedNationality: selectedNationality || "SA",
          checkIn,
          checkOut,
          rooms,
        })
      );

      if (selectedLocation.type === "hotel") {
        router.push(`/${locale}/hotel-details/${selectedLocation.code}`);
      } else {
        router.push(`/${locale}/hotel-search`);
      }

    } catch (error) {
      console.error("Hotel search failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-6 shadow-lg border rounded-xl border-primary/10 ${className || ''}`}>
      <div className="grid gap-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <FieldLabel>Destination</FieldLabel>
            <HotelLocationSearchField
              label="Select City or Hotel"
              placeholder="Search for a city or hotel..."
              onSelect={(item) => setSelectedLocation(item)}
              className="w-full border rounded-xl px-4 py-3 text-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-primary border-primary/25"
            />
          </div>

          <div>
            <FieldLabel>Check-In</FieldLabel>
            <CustomDatePicker
              label={t("heroSection.searchForm.hotelCheckInDate")}
              placeholder={t("heroSection.searchForm.hotelCheckInDate")}
              value={checkIn}
              minDate={today}
              onChange={(date: Date | null) => setCheckIn(date)}
              className="border rounded-xl py-2.5 !border-primary/25 focus-within:!border-primary text-sm w-full transition-all duration-200"
            />
          </div>

          <div>
            <FieldLabel>Check-Out</FieldLabel>
            <CustomDatePicker
              label={t("heroSection.searchForm.hotelCheckOutDate")}
              placeholder={t("heroSection.searchForm.hotelCheckOutDate")}
              value={checkOut}
              minDate={checkIn || undefined}
              onChange={(date: Date | null) => setCheckOut(date)}
              className="border rounded-xl py-2.5 !border-primary/25 focus-within:!border-primary text-sm w-full transition-all duration-200"
            />
          </div>

          <div>
            <FieldLabel>Nationality</FieldLabel>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#135454"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <select
                value={selectedNationality}
                onChange={(e) => setSelectedNationality(e.target.value)}
                className={`w-full border rounded-xl pl-9 pr-4 py-3 text-sm appearance-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary border-primary/25 ${selectedNationality ? 'text-gray-900' : 'text-gray-400'
                  }`}
              >
                <option disabled value="">
                  Select your nationality
                </option>
                {countries.map((country, indx) => (
                  <option key={country.Code + indx} value={country.Code}>
                    {country.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex justify-between items-center flex-col md:flex-row gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full md:gap-6">
            {/* Rooms Section */}
            <div className="relative w-full md:w-64">
              <FieldLabel>Guests & Rooms</FieldLabel>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`w-full flex items-center gap-2 border rounded-xl px-4 py-3 text-sm text-left transition-all duration-200 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white ${open ? 'border-primary shadow-[0_0_0_2px_#13545422]' : 'border-primary/25'
                  }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#135454"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span className={`truncate ${totalSummary ? 'text-gray-900' : 'text-gray-400'}`}>
                  {totalSummary || "Select guests"}
                </span>
                <svg
                  className={`ml-auto shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6b7280"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {open && (
                <div className="absolute top-full left-0 mt-2 z-50 rounded-2xl shadow-2xl w-full min-w-[320px] p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 bg-white border border-primary/20 shadow-[0_20px_60px_rgba(19,84,84,0.15),0_4px_16px_rgba(0,0,0,0.08)]">
                  {rooms.map((room, roomIndex) => (
                    <div
                      key={roomIndex}
                      className="rounded-xl p-4 bg-primary/5"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-sm text-primary">
                          Room {roomIndex + 1}
                        </span>
                        {rooms.length > 1 && (
                          <button
                            onClick={() => removeRoom(roomIndex)}
                            className="text-xs font-medium px-2 py-1 rounded-lg transition-colors duration-150 bg-secondary/10 text-secondary"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        {/* Adults */}
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-800">Adults</p>
                            <p className="text-xs text-gray-400">Age 18+</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <CounterButton onClick={() => handleAdultChange(roomIndex, -1)}>−</CounterButton>
                            <span className="w-5 text-center font-semibold text-gray-800">{room.Adults}</span>
                            <CounterButton onClick={() => handleAdultChange(roomIndex, 1)}>+</CounterButton>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-800">Children</p>
                            <p className="text-xs text-gray-400">Age 0–17</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <CounterButton onClick={() => handleChildChange(roomIndex, -1)}>−</CounterButton>
                            <span className="w-5 text-center font-semibold text-gray-800">{room.Children}</span>
                            <CounterButton onClick={() => handleChildChange(roomIndex, 1)}>+</CounterButton>
                          </div>
                        </div>

                        {/* Children Ages */}
                        {room.ChildrenAges.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            {room.ChildrenAges.map((age, childIndex) => (
                              <div key={childIndex}>
                                <label className="block text-xs mb-1 text-primary">
                                  Child {childIndex + 1} age
                                </label>
                                <select
                                  value={age}
                                  onChange={(e) =>
                                    handleAgeChange(roomIndex, childIndex, parseInt(e.target.value))
                                  }
                                  className="border rounded-lg px-2 py-1.5 text-xs w-full focus:outline-none border-primary/25 text-gray-700"
                                >
                                  {Array.from({ length: 17 }).map((_, i) => (
                                    <option key={i} value={i}>
                                      {i === 0 ? "< 1 yr" : `${i + 1} yrs`}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {rooms.length < 6 && (
                    <button
                      onClick={addRoom}
                      className="w-full py-2.5 rounded-xl text-sm font-medium border-dashed border-2 transition-all duration-150 border-primary text-primary hover:bg-primary/5"
                    >
                      + Add Room
                    </button>
                  )}

                  <button
                    onClick={() => setOpen(false)}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 bg-primary hover:opacity-90"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search Button */}
          <div className="flex w-full md:w-auto">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="py-3 px-8 w-full md:w-auto md:text-xl text-base rounded-2xl text-white bg-gradient-to-r from-secondary to-[#e84a2f] shadow-[0_8px_24px_#FF5E4155] flex gap-2 items-center justify-center hover:scale-105 duration-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <LoaderPinwheel className="animate-spin" />
                  {t("heroSection.searchForm.searchButtonLoading")}
                </>
              ) : (
                <>
                  <LuSearch /> {t("heroSection.searchForm.searchButton")}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSearch;