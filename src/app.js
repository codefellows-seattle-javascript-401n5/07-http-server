'use strict';

const http = require('http');

const parser = require('./lib/parser');
const cowsay = require('cowsay');
const reqHandler = (req,res) => {
  const makeHtmlResponse = (res);
  parser(req)
    .then(req => {
      if (req.method === 'GET' && req.url.pathname === '/') {
        // res.setHeader('Content-Type', 'text/html');
        // res.statusCode = 200;
        // res.statusMsg = 'Okay';
        makeHtmlResponse(res);
        //send back html with a...
        //let msg = req.url.query.you;//use this for cowsay?text...

    
        let markup = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Cowsay</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <script src="app.js"></script>
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
        <!-- project description -->
      </main>
</body>
</html> `;
        res.write(markup);
        res.end();
        return;
      } else if (req.method === 'GET' && req.url.pathname === '/cowsay') {
        //cowsay with query text here!!!
        //let queryText = 
        //let cowMessage = 'I need something good to say';
        let markup = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Cowsay</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <script src="main.js"></script>
</head>
<body>
        <h1> cowsay </h1>
        <pre> 
          ${cowsay.say({text: req.url.query.text})}
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

        if(req.body.text) {

          res.write( JSON.stringify({ content: cowsay.say({text: req.body.text})}));
        } else {
          res.statusCode = 400;

          res.write((JSON.stringify({error: 'invalid request: body required'})));
        }
        //send back JSON version of cowsay message
        //res.write( JSON.stringify(req.body) );

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