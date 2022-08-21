import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { NgrxFormDemoComponent } from './ngrx-form-demo/ngrx-form-demo.component';
import { FormOneComponent } from './form-one/form-one.component';
import { FormTwoComponent } from './form-two/form-two.component';
import {NgrxFormModule} from '../ngrx-form.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    NgrxFormDemoComponent,
    FormOneComponent,
    FormTwoComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    NgrxFormModule,
    ReactiveFormsModule
  ]
})
export class DemoModule { }
