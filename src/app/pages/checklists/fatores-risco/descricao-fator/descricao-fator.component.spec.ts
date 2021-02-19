import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoFatorComponent } from './historico-fator.component';

describe('HistoricoFatorComponent', () => {
  let component: HistoricoFatorComponent;
  let fixture: ComponentFixture<HistoricoFatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoFatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoFatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
