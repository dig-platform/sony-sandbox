import { Action, createReducer, on } from '@ngrx/store';
import * as NgrxStepperActions from './ngrx-stepper.actions';
import {NgrxStepper} from '../ngrx-stepper';

export const ngrxStepperFeatureKey = 'ngrxStepper';

export interface State {
  [key: string]: NgrxStepper
}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(NgrxStepperActions.createStepper, (state, {stepper}) => ({...state, [stepper.uid]: {...stepper}})),
  on(NgrxStepperActions.setStep, (state, {stepper, step}) => {
    const newStepper = {...state[stepper]};
    const steps = {...newStepper.steps, [step.uid]: {...step}};
    return {...state, [stepper]: {...newStepper,  steps}};
  }),
);
