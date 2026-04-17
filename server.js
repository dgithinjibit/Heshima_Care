import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for JSON parsing
  app.use(express.json());

  const SCARCITY_ALERTS = [];
  const DEFAULT_ANOMALIES = [
    { id: 'anom-1', type: 'Node Delay', target: 'Nakuru Town West', severity: 'High', timestamp: new Date().toISOString() },
    { id: 'anom-2', type: 'Density Surge', target: 'Kibera South', severity: 'Info', timestamp: new Date().toISOString() }
  ];

  // --- Secret Service Layer (Simulated Government Profiling & Infrastructure Monitoring) ---
  const COMMUNITY_HUBS = [
    { id: '1', name: 'Kibera South Health Centre', county: 'Nairobi', lat: -1.3120, lng: 36.7845, stockLevel: 'High', products: ['Pads', 'Tampons', 'Cups'], status: 'active', latency: 12 },
    { id: '2', name: 'Mathare North Dispensary', county: 'Nairobi', lat: -1.2541, lng: 36.8654, stockLevel: 'Medium', products: ['Pads', 'Liners'], status: 'active', latency: 18 },
    { id: '3', name: 'Mukuru kwa Njenga Community', county: 'Nairobi', lat: -1.3182, lng: 36.8821, stockLevel: 'Low', products: ['Pads'], status: 'congestion', latency: 45 },
    { id: '4', name: 'Likoni Response Hub', county: 'Mombasa', lat: -4.0833, lng: 39.6667, stockLevel: 'High', products: ['Pads', 'Cups'], status: 'active', latency: 15 },
    { id: '5', name: 'Kawangware Coast Empowerment', county: 'Nairobi', lat: -1.2885, lng: 36.7451, stockLevel: 'Medium', products: ['Pads', 'Tampons'], status: 'active', latency: 22 },
    { id: '6', name: 'Githurai 45 Focal Point', county: 'Kiambu', lat: -1.1895, lng: 36.9174, stockLevel: 'High', products: ['Pads', 'Cups'], status: 'active', latency: 20 },
    { id: '7', name: 'Kisumu Manyatta Social Hall', county: 'Kisumu', lat: -0.1022, lng: 34.7761, stockLevel: 'Medium', products: ['Pads', 'Liners'], status: 'active', latency: 28 },
    { id: '8', name: 'Nakuru Town West Node', county: 'Nakuru', lat: -0.2831, lng: 36.0667, stockLevel: 'Low', products: ['Pads'], status: 'maintenance', latency: 104 },
    { id: '9', name: 'Eldoret Langas Hub', county: 'Uasin Gishu', lat: 0.5055, lng: 35.2641, stockLevel: 'High', products: ['Pads', 'Cups'], status: 'active', latency: 14 },
    { id: '10', name: 'Mandera Border Center', county: 'Mandera', lat: 3.9373, lng: 41.8569, stockLevel: 'Medium', products: ['Pads'], status: 'active', latency: 55 },
    { id: '11', name: 'Garissa Town Central', county: 'Garissa', lat: -0.4532, lng: 39.6461, stockLevel: 'High', products: ['Pads', 'Tampons'], status: 'active', latency: 32 },
    { id: '12', name: 'Lodwar Community Node', county: 'Turkana', lat: 3.1194, lng: 35.5914, stockLevel: 'Low', products: ['Pads'], status: 'active', latency: 40 },
  ];

  // API Endpoints
  app.get('/api/hubs', (req, res) => {
    res.json(COMMUNITY_HUBS);
  });

  app.get('/api/surveillance', (req, res) => {
    res.json({
      activeNodes: COMMUNITY_HUBS.length,
      networkLatencyAvg: '24ms',
      bandwidthAllocation: '85%',
      anomalyDetection: SCARCITY_ALERTS.length > 0 ? [...SCARCITY_ALERTS, ...DEFAULT_ANOMALIES] : DEFAULT_ANOMALIES,
      ispMetrics: {
        safaricom: { stability: 'Optimal', throughput: '4.2 Gbps' },
        airtel: { stability: 'Stable', throughput: '1.8 Gbps' },
        telkom: { stability: 'Fluctuating', throughput: '600 Mbps' }
      }
    });
  });

  app.post('/api/report-scarcity', (req, res) => {
    const { payload } = req.body;
    console.log(`[SURVEILLANCE] Received sealed scarcity signal: ${payload}`);
    
    SCARCITY_ALERTS.push({
      id: `alert-${Date.now()}`,
      type: 'Scarcity Signal',
      target: 'Community Center',
      severity: 'Medium',
      timestamp: new Date().toISOString()
    });

    res.json({ status: 'delivered' });
  });

  app.get('/api/stats', (req, res) => {
    res.json({
      totalDistributions: 125430,
      activeUsers: 45200,
      countiesCovered: 47,
      impactFactor: 0.92,
    });
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Heshima Hub Server running on http://localhost:${PORT}`);
  });
}

startServer();
