import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json()); // to parse the incoming JSON requests
app.use(cors()); // to enable CORS (Cross-Origin Resource Sharing)
app.use(helmet({
  contentSecurityPolicy: false,
})); // a security middleware helps to set various HTTP headers to secure the app
app.use(morgan("dev")); // log the request details to the console

//apply rate limit to all routes

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // specify that each req consume 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res
          .status(429)
          .json({ error: "Too many requests. Please try again later." });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Access denied. Bot detected." });
      } else {
        res.status(403).json({ error: "Access forbidden." });
      }
      return;
    }

    //check for spoofed bots
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: "Access denied. Spoofed bot detected." });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: `Arcjet Error: ${error}` });
    next(error);
  }
});

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  // serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  // Express 5 catch-all: use app.all() which handles the route without path-to-regexp issues
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

async function initDB() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
  } catch (error) {
    console.log(`Error in DB ${error}`);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
