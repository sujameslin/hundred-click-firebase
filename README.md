## HundredClickFirebase

HundredClickFirebase is simple react-native ios app that uses latest [Firebase](https://firebase.google.com/) (version 3) for authenticating, storing data in database.

For android, i didn't have test yet.

## Description

HundredClickFirebase is simple application that stores user click data in Firebase database.

Its using [react-native-firestack](https://github.com/fullstackreact/react-native-firestack/) for authenticating(sing in, sign up), reading/writing data to Firebase.

## Configuration

First of all, you will need to create `development.js` in `config` directory.
Just copy `development.example.js` and change the value to match your Firebase configuration

## Setup
Open your terminal, enter following commands
Make sure you already installed [react-native cli](https://github.com/facebook/react-native).

```bash
$ git clone git@github.com:sujameslin/hundred-click-firebase.git
$ cd hundred-click-firebase && npm install
$ react-native run-ios
```

## Troubleshooting
If something does not work, please take careful look at [Firestack page](https://github.com/fullstackreact/react-native-firestack).

## Why using Firestack

Firebase is awesome and it's combination with the Google Cloud Platform makes it super awesome. Sadly, the latest version of Firebase requires the `window` object. That's where Firestack comes in! Firestack provides a really thin layer that sits on top of the native Firebase SDKs and attempts to use the JavaScript library as much as possible rather than reinventing the wheel.
