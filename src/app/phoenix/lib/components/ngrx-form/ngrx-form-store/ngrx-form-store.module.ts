import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromForm from './ngrx-form.reducer';
import {EffectsModule} from '@ngrx/effects';
import {NgrxFormEffects} from './ngrx-form.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromForm.ngrxFormFeatureKey, fromForm.reducer),
    EffectsModule.forFeature([NgrxFormEffects])
  ]
})
export class NgrxFormStoreModule { }
