const server = require('./api/server.js');
require('dotenv').config(); //do not forget me if process.env.x is undefined!

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});