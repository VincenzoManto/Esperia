import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[fallback-src]',
})

export class FallbackDirective{
  public defaultImg: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdMT8BhV98O2VP79pyeq2qs2IMR3YQUsglK8SV6zM7BoUu3Up_cAAuxnbrPJqIDOTnH90K_6i_D-sc0xujp6Kpw2ig-gFVKZ-VFVTimQ';
  @Input() src!: string;

  @HostBinding('src')
  get originalSrc() {
    return this.src;
  }

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('error') onError() {
    // this.src = this.defaultImg;
    this.elementRef.nativeElement.style.display = 'none';
  }
}
