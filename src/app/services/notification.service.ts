import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {
  }

  startNotificationTimer() {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }

  showNotification() {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(reg => {

        reg?.showNotification('Notifica PWA', {
          body: 'Questa è una notifica push ogni 2 minuti.',
          icon: 'assets/icon.png'
        });
      });
    }
  }
}
