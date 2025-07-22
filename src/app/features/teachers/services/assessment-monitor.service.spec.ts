import { TestBed } from '@angular/core/testing';

import { AssessmentMonitorService } from './assessment-monitor.service';

describe('AssessmentMonitorService', () => {
  let service: AssessmentMonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentMonitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
