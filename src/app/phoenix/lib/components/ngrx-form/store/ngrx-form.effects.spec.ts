import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { NgrxFormEffects } from './ngrx-form.effects';

describe('NgrxFormEffects', () => {
  let actions$: Observable<any>;
  let effects: NgrxFormEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgrxFormEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(NgrxFormEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
