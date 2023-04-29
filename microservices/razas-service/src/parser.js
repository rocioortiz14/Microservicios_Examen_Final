
const csvToJson = require("csvtojson");

async function parseToJson(csvFilePath) {
  const json = await csvToJson({
    colParser: {
      color_de_pelo: (item) => {
        const matches = item.match(/\(([^)]*)\)/g); //todas las coincidencias dentro de ( )
        if (matches) {
          matches.forEach((match) => {
            const newMatch = match.replace(/;/g, ",");
            item = item.replace(match, newMatch);
          });
        }
        const colores = item.split("; ");
        return colores;
      },
    },
  }).fromFile(csvFilePath);

  return json;
}

module.exports = parseToJson;