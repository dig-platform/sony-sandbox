import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-state-inspector',
  templateUrl: './form-state-inspector.component.html',
  styleUrls: ['./form-state-inspector.component.scss']
})
export class FormStateInspectorComponent implements OnInit {
  @Input() state: any;

  constructor() { }

  ngOnInit(): void {
  }

}
