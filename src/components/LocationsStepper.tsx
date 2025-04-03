import React, { useState, useEffect } from 'react';
import { Building2, Calculator, MapPin, Lightbulb } from 'lucide-react';
import type { Company, CustomerLifetimeValue, Location, ProvocationGoal, Play } from '../types';
import { CompanyStep } from './stepper/CompanyStep';
import { CLVStep } from './stepper/CLVStep';
import { LocationStep } from './stepper/LocationStep';
import { ProTargeting } from './ProTargeting';
import { PlaySelection } from './PlaySelection';
import { SAMPLE_PLAYS } from '../data/samplePlays';

interface LocationsStepperProps {
  locations: Location[];
  selectedCompany: Company | null;
  onCompanySelect: (company: Company) => void;
  selectedLocations: Set<string>;
  onSelectedLocationsChange: (locations: Set<string>) => void;
  showCLVInfoModal: boolean;
  onShowCLVInfo: () => void;
  onHideCLVInfo: () => void;
  onPlaySelect: (plays: Play[]) => void;
  onCLVChange: (data: CustomerLifetimeValue | null) => void;
}

export function LocationsStepper({
  locations,
  selectedCompany,
  onCompanySelect,
  selectedLocations,
  onSelectedLocationsChange,
  showCLVInfoModal,
  onShowCLVInfo,
  onHideCLVInfo,
  onPlaySelect,
  onCLVChange
}: LocationsStepperProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isCompanySectionExpanded, setIsCompanySectionExpanded] = useState(true);
  const [isCLVSectionExpanded, setIsCLVSectionExpanded] = useState(false);
  const [isLocationSectionExpanded, setIsLocationSectionExpanded] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<Set<ProvocationGoal>>(new Set());
  const [clvData, setCLVData] = useState<CustomerLifetimeValue | null>(null);

  // Update parent CLV data when local state changes
  useEffect(() => {
    onCLVChange(clvData);
  }, [clvData, onCLVChange]);

  // Show CLV modal automatically when step 2 becomes active
  useEffect(() => {
    if (currentStep === 2 && isCLVSectionExpanded) {
      onShowCLVInfo();
    } else {
      onHideCLVInfo();
    }
  }, [currentStep, isCLVSectionExpanded, onShowCLVInfo, onHideCLVInfo]);

  // Filter plays based on selected goals
  const filteredPlays = SAMPLE_PLAYS.filter(play => 
    selectedGoals.size === 0 || play.provocationGoals.some(goal => selectedGoals.has(goal))
  );

  const handleCompanySelect = (company: Company) => {
    onCompanySelect(company);
    setIsCompanySectionExpanded(false);
    setIsCLVSectionExpanded(true);
    setCurrentStep(2);
  };

  const handleCLVConfirm = () => {
    if (clvData) {
      setIsCLVSectionExpanded(false);
      setIsLocationSectionExpanded(true);
      setCurrentStep(3);
    }
  };

  const handleCLVToggle = () => {
    const newIsExpanded = !isCLVSectionExpanded;
    setIsCLVSectionExpanded(newIsExpanded);
  };

  const handleLocationConfirm = () => {
    if (selectedLocations.size > 0) {
      setIsLocationSectionExpanded(false);
      setCurrentStep(4);
    }
  };

  const handleGoalsConfirm = () => {
    if (selectedGoals.size > 0) {
      setCurrentStep(5);
    }
  };

  return (
    <div className="w-96 bg-white border-r flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <CompanyStep
          selectedCompany={selectedCompany}
          onCompanySelect={handleCompanySelect}
          isExpanded={isCompanySectionExpanded}
          onToggleExpand={() => setIsCompanySectionExpanded(!isCompanySectionExpanded)}
        />

        {selectedCompany && currentStep >= 2 && (
          <CLVStep
            clvData={clvData}
            onCLVChange={setCLVData}
            isExpanded={isCLVSectionExpanded}
            onToggleExpand={handleCLVToggle}
            onConfirm={handleCLVConfirm}
            onShowInfo={onShowCLVInfo}
          />
        )}

        {selectedCompany && currentStep >= 3 && (
          <LocationStep
            locations={locations}
            selectedLocations={selectedLocations}
            onSelectedLocationsChange={onSelectedLocationsChange}
            isExpanded={isLocationSectionExpanded}
            onToggleExpand={() => setIsLocationSectionExpanded(!isLocationSectionExpanded)}
            onConfirm={handleLocationConfirm}
          />
        )}

        {currentStep >= 4 && (
          <ProTargeting
            selectedGoals={selectedGoals}
            onGoalsChange={setSelectedGoals}
            onConfirm={handleGoalsConfirm}
          />
        )}

        {currentStep >= 5 && (
          <PlaySelection
            plays={filteredPlays}
            onPlaySelect={onPlaySelect}
          />
        )}
      </div>
    </div>
  );
}