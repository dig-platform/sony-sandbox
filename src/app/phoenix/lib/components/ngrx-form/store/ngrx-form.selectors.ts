import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNgrxForm from './ngrx-form.reducer';

export const selectNgrxFormState = createFeatureSelector<fromNgrxForm.State>(
  fromNgrxForm.ngrxFormFeatureKey
);
