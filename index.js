'use strict';

// 3rd Party Library
//utilize the env file or what PORT to go to.
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Local Library
const server = require('./src/app.js');

console.log('server', server);

// Fire up the server, on the port that we pulled out of our .env file
// Note that there is NO default port given!
server.start(process.env.PORT, () => console.log(`Server up on ${PORT}`));
//server. dot means that it is an object
//.start is a method