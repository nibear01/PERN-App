import "dotenv/config";
import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";

// init arcjet
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    // shield protects app from various types of attacks: SQL injection, XSS, LFI, RFI, etc.
    shield({ mode: "LIVE" }),
    detectBot({
      // block requests identified as bots
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    
    // rate limiting using token bucket algorithm
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      capacity: 10,
      interval: 10,
    }),
  ],
});
