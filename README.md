# jest-dashboard

A command line dashboard for [jest](https://github.com/facebook/jest)

<p>
<img src="https://img.shields.io/circleci/project/github/theoutlander/jest-dashboard.svg">
<img src="https://badge.fury.io/js/jest-dashboard.svg">
<img src="https://img.shields.io/npm/dt/jest-dashboard.svg">
<img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
<img src="https://img.shields.io/npm/l/jest-dashboard.svg">
</p>

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

