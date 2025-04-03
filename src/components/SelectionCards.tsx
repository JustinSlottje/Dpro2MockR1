import React from 'react';
import { Building2, Calculator, MapPin, Lightbulb } from 'lucide-react';
import type { Company, CustomerLifetimeValue, Location, ProvocationGoal, Play } from '../types';
import { TargetingCard } from './TargetingCard';

interface SelectionCardsProps {
  selectedCompany: Company | null;
  clvData: CustomerLifetimeValue | null;
  selectedLocations: Set<string>;
  locations: Location[];
  selectedGoals?: Set<ProvocationGoal>;
  selectedPlays?: Play[];
}

export function SelectionCards({ 
  selectedCompany, 
  clvData, 
  selectedLocations, 
  locations,
  selectedGoals,
  selectedPlays = []
}: SelectionCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-4 pointer-events-none z-[100]">
      {selectedCompany && (
        <div className="bg-white/95 backdrop-blur shadow-lg rounded-2xl p-4 pointer-events-auto animate-fade-in">
          <div className="flex items-center gap-3">
            {selectedCompany.logo ? (
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1 border">
                <img
                  src={selectedCompany.logo}
                  alt={selectedCompany.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-indigo-600" />
              </div>
            )}
            <div>
              <h3 className="font-medium text-lg">{selectedCompany.name}</h3>
              <span className={`text-sm px-3 py-1 rounded-full ${
                selectedCompany.type === 'distributor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {selectedCompany.type.charAt(0).toUpperCase() + selectedCompany.type.slice(1)}
              </span>
            </div>
          </div>
        </div>
      )}

      {clvData && (
        <div className="bg-white/95 backdrop-blur shadow-lg rounded-2xl p-4 pointer-events-auto animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Customer Lifetime Value</div>
              <div className="font-medium text-lg">
                {formatCurrency(clvData.calculatedValues.lifetimeValue)}
              </div>
              <div className="text-sm text-gray-500">
                {clvData.calculatedValues.customerLifespan.toFixed(1)} year lifespan
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedLocations.size > 0 && (
        <div className="bg-white/95 backdrop-blur shadow-lg rounded-2xl p-4 pointer-events-auto animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Selected Locations</div>
              <div className="font-medium text-lg">
                {selectedLocations.size} locations
              </div>
              <div className="text-sm text-gray-500">
                {Array.from(new Set(locations
                  .filter(l => selectedLocations.has(l.id))
                  .map(l => l.region)
                )).length} regions
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedGoals && selectedGoals.size > 0 && (
        <TargetingCard selectedGoals={selectedGoals} />
      )}

      {selectedPlays && selectedPlays.length > 0 && (
        <div className="bg-white/95 backdrop-blur shadow-lg rounded-2xl p-4 pointer-events-auto animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Selected Plays</div>
              <div className="font-medium text-lg">
                {selectedPlays.length} plays
              </div>
              <div className="space-y-1 mt-2">
                {selectedPlays.map(play => (
                  <div key={play.id} className="text-sm">
                    <div className="font-medium">{play.name}</div>
                    <div className="text-gray-500">
                      {play.audienceSize.toLocaleString()} pros • {play.estimatedRoi}% ROI
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}