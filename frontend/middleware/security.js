/* global process */

// ── Allowed HTTP methods ───────────────────────────────────────────────────────
const ALLOWED_METHODS = new Set(['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'])

// ── Known attack-scanner / exploitation-tool user-agent patterns ──────────────
const MALICIOUS_UA = [
  /sqlmap/i,
  /nikto/i,
  /nessus/i,
  /openvas/i,
  /masscan/i,
  /zgrab/i,
  /dirbuster/i,
  /\bdirb\b/i,
  /gobuster/i,
  /ffuf/i,
  /wfuzz/i,
  /hydra/i,
  /havij/i,
  /acunetix/i,
  /appscan/i,
  /\bnmap\b/i,
  /metasploit/i,
  /nuclei/i,
  /netsparker/i,
  /w3af/i,
]

// ── URL patterns checked against the DECODED URL ─────────────────────────────
// (decoded first so URL-encoded payloads like %3Cscript or %20UNION don't slip through)
const SUSPICIOUS_URL_DECODED = [
  // Null byte and ASCII control characters (injection across many protocols)
  /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/,
  // Sensitive file extensions commonly probed by scanners
  /\.(php|asp|aspx|jsp|cgi|sh|bash|pl|py|rb|env|git|htaccess|htpasswd|DS_Store|bak|old|sql|dump)(\?|$)/i,
  // XSS payloads in URL
  /<script|javascript:|vbscript:|data:text\/html/i,
  // SQL injection patterns
  /(\bUNION\b.{0,20}\bSELECT\b|\bSELECT\b.{0,20}\bFROM\b|\bDROP\b.{0,20}\bTABLE\b|\bINSERT\b.{0,20}\bINTO\b)/i,
  // Remote code execution signatures
  /base64_decode\s*\(|eval\s*\(|exec\s*\(|system\s*\(|passthru\s*\(/i,
]

// ── Path-traversal patterns checked against the RAW (un-decoded) URL ─────────
// Express normalises `../` out of req.url before routing, so we must look at
// req.originalUrl and also catch percent-encoded forms like %2e%2e/ and %2f.
const TRAVERSAL_RAW = [
  /\.\.[/\\]/,           // literal ../  or  ..\
  /%2e%2e[/%\\]/i,       // %2e%2e/ or %2e%2e%2f  (double dot, encoded slash)
  /%2e\.[/\\%]/i,        // %2e./  (one dot encoded)
  /\.%2e[/\\%]/i,        // .%2e/  (one dot encoded, other literal)
]

/** URL-decodes a string without throwing on malformed sequences. */
function safeDecode(str) {
  try {
    return decodeURIComponent(str)
  } catch {
    return str
  }
}

/**
 * Express middleware: validates method, URL, user-agent, and URL patterns.
 * Blocks the request with an appropriate 4xx status if any check fails.
 */
export function guardRequest(req, res, next) {
  // 1. Method whitelist
  if (!ALLOWED_METHODS.has(req.method?.toUpperCase())) {
    return res.status(405).type('text/plain').send('Method Not Allowed')
  }

  // Use originalUrl so we see the request before Express normalises the path
  const rawUrl = req.originalUrl ?? req.url ?? '/'

  // 2. Reject absurdly long URLs (buffer-overflow / scanner probes)
  if (rawUrl.length > 2048) {
    return res.status(414).type('text/plain').send('URI Too Long')
  }

  // 3. Block known attack tooling by user-agent
  const ua = req.headers['user-agent'] ?? ''
  if (MALICIOUS_UA.some((p) => p.test(ua))) {
    return res.status(403).type('text/plain').send('Forbidden')
  }

  // 4. Path-traversal check on the raw URL (catches encoded variants too)
  if (TRAVERSAL_RAW.some((p) => p.test(rawUrl))) {
    return res.status(400).type('text/plain').send('Bad Request')
  }

  // 5. Injection checks on the decoded URL (catches %20UNION, %3Cscript, etc.)
  const decodedUrl = safeDecode(rawUrl)
  if (SUSPICIOUS_URL_DECODED.some((p) => p.test(decodedUrl))) {
    return res.status(400).type('text/plain').send('Bad Request')
  }

  next()
}
