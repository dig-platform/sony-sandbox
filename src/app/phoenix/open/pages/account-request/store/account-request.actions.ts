import { createAction, props } from '@ngrx/store';
import {AccountRequestStatus, AccountRequestStep} from './account-request.reducer';

export const patchAccountRequest = createAction(
  '[AccountRequest] Patch AccountRequest',
  props<{patch: any}>()
);
export const nextStep = createAction(
  '[AccountRequest] Patch AccountRequest'
);
export const previousStep = createAction(
  '[AccountRequest] Patch AccountRequest'
);
export const setSteps = createAction(
  '[AccountRequest] Set Steps',
  props<{steps: AccountRequestStep[]}>()
);
export const setActiveStep = createAction(
  '[AccountRequest] Set Active Step',
  props<{index: number}>()
);
export const setStepStatus = createAction(
  '[AccountRequest] Set Step Status',
  props<{index: number, status: AccountRequestStatus}>()
);




