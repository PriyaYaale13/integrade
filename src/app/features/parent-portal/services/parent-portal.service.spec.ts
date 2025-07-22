import { TestBed } from '@angular/core/testing';

import { ParentPortalService } from './parent-portal.service';

describe('ParentPortalService', () => {
  let service: ParentPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
