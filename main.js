const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TOKEN;
const options = {
    polling: true
}

const bot = new TelegramBot(token,options)

bot.on('message', (callback) => { 
    const chatFrom = callback.from.id;
    bot.sendMessage(chatFrom,"Silahkan....")
 })