export class NavList {
  names = [
      'Home',
      'About',
      'Dream',
//<%ROUTES%>
    ];

  get(): string[] {
    return this.names;
  }
}
