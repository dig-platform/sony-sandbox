import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as AccountRequestActions from './account-request.actions';

@Injectable()
export class AccountRequestEffects {

  constructor(private actions$: Actions) {}
}
