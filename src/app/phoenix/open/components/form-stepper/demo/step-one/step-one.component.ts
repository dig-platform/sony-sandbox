import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {
  public form = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
  })
  constructor() { }

  ngOnInit(): void {
  }

}
