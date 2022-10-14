require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes, Client, GatewayIntentBits, Collection } = require('discord.js');
const debug = require('debug')('xingqiu:index');

class XingqiuBot extends Client {
  constructor() {
    super({ intents: [GatewayIntentBits.Guilds] });

    this.commands = new Collection();

    debug('Initializing Xingqiu Bot...');
    this.init();
  }

  init() {
    debug('Registering application commands...');
    const cmdData = [];
    const cmdPath = path.join(__dirname, 'commands');
    const cmdFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith('.js'));

    cmdFiles.forEach(file => {
      const filePath = path.join(cmdPath, file);
      const cmd = require(filePath);
      this.commands.set(cmd.data.name, cmd);
      cmdData.push(cmd.data.toJSON());
    });

    const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);
    // If there is a defined TESTGUILDID in .env,
    // commands will be registered as guild-only
    // else, they will be registered globally
    const clientID = process.env.CLIENTID;
    const guildID = process.env.TESTGUILDID;

    (async () => {
      try {
        if (process.env.TESTGUILDID) {
          const data = await rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: cmdData });
          debug(`Registration of ${data.length} application commands successful.`);
        } else {
          const data = await rest.put(Routes.applicationCommands(clientID), { body: cmdData });
          debug(`Registration of ${data.length} application commands successful.`);
        }
      } catch (error) {
        console.error(error);
      }
    })();


    debug('Registering event handlers...');
    this.on('interactionCreate', async interaction => {
      if (!interaction.isChatInputCommand()) return;

      const cmd = interaction.client.commands.get(interaction.commandName);

      if (!cmd) return;

      try {
        await cmd.execute(interaction);
      } catch (error) {
        await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
      }
    });
  }

  start() {
    debug('Xingqiu Bot starting...');
    this.login(process.env.TOKEN);
    this.once('ready', () => {
      debug('Xingqiu Bot started.');
      process.env.TOKEN = '';
    });
  }
}

const bot = new XingqiuBot();
bot.start();