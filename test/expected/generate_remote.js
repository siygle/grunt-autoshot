var page = require('webpage').create();
page.viewportSize = { width: 1920, height: 1080 };
page.zoomFactor = 1;
page.open('http://www.google.com', function() {
  page.evaluate(function () {
    document.body.bgColor = 'white';
  });
  page.render('test/expected/remote.png');
  phantom.exit();
})
