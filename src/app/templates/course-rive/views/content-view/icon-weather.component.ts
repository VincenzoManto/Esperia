import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-weather',
  template: `<img src="https://img.icons8.com/plumpy/24/{{icon}}.png" class="icon"/>`,
})
export class IconWeatherComponent {
  @Input() icon = 'clouds';
}
