import { Component, EventEmitter, Input, Output } from '@angular/core';
import { News } from '../../models/course';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'cr-news-card',
  template: `
    <div class="section-container" *ngIf="section">
      <ion-row *ngIf="section">
        <ion-col>
          <ion-text class="font-title2">{{ section.title }}</ion-text>
          <br />
          <div class="spacing"></div>
          <ion-text class="font-body">{{ section.caption }}</ion-text>
          <br />
          <small class="opacity-50">{{
            section.time | date : 'dd MMMM yyyy'
          }}</small>
        </ion-col>
        <ion-col size="auto" class="ion-align-items-center">
          <ion-img class="section-img" [src]="section.storeNavigation?.logo || section.image"></ion-img>
        </ion-col>
      </ion-row>
      <hr />
      <ion-row class="ion-justify-content-between">
        <ion-col size="auto" (click)="like(section)">
          <ion-img
            [src]="
              section.liked
                ? 'https://img.icons8.com/material-sharp/24/melting-hert.png'
                : 'https://img.icons8.com/material-two-tone/48/melting-hert.png'
            "
            class="icon"
          ></ion-img>
          <ion-text class="font-body">{{ section.likes || 0 }}</ion-text>
        </ion-col>
        <ion-col size="auto" *ngIf="section" (click)="openStore(section)">
          <ion-img
            [src]="'https://img.icons8.com/material-two-tone/24/map-marker.png'"
            class="icon"
          ></ion-img>
        </ion-col>
        <ion-col size="auto">
          <ion-img
            [src]="'https://img.icons8.com/material-two-tone/24/qr-code.png'"
            class="icon"
          ></ion-img>
        </ion-col>
      </ion-row>
    </div>
  `,
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent {
  @Input() section?: News;
  @Output() save = new EventEmitter<News>();
  // Add your component logic here

  constructor(private appService: AppService, private db: AngularFireDatabase) {}


  like(section: News) {
    if (section.liked) {
      section.likes--;
    } else {
      section.likes++;
    }
    section.liked = !section.liked || false;
    this.save.emit(section);
  }

  openStore(section: News) {
    if (!section.storeNavigation) {
      return;
    }
    this.appService.openStoreSubject.next(section.storeNavigation);
  }
}
