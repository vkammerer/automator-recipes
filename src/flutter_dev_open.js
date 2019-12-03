/*
  Main function, run by the Automator application.

  Opens and positions:
  - Android emulator
  - iTerm
*/

function run(input, parameters) {
  var app = Application.currentApplication();
  app.includeStandardAdditions = true;
  var events = Application("System Events");
  var dockProcess = events.processes.byName("Dock");

  launchEmulator(app, events, dockProcess).then(function() {
    launchITerm(app, events, dockProcess);
  });
  return null;
}

/*
  Utils
*/

function superPromise() {
  var container = {};
  container.promise = new Promise(function(res, rej) {
    container.resolve = res;
    container.reject = rej;
  });
  return container;
}

/*
  Android emulator
*/

function launchEmulator(app, events, dockProcess) {
  var promiseContainer = superPromise();
  var launchPromiseContainer = superPromise();
  var emulatorPath =
    "/Users/vincentkammerer/Library/Android/sdk/emulator/emulator";
  var emulatorDeviceName = "Pixel_3a_API_29";
  try {
    dockProcess.lists[0].uiElements
      .byName("emulator")
      .actions.byName("AXPress")
      .perform();
    delay(0.1);
    launchPromiseContainer.resolve();
  } catch (e) {
    app.doShellScript(
      emulatorPath + " -avd " + emulatorDeviceName + " > /dev/null 2>&1 &"
    );
    delay(2);
    launchPromiseContainer.resolve();
  }
  launchPromiseContainer.promise.then(function() {
    events.keystroke("f", {
      using: ["command down", "option down"]
    });
    delay(0.1);
    events.keyCode(25);
    promiseContainer.resolve();
  });
  return promiseContainer.promise;
}

/*
  iTerm
*/

function launchITerm(app, events, dockProcess) {
  var promiseContainer = superPromise();
  var launchPromiseContainer = superPromise();
  try {
    dockProcess.lists[0].uiElements
      .byName("iTerm")
      .actions.byName("AXPress")
      .perform();
    delay(0.1);
    launchPromiseContainer.resolve();
  } catch (e) {
    var iTerm = Application("iTerm");
    iTerm.activate();
    delay(0.2);
    launchPromiseContainer.resolve();
  }
  launchPromiseContainer.promise.then(function() {
    events.keystroke("f", {
      using: ["command down", "option down"]
    });
    delay(0.1);
    events.keyCode(28);
    promiseContainer.resolve();
  });
  return promiseContainer.promise;
}
