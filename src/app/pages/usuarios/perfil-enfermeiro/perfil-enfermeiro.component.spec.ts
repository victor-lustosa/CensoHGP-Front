import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEnfermeiroComponent } from './perfil-enfermeiro.component';

describe('PerfilEnfermeiroComponent', () => {
  let component: PerfilEnfermeiroComponent;
  let fixture: ComponentFixture<PerfilEnfermeiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilEnfermeiroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEnfermeiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
