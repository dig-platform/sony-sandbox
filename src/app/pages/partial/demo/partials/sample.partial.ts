import {Component, EventEmitter, Input, NgModule, Output, ViewContainerRef} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  template: `<span>Hello {{name}}</span> <button (click)="reply.emit('Look, this works!')">Reply</button>`,
})
export class SampleComponent {
  @Input() name: string | undefined;
  @Output() reply: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}
}

@NgModule({
  declarations: [
    SampleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PartialModule {
  static partial = SampleComponent;
}
