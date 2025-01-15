const passport = require('passport')

const LocalStrategy = require("./strategies/localStrategy")
const JwtStrategy = require("./strategies/jwtStrategy")


passport.use('local', LocalStrategy)
passport.use('jwt', JwtStrategy)
