import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DynamicComponentsComponent} from './dynamic-components.component';

const routes: Routes = [
  {
    path: '',
    component: DynamicComponentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicComponentsRoutingModule { }
