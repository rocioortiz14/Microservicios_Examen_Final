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
router.get('/buscar/:tipo/:peso', (req, res) => {
  const { tipo, peso } = req.params;

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

  logger(`Get Perros data by peso ${tipo}: ${peso}`);
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


router.get("/premios/:id", async (req, res) => {
  const id = req.params.id;
  
  try {
    const responsePerro = await fetch(`http://perros:3000/api/v2/perros/${id}`);
    const perro = await responsePerro.json();

    // Obtener premios del perro
    const responsePremios = await fetch(`http://premios:4000/api/v2/premios/${id}`);
    const premiosDelPerro = await responsePremios.json();
    
    const perroConPremios = {
      ...perro,
      premios: premiosDelPerro,
    };

    return res.send(response(perroConPremios));
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error fetching data");
  }
});



module.exports = router;
