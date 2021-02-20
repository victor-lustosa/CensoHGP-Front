import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaPacienteComponent } from './transferencia-paciente.component';

describe('TransferenciaPacienteComponent', () => {
  let component: TransferenciaPacienteComponent;
  let fixture: ComponentFixture<TransferenciaPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciaPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
