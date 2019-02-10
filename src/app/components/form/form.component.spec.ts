import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { ReactiveFormsModule, FormArray } from '@angular/forms';
import { RepositoryService } from 'src/app/services/repository.service';
import { of } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { MatSnackBar } from '@angular/material';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class RepositoryServiceStub {
  savePins() {
    return of(true);
  }
}

class NavigationServiceStub {
  goToPins() {}
}

class MatSnackBarStub {
  open() {
    return {
      afterDismissed: () => {
        return of(true);
      }
    };
  }
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: NavigationService, useClass: NavigationServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub }
      ],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('When component is initialized', () => {
    it('should create the forms', () => {
      expect(Object.keys(component.firstFormGroup.controls)).toEqual(['title', 'author', 'description']);
      expect(Object.keys(component.secondFormGroup.controls)).toEqual(['firstAsset', 'assets']);
    });
  });

  describe('When addAsset is executed', () => {
    it('should add a new group to the form asset control', () => {
      const assets = <FormArray>component.secondFormGroup.get('assets');

      component.addAsset();
      component.addAsset();

      expect(Object.keys(assets.controls)).toEqual(['0', '1']);
    });
  });

  describe('When deleteAsset is executed', () => {
    it('should remove a the form asset control', () => {
      const assets = component.secondFormGroup.get('assets') as FormArray;

      component.addAsset();
      component.deleteAsset('0');

      expect(Object.keys(assets.controls)).toEqual([]);
    });
  });

  describe('When savePin is executed', () => {
    it('should navigat to pins view', () => {
      const navigate = spyOn((<any>component).navigate, 'goToPins');
      const open = spyOn((<any>component).snackBar, 'open').and.callThrough();

      component.savePin();

      expect(navigate).toHaveBeenCalled();
      expect(open).toHaveBeenCalledWith('Your pin is saved, Redirecting ...', 'Cool!', {
        duration: 2000
      });
    });
  });
});
