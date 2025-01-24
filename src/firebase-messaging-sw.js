// Import the Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize Firebase app
firebase.initializeApp({
  apiKey: 'AIzaSyArCq3t_shta3FHvxhKyDzhit19h3GAN48',
  authDomain: 'esperia-cf38d.firebaseapp.com',
  databaseURL: 'https://esperia-cf38d.firebaseio.com',
  projectId: 'esperia-cf38d',
  storageBucket: 'esperia-cf38d.firebasestorage.app',
  messagingSenderId: '338729314582',
  appId: '1:338729314582:web:a8b38d6f194540058a0837',
  measurementId: 'G-R9CPNKPQRE',
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // Optional icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
