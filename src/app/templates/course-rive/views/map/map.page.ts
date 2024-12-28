import { AfterViewInit, Component, OnInit } from '@angular/core';
import { News, Store } from '../../models/course';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import Fuse from 'fuse.js';
import { AppService } from '../../../../services/app.service';
import { SearchbarCustomEvent } from '@ionic/angular';
declare var L: any;

@Component({
  selector: 'cr-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterViewInit {
  stores: Store[] = [];
  originalStores: Store[] = [];
  map = null;

  constructor(
    private db: AngularFireDatabase,
    private appService: AppService
  ) {}

  ngOnInit(): void {

    this.originalStores = this.appService.stores;
  }

  ngAfterViewInit() {

    setTimeout(() => {
      if (!this.map) {
        this.map = L.map('map-entire').setView(
          [56.9497, 24.1042],
          5
        );
      }
      const tiles = L.tileLayer(
'https://api.mapbox.com/styles/v1/vincenzomanto/ck6t6fp9o0egt1is0ptkeq1pq/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmluY2Vuem9tYW50byIsImEiOiJjazZ0M25xNHkwM2s4M2xteWhrbjc3NmVyIn0.B7-ezeH4aCuy3W4WSWpeuQ',
        {
          maxZoom: 19,
        }
      ).addTo(this.map);

      this.originalStores.forEach((s: Store) => {
        const response = {
          ...s,
          latitude: 56.9497,
          longitude: 24.1042,
        };
      const marker = L.marker([response.latitude, response.longitude])
        .addTo(this.map)
        .bindPopup(
          `<b>${response.name}
            <img src="${response.logo.toLowerCase()}"
            crossorigin="anonymous"
                height="12"
                alt="${response.name}"> ${response.city}</b><br>${response.address}`
        )
        .openPopup();

      });
    }, 10)
  }


  search(term: SearchbarCustomEvent) {
    if (!term?.detail?.value || term?.detail?.value.trim().length < 2) {
      return;
    }
    const query = term?.detail?.value.trim().toLowerCase();

    this.stores = this.fuseSearch(this.originalStores, query);
  }


  fuseSearch(news: (News | Store)[], query: string) {
    const fuseOptions = {
      keys: ['title', 'caption', 'name'],
    };

    const fuse = new Fuse(news, fuseOptions);
    const result = fuse.search(query).map((r: any) => r.item);
    return result;
  }
}
