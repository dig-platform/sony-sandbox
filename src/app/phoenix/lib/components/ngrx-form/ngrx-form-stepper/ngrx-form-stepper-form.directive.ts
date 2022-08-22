import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appNgrxFormStepperForm]'
})
export class NgrxFormStepperFormDirective {
  @Input() label!: string;
  @Input() description!: string;

  @Input()
  set form(form: TemplateRef<any>) {
    this.viewContainerRef.createEmbeddedView(form);
  }

  constructor(
    private viewContainerRef: ViewContainerRef
  ) { }

}
