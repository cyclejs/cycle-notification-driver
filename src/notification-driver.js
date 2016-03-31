import Rx from 'rx'

export function makeNotificationDriver() {
  let events$$ = new Rx.Subject()

  function showNotification(content) {
    let doShow = () => {
      const notification = new Notification(content.title, content)
      const handler = (event) => events$$.onNext(event)

      // generic event handler to stream over events$$
      notification.onshow =
        notification.onclick =
        notification.onerror =
        notification.onclose =
        handler
    }

    if (!(`Notification` in window)) {
      events$$.onError({type: `unsupported`})
    } else if (Notification.permission === `granted`) {
      doShow()
    } else {
      Notification.requestPermission((permission) => {
        if (permission === `granted`) {
          doShow()
        } else {
          events$$.onError({type: `denied`})
        }
      })
    }
  }

  function get(type) {
    return events$$.filter(event => event.type === type)
  }

  return function notificationDriver(notifications$) {
    // show each notification
    notifications$
    .subscribe(showNotification)

    // user events with notifications
    return {get}
  }
}
