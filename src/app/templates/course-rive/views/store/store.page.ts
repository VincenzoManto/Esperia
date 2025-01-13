import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AnimationController, IonModal, Platform } from '@ionic/angular';
import { Store } from '../../models/course';
import { environment } from '../../../../../environments/environment';
declare var L: any;

@Component({
  selector: 'cr-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  @ViewChild(IonModal) signInModal?: IonModal;
  @ViewChild('container', { read: ElementRef }) containerRef?: ElementRef;
  @ViewChild('closeBtn', { read: ElementRef }) closeBtnRef?: ElementRef;

  map = null;
  selectedStore?: Store | any;

  @Input() set store(s: Store) {
    this.selectedStore = s;
    if (!s) {
      return;
    }
    const response = {
      ...s,
      latitude: s.lat || environment.baseLatLng[0],
      longitude: s.lng || environment.baseLatLng[1],
    };
    setTimeout(() => {
      if (!this.map) {
        this.map = L.map('map').setView(
          [response.latitude, response.longitude],
          5
        );
      }
      const tiles = L.tileLayer(
        'https://api.mapbox.com/styles/v1/vincenzomanto/ck6t6fp9o0egt1is0ptkeq1pq/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmluY2Vuem9tYW50byIsImEiOiJjazZ0M25xNHkwM2s4M2xteWhrbjc3NmVyIn0.B7-ezeH4aCuy3W4WSWpeuQ',
        {
          maxZoom: 19,
        }
      ).addTo(this.map);

      const marker = L.marker([response.latitude, response.longitude])
        .addTo(this.map)
        .bindPopup(
          `<b>${response.name}
            <img src="${response.logo.toLowerCase()}"
            crossorigin="anonymous"
                height="12"
                alt="${response.name}"> ${response.city}</b><br>${
            response.address
          }`
        )
        .openPopup();
    }, 10);
  }
  @Output() closeStoreEvent = new EventEmitter();

  buttonToggle = true;
  showRiveAsset = false;

  constructor(
    public platform: Platform,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    // Temporary solution to fix the rive asset loading issue causing "Binding Error",
    // which fails for most if rendered together, so This will load them all with a delay,
    setTimeout(() => (this.showRiveAsset = true), 1000);
  }

  startCoursePressed() {
    this.buttonToggle = !this.buttonToggle;
    setTimeout(() => {
      this.signInModal?.present();
    }, 800);
  }

  onCloseStore() {
    this.closeStoreEvent.emit();
  }

  onSignInClose() {
    this.signInModal?.dismiss();
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

    const StoreContent = this.animationCtrl
      .create()
      .addElement(containerEl!)
      .keyframes([
        { offset: 0, transform: 'translateY(0px)' },
        { offset: 1, transform: 'translateY(-50px)' },
      ]);
    const closeBtnAnim = this.animationCtrl
      .create()
      .addElement(this.closeBtnRef?.nativeElement!)
      .fromTo('transform', 'translateY(0)', 'translateY(-150px)');

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-in-out')
      .duration(500)
      .addAnimation([
        backdropAnimation,
        wrapperAnimation,
        StoreContent,
        closeBtnAnim,
      ]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
}
