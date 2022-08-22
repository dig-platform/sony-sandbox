import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgrxFormDemoComponent} from './ngrx-form-demo/ngrx-form-demo.component';

const routes: Routes = [
  {
    path: '',
    component: NgrxFormDemoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
