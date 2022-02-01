import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IraTypesComponent } from './ira-types.component';

describe('IraTypesComponent', () => {
  let component: IraTypesComponent;
  let fixture: ComponentFixture<IraTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IraTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IraTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
