import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it
} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {Template1Cmp} from './template1';
import {NameList} from '../../services/name_list';

export function main() {
  describe('Template1 component', () => {
    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
          .then(rootTC => {
            rootTC.detectChanges();

            let template1Instance = rootTC.debugElement.componentViewChildren[0].componentInstance;
            let template1DOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;
            let nameListLen = function () {
              return template1Instance.list.names.length;
            };

            expect(template1Instance.list).toEqual(jasmine.any(NameList));
            expect(nameListLen()).toEqual(4);
            expect(DOM.querySelectorAll(template1DOMEl, 'li').length).toEqual(nameListLen());

            template1Instance.newName = 'Minko';
            template1Instance.addName();
            rootTC.detectChanges();

            expect(nameListLen()).toEqual(5);
            expect(DOM.querySelectorAll(template1DOMEl, 'li').length).toEqual(nameListLen());

            expect(DOM.querySelectorAll(template1DOMEl, 'li')[4].textContent).toEqual('Minko');
          });
      }));
  });
}

@Component({
  providers: [NameList],
  selector: 'test-cmp',
  template: '<div><template1></template1></div>',
  directives: [Template1Cmp]
})
class TestComponent {}
