import BaseEvent, { Events } from "../../structures/Event.js";

class Ready extends BaseEvent {
  constructor() {
    super(Events.ClientReady);
  }

  run(client) {
    console.log(`Logged in as ${client.uer.username}`);
  }
}

export default Ready;
