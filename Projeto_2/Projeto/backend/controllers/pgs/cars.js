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
        const response = await prisma.car.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//Devolve um carro indicado por um id
exports.getById = async (req, res) => {
    const id = req.params.id*1;
    try {
        const response = await prisma.car.findUnique({
            where: {
                id: id,
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//criar um carro
exports.create = async (req, res) => {
    //apanhar os dados enviados
    const { Brand, Model, Year, Plate, Color, Door_Number, Kilometers, Picture, UserID, ServiceID } = req.body;
    try {
        const car = await prisma.car.create({
            data: {
                brand: Brand,
                model: Model,
                year: Year,
                plate: Plate,
                color: Color,
                door_number: Door_Number,
                kilometers: Kilometers,
                picture: Picture,
                user: { connect: { id: UserID } },
            },
        })
        res.status(201).json(car)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.update = async (req, res) => {
    const { id, Brand, Model, Year, Plate, Color, Door_Number, Kilometers, Picture, UserID, ServiceID } = req.body;

    try {
        const car = await prisma.car.update({
            where: {
                id: id,
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
                user: { connect: { id: UserID } },
            },
        })

        if (ServiceID) {
            await prisma.carsService.deleteMany({ where: { carId: id } });
            await prisma.carsService.create({
                data: {
                    carId: id,
                    serviceId: ServiceID
                }
            });
        }

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
        await prisma.car.delete({
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
