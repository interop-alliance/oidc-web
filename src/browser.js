'use strict'

const { URL } = require('whatwg-url')
// const POPUP_SOURCE = require('./popup')

// URI parameter types
const HASH = 'hash'
const QUERY = 'query'

module.exports = {
  clearAuthResponseFromUrl,
  currentLocation,
  currentLocationNoAuth,
  currentUriHasAuthResponse,
  stateFromUri,
  redirectTo,
  replaceCurrentUrl,
  openLoginPopup,
  HASH,
  QUERY
}

/**
 * Removes authentication response data (access token, id token etc) from
 * the current url's hash fragment.
 */
function clearAuthResponseFromUrl () {
  const clearedUrl = currentLocationNoAuth()

  replaceCurrentUrl(clearedUrl)
}

/**
 * Returns the current url with the authentication response hash fragments
 * (containing access token, id token, state, etc) removed
 *
 * @returns {string}
 */
function currentLocationNoAuth () {
  const currentUrl = new URL(currentLocation())

  if (!currentUrl.hash) { return currentUrl.toString() } // nothing needs to be done

  let hashFragments = currentUrl.hash.slice(1) // drop leading #

  hashFragments = hashFragments.split('&')

  const authParams = [
    'id_token', 'access_token', 'state', 'token_type', 'expires_in'
  ]

  hashFragments = hashFragments.filter(f => {
    const fragmentKey = f.split('=')[0]
    return !authParams.includes(fragmentKey)
  })

  currentUrl.hash = hashFragments.join('&')

  return currentUrl.toString()
}

/**
 * Returns the current window's URI
 *
 * @returns {string|null}
 */
function currentLocation () {
  if (typeof window === 'undefined') { return null }

  if (!window || !window.location) { return null }

  return window.location.href
}

/**
 * Tests whether the current URI is the result of an AuthenticationRequest
 * return redirect.
 *
 * @returns {boolean}
 */
function currentUriHasAuthResponse () {
  const currentUri = currentLocation()
  const stateParam = stateFromUri(currentUri, HASH)

  return !!stateParam
}

/**
 * Extracts and returns the `state` query or hash fragment param from a uri
 *
 * @param uri {string}
 * @param uriType {string} 'hash' or 'query'
 *
 * @returns {string|null} Value of the `state` query or hash fragment param
 */
function stateFromUri (uri, uriType = HASH) {
  if (!uri) { return null }

  const uriObj = new URL(uri)
  let state

  if (uriType === HASH) {
    const hash = uriObj.hash || '#'
    const params = new URLSearchParams(hash.substr(1))
    state = params.get('state')
  }

  if (uriType === QUERY) {
    state = uriObj.searchParams.get('state')
  }

  return state
}

/**
 * Replaces the current document's URL (used to clear the credentials in
 * the hash fragment after a redirect from the provider).
 *
 * @param newUrl {string|null}
 */
function replaceCurrentUrl (newUrl) {
  if (typeof window === 'undefined') { return null }

  const history = window.history

  if (!history) { return null }

  history.replaceState(history.state, history.title, newUrl)
}

/**
 * Redirects the current window to the given uri.
 *
 * Note: the `return false` is due to odd Chrome requirement/quirk
 *
 * @param uri {string}
 */
function redirectTo (uri) {
  if (typeof window === 'undefined') { return null }

  window.location.href = uri

  return false
}

/**
 * Opens a Select Provider popup window, initializes events.
 */
function openLoginPopup () {
  // this.debug('Getting provider from default popup UI')
  // this.initEventListeners(this.window)

  // const popup = window.open('./login.html',
  //   'selectProviderWindow',
  //   'menubar=no,resizable=yes,width=400,height=400'
  // )

  // const popup = window.open('',
  //   'selectProviderWindow',
  //   'menubar=no,resizable=yes,width=400,height=400'
  // )

  // popup.document.write(POPUP_SOURCE)
  // popup.document.close()

  // if (this.selectProviderWindow) {
  //   // Popup has already been opened
  //   this.selectProviderWindow.focus()
  // } else {
  //   // Open a new Provider Select popup window
  //   this.selectProviderWindow = this.window.open('',
  //     'selectProviderWindow',
  //     'menubar=no,resizable=yes,width=400,height=400'
  //   )
  //
  //   this.selectProviderWindow.document.write(POPUP_SOURCE)
  //   this.selectProviderWindow.document.close()
  // }
}
