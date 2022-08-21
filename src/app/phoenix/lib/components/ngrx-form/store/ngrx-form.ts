import {FormGroup} from '@angular/forms';

export interface NgrxForm {
  instanceId: string;
  valid?: boolean;
  pristine?: boolean;
  // todo type the errors
  errors?: any;
  // todo only allow serializable data types
  data: {[key: string]: any};
}

export interface NgrxFormGroup {
  instanceId: string;
  forms: NgrxForm[];
}

export interface NgrxFormAccessor {
  getForm(): FormGroup
}

export interface ControlledForm {
  instanceId: string;
  formGroup: FormGroup;
}

export interface ControlledFormData {
  instanceId: string;
  value: any
  dirty: boolean;
  pristine: boolean;
  valid: boolean;
  errors: any;
}
