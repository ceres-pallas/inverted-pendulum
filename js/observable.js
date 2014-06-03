(function ($) {
    'use strict';

    var Observable = $.Observable = function () {
        this.observers = [];
    };
    Observable.prototype.addObserver = function (observer) {
        this.observers.push(observer);
    };
    Observable.prototype.notify = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        this.observers.forEach(function (observer) {
            observer.apply(this, args);
        }.bind(this));
    };
})(window || module.exports);
