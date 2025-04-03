import React from 'react';
import { Mail, MessageSquare, Phone, X, Check } from 'lucide-react';
import type { ContentTemplate } from '../types';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  activityType: 'email' | 'sms' | 'call';
  onTemplateSelect: (template: ContentTemplate) => void;
}

const SAMPLE_TEMPLATES: Record<string, ContentTemplate[]> = {
  email: [
    {
      id: 'et1',
      name: 'Welcome Email',
      type: 'email',
      subject: 'Welcome to Our Pro Program',
      content: `Dear {firstName},

We're excited to welcome you to our Pro Program! As a valued professional in the {industry} industry, you now have access to exclusive benefits and resources designed to help your business grow.

Key Benefits:
• Priority ordering and support
• Special pricing on bulk orders
• Early access to new products
• Dedicated account manager

Get started by exploring our pro catalog or reaching out to your dedicated account manager.

Best regards,
{companyName} Pro Team`
    },
    {
      id: 'et2',
      name: 'Special Offer',
      type: 'email',
      subject: 'Exclusive Pro Offer Inside',
      content: `Hi {firstName},

As a valued pro customer, we want to offer you an exclusive deal:

🎉 Save 20% on your next order of {category} products
📦 Free shipping on orders over $500
⏰ Limited time offer - expires in 7 days

Use code PRO20 at checkout to claim your discount.

Best regards,
{companyName} Team`
    },
    {
      id: 'et3',
      name: 'Product Launch',
      type: 'email',
      subject: 'New Product Line Available Now',
      content: `Hello {firstName},

We're excited to announce our latest product line designed specifically for professionals like you.

Introducing the new {productLine}:
• Feature 1
• Feature 2
• Feature 3

As a pro member, you get first access and special pricing.

Check out the full catalog here: {catalogLink}

Best regards,
{companyName} Team`
    }
  ],
  sms: [
    {
      id: 'st1',
      name: 'Quick Offer',
      type: 'sms',
      content: '{firstName}, exclusive pro offer: 20% off your next order with code PRO20. Valid for 48 hours. {companyName}'
    },
    {
      id: 'st2',
      name: 'Order Status',
      type: 'sms',
      content: 'Your {companyName} order #{orderNumber} has shipped! Track here: {trackingLink}'
    },
    {
      id: 'st3',
      name: 'Event Reminder',
      type: 'sms',
      content: 'Reminder: {eventName} starts tomorrow at {time}. Don\'t forget to bring your pro badge! {companyName}'
    }
  ],
  call: [
    {
      id: 'ct1',
      name: 'Introduction Call',
      type: 'call',
      content: `Call Script:
1. Introduction
   - Introduce yourself and {companyName}
   - Verify speaking with {firstName}

2. Purpose
   - Explain pro program benefits
   - Discuss current needs and challenges

3. Key Points
   - Special pricing structure
   - Dedicated support
   - Priority ordering

4. Next Steps
   - Schedule follow-up if needed
   - Share contact information
   - Document call notes`
    },
    {
      id: 'ct2',
      name: 'Quarterly Review',
      type: 'call',
      content: `Call Script:
1. Review Period Performance
   - Order volume and frequency
   - Product categories
   - Support interactions

2. Feedback
   - Service satisfaction
   - Product quality
   - Delivery experience

3. Growth Opportunities
   - New product lines
   - Volume discounts
   - Training needs

4. Action Items
   - Document requests
   - Schedule follow-ups
   - Update account notes`
    }
  ]
};

export function TemplateSelector({ isOpen, onClose, activityType, onTemplateSelect }: TemplateSelectorProps) {
  const templates = SAMPLE_TEMPLATES[activityType] || [];
  const Icon = activityType === 'email' ? Mail : activityType === 'sms' ? MessageSquare : Phone;

  if (!isOpen) return null;

  return (
    <div 
      className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-start justify-end p-6"
      onClick={onClose}
    >
      <div 
        className="w-[600px] bg-white rounded-xl shadow-xl overflow-hidden animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-indigo-600" />
            <h3 className="font-medium">Select Template</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="divide-y">
          {templates.map(template => (
            <div
              key={template.id}
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                onTemplateSelect(template);
                onClose();
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium">{template.name}</h4>
                  {template.type === 'email' && (
                    <div className="text-sm text-gray-600 mt-1">
                      Subject: {template.subject}
                    </div>
                  )}
                  <div className="mt-2 text-sm text-gray-600 whitespace-pre-line line-clamp-3">
                    {template.content}
                  </div>
                </div>
                <button className="p-2 hover:bg-indigo-100 rounded-full text-indigo-600">
                  <Check className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}