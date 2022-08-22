import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxFormStepperComponent } from './ngrx-form-stepper.component';

describe('NgrxFormStepperComponent', () => {
  let component: NgrxFormStepperComponent;
  let fixture: ComponentFixture<NgrxFormStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgrxFormStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgrxFormStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
