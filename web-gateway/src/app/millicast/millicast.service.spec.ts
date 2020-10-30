import { TestBed } from '@angular/core/testing';

import { MillicastService } from './millicast.service';

describe('MillicastService', () => {
  let service: MillicastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MillicastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
