import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxStepperDirective } from './ngrx-stepper.directive';
import * as fromReducer from './store/ngrx-stepper.reducer';
import {StoreModule} from '@ngrx/store';



@NgModule({
  declarations: [
    NgrxStepperDirective
  ],
  exports: [
    NgrxStepperDirective
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromReducer.ngrxStepperFeatureKey, fromReducer.reducer)
  ]
})
export class NgrxStepperModule { }
