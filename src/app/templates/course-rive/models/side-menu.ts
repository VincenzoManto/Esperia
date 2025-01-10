export interface MenuItem {
  id: string;
  stateMachine: string;
  artboard: string;
  status: boolean;
  show: boolean;
  url?: string;
  isSelected?: boolean;
  icon?: string;
}

export const menuItemsList: MenuItem[] = [
  {
    id: 'Home',
    url: '/',
    stateMachine: 'HOME_interactivity',
    artboard: 'HOME',
    icon: 'HrPdlcIGvAy3',
    status: false,
    show: false,
  },
  {
    id: 'Search',
    url: '/search',
    stateMachine: 'SEARCH_Interactivity',
    artboard: 'SEARCH',
    icon: '4ghGQIns7siu',
    status: false,
    show: false,
  },
  {
    id: 'Favorites',
    url: '/topics',
    stateMachine: 'STAR_Interactivity',
    artboard: 'LIKE/STAR',
    icon: '3JTKO1zC9ECD',
    status: false,
    show: false,
  },
  {
    id: 'Starred',
    url: '/starred',
    stateMachine: 'CHAT_Interactivity',
    artboard: 'CHAT',
    icon: 'DWtX0ThMVpFF',
    status: false,
    show: false,
  },
];
export const menuItems2List: MenuItem[] = [
  {
    id: 'History',
    stateMachine: 'TIMER_Interactivity',
    artboard: 'TIMER',
    status: false,
    icon: 'AB62PWE8ugh9',
    show: false,
  },
  {
    id: 'Notification',
    stateMachine: 'BELL_Interactivity',
    artboard: 'BELL',
    icon: 'T7uZiWfKeCFC',
    status: false,
    show: false,
  },
];
export const menuItems3List: MenuItem[] = [
  {
    id: 'Dark Mode',
    stateMachine: 'SETTINGS_Interactivity',
    artboard: 'SETTINGS',
    status: false,
    show: false,
  },
];
