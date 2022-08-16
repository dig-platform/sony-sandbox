import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-partial',
  template: '<ng-content></ng-content>',
  styleUrls: ['./partial.component.scss']
})
export class PartialComponent implements OnInit{
  @Input() src: any;
  @Input() inputBindings: any;
  @Input() outputBindings: any;
  constructor(public viewContainerRef: ViewContainerRef) {
  }

  async loadPartial() {
    if ( typeof this.src === undefined) {
      throw new Error('required src attribute not set')
      return;
    }
    const partial = await this.src();
    const componentRef: {instance: any} = this.viewContainerRef.createComponent(partial);
    const {instance} = componentRef;
    if (this.inputBindings) {
      Object.keys(this.inputBindings).forEach(k => {
        instance[k] = this.inputBindings[k];
      });
    }
    if (this.outputBindings) {
      Object.keys(this.outputBindings).forEach(k => {
        // todo handle unsubscribing
        instance[k].subscribe(this.outputBindings[k]);
      });
    }
  }

  ngOnInit(): Promise<void> {
    return this.loadPartial();
  }
}
