import { TestBed } from '@angular/core/testing';

import { MutualfundService } from './mutualfund.service';

describe('MutualfundService', () => {
  let service: MutualfundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutualfundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
