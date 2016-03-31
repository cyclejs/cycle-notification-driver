import Cycle from '@cycle/core'
import Rx from 'rx'

import { makeNotificationDriver } from '../../../lib'

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

const drivers = {
  notification: makeNotificationDriver()
}

Cycle.run(main, drivers)
