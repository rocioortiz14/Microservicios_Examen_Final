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
}

module.exports = PremiosModel;
