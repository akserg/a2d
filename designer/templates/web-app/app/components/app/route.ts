import {HomeCmp} from '../home/home';
import {AboutCmp} from '../about/about';
import {DreamCmp} from '../dream/dream';
//<%IMPORT%>

export var Route = [
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/about', component: AboutCmp, as: 'About' },
  { path: '/dream', component: DreamCmp, as: 'Dream' },
//<%ROUTE%>
];
