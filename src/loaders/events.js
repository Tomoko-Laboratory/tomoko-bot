import { readdirSync } from "node:fs";
import botSettings from "../configs/bot.js";

async function loadEvents(client) {
  const { disabledEvents } = botSettings;
  client._events = {};
  let numberOfEvents = 0;

  // get the names of all categories
  const pathToEvents = new URL("../events/", import.meta.url);
  const categoryNames = await readdirSync(pathToEvents);

  for (const category of categoryNames) {
    // checks if this category has been disabled
    if (disabledEvents.folders.includes(category)) continue;

    // gets the name of all events in the category
    const fileNames = await readdirSync(pathToEvents.pathname + category);

    for (const fileName of fileNames) {
      // check if this event has been disabled
      const eventName = fileName.split(".")[0];
      if (disabledEvents.events.includes(eventName)) continue;

      const { default: event } = await import(pathToEvents.pathname + category + "/" + fileName);
      numberOfEvents++;

      const eventWithClient = event.bind(event, client);
      if (category === "bot") client.on(eventName, eventWithClient);
      else if (category === "process") process.on(eventName, eventWithClient);
    }
  }
  console.log(`[LOADER:EVENTS] - ${numberOfEvents} events were successfully loaded`);
}

export default loadEvents;
