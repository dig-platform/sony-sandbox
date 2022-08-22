import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef, ViewRef} from '@angular/core';
import {ControlledForm} from '../ngrx-form-store/ngrx-form';

@Directive({
  selector: '[appNgrxForm]'
})
export class NgrxFormDirective  {
  private id!: string;
  public controlledFormInstance!: ControlledForm;

  constructor(
    public element: ElementRef) {
  }

  @Input() appNgrxForm!: any;
  @Input() set instanceId(id) {
    this.id = id;
  };

  get instanceId(): string {
    return this.id ? this.id : this.appNgrxForm.constructor.name;
  }
}
