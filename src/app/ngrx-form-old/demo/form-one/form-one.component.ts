import { Component, OnInit } from '@angular/core';
import {NgrxFormAccessor} from '../../store/ngrx-form';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-one',
  templateUrl: './form-one.component.html',
  styleUrls: ['./form-one.component.scss']
})
export class FormOneComponent implements OnInit, NgrxFormAccessor {
  public readonly form = new FormGroup({
    name: new FormControl(),
    email: new FormControl(null, [Validators.required, Validators.email])
  })
  constructor() { }

  ngOnInit(): void {
  }

  getForm(): FormGroup {
    return this.form;
  }

}
