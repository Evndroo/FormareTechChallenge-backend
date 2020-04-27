const User = require("../Model/User"),
    bcrypt = require("bcryptjs"),
    passport = require("passport");

require("../../config/oAuth")(passport);


module.exports = {

    async index(req, res) {
        let users = await User.find().limit(147)
        return res.status(200).send(users);
    },

    async store(req, res, next) {
        const { fullName, nickName, password } = req.body
        if (!fullName) return res.status(400).send({ message: "Usuário necessita de nome completo para ser cadastrado" })
        if (!nickName) return res.status(400).send({ message: "Usuário necessita de um apelido para ser cadastrado" })
        if (!password) return res.status(400).send({ message: "Usuário necessita de uma senha para ser cadastrado" })

        let user = await User.findOne({ nickName });

        if (!user) {

            bcrypt.genSalt(10, function (error, salt) {
                bcrypt.hash(password, salt, async function (error, hash) {
                    if (error) return res.status(400).send({ message: "Ops, tivemos algum problema para fazer o cadastro, tente novamente" });
                    user = await User.create({ fullName, nickName, password: hash, active: true });
                    return res.status("200").send({ message: "Usuário cadastrado com sucesso", user });
                });
            })


        } else return res.status("400").send({ message: "Este apelido já foi utilizado", user })
    },


    login(req, res) {
        passport.authenticate('local', function (error, user, info) {
            if (error) {
                res.status(401).send(error);
            } else if (!user) {
                res.status(401).send(info);
            } else {
                req.login(user, function (err) {
                    if (err) return next(err);
                    res.status(200).send('login efetuado com sucesso! ');
                })
            }

            res.status(401).send(info);
        })(req, res);
    },

    logout(req,res){
        req.logout();
        res.send("Logout feito com sucesso ");
    }
}