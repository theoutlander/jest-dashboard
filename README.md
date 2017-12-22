# jest-dashboard

A command line dashboard for [jest](https://github.com/facebook/jest)

##Purpose

When you run tests in jest, you probably see this sort of output:

While that is helpful, it can get quite hard to parse through the noise. jest-dashboard simplifies cutting through the noise and bubbling up relevant information.


## Install

```npm install -D jest-dashboard```

## Setup

To use jest-dashboard, you need to modify your *jest configuration* file with the following:

```json
"reporters": ["jest-dashboard"]
```

## Usage

jest --config <jest.config.json>