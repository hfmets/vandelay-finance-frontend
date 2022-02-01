import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EztraderComponent } from './eztrader.component';

describe('EztraderComponent', () => {
  let component: EztraderComponent;
  let fixture: ComponentFixture<EztraderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EztraderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EztraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
