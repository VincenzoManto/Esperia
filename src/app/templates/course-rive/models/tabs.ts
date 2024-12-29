export interface BottomTabItem {
  id: string;
  stateMachine: string;
  artboard: string;
  status: boolean;
  show: boolean;
  url: string;
}

export const tabItemsList: BottomTabItem[] = [
  {
    id: 'tab_home',
    stateMachine: 'HOME_Interactivity',
    artboard: 'HOME',
    status: false,
    url: '',
    show: false,
  },
  {
    id: 'tab_search',
    stateMachine: 'SEARCH_Interactivity',
    artboard: 'SEARCH',
    status: false,
    url: 'search',
    show: false,
  },
  {
    id: 'tab_timer',
    stateMachine: 'MAP_Interactivity',
    artboard: 'MARKER',
    status: false,
    url: 'map',
    show: false,
  },
  {
    id: 'tab_bell',
    stateMachine: 'BELL_Interactivity',
    artboard: 'BELL',
    status: false,
    url: 'notifications',
    show: false,
  },
  {
    id: 'tab_user',
    stateMachine: 'USER_Interactivity',
    artboard: 'USER',
    status: false,
    url: 'profile',
    show: false,
  },
];
