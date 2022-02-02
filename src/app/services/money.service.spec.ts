import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MoneyService } from './money.service';
import { environment } from 'src/environments/environment';

describe('MoneyService', () => {
  let service: MoneyService;
  let controller: HttpTestingController;
  let accountInfo = {
    status: 'OK',
    transactions: [
      {
        ticker: 'AAPL',
        kind: 'buy',
        sharesTransacted: 8,
      },
    ],
    holdings: [
      {
        ticker: 'AAPL',
        kind: 'stock',
        sharesOwned: 8,
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoneyService],
    });
    service = TestBed.inject(MoneyService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get account info', () => {
    service.getAccountInfo().subscribe((userInfo) => {
      expect(userInfo).toEqual(accountInfo);
    });

    const req = controller.expectOne(
      `${environment.prefixFinances}${service.accountInfoUrl}`
    );

    req.flush(accountInfo);
  });
});
