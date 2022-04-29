import { Client, Collection } from "discord.js";
// import { connect } from 'mongoose';
import path from 'path';
import { readdirSync } from 'fs';
import { Event, Command, config } from '../interfaces';
import ConfigJson from '../config.json';

class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public config: config = ConfigJson;
  public aliases: Collection<string, Command> = new Collection();

  public async init() {
    this.login(this.config.token);
    // connect(this.config.mongoURI, {
    //   useUnifiedTopology: true,
    //   useFindAndModify: true,
    //   useNewUrlParser: true,
    // })

    /* Command section */

    const commandPath = path.join(__dirname, "..", "commands");
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts'));

      for (const file of commands) {
        const { command } = require(`${commandPath}/${dir}/${file}`);
      }
    })
  }
}

export default ExtendedClient