'use client';

import React from "react";
import { SortOption } from "../types";
import SearchAndSort from "./SearchAndSort";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
}) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Skip Hire Services</h1>
            <p className="text-gray-600 mt-1">Find the perfect skip size for your project</p>
          </div>

          <SearchAndSort
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
