import { inject, Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { mergeMapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  private readonly _messaging = inject(Messaging);
  private readonly _message = new BehaviorSubject<unknown | undefined>(undefined);

  title = 'fcm-angular-demo';
  message$ = this._message.asObservable();

  activate(): void {
    // Request permission to receive notifications
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted')
        console.log('Permission granted');
      else if (permission === 'denied')
        console.log('Permission denied');
    });

    // Get the current FCM token
    getToken(this._messaging)
      .then((token) => {
        console.log('Token', token);
        // You can send this token to your server and store it there
        // You can also use this token to subscribe to topics
      })
      .catch((error) => console.log('Token error', error));

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
}
