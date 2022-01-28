import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletUpdateService {
  private walletUpdate = new Subject<boolean>();
  currentWalletUpdate$ = this.walletUpdate.asObservable();

  changeWalletUpdate(change: boolean) {
    this.walletUpdate.next(change);
  }

  private userInfoUpdate = new Subject<boolean>();
  currentUserInfoUpdate$ = this.userInfoUpdate.asObservable();

  changeUserInfoUpdate(change: boolean) {
    this.userInfoUpdate.next(change);
  }

  constructor() {}
}
