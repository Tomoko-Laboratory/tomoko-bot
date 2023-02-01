import { Client, Collection } from "discord.js";
import botSettings from "./configs/bot.js";

class Bot extends Client {
  constructor() {
    super({
      intents: botSettings.intents,
      presence: {
        activities: botSettings.defaultActivity,
      },
      ws: {
        properties: {
          browser: "Discord iOS",
        },
      },
    });

    this.commands = new Collection();
  }

  destroy() {
    console.warn("[CLIENT] - The client is being destroyed!");
    super.destroy();
  }
}

export default Bot;
