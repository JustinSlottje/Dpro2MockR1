import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import type { Location } from '../../types';
import { StepHeader } from './StepHeader';
import { LocationFilter } from './LocationFilter';
import { LocationList } from './LocationList';

interface LocationStepProps {
  locations: Location[];
  selectedLocations: Set<string>;
  onSelectedLocationsChange: (locations: Set<string>) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onConfirm: () => void;
}

export function LocationStep({
  locations,
  selectedLocations,
  onSelectedLocationsChange,
  isExpanded,
  onToggleExpand,
  onConfirm
}: LocationStepProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<Set<string>>(new Set());
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());

  const regions = Array.from(new Set(locations.map(l => l.region))).sort();
  const groups = Array.from(new Set(locations.map(l => l.group_number))).sort();

  const filteredLocations = locations.filter(location => {
    const matchesSearch = 
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion = selectedRegions.size === 0 || selectedRegions.has(location.region);
    const matchesGroup = selectedGroups.size === 0 || selectedGroups.has(location.group_number);

    return matchesSearch && matchesRegion && matchesGroup;
  });

  const handleSelectAll = () => {
    if (selectedLocations.size === filteredLocations.length) {
      onSelectedLocationsChange(new Set());
    } else {
      onSelectedLocationsChange(new Set(filteredLocations.map(l => l.id)));
    }
  };

  const handleConfirm = () => {
    onToggleExpand();
    onConfirm();
  };

  return (
    <div className="border-b">
      <StepHeader
        icon={MapPin}
        title="Step 2: Locations"
        isExpanded={isExpanded}
        isCompleted={selectedLocations.size > 0}
        completedContent={
          <div className="mt-2 text-sm text-gray-600">
            {selectedLocations.size} locations selected
          </div>
        }
        onClick={onToggleExpand}
      />

      {isExpanded && (
        <div className="flex flex-col" style={{ height: 'calc(100vh - 300px)' }}>
          <LocationFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedRegions={selectedRegions}
            onRegionsChange={setSelectedRegions}
            selectedGroups={selectedGroups}
            onGroupsChange={setSelectedGroups}
            regions={regions}
            groups={groups}
            selectedCount={selectedLocations.size}
            totalCount={filteredLocations.length}
            onSelectAll={handleSelectAll}
          />

          <div className="flex-1 overflow-y-auto">
            <LocationList
              locations={filteredLocations}
              selectedLocations={selectedLocations}
              onLocationToggle={(id) => {
                const newSelected = new Set(selectedLocations);
                if (newSelected.has(id)) {
                  newSelected.delete(id);
                } else {
                  newSelected.add(id);
                }
                onSelectedLocationsChange(newSelected);
              }}
            />
          </div>

          <div className="sticky bottom-0 p-4 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {filteredLocations.length} of {locations.length} locations
              </p>
              <button
                onClick={handleConfirm}
                disabled={selectedLocations.size === 0}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedLocations.size > 0
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