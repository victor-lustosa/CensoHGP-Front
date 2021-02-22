import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoPrecaucaoComponent } from './descricao-precaucao.component';

describe('DescricaoPrecaucaoComponent', () => {
  let component: DescricaoPrecaucaoComponent;
  let fixture: ComponentFixture<DescricaoPrecaucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescricaoPrecaucaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoPrecaucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
