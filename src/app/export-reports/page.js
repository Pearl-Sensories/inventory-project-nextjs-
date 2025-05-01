"use client";
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa'; // Import the close icon
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function InventoryReportPage() {
  const [reportText, setReportText] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false); // New state for success message
  const router = useRouter(); // Initialize the router

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: reportText,
          createdAt: new Date().toISOString(),
        }),
      });

      const data = await res.json().catch(() => ({ error: 'Failed to parse server response' }));

      if (res.ok) {
        toast.success('Report saved successfully!');
        setReportText(''); // Clear the textarea after saving
        setSaveSuccess(true); // Show success message
        setTimeout(() => setSaveSuccess(false), 3000); // Hide after 3 seconds
      } else {
        toast.error(data.error || 'Failed to save report.');
      }
    } catch (err) {
      console.error('Save failed:', err);
      toast.error('Unexpected error occurred.');
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'inventory-report.txt';
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

      <h1 className="text-2xl font-bold mb-4">Manual Inventory Report</h1>

      {/* Success message display */}
      {saveSuccess && (
        <div className="text-green-600 mb-4">
          Report saved successfully!
        </div>
      )}

      <textarea
        rows={20}
        value={reportText}
        onChange={(e) => setReportText(e.target.value)}
        className="w-full p-4 border rounded-lg shadow resize-none focus:outline-none focus:ring"
        placeholder="Write your inventory observations, summaries, notes here..."
      />

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={saving || !reportText.trim()}
        >
          {saving ? 'Saving...' : 'Save to Database'}
        </button>

        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={!reportText.trim()}
        >
          Export as Text
        </button>
      </div>
    </div>
  );
}
