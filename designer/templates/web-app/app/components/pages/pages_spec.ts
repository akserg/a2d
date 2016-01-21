import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it
} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {PagesCmp} from './pages';
import {NameList} from '../../services/name_list';

export function main() {
  describe('Pages component', () => {
    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
          .then(rootTC => {
            rootTC.detectChanges();

            let pagesInstance = rootTC.debugElement.componentViewChildren[0].componentInstance;
            let pagesDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;
            let nameListLen = function () {
              return pagesInstance.list.names.length;
            };

            expect(pagesInstance.list).toEqual(jasmine.any(NameList));
            expect(nameListLen()).toEqual(4);
            expect(DOM.querySelectorAll(pagesDOMEl, 'li').length).toEqual(nameListLen());

            pagesInstance.newName = 'Minko';
            pagesInstance.addName();
            rootTC.detectChanges();

            expect(nameListLen()).toEqual(5);
            expect(DOM.querySelectorAll(pagesDOMEl, 'li').length).toEqual(nameListLen());

            expect(DOM.querySelectorAll(pagesDOMEl, 'li')[4].textContent).toEqual('Minko');
          });
      }));
  });
}

@Component({
  providers: [NameList],
  selector: 'test-cmp',
  template: '<div><pages></pages></div>',
  directives: [PagesCmp]
})
class TestComponent {}
