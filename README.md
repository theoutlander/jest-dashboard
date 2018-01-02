# jest-dashboard

A command line dashboard for [jest](https://github.com/facebook/jest)

[![Join the chat at https://gitter.im/theoutlander/jest-dashboard](https://badges.gitter.im/theoutlander/jest-dashboard.svg)](https://gitter.im/theoutlander/jest-dashboard?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![CircleCI](https://img.shields.io/circleci/project/github/theoutlander/jest-dashboard.svg)](https://circleci.com/gh/theoutlander/jest-dashboard)
[![npm version](https://badge.fury.io/js/jest-dashboard.svg)](https://badge.fury.io/js/jest-dashboard)
[![npm](https://img.shields.io/npm/dt/jest-dashboard.svg)](https://www.npmjs.com/package/jest-dashboard)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/theoutlander/jest-dashboard/blob/master/LICENSE)

## Purpose

When you run tests in jest, you probably see this sort of output:

![image](https://user-images.githubusercontent.com/749084/34291652-0ffb9582-e6b2-11e7-9a9f-946524afaedd.png)

While that is helpful, it can get quite hard to parse through the noise. The **jest-dashboard** simplifies this.

![image](https://user-images.githubusercontent.com/749084/34291630-f81399a6-e6b1-11e7-8497-a232694827bb.png)


## Install

```npm install -D jest-dashboard```

[![NPM](https://nodei.co/npm/jest-dashboard.png)](https://npmjs.org/package/jest-dashboard)


## Usage

You can use jest-dashboard in **two ways**:

1). Specify the jest-dashboard reporter as a command line parameter

```
jest --reporters jest-dashboard
```

OR



2). Modify your **jest configuration** file with the following:

```
"reporters": ["jest-dashboard"]
```

and run:

```
jest --config <jest.config.json>
```

Press **Escape** to quit


## Contribution

This is a work-in-progress and we would like your help. Please consider contributing to this project on one of the following:

- Dashboard Improvements
- Integration with Mocha
- Test Cases
- Examples

## License

MIT License
