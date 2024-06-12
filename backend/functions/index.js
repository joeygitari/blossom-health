const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { HttpsProxyAgent } = require('https-proxy-agent');
const fetch = require('node-fetch');

const app = express();
app.use(cors()); // Use the CORS middleware
app.use(express.json()); // To parse JSON bodies

const proxyUrl = 'https://blossom-health-backend-45kmqfkl3q-uc.a.run.appZ';
const agent = new HttpsProxyAgent(proxyUrl);

// Middleware to proxy requests to Cloud Run
app.use(async (req, res) => {
  const url = `${proxyUrl}${req.url}`;
  const options = {
    method: req.method,
    headers: {
      ...req.headers,
      host: new URL(proxyUrl).host // Set the host header to match the Cloud Run service
    },
    body: req.method === 'GET' || req.method === 'HEAD' ? null : JSON.stringify(req.body),
    agent
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

exports.api = functions.https.onRequest(app);
