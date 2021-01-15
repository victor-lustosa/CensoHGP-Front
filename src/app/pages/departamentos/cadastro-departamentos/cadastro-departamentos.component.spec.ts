import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDepartamentosComponent } from './cadastro-departamentos.component';

describe('CadastroDepartamentosComponent', () => {
  let component: CadastroDepartamentosComponent;
  let fixture: ComponentFixture<CadastroDepartamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroDepartamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
