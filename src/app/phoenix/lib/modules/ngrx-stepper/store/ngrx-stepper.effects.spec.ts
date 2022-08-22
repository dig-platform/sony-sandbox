import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { NgrxStepperEffects } from './ngrx-stepper.effects';

describe('NgrxStepperEffects', () => {
  let actions$: Observable<any>;
  let effects: NgrxStepperEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgrxStepperEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(NgrxStepperEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
