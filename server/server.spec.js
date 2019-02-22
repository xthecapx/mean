const express = require('express');
const logger = require('morgan');
const http = require('http');
const PinsRouter = require('./routes/pins');
const Pins = require('./models/Pins');
const request = require('request');
const axios = require('axios');
const app = express();
var requestPromise = require('request-promise-native');

app.use(logger('dev'));
app.use(express.json());
app.use('/api', PinsRouter.router);
app.set('port', 3000);

describe('Testing Router', () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app);
    server.listen(3000);
  });

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
      });
    });

    // GET 500
    it('500', done => {
      const data = [{ id: 1 }];
      spyOn(Pins, 'find').and.callFake(callBack => {
        callBack(true, data);
      });

      request.get('http://localhost:3000/api', (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });
  });

  describe('POST', () => {
    it('200', done => {
      const post = [
        {
          title: 'Platzi',
          author: 'Platzi',
          description: 'Platzi rules',
          percentage: 0,
          tags: [],
          assets: [
            {
              title: 'Platzi',
              description: 'description',
              readed: false,
              url: 'http://platzi.com'
            }
          ]
        }
      ];

      spyOn(Pins, 'create').and.callFake((pin, callBack) => {
        callBack(false, {});
      });

      spyOn(requestPromise, 'get').and.returnValue(
        Promise.resolve('<title>Platzi</title><meta name="description" content="Platzi rules">')
      );

      const assets = [{ url: 'http://platzi.com' }];

      axios.post('http://localhost:3000/api', { title: 'title', author: 'author', description: 'description', assets }).then(res => {
        expect(res.status).toBe(200);
        done();
      });
    });
  });
});
