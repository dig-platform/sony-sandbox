import { createAction, props } from '@ngrx/store';
import {NgrxStep, NgrxStepper} from '../ngrx-stepper';

export const createStepper = createAction(
  '[NgrxStepper] Create Stepper',
  props<{stepper: NgrxStepper}>()
);
export const setStep = createAction(
  '[NgrxStepper] Set Step',
  props<{stepper: string, step: NgrxStep}>()
);
export const setStepState = createAction(
  '[NgrxStepper] Set Step State',
  props<{stepper: string, step: string, state: any}>()
);







