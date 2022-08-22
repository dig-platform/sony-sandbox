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
import {Observable, of} from 'rxjs';
import {selectForm, selectFormGroup} from '../ngrx-form-store';
import {map} from 'rxjs/operators';

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

  disablePrevious(index: number): Observable<boolean> {
    if (index === 0 || ! this.formState$) {
      return of(true);
    }
    return of(false);
  }

  disableNext(index: number): Observable<boolean> {
    if (index >= this.steps.length - 1) {
      return of(true);
    }
    return of(false);
  }

  stepIsValid(index: number): Observable<boolean> {
    const controlledForm = this.getControlledFormId(index);
    if (! controlledForm) {
      return of(true);
    }
    return this.store.select(selectForm(controlledForm)).pipe(
      map(f => f ? f.valid : false)
    )
  }

  getControlledFormId(index: number) {
    const step = this.steps[index];
    return step.controlledForm;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.form.formTemplates.forEach(template => {
      this.steps.push(template);
    });
    this.formState$ = this.store.select(selectFormGroup(this.form.group));
    this.stepIsValid(0).subscribe(console.warn);
  }

}
