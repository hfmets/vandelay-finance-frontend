import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IraAccountComponent } from './ira-account.component';

describe('IraAccountComponent', () => {
  let component: IraAccountComponent;
  let fixture: ComponentFixture<IraAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IraAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IraAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
