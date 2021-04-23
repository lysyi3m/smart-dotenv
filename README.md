# smart-dotenv

Ligthweight, zero-dependency library to load environment variables from a `.env` file with support of defaults and fallback to `process.env` values.

![Node.js CI](https://github.com/lysyi3m/smart-dotenv/workflows/Node.js%20CI/badge.svg?branch=master)
[![npm version](https://badge.fury.io/js/%40lysyi3m%2Fsmart-dotenv.svg)](https://badge.fury.io/js/%40lysyi3m%2Fsmart-dotenv)

## Description

*Heavily inspired by [dotenv](https://github.com/motdotla/dotenv) and [dotenv-defaults](https://github.com/mrsteele/dotenv-defaults) with full API-compatibility*

**smart-dotenv** library retains the ability to use regular environment variables without providing `.env` or `.env.defaults` files, which is useful for CI/CD.

## Installation

```sh
$ npm install @lysyi3m/smart-dotenv
```

or using [Yarn](https://yarnpkg.com/):
```sh
$ yarn add @lysyi3m/smart-dotenv
```
