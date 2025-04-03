import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, MoreHorizontal, ArrowUpDown, Play, Pause, AlertTriangle, TrendingUp, Users, X, ChevronDown } from 'lucide-react';
import { Map } from '../components/Map';
import { LocationsStepper } from '../components/LocationsStepper';
import { CLVInfoModal } from '../components/CLVInfoModal';
import { SelectionCards } from '../components/SelectionCards';
import { ROIAnalysis } from '../components/ROIAnalysis';
import type { Play as PlayType, Company, CustomerLifetimeValue, ProvocationGoal } from '../types';
import { useLocations } from '../hooks/useLocations';

interface PlayTableRow {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  reach: number;
  budget: number;
  spent: number;
  results: number;
  roi: number;
  startDate: string;
  endDate: string;
}

interface PlaysPageProps {
  onPlaySelect: (playId: string) => void;
}

const SAMPLE_DATA: PlayTableRow[] = [
  {
    id: 'play1',
    name: 'High-Value Pro Acquisition Q1',
    status: 'active',
    reach: 25000,
    budget: 50000,
    spent: 15000,
    results: 125,
    roi: 180,
    startDate: '2025-01-01',
    endDate: '2025-03-31'
  },
  {
    id: 'play2',
    name: 'Pro Re-Engagement Campaign',
    status: 'paused',
    reach: 15000,
    budget: 35000,
    spent: 12000,
    results: 85,
    roi: 150,
    startDate: '2025-02-01',
    endDate: '2025-04-30'
  },
  {
    id: 'play3',
    name: 'Pro Loyalty Enhancement',
    status: 'completed',
    reach: 20000,
    budget: 45000,
    spent: 45000,
    results: 200,
    roi: 220,
    startDate: '2024-10-01',
    endDate: '2024-12-31'
  }
];

export function PlaysPage({ onPlaySelect }: PlaysPageProps) {
  const { locations, loading, error } = useLocations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof PlayTableRow>('startDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());
  const [showCLVInfoModal, setShowCLVInfoModal] = useState(false);
  const [selectedPlay, setSelectedPlay] = useState<PlayType | null>(null);
  const [clvData, setCLVData] = useState<CustomerLifetimeValue | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<Set<ProvocationGoal>>(new Set());
  const [selectedPlays, setSelectedPlays] = useState<PlayType[]>([]);
  const [showPlaysPanel, setShowPlaysPanel] = useState(true);

  useEffect(() => {
    if (showCreateModal) {
      setShowPlaysPanel(false);
    }
  }, [showCreateModal]);

  const handleSort = (field: keyof PlayTableRow) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredData = SAMPLE_DATA
    .filter(row => {
      const matchesSearch = row.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || row.status === selectedStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      if (typeof a[sortField] === 'string') {
        return (a[sortField] as string).localeCompare(b[sortField] as string) * direction;
      }
      return ((a[sortField] as number) - (b[sortField] as number)) * direction;
    });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const StatusBadge = ({ status }: { status: PlayTableRow['status'] }) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      draft: 'bg-gray-100 text-gray-800'
    };

    const icons = {
      active: <Play className="h-4 w-4" />,
      paused: <Pause className="h-4 w-4" />,
      completed: <TrendingUp className="h-4 w-4" />,
      draft: <AlertTriangle className="h-4 w-4" />
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setSelectedLocations(new Set());
  };

  const handlePlaySelect = (plays: PlayType[]) => {
    setSelectedPlays(plays);
    setSelectedPlay(plays[plays.length - 1]);
    setShowCreateModal(false);
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

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-6 border-b bg-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Plays</h1>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create Play
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search plays..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
          </select>

          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <SlidersHorizontal className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {!showCreateModal ? (
          <>
            <Map
              onTerritoryUpdate={() => {}}
              locations={locations || []}
              selectedPlay={selectedPlay}
            />

            <div 
              className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur shadow-xl transform transition-all duration-300 ease-in-out ${
                showPlaysPanel ? 'translate-y-0' : 'translate-y-[calc(100%-48px)]'
              }`}
              style={{ height: '50vh' }}
            >
              <div 
                className="h-12 flex items-center justify-between px-6 cursor-pointer border-b bg-white"
                onClick={() => setShowPlaysPanel(!showPlaysPanel)}
              >
                <div className="flex items-center gap-2">
                  <div className="font-medium">Active Plays</div>
                  <div className="text-sm text-gray-500">({filteredData.length})</div>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                    showPlaysPanel ? 'rotate-180' : ''
                  }`} 
                />
              </div>

              <div className="h-[calc(50vh-48px)] overflow-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('name')}>
                          Play Name
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('reach')}>
                          Reach
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('budget')}>
                          Budget
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('spent')}>
                          Spent
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('results')}>
                          Results
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('roi')}>
                          ROI
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('startDate')}>
                          Duration
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredData.map((row) => (
                      <tr 
                        key={row.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => onPlaySelect(row.id)}
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium">{row.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={row.status} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            {formatNumber(row.reach)}
                          </div>
                        </td>
                        <td className="px-6 py-4">{formatCurrency(row.budget)}</td>
                        <td className="px-6 py-4">{formatCurrency(row.spent)}</td>
                        <td className="px-6 py-4">{formatNumber(row.results)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-green-600">
                            <TrendingUp className="h-4 w-4" />
                            {row.roi}%
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {new Date(row.startDate).toLocaleDateString()} - {new Date(row.endDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle additional actions
                            }}
                          >
                            <MoreHorizontal className="h-5 w-5 text-gray-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex">
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
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>

              <SelectionCards
                selectedCompany={selectedCompany}
                clvData={clvData}
                selectedLocations={selectedLocations}
                locations={locations || []}
                selectedGoals={selectedGoals}
                selectedPlays={selectedPlays}
              />
            </div>

            <CLVInfoModal 
              isOpen={showCLVInfoModal}
              onClose={() => setShowCLVInfoModal(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}