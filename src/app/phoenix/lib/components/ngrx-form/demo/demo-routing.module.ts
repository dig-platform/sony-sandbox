import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgrxFormDemoComponent} from './ngrx-form-demo/ngrx-form-demo.component';
import {NgrxFormStepperDemoComponent} from './ngrx-form-stepper-demo/ngrx-form-stepper-demo.component';

const routes: Routes = [
  {
    path: '',
    component: NgrxFormDemoComponent
  },
  {
    path: 'stepper',
    component: NgrxFormStepperDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
