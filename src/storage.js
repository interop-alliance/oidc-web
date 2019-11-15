'use strict'

const RelyingParty = require('@interop-alliance/oidc-rp')
const LocalJsonStore = require('./LocalJsonStore')
const Session = require('@interop-alliance/oidc-rp/src/Session')

module.exports = {
  defaultClientStore,
  defaultProviderStore,
  defaultSessionStore,
  defaultStore
}

function defaultStore () {
  return global.localStorage
}

function defaultClientStore (store) {
  return new LocalJsonStore('oidc.clients', {
    className: RelyingParty,
    store: store || defaultStore()
  })
}

function defaultSessionStore (store) {
  return new LocalJsonStore('oidc.session', {
    className: Session,
    store: store || defaultStore()
  })
}

/**
 * Store Provider URIs by state param
 *
 * @param store
 *
 * @returns {LocalJsonStore}
 */
function defaultProviderStore (store) {
  return new LocalJsonStore('oidc.providers', {
    store: store || defaultStore()
  })
}
