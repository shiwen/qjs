(function(e, t) {
    function u(e) {
        var t = o[e] = {},
            n, r;
        e = e.split(/\s+/);
        for (n = 0, r = e.length; n < r; n++) {
            t[e[n]] = true
        }
        return t
    }

    function c(e, n, r) {
        if (r === t && e.nodeType === 1) {
            var i = "data-" + n.replace(l, "-$1").toLowerCase();
            r = e.getAttribute(i);
            if (typeof r === "string") {
                try {
                    r = r === "true" ? true : r === "false" ? false : r === "null" ? null : s.isNumeric(r) ? +r : f.test(r) ? s.parseJSON(r) : r
                } catch (o) {}
                s.data(e, n, r)
            } else {
                r = t
            }
        }
        return r
    }

    function h(e) {
        for (var t in e) {
            if (t === "data" && s.isEmptyObject(e[t])) {
                continue
            }
            if (t !== "toJSON") {
                return false
            }
        }
        return true
    }

    function p(e, t, n) {
        var r = t + "defer",
            i = t + "queue",
            o = t + "mark",
            u = s._data(e, r);
        if (u && (n === "queue" || !s._data(e, i)) && (n === "mark" || !s._data(e, o))) {
            setTimeout(function() {
                if (!s._data(e, i) && !s._data(e, o)) {
                    s.removeData(e, r, true);
                    u.fire()
                }
            }, 0)
        }
    }

    function H() {
        return false
    }

    function B() {
        return true
    }

    function W(e) {
        return !e || !e.parentNode || e.parentNode.nodeType === 11
    }

    function X(e, t, n) {
        t = t || 0;
        if (s.isFunction(t)) {
            return s.grep(e, function(e, r) {
                var i = !!t.call(e, r, e);
                return i === n
            })
        } else if (t.nodeType) {
            return s.grep(e, function(e, r) {
                return e === t === n
            })
        } else if (typeof t === "string") {
            var r = s.grep(e, function(e) {
                return e.nodeType === 1
            });
            if (q.test(t)) {
                return s.filter(t, r, !n)
            } else {
                t = s.filter(t, r)
            }
        }
        return s.grep(e, function(e, r) {
            return s.inArray(e, t) >= 0 === n
        })
    }

    function V(e) {
        var t = $.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement) {
            while (t.length) {
                n.createElement(t.pop())
            }
        }
        return n
    }

    function at(e, t) {
        return s.nodeName(e, "table") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function ft(e, t) {
        if (t.nodeType !== 1 || !s.hasData(e)) {
            return
        }
        var n, r, i, o = s._data(e),
            u = s._data(t, o),
            a = o.events;
        if (a) {
            delete u.handle;
            u.events = {};
            for (n in a) {
                for (r = 0, i = a[n].length; r < i; r++) {
                    s.event.add(t, n, a[n][r])
                }
            }
        }
        if (u.data) {
            u.data = s.extend({}, u.data)
        }
    }

    function lt(e, t) {
        var n;
        if (t.nodeType !== 1) {
            return
        }
        if (t.clearAttributes) {
            t.clearAttributes()
        }
        if (t.mergeAttributes) {
            t.mergeAttributes(e)
        }
        n = t.nodeName.toLowerCase();
        if (n === "object") {
            t.outerHTML = e.outerHTML
        } else if (n === "input" && (e.type === "checkbox" || e.type === "radio")) {
            if (e.checked) {
                t.defaultChecked = t.checked = e.checked
            }
            if (t.value !== e.value) {
                t.value = e.value
            }
        } else if (n === "option") {
            t.selected = e.defaultSelected
        } else if (n === "input" || n === "textarea") {
            t.defaultValue = e.defaultValue
        } else if (n === "script" && t.text !== e.text) {
            t.text = e.text
        }
        t.removeAttribute(s.expando);
        t.removeAttribute("_submit_attached");
        t.removeAttribute("_change_attached")
    }

    function ct(e) {
        if (typeof e.getElementsByTagName !== "undefined") {
            return e.getElementsByTagName("*")
        } else if (typeof e.querySelectorAll !== "undefined") {
            return e.querySelectorAll("*")
        } else {
            return []
        }
    }

    function ht(e) {
        if (e.type === "checkbox" || e.type === "radio") {
            e.defaultChecked = e.checked
        }
    }

    function pt(e) {
        var t = (e.nodeName || "").toLowerCase();
        if (t === "input") {
            ht(e)
        } else if (t !== "script" && typeof e.getElementsByTagName !== "undefined") {
            s.grep(e.getElementsByTagName("input"), ht)
        }
    }

    function dt(e) {
        var t = n.createElement("div");
        ut.appendChild(t);
        t.innerHTML = e.outerHTML;
        return t.firstChild
    }

    function kt(e, t, n) {
        var r = t === "width" ? e.offsetWidth : e.offsetHeight,
            i = t === "width" ? 1 : 0,
            o = 4;
        if (r > 0) {
            if (n !== "border") {
                for (; i < o; i += 2) {
                    if (!n) {
                        r -= parseFloat(s.css(e, "padding" + xt[i])) || 0
                    }
                    if (n === "margin") {
                        r += parseFloat(s.css(e, n + xt[i])) || 0
                    } else {
                        r -= parseFloat(s.css(e, "border" + xt[i] + "Width")) || 0
                    }
                }
            }
            return r + "px"
        }
        r = Tt(e, t);
        if (r < 0 || r == null) {
            r = e.style[t]
        }
        if (bt.test(r)) {
            return r
        }
        r = parseFloat(r) || 0;
        if (n) {
            for (; i < o; i += 2) {
                r += parseFloat(s.css(e, "padding" + xt[i])) || 0;
                if (n !== "padding") {
                    r += parseFloat(s.css(e, "border" + xt[i] + "Width")) || 0
                }
                if (n === "margin") {
                    r += parseFloat(s.css(e, n + xt[i])) || 0
                }
            }
        }
        return r + "px"
    }

    function Qt(e) {
        return function(t, n) {
            if (typeof t !== "string") {
                n = t;
                t = "*"
            }
            if (s.isFunction(n)) {
                var r = t.toLowerCase().split(qt),
                    i = 0,
                    o = r.length,
                    u, a, f;
                for (; i < o; i++) {
                    u = r[i];
                    f = /^\+/.test(u);
                    if (f) {
                        u = u.substr(1) || "*"
                    }
                    a = e[u] = e[u] || [];
                    a[f ? "unshift" : "push"](n)
                }
            }
        }
    }

    function Gt(e, n, r, i, s, o) {
        s = s || n.dataTypes[0];
        o = o || {};
        o[s] = true;
        var u = e[s],
            a = 0,
            f = u ? u.length : 0,
            l = e === Wt,
            c;
        for (; a < f && (l || !c); a++) {
            c = u[a](n, r, i);
            if (typeof c === "string") {
                if (!l || o[c]) {
                    c = t
                } else {
                    n.dataTypes.unshift(c);
                    c = Gt(e, n, r, i, c, o)
                }
            }
        }
        if ((l || !c) && !o["*"]) {
            c = Gt(e, n, r, i, "*", o)
        }
        return c
    }

    function Yt(e, n) {
        var r, i, o = s.ajaxSettings.flatOptions || {};
        for (r in n) {
            if (n[r] !== t) {
                (o[r] ? e : i || (i = {}))[r] = n[r]
            }
        }
        if (i) {
            s.extend(true, e, i)
        }
    }

    function Zt(e, t, n, r) {
        if (s.isArray(t)) {
            s.each(t, function(t, i) {
                if (n || At.test(e)) {
                    r(e, i)
                } else {
                    Zt(e + "[" + (typeof i === "object" ? t : "") + "]", i, n, r)
                }
            })
        } else if (!n && s.type(t) === "object") {
            for (var i in t) {
                Zt(e + "[" + i + "]", t[i], n, r)
            }
        } else {
            r(e, t)
        }
    }

    function en(e, n, r) {
        var i = e.contents,
            s = e.dataTypes,
            o = e.responseFields,
            u, a, f, l;
        for (a in o) {
            if (a in r) {
                n[o[a]] = r[a]
            }
        }
        while (s[0] === "*") {
            s.shift();
            if (u === t) {
                u = e.mimeType || n.getResponseHeader("content-type")
            }
        }
        if (u) {
            for (a in i) {
                if (i[a] && i[a].test(u)) {
                    s.unshift(a);
                    break
                }
            }
        }
        if (s[0] in r) {
            f = s[0]
        } else {
            for (a in r) {
                if (!s[0] || e.converters[a + " " + s[0]]) {
                    f = a;
                    break
                }
                if (!l) {
                    l = a
                }
            }
            f = f || l
        }
        if (f) {
            if (f !== s[0]) {
                s.unshift(f)
            }
            return r[f]
        }
    }

    function tn(e, n) {
        if (e.dataFilter) {
            n = e.dataFilter(n, e.dataType)
        }
        var r = e.dataTypes,
            i = {},
            o, u, a = r.length,
            f, l = r[0],
            c, h, p, d, v;
        for (o = 1; o < a; o++) {
            if (o === 1) {
                for (u in e.converters) {
                    if (typeof u === "string") {
                        i[u.toLowerCase()] = e.converters[u]
                    }
                }
            }
            c = l;
            l = r[o];
            if (l === "*") {
                l = c
            } else if (c !== "*" && c !== l) {
                h = c + " " + l;
                p = i[h] || i["* " + l];
                if (!p) {
                    v = t;
                    for (d in i) {
                        f = d.split(" ");
                        if (f[0] === c || f[0] === "*") {
                            v = i[f[1] + " " + l];
                            if (v) {
                                d = i[d];
                                if (d === true) {
                                    p = v
                                } else if (v === true) {
                                    p = d
                                }
                                break
                            }
                        }
                    }
                }
                if (!(p || v)) {
                    s.error("No conversion from " + h.replace(" ", " to "))
                }
                if (p !== true) {
                    n = p ? p(n) : v(d(n))
                }
            }
        }
        return n
    }

    function an() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }

    function fn() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function yn() {
        setTimeout(bn, 0);
        return gn = s.now()
    }

    function bn() {
        gn = t
    }

    function wn(e, t) {
        var n = {};
        s.each(mn.concat.apply([], mn.slice(0, t)), function() {
            n[this] = e
        });
        return n
    }

    function En(e) {
        if (!ln[e]) {
            var t = n.body,
                r = s("<" + e + ">").appendTo(t),
                i = r.css("display");
            r.remove();
            if (i === "none" || i === "") {
                if (!cn) {
                    cn = n.createElement("iframe");
                    cn.frameBorder = cn.width = cn.height = 0
                }
                t.appendChild(cn);
                if (!hn || !cn.createElement) {
                    hn = (cn.contentWindow || cn.contentDocument).document;
                    hn.write((s.support.boxModel ? "<!doctype html>" : "") + "<html><body>");
                    hn.close()
                }
                r = hn.createElement(e);
                hn.body.appendChild(r);
                i = s.css(r, "display");
                t.removeChild(cn)
            }
            ln[e] = i
        }
        return ln[e]
    }

    function Nn(e) {
        return s.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : false
    }
    var n = e.document,
        r = e.navigator,
        i = e.location;
    var s = function() {
        function H() {
            if (i.isReady) {
                return
            }
            try {
                n.documentElement.doScroll("left")
            } catch (e) {
                setTimeout(H, 1);
                return
            }
            i.ready()
        }
        var i = function(e, t) {
                return new i.fn.init(e, t, u)
            },
            s = e.jQuery,
            o = e.$,
            u, a = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
            f = /\S/,
            l = /^\s+/,
            c = /\s+$/,
            h = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
            p = /^[\],:{}\s]*$/,
            d = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            v = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            m = /(?:^|:|,)(?:\s*\[)+/g,
            g = /(webkit)[ \/]([\w.]+)/,
            y = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            b = /(msie) ([\w.]+)/,
            w = /(mozilla)(?:.*? rv:([\w.]+))?/,
            E = /-([a-z]|[0-9])/ig,
            S = /^-ms-/,
            x = function(e, t) {
                return (t + "").toUpperCase()
            },
            T = r.userAgent,
            N, C, k, L = Object.prototype.toString,
            A = Object.prototype.hasOwnProperty,
            O = Array.prototype.push,
            M = Array.prototype.slice,
            _ = String.prototype.trim,
            D = Array.prototype.indexOf,
            P = {};
        i.fn = i.prototype = {
            constructor: i,
            init: function(e, r, s) {
                var o, u, f, l;
                if (!e) {
                    return this
                }
                if (e.nodeType) {
                    this.context = this[0] = e;
                    this.length = 1;
                    return this
                }
                if (e === "body" && !r && n.body) {
                    this.context = n;
                    this[0] = n.body;
                    this.selector = e;
                    this.length = 1;
                    return this
                }
                if (typeof e === "string") {
                    if (e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3) {
                        o = [null, e, null]
                    } else {
                        o = a.exec(e)
                    }
                    if (o && (o[1] || !r)) {
                        if (o[1]) {
                            r = r instanceof i ? r[0] : r;
                            l = r ? r.ownerDocument || r : n;
                            f = h.exec(e);
                            if (f) {
                                if (i.isPlainObject(r)) {
                                    e = [n.createElement(f[1])];
                                    i.fn.attr.call(e, r, true)
                                } else {
                                    e = [l.createElement(f[1])]
                                }
                            } else {
                                f = i.buildFragment([o[1]], [l]);
                                e = (f.cacheable ? i.clone(f.fragment) : f.fragment).childNodes
                            }
                            return i.merge(this, e)
                        } else {
                            u = n.getElementById(o[2]);
                            if (u && u.parentNode) {
                                if (u.id !== o[2]) {
                                    return s.find(e)
                                }
                                this.length = 1;
                                this[0] = u
                            }
                            this.context = n;
                            this.selector = e;
                            return this
                        }
                    } else if (!r || r.jquery) {
                        return (r || s).find(e)
                    } else {
                        return this.constructor(r).find(e)
                    }
                } else if (i.isFunction(e)) {
                    return s.ready(e)
                }
                if (e.selector !== t) {
                    this.selector = e.selector;
                    this.context = e.context
                }
                return i.makeArray(e, this)
            },
            selector: "",
            jquery: "1.7.2",
            length: 0,
            size: function() {
                return this.length
            },
            toArray: function() {
                return M.call(this, 0)
            },
            get: function(e) {
                return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
            },
            pushStack: function(e, t, n) {
                var r = this.constructor();
                if (i.isArray(e)) {
                    O.apply(r, e)
                } else {
                    i.merge(r, e)
                }
                r.prevObject = this;
                r.context = this.context;
                if (t === "find") {
                    r.selector = this.selector + (this.selector ? " " : "") + n
                } else if (t) {
                    r.selector = this.selector + "." + t + "(" + n + ")"
                }
                return r
            },
            each: function(e, t) {
                return i.each(this, e, t)
            },
            ready: function(e) {
                i.bindReady();
                C.add(e);
                return this
            },
            eq: function(e) {
                e = +e;
                return e === -1 ? this.slice(e) : this.slice(e, e + 1)
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            slice: function() {
                return this.pushStack(M.apply(this, arguments), "slice", M.call(arguments).join(","))
            },
            map: function(e) {
                return this.pushStack(i.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: O,
            sort: [].sort,
            splice: [].splice
        };
        i.fn.init.prototype = i.fn;
        i.extend = i.fn.extend = function() {
            var e, n, r, s, o, u, a = arguments[0] || {},
                f = 1,
                l = arguments.length,
                c = false;
            if (typeof a === "boolean") {
                c = a;
                a = arguments[1] || {};
                f = 2
            }
            if (typeof a !== "object" && !i.isFunction(a)) {
                a = {}
            }
            if (l === f) {
                a = this;
                --f
            }
            for (; f < l; f++) {
                if ((e = arguments[f]) != null) {
                    for (n in e) {
                        r = a[n];
                        s = e[n];
                        if (a === s) {
                            continue
                        }
                        if (c && s && (i.isPlainObject(s) || (o = i.isArray(s)))) {
                            if (o) {
                                o = false;
                                u = r && i.isArray(r) ? r : []
                            } else {
                                u = r && i.isPlainObject(r) ? r : {}
                            }
                            a[n] = i.extend(c, u, s)
                        } else if (s !== t) {
                            a[n] = s
                        }
                    }
                }
            }
            return a
        };
        i.extend({
            noConflict: function(t) {
                if (e.$ === i) {
                    e.$ = o
                }
                if (t && e.jQuery === i) {
                    e.jQuery = s
                }
                return i
            },
            isReady: false,
            readyWait: 1,
            holdReady: function(e) {
                if (e) {
                    i.readyWait++
                } else {
                    i.ready(true)
                }
            },
            ready: function(e) {
                if (e === true && !--i.readyWait || e !== true && !i.isReady) {
                    if (!n.body) {
                        return setTimeout(i.ready, 1)
                    }
                    i.isReady = true;
                    if (e !== true && --i.readyWait > 0) {
                        return
                    }
                    C.fireWith(n, [i]);
                    if (i.fn.trigger) {
                        i(n).trigger("ready").off("ready")
                    }
                }
            },
            bindReady: function() {
                if (C) {
                    return
                }
                C = i.Callbacks("once memory");
                if (n.readyState === "complete") {
                    return setTimeout(i.ready, 1)
                }
                if (n.addEventListener) {
                    n.addEventListener("DOMContentLoaded", k, false);
                    e.addEventListener("load", i.ready, false)
                } else if (n.attachEvent) {
                    n.attachEvent("onreadystatechange", k);
                    e.attachEvent("onload", i.ready);
                    var t = false;
                    try {
                        t = e.frameElement == null
                    } catch (r) {}
                    if (n.documentElement.doScroll && t) {
                        H()
                    }
                }
            },
            isFunction: function(e) {
                return i.type(e) === "function"
            },
            isArray: Array.isArray || function(e) {
                return i.type(e) === "array"
            },
            isWindow: function(e) {
                return e != null && e == e.window
            },
            isNumeric: function(e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            type: function(e) {
                return e == null ? String(e) : P[L.call(e)] || "object"
            },
            isPlainObject: function(e) {
                if (!e || i.type(e) !== "object" || e.nodeType || i.isWindow(e)) {
                    return false
                }
                try {
                    if (e.constructor && !A.call(e, "constructor") && !A.call(e.constructor.prototype, "isPrototypeOf")) {
                        return false
                    }
                } catch (n) {
                    return false
                }
                var r;
                for (r in e) {}
                return r === t || A.call(e, r)
            },
            isEmptyObject: function(e) {
                for (var t in e) {
                    return false
                }
                return true
            },
            error: function(e) {
                throw new Error(e)
            },
            parseJSON: function(t) {
                if (typeof t !== "string" || !t) {
                    return null
                }
                t = i.trim(t);
                if (e.JSON && e.JSON.parse) {
                    return e.JSON.parse(t)
                }
                if (p.test(t.replace(d, "@").replace(v, "]").replace(m, ""))) {
                    return (new Function("return " + t))()
                }
                i.error("Invalid JSON: " + t)
            },
            parseXML: function(n) {
                if (typeof n !== "string" || !n) {
                    return null
                }
                var r, s;
                try {
                    if (e.DOMParser) {
                        s = new DOMParser;
                        r = s.parseFromString(n, "text/xml")
                    } else {
                        r = new ActiveXObject("Microsoft.XMLDOM");
                        r.async = "false";
                        r.loadXML(n)
                    }
                } catch (o) {
                    r = t
                }
                if (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) {
                    i.error("Invalid XML: " + n)
                }
                return r
            },
            noop: function() {},
            globalEval: function(t) {
                if (t && f.test(t)) {
                    (e.execScript || function(t) {
                        e["eval"].call(e, t)
                    })(t)
                }
            },
            camelCase: function(e) {
                return e.replace(S, "ms-").replace(E, x)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
            },
            each: function(e, n, r) {
                var s, o = 0,
                    u = e.length,
                    a = u === t || i.isFunction(e);
                if (r) {
                    if (a) {
                        for (s in e) {
                            if (n.apply(e[s], r) === false) {
                                break
                            }
                        }
                    } else {
                        for (; o < u;) {
                            if (n.apply(e[o++], r) === false) {
                                break
                            }
                        }
                    }
                } else {
                    if (a) {
                        for (s in e) {
                            if (n.call(e[s], s, e[s]) === false) {
                                break
                            }
                        }
                    } else {
                        for (; o < u;) {
                            if (n.call(e[o], o, e[o++]) === false) {
                                break
                            }
                        }
                    }
                }
                return e
            },
            trim: _ ? function(e) {
                return e == null ? "" : _.call(e)
            } : function(e) {
                return e == null ? "" : e.toString().replace(l, "").replace(c, "")
            },
            makeArray: function(e, t) {
                var n = t || [];
                if (e != null) {
                    var r = i.type(e);
                    if (e.length == null || r === "string" || r === "function" || r === "regexp" || i.isWindow(e)) {
                        O.call(n, e)
                    } else {
                        i.merge(n, e)
                    }
                }
                return n
            },
            inArray: function(e, t, n) {
                var r;
                if (t) {
                    if (D) {
                        return D.call(t, e, n)
                    }
                    r = t.length;
                    n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
                    for (; n < r; n++) {
                        if (n in t && t[n] === e) {
                            return n
                        }
                    }
                }
                return -1
            },
            merge: function(e, n) {
                var r = e.length,
                    i = 0;
                if (typeof n.length === "number") {
                    for (var s = n.length; i < s; i++) {
                        e[r++] = n[i]
                    }
                } else {
                    while (n[i] !== t) {
                        e[r++] = n[i++]
                    }
                }
                e.length = r;
                return e
            },
            grep: function(e, t, n) {
                var r = [],
                    i;
                n = !!n;
                for (var s = 0, o = e.length; s < o; s++) {
                    i = !!t(e[s], s);
                    if (n !== i) {
                        r.push(e[s])
                    }
                }
                return r
            },
            map: function(e, n, r) {
                var s, o, u = [],
                    a = 0,
                    f = e.length,
                    l = e instanceof i || f !== t && typeof f === "number" && (f > 0 && e[0] && e[f - 1] || f === 0 || i.isArray(e));
                if (l) {
                    for (; a < f; a++) {
                        s = n(e[a], a, r);
                        if (s != null) {
                            u[u.length] = s
                        }
                    }
                } else {
                    for (o in e) {
                        s = n(e[o], o, r);
                        if (s != null) {
                            u[u.length] = s
                        }
                    }
                }
                return u.concat.apply([], u)
            },
            guid: 1,
            proxy: function(e, n) {
                if (typeof n === "string") {
                    var r = e[n];
                    n = e;
                    e = r
                }
                if (!i.isFunction(e)) {
                    return t
                }
                var s = M.call(arguments, 2),
                    o = function() {
                        return e.apply(n, s.concat(M.call(arguments)))
                    };
                o.guid = e.guid = e.guid || o.guid || i.guid++;
                return o
            },
            access: function(e, n, r, s, o, u, a) {
                var f, l = r == null,
                    c = 0,
                    h = e.length;
                if (r && typeof r === "object") {
                    for (c in r) {
                        i.access(e, n, c, r[c], 1, u, s)
                    }
                    o = 1
                } else if (s !== t) {
                    f = a === t && i.isFunction(s);
                    if (l) {
                        if (f) {
                            f = n;
                            n = function(e, t, n) {
                                return f.call(i(e), n)
                            }
                        } else {
                            n.call(e, s);
                            n = null
                        }
                    }
                    if (n) {
                        for (; c < h; c++) {
                            n(e[c], r, f ? s.call(e[c], c, n(e[c], r)) : s, a)
                        }
                    }
                    o = 1
                }
                return o ? e : l ? n.call(e) : h ? n(e[0], r) : u
            },
            now: function() {
                return (new Date).getTime()
            },
            uaMatch: function(e) {
                e = e.toLowerCase();
                var t = g.exec(e) || y.exec(e) || b.exec(e) || e.indexOf("compatible") < 0 && w.exec(e) || [];
                return {
                    browser: t[1] || "",
                    version: t[2] || "0"
                }
            },
            sub: function() {
                function e(t, n) {
                    return new e.fn.init(t, n)
                }
                i.extend(true, e, this);
                e.superclass = this;
                e.fn = e.prototype = this();
                e.fn.constructor = e;
                e.sub = this.sub;
                e.fn.init = function(r, s) {
                    if (s && s instanceof i && !(s instanceof e)) {
                        s = e(s)
                    }
                    return i.fn.init.call(this, r, s, t)
                };
                e.fn.init.prototype = e.fn;
                var t = e(n);
                return e
            },
            browser: {}
        });
        i.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
            P["[object " + t + "]"] = t.toLowerCase()
        });
        N = i.uaMatch(T);
        if (N.browser) {
            i.browser[N.browser] = true;
            i.browser.version = N.version
        }
        if (i.browser.webkit) {
            i.browser.safari = true
        }
        if (f.test(" ")) {
            l = /^[\s\xA0]+/;
            c = /[\s\xA0]+$/
        }
        u = i(n);
        if (n.addEventListener) {
            k = function() {
                n.removeEventListener("DOMContentLoaded", k, false);
                i.ready()
            }
        } else if (n.attachEvent) {
            k = function() {
                if (n.readyState === "complete") {
                    n.detachEvent("onreadystatechange", k);
                    i.ready()
                }
            }
        }
        return i
    }();
    var o = {};
    s.Callbacks = function(e) {
        e = e ? o[e] || u(e) : {};
        var n = [],
            r = [],
            i, a, f, l, c, h, p = function(t) {
                var r, i, o, u, a;
                for (r = 0, i = t.length; r < i; r++) {
                    o = t[r];
                    u = s.type(o);
                    if (u === "array") {
                        p(o)
                    } else if (u === "function") {
                        if (!e.unique || !v.has(o)) {
                            n.push(o)
                        }
                    }
                }
            },
            d = function(t, s) {
                s = s || [];
                i = !e.memory || [t, s];
                a = true;
                f = true;
                h = l || 0;
                l = 0;
                c = n.length;
                for (; n && h < c; h++) {
                    if (n[h].apply(t, s) === false && e.stopOnFalse) {
                        i = true;
                        break
                    }
                }
                f = false;
                if (n) {
                    if (!e.once) {
                        if (r && r.length) {
                            i = r.shift();
                            v.fireWith(i[0], i[1])
                        }
                    } else if (i === true) {
                        v.disable()
                    } else {
                        n = []
                    }
                }
            },
            v = {
                add: function() {
                    if (n) {
                        var e = n.length;
                        p(arguments);
                        if (f) {
                            c = n.length
                        } else if (i && i !== true) {
                            l = e;
                            d(i[0], i[1])
                        }
                    }
                    return this
                },
                remove: function() {
                    if (n) {
                        var t = arguments,
                            r = 0,
                            i = t.length;
                        for (; r < i; r++) {
                            for (var s = 0; s < n.length; s++) {
                                if (t[r] === n[s]) {
                                    if (f) {
                                        if (s <= c) {
                                            c--;
                                            if (s <= h) {
                                                h--
                                            }
                                        }
                                    }
                                    n.splice(s--, 1);
                                    if (e.unique) {
                                        break
                                    }
                                }
                            }
                        }
                    }
                    return this
                },
                has: function(e) {
                    if (n) {
                        var t = 0,
                            r = n.length;
                        for (; t < r; t++) {
                            if (e === n[t]) {
                                return true
                            }
                        }
                    }
                    return false
                },
                empty: function() {
                    n = [];
                    return this
                },
                disable: function() {
                    n = r = i = t;
                    return this
                },
                disabled: function() {
                    return !n
                },
                lock: function() {
                    r = t;
                    if (!i || i === true) {
                        v.disable()
                    }
                    return this
                },
                locked: function() {
                    return !r
                },
                fireWith: function(t, n) {
                    if (r) {
                        if (f) {
                            if (!e.once) {
                                r.push([t, n])
                            }
                        } else if (!(e.once && i)) {
                            d(t, n)
                        }
                    }
                    return this
                },
                fire: function() {
                    v.fireWith(this, arguments);
                    return this
                },
                fired: function() {
                    return !!a
                }
            };
        return v
    };
    var a = [].slice;
    s.extend({
        Deferred: function(e) {
            var t = s.Callbacks("once memory"),
                n = s.Callbacks("once memory"),
                r = s.Callbacks("memory"),
                i = "pending",
                o = {
                    resolve: t,
                    reject: n,
                    notify: r
                },
                u = {
                    done: t.add,
                    fail: n.add,
                    progress: r.add,
                    state: function() {
                        return i
                    },
                    isResolved: t.fired,
                    isRejected: n.fired,
                    then: function(e, t, n) {
                        a.done(e).fail(t).progress(n);
                        return this
                    },
                    always: function() {
                        a.done.apply(a, arguments).fail.apply(a, arguments);
                        return this
                    },
                    pipe: function(e, t, n) {
                        return s.Deferred(function(r) {
                            s.each({
                                done: [e, "resolve"],
                                fail: [t, "reject"],
                                progress: [n, "notify"]
                            }, function(e, t) {
                                var n = t[0],
                                    i = t[1],
                                    o;
                                if (s.isFunction(n)) {
                                    a[e](function() {
                                        o = n.apply(this, arguments);
                                        if (o && s.isFunction(o.promise)) {
                                            o.promise().then(r.resolve, r.reject, r.notify)
                                        } else {
                                            r[i + "With"](this === a ? r : this, [o])
                                        }
                                    })
                                } else {
                                    a[e](r[i])
                                }
                            })
                        }).promise()
                    },
                    promise: function(e) {
                        if (e == null) {
                            e = u
                        } else {
                            for (var t in u) {
                                e[t] = u[t]
                            }
                        }
                        return e
                    }
                },
                a = u.promise({}),
                f;
            for (f in o) {
                a[f] = o[f].fire;
                a[f + "With"] = o[f].fireWith
            }
            a.done(function() {
                i = "resolved"
            }, n.disable, r.lock).fail(function() {
                i = "rejected"
            }, t.disable, r.lock);
            if (e) {
                e.call(a, a)
            }
            return a
        },
        when: function(e) {
            function c(e) {
                return function(n) {
                    t[e] = arguments.length > 1 ? a.call(arguments, 0) : n;
                    if (!--o) {
                        f.resolveWith(f, t)
                    }
                }
            }

            function h(e) {
                return function(t) {
                    i[e] = arguments.length > 1 ? a.call(arguments, 0) : t;
                    f.notifyWith(l, i)
                }
            }
            var t = a.call(arguments, 0),
                n = 0,
                r = t.length,
                i = new Array(r),
                o = r,
                u = r,
                f = r <= 1 && e && s.isFunction(e.promise) ? e : s.Deferred(),
                l = f.promise();
            if (r > 1) {
                for (; n < r; n++) {
                    if (t[n] && t[n].promise && s.isFunction(t[n].promise)) {
                        t[n].promise().then(c(n), f.reject, h(n))
                    } else {
                        --o
                    }
                }
                if (!o) {
                    f.resolveWith(f, t)
                }
            } else if (f !== e) {
                f.resolveWith(f, r ? [e] : [])
            }
            return l
        }
    });
    s.support = function() {
        var t, r, i, o, u, a, f, l, c, h, p, d, v = n.createElement("div"),
            m = n.documentElement;
        v.setAttribute("className", "t");
        v.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        r = v.getElementsByTagName("*");
        i = v.getElementsByTagName("a")[0];
        if (!r || !r.length || !i) {
            return {}
        }
        o = n.createElement("select");
        u = o.appendChild(n.createElement("option"));
        a = v.getElementsByTagName("input")[0];
        t = {
            leadingWhitespace: v.firstChild.nodeType === 3,
            tbody: !v.getElementsByTagName("tbody").length,
            htmlSerialize: !!v.getElementsByTagName("link").length,
            style: /top/.test(i.getAttribute("style")),
            hrefNormalized: i.getAttribute("href") === "/a",
            opacity: /^0.55/.test(i.style.opacity),
            cssFloat: !!i.style.cssFloat,
            checkOn: a.value === "on",
            optSelected: u.selected,
            getSetAttribute: v.className !== "t",
            enctype: !!n.createElement("form").enctype,
            html5Clone: n.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",
            submitBubbles: true,
            changeBubbles: true,
            focusinBubbles: false,
            deleteExpando: true,
            noCloneEvent: true,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableMarginRight: true,
            pixelMargin: true
        };
        s.boxModel = t.boxModel = n.compatMode === "CSS1Compat";
        a.checked = true;
        t.noCloneChecked = a.cloneNode(true).checked;
        o.disabled = true;
        t.optDisabled = !u.disabled;
        try {
            delete v.test
        } catch (g) {
            t.deleteExpando = false
        }
        if (!v.addEventListener && v.attachEvent && v.fireEvent) {
            v.attachEvent("onclick", function() {
                t.noCloneEvent = false
            });
            v.cloneNode(true).fireEvent("onclick")
        }
        a = n.createElement("input");
        a.value = "t";
        a.setAttribute("type", "radio");
        t.radioValue = a.value === "t";
        a.setAttribute("checked", "checked");
        a.setAttribute("name", "t");
        v.appendChild(a);
        f = n.createDocumentFragment();
        f.appendChild(v.lastChild);
        t.checkClone = f.cloneNode(true).cloneNode(true).lastChild.checked;
        t.appendChecked = a.checked;
        f.removeChild(a);
        f.appendChild(v);
        if (v.attachEvent) {
            for (p in {
                    submit: 1,
                    change: 1,
                    focusin: 1
                }) {
                h = "on" + p;
                d = h in v;
                if (!d) {
                    v.setAttribute(h, "return;");
                    d = typeof v[h] === "function"
                }
                t[p + "Bubbles"] = d
            }
        }
        f.removeChild(v);
        f = o = u = v = a = null;
        s(function() {
            var r, i, o, u, a, f, c, h, p, m, g, y, b, w = n.getElementsByTagName("body")[0];
            if (!w) {
                return
            }
            h = 1;
            b = "padding:0;margin:0;border:";
            g = "position:absolute;top:0;left:0;width:1px;height:1px;";
            y = b + "0;visibility:hidden;";
            p = "style='" + g + b + "5px solid #000;";
            m = "<div " + p + "display:block;'><div style='" + b + "0;display:block;overflow:hidden;'></div></div>" + "<table " + p + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>";
            r = n.createElement("div");
            r.style.cssText = y + "width:0;height:0;position:static;top:0;margin-top:" + h + "px";
            w.insertBefore(r, w.firstChild);
            v = n.createElement("div");
            r.appendChild(v);
            v.innerHTML = "<table><tr><td style='" + b + "0;display:none'></td><td>t</td></tr></table>";
            l = v.getElementsByTagName("td");
            d = l[0].offsetHeight === 0;
            l[0].style.display = "";
            l[1].style.display = "none";
            t.reliableHiddenOffsets = d && l[0].offsetHeight === 0;
            if (e.getComputedStyle) {
                v.innerHTML = "";
                c = n.createElement("div");
                c.style.width = "0";
                c.style.marginRight = "0";
                v.style.width = "2px";
                v.appendChild(c);
                t.reliableMarginRight = (parseInt((e.getComputedStyle(c, null) || {
                    marginRight: 0
                }).marginRight, 10) || 0) === 0
            }
            if (typeof v.style.zoom !== "undefined") {
                v.innerHTML = "";
                v.style.width = v.style.padding = "1px";
                v.style.border = 0;
                v.style.overflow = "hidden";
                v.style.display = "inline";
                v.style.zoom = 1;
                t.inlineBlockNeedsLayout = v.offsetWidth === 3;
                v.style.display = "block";
                v.style.overflow = "visible";
                v.innerHTML = "<div style='width:5px;'></div>";
                t.shrinkWrapBlocks = v.offsetWidth !== 3
            }
            v.style.cssText = g + y;
            v.innerHTML = m;
            i = v.firstChild;
            o = i.firstChild;
            a = i.nextSibling.firstChild.firstChild;
            f = {
                doesNotAddBorder: o.offsetTop !== 5,
                doesAddBorderForTableAndCells: a.offsetTop === 5
            };
            o.style.position = "fixed";
            o.style.top = "20px";
            f.fixedPosition = o.offsetTop === 20 || o.offsetTop === 15;
            o.style.position = o.style.top = "";
            i.style.overflow = "hidden";
            i.style.position = "relative";
            f.subtractsBorderForOverflowNotVisible = o.offsetTop === -5;
            f.doesNotIncludeMarginInBodyOffset = w.offsetTop !== h;
            if (e.getComputedStyle) {
                v.style.marginTop = "1%";
                t.pixelMargin = (e.getComputedStyle(v, null) || {
                    marginTop: 0
                }).marginTop !== "1%"
            }
            if (typeof r.style.zoom !== "undefined") {
                r.style.zoom = 1
            }
            w.removeChild(r);
            c = v = r = null;
            s.extend(t, f)
        });
        return t
    }();
    var f = /^(?:\{.*\}|\[.*\])$/,
        l = /([A-Z])/g;
    s.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (s.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: true,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: true
        },
        hasData: function(e) {
            e = e.nodeType ? s.cache[e[s.expando]] : e[s.expando];
            return !!e && !h(e)
        },
        data: function(e, n, r, i) {
            if (!s.acceptData(e)) {
                return
            }
            var o, u, a, f = s.expando,
                l = typeof n === "string",
                c = e.nodeType,
                h = c ? s.cache : e,
                p = c ? e[f] : e[f] && f,
                d = n === "events";
            if ((!p || !h[p] || !d && !i && !h[p].data) && l && r === t) {
                return
            }
            if (!p) {
                if (c) {
                    e[f] = p = ++s.uuid
                } else {
                    p = f
                }
            }
            if (!h[p]) {
                h[p] = {};
                if (!c) {
                    h[p].toJSON = s.noop
                }
            }
            if (typeof n === "object" || typeof n === "function") {
                if (i) {
                    h[p] = s.extend(h[p], n)
                } else {
                    h[p].data = s.extend(h[p].data, n)
                }
            }
            o = u = h[p];
            if (!i) {
                if (!u.data) {
                    u.data = {}
                }
                u = u.data
            }
            if (r !== t) {
                u[s.camelCase(n)] = r
            }
            if (d && !u[n]) {
                return o.events
            }
            if (l) {
                a = u[n];
                if (a == null) {
                    a = u[s.camelCase(n)]
                }
            } else {
                a = u
            }
            return a
        },
        removeData: function(e, t, n) {
            if (!s.acceptData(e)) {
                return
            }
            var r, i, o, u = s.expando,
                a = e.nodeType,
                f = a ? s.cache : e,
                l = a ? e[u] : u;
            if (!f[l]) {
                return
            }
            if (t) {
                r = n ? f[l] : f[l].data;
                if (r) {
                    if (!s.isArray(t)) {
                        if (t in r) {
                            t = [t]
                        } else {
                            t = s.camelCase(t);
                            if (t in r) {
                                t = [t]
                            } else {
                                t = t.split(" ")
                            }
                        }
                    }
                    for (i = 0, o = t.length; i < o; i++) {
                        delete r[t[i]]
                    }
                    if (!(n ? h : s.isEmptyObject)(r)) {
                        return
                    }
                }
            }
            if (!n) {
                delete f[l].data;
                if (!h(f[l])) {
                    return
                }
            }
            if (s.support.deleteExpando || !f.setInterval) {
                delete f[l]
            } else {
                f[l] = null
            }
            if (a) {
                if (s.support.deleteExpando) {
                    delete e[u]
                } else if (e.removeAttribute) {
                    e.removeAttribute(u)
                } else {
                    e[u] = null
                }
            }
        },
        _data: function(e, t, n) {
            return s.data(e, t, n, true)
        },
        acceptData: function(e) {
            if (e.nodeName) {
                var t = s.noData[e.nodeName.toLowerCase()];
                if (t) {
                    return !(t === true || e.getAttribute("classid") !== t)
                }
            }
            return true
        }
    });
    s.fn.extend({
        data: function(e, n) {
            var r, i, o, u, a, f = this[0],
                l = 0,
                h = null;
            if (e === t) {
                if (this.length) {
                    h = s.data(f);
                    if (f.nodeType === 1 && !s._data(f, "parsedAttrs")) {
                        o = f.attributes;
                        for (a = o.length; l < a; l++) {
                            u = o[l].name;
                            if (u.indexOf("data-") === 0) {
                                u = s.camelCase(u.substring(5));
                                c(f, u, h[u])
                            }
                        }
                        s._data(f, "parsedAttrs", true)
                    }
                }
                return h
            }
            if (typeof e === "object") {
                return this.each(function() {
                    s.data(this, e)
                })
            }
            r = e.split(".", 2);
            r[1] = r[1] ? "." + r[1] : "";
            i = r[1] + "!";
            return s.access(this, function(n) {
                if (n === t) {
                    h = this.triggerHandler("getData" + i, [r[0]]);
                    if (h === t && f) {
                        h = s.data(f, e);
                        h = c(f, e, h)
                    }
                    return h === t && r[1] ? this.data(r[0]) : h
                }
                r[1] = n;
                this.each(function() {
                    var t = s(this);
                    t.triggerHandler("setData" + i, r);
                    s.data(this, e, n);
                    t.triggerHandler("changeData" + i, r)
                })
            }, null, n, arguments.length > 1, null, false)
        },
        removeData: function(e) {
            return this.each(function() {
                s.removeData(this, e)
            })
        }
    });
    s.extend({
        _mark: function(e, t) {
            if (e) {
                t = (t || "fx") + "mark";
                s._data(e, t, (s._data(e, t) || 0) + 1)
            }
        },
        _unmark: function(e, t, n) {
            if (e !== true) {
                n = t;
                t = e;
                e = false
            }
            if (t) {
                n = n || "fx";
                var r = n + "mark",
                    i = e ? 0 : (s._data(t, r) || 1) - 1;
                if (i) {
                    s._data(t, r, i)
                } else {
                    s.removeData(t, r, true);
                    p(t, n, "mark")
                }
            }
        },
        queue: function(e, t, n) {
            var r;
            if (e) {
                t = (t || "fx") + "queue";
                r = s._data(e, t);
                if (n) {
                    if (!r || s.isArray(n)) {
                        r = s._data(e, t, s.makeArray(n))
                    } else {
                        r.push(n)
                    }
                }
                return r || []
            }
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = s.queue(e, t),
                r = n.shift(),
                i = {};
            if (r === "inprogress") {
                r = n.shift()
            }
            if (r) {
                if (t === "fx") {
                    n.unshift("inprogress")
                }
                s._data(e, t + ".run", i);
                r.call(e, function() {
                    s.dequeue(e, t)
                }, i)
            }
            if (!n.length) {
                s.removeData(e, t + "queue " + t + ".run", true);
                p(e, t, "queue")
            }
        }
    });
    s.fn.extend({
        queue: function(e, n) {
            var r = 2;
            if (typeof e !== "string") {
                n = e;
                e = "fx";
                r--
            }
            if (arguments.length < r) {
                return s.queue(this[0], e)
            }
            return n === t ? this : this.each(function() {
                var t = s.queue(this, e, n);
                if (e === "fx" && t[0] !== "inprogress") {
                    s.dequeue(this, e)
                }
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                s.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            e = s.fx ? s.fx.speeds[e] || e : e;
            t = t || "fx";
            return this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, n) {
            function h() {
                if (!--u) {
                    r.resolveWith(i, [i])
                }
            }
            if (typeof e !== "string") {
                n = e;
                e = t
            }
            e = e || "fx";
            var r = s.Deferred(),
                i = this,
                o = i.length,
                u = 1,
                a = e + "defer",
                f = e + "queue",
                l = e + "mark",
                c;
            while (o--) {
                if (c = s.data(i[o], a, t, true) || (s.data(i[o], f, t, true) || s.data(i[o], l, t, true)) && s.data(i[o], a, s.Callbacks("once memory"), true)) {
                    u++;
                    c.add(h)
                }
            }
            h();
            return r.promise(n)
        }
    });
    var d = /[\n\t\r]/g,
        v = /\s+/,
        m = /\r/g,
        g = /^(?:button|input)$/i,
        y = /^(?:button|input|object|select|textarea)$/i,
        b = /^a(?:rea)?$/i,
        w = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        E = s.support.getSetAttribute,
        S, x, T;
    s.fn.extend({
        attr: function(e, t) {
            return s.access(this, s.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                s.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return s.access(this, s.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            e = s.propFix[e] || e;
            return this.each(function() {
                try {
                    this[e] = t;
                    delete this[e]
                } catch (n) {}
            })
        },
        addClass: function(e) {
            var t, n, r, i, o, u, a;
            if (s.isFunction(e)) {
                return this.each(function(t) {
                    s(this).addClass(e.call(this, t, this.className))
                })
            }
            if (e && typeof e === "string") {
                t = e.split(v);
                for (n = 0, r = this.length; n < r; n++) {
                    i = this[n];
                    if (i.nodeType === 1) {
                        if (!i.className && t.length === 1) {
                            i.className = e
                        } else {
                            o = " " + i.className + " ";
                            for (u = 0, a = t.length; u < a; u++) {
                                if (!~o.indexOf(" " + t[u] + " ")) {
                                    o += t[u] + " "
                                }
                            }
                            i.className = s.trim(o)
                        }
                    }
                }
            }
            return this
        },
        removeClass: function(e) {
            var n, r, i, o, u, a, f;
            if (s.isFunction(e)) {
                return this.each(function(t) {
                    s(this).removeClass(e.call(this, t, this.className))
                })
            }
            if (e && typeof e === "string" || e === t) {
                n = (e || "").split(v);
                for (r = 0, i = this.length; r < i; r++) {
                    o = this[r];
                    if (o.nodeType === 1 && o.className) {
                        if (e) {
                            u = (" " + o.className + " ").replace(d, " ");
                            for (a = 0, f = n.length; a < f; a++) {
                                u = u.replace(" " + n[a] + " ", " ")
                            }
                            o.className = s.trim(u)
                        } else {
                            o.className = ""
                        }
                    }
                }
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
                r = typeof t === "boolean";
            if (s.isFunction(e)) {
                return this.each(function(n) {
                    s(this).toggleClass(e.call(this, n, this.className, t), t)
                })
            }
            return this.each(function() {
                if (n === "string") {
                    var i, o = 0,
                        u = s(this),
                        a = t,
                        f = e.split(v);
                    while (i = f[o++]) {
                        a = r ? a : !u.hasClass(i);
                        u[a ? "addClass" : "removeClass"](i)
                    }
                } else if (n === "undefined" || n === "boolean") {
                    if (this.className) {
                        s._data(this, "__className__", this.className)
                    }
                    this.className = this.className || e === false ? "" : s._data(this, "__className__") || ""
                }
            })
        },
        hasClass: function(e) {
            var t = " " + e + " ",
                n = 0,
                r = this.length;
            for (; n < r; n++) {
                if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(d, " ").indexOf(t) > -1) {
                    return true
                }
            }
            return false
        },
        val: function(e) {
            var n, r, i, o = this[0];
            if (!arguments.length) {
                if (o) {
                    n = s.valHooks[o.type] || s.valHooks[o.nodeName.toLowerCase()];
                    if (n && "get" in n && (r = n.get(o, "value")) !== t) {
                        return r
                    }
                    r = o.value;
                    return typeof r === "string" ? r.replace(m, "") : r == null ? "" : r
                }
                return
            }
            i = s.isFunction(e);
            return this.each(function(r) {
                var o = s(this),
                    u;
                if (this.nodeType !== 1) {
                    return
                }
                if (i) {
                    u = e.call(this, r, o.val())
                } else {
                    u = e
                }
                if (u == null) {
                    u = ""
                } else if (typeof u === "number") {
                    u += ""
                } else if (s.isArray(u)) {
                    u = s.map(u, function(e) {
                        return e == null ? "" : e + ""
                    })
                }
                n = s.valHooks[this.type] || s.valHooks[this.nodeName.toLowerCase()];
                if (!n || !("set" in n) || n.set(this, u, "value") === t) {
                    this.value = u
                }
            })
        }
    });
    s.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, i, o = e.selectedIndex,
                        u = [],
                        a = e.options,
                        f = e.type === "select-one";
                    if (o < 0) {
                        return null
                    }
                    n = f ? o : 0;
                    r = f ? o + 1 : a.length;
                    for (; n < r; n++) {
                        i = a[n];
                        if (i.selected && (s.support.optDisabled ? !i.disabled : i.getAttribute("disabled") === null) && (!i.parentNode.disabled || !s.nodeName(i.parentNode, "optgroup"))) {
                            t = s(i).val();
                            if (f) {
                                return t
                            }
                            u.push(t)
                        }
                    }
                    if (f && !u.length && a.length) {
                        return s(a[o]).val()
                    }
                    return u
                },
                set: function(e, t) {
                    var n = s.makeArray(t);
                    s(e).find("option").each(function() {
                        this.selected = s.inArray(s(this).val(), n) >= 0
                    });
                    if (!n.length) {
                        e.selectedIndex = -1
                    }
                    return n
                }
            }
        },
        attrFn: {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true
        },
        attr: function(e, n, r, i) {
            var o, u, a, f = e.nodeType;
            if (!e || f === 3 || f === 8 || f === 2) {
                return
            }
            if (i && n in s.attrFn) {
                return s(e)[n](r)
            }
            if (typeof e.getAttribute === "undefined") {
                return s.prop(e, n, r)
            }
            a = f !== 1 || !s.isXMLDoc(e);
            if (a) {
                n = n.toLowerCase();
                u = s.attrHooks[n] || (w.test(n) ? x : S)
            }
            if (r !== t) {
                if (r === null) {
                    s.removeAttr(e, n);
                    return
                } else if (u && "set" in u && a && (o = u.set(e, r, n)) !== t) {
                    return o
                } else {
                    e.setAttribute(n, "" + r);
                    return r
                }
            } else if (u && "get" in u && a && (o = u.get(e, n)) !== null) {
                return o
            } else {
                o = e.getAttribute(n);
                return o === null ? t : o
            }
        },
        removeAttr: function(e, t) {
            var n, r, i, o, u, a = 0;
            if (t && e.nodeType === 1) {
                r = t.toLowerCase().split(v);
                o = r.length;
                for (; a < o; a++) {
                    i = r[a];
                    if (i) {
                        n = s.propFix[i] || i;
                        u = w.test(i);
                        if (!u) {
                            s.attr(e, i, "")
                        }
                        e.removeAttribute(E ? i : n);
                        if (u && n in e) {
                            e[n] = false
                        }
                    }
                }
            }
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (g.test(e.nodeName) && e.parentNode) {
                        s.error("type property can't be changed")
                    } else if (!s.support.radioValue && t === "radio" && s.nodeName(e, "input")) {
                        var n = e.value;
                        e.setAttribute("type", t);
                        if (n) {
                            e.value = n
                        }
                        return t
                    }
                }
            },
            value: {
                get: function(e, t) {
                    if (S && s.nodeName(e, "button")) {
                        return S.get(e, t)
                    }
                    return t in e ? e.value : null
                },
                set: function(e, t, n) {
                    if (S && s.nodeName(e, "button")) {
                        return S.set(e, t, n)
                    }
                    e.value = t
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(e, n, r) {
            var i, o, u, a = e.nodeType;
            if (!e || a === 3 || a === 8 || a === 2) {
                return
            }
            u = a !== 1 || !s.isXMLDoc(e);
            if (u) {
                n = s.propFix[n] || n;
                o = s.propHooks[n]
            }
            if (r !== t) {
                if (o && "set" in o && (i = o.set(e, r, n)) !== t) {
                    return i
                } else {
                    return e[n] = r
                }
            } else {
                if (o && "get" in o && (i = o.get(e, n)) !== null) {
                    return i
                } else {
                    return e[n]
                }
            }
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : y.test(e.nodeName) || b.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    });
    s.attrHooks.tabindex = s.propHooks.tabIndex;
    x = {
        get: function(e, n) {
            var r, i = s.prop(e, n);
            return i === true || typeof i !== "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== false ? n.toLowerCase() : t
        },
        set: function(e, t, n) {
            var r;
            if (t === false) {
                s.removeAttr(e, n)
            } else {
                r = s.propFix[n] || n;
                if (r in e) {
                    e[r] = true
                }
                e.setAttribute(n, n.toLowerCase())
            }
            return n
        }
    };
    if (!E) {
        T = {
            name: true,
            id: true,
            coords: true
        };
        S = s.valHooks.button = {
            get: function(e, n) {
                var r;
                r = e.getAttributeNode(n);
                return r && (T[n] ? r.nodeValue !== "" : r.specified) ? r.nodeValue : t
            },
            set: function(e, t, r) {
                var i = e.getAttributeNode(r);
                if (!i) {
                    i = n.createAttribute(r);
                    e.setAttributeNode(i)
                }
                return i.nodeValue = t + ""
            }
        };
        s.attrHooks.tabindex.set = S.set;
        s.each(["width", "height"], function(e, t) {
            s.attrHooks[t] = s.extend(s.attrHooks[t], {
                set: function(e, n) {
                    if (n === "") {
                        e.setAttribute(t, "auto");
                        return n
                    }
                }
            })
        });
        s.attrHooks.contenteditable = {
            get: S.get,
            set: function(e, t, n) {
                if (t === "") {
                    t = "false"
                }
                S.set(e, t, n)
            }
        }
    }
    if (!s.support.hrefNormalized) {
        s.each(["href", "src", "width", "height"], function(e, n) {
            s.attrHooks[n] = s.extend(s.attrHooks[n], {
                get: function(e) {
                    var r = e.getAttribute(n, 2);
                    return r === null ? t : r
                }
            })
        })
    }
    if (!s.support.style) {
        s.attrHooks.style = {
            get: function(e) {
                return e.style.cssText.toLowerCase() || t
            },
            set: function(e, t) {
                return e.style.cssText = "" + t
            }
        }
    }
    if (!s.support.optSelected) {
        s.propHooks.selected = s.extend(s.propHooks.selected, {
            get: function(e) {
                var t = e.parentNode;
                if (t) {
                    t.selectedIndex;
                    if (t.parentNode) {
                        t.parentNode.selectedIndex
                    }
                }
                return null
            }
        })
    }
    if (!s.support.enctype) {
        s.propFix.enctype = "encoding"
    }
    if (!s.support.checkOn) {
        s.each(["radio", "checkbox"], function() {
            s.valHooks[this] = {
                get: function(e) {
                    return e.getAttribute("value") === null ? "on" : e.value
                }
            }
        })
    }
    s.each(["radio", "checkbox"], function() {
        s.valHooks[this] = s.extend(s.valHooks[this], {
            set: function(e, t) {
                if (s.isArray(t)) {
                    return e.checked = s.inArray(s(e).val(), t) >= 0
                }
            }
        })
    });
    var N = /^(?:textarea|input|select)$/i,
        C = /^([^\.]*)?(?:\.(.+))?$/,
        k = /(?:^|\s)hover(\.\S+)?\b/,
        L = /^key/,
        A = /^(?:mouse|contextmenu)|click/,
        O = /^(?:focusinfocus|focusoutblur)$/,
        M = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        _ = function(e) {
            var t = M.exec(e);
            if (t) {
                t[1] = (t[1] || "").toLowerCase();
                t[3] = t[3] && new RegExp("(?:^|\\s)" + t[3] + "(?:\\s|$)")
            }
            return t
        },
        D = function(e, t) {
            var n = e.attributes || {};
            return (!t[1] || e.nodeName.toLowerCase() === t[1]) && (!t[2] || (n.id || {}).value === t[2]) && (!t[3] || t[3].test((n["class"] || {}).value))
        },
        P = function(e) {
            return s.event.special.hover ? e : e.replace(k, "mouseenter$1 mouseleave$1")
        };
    s.event = {
        add: function(e, n, r, i, o) {
            var u, a, f, l, c, h, p, d, v, m, g, y;
            if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(u = s._data(e))) {
                return
            }
            if (r.handler) {
                v = r;
                r = v.handler;
                o = v.selector
            }
            if (!r.guid) {
                r.guid = s.guid++
            }
            f = u.events;
            if (!f) {
                u.events = f = {}
            }
            a = u.handle;
            if (!a) {
                u.handle = a = function(e) {
                    return typeof s !== "undefined" && (!e || s.event.triggered !== e.type) ? s.event.dispatch.apply(a.elem, arguments) : t
                };
                a.elem = e
            }
            n = s.trim(P(n)).split(" ");
            for (l = 0; l < n.length; l++) {
                c = C.exec(n[l]) || [];
                h = c[1];
                p = (c[2] || "").split(".").sort();
                y = s.event.special[h] || {};
                h = (o ? y.delegateType : y.bindType) || h;
                y = s.event.special[h] || {};
                d = s.extend({
                    type: h,
                    origType: c[1],
                    data: i,
                    handler: r,
                    guid: r.guid,
                    selector: o,
                    quick: o && _(o),
                    namespace: p.join(".")
                }, v);
                g = f[h];
                if (!g) {
                    g = f[h] = [];
                    g.delegateCount = 0;
                    if (!y.setup || y.setup.call(e, i, p, a) === false) {
                        if (e.addEventListener) {
                            e.addEventListener(h, a, false)
                        } else if (e.attachEvent) {
                            e.attachEvent("on" + h, a)
                        }
                    }
                }
                if (y.add) {
                    y.add.call(e, d);
                    if (!d.handler.guid) {
                        d.handler.guid = r.guid
                    }
                }
                if (o) {
                    g.splice(g.delegateCount++, 0, d)
                } else {
                    g.push(d)
                }
                s.event.global[h] = true
            }
            e = null
        },
        global: {},
        remove: function(e, t, n, r, i) {
            var o = s.hasData(e) && s._data(e),
                u, a, f, l, c, h, p, d, v, m, g, y;
            if (!o || !(d = o.events)) {
                return
            }
            t = s.trim(P(t || "")).split(" ");
            for (u = 0; u < t.length; u++) {
                a = C.exec(t[u]) || [];
                f = l = a[1];
                c = a[2];
                if (!f) {
                    for (f in d) {
                        s.event.remove(e, f + t[u], n, r, true)
                    }
                    continue
                }
                v = s.event.special[f] || {};
                f = (r ? v.delegateType : v.bindType) || f;
                g = d[f] || [];
                h = g.length;
                c = c ? new RegExp("(^|\\.)" + c.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                for (p = 0; p < g.length; p++) {
                    y = g[p];
                    if ((i || l === y.origType) && (!n || n.guid === y.guid) && (!c || c.test(y.namespace)) && (!r || r === y.selector || r === "**" && y.selector)) {
                        g.splice(p--, 1);
                        if (y.selector) {
                            g.delegateCount--
                        }
                        if (v.remove) {
                            v.remove.call(e, y)
                        }
                    }
                }
                if (g.length === 0 && h !== g.length) {
                    if (!v.teardown || v.teardown.call(e, c) === false) {
                        s.removeEvent(e, f, o.handle)
                    }
                    delete d[f]
                }
            }
            if (s.isEmptyObject(d)) {
                m = o.handle;
                if (m) {
                    m.elem = null
                }
                s.removeData(e, ["events", "handle"], true)
            }
        },
        customEvent: {
            getData: true,
            setData: true,
            changeData: true
        },
        trigger: function(n, r, i, o) {
            if (i && (i.nodeType === 3 || i.nodeType === 8)) {
                return
            }
            var u = n.type || n,
                a = [],
                f, l, c, h, p, d, v, m, g, y;
            if (O.test(u + s.event.triggered)) {
                return
            }
            if (u.indexOf("!") >= 0) {
                u = u.slice(0, -1);
                l = true
            }
            if (u.indexOf(".") >= 0) {
                a = u.split(".");
                u = a.shift();
                a.sort()
            }
            if ((!i || s.event.customEvent[u]) && !s.event.global[u]) {
                return
            }
            n = typeof n === "object" ? n[s.expando] ? n : new s.Event(u, n) : new s.Event(u);
            n.type = u;
            n.isTrigger = true;
            n.exclusive = l;
            n.namespace = a.join(".");
            n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + a.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
            d = u.indexOf(":") < 0 ? "on" + u : "";
            if (!i) {
                f = s.cache;
                for (c in f) {
                    if (f[c].events && f[c].events[u]) {
                        s.event.trigger(n, r, f[c].handle.elem, true)
                    }
                }
                return
            }
            n.result = t;
            if (!n.target) {
                n.target = i
            }
            r = r != null ? s.makeArray(r) : [];
            r.unshift(n);
            v = s.event.special[u] || {};
            if (v.trigger && v.trigger.apply(i, r) === false) {
                return
            }
            g = [
                [i, v.bindType || u]
            ];
            if (!o && !v.noBubble && !s.isWindow(i)) {
                y = v.delegateType || u;
                h = O.test(y + u) ? i : i.parentNode;
                p = null;
                for (; h; h = h.parentNode) {
                    g.push([h, y]);
                    p = h
                }
                if (p && p === i.ownerDocument) {
                    g.push([p.defaultView || p.parentWindow || e, y])
                }
            }
            for (c = 0; c < g.length && !n.isPropagationStopped(); c++) {
                h = g[c][0];
                n.type = g[c][1];
                m = (s._data(h, "events") || {})[n.type] && s._data(h, "handle");
                if (m) {
                    m.apply(h, r)
                }
                m = d && h[d];
                if (m && s.acceptData(h) && m.apply(h, r) === false) {
                    n.preventDefault()
                }
            }
            n.type = u;
            if (!o && !n.isDefaultPrevented()) {
                if ((!v._default || v._default.apply(i.ownerDocument, r) === false) && !(u === "click" && s.nodeName(i, "a")) && s.acceptData(i)) {
                    if (d && i[u] && (u !== "focus" && u !== "blur" || n.target.offsetWidth !== 0) && !s.isWindow(i)) {
                        p = i[d];
                        if (p) {
                            i[d] = null
                        }
                        s.event.triggered = u;
                        i[u]();
                        s.event.triggered = t;
                        if (p) {
                            i[d] = p
                        }
                    }
                }
            }
            return n.result
        },
        dispatch: function(n) {
            n = s.event.fix(n || e.event);
            var r = (s._data(this, "events") || {})[n.type] || [],
                i = r.delegateCount,
                o = [].slice.call(arguments, 0),
                u = !n.exclusive && !n.namespace,
                a = s.event.special[n.type] || {},
                f = [],
                l, c, h, p, d, v, m, g, y, b, w;
            o[0] = n;
            n.delegateTarget = this;
            if (a.preDispatch && a.preDispatch.call(this, n) === false) {
                return
            }
            if (i && !(n.button && n.type === "click")) {
                p = s(this);
                p.context = this.ownerDocument || this;
                for (h = n.target; h != this; h = h.parentNode || this) {
                    if (h.disabled !== true) {
                        v = {};
                        g = [];
                        p[0] = h;
                        for (l = 0; l < i; l++) {
                            y = r[l];
                            b = y.selector;
                            if (v[b] === t) {
                                v[b] = y.quick ? D(h, y.quick) : p.is(b)
                            }
                            if (v[b]) {
                                g.push(y)
                            }
                        }
                        if (g.length) {
                            f.push({
                                elem: h,
                                matches: g
                            })
                        }
                    }
                }
            }
            if (r.length > i) {
                f.push({
                    elem: this,
                    matches: r.slice(i)
                })
            }
            for (l = 0; l < f.length && !n.isPropagationStopped(); l++) {
                m = f[l];
                n.currentTarget = m.elem;
                for (c = 0; c < m.matches.length && !n.isImmediatePropagationStopped(); c++) {
                    y = m.matches[c];
                    if (u || !n.namespace && !y.namespace || n.namespace_re && n.namespace_re.test(y.namespace)) {
                        n.data = y.data;
                        n.handleObj = y;
                        d = ((s.event.special[y.origType] || {}).handle || y.handler).apply(m.elem, o);
                        if (d !== t) {
                            n.result = d;
                            if (d === false) {
                                n.preventDefault();
                                n.stopPropagation()
                            }
                        }
                    }
                }
            }
            if (a.postDispatch) {
                a.postDispatch.call(this, n)
            }
            return n.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                if (e.which == null) {
                    e.which = t.charCode != null ? t.charCode : t.keyCode
                }
                return e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, r) {
                var i, s, o, u = r.button,
                    a = r.fromElement;
                if (e.pageX == null && r.clientX != null) {
                    i = e.target.ownerDocument || n;
                    s = i.documentElement;
                    o = i.body;
                    e.pageX = r.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0);
                    e.pageY = r.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)
                }
                if (!e.relatedTarget && a) {
                    e.relatedTarget = a === e.target ? r.toElement : a
                }
                if (!e.which && u !== t) {
                    e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0
                }
                return e
            }
        },
        fix: function(e) {
            if (e[s.expando]) {
                return e
            }
            var r, i, o = e,
                u = s.event.fixHooks[e.type] || {},
                a = u.props ? this.props.concat(u.props) : this.props;
            e = s.Event(o);
            for (r = a.length; r;) {
                i = a[--r];
                e[i] = o[i]
            }
            if (!e.target) {
                e.target = o.srcElement || n
            }
            if (e.target.nodeType === 3) {
                e.target = e.target.parentNode
            }
            if (e.metaKey === t) {
                e.metaKey = e.ctrlKey
            }
            return u.filter ? u.filter(e, o) : e
        },
        special: {
            ready: {
                setup: s.bindReady
            },
            load: {
                noBubble: true
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(e, t, n) {
                    if (s.isWindow(this)) {
                        this.onbeforeunload = n
                    }
                },
                teardown: function(e, t) {
                    if (this.onbeforeunload === t) {
                        this.onbeforeunload = null
                    }
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = s.extend(new s.Event, n, {
                type: e,
                isSimulated: true,
                originalEvent: {}
            });
            if (r) {
                s.event.trigger(i, null, t)
            } else {
                s.event.dispatch.call(t, i)
            }
            if (i.isDefaultPrevented()) {
                n.preventDefault()
            }
        }
    };
    s.event.handle = s.event.dispatch;
    s.removeEvent = n.removeEventListener ? function(e, t, n) {
        if (e.removeEventListener) {
            e.removeEventListener(t, n, false)
        }
    } : function(e, t, n) {
        if (e.detachEvent) {
            e.detachEvent("on" + t, n)
        }
    };
    s.Event = function(e, t) {
        if (!(this instanceof s.Event)) {
            return new s.Event(e, t)
        }
        if (e && e.type) {
            this.originalEvent = e;
            this.type = e.type;
            this.isDefaultPrevented = e.defaultPrevented || e.returnValue === false || e.getPreventDefault && e.getPreventDefault() ? B : H
        } else {
            this.type = e
        }
        if (t) {
            s.extend(this, t)
        }
        this.timeStamp = e && e.timeStamp || s.now();
        this[s.expando] = true
    };
    s.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = B;
            var e = this.originalEvent;
            if (!e) {
                return
            }
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                e.returnValue = false
            }
        },
        stopPropagation: function() {
            this.isPropagationStopped = B;
            var e = this.originalEvent;
            if (!e) {
                return
            }
            if (e.stopPropagation) {
                e.stopPropagation()
            }
            e.cancelBubble = true
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = B;
            this.stopPropagation()
        },
        isDefaultPrevented: H,
        isPropagationStopped: H,
        isImmediatePropagationStopped: H
    };
    s.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        s.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n = this,
                    r = e.relatedTarget,
                    i = e.handleObj,
                    o = i.selector,
                    u;
                if (!r || r !== n && !s.contains(n, r)) {
                    e.type = i.origType;
                    u = i.handler.apply(this, arguments);
                    e.type = t
                }
                return u
            }
        }
    });
    if (!s.support.submitBubbles) {
        s.event.special.submit = {
            setup: function() {
                if (s.nodeName(this, "form")) {
                    return false
                }
                s.event.add(this, "click._submit keypress._submit", function(e) {
                    var n = e.target,
                        r = s.nodeName(n, "input") || s.nodeName(n, "button") ? n.form : t;
                    if (r && !r._submit_attached) {
                        s.event.add(r, "submit._submit", function(e) {
                            e._submit_bubble = true
                        });
                        r._submit_attached = true
                    }
                })
            },
            postDispatch: function(e) {
                if (e._submit_bubble) {
                    delete e._submit_bubble;
                    if (this.parentNode && !e.isTrigger) {
                        s.event.simulate("submit", this.parentNode, e, true)
                    }
                }
            },
            teardown: function() {
                if (s.nodeName(this, "form")) {
                    return false
                }
                s.event.remove(this, "._submit")
            }
        }
    }
    if (!s.support.changeBubbles) {
        s.event.special.change = {
            setup: function() {
                if (N.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        s.event.add(this, "propertychange._change", function(e) {
                            if (e.originalEvent.propertyName === "checked") {
                                this._just_changed = true
                            }
                        });
                        s.event.add(this, "click._change", function(e) {
                            if (this._just_changed && !e.isTrigger) {
                                this._just_changed = false;
                                s.event.simulate("change", this, e, true)
                            }
                        })
                    }
                    return false
                }
                s.event.add(this, "beforeactivate._change", function(e) {
                    var t = e.target;
                    if (N.test(t.nodeName) && !t._change_attached) {
                        s.event.add(t, "change._change", function(e) {
                            if (this.parentNode && !e.isSimulated && !e.isTrigger) {
                                s.event.simulate("change", this.parentNode, e, true)
                            }
                        });
                        t._change_attached = true
                    }
                })
            },
            handle: function(e) {
                var t = e.target;
                if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") {
                    return e.handleObj.handler.apply(this, arguments)
                }
            },
            teardown: function() {
                s.event.remove(this, "._change");
                return N.test(this.nodeName)
            }
        }
    }
    if (!s.support.focusinBubbles) {
        s.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var r = 0,
                i = function(e) {
                    s.event.simulate(t, e.target, s.event.fix(e), true)
                };
            s.event.special[t] = {
                setup: function() {
                    if (r++ === 0) {
                        n.addEventListener(e, i, true)
                    }
                },
                teardown: function() {
                    if (--r === 0) {
                        n.removeEventListener(e, i, true)
                    }
                }
            }
        })
    }
    s.fn.extend({
        on: function(e, n, r, i, o) {
            var u, a;
            if (typeof e === "object") {
                if (typeof n !== "string") {
                    r = r || n;
                    n = t
                }
                for (a in e) {
                    this.on(a, n, r, e[a], o)
                }
                return this
            }
            if (r == null && i == null) {
                i = n;
                r = n = t
            } else if (i == null) {
                if (typeof n === "string") {
                    i = r;
                    r = t
                } else {
                    i = r;
                    r = n;
                    n = t
                }
            }
            if (i === false) {
                i = H
            } else if (!i) {
                return this
            }
            if (o === 1) {
                u = i;
                i = function(e) {
                    s().off(e);
                    return u.apply(this, arguments)
                };
                i.guid = u.guid || (u.guid = s.guid++)
            }
            return this.each(function() {
                s.event.add(this, e, i, r, n)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, n, r) {
            if (e && e.preventDefault && e.handleObj) {
                var i = e.handleObj;
                s(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler);
                return this
            }
            if (typeof e === "object") {
                for (var o in e) {
                    this.off(o, n, e[o])
                }
                return this
            }
            if (n === false || typeof n === "function") {
                r = n;
                n = t
            }
            if (r === false) {
                r = H
            }
            return this.each(function() {
                s.event.remove(this, e, r, n)
            })
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        live: function(e, t, n) {
            s(this.context).on(e, this.selector, t, n);
            return this
        },
        die: function(e, t) {
            s(this.context).off(e, this.selector || "**", t);
            return this
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return arguments.length == 1 ? this.off(e, "**") : this.off(t, e, n)
        },
        trigger: function(e, t) {
            return this.each(function() {
                s.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            if (this[0]) {
                return s.event.trigger(e, t, this[0], true)
            }
        },
        toggle: function(e) {
            var t = arguments,
                n = e.guid || s.guid++,
                r = 0,
                i = function(n) {
                    var i = (s._data(this, "lastToggle" + e.guid) || 0) % r;
                    s._data(this, "lastToggle" + e.guid, i + 1);
                    n.preventDefault();
                    return t[i].apply(this, arguments) || false
                };
            i.guid = n;
            while (r < t.length) {
                t[r++].guid = n
            }
            return this.click(i)
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    });
    s.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(e, t) {
        s.fn[t] = function(e, n) {
            if (n == null) {
                n = e;
                e = null
            }
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        };
        if (s.attrFn) {
            s.attrFn[t] = true
        }
        if (L.test(t)) {
            s.event.fixHooks[t] = s.event.keyHooks
        }
        if (A.test(t)) {
            s.event.fixHooks[t] = s.event.mouseHooks
        }
    });
    (function() {
        function S(e, t, n, i, s, o) {
            for (var u = 0, a = i.length; u < a; u++) {
                var f = i[u];
                if (f) {
                    var l = false;
                    f = f[e];
                    while (f) {
                        if (f[r] === n) {
                            l = i[f.sizset];
                            break
                        }
                        if (f.nodeType === 1 && !o) {
                            f[r] = n;
                            f.sizset = u
                        }
                        if (f.nodeName.toLowerCase() === t) {
                            l = f;
                            break
                        }
                        f = f[e]
                    }
                    i[u] = l
                }
            }
        }

        function x(e, t, n, i, s, o) {
            for (var u = 0, a = i.length; u < a; u++) {
                var f = i[u];
                if (f) {
                    var l = false;
                    f = f[e];
                    while (f) {
                        if (f[r] === n) {
                            l = i[f.sizset];
                            break
                        }
                        if (f.nodeType === 1) {
                            if (!o) {
                                f[r] = n;
                                f.sizset = u
                            }
                            if (typeof t !== "string") {
                                if (f === t) {
                                    l = true;
                                    break
                                }
                            } else if (h.filter(t, [f]).length > 0) {
                                l = f;
                                break
                            }
                        }
                        f = f[e]
                    }
                    i[u] = l
                }
            }
        }
        var e = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            r = "sizcache" + (Math.random() + "").replace(".", ""),
            i = 0,
            o = Object.prototype.toString,
            u = false,
            a = true,
            f = /\\/g,
            l = /\r\n/g,
            c = /\W/;
        [0, 0].sort(function() {
            a = false;
            return 0
        });
        var h = function(t, r, i, s) {
            i = i || [];
            r = r || n;
            var u = r;
            if (r.nodeType !== 1 && r.nodeType !== 9) {
                return []
            }
            if (!t || typeof t !== "string") {
                return i
            }
            var a, f, l, c, p, m, g, b, w = true,
                E = h.isXML(r),
                S = [],
                x = t;
            do {
                e.exec("");
                a = e.exec(x);
                if (a) {
                    x = a[3];
                    S.push(a[1]);
                    if (a[2]) {
                        c = a[3];
                        break
                    }
                }
            } while (a);
            if (S.length > 1 && v.exec(t)) {
                if (S.length === 2 && d.relative[S[0]]) {
                    f = T(S[0] + S[1], r, s)
                } else {
                    f = d.relative[S[0]] ? [r] : h(S.shift(), r);
                    while (S.length) {
                        t = S.shift();
                        if (d.relative[t]) {
                            t += S.shift()
                        }
                        f = T(t, f, s)
                    }
                }
            } else {
                if (!s && S.length > 1 && r.nodeType === 9 && !E && d.match.ID.test(S[0]) && !d.match.ID.test(S[S.length - 1])) {
                    p = h.find(S.shift(), r, E);
                    r = p.expr ? h.filter(p.expr, p.set)[0] : p.set[0]
                }
                if (r) {
                    p = s ? {
                        expr: S.pop(),
                        set: y(s)
                    } : h.find(S.pop(), S.length === 1 && (S[0] === "~" || S[0] === "+") && r.parentNode ? r.parentNode : r, E);
                    f = p.expr ? h.filter(p.expr, p.set) : p.set;
                    if (S.length > 0) {
                        l = y(f)
                    } else {
                        w = false
                    }
                    while (S.length) {
                        m = S.pop();
                        g = m;
                        if (!d.relative[m]) {
                            m = ""
                        } else {
                            g = S.pop()
                        }
                        if (g == null) {
                            g = r
                        }
                        d.relative[m](l, g, E)
                    }
                } else {
                    l = S = []
                }
            }
            if (!l) {
                l = f
            }
            if (!l) {
                h.error(m || t)
            }
            if (o.call(l) === "[object Array]") {
                if (!w) {
                    i.push.apply(i, l)
                } else if (r && r.nodeType === 1) {
                    for (b = 0; l[b] != null; b++) {
                        if (l[b] && (l[b] === true || l[b].nodeType === 1 && h.contains(r, l[b]))) {
                            i.push(f[b])
                        }
                    }
                } else {
                    for (b = 0; l[b] != null; b++) {
                        if (l[b] && l[b].nodeType === 1) {
                            i.push(f[b])
                        }
                    }
                }
            } else {
                y(l, i)
            }
            if (c) {
                h(c, u, i, s);
                h.uniqueSort(i)
            }
            return i
        };
        h.uniqueSort = function(e) {
            if (w) {
                u = a;
                e.sort(w);
                if (u) {
                    for (var t = 1; t < e.length; t++) {
                        if (e[t] === e[t - 1]) {
                            e.splice(t--, 1)
                        }
                    }
                }
            }
            return e
        };
        h.matches = function(e, t) {
            return h(e, null, null, t)
        };
        h.matchesSelector = function(e, t) {
            return h(t, null, null, [e]).length > 0
        };
        h.find = function(e, t, n) {
            var r, i, s, o, u, a;
            if (!e) {
                return []
            }
            for (i = 0, s = d.order.length; i < s; i++) {
                u = d.order[i];
                if (o = d.leftMatch[u].exec(e)) {
                    a = o[1];
                    o.splice(1, 1);
                    if (a.substr(a.length - 1) !== "\\") {
                        o[1] = (o[1] || "").replace(f, "");
                        r = d.find[u](o, t, n);
                        if (r != null) {
                            e = e.replace(d.match[u], "");
                            break
                        }
                    }
                }
            }
            if (!r) {
                r = typeof t.getElementsByTagName !== "undefined" ? t.getElementsByTagName("*") : []
            }
            return {
                set: r,
                expr: e
            }
        };
        h.filter = function(e, n, r, i) {
            var s, o, u, a, f, l, c, p, v, m = e,
                g = [],
                y = n,
                b = n && n[0] && h.isXML(n[0]);
            while (e && n.length) {
                for (u in d.filter) {
                    if ((s = d.leftMatch[u].exec(e)) != null && s[2]) {
                        l = d.filter[u];
                        c = s[1];
                        o = false;
                        s.splice(1, 1);
                        if (c.substr(c.length - 1) === "\\") {
                            continue
                        }
                        if (y === g) {
                            g = []
                        }
                        if (d.preFilter[u]) {
                            s = d.preFilter[u](s, y, r, g, i, b);
                            if (!s) {
                                o = a = true
                            } else if (s === true) {
                                continue
                            }
                        }
                        if (s) {
                            for (p = 0;
                                (f = y[p]) != null; p++) {
                                if (f) {
                                    a = l(f, s, p, y);
                                    v = i ^ a;
                                    if (r && a != null) {
                                        if (v) {
                                            o = true
                                        } else {
                                            y[p] = false
                                        }
                                    } else if (v) {
                                        g.push(f);
                                        o = true
                                    }
                                }
                            }
                        }
                        if (a !== t) {
                            if (!r) {
                                y = g
                            }
                            e = e.replace(d.match[u], "");
                            if (!o) {
                                return []
                            }
                            break
                        }
                    }
                }
                if (e === m) {
                    if (o == null) {
                        h.error(e)
                    } else {
                        break
                    }
                }
                m = e
            }
            return y
        };
        h.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        };
        var p = h.getText = function(e) {
            var t, n, r = e.nodeType,
                i = "";
            if (r) {
                if (r === 1 || r === 9 || r === 11) {
                    if (typeof e.textContent === "string") {
                        return e.textContent
                    } else if (typeof e.innerText === "string") {
                        return e.innerText.replace(l, "")
                    } else {
                        for (e = e.firstChild; e; e = e.nextSibling) {
                            i += p(e)
                        }
                    }
                } else if (r === 3 || r === 4) {
                    return e.nodeValue
                }
            } else {
                for (t = 0; n = e[t]; t++) {
                    if (n.nodeType !== 8) {
                        i += p(n)
                    }
                }
            }
            return i
        };
        var d = h.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(e) {
                    return e.getAttribute("href")
                },
                type: function(e) {
                    return e.getAttribute("type")
                }
            },
            relative: {
                "+": function(e, t) {
                    var n = typeof t === "string",
                        r = n && !c.test(t),
                        i = n && !r;
                    if (r) {
                        t = t.toLowerCase()
                    }
                    for (var s = 0, o = e.length, u; s < o; s++) {
                        if (u = e[s]) {
                            while ((u = u.previousSibling) && u.nodeType !== 1) {}
                            e[s] = i || u && u.nodeName.toLowerCase() === t ? u || false : u === t
                        }
                    }
                    if (i) {
                        h.filter(t, e, true)
                    }
                },
                ">": function(e, t) {
                    var n, r = typeof t === "string",
                        i = 0,
                        s = e.length;
                    if (r && !c.test(t)) {
                        t = t.toLowerCase();
                        for (; i < s; i++) {
                            n = e[i];
                            if (n) {
                                var o = n.parentNode;
                                e[i] = o.nodeName.toLowerCase() === t ? o : false
                            }
                        }
                    } else {
                        for (; i < s; i++) {
                            n = e[i];
                            if (n) {
                                e[i] = r ? n.parentNode : n.parentNode === t
                            }
                        }
                        if (r) {
                            h.filter(t, e, true)
                        }
                    }
                },
                "": function(e, t, n) {
                    var r, s = i++,
                        o = x;
                    if (typeof t === "string" && !c.test(t)) {
                        t = t.toLowerCase();
                        r = t;
                        o = S
                    }
                    o("parentNode", t, s, e, r, n)
                },
                "~": function(e, t, n) {
                    var r, s = i++,
                        o = x;
                    if (typeof t === "string" && !c.test(t)) {
                        t = t.toLowerCase();
                        r = t;
                        o = S
                    }
                    o("previousSibling", t, s, e, r, n)
                }
            },
            find: {
                ID: function(e, t, n) {
                    if (typeof t.getElementById !== "undefined" && !n) {
                        var r = t.getElementById(e[1]);
                        return r && r.parentNode ? [r] : []
                    }
                },
                NAME: function(e, t) {
                    if (typeof t.getElementsByName !== "undefined") {
                        var n = [],
                            r = t.getElementsByName(e[1]);
                        for (var i = 0, s = r.length; i < s; i++) {
                            if (r[i].getAttribute("name") === e[1]) {
                                n.push(r[i])
                            }
                        }
                        return n.length === 0 ? null : n
                    }
                },
                TAG: function(e, t) {
                    if (typeof t.getElementsByTagName !== "undefined") {
                        return t.getElementsByTagName(e[1])
                    }
                }
            },
            preFilter: {
                CLASS: function(e, t, n, r, i, s) {
                    e = " " + e[1].replace(f, "") + " ";
                    if (s) {
                        return e
                    }
                    for (var o = 0, u;
                        (u = t[o]) != null; o++) {
                        if (u) {
                            if (i ^ (u.className && (" " + u.className + " ").replace(/[\t\n\r]/g, " ").indexOf(e) >= 0)) {
                                if (!n) {
                                    r.push(u)
                                }
                            } else if (n) {
                                t[o] = false
                            }
                        }
                    }
                    return false
                },
                ID: function(e) {
                    return e[1].replace(f, "")
                },
                TAG: function(e, t) {
                    return e[1].replace(f, "").toLowerCase()
                },
                CHILD: function(e) {
                    if (e[1] === "nth") {
                        if (!e[2]) {
                            h.error(e[0])
                        }
                        e[2] = e[2].replace(/^\+|\s*/g, "");
                        var t = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                        e[2] = t[1] + (t[2] || 1) - 0;
                        e[3] = t[3] - 0
                    } else if (e[2]) {
                        h.error(e[0])
                    }
                    e[0] = i++;
                    return e
                },
                ATTR: function(e, t, n, r, i, s) {
                    var o = e[1] = e[1].replace(f, "");
                    if (!s && d.attrMap[o]) {
                        e[1] = d.attrMap[o]
                    }
                    e[4] = (e[4] || e[5] || "").replace(f, "");
                    if (e[2] === "~=") {
                        e[4] = " " + e[4] + " "
                    }
                    return e
                },
                PSEUDO: function(t, n, r, i, s) {
                    if (t[1] === "not") {
                        if ((e.exec(t[3]) || "").length > 1 || /^\w/.test(t[3])) {
                            t[3] = h(t[3], null, null, n)
                        } else {
                            var o = h.filter(t[3], n, r, true ^ s);
                            if (!r) {
                                i.push.apply(i, o)
                            }
                            return false
                        }
                    } else if (d.match.POS.test(t[0]) || d.match.CHILD.test(t[0])) {
                        return true
                    }
                    return t
                },
                POS: function(e) {
                    e.unshift(true);
                    return e
                }
            },
            filters: {
                enabled: function(e) {
                    return e.disabled === false && e.type !== "hidden"
                },
                disabled: function(e) {
                    return e.disabled === true
                },
                checked: function(e) {
                    return e.checked === true
                },
                selected: function(e) {
                    if (e.parentNode) {
                        e.parentNode.selectedIndex
                    }
                    return e.selected === true
                },
                parent: function(e) {
                    return !!e.firstChild
                },
                empty: function(e) {
                    return !e.firstChild
                },
                has: function(e, t, n) {
                    return !!h(n[3], e).length
                },
                header: function(e) {
                    return /h\d/i.test(e.nodeName)
                },
                text: function(e) {
                    var t = e.getAttribute("type"),
                        n = e.type;
                    return e.nodeName.toLowerCase() === "input" && "text" === n && (t === n || t === null)
                },
                radio: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "radio" === e.type
                },
                checkbox: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "checkbox" === e.type
                },
                file: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "file" === e.type
                },
                password: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "password" === e.type
                },
                submit: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return (t === "input" || t === "button") && "submit" === e.type
                },
                image: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "image" === e.type
                },
                reset: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return (t === "input" || t === "button") && "reset" === e.type
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && "button" === e.type || t === "button"
                },
                input: function(e) {
                    return /input|select|textarea|button/i.test(e.nodeName)
                },
                focus: function(e) {
                    return e === e.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function(e, t) {
                    return t === 0
                },
                last: function(e, t, n, r) {
                    return t === r.length - 1
                },
                even: function(e, t) {
                    return t % 2 === 0
                },
                odd: function(e, t) {
                    return t % 2 === 1
                },
                lt: function(e, t, n) {
                    return t < n[3] - 0
                },
                gt: function(e, t, n) {
                    return t > n[3] - 0
                },
                nth: function(e, t, n) {
                    return n[3] - 0 === t
                },
                eq: function(e, t, n) {
                    return n[3] - 0 === t
                }
            },
            filter: {
                PSEUDO: function(e, t, n, r) {
                    var i = t[1],
                        s = d.filters[i];
                    if (s) {
                        return s(e, n, t, r)
                    } else if (i === "contains") {
                        return (e.textContent || e.innerText || p([e]) || "").indexOf(t[3]) >= 0
                    } else if (i === "not") {
                        var o = t[3];
                        for (var u = 0, a = o.length; u < a; u++) {
                            if (o[u] === e) {
                                return false
                            }
                        }
                        return true
                    } else {
                        h.error(i)
                    }
                },
                CHILD: function(e, t) {
                    var n, i, s, o, u, a, f, l = t[1],
                        c = e;
                    switch (l) {
                        case "only":
                        case "first":
                            while (c = c.previousSibling) {
                                if (c.nodeType === 1) {
                                    return false
                                }
                            }
                            if (l === "first") {
                                return true
                            }
                            c = e;
                        case "last":
                            while (c = c.nextSibling) {
                                if (c.nodeType === 1) {
                                    return false
                                }
                            }
                            return true;
                        case "nth":
                            n = t[2];
                            i = t[3];
                            if (n === 1 && i === 0) {
                                return true
                            }
                            s = t[0];
                            o = e.parentNode;
                            if (o && (o[r] !== s || !e.nodeIndex)) {
                                a = 0;
                                for (c = o.firstChild; c; c = c.nextSibling) {
                                    if (c.nodeType === 1) {
                                        c.nodeIndex = ++a
                                    }
                                }
                                o[r] = s
                            }
                            f = e.nodeIndex - i;
                            if (n === 0) {
                                return f === 0
                            } else {
                                return f % n === 0 && f / n >= 0
                            }
                    }
                },
                ID: function(e, t) {
                    return e.nodeType === 1 && e.getAttribute("id") === t
                },
                TAG: function(e, t) {
                    return t === "*" && e.nodeType === 1 || !!e.nodeName && e.nodeName.toLowerCase() === t
                },
                CLASS: function(e, t) {
                    return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(t) > -1
                },
                ATTR: function(e, t) {
                    var n = t[1],
                        r = h.attr ? h.attr(e, n) : d.attrHandle[n] ? d.attrHandle[n](e) : e[n] != null ? e[n] : e.getAttribute(n),
                        i = r + "",
                        s = t[2],
                        o = t[4];
                    return r == null ? s === "!=" : !s && h.attr ? r != null : s === "=" ? i === o : s === "*=" ? i.indexOf(o) >= 0 : s === "~=" ? (" " + i + " ").indexOf(o) >= 0 : !o ? i && r !== false : s === "!=" ? i !== o : s === "^=" ? i.indexOf(o) === 0 : s === "$=" ? i.substr(i.length - o.length) === o : s === "|=" ? i === o || i.substr(0, o.length + 1) === o + "-" : false
                },
                POS: function(e, t, n, r) {
                    var i = t[2],
                        s = d.setFilters[i];
                    if (s) {
                        return s(e, n, t, r)
                    }
                }
            }
        };
        var v = d.match.POS,
            m = function(e, t) {
                return "\\" + (t - 0 + 1)
            };
        for (var g in d.match) {
            d.match[g] = new RegExp(d.match[g].source + /(?![^\[]*\])(?![^\(]*\))/.source);
            d.leftMatch[g] = new RegExp(/(^(?:.|\r|\n)*?)/.source + d.match[g].source.replace(/\\(\d+)/g, m))
        }
        d.match.globalPOS = v;
        var y = function(e, t) {
            e = Array.prototype.slice.call(e, 0);
            if (t) {
                t.push.apply(t, e);
                return t
            }
            return e
        };
        try {
            Array.prototype.slice.call(n.documentElement.childNodes, 0)[0].nodeType
        } catch (b) {
            y = function(e, t) {
                var n = 0,
                    r = t || [];
                if (o.call(e) === "[object Array]") {
                    Array.prototype.push.apply(r, e)
                } else {
                    if (typeof e.length === "number") {
                        for (var i = e.length; n < i; n++) {
                            r.push(e[n])
                        }
                    } else {
                        for (; e[n]; n++) {
                            r.push(e[n])
                        }
                    }
                }
                return r
            }
        }
        var w, E;
        if (n.documentElement.compareDocumentPosition) {
            w = function(e, t) {
                if (e === t) {
                    u = true;
                    return 0
                }
                if (!e.compareDocumentPosition || !t.compareDocumentPosition) {
                    return e.compareDocumentPosition ? -1 : 1
                }
                return e.compareDocumentPosition(t) & 4 ? -1 : 1
            }
        } else {
            w = function(e, t) {
                if (e === t) {
                    u = true;
                    return 0
                } else if (e.sourceIndex && t.sourceIndex) {
                    return e.sourceIndex - t.sourceIndex
                }
                var n, r, i = [],
                    s = [],
                    o = e.parentNode,
                    a = t.parentNode,
                    f = o;
                if (o === a) {
                    return E(e, t)
                } else if (!o) {
                    return -1
                } else if (!a) {
                    return 1
                }
                while (f) {
                    i.unshift(f);
                    f = f.parentNode
                }
                f = a;
                while (f) {
                    s.unshift(f);
                    f = f.parentNode
                }
                n = i.length;
                r = s.length;
                for (var l = 0; l < n && l < r; l++) {
                    if (i[l] !== s[l]) {
                        return E(i[l], s[l])
                    }
                }
                return l === n ? E(e, s[l], -1) : E(i[l], t, 1)
            };
            E = function(e, t, n) {
                if (e === t) {
                    return n
                }
                var r = e.nextSibling;
                while (r) {
                    if (r === t) {
                        return -1
                    }
                    r = r.nextSibling
                }
                return 1
            }
        }(function() {
            var e = n.createElement("div"),
                r = "script" + (new Date).getTime(),
                i = n.documentElement;
            e.innerHTML = "<a name='" + r + "'/>";
            i.insertBefore(e, i.firstChild);
            if (n.getElementById(r)) {
                d.find.ID = function(e, n, r) {
                    if (typeof n.getElementById !== "undefined" && !r) {
                        var i = n.getElementById(e[1]);
                        return i ? i.id === e[1] || typeof i.getAttributeNode !== "undefined" && i.getAttributeNode("id").nodeValue === e[1] ? [i] : t : []
                    }
                };
                d.filter.ID = function(e, t) {
                    var n = typeof e.getAttributeNode !== "undefined" && e.getAttributeNode("id");
                    return e.nodeType === 1 && n && n.nodeValue === t
                }
            }
            i.removeChild(e);
            i = e = null
        })();
        (function() {
            var e = n.createElement("div");
            e.appendChild(n.createComment(""));
            if (e.getElementsByTagName("*").length > 0) {
                d.find.TAG = function(e, t) {
                    var n = t.getElementsByTagName(e[1]);
                    if (e[1] === "*") {
                        var r = [];
                        for (var i = 0; n[i]; i++) {
                            if (n[i].nodeType === 1) {
                                r.push(n[i])
                            }
                        }
                        n = r
                    }
                    return n
                }
            }
            e.innerHTML = "<a href='#'></a>";
            if (e.firstChild && typeof e.firstChild.getAttribute !== "undefined" && e.firstChild.getAttribute("href") !== "#") {
                d.attrHandle.href = function(e) {
                    return e.getAttribute("href", 2)
                }
            }
            e = null
        })();
        if (n.querySelectorAll) {
            (function() {
                var e = h,
                    t = n.createElement("div"),
                    r = "__sizzle__";
                t.innerHTML = "<p class='TEST'></p>";
                if (t.querySelectorAll && t.querySelectorAll(".TEST").length === 0) {
                    return
                }
                h = function(t, i, s, o) {
                    i = i || n;
                    if (!o && !h.isXML(i)) {
                        var u = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(t);
                        if (u && (i.nodeType === 1 || i.nodeType === 9)) {
                            if (u[1]) {
                                return y(i.getElementsByTagName(t), s)
                            } else if (u[2] && d.find.CLASS && i.getElementsByClassName) {
                                return y(i.getElementsByClassName(u[2]), s)
                            }
                        }
                        if (i.nodeType === 9) {
                            if (t === "body" && i.body) {
                                return y([i.body], s)
                            } else if (u && u[3]) {
                                var a = i.getElementById(u[3]);
                                if (a && a.parentNode) {
                                    if (a.id === u[3]) {
                                        return y([a], s)
                                    }
                                } else {
                                    return y([], s)
                                }
                            }
                            try {
                                return y(i.querySelectorAll(t), s)
                            } catch (f) {}
                        } else if (i.nodeType === 1 && i.nodeName.toLowerCase() !== "object") {
                            var l = i,
                                c = i.getAttribute("id"),
                                p = c || r,
                                v = i.parentNode,
                                m = /^\s*[+~]/.test(t);
                            if (!c) {
                                i.setAttribute("id", p)
                            } else {
                                p = p.replace(/'/g, "\\$&")
                            }
                            if (m && v) {
                                i = i.parentNode
                            }
                            try {
                                if (!m || v) {
                                    return y(i.querySelectorAll("[id='" + p + "'] " + t), s)
                                }
                            } catch (g) {} finally {
                                if (!c) {
                                    l.removeAttribute("id")
                                }
                            }
                        }
                    }
                    return e(t, i, s, o)
                };
                for (var i in e) {
                    h[i] = e[i]
                }
                t = null
            })()
        }(function() {
            var e = n.documentElement,
                t = e.matchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.msMatchesSelector;
            if (t) {
                var r = !t.call(n.createElement("div"), "div"),
                    i = false;
                try {
                    t.call(n.documentElement, "[test!='']:sizzle")
                } catch (s) {
                    i = true
                }
                h.matchesSelector = function(e, n) {
                    n = n.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!h.isXML(e)) {
                        try {
                            if (i || !d.match.PSEUDO.test(n) && !/!=/.test(n)) {
                                var s = t.call(e, n);
                                if (s || !r || e.document && e.document.nodeType !== 11) {
                                    return s
                                }
                            }
                        } catch (o) {}
                    }
                    return h(n, null, null, [e]).length > 0
                }
            }
        })();
        (function() {
            var e = n.createElement("div");
            e.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!e.getElementsByClassName || e.getElementsByClassName("e").length === 0) {
                return
            }
            e.lastChild.className = "e";
            if (e.getElementsByClassName("e").length === 1) {
                return
            }
            d.order.splice(1, 0, "CLASS");
            d.find.CLASS = function(e, t, n) {
                if (typeof t.getElementsByClassName !== "undefined" && !n) {
                    return t.getElementsByClassName(e[1])
                }
            };
            e = null
        })();
        if (n.documentElement.contains) {
            h.contains = function(e, t) {
                return e !== t && (e.contains ? e.contains(t) : true)
            }
        } else if (n.documentElement.compareDocumentPosition) {
            h.contains = function(e, t) {
                return !!(e.compareDocumentPosition(t) & 16)
            }
        } else {
            h.contains = function() {
                return false
            }
        }
        h.isXML = function(e) {
            var t = (e ? e.ownerDocument || e : 0).documentElement;
            return t ? t.nodeName !== "HTML" : false
        };
        var T = function(e, t, n) {
            var r, i = [],
                s = "",
                o = t.nodeType ? [t] : t;
            while (r = d.match.PSEUDO.exec(e)) {
                s += r[0];
                e = e.replace(d.match.PSEUDO, "")
            }
            e = d.relative[e] ? e + "*" : e;
            for (var u = 0, a = o.length; u < a; u++) {
                h(e, o[u], i, n)
            }
            return h.filter(s, i)
        };
        h.attr = s.attr;
        h.selectors.attrMap = {};
        s.find = h;
        s.expr = h.selectors;
        s.expr[":"] = s.expr.filters;
        s.unique = h.uniqueSort;
        s.text = h.getText;
        s.isXMLDoc = h.isXML;
        s.contains = h.contains
    })();
    var j = /Until$/,
        F = /^(?:parents|prevUntil|prevAll)/,
        I = /,/,
        q = /^.[^:#\[\.,]*$/,
        R = Array.prototype.slice,
        U = s.expr.match.globalPOS,
        z = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    s.fn.extend({
        find: function(e) {
            var t = this,
                n, r;
            if (typeof e !== "string") {
                return s(e).filter(function() {
                    for (n = 0, r = t.length; n < r; n++) {
                        if (s.contains(t[n], this)) {
                            return true
                        }
                    }
                })
            }
            var i = this.pushStack("", "find", e),
                o, u, a;
            for (n = 0, r = this.length; n < r; n++) {
                o = i.length;
                s.find(e, this[n], i);
                if (n > 0) {
                    for (u = o; u < i.length; u++) {
                        for (a = 0; a < o; a++) {
                            if (i[a] === i[u]) {
                                i.splice(u--, 1);
                                break
                            }
                        }
                    }
                }
            }
            return i
        },
        has: function(e) {
            var t = s(e);
            return this.filter(function() {
                for (var e = 0, n = t.length; e < n; e++) {
                    if (s.contains(this, t[e])) {
                        return true
                    }
                }
            })
        },
        not: function(e) {
            return this.pushStack(X(this, e, false), "not", e)
        },
        filter: function(e) {
            return this.pushStack(X(this, e, true), "filter", e)
        },
        is: function(e) {
            return !!e && (typeof e === "string" ? U.test(e) ? s(e, this.context).index(this[0]) >= 0 : s.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function(e, t) {
            var n = [],
                r, i, o = this[0];
            if (s.isArray(e)) {
                var u = 1;
                while (o && o.ownerDocument && o !== t) {
                    for (r = 0; r < e.length; r++) {
                        if (s(o).is(e[r])) {
                            n.push({
                                selector: e[r],
                                elem: o,
                                level: u
                            })
                        }
                    }
                    o = o.parentNode;
                    u++
                }
                return n
            }
            var a = U.test(e) || typeof e !== "string" ? s(e, t || this.context) : 0;
            for (r = 0, i = this.length; r < i; r++) {
                o = this[r];
                while (o) {
                    if (a ? a.index(o) > -1 : s.find.matchesSelector(o, e)) {
                        n.push(o);
                        break
                    } else {
                        o = o.parentNode;
                        if (!o || !o.ownerDocument || o === t || o.nodeType === 11) {
                            break
                        }
                    }
                }
            }
            n = n.length > 1 ? s.unique(n) : n;
            return this.pushStack(n, "closest", e)
        },
        index: function(e) {
            if (!e) {
                return this[0] && this[0].parentNode ? this.prevAll().length : -1
            }
            if (typeof e === "string") {
                return s.inArray(this[0], s(e))
            }
            return s.inArray(e.jquery ? e[0] : e, this)
        },
        add: function(e, t) {
            var n = typeof e === "string" ? s(e, t) : s.makeArray(e && e.nodeType ? [e] : e),
                r = s.merge(this.get(), n);
            return this.pushStack(W(n[0]) || W(r[0]) ? r : s.unique(r))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    });
    s.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t : null
        },
        parents: function(e) {
            return s.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return s.dir(e, "parentNode", n)
        },
        next: function(e) {
            return s.nth(e, 2, "nextSibling")
        },
        prev: function(e) {
            return s.nth(e, 2, "previousSibling")
        },
        nextAll: function(e) {
            return s.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return s.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return s.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return s.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return s.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return s.sibling(e.firstChild)
        },
        contents: function(e) {
            return s.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : s.makeArray(e.childNodes)
        }
    }, function(e, t) {
        s.fn[e] = function(n, r) {
            var i = s.map(this, t, n);
            if (!j.test(e)) {
                r = n
            }
            if (r && typeof r === "string") {
                i = s.filter(r, i)
            }
            i = this.length > 1 && !z[e] ? s.unique(i) : i;
            if ((this.length > 1 || I.test(r)) && F.test(e)) {
                i = i.reverse()
            }
            return this.pushStack(i, e, R.call(arguments).join(","))
        }
    });
    s.extend({
        filter: function(e, t, n) {
            if (n) {
                e = ":not(" + e + ")"
            }
            return t.length === 1 ? s.find.matchesSelector(t[0], e) ? [t[0]] : [] : s.find.matches(e, t)
        },
        dir: function(e, n, r) {
            var i = [],
                o = e[n];
            while (o && o.nodeType !== 9 && (r === t || o.nodeType !== 1 || !s(o).is(r))) {
                if (o.nodeType === 1) {
                    i.push(o)
                }
                o = o[n]
            }
            return i
        },
        nth: function(e, t, n, r) {
            t = t || 1;
            var i = 0;
            for (; e; e = e[n]) {
                if (e.nodeType === 1 && ++i === t) {
                    break
                }
            }
            return e
        },
        sibling: function(e, t) {
            var n = [];
            for (; e; e = e.nextSibling) {
                if (e.nodeType === 1 && e !== t) {
                    n.push(e)
                }
            }
            return n
        }
    });
    var $ = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        J = / jQuery\d+="(?:\d+|null)"/g,
        K = /^\s+/,
        Q = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        G = /<([\w:]+)/,
        Y = /<tbody/i,
        Z = /<|&#?\w+;/,
        et = /<(?:script|style)/i,
        tt = /<(?:script|object|embed|option|style)/i,
        nt = new RegExp("<(?:" + $ + ")[\\s/>]", "i"),
        rt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        it = /\/(java|ecma)script/i,
        st = /^\s*<!(?:\[CDATA\[|\-\-)/,
        ot = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        ut = V(n);
    ot.optgroup = ot.option;
    ot.tbody = ot.tfoot = ot.colgroup = ot.caption = ot.thead;
    ot.th = ot.td;
    if (!s.support.htmlSerialize) {
        ot._default = [1, "div<div>", "</div>"]
    }
    s.fn.extend({
        text: function(e) {
            return s.access(this, function(e) {
                return e === t ? s.text(this) : this.empty().append((this[0] && this[0].ownerDocument || n).createTextNode(e))
            }, null, e, arguments.length)
        },
        wrapAll: function(e) {
            if (s.isFunction(e)) {
                return this.each(function(t) {
                    s(this).wrapAll(e.call(this, t))
                })
            }
            if (this[0]) {
                var t = s(e, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    t.insertBefore(this[0])
                }
                t.map(function() {
                    var e = this;
                    while (e.firstChild && e.firstChild.nodeType === 1) {
                        e = e.firstChild
                    }
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            if (s.isFunction(e)) {
                return this.each(function(t) {
                    s(this).wrapInner(e.call(this, t))
                })
            }
            return this.each(function() {
                var t = s(this),
                    n = t.contents();
                if (n.length) {
                    n.wrapAll(e)
                } else {
                    t.append(e)
                }
            })
        },
        wrap: function(e) {
            var t = s.isFunction(e);
            return this.each(function(n) {
                s(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!s.nodeName(this, "body")) {
                    s(this).replaceWith(this.childNodes)
                }
            }).end()
        },
        append: function() {
            return this.domManip(arguments, true, function(e) {
                if (this.nodeType === 1) {
                    this.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, true, function(e) {
                if (this.nodeType === 1) {
                    this.insertBefore(e, this.firstChild)
                }
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function(e) {
                    this.parentNode.insertBefore(e, this)
                })
            } else if (arguments.length) {
                var e = s.clean(arguments);
                e.push.apply(e, this.toArray());
                return this.pushStack(e, "before", arguments)
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function(e) {
                    this.parentNode.insertBefore(e, this.nextSibling)
                })
            } else if (arguments.length) {
                var e = this.pushStack(this, "after", arguments);
                e.push.apply(e, s.clean(arguments));
                return e
            }
        },
        remove: function(e, t) {
            for (var n = 0, r;
                (r = this[n]) != null; n++) {
                if (!e || s.filter(e, [r]).length) {
                    if (!t && r.nodeType === 1) {
                        s.cleanData(r.getElementsByTagName("*"));
                        s.cleanData([r])
                    }
                    if (r.parentNode) {
                        r.parentNode.removeChild(r)
                    }
                }
            }
            return this
        },
        empty: function() {
            for (var e = 0, t;
                (t = this[e]) != null; e++) {
                if (t.nodeType === 1) {
                    s.cleanData(t.getElementsByTagName("*"))
                }
                while (t.firstChild) {
                    t.removeChild(t.firstChild)
                }
            }
            return this
        },
        clone: function(e, t) {
            e = e == null ? false : e;
            t = t == null ? e : t;
            return this.map(function() {
                return s.clone(this, e, t)
            })
        },
        html: function(e) {
            return s.access(this, function(e) {
                var n = this[0] || {},
                    r = 0,
                    i = this.length;
                if (e === t) {
                    return n.nodeType === 1 ? n.innerHTML.replace(J, "") : null
                }
                if (typeof e === "string" && !et.test(e) && (s.support.leadingWhitespace || !K.test(e)) && !ot[(G.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(Q, "<$1></$2>");
                    try {
                        for (; r < i; r++) {
                            n = this[r] || {};
                            if (n.nodeType === 1) {
                                s.cleanData(n.getElementsByTagName("*"));
                                n.innerHTML = e
                            }
                        }
                        n = 0
                    } catch (o) {}
                }
                if (n) {
                    this.empty().append(e)
                }
            }, null, e, arguments.length)
        },
        replaceWith: function(e) {
            if (this[0] && this[0].parentNode) {
                if (s.isFunction(e)) {
                    return this.each(function(t) {
                        var n = s(this),
                            r = n.html();
                        n.replaceWith(e.call(this, t, r))
                    })
                }
                if (typeof e !== "string") {
                    e = s(e).detach()
                }
                return this.each(function() {
                    var t = this.nextSibling,
                        n = this.parentNode;
                    s(this).remove();
                    if (t) {
                        s(t).before(e)
                    } else {
                        s(n).append(e)
                    }
                })
            } else {
                return this.length ? this.pushStack(s(s.isFunction(e) ? e() : e), "replaceWith", e) : this
            }
        },
        detach: function(e) {
            return this.remove(e, true)
        },
        domManip: function(e, n, r) {
            var i, o, u, a, f = e[0],
                l = [];
            if (!s.support.checkClone && arguments.length === 3 && typeof f === "string" && rt.test(f)) {
                return this.each(function() {
                    s(this).domManip(e, n, r, true)
                })
            }
            if (s.isFunction(f)) {
                return this.each(function(i) {
                    var o = s(this);
                    e[0] = f.call(this, i, n ? o.html() : t);
                    o.domManip(e, n, r)
                })
            }
            if (this[0]) {
                a = f && f.parentNode;
                if (s.support.parentNode && a && a.nodeType === 11 && a.childNodes.length === this.length) {
                    i = {
                        fragment: a
                    }
                } else {
                    i = s.buildFragment(e, this, l)
                }
                u = i.fragment;
                if (u.childNodes.length === 1) {
                    o = u = u.firstChild
                } else {
                    o = u.firstChild
                }
                if (o) {
                    n = n && s.nodeName(o, "tr");
                    for (var c = 0, h = this.length, p = h - 1; c < h; c++) {
                        r.call(n ? at(this[c], o) : this[c], i.cacheable || h > 1 && c < p ? s.clone(u, true, true) : u)
                    }
                }
                if (l.length) {
                    s.each(l, function(e, t) {
                        if (t.src) {
                            s.ajax({
                                type: "GET",
                                global: false,
                                url: t.src,
                                async: false,
                                dataType: "script"
                            })
                        } else {
                            s.globalEval((t.text || t.textContent || t.innerHTML || "").replace(st, "/*$0*/"))
                        }
                        if (t.parentNode) {
                            t.parentNode.removeChild(t)
                        }
                    })
                }
            }
            return this
        }
    });
    s.buildFragment = function(e, t, r) {
        var i, o, u, a, f = e[0];
        if (t && t[0]) {
            a = t[0].ownerDocument || t[0]
        }
        if (!a.createDocumentFragment) {
            a = n
        }
        if (e.length === 1 && typeof f === "string" && f.length < 512 && a === n && f.charAt(0) === "<" && !tt.test(f) && (s.support.checkClone || !rt.test(f)) && (s.support.html5Clone || !nt.test(f))) {
            o = true;
            u = s.fragments[f];
            if (u && u !== 1) {
                i = u
            }
        }
        if (!i) {
            i = a.createDocumentFragment();
            s.clean(e, a, i, r)
        }
        if (o) {
            s.fragments[f] = u ? i : 1
        }
        return {
            fragment: i,
            cacheable: o
        }
    };
    s.fragments = {};
    s.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        s.fn[e] = function(n) {
            var r = [],
                i = s(n),
                o = this.length === 1 && this[0].parentNode;
            if (o && o.nodeType === 11 && o.childNodes.length === 1 && i.length === 1) {
                i[t](this[0]);
                return this
            } else {
                for (var u = 0, a = i.length; u < a; u++) {
                    var f = (u > 0 ? this.clone(true) : this).get();
                    s(i[u])[t](f);
                    r = r.concat(f)
                }
                return this.pushStack(r, e, i.selector)
            }
        }
    });
    s.extend({
        clone: function(e, t, n) {
            var r, i, o, u = s.support.html5Clone || s.isXMLDoc(e) || !nt.test("<" + e.nodeName + ">") ? e.cloneNode(true) : dt(e);
            if ((!s.support.noCloneEvent || !s.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !s.isXMLDoc(e)) {
                lt(e, u);
                r = ct(e);
                i = ct(u);
                for (o = 0; r[o]; ++o) {
                    if (i[o]) {
                        lt(r[o], i[o])
                    }
                }
            }
            if (t) {
                ft(e, u);
                if (n) {
                    r = ct(e);
                    i = ct(u);
                    for (o = 0; r[o]; ++o) {
                        ft(r[o], i[o])
                    }
                }
            }
            r = i = null;
            return u
        },
        clean: function(e, t, r, i) {
            var o, u, a, f = [];
            t = t || n;
            if (typeof t.createElement === "undefined") {
                t = t.ownerDocument || t[0] && t[0].ownerDocument || n
            }
            for (var l = 0, c;
                (c = e[l]) != null; l++) {
                if (typeof c === "number") {
                    c += ""
                }
                if (!c) {
                    continue
                }
                if (typeof c === "string") {
                    if (!Z.test(c)) {
                        c = t.createTextNode(c)
                    } else {
                        c = c.replace(Q, "<$1></$2>");
                        var h = (G.exec(c) || ["", ""])[1].toLowerCase(),
                            p = ot[h] || ot._default,
                            d = p[0],
                            v = t.createElement("div"),
                            m = ut.childNodes,
                            g;
                        if (t === n) {
                            ut.appendChild(v)
                        } else {
                            V(t).appendChild(v)
                        }
                        v.innerHTML = p[1] + c + p[2];
                        while (d--) {
                            v = v.lastChild
                        }
                        if (!s.support.tbody) {
                            var y = Y.test(c),
                                b = h === "table" && !y ? v.firstChild && v.firstChild.childNodes : p[1] === "<table>" && !y ? v.childNodes : [];
                            for (a = b.length - 1; a >= 0; --a) {
                                if (s.nodeName(b[a], "tbody") && !b[a].childNodes.length) {
                                    b[a].parentNode.removeChild(b[a])
                                }
                            }
                        }
                        if (!s.support.leadingWhitespace && K.test(c)) {
                            v.insertBefore(t.createTextNode(K.exec(c)[0]), v.firstChild)
                        }
                        c = v.childNodes;
                        if (v) {
                            v.parentNode.removeChild(v);
                            if (m.length > 0) {
                                g = m[m.length - 1];
                                if (g && g.parentNode) {
                                    g.parentNode.removeChild(g)
                                }
                            }
                        }
                    }
                }
                var w;
                if (!s.support.appendChecked) {
                    if (c[0] && typeof(w = c.length) === "number") {
                        for (a = 0; a < w; a++) {
                            pt(c[a])
                        }
                    } else {
                        pt(c)
                    }
                }
                if (c.nodeType) {
                    f.push(c)
                } else {
                    f = s.merge(f, c)
                }
            }
            if (r) {
                o = function(e) {
                    return !e.type || it.test(e.type)
                };
                for (l = 0; f[l]; l++) {
                    u = f[l];
                    if (i && s.nodeName(u, "script") && (!u.type || it.test(u.type))) {
                        i.push(u.parentNode ? u.parentNode.removeChild(u) : u)
                    } else {
                        if (u.nodeType === 1) {
                            var E = s.grep(u.getElementsByTagName("script"), o);
                            f.splice.apply(f, [l + 1, 0].concat(E))
                        }
                        r.appendChild(u)
                    }
                }
            }
            return f
        },
        cleanData: function(e) {
            var t, n, r = s.cache,
                i = s.event.special,
                o = s.support.deleteExpando;
            for (var u = 0, a;
                (a = e[u]) != null; u++) {
                if (a.nodeName && s.noData[a.nodeName.toLowerCase()]) {
                    continue
                }
                n = a[s.expando];
                if (n) {
                    t = r[n];
                    if (t && t.events) {
                        for (var f in t.events) {
                            if (i[f]) {
                                s.event.remove(a, f)
                            } else {
                                s.removeEvent(a, f, t.handle)
                            }
                        }
                        if (t.handle) {
                            t.handle.elem = null
                        }
                    }
                    if (o) {
                        delete a[s.expando]
                    } else if (a.removeAttribute) {
                        a.removeAttribute(s.expando)
                    }
                    delete r[n]
                }
            }
        }
    });
    var vt = /alpha\([^)]*\)/i,
        mt = /opacity=([^)]*)/,
        gt = /([A-Z]|^ms)/g,
        yt = /^[\-+]?(?:\d*\.)?\d+$/i,
        bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
        wt = /^([\-+])=([\-+.\de]+)/,
        Et = /^margin/,
        St = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        xt = ["Top", "Right", "Bottom", "Left"],
        Tt, Nt, Ct;
    s.fn.css = function(e, n) {
        return s.access(this, function(e, n, r) {
            return r !== t ? s.style(e, n, r) : s.css(e, n)
        }, e, n, arguments.length > 1)
    };
    s.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Tt(e, "opacity");
                        return n === "" ? "1" : n
                    } else {
                        return e.style.opacity
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {
            "float": s.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, n, r, i) {
            if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) {
                return
            }
            var o, u, a = s.camelCase(n),
                f = e.style,
                l = s.cssHooks[a];
            n = s.cssProps[a] || a;
            if (r !== t) {
                u = typeof r;
                if (u === "string" && (o = wt.exec(r))) {
                    r = +(o[1] + 1) * +o[2] + parseFloat(s.css(e, n));
                    u = "number"
                }
                if (r == null || u === "number" && isNaN(r)) {
                    return
                }
                if (u === "number" && !s.cssNumber[a]) {
                    r += "px"
                }
                if (!l || !("set" in l) || (r = l.set(e, r)) !== t) {
                    try {
                        f[n] = r
                    } catch (c) {}
                }
            } else {
                if (l && "get" in l && (o = l.get(e, false, i)) !== t) {
                    return o
                }
                return f[n]
            }
        },
        css: function(e, n, r) {
            var i, o;
            n = s.camelCase(n);
            o = s.cssHooks[n];
            n = s.cssProps[n] || n;
            if (n === "cssFloat") {
                n = "float"
            }
            if (o && "get" in o && (i = o.get(e, true, r)) !== t) {
                return i
            } else if (Tt) {
                return Tt(e, n)
            }
        },
        swap: function(e, t, n) {
            var r = {},
                i, s;
            for (s in t) {
                r[s] = e.style[s];
                e.style[s] = t[s]
            }
            i = n.call(e);
            for (s in t) {
                e.style[s] = r[s]
            }
            return i
        }
    });
    s.curCSS = s.css;
    if (n.defaultView && n.defaultView.getComputedStyle) {
        Nt = function(e, t) {
            var n, r, i, o, u = e.style;
            t = t.replace(gt, "-$1").toLowerCase();
            if ((r = e.ownerDocument.defaultView) && (i = r.getComputedStyle(e, null))) {
                n = i.getPropertyValue(t);
                if (n === "" && !s.contains(e.ownerDocument.documentElement, e)) {
                    n = s.style(e, t)
                }
            }
            if (!s.support.pixelMargin && i && Et.test(t) && bt.test(n)) {
                o = u.width;
                u.width = n;
                n = i.width;
                u.width = o
            }
            return n
        }
    }
    if (n.documentElement.currentStyle) {
        Ct = function(e, t) {
            var n, r, i, s = e.currentStyle && e.currentStyle[t],
                o = e.style;
            if (s == null && o && (i = o[t])) {
                s = i
            }
            if (bt.test(s)) {
                n = o.left;
                r = e.runtimeStyle && e.runtimeStyle.left;
                if (r) {
                    e.runtimeStyle.left = e.currentStyle.left
                }
                o.left = t === "fontSize" ? "1em" : s;
                s = o.pixelLeft + "px";
                o.left = n;
                if (r) {
                    e.runtimeStyle.left = r
                }
            }
            return s === "" ? "auto" : s
        }
    }
    Tt = Nt || Ct;
    s.each(["height", "width"], function(e, t) {
        s.cssHooks[t] = {
            get: function(e, n, r) {
                if (n) {
                    if (e.offsetWidth !== 0) {
                        return kt(e, t, r)
                    } else {
                        return s.swap(e, St, function() {
                            return kt(e, t, r)
                        })
                    }
                }
            },
            set: function(e, t) {
                return yt.test(t) ? t + "px" : t
            }
        }
    });
    if (!s.support.opacity) {
        s.cssHooks.opacity = {
            get: function(e, t) {
                return mt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : t ? "1" : ""
            },
            set: function(e, t) {
                var n = e.style,
                    r = e.currentStyle,
                    i = s.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
                    o = r && r.filter || n.filter || "";
                n.zoom = 1;
                if (t >= 1 && s.trim(o.replace(vt, "")) === "") {
                    n.removeAttribute("filter");
                    if (r && !r.filter) {
                        return
                    }
                }
                n.filter = vt.test(o) ? o.replace(vt, i) : o + " " + i
            }
        }
    }
    s(function() {
        if (!s.support.reliableMarginRight) {
            s.cssHooks.marginRight = {
                get: function(e, t) {
                    return s.swap(e, {
                        display: "inline-block"
                    }, function() {
                        if (t) {
                            return Tt(e, "margin-right")
                        } else {
                            return e.style.marginRight
                        }
                    })
                }
            }
        }
    });
    if (s.expr && s.expr.filters) {
        s.expr.filters.hidden = function(e) {
            var t = e.offsetWidth,
                n = e.offsetHeight;
            return t === 0 && n === 0 || !s.support.reliableHiddenOffsets && (e.style && e.style.display || s.css(e, "display")) === "none"
        };
        s.expr.filters.visible = function(e) {
            return !s.expr.filters.hidden(e)
        }
    }
    s.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        s.cssHooks[e + t] = {
            expand: function(n) {
                var r, i = typeof n === "string" ? n.split(" ") : [n],
                    s = {};
                for (r = 0; r < 4; r++) {
                    s[e + xt[r] + t] = i[r] || i[r - 2] || i[0]
                }
                return s
            }
        }
    });
    var Lt = /%20/g,
        At = /\[\]$/,
        Ot = /\r?\n/g,
        Mt = /#.*$/,
        _t = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        Dt = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        Pt = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        Ht = /^(?:GET|HEAD)$/,
        Bt = /^\/\//,
        jt = /\?/,
        Ft = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        It = /^(?:select|textarea)/i,
        qt = /\s+/,
        Rt = /([?&])_=[^&]*/,
        Ut = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        zt = s.fn.load,
        Wt = {},
        Xt = {},
        Vt, $t, Jt = ["*/"] + ["*"];
    try {
        Vt = i.href
    } catch (Kt) {
        Vt = n.createElement("a");
        Vt.href = "";
        Vt = Vt.href
    }
    $t = Ut.exec(Vt.toLowerCase()) || [];
    s.fn.extend({
        load: function(e, n, r) {
            if (typeof e !== "string" && zt) {
                return zt.apply(this, arguments)
            } else if (!this.length) {
                return this
            }
            var i = e.indexOf(" ");
            if (i >= 0) {
                var o = e.slice(i, e.length);
                e = e.slice(0, i)
            }
            var u = "GET";
            if (n) {
                if (s.isFunction(n)) {
                    r = n;
                    n = t
                } else if (typeof n === "object") {
                    n = s.param(n, s.ajaxSettings.traditional);
                    u = "POST"
                }
            }
            var a = this;
            s.ajax({
                url: e,
                type: u,
                dataType: "html",
                data: n,
                complete: function(e, t, n) {
                    n = e.responseText;
                    if (e.isResolved()) {
                        e.done(function(e) {
                            n = e
                        });
                        a.html(o ? s("<div>").append(n.replace(Ft, "")).find(o) : n)
                    }
                    if (r) {
                        a.each(r, [n, t, e])
                    }
                }
            });
            return this
        },
        serialize: function() {
            return s.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? s.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || It.test(this.nodeName) || Dt.test(this.type))
            }).map(function(e, t) {
                var n = s(this).val();
                return n == null ? null : s.isArray(n) ? s.map(n, function(e, n) {
                    return {
                        name: t.name,
                        value: e.replace(Ot, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Ot, "\r\n")
                }
            }).get()
        }
    });
    s.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
        s.fn[t] = function(e) {
            return this.on(t, e)
        }
    });
    s.each(["get", "post"], function(e, n) {
        s[n] = function(e, r, i, o) {
            if (s.isFunction(r)) {
                o = o || i;
                i = r;
                r = t
            }
            return s.ajax({
                type: n,
                url: e,
                data: r,
                success: i,
                dataType: o
            })
        }
    });
    s.extend({
        getScript: function(e, n) {
            return s.get(e, t, n, "script")
        },
        getJSON: function(e, t, n) {
            return s.get(e, t, n, "json")
        },
        ajaxSetup: function(e, t) {
            if (t) {
                Yt(e, s.ajaxSettings)
            } else {
                t = e;
                e = s.ajaxSettings
            }
            Yt(e, t);
            return e
        },
        ajaxSettings: {
            url: Vt,
            isLocal: Pt.test($t[1]),
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: true,
            async: true,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Jt
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": true,
                "text json": s.parseJSON,
                "text xml": s.parseXML
            },
            flatOptions: {
                context: true,
                url: true
            }
        },
        ajaxPrefilter: Qt(Wt),
        ajaxTransport: Qt(Xt),
        ajax: function(e, n) {
            function S(e, n, c, h) {
                if (y === 2) {
                    return
                }
                y = 2;
                if (m) {
                    clearTimeout(m)
                }
                v = t;
                p = h || "";
                E.readyState = e > 0 ? 4 : 0;
                var d, g, w, S = n,
                    x = c ? en(r, E, c) : t,
                    T, N;
                if (e >= 200 && e < 300 || e === 304) {
                    if (r.ifModified) {
                        if (T = E.getResponseHeader("Last-Modified")) {
                            s.lastModified[l] = T
                        }
                        if (N = E.getResponseHeader("Etag")) {
                            s.etag[l] = N
                        }
                    }
                    if (e === 304) {
                        S = "notmodified";
                        d = true
                    } else {
                        try {
                            g = tn(r, x);
                            S = "success";
                            d = true
                        } catch (C) {
                            S = "parsererror";
                            w = C
                        }
                    }
                } else {
                    w = S;
                    if (!S || e) {
                        S = "error";
                        if (e < 0) {
                            e = 0
                        }
                    }
                }
                E.status = e;
                E.statusText = "" + (n || S);
                if (d) {
                    u.resolveWith(i, [g, S, E])
                } else {
                    u.rejectWith(i, [E, S, w])
                }
                E.statusCode(f);
                f = t;
                if (b) {
                    o.trigger("ajax" + (d ? "Success" : "Error"), [E, r, d ? g : w])
                }
                a.fireWith(i, [E, S]);
                if (b) {
                    o.trigger("ajaxComplete", [E, r]);
                    if (!--s.active) {
                        s.event.trigger("ajaxStop")
                    }
                }
            }
            if (typeof e === "object") {
                n = e;
                e = t
            }
            n = n || {};
            var r = s.ajaxSetup({}, n),
                i = r.context || r,
                o = i !== r && (i.nodeType || i instanceof s) ? s(i) : s.event,
                u = s.Deferred(),
                a = s.Callbacks("once memory"),
                f = r.statusCode || {},
                l, c = {},
                h = {},
                p, d, v, m, g, y = 0,
                b, w, E = {
                    readyState: 0,
                    setRequestHeader: function(e, t) {
                        if (!y) {
                            var n = e.toLowerCase();
                            e = h[n] = h[n] || e;
                            c[e] = t
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return y === 2 ? p : null
                    },
                    getResponseHeader: function(e) {
                        var n;
                        if (y === 2) {
                            if (!d) {
                                d = {};
                                while (n = _t.exec(p)) {
                                    d[n[1].toLowerCase()] = n[2]
                                }
                            }
                            n = d[e.toLowerCase()]
                        }
                        return n === t ? null : n
                    },
                    overrideMimeType: function(e) {
                        if (!y) {
                            r.mimeType = e
                        }
                        return this
                    },
                    abort: function(e) {
                        e = e || "abort";
                        if (v) {
                            v.abort(e)
                        }
                        S(0, e);
                        return this
                    }
                };
            u.promise(E);
            E.success = E.done;
            E.error = E.fail;
            E.complete = a.add;
            E.statusCode = function(e) {
                if (e) {
                    var t;
                    if (y < 2) {
                        for (t in e) {
                            f[t] = [f[t], e[t]]
                        }
                    } else {
                        t = e[E.status];
                        E.then(t, t)
                    }
                }
                return this
            };
            r.url = ((e || r.url) + "").replace(Mt, "").replace(Bt, $t[1] + "//");
            r.dataTypes = s.trim(r.dataType || "*").toLowerCase().split(qt);
            if (r.crossDomain == null) {
                g = Ut.exec(r.url.toLowerCase());
                r.crossDomain = !!(g && (g[1] != $t[1] || g[2] != $t[2] || (g[3] || (g[1] === "http:" ? 80 : 443)) != ($t[3] || ($t[1] === "http:" ? 80 : 443))))
            }
            if (r.data && r.processData && typeof r.data !== "string") {
                r.data = s.param(r.data, r.traditional)
            }
            Gt(Wt, r, n, E);
            if (y === 2) {
                return false
            }
            b = r.global;
            r.type = r.type.toUpperCase();
            r.hasContent = !Ht.test(r.type);
            if (b && s.active++ === 0) {
                s.event.trigger("ajaxStart")
            }
            if (!r.hasContent) {
                if (r.data) {
                    r.url += (jt.test(r.url) ? "&" : "?") + r.data;
                    delete r.data
                }
                l = r.url;
                if (r.cache === false) {
                    var x = s.now(),
                        T = r.url.replace(Rt, "$1_=" + x);
                    r.url = T + (T === r.url ? (jt.test(r.url) ? "&" : "?") + "_=" + x : "")
                }
            }
            if (r.data && r.hasContent && r.contentType !== false || n.contentType) {
                E.setRequestHeader("Content-Type", r.contentType)
            }
            if (r.ifModified) {
                l = l || r.url;
                if (s.lastModified[l]) {
                    E.setRequestHeader("If-Modified-Since", s.lastModified[l])
                }
                if (s.etag[l]) {
                    E.setRequestHeader("If-None-Match", s.etag[l])
                }
            }
            E.setRequestHeader("Accept", r.dataTypes[0] && r.accepts[r.dataTypes[0]] ? r.accepts[r.dataTypes[0]] + (r.dataTypes[0] !== "*" ? ", " + Jt + "; q=0.01" : "") : r.accepts["*"]);
            for (w in r.headers) {
                E.setRequestHeader(w, r.headers[w])
            }
            if (r.beforeSend && (r.beforeSend.call(i, E, r) === false || y === 2)) {
                E.abort();
                return false
            }
            for (w in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                E[w](r[w])
            }
            v = Gt(Xt, r, n, E);
            if (!v) {
                S(-1, "No Transport")
            } else {
                E.readyState = 1;
                if (b) {
                    o.trigger("ajaxSend", [E, r])
                }
                if (r.async && r.timeout > 0) {
                    m = setTimeout(function() {
                        E.abort("timeout")
                    }, r.timeout)
                }
                try {
                    y = 1;
                    v.send(c, S)
                } catch (N) {
                    if (y < 2) {
                        S(-1, N)
                    } else {
                        throw N
                    }
                }
            }
            return E
        },
        param: function(e, n) {
            var r = [],
                i = function(e, t) {
                    t = s.isFunction(t) ? t() : t;
                    r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
            if (n === t) {
                n = s.ajaxSettings.traditional
            }
            if (s.isArray(e) || e.jquery && !s.isPlainObject(e)) {
                s.each(e, function() {
                    i(this.name, this.value)
                })
            } else {
                for (var o in e) {
                    Zt(o, e[o], n, i)
                }
            }
            return r.join("&").replace(Lt, "+")
        }
    });
    s.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var nn = s.now(),
        rn = /(\=)\?(&|$)|\?\?/i;
    s.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return s.expando + "_" + nn++
        }
    });
    s.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i = typeof t.data === "string" && /^application\/x\-www\-form\-urlencoded/.test(t.contentType);
        if (t.dataTypes[0] === "jsonp" || t.jsonp !== false && (rn.test(t.url) || i && rn.test(t.data))) {
            var o, u = t.jsonpCallback = s.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
                a = e[u],
                f = t.url,
                l = t.data,
                c = "$1" + u + "$2";
            if (t.jsonp !== false) {
                f = f.replace(rn, c);
                if (t.url === f) {
                    if (i) {
                        l = l.replace(rn, c)
                    }
                    if (t.data === l) {
                        f += (/\?/.test(f) ? "&" : "?") + t.jsonp + "=" + u
                    }
                }
            }
            t.url = f;
            t.data = l;
            e[u] = function(e) {
                o = [e]
            };
            r.always(function() {
                e[u] = a;
                if (o && s.isFunction(a)) {
                    e[u](o[0])
                }
            });
            t.converters["script json"] = function() {
                if (!o) {
                    s.error(u + " was not called")
                }
                return o[0]
            };
            t.dataTypes[0] = "json";
            return "script"
        }
    });
    s.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(e) {
                s.globalEval(e);
                return e
            }
        }
    });
    s.ajaxPrefilter("script", function(e) {
        if (e.cache === t) {
            e.cache = false
        }
        if (e.crossDomain) {
            e.type = "GET";
            e.global = false
        }
    });
    s.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var r, i = n.head || n.getElementsByTagName("head")[0] || n.documentElement;
            return {
                send: function(s, o) {
                    r = n.createElement("script");
                    r.async = "async";
                    if (e.scriptCharset) {
                        r.charset = e.scriptCharset
                    }
                    r.src = e.url;
                    r.onload = r.onreadystatechange = function(e, n) {
                        if (n || !r.readyState || /loaded|complete/.test(r.readyState)) {
                            r.onload = r.onreadystatechange = null;
                            if (i && r.parentNode) {
                                i.removeChild(r)
                            }
                            r = t;
                            if (!n) {
                                o(200, "success")
                            }
                        }
                    };
                    i.insertBefore(r, i.firstChild)
                },
                abort: function() {
                    if (r) {
                        r.onload(0, 1)
                    }
                }
            }
        }
    });
    var sn = e.ActiveXObject ? function() {
            for (var e in un) {
                un[e](0, 1)
            }
        } : false,
        on = 0,
        un;
    s.ajaxSettings.xhr = e.ActiveXObject ? function() {
        return !this.isLocal && an() || fn()
    } : an;
    (function(e) {
        s.extend(s.support, {
            ajax: !!e,
            cors: !!e && "withCredentials" in e
        })
    })(s.ajaxSettings.xhr());
    if (s.support.ajax) {
        s.ajaxTransport(function(n) {
            if (!n.crossDomain || s.support.cors) {
                var r;
                return {
                    send: function(i, o) {
                        var u = n.xhr(),
                            a, f;
                        if (n.username) {
                            u.open(n.type, n.url, n.async, n.username, n.password)
                        } else {
                            u.open(n.type, n.url, n.async)
                        }
                        if (n.xhrFields) {
                            for (f in n.xhrFields) {
                                u[f] = n.xhrFields[f]
                            }
                        }
                        if (n.mimeType && u.overrideMimeType) {
                            u.overrideMimeType(n.mimeType)
                        }
                        if (!n.crossDomain && !i["X-Requested-With"]) {
                            i["X-Requested-With"] = "XMLHttpRequest"
                        }
                        try {
                            for (f in i) {
                                u.setRequestHeader(f, i[f])
                            }
                        } catch (l) {}
                        u.send(n.hasContent && n.data || null);
                        r = function(e, i) {
                            var f, l, c, h, p;
                            try {
                                if (r && (i || u.readyState === 4)) {
                                    r = t;
                                    if (a) {
                                        u.onreadystatechange = s.noop;
                                        if (sn) {
                                            delete un[a]
                                        }
                                    }
                                    if (i) {
                                        if (u.readyState !== 4) {
                                            u.abort()
                                        }
                                    } else {
                                        f = u.status;
                                        c = u.getAllResponseHeaders();
                                        h = {};
                                        p = u.responseXML;
                                        if (p && p.documentElement) {
                                            h.xml = p
                                        }
                                        try {
                                            h.text = u.responseText
                                        } catch (e) {}
                                        try {
                                            l = u.statusText
                                        } catch (d) {
                                            l = ""
                                        }
                                        if (!f && n.isLocal && !n.crossDomain) {
                                            f = h.text ? 200 : 404
                                        } else if (f === 1223) {
                                            f = 204
                                        }
                                    }
                                }
                            } catch (v) {
                                if (!i) {
                                    o(-1, v)
                                }
                            }
                            if (h) {
                                o(f, l, h, c)
                            }
                        };
                        if (!n.async || u.readyState === 4) {
                            r()
                        } else {
                            a = ++on;
                            if (sn) {
                                if (!un) {
                                    un = {};
                                    s(e).unload(sn)
                                }
                                un[a] = r
                            }
                            u.onreadystatechange = r
                        }
                    },
                    abort: function() {
                        if (r) {
                            r(0, 1)
                        }
                    }
                }
            }
        })
    }
    var ln = {},
        cn, hn, pn = /^(?:toggle|show|hide)$/,
        dn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        vn, mn = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ],
        gn;
    s.fn.extend({
        show: function(e, t, n) {
            var r, i;
            if (e || e === 0) {
                return this.animate(wn("show", 3), e, t, n)
            } else {
                for (var o = 0, u = this.length; o < u; o++) {
                    r = this[o];
                    if (r.style) {
                        i = r.style.display;
                        if (!s._data(r, "olddisplay") && i === "none") {
                            i = r.style.display = ""
                        }
                        if (i === "" && s.css(r, "display") === "none" || !s.contains(r.ownerDocument.documentElement, r)) {
                            s._data(r, "olddisplay", En(r.nodeName))
                        }
                    }
                }
                for (o = 0; o < u; o++) {
                    r = this[o];
                    if (r.style) {
                        i = r.style.display;
                        if (i === "" || i === "none") {
                            r.style.display = s._data(r, "olddisplay") || ""
                        }
                    }
                }
                return this
            }
        },
        hide: function(e, t, n) {
            if (e || e === 0) {
                return this.animate(wn("hide", 3), e, t, n)
            } else {
                var r, i, o = 0,
                    u = this.length;
                for (; o < u; o++) {
                    r = this[o];
                    if (r.style) {
                        i = s.css(r, "display");
                        if (i !== "none" && !s._data(r, "olddisplay")) {
                            s._data(r, "olddisplay", i)
                        }
                    }
                }
                for (o = 0; o < u; o++) {
                    if (this[o].style) {
                        this[o].style.display = "none"
                    }
                }
                return this
            }
        },
        _toggle: s.fn.toggle,
        toggle: function(e, t, n) {
            var r = typeof e === "boolean";
            if (s.isFunction(e) && s.isFunction(t)) {
                this._toggle.apply(this, arguments)
            } else if (e == null || r) {
                this.each(function() {
                    var t = r ? e : s(this).is(":hidden");
                    s(this)[t ? "show" : "hide"]()
                })
            } else {
                this.animate(wn("toggle", 3), e, t, n)
            }
            return this
        },
        fadeTo: function(e, t, n, r) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            function o() {
                if (i.queue === false) {
                    s._mark(this)
                }
                var t = s.extend({}, i),
                    n = this.nodeType === 1,
                    r = n && s(this).is(":hidden"),
                    o, u, a, f, l, c, h, p, d, v, m;
                t.animatedProperties = {};
                for (a in e) {
                    o = s.camelCase(a);
                    if (a !== o) {
                        e[o] = e[a];
                        delete e[a]
                    }
                    if ((l = s.cssHooks[o]) && "expand" in l) {
                        c = l.expand(e[o]);
                        delete e[o];
                        for (a in c) {
                            if (!(a in e)) {
                                e[a] = c[a]
                            }
                        }
                    }
                }
                for (o in e) {
                    u = e[o];
                    if (s.isArray(u)) {
                        t.animatedProperties[o] = u[1];
                        u = e[o] = u[0]
                    } else {
                        t.animatedProperties[o] = t.specialEasing && t.specialEasing[o] || t.easing || "swing"
                    }
                    if (u === "hide" && r || u === "show" && !r) {
                        return t.complete.call(this)
                    }
                    if (n && (o === "height" || o === "width")) {
                        t.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                        if (s.css(this, "display") === "inline" && s.css(this, "float") === "none") {
                            if (!s.support.inlineBlockNeedsLayout || En(this.nodeName) === "inline") {
                                this.style.display = "inline-block"
                            } else {
                                this.style.zoom = 1
                            }
                        }
                    }
                }
                if (t.overflow != null) {
                    this.style.overflow = "hidden"
                }
                for (a in e) {
                    f = new s.fx(this, t, a);
                    u = e[a];
                    if (pn.test(u)) {
                        m = s._data(this, "toggle" + a) || (u === "toggle" ? r ? "show" : "hide" : 0);
                        if (m) {
                            s._data(this, "toggle" + a, m === "show" ? "hide" : "show");
                            f[m]()
                        } else {
                            f[u]()
                        }
                    } else {
                        h = dn.exec(u);
                        p = f.cur();
                        if (h) {
                            d = parseFloat(h[2]);
                            v = h[3] || (s.cssNumber[a] ? "" : "px");
                            if (v !== "px") {
                                s.style(this, a, (d || 1) + v);
                                p = (d || 1) / f.cur() * p;
                                s.style(this, a, p + v)
                            }
                            if (h[1]) {
                                d = (h[1] === "-=" ? -1 : 1) * d + p
                            }
                            f.custom(p, d, v)
                        } else {
                            f.custom(p, u, "")
                        }
                    }
                }
                return true
            }
            var i = s.speed(t, n, r);
            if (s.isEmptyObject(e)) {
                return this.each(i.complete, [false])
            }
            e = s.extend({}, e);
            return i.queue === false ? this.each(o) : this.queue(i.queue, o)
        },
        stop: function(e, n, r) {
            if (typeof e !== "string") {
                r = n;
                n = e;
                e = t
            }
            if (n && e !== false) {
                this.queue(e || "fx", [])
            }
            return this.each(function() {
                function u(e, t, n) {
                    var i = t[n];
                    s.removeData(e, n, true);
                    i.stop(r)
                }
                var t, n = false,
                    i = s.timers,
                    o = s._data(this);
                if (!r) {
                    s._unmark(true, this)
                }
                if (e == null) {
                    for (t in o) {
                        if (o[t] && o[t].stop && t.indexOf(".run") === t.length - 4) {
                            u(this, o, t)
                        }
                    }
                } else if (o[t = e + ".run"] && o[t].stop) {
                    u(this, o, t)
                }
                for (t = i.length; t--;) {
                    if (i[t].elem === this && (e == null || i[t].queue === e)) {
                        if (r) {
                            i[t](true)
                        } else {
                            i[t].saveState()
                        }
                        n = true;
                        i.splice(t, 1)
                    }
                }
                if (!(r && n)) {
                    s.dequeue(this, e)
                }
            })
        }
    });
    s.each({
        slideDown: wn("show", 1),
        slideUp: wn("hide", 1),
        slideToggle: wn("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        s.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    });
    s.extend({
        speed: function(e, t, n) {
            var r = e && typeof e === "object" ? s.extend({}, e) : {
                complete: n || !n && t || s.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !s.isFunction(t) && t
            };
            r.duration = s.fx.off ? 0 : typeof r.duration === "number" ? r.duration : r.duration in s.fx.speeds ? s.fx.speeds[r.duration] : s.fx.speeds._default;
            if (r.queue == null || r.queue === true) {
                r.queue = "fx"
            }
            r.old = r.complete;
            r.complete = function(e) {
                if (s.isFunction(r.old)) {
                    r.old.call(this)
                }
                if (r.queue) {
                    s.dequeue(this, r.queue)
                } else if (e !== false) {
                    s._unmark(this)
                }
            };
            return r
        },
        easing: {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return -Math.cos(e * Math.PI) / 2 + .5
            }
        },
        timers: [],
        fx: function(e, t, n) {
            this.options = t;
            this.elem = e;
            this.prop = n;
            t.orig = t.orig || {}
        }
    });
    s.fx.prototype = {
        update: function() {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }(s.fx.step[this.prop] || s.fx.step._default)(this)
        },
        cur: function() {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop]
            }
            var e, t = s.css(this.elem, this.prop);
            return isNaN(e = parseFloat(t)) ? !t || t === "auto" ? 0 : t : e
        },
        custom: function(e, n, r) {
            function u(e) {
                return i.step(e)
            }
            var i = this,
                o = s.fx;
            this.startTime = gn || yn();
            this.end = n;
            this.now = this.start = e;
            this.pos = this.state = 0;
            this.unit = r || this.unit || (s.cssNumber[this.prop] ? "" : "px");
            u.queue = this.options.queue;
            u.elem = this.elem;
            u.saveState = function() {
                if (s._data(i.elem, "fxshow" + i.prop) === t) {
                    if (i.options.hide) {
                        s._data(i.elem, "fxshow" + i.prop, i.start)
                    } else if (i.options.show) {
                        s._data(i.elem, "fxshow" + i.prop, i.end)
                    }
                }
            };
            if (u() && s.timers.push(u) && !vn) {
                vn = setInterval(o.tick, o.interval)
            }
        },
        show: function() {
            var e = s._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = e || s.style(this.elem, this.prop);
            this.options.show = true;
            if (e !== t) {
                this.custom(this.cur(), e)
            } else {
                this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur())
            }
            s(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = s._data(this.elem, "fxshow" + this.prop) || s.style(this.elem, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function(e) {
            var t, n, r, i = gn || yn(),
                o = true,
                u = this.elem,
                a = this.options;
            if (e || i >= a.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                a.animatedProperties[this.prop] = true;
                for (t in a.animatedProperties) {
                    if (a.animatedProperties[t] !== true) {
                        o = false
                    }
                }
                if (o) {
                    if (a.overflow != null && !s.support.shrinkWrapBlocks) {
                        s.each(["", "X", "Y"], function(e, t) {
                            u.style["overflow" + t] = a.overflow[e]
                        })
                    }
                    if (a.hide) {
                        s(u).hide()
                    }
                    if (a.hide || a.show) {
                        for (t in a.animatedProperties) {
                            s.style(u, t, a.orig[t]);
                            s.removeData(u, "fxshow" + t, true);
                            s.removeData(u, "toggle" + t, true)
                        }
                    }
                    r = a.complete;
                    if (r) {
                        a.complete = false;
                        r.call(u)
                    }
                }
                return false
            } else {
                if (a.duration == Infinity) {
                    this.now = i
                } else {
                    n = i - this.startTime;
                    this.state = n / a.duration;
                    this.pos = s.easing[a.animatedProperties[this.prop]](this.state, n, 0, 1, a.duration);
                    this.now = this.start + (this.end - this.start) * this.pos
                }
                this.update()
            }
            return true
        }
    };
    s.extend(s.fx, {
        tick: function() {
            var e, t = s.timers,
                n = 0;
            for (; n < t.length; n++) {
                e = t[n];
                if (!e() && t[n] === e) {
                    t.splice(n--, 1)
                }
            }
            if (!t.length) {
                s.fx.stop()
            }
        },
        interval: 13,
        stop: function() {
            clearInterval(vn);
            vn = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(e) {
                s.style(e.elem, "opacity", e.now)
            },
            _default: function(e) {
                if (e.elem.style && e.elem.style[e.prop] != null) {
                    e.elem.style[e.prop] = e.now + e.unit
                } else {
                    e.elem[e.prop] = e.now
                }
            }
        }
    });
    s.each(mn.concat.apply([], mn), function(e, t) {
        if (t.indexOf("margin")) {
            s.fx.step[t] = function(e) {
                s.style(e.elem, t, Math.max(0, e.now) + e.unit)
            }
        }
    });
    if (s.expr && s.expr.filters) {
        s.expr.filters.animated = function(e) {
            return s.grep(s.timers, function(t) {
                return e === t.elem
            }).length
        }
    }
    var Sn, xn = /^t(?:able|d|h)$/i,
        Tn = /^(?:body|html)$/i;
    if ("getBoundingClientRect" in n.documentElement) {
        Sn = function(e, t, n, r) {
            try {
                r = e.getBoundingClientRect()
            } catch (i) {}
            if (!r || !s.contains(n, e)) {
                return r ? {
                    top: r.top,
                    left: r.left
                } : {
                    top: 0,
                    left: 0
                }
            }
            var o = t.body,
                u = Nn(t),
                a = n.clientTop || o.clientTop || 0,
                f = n.clientLeft || o.clientLeft || 0,
                l = u.pageYOffset || s.support.boxModel && n.scrollTop || o.scrollTop,
                c = u.pageXOffset || s.support.boxModel && n.scrollLeft || o.scrollLeft,
                h = r.top + l - a,
                p = r.left + c - f;
            return {
                top: h,
                left: p
            }
        }
    } else {
        Sn = function(e, t, n) {
            var r, i = e.offsetParent,
                o = e,
                u = t.body,
                a = t.defaultView,
                f = a ? a.getComputedStyle(e, null) : e.currentStyle,
                l = e.offsetTop,
                c = e.offsetLeft;
            while ((e = e.parentNode) && e !== u && e !== n) {
                if (s.support.fixedPosition && f.position === "fixed") {
                    break
                }
                r = a ? a.getComputedStyle(e, null) : e.currentStyle;
                l -= e.scrollTop;
                c -= e.scrollLeft;
                if (e === i) {
                    l += e.offsetTop;
                    c += e.offsetLeft;
                    if (s.support.doesNotAddBorder && !(s.support.doesAddBorderForTableAndCells && xn.test(e.nodeName))) {
                        l += parseFloat(r.borderTopWidth) || 0;
                        c += parseFloat(r.borderLeftWidth) || 0
                    }
                    o = i;
                    i = e.offsetParent
                }
                if (s.support.subtractsBorderForOverflowNotVisible && r.overflow !== "visible") {
                    l += parseFloat(r.borderTopWidth) || 0;
                    c += parseFloat(r.borderLeftWidth) || 0
                }
                f = r
            }
            if (f.position === "relative" || f.position === "static") {
                l += u.offsetTop;
                c += u.offsetLeft
            }
            if (s.support.fixedPosition && f.position === "fixed") {
                l += Math.max(n.scrollTop, u.scrollTop);
                c += Math.max(n.scrollLeft, u.scrollLeft)
            }
            return {
                top: l,
                left: c
            }
        }
    }
    s.fn.offset = function(e) {
        if (arguments.length) {
            return e === t ? this : this.each(function(t) {
                s.offset.setOffset(this, e, t)
            })
        }
        var n = this[0],
            r = n && n.ownerDocument;
        if (!r) {
            return null
        }
        if (n === r.body) {
            return s.offset.bodyOffset(n)
        }
        return Sn(n, r, r.documentElement)
    };
    s.offset = {
        bodyOffset: function(e) {
            var t = e.offsetTop,
                n = e.offsetLeft;
            if (s.support.doesNotIncludeMarginInBodyOffset) {
                t += parseFloat(s.css(e, "marginTop")) || 0;
                n += parseFloat(s.css(e, "marginLeft")) || 0
            }
            return {
                top: t,
                left: n
            }
        },
        setOffset: function(e, t, n) {
            var r = s.css(e, "position");
            if (r === "static") {
                e.style.position = "relative"
            }
            var i = s(e),
                o = i.offset(),
                u = s.css(e, "top"),
                a = s.css(e, "left"),
                f = (r === "absolute" || r === "fixed") && s.inArray("auto", [u, a]) > -1,
                l = {},
                c = {},
                h, p;
            if (f) {
                c = i.position();
                h = c.top;
                p = c.left
            } else {
                h = parseFloat(u) || 0;
                p = parseFloat(a) || 0
            }
            if (s.isFunction(t)) {
                t = t.call(e, n, o)
            }
            if (t.top != null) {
                l.top = t.top - o.top + h
            }
            if (t.left != null) {
                l.left = t.left - o.left + p
            }
            if ("using" in t) {
                t.using.call(e, l)
            } else {
                i.css(l)
            }
        }
    };
    s.fn.extend({
        position: function() {
            if (!this[0]) {
                return null
            }
            var e = this[0],
                t = this.offsetParent(),
                n = this.offset(),
                r = Tn.test(t[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : t.offset();
            n.top -= parseFloat(s.css(e, "marginTop")) || 0;
            n.left -= parseFloat(s.css(e, "marginLeft")) || 0;
            r.top += parseFloat(s.css(t[0], "borderTopWidth")) || 0;
            r.left += parseFloat(s.css(t[0], "borderLeftWidth")) || 0;
            return {
                top: n.top - r.top,
                left: n.left - r.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || n.body;
                while (e && !Tn.test(e.nodeName) && s.css(e, "position") === "static") {
                    e = e.offsetParent
                }
                return e
            })
        }
    });
    s.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, n) {
        var r = /Y/.test(n);
        s.fn[e] = function(i) {
            return s.access(this, function(e, i, o) {
                var u = Nn(e);
                if (o === t) {
                    return u ? n in u ? u[n] : s.support.boxModel && u.document.documentElement[i] || u.document.body[i] : e[i]
                }
                if (u) {
                    u.scrollTo(!r ? o : s(u).scrollLeft(), r ? o : s(u).scrollTop())
                } else {
                    e[i] = o
                }
            }, e, i, arguments.length, null)
        }
    });
    s.each({
        Height: "height",
        Width: "width"
    }, function(e, n) {
        var r = "client" + e,
            i = "scroll" + e,
            o = "offset" + e;
        s.fn["inner" + e] = function() {
            var e = this[0];
            return e ? e.style ? parseFloat(s.css(e, n, "padding")) : this[n]() : null
        };
        s.fn["outer" + e] = function(e) {
            var t = this[0];
            return t ? t.style ? parseFloat(s.css(t, n, e ? "margin" : "border")) : this[n]() : null
        };
        s.fn[n] = function(e) {
            return s.access(this, function(e, n, u) {
                var a, f, l, c;
                if (s.isWindow(e)) {
                    a = e.document;
                    f = a.documentElement[r];
                    return s.support.boxModel && f || a.body && a.body[r] || f
                }
                if (e.nodeType === 9) {
                    a = e.documentElement;
                    if (a[r] >= a[i]) {
                        return a[r]
                    }
                    return Math.max(e.body[i], a[i], e.body[o], a[o])
                }
                if (u === t) {
                    l = s.css(e, n);
                    c = parseFloat(l);
                    return s.isNumeric(c) ? c : l
                }
                s(e).css(n, u)
            }, n, e, arguments.length, null)
        }
    });
    e.jQuery = e.$ = s;
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define("jquery", [], function() {
            return s
        })
    }
})(window)