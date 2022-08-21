import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {
  public form = new FormGroup({
    favoriteMovie: new FormControl(),
    favoriteShow: new FormControl(),
  })

  constructor() { }

  ngOnInit(): void {
  }

}
