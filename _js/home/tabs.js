import { addCssClass, removeCssClass } from '../common/css-class'

const tabs = () => {
  const tabs = document.querySelectorAll('ul.nav-tabs > li')
  forEach(tabs, (tab) => {
    tab.addEventListener('click', event => tabClick(tabs, event))
  })
}

const forEach = (list, operation) => {
  for (let i = 0; i < list.length; i++) {
    operation(list.item(i))
  }
}

const tabClick = (tabs, event) => {
  event.preventDefault()
  deactivateAll(tabs)
  activateTabFor(event)
  deactivateAllTabPanes()
  activateTabPaneFor(event)
}

const activateTabFor = (event) => addCssClass(event.currentTarget, 'active')

const deactivateAll = (tabs) => forEach(tabs, tab => removeCssClass(tab, 'active'))

const deactivateAllTabPanes = () => forEach(
  document.querySelectorAll('.tab-pane'),
  (tabPane) => removeCssClass(tabPane, 'active')
)

const activateTabPaneFor = (event) => {
  const activePaneId = event.target.getAttribute('href')
  const activePane = document.querySelector(activePaneId)
  addCssClass(activePane, 'active')
}

export { tabs }
