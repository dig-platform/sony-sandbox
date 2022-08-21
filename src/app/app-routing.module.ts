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
  {
    path: 'modular-components',
    loadChildren: () => import('./pages/modular-components/modular-components.module').then( m => m.ModularComponentsModule)
  },
  {
    path: 'phoenix',
    loadChildren: () => import('./phoenix/phoenix.module').then(m => m.PhoenixModule)
  },
  {
    path: 'demos',
    children: [
      {
        path: 'ngrx-forms',
        loadChildren: () => import('./phoenix/lib/components/ngrx-form/demo/demo.module').then(m => m.DemoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
