import React, { useState } from 'react';
import { MessageSquare, TrendingUp, TrendingDown, Hash, Filter, ChevronDown, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';

interface Sentiment {
  positive: number;
  neutral: number;
  negative: number;
}

interface KeyPhrase {
  text: string;
  count: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  context: string[];
}

interface Feedback {
  id: string;
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  source: 'call' | 'email' | 'sms';
  timestamp: string;
  context: string;
}

interface VoiceOfCustomerProps {
  sentiment: Sentiment;
  keyPhrases: KeyPhrase[];
  feedback: Feedback[];
}

const SAMPLE_DATA: VoiceOfCustomerProps = {
  sentiment: {
    positive: 65,
    neutral: 25,
    negative: 10
  },
  keyPhrases: [
    {
      text: "great service",
      count: 127,
      sentiment: "positive",
      context: [
        "Your team provided great service during the installation",
        "Really great service from the support team",
        "The response time and great service made all the difference"
      ]
    },
    {
      text: "pricing concerns",
      count: 45,
      sentiment: "negative",
      context: [
        "Have some pricing concerns about the new package",
        "The pricing concerns me given market conditions",
        "Need to discuss pricing concerns before moving forward"
      ]
    },
    {
      text: "easy installation",
      count: 89,
      sentiment: "positive",
      context: [
        "The easy installation process saved us time",
        "Appreciated the easy installation guide",
        "Your team made it an easy installation experience"
      ]
    }
  ],
  feedback: [
    {
      id: "f1",
      text: "The new system has significantly improved our efficiency. Installation was smooth and the support team was very helpful throughout the process.",
      sentiment: "positive",
      source: "call",
      timestamp: "2025-03-20T14:30:00Z",
      context: "Post-installation follow-up call"
    },
    {
      id: "f2",
      text: "While the product works well, we're concerned about the ongoing maintenance costs. Would like to discuss pricing options.",
      sentiment: "neutral",
      source: "email",
      timestamp: "2025-03-19T10:15:00Z",
      context: "Customer support email"
    },
    {
      id: "f3",
      text: "Having issues with the mobile app connectivity. This is impacting our daily operations.",
      sentiment: "negative",
      source: "sms",
      timestamp: "2025-03-18T09:45:00Z",
      context: "Technical support request"
    }
  ]
};

export function VoiceOfCustomer() {
  const [showKeyPhrases, setShowKeyPhrases] = useState(true);
  const [showFeedback, setShowFeedback] = useState(true);
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');

  const sentimentColors = {
    positive: 'text-green-600',
    neutral: 'text-gray-600',
    negative: 'text-red-600'
  };

  const sentimentIcons = {
    positive: <ThumbsUp className="h-4 w-4" />,
    neutral: <Hash className="h-4 w-4" />,
    negative: <ThumbsDown className="h-4 w-4" />
  };

  const sourceIcons = {
    call: <MessageSquare className="h-4 w-4" />,
    email: <MessageSquare className="h-4 w-4" />,
    sms: <MessageSquare className="h-4 w-4" />
  };

  const filteredFeedback = SAMPLE_DATA.feedback.filter(item => {
    const matchesSentiment = selectedSentiment === 'all' || item.sentiment === selectedSentiment;
    const matchesSource = selectedSource === 'all' || item.source === selectedSource;
    return matchesSentiment && matchesSource;
  });

  return (
    <div className="space-y-6">
      {/* Sentiment Overview */}
      <div className="bg-white rounded-lg p-6 border">
        <h3 className="text-lg font-medium mb-4">Sentiment Analysis</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Positive</span>
              <span className="text-sm font-medium text-green-600">
                {SAMPLE_DATA.sentiment.positive}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${SAMPLE_DATA.sentiment.positive}%` }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Neutral</span>
              <span className="text-sm font-medium text-gray-600">
                {SAMPLE_DATA.sentiment.neutral}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-500 rounded-full"
                style={{ width: `${SAMPLE_DATA.sentiment.neutral}%` }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Negative</span>
              <span className="text-sm font-medium text-red-600">
                {SAMPLE_DATA.sentiment.negative}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${SAMPLE_DATA.sentiment.negative}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Key Phrases */}
      <div className="bg-white rounded-lg border">
        <div 
          className="p-4 border-b flex items-center justify-between cursor-pointer"
          onClick={() => setShowKeyPhrases(!showKeyPhrases)}
        >
          <h3 className="text-lg font-medium">Key Phrases</h3>
          <ChevronDown 
            className={`h-5 w-5 text-gray-600 transition-transform ${
              showKeyPhrases ? 'rotate-180' : ''
            }`}
          />
        </div>
        
        {showKeyPhrases && (
          <div className="p-4 space-y-4">
            {SAMPLE_DATA.keyPhrases.map((phrase, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${sentimentColors[phrase.sentiment]}`}>
                      "{phrase.text}"
                    </span>
                    <span className="text-sm text-gray-500">
                      mentioned {phrase.count} times
                    </span>
                  </div>
                  {sentimentIcons[phrase.sentiment]}
                </div>
                <div className="space-y-2">
                  {phrase.context.map((text, i) => (
                    <div key={i} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      "{text}"
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Customer Feedback */}
      <div className="bg-white rounded-lg border">
        <div 
          className="p-4 border-b flex items-center justify-between cursor-pointer"
          onClick={() => setShowFeedback(!showFeedback)}
        >
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-medium">Customer Feedback</h3>
            <div className="flex items-center gap-2">
              <select
                value={selectedSentiment}
                onChange={(e) => setSelectedSentiment(e.target.value)}
                className="px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={e => e.stopPropagation()}
              >
                <option value="all">All Sentiment</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={e => e.stopPropagation()}
              >
                <option value="all">All Sources</option>
                <option value="call">Calls</option>
                <option value="email">Emails</option>
                <option value="sms">SMS</option>
              </select>
              <ChevronDown 
                className={`h-5 w-5 text-gray-600 transition-transform ${
                  showFeedback ? 'rotate-180' : ''
                }`}
              />
            </div>
          </div>
        </div>
        
        {showFeedback && (
          <div className="divide-y">
            {filteredFeedback.map(feedback => (
              <div key={feedback.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    feedback.sentiment === 'positive' ? 'bg-green-100' :
                    feedback.sentiment === 'negative' ? 'bg-red-100' :
                    'bg-gray-100'
                  }`}>
                    {sourceIcons[feedback.source]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-gray-900">{feedback.text}</p>
                        <div className="text-sm text-gray-500">
                          {feedback.context}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(feedback.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}