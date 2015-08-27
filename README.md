# Cycle Notification Driver

A [Cycle.js](http://cycle.js.org) [Driver](http://cycle.js.org/drivers.html) for showing and responding to HTML5 Notifications.

```
npm install BrandonSmith/cycle-notification-driver
```

## Usage

Basics:

```js
import Cycle from '@cycle/core';
import { makeNotificationDriver } from 'cycle-notification-driver'

function main({notification}) {
  // ...
}

const drivers = {
  notification: makeNotificationDriver()
}

Cycle.run(main, drivers)
```

Simple and normal use case:

```js
function main({notification}) {

    let notifications$ = Rx.Observable
            .interval(10000)
            .startWith(-1)
            .map( (value) => ({
                title: 'Test Notification',
                body: `Interval ${value}`,
                tag: 'test-notification',
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAEUlEQVQIW2Pg3uSLjBgo5AMACSoZ+1zqJ8AAAAAASUVORK5CYII='
            }) )
            .take(10),
        show$ = notification.get('show'),
        click$ = notification.get('click'),
        error$ = notification.get('error'),
        close$ = notification.get('close'),
        all$ = Rx.Observable.merge(show$, click$, error$, close$)

    all$.do(args => console.log(args)).subscribe()

    return {
        notification: notifications$
    }
}
```
