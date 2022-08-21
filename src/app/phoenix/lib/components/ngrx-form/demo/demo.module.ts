import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { NgrxFormDemoComponent } from './ngrx-form-demo/ngrx-form-demo.component';
import { FormOneComponent } from './form-one/form-one.component';
import { FormTwoComponent } from './form-two/form-two.component';
import {NgrxFormModule} from '../ngrx-form.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MapObjectPipe} from '../../../pipes/map-object.pipe';
import { FormStateInspectorComponent } from './form-state-inspector/form-state-inspector.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    NgrxFormDemoComponent,
    FormOneComponent,
    FormTwoComponent,
    FormStateInspectorComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    MapObjectPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTabsModule,
    NgrxFormModule,
    ReactiveFormsModule
  ]
})
export class DemoModule { }
