import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartialRoutingModule } from './partial-routing.module';
import { DemoComponent } from './demo/demo.component';
import { PartialComponent } from './lib/partial/partial.component';

@NgModule({
  declarations: [
    DemoComponent,
    PartialComponent
  ],
  imports: [
    CommonModule,
    PartialRoutingModule
  ]
})
export class PartialModule { }
