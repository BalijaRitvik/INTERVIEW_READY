import express from 'express';
import {ENV} from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import { upsertStreamUser, deleteStreamUser } from "./lib/stream.js";
import {clerkMiddleware} from '@clerk/express';
import User from "./models/User.js";
import EventEmitter from "events";
import chatRoutes from './routes/chatRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';

// simple stream system (can be replaced by WebSocket later)
export const stream = new EventEmitter();


const app = express();

//middleware
app.use(express.json());
//credentials:true meaning??=>server allows a browser to include cookies on request
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));
app.use(clerkMiddleware());// this adds auth field to request object:req.auth()


app.use("/api/chat",chatRoutes);
app.use("/api/interviews",sessionRoutes);
// Sync logged-in user to MongoDB + Stream
app.post("/api/users/sync", async (req, res) => {
  console.log("🔥 /api/users/sync HIT");
  console.log("📦 body:", req.body);

  try {
    const { user } = req.body;

    if (!user || !user.id) {
      console.log("❌ Invalid user payload");
      return res.status(400).json({ message: "Invalid user data" });
    }

    // 1️⃣ Save to MongoDB
    const savedUser = await User.findOneAndUpdate(
      { clerkId: user.id },
      {
        clerkId: user.id,
        email: user.email,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        profileImage: user.imageUrl || "",
      },
      { upsert: true, new: true }
    );

    console.log("✅ User saved in MongoDB:", savedUser.clerkId);

    // 2️⃣ Sync user to Stream (CHAT)
    try {
      await upsertStreamUser({
        id: savedUser.clerkId,              // MUST be unique
        name: savedUser.name || savedUser.email,
        image: savedUser.profileImage || undefined,
      });
    } catch (streamErr) {
      // Do NOT crash app if Stream fails
      console.error("⚠️ Stream sync failed (non-fatal):", streamErr.message);
    }

    // 3️⃣ Emit local event (optional)
    stream.emit("user:login", savedUser);

    return res.json({ ok: true });
  } catch (err) {
    console.error("❌ Server error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

const startServer = async () => {
    try {
        await connectDB(); 
        app.listen(ENV.PORT, () => console.log(`Server running in ${ENV.NODE_ENV} mode on port ${ENV.PORT}`));
        } catch (error) {
        console.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
    };
startServer();