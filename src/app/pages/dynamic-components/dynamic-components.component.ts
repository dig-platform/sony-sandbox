import {Component, OnInit, ViewChild} from '@angular/core';
import {DynamicComponentDirective} from './dynamic-component.directive';

@Component({
  selector: 'app-dynamic-components',
  templateUrl: './dynamic-components.component.html',
  styleUrls: ['./dynamic-components.component.scss']
})
export class DynamicComponentsComponent {
  // you apply the DynamicComponentDirective to the wrapper so you can access it's viewContainer
  @ViewChild(DynamicComponentDirective, {static: true}) dynamicComponent!: DynamicComponentDirective;

  async loadComponent(name: string) {
    // first get the viewContainer reference
    const viewContainerRef = this.dynamicComponent?.viewContainerRef;

    // clear the container if it has already been loaded
    viewContainerRef?.clear();

    // lazy load the module
    const componentLoader = () => import('./greeting/greeting.module').then(module => module.GreetingModule);
    const greetingModule = await componentLoader();

    // the greeting module exposes a static embed property, which enables us to access the
    // GreetingComponent reference from the lazy loaded instance
    const greetingComponent = greetingModule.embed;

    // create the component instance in the view container
    const componentRef: {instance: any} = viewContainerRef.createComponent(greetingComponent);

    // now you can interact with the instance
    // setting input values
    componentRef.instance.name = name;
    // subscribe to output events
    componentRef.instance.replied.subscribe((reply: string) => {
      // todo do something with the reply
    })
  }

}
