import React, { useState } from 'react';
import { Search, Filter, Users, TrendingUp, Activity, ChevronDown, Mail, MessageSquare, Phone, Building2, MapPin, ArrowUpDown, MoreHorizontal } from 'lucide-react';

interface Action {
  id: string;
  type: 'email' | 'sms' | 'call';
  name: string;
  playName: string;
  timestamp: string;
  target: {
    name: string;
    company: string;
    location: string;
  };
  metrics: {
    delivered?: boolean;
    opened?: boolean;
    clicked?: boolean;
    responded?: boolean;
    converted?: boolean;
  };
  outcome: 'positive' | 'neutral' | 'negative';
  notes?: string;
  segment: string;
  conversionRate: number;
  revenue: number;
}

const SAMPLE_ACTIONS: Action[] = [
  {
    id: 'a1',
    type: 'email',
    name: 'Welcome Email',
    playName: 'High-Value Pro Acquisition',
    timestamp: '2025-03-15T10:00:00Z',
    target: {
      name: 'John Smith',
      company: 'ABC Contractors',
      location: 'Phoenix, AZ'
    },
    metrics: {
      delivered: true,
      opened: true,
      clicked: true,
      responded: true,
      converted: false
    },
    outcome: 'positive',
    notes: 'Showed strong interest in premium products',
    segment: 'High-Value Decision Makers',
    conversionRate: 8.5,
    revenue: 25000
  },
  {
    id: 'a2',
    type: 'call',
    name: 'Follow-up Call',
    playName: 'Pro Re-Engagement Campaign',
    timestamp: '2025-03-16T14:30:00Z',
    target: {
      name: 'Sarah Johnson',
      company: 'Premier Plumbing',
      location: 'Seattle, WA'
    },
    metrics: {
      delivered: true,
      responded: true,
      converted: true
    },
    outcome: 'positive',
    notes: 'Scheduled product demo',
    segment: 'Growing Mid-Market',
    conversionRate: 12.3,
    revenue: 18500
  },
  {
    id: 'a3',
    type: 'sms',
    name: 'Special Offer',
    playName: 'Pro Loyalty Enhancement',
    timestamp: '2025-03-17T09:15:00Z',
    target: {
      name: 'Mike Brown',
      company: 'Elite Electric',
      location: 'Denver, CO'
    },
    metrics: {
      delivered: true,
      opened: true,
      responded: false,
      converted: false
    },
    outcome: 'neutral',
    notes: 'Viewed offer but no response',
    segment: 'Enterprise Prospects',
    conversionRate: 5.8,
    revenue: 12000
  }
];

interface SubTab {
  id: string;
  label: string;
  icon: React.ElementType;
}

const SUB_TABS: SubTab[] = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'actions', label: 'Actions', icon: Activity },
  { id: 'targets', label: 'Targets', icon: Users }
];

export function ReportingTab() {
  const [activeSubTab, setActiveSubTab] = useState('actions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPlay, setSelectedPlay] = useState<string>('all');
  const [selectedOutcome, setSelectedOutcome] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Action>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [expandedAction, setExpandedAction] = useState<string | null>(null);

  const handleSort = (field: keyof Action) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredActions = SAMPLE_ACTIONS
    .filter(action => {
      const matchesSearch = 
        action.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        action.target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        action.target.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || action.type === selectedType;
      const matchesPlay = selectedPlay === 'all' || action.playName === selectedPlay;
      const matchesOutcome = selectedOutcome === 'all' || action.outcome === selectedOutcome;
      return matchesSearch && matchesType && matchesPlay && matchesOutcome;
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

  const getActionIcon = (type: 'email' | 'sms' | 'call') => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      case 'call':
        return <Phone className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b">
        <div className="flex gap-6">
          {SUB_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors relative ${
                activeSubTab === tab.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search actions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Types</option>
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="call">Call</option>
        </select>

        <select
          value={selectedPlay}
          onChange={(e) => setSelectedPlay(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Plays</option>
          <option value="High-Value Pro Acquisition">High-Value Pro Acquisition</option>
          <option value="Pro Re-Engagement Campaign">Pro Re-Engagement Campaign</option>
          <option value="Pro Loyalty Enhancement">Pro Loyalty Enhancement</option>
        </select>

        <select
          value={selectedOutcome}
          onChange={(e) => setSelectedOutcome(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Outcomes</option>
          <option value="positive">Positive</option>
          <option value="neutral">Neutral</option>
          <option value="negative">Negative</option>
        </select>
      </div>

      <div className="bg-white rounded-lg border shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center gap-1">
                  Timestamp
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Action
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('playName')}
              >
                <div className="flex items-center gap-1">
                  Play
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Target
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('segment')}
              >
                <div className="flex items-center gap-1">
                  Segment
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('conversionRate')}
              >
                <div className="flex items-center gap-1">
                  Conversion
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('revenue')}
              >
                <div className="flex items-center gap-1">
                  Revenue
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredActions.map(action => (
              <React.Fragment key={action.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(action.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`p-1.5 rounded-lg inline-flex ${
                      action.type === 'email' ? 'bg-blue-100 text-blue-600' :
                      action.type === 'sms' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {getActionIcon(action.type)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{action.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {action.playName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{action.target.name}</div>
                    <div className="text-sm text-gray-500">{action.target.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {action.segment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">
                      {action.conversionRate.toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(action.revenue)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setExpandedAction(expandedAction === action.id ? null : action.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
                {expandedAction === action.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={9} className="px-6 py-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Metrics</h4>
                          <div className="space-y-2">
                            {Object.entries(action.metrics).map(([key, value]) => (
                              <div
                                key={key}
                                className={`flex items-center gap-2 text-sm ${
                                  value ? 'text-green-600' : 'text-gray-400'
                                }`}
                              >
                                <div className={`w-2 h-2 rounded-full ${
                                  value ? 'bg-green-500' : 'bg-gray-300'
                                }`} />
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </div>
                            ))}
                          </div>
                        </div>
                        {action.notes && (
                          <div>
                            <h4 className="font-medium mb-2">Notes</h4>
                            <p className="text-sm text-gray-600">{action.notes}</p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}