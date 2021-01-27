import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CadastroIncidentesComponent } from './cadastro-incidentes.component';

describe('CadastroIncidentesComponent', () => {
  let component: CadastroIncidentesComponent;
  let fixture: ComponentFixture<CadastroIncidentesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroIncidentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroIncidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
