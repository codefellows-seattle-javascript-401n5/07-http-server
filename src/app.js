'use strict';

const http = require('http');

const parser = require('./lib/parser');

const reqHandler = (req,res) => {

  parser(req)
    .then(req => {
      if (req.method === 'GET' && req.url.pathname === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMsg = 'Okay';

        let msg = req.url.query.you;

        res.write(`<!DOCTYPE html><html><body><h1>${msg}</h1></body></html>`);

        res.end();
        return;
      }
    });
};
const app = http.createServer(reqHandler);

module.exports = {
  start: (port,callback) => app.listen(port, callback),
  stop: (callback) => app.close(callback),
};