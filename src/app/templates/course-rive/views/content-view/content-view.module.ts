import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentViewPageRoutingModule } from './content-view-routing.module';

import { ContentViewPage } from './content-view.page';
import { ShuffleArrayPipe } from '../../helper/shuffle-array/shuffle-array.pipe';
import { RiveModule } from 'ng-rive';
import { NewsCardComponent } from '../../navigation/news-card/news-card.component';
import { StoreCardComponent } from '../../navigation/store-card/store-card.component';
import { SearchPage } from '../search/search.page';
import { MapPage } from '../map/map.page';
import { TopicsPage } from '../topics/topics.page';
import { StarredPage } from '../starred/starred.page';

@NgModule({
  imports: [
    CommonModule,
    RiveModule,
    FormsModule,
    IonicModule,
    ContentViewPageRoutingModule,
  ],
  exports: [ContentViewPage, StoreCardComponent, NewsCardComponent],
  declarations: [
    ContentViewPage,
    SearchPage,
    TopicsPage,
    MapPage,
    ShuffleArrayPipe,
    StoreCardComponent,
    NewsCardComponent,
    StarredPage,
  ],
})
export class ContentViewPageModule {}
