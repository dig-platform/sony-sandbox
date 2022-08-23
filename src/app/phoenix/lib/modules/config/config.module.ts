import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromReducer from './config.reducer';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ConfigEffects} from './config.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromReducer.configFeatureKey, fromReducer.reducer),
    EffectsModule.forFeature([ConfigEffects])
  ]
})
export class ConfigModule { }
