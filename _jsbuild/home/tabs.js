/*  */
import { addCssClass, removeCssClass } from '../common/css-class'

const tabs = () => {
  const tabs = document.querySelectorAll('ul.nav-tabs > li')
  forEach(tabs, (tab) => {
    tab.addEventListener('click', (event) => tabClick(tabs, event))
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

const activateTabFor = (event) => {
  const element = (event.currentTarget)
  addCssClass(element, 'active')
}

const deactivateAll = (tabs) => forEach(tabs, (tab) => removeCssClass(tab, 'active'))

const deactivateAllTabPanes = () => forEach(
  document.querySelectorAll('.tab-pane'),
  (tabPane) => removeCssClass(tabPane, 'active')
)

const activateTabPaneFor = (event) => {
  const element = (event.target)
  const activePaneId = element.getAttribute('href')
  if (activePaneId) {
    const activePane = document.querySelector(activePaneId)
    if (activePane) {
      addCssClass(activePane, 'active')
    }
  }
}

export { tabs }
