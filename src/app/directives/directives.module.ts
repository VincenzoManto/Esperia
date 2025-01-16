import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FallbackDirective } from './fallback.directive';
import { TranslateXPipe } from './translate.pipe';

@NgModule({
  declarations: [
    FallbackDirective,
    TranslateXPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FallbackDirective,
    TranslateXPipe
  ]
})
export class DirectivesModule { }
