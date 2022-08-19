import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AccountRequestEffects } from './account-request.effects';

describe('AccountRequestEffects', () => {
  let actions$: Observable<any>;
  let effects: AccountRequestEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountRequestEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AccountRequestEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
