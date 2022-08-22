import {
  AfterViewInit,
  Component, ContentChild,
  ContentChildren,
  OnInit,
  QueryList,
  ViewChild
} from '@angular/core';
import {NgrxFormDirective} from '../ngrx-form.directive';
import {Store} from '@ngrx/store';
import {NgrxFormComponent} from '../ngrx-form.component';

@Component({
  selector: 'app-ngrx-form-stepper',
  templateUrl: './ngrx-form-stepper.component.html',
  styleUrls: ['./ngrx-form-stepper.component.scss']
})
export class NgrxFormStepperComponent implements OnInit, AfterViewInit {
  public steps: any[] = [];
  constructor(
    private store: Store
  ) { }
  @ContentChild(NgrxFormComponent) form!: NgrxFormComponent;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.form.formTemplates.forEach(template => {
      this.steps.push(template);
    });
  }

}
