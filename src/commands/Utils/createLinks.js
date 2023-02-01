import BaseCommand from "../../structures/command.js";

class CreateLink extends BaseCommand {
  constructor() {
    super();
    this.setDescription("creates a rendered link");
    this.addStringOption((option) => option.setName("message").setDescription("the link message").setRequired(true));
    this.addStringOption((option) => option.setName("url").setDescription("the url of the message").setRequired(true));
  }

  async execute(client, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const message = interaction.options.getString("message");
    const url = interaction.options.getString("url");

    const username = interaction.user.username;
    const avatar = interaction.user.displayAvatarURL({ dynamic: true });

    const channel = interaction.channel.isThread()
      ? await client.channels.fetch(interaction.channel.parentId)
      : interaction.channel;

    const webhook = await channel.createWebhook({
      name: username,
      avatar: avatar,
    });

    const content = {
      content: `[${message}](${url})`,
      threadId: interaction.channel.isThread() ? interaction.channelId : undefined,
    };

    await webhook.send(content);
    await webhook.delete();

    await interaction.editReply("Message sent successfully");
  }
}

export default CreateLink;
