import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellHoldingsDialogComponent } from './sell-holdings-dialog.component';

describe('SellHoldingsDialogComponent', () => {
  let component: SellHoldingsDialogComponent;
  let fixture: ComponentFixture<SellHoldingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellHoldingsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellHoldingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
