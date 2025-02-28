const express = require("express");
const passport = require("passport");

const {AuthService} = require("../services/authService");
const router = express.Router();

const service = new AuthService();

router.post("/login", passport.authenticate('local', {session: false}),
 async (req, res, next) => {
  try {
    const user = req.user;
    const rta = service.signToken(user);
    delete rta.user.dataValues.recoveryToken
    res.json(rta);

  } catch (error) {
    next(error);
  }
});


router.post("/recovery",
 async (req, res, next) => {
  try {
    const {email} = req.body;
    const rta = await service.sendRecoveryPassword(email);
    res.json(rta);

  } catch (error) {
    next(error);
  }
});


router.post("/change-password",
  async (req, res, next) => {
   try {
     const {token, newPassword} = req.body;
     const rta = await service.changePassword(token, newPassword);
     res.json(rta);
 
   } catch (error) {
     next(error);
   }
 });

module.exports = { router };
