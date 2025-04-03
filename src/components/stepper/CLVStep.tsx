import React, { useState, useEffect } from 'react';
import { DollarSign, Calculator, HelpCircle, Percent } from 'lucide-react';
import type { CustomerLifetimeValue } from '../../types';
import { StepHeader } from './StepHeader';

interface CLVStepProps {
  clvData: CustomerLifetimeValue | null;
  onCLVChange: (clv: CustomerLifetimeValue) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onConfirm: () => void;
  onShowInfo: () => void;
}

export function CLVStep({
  clvData,
  onCLVChange,
  isExpanded,
  onToggleExpand,
  onConfirm,
  onShowInfo
}: CLVStepProps) {
  const [formData, setFormData] = useState<{
    averageOrderValue: string;
    orderFrequency: string;
    annualChurnRate: string;
    grossMargin: string;
    sqlToCustomerRate: string;
  }>({
    averageOrderValue: clvData?.averageOrderValue.toString() || '',
    orderFrequency: clvData?.orderFrequency.toString() || '',
    annualChurnRate: clvData?.annualChurnRate.toString() || '',
    grossMargin: clvData?.grossMargin.toString() || '',
    sqlToCustomerRate: clvData?.sqlToCustomerRate.toString() || ''
  });

  const calculateCLV = () => {
    const orderValue = parseFloat(formData.averageOrderValue);
    const frequency = parseFloat(formData.orderFrequency);
    const churnRate = parseFloat(formData.annualChurnRate) / 100;
    const grossMargin = parseFloat(formData.grossMargin) / 100;
    const sqlToCustomerRate = parseFloat(formData.sqlToCustomerRate) / 100;

    if (isNaN(orderValue) || isNaN(frequency) || isNaN(churnRate) || 
        isNaN(grossMargin) || isNaN(sqlToCustomerRate)) return null;

    const annualSales = orderValue * frequency;
    const customerLifespan = 1 / churnRate;
    const lifetimeValue = annualSales * customerLifespan * grossMargin;

    return {
      averageOrderValue: orderValue,
      orderFrequency: frequency,
      annualChurnRate: churnRate * 100,
      grossMargin: grossMargin * 100,
      sqlToCustomerRate: sqlToCustomerRate * 100,
      calculatedValues: {
        annualSales,
        customerLifespan,
        lifetimeValue
      }
    };
  };

  useEffect(() => {
    const calculated = calculateCLV();
    if (calculated) {
      onCLVChange(calculated);
    }
  }, [formData]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isValid = () => {
    const calculated = calculateCLV();
    return calculated !== null;
  };

  const handleConfirm = () => {
    if (isValid()) {
      onConfirm();
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="border-b">
      <StepHeader
        icon={Calculator}
        title="Step 2: Customer Lifetime Value"
        isExpanded={isExpanded}
        isCompleted={!!clvData}
        onClick={onToggleExpand}
      />

      {isExpanded && (
        <div className="flex flex-col">
          <div className="p-4 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Calculate the lifetime value of your average customer
                </p>
                <button
                  onClick={onShowInfo}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                  title="Learn more about CLV"
                >
                  <HelpCircle className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Average Order Value
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.averageOrderValue}
                      onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Frequency (orders per year)
                  </label>
                  <input
                    type="number"
                    value={formData.orderFrequency}
                    onChange={(e) => handleInputChange('orderFrequency', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Churn Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.annualChurnRate}
                      onChange={(e) => handleInputChange('annualChurnRate', e.target.value)}
                      className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="0"
                      min="0"
                      max="100"
                      step="1"
                    />
                    <Percent className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gross Margin (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.grossMargin}
                      onChange={(e) => handleInputChange('grossMargin', e.target.value)}
                      className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="0"
                      min="0"
                      max="100"
                      step="1"
                    />
                    <Percent className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SQL to Customer Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.sqlToCustomerRate}
                      onChange={(e) => handleInputChange('sqlToCustomerRate', e.target.value)}
                      className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="0"
                      min="0"
                      max="100"
                      step="1"
                    />
                    <Percent className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {clvData && (
                <div className="space-y-4">
                  <div className="h-px bg-gray-200"></div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Annual Sales</div>
                      <div className="text-xl font-semibold mt-1">
                        {formatCurrency(clvData.calculatedValues.annualSales)}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Based on order value and frequency
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Customer Lifespan</div>
                      <div className="text-xl font-semibold mt-1">
                        {clvData.calculatedValues.customerLifespan.toFixed(1)} years
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Based on churn rate
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-50 rounded-lg col-span-2">
                      <div className="text-sm text-indigo-600">Customer Lifetime Value</div>
                      <div className="text-2xl font-semibold mt-1 text-indigo-700">
                        {formatCurrency(clvData.calculatedValues.lifetimeValue)}
                      </div>
                      <div className="text-sm text-indigo-500 mt-1">
                        Total expected revenue per customer
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t bg-white mt-auto">
            <div className="flex justify-end">
              <button
                onClick={handleConfirm}
                disabled={!isValid()}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isValid()
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}