import React, { useState, useMemo } from 'react';
import { Building2, Search, X } from 'lucide-react';
import type { Company } from '../types';
import { COMPANY_VERTICALS } from '../types/index';
import { useCompanies } from '../hooks/useCompanies';

interface CompanySelectorProps {
  selectedCompany: Company | null;
  onCompanySelect: (company: Company) => void;
}

export function CompanySelector({ selectedCompany, onCompanySelect }: CompanySelectorProps) {
  const { companies, loading, error } = useCompanies();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<Set<'distributor' | 'manufacturer'>>(new Set());
  const [selectedVerticals, setSelectedVerticals] = useState<Set<string>>(new Set());

  const handleTypeSelect = (type: 'distributor' | 'manufacturer') => {
    const newTypes = new Set(selectedTypes);
    if (newTypes.has(type)) {
      newTypes.delete(type);
    } else {
      newTypes.add(type);
    }
    setSelectedTypes(newTypes);
  };

  const handleVerticalSelect = (vertical: string) => {
    const newVerticals = new Set(selectedVerticals);
    if (newVerticals.has(vertical)) {
      newVerticals.delete(vertical);
    } else {
      newVerticals.add(vertical);
    }
    setSelectedVerticals(newVerticals);
  };

  const clearFilters = () => {
    setSelectedTypes(new Set());
    setSelectedVerticals(new Set());
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedTypes.size === 0 || selectedTypes.has(company.type);
      const matchesVertical = selectedVerticals.size === 0 || 
        company.verticals.some(v => selectedVerticals.has(v));
      return matchesSearch && matchesType && matchesVertical;
    });
  }, [companies, searchTerm, selectedTypes, selectedVerticals]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600">
        Error loading companies: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-0">
      <div className="p-4 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <div className="relative">
              <select
                value=""
                onChange={(e) => handleTypeSelect(e.target.value as 'distributor' | 'manufacturer')}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">Add Type</option>
                {['distributor', 'manufacturer']
                  .filter(type => !selectedTypes.has(type))
                  .map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))
                }
              </select>
            </div>
            {selectedTypes.size > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.from(selectedTypes).map(type => (
                  <span
                    key={type}
                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-indigo-50 text-indigo-700"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                    <button
                      onClick={() => handleTypeSelect(type)}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Verticals</label>
            <div className="relative">
              <select
                value=""
                onChange={(e) => handleVerticalSelect(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">Add Vertical</option>
                {COMPANY_VERTICALS
                  .filter(vertical => !selectedVerticals.has(vertical))
                  .map(vertical => (
                    <option key={vertical} value={vertical}>{vertical}</option>
                  ))
                }
              </select>
            </div>
            {selectedVerticals.size > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.from(selectedVerticals).map(vertical => (
                  <span
                    key={vertical}
                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-indigo-50 text-indigo-700"
                  >
                    {vertical}
                    <button
                      onClick={() => handleVerticalSelect(vertical)}
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

        {(selectedTypes.size > 0 || selectedVerticals.size > 0) && (
          <div className="flex justify-end">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <div className="overflow-y-auto flex-1 min-h-0">
        <div className="divide-y divide-gray-200">
          {filteredCompanies.map(company => (
            <div
              key={company.id}
              onClick={() => onCompanySelect(company)}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                selectedCompany?.id === company.id ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {company.logo ? (
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center p-1 border">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-6 w-6 text-gray-500" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{company.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      company.type === 'distributor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {company.type.charAt(0).toUpperCase() + company.type.slice(1)}
                    </span>
                  </div>
                  {company.description && (
                    <p className="text-sm text-gray-600 mt-1">{company.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {company.verticals.map(vertical => (
                      <span
                        key={vertical}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {vertical}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No companies found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}