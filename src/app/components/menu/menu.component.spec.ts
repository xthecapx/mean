import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { By } from '@angular/platform-browser';

fdescribe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const title = fixture.debugElement.query(By.css('h1'));

    expect(title.nativeElement.innerHTML).toBe('eLearning Management System');
  });

  it('Testing output', () => {
    const val = true;

    component.clicked.subscribe(result => {
      expect(result).toBe(val);
    });

    component.clicked.next(val);
  });

  it('Testing click', () => {
    let button = fixture.debugElement.query(By.css('button'));
    console.log(component.counter);
    expect(component.counter).toBe(0);
    button.triggerEventHandler('click', null);
    console.log(component.counter);
    expect(component.counter).toBe(1);
  });
});
