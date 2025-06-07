import React from "react";
import { skipData } from "../data";

interface BottomSummaryProps {
  selectedSkip: number | null;
  calculateFinalPrice: (price: number, vat: number) => number;
}

const BottomSummary: React.FC<BottomSummaryProps> = ({ selectedSkip, calculateFinalPrice }) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="mb-4 sm:mb-0">
            {skipData.find((skip) => skip.id === selectedSkip) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {skipData.find((skip) => skip.id === selectedSkip)?.size} Yard Skip
                </h3>
                <p className="text-gray-600">
                  £
                  {calculateFinalPrice(
                    skipData.find((skip) => skip.id === selectedSkip)?.price_before_vat || 0,
                    skipData.find((skip) => skip.id === selectedSkip)?.vat || 0
                  )}{" "}
                  • 14 day hire
                </p>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Continue →
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 mt-6 text-center max-w-4xl mx-auto">
        Imagery and information shown throughout this website may not reflect the exact shape or size specification,
        colours may vary, options and/or accessories may be featured at additional cost.
      </p>
    </>
  );
};

export default BottomSummary;
