import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFatoresComponent } from './cadastro-fatores.component';

describe('CadastroFatoresComponent', () => {
  let component: CadastroFatoresComponent;
  let fixture: ComponentFixture<CadastroFatoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroFatoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroFatoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
