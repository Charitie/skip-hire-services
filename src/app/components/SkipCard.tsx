'use client';

import React from "react";
import {  Truck, Weight, Calendar, MapPin } from "lucide-react";
import { Skip } from "../types";

interface SkipCardProps {
  skip: Skip;
  selectedSkip: number | null;
  setSelectedSkip: (id: number | null) => void;
  calculateTotalPrice: (priceBeforeVat: number, vat: number) => number;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, selectedSkip, setSelectedSkip, calculateTotalPrice }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer ${
        selectedSkip === skip.id ? "ring-2 ring-blue-500 shadow-lg" : ""
      }`}
      onClick={() => setSelectedSkip(selectedSkip === skip.id ? null : skip.id)}
    >
      {/* Skip Image */}
      <div className="relative h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center overflow-hidden">
        <div className="relative w-32 h-24 bg-yellow-500 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300">
          <div className="absolute inset-2 bg-yellow-400 rounded"></div>
          <div className="absolute top-1 left-1 w-6 h-6 bg-yellow-600 rounded-sm"></div>
          <div className="absolute top-1 right-1 w-6 h-6 bg-yellow-600 rounded-sm"></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-yellow-800">
            {skip.size}Y
          </div>
        </div>
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
          {skip.size} Yards
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{skip.size} Yard Skip</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span>
                {skip.area} ({skip.postcode})
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              £{calculateTotalPrice(skip.price_before_vat, skip.vat)}
            </div>
            <div className="text-sm text-gray-500">inc. VAT</div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Hire Period</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{skip.hire_period_days} days</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck className="w-4 h-4" />
              <span>Road Placement</span>
            </div>
            <span className={`text-sm font-semibold ${skip.allowed_on_road ? "text-green-600" : "text-red-600"}`}>
              {skip.allowed_on_road ? "Allowed" : "Not Allowed"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Weight className="w-4 h-4" />
              <span>Heavy Waste</span>
            </div>
            <span className={`text-sm font-semibold ${skip.allows_heavy_waste ? "text-green-600" : "text-orange-600"}`}>
              {skip.allows_heavy_waste ? "Allowed" : "Light Only"}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            selectedSkip === skip.id
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 group-hover:bg-blue-50 group-hover:text-blue-600"
          }`}
        >
          {selectedSkip === skip.id ? "Selected" : "Select This Skip"}
        </button>
      </div>
    </div>
  );
};

export default SkipCard;
