import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-account-request',
  templateUrl: './account-request.component.html',
  styleUrls: ['./account-request.component.scss']
})
export class AccountRequestComponent implements OnInit {
  public readonly registrationForm = new FormGroup({
    firstName: new FormControl()
  })
  public readonly accessForm = new FormGroup({
    firstName: new FormControl()
  });
  public readonly form = new FormGroup({
    access: this.accessForm,
    registration: this.registrationForm,
  })
  constructor() {

  }

  ngOnInit(): void {
  }

}
