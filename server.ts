import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import healthHandler from './api/health.ts';
import busArrivalHandler from './api/busarrival.ts';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Serverless routes mapped to /api folder
  app.all('/api/health', (req, res) => {
    return healthHandler(req, res);
  });

  app.all('/api/busarrival', (req, res) => {
    return busArrivalHandler(req, res);
  });

  // In production serve dist, in development mount Vite middleware
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Transit Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
