import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoPacienteComponent } from './descricao-paciente.component';

describe('DescricaoPacienteComponent', () => {
  let component: DescricaoPacienteComponent;
  let fixture: ComponentFixture<DescricaoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescricaoPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
