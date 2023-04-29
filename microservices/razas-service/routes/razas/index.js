const express = require("express");
const router = express.Router();

const ModeloRazas = require("../../models_razas/models.raza");
const razas = new ModeloRazas();
const path = require('path');
const parseToJson = require('../../src/parser');
const csvFilePath = path.join(__dirname, '../../data/raza_info.csv');
const logger = (message) => console.log(`From Razas Service: ${message}`);

const response = (data = [], err = false) => {
  const length = err === false ? data.length : 0;
  return {
    service: "razas",
    architecture: "microservices",
    length: length,
    data: data,
  };
};

router.get("/", async (req, res) => {
  try {
    const listaRazas = await razas.findAll();
    logger("Get all: Razas data");
    return res.send(response(listaRazas));
  } catch (err) {
    logger(`Error retrieving all: ${err.message}`);
    return res.send(response([], true));
  }
});

/*router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const razaFound = await razas.findById(id);
    if (!razaFound) {
      return res.send(response(`No se encontró ningún registro con el id ${id}`));
    }
    logger("Get by id: Raza data");
    return res.send(response(razaFound));
  } catch (err) {
    logger(`Error retrieving by id: ${err.message}`);
    return res.send(response([], true));
  }
});*/



router.get('/color/:colorDePelo', async (req, res) => {
  const colorDePelo = req.params.colorDePelo;
  try {
    const data = await parseToJson(csvFilePath);
    const filteredData = data.filter(raza => raza.color_de_pelo.some(pelo => pelo.includes(colorDePelo)));
    res.json(filteredData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al procesar el archivo CSV');
  }
});



router.get('/nombre/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const data = await parseToJson(csvFilePath);
    const filteredData = data.filter(raza => raza.raza.toLowerCase().includes(name.toLowerCase()));
    res.json(filteredData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al procesar el archivo CSV');
  }
});

router.get('/tipo/:tipo', async (req, res) => {
  const tipo = req.params.tipo;
  try {
    const data = await parseToJson(csvFilePath);
    const filteredData = data.filter(raza => raza.tipo.includes(tipo));
    res.json(filteredData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al procesar el archivo CSV');
  }
});


router.get('/pais/:paisOrigen', async (req, res) => {
  const pais = req.params.paisOrigen;
  try {
    const data = await parseToJson(csvFilePath);
    const filteredData = data.filter(raza => raza.pais_de_origen === pais);
    res.json(filteredData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al procesar el archivo CSV');
  }
});


router.get('/expectativa-vida/:edad', async (req, res) => {
  const edad = req.params.edad;
  try {
    const data = await parseToJson(csvFilePath);
    const filteredData = data.filter(raza => raza.expectativa_de_vida === edad);
    res.json(filteredData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al procesar el archivo CSV');
  }
});



router.get('/acreditadas/:status', async (req, res) => {
  const status = req.params.status;
  try {
    const data = await parseToJson(csvFilePath);
    const filteredData = data.filter(raza => raza.acreditado === status);
    res.json(filteredData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al procesar el archivo CSV');
  }
});

router.get('/tamanio/:tamPelo', async (req, res) => {
  const tamPelo = req.params.tamPelo;
  try {
    const data = await parseToJson(csvFilePath);
    const filteredData = data.filter(raza => raza.tamanio_de_pelo === tamPelo);
    res.json(filteredData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al procesar el archivo CSV');
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const razaFound = await razas.findById(id);
    if (!razaFound) {
      return res.send(response(`No se encontró ningún registro con el id ${id}`));
    }
    const responsePerros = await fetch("http://perros:3000/api/v2/perros");
    const perros = await responsePerros.json();
    const perrosFiltrados = perros.filter((perro) => perro.razaId === id);
    logger("Get by id: Raza y perros data");
    return res.send(response({ raza: razaFound, perros: perrosFiltrados }));
  } catch (err) {
    logger(`Error retrieving by id: ${err.message}`);
    return res.send(response([], true));
  }
});

/*router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const razaFound = await razas.findById(id);
    if (!razaFound) {
      return res.send(response(`No se encontró ningún registro con el id ${id}`));
    }
    const responsePerros = await fetch("http://perros:3000/api/v2/perros");
    const perros = await responsePerros.json();
    const perrosFiltrados = perros.filter((perro) => perro.razaId === id);

    const responseRazas = await fetch("http://razas:5000/api/v2/razas");
    const razas = await responseRazas.json();
    const razaInfo = razas.find((raza) => raza.id === id);

    logger("Get by id: Raza, perros y raza info data");
    return res.send(response({ raza: razaFound, perros: perrosFiltrados, razaInfo: razaInfo }));
  } catch (err) {
    logger(`Error retrieving by id: ${err.message}`);
    return res.send(response([], true));
  }
});*/


module.exports = router;
