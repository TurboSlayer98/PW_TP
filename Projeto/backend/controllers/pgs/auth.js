const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticateUtil = require('../../utils/authenticate.js');

const { PrismaClient, Role } = require('@prisma/client');
const prisma = new PrismaClient()

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.users.findUnique({
            where: {email: email,},
        })
        if (user) {
          var passwordIsValid = bcrypt.compareSync(password,user.password);
          if (passwordIsValid) {
            const accessToken = authenticateUtil.generateAccessToken({ id: user.id, name: user.username, role: user.role });
            res.status(200).json({ id: user.id, name: user.username, role: user.role, token: accessToken });
          }else{
            res.status(401).json({ msg: "Password inválida!" });
          }
        }
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

exports.signup = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        await prisma.users.create({
            data: {
                firsname: firstname,
                lastname: lastname,
                email: email,
                password: bcrypt.hashSync(password, 8),
            },
        })
        return this.signin(req, res);
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}
