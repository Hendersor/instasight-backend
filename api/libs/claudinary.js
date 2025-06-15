const { config } = require("../config/config.js");

const claudinary = require('cloudinary')
claudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret
})


module.exports = {claudinary}