const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping!'),
  
  execute: async interaction => {
    await interaction.reply({ content: 'Pong!', ephemeral: true });
  }
}
