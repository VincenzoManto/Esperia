import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { AnimationController, NavController, Platform } from '@ionic/angular';
import {
  MenuItem,
  menuItems2List,
  menuItems3List,
  menuItemsList,
} from '../../models/side-menu';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cr-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @ViewChildren('menuItems', { read: ElementRef })
  menuItems1Ref?: QueryList<ElementRef>;
  @ViewChildren('menuItems2', { read: ElementRef })
  menuItems2Ref?: QueryList<ElementRef>;

  menuItems = menuItemsList;
  menuItems2 = menuItems2List;
  menuItems3 = menuItems3List;

  selectedMenu = this.menuItems[0];
  isDarkMode = false;
  isDialect = false;
  darkLink: HTMLMetaElement;

  constructor(
    private animationCtrl: AnimationController,
    private navigation: NavController,
    public platform: Platform,
    public router: Router,
    private translate: TranslateService
  ) {
    this.darkLink = document.head.querySelector('meta[name="color-scheme"]')!;
    this.setTheme(localStorage.getItem('light') !== 'true');
    this.isDialect = localStorage.getItem('dialect') === 'true';
  }

  ngOnInit() {
    // Temporary solution to fix the rive asset loading issue causing "Binding Error",
    // which fails for most if rendered together, so This will load them all with a delay,
    for (let i = 0; i < this.menuItems.length; i++) {
      setTimeout(() => (this.menuItems[i].show = true), 1000);
    }
    for (let i = 0; i < this.menuItems2.length; i++) {
      setTimeout(() => (this.menuItems2[i].show = true), 1000);
    }
    for (let i = 0; i < this.menuItems3.length; i++) {
      setTimeout(() => (this.menuItems3[i].show = true), 1000);
    }
  }

  onMenuItemPress(index: number, menu: MenuItem) {
    let lastSelection = this.menuItems.indexOf(this.selectedMenu);
    if (lastSelection < 0) {
      lastSelection =
        this.menuItems.length + this.menuItems2.indexOf(this.selectedMenu);
    }

    menu.status = true;
    setTimeout(() => {
      menu.status = false;
    }, 1000);
    this.selectedMenu.isSelected = false;

    this.selectedMenu = menu;
    this.selectedMenu.isSelected = true;

    const menu1RefArray = this.menuItems1Ref?.toArray();
    const menu2RefArray = this.menuItems2Ref?.toArray();
    menu2RefArray && menu1RefArray?.push(...menu2RefArray);

    this.router.navigateByUrl(menu.url!);

    for (let i = 0; i < menu1RefArray?.length!; i++) {
      const itemRef = menu1RefArray?.[i];
      const element = itemRef?.nativeElement;

      if (i === lastSelection || i === index) {
        this.animationCtrl
          .create()
          .addElement(element.querySelector('.menu-btn-bg'))
          .duration(250)
          .easing('cubic-bezier(0.2, 0.8, 0.2, 1.0)')
          .fromTo(
            'width',
            i === index ? '0px' : '272px',
            i === index ? '272px' : '0px'
          )
          .play();
      }
    }
  }

  onDarkModeToggle() {
    this.menuItems3[0].status = this.isDarkMode;
    this.setTheme(this.isDarkMode);
  }

  onDialectToggle() {
    this.menuItems3[1].status = this.isDialect;
    localStorage.setItem('dialect', this.isDialect ? 'true' : 'false');
    if (this.isDialect) {
      this.translate.use('ve');
    }
    location.reload();
  }

  setTheme(isDark: boolean) {
    this.isDarkMode = isDark;
    if (this.isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
    this.darkLink.content = this.isDarkMode ? 'dark' : 'light';
    localStorage.setItem('light', !this.isDarkMode ? 'true' : 'false');
  }

  goBack() {
    this.navigation.back({ animated: false });
  }

  trackMenuItems(_i: number, tab: MenuItem) {
    return tab.id;
  }
}
