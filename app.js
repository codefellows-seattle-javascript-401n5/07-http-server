'use strict'

const http = require('http');

const parser = require('./lib/parser');

const requestHandler = (req, res) => {

  parser(req)
    .then(req => {

        if(req.method === 'GET' && req.url.pathname === '/') {
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.statusMessage = 'good';
        }
    })


    const app = http.createServer(requestHandler);
}