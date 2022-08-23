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
  });

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
  }

  get currentCompany() {
    const company = this.form.get('company')?.value;
    if (! company) {
      return undefined;
    }
    return company + '';
  }

  ngOnInit(): void {
  }

  validateCompanyDetails(company: string) {
    if (company === 'sony') {
      this.form.get('companyName')?.removeValidators(Validators.required);
      this.form.get('companyName')?.removeValidators(Validators.required);
      this.form.get('sonyContact')?.setErrors(null);
      this.form.get('sonyContact')?.setErrors(null);
      this.form.get('department')?.addValidators(Validators.required);
      this.form.get('division')?.addValidators(Validators.required);
    } else if (company === 'other') {
      this.form.get('companyName')?.addValidators(Validators.required);
      this.form.get('sonyContact')?.addValidators(Validators.required);
      this.form.get('department')?.removeValidators(Validators.required);
      this.form.get('department')?.setErrors(null)
      this.form.get('division')?.removeValidators(Validators.required);
      this.form.get('division')?.setErrors(null)
    }
    this.form.updateValueAndValidity();
  }

}
