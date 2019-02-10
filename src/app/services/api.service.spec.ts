import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

describe('ApiService', () => {
  let injector: TestBed;
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    service = TestBed.get(ApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  afterAll(() => {
    injector = null;
    service = null;
    httpMock = null;
  });

  describe('When a get petition is required', () => {
    it('should execute a GET http request', () => {
      const result = 'testing';

      service.get('/test').subscribe(response => {
        expect(response).toEqual(result);
      });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      expect(req.request.method).toBe('GET');
      req.flush(result);
    });

    it('should execute a GET http request wit headers', () => {
      const result = 'testing';
      const headers = new HttpHeaders().set('platzi-headers', 'cristian-rules');

      service.get('/test', headers).subscribe(response => {
        expect(response).toEqual(result);
      });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('platzi-headers')).toBe('cristian-rules');
      req.flush(result);
    });
  });

  describe('When a post petition is required', () => {
    it('should execute a POST http request', () => {
      const result = 'testing';

      service.post('/test', {}).subscribe(response => {
        expect(response).toEqual(result);
      });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      expect(req.request.method).toBe('POST');
      req.flush(result);
    });
  });

  describe('When a patch petition is required', () => {
    it('should execute a PUT http request', () => {
      service.put('/test', {}).subscribe(() => {});

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      expect(req.request.method).toBe('PUT');
    });
  });

  describe('When a delete petition is required', () => {
    it('should execute a DELETE http request', () => {
      service.delete('/test', {}).subscribe(() => {});

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      expect(req.request.method).toBe('DELETE');
    });
  });
});
