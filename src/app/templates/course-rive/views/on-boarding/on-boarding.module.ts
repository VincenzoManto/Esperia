import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnBoardingPageRoutingModule } from './on-boarding-routing.module';

import { OnBoardingPage } from './on-boarding.page';
import { SignInComponent } from './sign-in/sign-in.component';
import { StoresPage } from './stores/stores.page';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SenderPage } from './sender/sender.page';
import { DirectivesModule } from '../../../../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskDirective, NgxMaskPipe,
    IonicModule,
    DirectivesModule,
    OnBoardingPageRoutingModule,
  ],
  exports: [OnBoardingPage],
  declarations: [OnBoardingPage, SignInComponent, StoresPage, SenderPage],
})
export class OnBoardingPageModule {}
