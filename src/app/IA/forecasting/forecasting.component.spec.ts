import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastingComponent } from './forecasting.component';

describe('ForecastingComponent', () => {
  let component: ForecastingComponent;
  let fixture: ComponentFixture<ForecastingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForecastingComponent]
    });
    fixture = TestBed.createComponent(ForecastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
