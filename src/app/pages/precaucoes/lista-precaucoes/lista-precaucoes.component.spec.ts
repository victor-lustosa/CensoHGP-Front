import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrecaucoesComponent } from './lista-precaucoes.component';

describe('ListaPrecaucoesComponent', () => {
  let component: ListaPrecaucoesComponent;
  let fixture: ComponentFixture<ListaPrecaucoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPrecaucoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPrecaucoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
