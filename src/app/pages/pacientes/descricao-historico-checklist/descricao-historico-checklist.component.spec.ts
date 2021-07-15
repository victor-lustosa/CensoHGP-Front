import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoHistoricoChecklistComponent } from './descricao-historico-checklist.component';

describe('DescricaoHistoricoChecklistComponent', () => {
  let component: DescricaoHistoricoChecklistComponent;
  let fixture: ComponentFixture<DescricaoHistoricoChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescricaoHistoricoChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoHistoricoChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
