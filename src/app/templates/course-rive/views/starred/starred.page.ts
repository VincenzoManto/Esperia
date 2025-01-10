import { Component, OnInit } from '@angular/core';
import { SearchbarCustomEvent } from '@ionic/angular';
import { News, Store, typesIcons } from '../../models/course';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import Fuse from 'fuse.js';
import { AppService } from '../../../../services/app.service';
import { PushNotificationService } from '../../../../services/push-notification.service';
import { getToken } from '@angular/fire/messaging';
import { RiveSMInput } from 'ng-rive';
import { HttpClient } from '@angular/common/http';
import { addNavs } from '../search/search.page';
declare var L: any;

@Component({
  selector: 'cr-starred',
  templateUrl: './starred.page.html',
  styleUrls: ['./starred.page.scss'],
})
export class StarredPage {

  news: News[] = [];

  constructor(private db: AngularFireDatabase, private appService: AppService, private http: HttpClient) {
    const likes = JSON.parse(localStorage.getItem('likes') || '[]');
    const news$ = this.db.list('/news', (ref) => ref.orderByChild('time')).valueChanges();
    const s = news$.subscribe((data: any) => {
      this.news = data.filter((e: News) => likes.includes(e.idx));
      this.news = addNavs(this.appService.stores, this.news);
      s.unsubscribe();
    });
  }

}
