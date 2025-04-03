import React from 'react';
import { Database, Zap, BarChart3, Brain, Shield, Workflow, Users, Target, Building2 } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
}

export function WelcomeModal({ isOpen }: WelcomeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10 flex items-center justify-center p-8">
      <div className="bg-white/95 backdrop-blur rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">Welcome to DPRO 2.0</h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              DPRO 2.0 is your unified platform for transforming fragmented data into actionable insights. 
              Our AI-powered platform helps you consolidate data, enhance your existing information, and implement 
              marketing strategies with unprecedented precision.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-2xl p-6 space-y-4">
              <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold">ML/AI Smart Data Platform</h3>
              <p className="text-gray-600">
                A sophisticated database that enhances customer data, tracks changes, and makes intelligent 
                recommendations based on data patterns. More than just a list provider - it's your intelligent 
                data partner.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 space-y-4">
              <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center">
                <Database className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold">Master Data Management</h3>
              <p className="text-gray-600">
                Create a single source of truth by standardizing and merging key data entities, ensuring 
                accuracy across marketing, sales, operations, and more.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 space-y-4">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">360° Customer View</h3>
              <p className="text-gray-600">
                Consolidate data from multiple sources for a complete customer profile, enabling targeted, 
                personalized strategies with advanced identity resolution.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Target className="h-5 w-5 text-indigo-600" />
                Market Coverage
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">7M+</div>
                  <div className="text-sm text-gray-600">Pro Companies</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">7M+</div>
                  <div className="text-sm text-gray-600">Pro Contacts</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">610+</div>
                  <div className="text-sm text-gray-600">Channel Distributors</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">48+</div>
                  <div className="text-sm text-gray-600">Key Attributes</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-600" />
                Enterprise-Grade Platform
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="font-medium">Security & Compliance</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Advanced encryption, role-based access, and compliance with GDPR and CCPA standards
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="font-medium">Scalable Architecture</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Microservices and Kubernetes support for high-performance data integration
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Workflow className="h-5 w-5 text-indigo-600" />
              Key Features
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="font-medium">Data Processing</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-indigo-100 p-1 mt-1">
                      <span className="block w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    </span>
                    <span>Automated deduping & normalization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-indigo-100 p-1 mt-1">
                      <span className="block w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    </span>
                    <span>Continuous data validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-indigo-100 p-1 mt-1">
                      <span className="block w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    </span>
                    <span>Real-time enrichment</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="font-medium">Analytics & Insights</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-indigo-100 p-1 mt-1">
                      <span className="block w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    </span>
                    <span>ML-powered Pro Scoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-indigo-100 p-1 mt-1">
                      <span className="block w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    </span>
                    <span>Automated alert reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-indigo-100 p-1 mt-1">
                      <span className="block w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    </span>
                    <span>Real-time dashboards</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="font-medium">Automation</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-indigo-100 p-1 mt-1">
                      <span className="block w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    </span>
                    <span>Intelligent Play Sequences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-indigo-100 p-1 mt-1">
                      <span className="block w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    </span>
                    <span>AI-driven web scraping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="rounded-full bg-indigo-100 p-1 mt-1">
                      <span className="block w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    </span>
                    <span>Automated data acquisition</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-gray-600">
            Select a company from the left panel to begin exploring your data
          </div>
        </div>
      </div>
    </div>
  );
}