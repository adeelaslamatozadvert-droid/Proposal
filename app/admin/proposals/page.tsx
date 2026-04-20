'use client';

import { useState, useEffect } from 'react';
import ItemEditor from '@/app/components/ItemEditor';
import ProposalPreview from '@/app/components/ProposalPreview';
import {
  Proposal,
  ProposalItem,
  CompanyBranding,
  DEFAULT_ITEMS,
  DEFAULT_TERMS,
  generateProposalId,
  getSelectedItemsTotal,
} from '@/app/lib/proposalTypes';

export default function AdminDashboard() {
  const [proposal, setProposal] = useState<Proposal>({
    id: '',
    companyId: '',
    clientName: '',
    projectTitle: '',
    selectedItems: [],
    items: DEFAULT_ITEMS,
    terms: DEFAULT_TERMS,
  });

  const [companies, setCompanies] = useState<CompanyBranding[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<CompanyBranding | null>(null);

  const [activeTab, setActiveTab] = useState<'general' | 'items' | 'preview'>('general');
  const [saveMessage, setSaveMessage] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load companies and proposal from localStorage & initialize ID on client side only
  useEffect(() => {
    let parsedCompanies: CompanyBranding[] = [];

    const savedCompanies = localStorage.getItem('companies');
    if (savedCompanies) {
      try {
        parsedCompanies = JSON.parse(savedCompanies);
        setCompanies(parsedCompanies);
      } catch (e) {
        console.error('Error loading companies:', e);
      }
    }

    const savedProposal = localStorage.getItem('currentProposal');
    if (savedProposal) {
      try {
        const loadedProposal = JSON.parse(savedProposal);
        setProposal(loadedProposal);

        if (loadedProposal.companyId) {
          const company = parsedCompanies.find((c) => c.id === loadedProposal.companyId);
          if (company) {
            setSelectedCompany(company);
          }
        }
      } catch (e) {
        console.error('Error loading proposal:', e);
      }
    } else {
      setProposal((prev) => ({
        ...prev,
        id: generateProposalId(),
      }));
    }

    setIsHydrated(true);
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('currentProposal', JSON.stringify(proposal));
  }, [proposal]);

  const handleSaveItem = (updatedItem: ProposalItem) => {
    setProposal((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleDeleteItem = (id: string) => {
    setProposal((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
      selectedItems: prev.selectedItems.filter((itemId) => itemId !== id),
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleAddItem = () => {
    const newItem: ProposalItem = {
      id: `item-${Date.now()}`,
      name: 'New Service',
      description: 'Description here',
      price: 0,
      currency: 'USD',
      category: 'Custom',
      quantity: 1,
    };
    setProposal((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleToggleItem = (id: string) => {
    setProposal((prev) => ({
      ...prev,
      selectedItems: prev.selectedItems.includes(id)
        ? prev.selectedItems.filter((i) => i !== id)
        : [...prev.selectedItems, id],
    }));
  };

  const handleExportProposal = () => {
    const dataStr = JSON.stringify(proposal, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(dataStr));
    element.setAttribute('download', `${proposal.projectTitle || 'proposal'}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setSaveMessage('✅ Proposal exported!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleNewProposal = () => {
    if (confirm('Create a new proposal? Current changes will be saved.')) {
      setProposal({
        id: generateProposalId(),
        companyId: selectedCompany?.id || '',
        clientName: '',
        projectTitle: '',
        selectedItems: [],
        items: DEFAULT_ITEMS,
        terms: DEFAULT_TERMS,
      });
    }
  };

  const handleSelectCompany = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (company) {
      setSelectedCompany(company);
      setProposal((prev) => ({
        ...prev,
        companyId: company.id,
      }));
    }
  };

  const total = getSelectedItemsTotal(proposal.selectedItems, proposal.items);

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gray-900 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">🛠️ Admin Dashboard</h1>
            <p className="text-gray-300">Manage proposals, edit all details, customize for clients</p>
          </div>
          <div className="flex gap-2">
            <a
              href="/admin/companies"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
            >
              🏢 Company Brandings
            </a>
            <a
              href="/admin/services"
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm"
            >
              🛍️ Services
            </a>
            <a
              href="/"
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 text-sm"
            >
              🏠 Home
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Save Message */}
        {saveMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-900 rounded border border-green-300">
            {saveMessage}
          </div>
        )}

        {/* Proposal ID & Actions */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Proposal ID</p>
            <p className="font-mono font-bold text-lg">{proposal.id}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleNewProposal}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              ➕ New Proposal
            </button>
            <button
              onClick={handleExportProposal}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              ⬇️ Export JSON
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-6 py-3 rounded font-medium transition ${
              activeTab === 'general'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            📝 General Info
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`px-6 py-3 rounded font-medium transition ${
              activeTab === 'items'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            📦 Services ({proposal.items.length})
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-3 rounded font-medium transition ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            👁️ Preview
          </button>
        </div>

        {/* General Info Tab */}
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Edit Form */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-bold mb-4">Company Branding</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Company *
                    </label>
                    {companies.length === 0 ? (
                      <div className="p-3 bg-yellow-50 border border-yellow-300 rounded text-sm text-yellow-800">
                        <p>No companies found. </p>
                        <a href="/admin/companies" className="text-blue-600 hover:underline font-medium">
                          Create a company branding first
                        </a>
                      </div>
                    ) : (
                      <select
                        value={proposal.companyId || ''}
                        onChange={(e) => handleSelectCompany(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                      >
                        <option value="">-- Select a company --</option>
                        {companies.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.businessName}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {selectedCompany && (
                    <div className="p-3 bg-blue-50 border border-blue-300 rounded text-sm">
                      <p className="font-medium text-gray-900">{selectedCompany.businessName}</p>
                      <p className="text-gray-600 text-xs">
                        📧 {selectedCompany.email}
                      </p>
                      <p className="text-gray-600 text-xs">
                        📱 {selectedCompany.mobileNumber}
                      </p>
                      <p className="text-gray-600 text-xs">
                        💱 {selectedCompany.currency}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-bold mb-4">Client Information</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      value={proposal.clientName}
                      onChange={(e) =>
                        setProposal((prev) => ({ ...prev, clientName: e.target.value }))
                      }
                      className="w-full border rounded px-3 py-2"
                      placeholder="Client company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Email
                    </label>
                    <input
                      type="email"
                      value={proposal.clientEmail || ''}
                      onChange={(e) =>
                        setProposal((prev) => ({ ...prev, clientEmail: e.target.value }))
                      }
                      className="w-full border rounded px-3 py-2"
                      placeholder="client@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Phone Number
                    </label>
                    <input
                      type="tel"
                      value={proposal.clientPhoneNumber || ''}
                      onChange={(e) =>
                        setProposal((prev) => ({ ...prev, clientPhoneNumber: e.target.value }))
                      }
                      className="w-full border rounded px-3 py-2"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={proposal.projectTitle}
                      onChange={(e) =>
                        setProposal((prev) => ({ ...prev, projectTitle: e.target.value }))
                      }
                      className="w-full border rounded px-3 py-2"
                      placeholder="e.g., E-Commerce Platform"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Description
                    </label>
                    <textarea
                      value={proposal.projectDescription || ''}
                      onChange={(e) =>
                        setProposal((prev) => ({ ...prev, projectDescription: e.target.value }))
                      }
                      className="w-full border rounded px-3 py-2"
                      rows={3}
                      placeholder="Describe the project..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Proposal Date
                    </label>
                    <input
                      type="date"
                      value={proposal.proposalDate || ''}
                      onChange={(e) =>
                        setProposal((prev) => ({ ...prev, proposalDate: e.target.value }))
                      }
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      value={proposal.notes || ''}
                      onChange={(e) =>
                        setProposal((prev) => ({ ...prev, notes: e.target.value }))
                      }
                      className="w-full border rounded px-3 py-2"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-bold mb-4">Terms & Conditions</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deposit Required (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={proposal.terms?.depositPercent || 50}
                      onChange={(e) =>
                        setProposal((prev) => ({
                          ...prev,
                          terms: {
                            ...prev.terms,
                            depositPercent: parseInt(e.target.value),
                          },
                        }))
                      }
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timeline
                    </label>
                    <textarea
                      value={proposal.terms?.timeline || ''}
                      onChange={(e) =>
                        setProposal((prev) => ({
                          ...prev,
                          terms: { ...prev.terms, timeline: e.target.value },
                        }))
                      }
                      className="w-full border rounded px-3 py-2"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Terms
                    </label>
                    <textarea
                      value={proposal.terms?.additionalTerms || ''}
                      onChange={(e) =>
                        setProposal((prev) => ({
                          ...prev,
                          terms: { ...prev.terms, additionalTerms: e.target.value },
                        }))
                      }
                      className="w-full border rounded px-3 py-2"
                      rows={3}
                      placeholder="Any additional terms and conditions..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Preview */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-bold mb-4">Live Preview</h2>
                <ProposalPreview
                  clientName={proposal.clientName}
                  projectTitle={proposal.projectTitle}
                  selectedItems={proposal.selectedItems}
                  items={proposal.items}
                  notes={proposal.notes}
                  validUntil={proposal.validUntil}
                />
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'items' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Item Selector */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">All Services</h2>
                  <button
                    onClick={handleAddItem}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                  >
                    + Add
                  </button>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {proposal.items.map((item) => (
                    <label key={item.id} className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={proposal.selectedItems.includes(item.id)}
                        onChange={() => handleToggleItem(item.id)}
                        className="w-4 h-4 mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{item.name}</div>
                        <div className="text-xs text-gray-600">
                          {item.currency || 'USD'} {item.price.toFixed(2)} × {item.quantity || 1}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-6 p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="text-sm text-gray-600">Total</div>
                  <div className="text-2xl font-bold text-gray-900">{total.toFixed(2)}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {proposal.selectedItems.length} of {proposal.items.length} items selected
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Item Editor */}
            <div className="lg:col-span-2 space-y-4">
              {proposal.items.map((item) => (
                <ItemEditor
                  key={item.id}
                  item={item}
                  onSave={handleSaveItem}
                  onDelete={handleDeleteItem}
                  isNew={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div className="bg-white p-8 rounded-lg shadow">
            <ProposalPreview
              clientName={proposal.clientName}
              projectTitle={proposal.projectTitle}
              selectedItems={proposal.selectedItems}
              items={proposal.items}
              notes={proposal.notes}
              validUntil={proposal.validUntil}
            />
          </div>
        )}
      </div>
    </div>
  );
}
