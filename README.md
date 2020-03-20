# angular-wdio-builder

Angular builder for running e2e test using webdriver.io runner.

Enables include wdio laucher into angular workspace (angular.json). Replaces protractor as e2e test framework.

## Peer dependencies

- _@wdio/cli_

wdio client is not installed. You must install this package by yourself, among other related packages (@wdio/sinc, services, plugins, etc.)


## Usage

### Install 

npm install @migalons/angular-wdio-builder --save-dev

### Angular workspace

For enabling your e2e test using angular builders, you just need to use this builder for running your e2e test:

```
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "my-awesome-project": {
      ...
      "architect": {
        ...
        "e2e": {
          "builder": "@migalons/angular-wdio-builder:test",
          "options": {
            "wdioConfig": "e2e/protractor.conf.js",
            "devServerTarget": "angular-wdio-builder-test:serve"
          },
          "configurations": {
            "production": {
              "devServerTarget": "angular-wdio-builder-test:serve:production"
            }
          }
        }
      }
    }
  ...
}
```

## Example

You can find an example of a project with angular application with e2e test implemented using this builder for include wdio test into angular workspace here:

https://github.com/migalons/angular-wdio-builder-demo
