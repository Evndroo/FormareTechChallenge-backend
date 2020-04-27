const LocalStrategy = require("passport-local");
const mongoose = require("mongoose"),
    bcrypt = require("bcryptjs");
mongoose.connect("mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@cluster0-g9asi.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const User = require("../src/Model/User");

module.exports = function (passport) {

    passport.use(new LocalStrategy({
        usernameField: 'nickName'
    }, async function (nickName, password, done) {


        let user = await User.findOne({ nickName })
        if (user.length == 0) {
            return done(null, false, { message: "Usuário não cadastrado no sistema" })
        } else {

            bcrypt.compare(password, user.password, function (error, batem) {
                if (!batem) {
                    done(null, false, { message: "Usuário ou senha incorretos" })
                } else {
                    done(null, user);
                }

            })

        }

    }));


    passport.serializeUser(function (user, done) {
        done(null, user);
    });


    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

}