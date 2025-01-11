import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { coursesList, News, typesIcons } from '../../models/course';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AppService } from '../../../../services/app.service';
import { AnimationController } from '@ionic/angular';

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

  constructor(private db: AngularFireDatabase, private appService: AppService, public animationCtrl: AnimationController) {
    this.load();
  }

  load() {
    const likes = JSON.parse(localStorage.getItem('likes') || '[]');

    this.news$ = this.db.list('/news', (ref) => ref.orderByChild('time').limitToLast(5)).valueChanges();
    const sub = this.news$.subscribe((data) => {
      this.courseSections = data.sort((a, b) => a.time > b.time ? -1 : 1);
      const stores = this.appService.stores;
      this.courseSections.forEach(e => {
        if (e.store !== undefined) {
          e.storeNavigation = stores[e.store];
        }
        e.liked = likes.includes(e.idx);
      });
      sub.unsubscribe();
    });
  }

  ngOnInit() {}

  trackCourses(i: number, course: News) {
    return `${course.title}_${i}`;
  }

  trackAvatarItems(_i: number, num: number) {
    return `avatar_${num}`;
  }


  onSectionChange(section: News) {
    localStorage.setItem('likes', JSON.stringify(this.courseSections.filter(e => e.liked).map(e => e.idx)));
    this.db.object(`/news/${section.idx}`).update({ likes: section.likes }).then();
  }
}
