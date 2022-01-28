import { TestBed } from '@angular/core/testing';

import { WalletUpdateService } from './wallet-update.service';

describe('WalletUpdateService', () => {
  let service: WalletUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
