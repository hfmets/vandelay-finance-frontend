import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MutualfundService } from './mutualfund.service';

describe('MutualfundService', () => {
  let fundService: MutualfundService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MutualfundService],
    });
    fundService = TestBed.inject(MutualfundService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(fundService).toBeTruthy();
  });

  // it('should retrieve all mutual funds', (done) => {
  //   fundService.getFunds().subscribe((funds) => {
  //     expect(funds).toBeTruthy();
  //     done();
  //   });
  // });

  it('should retrieve a mutual fund', () => {
    fundService.getFund('SLGD').subscribe((funds) => {
      expect(funds.length).toBe(1);
    });
  });
});
