'use client';

import React from "react";
import { FilterOptions } from "../types";

interface FiltersProps {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  resetFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters, resetFilters }) => {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Road Placement</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={filters.roadAllowed === null ? "" : filters.roadAllowed.toString()}
              onChange={(e) =>
                setFilters({ ...filters, roadAllowed: e.target.value === "" ? null : e.target.value === "true" })
              }
            >
              <option value="">All</option>
              <option value="true">Road Allowed</option>
              <option value="false">Private Land Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Heavy Waste</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={filters.heavyWaste === null ? "" : filters.heavyWaste.toString()}
              onChange={(e) =>
                setFilters({ ...filters, heavyWaste: e.target.value === "" ? null : e.target.value === "true" })
              }
            >
              <option value="">All</option>
              <option value="true">Heavy Waste Allowed</option>
              <option value="false">Light Waste Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Size (Yards)</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={filters.minSize}
              onChange={(e) => setFilters({ ...filters, minSize: parseInt(e.target.value) })}
            >
              <option value="4">4 Yards</option>
              <option value="6">6 Yards</option>
              <option value="8">8 Yards</option>
              <option value="10">10 Yards</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hire Period</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={filters.hirePeriod || ""}
              onChange={(e) => setFilters({ ...filters, hirePeriod: e.target.value ? parseInt(e.target.value) : null })}
            >
              <option value="">All Periods</option>
              <option value="7">7 Days</option>
              <option value="14">14 Days</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
