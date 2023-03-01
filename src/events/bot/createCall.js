import BaseEvent, { Events } from "../../structures/Event.js";
import { PermissionsBitField, ChannelType } from "discord.js";
import configs from "../../configs/systems.js";

class VoiceStateUpdate extends BaseEvent {
  constructor() {
    super(Events.VoiceStateUpdate);
  }

  async run(client, oldState, newState) {
    // entered a channel
    if (!oldState.channel && newState.channel) {
      if (newState.channel.id !== configs.voiceStateUpdate.channelId) return;

      const channel = await newState.guild.channels.create({
        name: client.users.cache.get(newState.id).username,
        type: ChannelType.GuildVoice,
        parent: newState.channel.parent,
        permissionOverwrites: [
          {
            id: newState.id,
            allow: PermissionsBitField.Flags.ManageChannels,
          },
        ],
      });

      await newState.setChannel(channel.id);
    }

    // leaving the channel
    if (!newState.channel || (oldState.channel && newState.channel)) {
      if (oldState.channel.name === client.users.cache.get(oldState.id).username) {
        await oldState.channel.delete();
      }
    }
  }
}

export default VoiceStateUpdate;
