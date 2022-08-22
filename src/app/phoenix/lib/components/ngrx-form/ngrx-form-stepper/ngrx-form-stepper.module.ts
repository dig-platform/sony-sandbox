import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgrxFormStepDirective} from './ngrx-form-step.directive';
import {NgrxFormStepperComponent} from './ngrx-form-stepper.component';
import {NgrxFormStoreModule} from '../ngrx-form-store';
import {NgrxFormModule} from '../ngrx-form';



@NgModule({
  declarations: [
    NgrxFormStepDirective,
    NgrxFormStepperComponent
  ],
  exports: [
    NgrxFormStepDirective,
    NgrxFormStepperComponent
  ],
  imports: [
    CommonModule,
    NgrxFormStoreModule,
    NgrxFormModule
  ]
})
export class NgrxFormStepperModule { }
