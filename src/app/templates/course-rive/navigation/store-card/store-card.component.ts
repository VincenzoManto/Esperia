import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Store } from '../../models/course';
import { AppService } from '../../../../services/app.service';
import { AnimationController } from '@ionic/angular';
import * as QRCode from 'qrcode';
import { IonModal } from '@ionic/angular/common';

@Component({
  selector: 'cr-store-card',
  template: `
    <div class="section-container" *ngIf="section">
      <ion-row *ngIf="section">
        <ion-col>
          <ion-text class="font-title2">{{ section.name }}</ion-text>
          <br />
          <div class="spacing"></div>
          <ion-text class="font-body">{{ section.name }}</ion-text>
        </ion-col>
        <ion-col size="auto" class="ion-align-items-center">
          <ion-img class="section-img" [src]="section.logo"></ion-img>
        </ion-col>
      </ion-row>
      <hr />
      <ion-row class="ion-justify-content-between">
        <ion-col size="auto">
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
        <ion-col size="auto" (click)="openQr()">
          <ion-img
            [src]="'https://img.icons8.com/material-two-tone/24/qr-code.png'"
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
        <div class="ion-page pointer-events-none"   (click)="closeQr()">
          <div class="w-50 h-auto rounded-3 m-auto mb-1 bg-white p-3">
            <ion-img class="section-img" [src]="section?.logo"></ion-img>
          </div>
          <canvas
            id="canvas"
            class="w-50 h-auto rounded-3 mt-1 m-auto"
          ></canvas>
        </div>
      </ng-template>
    </ion-modal>
  `,
  styleUrls: ['./store-card.component.scss'],
})
export class StoreCardComponent {
  @Input() section?: Store;
  @ViewChild('modal') qrCodeModal?: IonModal;

  constructor(
    private appService: AppService,
    private animationCtrl: AnimationController
  ) {}

  openStore(section: Store) {
    this.appService.openStoreSubject.next(section);
  }

  openQr() {
    this.qrCodeModal?.present();
  }

  closeQr() {
    this.qrCodeModal?.dismiss();
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
    QRCode.toCanvas(
      canvas,
      `${this.section?.name}-${this.section?.id}`,
      (error: any) => {
        if (error) console.error(error);
        console.log('success!');
      }
    );

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
}
