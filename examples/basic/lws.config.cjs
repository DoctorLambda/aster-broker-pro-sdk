/**
 * @fileoverview Configuration for a local development proxy server (e.g., webpack-dev-server or similar tool).
 * This setup routes API and static asset requests to external production endpoints 
 * while serving the Single Page Application (SPA) index.html locally.
 * * Note: The sequence of rewrite rules matters; specific rules must precede general ones.
 */
module.exports = {
    // --- 1. API & STATIC ASSET REWRITES (MUST COME FIRST) ---
    rewrite: [
        // Route futures trading public API calls to the external Astardex BAPI server.
        {
            from: "/bapi/(.*)",
            to: "https://www.asterdex.com/bapi/$1",
        },
        // Route futures trading private API calls (if used) to the external Astardex FAPI server.
        {
            from: "/fapi/(.*)",
            to: "https://www.asterdex.com/fapi/$1",
        },
        // Route general static files related to cloud futures assets.
        {
            from: "/cloud-futures/(.*)",
            to: "https://static.asterdex.com/cloud-futures/$1",
        },
        // Route generic API endpoints (if used) to the external static API location.
        {
            from: "/api/(.*)",
            to: "https://static.asterdex.com/api/$1",
        },
        // FIX: Add mapping for /s3/static/ path used by the SDK's staticBaseUrl in index.html.
        {
            from: "/s3/static/(.*)",
            to: "https://static.asterdex.com/s3/static/$1",
        },
        // SPA Routing: Catches dynamic URLs like /en/futures/BTCUSDT 
        // and serves the application's root index file, allowing client-side routing.
        // This rule must be last.
        {
            from: "/(.*)/futures/(.*)",
            to: "/index.html",
        },
        // Removed the original /s3/sdk/ rule, as the SDK is now loaded directly from a CDN in index.html.
    ],
    
    // --- 2. SINGLE PAGE APPLICATION (SPA) ROOT ---
    // If no rewrite matches, requests fall through to the SPA entry point.
    spa: "index.html",
    
    // --- 3. SERVER DIRECTORY & LOGGING ---
    directory: "./",
    logFormat: "stats",
};
