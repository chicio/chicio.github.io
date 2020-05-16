import { addCssClass, removeCssClass } from '../common/css-class'

const tabs = (): void => {
  const tabs: NodeList = document.querySelectorAll('ul.nav-tabs > li')
  forEach(tabs, (tab: HTMLElement) => {
    tab.addEventListener('click', (event: Event) => tabClick(tabs, event))
  })
}

const forEach = (list: NodeList, operation: (HTMLElement) => void): void => {
  for (let i: number = 0; i < list.length; i++) {
    operation(list.item(i))
  }
}

const tabClick = (tabs: NodeList, event: Event): void => {
  event.preventDefault()
  deactivateAll(tabs)
  activateTabFor(event)
  deactivateAllTabPanes()
  activateTabPaneFor(event)
}

const activateTabFor = (event: Event): void => {
  const element: HTMLElement = (<HTMLElement>event.currentTarget)
  addCssClass(element, 'active')
}

const deactivateAll = (tabs: NodeList): void => forEach(tabs, (tab: HTMLElement) => removeCssClass(tab, 'active'))

const deactivateAllTabPanes = (): void => forEach(
  document.querySelectorAll('.tab-pane'),
  (tabPane: HTMLElement) => removeCssClass(tabPane, 'active')
)

const activateTabPaneFor = (event: Event): void => {
  const element: HTMLElement = (<HTMLElement>event.target)
  const activePaneId: string | null = element.getAttribute('href')
  if (activePaneId) {
    const activePane: HTMLElement | null = document.querySelector(activePaneId)
    if (activePane) {
      addCssClass(activePane, 'active')
    }
  }
}

export { tabs }
