describe('Template1', function() {

  beforeEach(function() {
    browser.get('/dist/dev/#/template1');
  });

  it('should have an input', function() {
    expect(element(by.css('app section template1 form input')).isPresent()).toEqual(true);
  });

  it('should have a list of computer scientists', function() {
    expect(element(by.css('app section template1 ul')).getText()).toEqual('Dijkstra\nKnuth\nTuring\nHopper');
  });

  it('should add a name to the list using the form', function() {
    element(by.css('app section template1 form input')).sendKeys('Tim Berners-Lee');
    element(by.css('app section template1 form button')).click();
    expect(element(by.css('app section template1 ul')).getText()).toEqual('Dijkstra\nKnuth\nTuring\nHopper\nTim Berners-Lee');
  });
});
