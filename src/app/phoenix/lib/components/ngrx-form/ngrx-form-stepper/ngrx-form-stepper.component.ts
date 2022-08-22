import {
  AfterViewInit,
  Component, ContentChild,
  ContentChildren,
  OnInit,
  QueryList, TemplateRef,
  ViewChild
} from '@angular/core';
import {Store} from '@ngrx/store';
import {NgrxFormComponent} from '../ngrx-form/ngrx-form.component';
import {NgrxFormStepDirective} from './ngrx-form-step.directive';
import {NgrxFormDirective} from '../ngrx-form';
import {Observable} from 'rxjs';
import {selectFormGroup} from '../ngrx-form-store';

@Component({
  selector: 'app-ngrx-form-stepper',
  templateUrl: './ngrx-form-stepper.component.html',
  styleUrls: ['./ngrx-form-stepper.component.scss']
})
export class NgrxFormStepperComponent implements OnInit, AfterViewInit {
  public steps: any[] = [];
  public formState$!: Observable<any>;
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
    this.formState$ = this.store.select(selectFormGroup(this.form.group));
  }

}
