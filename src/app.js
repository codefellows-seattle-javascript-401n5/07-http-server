'use strict';

const cowsay = require('cowsay');

const http = require('http');
const parser = require('./lib/parser.js');
const requestHandler = (req, res) => {

  // Take a look here if you're interested to see what some parts of the request object are.
  console.log(req.method);
  console.log(req.headers);
  console.log(req.url);

  // In all cases, parse the URL
  parser(req)
    .then(req => {

      if (req.method === 'GET' && req.url.pathname === '/') {
        //'/' means there is no addition path information
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';

        //When a client makes a GET request to / the server should send back html with a project description and a anchor to /cowsay.

        // Send out some random HTML (actually, it's not totally random. Note how it includes req.url.query.you ...
        // That would show whatever you have in the URL after you = (http://localhost:3000?this=that&you=cool

        let message = req.url.query.you;

        //USE this for /cowsay
        //message = "Hola";

        // makeHtmlResponse(res);

        const markup = `
        <!DOCTYPE html>
          <html>
            <head>
              <title> cowsay </title>
            </head>
            <body>
              <header>
                <nav>
                  <ul>
                    <li><a href="/cowsay">cowsay</a></li>
                  </ul>
                </nav>
                </header>
                  <main>
                    <p>${message}<p>
                 </main>
              </body>
            </html>`;
        
        // ... Instead of doing manual HTML like that, you could have used the "fs" module to read a file
        // and "res.write()" the contents of that file.
        res.write(markup);
        res.end();
        return;
      }

      else if (req.method === 'GET' && req.url.pathname === '/cowsay') {

        //cowsay with text here

        res.setHeader('content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';

        console.log('req.query', req.query);

        let queryText = req.url.query.text || 'I need something good to say';

        const markup = `
        <!DOCTYPE html>
          <html>
            <head>
              <title> cowsay </title>
            </head>
            <body>
              <h1> cowsay </h1>
              <pre>
                ${cowsay.say({ text: queryText })}
               </pre>
            </body>
          </html>`;
      

        res.write(markup);
        res.end();
        return;
      }

      // Here, we have a "POST" request which will always return a JSON object.  That object will either be
      // the JSON that you posted in (just spitting it back out), or an error object, formatted to look like JSON
      else if (req.method === 'POST' && req.url.pathname === '/api/cowsay') {
        res.setHeader('Content-Type', 'text/json');
        res.statusCode = 200;
        res.statusMessage = 'OK';
        //SEND back JSON version of
        res.write(JSON.stringify(req.body));
        res.end();
        return;
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        res.write('Resource Not Found');
        res.end();
      }

    }) // closes the "then" of the parser promise
    .catch(err => {
      res.writeHead(500);
      res.write(err);
      res.end();
    });



};

// Server callback
const app = http.createServer(requestHandler);

// Expose the start and stop server methods.  index.js will call on these.
module.exports = {
  start: (port, callback) => app.listen(port, callback),
  stop: (callback) => app.close(callback),
};