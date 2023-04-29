const csv = require("../src/parser");
const path = require('path');

const csvFilePath = path.join(__dirname, '../data/raza_info.csv');
const data_json = csv(csvFilePath);

class ModeloRazas {
  constructor() {
    this.data = data_json;
  }

  async findAll() {
    const listadoRazas = await this.data;
    return listadoRazas;
  }

  async findById(id) {
    const listadoRazas = await this.data;
    const razaFind = listadoRazas.filter((raza) => {
      return raza.id == id;
    });

    return razaFind[0];
  }
  async findByColorDePelo(colorDePelo) {
    const listadoRazas = await this.data;
    const razasFiltradas = listadoRazas.filter(raza => raza.color_de_pelo.includes(colorDePelo));
    return razasFiltradas;
}

  async findByName(name) {
    const listadoRazas = await this.data;
    const razasFiltradas = listadoRazas.filter(raza => raza.name === name);
    return razasFiltradas;
  }

  async findByTipo(tipo) {
    const listadoRazas = await this.data;
    const razasFiltradas = listadoRazas.filter(raza => raza.tipo===tipo);
    return razasFiltradas;
}

async findByExpectativaDeVida(edad) {
  const listadoRazas = await this.data;
  const razasFiltradas = listadoRazas.filter(raza => raza.expectativa_de_vida === edad);
  return razasFiltradas;
}


async findByPaisDeOrigen(paisDeOrigen) {
  const listadoRazas = await this.data;
  const razasFiltradas = listadoRazas.filter(raza => raza.pais_de_origen === paisDeOrigen);
  return razasFiltradas;
}

async findByAcreditado(acreditado) {
  const listadoRazas = await this.data;
  const razasFiltradas = listadoRazas.filter(raza => raza.acreditado === acreditado);
  return razasFiltradas;
}

async findByTamanioDePelo(tamanio) {
  const listadoRazas = await this.data;
  const razasFiltradas = listadoRazas.filter(raza => raza.tamanio_de_pelo === tamanio);
  return razasFiltradas;
}
// Función para buscar perros por tamaño de pelo
async  findByTamanio_De_Pelo(tamanioPelo) {
  const response = await fetch(`http://perros:3000/api/v2/perros/buscar-por-tamanio-de-pelo/${tamanioPelo}`);
  const perros = await response.json();
  return perros;
}

async  getPerroConPremios(id) {
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

    return perroConPremios;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching data");
  }
}




}



module.exports = ModeloRazas;