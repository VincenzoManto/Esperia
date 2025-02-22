import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { SafeAreaController } from '@aashu-dubey/capacitor-statusbar-safe-area';
import { NotificationService } from './services/notification.service';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { environment } from '../environments/environment';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AppService } from './services/app.service';
import { Store } from './templates/course-rive/models/course';
import { getToken } from '@angular/fire/app-check';
import { Messaging, onMessage } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { PushNotificationService } from './services/push-notification.service';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { setPersistence, browserLocalPersistence, inMemoryPersistence, getAuth } from 'firebase/auth';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  // https://github.com/ionic-team/ionic-framework/issues/21630#issuecomment-683007162
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet?: IonRouterOutlet;
  installPrompt: any;

  constructor(private platform: Platform, private db: AngularFireDatabase, private appService: AppService,
    private swUpdate: SwUpdate,
    private swPush: SwPush,
    private afAuth: AngularFireAuth,
    private pushService: PushNotificationService,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {

    if (!window.matchMedia('(display-mode: standalone)').matches) {
      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        this.installPrompt = event;
      });
    }
    this.translate.setDefaultLang('it');

    this.translate.use(localStorage.getItem('dialect') === 'true' ? 've' : 'it');


    this.db.list('/stores').valueChanges().subscribe((data: any[]) => {
      this.appService.stores = data;
      this.appService.storesSubject.next(data);
    });
    // Initialize Firebase
    const app = initializeApp(environment.firebaseConfig);
    SafeAreaController.injectCSSVariables();
    StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {});

    // By default Ionic doesn't close app on back click, so we handle that here
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });

    this.afAuth.app.then(async (e) => {

      await setPersistence(getAuth(e), browserLocalPersistence);
    });
  }

  async install() {
    if (!this.installPrompt) {
      return;
    }
    const result = await this.installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    this.installPrompt = null;
  }

  ngOnInit() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('PWA is installed');
    } else {
      console.log('PWA is not installed');
    }
    this.pushService.activate();
  }


}

