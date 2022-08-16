import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicComponentsRoutingModule } from './dynamic-components-routing.module';
import {DynamicComponentsComponent} from './dynamic-components.component';
import { DynamicComponentDirective } from './dynamic-component.directive';


@NgModule({
  declarations: [
    DynamicComponentsComponent,
    DynamicComponentDirective
  ],
  imports: [
    CommonModule,
    DynamicComponentsRoutingModule
  ]
})
export class DynamicComponentsModule { }
