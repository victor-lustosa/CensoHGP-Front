import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashAnalyticsComponent } from './dash-analytics.component';

describe('DashAnalyticsComponent', () => {
  let component: DashAnalyticsComponent;
  let fixture: ComponentFixture<DashAnalyticsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
