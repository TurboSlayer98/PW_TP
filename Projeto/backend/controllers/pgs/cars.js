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
        const response = await prisma.cars.findMany();
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
        const response = await prisma.cars.findUnique({
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

//criar um carro
exports.create = async (req, res) => {
    //apanhar os dados enviados
    const { Brand, Model, Year, Plate, Color, Door_Number, Kilometers, Picture } = req.body;
    try {
        //criar um novo carro
        const car = await prisma.cars.create({
            data: {
                brand: Brand,
                model: Model,
                year: Year,
                plate: Plate,
                color: Color,
                door_number: Door_Number,
                kilometers: Kilometers,
                picture: Picture,
            },
        })
        //devolve o carro criado
        res.status(201).json(car)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//Atualizar um carro
exports.update = async (req, res) => {
    const { Brand,Model,Year,Plate,Color,Door_Number,Kilometers,Picture } = req.body;

    try {
        //procurar o carro com id e atualizar os dados
        const car = await prisma.cars.update({
            where: {
                plate: car.plate,
            },
            data: {
                brand: Brand,
                model: Model,
                year: Year,
                plate: Plate,
                color: Color,
                door_number: Door_Number,
                kilometers: Kilometers,
                picture: Picture,
            },
        })
        //devolve o carro atualizado
        res.status(200).json(car)
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
        await prisma.cars.delete({
            where: {
                id: id*1,
            },
        })
        //just return ok
        res.status(200).send("ok")
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
