import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CadastroUsuariosComponent } from './cadastro-usuarios.component';

describe('CadastroUsuariosComponent', () => {
  let component: CadastroUsuariosComponent;
  let fixture: ComponentFixture<CadastroUsuariosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
