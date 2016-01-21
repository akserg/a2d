import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it
} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {JamesCmp} from './james';
import {NameList} from '../../services/name_list';

export function main() {
  describe('James component', () => {
    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
          .then(rootTC => {
            rootTC.detectChanges();

            let jamesInstance = rootTC.debugElement.componentViewChildren[0].componentInstance;
            let jamesDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;
            let nameListLen = function () {
              return jamesInstance.list.names.length;
            };

            expect(jamesInstance.list).toEqual(jasmine.any(NameList));
            expect(nameListLen()).toEqual(4);
            expect(DOM.querySelectorAll(jamesDOMEl, 'li').length).toEqual(nameListLen());

            jamesInstance.newName = 'Minko';
            jamesInstance.addName();
            rootTC.detectChanges();

            expect(nameListLen()).toEqual(5);
            expect(DOM.querySelectorAll(jamesDOMEl, 'li').length).toEqual(nameListLen());

            expect(DOM.querySelectorAll(jamesDOMEl, 'li')[4].textContent).toEqual('Minko');
          });
      }));
  });
}

@Component({
  providers: [NameList],
  selector: 'test-cmp',
  template: '<div><james></james></div>',
  directives: [JamesCmp]
})
class TestComponent {}
