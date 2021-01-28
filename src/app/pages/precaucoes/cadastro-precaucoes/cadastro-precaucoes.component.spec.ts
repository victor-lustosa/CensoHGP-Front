import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CadastroPrecaucoesComponent } from './cadastro-precaucoes.component';

describe('CadastroPrecaucoesComponent', () => {
  let component: CadastroPrecaucoesComponent;
  let fixture: ComponentFixture<CadastroPrecaucoesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPrecaucoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPrecaucoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
