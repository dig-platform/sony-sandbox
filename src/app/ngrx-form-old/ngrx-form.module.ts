import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgrxFormEffects } from './store/ngrx-form.effects';
import { NgrxFormComponent } from './ngrx-form.component';
import { NgrxFormDirective } from './ngrx-form.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import * as fromForm from './store/ngrx-form.reducer';
import { NgrxFormStepperComponent } from './ngrx-form-stepper/ngrx-form-stepper.component';
import { NgrxFormStepDirective } from './ngrx-form-step.directive';
import { NgrxFormStepperFormDirective } from './ngrx-form-stepper-form.directive';



@NgModule({
  declarations: [
    NgrxFormComponent,
    NgrxFormDirective,
    NgrxFormStepperComponent,
    NgrxFormStepDirective,
    NgrxFormStepperFormDirective
  ],
  exports: [
    NgrxFormComponent,
    NgrxFormDirective,
    NgrxFormStepperComponent,
    NgrxFormStepDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromForm.ngrxFormFeatureKey, fromForm.reducer),
    EffectsModule.forFeature([NgrxFormEffects])
  ]
})
export class NgrxFormModule { }
