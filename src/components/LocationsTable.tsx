import React, { useState } from 'react';
import { Location } from '../types';
import { Search, ArrowUpDown } from 'lucide-react';

interface LocationsTableProps {
  locations: Location[];
  onLocationSelect?: (location: Location) => void;
}

type SortField = 'name' | 'groupName' | 'city' | 'state' | 'region';
type SortDirection = 'asc' | 'desc';

export function LocationsTable({ locations, onLocationSelect }: LocationsTableProps) {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedLocations = locations
    .filter(location => 
      location.name.toLowerCase().includes(search.toLowerCase()) ||
      location.city.toLowerCase().includes(search.toLowerCase()) ||
      location.state.toLowerCase().includes(search.toLowerCase()) ||
      location.region.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      return a[sortField] > b[sortField] ? direction : -direction;
    });

  const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
    <th
      className="px-4 py-2 text-left cursor-pointer hover:bg-gray-50"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <ArrowUpDown className="h-4 w-4" />
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search locations..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <SortHeader field="name" label="Location Name" />
              <SortHeader field="groupName" label="Group" />
              <SortHeader field="city" label="City" />
              <SortHeader field="state" label="State" />
              <SortHeader field="region" label="Region" />
              <th className="px-4 py-2 text-left">Manager</th>
              <th className="px-4 py-2 text-left">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAndSortedLocations.map((location) => (
              <tr
                key={location.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onLocationSelect?.(location)}
              >
                <td className="px-4 py-2">{location.name}</td>
                <td className="px-4 py-2">{location.groupName}</td>
                <td className="px-4 py-2">{location.city}</td>
                <td className="px-4 py-2">{location.state}</td>
                <td className="px-4 py-2">{location.region}</td>
                <td className="px-4 py-2">{location.manager}</td>
                <td className="px-4 py-2">
                  <div>
                    <div>{location.phone}</div>
                    <div className="text-sm text-gray-500">{location.fax}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t">
        <p className="text-sm text-gray-500">
          Showing {filteredAndSortedLocations.length} of {locations.length} locations
        </p>
      </div>
    </div>
  );
}