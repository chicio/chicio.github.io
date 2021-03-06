import { addCssClass, removeCssClass } from '../common/css-class'

const forEach = (list: NodeListOf<HTMLElement>, operation: (item: HTMLElement) => void): void => {
  for (let i = 0; i < list.length; i++) {
    operation(list.item(i))
  }
}

const deactivateAll = (tabs: NodeListOf<HTMLElement>): void => forEach(tabs, (tab: HTMLElement) => removeCssClass(tab, 'active'))

const activateTabFor = (event: Event): void => {
  const element: HTMLElement = (event.currentTarget as HTMLElement)
  addCssClass(element, 'active')
}

const deactivateAllTabPanes = (): void => forEach(
  document.querySelectorAll<HTMLElement>('.tab-pane'),
  (tabPane: HTMLElement) => removeCssClass(tabPane, 'active')
)

const activateTabPaneFor = (event: Event): void => {
  const element: HTMLElement = (event.target as HTMLElement)
  const activePaneId: string | null = element.getAttribute('href')
  if (activePaneId) {
    const activePane: HTMLElement | null = document.querySelector<HTMLElement>(activePaneId)
    if (activePane) {
      addCssClass(activePane, 'active')
    }
  }
}

const tabClick = (tabs: NodeListOf<HTMLElement>, event: Event): void => {
  event.preventDefault()
  deactivateAll(tabs)
  activateTabFor(event)
  deactivateAllTabPanes()
  activateTabPaneFor(event)
}

const tabs = (): void => {
  const tabs: NodeListOf<HTMLElement> = document.querySelectorAll('ul.nav-tabs > li')
  forEach(tabs, (tab: HTMLElement) => {
    tab.addEventListener('click', (event: Event) => tabClick(tabs, event))
  })
}

export { tabs }
