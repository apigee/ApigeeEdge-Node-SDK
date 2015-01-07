# ApigeeEdge-Node-SDK
ApigeeEdge-Node-SDK

## Getting Started ?

* Learn NodeJS. If you know javascript it will be cakewalk for you :-)
* Learn MochaJS and Chai Testing Frameworks. See examples in test folder.
* Download Source Code and Understand Strucutre of code before you start contributing missing APIs.
* Configure your org credentials in test/configure.js to start running tests.
* Go to root folder and run > make test command to start automated tests.

## How to Contribute ?

* Pick an API Category from [Apigee Docs API Reference](http://apigee.com/docs/api/developers-0)
* Create a task for yourself in the Github issues. See sample issue #1 . So that we know who is working on what.
* Make sure **automated test cases** are written for the each API you are adding to SDK. Without Automated Test case **don't push** any new API to GITHUB.
* ** DO NOT COMMIT ** test/configure.js to github. Make sure you add that file to .gitignore so that you won't end up sharing your free org credentials to github repo which will be made public.
