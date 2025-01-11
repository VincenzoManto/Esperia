import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FallbackDirective } from './fallback.directive';

@NgModule({
  declarations: [
    FallbackDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FallbackDirective
  ]
})
export class DirectivesModule { }
