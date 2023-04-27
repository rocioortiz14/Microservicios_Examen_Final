const server = require("./src/app"); 

server.listen(process.env.PORT || 4000, () => {

  console.log(`premios Service working in port: ${process.env.PORT || 4000}`);
});
