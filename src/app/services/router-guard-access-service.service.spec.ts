import { TestBed } from '@angular/core/testing';

import { RouterGuardAccessServiceService } from './router-guard-access-service.service';

describe('RouterGuardAccessServiceService', () => {
  let service: RouterGuardAccessServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterGuardAccessServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
