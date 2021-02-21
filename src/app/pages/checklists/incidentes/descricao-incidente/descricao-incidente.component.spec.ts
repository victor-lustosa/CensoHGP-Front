import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoIncidenteComponent } from './descricao-incidente.component';

describe('DescricaoIncidenteComponent', () => {
  let component: DescricaoIncidenteComponent;
  let fixture: ComponentFixture<DescricaoIncidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescricaoIncidenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoIncidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
