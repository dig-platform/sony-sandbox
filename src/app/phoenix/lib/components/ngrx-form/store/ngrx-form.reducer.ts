import { Action, createReducer, on } from '@ngrx/store';
import {ControlledFormData} from './ngrx-form';
import {setForm} from './ngrx-form.actions';
import {patchAccountRequest} from '../../../../open/pages/account-request/store/account-request.actions';

export const ngrxFormFeatureKey = 'ngrxForm';

export interface State {
  forms: {[key: string]: ControlledFormData}
}

export const initialState: State = {
  forms: {}
};

export const reducer = createReducer(
  initialState,
  on(setForm, (state, {data}) => ({...state, forms: {...state.forms, [data.instanceId]: {...data}}}))
);
