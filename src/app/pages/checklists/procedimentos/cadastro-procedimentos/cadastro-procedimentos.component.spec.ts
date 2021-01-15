import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroProcedimentosComponent } from './cadastro-procedimentos.component';

describe('CadastroProcedimentosComponent', () => {
  let component: CadastroProcedimentosComponent;
  let fixture: ComponentFixture<CadastroProcedimentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroProcedimentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroProcedimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
