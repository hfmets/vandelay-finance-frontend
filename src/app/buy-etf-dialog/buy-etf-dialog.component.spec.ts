import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyEtfDialogComponent } from './buy-etf-dialog.component';

describe('BuyEtfDialogComponent', () => {
  let component: BuyEtfDialogComponent;
  let fixture: ComponentFixture<BuyEtfDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyEtfDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyEtfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
