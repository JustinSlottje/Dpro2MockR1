import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Users, Mail, MessageSquare, Phone } from 'lucide-react';

interface FlowNode {
  id: string;
  type: 'audience' | 'email' | 'sms' | 'call';
  label: string;
  metrics: {
    total: number;
    converted: number;
    dropped: number;
  };
  connections: string[];
}

interface FlowChartProps {
  data: FlowNode[];
  onNodeClick: (nodeId: string) => void;
}

export function PlayFlowChart({ data, onNodeClick }: FlowChartProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && data.length > 0) {
      drawConnections();
    }
  }, [data, hoveredNode, selectedNode]);

  const drawConnections = () => {
    const canvas = document.getElementById('flowCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size to match container
    const container = containerRef.current;
    if (!container) return;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Draw connections
    data.forEach(node => {
      const startElement = document.getElementById(`node-${node.id}`);
      if (!startElement) return;

      node.connections.forEach(targetId => {
        const endElement = document.getElementById(`node-${targetId}`);
        if (!endElement) return;

        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const startX = startRect.right - containerRect.left;
        const startY = startRect.top + startRect.height / 2 - containerRect.top;
        const endX = endRect.left - containerRect.left;
        const endY = endRect.top + endRect.height / 2 - containerRect.top;

        // Draw path
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        // Calculate control points for curve
        const controlPoint1X = startX + (endX - startX) * 0.4;
        const controlPoint2X = startX + (endX - startX) * 0.6;
        
        ctx.bezierCurveTo(
          controlPoint1X, startY,
          controlPoint2X, endY,
          endX, endY
        );

        // Style based on hover/selection state
        const isHighlighted = 
          hoveredNode === node.id || 
          selectedNode === node.id ||
          (hoveredNode && node.connections.includes(hoveredNode)) ||
          (selectedNode && node.connections.includes(selectedNode));

        if (isHighlighted) {
          ctx.strokeStyle = '#4F46E5';
          ctx.lineWidth = 2;
        } else {
          ctx.strokeStyle = '#E5E7EB';
          ctx.lineWidth = 1;
        }

        ctx.stroke();

        // Draw arrow
        const arrowSize = 6;
        const angle = Math.atan2(endY - startY, endX - startX);
        
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(
          endX - arrowSize * Math.cos(angle - Math.PI / 6),
          endY - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          endX - arrowSize * Math.cos(angle + Math.PI / 6),
          endY - arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fillStyle = isHighlighted ? '#4F46E5' : '#E5E7EB';
        ctx.fill();
      });
    });
  };

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

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full min-h-[400px] p-8"
    >
      <canvas
        id="flowCanvas"
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative flex items-start gap-16">
        {data.map((node, index) => {
          const Icon = NodeIcon[node.type];
          return (
            <div
              key={node.id}
              id={`node-${node.id}`}
              className={`flex flex-col items-center ${index > 0 ? 'ml-8' : ''}`}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => {
                setSelectedNode(node.id);
                onNodeClick(node.id);
              }}
            >
              <div 
                className={`w-16 h-16 rounded-2xl ${nodeColors[node.type]} flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
                  selectedNode === node.id ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                }`}
              >
                <Icon className="h-8 w-8" />
              </div>
              <div className="mt-4 text-center">
                <div className="font-medium">{node.label}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {node.metrics.total.toLocaleString()} total
                </div>
                <div className="flex items-center gap-3 mt-2 text-sm">
                  <span className="text-green-600">
                    +{node.metrics.converted.toLocaleString()}
                  </span>
                  <span className="text-red-600">
                    -{node.metrics.dropped.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}