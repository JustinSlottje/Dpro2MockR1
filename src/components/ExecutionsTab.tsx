import React, { useState } from 'react';
import { Filter, Mail, MessageSquare, Phone, TrendingUp, Users, Calendar, ChevronDown, AlertTriangle } from 'lucide-react';

interface Execution {
  id: string;
  activityId: string;
  activityName: string;
  type: 'email' | 'sms' | 'call';
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  metrics: {
    sent?: number;
    delivered?: number;
    opened?: number;
    clicked?: number;
    responded?: number;
    converted?: number;
  };
  segment: {
    name: string;
    size: number;
    criteria: string[];
  };
  alerts?: {
    type: 'warning' | 'success' | 'info';
    message: string;
  }[];
}

const SAMPLE_EXECUTIONS: Execution[] = [
  {
    id: 'exec1',
    activityId: 'p1a1',
    activityName: 'Welcome Email',
    type: 'email',
    status: 'completed',
    timestamp: '2025-03-20T10:00:00Z',
    metrics: {
      sent: 5000,
      delivered: 4850,
      opened: 2180,
      clicked: 890,
      converted: 156
    },
    segment: {
      name: 'High-Value Prospects',
      size: 5000,
      criteria: ['Revenue > $500k', 'Purchase Frequency > 2x/month']
    },
    alerts: [
      {
        type: 'success',
        message: 'Open rate 15% above average'
      }
    ]
  },
  {
    id: 'exec2',
    activityId: 'p1a2',
    activityName: 'Follow-up Call',
    type: 'call',
    status: 'completed',
    timestamp: '2025-03-19T14:30:00Z',
    metrics: {
      sent: 890,
      responded: 445,
      converted: 89
    },
    segment: {
      name: 'Email Engagers',
      size: 890,
      criteria: ['Opened Welcome Email', 'Clicked CTA']
    },
    alerts: [
      {
        type: 'warning',
        message: 'Response rate below target'
      }
    ]
  },
  {
    id: 'exec3',
    activityId: 'p1a3',
    activityName: 'Special Offer SMS',
    type: 'sms',
    status: 'completed',
    timestamp: '2025-03-18T09:00:00Z',
    metrics: {
      sent: 445,
      delivered: 440,
      responded: 125,
      converted: 45
    },
    segment: {
      name: 'Call Respondents',
      size: 445,
      criteria: ['Responded to Call', 'Interest Level: High']
    }
  },
  {
    id: 'exec4',
    activityId: 'p1a4',
    activityName: 'Product Demo Invitation',
    type: 'email',
    status: 'completed',
    timestamp: '2025-03-17T15:45:00Z',
    metrics: {
      sent: 125,
      delivered: 125,
      opened: 98,
      clicked: 67,
      converted: 34
    },
    segment: {
      name: 'SMS Responders',
      size: 125,
      criteria: ['Responded to SMS', 'Product Interest: High']
    },
    alerts: [
      {
        type: 'success',
        message: 'High conversion rate detected'
      }
    ]
  }
];

export function ExecutionsTab() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [timeframe, setTimeframe] = useState<string>('7d');
  const [expandedExecution, setExpandedExecution] = useState<string | null>(null);

  const ActivityIcon = {
    email: Mail,
    sms: MessageSquare,
    call: Phone
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const calculateConversionRate = (metrics: Execution['metrics']) => {
    if (!metrics.converted || !metrics.sent) return 0;
    return (metrics.converted / metrics.sent) * 100;
  };

  const filteredExecutions = SAMPLE_EXECUTIONS.filter(execution => {
    const matchesStatus = selectedStatus === 'all' || execution.status === selectedStatus;
    const matchesType = selectedType === 'all' || execution.type === selectedType;
    return matchesStatus && matchesType;
  });

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-medium">Execution History</h2>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="call">Call</option>
            </select>
          </div>
        </div>
        
        <div className="divide-y">
          {filteredExecutions.map(execution => {
            const Icon = ActivityIcon[execution.type];
            const isExpanded = expandedExecution === execution.id;
            const conversionRate = calculateConversionRate(execution.metrics);

            return (
              <div key={execution.id} className="p-4">
                <div 
                  className="flex items-start gap-4 cursor-pointer"
                  onClick={() => setExpandedExecution(isExpanded ? null : execution.id)}
                >
                  <div className={`p-2 rounded-lg ${
                    execution.type === 'email' ? 'bg-blue-100 text-blue-600' :
                    execution.type === 'sms' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{execution.activityName}</h3>
                        <div className="text-sm text-gray-500 mt-1">
                          {new Date(execution.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-2.5 py-1 rounded-full text-sm font-medium ${
                          execution.status === 'completed' ? 'bg-green-100 text-green-800' :
                          execution.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {execution.status.charAt(0).toUpperCase() + execution.status.slice(1)}
                        </span>
                        <ChevronDown 
                          className={`h-5 w-5 text-gray-400 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>Segment: {execution.segment.name}</span>
                        <span>•</span>
                        <span>{formatNumber(execution.segment.size)} targets</span>
                      </div>
                    </div>

                    {execution.alerts && (
                      <div className="mt-3 space-y-2">
                        {execution.alerts.map((alert, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-2 text-sm rounded-lg px-3 py-1.5 ${
                              alert.type === 'success' ? 'bg-green-50 text-green-700' :
                              alert.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                              'bg-blue-50 text-blue-700'
                            }`}
                          >
                            <AlertTriangle className="h-4 w-4" />
                            {alert.message}
                          </div>
                        ))}
                      </div>
                    )}

                    {isExpanded && (
                      <div className="mt-6 space-y-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Segment Criteria</h4>
                          <div className="flex flex-wrap gap-2">
                            {execution.segment.criteria.map((criterion, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                              >
                                {criterion}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Performance Metrics</h4>
                          <div className="grid grid-cols-6 gap-4">
                            {execution.metrics.sent && (
                              <div>
                                <div className="text-sm text-gray-600">Sent</div>
                                <div className="font-medium">{formatNumber(execution.metrics.sent)}</div>
                              </div>
                            )}
                            {execution.metrics.delivered && (
                              <div>
                                <div className="text-sm text-gray-600">Delivered</div>
                                <div className="font-medium">{formatNumber(execution.metrics.delivered)}</div>
                              </div>
                            )}
                            {execution.metrics.opened && (
                              <div>
                                <div className="text-sm text-gray-600">Opened</div>
                                <div className="font-medium">{formatNumber(execution.metrics.opened)}</div>
                              </div>
                            )}
                            {execution.metrics.clicked && (
                              <div>
                                <div className="text-sm text-gray-600">Clicked</div>
                                <div className="font-medium">{formatNumber(execution.metrics.clicked)}</div>
                              </div>
                            )}
                            {execution.metrics.responded && (
                              <div>
                                <div className="text-sm text-gray-600">Responded</div>
                                <div className="font-medium">{formatNumber(execution.metrics.responded)}</div>
                              </div>
                            )}
                            {execution.metrics.converted && (
                              <div>
                                <div className="text-sm text-gray-600">Converted</div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-green-600">
                                    {formatNumber(execution.metrics.converted)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    ({conversionRate.toFixed(1)}%)
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          {execution.metrics.delivered && (
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${(execution.metrics.delivered / execution.metrics.sent!) * 100}%` }}
                            />
                          )}
                          {execution.metrics.opened && (
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${(execution.metrics.opened / execution.metrics.sent!) * 100}%` }}
                            />
                          )}
                          {execution.metrics.converted && (
                            <div
                              className="h-full bg-indigo-500"
                              style={{ width: `${(execution.metrics.converted / execution.metrics.sent!) * 100}%` }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}