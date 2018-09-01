import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonRankComponent } from './season-rank.component';

describe('SeasonRankComponent', () => {
  let component: SeasonRankComponent;
  let fixture: ComponentFixture<SeasonRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
