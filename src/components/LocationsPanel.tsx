import React, { useState } from 'react';
import { X, Search, Filter, CheckCircle2 } from 'lucide-react';
import { Location } from '../types';

interface LocationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  locations: Location[];
  onLocationSelect: (location: Location) => void;
  selectedLocation: Location | null;
}

export function LocationsPanel({ isOpen, onClose, locations, onLocationSelect, selectedLocation }: LocationsPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());

  // Get unique regions and groups
  const regions = Array.from(new Set(locations.map(l => l.region))).sort();
  const groups = Array.from(new Set(locations.map(l => l.group_number))).sort();

  // Filter locations based on search term and filters
  const filteredLocations = locations.filter(location => {
    const matchesSearch = 
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion = !selectedRegion || location.region === selectedRegion;
    const matchesGroup = !selectedGroup || location.group_number === selectedGroup;

    return matchesSearch && matchesRegion && matchesGroup;
  });

  const handleLocationToggle = (locationId: string) => {
    setSelectedLocations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(locationId)) {
        newSet.delete(locationId);
      } else {
        newSet.add(locationId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedLocations.size === filteredLocations.length) {
      setSelectedLocations(new Set());
    } else {
      setSelectedLocations(new Set(filteredLocations.map(l => l.id)));
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Locations</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 border-b space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>

            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Groups</option>
              {groups.map(group => (
                <option key={group} value={group}>Group {group}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {selectedLocations.size} selected
            </span>
            <button
              onClick={handleSelectAll}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {selectedLocations.size === filteredLocations.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-gray-200">
            {filteredLocations.map((location) => (
              <div
                key={location.id}
                className={`p-4 hover:bg-gray-50 ${
                  selectedLocation?.id === location.id ? 'bg-indigo-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{location.name}</h3>
                    <p className="text-sm text-gray-600">
                      {location.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      {location.city}, {location.state} {location.zipcode}
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Manager: {location.manager}</p>
                      <p>Phone: {location.phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLocationToggle(location.id)}
                    className={`p-2 rounded-full transition-colors ${
                      selectedLocations.has(location.id)
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <p className="text-sm text-gray-500">
            Showing {filteredLocations.length} of {locations.length} locations
          </p>
        </div>
      </div>
    </div>
  );
}