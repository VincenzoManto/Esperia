import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { coursesList, News, typesIcons, wmo_icons } from '../../models/course';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AppService } from '../../../../services/app.service';
import { AnimationController } from '@ionic/angular';
import { PushNotificationService } from '../../../../services/push-notification.service';
import { OpenData, OpenDataService } from '../../../../services/open-data.service';

@Component({
  selector: 'cr-content-view',
  templateUrl: './content-view.page.html',
  styleUrls: ['./content-view.page.scss'],
})
export class ContentViewPage implements OnInit {
  courses = coursesList;
  courseSections: News[] = [];
  news$: Observable<any[]> | undefined;
  icons = typesIcons as any;
  weatherIcons = wmo_icons as any;
  skip: Date | null = null;
  topics = [];
  openData: OpenData | undefined;

  constructor(
    private db: AngularFireDatabase,
    private appService: AppService,
    private openDataService: OpenDataService,
    private cdref: ChangeDetectorRef,
    private pushNotification: PushNotificationService,
    public animationCtrl: AnimationController
  ) {
    this.pushNotification.isSubscribed().subscribe((subscribed: any) => {
      this.topics = subscribed;
    });
    this.openDataService.getData().then((data) => {
      this.openData = data;
    });
    this.load();
  }

  cleanUrls(text: string) {
    const urlRegex = /(\bhttps?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;
    const markdownLinkRegex =
      /\[([^\]]+)\]\((https?:\/\/[^\s<]+[^<.,:;"')\]\s])\)/g;

    return text?.replace(urlRegex, (url) => {
      if (markdownLinkRegex.test(text)) {
        return url;
      }
      return `[${url}](${url})`;
    });
  }

  load(event?: any) {
    return new Promise<void>((resolve) => {
      if (event) {
        this.skip = null;
      }
      const likes = JSON.parse(localStorage.getItem('likes') || '[]');

      this.news$ = this.db
        .list('/news', (ref) =>
          ref.orderByChild('time').endBefore((this.skip || new Date()).toISOString())
        .limitToLast(7)
        )
        .valueChanges();
      const sub = this.news$.subscribe((data) => {
        const pData = data.filter(e => {
          if (this.topics.length > 0) {
            return this.topics.some(r=> e.topics?.includes(r));
          }
          return true;
        }).sort((a, b) => (a.time > b.time ? -1 : 1));
        if (this.skip) {
          this.courseSections.push(...pData)
        } else {
          this.courseSections = pData;
        }
        const stores = this.appService.stores;
        this.courseSections.forEach((e) => {
          if (e.store !== undefined) {
            e.storeNavigation = stores[e.store];
          }
          e.caption = this.cleanUrls(e.caption);
          e.liked = likes.includes(e.idx);
        });
        event?.target?.complete();
        this.cdref.detectChanges();
        sub.unsubscribe();
        resolve();
      });
    });
  }

  async onScroll(event: any) {
    console.log('qui');
      this.skip = new Date(this.courseSections[this.courseSections.length - 1]?.time  || null);
      await this.load();
      event.target.complete();
      console.log('End');

  }

  ngOnInit() {}

  trackCourses(i: number, course: News) {
    return `${course.title}_${i}`;
  }

  trackAvatarItems(_i: number, num: number) {
    return `avatar_${num}`;
  }

  onSectionChange(section: News) {
    localStorage.setItem(
      'likes',
      JSON.stringify(
        this.courseSections.filter((e) => e.liked).map((e) => e.idx)
      )
    );
    this.db
      .object(`/news/${section.idx}`)
      .update({ likes: section.likes })
      .then();
  }
}
