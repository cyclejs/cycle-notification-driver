
# `CycleHTTP` object API

- [`makeNotificationDriver`](#makeNotificationDriver)

### <a id="makeNotificationDriver"></a> `makeNotificationDriver()`

Notification Driver factory.

This is the function which, when called, returns a Notification Driver
for Cycle.js apps. The driver is also a function, and it takes an
Observable of notifications as input and generates a stream of events
related to the notifications shown through the driver.

**Notifications**. The Observable of notifications should emit an object
that has the following properties:

- `title` *(String)*: The title of the notification.
- `dir`  *(String)*: The text direction of the notification. One of
   "auto", "ltr", or "rtl"
- `lang` *(String)*: The language code of the notification.
- `body` *(String)*: The body string of the notification.
- `tag` *(String)*: The ID of the notification (if any).
- `icon` *(String*): The URL of the image used as an icon of the
    notification. Can be a Data URI.
- `silent` Specifies whether the notification should be silent.

**Responses**. A stream of events related to the notifications shown
through the driver. Event streams are obtained with the `get` method and
include `show`, `click`, `error`, and `close`.

#### Return:

*(Function)* the Notification Driver function

- - -

