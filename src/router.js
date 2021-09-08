const ROUTE_CHANGE_EVENT_NAME = 'route-change'

export const pushRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const [url, routeEdit] = e.detail
    history.pushState(null, null, url)
    onRoute(routeEdit)
  })
}

export const pushUrl = (url, routeEdit = true) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: [url, routeEdit],
    })
  )
}
