import { TestBed, inject } from '@angular/core/testing';

import { RepositoryService } from './repository.service';
import { ApiService } from './api.service';
import { ApiStub } from './api.stub.spec';

describe('RepositoryService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [RepositoryService, { provide: ApiService, useClass: ApiStub }]
    })
  );

  describe('When getPins is executed', () => {
    it('Should get the pins using api service', inject([RepositoryService], (service: RepositoryService) => {
      const get = spyOn((<any>service).api, 'get');

      service.getPins();

      expect(get).toHaveBeenCalledWith('');
    }));

    it('Should get the pins using mock mode', inject([RepositoryService], (service: RepositoryService) => {
      const get = spyOn((<any>service).api, 'get');

      (<any>service).mockMode = true;
      service.getPins();

      expect(get).not.toHaveBeenCalled();
    }));
  });

  describe('When savePins is executed', () => {
    it('Should save the pins using api service', inject([RepositoryService], (service: RepositoryService) => {
      const post = spyOn((<any>service).api, 'post');

      service.savePins({});

      expect(post).toHaveBeenCalledWith('', {});
    }));

    it('Should save the pins using mock mode', inject([RepositoryService], (service: RepositoryService) => {
      const get = spyOn((<any>service).api, 'get');

      (<any>service).mockMode = true;
      service.savePins({});

      expect(get).not.toHaveBeenCalled();
    }));
  });

  describe('When updatePin is executed', () => {
    it('Should update the pins using api service', inject([RepositoryService], (service: RepositoryService) => {
      const put = spyOn((<any>service).api, 'put');

      service.updatePin(1, {});

      expect(put).toHaveBeenCalledWith('/1', {});
    }));

    it('Should update the pins using mock mode', inject([RepositoryService], (service: RepositoryService) => {
      const put = spyOn((<any>service).api, 'put');

      (<any>service).mockMode = true;
      service.updatePin(1, {});

      expect(put).not.toHaveBeenCalled();
    }));
  });
});
