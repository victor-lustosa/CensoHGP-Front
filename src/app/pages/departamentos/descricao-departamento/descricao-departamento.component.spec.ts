import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoDepartamentoComponent } from './descricao-departamento.component';

describe('DescricaoDepartamentoComponent', () => {
  let component: DescricaoDepartamentoComponent;
  let fixture: ComponentFixture<DescricaoDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescricaoDepartamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
