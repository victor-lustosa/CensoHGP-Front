import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaDepartamentosComponent } from './lista-departamentos.component';

describe('ListaDepartamentosComponent', () => {
  let component: ListaDepartamentosComponent;
  let fixture: ComponentFixture<ListaDepartamentosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDepartamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
