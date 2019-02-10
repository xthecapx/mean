import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsComponent } from './actions.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { PinsService } from '../pins/pins.service';

class MatBottomSheetRefStub {
  dismiss() {}
}

class PinsServiceStub {
  resolveActionObserver() {}
}

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MatBottomSheetRef, useClass: MatBottomSheetRefStub }, { provide: PinsService, useClass: PinsServiceStub }],
      declarations: [ActionsComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('When openLink is called', () => {
    it('should preventDefault, dismiss the bottom sheet and resolve action observer', () => {
      const event = new MouseEvent('click');
      const dismiss = spyOn((<any>component).bottomSheetRef, 'dismiss');
      const preventDefault = spyOn(event, 'preventDefault');
      const resolveActionObserver = spyOn((<any>component).pinsService, 'resolveActionObserver');

      component.openLink(event, 'action');

      expect(dismiss).toHaveBeenCalled();
      expect(preventDefault).toHaveBeenCalled();
      expect(resolveActionObserver).toHaveBeenCalledWith('action');
    });
  });
});
