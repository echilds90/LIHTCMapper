var MapPage = function() {

  var LOCALHOST = 'http://localhost:9000/#';

  this.mapCanvas = {};
  this.form = element(by.tagName('form'));
  this.address = this.form.element(by.model('map.address'));
  this.submitButton = this.form.element(by.tagName('button'));
  this.geocodeError = this.form.element(by.id('error-message'));

  function ElementPromise (selector) {
    var deferred = protractor.promise.defer();
    var elem = element(by.css(selector));
    browser.wait(function () {
      if (elem.isPresent()) {
        deferred.fulfill(elem);
        return true;
      }
    });
    return deferred.promise;
  }

  function CountPromise (parent) {
    var deferred = protractor.promise.defer();
    var numDivs = 0;
    browser.wait(function() {
      parent.all(by.tagName('div')).count().then(function (count) {
        numDivs = count;
      });
      if (numDivs > 0) {
        deferred.fulfill();
        return true;
      }
    });
    return deferred.promise;
  }

  function waitForCanvas () {
    var canvasPromise = new ElementPromise('#map-canvas');
    canvasPromise.then(function (mapCanvas) {
      this.mapCanvas = mapCanvas;
    })
  }

  this.waitForMap = function (callback) {
    waitForCanvas();
    var mapPromise = new ElementPromise('.gm-style');
    mapPromise.then(function (map) {
      var countPromise = new CountPromise(map);
      countPromise.then(callback);
    });
  }

  this.get = function () {
    browser.get(LOCALHOST);
  }
};

module.exports = MapPage;
