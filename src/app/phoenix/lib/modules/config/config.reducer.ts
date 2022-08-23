import { Action, createReducer, on } from '@ngrx/store';
import * as ConfigActions from './config.actions';
import reporting_groups from './data/reporting-groups';

export const configFeatureKey = 'config';

export interface State {
  config: any;
}

export const initialState: State = {
  config: {
    reporting_groups: [...reporting_groups]
  }
};

export const reducer = createReducer(
  initialState,

  on(ConfigActions.loadConfigs, state => state),

);
