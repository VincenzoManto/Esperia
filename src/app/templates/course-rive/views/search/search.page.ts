import { Component, OnInit } from '@angular/core';
import { SearchbarCustomEvent } from '@ionic/angular';
import { News, Store } from '../../models/course';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import Fuse from 'fuse.js';
import { AppService } from '../../../../services/app.service';
declare var L: any;

@Component({
  selector: 'cr-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  news: News[] = [];
  stores: Store[] = [];
  originalNews: News[] = [];
  originalStores: Store[] = [];

  constructor(
    private db: AngularFireDatabase,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.db
      .list('/news', (ref) => ref.orderByChild('time').limitToFirst(100))
      .valueChanges()
      .subscribe((data: any[]) => {
        this.originalNews = data;
      });
    this.originalStores = this.appService.stores;
  }

  search(term: SearchbarCustomEvent) {
    if (!term?.detail?.value || term?.detail?.value.trim().length < 2) {
      return;
    }
    const query = term?.detail?.value.trim().toLowerCase();

    this.news = this.fuseSearch(this.originalNews, query);

    this.stores = this.fuseSearch(this.originalStores, query);
  }

  fuseSearch(news: (News | Store)[], query: string) {
    const fuseOptions = {
      keys: ['title', 'caption', 'name'],
    };

    const fuse = new Fuse(news, fuseOptions);
    const result = fuse.search(query).map((r: any) => r.item);
    return result;
  }
}
