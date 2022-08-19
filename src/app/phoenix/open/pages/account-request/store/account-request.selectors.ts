import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAccountRequest from './account-request.reducer';

export const selectAccountRequestState = createFeatureSelector<fromAccountRequest.State>(
  fromAccountRequest.accountRequestFeatureKey
);

export const selectAccountRequest = createSelector(
  selectAccountRequestState,
  (state) => state.accountRequest ? {...state.accountRequest} : null
)

export const selectSteps = createSelector(
  selectAccountRequestState,
  (state) => {
    if (state.steps) {
      return [...state.steps]
    }
    return [];
  }
)

export const selectActiveStep = createSelector(
  selectAccountRequestState,
  (state) => {
    if (state.steps) {
      return [...state.steps]
    }
    return [];
  }
)
