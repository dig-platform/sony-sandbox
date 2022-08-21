import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {ControlledForm} from './store/ngrx-form';

@Directive({
  selector: '[appNgrxForm]'
})
export class NgrxFormDirective {
  private id!: string;
  public controlledFormInstance!: ControlledForm;

  @Input() appNgrxForm!: any;
  @Input() set instanceId(id) {
    this.id = id;
  };

  get instanceId(): string {
    return this.id ? this.id : this.appNgrxForm.constructor.name;
  }
}
