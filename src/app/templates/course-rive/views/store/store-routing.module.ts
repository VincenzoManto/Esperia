import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiveModule } from 'ng-rive';

import { StorePage } from './store.page';

const routes: Routes = [
  {
    path: '',
    component: StorePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, RiveModule],
})
export class StorePageRoutingModule {}
