!function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t(require, exports, module) : e.sug = t();
}(this, function() {
    var e, t = window, a = document;
    "".trim || (String.prototype.trim = function() {
        for (var e = this, e = e.replace(/^\s\s*/, ""), t = /\s/, a = e.length; t.test(e.charAt(--a)); ) ;
        return e.slice(0, a + 1);
    }), "".replaceTpl || (String.prototype.replaceTpl = function(e) {
        return this.replace(/#\{([^}]*)\}/gm, function(t, a) {
            return t = e[a.trim()];
        });
    }), "".htmlEncode || (String.prototype.htmlEncode = function() {
        return String(this).replace(/\x26/g, "&amp;").replace(/\x3c/g, "&lt;").replace(/\x3E/g, "&gt;").replace(/\x22/g, "&quot;").replace(/\x27/g, "&#39;").replace(/\xA9/g, "&copy;");
    });
    var n = " ", i = null, o = document.documentElement.classList !== e, l = /\w/.test("İ"), r = l && !t.XMLHttpRequest, s = a.documentMode && 9 === a.documentMode, c = function(e) {
        if (e) {
            var t, a = e.split("."), n = a.length, i = window, o = 0;
            if (n > 1) for (;n - 1 > o; o++) t = a[o], i = 0 === o && i[t] ? i[t] : t in i ? i[t] : i[t] = {};
            return i;
        }
    }, u = o ? function(e, t) {
        return e.classList.contains(t);
    } : function(e, t) {
        return -1 < (n + e.className + n).indexOf(n + t + n);
    }, m = o ? function(e, t) {
        e.classList.add(t);
    } : function(e, t) {
        u(e, t) || (e.className += (e.className ? n : "") + t);
    }, p = o ? function(e, t) {
        e.classList.remove(t);
    } : function(e, t) {
        if (u(e, t)) {
            var a = new RegExp("(\\s|^)" + t + "(\\s|$)");
            e.className = e.className.replace(a, n);
        }
    }, d = a.addEventListener ? function(e, t, a) {
        e.addEventListener(t, a, !1);
    } : function(e, t, a) {
        e.attachEvent("on" + t, a);
    }, f = function(e, a, n) {
        d(e, a, function(e) {
            e = e || t.event;
            var a = e.srcElement || e.target;
            n.call(a, e);
        });
    }, h = l ? function(e, t) {
        return t = t.replace(/\-(\w)/g, function(e, t) {
            return t.toUpperCase();
        }), e.currentStyle[t];
    } : function(e, t) {
        return a.defaultView.getComputedStyle(e, null).getPropertyValue(t);
    }, v = function(t, n) {
        if (!(this instanceof v)) return new v(t, n);
        var i = this;
        i.el = t + "" === t ? a.getElementById(t) : t, i.el && (i.o = {
            classNameWrap: n.classNameWrap || "sug-wrap",
            classNameQuery: n.classNameQuery,
            classNameQueryNull: n.classNameQueryNull,
            classNameSelect: n.classNameSelect || "sug-select",
            classNameClose: n.classNameClose || "sug-close",
            classNameShim: n.classNameShim || "sug-shim",
            locAbs: n.locAbs || !1,
            pressDelay: n.pressDelay === e ? 3 : n.pressDelay,
            autoFocus: n.autoFocus || !1,
            delay: n.delay || 200,
            n: n.n || 10,
            t: n.t || !0,
            autoCompleteData: n.autoCompleteData || !1,
            url: n.url || !1,
            charset: n.charset,
            callbackFn: n.callbackFn || !1,
            callbackName: n.callbackName || !1,
            callbackDataKey: n.callbackDataKey || !1,
            callbackDataNum: n.callbackDataNum || !1,
            requestQuery: n.requestQuery || !1,
            requestParas: n.requestParas || {},
            noSubmit: n.noSubmit || !1,
            onSelect: n.onSelect,
            onShow: n.onShow,
            onHide: n.onHide,
            onRequest: n.onRequest,
            onSucess: n.onSucess,
            onError: n.onError,
            customUrl: n.customUrl || !1,
            templ: n.templ || !1
        }, i.wrap = i.el.parentNode, i.init());
    }, g = v.prototype;
    return g.init = function() {
        var e = this, t = e.o;
        if (e.layoutInit(), e.reset(), e.inputHandle(), t.autoFocus && setTimeout(function() {
            e.el.focus();
        }, 16), !t.autoCompleteData) {
            var a = t.callbackFn, n = c(a, !0), i = a.split("."), o = i.pop();
            e.callback = function(t) {
                t = t || {};
                var n = arguments.callee;
                e = a && n.repeat ? n.context || e : e, e.o.onSucess && e.o.onSucess.call(e);
                var i = e.o.callbackDataKey || e.o.callbackDataNum, o = i ? t[i] : t;
                return o && o.length ? (e.fill(t, e.q), e.show(), void (e.cache[e.q] = t)) : (e.hide(1), 
                void (e.isHide = !1));
            }, n[o] ? n[o].repeat = !0 : a && (n[o] = e.callback);
        }
    }, g.reset = function(e) {
        var t, a = this;
        for (t in e) a.o[t] = e[t];
        a.cache = {}, a.q = "", a.s = i, a.i = -1, a.inputTimer(), a.isHide = !1, a.hide(1);
    }, g.layoutInit = function() {
        var e = this, t = e.o, n = t.locAbs ? a.body : e.wrap, i = e.sugWrap = a.createElement("div");
        if (e.el.setAttribute("autocomplete", "off"), r) {
            var o = e.shim = i.appendChild(a.createElement("iframe"));
            o.src = "about:blank", m(o, t.classNameShim), o.frameBorder = 0, o.scrolling = "no", 
            e.content = i.appendChild(i.cloneNode(null));
        } else e.content = i;
        m(i, t.classNameWrap), !t.locAbs && "static" === h(n, "position") && (n.style.position = "relative"), 
        n.appendChild(i);
    }, g.show = function() {
        this.sugWrap.style.display = "", this.o.onShow && this.o.onShow.call(this);
    }, g.hide = function(e) {
        var t = this;
        t.sugWrap.style.display = "none", t.q = t.el.value, 2 != e && (t.s = i, t.i = -1), 
        1 == e && t.fill(), t.o.onHide && t.o.onHide.call(t);
    }, g.holdFocus = function(e, a) {
        a.preventDefault ? a.preventDefault() : e.onbeforedeactivate = function() {
            t.event.returnValue = !1, e.onbeforedeactivate = null;
        };
    }, g.inputTimer = function(e) {
        var t, a = this, n = a.el, i = a.t;
        if (e) {
            if (i) return;
            a.t = setInterval(function() {
                return t = n.value, t.trim() ? void (t !== a.q && a.updata(t)) : (a.hide(1), void (a.q = t));
            }, a.o.delay);
        } else i && clearInterval(a.t), a.t = 0;
    }, g.getIndex = function(e, t) {
        for (var a = t.length; a--; ) if (t[a] === e) return a;
        return -1;
    }, g.matchEl = function(e, t, a) {
        for (;e !== t; ) {
            if (a.call(e)) return e;
            e = e.parentNode;
        }
        return i;
    }, g.submitForm = function() {
        var e = this.el.form;
        e.onsubmit ? e.onsubmit() : e.submit();
    }, g.keydownMove = function(t) {
        var a = this, n = a.sugWrap.getElementsByTagName("OL")[0];
        if (n) {
            if (a.isHide) return void (a.isHide = !1);
            var o, l = n.getElementsByTagName("LI"), r = l.length, s = a.el, c = a.s, u = a.o, d = u.classNameSelect, f = a.q || "";
            c && (p(c, d), a.i = a.getIndex(c, l), a.s = i), a.i === e && (a.index = -1), -1 !== a.i && p(l[a.i], d), 
            40 === t ? a.i++ : 38 === t && a.i--, -2 === a.i ? a.i = r - 1 : a.i === r ? (s.value = f, 
            a.i = -1) : -1 === a.i && (s.value = f), -1 !== a.i && a.i !== r && (o = l[a.i], 
            m(o, d), !u.autoCompleteData && (s.value = o.getAttribute("q")), a.s = o);
        }
    }, g.inputHandle = function() {
        var e, t = this, a = t.o, n = t.el, i = (n.form, t.sugWrap), o = a.classNameSelect, r = a.autoCompleteData, s = 0;
        n.onkeydown = function(o) {
            if (o = o || window.event, e = o.keyCode, 27 === e) return t.hide(2), i.getElementsByTagName("ol")[0] && (t.isHide = !0), 
            !r && (n.value = t.q), t.inputTimer(), !1;
            if (e > 32 && 41 > e) n.value || "none" !== i.style.display ? (40 === e || 38 === e) && (a.pressDelay && 0 !== s++ ? s === a.pressDelay && (s = 0) : (t.isHide && t.show(), 
            t.keydownMove(e), t.inputTimer()), !l && o.preventDefault()) : n.blur(); else if (13 === e) {
                if (t.inputTimer(), t.hide(2), a.onSelect && a.onSelect.call(t), r) return n.value = t.s ? t.s.getAttribute("q") : "", 
                !1;
                if (a.noSubmit) return !1;
            } else {
                if (e > 8 && 19 > e) return void (9 !== e && t.holdFocus(n, o));
                t.inputTimer(1);
            }
        }, d(n, "keyup", function() {
            s = 0;
        }), d(n, "blur", function() {
            t.hide(2), i.getElementsByTagName("ol")[0] && (t.isHide = !0), t.inputTimer();
        }), f(i, "mouseover", function() {
            var e = t.matchEl(this, i, function() {
                return "LI" === this.tagName;
            });
            e && (t.s && p(t.s, o), m(e, o), t.s = e);
        }), f(i, "mouseout", function() {
            var e = t.matchEl(this, i, function() {
                return "LI" === this.tagName;
            });
            "LI" === this.tagName && this !== e && p(e, o);
        }), d(i, "mousedown", function(e) {
            t.inputTimer(), t.holdFocus(n, e);
        }), f(i, "mouseup", function(e) {
            var o, l = i.getElementsByTagName("OL")[0];
            !l || e.which && e.which > 2 || e.button && 1 !== e.button && 4 !== e.button || (u(this, a.classNameClose) && t.hide(), 
            o = t.matchEl(this, i, function() {
                return "LI" === this.tagName;
            }), o && (n.value = o.getAttribute("q"), t.hide(), t.inputTimer(), a.onSelect && a.onSelect.call(t), 
            t.i = t.getIndex(o, l.getElementsByTagName("LI")), !a.autoCompleteData && !a.noSubmit && t.submitForm()));
        });
    }, g.fill = function(t, a) {
        var n = this, i = n.content;
        if (arguments.length < 2) return void (i.innerHTML = "");
        var o = n.o, l = o.templ, r = o.classNameQueryNull, s = o.classNameQuery;
        this.content.innerHTML = l ? l.call(n, t, a) : function() {
            t = t[o.callbackDataKey || o.callbackDataNum] || [];
            var n, i = 0, l = Math.min(t.length, o.n), c = [];
            for (a = a.trim(); l > i; i++) n = t[i], n !== e && c.push('<li q="' + n + '"' + (r && n.indexOf(a) > -1 ? "" : " class=" + r) + ">" + (s ? n.replace(a, '<span class="' + s + '">' + a + "</span>") : n) + "</li>");
            return "<ol>" + c.join("") + "</ol>";
        }();
    }, g.updata = function(t) {
        var a = this, n = a.o.autoCompleteData || a.cache[t];
        return a.q = t, a.i = -1, a.isHide = !1, n !== e ? (a.fill(n, t), void a.show()) : void a.request(t);
    }, g.request = function(t) {
        var n, o, r = this, u = r.o, m = u.callbackFn, p = u.callbackName, d = u.onSucess, f = u.onError, h = u.onRequest, v = r.callback, g = u.url, y = u.customUrl, N = u.requestParas, b = [];
        if (m) {
            var S = c(m), w = m.split(".").pop();
            S[w] = r.callback, S[w].repeat && (S[w].context = r);
        } else p && (o = r.script, o.readyState ? o.onreadystatechange = function() {
            ("loaded" == o.readyState || "complete" == o.readyState) && (o.onreadystatechange = i, 
            d && d.call(r), v(p));
        } : o.onload = function() {
            d && d.call(r), v(p);
        });
        if (f && (r.script.onerror = function() {
            f.call(r);
        }), !r.script || !l || s) {
            var q = a.getElementsByTagName("script")[0];
            o = a.createElement("script"), o.type = "text/javascript", o.async = !0, r.script ? q.parentNode.replaceChild(o, r.script) : q.parentNode.insertBefore(o, q), 
            r.script = o;
        }
        h && h.call(this), N = function() {
            for (n in N) (o = N[n]) !== e && b.push(n + "=" + N[n]);
            return u.t && b.push("t=" + +new Date()), b.join("&");
        }(), r.script.charset = u.charset ? u.charset : "", r.script.src = y && y.call(r, N) || g + "?" + u.requestQuery + "=" + encodeURIComponent(t) + "&" + N;
    }, "undefined" == typeof module || "undefined" == typeof module.exports ? v : void (module.exports = v);
});