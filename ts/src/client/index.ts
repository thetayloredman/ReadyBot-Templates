import { Client, Collection } from "discord.js";
import path from 'path';
import { readdirSync } from 'fs';
import { Event, Command, Config } from '../interfaces';
import configJson from '../config.json';

class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public config: Config = configJson;
  public aliases: Collection<string, Command> = new Collection();

  public async init() {
    this.login(this.config.token);

    /* Command section */
    const commandPath = path.join(__dirname, "..", "commands");
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts'));

      for (const file of commands) {
        const { command } = require(`${commandPath}/${dir}/${file}`);
        this.commands.set(command.name, command);

        if (command?.aliases.length !== 0) {
          command.aliases.forEach((alias) => {
            this.aliases.set(alias, command)
          })
        }
      }
    })

    /* Event section */
    const eventPath = path.join(__dirname, "..", "events");
    readdirSync(eventPath).forEach(async (file) => {
      const { event } = await import(`${eventPath}/${file}`);
      this.events.set(event.name, event);

      console.info(event);
      this.on(event.name, event.run.bind(null, this));
    })
  }
}

export default ExtendedClient;
