import {NavList} from './nav_list';

export function main() {
  describe('NavList Service', () => {
    let navList;

    beforeEach(() => {
      navList = new NavList;
    });

    it('should return the list of navs', () => {
      let navs = navList.get();
      expect(navs).toEqual(jasmine.any(Array));
    });
  });
}
