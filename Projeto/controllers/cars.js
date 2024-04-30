const fs = require('fs');
const path = 'C:/Users/hffm9/OneDrive - Instituto Politécnico de Viana do Castelo/IPVC - 2023_2024/Programação Web/PW_TP/Projeto/data/local/';

//devolve todos os carros
exports.getAll = async (req, res) => {
    //ler o ficheiro local
    const datajson = fs.readFileSync(path + 'cars.json', "utf-8");
    //parse do json
    const data = JSON.parse(datajson);
    //devolver os carros
    return res.send(data.cars);
    //return res.send("ok");
}

//devolve o carro com o id
exports.getById = async (req, res) => {
    //obter o id do carro
    //const id = req.params.number;
    //just return same id
    //return res.send(id);
    //obter o id do carro
    const id = req.params.id;
    //ler o ficheiro local
    const datajson = fs.readFileSync(path + 'cars.json', "utf-8");
    //parse do json
    const data = JSON.parse(datajson);
    //procurar um carro com o id
    const car = data.car.find(car => car.ID == id);
    //devolve o carro
    res.send(car);
}

//cria um carro
exports.create = async (req, res) => {
    //obter o carro pelas características enviadas
    //const {id, Marca, Detalhes, Foto} = req.body;
    //envia o carro criado
    //return res.status(201).send(req.body);
    //obter o carro pelas características enviadas
    const {id, Marca, Detalhes, Foto} = req.body;
    //ler o ficheiro local
    const datajson = fs.readFileSync(path + 'cars.json', "utf-8");
    //parse do json
    const data = JSON.parse(datajson);
    //adicionar carro à lista
    data.cars.push(req.body);
    //Criar o novo ficheiro com o carro adicionado
    fs.writeFileSync(path + 'cars.json', JSON.stringify(data));
    //devolve o novo carro
    return res.status(201).send(req.body);
}

//atualiza o carro
exports.update = async (req, res) => {
    //obter o carro pelas características enviadas
    //const {number, name, city, birthday } = req.body;
    //envia o carro alterado
    //return res.send(req.body);

    //obter o carro pelas características enviadas
    const {Picture,Brand,Model,Year,Plate,Color,Door_Number,Kilometers} = req.body;
    //ler o ficheiro local
    const datajson = fs.readFileSync(path + 'cars.json', "utf-8");
    //parse do json
    const data = JSON.parse(datajson);
    //procurar o carro para actualizar
    const cars = data.cars.find(car => car.ID == id);
    //atualizar as caraterísticas
    cars.Picture = Picture;
    cars.Brand = Brand;
    cars.Model = Model;
    cars.Year = Year;
    cars.Plate = Plate;
    cars.Color = Color;
    cars.Door_Number = Door_Number;
    cars.Kilometers = Kilometers;
    //actualizar no ficheiro json
    fs.writeFileSync(path + 'cars.json', JSON.stringify(data));
    //devolver o carro alterado
    return res.send({Picture,Brand,Model,Year,Plate,Color,Door_Number,Kilometers});
}

//apaga o carro com o id
exports.delete = async (req, res) => {
    //obter o id do carro
    //const id = req.params.number;
    //devolve ok
    //return res.send("ok");

    //obter o id do carro
    const id = req.params.id;
     //ler o ficheiro local
     const datajson = fs.readFileSync(path + 'cars.json', "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //procurar o indice do carro a ser procurada
    const carroIndex  = data.carros.findIndex(carro => carro.ID == id);
     // Verifique se o carro foi encontrado
    if (carroIndex !== -1) {
        // Exclua o estudante do array de estudantes
        const apagaCarro = data.carros.splice(carroIndex, 1)[0];
        // Atualize o ficheiro json
        fs.writeFileSync(path + 'cars.json', JSON.stringify(data));
        // Retorne o carro excluído como resposta
        return res.status(200).send(apagaCarro);
    } else {
        // Caso o carro não seja encontrado, retorne uma resposta de erro
        return res.status(404).send("Carro não encontrado");
    }
}
