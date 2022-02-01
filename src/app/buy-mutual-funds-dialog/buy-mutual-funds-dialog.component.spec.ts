import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyMutualFundsDialogComponent } from './buy-mutual-funds-dialog.component';

describe('BuyMutualFundsDialogComponent', () => {
  let component: BuyMutualFundsDialogComponent;
  let fixture: ComponentFixture<BuyMutualFundsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyMutualFundsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyMutualFundsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
