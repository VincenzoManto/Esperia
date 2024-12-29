import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentViewPage } from './content-view.page';
import { SearchPage } from '../search/search.page';
import { MapPage } from '../map/map.page';

const routes: Routes = [
  {
    path: '',
    component: ContentViewPage
  },
  {
    path: 'search',
    component: SearchPage
  },
  {
    path: 'map',
    component: MapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentViewPageRoutingModule {}
