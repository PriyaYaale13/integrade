import { TestBed } from '@angular/core/testing';

import { AtRiskStudentsService } from './at-risk-students.service';

describe('AtRiskStudentsService', () => {
  let service: AtRiskStudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtRiskStudentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
