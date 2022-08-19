import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[appAccountRequestStep]'
})
export class AccountRequestStepDirective {
  @Input() title = 'step';

  constructor() { }

}
