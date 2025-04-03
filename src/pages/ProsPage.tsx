import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, MoreHorizontal, ArrowUpDown, Building2, MapPin, Users, Briefcase, Package, Activity, Database, Send, Target, Zap } from 'lucide-react';

interface Pro {
  id: string;
  companyName: string;
  address: string;
  city: string;
  state: string;
  vertical: string;
  annualValue: number;
  employees: number;
  products: string[];
  scores: {
    dataDensity: number;
    deliverability: number;
    targeting?: number;
    activity: number;
  };
  inPlay: boolean;
}

const SAMPLE_DATA: Pro[] = [
  {
    id: 'pro1',
    companyName: 'ABC Contractors',
    address: '123 Main St',
    city: 'Phoenix',
    state: 'AZ',
    vertical: 'HVAC',
    annualValue: 250000,
    employees: 25,
    products: ['Commercial HVAC', 'Residential HVAC', 'Maintenance'],
    scores: {
      dataDensity: 85,
      deliverability: 92,
      targeting: 88,
      activity: 76
    },
    inPlay: true
  },
  {
    id: 'pro2',
    companyName: 'Premier Plumbing',
    address: '456 Oak Ave',
    city: 'Seattle',
    state: 'WA',
    vertical: 'Plumbing',
    annualValue: 180000,
    employees: 15,
    products: ['Commercial Plumbing', 'Emergency Services'],
    scores: {
      dataDensity: 72,
      deliverability: 88,
      activity: 45
    },
    inPlay: false
  },
  {
    id: 'pro3',
    companyName: 'Elite Electric',
    address: '789 Pine Rd',
    city: 'Denver',
    state: 'CO',
    vertical: 'Electrical',
    annualValue: 320000,
    employees: 30,
    products: ['Commercial Electric', 'Industrial', 'Solar'],
    scores: {
      dataDensity: 94,
      deliverability: 96,
      targeting: 91,
      activity: 89
    },
    inPlay: true
  }
];

export function ProsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVertical, setSelectedVertical] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Pro>('companyName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Pro) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredData = SAMPLE_DATA
    .filter(pro => {
      const matchesSearch = 
        pro.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pro.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pro.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesVertical = selectedVertical === 'all' || pro.vertical === selectedVertical;
      return matchesSearch && matchesVertical;
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

  const ScoreBadge = ({ score, type }: { score: number; type: string }) => {
    let color = '';
    if (score >= 90) color = 'bg-green-100 text-green-800';
    else if (score >= 70) color = 'bg-blue-100 text-blue-800';
    else if (score >= 50) color = 'bg-yellow-100 text-yellow-800';
    else color = 'bg-red-100 text-red-800';

    const icons = {
      dataDensity: <Database className="h-4 w-4" />,
      deliverability: <Send className="h-4 w-4" />,
      targeting: <Target className="h-4 w-4" />,
      activity: <Activity className="h-4 w-4" />
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${color}`}>
        {icons[type as keyof typeof icons]}
        {score}
      </span>
    );
  };

  return (
    <div className="flex-1 bg-gray-50 flex flex-col">
      <div className="p-6 border-b bg-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Pros</h1>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Add Pro
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search pros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <select
            value={selectedVertical}
            onChange={(e) => setSelectedVertical(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Verticals</option>
            <option value="HVAC">HVAC</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
          </select>

          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <SlidersHorizontal className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('companyName')}>
                    Company
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('vertical')}>
                    Vertical
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('annualValue')}>
                    Value
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('employees')}>
                    Employees
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scores
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((pro) => (
                <tr key={pro.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium">{pro.companyName}</div>
                        {pro.inPlay && (
                          <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">
                            In Play
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <div>{pro.address}</div>
                        <div className="text-sm text-gray-500">{pro.city}, {pro.state}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {pro.vertical}
                    </span>
                  </td>
                  <td className="px-6 py-4">{formatCurrency(pro.annualValue)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-gray-400" />
                      {pro.employees}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {pro.products.map((product, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <ScoreBadge score={pro.scores.dataDensity} type="dataDensity" />
                      <ScoreBadge score={pro.scores.deliverability} type="deliverability" />
                      {pro.scores.targeting && (
                        <ScoreBadge score={pro.scores.targeting} type="targeting" />
                      )}
                      <ScoreBadge score={pro.scores.activity} type="activity" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="h-5 w-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}