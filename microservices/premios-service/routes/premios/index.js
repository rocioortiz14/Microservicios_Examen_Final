const express = require("express");
const router = express.Router();

// Instancia el modelo de la data Premios
const PremiosModel = require("../../models_premios/model.premios");
const premios = new PremiosModel();

// Muestra en consola el recurso solicitado
const logger = (message) => console.log(`From Premios Services: ${message}`);

//Define una plantilla para las respuestas
const response = (data = [], err = false) => {
  const length = err === false ? data.length : 0;
  return {
    service: "Premios",
    architecture: "microservices",
    length: length,
    data: data,
  };
};

router.get("/", async (req, res) => {
  const listaPremios = await premios.findAll();

  logger("Get all Premios data");
  return res.send(response(listaPremios));
});

// Ruta para buscar un premio por su ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const premioFound = await premios.findById(id);

  if (!premioFound) {
    return res
      .status(404)
      .send(response(`No se encontró ningun registro con el id ${id}`, true));
  }

  logger("Get by id: Premio data");
  return res.send(response(premioFound));
});



// ruta para buscar un premio por su id dee campeon 
router.get("/campeon/:campeonId", async (req, res) => {
  const { campeonId } = req.params;

  // Si campeonId contiene una lista de IDs separados por coma, dividimos la cadena en una matriz
  const ids = campeonId

  const premiosPorCampeon = await premios.findByChampionIds(ids);

  if (!premiosPorCampeon || premiosPorCampeon.length === 0) {
    return res.status(404).send(response(`No se encontró ningún registro con los IDs de campeón proporcionados: ${campeonId}`, true));
  }

  logger("Get by campeonId: Premio data");
  return res.send(response(premiosPorCampeon));
});


// Ruta para buscar un premio por su año
router.get("/anio/:anio", async (req, res) => {
  const { anio } = req.params;
  const premiosFound = await premios.findByAnio(anio);

  if (premiosFound.length === 0) {
    return res
      .status(404)
      .send(response(`No se encontró ningun registro con el año ${anio}`, true));
  }

  logger("Get by anio_campeonato: Premio data");
  return res.send(response(premiosFound));
});

//Ruta para buscar un premio en un rango de año 
router.get("/anio/:inicio/:fin", async (req, res) => {
  const { inicio, fin } = req.params;
  const premiosFound = await premios.findByRango(inicio, fin);

  if (premiosFound.length === 0) {
    return res
      .status(404)
      .send(response(`No se encontró ningun registro entre los años ${inicio} y ${fin}`, true));
  }

  logger("Get by anio_campeonato: Premio data");
  return res.send(response(premiosFound));
});


//Ruta para buscar por lugar ganado
router.get("/lugar/:lugar", async (req, res) => {
  const { lugar } = req.params;
  const premiosFound = await premios.findByLugar(lugar);

  if (premiosFound.length === 0) {
    return res
      .status(404)
      .send(response(`No se encontró ningún registro con el lugar ${lugar}`, true));
  }

  logger("Get by lugar: Premio data");
  return res.send(response(premiosFound));
});

//Ruta para buscar premio por categoria ganada
router.get("/categoria/:categoria", async (req, res) => {
  const { categoria } = req.params;
  const premiosFound = await premios.findByCategoria(categoria);

  if (premiosFound.length === 0) {
    return res
      .status(404)
      .send(response(`No se encontró ningún registro con la categoría ${categoria}`, true));
  }

  logger("Get by categoria_ganada: Premio data");
  return res.send(response(premiosFound));
});

//Ruta para buscar premio por pais de competencia
router.get("/pais/:pais", async (req, res) => {
  const { pais } = req.params;
  const premiosFound = await premios.findByPais(pais);

  if (premiosFound.length === 0) {
    return res
      .status(404)
      .send(response(`No se encontró ningun registro con el país ${pais}`, true));
  }

  logger("Get by pais_competencia: Premio data");
  return res.send(response(premiosFound));
});

// Endpoint para buscar por premio $$$
router.get("/premio/:premio", async (req, res) => {
  const { premio } = req.params;
  const premiosFound = await premios.findByPremio(premio);

  if (premiosFound.length === 0) {
    return res
      .status(404)
      .send(response(`No se encontró ningun registro con el premio ${premio}`, true));
  }

  logger("Get by premio: Premio data");
  return res.send(response(premiosFound));
});


router.get("/RangoPremio/:min/:max", async (req, res) => {
  const { min, max } = req.params;
  const premiosFound = await premios.findByRangoPremio(min, max);

  if (premiosFound.length === 0) {
    return res
      .status(404)
      .send(response(`No se encontró ningún registro con premio entre ${min} y ${max}`, true));
  }

  logger("Get by rango de premio: Premio data");
  return res.send(response(premiosFound));
});


// Endpoint para buscar por puntaje de estrellas
router.get("/puntaje/:puntaje", async (req, res) => {
  const { puntaje } = req.params;

  // Validar que el puntaje sea un número entero
  if (!Number.isInteger(parseInt(puntaje))) {
    return res
      .status(400)
      .send(response("El puntaje debe ser un número entero", true));
  }

  // Buscar los registros que tengan el puntaje especificado
  const premiosFound = await premios.findByPuntaje(parseInt(puntaje));

  if (premiosFound.length === 0) {
    return res
      .status(404)
      .send(response(`No se encontró ningún registro con el puntaje ${puntaje}`, true));
  }

  logger("Get by puntaje: Premio data");
  return res.send(response(premiosFound));
});

// Endpoint para buscar por número de estrellas en el campo "puntaje"
router.get("/estrellas/:estrellas", async (req, res) => {
  const { estrellas } = req.params;
  const premiosFound = await premios.findByEstrellas(estrellas);

  if (premiosFound.length === 0) {
    return res
      .status(404)
      .send(response(`No se encontró ningún registro con el puntaje ${estrellas}`, true));
  }

  logger(`Get by estrellas: ${estrellas} - Premio data`);
  return res.send(response(premiosFound));
});




module.exports = router;
