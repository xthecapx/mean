import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PINS } from 'src/app/services/mocks/pins';

import { PinsComponent } from './pins.component';
import { RepositoryService } from 'src/app/services/repository.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PinsService } from './pins.service';
import { Subject, of } from 'rxjs';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class RepositoryServiceStub {
  observer = new Subject();

  getPins() {
    return this.observer;
  }

  resolvePins() {
    this.observer.next(JSON.parse(JSON.stringify(PINS)));
  }

  updatePin() {
    return of(true);
  }
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

fdescribe('PinsComponent', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('When new page is open', () => {
    const open = spyOn(window, 'open');

    component.openUrl('https://platzi.com');

    expect(open).toHaveBeenCalledWith('https://platzi.com', '_blank');
  });

  it('When update pogress', () => {
    component.pins = PINS;
    const pin = PINS[0];
    const updatePin = spyOn((<any>component).repository, 'updatePin').and.returnValue(of(true));
    const open = spyOn((<any>component).snackBar, 'open');
    const pinService = TestBed.get(PinsService);

    pinService.resolve('save');

    expect(open).toHaveBeenCalled();
  });
});
