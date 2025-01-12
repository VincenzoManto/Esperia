import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenDataService {
  private apiUrl = `${environment.api}ps.php`;

  constructor(private http: HttpClient) {}

  getData(): Promise<OpenData> {
    return new Promise((r) => {
      this.http.get<OpenData>(this.apiUrl).subscribe((data) => {
        if (data.weather) {
          data.weather.alert = '';
          if (+data.weather.current.showers > 25) {
            data.weather.alert += 'Nubifragio\n';

          } else if (+data.weather.current.rain > 20) {
            data.weather.alert += 'Pioggia Persistente\n';
          } else if (+data.weather.current.rain > 5) {
            data.weather.alert += 'Pioggia Intensa\n';
          }

          if (+data.weather.current.snowfall > 5) {
            data.weather.alert += 'Neve\n';
          }

          if (+data.weather.current.wind_speed_10m > 30) {
            data.weather.alert += 'Vento Forte\n';
          } else if (+data.weather.current.wind_speed_10m > 5) {
            data.weather.alert += 'Ventoso\n';
          }

          if (+data.weather.current.temperature_2m < 2) {
            data.weather.alert += 'Gelo\n';
          } else if (+data.weather.current.temperature_2m > 38) {
            data.weather.alert += 'Caldo Torrido\n';
          }

          if (+data.weather.current.relative_humidity_2m > 90) {
            data.weather.alert += 'Umidità Alta\n';
          }

          if (+data.weather.current.uv_index > 7) {
            data.weather.alert += 'Raggi UV Forti\n';
          }
        }
        r(data);
      });
    });
  }
}

export interface OpenData {
  weather: {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    alert: string;
    elevation: number;
    daily: {
      daylight_duration: string[];
    };
    current: {
      time: string;
      temperature_2m: string;
      relative_humidity_2m: string;
      cloud_cover: string;
      wind_speed_10m: string;
      apparent_temperature: string;
      precipitation_probability: string;
      precipitation: string;
      rain: string;
      showers: string;
      snowfall: string;
      snow_depth: string;
      weather_code: string;
      visibility: string;
      wind_direction_10m: string;
      wind_gusts_10m: string;
      shortwave_radiation: string;
      uv_index: string;
    };
  };
  ospedali: Array<{
    nome: string;
    rosso: number;
    giallo: number;
    verde: number;
    bianco: number;
  }>;
}
