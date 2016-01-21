import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it
} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {DreamCmp} from './dream';
import {NameList} from '../../services/name_list';

export function main() {
  describe('Dream component', () => {
    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
          .then(rootTC => {
            rootTC.detectChanges();

            let dreamInstance = rootTC.debugElement.componentViewChildren[0].componentInstance;
            let dreamDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;
            let nameListLen = function () {
              return dreamInstance.list.names.length;
            };

            expect(dreamInstance.list).toEqual(jasmine.any(NameList));
            expect(nameListLen()).toEqual(4);
            expect(DOM.querySelectorAll(dreamDOMEl, 'li').length).toEqual(nameListLen());

            dreamInstance.newName = 'Minko';
            dreamInstance.addName();
            rootTC.detectChanges();

            expect(nameListLen()).toEqual(5);
            expect(DOM.querySelectorAll(dreamDOMEl, 'li').length).toEqual(nameListLen());

            expect(DOM.querySelectorAll(dreamDOMEl, 'li')[4].textContent).toEqual('Minko');
          });
      }));
  });
}

@Component({
  providers: [NameList],
  selector: 'test-cmp',
  template: '<div><dream></dream></div>',
  directives: [DreamCmp]
})
class TestComponent {}
