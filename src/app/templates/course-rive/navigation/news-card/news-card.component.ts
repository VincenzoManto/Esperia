import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { News } from '../../models/course';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AppService } from '../../../../services/app.service';
import { RiveSMInput } from 'ng-rive';

@Component({
  selector: 'cr-news-card',
  template: `
    <div class="section-container" *ngIf="section">
      <ion-img [src]="section.image" class="img" *ngIf="section.image"></ion-img>
      <ion-row *ngIf="section" (click)="opened = !opened">
        <ion-col size="10">
          <ion-text class="font-title3 open-status" [class.opened]="opened">{{
            section.title
          }}</ion-text>
          <div class="spacing"></div>
          <div>
            <ion-text class="font-body collapsable" [class.opened]="opened">{{
              section.caption
            }}</ion-text>
          </div>
          <small class="opacity-50">{{
            section.time | date : 'dd MMMM yyyy'
          }}</small>
          <ion-row>
            <ion-col size="auto"  *ngFor="let topic of section.topics">
              <ion-text class="font-small badge bg-secondary opacity-50 md hydrated rounded-pill m-1 fw-normal">
                # {{ topic }}
              </ion-text>
            </ion-col>
          </ion-row>
        </ion-col>
        <ion-col size="2" class="ion-align-items-center">
          <ion-img
            class="section-img"
            [src]="section.storeNavigation?.logo"
          ></ion-img>
        </ion-col>
      </ion-row>
      <ion-row class="ion-justify-content-between">
        <ion-col
          size="auto"
          class="position-relative"
          (click)="like(section, triggerConfetti)"
        >
          <ion-img
            [src]="
              section.liked
                ? 'https://img.icons8.com/material-sharp/24/melting-hert.png'
                : 'https://img.icons8.com/material-two-tone/48/melting-hert.png'
            "
            class="icon"
          ></ion-img>
          <canvas
            class="rive-confetti center"
            riv="confetti"
            width="200"
            height="200"
          >
            <riv-state-machine name="State Machine 1" play>
              <riv-input
                #triggerConfetti="rivInput"
                name="Trigger explosion"
              ></riv-input>
            </riv-state-machine>
          </canvas>
          <ion-text class="font-body">{{ section.likes || 0 }}</ion-text>
        </ion-col>
        <ion-col size="auto" *ngIf="section" (click)="openStore(section)">
          <ion-img
            [src]="'https://img.icons8.com/material-two-tone/24/map-marker.png'"
            class="icon"
          ></ion-img>
        </ion-col>
        <ion-col size="auto" *ngIf="section" (click)="openStore(section)">
          <ion-img
            [src]="'https://img.icons8.com/plumpy/24/bookmark-ribbon--v1.png'"
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
export class NewsCardComponent implements AfterViewInit {
  @Input() section?: News;
  @Output() save = new EventEmitter<News>();
  opened = false;
  // Add your component logic here

  constructor(
    private appService: AppService,
    private db: AngularFireDatabase
  ) {}

  ngAfterViewInit() {
    if (this.section && !this.section?.liked) {
      const likes = JSON.parse(localStorage.getItem('likes') || '[]');
      this.section.liked = likes.includes(this.section.idx);
    }
  }

  like(section: News, triggerConfetti: RiveSMInput) {
    if (section.liked) {
      section.likes--;
    } else {
      section.likes++;
      triggerConfetti.fire();
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
