/*  */
const cookieConsent = () => {
  window.addEventListener('load', () => {
    window.cookieconsent.initialise({
      'palette': {
        'popup': {
          'background': '#9fa8da',
          'text': '#ffffff'
        },
        'button': {
          'background': '#448aff',
          'text': '#ffffff'
        }
      },
      'theme': 'classic',
      'content': {
        'dismiss': 'Ok',
        'href': window.location.protocol + '//' + window.location.host + '/cookie-policy.html',
        'message': 'This website uses cookies to ensure you get the best experience.'
      }
    })
  })
}

export { cookieConsent }
