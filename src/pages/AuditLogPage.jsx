import { useEffect, useState } from "react";
import { getAuditLogs } from "../services/auditService.js";

const LOGS_PER_PAGE = 10;

const AuditLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAuditLogs()
      .then(setLogs)
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(logs.length / LOGS_PER_PAGE);
  const pagedLogs = logs.slice(
    (page - 1) * LOGS_PER_PAGE,
    page * LOGS_PER_PAGE
  );

  const goPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goNext = () => setPage((p) => Math.min(p + 1, totalPages));

  if (loading) {
    return <div className="p-6">Loading audit logs...</div>;
  }

  if (logs.length === 0) {
    return <div className="p-6">No audit logs found.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Audit Logs</h2>
<table className="min-w-full border-collapse border border-gray-300">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-gray-300 px-4 py-2 text-left">Admin</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Details</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Timestamp</th>
    </tr>
  </thead>
  <tbody>
    {pagedLogs.map((log) => (
      <tr key={log.id}>
        <td className="border border-gray-300 px-4 py-2">{log.adminUsername}</td>
        <td className="border border-gray-300 px-4 py-2">{log.action}</td>
        <td className="border border-gray-300 px-4 py-2">{log.details}</td>
        <td className="border border-gray-300 px-4 py-2">
          {new Date(log.createdAt).toLocaleString()}
        </td>
      </tr>
    ))}
  </tbody>
</table>

      {/* Pagination controls */}
      <div className="mt-4 flex justify-between items-center max-w-xs mx-auto">
        <button
          onClick={goPrev}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={goNext}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AuditLogPage;
