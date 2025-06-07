"use client";

import React, { useState, useMemo } from "react";
import { skipData } from "../data";
import { FilterOptions, SortOption } from "../types";
import Header from "./Header";
import Filters from "./Filters";
import SkipCard from "./SkipCard";
import Pagination from "./Pagination";
import BottomSummary from "./BottomSummary";

const SkipHireProducts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("price-low");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);

  const [filters, setFilters] = useState<FilterOptions>({
    roadAllowed: null,
    heavyWaste: null,
    minSize: 4,
    maxSize: 12,
    hirePeriod: null,
  });

  const filteredAndSortedData = useMemo(() => {
    let filtered = skipData.filter((skip) => {
      const matchesSearch =
        skip.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skip.postcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skip.size.toString().includes(searchTerm);

      const matchesRoadAllowed = filters.roadAllowed === null || skip.allowed_on_road === filters.roadAllowed;
      const matchesHeavyWaste = filters.heavyWaste === null || skip.allows_heavy_waste === filters.heavyWaste;
      const matchesSize = skip.size >= filters.minSize && skip.size <= filters.maxSize;
      const matchesHirePeriod = filters.hirePeriod === null || skip.hire_period_days === filters.hirePeriod;

      return matchesSearch && matchesRoadAllowed && matchesHeavyWaste && matchesSize && matchesHirePeriod;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price_before_vat - b.price_before_vat;
        case "price-high":
          return b.price_before_vat - a.price_before_vat;
        case "size-small":
          return a.size - b.size;
        case "size-large":
          return b.size - a.size;
        case "newest":
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, sortBy, filters]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);

  const calculateTotalPrice = (priceBeforeVat: number, vat: number) => {
    return Math.round(priceBeforeVat * (1 + vat / 100));
  };

  const resetFilters = () => {
    setFilters({
      roadAllowed: null,
      heavyWaste: null,
      minSize: 4,
      maxSize: 12,
      hirePeriod: null,
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {showFilters && <Filters filters={filters} setFilters={setFilters} resetFilters={resetFilters} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Info */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)} of{" "}
            {filteredAndSortedData.length} results
          </p>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show:</span>
            <select
              className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {currentItems.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              selectedSkip={selectedSkip}
              setSelectedSkip={setSelectedSkip}
              calculateTotalPrice={calculateTotalPrice}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      </div>
      {/* Bottom Summary   */}
      <BottomSummary selectedSkip={selectedSkip} calculateFinalPrice={calculateTotalPrice} />
    </div>
  );
};

export default SkipHireProducts;
