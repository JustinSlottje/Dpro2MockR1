import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, AlertTriangle, Plus, CheckCircle2, FileText, Search, Filter } from 'lucide-react';
import type { Play, ContentTemplate } from '../types';

interface ContentTabProps {
  play: Play;
  onContentAssign: (activityId: string, template: ContentTemplate) => void;
}

const formatDate = (date: Date | undefined) => {
  if (!date) return 'N/A';
  return date.toLocaleDateString();
};

export function ContentTab({ play, onContentAssign }: ContentTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'email' | 'sms' | 'call'>('all');
  const [showContentPool, setShowContentPool] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  // Sample content pool data
  const contentPool: ContentTemplate[] = [
    {
      id: 'template1',
      name: 'Welcome Email Series - Initial',
      type: 'email',
      subject: 'Welcome to Our Pro Program',
      content: 'Welcome email content...',
      status: 'approved',
      version: 1,
      createdBy: 'John Smith',
      createdAt: new Date('2025-03-15'),
      updatedAt: new Date('2025-03-18'),
      thumbnail: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=200&h=200',
      approvalHistory: [
        {
          id: 'approval1',
          status: 'approved',
          comment: 'Content aligns with brand guidelines',
          reviewer: 'Marketing Director',
          timestamp: new Date('2025-03-18')
        }
      ],
      requiredPlays: ['onboarding-play', 'engagement-play'],
      tags: ['welcome', 'onboarding', 'email'],
      variables: [
        {
          name: 'firstName',
          type: 'text',
          description: 'Customer first name',
          required: true,
          defaultValue: ''
        },
        {
          name: 'companyName',
          type: 'text',
          description: 'Customer company name',
          required: true,
          defaultValue: ''
        }
      ]
    },
    {
      id: 'template2',
      name: 'Sales Follow-up Script',
      type: 'call',
      content: 'Call script content...',
      status: 'pending_review',
      version: 2,
      createdBy: 'Sarah Johnson',
      createdAt: new Date('2025-03-16'),
      updatedAt: new Date('2025-03-19'),
      thumbnail: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&q=80&w=200&h=200',
      approvalHistory: [
        {
          id: 'approval2',
          status: 'pending_review',
          comment: 'Awaiting compliance review',
          reviewer: 'Compliance Team',
          timestamp: new Date('2025-03-19')
        }
      ],
      requiredPlays: ['sales-play'],
      tags: ['sales', 'follow-up', 'script'],
      variables: [
        {
          name: 'lastPurchaseDate',
          type: 'date',
          description: 'Date of last purchase',
          required: true,
          defaultValue: ''
        }
      ]
    },
    {
      id: 'template3',
      name: 'Quick Offer SMS',
      type: 'sms',
      content: 'Limited time offer: {offerDetails}. Reply YES to claim. {companyName}',
      status: 'approved',
      version: 1,
      createdBy: 'Mike Wilson',
      createdAt: new Date('2025-03-17'),
      updatedAt: new Date('2025-03-17'),
      thumbnail: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=200&h=200',
      approvalHistory: [
        {
          id: 'approval3',
          status: 'approved',
          comment: 'Offer terms verified',
          reviewer: 'Compliance Team',
          timestamp: new Date('2025-03-17')
        }
      ],
      requiredPlays: ['promotion-play'],
      tags: ['offer', 'promotion', 'sms'],
      variables: [
        {
          name: 'offerDetails',
          type: 'text',
          description: 'Specific offer details',
          required: true,
          defaultValue: ''
        },
        {
          name: 'companyName',
          type: 'text',
          description: 'Company name',
          required: true,
          defaultValue: ''
        }
      ]
    }
  ];

  const getActivityIcon = (type: 'email' | 'sms' | 'call') => {
    switch (type) {
      case 'email':
        return Mail;
      case 'sms':
        return MessageSquare;
      case 'call':
        return Phone;
      default:
        return FileText;
    }
  };

  const filteredContent = contentPool.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || template.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleAssignContent = (template: ContentTemplate) => {
    if (selectedActivity) {
      onContentAssign(selectedActivity, template);
      setShowContentPool(false);
      setSelectedActivity(null);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Required Content</h2>
        </div>
        <div className="divide-y">
          {play.sequence.map(activity => {
            const Icon = getActivityIcon(activity.type);
            const hasContent = activity.template !== undefined;

            return (
              <div key={activity.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'email' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'sms' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{activity.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      </div>
                      {!hasContent ? (
                        <button
                          onClick={() => {
                            setSelectedActivity(activity.id);
                            setShowContentPool(true);
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
                        >
                          <Plus className="h-4 w-4" />
                          Assign Content
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 className="h-5 w-5" />
                          <span className="text-sm font-medium">Content Assigned</span>
                        </div>
                      )}
                    </div>

                    {hasContent && activity.template && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">{activity.template.name}</div>
                            {activity.type === 'email' && (
                              <div className="text-sm text-gray-600 mt-1">
                                Subject: {activity.template.subject}
                              </div>
                            )}
                            <div className="text-sm text-gray-500 mt-2">
                              Version {activity.template.version} • Last updated {formatDate(activity.template.updatedAt)}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {activity.template.tags?.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
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

      {/* Content Pool Modal */}
      {showContentPool && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Content Pool</h2>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Types</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="call">Call</option>
                </select>

                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Filter className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-4">
                {filteredContent.map(template => {
                  const Icon = getActivityIcon(template.type);
                  return (
                    <div
                      key={template.id}
                      className="border rounded-lg hover:border-indigo-500 transition-colors cursor-pointer"
                      onClick={() => handleAssignContent(template)}
                    >
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                          <div className="text-white">
                            <h3 className="font-medium">{template.name}</h3>
                            <div className="text-sm opacity-90">Version {template.version}</div>
                          </div>
                        </div>
                        <div className={`absolute top-4 left-4 p-2 rounded-lg ${
                          template.type === 'email' ? 'bg-blue-100 text-blue-600' :
                          template.type === 'sms' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="p-4 border-t">
                        <div className="flex flex-wrap gap-2">
                          {template.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 text-sm text-gray-500">
                          {template.variables?.length || 0} variables • Last updated {formatDate(template.updatedAt)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setShowContentPool(false);
                    setSelectedActivity(null);
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}