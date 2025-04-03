import React, { useState } from 'react';
import { TrendingUp, Users, Target, Calendar, AlertTriangle, Zap, Navigation, ArrowRight, CheckCircle2, Clock, BarChart2, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MarketingAlert {
  id: string;
  type: 'warning' | 'opportunity' | 'insight';
  message: string;
  impact: string;
  timestamp: Date;
}

interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  impact: string;
  urgency: 'high' | 'medium' | 'low';
  type: 'play' | 'optimization' | 'response';
  eta: string;
}

interface TimelineData {
  date: string;
  conversions: number;
  engagement: number;
  revenue: number;
}

export function DashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  // Sample timeline data
  const timelineData: TimelineData[] = [
    { date: '03/01', conversions: 45, engagement: 78, revenue: 25000 },
    { date: '03/02', conversions: 52, engagement: 71, revenue: 28000 },
    { date: '03/03', conversions: 48, engagement: 85, revenue: 27000 },
    { date: '03/04', conversions: 61, engagement: 89, revenue: 35000 },
    { date: '03/05', conversions: 55, engagement: 92, revenue: 32000 },
    { date: '03/06', conversions: 67, engagement: 88, revenue: 37000 },
    { date: '03/07', conversions: 63, engagement: 95, revenue: 40000 },
    { date: '03/08', conversions: 59, engagement: 91, revenue: 38000 },
    { date: '03/09', conversions: 71, engagement: 93, revenue: 42000 },
    { date: '03/10', conversions: 68, engagement: 90, revenue: 41000 },
    { date: '03/11', conversions: 75, engagement: 94, revenue: 45000 },
    { date: '03/12', conversions: 72, engagement: 89, revenue: 43000 },
    { date: '03/13', conversions: 78, engagement: 96, revenue: 48000 },
    { date: '03/14', conversions: 82, engagement: 98, revenue: 50000 }
  ];

  const alerts: MarketingAlert[] = [
    {
      id: '1',
      type: 'warning',
      message: 'Engagement drop detected in Southwest region',
      impact: '-15% response rate',
      timestamp: new Date('2025-03-20T10:00:00')
    },
    {
      id: '2',
      type: 'opportunity',
      message: 'High-value segment identified in Chicago area',
      impact: '+$250k potential',
      timestamp: new Date('2025-03-20T09:30:00')
    },
    {
      id: '3',
      type: 'insight',
      message: 'Email campaigns performing better on Tuesdays',
      impact: '+22% open rate',
      timestamp: new Date('2025-03-20T09:00:00')
    }
  ];

  const recommendedActions: RecommendedAction[] = [
    {
      id: '1',
      title: 'Launch Re-engagement Campaign',
      description: 'Target dormant high-value pros in affected regions',
      impact: 'Estimated +$180k revenue',
      urgency: 'high',
      type: 'play',
      eta: '2 days'
    },
    {
      id: '2',
      title: 'Optimize Email Timing',
      description: 'Shift campaign schedules to Tuesday morning slots',
      impact: 'Projected +25% engagement',
      urgency: 'medium',
      type: 'optimization',
      eta: '1 day'
    },
    {
      id: '3',
      title: 'Expand Chicago Territory',
      description: 'Scale successful play to neighboring areas',
      impact: 'Potential +$300k revenue',
      urgency: 'medium',
      type: 'play',
      eta: '5 days'
    }
  ];

  const metrics = {
    activePlays: {
      current: 12,
      trend: '+3',
      performance: 'above_target'
    },
    totalPros: {
      current: 2547,
      trend: '+156',
      performance: 'on_target'
    },
    conversionRate: {
      current: 8.5,
      trend: '+1.2',
      performance: 'above_target'
    },
    upcomingActivities: {
      current: 24,
      trend: '-2',
      performance: 'on_target'
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'above_target':
        return 'text-green-600';
      case 'below_target':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const AlertIcon = ({ type }: { type: MarketingAlert['type'] }) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'opportunity':
        return <Zap className="h-5 w-5 text-green-500" />;
      case 'insight':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
    }
  };

  const UrgencyBadge = ({ urgency }: { urgency: RecommendedAction['urgency'] }) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[urgency]}`}>
        {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
      </span>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600">{entry.name}:</span>
              <span className="font-medium">
                {entry.name === 'revenue' ? `$${entry.value.toLocaleString()}` : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-8 space-y-8">
      {/* Metrics Overview */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Active Plays</div>
                <div className="text-2xl font-semibold">{metrics.activePlays.current}</div>
              </div>
            </div>
            <div className={`text-sm font-medium ${getPerformanceColor(metrics.activePlays.performance)}`}>
              {metrics.activePlays.trend}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Pros</div>
                <div className="text-2xl font-semibold">{metrics.totalPros.current.toLocaleString()}</div>
              </div>
            </div>
            <div className={`text-sm font-medium ${getPerformanceColor(metrics.totalPros.performance)}`}>
              {metrics.totalPros.trend}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Conversion Rate</div>
                <div className="text-2xl font-semibold">{metrics.conversionRate.current}%</div>
              </div>
            </div>
            <div className={`text-sm font-medium ${getPerformanceColor(metrics.conversionRate.performance)}`}>
              {metrics.conversionRate.trend}%
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Upcoming Activities</div>
                <div className="text-2xl font-semibold">{metrics.upcomingActivities.current}</div>
              </div>
            </div>
            <div className={`text-sm font-medium ${getPerformanceColor(metrics.upcomingActivities.performance)}`}>
              {metrics.upcomingActivities.trend}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Marketing Radar */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-semibold">Marketing Radar</h2>
              </div>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as '7d' | '30d' | '90d')}
                className="px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
          </div>
          <div className="divide-y">
            {alerts.map(alert => (
              <div key={alert.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    alert.type === 'warning' ? 'bg-amber-100' :
                    alert.type === 'opportunity' ? 'bg-green-100' :
                    'bg-blue-100'
                  }`}>
                    <AlertIcon type={alert.type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{alert.message}</div>
                    <div className="mt-1 text-sm text-gray-600">
                      Impact: {alert.impact}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {alert.timestamp.toLocaleTimeString()} - {alert.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Recommended Actions</h2>
            </div>
          </div>
          <div className="divide-y">
            {recommendedActions.map(action => (
              <div key={action.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    action.type === 'play' ? 'bg-indigo-100' :
                    action.type === 'optimization' ? 'bg-green-100' :
                    'bg-blue-100'
                  }`}>
                    {action.type === 'play' ? <Target className="h-5 w-5 text-indigo-600" /> :
                     action.type === 'optimization' ? <Activity className="h-5 w-5 text-green-600" /> :
                     <BarChart2 className="h-5 w-5 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{action.title}</div>
                        <div className="mt-1 text-sm text-gray-600">{action.description}</div>
                      </div>
                      <UrgencyBadge urgency={action.urgency} />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>ETA: {action.eta}</span>
                        </div>
                        <div className="text-green-600">{action.impact}</div>
                      </div>
                      <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700">
                        Take Action
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Timeline */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold">Performance Timeline</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-sm text-gray-600">Conversions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span className="text-sm text-gray-600">Engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              <span className="text-sm text-gray-600">Revenue ($)</span>
            </div>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as '7d' | '30d' | '90d')}
              className="px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={timelineData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="conversions"
                stroke="#22C55E"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorConversions)"
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="engagement"
                stroke="#3B82F6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorEngagement)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#A855F7"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}