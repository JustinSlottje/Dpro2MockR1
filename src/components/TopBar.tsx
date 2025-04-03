import React, { useState } from 'react';
import { Search, Bell, ChevronDown, AlertTriangle, TrendingUp, Users, X, Settings, LogOut, UserCog } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'success' | 'info';
  message: string;
  playName?: string;
  timestamp: Date;
}

interface TopBarProps {
  onNavigate: (page: string) => void;
}

const SAMPLE_ALERTS: Alert[] = [
  {
    id: '1',
    type: 'warning',
    message: 'Play performance below target',
    playName: 'High-Value Pro Acquisition Q1',
    timestamp: new Date('2025-03-20T10:00:00')
  },
  {
    id: '2',
    type: 'success',
    message: 'ROI target achieved',
    playName: 'Pro Re-Engagement Campaign',
    timestamp: new Date('2025-03-20T09:30:00')
  },
  {
    id: '3',
    type: 'info',
    message: 'New pros added to target audience',
    playName: 'Pro Loyalty Enhancement',
    timestamp: new Date('2025-03-20T09:00:00')
  }
];

export function TopBar({ onNavigate }: TopBarProps) {
  const [showAlerts, setShowAlerts] = useState(false);
  const [alerts] = useState<Alert[]>(SAMPLE_ALERTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const formatAlertTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 60) {
      return `${minutes}m ago`;
    }
    if (hours < 24) {
      return `${hours}h ago`;
    }
    return date.toLocaleDateString();
  };

  const AlertIcon = ({ type }: { type: Alert['type'] }) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Users className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-8">
        <img 
          src="https://linqd.com/wp-content/uploads/2024/01/product-d-pro-white.svg" 
          alt="DPRO Logo"
          className="h-8"
          style={{ filter: 'invert(1)', color: '#0095A3' }}
        />
      </div>

      <div className="flex-1 max-w-3xl px-8">
        <form onSubmit={handleGlobalSearch} className="w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search everything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {showAlerts && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
                <h3 className="font-medium">Alerts</h3>
                <button
                  onClick={() => setShowAlerts(false)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {alerts.map(alert => (
                  <div
                    key={alert.id}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <AlertIcon type={alert.type} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">{alert.message}</div>
                        {alert.playName && (
                          <div className="text-sm text-gray-600 mt-0.5 truncate">{alert.playName}</div>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                          {formatAlertTime(alert.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-gray-200"></div>

        <div className="relative">
          <button 
            className="flex items-center gap-3 group"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">JS</span>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">John Smith</div>
              <div className="text-sm text-gray-500">Product Manager</div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
              <div className="p-2">
                <button
                  onClick={() => {
                    onNavigate('account-setup');
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <UserCog className="h-4 w-4" />
                  Account Setup
                </button>
                <button
                  onClick={() => {
                    onNavigate('settings');
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}