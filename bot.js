const express = require("express");
const path = require("path");
const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Serve static files (CSS, images, JS, HTML)
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html explicitly on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Redirect invalid routes to 404.html
app.use((req, res) => {
  res.redirect("/404.html");
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});

// =======================
// Discord Bots Section
// =======================

const tokens = [
  process.env.TOKEN1,
  process.env.TOKEN2,
  process.env.TOKEN3
];

tokens.forEach((token, index) => {
  if (!token) return console.log(`Token ${index + 1} is missing!`);

  const client = new Client({
    intents: [GatewayIntentBits.Guilds]
  });

  // ✅ updated event name
  client.once("clientReady", () => {
    console.log(`Bot ${index + 1} logged in as ${client.user.tag}`);
    client.user.setActivity("Raqkid505", { type: ActivityType.Listening });
  });

  client.login(token).catch(err => {
    console.error(`Failed to login bot ${index + 1}:`, err.message);
  });
});

