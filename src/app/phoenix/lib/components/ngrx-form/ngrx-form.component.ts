import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  OnInit,
  QueryList
} from '@angular/core';
import {FormGroup, ValidationErrors} from '@angular/forms';
import {NgrxFormDirective} from './ngrx-form.directive';
import {ControlledForm} from './store/ngrx-form';
import {Store} from '@ngrx/store';
import {registerForm, setForm} from './store/ngrx-form.actions';



@Component({
  selector: 'app-ngrx-form',
  templateUrl: './ngrx-form.component.html',
  styleUrls: ['./ngrx-form.component.scss']
})
export class NgrxFormComponent implements OnInit, AfterViewInit {
  public template: string = 'loading';

  private forms: ControlledForm[] = [];

  constructor(private store: Store) { }

  @ContentChildren(NgrxFormDirective) formElements!: QueryList<NgrxFormDirective>;

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
    let formRef: ControlledForm;
    // if (forms.length > 1) {
    //   formRef = new FormGroup(forms.reduce((a, b) => {
    //     const group: any = a;
    //     group[b.instanceId] = b.formGroup;
    //     return group;
    //   }, {}))
    // } else {
    //   formRef =
    // }
    formRef = forms[0];
    // todo unsubscribe from valueChanges
    formRef.formGroup.valueChanges.subscribe(value => this.store.dispatch(setForm({
      data: this.serializeForm(formRef)
    })))
  }

  initializeForm(id: string, form: FormGroup): FormGroup {
    const controls = form.controls;
    const newForm = new FormGroup(controls, {updateOn: 'blur'});
    return newForm;
  }

  serializeForm(ref: ControlledForm) {
    console.log(ref.formGroup.errors);
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
      const controlErrors: ValidationErrors | undefined | null = form.get(key)?.errors;
      if (!! controlErrors) {
        // const errorArray: any[] = controlErrors as Array<any>;
        errors[key] = Object.keys(controlErrors).map(validator => ({
          validator,
          value: controlErrors[validator]
        }));
      }
      return errors;
    }, errors);
  }

}
