import { createAction, props } from '@ngrx/store';
import {ControlledForm, ControlledFormData} from './ngrx-form';

export const registerForm = createAction(
  '[NgrxForm] Register Form',
  props<{instance: ControlledForm}>()
);
export const registerFormGroup = createAction(
  '[NgrxForm] Register Form Group',
  props<{groupId: string, instanceIds: string[]}>()
);

// todo mark forms and groups as clean
// we have to figure out how to update the form / form control's status too
export const markAsClean = createAction(
  '[NgrxForm] Mark As Clean',
  props<{groupId?: string, formId?: string}>()
);

export const setForm = createAction(
  '[NgrxForm] Set Form',
  props<{data: ControlledFormData}>()
)




