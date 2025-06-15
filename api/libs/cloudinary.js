const { config } = require("../config/config.js");

const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret
})


module.exports = {cloudinary}