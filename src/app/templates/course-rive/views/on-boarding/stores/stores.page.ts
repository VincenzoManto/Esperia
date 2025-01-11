import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Store } from '../../../models/course';
import { AnimationController, IonModal, ToastController } from '@ionic/angular';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ThenableReference } from 'firebase/database';
declare var L: any;

@Component({
  selector: 'cr-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {
  stores: Store[] = [];
  selectedStore: Store | null = null;
  @ViewChild(IonModal) mapModal?: IonModal;

  constructor(
    private db: AngularFireDatabase,
    private containerRef: ElementRef,
    private toast: ToastController,
    private http: HttpClient,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.db
      .list<Store>('stores')
      .valueChanges()
      .subscribe((stores) => {
        this.stores = stores;
      });
  }

  createStore(store: Store): void {
    const storesRef = this.db.list('stores');
    this.handleCall(
      storesRef.push(store),
      'Store created',
      'Error creating store'
    );
  }

  handleCall(p: any, m: string, e: string) {
    p.then(() => {
      this.toast
        .create({
          message: m,
          color: 'dark',
          duration: 2000,
        })
        .then((toast) => toast.present());
    }).catch((error: any) => {
      this.toast
        .create({
          message: e,
          color: 'danger',
          duration: 2000,
        })
        .then((toast) => toast.present());
    });
  }

  updateStore(store: Store, i: number): void {
    const storeRef = this.db.object(`stores/${i}`);
    delete store.new;
    this.handleCall(
      storeRef.update(store),
      'Store updated',
      'Error updating store'
    );
  }

  async getCoordinates(store: Store) {
    if (!store.address || !store.cap || !store.city) {
      return;
    }
    const response = (await this.http.get(
      `https://nominatim.openstreetmap.org/search?q=${store.address} ${store.cap} ${store.city}&format=json`
    )) as any;
    store.lat = response[0].lat;
    store.lng = response[0].lon;
  }

  getAddress(store: Store, lat: number, lng: number) {
    this.http
      .get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      )
      .subscribe((response: any) => {
        store.address = response['display_name'];
        store.cap = response['address']['postcode'];
        store.city = response['address']['town'] || response['address']['county'];
        store.country = response['address']['country'];
        store.province = response['address']['county'];
        console.log(response);
      });
  }

  deleteStore(storeId: number): void {
    const storeRef = this.db.object(`stores/${storeId}`);
    this.toast
      .create({
        message: 'Are you sure you want to delete this store?',
        color: 'warning',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Delete',
            handler: () => {
              this.handleCall(
                storeRef.remove(),
                'Store deleted',
                'Error deleting store'
              );
            },
          },
        ],
      })
      .then((toast) => toast.present());
  }

  selectStore(store: Store): void {
    this.selectedStore = store;
  }

  clearSelection(): void {
    this.selectedStore = null;
  }

  uploadImage(event: Event, store: Store): void {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (!file) {
      return;
    }

    /*  const storageRef = storage.ref();
    const imageRef = storageRef.child(`stores/${file.name}`);
    imageRef.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        if (!this.selectedStore) {
          return;
        }
        this.selectedStore.logo = url;
        this.updateStore(this.selectedStore);
      });
    }); */
  }

  async openMap(store: Store) {
    this.mapModal?.onDidDismiss().then(() => {
      this.getAddress(store, store.lat, store.lng);
    });
    this.mapModal?.present();
    if (!store.lat || !store.lng) {
      await this.getCoordinates(store);
    }
    if (!store.lat || !store.lng) {
      store.lat = environment.baseLatLng[0];
      store.lng = environment.baseLatLng[1];
    }
    setTimeout(() => {
      const map = L.map('map').setView(
        [
          store.lat || environment.baseLatLng[0],
          store.lng || environment.baseLatLng[1],
        ],
        12
      );
      const tiles = L.tileLayer(
        'https://api.mapbox.com/styles/v1/vincenzomanto/ck6t6fp9o0egt1is0ptkeq1pq/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmluY2Vuem9tYW50byIsImEiOiJjazZ0M25xNHkwM2s4M2xteWhrbjc3NmVyIn0.B7-ezeH4aCuy3W4WSWpeuQ',
        {
          maxZoom: 19,
        }
      ).addTo(map);

      const marker = L.marker([
        store.lat || environment.baseLatLng[0],
        store.lng || environment.baseLatLng[1],
      ]);
      marker.addTo(map);

      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        store.lat = lat;
        store.lng = lng;
      });
    }, 1000);
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;
    const containerEl = this.containerRef?.nativeElement;

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

    const onBoardingContent = this.animationCtrl
      .create()
      .addElement(containerEl!)
      .keyframes([
        { offset: 0, transform: 'translateY(0px)' },
        { offset: 1, transform: 'translateY(-50px)' },
      ]);
    /*     const closeBtnAnim = this.animationCtrl
      .create()
      .addElement(this.closeBtnRef?.nativeElement!)
      .fromTo('transform', 'translateY(0)', 'translateY(-150px)'); */

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-in-out')
      .duration(500)
      .addAnimation([
        backdropAnimation,
        wrapperAnimation,
        onBoardingContent,
        /*         closeBtnAnim, */
      ]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  generateLink(store: Store) {
    const botUsername = 'EsperiaCDBot';
    const message = encodeURIComponent(`/link ${store.name}`);
    navigator.clipboard.writeText(
      `https://t.me/${botUsername}?start=${message}`
    );
    this.toast
      .create({
        message: 'Link copied to clipboard',
        color: 'dark',
        duration: 2000,
      })
      .then((toast) => toast.present());
  }

  addStore() {
    this.stores.push({
      id: this.guid(),
      name: 'New Store',
      address: '',
      city: '',
      new: true,
    } as Store);
  }

  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
