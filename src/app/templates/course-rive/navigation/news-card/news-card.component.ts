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
import { environment } from '../../../../../environments/environment';
import * as showdown from 'showdown';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'cr-news-card',
  template: `
    <div class="section-container" *ngIf="section">
      <img
        fallback-src
        [src]="section.image"
        class="img"
        *ngIf="section.image"
      />
      <ion-card *ngIf="section.preview" class="w-100 m-0 rounded mb-2">
        <ion-card-content>
          <div class="row align-items-center">
            <div class="col-3">
              <img
                fallback-src
                [src]="section.preview?.hybridGraph.image"
                class="rounded"
              />
            </div>
            <div class="col">
              <ion-text class="font-bold d-block">{{
                section.preview?.hybridGraph.title
              }}</ion-text>
              <ion-text class="font-small preview">{{
                section.preview?.hybridGraph.description
              }}</ion-text>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-row *ngIf="section" (click)="opened = !opened" class="align-items-center">
        <ion-col size="10">
          <ion-text class="font-title3 open-status font-bold" [class.opened]="opened">{{
            section.title
          }}</ion-text>
          <div class="spacing"></div>
        </ion-col>
        <ion-col size="2" class="ion-align-items-center">
          <img
            class="section-img"
            [src]="section.storeNavigation?.logo"
          />
        </ion-col>
      </ion-row>
      <div>
        <ion-text *ngIf="section.html"
          class="font-body collapsable"
          [class.opened]="opened"
          [innerHTML]="section.html"
        ></ion-text>
      </div>
      <small class="opacity-50">{{
        section.time | date : 'dd MMMM yyyy'
      }}</small>
      <ion-row>
        <ion-col size="auto" *ngFor="let topic of section.topics">
          <ion-text
            class="font-small badge bg-secondary opacity-50 md hydrated rounded-pill m-1 fw-normal"
          >
            # {{ topic }}
          </ion-text>
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
                ? 'https://img.icons8.com/plumpy/48/filled-star.png'
                : 'https://img.icons8.com/plumpy/48/star.png'
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
          <ion-text class="font-small">{{ section.likes || 0 }}</ion-text>
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
    private http: HttpClient,
    private db: AngularFireDatabase
  ) {}

  async ngAfterViewInit() {
    if (this.section) {
      let converter = new showdown.Converter();
      if (!this.section.image) {
        const urlMatch = this.section.caption.match(/\[.*\]\((.*)\)/);
        if (urlMatch) {
          try {
            this.section.preview = await this.getMetdata(urlMatch[1]);

          } catch (e) {

          }
        }
      }
      this.section.html = converter.makeHtml(this.section?.caption);
    }

    if (this.section?.image && !this.section?.image?.startsWith('https://')) {
      this.section.image =
        environment.api + 'image.php?p=' + this.section.image;
    }
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

  getMetdata(url: string) {
    return this.http
      .get(
        'https://opengraph.io/api/1.1/site/' +
          encodeURIComponent(url) +
          '?app_id=f6ef4e6b-4162-40d7-8404-b80736d4bd55'
      )
      .toPromise();
  }
}
