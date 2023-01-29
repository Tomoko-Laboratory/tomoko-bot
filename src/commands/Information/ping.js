import BaseCommand from "../../structures/command.js";

class Ping extends BaseCommand {
  constructor() {
    super();
    this.setDescription("see my ping");
  }

  async execute(client, interaction) {
    await interaction.reply(`My ping is **${client.ws.ping}ms**`);
  }
}

export default Ping;
