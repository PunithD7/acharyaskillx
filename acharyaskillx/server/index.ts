// server/index.ts
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import { v4 as uuidv4 } from 'uuid';
import { registerRoutes } from './routes';
import { setupVite, serveStatic, log } from './vite';
import { createServer } from 'http';

const app = express();

// --- Middleware ---
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// --- Logging ---
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json.bind(res);
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson(bodyJson, ...args);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api')) {
      let logLine = `${req.method} ${req.path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + '…';
      log(logLine);
    }
  });

  next();
});

// --- Env variables ---
const OPENAI_KEY = process.env.OPENAI_API_KEY!;
const APP_ID = process.env.AGORA_APP_ID!;
const APP_CERT = process.env.AGORA_APP_CERTIFICATE!;

// --- Agora Token ---
app.get('/api/agora/token', (req: Request, res: Response) => {
  const channel = (req.query.channel as string) || 'prashikshan-demo';
  const uid = req.query.uid ? Number(req.query.uid) : 0;
  const role = RtcRole.PUBLISHER;
  const expireTime = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTimestamp + expireTime;

  const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERT, channel, uid, role, privilegeExpireTime);
  res.json({ appId: APP_ID, token });
});

// --- OpenAI ephemeral session ---
app.post('/api/openai/session', async (req: Request, res: Response) => {
  try {
    const { model = 'gpt-4o-realtime-preview', jobDescription = '', voice = 'alloy' } = req.body || {};
    const payload = {
      model,
      voice,
      instructions: `You are an interviewer. Use the job description to ask role-specific questions. Job: ${jobDescription}`,
    };

    const resp = await axios.post('https://api.openai.com/v1/realtime/sessions', payload, {
      headers: { Authorization: `Bearer ${OPENAI_KEY}` },
    });

    res.json(resp.data);
  } catch (err: any) {
    console.error('OpenAI session error', err?.response?.data || err.message);
    res.status(500).json({ error: 'failed to create openai session' });
  }
});

// --- Report generator ---
app.post('/api/report', async (req: Request, res: Response) => {
  try {
    const { sessionId = uuidv4(), transcript = '', summary = '' } = req.body;
    const prompt = `Create a professional interview report for this session:\n\nTranscript:\n${transcript}\n\nSummary:\n${summary}`;

    const resp = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert recruiter assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 800,
      },
      { headers: { Authorization: `Bearer ${OPENAI_KEY}` } }
    );

    const reportText = resp.data.choices[0].message.content;

    const reportsDir = path.join(__dirname, 'reports');
    fs.mkdirSync(reportsDir, { recursive: true });
    const pdfPath = path.join(reportsDir, `${sessionId}.pdf`);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.fontSize(18).text('Interview Report', { align: 'center' }).moveDown();
    doc.fontSize(11).text(reportText);
    doc.end();

    res.json({ reportUrl: `/api/reports/${sessionId}.pdf` });
  } catch (err: any) {
    console.error('Report error', err?.response?.data || err.message);
    res.status(500).json({ error: 'failed to generate report' });
  }
});

// Serve reports
app.use('/api/reports', express.static(path.join(__dirname, 'reports')));

// --- Setup Vite + SPA fallback ---
(async () => {
  const serverHttp = createServer(app);
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message });
    throw err;
  });

  if (app.get('env') === 'development') {
    await setupVite(app, serverHttp);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || '5000', 10);
  serverHttp.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
})();
