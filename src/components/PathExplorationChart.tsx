import React, { useState } from 'react';
import { ChevronRight, Mail, MessageSquare, Phone, ChevronDown, AlertTriangle, TrendingUp, Target, Users, Clock, Filter, Brain, Zap } from 'lucide-react';

interface PathNode {
  id: string;
  type: 'audience' | 'email' | 'sms' | 'call';
  label: string;
  count: number;
  metrics: {
    total: number;
    delivered?: number;
    opened?: number;
    clicked?: number;
    responded?: number;
    converted: number;
    dropped: number;
  };
  insight?: {
    type: 'success' | 'warning' | 'info';
    title: string;
    reason: string;
    criteria: string[];
    impact: {
      type: 'positive' | 'neutral' | 'negative';
      value: string;
    };
    recommendations?: string[];
  };
  children: PathNode[];
  userProgress?: {
    status: 'completed' | 'current' | 'pending';
    timestamp?: Date;
  };
}

interface PathExplorationChartProps {
  data: PathNode;
  onNodeClick: (nodeId: string) => void;
}

export function PathExplorationChart({ data, onNodeClick }: PathExplorationChartProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([data.id]));
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  const NodeIcon = {
    audience: Users,
    email: Mail,
    sms: MessageSquare,
    call: Phone
  };

  const nodeColors = {
    audience: 'bg-indigo-100 text-indigo-600',
    email: 'bg-blue-100 text-blue-600',
    sms: 'bg-green-100 text-green-600',
    call: 'bg-purple-100 text-purple-600'
  };

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const calculateMetricPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  const renderMetrics = (node: PathNode) => {
    if (!node.metrics) return null;

    const total = node.metrics.total;
    const metrics = [
      { key: 'delivered', value: node.metrics.delivered },
      { key: 'opened', value: node.metrics.opened },
      { key: 'clicked', value: node.metrics.clicked },
      { key: 'responded', value: node.metrics.responded },
      { key: 'converted', value: node.metrics.converted }
    ].filter(metric => metric.value !== undefined);

    return (
      <div className="mt-3 space-y-2">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden relative">
          {metrics.map((metric, index) => {
            let color = '';
            switch (metric.key) {
              case 'delivered':
                color = 'bg-gray-500';
                break;
              case 'opened':
                color = 'bg-blue-500';
                break;
              case 'clicked':
                color = 'bg-green-500';
                break;
              case 'responded':
                color = 'bg-purple-500';
                break;
              case 'converted':
                color = 'bg-indigo-500';
                break;
            }

            const percentage = calculateMetricPercentage(metric.value!, total);

            return (
              <div
                key={metric.key}
                className={`absolute h-full transition-all ${color} hover:brightness-110`}
                style={{
                  width: `${percentage}%`,
                  left: `${metrics.slice(0, index).reduce((acc, m) => acc + parseFloat(calculateMetricPercentage(m.value!, total)), 0)}%`
                }}
                onMouseEnter={() => setHoveredMetric(metric.key)}
                onMouseLeave={() => setHoveredMetric(null)}
              />
            );
          })}
        </div>

        <div className="grid grid-cols-4 gap-2 text-xs">
          {metrics.map(metric => (
            <div
              key={metric.key}
              className={`transition-colors ${hoveredMetric === metric.key ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}
            >
              <div className="flex items-center justify-between">
                <span>{metric.key.charAt(0).toUpperCase() + metric.key.slice(1)}</span>
                <span>{metric.value!.toLocaleString()}</span>
              </div>
              <div className="text-right text-xs opacity-75">
                {calculateMetricPercentage(metric.value!, total)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderInsight = (node: PathNode) => {
    if (!node.insight || hoveredNode !== node.id) return null;

    const icons = {
      success: <TrendingUp className="h-5 w-5 text-green-600" />,
      warning: <AlertTriangle className="h-5 w-5 text-amber-600" />,
      info: <Brain className="h-5 w-5 text-blue-600" />
    };

    const colors = {
      success: 'bg-green-50 border-green-100',
      warning: 'bg-amber-50 border-amber-100',
      info: 'bg-blue-50 border-blue-100'
    };

    return (
      <div 
        className={`absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-full w-96 p-4 rounded-lg border ${colors[node.insight.type]} shadow-lg z-50`}
        style={{ 
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)'
        }}
      >
        <div className="flex items-start gap-3">
          {icons[node.insight.type]}
          <div className="flex-1">
            <div className="font-medium text-gray-900">{node.insight.title}</div>
            <p className="text-sm text-gray-600 mt-1">{node.insight.reason}</p>
            
            <div className="mt-3 space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-700">Criteria:</div>
                <ul className="mt-1 space-y-1">
                  {node.insight.criteria.map((criterion, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <Filter className="h-3 w-3" />
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700">Impact:</div>
                <div className={`text-sm mt-1 ${
                  node.insight.impact.type === 'positive' ? 'text-green-600' :
                  node.insight.impact.type === 'negative' ? 'text-red-600' :
                  'text-blue-600'
                }`}>
                  {node.insight.impact.value}
                </div>
              </div>

              {node.insight.recommendations && (
                <div>
                  <div className="text-sm font-medium text-gray-700">Recommendations:</div>
                  <ul className="mt-1 space-y-1">
                    {node.insight.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <Zap className="h-3 w-3 text-amber-500" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNode = (node: PathNode, level: number = 0) => {
    const Icon = NodeIcon[node.type];
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children.length > 0;

    // Only show nodes that are completed or current based on user progress
    const shouldShow = !node.userProgress || 
      node.userProgress.status === 'completed' || 
      node.userProgress.status === 'current';

    if (!shouldShow) return null;

    return (
      <div key={node.id} className="mb-4">
        <div 
          className={`relative flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
            hoveredNode === node.id ? 'bg-gray-50' : 'hover:bg-gray-50'
          } ${level > 0 ? 'ml-8' : ''}`}
          onClick={() => {
            onNodeClick(node.id);
            if (hasChildren) toggleNode(node.id);
          }}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div className={`p-2 rounded-lg ${nodeColors[node.type]} transition-transform ${
            hoveredNode === node.id ? 'scale-110' : ''
          }`}>
            <Icon className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="relative">
                <span className="font-medium">{node.label}</span>
                {node.insight && hoveredNode === node.id && renderInsight(node)}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {node.count.toLocaleString()}
                </span>
                {hasChildren && (
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                  />
                )}
              </div>
            </div>

            {renderMetrics(node)}

            {node.userProgress && (
              <div className="mt-3 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  node.userProgress.status === 'completed' ? 'bg-green-500' :
                  node.userProgress.status === 'current' ? 'bg-blue-500' :
                  'bg-gray-300'
                }`} />
                <span className="text-sm text-gray-600">
                  {node.userProgress.status === 'completed' && 'Completed'}
                  {node.userProgress.status === 'current' && 'In Progress'}
                  {node.userProgress.status === 'pending' && 'Pending'}
                  {node.userProgress.timestamp && ` • ${node.userProgress.timestamp.toLocaleString()}`}
                </span>
              </div>
            )}
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="border-l-2 border-gray-200 ml-6 pl-6 mt-2">
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      {renderNode(data)}
    </div>
  );
}