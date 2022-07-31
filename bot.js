require("dotenv").config(); //to start process from .env file

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const exec = require('child_process').exec;

const prefix = '!';

client.once("ready", () =>{
    console.log("BOT IS ONLINE"); //message when bot is online
});

client.on('messageCreate', message => {
    if(message.author.bot) return;
    if(message.content.toLocaleLowerCase() === '!ip') {
        exec('curl ifconfig.me', (err, stdout) => {
            if (err) {
                console.error("error executing command: ", err)
                message.channel.send('could find the ip')
                return
            }
            message.channel.send(stdout)
        })
    }
});

client.login(process.env.TOKEN);