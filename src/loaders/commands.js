import { Collection, REST, Routes } from "discord.js";
import { readdirSync } from "node:fs";
import botSettings from "../configs/bot.js";

async function loadCommands(client) {
  const updateCommands = new Collection();
  const { disabledCommands } = botSettings;
  const { CLIENT_ID, TOKEN_BOT } = process.env;

  // get the names of all categories
  const pathToCommands = new URL("../commands/", import.meta.url);
  const categoryNames = await readdirSync(pathToCommands);

  for (const category of categoryNames) {
    // checks if this category has been disabled
    if (disabledCommands.folders.includes(category)) continue;

    // gets the name of all the commands in the category
    const fileNames = await readdirSync(pathToCommands.pathname + category);

    for (const file of fileNames) {
      // checks if this command has been disabled.
      const commandName = file.split(".")[0].toLowerCase();
      if (disabledCommands.commands.includes(commandName)) continue;

      const { default: Command } = await import(pathToCommands.pathname + category + "/" + file);
      const command = new Command();

      command.setName(commandName);
      command.category = category;

      updateCommands.set(commandName, command);
    }
  }

  // updating slash commands
  const rest = new REST({ version: "10" }).setToken(TOKEN_BOT);
  await rest.put(Routes.applicationCommands(CLIENT_ID), {
    body: updateCommands.map((x) => x),
  });

  client.commands = updateCommands;
  console.log(`[LOADER:COMMAND] - ${updateCommands.size} commands were loaded successfully`);
}

export default loadCommands;
