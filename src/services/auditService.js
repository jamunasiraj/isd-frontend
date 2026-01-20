import { apiFetch } from "./isdapi";

export const getAuditLogs = () => apiFetch("/audit/logs");
