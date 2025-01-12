import { Component, Input } from '@angular/core';
import { OpenData } from '../../../../services/open-data.service';

@Component({
  selector: 'app-weather',
  template: `    <div
  *ngIf="openData && openData?.weather"
>
  <ion-img class="course-img" [src]="icons[openData.weather.current.weather_code]"></ion-img>

  <ion-text class="course-title font-title2">
    Near Verona
  </ion-text>
  <ion-text class="course-subtitle font-title">
    {{openData.weather.current.temperature_2m | number}}°C
  </ion-text>
  <div class="weather-widget">
    <ion-text class="weather-detail font-body">
      <app-icon-weather icon="cloud"/>  {{openData.weather.current.cloud_cover}}%
    </ion-text>
    <ion-text class="weather-detail font-body">
     <app-icon-weather icon="wind"/> {{openData.weather.current.wind_gusts_10m}} m/s {{openData.weather.current.wind_direction_10m}}°
    </ion-text>
    <ion-text class="weather-detail font-body">
      <app-icon-weather icon="snow"/> {{openData.weather.current.snowfall}} mm
    </ion-text>
    <ion-text class="weather-detail font-body">
      <app-icon-weather icon="visible"/> {{(+openData.weather.current.visibility / 1000 || 1000) | number }} km
    </ion-text>
    <ion-text class="weather-detail font-body">
      <app-icon-weather icon="do-not-expose-to-sunlight"/> {{openData.weather.current.shortwave_radiation}} W/m² /
      {{openData.weather.current.uv_index}}
    </ion-text>
    <ion-text class="weather-detail font-body">
      <app-icon-weather icon="sunset"/>
      {{openData.weather.daily?.daylight_duration?.[0] || 45000}} s
    </ion-text>
    <ion-text class="weather-detail font-body">
      <app-icon-weather icon="rain"/>  {{openData.weather.current.precipitation}} mm
      ({{openData.weather.current.precipitation_probability}} %)
    </ion-text>
    <ion-text class="weather-detail font-body">
      <app-icon-weather icon="cloud-lighting--v1"/>  {{openData.weather.current.showers}} mm
    </ion-text>
    <ion-text class="weather-detail font-body mt-2">
      Up to {{openData.weather.current.time | date: 'dd/MM/yyyy HH:mm'}}
    </ion-text>
  </div>
  <div class="bg-danger weather-alert font-body text-center" *ngIf="openData.weather.alert">
    {{openData.weather.alert}}
  </div>
</div>`,
})
export class WeatherWidget {
  @Input() icons: any = {};
  @Input() openData: OpenData | undefined;
}
