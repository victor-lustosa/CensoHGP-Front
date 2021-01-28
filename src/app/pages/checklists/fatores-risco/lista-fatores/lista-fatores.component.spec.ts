import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaFatoresComponent } from './lista-fatores.component';

describe('ListaFatoresComponent', () => {
  let component: ListaFatoresComponent;
  let fixture: ComponentFixture<ListaFatoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFatoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFatoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
