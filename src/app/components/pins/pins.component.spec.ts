import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinsComponent } from './pins.component';
import { RepositoryService } from 'src/app/services/repository.service';
import { of, Subject } from 'rxjs';
import { PINS } from 'src/app/services/mocks/pins';
import { MatSnackBar } from '@angular/material';
import { PinsService } from './pins.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

class RepositoryServiceStub {
  observer = new Subject();

  getPins() {
    return this.observer;
  }

  resolvePins() {
    this.observer.next(JSON.parse(JSON.stringify(PINS)));
  }

  updatePin() {}
}

class MatSnackBarStub {
  open() {}
}

class PinsServiceStub {
  observer = new Subject();
  $actionObserver = this.observer.asObservable();

  public resolve(action) {
    return this.observer.next(action);
  }
}

describe('PinsComponent', () => {
  let component: PinsComponent;
  let fixture: ComponentFixture<PinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinsComponent],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
        { provide: PinsService, useClass: PinsServiceStub }
      ],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('When component is initialized', () => {
    it('should create the form', () => {
      fixture.whenStable().then(() => {
        // (<any>component).repository.resolvePins();
        const respository = TestBed.get(RepositoryService);

        respository.resolvePins();

        const controls = component.pins[0].formGroup.controls;
        expect(Object.keys(controls)).toEqual(['5c520d9c7b26f12e6d0180a0', '5c520d9c7b26f12e6d0180a1', '5c520d9c7b26f12e6d0180a2']);
      });
    });
  });

  describe('When user request save action', () => {
    it('update the progress', () => {
      component.pins = PINS;
      const pin = PINS[0];
      const updatePin = spyOn((<any>component).repository, 'updatePin').and.returnValue(of(true));
      const open = spyOn((<any>component).snackBar, 'open');
      const pinService = TestBed.get(PinsService);

      pinService.resolve('save');

      expect(updatePin).toHaveBeenCalledWith(pin._id, {
        title: pin.title,
        author: pin.author,
        description: pin.description,
        percentage: pin.percentage,
        tags: pin.tags,
        assets: pin.assets
      });
      expect(open).toHaveBeenCalledWith('Progress updated!', 'OK', {
        duration: 2000
      });
    });
  });

  describe('When setStep is called', () => {
    it('should set the step and update the progress', () => {
      const updatePercentage = spyOn(<any>component, 'updatePercentage');

      component.setStep(2);

      expect(component.step).toBe(2);
    });
  });

  describe('When modify step is executed', () => {
    it('should increase the step', () => {
      component.nextStep();

      expect(component.step).toBe(1);
    });

    it('should decrease the step', () => {
      component.step = 2;

      component.prevStep();

      expect(component.step).toBe(1);
    });
  });

  describe('When openUrl is called', () => {
    it('should open the url with _blank', () => {
      const open = spyOn(window, 'open');

      component.openUrl('https://platzi.com');

      expect(open).toHaveBeenCalledWith('https://platzi.com', '_blank');
    });
  });

  describe('When updatePercentage is executed', () => {
    it('should update the current value of the learning path', () => {
      fixture.whenStable().then(() => {
        const respository = TestBed.get(RepositoryService);
        respository.resolvePins();

        component.setStep(2);

        expect(component.pins[2].percentage).toBe(100);

        component.pins[2].formGroup.controls['5c520d9c7b26f12e6d0180a6'].setValue(false);

        expect(component.pins[2].percentage).toBe('66.67');
      });
    });

    it('should unsuscribe if there is another subscription', () => {
      fixture.whenStable().then(() => {
        const respository = TestBed.get(RepositoryService);
        respository.resolvePins();

        component.setStep(1);
        const unsubscribe = spyOn((<any>component).currentSubscription, 'unsubscribe').and.callThrough();
        component.setStep(2);

        expect(unsubscribe).toHaveBeenCalled();
      });
    });
  });
});
