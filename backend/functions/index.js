/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const { exec } = require('child_process');
const path = require('path');

// Path to your Python environment's gunicorn executable
// Path to your Python environment's gunicorn executable
const gunicorn = path.resolve(__dirname, '../myenv/bin/gunicorn');

// Path to your Flask app's main Python file and module name
const flaskAppPath = path.resolve(__dirname, '../');  // Adjust based on your file structure
const flaskAppModule = 'app:app';  

// Start the Flask app using Gunicorn
// Start the Flask app using Gunicorn
exec(`${gunicorn} -b :8081 ${flaskAppModule}`, { cwd: flaskAppPath }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting Flask app: ${error.message}`);
    return;
  }
  console.log(`Flask app started: ${stdout}`);
  console.error(`Flask app errors: ${stderr}`);
});

// Proxy requests to the Flask app
exports.api = functions.https.onRequest((req, res) => {
  const proxy = require('http-proxy').createProxyServer({
    target: 'http://localhost:8080'
  });
  proxy.web(req, res);
});