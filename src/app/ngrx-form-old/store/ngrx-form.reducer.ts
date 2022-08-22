import { Action, createReducer, on } from '@ngrx/store';
import {ControlledFormData} from './ngrx-form';
import {markAsClean, registerFormGroup, setForm} from './ngrx-form.actions';
import {patchAccountRequest} from '../../../../open/pages/account-request/store/account-request.actions';
import {group} from '@angular/animations';

export const ngrxFormFeatureKey = 'ngrxForm';

export interface State {
  forms: {[key: string]: ControlledFormData},
  groups: {[key: string]: string[]}
}

export const initialState: State = {
  forms: {},
  groups: {}
};

export const reducer = createReducer(
  initialState,
  on(setForm, (state, {data}) => ({...state, forms: {...state.forms, ...{[data.instanceId]: {...data}}}})),
  on(registerFormGroup, (state, {groupId, instanceIds}) => {
    const groups = {...state.groups};
    groups[groupId] = instanceIds;
    return {...state, groups};
  })
);
