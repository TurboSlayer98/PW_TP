const { PrismaClient } = require('@prisma/client');
const { connect } = require('../../routes/pgs');
const prisma = new PrismaClient();

exports.countCars = async (req, res) => {
    try {
        const response = await prisma.cars.count();
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
};

exports.countCarsInService = async (req, res) => {
    try {
        const response = await prisma.cars.count({
            where: {
                NOT: [{
                    service: null,
                }
                ]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
};

exports.countMechanicsInService = async (req, res) => {
    try {
        const response = await prisma.users.count({
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

exports.getEvents = async (req, res) => {
    try {
        const response = await prisma.appointments.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
};

exports.create = async (req, res) => {
    const { Title, Status, StartDate, EndDate, UserID, ServiceID } = req.body;

    try {
        // Ensure the user, service, and car exist and are associated correctly
        const user = await prisma.users.findUnique({
            where: { id: UserID },
            include: { car: true, appointment: true }
        });

        const service = await prisma.services.findUnique({
            where: { id: ServiceID },
            include: { car: true }
        });

        if (!user || !service) {
            throw new Error('User or Service not found');
        }

        const appointment = await prisma.appointments.create({
            data: {
                title: Title,
                status: Status,
                start: StartDate,
                end: EndDate,
                user: { connect: { id: UserID}},
                service: { connect: { id: ServiceID}},
            },
        })
        //devolve o carro criado
        res.status(201).json(appointment)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}