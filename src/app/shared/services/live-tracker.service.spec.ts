import { TestBed, inject } from '@angular/core/testing';

import { LiveTrackerService } from './live-tracker.service';

describe('LiveTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiveTrackerService]
    });
  });

  it('should be created', inject([LiveTrackerService], (service: LiveTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
