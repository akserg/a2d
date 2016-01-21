import {Component, ViewEncapsulation} from 'angular2/core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';
import {NavList} from '../../services/nav_list';

// import {HTTP_PROVIDERS} from 'angular2/http';

import {Route} from './route';
import {Service} from './service';

@Component({
  selector: 'app',
  viewProviders: Service,
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig(Route)
export class AppCmp {
  constructor(public list: NavList) {
  }
}
