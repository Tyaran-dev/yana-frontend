'use client'
import React, { useState, useRef, useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import PriceRange from '../../shared/filter/price-range';
import HotelCheckBox from '../../shared/filter/HotelCheckBox';

interface FiltersProps {
  priceRange: [number, number];
  onPriceRangeChange: (newValue: [number, number]) => void;
  selectedHotelOptions: string[];
  onHotelOptionsChange: (selected: string[]) => void;
  selectedStarRatingOptions: string[];
  onStarRatingOptionsChange: (selected: string[]) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  starOptions: { label: string; value: string }[];
  onResetFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  priceRange,
  onPriceRangeChange,
  selectedHotelOptions,
  onHotelOptionsChange,
  onStarRatingOptionsChange,
  starOptions,
  selectedStarRatingOptions,
  searchQuery,
  onSearchQueryChange,
  onResetFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedStarRatingOptions.length > 0 ||
    priceRange[0] !== 10 ||
    priceRange[1] !== 10000;

  useEffect(() => {
    if (document.activeElement !== searchInputRef.current) {
      searchInputRef.current?.focus();
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log(priceRange, "priceRange")
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  return (
    <div
      className="w-full border-2 md:border-none md:p-2 md:w-[30%] rounded-xl md:sticky md:top-4 md:self-start bg-white"
      style={{ boxShadow: '0px 0px 20px 0px #0000001A' }}
    >
      {/* Mobile Header */}
      <div
        className="flex justify-between bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl items-center cursor-pointer md:cursor-default px-4 py-3 transition-all duration-200"
        onClick={() => {
          if (window.innerWidth < 768) setIsOpen(!isOpen);
        }}
      >
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
          Filters
        </h2>
        <span className="md:hidden">
          {isOpen ? (
            <MdKeyboardArrowDown className="text-2xl rotate-180 transition-transform duration-300" />
          ) : (
            <MdKeyboardArrowDown className="text-2xl transition-transform duration-300" />
          )}
        </span>
      </div>

      {/* Accordion Body */}
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen
          ? 'max-h-[2000px] opacity-100'
          : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'
          }`}
      >
        <div className="max-h-[calc(100vh-120px)] overflow-y-auto px-2 md:px-0 scrollbar-hide">
          {/* Price Filter */}
          <div className="py-4 px-4 border-b border-primary/10">
            <h4 className="text-base py-2 font-semibold text-primary">Price Range</h4>
            <PriceRange
              title=""
              min={10}
              max={10000}
              unit="SAR"
              value={localPriceRange}
              onChange={(value) => setLocalPriceRange(value as [number, number])}
              onChangeComplete={(value) => {
                onPriceRangeChange(value as [number, number]);
              }}
            />
          </div>

          {/* Property Name Search */}
          <div className="flex flex-col mb-4 px-4 md:px-0 pt-4 border-b border-primary/10">
            <h4 className="text-base py-2 font-semibold text-primary">Property Name</h4>
            <div className="border border-primary/25 flex items-center gap-2 rounded-xl py-2 px-4 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200 mb-4">
              <FiSearch className="text-lg flex-shrink-0 text-primary/60" />
              <input
                type="text"
                ref={searchInputRef}
                placeholder="Search hotels..."
                className="w-full flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
              />
            </div>
          </div>

          {/* Star Rating */}
          <div className="pt-2">
            <HotelCheckBox
              title="Star rating"
              options={starOptions}
              onChange={onStarRatingOptionsChange}
              selectedOptions={selectedStarRatingOptions}
            />
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <div className="px-4 pb-4 pt-4">
              <button
                onClick={onResetFilters}
                className="w-full py-2.5 text-sm font-semibold text-secondary border border-secondary/30 rounded-xl hover:bg-secondary/5 hover:border-secondary transition-all duration-200"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;