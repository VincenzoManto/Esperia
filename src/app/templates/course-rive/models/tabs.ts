export interface BottomTabItem {
  id: string;
  stateMachine: string;
  artboard: string;
  status: boolean;
  icon?: string;
  show: boolean;
  url: string;
  set?: string;
}

export const tabItemsList: BottomTabItem[] = [
  {
    id: 'tab_home',
    stateMachine: 'HOME_Interactivity',
    artboard: 'HOME',
    icon: 'HrPdlcIGvAy3',
    status: false,
    url: '',
    show: false,
  },
  {
    id: 'tab_search',
    stateMachine: 'SEARCH_Interactivity',
    artboard: 'SEARCH',
    status: false,
    icon: '4ghGQIns7siu',
    url: 'search',
    show: false,
  },
  {
    id: 'tab_timer',
    stateMachine: 'State Machine 1',
    artboard: 'Artboard',
    set:'map',
    icon: 'abqlZeSRC8lw',
    status: false,
    url: 'map',
    show: false,
  },
  {
    id: 'tab_bell',
    stateMachine: 'STAR_Interactivity',
    artboard: 'LIKE/STAR',
    icon: '3JTKO1zC9ECD',
    status: false,
    url: 'topics',
    show: false,
  },
  {
    id: 'tab_user',
    stateMachine: 'USER_Interactivity',
    artboard: 'USER',
    icon: '3WOdQWsvoKMC',
    status: false,
    url: 'profile',
    show: false,
  },
];
