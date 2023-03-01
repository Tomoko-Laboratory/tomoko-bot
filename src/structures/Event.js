import { Events } from "discord.js";
import wait from "../utils/wait.js";

class BaseEvent {
  constructor(eventType) {
    this.eventType = eventType;
  }

  async run() {}

  async execute(client, ...rest) {
    const [error] = await wait(this.run(client, ...rest));
    if (error) console.log(error);
  }
}

export default BaseEvent;
export { Events }; // so you don't have to do two imports
