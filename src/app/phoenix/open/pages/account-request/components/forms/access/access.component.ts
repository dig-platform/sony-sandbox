import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {

  public form = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(),
    email: new FormControl(),
    company: new FormControl(),
    territory: new FormControl(),
    jobTitle: new FormControl(),
  })

  constructor() { }

  ngOnInit(): void {
  }

}
