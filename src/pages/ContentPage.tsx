import React, { useState } from 'react';
import { FileText, Mail, MessageSquare, Phone, Monitor, Share2, Printer, Filter, Search, Plus, Clock, CheckCircle2, XCircle, Archive, AlertTriangle, ChevronDown, Edit3, Eye, MoreVertical, Target } from 'lucide-react';
import type { ContentTemplate, ContentType, ContentStatus } from '../types';
import { CreateContentStepper } from '../components/content/CreateContentStepper';
import { SAMPLE_PLAYS } from '../data/samplePlays';

const SAMPLE_TEMPLATES: ContentTemplate[] = [
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
        required: true
      },
      {
        name: 'companyName',
        type: 'text',
        description: 'Customer company name',
        required: true
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
        required: true
      }
    ]
  }
];

export function ContentPage() {
  const [selectedType, setSelectedType] = useState<ContentType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ContentStatus | 'all'>('all');
  const [selectedPlay, setSelectedPlay] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [showCreateStepper, setShowCreateStepper] = useState(false);

  const contentTypes: { type: ContentType; label: string; icon: React.ElementType }[] = [
    { type: 'email', label: 'Email', icon: Mail },
    { type: 'sms', label: 'SMS', icon: MessageSquare },
    { type: 'call', label: 'Call Script', icon: Phone },
    { type: 'digital', label: 'Digital', icon: Monitor },
    { type: 'social', label: 'Social', icon: Share2 },
    { type: 'print', label: 'Print', icon: Printer }
  ];

  const statusColors: Record<ContentStatus, { bg: string; text: string; Icon: React.ElementType }> = {
    draft: { bg: 'bg-gray-100', text: 'text-gray-800', Icon: Edit3 },
    pending_review: { bg: 'bg-yellow-100', text: 'text-yellow-800', Icon: Clock },
    approved: { bg: 'bg-green-100', text: 'text-green-800', Icon: CheckCircle2 },
    rejected: { bg: 'bg-red-100', text: 'text-red-800', Icon: XCircle },
    archived: { bg: 'bg-gray-100', text: 'text-gray-600', Icon: Archive }
  };

  const filteredTemplates = SAMPLE_TEMPLATES.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || template.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || template.status === selectedStatus;
    const matchesPlay = selectedPlay === 'all' || template.requiredPlays.includes(selectedPlay);
    return matchesSearch && matchesType && matchesStatus && matchesPlay;
  });

  const StatusBadge = ({ status }: { status: ContentStatus }) => {
    const { bg, text, Icon } = statusColors[status];
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${bg} ${text}`}>
        <Icon className="h-4 w-4" />
        {status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </span>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-6 border-b bg-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Content Library</h1>
          <button 
            onClick={() => setShowCreateStepper(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Create Content
          </button>
        </div>

        <div className="flex items-center gap-4">
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
            onChange={(e) => setSelectedType(e.target.value as ContentType | 'all')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Types</option>
            {contentTypes.map(({ type, label }) => (
              <option key={type} value={type}>{label}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as ContentStatus | 'all')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="pending_review">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={selectedPlay}
            onChange={(e) => setSelectedPlay(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Plays</option>
            {SAMPLE_PLAYS.map(play => (
              <option key={play.id} value={play.id}>{play.name}</option>
            ))}
          </select>

          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-3 gap-6">
          {filteredTemplates.map(template => {
            const TypeIcon = contentTypes.find(t => t.type === template.type)?.icon || FileText;
            const isExpanded = expandedTemplate === template.id;

            return (
              <div key={template.id} className="bg-white rounded-lg shadow-sm border hover:border-indigo-500 transition-colors">
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-medium">{template.name}</h3>
                      <div className="text-sm opacity-90 mt-1">
                        Version {template.version} • Updated {template.updatedAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <StatusBadge status={template.status} />
                  </div>
                  <div className={`absolute top-4 left-4 p-2 rounded-lg ${
                    template.type === 'email' ? 'bg-blue-100 text-blue-600' :
                    template.type === 'sms' ? 'bg-green-100 text-green-600' :
                    template.type === 'call' ? 'bg-purple-100 text-purple-600' :
                    template.type === 'digital' ? 'bg-indigo-100 text-indigo-600' :
                    template.type === 'social' ? 'bg-pink-100 text-pink-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <TypeIcon className="h-5 w-5" />
                  </div>
                </div>

                <div className="p-4 border-t">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-indigo-600" />
                      <span className="text-sm text-gray-600">
                        {template.requiredPlays.length} {template.requiredPlays.length === 1 ? 'play' : 'plays'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit3 className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showCreateStepper && (
        <CreateContentStepper
          onClose={() => setShowCreateStepper(false)}
          onSave={(template) => {
            console.log('Saved template:', template);
            setShowCreateStepper(false);
          }}
          plays={SAMPLE_PLAYS}
          missingContent={[
            {
              playId: 'play1',
              type: 'email',
              description: 'Welcome Email for High-Value Pro Acquisition'
            },
            {
              playId: 'play2',
              type: 'sms',
              description: 'Re-engagement SMS for Pro Re-Engagement Campaign'
            }
          ]}
        />
      )}
    </div>
  );
}