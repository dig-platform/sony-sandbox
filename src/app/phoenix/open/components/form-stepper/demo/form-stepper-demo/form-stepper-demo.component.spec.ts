import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStepperDemoComponent } from './form-stepper-demo.component';

describe('FormStepperDemoComponent', () => {
  let component: FormStepperDemoComponent;
  let fixture: ComponentFixture<FormStepperDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStepperDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStepperDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
