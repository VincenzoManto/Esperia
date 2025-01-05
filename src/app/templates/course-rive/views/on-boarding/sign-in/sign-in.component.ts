import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RiveSMInput } from 'ng-rive';
import { GoogleAuthProvider, FacebookAuthProvider, getAuth, signInWithPopup } from '@firebase/auth';
import { initializeApp } from '@firebase/app';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'cr-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  @Output() onClose = new EventEmitter();

  email = '';
  password = '';
  isLoading = false;

  constructor(private auth: AngularFireAuth) {}

  ngOnInit() {}

  signIn(
    success: RiveSMInput,
    failure: RiveSMInput,
    reset: RiveSMInput,
    confetti: RiveSMInput
  ) {
    this.isLoading = true;
    const isValid = this.email.trim() !== '' && this.password.trim() !== '';

    setTimeout(() => {
      isValid ? success?.fire() : failure?.fire();
    }, 1000);

    setTimeout(() => {
      this.isLoading = false;
      reset?.fire();
      isValid && confetti?.fire();
    }, 3000);

    isValid &&
      setTimeout(() => {
        this.onSignInClose();
        this.email = '';
        this.password = '';
      }, 4000);
  }

  onSignInClose() {
    this.onClose.emit();
  }

  fb(
    success: RiveSMInput,
    failure: RiveSMInput,
    reset: RiveSMInput,
    confetti: RiveSMInput
  ) {
    this.isLoading = true;


    this.auth.onAuthStateChanged(function(user) {
      console.log(user);
      if (user) {

        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
    const app = initializeApp(environment.firebaseConfig)
    const auth = getAuth(app)
    signInWithPopup(auth, new FacebookAuthProvider() as any)
      .then((result) => {
        console.log(result);
        success?.fire();
        fetch('https://graph.facebook.com/v17.0/me/accounts', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + result.user.getIdToken(),
          }
        }).then(response => response.json()).then(data => {
          console.log(data);
        })
        setTimeout(() => {
          this.isLoading = false;
          reset?.fire();
          confetti?.fire();
          this.onSignInClose();
        }, 3000);
      })
      .catch((error) => {
        failure?.fire();
        setTimeout(() => {
          this.isLoading = false;
          reset?.fire();
        }, 3000);
      });
  }
}
