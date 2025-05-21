"use client";
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function SavedFilesPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadReports = async () => {
      try {
        const res = await fetch('/api/reports');
        if (!res.ok) throw new Error("Failed to fetch reports");

        const data = await res.json();
        if (Array.isArray(data)) {
          setReports(data);
          localStorage.setItem('savedReports', JSON.stringify(data)); // Optional: offline cache
        } else {
          console.error('API returned invalid data:', data);
          setReports([]);
        }
      } catch (error) {
        console.error('Failed to fetch reports from API:', error);

        // Fallback to localStorage
        const localReports = localStorage.getItem('savedReports');
        if (localReports) {
          try {
            const parsed = JSON.parse(localReports);
            if (Array.isArray(parsed)) {
              setReports(parsed);
            }
          } catch (e) {
            console.error("Failed to parse local reports from localStorage");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const handleExport = (report) => {
    const blob = new Blob([report.content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `report-${report.id}.txt`;
    link.href = url;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    router.push('/inventoryadmin');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      <FaTimes
        onClick={handleClose}
        className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-gray-700"
        size={24}
      />

      <h1 className="text-2xl font-bold mb-4">Saved Inventory Reports</h1>

      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <p>No saved reports found.</p>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="p-4 border rounded shadow bg-white">
              <div className="text-sm text-gray-500 mb-2">
                Created at: {new Date(report.createdAt).toLocaleString()}
              </div>
              <pre className="whitespace-pre-wrap mb-2">{report.content}</pre>
              <button
                onClick={() => handleExport(report)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Export as Text
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
