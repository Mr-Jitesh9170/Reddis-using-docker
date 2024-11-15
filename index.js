const express = require("express");
const redis = require("redis");


const app = express();
const port = 3000;

// Create Redis Client
const redisClient = redis.createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
});

// Handle Redis Events
redisClient.on("connect", () => {
  console.log("Connected to Redis!");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

// Connect Redis Client
(async () => {
  await redisClient.connect();
})();

// Basic Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Redis Example!");
});


// Example: Set a value in Redis
app.get("/set", async (req, res) => {
  try {
    await redisClient.set("name", "jitesh");
    await redisClient.set("lastname", "pandey");
    res.send(`setup successful`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Example: Get a value from Redis
app.get("/get", async (req, res) => {
  try {
    const reply = await redisClient.get("lastname");
    res.send(`Value: ${reply}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Gracefully handle Redis client disconnection
process.on("SIGINT", async () => {
  await redisClient.quit();
  console.log("Redis client disconnected.");
  process.exit(0);
});
