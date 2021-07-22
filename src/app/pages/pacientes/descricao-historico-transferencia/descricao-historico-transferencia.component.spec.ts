import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoHistoricoTransferenciaComponent } from './descricao-historico-transferencia.component';

describe('DescricaoHistoricoTransferenciaComponent', () => {
  let component: DescricaoHistoricoTransferenciaComponent;
  let fixture: ComponentFixture<DescricaoHistoricoTransferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescricaoHistoricoTransferenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoHistoricoTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
