import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxFormStepperDemoComponent } from './ngrx-form-stepper-demo.component';

describe('NgrxFormStepperDemoComponent', () => {
  let component: NgrxFormStepperDemoComponent;
  let fixture: ComponentFixture<NgrxFormStepperDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgrxFormStepperDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgrxFormStepperDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
