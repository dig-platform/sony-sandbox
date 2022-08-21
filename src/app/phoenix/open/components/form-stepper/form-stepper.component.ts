import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  OnInit,
  QueryList, ViewChildren, ViewContainerRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FormStepperStepDirective} from './form-stepper-step.directive';
import {StepOneComponent} from './demo/step-one/step-one.component';

@Component({
  selector: 'app-form-stepper',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormStepperStepDirective],
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.scss']
})
export class FormStepperComponent implements OnInit, AfterContentInit {
  public form = new FormGroup({});
  public forms!: any[];
  constructor() { }

  @ContentChildren(FormStepperStepDirective) contentChildren!: QueryList<FormStepperStepDirective>;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngAfterContentInit(): void {
    this.forms = this.contentChildren
      .map((f: any) => {
        const {formId, form, completed, label, title, description} = f;
        return {formId, form, completed, label, title, description};
      });
    this.initForms();
  }

  initForms() {
    console.log(this.forms);
    const forms = this.forms.filter(form => ! form.formInstance);
    const formGroups = forms.reduce((before, after) => {
      return {...before, [after.formId]: after.formInstance}
    }, {});
    console.log(formGroups);
  }

}
