'use strict'

module.exports = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-type" content="text/html;charset=utf-8">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
  <script src="./oidc-web.min.js"></script>
</head>
<body>
<div class="container">
  <div class="row">
    <div class="col-xs-12 text-center" style="margin-top: 3em;">
      Login with:
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 text-center" style="padding-top: 2em;">
      <button type="button" class="btn btn-md btn-primary" id="testProvider">
        solid.community
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 text-center" style="padding-top: 2em;">
      or custom:<br />
      <input type="text" id="customProviderUri" value="https://" />
      <button type="button" class="btn btn-md btn-primary" id="customProvider">Go</button>
    </div>
  </div>
</div>
<script type="text/javascript">
  const { OIDCWebClient } = OIDC
  const options = { solid: true }
  const authClient = new OIDCWebClient(options)

  window.addEventListener('load', () => { init() });

  function init () {
    initEvents()
  }

  function initEvents () {
    initButton('testProvider', () => { selectProvider('https://solid.community') })
    initButton('customProvider',
      () => {
        var defaultValue = 'https://'
        var customUri = document.getElementById('customProviderUri')
        if (customUri && customUri.value !== defaultValue) {
          selectProvider(customUri.value)
        }
      })
  }

  function initButton(id, action) {
    document.getElementById(id).addEventListener('click', action)
  }

  function selectProvider (provider) {
    console.log('Provider selected: ', provider)
    authClient.redirectTo({
      provider,
      redirect_uri: 'https://solid.github.io/oidc-web/demo/callback.html'
    })
      .catch((error) => {
        console.error('Error logging in:', error)
      })

//    var message = {
//      event_type: 'providerSelected',
//      value: providerUri
//    }
//    console.log('opener.window.location: ', opener.window.location.href)
//
//    opener.postMessage(message, opener.window.location.origin)
  }
</script>
</body>
</html>
`
