const express = require('express');
const logger = require('morgan');
const http = require('http');
const PinsRouter = require('./routes/pins');
const Pins = require('./models/Pins');
const request = require('request');
const app = express();

app.use(logger('dev'))
app.use(express.json())
app.use('/api', PinsRouter.router);
app.set('port', 3000);

describe('Testing Router', () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app);
    server.listen(3000);
  })

  afterAll(() => {
    server.close();
  });

  describe('GET', () => {
    // GET 200
    it('200 and find pin', done => {
      const data = [{ id: 1 }];
      spyOn(Pins, 'find').and.callFake(callBack => {
        callBack(false, data);
      });

      request.get('http://localhost:3000/api', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([{ id: 1 }]);
        done();
      })
    })

    // GET 500
  })
})