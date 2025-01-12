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

  getData(): Observable<OpenData> {
    return this.http.get<OpenData>(this.apiUrl);
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
    elevation: number;
    current_units: {
      time: string;
      interval: string;
      temperature_2m: string;
      wind_speed_10m: string;
    };
    current: {
      time: string;
      interval: number;
      temperature_2m: number;
      wind_speed_10m: number;
    };
    hourly_units: {
      time: string;
      temperature_2m: string;
      relative_humidity_2m: string;
      wind_speed_10m: string;
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
