const sqlite = require("sqlite3").verbose();
const fs = require("fs");

const sqlFilePath = `${__dirname}/premios.sql`;

const db = new sqlite.Database(":memory:");
db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON");
  const sql = fs.readFileSync(sqlFilePath).toString();
  db.exec(sql, (err) => {
    if (err) {
      console.error(`Error al ejecutar consulta: ${err.message}`);
    } else {
      console.log(`Consulta ejecutada con éxito`);
    }
  });
});

module.exports = db;
