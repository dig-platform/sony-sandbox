import {Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Directive({
  selector: '[appFormStepperStep]',
  standalone: true
})
export class FormStepperStepDirective implements OnInit{
  @Input() formId!: string;
  @Input() label!: string;
  @Input() title!: string;
  @Input() description!: string;

  constructor(private view: ViewContainerRef) { }

  get completed() {
    return false;
  }

  ngOnInit(): void {
    console.log(this.view.element);
  }
}
