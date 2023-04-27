const express = require("express");
const router = express.Router();

// Instancia el modelo de la data Premios
const PremiosModel = require("../../models/model.premios");
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

module.exports = router;
