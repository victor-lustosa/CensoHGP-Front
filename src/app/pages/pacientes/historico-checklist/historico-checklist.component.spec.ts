import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoChecklistComponent } from './historico-checklist.component';

describe('HistoricoChecklistComponent', () => {
  let component: HistoricoChecklistComponent;
  let fixture: ComponentFixture<HistoricoChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
