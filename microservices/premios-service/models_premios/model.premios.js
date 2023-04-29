const data = require("../data/SQL");

class PremiosModel {
  constructor() {
    this.db = data;
  }

  async findAll() {
    const datosPremios = new Promise((resolve, reject) => {
      this.db.all(
        "SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje FROM campeonatos",
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });

    return datosPremios;
  }

  async findById(id) {
    const buscarPremio = new Promise((resolve, reject) => {
      this.db.get(
        "SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje FROM campeonatos WHERE id = ?",
        [id],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });

    return buscarPremio;
  }

  async findByChampionId(championId) {
    const buscarPremio = new Promise((resolve, reject) => {
      this.db.all(
        "SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje FROM campeonatos WHERE id_campeon = ?",
        [championId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  
    return buscarPremio;
  }
// buscar por un año especifico
  async findByAnio(anio) {
    const buscarPremio = new Promise((resolve, reject) => {
      this.db.all(
        "SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje FROM campeonatos WHERE anio_campeonato = ?",
        [anio],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  
    return buscarPremio;
  }
  
  // buscar por un rango de años 
  async findByRango(anioInicial, anioFinal) {
    const buscarPremios = new Promise((resolve, reject) => {
      this.db.all(
        "SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje FROM campeonatos WHERE anio_campeonato BETWEEN ? AND ?",
        [anioInicial, anioFinal],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  
    return buscarPremios;
  }
  

  // buscar por lugar 
  async findByLugar(lugar) {
    const buscarPremios = new Promise((resolve, reject) => {
      this.db.all(
        "SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje FROM campeonatos WHERE lugar = ?",
        [lugar],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  
    return buscarPremios;
  }
  

  // Función para buscar premios por categoría ganada
async  findByCategoria(categoria) {
  const buscarPremios = new Promise((resolve, reject) => {
    this.db.all(
      "SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje FROM campeonatos WHERE categoria_ganada = ?",
      [categoria],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });

  return buscarPremios;
}

 // Función para buscar premios por pais competencia
async  findByPais(pais) {
  const buscarPremios = new Promise((resolve, reject) => {
    this.db.all(
      "SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje FROM campeonatos WHERE pais_competencia = ?",
      [pais],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });

  return buscarPremios;
}

// Funcion para buscar premio por dinero ganado
async findByPremio(premio) {
  const buscarPremios = new Promise((resolve, reject) => {
    this.db.all(
      "SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje FROM campeonatos WHERE premio = ?",
      [premio],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
  return buscarPremios;
}

//Funcion para buscar premio por ranfo de $$
async findByRangoPremio(min, max) {
  const buscarPremios = new Promise((resolve, reject) => {
    this.db.all(
      "SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje FROM campeonatos WHERE premio BETWEEN ? AND ?",
      [min, max],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
  
  return buscarPremios;
}


// Función en el objeto "premios" para buscar por puntaje de estrellas
async  findByPuntaje(puntaje) {
  const buscarPremios = new Promise((resolve, reject) => {
    const puntajeStr = "*".repeat(puntaje / 10); // Convertir el puntaje a una cadena de asteriscos
    this.db.all(
      "SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje FROM campeonatos WHERE puntaje = ?",
      [puntajeStr],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });

  return buscarPremios;
}

// Función para buscar por número de estrellas en el campo "puntaje"
async findByEstrellas(estrellas) {
  const puntaje = "*".repeat(estrellas);

  const buscarPremios = new Promise((resolve, reject) => {
    this.db.all(
      "SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje FROM campeonatos WHERE puntaje = ?",
      [puntaje],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });

  return buscarPremios;
}


}

module.exports = PremiosModel;
