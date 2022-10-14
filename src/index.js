require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

class XingqiuBot extends Client {
  constructor() {
    super({ intents: [GatewayIntentBits.Guilds] });
    this.init();
  }

  init() {
    console.log('Initializing bot...');
  }

  start() {
    console.log('Xingqiu Bot starting...');
    this.login(process.env.TOKEN);
    this.once('ready', () => {
      console.log('Xingqiu Bot started.');
      process.env.TOKEN = '';
    });
  }
}

const bot = new XingqiuBot();
bot.start();