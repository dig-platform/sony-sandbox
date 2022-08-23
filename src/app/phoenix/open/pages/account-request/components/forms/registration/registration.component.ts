import {Component, Directive, OnInit} from '@angular/core';
import {
  AbstractControl, AsyncValidator,
  FormControl,
  FormGroup, NG_ASYNC_VALIDATORS,
  ValidationErrors, Validator,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {selectConfig} from '../../../../../../lib/modules/config/config.selectors';

// todo fix tab index on form controls

export const formValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
  const company: string = form.get('company')?.value;
  const requiredFields: {[key: string]: string[]} = {
    other: ['companyName', 'sonyContact'],
    sony: ['department', 'division']
  };

  const allFields = [...requiredFields['other'], ...requiredFields['sony']];

  const errors = allFields.map(field => {
    const control = form.get(field);
    if (! control || ! company) {
      return undefined;
    }
    if (requiredFields[company].indexOf(field) > -1 && ! control.value) {
      control.setErrors({required: true, companyDetails: true});
      return false;
    } else {
      control.setErrors(null);
      return true;
    }
  }).filter(f => f === true);
  return errors.length > 0 ? {companyDetails: company} : null;
};

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public form = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    company: new FormControl(null, [Validators.required]),
    territory: new FormControl(null, [Validators.required]),
    reportingGroup: new FormControl(null, [Validators.required]),
    companyName: new FormControl(null),
    sonyContact: new FormControl(null),
    department: new FormControl(null),
    division: new FormControl(null),
    businessJustification: new FormControl(null, [Validators.required]),
    jobTitle: new FormControl(null, [Validators.required]),
  }, formValidator);

  public reportingGroups$: Observable<string[]> = of([
      'Asset Management',
      'Corporate',
      'Corporate Technology Development',
      'Content Management and Distribution Group',
      'Funimation',
      'Motion Picture Group',
      'SPDP Colorworks',
      'SPDP Imageworks',
      'SPDP Post Media Center',
      'SPDP Sony Pictures Animation',
      'SPDP Sound',
      'SPDP Stock Footage',
      'SPT Crackle',
      'SPT Crackle Latin America',
      'SPT Networks',
      'SPT Prod Domestic',
      'SPT Prod Intl',
      'SPT Sales',
      'Sony Pictures Home Entertainment'
    ]
  );

  constructor(private store: Store) {
    this.reportingGroups$ = store.select(selectConfig('reporting_groups'));
  }

  get currentCompany() {
    const company = this.form.get('company')?.value;
    if (! company) {
      return undefined;
    }
    return company + '';
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      Object.keys(this.form.controls).map(k => {
        const c = this.form.get(k);
        console.log(k, c?.valid, c?.errors);
      })
      console.error(this.form.valid);
    })
  }

}
