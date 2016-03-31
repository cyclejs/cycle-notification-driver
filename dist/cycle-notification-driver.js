(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.CycleNotificationDriver = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _require = require('./notification-driver');

var makeNotificationDriver = _require.makeNotificationDriver;


module.exports = {
  /**
   * Notification Driver factory.
   *
   * This is the function which, when called, returns a Notification Driver
   * for Cycle.js apps. The driver is also a function, and it takes an
   * Observable of notifications as input and generates a stream of events
   * related to the notifications shown through the driver.
   *
   * **Notifications**. The Observable of notifications should emit an object
   * that has the following properties:
   *
   * - `title` *(String)*: The title of the notification.
   * - `dir`  *(String)*: The text direction of the notification. One of
   *    "auto", "ltr", or "rtl"
   * - `lang` *(String)*: The language code of the notification.
   * - `body` *(String)*: The body string of the notification.
   * - `tag` *(String)*: The ID of the notification (if any).
   * - `icon` *(String*): The URL of the image used as an icon of the
   *     notification. Can be a Data URI.
   * - `silent` Specifies whether the notification should be silent.
   *
   * **Responses**. A stream of events related to the notifications shown
   * through the driver. Event streams are obtained with the `get` method and
   * include `show`, `click`, `error`, and `close`.
   *
   * @return {Function} the Notification Driver function
   * @function makeNotificationDriver
   */
  makeNotificationDriver: makeNotificationDriver
};

},{"./notification-driver":2}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeNotificationDriver = makeNotificationDriver;

var _rx = (typeof window !== "undefined" ? window['Rx'] : typeof global !== "undefined" ? global['Rx'] : null);

var _rx2 = _interopRequireDefault(_rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeNotificationDriver() {
    var events$$ = new _rx2.default.Subject();

    function showNotification(content) {

        var doShow = function doShow() {
            var notification = new Notification(content.title, content),
                handler = function handler(event) {
                return events$$.onNext(event);
            };

            // generic event handler to stream over events$$
            notification.onshow = notification.onclick = notification.onerror = notification.onclose = handler;
        };

        if (!('Notification' in window)) {
            events$$.onError({ type: 'unsupported' });
        } else if (Notification.permission === 'granted') {
            doShow();
        } else {
            Notification.requestPermission(function (permission) {
                permission === 'granted' ? doShow() : events$$.onError({ type: 'denied' });
            });
        }
    }

    function get(type) {
        return events$$.filter(function (event) {
            return event.type === type;
        });
    }

    return function notificationDriver(notifications$) {
        // show each notification
        notifications$.subscribe(showNotification);

        // user events with notifications
        return { get: get };
    };
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});