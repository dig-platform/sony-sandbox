import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgrxFormEffects } from './store/ngrx-form.effects';
import { NgrxFormComponent } from './ngrx-form.component';
import { NgrxFormDirective } from './ngrx-form.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import * as fromForm from './store/ngrx-form.reducer';



@NgModule({
  declarations: [
    NgrxFormComponent,
    NgrxFormDirective
  ],
  exports: [
    NgrxFormComponent,
    NgrxFormDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromForm.ngrxFormFeatureKey, fromForm.reducer),
    EffectsModule.forFeature([NgrxFormEffects])
  ]
})
export class NgrxFormModule { }
