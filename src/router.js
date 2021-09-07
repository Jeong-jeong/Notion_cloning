const ROUTE_CHANGE_EVENT_NAME = 'route-change'

export const pushRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    history.pushState(null, null, e.detail)
    onRoute()
  })
}

export const pushUrl = (url) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: url,
    })
  )
}
