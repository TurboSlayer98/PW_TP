const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticateUtil = require('../../utils/authenticate.js');

const { PrismaClient, Role } = require('@prisma/client');
const prisma = new PrismaClient();

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {email: email,},
        })
        if (user) {
          var passwordIsValid = bcrypt.compareSync(password,user.password);
          if (passwordIsValid) {
            const accessToken = authenticateUtil.generateAccessToken({ id: user.id, email: user.email, role: user.role });
            res.status(200).json({ id: user.id, email: user.email, role: user.role, token: accessToken });
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
        await prisma.user.create({
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

exports.readToken= async (req, res) =>{
    try{
        const { token } = req.body;
        authenticateUtil.certifyAccessToken(token)
         .then(decode => {
            res.status(200).json(decode);
            // Aqui pode ler os dados decodificados do token
            // Faça o que quiser com os dados decodificados, como salvá-los em variáveis ou usar em outras operações
          })
          .catch(err => {
            res.status(401).json(err);
            //console.error('Erro ao verificar o token:', err);
          });
    }catch(error){
        res.status(401).json({ msg: error.message })
    }
}
