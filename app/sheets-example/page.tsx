'use client';

import { useEffect, useState } from 'react';

interface SheetsData {
  values?: string[][];
  error?: string;
}

export default function SheetsExample() {
  const [data, setData] = useState<SheetsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSheetsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/sheets-example');
      const result = await response.json();

      if (result.error) {
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Uncomment to auto-fetch on component mount
    // fetchSheetsData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Google Sheets Integration Example</h1>
      
      <button
        onClick={fetchSheetsData}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Fetch Sheets Data'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded text-red-700">
          <p><strong>Error:</strong> {error}</p>
          <p className="text-sm mt-2">
            Make sure to:
            <br />
            1. Set <code className="bg-gray-100">GOOGLE_SHEETS_API_KEY</code> in <code className="bg-gray-100">.env.local</code>
            <br />
            2. Replace <code className="bg-gray-100">SHEET_ID</code> and <code className="bg-gray-100">RANGE</code> in the API route
            <br />
            3. Enable Google Sheets API in Google Cloud Console
          </p>
        </div>
      )}

      {data && data.values && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Sheet Data:</h2>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              {data.values.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-100' : ''}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 p-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 rounded border border-blue-200">
        <h3 className="font-semibold mb-2">Setup Instructions:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Get a Google Sheets API key from <a href="https://console.cloud.google.com/" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
          <li>Create a <code className="bg-gray-100">.env.local</code> file and add: <code className="bg-gray-100">GOOGLE_SHEETS_API_KEY=your_key</code></li>
          <li>Update the <code className="bg-gray-100">SHEET_ID</code> in the API route with your sheet ID</li>
          <li>Make sure your Google Sheet is shared publicly or your service account has access</li>
        </ol>
      </div>
    </div>
  );
}
