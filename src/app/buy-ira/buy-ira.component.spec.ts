import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyIraComponent } from './buy-ira.component';

describe('BuyIraComponent', () => {
  let component: BuyIraComponent;
  let fixture: ComponentFixture<BuyIraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyIraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyIraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
