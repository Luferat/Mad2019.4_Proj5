import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  // Define página inicial como 'home'
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/contacts/contacts.module').then( m => m.ContactsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },

  // 1) Página de visualização de artigo, obtendo o 'id'
  {
    path: 'view/:id',
    loadChildren: () => import('./pages/view/view.module').then( m => m.ViewPageModule)
  },

  // Se uma rota não existe, exibe 'e404'. Deve ser sempre a ÚLTIMA ROTA!!!!
  {
    path: '**',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
