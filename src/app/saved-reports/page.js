"use client";
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Importing the close icon
import { useRouter } from 'next/navigation'; // Importing the router for navigation

export default function SavedFilesPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch('/api/reports');
        const data = await res.json();
        setReports(data);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleExport = (report) => {
    const blob = new Blob([report.content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `report-${report.id}.txt`;
    link.href = url;
    link.click();
  };

  const handleClose = () => {
    router.push('/inventoryadmin'); // Navigate to /inventoryadmin when clicked
  };

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      {/* Close icon */}
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
