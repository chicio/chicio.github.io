declare global {
  interface Window {
    cookieconsent: any
  }
}

const cookieConsent = (): void => {
  window.cookieconsent.initialise({
    palette: {
      popup: {
        background: '#303F9F',
        text: '#ffffff'
      },
      button: {
        background: '#0F67FF',
        text: '#ffffff'
      }
    },
    theme: 'classic',
    content: {
      dismiss: 'Ok',
      href: window.location.protocol + '//' + window.location.host + '/cookie-policy.html',
      message: 'This website uses cookies to ensure you get the best experience.',
      link: 'Learn more about cookie policy'
    }
  })
}

export { cookieConsent }
