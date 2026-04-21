'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type SubmittedProposal = {
  id: string;
  client_name: string;
  client_email: string | null;
  project_title: string;
  total: number;
  status: string;
  submitted_at: string;
  company?: {
    businessName?: string;
  } | null;
};

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export default function SubmittedProposalsPage() {
  const [proposals, setProposals] = useState<SubmittedProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProposals = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/api/proposals');
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.error || 'Failed to load submitted proposals');
        }

        setProposals(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load submitted proposals');
      } finally {
        setLoading(false);
      }
    };

    loadProposals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Submitted Proposals</h1>
            <p className="text-gray-600">Database-backed list of proposals submitted by admin.</p>
          </div>
          <Link
            href="/admin/proposals"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Back to Admin
          </Link>
        </div>

        {loading && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-700">
            Loading submitted proposals...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
            {error}
          </div>
        )}

        {!loading && !error && proposals.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-700">
            No submitted proposals found.
          </div>
        )}

        {!loading && !error && proposals.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200 text-gray-700">
                  <th className="px-4 py-3 font-semibold">Proposal ID</th>
                  <th className="px-4 py-3 font-semibold">Client</th>
                  <th className="px-4 py-3 font-semibold">Company</th>
                  <th className="px-4 py-3 font-semibold">Project</th>
                  <th className="px-4 py-3 font-semibold">Total</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((proposal) => (
                  <tr key={proposal.id} className="border-b border-gray-100 text-gray-800">
                    <td className="px-4 py-3 font-mono text-xs">{proposal.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{proposal.client_name}</div>
                      <div className="text-xs text-gray-500">{proposal.client_email || '-'}</div>
                    </td>
                    <td className="px-4 py-3">{proposal.company?.businessName || '-'}</td>
                    <td className="px-4 py-3">{proposal.project_title}</td>
                    <td className="px-4 py-3">{Number(proposal.total || 0).toFixed(2)}</td>
                    <td className="px-4 py-3 capitalize">{proposal.status || '-'}</td>
                    <td className="px-4 py-3">{formatDate(proposal.submitted_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
