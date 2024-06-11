const functions = require('firebase-functions');
const { exec } = require('child_process');
const path = require('path');
const httpProxy = require('http-proxy');

const gunicorn = path.resolve(__dirname, '../myenv/bin/gunicorn');
const flaskAppPath = path.resolve(__dirname, '../');
const flaskAppModule = 'app:app';

const proxy = httpProxy.createProxyServer({ target: 'http://127.0.0.1:8083' });

proxy.on('proxyRes', (proxyRes, req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});

proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Something went wrong. Please try again later.');
});

// Start the Flask app using Gunicorn
exec(`${gunicorn} -b 127.0.0.1:8083 ${flaskAppModule}`, { cwd: flaskAppPath }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting Flask app: ${error.message}`);
    return;
  }
  console.log(`Flask app started: ${stdout}`);
  console.error(`Flask app errors: ${stderr}`);
});

// Proxy requests to the Flask app
exports.api = functions.https.onRequest((req, res) => {
  console.log('Received request:', req.url);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  proxy.web(req, res);
});
