'use strict';

// 1st Party library
const http = require('http');

const parser = require('./lib/promise');

// const Cowsay = require('./lib/cowsay.js'); //DON'T KNOW IF I NEED THIS


const requestHandler = (req, res) => {

  // Take a look here if you're interested to see what some parts of the request object are.
  // console.log(req.method);
  // console.log(req.headers);
  // console.log(req.url);

  parser(req)
    .then(req => {

      if (req.method === 'GET' && req.url.pathname === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';

        res.write(
          `<html>
          <head>
            <title> cowsay </title>
          </head>
          <body>
            <header>
              <nav>
                <ul>
                  <li><a href="/cowsay?text">cowsay</a></li>
                </ul>
              </nav>
              <header>
                <main>
                  <!-- project description -->
                </main>
          </body>
        </html>`
        );

        res.end();
      }

      else if (req.method === 'GET' && req.url.pathname === '/cowsay') {
        // console.log('the path is ', req.url.pathname);
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';

        let message = req.url.query.text;

        console.log(message);

        res.write(
          `<!DOCTYPE html>
          <html>
            <head>
              <title> cowsay </title>  
            </head>
            <body>
              <h1> cowsay </h1>
              <p>
                Enter message.
              </p>
              <form>
                <input type="text">
              </form>
              <br>
              <button>
                Submit
              </button>
            </body>
          </html>`
        );

        res.end();
      }

      else if (req.method === 'POST' && req.url.pathname === '/api/cowsay') {
        res.setHeader('Content-Type', 'text/json');
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.write(JSON.stringify(req.body));
        res.end();
      }
      //use cowsay as an NPM module - JB
      else {

      }

    });

  //// Here, we have a "POST" request which will always return a JSON object.  That object will either be
  //// the JSON that you posted in (just spitting it back out), or an error object, formatted to look like JSON
  //     else if (req.method === 'POST' && req.url.pathname === '/data') {
  //       res.setHeader('Content-Type', 'text/json');
  //       res.statusCode = 200;
  //       res.statusMessage = 'OK';
  //       res.write(JSON.stringify(req.body));
  //       res.end();
  //       return;
  //     }

  //     else {
  //       res.setHeader('Content-Type', 'text/html');
  //       res.statusCode = 404;
  //       res.statusMessage = 'Not Found';
  //       res.write('Resource Not Found');
  //       res.end();
  //     }

  // }) // closes the "then" of the parser promise
  // .catch(err => {
  //   res.writeHead(500);
  //   res.write(err);
  //   res.end();
  // });
};

// Server callback
const app = http.createServer(requestHandler);


// Expose the start and stop methods.  index.js will call on these.
module.exports = {
  start: (port, callback) => app.listen(port, callback),
  stop: (callback) => app.close(callback),
};