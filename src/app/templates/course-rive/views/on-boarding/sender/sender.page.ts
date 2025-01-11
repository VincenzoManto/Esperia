import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { News, Store } from '../../../models/course';
import { AnimationController, IonModal, ToastController } from '@ionic/angular';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../../../services/app.service';
declare var L: any;

@Component({
  selector: 'cr-sender',
  templateUrl: './sender.page.html',
  styleUrls: ['./sender.page.scss'],
})
export class SenderPage implements AfterViewInit {
  news: News[] = [];
  selectedn: Store | null = null;
  @ViewChild(IonModal) mapModal?: IonModal;
  store: Store | undefined;
  storeIdx = -1;

  constructor(
    private db: AngularFireDatabase,
    private containerRef: ElementRef,
    private toast: ToastController,
    private http: HttpClient,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private animationCtrl: AnimationController
  ) {}

  ngAfterViewInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const n = params.get('store');
      if (n) {
        this.appService.storesSubject.subscribe((ns) => {
          this.storeIdx = ns.findIndex((s) => s.id === n);
          if (this.storeIdx === -1) {
            return;
          }
          this.store = ns[this.storeIdx];
          this.loadsender();
        });
      }
    });
  }

  loadsender(): void {
    this.db
      .list<News>('/news', (ref) => ref.orderByChild('store').equalTo(this.storeIdx))
      .valueChanges()
      .subscribe((news) => {
        this.news = news;
      });
  }

  createNews(n: News): void {
    const senderRef = this.db.list('news');
    delete n.new;
    senderRef.push(n).then((a) => {
      n.idx = a.key!;
      this.handleCall(senderRef.update(a.key!, n), 'News created', 'Error creating news');
    });
  }

  handleCall(p: any, m: string, e: string) {
    p.then(() => {
      this.toast
        .create({
          message: m,
          color: 'dark',
          duration: 2000,
        })
        .then((toast) => toast.present());
    }).catch((error: any) => {
      this.toast
        .create({
          message: e,
          color: 'danger',
          duration: 2000,
        })
        .then((toast) => toast.present());
    });
  }

  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  addNews() {
    this.news.push({
      title: 'New Event',
      time: (new Date()).toISOString() as any,
      topics: ['entertainment'],
      idx: this.news.length,
      caption: 'New Event',
      store: this.storeIdx,
      new: true,
      image: 'assets/course_rive/topic_9.svg',
    } as News);
  }

  deleteNews(news: News) {
    this.handleCall(this.db.list('news').remove(news.idx.toString()),
      'News deleted',
      'Error deleting news');
  }

  getLink(n: News) {
    window.open('/#/news/' + n.idx, '_blank');
  }
}
