describe('James', function() {

  beforeEach(function() {
    browser.get('/dist/dev/#/james');
  });

  it('should have an input', function() {
    expect(element(by.css('app section james form input')).isPresent()).toEqual(true);
  });

  it('should have a list of computer scientists', function() {
    expect(element(by.css('app section james ul')).getText()).toEqual('Dijkstra\nKnuth\nTuring\nHopper');
  });

  it('should add a name to the list using the form', function() {
    element(by.css('app section james form input')).sendKeys('Tim Berners-Lee');
    element(by.css('app section james form button')).click();
    expect(element(by.css('app section james ul')).getText()).toEqual('Dijkstra\nKnuth\nTuring\nHopper\nTim Berners-Lee');
  });
});
