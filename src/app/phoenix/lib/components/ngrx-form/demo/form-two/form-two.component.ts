import { Component, OnInit } from '@angular/core';
import {NgrxFormAccessor} from '../../ngrx-form-store';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-two',
  templateUrl: './form-two.component.html',
  styleUrls: ['./form-two.component.scss']
})
export class FormTwoComponent implements OnInit, NgrxFormAccessor {
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
