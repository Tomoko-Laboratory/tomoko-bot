import BaseEvent, { Events } from "../../structures/Event.js";

class InteractionCreate extends BaseEvent {
  constructor() {
    super(Events.InteractionCreate);
  }

  async run(client, interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return interaction.reply(`The **${interaction.commandName}** command is currently unavailable`);

    await command.run(client, interaction);
  }
}

export default InteractionCreate;
