import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgrxFormStepDirective} from './ngrx-form-step.directive';
import {NgrxFormStepperComponent} from './ngrx-form-stepper.component';
import {NgrxFormStoreModule} from '../ngrx-form-store';
import {NgrxFormModule} from '../ngrx-form';
import {NgrxFormStepperFormDirective} from './ngrx-form-stepper-form.directive';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';



@NgModule({
  declarations: [
    NgrxFormStepDirective,
    NgrxFormStepperComponent,
    NgrxFormStepperFormDirective
  ],
  exports: [
    NgrxFormStepDirective,
    NgrxFormStepperComponent
  ],
  imports: [
    CommonModule,
    NgrxFormStoreModule,
    NgrxFormModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule
  ]
})
export class NgrxFormStepperModule { }
