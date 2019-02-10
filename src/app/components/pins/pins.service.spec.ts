import { TestBed, inject } from '@angular/core/testing';
import { PinsService } from './pins.service';

describe('PinsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PinsService]
    });
  });

  it('should inform about the new value', inject([PinsService], (service: PinsService) => {
    service.$actionObserver.subscribe(action => {
      expect(action).toBe('value');
    });
    service.resolveActionObserver('value');
  }));

  it('should set and get the action', inject([PinsService], (service: PinsService) => {
    service.action = 'action';

    expect(service.action).toBe('action');
  }));
});
