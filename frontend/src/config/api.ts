/**
 * Central API Configuration for NyayaSetu
 * Automatically switches between local development and production backend
 * configured via VITE_API_URL environment variable on Vercel.
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
