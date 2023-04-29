const express = require("express");
const router = express.Router();
const PerrosModel = require("../../models_perros/models.perros");

// Instancia el modelo de la data Perros
const perros = new PerrosModel();

// Muestra en consola el recurso solicitado
const logger = (message) => console.log(`From Perros Services: ${message}`);

//Define una plantilla para las respuestas
const response = (data = [], err = false) => {
  const length = err === false ? data.length : 0;
  return {
    service: "Perros",
    architecture: "microservices",
    length: length,
    data: data,
  };
};

router.get("/", (req, res) => {
  const perrosList = perros.findAll();
  logger("Get all Perros data");
  return res.send(response(perrosList));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  
  const perroFound = perros.findById(id);

  // Si no existe un registro con el id, responderá con un not found
  if (!perroFound) {
    return res
      .status(404)
      .send(response(`No se encontró ningun registro con el id ${id}`, true));
  }

  logger("Get by id: Perro data");
  return res.send(response(perroFound));
});


// Endpoint para buscar perros por peso mínimo o máximo
router.get('/buscar/:tipo/:peso/:pais', (req, res) => {
  const { tipo, peso, pais } = req.params;
  let perrosList = perros.findAll();

  if (tipo === 'min') {
    perrosList = perrosList.filter((perro) => perro.peso >= peso);
  } else if (tipo === 'max') {
    perrosList = perrosList.filter((perro) => perro.peso <= peso);
  } else {
    return res
      .status(400)
      .send(
        response(
          `El tipo de búsqueda '${tipo}' no es válido. Use 'min' o 'max'.`,
          true
        )
      );
      
  }
  
  perrosList = perrosList.filter((perro) => {
    const paisDueno = perro.pais_dueno;
    const paisOrigenDueno = perro.pais_origen_dueno;

    if (paisDueno === pais || paisOrigenDueno === pais) {
      return true;
    }
    return false;
  });
    logger(`Get Perros data by pais: ${pais}, ${peso}`);
  return res.send(response(perrosList));
  
});

//endpoint buscar por pais de origen del dueño 
router.get('/buscar-por-pais/:pais', (req, res) => {
  const { pais } = req.params;

  let perrosList = perros.findByPaisOrigen(pais);

  perrosList = perrosList.filter((perro) => {
    const paisDueno = perro.pais_dueno;
    const paisOrigenDueno = perro.pais_origen_dueno;

    if (paisDueno === pais || paisOrigenDueno === pais) {
      return true;
    }
    return false;
  });

  logger(`Get Perros data by pais: ${pais}`);
  return res.send(response(perrosList));
});



// endpoint para buscar por nombre del perro 

router.get('/buscar-por-nombre/:nombre', (req, res) => {
  const { nombre } = req.params;

  const perrosList = perros.findByNombre(nombre);

  logger(`Get Perros data by nombre: ${nombre}`);
  return res.send(response(perrosList));
});

// endpoint para buscar por nombre del dueno 

router.get('/buscar-por-dueno/:nombre', (req, res) => {
  const { nombre } = req.params;

  const perrosList = perros.findByNombre(nombre);

  logger(`Get Perros data by nombre: ${nombre}`);
  return res.send(response(perrosList));
});


router.get("/campeon/:campeonId", async (req, res) => {
  const { campeonId } = req.params;

  // Si campeonId contiene una lista de IDs separados por coma, dividimos la cadena en una matriz
  const ids = campeonId.split(',');

  const premiosPorCampeon = await premios.find({
    championId: { $in: ids }
  });

  if (!premiosPorCampeon || premiosPorCampeon.length === 0) {
    return res.status(404).send(response(`No se encontró ningún registro con los IDs de campeón proporcionados: ${campeonId}`, true));
  }

  logger("Get by campeonId: Premio data");
  return res.send(response(premiosPorCampeon));
});


module.exports = router;
