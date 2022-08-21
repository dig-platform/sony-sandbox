import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenRoutingModule } from './open-routing.module';
import { FormStepperComponent } from './components/form-stepper/form-stepper.component';
import { FormStepperStepDirective } from './components/form-stepper/form-stepper-step.directive';
import { StepOneComponent } from './components/form-stepper/demo/step-one/step-one.component';
import { StepTwoComponent } from './components/form-stepper/demo/step-two/step-two.component';
import { StepThreeComponent } from './components/form-stepper/demo/step-three/step-three.component';
import { FormStepperDemoComponent } from './components/form-stepper/demo/form-stepper-demo/form-stepper-demo.component';


@NgModule({
  declarations: [
    FormStepperComponent,
    FormStepperStepDirective,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    FormStepperDemoComponent
  ],
  imports: [
    CommonModule,
    OpenRoutingModule
  ]
})
export class OpenModule { }
