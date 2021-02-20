import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaChecklistsComponent } from './lista-checklists.component';

describe('ListaChecklistsComponent', () => {
  let component: ListaChecklistsComponent;
  let fixture: ComponentFixture<ListaChecklistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaChecklistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaChecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
