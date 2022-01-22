import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home-routing.module').then(m => m.HomeRoutingModule)
  },
  {
    path: 'cocktails',
    loadChildren: () => import('./cocktails/cocktails-routing.module').then(m => m.CocktailsRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
