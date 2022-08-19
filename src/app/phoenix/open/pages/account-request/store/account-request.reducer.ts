import { Action, createReducer, on } from '@ngrx/store';
import {patchAccountRequest} from './account-request.actions';

export const accountRequestFeatureKey = 'accountRequest';

export enum AccountRequestStatus {
  pristine = 'pristine',
  dirty = 'dirty',
  done = 'done'
}

export interface State {
  accountRequest?: AccountRequest;
  steps: AccountRequestStep[]
}

export interface AccountRequest {
  firstName?: string;
}

export interface AccountRequestStep {
  index?: number;
  label: string;
  title: string;
  description: string;
  active?: boolean;
  disabled?: boolean;
  status?: AccountRequestStatus;
}

export const initialState: State = {
  steps: []
};

export const reducer = createReducer(
  initialState,
  on(patchAccountRequest, (state, {patch}) => ({...state, accountRequest: {...state.accountRequest, ...patch}}))
);
