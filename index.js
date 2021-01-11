const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const Gamedig = require('gamedig');

bot.on('ready', () => {
  Gamedig.query({
    type: 'fivem',
    host: config.ipabs, // This needs to be a string
    port: config.port // This needs to be a number & is optional, unless you're not using the default port for that gameserver type
  }).then((state) => {
    console.log(state);
  bot.user.setActivity(state.raw.clients+"/"+state.maxplayers);
  }).catch((error) => {
    console.log(error);
  });
  });
bot.on('message', (message) => {

  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "playerscount") {
    message.delete();
    Gamedig.query({
      type: 'fivem',
      host: config.ipabs, // This needs to be a string
      port: config.port// This needs to be a number & is optional, unless you're not using the default port for that gameserver type
    }).then((state) => {
      console.log(state);
      message.channel.send(`There is ${state.raw.clients}/${state.maxplayers} connected players.`);
    }).catch((error) => {
      message.channel.send(`Server offline or not found.`);
    });
  }
  if (command === "playerlist") {
    message.delete();
    Gamedig.query({
      type: 'fivem',
      host: config.ipabs, // This needs to be a string
      port: config.port// This needs to be a number & is optional, unless you're not using the default port for that gameserver type
    }).then((state) => {
      console.log(state);
      let liste = '';
      let i = 0;
      while (i < state.raw.clients)
      {
        liste = `${liste}`+"```"+`${state.players[i].name} | ${state.players[i].ping} ms`+"```"+`\n`
        i++;
      }
        message.channel.send(liste, { split: true })
    }).catch((error) => {
      message.channel.send(`Server offline or not found.`);
    });
  }
})

bot.login(config.token);