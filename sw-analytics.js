---
---
//See: https://codelabs.developers.google.com/codelabs/pwa-integrating-analytics/index.html?index=..%2F..dev-pwa-training#6

const sendAnalyticsEvent = (clientId, action, category, label) => {
  console.log(self.location.hostname)

  if (!action && !category) {
    return Promise.resolve();
  }

  const payloadData = {
    v: 1, // Version Number
    cid: clientId, // Client ID
    tid: '{{ site.tracking_id }}', // Tracking ID
    t: 'event', // Hit Type
    ec: category, // Event Category
    ea: action, // Event Action
    el: label // Event Label
  };

  const payloadString = Object.keys(payloadData)
    .filter(analyticsKey => payloadData[analyticsKey])
    .map(analyticsKey => analyticsKey + '=' + encodeURIComponent(payloadData[analyticsKey]))
    .join('&');

  return fetch('https://www.google-analytics.com/collect', {
    method: 'post',
    body: payloadString
  }).then(response => {
    if (!response.ok) {
      return response.text()
        .then(responseText => {
          throw new Error('Service worker bad response from Google Analytics:\n' + response.status);
        });
    } else {
      console.log(response)
      console.log('Service worker analytics event: ' + action + '/' + category + '/' + label + '/' + clientId);
    }
  });
};