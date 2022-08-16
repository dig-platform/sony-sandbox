import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomeModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dynamic-components',
    loadChildren: () => import('./pages/dynamic-components/dynamic-components.module').then( m => m.DynamicComponentsModule)
  },
  {
    path: 'partial',
    loadChildren: () => import('./pages/partial/partial.module').then( m => m.PartialModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
