var request = require('request');
var app = require('../server/app');
var http = require('http');
var debug = require('debug')('mean:server');

describe('app.js server', () => {
  let server;

  beforeAll(() => {
    function onListening() {
      var addr = server.address();
      var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
      debug('Listening on ' + bind);
    }

    function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }

      var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    }

    app.set('port', 3000);
    server = http.createServer(app);

    server.listen(3000);
    server.on('error', onError);
    server.on('listening', onListening);
  });

  afterAll(() => {
    server.close();
    console.log('closing');
  });

  describe('GET/', () => {
    var data = {};

    beforeAll(done => {
      request.get('http://localhost:3000/api', (error, response, body) => {
        data.status = response.statusCode;
        done();
      });
    });
    it('200', () => {
      expect(data.status).toBe(200);
    });
  });
});
