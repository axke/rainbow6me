import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastRanksComponent } from './past-ranks.component';

describe('PastRanksComponent', () => {
  let component: PastRanksComponent;
  let fixture: ComponentFixture<PastRanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastRanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastRanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
