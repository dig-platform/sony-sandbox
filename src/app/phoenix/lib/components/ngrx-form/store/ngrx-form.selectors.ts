import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNgrxForm from './ngrx-form.reducer';

export const selectNgrxFormState = createFeatureSelector<fromNgrxForm.State>(
  fromNgrxForm.ngrxFormFeatureKey
);

export const selectForm = (instanceId: string) => createSelector(
  selectNgrxFormState,
  (state) => {
    console.log(state);
    return state.forms[instanceId] ? {...state.forms[instanceId]} : undefined;
  }
);
