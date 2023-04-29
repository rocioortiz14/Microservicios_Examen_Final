const data_json = require("../data/datos_perro.json");

class PerrosModel {
  constructor() {
    this.data = data_json;
  }

  findAll() {
    const perros = this.data;

    return perros;
  }

  findById(id) {
    const perro = this.data.filter((perro) => {
      return perro.Id == id;
    });

    return perro[0];
  }


findByPeso(tipoPeso, valorPeso) {
    const perros = this.data.filter((perro) => {
      if (tipoPeso === "min") {
        return perro.Peso >= valorPeso;
      } else {
        return perro.Peso <= valorPeso;
      }
    });

    return perros;
  }
  
  findByPaisOrigen(pais) {
    const perros = this.data.filter((perro) => {
      return (
        perro.pais_dueno === pais ||
        (perro.pais_origen_dueno && perro.pais_origen_dueno === pais)
      );
    });
    return perros;
  }
  
  findByNombre(nombre) {
    const perros = this.data.filter((perro) => {
      return perro.nombre_perro === nombre;
    });

    return perros;
}

findByNombre(dueno) {
  const perros = this.data.filter((perro) => {
    return perro.nombre_dueno === dueno;
  });

  return perros;
}
}
module.exports = PerrosModel;
