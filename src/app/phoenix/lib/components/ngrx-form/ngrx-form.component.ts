import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef, Input, OnDestroy,
  OnInit,
  QueryList
} from '@angular/core';
import {FormGroup, ValidationErrors} from '@angular/forms';
import {NgrxFormDirective} from './ngrx-form.directive';
import {ControlledForm} from './store/ngrx-form';
import {Store} from '@ngrx/store';
import {registerForm, setForm} from './store/ngrx-form.actions';
import {Subscription} from 'rxjs';



@Component({
  selector: 'app-ngrx-form',
  templateUrl: './ngrx-form.component.html',
  styleUrls: ['./ngrx-form.component.scss']
})
export class NgrxFormComponent implements OnInit, AfterViewInit, OnDestroy {
  public template: string = 'loading';

  private forms: ControlledForm[] = [];
  private subs: Subscription[] = [];

  constructor(private store: Store) { }

  @ContentChildren(NgrxFormDirective) formElements!: QueryList<NgrxFormDirective>;

  @Input() group!: string;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const forms: ControlledForm[] = [];
    this.formElements.forEach(f => {
      const component = f.appNgrxForm;
      if (typeof component.getForm === 'function') {
        const {instanceId} = f;
        const controlledFormInstance = {
          formGroup: this.initializeForm(instanceId, component.getForm()),
          instanceId: f.instanceId
        }
        forms.push(controlledFormInstance);
        f.controlledFormInstance = controlledFormInstance;
      }
    })
    this.forms = forms;
    forms.forEach(formRef => {
      const sub = formRef.formGroup.valueChanges.subscribe(value => this.store.dispatch(setForm({
        data: this.serializeForm(formRef)
      })));
      this.subs.push(sub);
    });
  }

  initializeForm(id: string, form: FormGroup): FormGroup {
    const controls = form.controls;
    const newForm = new FormGroup(controls, {updateOn: 'blur'});
    return newForm;
  }

  serializeForm(ref: ControlledForm) {
    const data = {
      instanceId: ref.instanceId,
      value: ref.formGroup.value,
      dirty: ref.formGroup.dirty,
      valid: ref.formGroup.valid,
      pristine: ref.formGroup.pristine,
      errors: this.serializeErrors(ref.formGroup)
    };
    return data;
  }

  serializeErrors(form: FormGroup) {
    const errors: {[key: string]: any} = {};
    return Object.keys(form.controls).reduce((errors, key) => {
      const control = form.get(key);
      if (! control) {
        // stop ts from complaining
        return errors;
      }
      const controlErrors: ValidationErrors | undefined | null = control.errors;
      if (!! controlErrors) {
        errors[key] = Object.keys(controlErrors).map(validator => ({
          validator,
          value: controlErrors[validator]
        }));
      }
      return errors;
    }, errors);
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.forEach(s => s.unsubscribe());
    }
  }

}
