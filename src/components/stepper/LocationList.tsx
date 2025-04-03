import React from 'react';
import type { Location } from '../../types';

interface LocationListProps {
  locations: Location[];
  selectedLocations: Set<string>;
  onLocationToggle: (id: string) => void;
}

export function LocationList({
  locations,
  selectedLocations,
  onLocationToggle
}: LocationListProps) {
  return (
    <div className="overflow-y-auto flex-1 min-h-0">
      <div className="divide-y divide-gray-200">
        {locations.map((location) => (
          <div
            key={location.id}
            className="p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => onLocationToggle(location.id)}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={selectedLocations.has(location.id)}
                onChange={() => onLocationToggle(location.id)}
                className="mt-1 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                onClick={(e) => e.stopPropagation()}
              />
              <div>
                <h3 className="font-medium">{location.name}</h3>
                <p className="text-sm text-gray-600">
                  {location.address}
                  {location.address2 && `, ${location.address2}`}
                </p>
                <p className="text-sm text-gray-600">
                  {location.city}, {location.state} {location.zipcode}
                </p>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Manager: {location.manager}</p>
                  <p>Phone: {location.phone}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}