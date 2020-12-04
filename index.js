const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const req = require('request');

bot.on('ready', () => {
  var arg = config.ipabs
  let api = `http://${arg}/players.json`
  req(api, function (err, response, body) {
  var start = JSON.parse(body)

  if (start == null || start == []) {
    var e = 0
  } else {
    var e = start.length;
  }

  console.log("Ready");
  bot.user.setActivity(e+"/"+config.max);
  })
  });

bot.on('message', (message) => {

    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "playerscount"){
        message.delete();
        if (config.discord === message.guild.id) {
          try {
            var arg = config.ipabs
            let api = `http://${arg}/players.json`
            let api2 = `http://${arg}/info.json`
          req(api2, function (err, response, main) {
              req(api, function (err, response, body) {
                if (err) {
                  message.channel.send("Server offline or not found")
                }
                else {
                  try {
                    var start = JSON.parse(body)
                    var start2 = JSON.parse(main)
      
                    if (start == null || start == []) {
                      var e = 0
                    } else {
                      var e = start.length;
                    }
                    message.channel.send("There is actually "+e+" players on the server.")
                  
                  } catch (err) {
                    message.channel.send("Server offline or not found")
                  }
                }
      
              })
      
            })
      
          } catch (err) {
            message.channel.send("The server doesn't exist.")
          }
        } else {
          return message.channel.send("Error")
      
        }
      };
      if(command === "playerlist"){
        //If you want to restrict the access of the command for one role only
        let staff = message.guild.roles.cache.find(r => r.name === "Role name");
        if(!message.member.roles.cache.has(staff.id)) return message.reply("You doesn't have the permission to show the playerlist");
        // Delete the two lines if you don't want
        if (config.discord === message.guild.id) {
          try {
            var arg = config.ipabs
            let api = `http://${arg}/players.json`
            let api2 = `http://${arg}/info.json`
            req(api2, function (err, response, main) {
              req(api, function (err, response, body) {
                if (err) {
                  message.channel.send("Server offline or not found")
                }
                else {
                  try {
                    var start = JSON.parse(body)
                    var start2 = JSON.parse(main)
      
                    if (start == null || start == []) {
                      var e = 0
                    } else {
                      var e = start.length;
                    }
                    let liste = '';
                    start.forEach(function (element) {
                      var sv = `**${element.name}**\nID: **${element.id}** Ping: **${element.ping}**`;
                      liste = `${liste}`+"```"+`${element.name} | ${element.id} | ${element.ping} ms`+"```"+`\n`
                    })
                    message.channel.send(liste, { split: true })
                  
                  } catch (err) {
                    console.log(err)
                    message.channel.send("Server offline or not found")
                  }
                }
      
              })
      
            })
      
          } catch (err) {
            message.channel.send("The server doesn't exist.")
          }
        } else {
          return message.channel.send("Error")
      
        }
      };
    
})

bot.login(config.token);