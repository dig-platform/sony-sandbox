import * as fromNgrxStepper from './ngrx-stepper.reducer';
import { selectNgrxStepperState } from './ngrx-stepper.selectors';

describe('NgrxStepper Selectors', () => {
  it('should select the feature state', () => {
    const result = selectNgrxStepperState({
      [fromNgrxStepper.ngrxStepperFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
