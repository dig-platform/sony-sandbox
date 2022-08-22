import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgrxFormComponent} from './ngrx-form.component';
import {NgrxFormDirective} from './ngrx-form.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {NgrxFormStoreModule} from '../ngrx-form-store';



@NgModule({
  declarations: [
    NgrxFormComponent,
    NgrxFormDirective
  ],
  exports: [
    NgrxFormComponent,
    NgrxFormDirective
  ],
  imports: [
    CommonModule,
    NgrxFormStoreModule,
    ReactiveFormsModule
  ]
})
export class NgrxFormModule { }
