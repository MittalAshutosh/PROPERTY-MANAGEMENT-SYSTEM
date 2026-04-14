// API Configuration
// In production (Vercel), use /api prefix. Locally, use localhost:4000
const isProd = typeof window !== 'undefined' && !window.location.hostname.includes('localhost');
export const API_BASE_URL = import.meta.env.VITE_API_URL || (isProd ? '/api' : 'http://localhost:4000');

export const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || '';