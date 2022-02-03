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

  // it('should return 1 fund', (done: DoneFn) => {
  //   fundService.getFund('SLGD').subscribe((value) => {
  //     //expect(value.length).toEqual(1);
  //     console.log('value length', value.length);
  //     expect(value[0].symbol).toEqual('SLGD');
  //     done();
  //   });
  // });
});
