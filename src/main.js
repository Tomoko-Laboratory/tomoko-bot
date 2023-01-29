import { Client } from "discord.js";
import botSettings from "./configs/bot.js";
import loaders from "./loaders/index.js";

(async () => {
  // create the client
  const client = new Client({ intents: botSettings.intents });

  // loads commands and events
  await loaders.loadCommands(client);
  await loaders.loadEvents(client);

  // log in to the bot
  client.login(process.env.TOKEN_BOT);
  console.log(`[MAIN] - Bot has successfully initialized`);
})();
