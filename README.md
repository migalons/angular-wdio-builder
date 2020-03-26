# angular-wdio-builder

Angular builder for running e2e test using webdriver.io runner.

Enables include wdio laucher into angular workspace (angular.json). Replaces protractor as e2e test framework.

## Peer dependencies

- _@wdio/cli_

wdio client is not installed. You must install this package by yourself, among other related packages (@wdio/sinc, services, plugins, etc.)

## Requirements

- @angular/cli >= @8.0.0

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
            "wdioConfig": "e2e/wdio.conf.js",
            "devServerTarget": "my-awesome-project:serve"
          },
          "configurations": {
            "production": {
              "wdioConfig": "e2e/wdio-prod.conf.js",
              "devServerTarget": "my-awesome-project:serve:production"
            },
            "dev": {
              "wdioOptions": {
                  "port": 4567  // whatever options accepted by wdio cli
              }
              "devServerTarget": "my-awesome-project:serve:production"
            }

          }
        }
      }
    }
  ...
}
```

This builders, accepts three parameters:

- wdioConfig: URL for wdio cli configuration (defaults to "./e2e/wdio.conf.js).
- wdioOptons: Custom options for overriding provided configuration (wdioConfig). See [wdio cli options](https://webdriver.io/docs/clioptions.html) for more information.
- devServerTarget: project target and configuration to be scheduled before running e2e test (i.e. serve app).

## Example

You can find an example of a project with angular application with e2e test implemented using this builder for include wdio test into angular workspace here:

https://github.com/migalons/angular-wdio-builder-demo
