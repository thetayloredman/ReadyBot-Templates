const { Client } = require("discord.js");
const client = new Client({ intents: 3 });

client.once("ready", () => {
  console.log("Bot is online!");
});

// You either use .env or use a config.json file for your bot token
client.login();