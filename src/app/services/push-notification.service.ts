import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private http: HttpClient) {}

  private readonly _messaging = inject(Messaging);
  private readonly _message = new BehaviorSubject<unknown | undefined>(undefined);

  title = 'fcm-angular-demo';
  message$ = this._message.asObservable();
  private readonly _token = new BehaviorSubject<string | undefined>(undefined);
  token$ = this._token.asObservable();
  pToken: string | undefined;

  activate(): void {
    if (!('Notification' in window)) {
      console.log('Notifications not available');
      return;
    }
    // Request permission to receive notifications
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted')
        console.log('Permission granted');
      else if (permission === 'denied')
        console.log('Permission denied');


    navigator.serviceWorker.register('/Esperia/firebase-messaging-sw.js')
    .then((registration) => {
      // Get the current FCM token
      getToken(this._messaging, { serviceWorkerRegistration: registration })
        .then((token) => {
          console.log('Token', token);
          this.pToken = token;
          this._token.next(token);
          // You can send this token to your server and store it there
          // You can also use this token to subscribe to topics
        })
        .catch((error) => console.log('Token error', error));

    });

    // Listen for messages from FCM
    onMessage(this._messaging, {
      next: (payload) => {
        console.log('Message', payload);
        console.log('Message received in foreground:', payload);

        // Extract the notification details from payload
        const notificationTitle = payload.notification?.title || 'New Notification';
        const notificationOptions: NotificationOptions = {
          body: payload.notification?.body || 'You have a new message!',
          icon: '/esperia/assets/icon-white.png'
        };

        // Check if the browser supports notifications and permission is granted
        if (Notification.permission === 'granted') {
          new Notification(notificationTitle, notificationOptions);
        } else {
          console.log('Notifications are not allowed.');
        }
        // You can display the message or do something else with it
      },
      error: (error) => console.log('Message error', error),
      complete: () => console.log('Done listening to messages')
    });
  }


  subscribeToTopic(topic: string, token?: string) {

    return this.http.get(`${environment.api}subscribe.php?token=${token || this.pToken}&topic=${topic}`);
  }

  isSubscribed(token?: string, topic?: string) {
    return this.http.get(`${environment.api}isSubscribed.php?token=${token || this.pToken}&topic=${topic}`);
  }


}
