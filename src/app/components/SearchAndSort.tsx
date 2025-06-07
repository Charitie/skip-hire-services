"use client";

import React from "react";
import { Search, Filter, X } from "lucide-react";
import { SortOption } from "../types";

interface SearchAndSortProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
      <div className="relative flex-1 lg:w-80">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by area, postcode, or size..."
          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <select
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
        >
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="size-small">Size: Small to Large</option>
          <option value="size-large">Size: Large to Small</option>
          <option value="newest">Newest First</option>
        </select>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>
    </div>
  );
};

export default SearchAndSort;

/**
 * Changes made:
 * 1. Added clear (x) button functionality to search input
 * 2. Imported X icon from lucide-react
 * 3. Added conditional rendering for clear button
 * 4. Added hover effect and accessibility label
 * 5. Adjusted input padding to accommodate clear button
 *
 * Last updated: 2024-03-19
 */
