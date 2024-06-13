const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs/dist/bcrypt');

//Testa a ligação
exports.testConnection = async (req, res) => {
    try {
        await prisma.$connect();
        res.send('Succefull connection with PostgreSQL!');
      } catch (error) {
        res.send('Error conecting to PostgreSQL:', error);
      } finally {
        await prisma.$disconnect();
      }
}

exports.getAll = async (req, res) => {
    try {
        const response = await prisma.user.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//Devolve um carro indicado por um id
exports.getById = async (req, res) => {
    //apanha o id enviado
    const id = req.params.id*1;
    try {
        //procura o carro com o id
        const response = await prisma.user.findUnique({
            where: {
                id: id,
            },
        })
        //devolve o carro
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//Devolve utilizadores tipo de role
exports.getByRole = async (req, res) => {
    const { Role } = req.body;
    try {
        const response = await prisma.user.findUnique({
            where: {
                role: Role,
            },
        })
        //devolve o carro
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//criar um carro
exports.create = async (req, res) => {
    //apanhar os dados enviados
    const { Username, Email, Password, Firstname, Lastname, Gender, Role } = req.body;
    try {
        //criar um novo carro
        const user = await prisma.user.create({
            data: {
                username: Username,
                email: Email,
                password: bcrypt.hashSync(Password, 8),
                firstname: Firstname,
                lastname: Lastname,
                gender: Gender,
                role: Role,
            },
        })
        //devolve o carro criado
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//Atualizar um carro
exports.update = async (req, res) => {
    const { id, Username, Email, Password, Firstname, Lastname, Gender, Role } = req.body;
    try {
        const user = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                username: Username,
                email: Email,
                password: bcrypt.hashSync(Password, 8),
                firstname: Firstname,
                lastname: Lastname,
                gender: Gender,
                role: Role,
            },
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//apagar o carro com id passado
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma.user.delete({
            where: {
                id: id*1,
            },
        })
        res.status(200).send("ok")
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
