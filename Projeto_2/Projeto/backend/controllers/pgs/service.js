const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

//Devolve todos os carros
exports.getAll = async (req, res) => {
    try {
        //le toda a tabela
        const response = await prisma.service.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//Devolve um carro indicado por um id
exports.getById = async (req, res) => {
    //apanha o id enviado
    const id = req.params.id * 1;
    try {
        //procura o carro com o id
        const service = await prisma.service.findUnique({
            where: {
                id: id,
            },
        })
        //devolve o carro
        res.status(200).json(service)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//criar um carro
exports.create = async (req, res) => {
    const { Name, Description, Price, Duration, Status, Type } = req.body;
    try {
        const service = await prisma.service.create({
            data: {
                name: Name,
                description: Description,
                price: Price,
                duration: Duration,
                status: Status,
                type: Type,
            },
        })
        res.status(201).json(service)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.update = async (req, res) => {
    const { id, Name, Description, Price, Duration, Status, Type, CarID } = req.body;

    try {
        const service = await prisma.service.update({
            where: {
                id: id,
            },
            data: {
                name: Name,
                description: Description,
                price: Price,
                duration: Duration,
                status: Status,
                type: Type,
            },
        });
        res.status(200).json(service)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//apagar o carro com id passado
exports.delete = async (req, res) => {
    //le o id do carro
    const id = req.params.id;
    try {
        //delete student
        await prisma.service.delete({
            where: {
                id: id * 1,
            },
        })
        //just return ok
        res.status(200).send("ok")
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.getAllTypes = async (req, res) => {
    try {
        //le toda a tabela
        const response = await prisma.service.
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
/*
exports.getById = async (req, res) => {
    const id = req.params.id*1;
    try {
        const service = await prisma.carsService.findUnique({
            where: {
                id: id,
            },
        })
        res.status(200).json(service)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}*/