module.exports.command = function(selector, timeToWait = 12000) {
  this.waitForElementVisible(selector, timeToWait)
    .pause(500)
    .click(selector);

  return this;
};
