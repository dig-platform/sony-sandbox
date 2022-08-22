import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {concatMap, first, map, switchMap, tap} from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as NgrxFormActions from './ngrx-form.actions';
import {setForm} from './ngrx-form.actions';

@Injectable()
export class NgrxFormEffects {
  registerForm$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NgrxFormActions.registerForm),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      switchMap(({instance}) => instance.formGroup.valueChanges.pipe(
        first(),
        tap(console.log),
        map(value => {
          console.log(value);
          return setForm({
            data: {
              instanceId: instance.instanceId,
              value,
              dirty: instance.formGroup.dirty,
              valid: instance.formGroup.valid,
              pristine: instance.formGroup.pristine,
              errors: null
              // errors: instance.formGroup.errors
            }
          })
        })
      ))
    );
  });

  constructor(private actions$: Actions) {}
}
