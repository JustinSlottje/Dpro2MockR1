import React from 'react';
import { Calculator, TrendingUp, Users } from 'lucide-react';

interface CLVInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CLVInfoModal({ isOpen, onClose }: CLVInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10 flex items-center justify-center p-8"
      onClick={onClose}
    >
      <div 
        className="bg-white/95 backdrop-blur rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center p-6 border-b bg-gradient-to-r from-cyan-500 to-teal-500">
          <div className="flex items-center gap-3">
            <Calculator className="h-6 w-6 text-white" />
            <h2 className="text-2xl font-semibold text-white">Customer Lifetime Value (CLV)</h2>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-100 text-cyan-700 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-700">What is Customer Lifetime Value (CLV)?</h3>
                <p className="text-gray-600 mt-1">
                  CLV measures the total revenue a customer is expected to generate over their entire relationship with a business.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-teal-100 text-teal-700 rounded-lg">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-teal-700">Why is CLV Important?</h3>
                <p className="text-gray-600 mt-1">
                  CLV helps us understand our ideal customer. Allowing focus on sales and marketing strategies to reduce customer acquisition cost, encourage repeat purchases and enhance long-term customer relationships.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-100 text-indigo-700 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-700">New Customers vs. Reactivation of Previous?</h3>
                <p className="text-gray-600 mt-1">
                  All customers are welcome, but when considering return on investment it is often much less expensive to <span className="font-semibold">Reactivate</span> a previous customer than it is to convert new.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Example Calculation</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Calculate Average Annual Sales</h4>
                <div className="bg-white rounded-lg p-4 border">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-600">Average Order Value</div>
                    <div className="font-medium text-right">$472.00</div>
                    <div className="text-gray-600">Order Frequency (Annual)</div>
                    <div className="font-medium text-right">24</div>
                    <div className="text-gray-600 font-medium pt-2 border-t mt-2">Average Annual Sales</div>
                    <div className="font-medium text-right pt-2 border-t mt-2">$11,328.00</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Calculate Average Lifespan</h4>
                <div className="bg-white rounded-lg p-4 border">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-600">Annual Churn Rate</div>
                    <div className="font-medium text-right">20%</div>
                    <div className="text-gray-600 font-medium pt-2 border-t mt-2">Avg. Customer Lifespan</div>
                    <div className="font-medium text-right pt-2 border-t mt-2">5.00 years</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-2">Customer Lifetime Value (CLV)</h4>
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg p-4 text-white">
                <div className="grid grid-cols-2 gap-2">
                  <div>Average Annual Sales</div>
                  <div className="text-right font-medium">$11,328.00</div>
                  <div>Avg. Customer Lifespan</div>
                  <div className="text-right font-medium">5.0 years</div>
                  <div className="font-medium pt-2 border-t border-white/20 mt-2">Customer Lifetime Value</div>
                  <div className="text-right font-medium pt-2 border-t border-white/20 mt-2">$56,640.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}