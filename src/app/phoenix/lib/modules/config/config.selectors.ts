import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromConfig from './config.reducer';

export const selectConfigState = createFeatureSelector<fromConfig.State>(
  fromConfig.configFeatureKey
);

export const selectConfig = (key: string) => createSelector(
  selectConfigState,
  (state) => {
    if (! state.config?.hasOwnProperty(key)) {
      return undefined;
    }
    const slice =  state.config[key];
    return Array.isArray(slice) ? [...slice] : {...slice};
  }
)
