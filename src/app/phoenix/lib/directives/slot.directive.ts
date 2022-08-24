import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[slot]',
  standalone: true
})
export class SlotDirective {
  @Input() slot!: string;
  constructor() { }

}
