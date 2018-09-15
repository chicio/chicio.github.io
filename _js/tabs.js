const tabs = () => {
  const tabs = document.querySelectorAll('ul.nav-tabs > li')
  tabs.forEach((tab) => tab.addEventListener('click', event => tabClick(tabs, event)))
}

const tabClick = (tabs, event) => {
  event.preventDefault()
  deactivateAll(tabs)
  activateTabFor(event)
  deactivateAllTabPanes()
  activateTabPaneFor(event)
}

const activateTabFor = (event) => event.currentTarget.classList.add('active')

const deactivateAll = (tabs) => tabs.forEach((tab) => tab.classList.remove('active'))

const deactivateAllTabPanes = () => document
  .querySelectorAll('.tab-pane')
  .forEach((tabPane) => tabPane.classList.remove('active'))

const activateTabPaneFor = (event) => {
  const activePaneId = event.target.getAttribute('href')
  const activePane = document.querySelector(activePaneId)
  activePane.classList.add('active')
}

export { tabs }
