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

      else if(req.method === 'GET' && req.url.pathname === '/cowsay') {
        console.log('the path is ', req.url.pathname);
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';

        //let message = req.url.query.text;

        res.write(
          `<!DOCTYPE html>
          <html>
            <head>
              <title> cowsay </title>  
            </head>
            <body>
              <h1> cowsay </h1>
              <p>
                please work!
              </p>
              <pre>
                <!-- cowsay.say({text: req.query.text}) -->
              </pre>
            </body>
          </html>`
        );

        res.end();
      }

    });
  //// In all cases, parse the URL
  // parser(req)
  //   .then(req => {

  /* The "if" statements below are our "routes" and do the same things that express does (below) but 100% manually
          app.get('/', (req,res) => res.send('Hello From the Gutter'));
          app.get('/foo/bar/baz', (req,res) => res.send('Hello From the Gutter'));
     */
  //     if (req.method === 'GET' && req.url.pathname === '/') {
  //       res.setHeader('Content-Type', 'text/html');
  //       res.statusCode = 200;
  //       res.statusMessage = 'OK';

  //// Send out some random HTML (actually, it's not totally random. Note how it includes req.url.query.you ...
  //// That would show whatever you have in the URL after you = (http://localhost:3000?this=that&you=cool
  //       // let message = req.url.query.you;

  //       let message = 'whassup';


  //       res.write(`<!DOCTYPE html><html><body><h1>${message}</h1></body></html>`);

  //// ... Instead of doing manual HTML like that, you could have used the "fs" module to read a file
  //// and "res.write()" the contents of that file.
  //       res.end();
  //       return;
  //     }

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