import { randomBytes } from "crypto";

/**
 * Generates a KSUID (K-Sortable Unique IDentifier)
 * KSUID format: 27 characters, base62 encoded
 * First 4 bytes: timestamp (seconds since epoch)
 * Last 16 bytes: random payload
 */
export function generateKSUID(): string {
  // Get current timestamp in seconds
  const timestamp = Math.floor(Date.now() / 1000);

  // Create timestamp buffer (4 bytes)
  const timestampBuffer = Buffer.alloc(4);
  timestampBuffer.writeUInt32BE(timestamp, 0);

  // Generate random payload (16 bytes)
  const payload = randomBytes(16);

  // Combine timestamp and payload
  const ksuidBuffer = Buffer.concat([timestampBuffer, payload]);

  // Convert to base62 string
  return ksuidBuffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
    .substring(0, 27);
}
