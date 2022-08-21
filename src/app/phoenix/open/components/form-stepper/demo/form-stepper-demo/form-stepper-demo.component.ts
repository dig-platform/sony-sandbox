import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormStepperComponent} from '../../form-stepper.component';
import {StepOneComponent} from '../step-one/step-one.component';
import {StepTwoComponent} from '../step-two/step-two.component';
import {StepThreeComponent} from '../step-three/step-three.component';
import {FormStepperStepDirective} from '../../form-stepper-step.directive';

@Component({
  selector: 'app-form-stepper-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormStepperComponent,
    FormStepperStepDirective,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent
  ],
  templateUrl: './form-stepper-demo.component.html',
  styleUrls: ['./form-stepper-demo.component.scss']
})
export class FormStepperDemoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
