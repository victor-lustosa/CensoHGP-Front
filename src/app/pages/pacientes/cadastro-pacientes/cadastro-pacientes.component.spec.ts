import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CadastroPacientesComponent } from './cadastro-pacientes.component';

describe('CadastroPacientesComponent', () => {
  let component: CadastroPacientesComponent;
  let fixture: ComponentFixture<CadastroPacientesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPacientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
