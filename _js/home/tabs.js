/* @flow */
import { addCssClass, removeCssClass } from '../common/css-class'

const tabs = () => {
  const tabs: NodeList<HTMLElement> = document.querySelectorAll('ul.nav-tabs > li')
  forEach(tabs, (tab: HTMLElement) => {
    tab.addEventListener('click', (event: Event) => tabClick(tabs, event))
  })
}

const forEach = (list: NodeList<HTMLElement>, operation: (HTMLElement) => void) => {
  for (let i: number = 0; i < list.length; i++) {
    operation(list.item(i))
  }
}

const tabClick = (tabs: NodeList<HTMLElement> , event: Event) => {
  event.preventDefault()
  deactivateAll(tabs)
  activateTabFor(event)
  deactivateAllTabPanes()
  activateTabPaneFor(event)
}

const activateTabFor = (event: Event) => addCssClass(event.currentTarget, 'active')

const deactivateAll = (tabs: NodeList<HTMLElement> ) => forEach(tabs, (tab: HTMLElement) => removeCssClass(tab, 'active'))

const deactivateAllTabPanes = () => forEach(
  document.querySelectorAll('.tab-pane'),
  (tabPane: HTMLElement) => removeCssClass(tabPane, 'active')
)

const activateTabPaneFor = (event: Event) => {
  const el: Element = (event.target: any);
  const activePaneId: ?string = el.getAttribute('href')
  if (activePaneId) {
    const activePane = document.querySelector(activePaneId)
    addCssClass(activePane, 'active')  
  }
}

export { tabs }
