import { createAction, props } from '@ngrx/store';

export const loadConfigs = createAction(
  '[Config] Load Configs'
);

export const setConfig = createAction(
  '[Config] Set Config',
  props<{key: string, data: any}>()
)




