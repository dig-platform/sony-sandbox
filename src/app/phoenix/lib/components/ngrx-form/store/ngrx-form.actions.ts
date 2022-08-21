import { createAction, props } from '@ngrx/store';
import {ControlledForm, ControlledFormData} from './ngrx-form';

export const registerForm = createAction(
  '[NgrxForm] Register Form',
  props<{instance: ControlledForm}>()
);

export const setForm = createAction(
  '[NgrxForm] Set Form',
  props<{data: ControlledFormData}>()
)




