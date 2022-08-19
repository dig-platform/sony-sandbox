import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ModularComponentsComponent} from './modular-components.component';

const routes: Routes = [
  {
    path: '',
    component: ModularComponentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModularComponentsRoutingModule { }
