import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousRanksComponent } from './previous-ranks.component';

describe('PreviousRanksComponent', () => {
  let component: PreviousRanksComponent;
  let fixture: ComponentFixture<PreviousRanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousRanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousRanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
