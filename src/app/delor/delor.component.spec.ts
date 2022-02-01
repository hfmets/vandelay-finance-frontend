import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelorComponent } from './delor.component';

describe('DelorComponent', () => {
  let component: DelorComponent;
  let fixture: ComponentFixture<DelorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
