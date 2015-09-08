# Promise testing samples

This is a demo project showing how you can integrate several libraries with Mocha to make testing promises easy.

To get started, run `npm install` to install the necessary packages. You can run the test suite using `npm test`.

## Files in project

- `src/arnold.js`: some functionality to make the stub example more realistic.
- `test/mocha.opts`: this file is automatically loaded by Mocha, we can use it to provide command-line parameters. We use this to automatically load the test initialization module
- `test/test-init.js`: this loads both chai-as-promised and sinon-as-promised for us, so we don't need to do it manually in our test files
- `test/promiseTest.js`: the test file
