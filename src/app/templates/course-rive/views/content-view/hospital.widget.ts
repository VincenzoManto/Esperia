import { AfterViewInit, Component, Input } from '@angular/core';
import { OpenData } from '../../../../services/open-data.service';

@Component({
  selector: 'app-hospital',
  template: ` <div *ngIf="openData && openData?.hospitals">
    <ion-img class="course-img" [src]="icons.health"></ion-img>

    <ion-text class="course-title font-title2"> Hospitals </ion-text>
<!--     <ion-text class="course-subtitle font-title">
      {{ openData.hospitals.length }}
    </ion-text> -->
  <div style="max-height: 50vh; overflow-y: auto;">
    <div *ngFor="let hospital of openData.hospitals" class="hospital-status font-small">
      <ion-text class="hospital-name font-body font-bold">
        {{ hospital.nome }}
      </ion-text>
      <div class="status-indicators font-body row font-small m-0" >
        <div class="col-2 ">
          <div class="bg-danger text-center text-dark rounded-circle ar-1 status">
            {{ hospital.rosso || 0 }}
          </div>
        </div>
        <div class="col-2 ">
          <div class="bg-warning text-center text-dark rounded-circle ar-1 status">
            {{ hospital.giallo || 0 }}
          </div>
        </div>
        <div class="col-2 ">
          <div class="bg-success text-center text-dark rounded-circle ar-1 status">
            {{ hospital.verde || 0 }}
          </div>
        </div>
        <div class="col-2 ">
          <div class="bg-white text-center text-dark rounded-circle ar-1 status">
            {{ hospital.bianco || 0 }}
          </div>
        </div>
      </div>
    </div>

    </div>
    <div
      class="bg-danger weather-alert font-body text-center"
      *ngIf="openData.weather.alert"
    >
      {{ openData.weather.alert }}
    </div>
  </div>`,
})
export class HospitalWidget implements AfterViewInit {
  @Input() icons: any = {};
  @Input() openData: OpenData | undefined;

  ngAfterViewInit() {
    this.openData?.hospitals?.forEach((hospital) => {
      hospital.nome = hospital.nome.replace(/Ospedale /, '').replace(/Pronto Soccorso /, 'P.S.');
    });
  }
}
