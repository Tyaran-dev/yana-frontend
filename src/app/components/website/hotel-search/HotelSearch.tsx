"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import CustomDatePicker from "../../shared/custom-date-picker";
import { useLocale } from "next-intl";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setHotelFormData, setHotelSearchData } from "@/redux/hotels/hotelsSlice";
import { useHotelSearchForm } from "@/hooks/useSearchHotels";
import HotelLocationSearchField, { SearchResultItem } from "./HotelLocationSearchField";

// ── tiny helpers ──────────────────────────────────────────────────────────────

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

// ── main component ────────────────────────────────────────────────────────────

const HotelSearch = () => {
  const t = useTranslations('HotelSearch'); // Add translations
  const {
    countries,
    selectedNationality,
    setSelectedNationality,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    rooms,
    addRoom,
    removeRoom,
    handleAdultChange,
    handleChildChange,
    handleAgeChange,
    totalSummary,
    open,
    setOpen,
    today,
  } = useHotelSearchForm();

  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<SearchResultItem | null>(null);

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
      alert(t('selectLocationAlert')); // Translated alert
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
      alert(t('errorAlert')); // Translated error alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-5">
      {/* Location */}
      <div>
        <FieldLabel>{t('destination')}</FieldLabel>
        <HotelLocationSearchField
          label={t('selectCityOrHotel')}
          placeholder={t('searchPlaceholder')}
          onSelect={(item) => setSelectedLocation(item)}
          className="w-full border rounded-xl px-4 py-3 text-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-primary border-primary/25"
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FieldLabel>{t('checkIn')}</FieldLabel>
          <CustomDatePicker
            label={t('checkInDate')}
            placeholder={t('checkInDate')}
            value={checkIn}
            className="border rounded-xl py-2.5 !border-primary/25 focus-within:!border-primary text-sm w-full transition-all duration-200"
            minDate={today}
            onChange={(date: Date | null) => setCheckIn(date)}
          />
        </div>
        <div>
          <FieldLabel>{t('checkOut')}</FieldLabel>
          <CustomDatePicker
            label={t('checkOutDate')}
            placeholder={t('checkOutDate')}
            value={checkOut}
            className="border rounded-xl py-2.5 !border-primary/25 focus-within:!border-primary text-sm w-full transition-all duration-200"
            minDate={checkIn || undefined}
            onChange={(date: Date | null) => setCheckOut(date)}
          />
        </div>
      </div>

      {/* Guests & Nationality */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Guests trigger */}
        <div className="relative">
          <FieldLabel>{t('guestsAndRooms')}</FieldLabel>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={`w-full flex items-center gap-2 border rounded-xl px-4 py-3 text-sm text-left transition-all duration-200 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white ${
              open ? 'border-primary shadow-[0_0_0_2px_#13545422]' : 'border-primary/25'
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
              {totalSummary || t('selectGuests')}
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

          {/* Guests dropdown */}
          {open && (
            <div
              className="absolute top-full left-0 mt-2 z-50 rounded-2xl shadow-2xl w-full min-w-[300px] p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 bg-white border border-primary/20 shadow-[0_20px_60px_rgba(19,84,84,0.15),0_4px_16px_rgba(0,0,0,0.08)]"
            >
              {rooms.map((room, roomIndex) => (
                <div
                  key={roomIndex}
                  className="rounded-xl p-4 bg-primary/5"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-sm text-primary">
                      {t('room')} {roomIndex + 1}
                    </span>
                    {rooms.length > 1 && (
                      <button
                        onClick={() => removeRoom(roomIndex)}
                        className="text-xs font-medium px-2 py-1 rounded-lg transition-colors duration-150 bg-secondary/10 text-secondary"
                      >
                        {t('remove')}
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    {/* Adults */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{t('adults')}</p>
                        <p className="text-xs text-gray-400">{t('adultsAge')}</p>
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
                        <p className="text-sm font-medium text-gray-800">{t('children')}</p>
                        <p className="text-xs text-gray-400">{t('childrenAge')}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <CounterButton onClick={() => handleChildChange(roomIndex, -1)}>−</CounterButton>
                        <span className="w-5 text-center font-semibold text-gray-800">{room.Children}</span>
                        <CounterButton onClick={() => handleChildChange(roomIndex, 1)}>+</CounterButton>
                      </div>
                    </div>

                    {/* Children ages */}
                    {room.ChildrenAges.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {room.ChildrenAges.map((age, childIndex) => (
                          <div key={childIndex}>
                            <label className="block text-xs mb-1 text-primary">
                              {t('childAge')} {childIndex + 1}
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
                                  {i === 0 ? t('lessThanOneYear') : `${i} ${t('years')}`}
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
                  + {t('addRoom')}
                </button>
              )}

              <button
                onClick={() => setOpen(false)}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 bg-primary hover:opacity-90"
              >
                {t('done')}
              </button>
            </div>
          )}
        </div>

        {/* Nationality */}
        <div>
          <FieldLabel>{t('nationality')}</FieldLabel>
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
              className={`w-full border rounded-xl pl-9 pr-4 py-3 text-sm appearance-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary border-primary/25 ${
                selectedNationality ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              <option disabled value="">
                {t('selectNationality')}
              </option>
              {countries.map((country, idx) => (
                <option key={country.Code + idx} value={country.Code}>
                  {country.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Search button */}
      <button
        onClick={handleSearch}
        disabled={loading}
        className={`w-full py-4 rounded-2xl font-bold text-base text-white transition-all duration-200 relative overflow-hidden group ${
          loading 
            ? 'bg-gray-400' 
            : 'bg-gradient-to-r from-secondary to-[#e84a2f] shadow-[0_8px_24px_#FF5E4155]'
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <>
              <svg
                className="animate-spin"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              {t('searching')}
            </>
          ) : (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              {t('searchHotels')}
            </>
          )}
        </span>
      </button>
    </div>
  );
};

export default HotelSearch;