import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BottomTabItem, tabItemsList } from '../../models/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'cr-bottom-tab-bar',
  templateUrl: './bottom-tab-bar.component.html',
  styleUrls: ['./bottom-tab-bar.component.scss'],
})
export class BottomTabBarComponent implements OnInit {
  tabItems = tabItemsList;
  @Input() selectedTab: BottomTabItem = this.tabItems[0];
  @Output() onTabChange = new EventEmitter<BottomTabItem>();

  constructor(private router: Router) {}

  ngOnInit() {
    // Temporary solution to fix the rive asset loading issue causing "Binding Error",
    // which fails for most if rendered together, so This will load them all with a delay,
    for (let i = 0; i < this.tabItems.length; i++) {
      setTimeout(() => (this.tabItems[i].show = true), 1000);
    }
    this.router.events.subscribe((event) => {
      const url = (event as any).url?.split('/')[1];
      const tab = this.tabItems.find((t) => t.url === url);
      if (tab) {
        this.selectedTab.status = false;
        tab.status = true;
        this.selectedTab = tab;
      }
    });
  }

  onIconPress(tab: BottomTabItem) {
    if (this.selectedTab !== tab) {
      tab.status = true;
      setTimeout(() => {
        tab.status = false;
      }, 1000);
      this.selectedTab = tab;
      this.router.navigate([tab.url]);
      /* this.onTabChange.emit(tab); */
    }
  }

  trackTabItems(_i: number, tab: BottomTabItem) {
    return tab.id;
  }
}
