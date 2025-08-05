import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { pathname } = new URL(req.url || '', `http://${req.headers.host}`);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Route API requests
  switch (pathname) {
    case '/api/ping':
      res.status(200).json({ message: 'Hello from Vercel serverless function!' });
      break;
    
    case '/api/demo':
      res.status(200).json({ message: 'Hello from demo API!' });
      break;
    
    default:
      res.status(404).json({ error: 'API endpoint not found', pathname });
  }
} 