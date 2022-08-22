import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit {
  @Input() next: 'hide' | 'disable' | 'active' = 'active';
  @Input() previous: 'hide' | 'disable' | 'active' = 'active';
  constructor() { }

  ngOnInit(): void {
  }

}
