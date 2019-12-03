/*
  Main function, run by the Automator application.

  Kills the following applications:
  - Android emulator
  - iTerm
  - Android Studio
*/

function run(input, parameters) {
  var app = Application.currentApplication();
  app.includeStandardAdditions = true;

  app.doShellScript(
    'killall iTerm2 qemu-system-x86_64 "Android Studio" > /dev/null 2>&1 &'
  );
  return null;
}
