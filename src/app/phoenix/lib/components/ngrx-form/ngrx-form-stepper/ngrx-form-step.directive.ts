import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appNgrxFormStep]'
})
export class NgrxFormStepDirective {
  @Input() label!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() controlledForm!: string;
  constructor(public template: TemplateRef<any>) { }
}
