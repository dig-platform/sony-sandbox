import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNgrxStepper from './ngrx-stepper.reducer';
import {
  ControlledFormGroupData,
  selectNgrxFormState
} from '../../../components/ngrx-form/ngrx-form-store';

export const selectNgrxStepperState = createFeatureSelector<fromNgrxStepper.State>(
  fromNgrxStepper.ngrxStepperFeatureKey
);


export const selectStepper = (stepperId: string) => createSelector(
  selectNgrxStepperState,
  (state) => {
    const stepper = {...state[stepperId]};
    const res: any = {
      steps: {...stepper.steps},
      dirty: false,
      valid: true,
      errors: {},
      value: {}
    }
    if (stepper.steps) {
      Object.keys(stepper.steps).forEach(key => {
        const step = {...stepper.steps[key]};
        if (!step) {
          return undefined;
        }
        if (step.dirty) {
          res.dirty = true;
        }
        if (!step.valid) {
          res.valid = false;
          res.errors[key] = {...step.errors}
        }
        res.value[key] = {...step.value};
        return;
      });
    }
    return res;
  });
