const request = require('request');
const express = require('express');
const http = require('http');
const Pins = require('./models/Pins');
const PinsRouter = require('./routes/pins');
const axios = require('axios');
const requestPromise = require('request-promise-native');
const logger = require('morgan');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use('/api', PinsRouter.router);
app.set('port', 3000);

describe('Testing Routes', () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app);
    server.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  describe('GET/', () => {
    it('200 and find the pin', done => {
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

  describe('GET/:id', () => {
    it('should find the pin with id', done => {
      const data = [{ id: 1 }];

      spyOn(Pins, 'findById').and.callFake((id, callBack) => {
        expect(id).toBe('123456');
        callBack(false, data);
      });

      request.get('http://localhost:3000/api/123456', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('should return an error trying to find by id', done => {
      const data = [{ id: 1 }];

      spyOn(Pins, 'findById').and.callFake((id, callBack) => {
        expect(id).toBe('123456');
        callBack(true, data);
      });

      request.get('http://localhost:3000/api/123456', (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });
  });

  describe('POST/', () => {
    it('200 with page information', done => {
      const assets = [{ url: 'http://platzi.com' }];
      const SpyPins = spyOn(Pins, 'create').and.callFake((pins, callBack) => {
        expect(pins).toEqual({
          title: 'title',
          author: 'author',
          description: 'description',
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
        });
        callBack(false, {});
      });
      const spy = spyOn(requestPromise, 'get').and.returnValue(
        Promise.resolve('<title>Platzi</title><meta name="description" content="description">')
      );

      axios.post('http://localhost:3000/api', { title: 'title', author: 'author', description: 'description', assets }).then(res => {
        expect(res.status).toBe(200);
        expect(SpyPins).toHaveBeenCalled();
        expect(spy).toHaveBeenCalled();
        done();
      });
    });

    it('200 with PDF information', done => {
      const assets = [{ url: 'http://platzi.com/testing.pdf' }];
      const SpyPins = spyOn(Pins, 'create').and.callFake((pins, callBack) => {
        expect(pins).toEqual({
          title: 'title',
          author: 'author',
          description: 'description',
          percentage: 0,
          tags: [],
          assets: [
            {
              title: 'PDF from: platzi.com ',
              description: '/testing.pdf',
              readed: false,
              url: 'http://platzi.com/testing.pdf'
            }
          ]
        });
        callBack(false, {});
      });

      axios.post('http://localhost:3000/api', { title: 'title', author: 'author', description: 'description', assets }).then(res => {
        expect(res.status).toBe(200);
        expect(SpyPins).toHaveBeenCalled();
        done();
      });
    });

    it('500 while creation execution', done => {
      const assets = [{ url: 'http://platzi.com/testing.pdf' }];
      const SpyPins = spyOn(Pins, 'create').and.callFake((pins, callBack) => {
        callBack(true, {});
      });

      axios
        .post('http://localhost:3000/api', { title: 'title', author: 'author', description: 'description', assets })
        .then(res => {
          done();
        })
        .catch(error => {
          expect(error.response.status).toBe(500);
          expect(SpyPins).toHaveBeenCalled();
          done();
        });
    });

    it('500 requesting page information', done => {
      const assets = [{ url: 'http://platzi.com/testing' }];
      const rejection = Promise.reject({ error: 500 });
      rejection.catch(() => {});
      const spy = spyOn(requestPromise, 'get').and.returnValue(rejection);

      axios
        .post('http://localhost:3000/api', { title: 'title', author: 'author', description: 'description', assets })
        .then(res => {
          done();
        })
        .catch(error => {
          expect(error.response.status).toBe(500);
          expect(spy).toHaveBeenCalled();
          done();
        });
    });
  });

  describe('PUT/:id', () => {
    it('200 and update the Pin', done => {
      const params = [{ id: 1 }];
      const body = {};
      const SpyPins = spyOn(Pins, 'findByIdAndUpdate').and.callFake((id, _body, callBack) => {
        expect(_body).toEqual({ params: [{ id: 1 }], body: {} });
        expect(id).toBe('123');
        callBack(false, {});
      });

      axios
        .put('http://localhost:3000/api/123', { params, body })
        .then(res => {
          expect(res.status).toBe(200);
          expect(SpyPins).toHaveBeenCalled();
          done();
        })
        .catch(e => {
          done();
        });
    });

    it('500 while updating the Pin', done => {
      const params = [{ id: 1 }];
      const body = {};
      const SpyPins = spyOn(Pins, 'findByIdAndUpdate').and.callFake((id, _body, callBack) => {
        expect(_body).toEqual({ params: [{ id: 1 }], body: {} });
        expect(id).toBe('123');
        callBack(true, {});
      });

      axios
        .put('http://localhost:3000/api/123', { params, body })
        .then(res => {
          done();
        })
        .catch(error => {
          expect(error.response.status).toBe(500);
          expect(SpyPins).toHaveBeenCalled();
          done();
        });
    });
  });

  describe('DELETE/:id', () => {
    it('200 and remove the Pin', done => {
      const params = [{ id: 1 }];
      const body = {};
      const SpyPins = spyOn(Pins, 'findByIdAndRemove').and.callFake((id, _body, callBack) => {
        expect(_body).toEqual({});
        expect(id).toBe('123');
        callBack(false, {});
      });

      axios
        .delete('http://localhost:3000/api/123', { params, body })
        .then(res => {
          expect(res.status).toBe(200);
          expect(SpyPins).toHaveBeenCalled();
          done();
        })
        .catch(e => {
          done();
        });
    });

    it('500 while removing the Pin', done => {
      const params = [{ id: 1 }];
      const body = {};
      const SpyPins = spyOn(Pins, 'findByIdAndRemove').and.callFake((id, _body, callBack) => {
        expect(_body).toEqual({});
        expect(id).toBe('123');
        callBack(true, {});
      });

      axios
        .delete('http://localhost:3000/api/123', { params, body })
        .then(res => {
          done();
        })
        .catch(error => {
          expect(error.response.status).toBe(500);
          expect(SpyPins).toHaveBeenCalled();
          done();
        });
    });
  });
});
