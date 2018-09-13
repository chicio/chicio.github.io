const tabs = () => {
    const tabs = document.querySelectorAll("ul.nav-tabs > li");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", event => tabClick(tabs, event))
    }
};

const tabClick = (tabs, event) => {
    event.preventDefault();
    deactivateAll(tabs);
    activateTabFor(event);
    deactivateAllTabPanes();
    activateTabPaneFor(event);
};

const activateTabFor = (event) => event.currentTarget.classList.add("active");

const deactivateAll = (tabs) => {
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }
};

const deactivateAllTabPanes = () => {
    const tabPanes = document.querySelectorAll(".tab-pane");
    for (let i = 0; i < tabPanes.length; i++) {
        tabPanes[i].classList.remove("active");
    }
};

const activateTabPaneFor = (event) => {
    const activePaneId = event.target.getAttribute("href");
    const activePane = document.querySelector(activePaneId);
    activePane.classList.add("active");
};

export {tabs}
