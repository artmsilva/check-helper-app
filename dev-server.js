#!/usr/bin/env node

/**
 * Simple development server for native ES modules
 * No build tools required - serves files directly
 */

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

// MIME types for different file extensions
const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || "application/octet-stream";
}

const server = http.createServer((req, res) => {
  // Parse the URL
  let filePath = "." + req.url;

  // Default to index.html for root requests
  if (filePath === "./") {
    filePath = "./index.html";
  }

  // Security: prevent directory traversal
  if (filePath.includes("..")) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  // Resolve the file path
  const fullPath = path.resolve(__dirname, filePath);

  // Check if file exists
  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found - try common alternatives
      if (req.url.endsWith("/")) {
        // Try index.html in directory
        const indexPath = path.join(fullPath, "index.html");
        fs.access(indexPath, fs.constants.F_OK, (indexErr) => {
          if (!indexErr) {
            serveFile(indexPath, res);
          } else {
            send404(res);
          }
        });
      } else {
        send404(res);
      }
      return;
    }

    serveFile(fullPath, res);
  });
});

function serveFile(filePath, res) {
  const contentType = getContentType(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end("Server Error: " + err.code);
      return;
    }

    // Set headers
    res.writeHead(200, {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*", // Allow CORS for development
      "Cache-Control": "no-cache", // Disable caching for development
    });

    res.end(content);
  });
}

function send404(res) {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end(`
    <!DOCTYPE html>
    <html>
      <head><title>404 Not Found</title></head>
      <body>
        <h1>404 - File Not Found</h1>
        <p>The requested file could not be found.</p>
        <a href="/">Go back to home</a>
      </body>
    </html>
  `);
}

server.listen(PORT, () => {
  console.log(`🚀 Development server running at:`);
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   Network: http://0.0.0.0:${PORT}`);
  console.log("");
  console.log("📝 Ready for native ES modules with import maps!");
  console.log("🔥 No build tools required");
});

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n👋 Shutting down development server...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});
