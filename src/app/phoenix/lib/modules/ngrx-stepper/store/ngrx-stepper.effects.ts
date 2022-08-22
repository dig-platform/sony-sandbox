import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as NgrxStepperActions from './ngrx-stepper.actions';

@Injectable()
export class NgrxStepperEffects {

  constructor(private actions$: Actions) {}
}
