import React from 'react';
import { LayoutDashboard, Map as MapIcon, Users2, Settings, PlayCircle, FileText } from 'lucide-react';

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      isActive: currentPage === 'dashboard',
      onClick: () => onNavigate('dashboard')
    },
    {
      id: 'plays',
      icon: PlayCircle,
      label: 'Plays',
      isActive: currentPage === 'plays',
      onClick: () => onNavigate('plays')
    },
    {
      id: 'pros',
      icon: Users2,
      label: 'Pros',
      isActive: currentPage === 'pros',
      onClick: () => onNavigate('pros')
    },
    {
      id: 'content',
      icon: FileText,
      label: 'Content',
      isActive: currentPage === 'content',
      onClick: () => onNavigate('content')
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      isActive: currentPage === 'settings',
      onClick: () => onNavigate('settings')
    }
  ];

  return (
    <nav className="w-16 bg-white shadow-lg z-10">
      <div className="h-full py-4">
        <ul className="space-y-4">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={item.onClick}
                className={`flex justify-center p-2 mx-2 rounded-lg group relative transition-colors ${
                  item.isActive
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                title={item.label}
              >
                <item.icon className="h-5 w-5" />
                <span className="absolute left-full ml-2 bg-gray-900 text-white text-sm py-1 px-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}