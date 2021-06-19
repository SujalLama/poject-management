const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const db = require('../models');

//options
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    db.User.findOne({where: {id: jwt_payload}}).then((user) => {
        return done(null, user)
    }).catch((err) => {
        return done(err);
    })
}));
