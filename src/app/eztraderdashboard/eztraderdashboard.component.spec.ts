import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EztraderdashboardComponent } from './eztraderdashboard.component';

describe('EztraderdashboardComponent', () => {
  let component: EztraderdashboardComponent;
  let fixture: ComponentFixture<EztraderdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EztraderdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EztraderdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
