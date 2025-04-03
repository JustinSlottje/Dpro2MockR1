import React, { useState, useEffect } from 'react';
import { Map } from '../components/Map';
import { LocationsStepper } from '../components/LocationsStepper';
import { WelcomeModal } from '../components/WelcomeModal';
import { CLVInfoModal } from '../components/CLVInfoModal';
import { SelectionCards } from '../components/SelectionCards';
import { ROIAnalysis } from '../components/ROIAnalysis';
import { useLocations } from '../hooks/useLocations';
import type { Database } from '../types/supabase';
import type { Company, Play, CustomerLifetimeValue, ProvocationGoal } from '../types';

type Location = Database['public']['Tables']['locations']['Row'];

export function LocationsPage() {
  const { locations, loading, error } = useLocations();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());
  const [showCLVInfoModal, setShowCLVInfoModal] = useState(false);
  const [selectedPlay, setSelectedPlay] = useState<Play | null>(null);
  const [clvData, setCLVData] = useState<CustomerLifetimeValue | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<Set<ProvocationGoal>>(new Set());
  const [selectedPlays, setSelectedPlays] = useState<Play[]>([]);
  const [showROIAnalysis, setShowROIAnalysis] = useState(false);

  const handleTerritoryUpdate = (boundaries: GeoJSON.Feature) => {
    console.log('Territory updated:', boundaries);
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setSelectedLocations(new Set());
  };

  const handlePlaySelect = (plays: Play[]) => {
    setSelectedPlays(plays);
    // Use the last play in the list for visualization
    setSelectedPlay(plays[plays.length - 1]);
    // Only show ROI analysis when confirming final selection
    if (!showROIAnalysis && plays.length === selectedPlays.length) {
      setShowROIAnalysis(true);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg">Loading locations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  const filteredLocations = locations?.filter(location => 
    selectedLocations.has(location.id)
  ) || [];

  return (
    <div className="h-full flex relative">
      <LocationsStepper
        locations={locations || []}
        selectedCompany={selectedCompany}
        onCompanySelect={handleCompanySelect}
        selectedLocations={selectedLocations}
        onSelectedLocationsChange={setSelectedLocations}
        showCLVInfoModal={showCLVInfoModal}
        onShowCLVInfo={() => setShowCLVInfoModal(true)}
        onHideCLVInfo={() => setShowCLVInfoModal(false)}
        onPlaySelect={handlePlaySelect}
        onCLVChange={setCLVData}
      />
      
      <div className="flex-1 relative">
        <Map 
          onTerritoryUpdate={handleTerritoryUpdate}
          locations={filteredLocations}
          selectedPlay={selectedPlay}
        />
        <SelectionCards
          selectedCompany={selectedCompany}
          clvData={clvData}
          selectedLocations={selectedLocations}
          locations={locations || []}
          selectedGoals={selectedGoals}
          selectedPlays={selectedPlays}
        />
        {showROIAnalysis && (
          <ROIAnalysis
            clvData={clvData}
            selectedLocationsCount={selectedLocations.size}
            selectedPlays={selectedPlays}
          />
        )}
        <WelcomeModal isOpen={!selectedCompany} />
        <CLVInfoModal 
          isOpen={showCLVInfoModal}
          onClose={() => setShowCLVInfoModal(false)}
        />
      </div>
    </div>
  );
}