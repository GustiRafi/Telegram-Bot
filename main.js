const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TOKEN;
const options = {
    polling: true
}

const bot = new TelegramBot(token,options)


// regex
const prefix = "."

const gempa = new RegExp(`^${prefix}gempa$`);


bot.onText(gempa,async(callback) => {
    const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/";

    const fetchCall = await fetch(`${BMKG_ENDPOINT}autogempa.json`)
    const {Infogempa: { gempa: { Tanggal,Jam,Magnitude,Kedalaman,Wilayah,Potensi,Shakemap,Coordinates } } } = await fetchCall.json()

    const image = BMKG_ENDPOINT + Shakemap;
    const latitude = Coordinates.split(',')[0];
    const longitude = Coordinates.split(',')[1];
    const result = `
    Waktu : ${Tanggal}, ${Jam}
Wilayah: ${Wilayah}
Kedalaman: ${Kedalaman}
Magnitude: ${Magnitude}
Potensi: ${Potensi}
    `
    const chatFrom = callback.from.id;
    bot.sendLocation(chatFrom,latitude,longitude)
    bot.sendPhoto(chatFrom,image,{
        caption: result
    })
})