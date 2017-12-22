# jest-dashboard

A command line dashboard for [jest](https://github.com/facebook/jest)

## Purpose

When you run tests in jest, you probably see this sort of output:

![image](https://user-images.githubusercontent.com/749084/34291652-0ffb9582-e6b2-11e7-9a9f-946524afaedd.png)

While that is helpful, it can get quite hard to parse through the noise. jest-dashboard simplifies cutting through the noise and bubbling up relevant information.

![image](https://user-images.githubusercontent.com/749084/34291630-f81399a6-e6b1-11e7-8497-a232694827bb.png)


## Install

```npm install -D jest-dashboard```

## Setup

To use jest-dashboard, you need to modify your *jest configuration* file with the following:

```json
"reporters": ["jest-dashboard"]
```

## Usage

jest --config <jest.config.json>
