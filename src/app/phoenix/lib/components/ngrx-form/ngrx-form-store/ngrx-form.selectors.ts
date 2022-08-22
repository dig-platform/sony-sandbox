import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNgrxForm from './ngrx-form.reducer';
import {ControlledFormData, ControlledFormGroupData} from './ngrx-form';

export const selectNgrxFormState = createFeatureSelector<fromNgrxForm.State>(
  fromNgrxForm.ngrxFormFeatureKey
);

export const selectForm = (instanceId: string) => createSelector(
  selectNgrxFormState,
  (state) => {
    return state.forms[instanceId] ? {...state.forms[instanceId]} : undefined;
  }
);

export const selectFormGroup = (groupId: string) => createSelector(
  selectNgrxFormState,
  (state) => {
    const group = state.groups[groupId];
    if (group) {
      const res: ControlledFormGroupData = {
        forms: [...group],
        instanceId: groupId,
        dirty: false,
        valid: true,
        errors: {},
        value: {}
      };
      group.forEach(f => {
          const form = state.forms[f];
          if (! form) {
            return undefined;
          }
          if (form.dirty) {
            res.dirty = true;
          }
          if (! form.valid) {
            res.valid = false;
            res.errors[f] = {...form.errors}
          }
          res.value[f] = {...form.value};
          return;
      });
      // const controls = group.map(f => {
      //   const form = state.forms[f];
      //   if (! form) {
      //     return undefined;
      //   }
      //   res.value[f] = {...form.value};
      // }).filter(f => !! f);
      return res;
    }
    return undefined;
  }
);
