import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoProcedimentoComponent } from './descricao-procedimento.component';

describe('DescricaoProcedimentoComponent', () => {
  let component: DescricaoProcedimentoComponent;
  let fixture: ComponentFixture<DescricaoProcedimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescricaoProcedimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoProcedimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
