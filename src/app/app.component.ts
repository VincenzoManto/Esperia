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


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  // https://github.com/ionic-team/ionic-framework/issues/21630#issuecomment-683007162
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet?: IonRouterOutlet;

  constructor(private platform: Platform, private db: AngularFireDatabase, private appService: AppService,
    private swUpdate: SwUpdate,
    private swPush: SwPush,
    private pushService: PushNotificationService,
    private notificationService: NotificationService,
  ) {
    this.db.list('/stores').valueChanges().subscribe((data: any[]) => {
      this.appService.stores = data;
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
  }

  ngOnInit() {
    this.pushService.activate();
  }


}
