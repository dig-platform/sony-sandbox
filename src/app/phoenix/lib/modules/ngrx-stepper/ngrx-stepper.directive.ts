import {AfterViewInit, Directive, Input} from '@angular/core';
import {MatStep, MatStepper} from '@angular/material/stepper';
import {Store} from '@ngrx/store';
import {createStepper, setStep} from './store/ngrx-stepper.actions';
import {FormControl, FormGroup} from '@angular/forms';

@Directive({
  selector: '[ngrxStepper]'
})
export class NgrxStepperDirective implements AfterViewInit {
  @Input() ngrxStepper!: MatStepper;
  @Input() ngrxId!: string;

  constructor(private store: Store) { }

  ngAfterViewInit(): void {
    this.loadStepper();
  }

  loadStepper() {
    const stepper = {
      uid: this.ngrxId,
      steps: {}
    };
    this.store.dispatch(createStepper({stepper}));
    this.ngrxStepper.steps.forEach(step => this.loadStep(step));
  }

  loadStep(matStep: MatStep) {
    const {stepControl, label} = matStep;
    if (! stepControl) {
      return;
    }
    const uid = label.toLowerCase().replace(' ', '-');
    const step = {
      uid,
      value: {},
      dirty: false,
      valid: false,
      errors: {},
      label
    };

    this.store.dispatch(setStep({stepper: this.ngrxId, step}));


    stepControl.valueChanges.subscribe(value => {
      const stepUpdate = {...step};
      stepUpdate.value = {...value};
      stepUpdate.valid = stepControl.valid;
      // todo mark control as clean when it is
      stepUpdate.dirty = stepControl.dirty;
      stepUpdate.errors = this.mapErrors(stepControl as FormGroup);
      this.store.dispatch(setStep({stepper: this.ngrxId, step: stepUpdate}));
    })
  }

  mapErrors(group: FormGroup) {
    const errorMap: {field: string, error: any}[] = [];
    return Object.keys(group.controls).reduce((errors, k) => {
      const control = group.controls[k] as FormControl;
      if (control.errors) {
        Object.keys(control.errors).forEach(e => {
          errors.push({
            field: k,
            error: e
          })
        });
      }
      return errors;
    }, errorMap);
  }

}
