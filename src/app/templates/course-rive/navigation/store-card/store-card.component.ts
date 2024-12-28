import { Component, Input } from '@angular/core';
import { Store } from '../../models/course';

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
        <ion-col size="auto" *ngIf="section">
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
  styleUrls: ['./store-card.component.scss'],
})
export class StoreCardComponent {
  @Input() section?: Store;
  // Add your component logic here
}
