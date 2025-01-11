import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiveModule } from 'ng-rive';

import { OnBoardingPage } from './on-boarding.page';
import { StoresPage } from './stores/stores.page';
import { SenderPage } from './sender/sender.page';

const routes: Routes = [
  {
    path: '',
    component: OnBoardingPage,
  },
  {
    path: 'stores',
    component: StoresPage
  },
  {
    path: 'news/:store',
    component: SenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, RiveModule],
})
export class OnBoardingPageRoutingModule {}
