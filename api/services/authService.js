const {userService} = require("./usersService")
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const service = new userService()
const jwt = require('jsonwebtoken')
const {config} = require('../config/config')
const nodemailer = require('nodemailer')

class AuthService{
    async getUser(email, password){
        const user = await service.findByEmail(email)
        if(!user){
            throw(boom.unauthorized(), false)
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw(boom.unauthorized(), false)
        }
        delete user.dataValues.password
        return user
    }

    async  signToken(user){
        const payload = {
            sub: user.id,
            role: user.role
        }
        const token = jwt.sign(payload, config.jwtSecret);
        return {user, token}
    }

    async sendRecoveryPassword(email){
        const user = await service.findByEmail(email);
        if(!user){
            throw boom.unauthorized()
        }

        const payload = {sub: user.id,}
        const token = jwt.sign(payload, config.jwtSecret, {expiresIn: "15m"}) 
        const link = `http://localhost:3000/recovery/${token}`
        const mail = {
            from: config.smtp_email,
            to: `${user.email}`,
            subject: "Email for password recovery",
            html: `<b>Click this link to recover your password ${link}</b>`
        }
       const rta = await this.sendMail(mail)
        return rta;
    }

    async sendMail(infoMail){
        const transporter = nodemailer.createTransport({
         host: "smtp.gmail.com",
         secure: true,
         port: 465,
         auth: {
           user: config.smtp_email,
           pass: config.smpt_emailPass
         }
       })
       await transporter.sendMail(infoMail)
       return {message: "Email sent"}
    }
}

module.exports = {AuthService}