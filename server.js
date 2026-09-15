// server.js - Production Entrypoint for Timeweb Cloud App Platform
const fs = require('fs');
const path = require('path');

// 1. Prevent unhandledRejection from crashing the process on permission issues
process.on('unhandledRejection', (reason) => {
  const msg = reason && (reason.message || String(reason));
  if (reason && (reason.code === 'EACCES' || (msg && msg.includes('EACCES')))) {
    console.warn('[Server] Suppressed EACCES cache permission warning:', msg);
    return;
  }
  console.error('[Server UnhandledRejection]:', reason);
});

// 2. Ensure environment defaults for Timeweb Cloud container networking
process.env.NODE_ENV = 'production';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';
process.env.PORT = process.env.PORT || '3000';

// 3. Attempt to ensure image cache directory exists if writable
try {
  const cacheDir = path.join(process.cwd(), '.next', 'cache', 'images');
  fs.mkdirSync(cacheDir, { recursive: true });
} catch (e) {
  // Ignored in read-only / restricted container environments
}

// 4. Run standalone server if present, else fallback to next start
const standaloneServer = path.join(process.cwd(), '.next', 'standalone', 'server.js');

if (fs.existsSync(standaloneServer)) {
  console.log(`[Server] Starting Next.js standalone server on ${process.env.HOSTNAME}:${process.env.PORT}`);
  // Copy or symlink static files into standalone if needed
  try {
    const staticSrc = path.join(process.cwd(), '.next', 'static');
    const staticDst = path.join(process.cwd(), '.next', 'standalone', '.next', 'static');
    if (fs.existsSync(staticSrc) && !fs.existsSync(staticDst)) {
      fs.mkdirSync(path.dirname(staticDst), { recursive: true });
      fs.symlinkSync(staticSrc, staticDst, 'dir');
    }
  } catch (_) {}

  try {
    const publicSrc = path.join(process.cwd(), 'public');
    const publicDst = path.join(process.cwd(), '.next', 'standalone', 'public');
    if (fs.existsSync(publicSrc) && !fs.existsSync(publicDst)) {
      fs.symlinkSync(publicSrc, publicDst, 'dir');
    }
  } catch (_) {}

  require(standaloneServer);
} else {
  console.log(`[Server] Starting standard Next.js server on ${process.env.HOSTNAME}:${process.env.PORT}`);
  require('next/dist/bin/next');
}
