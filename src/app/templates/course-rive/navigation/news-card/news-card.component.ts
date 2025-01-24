import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { News } from '../../models/course';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AppService } from '../../../../services/app.service';
import { RiveSMInput } from 'ng-rive';
import { environment } from '../../../../../environments/environment';
import * as showdown from 'showdown';
import * as QRCode from 'qrcode';
import { HttpClient } from '@angular/common/http';
import { AnimationController } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';

@Component({
  selector: 'cr-news-card',
  template: `
    <div class="section-container shadow" *ngIf="section">
      <img
        fallback-src
        crossorigin="anonymous"
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

      <ion-row
        *ngIf="section"
        (click)="opened = !opened"
        class="align-items-center"
      >
        <ion-col size="10">
          <ion-text
            class="font-title3 open-status font-bold"
            [class.opened]="opened"
            >{{ section.title }}</ion-text
          >
          <div class="spacing"></div>
        </ion-col>
        <ion-col
          size="2"
          class="ion-align-items-center"
          (click)="openStore(section)"
        >
          <img class="section-img" [src]="section.storeNavigation?.logo" />
        </ion-col>
      </ion-row>
      <div>
        <ion-text
          *ngIf="section.html"
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
        <ion-col
          size="auto"
          *ngIf="section && !noRedirect"
          (click)="openStore(section)"
        >
          <ion-img
            [src]="'https://img.icons8.com/plumpy/48/map-marker.png'"
            class="icon"
          ></ion-img>
        </ion-col>
        <ion-col size="auto" (click)="openQr()">
          <ion-img
            [src]="'https://img.icons8.com/plumpy/48/paint-bucket-with-qr.png'"
            class="icon"
          ></ion-img>
        </ion-col>
      </ion-row>
    </div>

    <ion-modal
      #modal
      backdropDismiss="true"
      [enterAnimation]="enterAnimation"
      [leaveAnimation]="leaveAnimation"
    >
      <ng-template>
        <div class="ion-page pointer-events-none" (click)="closeQr()">
          <canvas
            id="canvas"
            class="w-50 h-auto rounded-3 mt-1 m-auto"
          ></canvas>
        </div>
      </ng-template>
    </ion-modal>
  `,
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements AfterViewInit {
  @Input() section?: News;
  @Output() save = new EventEmitter<News>();
  @Input() noRedirect = false;
  opened = false;
  @ViewChild('modal') qrCodeModal?: IonModal;

  // Add your component logic here

  constructor(
    private appService: AppService,
    private http: HttpClient,
    private animationCtrl: AnimationController,
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
          } catch (e) {}
        }
      }
      this.section.html = converter.makeHtml(this.section?.caption);
    }

/*     if (this.section?.image && this.section?.image?.includes('instagram.com')) {
      this.section.image =
        environment.api + 'image.php?p=' + this.section.image;
    } */
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
    section.likes = Math.max(0, section.likes);
    section.liked = !section.liked || false;
    this.save.emit(section);
  }

  openStore(section: News) {
    if (!section.storeNavigation || this.noRedirect) {
      return;
    }
    section.storeNavigation.idx = section.store;
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

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0.5', transform: 'translateY(-100vh)' },
        { offset: 1, opacity: '1', transform: 'translateY(0vh)' },
      ]);

    const canvas = document.getElementById('canvas');
    QRCode.toCanvas(canvas, `${this.section?.idx}`, (error: any) => {
      if (error) console.error(error);
      console.log('success!');
    });

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-in-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  openQr() {
    this.qrCodeModal?.present();
  }

  closeQr() {
    this.qrCodeModal?.dismiss();
  }
}
