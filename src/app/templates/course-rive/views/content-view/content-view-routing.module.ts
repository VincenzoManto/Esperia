import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentViewPage } from './content-view.page';
import { SearchPage } from '../search/search.page';
import { MapPage } from '../map/map.page';
import { TopicsPage } from '../topics/topics.page';
import { StarredPage } from '../starred/starred.page';

const routes: Routes = [
  {
    path: '',
    component: ContentViewPage
  },
  {
    path: 'news/:id',
    component: SearchPage
  },
  {
    path: 'search',
    component: SearchPage
  },
  {
    path: 'map',
    component: MapPage
  },
  {
    path: 'topics',
    component: TopicsPage
  },
  {
    path: 'starred',
    component: StarredPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentViewPageRoutingModule {}
