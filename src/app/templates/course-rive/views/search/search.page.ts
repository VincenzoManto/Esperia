import { Component, OnInit } from '@angular/core';
import { SearchbarCustomEvent } from '@ionic/angular';
import { News, Store } from '../../models/course';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import Fuse from 'fuse.js';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute } from '@angular/router';
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
  id: string | undefined | null;

  constructor(
    private db: AngularFireDatabase,
    private appService: AppService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }

  ngOnInit(): void {
    const api =
      this.id && +this.id
        ? this.db.list('/news', (ref) =>
            ref.orderByChild('idx').equalTo(+this.id!)
          )
        : this.db.list('/news', (ref) =>
            ref.orderByChild('time').limitToFirst(100)
          );
    api.valueChanges().subscribe((data: any[]) => {
      this.originalStores = this.appService.stores;
      this.originalNews = this.addNavs(data);
      this.news = this.addNavs(this.originalNews);
    });
  }

  addNavs(data: News[]) {
    const likes = JSON.parse(localStorage.getItem('likes') || '[]');

    data.forEach((e) => {
      if (e.store !== undefined) {
        e.storeNavigation = this.originalStores[e.store];
      }
      e.liked = likes.includes(e.idx);
    });
    return data;
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
