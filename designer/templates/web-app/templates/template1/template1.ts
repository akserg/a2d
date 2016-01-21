import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

import {NameList} from '../../services/name_list';

@Component({
  selector: 'template1',
  templateUrl: './components/template1/template1.html',
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class Template1Cmp {
  newName: string;
  constructor(public list: NameList) {}
 /*
 * @param newname  any text as input.
 * @returns return false to prevent default form submit behavior to refresh the page.
 */
  addName(): boolean {
    this.list.add(this.newName);
    this.newName = '';
    return false;
  }
}
