import React from 'react';
import { X } from 'lucide-react';
import { LocationsPage } from './LocationsPage';

interface AccountSetupPageProps {
  onClose: () => void;
}

export function AccountSetupPage({ onClose }: AccountSetupPageProps) {
  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <h2 className="text-xl font-semibold">Account Setup</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-hidden bg-gray-50">
        <div className="h-full max-h-[calc(100vh-65px)]">
          <LocationsPage />
        </div>
      </div>
    </div>
  );
}