import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

// if you don’t have ./controllers/socketManager.js yet, comment this for now
// import { connectToSocket } from "./controllers/socketManager.js";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } }); // basic socket setup

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// example route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const start = async () => {
  try {
    const connectionDb = await mongoose.connect(
      "mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster0.cujabk4.mongodb.net/"
    );
    console.log(`✅ MONGO Connected: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`✅ Listening on port ${app.get("port")}`);
    });
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
  }
};

start();
