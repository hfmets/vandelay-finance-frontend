import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyStocksDialogComponent } from './buy-stocks-dialog.component';

describe('BuyStocksDialogComponent', () => {
  let component: BuyStocksDialogComponent;
  let fixture: ComponentFixture<BuyStocksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyStocksDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyStocksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
