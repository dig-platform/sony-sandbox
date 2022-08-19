import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModularComponentsRoutingModule } from './modular-components-routing.module';
import { ModularComponentsComponent } from './modular-components.component';


@NgModule({
  declarations: [
    ModularComponentsComponent
  ],
  imports: [
    CommonModule,
    ModularComponentsRoutingModule
  ]
})
export class ModularComponentsModule { }
