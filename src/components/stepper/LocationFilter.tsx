import React from 'react';
import { MapPin, X } from 'lucide-react';

interface LocationFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedRegions: Set<string>;
  onRegionsChange: (regions: Set<string>) => void;
  selectedGroups: Set<string>;
  onGroupsChange: (groups: Set<string>) => void;
  regions: string[];
  groups: string[];
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
}

export function LocationFilter({
  searchTerm,
  onSearchChange,
  selectedRegions,
  onRegionsChange,
  selectedGroups,
  onGroupsChange,
  regions,
  groups,
  selectedCount,
  totalCount,
  onSelectAll
}: LocationFilterProps) {
  const handleRegionSelect = (region: string) => {
    const newRegions = new Set(selectedRegions);
    if (newRegions.has(region)) {
      newRegions.delete(region);
    } else {
      newRegions.add(region);
    }
    onRegionsChange(newRegions);
  };

  const handleGroupSelect = (group: string) => {
    const newGroups = new Set(selectedGroups);
    if (newGroups.has(group)) {
      newGroups.delete(group);
    } else {
      newGroups.add(group);
    }
    onGroupsChange(newGroups);
  };

  const clearFilters = () => {
    onRegionsChange(new Set());
    onGroupsChange(new Set());
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Regions</label>
            <div className="relative">
              <select
                value=""
                onChange={(e) => handleRegionSelect(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">Add Region</option>
                {regions
                  .filter(region => !selectedRegions.has(region))
                  .map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))
                }
              </select>
            </div>
            {selectedRegions.size > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.from(selectedRegions).map(region => (
                  <span
                    key={region}
                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-indigo-50 text-indigo-700"
                  >
                    {region}
                    <button
                      onClick={() => handleRegionSelect(region)}
                      className="ml-1 p-1 hover:bg-indigo-100 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Groups</label>
            <div className="relative">
              <select
                value=""
                onChange={(e) => handleGroupSelect(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">Add Group</option>
                {groups
                  .filter(group => !selectedGroups.has(group))
                  .map(group => (
                    <option key={group} value={group}>Group {group}</option>
                  ))
                }
              </select>
            </div>
            {selectedGroups.size > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.from(selectedGroups).map(group => (
                  <span
                    key={group}
                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-indigo-50 text-indigo-700"
                  >
                    Group {group}
                    <button
                      onClick={() => handleGroupSelect(group)}
                      className="ml-1 p-1 hover:bg-indigo-100 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {selectedCount} selected
            </span>
            {(selectedRegions.size > 0 || selectedGroups.size > 0) && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear filters
              </button>
            )}
          </div>
          <button
            onClick={onSelectAll}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {selectedCount === totalCount ? 'Deselect All' : 'Select All'}
          </button>
        </div>
      </div>
    </div>
  );
}