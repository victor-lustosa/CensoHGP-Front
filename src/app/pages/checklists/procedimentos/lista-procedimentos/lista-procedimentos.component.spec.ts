import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaProcedimentosComponent } from './lista-procedimentos.component';

describe('ListaProcedimentosComponent', () => {
  let component: ListaProcedimentosComponent;
  let fixture: ComponentFixture<ListaProcedimentosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaProcedimentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProcedimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
