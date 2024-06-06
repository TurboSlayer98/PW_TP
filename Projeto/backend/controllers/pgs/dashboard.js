const { PrismaClient } = require('@prisma/client');
const { connect } = require('../../routes/pgs');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
    try {
        //le toda a tabela
        const response = await prisma.appointment.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getById = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const response = await prisma.appointment.findUnique({
            where: {
                id: id,
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
};

exports.create = async (req, res) => {
    const { Title, Status, StartDate, EndDate, UserID, ServiceID, CarID } = req.body;
    try {
        // Verificar se o usuário existe
        const user = await prisma.user.findUnique({
            where: { id: UserID },
            include: { cars: true, appointments: true }
        });

        // Verificar se o serviço existe
        const service = await prisma.service.findUnique({
            where: { id: ServiceID },
            include: { carServices: true }
        });

        // Verificar se o carro existe e está associado ao usuário
        const car = await prisma.car.findUnique({
            where: { id: CarID },
            include: { user: true }
        });

        if (!user || !service || !car || car.user_id !== UserID) {
            throw new Error('User, Service, or Car not found, or Car is not associated with User');
        }

        const appointment = await prisma.appointment.create({
            data: {
                title: Title,
                status: Status,
                start: StartDate,
                end: EndDate,
                user: { connect: { id: UserID } },
                service: { connect: { id: ServiceID } },
                car: { connect: { id: CarID } },
            },
        });
        await prisma.carsService.create({
            data: {
                carid: CarID,       // carId should be the id of the car created in step 3
                serviceid: ServiceID // serviceId should be the id of the service created in step 2
            }
        });
        res.status(201).json(appointment)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
};

exports.update = async (req, res) => {
    const { id, Title, Status, StartDate, EndDate, UserID, ServiceID } = req.body;
    try {
        const appointment = await prisma.appointment.update({
            where: {
                id: id,
            },
            data: {
                title: Title,
                status: Status,
                start: StartDate,
                end: EndDate,
                user: { connect: { id: UserID } },
                service: { connect: { id: ServiceID } },
            },
        })
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma.appointment.delete({
            where: {
                id: id * 1,
            },
        })
        res.status(200).send("ok")
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
};

exports.countCars = async (req, res) => {
    try {
        const response = await prisma.car.count();
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
};

exports.countCarsInService = async (req, res) => {
    try {
        const response = await prisma.car.count({
            where: {
                service: undefined,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
};

exports.countMechanicsInService = async (req, res) => {
    try {
        const response = await prisma.user.count({
            where: {
                role: "MECHANIC",
                inService: true,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
};

exports.countCarsFinished = async (req, res) => {
    try {
        const response = await prisma.car.count({
            where: {
                services: {
                    some: {
                        service: {
                            status: "Completed"
                        }
                    }
                }
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};