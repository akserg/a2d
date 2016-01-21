import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {PagesList} from '../../services/pages_list';

@Component({
  selector: 'pages',
  templateUrl: './components/pages/pages.html',
  viewProviders: [HTTP_PROVIDERS],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class PagesCmp {
  newName: string;
  removeName: string;
    http: Http;
  constructor(public list: PagesList, http: Http) {
      this.http = http;
  }
 /*
 * @param newname  any text as input.
 * @returns return false to prevent default form submit behavior to refresh the page.
 */
  addPage(): boolean {
      let creds = JSON.stringify({});
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.put('http://localhost:3000/api/v1/genjam/'+this.newName.toLowerCase(), creds, {
        headers: headers
        })
        .subscribe(
          data => {
          },
          err => this.logError(err.json().message),
          () => alert('Page added successfully')
        );
  };

    removePage(): boolean {
              let creds = JSON.stringify({});
              let headers = new Headers();
              headers.append('Content-Type', 'application/json');

              this.http.put('http://localhost:3000/api/v1/remjam/'+this.removeName.toLowerCase(), creds, {
                headers: headers
                })
                .subscribe(
                  data => {
                  },
                  err => this.logError(err.json().message),
                  () => alert('Page removed successfully')
                );
              };

      }

    return false;
  }
