'use strict'

global.URL = require('whatwg-url').URL
global.URLSearchParams = require('whatwg-url').URLSearchParams

// const localStorage = require('localstorage-memory')

const { OIDCWebClient } = require('../src/index')

const chai = require('chai')
const sinon = require('sinon')
chai.use(require('sinon-chai'))
// chai.use(require('chai-as-promised'))
chai.use(require('dirty-chai'))
chai.should()

const expect = chai.expect

const provider = 'https://oidc.example.com'
const currentLocation = 'https://app.com/'

global.window = {
  location: { href: currentLocation }
}

const clients = {}
const session = {}
const defaults = {}
const store = {}

describe('OIDCWebClient', () => {
  it('should exist', () => {
    expect(OIDCWebClient).to.exist()
  })

  describe('constructor', () => {
    it('initializes defaults and stores', () => {
      const auth = new OIDCWebClient({ provider, clients, session, defaults })

      expect(auth.provider).to.equal(provider)
      expect(auth.clients).to.equal(clients)
      expect(auth.session).to.equal(session)
      expect(auth.defaults).to.equal(defaults)
    })

    it('accepts a provider option', () => {
      const auth = new OIDCWebClient({ provider })

      expect(auth.provider).to.equal(provider)
    })

    it('uses defaults.issuer if no provider passed in', () => {
      const auth = new OIDCWebClient({ defaults: { issuer: provider } })

      expect(auth.provider).to.equal(provider)
    })
  })

  describe('registerPublicClient', () => {
    let auth
    const redirectUri = 'https://app.com/callback'

    const options = {
      popToken: true,
      redirect_uri: redirectUri
    }

    const expectedRegistration = {
      issuer: provider,
      grant_types: ['implicit'],
      redirect_uris: [redirectUri],
      response_types: ['id_token token'],
      scope: 'openid profile'
    }

    const expectedRpOptions = {
      store,
      defaults: {
        popToken: true,
        authenticate: {
          redirect_uri: redirectUri,
          response_type: 'id_token token',
          scope: ['openid']
        }
      }
    }

    beforeEach(() => {
      auth = new OIDCWebClient({
        provider, clients, session, store, defaults, popToken: true
      })

      auth.registerClient = sinon.stub().resolves()
    })

    it('should construct a default rp registration and options', async () => {
      await auth.registerPublicClient(provider, options)

      expect(auth.registerClient).to.have.been
        .calledWith(provider, expectedRegistration, expectedRpOptions)
    })

    it('should default the redirectUri to the current location', async () => {
      auth.browser.currentLocation = sinon.stub().returns(currentLocation)

      const expectedRegistration = {
        issuer: provider,
        grant_types: ['implicit'],
        redirect_uris: [currentLocation],
        response_types: ['id_token token'],
        scope: 'openid profile'
      }

      const expectedRpOptions = {
        store,
        defaults: {
          popToken: true,
          authenticate: {
            redirect_uri: currentLocation,
            response_type: 'id_token token',
            scope: ['openid']
          }
        }
      }

      await auth.registerPublicClient(provider, {})

      expect(auth.registerClient).to.have.been
        .calledWith(provider, expectedRegistration, expectedRpOptions)
    })
  })

  describe('currentLocation', () => {
    it('should return the current window location', () => {
      const auth = new OIDCWebClient({
        provider, clients, session, store, defaults
      })

      expect(auth.browser.currentLocation()).to.equal(currentLocation)
    })
  })
})
