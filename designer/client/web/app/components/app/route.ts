import {HomeCmp} from '../home/home';
import {AboutCmp} from '../about/about';
import {DreamCmp} from '../dream/dream';
import {PagesCmp} from '../pages/pages';







import {JamesCmp} from "../james/james";


//<%IMPORT%>

export var Route = [
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/about', component: AboutCmp, as: 'About' },
  { path: '/dream', component: DreamCmp, as: 'Dream' },
  { path: '/pages', component: PagesCmp, as: 'Pages' },








{ path: '/james', component: JamesCmp, as: 'James' },


//<%ROUTE%>
];
