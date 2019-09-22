---
---
//See: https://codelabs.developers.google.com/codelabs/pwa-integrating-analytics/index.html?index=..%2F..dev-pwa-training#6

const sendAnalyticsEvent = (clientId, action, category, label) => {
  if (!self.location.hostname.includes('{{ site.domain }}')) {
    return Promise.resolve();
  }

  if (!action && !category) {
    return Promise.resolve();
  }

  const payloadData = {
    v: 1,
    cid: clientId,
    tid: '{{ site.tracking_id }}',
    t: 'event', 
    ec: category,
    ea: action,
    el: label
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
          throw new Error('Service worker bad response from Google Analytics:\n' + response);
        });
    } 
  });
};