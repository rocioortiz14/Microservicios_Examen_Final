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

async  buscarPremiosPorPerro(perro) {
  try {
    const responsePremios = await fetch(`http://premios:4000/api/v2/premios/${id}`);
    const premiosEncontrados = await responsePremios.json();

    const perroConPremios = {
      perro: perro,
      premios: premiosEncontrados,
    };

    return perroConPremios;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching premios data");
  }
}

async buscarPremiosPorNombrePerro(nombrePerro) {
  const perrosEncontrados = perros.findByNombre(nombrePerro);
  const promesasPremios = perrosEncontrados.map(async (perro) => {
    try {
      const response = await fetch(`http://premios:4000/api/v2/premios/categoria${categoria}`);
      const premiosEncontrados = await response.json();
      return premiosEncontrados;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching premios data");
    }
  });
  const premiosPorPerro = await Promise.all(promesasPremios);
  return premiosPorPerro;
}



}





module.exports = PerrosModel;
