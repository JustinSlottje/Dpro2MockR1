import React from 'react';
import { Building2 } from 'lucide-react';
import type { Company } from '../../types';
import { CompanySelector } from '../CompanySelector';
import { StepHeader } from './StepHeader';

interface CompanyStepProps {
  selectedCompany: Company | null;
  onCompanySelect: (company: Company) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function CompanyStep({
  selectedCompany,
  onCompanySelect,
  isExpanded,
  onToggleExpand
}: CompanyStepProps) {
  const CompletedContent = selectedCompany && (
    <div className="mt-2 flex items-center gap-3">
      {selectedCompany.logo ? (
        <img
          src={selectedCompany.logo}
          alt={selectedCompany.name}
          className="w-8 h-8 rounded-lg object-cover"
        />
      ) : (
        <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center">
          <Building2 className="h-4 w-4 text-gray-500" />
        </div>
      )}
      <div>
        <span className="font-medium">{selectedCompany.name}</span>
        <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
          selectedCompany.type === 'distributor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {selectedCompany.type.charAt(0).toUpperCase() + selectedCompany.type.slice(1)}
        </span>
      </div>
    </div>
  );

  return (
    <div className="border-b">
      <StepHeader
        icon={Building2}
        title="Step 1: Company"
        isExpanded={isExpanded}
        isCompleted={!!selectedCompany}
        completedContent={CompletedContent}
        onClick={selectedCompany ? onToggleExpand : undefined}
      />

      {isExpanded && (
        <div className="px-4 pb-4">
          <CompanySelector
            selectedCompany={selectedCompany}
            onCompanySelect={onCompanySelect}
          />
        </div>
      )}
    </div>
  );
}