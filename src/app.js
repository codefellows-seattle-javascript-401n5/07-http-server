'use strict';

const http = require('http');

const parser = require('./lib/parser');
const cowsay = require('cowsay');
const reqHandler = (req,res) => {

  parser(req)
    .then(req => {
      if (req.method === 'GET' && req.url.pathname === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMsg = 'Okay';
        let markup = `<!DOCTYPE html>
<html>
<head>
  <title>Cowsay</title>
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
      <p>This project uses the Cowsay module.  Type at the end of the browser this: "/cowsay?text=" plus your message and the cow will repeat it back to you.</p>
      </main>
</body>
</html> `;
        res.write(markup);
        res.end();
        return;
      } else if (req.method === 'GET' && req.url.pathname === '/cowsay') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMsg = 'Okay';
        let queryText = req.url.query.text || 'I need something good to say';
        let markup = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Cowsay</title>
            </head>
            <body>
              <h1> cowsay </h1>
              <pre> 
                ${cowsay.say({text: queryText})}
              </pre>
            </body>
            </html>
          `;
        res.write(markup);
        res.end();
        return;
      }
      else if ( req.method === 'POST' && req.url.pathname === '/api/cowsay' ) {
        res.setHeader('Content-Type', 'text/json');
        res.statusCode = 200;
        res.statusMessage = 'OK';

        if(req.body) {

          res.write( JSON.stringify({ content: cowsay.say({text: req.body.text})}));
        } else {
          res.statusCode = 400;

          res.write((JSON.stringify({error: 'invalid request: body required'})));
        }

        res.end();
        return;
      }

      else {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        res.write('Resource Not Found');
        res.end();
      }

    })
    .catch(err => {
      console.log(err);
      res.writeHead(400);
      res.write((JSON.stringify({error: 'invalid request: body required'})));
      res.end();
    });
};
    
const app = http.createServer(reqHandler);

module.exports = {
  start: (port,callback) => app.listen(port, callback),
  stop: (callback) => app.close(callback),
};