import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIraComponent } from './add-ira.component';

describe('AddIraComponent', () => {
  let component: AddIraComponent;
  let fixture: ComponentFixture<AddIraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
