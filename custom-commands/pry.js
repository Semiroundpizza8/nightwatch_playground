/*================================
- PRY -
This tool was made to allow developers to pause the nightwatch
test suite in order to manually navigate the the browser/client.

USAGE:
  await client.pry("We're currently within the {x} step")
    - This will trigger a command line prompt where you'll be able to
      interact with the current client object given by nightwatch-api.
    - I also recommend setting your defaultTimeout in globals super high.

COMMANDS:
  exit: Terminates pry session and continutes navigating the web from
        where you left off.

  hist: Logs out any commands you've used to navigate the client object
        within this session of pry for copy and paste-age.

  screenshot: Takes a screenshot of your current place in the browser.

  browser or client: Allows you to interact with the nightwatch session.
================================*/

const readline = require('readline');
const chalk = require('chalk');
const path = require('path');

const formatHistory = cHistory => {
  let parenCount = 0;
  for (let i = 0; i < cHistory.length; i++) {
    const currLetter = cHistory[i];
    if (currLetter === '(') parenCount++;
    if (currLetter === ')') parenCount--;
    if (parenCount === 0 && currLetter == '.') {
      const middleString = '\n';
      cHistory = cHistory.slice(0, i) + middleString + cHistory.slice(i);
      i += middleString.length + 1;
    }
  }
  return cHistory;
};

module.exports.command = async function(identifier, rl, cHistory = 'client') {
  // Initialize Variables
  if (!rl) {
    // If first time through, greet user and prompt for input
    console.log(chalk.magenta('-----Start Debug------'));
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  if (identifier) console.log(identifier);

  const browser = this;
  const client = this;

  // Trigger Prompt
  return rl.question(chalk.blue('=> '), res => {
    switch (res.toLowerCase().trim()) {
      case 'next':
      case 'exit':
      case 'continue':
        // Pause call to continue nightwatch from where debug was used
        client.pause(1);
        return this;

      case 'hist':
        // Give user the current list of steps they've taken so far
        console.log(formatHistory(cHistory));
        break;

      case 'screenshot':
        // Takes a screenshot of browsers current state
        const fileLocation = `${path.resolve(
          './././screenshots'
        )}/pry-${Date.now()}.png`;
        client.saveScreenshot(fileLocation);
        console.log(`Screenshot saved at: "${fileLocation}"`);
        break;

      default:
        try {
          eval(res);
          // If the browser is being navigated, save that info for convinience
          if (
            (res.includes('client') || res.includes('browser')) &&
            res.includes('.')
          ) {
            cHistory += res.substring(res.indexOf('.'), res.length);
          }
        } catch (e) {
          console.error(chalk.red(e));
        }
    }
    // recursively call debug to continue blocking nightwatch
    return client.pry(undefined, rl, cHistory);
  });
};
