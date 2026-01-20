import { useEffect, useState } from "react";
import { getAuditLogs } from "../services/auditService.js";

const AuditLogPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getAuditLogs().then(setLogs);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Audit Logs</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.action} - {log.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuditLogPage;
