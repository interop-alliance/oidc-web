# OpenID Connect Web Client _(oidc-web)_

[![Build Status](https://travis-ci.org/interop-alliance/oidc-web.svg?branch=master)](https://travis-ci.org/interop-alliance/oidc-web)
[![npm version](https://badge.fury.io/js/oidc-web.svg)](https://badge.fury.io/js/oidc-web)

>  OIDC (OpenID Connect) authentication client for web browsers (Relying Party wrapper)

Authentication client for use in browser-based JS applications.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Background

## Install

```
$ npm install oidc-web
```

## Usage

```js
const { OIDCWebClient } = require('oidc-web')

let auth = new OIDCWebClient({})

auth.login(issuer)
  .then(session => {
    // logged in session or null
  })

// On Document Ready (or on web framework ready) event:

auth.currentSession()
  .then(session => {
    if (session) {
      // logged in
    } else {
      console.log('please log in')
    }
  })
```

## Develop

### Install

```bash
git clone https://github.com/solid/oidc-web.git
cd oidc-web
npm install
```

### Test

```
$ npm test
```

### Coverage

```
$ npm run coverage
```

## API

tbd

### Code of conduct

This project follows the
[Contributor Covenant](https://www.contributor-covenant.org/version/1/4/code-of-conduct)
Code of Conduct.

## Maintainers

* [Dmitri Zagidulin](https://github.com/dmitrizagidulin)

## License

[MIT](LICENSE)
