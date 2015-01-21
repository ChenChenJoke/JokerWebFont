!function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t(require, exports, module) : t();
}(this, function() {
    var e, t = window, n = t.Date, r = {}, i = {
        d: 864e5,
        h: 36e5,
        m: 6e4,
        s: 1e3,
        ms: 1
    }, o = function(e, t) {
        return t = Math.pow(10, t || 2), t > e ? (t + e + "").slice(1) : e + "";
    }, u = function(t, n) {
        if (t.length !== e) for (var r = 0, i = t.length; i > r && !(r in t && n.call(t[r], t[r], r, t) === !1); r++) ; else for (var r in t) if (t.hasOwnProperty(r) && n.call(t[r], t[r], r, t) === !1) break;
    };
    r.VERSION = "0.0.1", r.is = function(e) {
        return e instanceof n && !isNaN(e);
    }, r.contains = function(e, t, n) {
        return e = e.getTime(), e >= t.getTime() && e <= n.getTime();
    }, r.clone = function(e) {
        return new n(+e);
    }, r.now = n.now || function() {
        return +new n();
    }, r.toUnix = function(e) {
        return Math.round(e.getTime() / i.s);
    }, r.toUTC = function(e) {
        return new n(e.getTime() + e.getTimezoneOffset() * i.m);
    }, r.toISOString = function(e) {
        return e.getUTCFullYear() + "-" + o(e.getUTCMonth() + 1) + "-" + o(e.getUTCDate()) + "T" + o(e.getUTCHours()) + ":" + o(e.getUTCMinutes()) + ":" + o(e.getUTCSeconds()) + "." + ((e.getUTCMilliseconds() / i.s).toFixed(3) + "").slice(2, 5) + "Z";
    }, r.format = function(e, t) {
        var n = {
            y: e.getFullYear(),
            M: e.getMonth() + 1,
            d: e.getDate(),
            h: e.getHours(),
            m: e.getMinutes(),
            s: e.getSeconds(),
            w: e.getDay(),
            z: e.getTimezoneOffset() / 60 * -1
        };
        return t ? (u(n, function(e, n) {
            t = t.replace(/(y+)/g, function(t, n) {
                return (e + "").substr(4 - Math.min(4, n.length));
            }).replace(new RegExp("(" + n + "+)", "g"), function(t, n) {
                return o(e, n.length);
            });
        }), t) : n;
    }, r.timezone = function(e, t) {
        return e.setTime(r.toUTC(e).getTime() + (t || 0) * i.h), e;
    }, r.isLeapYear = function(e) {
        return r.is(e) && (e = e.getFullYear()), e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
    }, r.days = function(e, t) {
        return r.is(e) && (t = e.getFullYear(), e = e.getMonth() + 1), [ 31, r.isLeapYear(t || new n().getFullYear()) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][e - 1];
    }, r.add = function(e, t) {
        t === +t && (t = {
            d: t
        }), t = t || {};
        var n = function(e, t) {
            var n = e.getDate();
            return e.setDate(1), e.setMonth(e.getMonth() + t), e.setDate(Math.min(n, r.days(e))), 
            e;
        };
        return u(t, function(t, r) {
            "M" === r && (e = n(e, t)), "y" === r && (e = n(e, 12 * t)), i[r] && e.setMilliseconds(e.getMilliseconds() + i[r] * t);
        }), e;
    }, r.diff = function(e, t) {
        var n = t - e, r = {};
        return u(i, function(e, t) {
            var i = 0;
            Math.abs(n) > e && (i = Math.floor(n / e), n %= e), r[t] = i;
        }), r;
    }, r.extend = function(t, i) {
        i = i || n, t = t || this;
        var o = arguments;
        return u(t, function(t, n) {
            i[n] = t, t !== o.callee && i.prototype[n] === e && (i.prototype[n] = function() {
                var e = this;
                return t.apply(e, [].concat.apply(e, [].slice.call(arguments)));
            });
        }), r;
    }, r.extend();
});