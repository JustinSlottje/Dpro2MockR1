import React, { useState } from 'react';
import { Plus, X, Variable } from 'lucide-react';
import type { ContentTemplate, ContentVariable } from '../../../types';

interface ContentEditorProps {
  contentData: Partial<ContentTemplate>;
  onContentChange: (data: Partial<ContentTemplate>) => void;
}

export function ContentEditor({ contentData, onContentChange }: ContentEditorProps) {
  const [showVariableModal, setShowVariableModal] = useState(false);
  const [newVariable, setNewVariable] = useState<Partial<ContentVariable>>({});

  const handleAddVariable = () => {
    if (newVariable.name && newVariable.type) {
      onContentChange({
        ...contentData,
        variables: [
          ...(contentData.variables || []),
          newVariable as ContentVariable
        ]
      });
      setNewVariable({});
      setShowVariableModal(false);
    }
  };

  const handleRemoveVariable = (name: string) => {
    onContentChange({
      ...contentData,
      variables: contentData.variables?.filter(v => v.name !== name)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={contentData.name || ''}
          onChange={(e) => onContentChange({ ...contentData, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter content name"
        />
      </div>

      {contentData.type === 'email' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            value={contentData.subject || ''}
            onChange={(e) => onContentChange({ ...contentData, subject: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter email subject"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          value={contentData.content || ''}
          onChange={(e) => onContentChange({ ...contentData, content: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[200px]"
          placeholder="Enter content"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Variables
          </label>
          <button
            onClick={() => setShowVariableModal(true)}
            className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Add Variable
          </button>
        </div>

        <div className="space-y-2">
          {contentData.variables?.map((variable) => (
            <div
              key={variable.name}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Variable className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="font-medium">{variable.name}</div>
                  <div className="text-sm text-gray-500">{variable.description}</div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveVariable(variable.name)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {showVariableModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Add Variable</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newVariable.name || ''}
                  onChange={(e) => setNewVariable({ ...newVariable, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter variable name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={newVariable.type || ''}
                  onChange={(e) => setNewVariable({ ...newVariable, type: e.target.value as any })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select type</option>
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="boolean">Boolean</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newVariable.description || ''}
                  onChange={(e) => setNewVariable({ ...newVariable, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter variable description"
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={newVariable.required || false}
                  onChange={(e) => setNewVariable({ ...newVariable, required: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700">Required</label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowVariableModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVariable}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Variable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}