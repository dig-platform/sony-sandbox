import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

// todo fix tab index on form controls

export const requiredIfCompany: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  return null;
  const company = group.get('company')?.value;
  if (! company) {
    return {missingCompany: true};
  }
   const companyName = group.get('companyName');
  if (company === 'other') {
    companyName?.addValidators(Validators.required);
  } else {
    companyName?.removeValidators(Validators.required);
  }
  return null;
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
    companyName: new FormControl(),
    reportingGroup: new FormControl(),
    sonyContact: new FormControl(),
    businessJustification: new FormControl(null, [Validators.required]),
    jobTitle: new FormControl(null, [Validators.required]),
    department: new FormControl(),
    division: new FormControl(),
  }, {validators: requiredIfCompany})
  constructor() { }

  get currentCompany() {
    const company = this.form.get('company')?.value;
    if (! company) {
      return undefined;
    }
    return company + '';
  }

  ngOnInit(): void {
    const company = this.form.get('company');
    this.form.get('company')?.valueChanges.subscribe(company => {
      console.log(company);
      if (company === 'other') {
        this.form.get('companyName')?.addValidators(Validators.required);
        this.form.get('sonyContact')?.addValidators(Validators.required);
        this.form.get('department')?.removeValidators(Validators.required);
        this.form.get('division')?.removeValidators(Validators.required);
      } else {
        this.form.get('companyName')?.removeValidators(Validators.required);
        this.form.get('sonyContact')?.removeValidators(Validators.required);
        this.form.get('department')?.addValidators(Validators.required);
        this.form.get('division')?.addValidators(Validators.required);
      }
    })
    this.form.valueChanges.subscribe(() => {
      console.log(this.form.valid);
      console.log(this.form.errors);
    });
  }

}
