import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTrackerComponent } from './live-tracker.component';

describe('LiveTrackerComponent', () => {
  let component: LiveTrackerComponent;
  let fixture: ComponentFixture<LiveTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
