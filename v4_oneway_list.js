if (typeof JSON !== "object") {
    JSON = {};
}(function() {
    function f(n) {
        return n < 10 ? "0" + n : n;
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf();
        };
    }
    var cx, escapable, gap, indent, meta, rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
            case "string":
                return quote(value);
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
                return String(value);
            case "object":
                if (!value) {
                    return "null";
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null";
                    }
                    v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v);
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v);
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v;
        }
    }
    if (typeof JSON.stringify !== "function") {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }
            } else {
                if (typeof space === "string") {
                    indent = space;
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }
            return str("", {
                "": value
            });
        };
    }
    if (typeof JSON.parse !== "function") {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function(text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j;
            }
            throw new SyntaxError("JSON.parse");
        };
    }
}());
var newTrackAction = trackAction;
trackAction = function() {
    $jex.console.trace("CALL OLD API __ trackAction");
};
var TsinghuaOneWayTracker = (function() {
    var b = {};
    var c = document.cookie.match(/QunarGlobal=([^;]*)/);
    if (c) {
        c = c[1];
    }
    b.track = function(i, d, h, g, f) {
        var k = "/site/trace.htm?" + i + "=" + d + "&c=" + c;
        if (h) {
            k += "&t=" + h;
        }
        if (g) {
            k += "&p=" + g;
        }
        if (f) {
            k += f;
        }
        if (k.length >= 1500) {
            return;
        }
        try {
            new Image().src = k;
        } catch (j) {}
    };
    b.traceFlist = function(d) {
        var e = [];
        $jex.foreach(d, function(h) {
            var g = h.dataSource(),
                i, f;
            if (g.type === "transfer") {
                i = g.firstTrip();
                f = g.secondTrip();
                e.push([g.firstTrip().code() + "/" + g.secondTrip().code(), g.lowestPrice(), g.lowestDiscount(), g.secondTrip().deptDate(), [i.stopover() ? 1 : 0, i.codeShare() ? 1 : 0, i.isNextDate() ? 1 : 0].join(","), [f.stopover() ? 1 : 0, f.codeShare() ? 1 : 0, f.isNextDate() ? 1 : 0].join(",")].join("|"));
            } else {
                e.push([g.code(), g.lowestPrice(), g.lowestDiscount(), "", [g.stopover() ? 1 : 0, g.codeShare() ? 1 : 0, g.isNextDate() ? 1 : 0].join(","), ""].join("|"));
            }
        });
        this.track("flist", e.join("^"), System.service.traceTimeStamp);
    };
    b.traceReAndRfList = function(e) {
        var f = [];
        var d = [];
        $jex.foreach(e, function(r) {
            var m = r.dataSource();
            var t = [];
            var o = m.type === "transfer";
            var h = o ? m.firstTrip().code() + "/" + m.secondTrip().code() : m.code();
            if (r.reWrCache) {
                var k = r.reWrCache.entity;
                var g = k.afeePrice() || k.bprPrice();
                f.push([h, k.wrapperId(), g].join("|"));
            }
            t.push([h, o ? m.firstTrip().plane().key + "/" + m.secondTrip().plane().key : m.plane().key, o ? m.firstTrip().deptTime().replace(":", "") + "/" + m.secondTrip().deptTime().replace(":", "") : m.deptTime().replace(":", ""), o ? m.firstTrip().arriTime().replace(":", "") + "/" + m.secondTrip().arriTime().replace(":", "") : m.arriTime().replace(":", ""), m.airportCodes().join("/"), o ? m.firstTrip().dptTower() + "/" + m.secondTrip().dptTower() : m.dptTower()].join("|"));
            var q = [0, 0];
            if (!o) {
                var u = r.sinfoCache,
                    n = ["lqf", "hot", "ps", "late", "lcc"];
                if (u) {
                    for (var l = 0; l < 5; l++) {
                        if (u[n[l]]) {
                            q[0] = l + 1;
                            break;
                        }
                    }
                }
                var p = m.priceInfo && m.priceInfo();
                var j = p && p.tc || "";
                if (j && !m.isAV()) {
                    if (j.indexOf("头等") > -1) {
                        q[1] = 1;
                    } else {
                        if (j.indexOf("公务") > -1) {
                            q[1] = 2;
                        }
                    }
                }
            }
            t.push(q.join(""));
            d.push(t.join("|"));
        });
        if (f.length) {
            this.track("frecommend", f.join("^"), System.service.traceTimeStamp);
        }
        if (d.length) {
            this.track("fstatus", d.join("^"), System.service.traceTimeStamp);
        }
    };
    b.trackOnRefreshed = function(d) {
        this.traceFlist(d);
        this.traceReAndRfList(d);
    };
    var a = {};
    b.trackWrappers = function(j) {
        var n = System.service.wrapperExpandStamp && System.service.wrapperExpandStamp >= System.service.traceTimeStamp ? System.service.wrapperExpandStamp : System.service.traceTimeStamp;
        var h = j.code();
        var r = j.codeShare(),
            e = j.codeShareFlight();
        if (r && e) {
            if (h !== r) {
                h += ">" + r;
            }
        }
        if (a[h + n]) {
            return;
        } else {
            a[h + n] = true;
        }
        var q = j.wrappers();
        var o = q._keysCache;
        var g = [];
        var s = [];
        var k = "";
        var m = parseInt(j.lowestPrice(), 10);
        var f = parseFloat(j.flightHistory()[1]);
        var d = j.extInfo();
        if (m && f) {
            if (m > f * 1.05) {
                k += "1";
            } else {
                if (m <= f * 1.05 && m >= f * 0.95) {
                    k += "0";
                } else {
                    if (m < f * 0.95) {
                        k += "-1";
                    }
                }
            }
        } else {
            k += "*";
        }
        if (d && d.ml === "true") {
            k += "1";
        } else {
            k += "0";
        }
        if (d && d.zj && d.zj.info) {
            k += "1";
        } else {
            k += "0";
        }
        $jex.foreach(o, function(v, t) {
            var u = q.get(v);
            var x = 0;
            if (u.bigLogoUrl()) {
                x = 1;
            } else {
                if (u.vendor().isSuperOTA()) {
                    x = 2;
                }
            }
            g.push([u.wrapperId(), u.afeePrice() || 0, u.bprPrice() || 0, u.afee(), x, u.isApplyPrice() ? 1 : 0, j.type && j.type == "compose" ? "1" : "0"].join("|"));
            var w = u.vendor().starRank();
            var y = w && w.lv || 0;
            var z = u.vendor();
            s.push([u.wrapperId(), y ? [y.kd, y.ts, y.dw, y.db, y.ds].join(",") : 0, w ? w.count : 0, u.updateTime(), z.srv_CATA() ? 1 : 0, z.srv_ASSISTANT() ? 1 : 0, z.srv_ALLDAY() ? 1 : 0, u.getTGQInfo() ? 1 : 0, u.isFCabin() ? 1 : 0, z.isSuperOTA() ? 1 : 0].join("|"));
        });
        var p = "";
        if (j.type == "onewayInTransfer") {
            p = "&package=" + j.owner().firstTrip().code() + "/" + j.owner().secondTrip().code();
        } else {
            p = "&package=" + j.code();
        }
        var l = 0;
        if (j.priceInfo) {
            l = j.priceInfo().wrlen;
        }
        var i = j.getWrapperListType && j.getWrapperListType() || "";
        if (g.length > 0) {
            this.track("wlist", g.join("^"), System.service.traceTimeStamp, null, "&num=" + l + "&code=" + h + "&detail=" + k + p + "&wt=" + n + "&wtype=" + i);
        }
        if (s.length > 0) {
            this.track("wstatus", s.join("^"), System.service.traceTimeStamp, null, "&code=" + h + p + "&wt=" + n + "&wtype=" + i);
        }
    };
    b.trackLowPrChange = function(n, f) {
        var d = System.service.wrapperExpandStamp && System.service.wrapperExpandStamp >= System.service.traceTimeStamp ? System.service.wrapperExpandStamp : System.service.traceTimeStamp;
        var x = n.code();
        var k = n.wrappers();
        var w = k._keysCache || [];
        if (w.length == 0) {
            return;
        }
        var l = parseInt(n.lowestPrice(), 10);
        var j = 0;
        var e = [];
        var m, s;
        $jex.foreach(w, function(y, i) {
            m = k.get(y);
            e.push(m);
            s = m.afeePrice() || m.bprPrice();
            if (s == l) {
                j = 1;
            }
        });
        var t, r;
        var p = e.sort(function(y, i) {
            t = y.afeePrice() || y.bprPrice();
            r = i.afeePrice() || i.bprPrice();
            return t - r;
        });
        var v = p[0].afeePrice() || p[0].bprPrice();
        var g = x + "^" + f + "^" + j + "^";
        var h;
        if (n.lowestPrice() != n.priceInfo().lowpr) {
            h = n.lastPriceGroup() ? n.lastPriceGroup().lpwr : "";
        } else {
            h = n.priceGroup() ? n.priceGroup().lpwr : [];
        }
        h = (h ? h.join(",").replace(/_[a-z]+/g, "") : "");
        g += h + "|" + l;
        g += "^" + p[0].wrapperId();
        for (var u = 1; u < p.length; u++) {
            var q = p[u].afeePrice() || p[u].bprPrice();
            if (q == v) {
                g += "," + p[u].wrapperId();
            } else {
                break;
            }
        }
        g += "|" + v;
        var o = DomesticOnewaySearchService.queryId();
        this.track("wnotfind", g, System.service.traceTimeStamp, null, "&wt=" + d + "&queryId=" + o + "&label=" + n.getWrapperListType());
    };
    b.trackZFY = function(e, d) {
        var f = [d.code(), e.dptZh, e.arrZh, d.deptDate(), e.tPrice];
        this.track("zfy", f.join("^"), new Date().valueOf(), null, "");
    };
    b.trackTabChange = function(j, f) {
        var h = f.vendorListUI().tabsCache || {};
        var g = h.show || [],
            e = h.price || [];
        var d = f.dataSource().code();
        var i = ["&type=", j, "&tabs=", g.join("^"), "&lowps=", e.join("^"), "&fcode=", d, "&ct=", System.service.wrapperExpandStamp].join("");
        this.track("tabclick", "", System.service.traceTimeStamp, null, i);
    };
    b.bookingHoldTrack = function(g, e, j, f) {
        var d = g.ownerFlight();
        d = d._shareFlight || d;
        var h = 0;
        if (CLIENT_TIME && SERVER_TIME) {
            h = (new Date().getTime() - CLIENT_TIME.getTime()) + SERVER_TIME.getTime();
        } else {
            h = new Date().getTime();
        }
        var i = [d.code(), d.getWrapperListType(), g.wrapperId(), g.vendor().name(), e, j || 0, f || 0, h].join("|");
        this.track("fIntercept", i, System.service.traceTimeStamp, null, "&wt=" + (System.service.wrapperExpandStamp || ""));
    };
    b.noWrapperList = function(e) {
        var h = e.flightKeyCode();
        var d = e.getWrapperListType();
        var g = e.priceInfo();
        var f = [h, d, g.cabin, g.tc, [g.lowpr, g.hipr, g.wrlen].join(","), [g.bflowpr, g.bfhipr, g.bfwrlen].join(","), [g.slowpr, g.shipr, g.swrlen].join(","), ];
        TsinghuaOneWayTracker.track("fnowrapper", f.join("^"), System.service.traceTimeStamp);
    };
    return b;
})();
(function(a) {
    var e, c, b, g = a.document;
    if (typeof BOOMR === "undefined") {
        BOOMR = {};
    }
    if (BOOMR.version) {
        return;
    }
    BOOMR.version = "0.9";
    e = {
        beacon_url: "",
        site_domain: a.location.hostname.replace(/.*?([^.]+\.[^.]+)\.?$/, "$1").toLowerCase(),
        user_ip: "",
        events: {
            page_ready: [],
            page_unload: [],
            visibility_changed: [],
            before_beacon: []
        },
        vars: {},
        disabled_plugins: {},
        fireEvent: function(d, l) {
            var j, k, m;
            if (!this.events.hasOwnProperty(d)) {
                return false;
            }
            m = this.events[d];
            for (j = 0; j < m.length; j++) {
                k = m[j];
                k[0].call(k[2], l, k[1]);
            }
            return true;
        },
        addListener: function(i, j, h, d) {
            if (i.addEventListener) {
                i.addEventListener(j, h, (d));
            } else {
                if (i.attachEvent) {
                    i.attachEvent("on" + j, h);
                }
            }
        }
    };
    c = {
        utils: {
            getCookie: function(d) {
                if (!d) {
                    return null;
                }
                d = " " + d + "=";
                var h, j;
                j = " " + g.cookie + ";";
                if ((h = j.indexOf(d)) >= 0) {
                    h += d.length;
                    j = j.substring(h, j.indexOf(";", h));
                    return j;
                }
                return null;
            },
            setCookie: function(h, d, n, r, l, m) {
                var q = "",
                    j, p, o, i = "";
                if (!h) {
                    return false;
                }
                for (j in d) {
                    if (d.hasOwnProperty(j)) {
                        q += "&" + encodeURIComponent(j) + "=" + encodeURIComponent(d[j]);
                    }
                }
                q = q.replace(/^&/, "");
                if (n) {
                    i = new Date();
                    i.setTime(i.getTime() + n * 1000);
                    i = i.toGMTString();
                }
                p = h + "=" + q;
                o = p + ((n) ? "; expires=" + i : "") + ((r) ? "; path=" + r : "") + ((typeof l !== "undefined") ? "; domain=" + (l !== null ? l : e.site_domain) : "") + ((m) ? "; secure" : "");
                if (p.length < 4000) {
                    g.cookie = o;
                    return (q === this.getCookie(h));
                }
                return false;
            },
            getSubCookies: function(k) {
                var j, h, d, n, m = {};
                if (!k) {
                    return null;
                }
                j = k.split("&");
                if (j.length === 0) {
                    return null;
                }
                for (h = 0, d = j.length; h < d; h++) {
                    n = j[h].split("=");
                    n.push("");
                    m[decodeURIComponent(n[0])] = decodeURIComponent(n[1]);
                }
                return m;
            },
            removeCookie: function(d) {
                return this.setCookie(d, {}, 0, "/", null);
            },
            pluginConfig: function(m, d, k, j) {
                var h, l = 0;
                if (!d || !d[k]) {
                    return false;
                }
                for (h = 0; h < j.length; h++) {
                    if (typeof d[k][j[h]] !== "undefined") {
                        m[j[h]] = d[k][j[h]];
                        l++;
                    }
                }
                return (l > 0);
            }
        },
        init: function(h) {
            var l, d, j = ["beacon_url", "site_domain", "user_ip"];
            if (!h) {
                h = {};
            }
            for (l = 0; l < j.length; l++) {
                if (typeof h[j[l]] !== "undefined") {
                    e[j[l]] = h[j[l]];
                }
            }
            if (typeof h.log !== "undefined") {
                this.log = h.log;
            }
            if (!this.log) {
                this.log = function(i, k, n) {};
            }
            for (d in this.plugins) {
                if (h[d] && typeof h[d].enabled !== "undefined" && h[d].enabled === false) {
                    e.disabled_plugins[d] = 1;
                    continue;
                } else {
                    if (e.disabled_plugins[d]) {
                        delete e.disabled_plugins[d];
                    }
                }
                if (this.plugins.hasOwnProperty(d) && typeof this.plugins[d].init === "function") {
                    this.plugins[d].init(h);
                }
            }
            if (typeof h.autorun === "undefined" || h.autorun !== false) {
                e.addListener(a, "load", function() {
                    e.fireEvent("page_ready");
                });
            }
            e.addListener(g, "webkitvisibilitychange", function() {
                e.fireEvent("visibility_changed");
            });
            e.addListener(a, "unload", function() {
                a = null;
            });
            return this;
        },
        page_ready: function() {
            e.fireEvent("page_ready");
            return this;
        },
        subscribe: function(d, m, j, o) {
            var k, l, n;
            if (!e.events.hasOwnProperty(d)) {
                return this;
            }
            n = e.events[d];
            for (k = 0; k < n.length; k++) {
                l = n[k];
                if (l[0] === m && l[1] === j && l[2] === o) {
                    return this;
                }
            }
            n.push([m, j || {}, o || null]);
            if (d === "page_unload") {
                e.addListener(a, "unload", function() {
                    if (m) {
                        m.call(o, null, j);
                    }
                    m = o = j = null;
                });
                e.addListener(a, "beforeunload", function() {
                    if (m) {
                        m.call(o, null, j);
                    }
                    m = o = j = null;
                });
            }
            return this;
        },
        addVar: function(h, i) {
            if (typeof h === "string") {
                e.vars[h] = i;
            } else {
                if (typeof h === "object") {
                    var j = h,
                        d;
                    for (d in j) {
                        if (j.hasOwnProperty(d)) {
                            e.vars[d] = j[d];
                        }
                    }
                }
            }
            return this;
        },
        removeVar: function() {
            var d, h;
            if (!arguments.length) {
                return this;
            }
            if (arguments.length === 1 && Object.prototype.toString.apply(arguments[0]) === "[object Array]") {
                h = arguments[0];
            } else {
                h = arguments;
            }
            for (d = 0; d < h.length; d++) {
                if (e.vars.hasOwnProperty(h[d])) {
                    delete e.vars[h[d]];
                }
            }
            return this;
        },
        sendBeacon: function() {
            var i, j, h, d = 0;
            for (i in this.plugins) {
                if (this.plugins.hasOwnProperty(i)) {
                    if (e.disabled_plugins[i]) {
                        continue;
                    }
                    if (!this.plugins[i].is_complete()) {
                        return this;
                    }
                }
            }
            e.fireEvent("before_beacon", e.vars);
            if (!e.beacon_url) {
                return this;
            }
            j = e.beacon_url + "?v=" + encodeURIComponent(BOOMR.version) + "&u=" + encodeURIComponent(g.URL.replace(/#.*/, ""));
            for (i in e.vars) {
                if (e.vars.hasOwnProperty(i)) {
                    d++;
                    j += "&" + encodeURIComponent(i) + "=" + encodeURIComponent(e.vars[i]);
                }
            }
            if (d) {
                h = new Image();
                h.src = j;
            }
            return this;
        }
    };
    var f = function(d) {
        return function(h, i) {
            this.log(h, d, "boomerang" + (i ? "." + i : ""));
            return this;
        };
    };
    c.debug = f("debug");
    c.info = f("info");
    c.warn = f("warn");
    c.error = f("error");
    if (a.YAHOO && a.YAHOO.widget && a.YAHOO.widget.Logger) {
        c.log = a.YAHOO.log;
    } else {
        if (typeof a.Y !== "undefined" && typeof a.Y.log !== "undefined") {
            c.log = a.Y.log;
        } else {
            if (typeof console !== "undefined" && typeof console.log !== "undefined") {
                c.log = function(d, h, i) {
                    console.log(i + ": [" + h + "] ", d);
                };
            }
        }
    }
    for (b in c) {
        if (c.hasOwnProperty(b)) {
            BOOMR[b] = c[b];
        }
    }
    BOOMR.plugins = BOOMR.plugins || {};
}(window));
(function(a) {
    var c = a.document;
    BOOMR = BOOMR || {};
    BOOMR.plugins = BOOMR.plugins || {};
    var b = {
        complete: false,
        timers: {},
        cookie: "RT",
        cookie_exp: 600,
        strict_referrer: true,
        navigationStart: undefined,
        responseStart: undefined,
        start: function() {
            var e, d = new Date().getTime();
            if (!this.cookie) {
                return this;
            }
            if (!BOOMR.utils.setCookie(this.cookie, {
                    s: d,
                    r: c.URL.replace(/#.*/, "")
                }, this.cookie_exp, "/", null)) {
                BOOMR.error("cannot set start cookie", "rt");
                return this;
            }
            e = new Date().getTime();
            if (e - d > 50) {
                BOOMR.utils.removeCookie(this.cookie);
                BOOMR.error("took more than 50ms to set cookie... aborting: " + d + " -> " + e, "rt");
            }
            return this;
        },
        initNavTiming: function() {
            var d, e;
            if (this.navigationStart) {
                return;
            }
            e = a.performance || a.msPerformance || a.webkitPerformance || a.mozPerformance;
            if (e && e.timing) {
                d = e.timing;
            } else {
                if (a.chrome && a.chrome.csi) {
                    d = {
                        navigationStart: a.chrome.csi().startE,
                        responseStart: undefined
                    };
                    BOOMR.addVar("rt.start", "csi");
                } else {
                    if (a.gtbExternal) {
                        d = {
                            navigationStart: a.gtbExternal.startE(),
                            responseStart: undefined
                        };
                        BOOMR.addVar("rt.start", "gtb");
                    }
                }
            }
            if (d) {
                BOOMR.addVar("rt.start", "navigation");
                this.navigationStart = d.navigationStart || undefined;
                this.responseStart = d.responseStart || undefined;
            } else {
                BOOMR.warn("This browser doesn't support the WebTiming API", "rt");
            }
            return;
        }
    };
    BOOMR.plugins.RT = {
        init: function(d) {
            b.complete = false;
            b.timers = {};
            BOOMR.utils.pluginConfig(b, d, "RT", ["cookie", "cookie_exp", "strict_referrer"]);
            BOOMR.subscribe("page_ready", this.done, null, this);
            BOOMR.subscribe("page_unload", b.start, null, b);
            return this;
        },
        startTimer: function(d, e) {
            if (d) {
                if (d === "t_page") {
                    this.endTimer("t_resp", e);
                }
                b.timers[d] = {
                    start: (typeof e === "number" ? e : new Date().getTime())
                };
                b.complete = false;
            }
            return this;
        },
        endTimer: function(d, e) {
            if (d) {
                b.timers[d] = b.timers[d] || {};
                if (typeof b.timers[d].end === "undefined") {
                    b.timers[d].end = (typeof e === "number" ? e : new Date().getTime());
                }
            }
            return this;
        },
        setTimer: function(d, e) {
            if (d) {
                b.timers[d] = {
                    delta: e
                };
            }
            return this;
        },
        done: function() {
            var j, d, h, e, i = {
                    t_done: 1,
                    t_resp: 1,
                    t_page: 1
                },
                g = 0,
                k, f, l = [];
            if (b.complete) {
                return this;
            }
            b.initNavTiming();
            if (document.webkitVisibilityState && document.webkitVisibilityState === "prerender") {
                this.startTimer("t_load", b.navigationStart);
                this.endTimer("t_load");
                this.startTimer("t_prerender", b.navigationStart);
                this.startTimer("t_postrender");
                BOOMR.subscribe("visibility_changed", this.done, null, this);
                return this;
            }
            this.endTimer("t_done");
            if (b.responseStart) {
                this.endTimer("t_resp", b.responseStart);
                if (b.timers.t_load) {
                    this.setTimer("t_page", b.timers.t_load.end - b.responseStart);
                } else {
                    this.setTimer("t_page", new Date().getTime() - b.responseStart);
                }
            } else {
                if (b.timers.hasOwnProperty("t_page")) {
                    this.endTimer("t_page");
                }
            }
            if (b.timers.hasOwnProperty("t_postrender")) {
                this.endTimer("t_postrender");
                this.endTimer("t_prerender");
            }
            d = h = c.referrer.replace(/#.*/, "");
            if (b.cookie) {
                e = BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(b.cookie));
                BOOMR.utils.removeCookie(b.cookie);
                if (e !== null && typeof e.s !== "undefined" && typeof e.r !== "undefined") {
                    d = e.r;
                    if (!b.strict_referrer || d === h) {
                        j = parseInt(e.s, 10);
                    }
                }
            }
            if (j) {
                BOOMR.addVar("rt.start", "cookie");
            } else {
                j = b.navigationStart;
            }
            BOOMR.removeVar("t_done", "t_page", "t_resp", "r", "r2");
            for (k in b.timers) {
                if (!b.timers.hasOwnProperty(k)) {
                    continue;
                }
                f = b.timers[k];
                if (typeof f.delta !== "number") {
                    if (typeof f.start !== "number") {
                        f.start = j;
                    }
                    f.delta = f.end - f.start;
                }
                if (isNaN(f.delta)) {
                    continue;
                }
                if (i.hasOwnProperty(k)) {
                    BOOMR.addVar(k, f.delta);
                } else {
                    l.push(k + "|" + f.delta);
                }
                g++;
            }
            if (g) {
                BOOMR.addVar("r", d);
                if (h !== d) {
                    BOOMR.addVar("r2", h);
                }
                if (l.length) {
                    BOOMR.addVar("t_other", l.join(","));
                }
            }
            b.timers = {};
            b.complete = true;
            BOOMR.sendBeacon();
            return this;
        },
        is_complete: function() {
            return b.complete;
        }
    };
}(window));
(function(b) {
    var e = b.document;
    BOOMR = BOOMR || {};
    BOOMR.plugins = BOOMR.plugins || {};
    var a = [{
        name: "image-0.png",
        size: 11483,
        timeout: 1400
    }, {
        name: "image-1.png",
        size: 40658,
        timeout: 1200
    }, {
        name: "image-2.png",
        size: 164897,
        timeout: 1300
    }, {
        name: "image-3.png",
        size: 381756,
        timeout: 1500
    }, {
        name: "image-4.png",
        size: 1234664,
        timeout: 1200
    }, {
        name: "image-5.png",
        size: 4509613,
        timeout: 1200
    }, {
        name: "image-6.png",
        size: 9084559,
        timeout: 1200
    }];
    a.end = a.length;
    a.start = 0;
    a.l = {
        name: "image-l.gif",
        size: 35,
        timeout: 1000
    };
    var c = {
        base_url: "images/",
        timeout: 15000,
        nruns: 5,
        latency_runs: 10,
        user_ip: "",
        cookie_exp: 7 * 86400,
        cookie: "BA",
        results: [],
        latencies: [],
        latency: null,
        runs_left: 0,
        aborted: false,
        complete: false,
        running: false,
        ncmp: function(f, d) {
            return (f - d);
        },
        iqr: function(h) {
            var g = h.length - 1,
                f, m, k, d = [],
                j;
            f = (h[Math.floor(g * 0.25)] + h[Math.ceil(g * 0.25)]) / 2;
            m = (h[Math.floor(g * 0.75)] + h[Math.ceil(g * 0.75)]) / 2;
            k = (m - f) * 1.5;
            g++;
            for (j = 0; j < g && h[j] < m + k; j++) {
                if (h[j] > f - k) {
                    d.push(h[j]);
                }
            }
            return d;
        },
        calc_latency: function() {
            var h, f, j = 0,
                g = 0,
                k, m, d, o, l;
            l = this.iqr(this.latencies.sort(this.ncmp));
            f = l.length;
            BOOMR.debug(l, "bw");
            for (h = 1; h < f; h++) {
                j += l[h];
                g += l[h] * l[h];
            }
            f--;
            k = Math.round(j / f);
            d = Math.sqrt(g / f - j * j / (f * f));
            o = (1.96 * d / Math.sqrt(f)).toFixed(2);
            d = d.toFixed(2);
            f = l.length - 1;
            m = Math.round((l[Math.floor(f / 2)] + l[Math.ceil(f / 2)]) / 2);
            return {
                mean: k,
                median: m,
                stddev: d,
                stderr: o
            };
        },
        calc_bw: function() {
            var y, x, t = 0,
                p, g = [],
                v = [],
                f = 0,
                o = 0,
                C = 0,
                u = 0,
                q, A, B, h, d, w, k, m, l, z, s;
            for (y = 0; y < this.nruns; y++) {
                if (!this.results[y] || !this.results[y].r) {
                    continue;
                }
                p = this.results[y].r;
                l = 0;
                for (x = p.length - 1; x >= 0 && l < 3; x--) {
                    if (typeof p[x] === "undefined") {
                        break;
                    }
                    if (p[x].t === null) {
                        continue;
                    }
                    t++;
                    l++;
                    z = a[x].size * 1000 / p[x].t;
                    g.push(z);
                    s = a[x].size * 1000 / (p[x].t - this.latency.mean);
                    v.push(s);
                }
            }
            BOOMR.debug("got " + t + " readings", "bw");
            BOOMR.debug("bandwidths: " + g, "bw");
            BOOMR.debug("corrected: " + v, "bw");
            if (g.length > 3) {
                g = this.iqr(g.sort(this.ncmp));
                v = this.iqr(v.sort(this.ncmp));
            } else {
                g = g.sort(this.ncmp);
                v = v.sort(this.ncmp);
            }
            BOOMR.debug("after iqr: " + g, "bw");
            BOOMR.debug("corrected: " + v, "bw");
            t = Math.max(g.length, v.length);
            for (y = 0; y < t; y++) {
                if (y < g.length) {
                    f += g[y];
                    o += Math.pow(g[y], 2);
                }
                if (y < v.length) {
                    C += v[y];
                    u += Math.pow(v[y], 2);
                }
            }
            t = g.length;
            q = Math.round(f / t);
            A = Math.sqrt(o / t - Math.pow(f / t, 2));
            B = Math.round(1.96 * A / Math.sqrt(t));
            A = Math.round(A);
            t = g.length - 1;
            h = Math.round((g[Math.floor(t / 2)] + g[Math.ceil(t / 2)]) / 2);
            t = v.length;
            d = Math.round(C / t);
            w = Math.sqrt(u / t - Math.pow(C / t, 2));
            k = (1.96 * w / Math.sqrt(t)).toFixed(2);
            w = w.toFixed(2);
            t = v.length - 1;
            m = Math.round((v[Math.floor(t / 2)] + v[Math.ceil(t / 2)]) / 2);
            BOOMR.debug("amean: " + q + ", median: " + h, "bw");
            BOOMR.debug("corrected amean: " + d + ", median: " + m, "bw");
            return {
                mean: q,
                stddev: A,
                stderr: B,
                median: h,
                mean_corrected: d,
                stddev_corrected: w,
                stderr_corrected: k,
                median_corrected: m
            };
        },
        defer: function(f) {
            var d = this;
            return setTimeout(function() {
                f.call(d);
                d = null;
            }, 10);
        },
        load_img: function(g, k, m) {
            var f = this.base_url + a[g].name + "?t=" + (new Date().getTime()) + Math.random(),
                l = 0,
                j = 0,
                d = new Image(),
                h = this;
            d.onload = function() {
                d.onload = d.onerror = null;
                d = null;
                clearTimeout(l);
                if (m) {
                    m.call(h, g, j, k, true);
                }
                h = m = null;
            };
            d.onerror = function() {
                d.onload = d.onerror = null;
                d = null;
                clearTimeout(l);
                if (m) {
                    m.call(h, g, j, k, false);
                }
                h = m = null;
            };
            l = setTimeout(function() {
                if (m) {
                    m.call(h, g, j, k, null);
                }
            }, a[g].timeout + Math.min(400, this.latency ? this.latency.mean : 400));
            j = new Date().getTime();
            d.src = f;
        },
        lat_loaded: function(d, f, h, j) {
            if (h !== this.latency_runs + 1) {
                return;
            }
            if (j !== null) {
                var g = new Date().getTime() - f;
                this.latencies.push(g);
            }
            if (this.latency_runs === 0) {
                this.latency = this.calc_latency();
            }
            this.defer(this.iterate);
        },
        img_loaded: function(f, g, h, j) {
            if (h !== this.runs_left + 1) {
                return;
            }
            if (this.results[this.nruns - h].r[f]) {
                return;
            }
            if (j === null) {
                this.results[this.nruns - h].r[f + 1] = {
                    t: null,
                    state: null,
                    run: h
                };
                return;
            }
            var d = {
                start: g,
                end: new Date().getTime(),
                t: null,
                state: j,
                run: h
            };
            if (j) {
                d.t = d.end - d.start;
            }
            this.results[this.nruns - h].r[f] = d;
            if (f >= a.end - 1 || typeof this.results[this.nruns - h].r[f + 1] !== "undefined") {
                BOOMR.debug(this.results[this.nruns - h], "bw");
                if (h === this.nruns) {
                    a.start = f;
                }
                this.defer(this.iterate);
            } else {
                this.load_img(f + 1, h, this.img_loaded);
            }
        },
        finish: function() {
            if (!this.latency) {
                this.latency = this.calc_latency();
            }
            var f = this.calc_bw(),
                d = {
                    bw: f.median_corrected,
                    bw_err: parseFloat(f.stderr_corrected, 10),
                    lat: this.latency.mean,
                    lat_err: parseFloat(this.latency.stderr, 10),
                    bw_time: Math.round(new Date().getTime() / 1000)
                };
            BOOMR.addVar(d);
            if (!isNaN(d.bw)) {
                BOOMR.utils.setCookie(this.cookie, {
                    ba: Math.round(d.bw),
                    be: d.bw_err,
                    l: d.lat,
                    le: d.lat_err,
                    ip: this.user_ip,
                    t: d.bw_time
                }, (this.user_ip ? this.cookie_exp : 0), "/", null);
            }
            this.complete = true;
            BOOMR.sendBeacon();
            this.running = false;
        },
        iterate: function() {
            if (this.aborted) {
                return false;
            }
            if (!this.runs_left) {
                this.finish();
            } else {
                if (this.latency_runs) {
                    this.load_img("l", this.latency_runs--, this.lat_loaded);
                } else {
                    this.results.push({
                        r: []
                    });
                    this.load_img(a.start, this.runs_left--, this.img_loaded);
                }
            }
        },
        setVarsFromCookie: function(l) {
            var i = parseInt(l.ba, 10),
                k = parseFloat(l.be, 10),
                j = parseInt(l.l, 10) || 0,
                f = parseFloat(l.le, 10) || 0,
                d = l.ip.replace(/\.\d+$/, "0"),
                m = parseInt(l.t, 10),
                h = this.user_ip.replace(/\.\d+$/, "0"),
                g = Math.round((new Date().getTime()) / 1000);
            if (d === h && m >= g - this.cookie_exp) {
                this.complete = true;
                BOOMR.addVar({
                    bw: i,
                    lat: j,
                    bw_err: k,
                    lat_err: f
                });
                return true;
            }
            return false;
        }
    };
    BOOMR.plugins.BW = {
        init: function(d) {
            var f;
            BOOMR.utils.pluginConfig(c, d, "BW", ["base_url", "timeout", "nruns", "cookie", "cookie_exp"]);
            if (d && d.user_ip) {
                c.user_ip = d.user_ip;
            }
            a.start = 0;
            c.runs_left = c.nruns;
            c.latency_runs = 10;
            c.results = [];
            c.latencies = [];
            c.latency = null;
            c.complete = false;
            c.aborted = false;
            BOOMR.removeVar("ba", "ba_err", "lat", "lat_err");
            f = BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(c.cookie));
            if (!f || !f.ba || !c.setVarsFromCookie(f)) {
                BOOMR.subscribe("page_ready", this.run, null, this);
            }
            return this;
        },
        run: function() {
            if (c.running || c.complete) {
                return this;
            }
            if (b.location.protocol === "https:") {
                BOOMR.info("HTTPS detected, skipping bandwidth test", "bw");
                c.complete = true;
                return this;
            }
            c.running = true;
            setTimeout(this.abort, c.timeout);
            c.defer(c.iterate);
            return this;
        },
        abort: function() {
            c.aborted = true;
            if (c.running) {
                c.finish();
            }
            return this;
        },
        is_complete: function() {
            return c.complete;
        }
    };
}(window));

function CACTI_monitoring(a) {
    this.timerList = a.timerList || ["t_done"];
    this._timersEnded = 0;
    this._url = a.url;
    this._pageId = a.pageId;
    this._init();
}
CACTI_monitoring.prototype._init = function() {
    if (typeof(BOOMR) == "undefined") {
        $jex.console.error("未引用BOOMR!");
        return;
    }
    if (!this._url || !this._pageId) {
        $jex.console.error("CACTI_monitoring 缺少配置，初始化失败!");
        return;
    }
    var a = this;
    this.isStart = true;
    BOOMR.init({
        beacon_url: this._url,
        autorun: false,
        RT: {
            enabled: true,
            strict_referrer: true
        },
        BW: {
            enabled: false
        }
    }).addVar("page_id", this._pageId).subscribe("before_beacon", function(d) {
        var b = [],
            c;
        if ("t_done" in d) {
            return;
        }
        for (c in d) {
            if (d.hasOwnProperty(c)) {
                b.push(c);
            }
        }
        BOOMR.removeVar(b);
    });
    $jex.event.bind(window, "load", function() {
        a.end("t_done");
    });
};
CACTI_monitoring.prototype._inList = function(a) {
    if ($jex.array.indexOf(this.timerList, a) > -1) {
        return true;
    }
    return false;
};
CACTI_monitoring.prototype.start = function(a) {
    if (!this.isStart || !this._inList(a)) {
        return;
    }
    BOOMR.plugins.RT.startTimer(a);
};
CACTI_monitoring.prototype.end = function(a) {
    if (!this.isStart || !this._inList(a)) {
        return;
    }
    BOOMR.plugins.RT.endTimer(a);
};
CACTI_monitoring.prototype.send = function() {
    BOOMR.page_ready();
};
var CommonInfoManager = function() {
    CommonInfoManager.superclass.constructor.call(this);
    var f = null;
    this.service = function(g) {
        if (g == null) {
            return f;
        } else {
            f = g;
        }
    };
    var d = null;
    this.analyzer = function(g) {
        if (g == null) {
            return d;
        } else {
            d = g;
        }
    };
    var c = null;
    this.entityManager = function(g) {
        if (g == null) {
            return c;
        } else {
            c = g;
        }
    };
    var e = null;
    this.deptCityCode = function(g) {
        if (g == null) {
            return e;
        } else {
            e = g;
        }
    };
    var b = null;
    this.arriCityCode = function(g) {
        if (g == null) {
            return b;
        } else {
            b = g;
        }
    };
    var a = null;
    this.mainEntityManager = function(g) {
        if (g == null) {
            return a;
        } else {
            a = g;
        }
    };
};
$jex.extendClass(CommonInfoManager, InfoManager);
CommonInfoManager.prototype.setDataLoad = function(a) {
    this._dataStat = a;
};
CommonInfoManager.prototype.getDataLoad = function() {
    return this._dataStat;
};
CommonInfoManager.prototype.addAirportSource = function(b, a) {
    this.addSource("airport", b, a);
};
CommonInfoManager.prototype.addVendorSource = function(b, a) {
    this.addSource("vendor", b, a);
};
CommonInfoManager.prototype.addNotWorkVendors = function(b, a) {
    this.addSource("notWork", b, a);
};
CommonInfoManager.prototype.addSuperOTAMaxNum = function(b, a) {
    this.addSource("maxSuper", b, a);
};
CommonInfoManager.prototype.addCarrierSource = function(b, a) {
    this.addSource("carrier", b, a);
};
CommonInfoManager.prototype.addCitySource = function(b, a) {
    this.addSource("city", b, a);
};
CommonInfoManager.prototype.addPlaneSource = function(b, a) {
    this.addSource("plane", b, a);
};
CommonInfoManager.prototype.addFlightLineVendorSource = function(b, a) {
    this.addSource("flightLineVendor", b, a);
};
CommonInfoManager.prototype.addOriginalPrice = function(b, a) {
    this.addSource("oprice", b, a);
};
CommonInfoManager.prototype.addInsuranceSum = function(b, a) {
    this.addSource("insurancesum", b, a);
};
CommonInfoManager.prototype.getCityNameByCode = function(a) {
    var b = this.get("city");
    for (var c in b) {
        if (b[c].codeList.indexOf(a) != -1) {
            return b[c];
        }
    }
    return {
        zh: "无信息"
    };
};
var FlightInfoManager = function() {
    FlightInfoManager.superclass.constructor.call(this);
};
$jex.extendClass(FlightInfoManager, InfoManager);
FlightInfoManager.prototype.addFlightInfoSource = function(b, a) {
    this.addSource("flightInfo", b, a);
};
FlightInfoManager.prototype.updateFlightInfoSource = function(c, b) {
    var a = this.get("flightInfo");
    $jex.foreach(c, function(e, d, f) {
        if (!a[f]) {
            a[f] = e;
        }
    });
};
FlightInfoManager.prototype.addFlightInfoItem = function(b, c, a) {
    this.addItem("flightInfo", b, c, a);
};
FlightInfoManager.prototype.addCorrSource = function(b, a) {
    this.addSource("corrInfo", b, a);
};
FlightInfoManager.prototype.addExtInfoSource = function(b, a) {
    this.addSource("extInfo", b, a);
};
FlightInfoManager.prototype.replacePriceData = function(c, b) {
    b = this._getPriceType(b);
    var a = this.get(b);
    $jex.foreach(c, function(e, d, f) {
        a[f] = e;
    });
};
FlightInfoManager.prototype._getPriceType = function(a) {
    return (!a || a == "all") ? "my_wrappInfo" : ("my_wrappInfo_" + a);
};
FlightInfoManager.prototype.updateRecommendInfo = function(c, b) {
    var a = this.get("Recommend_wrapper");
    $jex.foreach(c, function(e, d, f) {
        if (!a[f]) {
            a[f] = {};
        }
        a[f] = c[f];
    });
};
FlightInfoManager.prototype.addPriceDataItem = function(b, c, a) {
    this.addItem("priceData", b, c, a);
};
FlightInfoManager.prototype.addPriceGroupDataSource = function(d, b) {
    var c;
    for (var a in d) {
        c = this.get("priceGroup", a);
        if (c) {
            this.addItem("lastPriceGroup", a, c, b);
        }
    }
    this.addSource("priceGroup", d, b);
};
FlightInfoManager.prototype.addSpecialWrapper = function(b, a) {
    this.addSource("PayCarrier", b, a);
};
FlightInfoManager.prototype.addPriceInfoSource = function(b, a) {
    this.addSource("priceInfo", b, a);
};
FlightInfoManager.prototype.addZYFAirlines = function(b, c, a) {
    this.addItem("ZYFAirlines", b, c, a);
};
FlightInfoManager.prototype.addZYFReference = function(b, c, a) {
    this.addItem("ZYFReference", b, c, a);
};
FlightInfoManager.prototype.getZYFAirlines = function(a) {
    return this.get("ZYFAirlines", a);
};
FlightInfoManager.prototype.getZYFReference = function(a) {
    return this.get("ZYFReference", a);
};
var UICacheManager = (function() {
    var a = function() {
        FlightInfoManager.superclass.constructor.call(this);
    };
    $jex.extendClass(a, InfoManager);
    a.prototype.addToCache = function(b) {
        this.addItem("uiCache", b.newid(""), b);
    };
    a.prototype.getCache = function(b) {
        return this.get("uiCache", b);
    };
    return new a();
})();
FlightInfoManager.prototype.updatePriceGroup = function(c, a) {
    var b = this.get("priceGroup", a).wrlist;
    $jex.foreach(c, function(e, d, f) {
        if (!b[f]) {
            b[f] = {};
        }
        $jex.merge(b[f], c[f]);
    });
};
if (typeof QLib === "undefined") {
    var QLib = {};
}(function() {
    var a = "/twell/searchrt_ui/ui_qunar_gsriiw.do";
    QLib.setCookieForSpider = function(d) {
        var c = b();
        if (!c) {
            d();
            return;
        }
        c(a, {}, d, {
            onerror: d,
            beforeSend: function(e) {
                if (window.addHtag) {
                    window.addHtag(e);
                }
            }
        });
    };

    function b() {
        if (window.$jex && $jex.ajax) {
            return $jex.ajax;
        }
    }
    QLib.setUrl = function(c) {
        a = c;
        return this;
    };
})();
if (typeof QLib === "undefined") {
    var QLib = {};
}
QLib.getEx_track = function() {
    var a = $jex.parseQueryParam();
    return a.ex_track ? ("ex_track=" + a.ex_track) : "";
};
var DomesticOnewayDataAnalyzer = new(function() {
    var j = this;
    var g = null;
    var F = null;
    var q = null;
    this.infoMgr = function() {
        if (typeof q == "undefined" || q == null) {
            q = new CommonInfoManager();
        }
        return q;
    };
    var G = null;
    this.onewayInfoMgr = function() {
        if (typeof G == "undefined" || G == null) {
            G = new FlightInfoManager();
        }
        return G;
    };
    var I = null;
    this.transferInfoMgr = function() {
        if (typeof I == "undefined" || I == null) {
            I = new FlightInfoManager();
        }
        return I;
    };
    var A = null;
    this.flightEntityMgr = function() {
        if (typeof A == "undefined" || A == null) {
            A = new FlightEntityManager();
        }
        return A;
    };
    this.lowestPrice = function() {
        var N = (this.lowestTransfer() == null) ? Number.MAX_VALUE : this.lowestTransfer().safeLowestPrice();
        var O = (this.lowestOneway() == null) ? Number.MAX_VALUE : this.lowestOneway().safeLowestPrice();
        var P = (this.lowestCompose() == null) ? Number.MAX_VALUE : this.lowestCompose().safeLowestPrice();
        return Math.min(N, O, P);
    };
    this.lowestEntity = function() {
        var N = (this.lowestTransfer() == null) ? Number.MAX_VALUE : this.lowestTransfer().safeLowestPrice();
        var O = (this.lowestOneway() == null) ? Number.MAX_VALUE : this.lowestOneway().safeLowestPrice();
        var P = (this.lowestCompose() == null) ? Number.MAX_VALUE : this.lowestCompose().safeLowestPrice();
        if (N <= O && N <= P) {
            return this.lowestTransfer();
        }
        if (O <= N && O <= P) {
            return this.lowestOneway();
        }
        if (P <= N && P <= O) {
            return this.lowestCompose();
        }
    };
    var l = null;
    this.lowestTransfer = function(N) {
        if (N == null) {
            return l;
        } else {
            if (l == null) {
                l = N;
            } else {
                if (l.safeLowestPrice() > N.safeLowestPrice()) {
                    l = N;
                }
            }
        }
    };
    var y = null;
    this.lowestOneway = function(N) {
        if (N == null) {
            return y;
        } else {
            if (y == null) {
                y = N;
            } else {
                if (y.safeLowestPrice() > N.safeLowestPrice()) {
                    y = N;
                }
            }
        }
    };
    var M = null;
    this.lowestCompose = function(N) {
        if (N == null) {
            return M;
        } else {
            if (M == null) {
                M = N;
            } else {
                if (M.safeLowestPrice() > N.safeLowestPrice()) {
                    M = N;
                }
            }
        }
    };
    this.setSearchService = function(N) {
        if (g) {
            return;
        }
        g = N;
        $jex.event.binding(g, "interSearch", o);
        $jex.event.binding(g, "validQuery", z);
        $jex.event.binding(g, "invalidQuery", i);
        $jex.event.binding(g, "loadedLongwell", u);
        $jex.event.binding(g, "loadedFirstData", L);
        $jex.event.binding(g, "loadedOnewayData", w);
        $jex.event.binding(g, "loadedTransfer", a);
        $jex.event.binding(g, "loadedExtInfo", K);
        $jex.event.binding(g, "loadedAVData", f);
        $jex.event.binding(g, "parsingFlightPriceData", h);
        $jex.event.binding(g, "searchEnd", C);
        $jex.event.binding(g, "onerror", c);
        $jex.event.binding(g, "pastLessSecond", n);
        $jex.event.binding(g, "zyfLoaded", B);
        $jex.event.binding(g, "ipBlock", v);
        $jex.event.binding(g, "getQueryId", b);
        $jex.event.binding(g, "loadedGroupinfo", m);
        this.infoMgr().service(g);
        this.infoMgr().analyzer(this);
        this.infoMgr().entityManager(this.flightEntityMgr());
        j._initial();
    };
    this._initial = function() {
        F = new DataSet({
            defaultSort: [
                ["sortValue", false]
            ],
            filterFunc: {
                "航空公司": function(P, N, O) {
                    return [P.carrierCode()];
                },
                "起飞时间": function(N) {
                    return [N.deptTimeRangeValue()];
                },
                "机型": function(N) {
                    return N.planeType();
                },
                "起飞机场": function(N) {
                    return N.airportCodes();
                },
                "降落机场": function(N) {
                    return N.airportCodes();
                },
                "方式": function(N) {
                    if (N.type == "compose") {
                        return "transfer";
                    }
                    return N.type;
                },
                "中转城市": function(N) {
                    return N.transferCity();
                },
                "舱位": function(P, N, O) {
                    var Q = P.getCabinType();
                    return Q;
                }
            },
            pageSize: 30
        });
        if (typeof FlightListUISorter != "undefined") {
            $jex.event.binding(F, "refreshCurrentPage", function(P, Q, N, O) {
                FlightListUISorter.resort(P, Q, N, O);
            });
        }
    };
    var H = function() {
        $jex.event.trigger(j, "updateFilter", {
            catalog: "航空公司",
            name: this.carrier().zh,
            value: this.flightInfo().ca
        });
        var P = this.deptTimeRange();
        $jex.event.trigger(j, "updateFilter", {
            catalog: "起飞时间",
            name: P.zh,
            key: P.key,
            value: P.value
        });
        var Q = this.plane();
        $jex.foreach(Q.type, function(R) {
            $jex.event.trigger(j, "updateFilter", {
                catalog: "机型",
                name: R,
                value: R
            });
        });
        var N = this.deptAirport();
        $jex.event.trigger(j, "updateFilter", {
            catalog: "起飞机场",
            group: this.deptCityCode(),
            name: N.ab,
            value: N.key || N.code
        });
        var O = this.arriAirport();
        $jex.event.trigger(j, "updateFilter", {
            catalog: "降落机场",
            group: this.arriCityCode(),
            name: O.ab,
            value: O.key || O.code
        });
    };
    var k = function() {
        var P = this.firstTrip();
        if (this.carrierCode()) {
            $jex.event.trigger(j, "updateFilter", {
                catalog: "航空公司",
                name: P.carrier().zh,
                value: P.flightInfo().ca
            });
        }
        var N = P.deptTimeRange();
        $jex.event.trigger(j, "updateFilter", {
            catalog: "起飞时间",
            name: N.zh,
            key: N.key,
            value: N.value
        });
        var O = P.plane();
        $jex.foreach(O.type, function(R) {
            $jex.event.trigger(j, "updateFilter", {
                catalog: "机型",
                name: R,
                value: R
            });
        });
        P = this.secondTrip();
        var O = P.plane();
        $jex.foreach(O.type, function(R) {
            $jex.event.trigger(j, "updateFilter", {
                catalog: "机型",
                name: R,
                value: R
            });
        });
        var Q = P.deptCity();
        $jex.event.trigger(j, "updateFilter", {
            catalog: "中转城市",
            name: Q.zh,
            value: Q.en
        });
    };
    this.hasWrapper = function(N) {
        return this.infoMgr().get("vendor", N);
    };
    this.resultData = function() {
        return F.currentPageData();
    };
    this.currentPageIndex = function() {
        return F.currentPage;
    };
    this.getDataSet = function() {
        return F;
    };
    this.getData = function() {
        return F.getData();
    };
    this.pageInfo = function() {
        var N = {
            pageCount: F.pageCount(),
            pageSize: F.pageSize(),
            pageIndex: F.pageIndex()
        };
        return N;
    };
    this.resetPageSize = function(N) {
        F.pageSize(N);
        $jex.event.trigger(j, "dataComplete");
    };
    this.gotoPage = function(N) {
        F.gotoPage(N);
        $jex.event.trigger(j, "dataComplete");
    };
    this.sort = function(N) {
        F.setPageIndex(0);
        F.sort(N);
        F.refresh();
        $jex.event.trigger(j, "dataComplete");
    };
    var t = null;
    this.setFilter = function(N) {
        t = N;
        if (N.isNull) {
            F.clearAllFilter();
            F.refresh();
        } else {
            F.addFilter(N);
            F.setPageIndex(0);
            F.refresh();
        }
        $jex.event.trigger(j, "dataComplete");
    };
    this.getFilter = function() {
        return t;
    };
    this.reload = function() {
        F.refreshPage();
        $jex.event.trigger(j, "dataComplete");
    };
    this.syncPriceData = function(Q, N, O) {
        var R = function() {
            O();
        };
        var P = Q.getWrapperListType();
        g.invoke_flightPriceData(Q.key(), N, R, P, Q);
    };
    this._hasCabinType = [];
    this.cabinType = function(N) {
        if (arguments.length == 0) {
            return this._hasCabinType;
        } else {
            var O = j._hasCabinType;
            if (typeof N == "string") {
                N = [N];
            }
            $jex.array.each(N, function(P) {
                if (!~$jex.array.indexOf(O, P)) {
                    O.push(N);
                }
            });
            j._hasCabinType = O;
            return O;
        }
    };

    function d(Q) {
        var N = j.infoMgr();
        var T = j.onewayInfoMgr();
        var O = j.flightEntityMgr();
        var S = false;
        var P = false;
        var R = false;
        $jex.foreach(Q, function(Y, U, W) {
            var V = F.hasItem(W);
            if (V) {
                V.update();
                S = true;
                HotSale.setMinLate(V);
            } else {
                var X = OnewayFlightEntity.tryCreate(W, N, T, O);
                if (X) {
                    HotSale.setMinLate(X);
                    H.call(X);
                    $jex.event.binding(X, "updating", function() {
                        switch (this.type) {
                            case "oneway":
                                j.lowestOneway(this);
                                break;
                            case "compose":
                                j.lowestCompose(this);
                                break;
                        }
                        if (this.updateSortKey) {
                            this.updateSortKey();
                        } else {
                            $jex.console.error("没有更新排序键的方法", this);
                        }
                    });
                    switch (X.type) {
                        case "oneway":
                            j.lowestOneway(X);
                            R = true;
                            break;
                        case "compose":
                            j.lowestCompose(X);
                            P = true;
                            break;
                    }
                    j.cabinType().length < 2 && j.cabinType(X.getCabinType());
                    F.addItem(W, X);
                }
                S = true;
            }
        });
        if (S) {
            if (R) {
                $jex.event.trigger(j, "updateFilter", {
                    catalog: "方式",
                    name: "直飞",
                    value: "oneway"
                });
            }
            if (P) {
                $jex.event.trigger(j, "updateFilter", {
                    catalog: "方式",
                    name: "中转联程",
                    value: "transfer"
                });
            }
            if (j.cabinType().length > 1) {
                $jex.event.trigger(j, "updateFilter", {
                    catalog: "舱位",
                    name: "经济舱",
                    value: "j"
                });
                $jex.event.trigger(j, "updateFilter", {
                    catalog: "舱位",
                    name: "头等/商务舱",
                    value: "bf"
                });
            }
            $jex.event.trigger(j, "preDataComplete");
            F.refresh();
            $jex.event.trigger(j, "autoLoadData");
            $jex.event.trigger(j, "dataComplete");
        }
    }

    function J(Q) {
        var O = j.infoMgr();
        var N = j.transferInfoMgr();
        var P = j.flightEntityMgr();
        var R = false;
        $jex.foreach(Q, function(W, S, V) {
            var U = [];
            $jex.foreach(W, function(ab, Y, aa) {
                ab.co = aa;
                var Z = aa + "_" + ab.da + "-" + ab.aa;
                var X = V.split("|");
                if (aa == X[0]) {
                    U[0] = Z;
                } else {
                    if (aa == X[2]) {
                        U[1] = Z;
                    }
                }
                N.addFlightInfoItem(Z, ab);
                N.addPriceDataItem(Z, ab.vl);
            });
            var T = TransferFlightEntity.tryCreate(U, O, N, P);
            if (T) {
                k.call(T);
                j.lowestTransfer(T);
                F.addItem(V, T);
                R = true;
            }
        });
        if (R) {
            $jex.event.trigger(j, "updateFilter", {
                catalog: "方式",
                name: "中转联程",
                value: "transfer"
            });
            if (j.cabinType().length <= 1 && j.cabinType("j").length > 1) {
                $jex.event.trigger(j, "updateFilter", {
                    catalog: "舱位",
                    name: "经济舱",
                    value: "j"
                });
                $jex.event.trigger(j, "updateFilter", {
                    catalog: "舱位",
                    name: "头等/商务舱",
                    value: "bf"
                });
            }
            F.refresh();
            $jex.event.trigger(j, "autoLoadData");
            $jex.event.trigger(j, "dataComplete");
        }
    }

    function o() {
        var N = window.location.href.toString();
        window.location.href = N.replace("oneway_list.htm", "oneway_list_inter.htm");
    }

    function v() {
        window.location.href = "/twell/flight/busy.jsp?ret=" + encodeURIComponent(window.location.href.toString());
    }

    function z() {}

    function i() {}

    function L() {}

    function m(O) {
        e(O);
        if (!O.serc) {
            return;
        }
        var N = O.flightCode.split("|")[0].split("/")[0];
        var P = O.priceData[O.flightCode];
        var Q = p(N);
        if (!$jex.$empty(P)) {
            $jex.hash.each(P, function(S, R) {
                R.pr = R.pr + Q;
                R.npr = R.npr + Q;
                R.bpr = R.bpr + Q;
                R.vppr = R.vppr + Q;
            });
        }
    }

    function p(N) {
        var O = (parseInt(N.substr(0, 2) + N.substr(N.length - 1), 36) + parseInt("0" + N.substr(2, N.length - 3), 10) * 36 * 36 * 36) % 97;
        return O;
    }

    function r(N) {
        if (!$jex.$empty(N)) {
            $jex.hash.each(N, function(Q, P) {
                var O = Q.split("|")[0].split("/")[0];
                var R = p(O);
                P.lowpr = P.lowpr + R;
            });
        }
    }

    function u(P) {
        var N = j.infoMgr();
        if (P.oneway_data && P.oneway_data.priceInfo && P.serc) {
            r(P.oneway_data.priceInfo);
        }
        N.addAirportSource(P.airportInfo.out);
        N.addAirportSource(P.airportInfo.ret);
        N.addVendorSource(P.vendors);
        N.addOriginalPrice(P.op);
        N.addInsuranceSum(P.inShow);
        N.addNotWorkVendors(P.notWorkVendors);
        N.addSuperOTAMaxNum(P.SuperOTA_NUM || 0);
        var O = {};
        O[P.arrivalAirport.en] = P.arrivalAirport;
        O[P.departureAirport.en] = P.departureAirport;
        N.addCitySource(O);
        N.deptCityCode(P.departureAirport.en);
        N.arriCityCode(P.arrivalAirport.en);
    }

    function w(P) {
        var N = j.infoMgr();
        var Q = j.onewayInfoMgr();
        e(P);
        D(P.priceInfo, P.roundPriceInfo);
        N.addCarrierSource(P.carrierInfo);
        N.addPlaneSource(P.planeInfo);
        Q.addFlightInfoSource(P.flightInfo);
        var O, R = 0;
        $jex.foreach(P.priceData, function(S) {
            $jex.foreach(S, function(T) {
                O = T.carrier;
                R++;
            });
        });
        if (O) {
            s(P, O, R);
        }
        if (P.labelType) {
            Q.replacePriceData(P.priceData, P.labelType);
        }
        Q.updateRecommendInfo(P.recommendInfo);
        Q.addPriceGroupDataSource(P.flightPriceInfo);
        Q.addPriceInfoSource(P.priceInfo);
        d(P.priceInfo);
    }

    function D(O, N) {
        $jex.hash.each(N, function(Q, P) {
            if (O[Q]) {
                var R = N[Q];
                if (R.lowpr < O[Q].lowpr) {
                    O[Q].lowpr = R.lowpr;
                }
            } else {
                O[Q] = N[Q];
            }
        });
    }

    function e(P) {
        if (P.roundPriceData) {
            var Q = {};
            for (var O in P.roundPriceData.flightInfo) {
                if (O.substr(0, 1) == "0") {
                    Q.firsttrip = P.roundPriceData.flightInfo[O];
                } else {
                    if (O.substr(0, 1) == "1") {
                        Q.secondtrip = P.roundPriceData.flightInfo[O];
                    }
                }
            }
            if (P.roundPriceData.packagePriceData) {
                for (var N in P.roundPriceData.packagePriceData) {
                    P.roundPriceData.packagePriceData[N].sortRank = 99999;
                    P.roundPriceData.packagePriceData[N].roundflight = true;
                    P.roundPriceData.packagePriceData[N].flightInfo = Q;
                    if (!P.priceData[P.flightCode]) {
                        P.priceData[P.flightCode] = {};
                    }
                    P.priceData[P.flightCode][P.roundPriceData.packagePriceData[N].wrid + "_r"] = P.roundPriceData.packagePriceData[N];
                }
            }
        }
    }

    function a(P) {
        var O = j.infoMgr();
        var N = j.transferInfoMgr();
        O.addAirportSource(P.airportInfo);
        O.addCarrierSource(P.carrierInfo);
        O.addPlaneSource(P.planeInfo);
        O.addCitySource(P.citylist);
        O.addVendorSource(P.vendors, {
            isOverwrite: false
        });
        O.addFlightLineVendorSource(P.flightLineVendors);
        N.addCorrSource(P.corrInfo);
        N.addExtInfoSource(P.extInfo);
        N.addPriceInfoSource(P.priceInfo);
        J(P.data);
    }

    function K(N) {
        var O = j.onewayInfoMgr();
        O.addCorrSource(N.corrInfo);
        O.addExtInfoSource(N.extInfo);
        $jex.console.info("已经加载直飞扩展信息数据");
    }

    function f(O) {
        var N = j.infoMgr();
        var P = j.onewayInfoMgr();
        N.addCarrierSource(O.carrierInfo);
        N.addPlaneSource(O.planeInfo);
        P.updateFlightInfoSource(O.flightInfo);
        d(O.flightInfo);
        $jex.console.info("已经加载AV数据");
    }

    function h(Q) {
        var U = Q.flightCode,
            S = Q.labelType;
        var N = j.infoMgr();
        var R = j.onewayInfoMgr();
        var O = [];
        var P = null;
        var T = 0;
        $jex.foreach(Q.priceData, function(W, V, X) {
            O.push("<b>", "[", X, "] 所返回的报价:", "</b>");
            $jex.foreach(W, function(Z) {
                P = Z.carrier;
                O.push(Z.wr || Z.wrjid);
                var Y = N.get("vendor", Z.wr || Z.wrid);
                if (Y) {
                    O.push("(", Y.name, ")");
                }
                O.push(" , ");
                T++;
            });
        });
        $jex.console.trace(O.join(""));
        s(Q, P, T);
        D(Q.priceInfo, Q.roundPriceInfo);
        if (Q.roundPriceData) {
            N.addSource("vendor", Q.roundPriceData.vendorInfo);
        }
        R.replacePriceData(Q.priceData, S);
        R.addPriceGroupDataSource(Q.flightPriceInfo);
        R.addPriceInfoSource(Q.priceInfo);
        R.updateRecommendInfo(Q.recommendInfo);
        $jex.console.info("已经加载航班价格数据");
    }

    function s(R, V, P) {
        var N = ConfigManager.getConfig("NoNeedStatementList") || ["9C"];
        if ($jex.array.indexOf(N, V) > -1) {
            return;
        }
        var Q = 18;
        var T = j.infoMgr();
        var U = T.get("carrier", V);
        var X = U ? (U.maxvendors || Q) : Q;
        var S = T.get("notWork");
        if (!S) {
            return;
        }
        var W = S.out;
        if (!W || W < 1) {
            return;
        }
        var Y = X - P;
        if (Y <= 0) {
            return;
        }
        var O = W.slice(0, Y);
        $jex.foreach(R.priceData, function(aa, Z, ab) {
            if (ab.indexOf("/") > -1) {
                return $jex.$continue;
            }
            $jex.foreach(O, function(ac) {
                var ad = ac + "_nw";
                aa[ad] = {
                    wrid: ac,
                    type: "notWork",
                    sortRank: 10000000
                };
            });
        });
    }

    function b(Q) {
        if (!Q.serc) {
            return;
        }
        var S = Q.queryID;
        var P = S.indexOf(":");
        var R = S.substr(0, P + 1);
        var O = S.substring(P + 1).split("");
        var N = [];
        $jex.array.each(O, function(T) {
            N.push(String.fromCharCode(T.charCodeAt(0) - 1));
        });
        N.reverse();
        Q.queryID = R + N.join("");
    }

    function n() {
        if (F.getRecordCount() == 0) {
            $jex.event.trigger(j, "noResult");
        }
    }

    function B(O) {
        if (!O.total) {
            $jex.console.info("no zyf data!");
            return;
        }
        var N = j.infoMgr();
        N.addSource("zyfData", O.list);
    }

    function C() {
        var N = new FindTicketRec();
        $jex.event.trigger(j, "findTicketRec");
        if (F.getRecordCount() == 0) {
            $jex.event.trigger(j, "noResultEnd");
        }
        E(F);
        $jex.console.trace("搜索结束.");
        j.infoMgr().setDataLoad(true);
    }

    function x() {}

    function c() {}

    function E(N) {
        var P = j.lowestEntity();
        var R = j.lowestTransfer();
        var O = j.lowestOneway();
        var Q = {
            rule: "onewaySearchResult",
            searchResult: null,
            searchDepartureAirport: System.param.searchDepartureAirport,
            searchArrivalAirport: System.param.searchArrivalAirport,
            searchDepartureTime: System.param.searchDepartureTime
        };
        if (N.getRecordCount() == 0) {
            Q.searchResult = "noResult";
            logsys.trace(Q);
        }
        if (O == null && P != null) {
            Q.searchResult = "onlyTransfer";
            logsys.trace(Q);
        }
        if (P != null && R == null) {
            Q.searchResult = "noTransfer";
            logsys.trace(Q);
        }
        if (O != null && R != null) {
            Q.searchResult = "hasTransfer";
            logsys.trace(Q);
        }
        if (P && P.type == "transfer" && O != null) {
            Q.searchResult = "transferHasMinPrice";
            logsys.trace(Q);
        }
    }
})();
var pomtesttest = 10;
var DomesticOnewaySearchService = new(function() {
    var u = false;
    var p = this;
    this.param = {};
    this.oparam = {};
    var o = $jex.isdebug ? "http://local.qunar.com" : "";
    var e = null;
    var s = 0;
    var y = new Date();
    var v = 0;
    var d = 0;
    var i = 0;
    var m = 0;
    var B = "";
    var h = "";
    var A = false;
    var f = false;
    var l = false;
    var x = null;
    this.longwell = function() {
        return x || {};
    };
    var c = [];
    var j = [];
    var b = null;
    var n = null;
    var t = "";
    var k = null;
    var w = null;
    this.setAnalyzer = function(C) {
        w = C;
    };
    var r = false;
    this.isValidQuery = function(C) {
        if (C == null) {
            return r;
        } else {
            r = C;
        }
    };
    var z = null;
    this.queryId = function(C) {
        if (C == null) {
            return z;
        } else {
            z = C;
        }
    };
    var q = null;
    this.tserver = function(C) {
        if (C == null) {
            return q;
        } else {
            q = C;
        }
    };
    this.search = function(E) {
        if (p.searchEnd()) {
            return;
        }
        $jex.merge(this.param, {
            fromCity: E.searchDepartureAirport,
            toCity: E.searchArrivalAirport,
            fromDate: E.searchDepartureTime
        });
        $jex.merge(this.oparam, {
            ex_track: E.ex_track,
            from: E.from
        });
        var D = $jex.date.parse(this.param.fromDate);
        var C = window.SERVER_TIME || new Date();
        if (C.getTime() - D.getTime() > 86400000) {
            $jex.event.trigger(this, "expireQuery");
            return;
        }
        if (this.param.fromCity == this.param.toCity) {
            $jex.event.trigger(this, "sameCity");
            return;
        }
        this._invoke_ExtInfo();
        QLib.setCookieForSpider(function() {
            p._invoke_longwell();
        });
        v = 1;
        e = new Date();
        setTimeout(function() {
            $jex.event.trigger(p, "pastLessSecond");
        }, 15000);
    };
    this.queryZYF = function() {
        var C = this;
        var D = o + "/zyf/api/ads.json";
        $jex.ajax(D, {
            dpt: C.param.fromCity,
            arr: C.param.toCity,
            dptDate: C.param.fromDate
        }, function(E) {
            if (E) {
                C._process_zyf(E);
            }
        }, {
            beforeSend: function(E) {
                if (window.addHtag) {
                    window.addHtag(E);
                }
            }
        });
    };
    this.queryNext = function() {
        if (this.searchEnd()) {
            return;
        }
        $jex.console.warn("[queryNext]", new Date().getTime() - e);
        if (this.getTask()) {
            var C = this.getTask();
            $jex.console.info("queryNext: 等待插入任务结束. TaskID:", C);
            setTimeout(function() {
                p.queryNext();
            }, 100);
        } else {
            if (l == false && d != 2) {
                p._invoke_AVData();
            } else {
                if (i != 2 && (d == 2 || (d != 2 && c.length >= 2))) {
                    $jex.console.info("queryNext:处理联程", " transferSearchState:", i, " isValidQuery:", x.isValidQuery, " onewayDatasLength:", c.length);
                    p._invoke_transfer();
                } else {
                    $jex.console.info("queryNext:处理直飞");
                    setTimeout(function() {
                        p._invoke_oneway();
                    }, s);
                }
            }
        }
    };
    this.genTraceTimeStamp = function() {
        if (CLIENT_TIME && SERVER_TIME) {
            p.traceTimeStamp = (new Date().getTime() - CLIENT_TIME.getTime()) + SERVER_TIME.getTime();
        } else {
            p.traceTimeStamp = new Date().getTime();
        }
    };
    this.genBookingTimeStamp = function() {
        if (CLIENT_TIME && SERVER_TIME) {
            p.wrapperExpandStamp = (new Date().getTime() - CLIENT_TIME.getTime()) + SERVER_TIME.getTime();
        } else {
            p.wrapperExpandStamp = new Date().getTime();
        }
    };
    this.genFilterTimeStamp = function() {
        if (CLIENT_TIME && SERVER_TIME) {
            p.filterTimeStamp = (new Date().getTime() - CLIENT_TIME.getTime()) + SERVER_TIME.getTime();
        } else {
            p.filterTimeStamp = new Date().getTime();
        }
    };
    this._invoke_longwell = function() {
        $jex.console.start("调用longwell");
        var I = this.param;
        var E = c;
        var D;
        var H = "loa";
        try {
            if (window.UA_obj.UADATA) {
                D = window.UA_obj.UADATA;
            } else {
                window.UA_obj["re" + H + "dUA"]();
                D = window.UA_obj.UADATA;
            }
            delete window.UA_obj.UADATA;
        } catch (G) {
            D = "";
        }
        var F = {
            "http://www.travelco.com/searchArrivalAirport": I.toCity,
            "http://www.travelco.com/searchDepartureAirport": I.fromCity,
            "http://www.travelco.com/searchDepartureTime": I.fromDate,
            "http://www.travelco.com/searchReturnTime": I.fromDate,
            locale: "zh",
            nextNDays: "0",
            searchLangs: "zh",
            searchType: "OneWayFlight",
            tags: 1,
            mergeFlag: 0,
            xd: LONGWELLVERSION,
            wyf: D
        };
        k = {
            departureCity: I.fromCity,
            arrivalCity: I.toCity,
            departureDate: I.fromDate,
            returnDate: I.fromDate,
            nextNDays: "0",
            searchType: "OneWayFlight",
            searchLangs: "zh",
            locale: "zh"
        };
        $jex.merge(F, this.oparam);
        $jex.merge(k, this.oparam);
        var C = o + "/twell/longwell";
        $jex.ajax(C, F, function(L) {
            u && console.log("longwell回数", L, new Date());
            L && L.v && LOG_SPIDER.addLog("longwell", L.v);
            window.UA_obj && window.UA_obj.ver && LOG_SPIDER.addLog("jsversion", window.UA_obj.ver);
            $jex.console.end("调用longwell");
            if (L.isLimit) {
                $jex.event.trigger(p, "ipBlock");
                return;
            }
            $jex.event.trigger(p, "getQueryId", L);
            x = L;
            window.codeshare_rank_weight = x.codeshare_rank_weight || 0;
            p.queryId(L.queryID);
            k.queryID = L.queryID;
            k.serverIP = L.serverIP;
            var K = L.validate;
            if (K) {
                if (K.dept.country != "中国" || K.arri.country != "中国") {
                    $jex.event.trigger(p, "interSearch");
                    return;
                }
                if (K.dept.value == K.arri.value) {
                    $jex.event.trigger(p, "sameCity");
                    return;
                }
                $jex.event.trigger(p, "validateComplete", L.validate);
            }
            if (L.isBackendBusy) {
                $jex.event.trigger(p, "systemBusy");
                return;
            }
            if (L.isValidQuery) {
                p.isValidQuery(true);
                d = 1;
                $jex.event.trigger(p, "validQuery");
            } else {
                p.isValidQuery(false);
                d = 2;
                $jex.event.trigger(p, "invalidQuery");
            }
            if (!L.isTransferFlightsNeeded) {
                i = 2;
                $jex.event.trigger(p, "TransferDataReady");
            }
            $jex.event.trigger(p, "loadedLongwell", L);
            var J = L.oneway_data || {};
            setTimeout(function() {
                k.deduce = true;
                m = 1;
            }, 1000);
            if (!$jex.$empty(J.priceInfo)) {
                p._process_oneway(J);
            } else {
                $jex.event.trigger(p, "noOnewayData");
                p.queryNext();
            }
        }, {
            onerror: p._onerror,
            beforeSend: function(J) {
                if (window.addHtag) {
                    window.addHtag(J);
                }
            }
        });
    };
    this._invoke_oneway = function() {
        var E = c;
        if (m == 1) {
            $jex.console.info("本次为deduce jsp调用.");
            var D = o + "/twell/flight/tags/deduceonewayflight_groupdata.jsp";
        } else {
            var D = o + "/twell/flight/tags/onewayflight_groupdata.jsp";
        }
        if (h) {
            k.flightCode = h;
        }
        var C = h;
        this._lastGinfoData = null;
        $jex.ajax(D, k, function(F) {
            u && console.log("GROUP_DATA回数：", F, new Date());
            if (m == 1) {
                m = 2;
            }
            if (C !== h) {
                p.correctPriceInfo(F, h);
            }
            if (C && C != "") {
                F.flightCode = C;
            }
            p._process_oneway(F);
            if (k.deduce == true) {
                f = true;
            }
        }, {
            onerror: p._onerror,
            beforeSend: function(F) {
                if (window.addHtag) {
                    window.addHtag(F);
                }
            }
        });
    };
    this._process_oneway = function(D) {
        var C = c;
        k.status = D.status;
        C.push(D);
        if (!$jex.$empty(D.priceInfo)) {
            $jex.event.trigger(p, "loadedOnewayData", D);
            PAGE_EVENT.trigger("wrapper_loadData", D);
            if (!A) {
                $jex.event.trigger(p, "loadedFirstData", D);
                A = true;
            }
        } else {
            $jex.console.info("直飞价格数据为空.");
        }
        if (!D.dataCompleted) {
            $jex.console.info("dataCompleted:搜索未结束");
            if (new Date() - e > 60000) {
                $jex.console.info("dataCompleted:超时停止");
                d = 2;
                p.queryNext();
            } else {
                s = $jex.$defined(D.invokeInterval) ? D.invokeInterval * 2 : 100;
                y = new Date().getTime() + s;
                $jex.console.info("dataCompleted:继续搜索直飞,", s);
                p.queryNext();
            }
        } else {
            $jex.console.info("dataCompleted:搜索结束 , deduceJSPState:", m);
            if (m == 2) {
                d = 2;
            } else {
                m = 1;
            }
            this.queryNext();
        }
    };
    this._process_zyf = function(C) {
        $jex.event.trigger(p, "zyfLoaded", C);
    };
    this._invoke_transfer = function() {
        if (p.searchEnd()) {
            return;
        }
        $jex.console.info("---->调用联程");
        var D = $jex.merge({}, k);
        if (i == 1) {
            D.isReSearch = true;
        }
        var C = o + "/twell/flight/tags/OneWayFlight_data_more.jsp";
        $jex.ajax(C, D, function(E) {
            u && console.log("transfer回数：", E, new Date());
            j.push(E);
            p.tserver(E.server);
            if (E.needNewSearch == true) {
                i = 1;
                $jex.console.info("[联程需要再次调用 ] data.needNewSearch:", E.needNewSearch);
                setTimeout(function() {
                    p.queryNext();
                }, 3500);
            } else {
                $jex.event.trigger(p, "TransferDataReady");
                if (!$jex.$empty(E.data)) {
                    $jex.event.trigger(p, "loadedTransfer", E);
                    if (!A) {
                        $jex.event.trigger(p, "loadedFirstData", E);
                        A = true;
                    }
                } else {
                    $jex.event.trigger(p, "noTransferData", E);
                    $jex.console.info("联程价格数据为空.");
                }
                i = 2;
                p.queryNext();
                s = Math.max(new Date() - y, 0);
            }
        }, {
            onerror: p._onerror,
            beforeSend: function(E) {
                if (window.addHtag) {
                    window.addHtag(E);
                }
            }
        });
    };
    this.syncCurrentFlightCode = function(C) {};
    var a = "all";
    this.setCurFlightType = function(C) {
        C && (a = C);
    };
    this.invoke_flightPriceData = function(H, F, G, E, D) {
        a = E;
        if (F) {
            B = H;
        } else {
            h = H;
            B = "";
        }
        var C = function() {
            if (E === a) {
                G && G();
            }
        };
        p._invoke_flightPriceData(H, C, D);
    };
    this.correctPriceInfo = function(D, E) {
        var C = this._lastGinfoData;
        this._lastGinfoData = null;
        if (C && C.priceData[E]) {
            D.priceData = {};
            D.labelType = null;
            D.priceInfo[E] = C.priceInfo[E];
        }
    };
    this._invoke_flightPriceData = function(K, L, H) {
        if (!H.priceInfo()) {
            return;
        }
        $jex.console.info("[invoke_flightPriceData]开始调用直飞航班价格数据: flightCode:", K);
        var M;
        if (w.lowestOneway()) {
            M = w.lowestOneway().lowestPrice();
        }
        if (H.lowestPrice() == M) {
            k.lowflight = true;
            k.lowflightpr = M;
            H.isInLowest(true);
        } else {
            delete k.lowflight;
            delete k.lowflightpr;
            H.isInLowest(false);
        }
        var F;
        var C = "loa";
        try {
            if (window.UA_obj) {
                window.UA_obj["re" + C + "dUA"](new Date());
                F = window.UA_obj.UADATA;
            }
            delete window.UA_obj.UADATA;
        } catch (I) {
            F = "";
        }
        k.wyf = F;
        var D = o + "/twell/flight/tags/onewayflight_groupinfo.jsp";
        var J = a;
        var E = H.priceInfo().d;
        var G = H.priceInfo().k;
        k.flightCode = K;
        k.label = a;
        k.d = E;
        k.k = G;
        this._lastGinfoData = null;
        $jex.ajax(D, k, function(N) {
            u && console.log("groupInfo", N);
            if (N.isLimit) {
                $jex.event.trigger(p, "ipBlock");
                return;
            }
            N && N.v && LOG_SPIDER.addLog("groupInfo", N.v);
            N.flightCode = K;
            N.labelType = J;
            $jex.event.trigger(p, "loadedGroupinfo", N);
            p._lastGinfoData = N;
            $jex.event.trigger(p, "parsingFlightPriceData", N);
            if (L) {
                L();
            }
            $jex.console.info("[invoke_flightPriceData] 处理完毕");
            PAGE_EVENT.trigger("wrapper_loadData", N);
        }, {
            onerror: p._onerror,
            beforeSend: function(N) {
                if (window.addHtag) {
                    window.addHtag(N);
                }
            }
        });
    };
    this.searchEnd = function() {
        if (v == 2) {
            return true;
        }
        if (v != 2 && d == 2 && i == 2) {
            v = 2;
            $jex.event.trigger(p, "searchEnd");
            $jex.console.info("searchEND ::: OK ");
            return true;
        }
        return false;
    };
    this.isSearchEnd = function() {
        return v == 2;
    };
    this._invoke_ExtInfo = function() {
        $jex.console.info("调用扩展信息及准点率");
        var E = this.param;
        var C = o + "/twell/flight/DynamicFlightInfo.jsp";
        var D = {
            departureCity: E.fromCity,
            arrivalCity: E.toCity,
            departureDate: E.fromDate,
            fromCity: E.fromCity,
            toCity: E.toCity
        };
        $jex.merge(D, this.oparam);
        $jex.ajax(C, D, function(F) {
            u && console.log("扩展信息回数：", F, new Date());
            b = F;
            $jex.event.trigger(p, "loadedExtInfo", F);
        }, {
            onerror: p._onerror,
            beforeSend: function(F) {
                if (window.addHtag) {
                    window.addHtag(F);
                }
            }
        });
    };
    this._invoke_AVData = function() {
        $jex.console.info("调用AV数据");
        var C = o + "/twell/flight/OneWayFlight_Info.jsp";
        $jex.ajax(C, k, function(D) {
            u && console.log("AVData回数：", D, new Date());
            n = D;
            $jex.event.trigger(p, "loadedAVData", D);
            l = true;
            if (!$jex.$empty(D.flightInfo)) {
                if (!A) {
                    $jex.event.trigger(p, "loadedFirstData", D);
                    A = true;
                }
            }
            p.queryNext();
        }, {
            onerror: p._onerror,
            beforeSend: function(D) {
                if (window.addHtag) {
                    window.addHtag(D);
                }
            }
        });
    };
    this._onerror = function() {
        $jex.event.trigger(p, "onerror", arguments);
    };
    var g = [];
    this.insertTask = function() {
        var C = "task" + $jex.globalID();
        g.push(C);
        return C;
    };
    this.getTask = function() {
        if (g.length == 0) {
            return null;
        }
        return g[0];
    };
    this.finishTask = function(D) {
        for (var C = 0; C < g.length; C++) {
            if (g[C] == D) {
                g.splice(C, 1);
            }
        }
    };
    return this;
})();
var PriceCheckService = (function() {
    var a = "/twell/flight/tags/onewayflight_pricecheck.jsp";
    var g = 10000;
    var k = 1000;
    var m = {};

    function c(n) {
        var o = System.service.param;
        return {
            queryID: System.service.queryId(),
            departureCity: o.fromCity,
            arrivalCity: o.toCity,
            departureDate: o.fromDate,
            returnDate: o.fromDate,
            flightCode: n.split("_")[0],
            label: n.split("_")[1]
        };
    }

    function b(n) {
        var o = f(n);
        o.param = o.param || c(n);
        o.param.interceptTime = o.lastTime;
        return o.param;
    }

    function f(n) {
        m[n] = m[n] || {};
        return m[n];
    }

    function j(o, n) {
        var p = b(o);
        $jex.ajax(a, p, n, {
            onerror: function() {
                n();
            },
            beforeSend: function(q) {
                if (window.addHtag) {
                    window.addHtag(q);
                }
            }
        });
    }

    function d(o, q) {
        var p = q.lastTime;

        function n(r) {
            if (q.lastTime > p) {
                return;
            }
            if (r.ret === false) {
                h(o);
            } else {
                q.interval = r.interval;
                q.data = $jex.extend(q.data || {}, r.priceData);
                q.lastTime = r.interceptTime;
            }
        }
        j(o, function(r) {
            if (r) {
                n(r);
            }
            l(o);
        });
    }

    function i(n) {
        l(n);
    }

    function l(n) {
        var o = f(n);
        if (o._timer === -1) {
            return;
        }
        clearTimeout(o._timer);
        o._timer = setTimeout(function() {
            if (o.lastTime) {
                d(n, o);
            } else {
                l(n);
            }
        }, o.interval || g);
    }

    function h(n) {
        var o = m[n];
        if (o) {
            clearTimeout(o._timer);
            o._timer = -1;
        }
    }
    var e = {};
    e.initData = function(n, p) {
        var o = f(n);
        o.lastTime = p;
        o.interval = k;
        o.data = {};
    };
    e.pause = function(n) {
        h(n);
    };
    e.start = function(n) {
        var o = f(n);
        if (o._timer === -1) {
            o._timer = null;
        }
        o.interval = k;
        i(n);
    };
    e.getPriceInfo = function(o, n) {
        var p = m[o];
        return p && p.data && p.data[n];
    };
    return e;
})();
var TransferFlightEntity = function() {
    TransferFlightEntity.superclass.constructor.call(this);
    this.type = "transfer";
    var g = null;
    this.firstTrip = function(h) {
        if (h == null) {
            return g;
        } else {
            h.owner(this);
            h.position(0);
            g = h;
        }
    };
    var a = null;
    this.secondTrip = function(h) {
        if (h == null) {
            return a;
        } else {
            h.owner(this);
            h.position(1);
            a = h;
        }
    };
    var f = null;
    this.totalTax = function() {
        if (typeof f == "undefined" || f == null) {
            f = this.firstTrip().totalTax() + this.secondTrip().totalTax();
        }
        return f;
    };
    this.carrierCode = function() {
        return (this.firstTrip().carrierCode() == this.secondTrip().carrierCode()) ? this.firstTrip().carrierCode() : "";
    };
    this.deptTimeRange = function() {
        return this.firstTrip().deptTimeRange();
    };
    var d = null;
    this.deptTimeValue = function() {
        if (typeof d == "undefined" || d == null) {
            d = this.firstTrip().deptTimeValue();
        }
        return d;
    };
    var e = null;
    this.planeType = function() {
        if (typeof e == "undefined" || e == null) {
            e = this.firstTrip().planeType().concat(this.secondTrip().planeType());
        }
        return e;
    };
    var c = null;
    this.airportCodes = function() {
        if (typeof c == "undefined" || c == null) {
            c = this.firstTrip().airportCodes().concat(this.secondTrip().airportCodes());
        }
        return c;
    };
    var b = null;
    this.transferCity = function() {
        if (typeof b == "undefined" || b == null) {
            b = [this.firstTrip().flightInfo().ac];
        }
        return b;
    };
    this.lowestPrice = function() {
        return this.firstTrip().lowestPrice() + this.secondTrip().lowestPrice();
    };
};
$jex.extendClass(TransferFlightEntity, FlightEntity);
TransferFlightEntity.prototype.flightKeyCode = function() {
    return this.firstTrip().flightKeyCode() + "|" + this.secondTrip().flightKeyCode();
};
TransferFlightEntity.prototype.lowestDiscount = function() {
    var a = this.flightInfoMgr().get("priceInfo", this.flightKeyCode());
    if (!a || !a.op) {
        return 0;
    }
    return Math.round((this.lowestPrice() / a.op) * 100) / 10;
};
TransferFlightEntity.prototype.isIntervalFlight = function() {
    return this.firstTrip().flightInfo().dd != this.secondTrip().flightInfo().dd;
};
TransferFlightEntity.prototype.flightKeyCode = function() {
    var a = this.firstTrip().flightKeyCode() + "|" + this.secondTrip().flightKeyCode();
    return a;
};
TransferFlightEntity.prototype.update = function() {
    var a = this.flightInfoMgr();
    this.lowprInfo = a.get("priceInfo", this.flightKeyCode());
    if (this.lowprInfo) {
        this.lowestPrice(this.lowprInfo.lowpr);
    }
    this.firstTrip().update();
    this.secondTrip().update();
    $jex.event.trigger(this, "updating");
};
TransferFlightEntity.tryCreate = function(i, f, c, g) {
    var a = i[0];
    var e = i[1];
    var b = SingleTripFlightEntity.tryCreate(a, f, c);
    var h = SingleTripFlightEntity.tryCreate(e, f, c);
    if (!b || !h) {
        return null;
    }
    var d = new TransferFlightEntity();
    d.key(i);
    d.firstTrip(b);
    d.secondTrip(h);
    d.commInfoMgr(f);
    d.flightInfoMgr(c);
    d.update();
    g.put(i, d);
    return d;
};
var SingleTripFlightEntity = function() {
    SingleTripFlightEntity.superclass.constructor.call(this);
    this.type = "onewayInTransfer";
    this.lineType = "oneway";
    var c = null;
    this.owner = function(f) {
        if (f == null) {
            return c;
        } else {
            c = f;
        }
    };
    var a = null;
    this.position = function(f) {
        if (f == null) {
            return a;
        } else {
            a = f;
        }
    };
    var e = null;
    this.totalTax = function() {
        if (typeof e == "undefined" || e == null) {
            var h = this.extInfo();
            var f = (h ? parseInt(h.acf, 10) : 0) || ConfigManager.getConfig("default", "acf");
            var g = (h ? parseInt(h.fot, 10) : 0) || ConfigManager.getConfig("default", "fot");
            e = f + g;
        }
        return e;
    };
    var b = this;
    var d = null;
    this.wrappers = function() {
        if (typeof d == "undefined" || d == null) {
            d = new SingleTripFlightWrapperListEntity();
            d.ownerFlight(this);
            d.update = function() {
                this.dataSource(b.flightInfoMgr().get("priceData", b.key()));
            };
            d.update();
        }
        return d;
    };
};
$jex.extendClass(SingleTripFlightEntity, FlightEntity);
SingleTripFlightEntity.prototype.codeShareFlight = function() {
    return this.commInfoMgr().entityManager().get(this.codeShare() + "|" + this.deptDate());
};
SingleTripFlightEntity.prototype.update = function() {
    var c = this.key();
    var b = this.commInfoMgr();
    var a = this.flightInfoMgr();
    this.type = "onewayInTransfer";
    this.lineType = (c.indexOf("/") == -1 && c.indexOf("+") == -1) ? "oneway" : "compose";
    var d = a.get("flightInfo", this.key());
    this.flightInfo(d);
    if (d) {
        this.lowestPrice(d.lowpr ? d.lowpr : ConfigManager.getConfig("default", "price"));
    }
};
SingleTripFlightEntity.tryCreate = function(g, d, f) {
    var h = g.split("_")[0];
    var b = d;
    var a = f;
    var e = a.get("flightInfo", g);
    if (!e) {
        return null;
    }
    if (!b.get("airport", e.da)) {
        return null;
    }
    if (!b.get("airport", e.aa)) {
        return null;
    }
    if (!b.get("city", e.dc)) {
        return null;
    }
    if (!b.get("city", e.ac)) {
        return null;
    }
    if (!b.get("carrier", e.ca)) {
        return null;
    }
    if (!b.get("plane", e.pt)) {
        return null;
    }
    var c = new SingleTripFlightEntity();
    c.key(g);
    c.commInfoMgr(b);
    c.flightInfoMgr(a);
    return c;
};

function SingleTripFlightWrapperListEntity() {
    SingleTripFlightWrapperListEntity.superclass.constructor.call(this);
}
$jex.extendClass(SingleTripFlightWrapperListEntity, WrapperListEntity);
SingleTripFlightWrapperListEntity.prototype.createWrapperEntity = function() {
    return new SingleTripFlightWrapperEntity();
};
SingleTripFlightWrapperListEntity.prototype.sort = function() {
    var b = this.keys(),
        a = this;
    b.sort(function(d, c) {
        var f = a.get(d);
        var e = a.get(c);
        return f.sortRank() - e.sortRank();
    });
    this._keysCache = b;
    return b;
};

function SingleTripFlightWrapperEntity(a) {
    SingleTripFlightWrapperEntity.superclass.constructor.call(this, a);
    this._type = "SingleTripFlightWrapperEntity";
}
$jex.extendClass(SingleTripFlightWrapperEntity, WrapperEntity);
SingleTripFlightWrapperEntity.prototype.rankgrade = function() {
    return Math.round(this.dataSource().dispRank * 10) / 10 || 0;
};
SingleTripFlightWrapperEntity.prototype.ranktitle = function() {
    return FlightUtil.getGTITLE(this.advalue(), 1, this.dataSource().rankline, 5 - this.dataSource().rankline);
};
SingleTripFlightWrapperEntity.prototype.comments = function() {
    return this.dataSource().comments || [];
};
SingleTripFlightWrapperEntity.prototype._booking = function(b, c) {
    c = c || {};
    if (!c.BookingLocation) {
        c.BookingLocation = "list_all";
    }
    var e = this._booking_url(b, c);
    var d = 1;
    c = c || {};
    if (c.prt === 0) {
        d = 2;
    }
    if (c.recom === 1) {
        d = 3;
        System.service.genTraceTimeStamp();
        System.analyzer.triggerTrace = true;
    }
    System.service.genBookingTimeStamp();
    var a = this.ownerFlight().owner();
    if (a) {
        d += ("&package=" + a.firstTrip().code() + "/" + a.secondTrip().code());
    }
    window.open(e);
    $jex.event.trigger($jex.$("hdivResultPanel"), "fem_booking");
    this._bookingBtnTrace();
    TsinghuaOneWayTracker.track("btype", d, System.service.traceTimeStamp, null, "&burl=" + encodeURIComponent(e) + "&wt=" + System.service.wrapperExpandStamp);
    this._booking_track();
};
SingleTripFlightWrapperEntity.prototype.hasPackageprice = function() {
    return this.bpr();
};
SingleTripFlightWrapperEntity.prototype._bookingBtnTrace = function() {
    var a = this.ownerFlight().owner();
    TsinghuaOneWayTracker.trackWrappers(a.firstTrip());
    TsinghuaOneWayTracker.trackWrappers(a.secondTrip());
    TsinghuaOneWayTracker.traceFlightList();
};
SingleTripFlightWrapperEntity.prototype.afeePrice = function() {
    return this.bpr() && this.price();
};
SingleTripFlightWrapperEntity.prototype.bprPrice = function() {
    return this.bpr() || this.price();
};
SingleTripFlightWrapperEntity.prototype.tag = function() {
    return this.dataSource().type;
};
var FlightListUISorter = {};
$jex.exec(function() {
    var c = null;
    var b = null;
    FlightListUISorter.userSorted = function(e) {
        if (e == null) {
            return b;
        } else {
            b = e;
        }
    };
    FlightListUISorter.open = function(f) {
        if (f.isAV && f.isAV()) {
            return;
        }
        c = f;
        var h = $jex.offset($jex.$("resultAnchor"));
        if (!/msie 6/.test(window.navigator.userAgent.toLowerCase())) {
            var g = 0,
                e = $jex.$("js_schwrap"),
                i;
            if (window.getComputedStyle) {
                i = window.getComputedStyle(e, null).getPropertyValue("position");
            } else {
                if (e.currentStyle) {
                    i = e.currentStyle.position;
                }
            }
            if (i === "static") {
                g = -2;
            }
            if (!($jex.$("top_recommend_id") && $jex.$("top_recommend_id").childNodes.length)) {
                window.scrollTo(h.left, h.top - 55 - g);
            } else {
                window.scrollTo(h.left, $jex.offset($jex.$("top_recommend_id")).top + 10 - g);
            }
        } else {
            window.scrollTo(h.left, h.top);
        }
    };
    FlightListUISorter.close = function() {
        c = null;
    };
    FlightListUISorter.resortPage = function(g) {
        if (!c) {
            return;
        }
        for (var f = 0, e = g.length; f < e; f++) {
            if (g[f] === c) {
                g.splice(f, 1);
                g.splice(0, 0, c);
                break;
            }
        }
    };
    FlightListUISorter.sortPrice = function(h, f) {
        var e = ConfigManager.getConfig("NonStrikingCarrier", h);
        if (e) {
            f -= e;
        }
        var g = ConfigManager.getConfig("StrikingCarrier", h);
        if (g) {
            f += g;
        }
        return f;
    };

    function d(i) {
        var h = "14:00".split(":");
        var g = i.split(":");
        var e = new Date();
        e.setHours(parseInt(g[0], 10), parseInt(g[1], 10));
        var f = new Date();
        f.setHours(parseInt(h[0], 10), parseInt(h[1], 10));
        return (Math.abs(f - e) / 1000);
    }

    function a(h, e, g) {
        f(h);

        function f(w) {
            for (var r = 0; r < w.length - 1; r++) {
                for (var s = 0; s < w.length - 1 - r; s++) {
                    var q = w[s];
                    var u = w[s + 1];
                    if (e[q].lowestPrice() !== e[u].lowestPrice()) {
                        continue;
                    }
                    var p = e[q].type === "transfer" ? e[q].firstTrip() : e[q];
                    var n = e[u].type === "transfer" ? e[u].firstTrip() : e[u];
                    var o = 1;
                    var m = o * 2;
                    var t = 0;
                    var k = 0;
                    t = g && p.isCodeShare() ? 0 : m;
                    k = g && n.isCodeShare() ? 0 : m;
                    var l = d(p.deptTime());
                    var v = d(n.deptTime());
                    if (l > v) {
                        k += o;
                    }
                    if (l < v) {
                        t += o;
                    }
                    if (t < k) {
                        w[s + 1] = q;
                        w[s] = u;
                    }
                }
            }
        }
    }
    FlightListUISorter.resort = function(C, H, g, F) {
        var j = 999999;
        if (FlightListUISorter.userSorted()) {
            return {};
        }
        $jex.console.start("FlightListUISorter.resort");
        var m = [];
        var R = function(i) {
            if (H[i] != null) {
                var k = H[i].lowestPrice();
                if (k != null) {
                    return k;
                } else {
                    return j;
                }
            }
        };
        var z = function(k) {
            if (H[k] != null) {
                var n = FlightListUISorter.sortPrice(H[k].carrierCode(), H[k].lowestPrice());
                var i = H[k];
                if (n != null) {
                    if (i.isCodeShare && i.isCodeShare()) {
                        return n + window.codeshare_rank_weight;
                    } else {
                        return n;
                    }
                } else {
                    return j;
                }
            }
        };
        C.sort(function(k, i) {
            return R(k) - R(i);
        });
        var o;
        var v;
        var r;
        var A;
        var x = [];
        var K = 0;
        var w;
        var e = [];
        for (var Q = 0; Q < C.length; Q++) {
            var O = C[Q];
            var T = H[O].type;
            if (T !== "oneway") {
                continue;
            }
            if (!w) {
                w = O;
                e.push(O);
            } else {
                if (R(O) === R(w)) {
                    w = O;
                    e.push(O);
                } else {
                    a(e, H, true);
                    var t = e[0];
                    o = t;
                    v = H[t].carrierCode();
                    A = R(t);
                    r = A + H[t].totalTax();
                    K = $jex.array.indexOf(C, t);
                    C.splice(K, 1);
                    break;
                }
            }
        }
        var S = [];
        var N;
        var D;
        var E = [];
        var y;
        var l;
        var u = ConfigManager.getConfig("PayCarrierSort");
        for (var L in u) {
            if (u.hasOwnProperty(L)) {
                u[L] = [];
            }
        }
        var f = [];
        var P = [];
        var U, B;
        var J = [];
        $jex.foreach(C, function(i) {
            if (H[i].type == "oneway") {
                U = H[i].carrierCode();
                B = R(i);
                if (B != j && U != v && U in u) {
                    if ($jex.array.indexOf(u[U], i) < 0) {
                        u[U].push(i);
                    }
                } else {
                    if (B == j) {
                        x.push(i);
                    } else {
                        J.push(i);
                    }
                }
            } else {
                if (H[i].type == "transfer") {
                    E.push(i);
                } else {
                    if (H[i].type == "compose") {
                        S.push(i);
                    }
                }
            }
        });
        if (S.length > 0) {
            D = R(S[0]);
            if (D < A) {
                N = S[0];
                S.splice(0, 1);
            }
            a(S, H, false);
        }
        if (E.length > 0) {
            l = R(E[0]);
            if (l < A) {
                y = E[0];
                E.splice(0, 1);
            }
            a(E, H, false);
        }
        $jex.foreach(u, function(i) {
            if (i.length > 0) {
                i.sort(function(n, k) {
                    return z(n) - z(k);
                });
                f.push(i[0]);
                i.splice(0, 1);
                P = P.concat(i);
            }
        });
        J = J.concat(P);
        J.sort(function(k, i) {
            return z(k) - z(i);
        });
        a(J, H, true);
        J = J.concat(S);
        J = J.concat(E);
        var G = [];
        var h;
        var q = [];
        if (o != undefined && o != "") {
            G.push(o);
        }
        if (N != undefined && N != "") {
            G.push(N);
        }
        if (y != undefined && y != "") {
            G.push(y);
        }
        q = q.concat(f);
        if (G.length < 15) {
            h = 15 - G.length - f.length;
            q = q.concat(J.splice(0, h));
        }
        var s = [];
        var I = [];
        for (var Q = 0, M = q.length; Q < M; Q++) {
            if (H[q[Q]].type != "transfer" && H[q[Q]].type != "compose") {
                I.push(q[Q]);
            } else {
                s.push(q[Q]);
            }
        }
        I.sort(function(k, i) {
            return z(k) - z(i);
        });
        a(I, H, true);
        G = G.concat(I, s);
        m = m.concat(G, J, x);
        C.splice(0, C.length);
        $jex.foreach(m, function(i) {
            C.push(i);
        });
        $jex.event.trigger(FlightListUISorter, "dosort", C, H);
        $jex.console.end("FlightListUISorter.resort");
    };
});

function PagerUI(a) {
    PagerUI.superclass.constructor.call(this, a);
    this._type = "PagerUI";
}
$jex.extendClass(PagerUI, XControl);
PagerUI.prototype.go = function(a) {
    $jex.event.trigger(this, "changePage", a);
};
PagerUI.prototype.update = function(f) {
    var h = f;
    var c = h.pageIndex;
    var e = h.pageSize;
    var g = h.pageCount;
    this.clear();
    var d = [];
    var a = this;
    var b = new pageCreator(c, g);
    b.renderPrevpage = function(i) {
        a.append("<a ", "prev", ' href="#" value="-1"> 上一页 </a>');
        d.push("prev");
    };
    b.renderNextpage = function(i) {
        a.append("<a ", "next", ' href="#" value="-2">下一页 </a>');
        d.push("next");
    };
    b.renderPage = function(i, j) {
        if (j) {
            a.text("<em>", i + 1, "</em>");
        } else {
            a.append("<a ", "p" + i).text(' href="#" value="', i, '">', i + 1, "</a>");
            d.push("p" + i);
        }
    };
    b.renderPrefixDot = function() {
        a.text("...");
    };
    b.renderSuffixDot = function() {
        a.text("...");
    };
    b.render();
    this.onInit(function() {
        var j = this;
        for (var k = 0; k < d.length; k++) {
            var l = d[k];
            (function(i) {
                $jex.event.binding(j.find(i), "click", function(m) {
                    j.go(parseInt(this.getAttribute("value"), 10));
                    $jex.stopEvent(m);
                });
            })(l);
        }
    });
    this.render();
};

function pageCreator(a, d, b) {
    var f = d;
    var c = a;
    var e = e || 4;
    this.renderPrevpage = function() {};
    this.renderNextpage = function() {};
    this.renderPage = function() {};
    this.renderPrefixDot = function() {};
    this.renderSuffixDot = function() {};
    this._renderPage = function(g) {
        this.renderPage(g, g == c);
    };
    this.render = function() {
        var h = false;
        var j = false;
        var g = f - 1;
        for (var k = 0; k <= g; k++) {
            if (k == 0 && c > 0) {
                this.renderPrevpage(c - 1);
            }
            if (c - e > k && !h) {
                this._renderPage(0);
                if (c - e > 1) {
                    this.renderPrefixDot();
                }
                h = true;
            }
            if (c - e <= k && c + e >= k) {
                this._renderPage(k);
            }
            if (c + e < k && !j) {
                if (c + e < g - 1) {
                    this.renderSuffixDot();
                }
                this._renderPage(g);
                j = true;
            }
            if (k == g && c < g) {
                this.renderNextpage(c + 1);
            }
        }
    };
}

function OnewayPagerUI(a) {
    OnewayPagerUI.superclass.constructor.call(this, a);
    this._type = "OnewayPagerUI";
    this._bindClickEvent();
}
$jex.extendClass(OnewayPagerUI, PagerUI);
OnewayPagerUI.prototype._bindClickEvent = function() {
    var a = this;
    setTimeout(function() {
        var b = a.elem();
        $jex.event.binding(b, "click", function(d) {
            var c = d.target || window.event.srcElement;
            if (c.tagName == "A") {
                $jex.stopEvent(d);
                a.go(parseInt(c.getAttribute("value"), 10));
            }
        });
    });
};
OnewayPagerUI.prototype.update = function(f) {
    var h = f;
    var c = h.pageIndex;
    var e = h.pageSize;
    var g = h.pageCount;
    this.clear();
    var d = [];
    var a = this;
    var b = new pageCreator(c, g);
    b.renderPrevpage = function(i) {
        a.append("<a ", "prev", ' href="#" value="-1"> 上一页 </a> ');
        d.push("prev");
    };
    b.renderNextpage = function(i) {
        a.append("<a ", "next", ' href="#" value="-2">下一页 </a> ');
        d.push("next");
    };
    b.renderPage = function(i, j) {
        if (j) {
            a.text("<em>", i + 1, "</em> ");
        } else {
            a.append("<a ", "p" + i).text(' href="#" value="', i, '">', i + 1, "</a> ");
            d.push("p" + i);
        }
    };
    b.renderPrefixDot = function() {
        a.text("... ");
    };
    b.renderSuffixDot = function() {
        a.text("... ");
    };
    b.render();
    this.render();
};

function SearchStatusbar(a) {
    SearchStatusbar.superclass.constructor.call(this, a);
    this._type = "SearchStatusbar";
    this._init();
}
$jex.extendClass(SearchStatusbar, XControl);
SearchStatusbar.prototype._init = function() {
    var b = this;
    var a = this._setting.service;
    var c = this._setting.analyzer;
    this.endsearch = false;
    this.vendorNames = [];
    this.vendorMap = new $jex.List();
    this.onewayCount = 0;
    this.transferCount = 0;
    this.onewayPriceCount = 0;
    this.transferPriceCount = 0;
    this.singleNum = 0;
    this.pkgNum = 0;
    $jex.event.binding(a, "loadedFirstData", function() {
        b.start();
    });
    $jex.event.binding(a, "loadedLongwell", function(d) {
        $jex.foreach(d.vendors, function(f, e, g) {
            b.vendorNames.push(f.name);
            b.vendorMap.put(g, true);
        });
    });
    $jex.event.binding(a, "loadedOnewayData", function(d) {
        if (d && typeof d.statusMap != "undefined") {
            b.onewayCount = d.statusMap;
        }
        if (d && typeof d.priceCount != "undefined") {
            b.onewayPriceCount = d.priceCount || 0;
        }
    });
    $jex.event.binding(a, "loadedRoundTripData", function(d) {
        if (d && typeof d.singleNum != "undefined") {
            b.singleNum = d.singleNum || 0;
        }
        if (d && typeof d.pkgNum != "undefined") {
            b.pkgNum = d.pkgNum || 0;
        }
        if (d && typeof d.priceCount != "undefined") {
            b.onewayPriceCount = d.priceCount || 0;
        }
    });
    $jex.event.binding(a, "loadedTransfer", function(d) {
        $jex.foreach(d.vendors, function(f, e, g) {
            b.vendorNames.push(f.name);
            b.vendorMap.put(g, true);
        });
        if (d && typeof d.wrapperCount != "undefined") {
            b.transferCount = d.wrapperCount;
        }
        if (d && typeof d.priceCount != "undefined") {
            b.transferPriceCount = d.priceCount || 0;
        }
    });
    $jex.event.binding(a, "searchEnd", function() {
        b.stop();
    });
};
SearchStatusbar.prototype.start = function() {
    var a = this;
    clearInterval(this.handler);
    this.handler = setInterval(function() {
        a.updateStatus();
    }, 500);
    this.updateStatus();
};
SearchStatusbar.prototype.stop = function() {
    clearInterval(this.handler);
    this.endsearch = true;
    this.updateStatus();
};
SearchStatusbar.prototype.updateStatus = function() {
    if (this.vendorMap.size() == 0) {
        return;
    }
    this.clear();
    var a = ["搜索<span>", this.vendorMap.size(), "</span>家网站，其中"];
    if (this.onewayCount) {
        a.push("<span>", this.onewayCount, "</span>家有直飞报价，");
    }
    if (this.singleNum) {
        a.push("<span>", this.singleNum, "</span>家有直飞报价，");
    }
    if (this.pkgNum) {
        a.push("<span>", this.pkgNum, "</span>家有双程报价，");
    }
    if (this.transferCount) {
        a.push("<span>", this.transferCount, "</span>家有联程报价，");
    }
    if (this.endsearch) {
        a.push("共<span>", this.onewayPriceCount + this.transferPriceCount, "</span>个报价信息，搜索结束");
    } else {
        var b = Math.floor(Math.random() * this.vendorNames.length);
        a.push("正在搜索<span>", this.vendorNames[b], "</span>");
    }
    this.elem().innerHTML = a.join("");
};

function OneWaySearchStatusbar(a) {
    OneWaySearchStatusbar.superclass.constructor.call(this, a);
    this._type = "OneWaySearchStatusbar";
    this._init();
}
$jex.extendClass(OneWaySearchStatusbar, SearchStatusbar);
OneWaySearchStatusbar.prototype.updateStatus = function() {
    if (this.vendorMap.size() == 0) {
        return;
    }
    this.clear();
    var b = window.location.param();
    var a = ['<b class="plc">', b.searchDepartureAirport, '</b><i class="ico_arrto">&nbsp;</i><b class="plc">', b.searchArrivalAirport, '</b><em class="sep_line">|</em><b class="jn">单程</b>'];
    a.push('<span class="dec">搜索<b class="highlight">' + this.vendorMap.size() + "</b>家网站，");
    if (this.onewayCount) {
        a.push('其中<b class="highlight">', this.onewayCount, "</b>家有直飞报价，");
    }
    if (this.singleNum) {
        a.push('其中<b class="highlight">', this.singleNum, "</b>家有直飞报价，");
    }
    if (this.pkgNum) {
        a.push('<b class="highlight">', this.pkgNum, "</b>家有双程报价，");
    }
    if (this.transferCount) {
        a.push('<b class="highlight">', this.transferCount, "</b>家有联程报价，");
    }
    if (this.endsearch) {
        a.push('共<b class="highlight">', this.onewayPriceCount + this.transferPriceCount, "</b>个报价信息，搜索结束");
    } else {
        var c = Math.floor(Math.random() * this.vendorNames.length);
        a.push("正在搜索", '<b class="highlight">', this.vendorNames[c], "</b></span>");
    }
    this.elem().innerHTML = a.join("");
    $jex.element.show(this.elem());
};
(function() {
    $jex.ui = $jex.ui || {};

    function a(f, e, h, g) {
        return h * f / g + e;
    }
    $jex.ui.lockScreenProgress = function(e, h) {
        var f = e && e.msg || "此次报价已过期，正在重新搜索",
            g = e && e.time || 3000;
        var k = ['<div class="b_pop_bjprc">', '<div class="e_btm_fliter"></div>', '<div class="e_box_fliter"></div>', '<div class="e_pop_bjprc">', '<div class="m_pop_bjprc">', "<h3>", f, '</h3><div class="prc_bjpop"><em id="js-progress_loading" style="width: 1%"></em></div></div></div></div>'].join("");
        $jex.lightbox.show(k);
        $jex.lightbox.overlay.style.backgroundColor = "#fff";
        var i = $jex.$("js-progress_loading");
        var n = 0,
            m = 100,
            l = 20,
            p = 0;
        var o = Math.floor(g / l);

        function j() {
            i.style.width = Math.ceil(a(p, n, m, l)) + "%";
            if (p < l) {
                p++;
                setTimeout(j, o);
            } else {
                h && h();
            }
        }
        j();
    };
})();
window.searchTrack = (function(d) {
    var f = null;
    var g, e;
    var b = null;
    var a = function(i) {
        var h = "/site/track.htm?action=" + (window._ba_utm_s || f) + "|" + i + "|&t=" + Date.parse(new Date());
        new Image().src = h;
    };

    function c() {
        this.onlyOne = false;
        this.config = {
            TJ: {
                type: "特价机票"
            },
            DMT: {
                type: "国内机票"
            },
            INT: {
                type: "国际机票"
            },
            MULT: {
                type: "国际机票-多程"
            }
        };
    }
    c.prototype = {
        constructor: c,
        init: function(j, l, i) {
            var k = this;
            f = i;
            var h = this.config[j];
            h.flt = l;
            this.DMT = this.config.DMT.flt;
            this.INT = this.config.INT.flt;
            this.MULT = this.config.MULT.flt;
            this.TJ = this.config.TJ.flt;
            this.ControlFlt = [];
            this.ControlFlt.push(this.DMT, this.INT, this.TJ);
            this.fltType = h;
            this._bindEvents();
        },
        _updateTime: function(h, k, i) {
            var j = this;
            if (window.QNR) {
                if (window.QNR.isLocal !== undefined) {
                    if (~h.indexOf("from")) {
                        var l = k.indexOf("(");
                        if (i) {
                            e = i;
                        }
                        if (l === -1) {
                            l = k.length;
                        }
                        $jex.jsonp("http://flight.qunar.com/twelli/flight/localDate.jsp", {
                            depCity: decodeURI(k.substr(0, l))
                        }, function(n) {
                            if (window.QNR) {
                                window.QNR.isLocal = n.isLocal;
                            } else {
                                window.QNR = {};
                                window.QNR.isLocal = n.isLocal;
                            }
                            var p = n.localDate.replace(/-/g, "/");
                            window.GSERVER_TIME = new Date(p);
                            if (n.isLocal) {
                                window.QNR[k.substr(0, l)] = GSERVER_TIME;
                            } else {
                                GSERVER_TIME = new Date(SERVER_TIME.getFullYear(), SERVER_TIME.getMonth(), SERVER_TIME.getDate());
                            }
                            if (e) {
                                if (~e.indexOf("domes")) {
                                    var o = j.DMT.fromDate.inputEl.value;
                                    if (new Date(o.replace(/-/g, "/")).getTime() < GSERVER_TIME.getTime()) {
                                        j.DMT.fromDate.setValue(n.localDate);
                                    }
                                    j.DMT.fromDate.setInfo(QunarDate.getDateTip(j.DMT.fromDate.inputEl.value), "", "");
                                } else {
                                    if (~e.indexOf("inter")) {
                                        var o = j.INT.fromDate.inputEl.value;
                                        if (new Date(o.replace(/-/g, "/")).getTime() < GSERVER_TIME.getTime()) {
                                            j.INT.fromDate.setValue(n.localDate);
                                        }
                                        j.INT.fromDate.setInfo(QunarDate.getDateTip(j.INT.fromDate.inputEl.value), "", "");
                                    } else {
                                        var m = QunarDate.getDateTip(j.MULT.fromDate.inputEl.value);
                                        m && j.MULT.fromDate.setInfo(m, "", "");
                                    }
                                }
                            }
                        }, {
                            timeout: {
                                time: 500,
                                func: function() {}
                            }
                        });
                    }
                }
            }
        },
        _bindEvents: function() {
            this._bindFocusEvent();
            this._bindSelectSuggest();
            this._bindnoResult();
            this._bindHaveResult();
            this._bindErrorInfo();
        },
        _bindErrorInfo: function() {
            var l = this;
            var h = function(i) {
                l._updateTime(l.inputType, l.inputElem.value);
                var r = ["ErrorSuggestInfo", encodeURIComponent(l.inputElem.value), l.inputType, l._type];
                i && a(r.join("|"));
            };
            $jex.each(this.ControlFlt, function(t, i) {
                if (t) {
                    var r = t.fromCity.popups.popups.suggest;
                    var s = t.toCity.popups.popups.suggest;
                    $jex.event.bind(r, "errorInfo", h);
                    $jex.event.bind(s, "errorInfo", h);
                }
            });
            if (this.MULT) {
                var n = this.MULT;
                var j = this.MULT.conf.form.fromCityMulti;
                var o = this.MULT.conf.form.toCityMulti;
                for (var k = 0, p = this.MULT.trips.length; k < p; k++) {
                    var q = this.MULT.trips[k].multiSearbox.fromCity;
                    var m = this.MULT.trips[k].multiSearbox.toCity;
                    d.event.bind(q.popups.popups.suggest, "errorInfo", h);
                    d.event.bind(m.popups.popups.suggest, "errorInfo", h);
                }
            }
        },
        _bindHaveResult: function() {
            var k = this;
            var l = function(t, i) {
                i--;
                var s = ["getResultData", encodeURIComponent(k.inputElem.value), i, k.inputType, k._type];
                k.noflag = false;
                if (k.inputElem.value !== g && !k.onlyOne) {
                    a("addItem_flag|" + k.inputType + "|" + k._type);
                    k.onlyOne = true;
                }
                setTimeout(function() {
                    a(s.join("|"));
                }, 10);
            };
            var n = function(i) {
                b = i;
                k.notfind = true;
            };
            $jex.each(this.ControlFlt, function(u, i) {
                if (u) {
                    var s = u.fromCity.popups.popups.suggest;
                    var t = u.toCity.popups.popups.suggest;
                    $jex.event.bind(s, "getResultData", l);
                    $jex.event.bind(t, "getResultData", l);
                    $jex.event.bind(s, "haveData", n);
                    $jex.event.bind(t, "haveData", n);
                }
            });
            if (this.MULT) {
                var o = this.MULT;
                var h = this.MULT.conf.form.fromCityMulti;
                var p = this.MULT.conf.form.toCityMulti;
                for (var j = 0, q = this.MULT.trips.length; j < q; j++) {
                    var r = this.MULT.trips[j].multiSearbox.fromCity;
                    var m = this.MULT.trips[j].multiSearbox.toCity;
                    d.event.bind(r.popups.popups.suggest, "getResultData", l);
                    d.event.bind(m.popups.popups.suggest, "getResultData", l);
                    d.event.bind(r.popups.popups.suggest, "haveData", n);
                    d.event.bind(m.popups.popups.suggest, "haveData", n);
                }
            }
        },
        _bindnoResult: function() {
            var m = this;
            var k = function(i, t) {
                if (!m.noflag && !m.notfind) {
                    var s = "suggest-nofind-noData|" + encodeURIComponent(m.inputElem.value) + "|" + m.inputType + "|" + m._type;
                    a(s);
                    m.noflag = true;
                    m.notfind = false;
                }
                if (!m.noflag && m.notfind) {
                    var s = "suggest-nofind|" + encodeURIComponent(m.inputElem.value) + "|" + b + "|" + m.inputType + "|" + m._type;
                    a(s);
                    m.noflag = true;
                }
            };
            var j = function(i, t) {
                var s = "noDatalook";
                a(s);
            };
            $jex.each(this.ControlFlt, function(u, i) {
                if (u) {
                    var s = u.fromCity.popups.popups.suggest;
                    var t = u.toCity.popups.popups.suggest;
                    $jex.event.bind(s, "suggest-nofind", k);
                    $jex.event.bind(t, "suggest-nofind", k);
                    $jex.event.bind(s, "noDatalook", j);
                    $jex.event.bind(t, "noDatalook", j);
                }
            });
            if (this.MULT) {
                var o = this.MULT;
                var h = this.MULT.conf.form.fromCityMulti;
                var p = this.MULT.conf.form.toCityMulti;
                for (var l = 0, q = this.MULT.trips.length; l < q; l++) {
                    var r = this.MULT.trips[l].multiSearbox.fromCity;
                    var n = this.MULT.trips[l].multiSearbox.toCity;
                    d.event.bind(r.popups.popups.suggest, "suggest-nofind", k);
                    d.event.bind(n.popups.popups.suggest, "suggest-nofind", k);
                    d.event.bind(r.popups.popups.suggest, "noDatalook", j);
                    d.event.bind(n.popups.popups.suggest, "noDatalook", j);
                }
            }
        },
        _bindSelectSuggest: function() {
            var l = this;
            var j = function(s, u, i, r) {
                if (!l.sflag) {
                    if (u === "所有地点") {
                        i = "00";
                    }
                    if (!r) {
                        r = "city";
                    }
                    l._updateTime(l.inputType, u);
                    var t = "suggest-selected|" + r + "|" + encodeURIComponent(u) + "|" + i + "|" + l.inputType + "|" + l._type;
                    a(t);
                    l.sflag = true;
                }
            };
            $jex.each(this.ControlFlt, function(t, i) {
                if (t) {
                    var r = t.fromCity.popups.popups.suggest;
                    var s = t.toCity.popups.popups.suggest;
                    $jex.event.bind(r, "suggest-selected", j);
                    $jex.event.bind(s, "suggest-selected", j);
                }
            });
            if (this.MULT) {
                var n = this.MULT;
                var h = this.MULT.conf.form.fromCityMulti;
                var o = this.MULT.conf.form.toCityMulti;
                for (var k = 0, p = this.MULT.trips.length; k < p; k++) {
                    var q = this.MULT.trips[k].multiSearbox.fromCity;
                    var m = this.MULT.trips[k].multiSearbox.toCity;
                    d.event.bind(q.popups.popups.suggest, "suggest-selected", j);
                    d.event.bind(m.popups.popups.suggest, "suggest-selected", j);
                }
            }
        },
        _bindFocusEvent: function() {
            var l = this;
            var k = function() {
                l.sflag = false;
                if (this.value !== g && this.value === "" && !l.deleteONE) {
                    l.noflag = false;
                    a("deleteItem_flag|" + this.name + "|" + e);
                    l.deleteONE = true;
                }
                if (this.value !== g && !l.onlyOne && !l.deleteONE) {
                    a("addItem_flag|" + this.name + "|" + e);
                    l.onlyOne = true;
                }
            };
            var m = function(u, t, s) {
                var i = t;
                return function() {
                    return u.call(s, i);
                };
            };
            var r = function(i) {
                l.onlyOne = false;
                l.deleteONE = false;
                l.noflag = false;
                l.outflag = false;
                l.inputType = this.name;
                l._type = i;
                l.inputElem = this;
                l.notfind = false;
                e = i;
                g = this.value;
                d.event.bind(this, "keyup", k);
            };
            var n = function(i) {
                l._updateTime(this.name, this.value);
                if (!l.outflag && l.noflag && !l.sflag) {
                    var s = "suggest-nofind|" + encodeURIComponent(this.value) + "|" + b + "|" + this.name + "|" + i;
                    a(s);
                    l.outflag = true;
                }
            };
            $jex.each(this.ControlFlt, function(u, i) {
                if (u) {
                    var s = u.fromCity.inputEl;
                    var t = u.toCity.inputEl;
                    $jex.event.bind(s, "focusin", m(r, u.type, s));
                    $jex.event.bind(t, "focusin", m(r, u.type, t));
                    $jex.event.bind(s, "focusout", m(n, u.type, s));
                    $jex.event.bind(t, "focusout", m(n, u.type, t));
                }
            });
            if (this.MULT) {
                var o = this.MULT;
                var h = this.MULT.conf.form.fromCityMulti;
                var p = this.MULT.conf.form.toCityMulti;
                for (var j = 0, q = h.length; j < q; j++) {
                    d.event.bind(h[j], "focusin", m(r, this.MULT.type, h[j]));
                    d.event.bind(h[j], "focusout", m(n, this.MULT.type, h[j]));
                }
                for (var j = 0, q = p.length; j < q; j++) {
                    d.event.bind(p[j], "focusin", m(r, this.MULT.type, p[j]));
                    d.event.bind(p[j], "focusout", m(n, this.MULT.type, p[j]));
                }
            }
        },
        triggerHomeClickBtn: function(h) {
            var j = this;
            var l = h.type;
            var n = h.searchType;
            var p = encodeURIComponent(h.fromCity.collateValue);
            var m = encodeURIComponent(h.toCity.collateValue);
            var i = h.toDate.collateValue;
            var o = h.fromDate.collateValue;
            if (n === "oneway" || n === "multitrip") {
                i = null;
            }
            if (i) {
                var k = ["search_BtnFlag", l, n, p, m, o, i];
            } else {
                var k = ["search_BtnFlag", l, n, p, m, o];
            }
            a(k.join("|"));
        }
    };
    return new c();
})($jex);

function TransferFlightUI(a) {
    TransferFlightUI.superclass.constructor.call(this, a);
    this._type = "TransferFlightUI";
}
$jex.extendClass(TransferFlightUI, FlightUI);
TransferFlightUI.prototype.vlistui = function() {
    if (!this._vlistui) {
        this._vlistui = new TransferFlightVendorListUI();
        this._vlistui.owner(this);
    }
    return this._vlistui;
};
TransferFlightUI.prototype.toggleVendorPanel = function() {
    if (this.state() == 0) {
        System.service.genTraceTimeStamp();
        System.analyzer.triggerTrace = true;
        this.showVendorPanel();
    } else {
        this.hideVendorPanel();
    }
};
TransferFlightUI.prototype.showVendorPanel = function() {
    this.moveToFirst();
    var a = this.vlistui();
    a.dataSource(this.dataSource());
    a.updateSource();
    a.render(this.find("vendorlist"));
    $jex.element.show(this.find("vendorlist"));
    $jex.addClassName(this.find("itemBar"), "avt_column_on");
    $jex.event.trigger($jex.$("hdivResultPanel"), "fem_openWrapperList");
    this.state(1);
    $jex.event.trigger(this, "open");
};
TransferFlightUI.prototype.hideVendorPanel = function() {
    $jex.element.hide(this.find("vendorlist"));
    $jex.removeClassName(this.find("itemBar"), "avt_column_on");
    $jex.event.trigger($jex.$("hdivResultPanel"), "fem_closeWrapperList");
    this.state(0);
    $jex.event.trigger(this, "close");
};
TransferFlightUI.prototype.register = function() {
    var a = this;
    SingletonUIManager.register("flight", a, function() {
        a.showVendorPanel();
    }, function() {
        a.hideVendorPanel();
    });
};
TransferFlightUI.prototype._insertColums = function(c, a) {
    var d = a ? c.secondTrip() : c.firstTrip();
    this.text('<div class="c0">');
    this.text('    <div class="a_logo"><img width="16" height="16" title="', d.carrier().full, '" alt="', d.carrier().full, '" src="http://simg1.qunarzz.com/site/images/airlines/small/', d.carrier().key, '.gif"></div>');
    this.text("</div>");
    this.text('<div class="c1">');
    var b = FlightUtil.codePatch(d.code());
    this.text('    <div class="a_name">', d.carrier().zh, b.indexOf("/") > 0 ? "<br/>" : "", "<strong>", b, "</strong></div>");
    this.text('    <div class="a_model">', d.plane().full);
    this.text('<span class="lnk_sta">');
    if (d.stopover()) {
        this.text('<em title="该航班是经停航班" class="lnk_a">经停</em>');
    }
    var g = d.codeShare(),
        f = d.codeShareFlight();
    if (g && f) {
        this.text('<em title="实际乘坐航班：【', f.carrier().zh, "】【", g, '】" class="lnk_a">共享</em>');
    }
    this.text("</span>");
    this.text("</div>");
    this.text("</div>");
    this.text('<div class="c2">');
    if (a && d.deptDate() != c.firstTrip().arriDate()) {
        this.text('<div title="出发达时间为第2天&nbsp;', d.deptDate(), '" class="a_tm_dep">次日', d.deptTime(), "</div>");
    } else {
        this.text('<div class="a_tm_dep">', d.deptTime(), "</div>");
    }
    if (d.stopover() && d.stops() == 1 && d.spCity()) {
        this.text('<div class="a_tm_jt">&nbsp;</div>');
    }
    this.text('<div class="a_tm_arv">', d.arriTime());
    if (d.isNextDate()) {
        this.text('<i class="i_1day" title="到达时间为第2天：', d.arriDate(), "&nbsp;", d.arriTime(), '"></i>');
    }
    this.text("</div>");
    this.text("</div>");
    this.text('<div class="c3">');
    this.text('    <div class="a_lacal_dep">', d.deptAirport().ab, d.dptTower(), "</div>");
    if (d.stopover() && d.stops() == 1 && d.spCity()) {
        this.text('<div class="a_lacal_jt"><span', d.spInfo().setTitle, ">经停&nbsp;", d.spInfo().sTitle, "</span></div>");
    }
    this.text('    <div class="a_local_arv">', d.arriAirport().ab, d.arrTower(), "</div>");
    this.text("</div>");
    this.text('<div class="c4">');
    this.text(d.quasipointRateHTML());
    this.text("</div>");
    this.text('<div class="c5">&nbsp</div>');
};
TransferFlightUI.prototype.update = function(a) {
    var b;
    this.clear();
    this._homeNode = null;
    this.append("<div", "itemBar", ' class="avt_column avt_column_trans');
    if (this.state()) {
        this.text(" avt_column_on");
    }
    this.text('">');
    this.text('<div class="b_avt_lst">');
    this.text('<div class="avt_trans">');
    b = a.firstTrip();
    this.text('<div class="avt_column_1st">');
    this._insertColums(a);
    this.text("</div>");
    this.text('<div class="avt_column_sp"><p><span class="highlight">', b.arriCity().zh, "</span>(每段航班均需缴纳税费)</p></div>");
    b = a.secondTrip();
    this.text('<div class="avt_column_2nd">');
    this._insertColums(a, true);
    this.text("</div>");
    this.text("</div>");
    this.text('<div class="c6">');
    this.text('    <div class="a_low_prc">', Price_html.getHTML(a.lowestPrice()), '<i class="rmb">¥</i></div>');
    this.text('    <div class="a_low_dsc">', PriceUtil.getTransferDiscount(a.lowestDiscount()), "</div>");
    this.text("</div>");
    this.text('<div class="c7">&nbsp</div>');
    this.insertBookingBtn(b);
    this.text("</div>");
    this.updateVendors(a);
    this.text("</div>");
    if ($jex.ie !== 6) {
        return;
    }
    this.onInit(function() {
        $jex.hover({
            act: this.find("itemBar"),
            onmouseover: function(c) {
                $jex.addClassName(this, "avt_column_hover");
            },
            onmouseout: function(c) {
                $jex.removeClassName(this, "avt_column_hover");
            }
        });
    });
};
TransferFlightUI.prototype.openBtnClickEvent = function() {
    var a = this;
    $jex.event.trigger(a.ownerFlightUI(), "willOpenFui", a);
    LockScreen(function() {
        SingletonUIManager.register("flight", a, function() {
            a.toggleVendorPanel();
        }, function() {
            a.hideVendorPanel();
        });
    });
};
TransferFlightUI.prototype.insertBookingBtn = function(a) {
    this.text('<div class="c8"><div class="a_booking">');
    this.append("<a", "openwrapperbtn", '  data-evtDataId="' + this.newid("") + '"   href="##" hidefocus="on" onfocus="this.blur();" title="点击查看订票网站" class="btn_book"><span><b>订&nbsp;&nbsp;票</b></span></a>');
    this.text("</div></div>");
};
TransferFlightUI.prototype.updateVendors = function(b) {
    this.append("<div", "vendorlist", "");
    if (!this.state()) {
        this.text(' style="display:none;" ');
    }
    this.text(">");
    if (this.state()) {
        var a = this.vlistui();
        a.dataSource(b);
        a.updateSource();
        this.append("", a, "");
    }
    this.text("</div>");
};

function TransferFlightVendorListUI(a) {
    TransferFlightVendorListUI.superclass.constructor.call(this, a);
    this._type = "TransferFlightVendorListUI";
    var b = null;
    this.owner = function(c) {
        if (c == null) {
            return b;
        } else {
            b = c;
        }
    };
    UICacheManager.addToCache(this);
}
$jex.extendClass(TransferFlightVendorListUI, XControl);
TransferFlightVendorListUI.prototype._insertOneWrapper = function(d, f) {
    var g = d;
    var b = new FlightInfoExtBarUI();
    b.dataSource(d);
    b.updateSource();
    var c = new TransferFlightWrapperListUI();
    c.ownerVendor(this);
    c.dataSource(d);
    c.updateSource();
    this.append("<div", f.id, ' style="z-index:' + f.zIndex + ';position:relative;zoom:1">');
    var a = f.id + "_h";
    this.text('<div class="e-qvt-route">');
    this.text('<div class="m-route-ifo">');
    this.append("", b, "");
    this.text("</div>");
    this.append("<h3 ", a, "");
    this.text(">第", f.msg, "程&nbsp;<span>", g.deptCity().zh, "&nbsp;-&nbsp;", g.arriCity().zh, "</span></h3>");
    this.text("</div>");
    this.text('<div class="trans-single trans_' + f.id + '">');
    this.text('<div class="single-tit">第' + f.msg + "段</div>");
    this.text('<div class="single-ct e-qvt-ct">');
    this.append("", c, "");
    if (g.wrappers().size() > 4) {
        this.text('<div class="qvt_col_more qvt_col_more_hover">');
        this.append("<a", f.goid, '  data-evtDataId="' + this.newid("") + '"  hidefocus="true" href="#" class="lnk_more">第' + f.msg + '段所有报价<i class="ico_arr_more"></i></a>');
        this.text("</div>");
    }
    this.text("</div></div>");
    this.text("</div>");
    this.onInit(function() {
        var e = this;
        setTimeout(function() {
            try {
                var h = e.find(a);
                if (h.offsetHeight > 30) {
                    $jex.addClassName(h.parentNode, "e-qvt-route_oth");
                }
            } catch (i) {}
        }, 10);
    });
    b = c = d = f = null;
};
TransferFlightVendorListUI.prototype.update = function(a) {
    this.clear();
    this.text('<div class="b-qvt-lst">');
    this.text('<div class="e-qvt-warn">');
    this.text('    <p>购买须知：<span>两段需要分别购买</span>，每段航班需分别缴纳税费，请确认两航班均有效再付款。详情查看《<a target="_blank" href="http://www.qunar.com/site/zh/Multi-city.shtml?', new Date().getTime(), '">中转程机票购买须知</a>》</p>');
    this.text("</div>");
    var f = false,
        d = null;
    var c = {
        id: "transfer_p1",
        zIndex: 3,
        goid: "gotoFirstDetail",
        msg: "一"
    };
    d = a.firstTrip();
    if (d.type && d.type == "compose") {
        c.msg = "一，二";
        f = true;
    }
    this._insertOneWrapper(d, c);
    var b = d.hasShownInsTip;
    d = a.secondTrip();
    d.transShownInsTip = b;
    c.id = "transfer_p2";
    c.goid = "gotoSecondDetail";
    c.zIndex = 2;
    if (f == true) {
        if (d.type && d.type == "compose") {
            c.msg = "三，四";
        } else {
            c.msg = "三";
        }
    } else {
        if (d.type && d.type == "compose") {
            c.msg = "二，三";
        } else {
            c.msg = "二";
        }
    }
    this._insertOneWrapper(d, c);
    this.text('<div class="qvt_col_hide">');
    this.append("<a ", "btnHide", ' data-evtDataId="' + this.newid("") + '" class="lnk_more lnk_more_hd"  href="##">隐藏报价<i class="ico_down"></i></a>');
    this.text("</div>");
    this.text("</div>");
    this.append("<div", "extAd_panel", ' class="extAD"></div>');
    this.onInit(function() {
        var e = this;
        clearTimeout(e._ad_timer);
        e._ad_timer = setTimeout(function() {
            var g = e.newid("extAd");
            var h = e.find("extAd_panel");
            if (h) {
                h.innerHTML = '<iframe id="' + g + '" querystring="chan=flight&pg=list&pos=mid&site=qunar&size=728x90" scrolling="no" frameborder="0" height="0" width="100%" src="/site/adframe/ad.html#' + g + '#now"></iframe>';
            }
        }, 100);
    });
    d = c = a = null;
};

function TransferFlightWrapperListUI(a) {
    TransferFlightWrapperListUI.superclass.constructor.call(this, a);
    var b = null;
    this.ownerVendor = function(c) {
        if (c == null) {
            return b;
        } else {
            b = c;
        }
    };
}
$jex.extendClass(TransferFlightWrapperListUI, WrapperListUI);
TransferFlightWrapperListUI.prototype.createWrapperUI = function(d, c, b) {
    var e = c.vendor();
    var a = c.getCarrierCo();
    if (e.isDirect() || e.isOffical()) {
        return new FlagshipOnewayFlightWrapperUI();
    }
    if (c.isOta()) {
        return new OtaOnewayFlightWrapperUI();
    }
    if (c.isFreeMan()) {
        return new FreeManOnewayFlightWrapperUI();
    }
    if (c.vType() !== undefined && !c.hasPickCar()) {
        return new ZiyouxingOnewayFlightWrapperUI();
    }
    if (c.isYoufei()) {
        if (a == "ca") {
            return new OnewayFlightWrapperUI();
        }
        return new YouFeiOnewayFlightWrapperUI();
    }
    if (c.isTCabin() || c.tag() == "nc") {
        if (a == "ca") {
            return new OnewayFlightWrapperUI();
        }
        return new TcabinOnewayFlightWrapperUI();
    }
    return new OnewayFlightWrapperUI();
};

function SingleTripFlightWrapperUI(a) {
    SingleTripFlightWrapperUI.superclass.constructor.call(this, a);
    this._type = "SingleTripFlightWrapperUI";
}
$jex.extendClass(SingleTripFlightWrapperUI, OnewayFlightWrapperUI);

function ZiyouxingSingleTripFlightWrapperUI(a) {
    ZiyouxingSingleTripFlightWrapperUI.superclass.constructor.call(this, a);
    this._type = "ZiyouxingSingleTripFlightWrapperUI";
}
$jex.extendClass(ZiyouxingSingleTripFlightWrapperUI, ZiyouxingOnewayFlightWrapperUI);
var RoundTripFlightRecommend = (new function(a) {
    this.init = function() {
        if (!a) {
            return;
        }
        this.ele = a;
        this.url = this.getURL();
        this.loadData();
    };
    this.getURL = function() {
        var c = $jex.parseQueryParam();
        var b = "http://ws.qunar.com/rt_recommend?count=3&fromCity=" + encodeURIComponent(c.searchDepartureAirport) + "&toCity=" + encodeURIComponent(c.searchArrivalAirport) + "&depDate=" + encodeURIComponent(c.searchDepartureTime);
        return b;
    };
    this.loadData = function() {
        var b = new ScriptRequest({
            funcName: "RoundTripFlightRecommend.callBack",
            callbackName: "callback"
        });
        b.send(this.url);
    };
    this.callBack = function(b) {
        if (!b.ret) {
            return;
        }
        this.render(b.data);
        this.bind(b.data);
    };
    this.bind = function(f) {
        var c = f.list.length || 0;
        if (c === 0) {
            return;
        }
        document.getElementById("js_moreFlight").onclick = function() {
            var g = new Image();
            g.src = "http://bc.qunar.com/clk?s=182&a=moreflight&t=" + Math.random();
        };
        var e = document.getElementById("js_lproute").getElementsByTagName("a"),
            b = e.length;
        for (var d = 0; d < b; d++) {
            e[d].onclick = function() {
                var g = new Image();
                g.src = "http://bc.qunar.com/clk?s=182&a=rec_flight&t=" + Math.random();
            };
        }
    };
    this.render = function(f) {
        var g, m = f.moreUrl,
            d = f.list.length || 0;
        if (d === 0) {
            return;
        }
        var h = ['<div class="b_rec_wp">', '<div class="b_rec_tit">', '<span class="form">' + f.fromCity + '</span><i class="centerarrow"></i><span class="arrive">' + f.toCity + "</span>", '<span class="icon">往返<br />低价</span></div>', '<ul class="b_rec_cont" id="js_lproute">', '<li class="tab">', '<div class="clo1">往返时间</div><div class="clo2">原价</div><div class="clo3">特价</div>', "</li>"];
        for (g = 0; g < d; g++) {
            var b = f.list[g].url;
            b += (/&$/.test(b) ? "" : "&") + "from=flight_youce_wangfantuijian";
            var c = [];
            c.push("<li>");
            c.push('<a target="_blank" href=' + b + ">");
            c.push('<div class="clo1"><span class="fromdate">' + f.list[g].fromDate + "</span>");
            c.push('<i class="centerarrow"></i><span class="arrdate">' + f.list[g].toDate + "</span></div>");
            c.push('<div class="clo2">&yen;<del>' + f.list[g].oPrice + "</del></div>");
            c.push('<div class="clo3">&yen;<span>' + f.list[g].pPrice + "</span>");
            if (f.list[g].lowPrice) {
                c.push('<i class="lowst"></i>');
            }
            c.push("  </div>");
            c.push("</a>");
            c.push("</li>");
            h.push(c.join(""));
        }
        m += (/&$/.test(m) ? "" : "&") + "ex_from=flight_youce_wangfantuijian";
        h.push('</ul><div class="b_rec_ft"><a target="_blank" id="js_moreFlight" href=' + m + '>更多航班低价组合<i class="ftsong">&gt;&gt;</i></a></div></div>');
        this.ele.innerHTML = h.join("");
        var k = ["FL", "DRTFRShow"].join("|");
        try {
            newTrackAction(k);
        } catch (j) {}
    };
    this.init();
}(document.getElementById("js-mod-recommendRoundtrip")));
(function() {
    function findChildByClass(parent_dom, tag_name, class_name) {
        if (!parent_dom) {
            return;
        }
        var childrens = parent_dom.getElementsByTagName(tag_name);
        if (!class_name) {
            return childrens;
        }
        var childrens_length = childrens.length;
        var rightDom = [];
        for (var i = 0; i < childrens_length; i++) {
            var item = childrens[i];
            if ($jex.hasClassName(item, class_name)) {
                rightDom.push(item);
            }
        }
        return rightDom;
    }

    function removeClassInAll(domObjArr, clsName) {
        var domObjArr_length = domObjArr.length;
        for (var i = 0; i < domObjArr_length; i++) {
            var domObj = domObjArr[i];
            $jex.removeClassName(domObj, clsName);
        }
    }

    function fliterDomByAttr(doms, attr, val) {
        var doms_length = doms.length;
        for (var i = 0; i < doms_length; i++) {
            var item = doms[i];
            if (item.getAttribute(attr) == val) {
                return item;
            }
        }
    }

    function getStyleAttrVal(oDiv, attr) {
        if (oDiv.currentStyle) {
            var w = oDiv.currentStyle[attr];
        } else {
            var w = getComputedStyle(oDiv, false)[attr];
        }
        return w;
    }
    var Scroller = (function() {
        var parseDate = QunarDate.parse,
            isIE6 = ($jex.ie == 6);

        function slowMove(dom, attr, target_val, callbackFn) {
            var val = parseInt(getStyleAttrVal(dom, attr)) || 0;
            var dis = target_val - val;
            var minStep = 5;
            var bd = dis / 5;
            if (target_val > val) {
                var snip = function() {
                    val = val + bd;
                    dom.style[attr] = val + "px";
                    dis = target_val - val;
                    if (Math.abs(dis) < minStep) {
                        bd = target_val - val;
                    } else {
                        bd = (target_val - val) / 5;
                    }
                    if (target_val > val) {
                        setTimeout(snip, 20);
                    } else {
                        callbackFn && callbackFn();
                    }
                };
                snip();
            } else {
                var snip = function() {
                    val = val + bd;
                    dom.style[attr] = val + "px";
                    dis = target_val - val;
                    if (Math.abs(dis) < 5) {
                        bd = target_val - val;
                    } else {
                        bd = (target_val - val) / 5;
                    }
                    if (target_val < val) {
                        setTimeout(snip, 10);
                    } else {
                        callbackFn && callbackFn();
                    }
                };
                snip();
            }
        }

        function CScroll() {}
        CScroll.prototype.init = function(opt) {
            var me = this;
            this.isHorizontal = opt.isHorizontal;
            this.step = opt.step;
            this.wrap = opt.wrap;
            this.container = opt.container;
            this.compareMaxDate = opt.compareMaxDate;
            this.compareMinDate = opt.compareMinDate;
            this.next = findChildByClass(me.wrap, "a", "next-btn")[0];
            this.prev = findChildByClass(me.wrap, "a", "prev-btn")[0];
            this.cont = findChildByClass(this.container, "ul", "j-date-nuit")[0];
            this.readyScrollCont();
            this.fixNextStatus();
            this.fixPrevStatus();
        };
        CScroll.prototype.readyScrollCont = function(cont) {
            if (isIE6) {
                return;
            }
            if (!this.cloneNodePrev) {
                this.cloneNodePrev = this.cont.cloneNode(true);
                this.cloneNodeNext = this.cont.cloneNode(true);
                this.container.insertBefore(this.cloneNodePrev, this.cont);
                this.container.appendChild(this.cloneNodeNext);
                this.move(-1, false);
                return false;
            }
            this.cloneNodePrev.innerHTML = cont;
            this.cloneNodeNext.innerHTML = cont;
        };
        CScroll.prototype.getPrevBtn = function() {
            return this.prev;
        };
        CScroll.prototype.getNextBtn = function() {
            return this.next;
        };
        CScroll.prototype.move = function(flag, isSlow, callbackFn) {
            var me = this,
                container = me.container,
                step = me.step;
            if (me.isMoving) {
                return false;
            }
            me.isMoving = true;
            var marginName = this.isHorizontal ? "marginLeft" : "marginTop",
                oldMargin = parseInt(container.style[marginName] || 0, 10),
                dis = step * flag;
            var newMargin = oldMargin + dis;
            this.moveToTarget(newMargin, isSlow, callBackFn);

            function callBackFn() {
                me.isMoving = false;
                me.fixNextStatus();
                me.fixPrevStatus();
                me.moveToTarget("-" + step, false);
                callbackFn && callbackFn();
            }
        };
        CScroll.prototype.moveToTarget = function(target_val, isSlow, callBanckFn) {
            var me = this,
                container = me.container;
            var marginName = me.isHorizontal ? "marginLeft" : "marginTop";
            if (isIE6) {
                callBanckFn && callBanckFn();
                return false;
            }
            if (isSlow) {
                slowMove(container, marginName, target_val, function() {
                    callBanckFn && callBanckFn();
                });
            } else {
                container.style[marginName] = target_val + "px";
                callBanckFn && callBanckFn();
            }
        };
        CScroll.prototype.fixPrevStatus = function() {
            var me = this,
                prevBtn = me.prev;
            var d = this.compareMinDate();
            if (!d) {
                $jex.addClassName(prevBtn, "disable-btn");
            } else {
                $jex.removeClassName(prevBtn, "disable-btn");
            }
        };
        CScroll.prototype.fixNextStatus = function() {
            var me = this,
                nextBtn = me.next;
            var d = this.compareMaxDate();
            if (!d) {
                $jex.addClassName(nextBtn, "disable-btn");
            } else {
                $jex.removeClassName(nextBtn, "disable-btn");
            }
        };
        CScroll.prototype.resetData = function(dateArr) {
            this.dateArr = dateArr;
        };
        return CScroll;
    })();
    var SpringHotRoundtrip = (new function() {
        var service = DomesticOnewaySearchService;
        var analyzer = DomesticOnewayDataAnalyzer;
        var baseHtml = '<a class="prev-btn" href="javascript:;"><span class="btn-inner"><i class="g-ico g-ico-arrowl" id="arrowleft"></i></span></a>                        <div class="day-tab">                            <div  id="searchDateBar-nav" class="date-group">                                <ul class="ul_flt_date clrfix j-date-nuit"></ul>                            </div>                        </div>                        <a class="next-btn" href="javascript:;"><span class="btn-inner"><i class="g-ico g-ico-arrowr" id="arrowright"></i></span></a>                        <div class="prc_cld">                            <p id="priceCd" class="m_pc" style="visibility: visible;">价格日历</p>                            <div id="priceCalendar" class="prCd"></div>                        </div>';
        this.initialize = function(args) {
            this.args = args;
            this._DATACACHE = {};
            this.config = args.config;
            this.searchDateBar = $jex.$("searchDateBar");
            this.searchDate = args.searchDate;
            this.searchDateStr = QunarDate.format(this.searchDate);
            this.isToday = (this.searchDateStr == $jex.date.format(SERVER_TIME));
            this.minDate = QunarDate.parse($jex.date.format(SERVER_TIME));
            this.maxDate = QunarDate.plus(this.minDate, 363);
            this.minSearchDate = this.minDate;
            this.maxSearchDate = QunarDate.plus(this.maxDate, -6);
            this.offsetToday = Math.floor((this.searchDate - $jex.date.parse($jex.date.format(SERVER_TIME))) / 24 / 3600000);
            this.dc = args.dc;
            this.ac = args.ac;
            var _cityStr = this.dc + "-" + this.ac;
            var _queryStr = [this.searchDateStr, "|", _cityStr].join("");
            this._queryStr = _queryStr;
            this.isInter = args.isInter;
            this.startShowDate = this.config.startShowDate;
        };
        this.template_sevenday = function(context, __onerror) {
            if (context == null) {
                context = {};
            }
            if (context._MODIFIERS == null) {
                context._MODIFIERS = {};
            }
            if (context.defined == null) {
                context.defined = function(str) {
                    return (context[str] != undefined);
                };
            }
            var resultArr = [];
            var resultOut = {
                write: function(m) {
                    resultArr.push(m);
                }
            };
            try {
                (function(_OUT, _CONTEXT) {
                    with(_CONTEXT) {
                        var day363 = 363 * 24 * 60 * 60 * 1000;
                        var idx = 1;
                        var __LIST__day = days;
                        if ((__LIST__day) != null) {
                            var day_ct = 0;
                            for (var day_index in __LIST__day) {
                                day_ct++;
                                if (typeof(__LIST__day[day_index]) == "function") {
                                    continue;
                                }
                                var day = __LIST__day[day_index];
                                var deptDate = new Date(day.date.replace(/-/ig, "/"));
                                if (idx <= 7) {
                                    _OUT.write('<li date="');
                                    _OUT.write(day.date);
                                    _OUT.write('"');
                                    _OUT.write('><a href="javascript:;">');
                                    _OUT.write('<p class="date">');
                                    _OUT.write(_MODIFIERS.GetTitle(day.date));
                                    _OUT.write("</p>");
                                    if ((deptDate - (SERVER_TIME || new Date())) <= day363) {
                                        _OUT.write('<p class="price">');
                                        if (day.price > 0) {
                                            _OUT.write('<i class="rmb">&yen;</i>');
                                            _OUT.write(day.price);
                                        } else {
                                            _OUT.write("查看");
                                        }
                                        _OUT.write("</p>");
                                    }
                                    _OUT.write("</a></li>");
                                }
                                var idx = idx + 1;
                            }
                        }
                    }
                })(resultOut, context);
            } catch (e) {
                if (__onerror && typeof __onerror == "function") {
                    __onerror(e, resultArr.join(""));
                }
                throw e;
            }
            return resultArr.join("");
        };
        this.template_returnsuggestion = function(context, __onerror) {
            if (context == null) {
                context = {};
            }
            if (context._MODIFIERS == null) {
                context._MODIFIERS = {};
            }
            if (context.defined == null) {
                context.defined = function(str) {
                    return (context[str] != undefined);
                };
            }
            var resultArr = [];
            var resultOut = {
                write: function(m) {
                    resultArr.push(m);
                }
            };
            try {
                (function(_OUT, _CONTEXT) {
                    with(_CONTEXT) {
                        _OUT.write('    <div class="hd">返程推荐</div>    <div class="ct">        <ul>');
                        var __LIST__item = data;
                        if ((__LIST__item) != null) {
                            var item_ct = 0;
                            for (var item_index in __LIST__item) {
                                item_ct++;
                                if (typeof(__LIST__item[item_index]) == "function") {
                                    continue;
                                }
                                var item = __LIST__item[item_index];
                                _OUT.write('            <li><a href="');
                                _OUT.write(item.url);
                                _OUT.write('&from=springRoundtripRecommend" hidefocus="on">');
                                _OUT.write(item.fromTime.substr(5));
                                _OUT.write("<br />                ");
                                _OUT.write(item.from);
                                _OUT.write("-");
                                _OUT.write(item.to);
                                _OUT.write("<br />                &yen;");
                                _OUT.write(item.price);
                                _OUT.write(' <span class="ds">');
                                _OUT.write(PriceUtil.getDiscount(item.discount));
                                _OUT.write("</span></a></li>");
                            }
                        }
                        _OUT.write("        </ul>    </div>");
                    }
                })(resultOut, context);
            } catch (e) {
                if (__onerror && typeof __onerror == "function") {
                    __onerror(e, resultArr.join(""));
                }
                throw e;
            }
            return resultArr.join("");
        };
        this.template_pricecalendar = function(context, __onerror) {
            if (context == null) {
                context = {};
            }
            if (context._MODIFIERS == null) {
                context._MODIFIERS = {};
            }
            if (context.defined == null) {
                context.defined = function(str) {
                    return (context[str] != undefined);
                };
            }
            var resultArr = [];
            var resultOut = {
                write: function(m) {
                    resultArr.push(m);
                }
            };
            try {
                (function(_OUT, _CONTEXT) {
                    with(_CONTEXT) {
                        _OUT.write('<h3><span class="ymd">');
                        _OUT.write(date.getFullYear());
                        _OUT.write("年 ");
                        _OUT.write(date.getMonth() + 1);
                        _OUT.write('月</span></h3><span class="close" onclick="SpringHotRoundtrip.closePriceCalendar()"></span><div class="tab-box">');
                        _OUT.write('<span id="pcDown" class="prev" ');
                        if (prevMonth) {
                            _OUT.write("onclick=\"SpringHotRoundtrip.getPriceData('" + prevMonthDate + "')\"");
                        } else {
                            _OUT.write(' style="visibility:hidden;cursor:default;"');
                        }
                        _OUT.write('><i class="g-ico g-ico-arrowl"></i></span><span class="next" id="pcUp" ');
                        if (nextMonth) {
                            _OUT.write("onclick=\"SpringHotRoundtrip.getPriceData('" + nextMonthDate + "')\"");
                        } else {
                            _OUT.write(' style="visibility:hidden;cursor:default;"');
                        }
                        _OUT.write('><i class="g-ico g-ico-arrowr"></i></span>');
                        _OUT.write('<table cellspacing="0" cellpadding="0" border="0">     <tr>     <th>一</th>     <th>二</th>     <th>三</th>     <th>四</th>     <th>五</th>     <th class="sday">六</th>     <th class="sday">日</th>     </tr>');
                        var __LIST__row = [1, 2, 3, 4, 5, 6];
                        if ((__LIST__row) != null) {
                            var row_ct = 0;
                            for (var row_index in __LIST__row) {
                                row_ct++;
                                if (typeof(__LIST__row[row_index]) == "function") {
                                    continue;
                                }
                                var row = __LIST__row[row_index];
                                _OUT.write("<tr>");
                                var __LIST__col = [1, 2, 3, 4, 5, 6, 7];
                                if ((__LIST__col) != null) {
                                    var col_ct = 0;
                                    for (var col_index in __LIST__col) {
                                        col_ct++;
                                        if (typeof(__LIST__col[col_index]) == "function") {
                                            continue;
                                        }
                                        var col = __LIST__col[col_index];
                                        _OUT.write(" ");
                                        var dd = dateArr[(row - 1) * 7 + col];
                                        _OUT.write(" ");
                                        if (dd) {
                                            _OUT.write(" ");
                                            var pd = dd[1];
                                            _OUT.write("     <td");
                                            if ((col == 6 || col == 7) && dd[2] != false) {
                                                _OUT.write(' class="sday"');
                                            }
                                            _OUT.write(" ");
                                            if (dd[0] == currentDate) {
                                                _OUT.write(' id="pcurrentDate"');
                                            }
                                            _OUT.write(' date="');
                                            _OUT.write(dd[0]);
                                            _OUT.write('">');
                                            if (pd != false) {
                                                _OUT.write('     <a href="');
                                                _OUT.write(dd[2]);
                                                _OUT.write('&from=tejia_rili">');
                                                _OUT.write(dd[3]);
                                                _OUT.write('<span><i class="rmb">&yen;</i>');
                                                _OUT.write("<b>" + pd + "</b>");
                                                _OUT.write("</span></a>");
                                            } else {
                                                if (dd[2] != false) {
                                                    _OUT.write('     <a href="');
                                                    _OUT.write(dd[2]);
                                                    _OUT.write('&from=tejia_rili">');
                                                    _OUT.write(dd[3]);
                                                    _OUT.write("<span>查看</span></a>");
                                                } else {
                                                    _OUT.write("     ");
                                                    _OUT.write(dd[3]);
                                                    _OUT.write("<br/>--");
                                                }
                                            }
                                            _OUT.write(" ");
                                        } else {
                                            _OUT.write("     <td>     &nbsp;");
                                        }
                                        _OUT.write("     </td>");
                                    }
                                }
                                _OUT.write("         </tr>");
                            }
                        }
                        _OUT.write("</table></div>");
                    }
                })(resultOut, context);
            } catch (e) {
                if (__onerror && typeof __onerror == "function") {
                    __onerror(e, resultArr.join(""));
                }
                throw e;
            }
            return resultArr.join("");
        };
        this.template_roundtripvendor = function(context, __onerror) {
            if (context == null) {
                context = {};
            }
            if (context._MODIFIERS == null) {
                context._MODIFIERS = {};
            }
            if (context.defined == null) {
                context.defined = function(str) {
                    return (context[str] != undefined);
                };
            }
            var resultArr = [];
            var resultOut = {
                write: function(m) {
                    resultArr.push(m);
                }
            };
            try {
                (function(_OUT, _CONTEXT) {
                    with(_CONTEXT) {
                        _OUT.write('<div class="qn_fcbox">                <div class="t2"></div><div class="t1"></div><div class="t0"></div><div class="t0"></div>                <div class="ct_wrapper"><div class="ct">                    <table cellspacing="0" cellpadding="0" class="tblFcbox">                        <tr>                            <td width="126"><div class="t"><span>往返推荐</span></div></td>                            <td class="wf" width="480">');
                        var idx = 0;
                        _OUT.write(" ");
                        var __LIST__data = extData;
                        if ((__LIST__data) != null) {
                            var data_ct = 0;
                            for (var data_index in __LIST__data) {
                                data_ct++;
                                if (typeof(__LIST__data[data_index]) == "function") {
                                    continue;
                                }
                                var data = __LIST__data[data_index];
                                _OUT.write(" ");
                                if (idx < 2) {
                                    _OUT.write('                                        <a target="_blank" href="');
                                    _OUT.write(data.bu);
                                    _OUT.write('"><span class="vtl">去 ');
                                    _OUT.write(data.fromDate.replace(/\d\d\d\d-/, ""));
                                    _OUT.write('</span><span class="vtl">返 ');
                                    _OUT.write(data.toDate.replace(/\d\d\d\d-/, ""));
                                    _OUT.write('</span><span class="price">&yen;<em>');
                                    _OUT.write(data.packagePrice);
                                    _OUT.write("</em></span></a>");
                                    var idx = idx + 1;
                                    _OUT.write(" ");
                                }
                                _OUT.write(" ");
                            }
                        }
                        _OUT.write('                            </td>                        </tr>                </table>            </div></div>            <div class="b0"></div><div class="b0"></div><div class="b1"></div><div class="b2"></div>        </div>');
                    }
                })(resultOut, context);
            } catch (e) {
                if (__onerror && typeof __onerror == "function") {
                    __onerror(e, resultArr.join(""));
                }
                throw e;
            }
            return resultArr.join("");
        };
        var _goDateStr = null;
        this.goDateStr = function(val) {
            if (val) {
                _goDateStr = val;
            } else {
                return _goDateStr;
            }
        };
        this.load = function(argDateStr) {
            var self = this;
            if (!argDateStr) {
                _goDateStr = QunarDate.format(QunarDate.plus(this.searchDate, -3));
            } else {
                _goDateStr = argDateStr;
            }
            var goDate = QunarDate.parse(_goDateStr);
            var d_min_search_date = QunarDate.compareDate(goDate, self.minSearchDate);
            var d_max_search_date = QunarDate.compareDate(goDate, self.maxSearchDate);
            if (d_min_search_date < 0) {
                _goDateStr = QunarDate.format(self.minSearchDate);
            }
            if (d_max_search_date > 0) {
                _goDateStr = QunarDate.format(self.maxSearchDate);
            }
            self.goDateStr(_goDateStr);
            if (this.firstRenderSevenNav) {
                this.searchDateBar.innerHTML = baseHtml;
                this.priceCalendarDom = $jex.$("priceCalendar");
                this.priceCdDom = $jex.$("priceCd");
            }
            if (!service.isValidQuery()) {
                this.sevenday();
                return;
            }
            var _count = 10;
            var queryID = DomesticOnewaySearchService.longwell().queryID;
            var _URL = ["http://flight.qunar.com/twell/flight/getLp.jsp?", "from=", encodeURIComponent(this.dc), "&to=", encodeURIComponent(this.ac), "&goDate=", _goDateStr, "&backDate=", _goDateStr, "&count=", _count, "&packto=", this.searchDateStr, "&packreturn=", $jex.date.format(new Date(this.searchDate.getTime() + 2 * 24 * 3600000)), "&packcount=9", "&output=json&n=", Math.random(), "&queryID=", encodeURIComponent(queryID)].join("");
            var sr = new ScriptRequest({
                funcName: "SpringHotRoundtrip.parsedata",
                callbackName: "callback"
            });
            sr.send(_URL);
        };
        this.parsedata = function(data) {
            if (!data) {
                return;
            }
            this.cacheData = this.patch(data);
            this.sevenday();
            this.updateSevenDayToday();
            if (!this.firstRenderSevenNav) {
                this.springRoundRecommend_Load();
            }
        };
        this.updateSevenDayToday = function(price) {
            var self = this;
            price = analyzer.lowestPrice();
            if (!price || price == Number.MAX_VALUE) {
                return;
            }
            this.nowprice = price;
            if (self.firstRenderSevenNav) {
                return false;
            }
            var curLi = self.currentNav;
            if (curLi) {
                var p = curLi.getElementsByTagName("p");
                if (p[1]) {
                    p[1].innerHTML = '<i class="rmb">&yen;</i>' + price;
                    self.searchDateBar.style.display = "block";
                }
                self.currentNavData.price = price;
                self.fixLowestIconInNav();
            }
            var c = $jex.$("pcurrentDate");
            if (c) {
                c.getElementsByTagName("span")[0].innerHTML = '<i class="rmb">&yen;</i><b>' + price + "</b>";
                self.currentCdData && (self.currentCdData[1] = price);
                self.fixLowestIconInCalendar();
            }
            if (this.cacheData && this.cacheData.out && this.cacheData.out[this._queryStr]) {
                this.cacheData.out[this._queryStr].pr = this.nowprice;
            } else {
                this.cacheData = {
                    out: {}
                };
                this.cacheData.out[this._queryStr] = {
                    pr: this.nowprice,
                    dt: this.searchDateStr
                };
            }
        };
        this.firstRenderSevenNav = true;
        this.searchDateBar_nav = null;
        this.resultUnit = null;
        this.currentNav = null;
        this.sevenday = function() {
            var self = this;
            var hostDiv = self.searchDateBar;
            if (!hostDiv) {
                return;
            }
            var self = this;
            var getDatePrice = function(date) {
                var key = date + "|" + self.dc + "-" + self.ac;
                if (self.cacheData && self.cacheData.out && self.cacheData.out[key]) {
                    return parseInt(self.cacheData.out[key].price, 10);
                }
                return 0;
            };
            var _data = {};
            var _noPriceData = [];
            var _startDate = QunarDate.parse(self.goDateStr());
            var _dataArr = [];
            this.navDataArr = _dataArr;
            this.eachDay(function(day) {
                var _dstr = $jex.date.format(day);
                _data[_dstr] = {
                    date: _dstr,
                    price: getDatePrice(_dstr)
                };
                _dataArr.push(_data[_dstr]);
                if (getDatePrice(_dstr) == 0) {
                    _noPriceData.push(true);
                }
                return true;
            }, _startDate, 6);
            if (_noPriceData.length <= 7) {
                $jex.element.show(self.searchDateBar);
                $jex.addClassName(self.searchDateBar, "show_bar");
                $jex.element.show($jex.$("searchDateBar_bottom"));
            }
            var resultHtml = this.template_sevenday({
                days: _data,
                currentDate: this.searchDateStr,
                _MODIFIERS: {
                    GetTitle: function(date) {
                        return date.replace(/.*\d{4}-(.*)/, "$1") + " " + ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][$jex.date.parse(date).getDay()];
                    }
                }
            });
            if (self.firstRenderSevenNav) {
                self.searchDateBar_nav = $jex.$("searchDateBar-nav");
                self.resultUnit = self.searchDateBar.getElementsByTagName("ul")[0];
                if (!self.resultUnit) {
                    return;
                }
                self.resultUnit.innerHTML = resultHtml;
                self.initScroller(resultHtml);
                self.bindNavEvent();
                self.firstRenderSevenNav = false;
            } else {
                self.resultUnit.innerHTML = resultHtml;
                self.scroller.readyScrollCont(resultHtml);
            }
            var searchDateStr = self.searchDateStr;
            if (_data[searchDateStr]) {
                self.currentNavData = _data[searchDateStr];
                var curDom = fliterDomByAttr(self.resultUnit.getElementsByTagName("li"), "date", searchDateStr);
                self.currentNav = curDom;
                $jex.addClassName(curDom, "cur");
            } else {
                self.currentNav = null;
                self.currentNavData = null;
            }
            self.fixLowestIconInNav();
            if (self.resultUnit) {
                var lis = self.resultUnit.getElementsByTagName("li");
                $jex.array.each(lis, function(li, i) {
                    if (i >= 7) {
                        return;
                    }
                    $jex.event.bind(li, "click", function(e) {
                        var e = e || window.event;
                        e.preventDefault && e.preventDefault();
                        e.returnValue = false;
                        var deptDate = li.getAttribute("date");
                        var url = window.location.research(null, null, deptDate, deptDate);
                        if (/&sd_idx=/.test(url)) {
                            url = url.replace(/&sd_idx=\d/, "&sd_idx=" + i);
                        } else {
                            url += ("&sd_idx=" + i);
                        }
                        if (/&SearchLocation=/.test(url)) {
                            url = url.replace(/&SearchLocation=[a-z_-]+/i, "&SearchLocation=sevenday_search");
                        } else {
                            url += "&SearchLocation=sevenday_search";
                        }
                        if (/&from=/.test(url)) {
                            url = url.replace(/&from=[a-z_-]+/i, "&from=tejia_iow_qiri");
                        } else {
                            url += "&from=tejia_iow_qiri";
                        }
                        var exTrack = QLib && QLib.getEx_track && QLib.getEx_track();
                        if (exTrack) {
                            url += "&" + exTrack;
                        }
                        window.location = url;
                    });
                });
            }
        };
        this.fixLowestIconInNav = function() {
            var self = this;
            var dataArr = self.navDataArr;
            var lis = self.resultUnit.getElementsByTagName("li");
            dataArr.sort(compare);
            var lowestItemData = dataArr[0];
            if (lowestItemData.price) {
                var lowestItemDom = fliterDomByAttr(lis, "date", lowestItemData.date);
                removeClassInAll(lis, "lowest");
                $jex.addClassName(lowestItemDom, "lowest");
            }

            function compare(item1, item2) {
                var item1_price = parseInt(item1.price, 10),
                    item2_price = parseInt(item2.price, 10);
                if (!item1_price) {
                    return 1;
                }
                if (!item2_price) {
                    return -1;
                }
                var dis = item1_price - item2_price;
                if (dis != 0) {
                    return dis;
                } else {
                    addDisRange(item1);
                    addDisRange(item2);
                    var d_dis = item1.dis - item2.dis;
                    if (d_dis == 0) {
                        return item1.range - item2.range;
                    } else {
                        return d_dis;
                    }
                }
            }

            function addDisRange(item) {
                var item_date = QunarDate.parse(item.date),
                    searchDate = self.searchDate;
                var dis = QunarDate.compareDate(item_date, searchDate);
                var range;
                if (dis == 0) {
                    range = 0;
                } else {
                    if (dis > 1) {
                        range = 1;
                    } else {
                        range = 2;
                    }
                }
                item.dis = Math.abs(dis);
                item.range = range;
            }
        };
        this.initScroller = function() {
            var self = this;
            self.scroller = new Scroller();
            self.scroller.init({
                wrap: self.searchDateBar,
                container: self.searchDateBar_nav,
                isHorizontal: true,
                step: 609,
                compareMinDate: function() {
                    var startDate = QunarDate.parse(self.goDateStr());
                    return QunarDate.compareDate(startDate, self.minDate) <= 0 ? false : true;
                },
                compareMaxDate: function() {
                    var endDate = QunarDate.plus(QunarDate.parse(self.goDateStr()), 7);
                    return QunarDate.compareDate(endDate, self.maxDate) >= 0 ? false : true;
                }
            });
            var scroller = self.scroller;
            $jex.event.bind(self.scroller.getNextBtn(), "click", function() {
                if ($jex.hasClassName(this, "disable-btn")) {
                    return false;
                }
                switchPage(7);
                return false;
            });
            $jex.event.bind(self.scroller.getPrevBtn(), "click", function() {
                if ($jex.hasClassName(this, "disable-btn")) {
                    return false;
                }
                switchPage(-7);
                return false;
            });

            function switchPage(nDay) {
                self.load(QunarDate.format(QunarDate.plus(QunarDate.parse(self.goDateStr()), nDay)));
                scroller.move((nDay > 0 ? -1 : 1), true);
            }
        };
        this.bindNavEvent = function() {
            var self = this;
            this.cpbind = true;
            var priceCdDom = self.priceCdDom;
            priceCdDom.style.visibility = "visible";
            this._index = -1;
            $jex.event.bind(priceCdDom, "click", function(evt) {
                if (!self.cpshow) {
                    $jex.stopEvent(evt);
                    if (self.searchDate.getMonth() == SERVER_TIME.getMonth()) {
                        self.getPriceData(self.searchDateStr);
                    } else {
                        self.getPriceData([self.searchDate.getFullYear(), "-", self.searchDate.getMonth() + 1, "-01"].join(""));
                    }
                }
            });
            $jex.event.bind(document, "keydown", this._keydownFunc);
            $jex.event.bind(document, "click", function(ev) {
                var ev = ev || window.event;
                var el = ev.target || ev.srcElement;
                if ($jex.element.compareDocumentPosition(self.priceCalendarDom, el) & 16) {
                    return;
                } else {
                    self.closePriceCalendar();
                }
            });
        };
        this._returnData = {};
        this._packageData = {};
        this.roundtripVendor = function(outLp, returndata, packagedata) {
            outLp = analyzer.lowestPrice();
            var _searchD = this.searchDate;
            var _str_searchDay = $jex.date.format(_searchD);
            var self = this;
            $jex.hash.each(returndata, function(k, v) {
                var _relistData = v;
                var _packageKey = [_str_searchDay, _relistData.dt].join("|");
                if (packagedata[_packageKey]) {
                    if ((outLp + parseFloat(_relistData.price)) > packagedata[_packageKey].price) {
                        _relistData.lowestPrice = outLp + parseFloat(_relistData.price);
                        _relistData.packagePrice = packagedata[_packageKey].price;
                        _relistData.bu = self.createUrl(_relistData.dt, true) + "&from=tejia_recmd_pac", _relistData.fromDate = $jex.date.format(_searchD, "MM-dd");
                        _relistData.toDate = $jex.date.format($jex.date.parse(_relistData.fromTime), "MM-dd");
                        self._returnData[k] = _relistData;
                    }
                }
            });
            this._num = 0;
            $jex.hash.each(this._returnData, function(k, v) {
                if (self._num < 7) {
                    self._packageData[k] = v;
                }
                self._num++;
            });
            var _keys = [];
            for (var name in this._packageData) {
                _keys.push(name);
            }
            _keys.sort(function(a, b) {
                return self._packageData[a].packagePrice - self._packageData[b].packagePrice;
            });
            if (_keys.length < 1) {
                return;
            }
            var _templateContext = {
                keys: _keys,
                extData: this._packageData
            };
            var roundtripVendor = $jex.$("roundtripVendor");
            if (roundtripVendor) {
                roundtripVendor.innerHTML = this.template_roundtripvendor(_templateContext);
                this.onshow = true;
            }
        };
        this.springRoundRecommend_Load = function() {
            if (!$jex.define(this.cacheData)) {
                return;
            }
            var _record = 5;
            var _flightstr = this.ac + "-" + this.dc;
            var _data = {};
            var self = this;
            this.eachDay(function(day) {
                var _key = [$jex.date.format(day), _flightstr].join("|");
                if (self.cacheData.re && self.cacheData.re[_key]) {
                    _data[_key] = self.cacheData.re[_key];
                }
                var size = 0;
                $jex.hash.each(_data, function() {
                    size++;
                });
                return !(size >= _record);
            }, new Date(self.searchDate.getTime() + 1 * 24 * 3600000));
            var size = 0;
            $jex.hash.each(_data, function() {
                size++;
            });
            var dSpringPanel = $jex.$("dSpringPanel");
            dSpringPanel.innerHTML = this.template_returnsuggestion({
                data: _data,
                inSpringtrip: false
            });
            if (size > 0) {
                $jex.element.show(dSpringPanel);
            } else {
                $jex.element.hide(dSpringPanel);
            }
        };
        this._keydownFunc = function(event) {
            if (!this.cpshow) {
                return;
            }
            var _ev = event || window.event;
            var _targetElement = Event.element(event);
            var _keyCode = _ev.keyCode;
            var _isK = (this.priceCalendarDom.style.display != "none");
            if (_keyCode == 37 || _keyCode == 65) {
                if ($("pcUp").style.visibility != "hidden" && _isK) {
                    $("pcUp").onclick();
                }
            }
            if (_keyCode == 39 || _keyCode == 68) {
                if ($("pcDown").style.visibility != "hidden" && _isK) {
                    $("pcDown").onclick();
                }
            }
            var _keys = [81, 85, 78, 65, 82, 81, 85, 78, 65, 82, 13];
            if (_keyCode == _keys[this._index + 1]) {
                this._index++;
                if (this._index == _keys.length - 1) {
                    createEgg();
                    this._index = -1;
                }
            } else {
                this._index = -1;
            }
        };
        this.cpbind = false;
        this.cpshow = false;
        this.nextPc = function(_dateStr) {
            this.getPriceData(_dateStr);
            return;
        };
        this.prvePc = function(_dateStr) {
            this.getPriceData(_dateStr);
            return;
        };
        this.priceCacheData = {};
        this.currentCdData = null;
        this.getPriceData = function(_dateStr) {
            var _qtime;
            if (_dateStr && _dateStr.split("-")[2].length == 2) {
                _qtime = _dateStr.replace(/\d{2}$/, "01");
            }
            this._dateStr = _dateStr;
            var queryID = DomesticOnewaySearchService.longwell().queryID;
            var _URL = ["http://flight.qunar.com/twell/flight/getLp.jsp?", "from=", encodeURIComponent(this.dc), "&to=", encodeURIComponent(this.ac), "&goDate=", _qtime, "&backDate=", _qtime, "&count=", 35, "&packto=", $jex.date.format(this.searchDate), "&packreturn=", $jex.date.format(new Date(this.searchDate.getTime() + 2 * 24 * 3600000)), "&packcount=7", "&output=json&n=", Math.random(), "&queryID=", encodeURIComponent(queryID)].join("");
            var sr = new ScriptRequest({
                funcName: "SpringHotRoundtrip.parsePriceData",
                callbackName: "callback"
            });
            sr.send(_URL);
        };
        this.parsePriceData = function(_data) {
            this.priceCacheData = this.patch(_data);
            this.priceCalendar();
        };
        this.priceCalendar = function() {
            if (!this.priceCacheData) {
                return;
            }
            var self = this,
                _theDate, _dateArr = [],
                _date = $jex.date.parse(this._dateStr);
            if (!this._sdate) {
                this._sdate = _date;
            }
            var _maxDate = new Date(363 * 24 * 3600 * 1000 + SERVER_TIME.getTime());
            var _cdata = {};
            var _year = _date.getFullYear();
            var _month = _date.getMonth() + 1;
            var _day = _date.getDate();
            var _firstDay = new Date(_year, _month - 1, 1).getDay();
            if (_firstDay == 0) {
                _firstDay = 7;
            }
            var _allDays = new Date(_year, _month, 0).getDate();
            for (var i = 0; i < _firstDay; i++) {
                _dateArr.push(false);
            }
            var _cityStr = this.dc + "-" + this.ac;
            var _nowDate = new Date();
            while (_dateArr.length < 6 * 7) {
                if (_dateArr.length >= _firstDay + _allDays) {
                    _dateArr.push(false);
                } else {
                    var _theDate = new Date(_year, _month - 1, _dateArr.length + 1 - _firstDay);
                    var _sm = _theDate.getMonth() + 1;
                    if (_sm < 10) {
                        _sm = "0" + _sm;
                    }
                    var _sd = _theDate.getDate();
                    if (_sd < 10) {
                        _sd = "0" + _sd;
                    }
                    var _timeStr = [_theDate.getFullYear(), "-", _sm, "-", _sd].join("");
                    var _queryStr = [_timeStr, "|", _cityStr].join("");
                    var _priceData = this.priceCacheData.out[_queryStr];
                    if ((SERVER_TIME < _theDate || $jex.date.format(SERVER_TIME) == $jex.date.format(_theDate)) && _theDate < _maxDate) {
                        var _toUrl = ["/twell/flight/Search.jsp?fromCity=", encodeURIComponent(this.dc), "&toCity=", encodeURIComponent(this.ac), "&fromDate=", _timeStr, "&toDate=", $jex.date.format(new Date($jex.date.parse(_timeStr).getTime() + 3 * 24 * 3600000)), "&searchType=OnewayFlight"].join("");
                        _toUrl = this.addEx_track(_toUrl);
                    } else {
                        var _toUrl = false;
                    }
                    var _dateItemData;
                    if (_priceData) {
                        _dateItemData = [_timeStr, _priceData.pr, _priceData.url, _theDate.getDate()];
                    } else {
                        _dateItemData = [_timeStr, false, _toUrl, _theDate.getDate()];
                    }
                    if (_timeStr == self.searchDateStr) {
                        self.currentCdData = _dateItemData;
                    }
                    _dateArr.push(_dateItemData);
                }
            }
            var _nextMonth = _prevMonth = false;
            var _lastDayOfLastMonth = new Date(_year, _month - 1, 0);
            var _firstDayOfNextMonth = new Date(_year, _month, 1);
            if (_lastDayOfLastMonth >= SERVER_TIME) {
                _prevMonth = true;
            }
            if (_firstDayOfNextMonth <= _maxDate) {
                _nextMonth = true;
            }
            var _firstDayOfLastMonthStr = $jex.date.format(new Date(_year, _month - 2, 1));
            var _firstDayOfNextMonthStr = $jex.date.format(new Date(_year, _month, 1));
            var _templateContext = {
                nextMonth: _nextMonth,
                prevMonth: _prevMonth,
                dateArr: _dateArr,
                prevMonthDate: _firstDayOfLastMonthStr,
                nextMonthDate: _firstDayOfNextMonthStr,
                date: new Date(_year, _month - 1, 1),
                citystr: this.dc + "-" + this.ac,
                currentDate: this.searchDateStr
            };
            self.calendarDataArr = _dateArr.concat();
            var _html = this.template_pricecalendar(_templateContext);
            self.priceCalendarDom.innerHTML = _html;
            $jex.element.show(self.priceCalendarDom);
            $jex.addClassName(self.priceCdDom.parentNode, "prc_cld_on");
            self.fixLowestIconInCalendar();
            this.cpshow = true;
            return;
        };
        this.fixLowestIconInCalendar = function() {
            var self = this,
                searchDate = self.searchDate;
            self.calendarDataArr.sort(compare);
            var lowestItemData = self.calendarDataArr[0];
            if (lowestItemData && lowestItemData[1]) {
                var tds = self.priceCalendarDom.getElementsByTagName("td");
                var lowestItemDom = fliterDomByAttr(tds, "date", lowestItemData[0]);
                removeClassInAll(tds, "lowest");
                $jex.addClassName(lowestItemDom, "lowest");
            }

            function compare(item1, item2) {
                if (!item1) {
                    return 1;
                }
                if (!item2) {
                    return -1;
                }
                var item1_price = item1[1],
                    item2_price = item2[1];
                if (!item1_price) {
                    return 1;
                }
                if (!item2_price) {
                    return -1;
                }
                var dis = item1_price - item2_price;
                if (dis != 0) {
                    return dis;
                } else {
                    var item1_date = QunarDate.parse(item1[0]);
                    var item2_date = QunarDate.parse(item2[0]);
                    var dis1 = QunarDate.compareDate(item1_date, searchDate);
                    var dis2 = QunarDate.compareDate(item2_date, searchDate);
                    var dis1_abs = Math.abs(dis1);
                    var dis2_abs = Math.abs(dis2);
                    var d_dis = dis1_abs - dis2_abs;
                    if (d_dis != 0) {
                        return dis1_abs - dis2_abs;
                    } else {
                        return -(dis1 - dis2);
                    }
                }
            }

            function addDisRange(item) {
                var item_date = QunarDate.parse(item.date),
                    searchDate = self.searchDate;
                var dis = QunarDate.compareDate(item_date, searchDate);
                var range;
                if (dis == 0) {
                    range = 0;
                } else {
                    if (dis > 1) {
                        range = 1;
                    } else {
                        range = 2;
                    }
                }
                item.dis = Math.abs(dis);
                item.range = range;
            }
        };
        this.closePriceCalendar = function() {
            $jex.element.hide(this.priceCalendarDom);
            $jex.removeClassName(this.priceCdDom.parentNode, "prc_cld_on");
            this._index = -1;
            this.cpshow = false;
        };
        this.patch = function(data) {
            var self = this;
            var one_way = function(d, out) {
                $jex.hash.each(d, function(k, v) {
                    var c = k.replace(/[^\|]*\|/, "").split("-");
                    $jex.merge(v, {
                        url: out ? self.createCanlederUrl(v.dt) : self.createUrl(v.dt, false),
                        price: v.pr,
                        discount: v.dis,
                        fromTime: v.dt,
                        from: c[0],
                        to: c[1]
                    });
                });
            };
            one_way(data.re, false);
            one_way(data.out, true);
            $jex.hash.each(data.packagelist.normal, function(k, v) {
                v.price = v.pr;
            });
            if (this.nowprice && data.out[this._queryStr]) {
                data.out[this._queryStr].pr = this.nowprice;
            } else {
                if (this.nowprice && !data.out[this._queryStr]) {
                    data.out[this._queryStr] = {
                        pr: this.nowprice,
                        dt: this.searchDateStr,
                        url: this.createCanlederUrl(this.searchDateStr)
                    };
                }
            }
            return data;
        };
        this.createUrl = function(toDate, roundtrip) {
            var param = window.location.param();
            if (roundtrip) {
                var _url = "/twell/flight/Search.jsp?fromCity=" + encodeURIComponent(param.searchDepartureAirport) + "&toCity=" + encodeURIComponent(param.searchArrivalAirport) + "&fromDate=" + encodeURIComponent(param.searchDepartureTime) + "&toDate=" + toDate + "&op=1";
            } else {
                var _url = "/twell/flight/Search.jsp?fromCity=" + encodeURIComponent(param.searchArrivalAirport) + "&toCity=" + encodeURIComponent(param.searchDepartureAirport) + "&fromDate=" + toDate + "&toDate=" + toDate + "&searchType=OnewayFlight";
            }
            return this.addEx_track(_url);
        };
        this.createCanlederUrl = function(toDate) {
            var param = window.location.param();
            var _url = "/twell/flight/Search.jsp?fromCity=" + encodeURIComponent(param.searchDepartureAirport) + "&toCity=" + encodeURIComponent(param.searchArrivalAirport) + "&fromDate=" + toDate + "&toDate=" + toDate + "&searchType=OnewayFlight";
            return this.addEx_track(_url);
        };
        this.addEx_track = function(url) {
            var ex_track = QLib && QLib.getEx_track && QLib.getEx_track();
            if (ex_track) {
                url += "&" + ex_track;
            }
            return url;
        };
        this.eachDay = function(func, startDate, endDate) {
            var t = startDate;
            if (!endDate) {
                endDate = new Date(startDate.getTime() + 50 * 24 * 3600000);
            } else {
                if (typeof endDate == "number") {
                    endDate = new Date(startDate.getTime() + endDate * 24 * 3600000);
                }
            }
            while (t <= endDate) {
                if (!func(t)) {
                    break;
                }
                t = new Date(t.getTime() + 24 * 60 * 60 * 1000);
            }
        };
    }());
    window.SpringHotRoundtrip = SpringHotRoundtrip;
})();
(function(d) {
    var b = "http://lp.flight.qunar.com/api/dom/recommend/nearby_route";
    var c = $jex.$("dflightRecommendPanel");
    $jex.removeClassName(c, "m-nearline-rec");
    $jex.removeClassName(c, "m-find-ticket");
    var a = (new function() {
        var e;
        this.load = function(h) {
            var f = h.from;
            e = (f == "near_flight" || f == "near_airport") ? 0 : 1;
            if (!e) {
                return;
            }
            var g = this,
                i = {
                    from: h.searchDepartureAirport,
                    to: h.searchArrivalAirport,
                    start_date: h.searchDepartureTime
                };
            $jex.jsonp(b, i, function(j) {
                if (!j || !j.records || j.records.length == 0) {
                    return;
                }
                var k = j.records[0];
                g.render && g.render(k);
            }, {
                timeout: {
                    time: 8000,
                    func: function() {}
                }
            });
        };
        this.render = function(o) {
            if ((!o.trainpr || o.trainpr == 999999999) && !o.pr) {
                return false;
            }
            var l = o.dc,
                m = o.ac,
                h = o.dt;
            var g = '<div class="m-nearline-rec-inner clrfix"><div class="c0"></div><div class="c1">邻近推荐</div><div class="c2">' + i() + "</div>" + k() + '<div class="c8"><a href="' + n() + '" class="link">查&nbsp;&nbsp;看</a></div></div>';

            function i() {
                var r = o.trainpr,
                    p = o.traindc,
                    q = o.trainac;
                if (!r || r == 999999999) {
                    return "";
                }
                return p + "-" + q + ' 火车票参考价：<span class="train-low-prc"><i class="rmb">&yen;</i>' + o.trainpr + "</span>";
            }

            function k() {
                if (!o.pr) {
                    return '<div class="c5"></div><div class="c6"></div><div class="c7"></div>';
                }
                return '<div class="c5">' + l + "-" + m + '</div><div class="c6"><div class="a-low-prc">' + Price_html.getHTML(o.pr) + '<i class="rmb">¥</i></div></div><div class="c7">起</div>';
            }

            function n() {
                return "/twell/flight/Search.jsp?fromCity=" + encodeURIComponent(l) + "&toCity=" + encodeURIComponent(m) + "&fromDate=" + h + "&searchType=OnewayFlight&from=near_flight";
            }
            $jex.addClassName(c, "m-nearline-rec");
            if ($jex.hasClassName(this.nearLineWrap, "m-find-ticket")) {
                $jex.addClassName(this.nearLineWrap, "m-nearline-find-ticket");
            }
            var j = c.innerHTML;
            var f = g + j;
            c.innerHTML = f;
            $jex.element.show(c);
        };
    }());
    d.NearLineRec = a;
})(window);
(function(b) {
    var a = $jex.$("dflightRecommendPanel");
    $jex.removeClassName(a, "m-nearline-rec");
    $jex.removeClassName(a, "m-find-ticket");
    var c = function() {
        var d = this;
        this.onsaleOneway = 0;
        this.onsaleEconomy = 0;
        this.totalOneway = 0;
        this.nearLineWrap = a;
        $jex.event.binding(System.analyzer, "findTicketRec", function() {
            var l = System.analyzer.getData();
            var j = System.analyzer.onewayInfoMgr();
            var i = System.analyzer.lowestOneway();
            d.onsaleOneway = 0, d.onsaleEconomy = 0, d.totalOneway = 0;
            for (var g in l) {
                var f = l[g];
                if (f.type == "oneway") {
                    d.totalOneway++;
                    var h = f.lowestPrice();
                    if (h && h != 100000) {
                        d.onsaleOneway++;
                        if (f.lowprInfo && f.lowprInfo.tc == "经济舱") {
                            d.onsaleEconomy++;
                        }
                    }
                }
            }
            var e = false;
            if (i && i.hasDiscount) {
                i.hasDiscount() ? e = false : e = true;
            }
            if (d.onsaleOneway == 0 && d.totalOneway) {
                d.render("此航线已无直达票哦");
            } else {
                if (d.onsaleEconomy == 0 && d.onsaleOneway) {
                    d.render("此航线已无经济舱直达票哦");
                } else {
                    if (e) {
                        d.render("此航线只有加价票哦");
                    }
                }
            }
        });
        this.render = function(j) {
            var f = "http://subscribe.qunar.com/qunar/flight/ticketfinder/order/filling";
            var i = [];
            i.push("dptCity=" + encodeURIComponent(System.param.searchDepartureAirport));
            i.push("arrCity=" + encodeURIComponent(System.param.searchArrivalAirport));
            i.push("dptCityCode=" + encodeURIComponent(System.param.fromCode));
            i.push("arrCityCode=" + encodeURIComponent(System.param.toCode));
            i.push("dptDate=" + encodeURIComponent(System.param.searchDepartureTime));
            i.push("arrDate=" + encodeURIComponent(System.param.searchArrivalTime));
            f = f + "?" + i.join("&");
            var g = [];
            g.push('<div class="split-line"></div>');
            g.push('<div class="m-find-ticket-inner clrfix">');
            g.push('<div class="ico"></div>');
            g.push('<div class="tl">没有合适的票？去哪儿帮你找！</div>');
            g.push('<div class="msg"><span>', j, "</span></div>");
            g.push('<div class="btn"><a id="findtickbtn" class="link" target="_blank">申请找票</a></div>');
            g.push("</div>");
            var h = this.nearLineWrap.innerHTML;
            var e = h + g.join("");
            this.nearLineWrap.innerHTML = e;
            $jex.element.show(this.nearLineWrap);
            $jex.addClassName(this.nearLineWrap, "m-find-ticket");
            if ($jex.hasClassName(this.nearLineWrap, "m-nearline-rec")) {
                $jex.addClassName(this.nearLineWrap, "m-nearline-find-ticket");
            }
            $jex.addClassName(this.nearLineWrap, "clrfix");
            $jex.event.bind($jex.$("findtickbtn"), "click", function() {
                LockScreen(function() {
                    logsys.trace({
                        rule: "findTicketBtn",
                        action: "click",
                        dptAirport: System.param.searchDepartureAirport,
                        arrAirport: System.param.searchArrivalAirport,
                        dptTime: System.param.searchDepartureTime
                    });
                    window.open(f);
                });
            });
            logsys.trace({
                rule: "findTicketBtn",
                action: "show",
                dptAirport: System.param.searchDepartureAirport,
                arrAirport: System.param.searchArrivalAirport,
                dptTime: System.param.searchDepartureTime
            });
        };
    };
    b.FindTicketRec = c;
})(window);
var BookingPriceCheck = (function() {
    var a = {};
    a.init = function() {
        PAGE_EVENT.bind("wrapper_loadData", function(e) {
            if (!e.interceptTime) {
                return;
            }
            for (var d in e.priceData) {}
            var c = d + "_" + (e.labelType || "all");
            PriceCheckService.initData(c, e.interceptTime);
        });

        function b(c) {
            var d = c.key() + "_" + c.getWrapperListType();
            PriceCheckService.pause(d);
        }
        PAGE_EVENT.bind("wrapper_list_close", function(c) {
            b(c);
            var d = c.codeShareFlight();
            d && b(d);
        });
        PAGE_EVENT.bind("wrapper_list_open", function(c) {
            var d = c.key() + "_" + c.getWrapperListType();
            PriceCheckService.start(d);
        });
        PAGE_EVENT.bind("wrapper_price_change", function(d, c) {
            HoldLastShowFlight.goHoldUrl(d, c);
        });
    };
    a.check = function(j, h) {
        var c = j.ownerFlight();
        if (c.type == "onewayInTransfer") {
            return;
        }
        var g = c.getWrapperListType(),
            k = j.dataSource().type;
        var l = c.key() + "_" + g,
            n = j.wrapperId() + "_" + k;
        var d = PriceCheckService.getPriceInfo(l, n);
        if (d) {
            h = h || 0;
            var b = h == 1 ? d.pr : d.bpr,
                m = h == 1 ? j.afeePrice() : j.bprPrice();
            if (b !== m) {
                var i = c._shareFlight || c;
                PAGE_EVENT.trigger("wrapper_price_change", i.flightKeyCode(), g);
                try {
                    TsinghuaOneWayTracker.bookingHoldTrack(j, h, b, m);
                } catch (f) {}
                return true;
            }
        }
    };
    return a;
})();
if (typeof window.Dujia_recommend === "undefined") {
    window.Dujia_recommend = {};
}
Dujia_recommend.init = function(b) {
    this.HOST = "http://combine.dujia.qunar.com/get_fp_info_to_flight_list";
    this.WRAPPERID = "dujiaRecommend";
    this.args = b || {};
    this._data = [];
    var a = this;
    setTimeout(function() {
        a.live();
    }, 3000);
};
Dujia_recommend.live = function() {
    var a = this._parseArg();
    this._sendRequest(a);
};
Dujia_recommend.update = function(d) {
    if (d.ret) {
        this._data = d.data;
        for (var b = 0; b < this._data.length; b++) {
            var c = this._data[b];
            a(c);
        }
        this._render();
    }

    function a(e) {
        var g = e.title;
        var f = g.split("#");
        if (f.length === 4) {
            e.cityInfo = f[0] || "";
            e.flightInfo = f[1] || "";
            e.timeInfo = f[2] || "";
            e.hotelInfo = f[3] || "";
        }
    }
};
Dujia_recommend._parseArg = function() {
    var a = this.HOST + "?";
    var c = this.args;
    for (var b in c) {
        a += b + "=" + encodeURIComponent(c[b]) + "&";
    }
    a = a.replace(/&$/, "");
    return a;
};
Dujia_recommend._sendRequest = function(b) {
    var a = new ScriptRequest({
        funcName: "Dujia_recommend.update",
        callbackName: "callback"
    });
    a.send(b);
};
Dujia_recommend._render = function() {
    if (this._data.length) {
        this._insertCSS();
        this._insertHTML();
    }
};
Dujia_recommend._insertCSS = function() {
    var a = '.dujia_recommend .dj_wrap { background-color: #f7fdfc; border-bottom: 1px solid #ebebeb; border-top: 1px solid #1facab; clear: both; margin-bottom: 8px; padding: 0 5px 5px;}.dujia_recommend .dj_wrap .hd { font-size: 14px; font-weight: 700; padding: 6px 5px 5px;}.dujia_recommend .dj_wrap .ct { background-color: #fff; overflow: hidden; width: 100%;}/* add 往返机票+酒店超值打包 **/.dj_sheng{ display:inline-block; zoom:1; position:relative; top:-10px;}.jijiu{ background:#fff; width:730px; margin:0 auto;}.jijiu li{  float:left; _display:inline; border-top:1px solid #dfedeb; width:320px; margin:-1px 25px 0 20px; padding:8px 0;}.jijiu li .jijiu_sub{ display:block; cursor:pointer;}.jijiu_tit{ color:#0069ca; font-size:14px; line-height:24px; width:320px; white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow: hidden;}.jijiu{ overflow:hidden;}.jijiu li a:hover.jijiu_sub .jijiu_tit{ color:#f60;}.jijiu_info { font:0/1 Arial;}.jijiu_info .pr_y{ display:inline-block; zoom:1; font:12px/24px "\5fae\8f6f\96c5\9ed1"; color:#ff6600; padding-right:8px;}.jijiu_info .pr_y .yen{ font:12px/24px Arial;font-style:normal;}.jijiu_info .pr_y .jg{ font: bold 14px/24px Arial;}.jijiu_info .pr_s{ display:inline-block; zoom:1; height:18px; margin:3px 0;font:12px/18px sans-serif; background:#f60; color:#fff; padding:0 5px; position:relative;}.jijiu_info .pr_s .yen{font-family:arial;font-style:normal;}.jijiu_info .pr_s .sj{display:inline-block; zoom:1; height:0; width:0; overflow:hidden; border-bottom:4px dashed transparent;border-top:4px dashed transparent; border-right:4px solid #f60; position:absolute; left:-4px; top:5px;}.jijiu_info .jj_date{ display:inline-block; zoom:1; color:#333; font:14px/24px sans-serif; padding-left:10px;}';
    $jex.createCssText(a);
};
Dujia_recommend._insertHTML = function() {
    var b = [];
    b = ['<div class="dj_wrap">', '<div class="hd">往返机票+酒店超值打包<img src="http://source.qunar.com/package/i/sheng.png" alt="省" width="24" height="22" class="dj_sheng"></div>', '<div class="ct">', '<ul class="jijiu">'];
    for (var e = 0; e < this._data.length; e++) {
        var c = this._data[e];
        var a = "[" + c.cityInfo + "]" + c.flightInfo + c.timeInfo + c.hotelInfo;
        b.push("<li>");
        b.push('<a href="', c.url, '" class="jijiu_sub" target="_blank" title="', a, '">');
        b.push('<div class="jijiu_tit" title=""><strong>[', c.cityInfo, "]</strong>", c.flightInfo, "+", c.timeInfo, c.hotelInfo, "</div>");
        b.push('<div class="jijiu_info">');
        b.push('<span class="pr_y"><i class="yen">&yen;</i><em class="jg">', c.price, "</em>起</span>");
        b.push('<span class="pr_s"><i class="sj"></i>省<i class="yen">&yen;</i><em class="jg">', c.save, "</em></span>");
        b.push('<span class="jj_date">', d(c.to_date), "出发</span>");
        b.push('<span class="jj_date">', d(c.back_date), "返回</span>");
        b.push("</div>");
        b.push("</a>");
        b.push("</li>");
    }
    b.push("</ul>");
    b.push("</div>");
    b.push("</div>");
    if (document.getElementById(this.WRAPPERID)) {
        document.getElementById(this.WRAPPERID).innerHTML = b.join("");
    }

    function d(f) {
        var g = f.split("-");
        if (g.length === 3) {
            return g[1] + "." + g[2];
        }
    }
};
var LOG_SPIDER = (function() {
    var a = {};
    var b = {
        ctrl: false,
        alt: false,
        Q: false
    };
    return {
        init: function() {
            if ($jex.ie == 6) {
                return;
            }
            this.createHtml();
            this.bindEvent();
        },
        createHtml: function() {
            var c = '<div id="logInfoWrapper" style="display: none;" class="m_log_info"><ul id="logInfoContent" class="log_content"></ul><span id="logClose" class="log_close">X</span></div>';
            document.body.appendChild(this.createDom(c));
        },
        createDom: function(d) {
            var c = document.createElement("div");
            c.innerHTML = d;
            return c.children[0];
        },
        bindEvent: function() {
            $jex.event.bind(document.body, "keydown", function(d) {
                if (d.keyCode === 17) {
                    b.ctrl = true;
                }
                if (d.keyCode === 18) {
                    b.alt = true;
                }
                if (d.keyCode === 81) {
                    b.Q = true;
                }
                if (b.ctrl && b.alt && b.Q) {
                    var c = document.getElementById("logInfoWrapper");
                    c.style.display = c.style.display == "none" ? "block" : "none";
                }
            });
            $jex.event.bind(document.body, "keyup", function(c) {
                if (c.keyCode === 17) {
                    b.ctrl = false;
                }
                if (c.keyCode === 18) {
                    b.alt = false;
                }
                if (c.keyCode === 81) {
                    b.Q = false;
                }
            });
            $jex.event.bind(document.getElementById("logClose"), "click", function(d) {
                var c = document.getElementById("logInfoWrapper");
                c.style.display = "none";
            });
        },
        addLog: function(c, f) {
            if ($jex.ie == 6) {
                return;
            }
            var d = "<li><b>" + c + ":</b>" + f + "</li>";
            var e = document.getElementById("logInfoContent");
            e.appendChild(this.createDom(d));
        }
    };
})();
var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion() {
    var a;
    var b;
    var c;
    try {
        b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
        a = b.GetVariable("$version");
    } catch (c) {}
    if (!a) {
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
            a = "WIN 6,0,21,0";
            b.AllowScriptAccess = "always";
            a = b.GetVariable("$version");
        } catch (c) {}
    }
    if (!a) {
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
            a = b.GetVariable("$version");
        } catch (c) {}
    }
    if (!a) {
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
            a = "WIN 3,0,18,0";
        } catch (c) {}
    }
    if (!a) {
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            a = "WIN 2,0,0,11";
        } catch (c) {
            a = -1;
        }
    }
    return a;
}

function GetSwfVer() {
    var g = -1;
    if (navigator.plugins != null && navigator.plugins.length > 0) {
        if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
            var f = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
            var a = navigator.plugins["Shockwave Flash" + f].description;
            var e = a.split(" ");
            var c = e[2].split(".");
            var h = c[0];
            var b = c[1];
            var d = e[3];
            if (d == "") {
                d = e[4];
            }
            if (d[0] == "d") {
                d = d.substring(1);
            } else {
                if (d[0] == "r") {
                    d = d.substring(1);
                    if (d.indexOf("d") > 0) {
                        d = d.substring(0, d.indexOf("d"));
                    }
                }
            }
            var g = h + "." + b + "." + d;
        }
    } else {
        if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) {
            g = 4;
        } else {
            if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) {
                g = 3;
            } else {
                if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) {
                    g = 2;
                } else {
                    if (isIE && isWin && !isOpera) {
                        g = ControlVersion();
                    }
                }
            }
        }
    }
    return g;
}

function DetectFlashVer(f, d, c) {
    versionStr = GetSwfVer();
    if (versionStr == -1) {
        return false;
    } else {
        if (versionStr != 0) {
            if (isIE && isWin && !isOpera) {
                tempArray = versionStr.split(" ");
                tempString = tempArray[1];
                versionArray = tempString.split(",");
            } else {
                versionArray = versionStr.split(".");
            }
            var e = versionArray[0];
            var a = versionArray[1];
            var b = versionArray[2];
            if (e > parseFloat(f)) {
                return true;
            } else {
                if (e == parseFloat(f)) {
                    if (a > parseFloat(d)) {
                        return true;
                    } else {
                        if (a == parseFloat(d)) {
                            if (b >= parseFloat(c)) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }
    }
}

function AC_AddExtension(b, a) {
    if (b.indexOf("?") != -1) {
        return b.replace(/\?/, a + "?");
    } else {
        return b + a;
    }
}

function AC_Generateobj(e, d, a) {
    var c = "";
    if (isIE && isWin && !isOpera) {
        c += "<object ";
        for (var b in e) {
            c += b + '="' + e[b] + '" ';
        }
        c += ">";
        for (var b in d) {
            c += '<param name="' + b + '" value="' + d[b] + '" /> ';
        }
        c += "</object>";
    } else {
        c += "<embed ";
        for (var b in a) {
            c += b + '="' + a[b] + '" ';
        }
        c += "> </embed>";
    }
    return c;
}

function AC_FL_RunContent() {
    var a = AC_GetArgs(arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash");
    return AC_Generateobj(a.objAttrs, a.params, a.embedAttrs);
}

function AC_SW_RunContent() {
    var a = AC_GetArgs(arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000", null);
    return AC_Generateobj(a.objAttrs, a.params, a.embedAttrs);
}
if (typeof qunarflashver == "undefined") {
    var qunarflashver = "20090107";
}

function AC_GetArgs(b, e, g, d, h) {
    var a = new Object();
    a.embedAttrs = new Object();
    a.params = new Object();
    a.objAttrs = new Object();
    for (var c = 0; c < b.length; c = c + 2) {
        var f = b[c].toLowerCase();
        switch (f) {
            case "classid":
                break;
            case "pluginspage":
                a.embedAttrs[b[c]] = b[c + 1];
                break;
            case "src":
            case "movie":
                b[c + 1] = AC_AddExtension(b[c + 1], e) + "?" + qunarflashver;
                a.embedAttrs.src = b[c + 1];
                a.params[g] = b[c + 1];
                break;
            case "onafterupdate":
            case "onbeforeupdate":
            case "onblur":
            case "oncellchange":
            case "onclick":
            case "ondblclick":
            case "ondrag":
            case "ondragend":
            case "ondragenter":
            case "ondragleave":
            case "ondragover":
            case "ondrop":
            case "onfinish":
            case "onfocus":
            case "onhelp":
            case "onmousedown":
            case "onmouseup":
            case "onmouseover":
            case "onmousemove":
            case "onmouseout":
            case "onkeypress":
            case "onkeydown":
            case "onkeyup":
            case "onload":
            case "onlosecapture":
            case "onpropertychange":
            case "onreadystatechange":
            case "onrowsdelete":
            case "onrowenter":
            case "onrowexit":
            case "onrowsinserted":
            case "onstart":
            case "onscroll":
            case "onbeforeeditfocus":
            case "onactivate":
            case "onbeforedeactivate":
            case "ondeactivate":
            case "type":
            case "codebase":
            case "id":
                a.objAttrs[b[c]] = b[c + 1];
                break;
            case "width":
            case "height":
            case "align":
            case "vspace":
            case "hspace":
            case "class":
            case "title":
            case "accesskey":
            case "name":
            case "tabindex":
                a.embedAttrs[b[c]] = a.objAttrs[b[c]] = b[c + 1];
                break;
            default:
                a.embedAttrs[b[c]] = a.params[b[c]] = b[c + 1];
        }
    }
    a.objAttrs.classid = d;
    if (h) {
        a.embedAttrs.type = h;
    }
    return a;
}

function thisMovie(a) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[a];
    } else {
        return document[a];
    }
}
var Trendflash = {
    _cache: {},
    _cacheLength: 0,
    _controls: null,
    init: function(c) {
        var a = DomesticOnewaySearchService;
        var e = DomesticOnewayDataAnalyzer;
        this.args = c = {
            hasOneWay: (e.lowestOneway() != null),
            isValidQuery: a.isValidQuery(),
            isInter: false,
            dc: window.location.param().searchDepartureAirport,
            ac: window.location.param().searchArrivalAirport,
            title_id: "trendTitle",
            flash_id: "hdivTrendFlash",
            flash_panel: "dTrendflashPanel",
            MandatoryInsurance: {}
        };
        if (!c.hasOneWay || !c.isValidQuery || c.isInter) {
            var f = $jex.$(c.flash_panel);
            f && $jex.element.hide(f);
            return;
        }
        var b = c.dc;
        var d = c.ac;
        $jex.$(c.title_id).innerHTML = [b, "-", d, "价格趋势"].join("");
        var g = AC_FL_RunContent("codebase", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0", "width", "730", "height", "240", "src", "main", "flashvars", "dn=45", "quality", "high", "pluginspage", "http://www.macromedia.com/go/getflashplayer", "align", "middle", "play", "true", "loop", "true", "scale", "showall", "wmode", "transparent", "devicefont", "false", "id", "main", "bgcolor", "#FFFFFF", "name", "main", "menu", "true", "allowFullScreen", "false", "allowScriptAccess", "sameDomain", "movie", "main", "salign", "");
        $jex.$(c.flash_id).innerHTML = g;
        setTimeout(function() {
            Trendflash.add(b, d, {
                displayDelBtn: false,
                isFirstLoad: true
            });
        }, 0);
        $jex.element.show($jex.$(c.flash_panel));
    },
    add: function(c, e, b) {
        var f = c + "-" + e;
        if ($jex.define(Trendflash._cache[f])) {
            return;
        }
        if (Trendflash._cacheLength >= 4) {
            return;
        }
        var a = "btnHd_" + f;
        var d = ["<li from='" + c + "' to='" + e + "' id=", a, " class=' ", ((b.classfix) ? b.classfix : ""), "'>", "<input id='chk_" + f + "' type='checkbox' checked /><label for='chk_" + f + "'>", c, "-", e, "</label>", ((typeof b.displayDelBtn == "undefined" || b.displayDelBtn != false) ? "<span use='delete'>X</span>" : ""), "</li>"].join("");
        $jex.$("hulTrend").innerHTML += d;
        Trendflash._cache[f] = {
            lineid: a
        };
        Trendflash._cacheLength += 1;
        if (!b.isFirstLoad) {
            window.addData = function() {
                return "http://ws.qunar.com/holidayService.jcp?lane=" + encodeURIComponent(c) + "-" + encodeURIComponent(e);
            };
            thisMovie("main").add();
        }
    }
};

function getData() {
    return "http://ws.qunar.com/holidayService.jcp?lane=" + encodeURIComponent(Trendflash.args.dc) + "-" + encodeURIComponent(Trendflash.args.ac);
}

function createUrl(g, f, e, a, c) {
    if (!$jex.define(g) || !$jex.define(f) || !$jex.define(e) || !$jex.define(a) || !$jex.define(c)) {
        return;
    }
    var b = "/site/oneway_list.htm?searchDepartureAirport=" + encodeURIComponent(g) + "&searchArrivalAirport=" + encodeURIComponent(f) + "&searchDepartureTime=" + e + "&arrivalTime=" + a + "&nextNDays=0&searchType=OneWayFlight&startSearch=true&from=sr_trendflash";
    var d = QLib && QLib.getEx_track && QLib.getEx_track();
    if (d) {
        b += "&" + d;
    }
    window.open(b);
}

function getMiprice(b, a) {
    var c = Trendflash.args.MandatoryInsurance;
    if (c[b]) {
        if (a <= c[b].deals) {
            return c[b].price;
        } else {
            return false;
        }
    }
}

function unLock(a) {}
window.Trendflash = Trendflash;
var dflightTool = new function() {
    this.initialize = function(args) {
        if (this.initialized) {
            return;
        }
        var analyzer = DomesticOnewayDataAnalyzer;
        var param = window.location.param();
        this.args = args = $jex.merge({
            fromCity: param.searchDepartureAirport,
            toCity: param.searchArrivalAirport,
            startDate: param.searchDepartureTime,
            DATA_RECOMMEND_AIRLINE: "http://ws.qunar.com/recommendAirline.jcp"
        }, args || {});
        this.fromCity = args.fromCity;
        this.toCity = args.toCity;
        this.startDate = args.startDate;
        this.DATA_RECOMMEND_AIRLINE = args.DATA_RECOMMEND_AIRLINE;
        this.initialized = true;
    };
    this.template_flighttool = function(context, __onerror) {
        if (context == null) {
            context = {};
        }
        if (context._MODIFIERS == null) {
            context._MODIFIERS = {};
        }
        if (context.defined == null) {
            context.defined = function(str) {
                return (context[str] != undefined);
            };
        }
        var resultArr = [];
        var resultOut = {
            write: function(m) {
                resultArr.push(m);
            }
        };
        try {
            (function(_OUT, _CONTEXT) {
                with(_CONTEXT) {
                    _OUT.write('    <div class="hd">相关航线</div>    <div class="ct">        <ul>');
                    var idx = 0;
                    _OUT.write(" ");
                    var __LIST__item = data;
                    if ((__LIST__item) != null) {
                        var item_ct = 0;
                        for (var item_index in __LIST__item) {
                            item_ct++;
                            if (typeof(__LIST__item[item_index]) == "function") {
                                continue;
                            }
                            var item = __LIST__item[item_index];
                            _OUT.write(" ");
                            if (idx < 5) {
                                _OUT.write('            <li><a href="');
                                _OUT.write(item.url);
                                _OUT.write('" hidefocus="on">');
                                _OUT.write(item.dt.substr(5));
                                _OUT.write("<br />                ");
                                _OUT.write(item.dc);
                                _OUT.write("-");
                                _OUT.write(item.ac);
                                _OUT.write("<br />                &yen;");
                                _OUT.write(item.pr);
                                _OUT.write(' <span class="ds">');
                                _OUT.write(PriceUtil.getDiscount(item.ds));
                                _OUT.write("</span></a></li>");
                            }
                            _OUT.write(" ");
                            var idx = idx + 1;
                            _OUT.write(" ");
                        }
                    }
                    _OUT.write("        </ul>    </div>");
                }
            })(resultOut, context);
        } catch (e) {
            if (__onerror && typeof __onerror == "function") {
                __onerror(e, resultArr.join(""));
            }
            throw e;
        }
        return resultArr.join("");
    };
    this.start = function(args) {
        this.initialize(args);
        var _fromCity = encodeURIComponent(this.fromCity);
        var _toCity = encodeURIComponent(this.toCity);
        var _startDate = this.startDate;
        var _params = "from=" + _fromCity + "&to=" + _toCity + "&start_date=" + _startDate + "&version=" + Math.random();
        var sr = new ScriptRequest({
            funcName: "dflightTool.update",
            callbackName: "callback"
        });
        sr.send(this.DATA_RECOMMEND_AIRLINE + "?" + _params);
    };
    this.makeurl = function(item) {
        var param = window.location.param();
        var _url = "/twell/flight/Search.jsp?fromCity=" + encodeURIComponent(item.dc) + "&toCity=" + encodeURIComponent(item.ac) + "&fromDate=" + item.dt + "&toDate=" + param.searchDepartureTime + "&searchType=OnewayFlight&from=near_airport";
        return this.addEx_track(_url);
    };
    this.addEx_track = function(url) {
        var ex_track = QLib && QLib.getEx_track && QLib.getEx_track();
        if (ex_track) {
            url += "&" + ex_track;
        }
        return url;
    };
    this.update = function(data) {
        var self = this;
        var _mydata = {};
        if (data.records.length > 0) {
            $jex.array.each(data.records, function(item, idx) {
                item.url = self.makeurl(item);
                _mydata["" + idx] = item;
            });
            $jex.$("dFlightPanel").innerHTML = this.template_flighttool({
                data: _mydata
            });
            $jex.element.show($jex.$("dFlightPanel"));
        }
    };
};
window.dflightTool = dflightTool;
ConfigManager.setConfig(oneway_config);
ConfigManager.setConfig({
    "default": {
        acf: 0,
        fot: 0,
        safePrice: Number.MAX_VALUE,
        carrier: {
            full: "",
            key: "",
            zh: ""
        },
        plane: {
            full: "未知机型",
            key: "NULL",
            type: []
        },
        airport: {
            ab: "",
            code: "",
            full: ""
        },
        city: {
            codeList: "",
            en: "",
            zh: ""
        }
    },
    config: {
        timerange: {
            "0": {
                zh: "上午 (06:00-11:59)",
                key: "上午",
                value: 0
            },
            "1": {
                zh: "中午 (12:00-12:59)",
                key: "中午",
                value: 1
            },
            "2": {
                zh: "下午 (13:00-17:59)",
                key: "下午",
                value: 2
            },
            "3": {
                zh: "晚上 (18:00-05:59)",
                key: "晚上",
                value: 3
            }
        },
        services: {
            s1: "CATA认证",
            s2: "7×24服务",
            s3: "去哪儿帮您填",
            s4: "支付价出票",
            s5: "退改签保障",
            s6: "赠送保险",
            s7: "服务保障",
            s8: "免费邮寄",
            s9: "保障计划"
        },
        servicesDesc: {
            s1: "获得《中国民用航空运输销售代理业务资格认可证书》",
            s2: "提供7×24小时服务",
            s3: "支持使用在去哪儿网填写的乘机人信息",
            s4: "承诺按照支付价格出票",
            s5: "严格执行航空公司退改签规定",
            s6: "承诺购买机票赠送保险",
            s7: "服务保障",
            s8: "购买机票可免费邮寄行程单",
            s9: "全程预订保障，去哪儿都放心"
        }
    }
});
var flightResultController = function(a, b, c) {
    this.service = a;
    this.analyzer = b;
    this.param = c;
    this.initUI();
    this.bindUI();
    System.analyzer.triggerTrace = false;
};
flightResultController.prototype.initUI = function() {
    var b = this;
    System.service.genTraceTimeStamp();

    function a() {
        System.service.genFilterTimeStamp();
        b.trackFilters(true);
        TsinghuaOneWayTracker.setTimerToSaveTrack();
    }
    this.willOpenFui;
    this.openingFui;
    this.resultList = new FlightListUI({
        elemId: "hdivResultPanel",
        on: {
            cabinChange: function(c) {
                this.isOnlySelBfCabinType(c);
            },
            oneItemclicked: function(c) {
                b.bookBtnTracker.send(c);
            },
            willOpenFui: function(c) {
                b.willOpenFui = c;
            },
            openingFui: function(c) {
                b.actionType = 3;
                b.openingFui = c;
            }
        }
    });
    this.filterGroup = new DomesticOnewayFilterListUI({
        elemId: "hdivfilterPanel",
        filterConf: {
            "起飞机场": {
                type: 8
            },
            "降落机场": {
                type: 8
            },
            "起飞时间": {
                sort: {
                    "上午": 0,
                    "中午": 1,
                    "下午": 2,
                    "晚上": 3
                }
            },
            "机型": {
                sort: {
                    "大型机": 0,
                    "中型机": 1,
                    "小型机": 2,
                    "麦道系列": 3,
                    "其他机型": 4,
                    "未知机型": 5
                },
                type: 8
            },
            "舱位": {
                sort: {
                    "经济舱": 0,
                    "头等/商务舱": 1
                },
                type: 8
            }
        },
        on: {
            changeFilter: function(e, c, d, g, h, f) {
                SingletonUIManager.close("flight");
                b.changeCabinType.apply(b, arguments);
                b.analyzer.setFilter(e);
                a();
            },
            onUserActied: function() {
                b.actionType = 3;
            },
            openMore: function() {
                b.trackFilters(true);
            }
        }
    });
    this.filterGroup.update();
    this.filterGroup.render();
    this.getCheckGrpArr = function(f) {
        var c = [];
        for (var e = 0; e < f.length; e++) {
            var g = [];
            for (var d = 0; d < f[e]._displayboxes.length; d++) {
                if (f[e]._displayboxes[d].checked()) {
                    g.push(f[e]._displayboxes[d].dataSource().name);
                }
            }
            if (g.length > 0) {
                c.push(g.join(","));
            }
        }
        return c;
    };
    this.trackFilters = function(f) {
        var e = "";
        var i = [];
        var h = [];
        var c = this.filterGroup;
        $jex.foreach(["起飞时间", "机型", "航空公司", "起飞机场", "降落机场", "舱位", "方式"], function(k, j) {
            var l = c.getFilterUI(k);
            if (l) {
                i.push(l);
            }
            h[j] = l ? 1 : 0;
        });
        var d = b.getCheckGrpArr(i);
        if (d.length > 0) {
            e = d.join("^");
        }
        if (b.service.curSort) {
            e += "^" + b.service.curSort;
        }
        var g = "&psize=15";
        if (b.pagesizer.selectedItem && b.pagesizer.selectedItem != null) {
            g = "&psize=" + b.pagesizer.selectedItem.value;
        }
        g += ("&ft=" + (!f ? System.service.traceTimeStamp : System.service.filterTimeStamp));
        g += ("&isfilter=" + h.join("^"));
        g += ("&ismore=" + c.isMoreOpen);
        TsinghuaOneWayTracker.track("filter", encodeURIComponent(e), System.service.traceTimeStamp || "", (System.analyzer.currentPageIndex() + 1), g);
    };
    this.pagesizer = pagesizer = new XSelect({
        elemId: "hdivPageSizer",
        initFire: false,
        values: [{
            value: 30,
            name: "30"
        }, {
            value: 60,
            name: "60"
        }],
        on: {
            changeValue: function(c) {
                b.analyzer.resetPageSize(c.value);
                $jex.event.trigger($jex.$("detailPage"), "fem_pageNum", "PageSize");
                a();
            }
        }
    });
    $jex.event.binding(this.service, "loadedFirstData", function() {
        pagesizer.update();
        pagesizer.render();
        $jex.element.show($jex.$("detailPage"));
        new FlightEventProxy("hdivResultPanel");
    });
    $jex.event.binding(this.service, "TransferDataReady", function() {
        b.filterGroup.setTransformLoad(true);
    });
    this.actionType = 1;
    this.pager = new OnewayPagerUI({
        elemId: "hdivPager",
        on: {
            changePage: function(d) {
                b.actionType = 3;
                b.analyzer.gotoPage(d);
                $jex.event.trigger($jex.$("detailPage"), "fem_pageNum", "JumpToPage");
                var f = $jex.offset($jex.$("resultAnchor"));
                if (!/msie 6/.test(window.navigator.userAgent.toLowerCase())) {
                    var e = 0,
                        c = $jex.$("js_schwrap"),
                        g;
                    if (window.getComputedStyle) {
                        g = window.getComputedStyle(c, null).getPropertyValue("position");
                    } else {
                        if (c.currentStyle) {
                            g = c.currentStyle.position;
                        }
                    }
                    if (g === "static") {
                        e = 10;
                    }
                    if (!($jex.$("top_recommend_id") && $jex.$("top_recommend_id").childNodes.length)) {
                        window.scrollTo(f.left, f.top - 55 - e - 31);
                    } else {
                        window.scrollTo(f.left, $jex.offset($jex.$("top_recommend_id")).top + 10 - e - 31);
                    }
                } else {
                    window.scrollTo(f.left, f.top - 31);
                }
                a();
            }
        }
    });
    this.sort_time_handler = new SortHandler({
        elemId: "btnDepttimeOrderArror",
        sortKey: "deptTimeValue",
        on: {
            clickSort: function(d) {
                var c;
                if (d[0][1]) {
                    c = "d";
                } else {
                    c = "a";
                }
                b.service.curSort = "起降时间" + c;
                FlightListUISorter.userSorted(true);
                b.analyzer.sort(d);
                $jex.$("btnDepttimeOrderArror").title = d[0][1] ? "点击按时间从早到晚排序" : "点击按时间从晚到早排序";
                $jex.$("btnPriceOrderArror").title = "";
                $jex.$("btnPriceOrderArror").getElementsByTagName("i")[0].className = "i_arr_ud";
                $jex.event.trigger($jex.$("btnDepttimeOrderArror"), "fem_orderByTime");
                a();
            },
            onUserActied: function() {
                b.actionType = 3;
            }
        }
    });
    this.sort_price_handler = new SortHandler({
        elemId: "btnPriceOrderArror",
        sortKey: "lowestPrice",
        on: {
            clickSort: function(d) {
                var c;
                if (d[0][1]) {
                    c = "d";
                } else {
                    c = "a";
                }
                b.service.curSort = "最低报价" + c;
                FlightListUISorter.userSorted(true);
                b.analyzer.sort(d);
                $jex.$("btnPriceOrderArror").title = d[0][1] ? "点击按价格从低到高排序" : "点击按价格从高到低排序";
                $jex.$("btnDepttimeOrderArror").title = "";
                $jex.$("btnDepttimeOrderArror").getElementsByTagName("i")[0].className = "i_arr_ud";
                $jex.event.trigger($jex.$("btnPriceOrderArror"), "fem_orderByPrice");
                a();
            },
            cabinChange: function(c) {
                $jex.$("btnPriceOrderArror").getElementsByTagName("i")[0].className = "i_arr_ud";
                $jex.$("btnDepttimeOrderArror").getElementsByTagName("i")[0].className = "i_arr_ud";
                FlightListUISorter.userSorted(true);
                this.setSortKey(c ? "bfLowestPrice" : "lowestPrice");
                var d = c ? [
                    ["bfLowestPrice", false]
                ] : [
                    ["lowestPrice", false]
                ];
                b.analyzer.sort(d);
            },
            onUserActied: function() {
                b.actionType = 3;
            }
        }
    });
    this.statusbar = new OneWaySearchStatusbar({
        elemId: "progTip",
        service: b.service,
        analyzer: b.analyzer
    });
    this.statusbar.render();
    this.changeCabinType = function(g, c, e, i, j, h) {
        var d = this,
            f;
        if (g.isNull) {
            f = false;
        } else {
            if (g.name == "舱位") {
                if ((e || []).length == 1 && e[0] == "bf") {
                    f = true;
                } else {
                    f = false;
                }
            }
        }
        if (f != null && d.resultList.isOnlySelBfCabinType() != f) {
            $jex.event.trigger(d.resultList, "cabinChange", f);
            $jex.event.trigger(d.sort_price_handler, "cabinChange", f);
        }
    };
    this.bookBtnTracker = new BookBtnTracker(this);
    this.timeoutMemorier = (function(h) {
        var l = window.StorageUtil,
            n = window.JSON,
            o = h;
        var c = "seleddOption";
        var f = [o.filterGroup],
            i = o.resultList;
        filterGroup = o.filterGroup, nameHX = {
            起 飞 时 间: "dt", � �型: "pt", � �� �公 司: "hs", 起 飞 � �� �: "da", 降 落 � �� �: "aa", 舱 位: "ca", 方 式: "df"
        };
        var d, e = "",
            j = false;

        function g() {
            var q = {};
            $jex.foreach(["起飞时间", "机型", "航空公司", "起飞机场", "降落机场", "舱位", "方式"], function(w, v) {
                var x = filterGroup.getFilterUI(w);
                q[nameHX[w]] = x ? ((x.getKey() || "")) : -1;
            });
            var s = (function() {
                var v = o.willOpenFui || o.openingFui;
                if (v) {
                    return {
                        code: v.dataSource().flightKeyCode(),
                        wType: v.dataSource().getWrapperListType("all")
                    };
                }
            })();
            var r = {},
                u = o.sort_price_handler,
                p = o.sort_time_handler;
            if (u || p) {
                $jex.array.each([u, p], function(x, y) {
                    var w = y == 0 ? "pr" : "dt";
                    var v = x && x.arrow.className;
                    if (v === "i_arr_ud") {
                        r[w] = 0;
                    } else {
                        if (v === "i_arr_ud_up") {
                            r[w] = 1;
                        } else {
                            if (v === "i_arr_ud_down") {
                                r[w] = 2;
                            }
                        }
                    }
                });
            }
            var t = o.analyzer.pageInfo();
            return {
                filter: q,
                openOrWillFui: s,
                sort: r,
                page: t
            };
        }
        var k = {
            conditions: null,
            init: function() {
                this.filterGroup = o.filterGroup;
                this.conditions = this.getRecordJson();
            },
            clean: function() {
                try {
                    l.remove(c);
                } catch (p) {}
            },
            record: function(q) {
                try {
                    l.add({
                        name: c,
                        value: n.stringify(q)
                    });
                } catch (p) {}
            },
            getRecordJson: function() {
                var p;
                try {
                    p = l.get(c);
                } catch (r) {
                    return "";
                }
                var q = p && n.parse(p);
                this.clean();
                return q;
            },
            reSetByRecord: function() {
                var w = this.conditions;
                if (!w || o.actionType == 3) {
                    return;
                }
                var q = w.filter;
                if (o.actionType == 1 && q) {
                    $jex.foreach(["起飞时间", "机型", "航空公司", "起飞机场", "降落机场", "舱位", "方式"], function(y, x) {
                        var A = filterGroup.getFilterUI(y);
                        if (!A) {
                            return;
                        }
                        var z = q[nameHX[y]];
                        if ($jex.isArray(z) && z.length > 0) {
                            o.actionType = 2;
                            e = "filter";
                            j = false;
                            $jex.event.trigger(A, "reSelCheckBox", $jex.array.map(z, function(B) {
                                return A._checkboxes[B];
                            }));
                        }
                    });
                }
                var s = w.sort,
                    p = o.sort_time_handler,
                    u = o.sort_price_handler;
                if (s && e != "sort") {
                    $jex.foreach([s.pr, s.dt], function(z, x) {
                        if (!z) {
                            return;
                        }
                        var y = x == 0 ? u : p;
                        if (z == 1) {
                            y.arrow.className = "i_arr_ud_up";
                            y.state(false);
                        } else {
                            y.arrow.className = "i_arr_ud_down";
                            y.state(true);
                        }
                        o.actionType = 2;
                        e = "sort";
                        $jex.event.trigger(y, "clickSort", [
                            [y._setting.sortKey, y.state()]
                        ]);
                    });
                }
                var r = (w.openOrWillFui || {}).wType;

                function t() {
                    d && !j && (function() {
                        j = true;
                        d.dataSource().setWrapperListType(r || "all");
                        d.register();
                        o.actionType = 2;
                    })();
                }
                t();
                var v = w.page;
                if (v && !d && v.pageIndex && e != "page") {
                    if ((o.analyzer.pageInfo() || {}).pageCount > 1) {
                        o.actionType = 2;
                        e = "page";
                        o.analyzer.gotoPage(v.pageIndex);
                        t();
                    }
                }
            }
        };

        function m(p) {
            new Image().src = "http://log.flight.qunar.com/l.gif?s=flight&p=onewayList&r=pageRefresh&type=" + p;
        }
        $jex.event.binding(o.service, "pageWillReload", function(p) {
            m(p);
            k.record(g());
        });
        $jex.event.binding(k, "afterDataLoad", function() {
            this.reSetByRecord();
        });
        $jex.event.binding(i, "fuiFinish", function(p) {
            openOrWillFui = (k.conditions || {}).openOrWillFui;
            if (p == null) {
                d = null;
            } else {
                if (openOrWillFui && p.dataSource().flightKeyCode() == openOrWillFui.code) {
                    d = p;
                }
            }
        });
        k.init();
        return k;
    })(this);
};
flightResultController.prototype.bindUI = function() {
    var c = this;
    var g = this.filterGroup;
    var f = this.pager;
    var b = this.resultList;
    var a = this.timeoutMemorier;
    $jex.event.binding(c.analyzer, "updateFilter", function(i) {
        g.addFilter(i);
    });
    $jex.event.binding(c.analyzer, "autoLoadData", function() {
        if (c.actionType != 3) {
            c.actionType = 1;
        }
    });
    $jex.event.binding(c.analyzer, "dataComplete", function() {
        setTimeout(function() {
            $jex.console.start("dataComplete:更新过滤项");
            g.refresh();
            $jex.console.end("dataComplete:更新过滤项");
        }, 0);
        $jex.console.start("dataComplete:显示列表");
        b.loadData(c.analyzer.resultData(), c.analyzer);
        $jex.console.end("dataComplete:显示列表");
        setTimeout(function() {
            $jex.console.start("dataComplete:更新页码");
            f.update(c.analyzer.pageInfo());
            $jex.console.end("dataComplete:更新页码");
        }, 0);
        setTimeout(function() {
            $jex.console.start("dataComplete:更新上次选择");
            if (!c.endMemorier) {
                $jex.event.trigger(a, "afterDataLoad");
                c.service.searchEnd() && (c.endMemorier = true);
            }
            $jex.console.end("dataComplete:更新上次选择");
        }, 0);
    });
    var e, h;
    var d;
    TsinghuaOneWayTracker.setTimerToSaveTrack = function() {
        clearTimeout(d);
        d = setTimeout(function() {
            if (e) {
                System.service.genTraceTimeStamp();
                System.analyzer.triggerTrace = true;
                TsinghuaOneWayTracker.trackOnRefreshed(e);
                c.trackFilters();
                TsinghuaOneWayTracker.track("query", encodeURIComponent(location.search), System.service.traceTimeStamp);
                System.analyzer.triggerTrace = false;
            }
        }, 3000);
    };
    TsinghuaOneWayTracker.clearTimerToSaveTrack = function() {
        clearTimeout(d);
    };
    TsinghuaOneWayTracker.traceFlightList = function() {
        if (System.analyzer.triggerTrace && e) {
            TsinghuaOneWayTracker.clearTimerToSaveTrack();
            c.trackFilters();
            TsinghuaOneWayTracker.track("query", encodeURIComponent(location.search), System.service.traceTimeStamp);
            TsinghuaOneWayTracker.trackOnRefreshed(e);
            System.analyzer.triggerTrace = false;
        }
    };
    $jex.event.binding(b, "refreshed", function(i) {
        if (!h) {
            System.service.genFilterTimeStamp();
            TsinghuaOneWayTracker.setTimerToSaveTrack();
            h = true;
        }
        TsinghuaOneWayTracker.traceFlightList();
        e = i;
    });
};

function SortHandler(b) {
    SortHandler.superclass.constructor.call(this, b);
    this._type = "SortHandler";
    this._init();
    var a = true;
    this.state = function(c) {
        if (c == null) {
            return a;
        } else {
            a = c;
        }
    };
}
$jex.extendClass(SortHandler, XControl);
SortHandler.prototype._init = function() {
    var a = this;
    var b = $jex.$(this._setting.elemId);
    var c = b.getElementsByTagName("i")[0];
    a.arrow = c;
    $jex.event.binding(b, "click", function(d) {
        $jex.stopEvent(d);
        if (a.state()) {
            c.className = "i_arr_ud_up";
            a.state(false);
        } else {
            c.className = "i_arr_ud_down";
            a.state(true);
        }
        $jex.event.trigger(a, "onUserActied");
        $jex.event.trigger(a, "clickSort", [
            [a._setting.sortKey, a.state()]
        ]);
    });
};
SortHandler.prototype.setSortKey = function(a) {
    this._setting.sortKey = a;
};

function BookBtnTracker(a) {
    this.condition = {};
    this.service = a.service;
    this.analyzer = a.analyzer;
    this.resultList = a.resultList;
    this.filterGroup = a.filterGroup;
    this.pager = a.pager;
    this.pagesizer = a.pagesizer;
    this.sort_price_handler = a.sort_price_handler;
    this.sort_time_handler = a.sort_time_handler;
    this.init(a);
}
BookBtnTracker.prototype.init = function(a) {
    this.condition = {
        dc: a.param.fromCode,
        ac: a.param.toCode,
        dd: a.param.searchDepartureTime
    };
};
BookBtnTracker.prototype.fixParam = function(b) {
    var a = arguments.length;
    this._param = $jex.merge(this._param, b);
};
BookBtnTracker.prototype.send = function(f) {
    var n = this,
        f = f;
    var a = {},
        j = this.filterGroup,
        m = {
            起 飞 时 间: "dt", � �型: "pt", � �� �公 司: "hs", 起 飞 � �� �: "da", 降 落 � �� �: "aa", 舱 位: "ca", 方 式: "df"
        };
    $jex.foreach(["起飞时间", "机型", "航空公司", "起飞机场", "降落机场", "舱位", "方式"], function(p, o) {
        var q = j.getFilterUI(p);
        a[m[p]] = q ? ((q.getValue() || "").join("|")) : -1;
    });
    var c = {},
        g = n.sort_price_handler,
        h = n.sort_time_handler;
    if (g || h) {
        $jex.array.each([g, h], function(q, r) {
            var p = r == 0 ? "pr" : "dt";
            var o = q && q.arrow.className;
            if (o === "i_arr_ud") {
                c[p] = 0;
            } else {
                if (o === "i_arr_ud_up") {
                    c[p] = 1;
                } else {
                    if (o === "i_arr_ud_down") {
                        c[p] = 2;
                    }
                }
            }
        });
    }
    var l = n.analyzer.pageInfo();
    var e = n.resultList;
    var k = e.currentDataMap;
    var b = e.isOnlySelBfCabinType();
    var i = $jex.array.map(k, function(p, q) {
        var o;
        if (p.type == "transfer") {
            o = [p.firstTrip(), p.secondTrip()];
        } else {
            o = [p];
        }
        return $jex.merge({
            no: q,
            pr: b ? p.bfLowestPrice() || "" : p.lowestPrice() || "",
            dc: b ? "" : PriceUtil.getTransferDiscount(p.lowestDiscount()),
            tag: (p.showTag || []).join("|"),
            key: p.flightKeyCode(),
            trip: $jex.array.map(o, function(u) {
                var t = u.flightInfo(),
                    s = u.plane(),
                    r = u.extInfo() || {};
                return {
                    ptf: s.full,
                    pt: t.pt,
                    ca: t.ca,
                    co: t.co,
                    da: t.da,
                    aa: t.aa,
                    dd: t.dd,
                    dt: t.dt,
                    at: t.at,
                    ra: u.onTimeRate(),
                    ad: u.delayTime(),
                    sa: u.stopover() ? u.spAirPort() : "",
                    st: u.stopover(),
                    cs: r.cs || ""
                };
            })
        });
    });
    l.pageSize = i.length || 0;
    var d = {
        condition: n.condition,
        filter: a,
        page: l,
        sort: c,
        pageData: i,
        choose: f.dataSource().flightKeyCode(),
        t: new Date().getTime()
    };
    $jex.ajax("/rms/data/pickflight.json", d, function() {}, {
        onerror: n._onerror,
        method: "POST"
    });
};
BookBtnTracker.prototype._onerror = function() {
    $jex.event.trigger(self, "onerror", arguments);
};
(function() {
    window.GSERVER_TIME = null;
    $jex.console.error("加载与处理js耗时:", new Date() - CLIENT_TIME);
    $jex.console.start("begin init....");
    document.domain = "qunar.com";
    if ($jex.$("js-iframe_ajax")) {
        $jex.$("js-iframe_ajax").innerHTML = '<iframe id="ifmPost" name="ifmPost" src="about:blank" frameborder="0" scrolling="no" width="0" height="0" style="display:none;"></iframe><iframe id="ifmTrackLog" name="ifmTrackLog" src="about:blank" frameborder="0" scrolling="no" width="0" height="0" style="display:none;"></iframe><iframe id="ifrmHistory" style="width:1px;height:1px;visibility:hidden;position:absolute"></iframe>';
    }
    var f = $jex.parseQueryParam();
    HoldLastShowFlight.init(f);
    f.searchArrivalTime = f.searchArrivalTime || f.arrivalTime;
    try {
        var g = new Date(f.searchArrivalTime.replace(/-/g, "/"));
    } catch (j) {
        f.searchArrivalTime = f.searchDepartureTime;
    }
    $jex.foreach(f, function(t, e, s) {
        $jex.console.trace("[PARAM]", s, ":", t);
    });
    $jex.console.trace("[CLIENT]", window.navigator.userAgent.toString());
    window.location.param = function() {
        return f;
    };
    window.location.research = function(x, v, t, e, w) {
        var u = $jex.merge(f, {
            searchDepartureAirport: x || f.searchDepartureAirport,
            searchArrivalAirport: v || f.searchArrivalAirport,
            searchDepartureTime: t || f.searchDepartureTime,
            searchArrivalTime: e || f.searchArrivalTime,
            from: w || f.from
        });
        var s = window.location.href.split("?")[0];
        s += "?" + $jex.toQueryString(u);
        return s;
    };
    if (f.loadDynamicCss) {
        var n = document.getElementsByTagName("head").item[0];
        css = document.createElement("link");
        css.href = "styles/" + f.loadDynamicCss + ".css";
        css.rel = "stylesheet";
        css.type = "text/css";
        n.appendChild(css);
    }
    window.System = {
        service: DomesticOnewaySearchService,
        analyzer: DomesticOnewayDataAnalyzer,
        param: f
    };
    var i = DomesticOnewaySearchService;
    var h = DomesticOnewayDataAnalyzer;
    h.setSearchService(i);
    i.setAnalyzer(h);
    window.SS = i;
    var a = new flightResultController(i, h, f);
    var l = new FlashAdUI({
        elemId: "hdivResultPanel"
    });
    var p;
    var b = function() {
        if (!window.SearchBoxCreate) {
            setTimeout(b, 10);
            return;
        }
        p = SearchBoxCreate(f);
        searchTrack.init("DMT", p);
    };
    var c = new CACTI_monitoring({
        url: "http://bmrg.qunar.com/f",
        pageId: "DomesticOnewayList",
        timerList: ["t_done", "t_firstData"]
    });
    var k = 0;

    function r() {
        if (k === 1) {
            c.send();
        }
        k++;
    }
    $jex.event.bind(window, "load", function() {
        r();
    });
    var o = false;
    var m = function() {
        if (o) {
            return;
        }
        c.end("t_firstData");
        r();
        $jex.console.start("第一屏数据耗时");
        setTimeout(function() {
            function s() {
                setTimeout(function() {
                    SpringHotRoundtrip.updateSevenDayToday();
                }, 0);
            }
            $jex.console.start("第一屏,七日低价 ");
            SpringHotRoundtrip.initialize({
                dc: f.searchDepartureAirport,
                ac: f.searchArrivalAirport,
                searchDate: $jex.date.parse(f.searchDepartureTime),
                config: oneway_config.SpringHotConfig,
                isInter: false
            });
            SpringHotRoundtrip.load();
            $jex.event.binding(h, "dataComplete", function() {
                s();
            });
            $jex.event.binding(PAGE_EVENT, "lowPriceChange", function() {
                s();
            });
            $jex.console.end("第一屏,七日低价 ");
            setTimeout(function() {
                $jex.console.start("第一屏,侧边推荐酒店 ");
                recommendedHotels.query(encodeURIComponent(f.searchArrivalAirport), f.searchDepartureTime, "HotelRecommended", "oneway-list", 0);
                $jex.console.end("第一屏,侧边推荐酒店");
            }, 0);
            $jex.console.start("第一屏,加载酒店红包广告");
            var u = document.createElement("img");
            var t = document.getElementById("hotel_hongbao");
            u.src = "http://simg1.qunarzz.com/site/images/flight/flight_search/hotel_hongbao.jpg";
            u.onload = function() {
                t.appendChild(u);
                t.style.display = "block";
            };
            $jex.console.end("第一屏，加载酒店红包广告");
            $jex.console.start("第一屏,加载临近航班");
            NearLineRec.load(f);
            $jex.console.end("第一屏，加载临近航班");
            $jex.console.start("第一屏,加载广告 ");
            var e = i.longwell();
            AD_Manage.qde_query = function(w) {
                var v = ["&to=", e.arrivalAirport.en, "&from=", e.departureAirport.en, "&cnkey=", encodeURIComponent(e.departureAirport.zh), "&s=", encodeURIComponent(f.searchDepartureAirport), "&s1=", encodeURIComponent(f.searchArrivalAirport), "&fromDate=", f.searchDepartureTime, "&st=oneway", "&pt=dmst"].join("");
                w(v);
            };
            $OTALOGIC.init(f.searchDepartureAirport, f.searchArrivalAirport, f.searchDepartureTime);
            $OTALOGIC.load_top("ifrmVendorBanner");
            $OTALOGIC.load_right();
            AD_Manage.load();
            $jex.console.end("第一屏,加载广告 ");
            LazyScrollShow.start();
            $jex.console.end("第一屏数据耗时");
        }, 0);
        o = true;
    };
    var d = function(A) {
        if (typeof QunarHistory == "undefined" || !QunarHistory || !QunarHistory.SFlight) {
            setTimeout(function() {
                d(A);
            }, 500);
            return;
        }
        var z = A;
        var B = encodeURIComponent(z.dept.input);
        var t = encodeURIComponent(z.dept.country);
        var s = encodeURIComponent(z.arri.input);
        var x = encodeURIComponent(z.arri.country);
        var w = new Date(f.searchDepartureTime.replace(/-/g, "/"));
        var u = f.fromCode,
            y = f.toCode;
        B = u ? B + "(" + u + ")" : B;
        s = y ? s + "(" + y + ")" : s;
        var e = new QunarHistory.SFlight(B, s, new Date().getTime());
        e.addDate(w);
        e.addCountry(t + "-" + x);
        QunarHistory.service.addNode(e);
    };

    function q() {
        $jex.event.binding(i, "expireQuery", function() {
            var e = window.location.research(null, null, $jex.date.add(SERVER_TIME, 1, true), $jex.date.add(SERVER_TIME, 3, true));
            top.location.href = e;
            return;
        });
        $jex.event.binding(i, "validateComplete", function(e) {
            setTimeout(function() {
                if (i.isValidQuery()) {
                    d(e);
                }
            }, 0);
        });
        $jex.event.binding(i, "invalidQuery", function() {
            TraceAnalyzer.all.invalidErr();
        });
        $jex.event.binding(i, "noTransferData", function() {
            TraceAnalyzer.all.noTransErr();
        });
        $jex.event.binding(i, "sameCity", function() {
            l.show("sameCity");
            TraceAnalyzer.all.sameCityErr();
        });
        $jex.event.binding(h, "noResultEnd", function() {
            l.show("noResult");
            TraceAnalyzer.all.noResultErr().tsingReport();
        });
        $jex.event.binding(i, "loadedFirstData", function() {
            m();
        });
        $jex.event.binding(i, "noOnewayData", function() {
            m();
            TraceAnalyzer.all.noOnewayErr();
        });
        $jex.event.binding(i, "searchEnd", function() {
            m();
            if (TraceAnalyzer && TraceAnalyzer.open) {
                TraceAnalyzer.open.sendTsingOpenInfo();
            }
        });
    }
    window.$OTA = new OTABlade(new OTAInfoExtractor({
        extract: function(s) {
            var e = this;
            $jex.foreach(s.priceInfo, function(u, x, w) {
                var t = new OTAOnewayFlight(w);
                t.flightInfo(s.flightInfo[w]);
                t.priceInfo(s.priceInfo[w]);
                e.flightType = t.type();
                e.add(t);
            });
        }
    }));
    $OTA.group.options({
        type: "ow",
        currentDate: window.SERVER_TIME || new Date(),
        fromCity: f.searchDepartureAirport,
        toCity: f.searchArrivalAirport,
        fromDate: new Date(f.searchDepartureTime.replace(/-/g, "/"))
    });
    $jex.event.binding(i, "loadedLongwell", function(e) {
        $OTA.group.options({
            queryID: e.queryID
        });
    });
    $jex.event.binding(i, "loadedOnewayData", function(e) {
        $OTA.extract(e);
    });
    TraceAnalyzer.all = TraceAnalyzer.create().queryInfo({
        da: f.searchDepartureAirport,
        aa: f.searchArrivalAirport,
        inter: 0,
        dd: f.searchDepartureTime,
        now: $jex.date.format(SERVER_TIME),
        ip: CLIENT_IP,
        act: "noresult"
    });
    HotSale.init();
    q();
    BookingPriceCheck.init();
    LOG_SPIDER.init();
    c.start("t_firstData");
    i.search(f);
    $jex.jsonp("http://flight.qunar.com/twelli/flight/localDate.jsp", {
        depCity: f.searchDepartureAirport
    }, function(e) {
        if (window.QNR) {
            window.QNR.isLocal = e.isLocal;
        } else {
            window.QNR = {};
            window.QNR.isLocal = e.isLocal;
        }
        var s = e.localDate.replace(/-/g, "/");
        GSERVER_TIME = new Date(s);
        if (e.isLocal) {
            window.QNR[f.searchDepartureAirport] = GSERVER_TIME;
        } else {
            GSERVER_TIME = new Date(SERVER_TIME.getFullYear(), SERVER_TIME.getMonth(), SERVER_TIME.getDate());
        }
    }, {
        timeout: {
            time: 200,
            func: function() {
                if (window.QNR.isLocal === undefined) {
                    GSERVER_TIME = new Date(SERVER_TIME.getFullYear(), SERVER_TIME.getMonth(), SERVER_TIME.getDate());
                }
            }
        }
    });
    setTimeout(function() {
        b();
    }, 20);
    $jex.console.end("初始化所耗时");
})();

function FEMonitor(a) {
    a = $jex.merge({
        logurl: "http://femon.qunar.com/felog",
        interval: 0,
        module: "F"
    }, a);
    this._init(a);
}
FEMonitor.fn = FEMonitor.prototype;
FEMonitor.fn._init = function(a) {
    this.lastSendTime = 0;
    this.logurl = a.logurl;
    this.module = a.module;
    this.interval = a.interval;
    this.ua = this._getBrowser();
};
FEMonitor.fn.addMonitor = function(f, d, e, b) {
    if (!f || !d) {
        return;
    }
    var a = this,
        c = function(g) {
            a._sendLog(e || g, b, g);
        };
    $jex.event.bind(f, d, c);
};
FEMonitor.fn._sendLog = function(f, b, a) {
    if (typeof f !== "string") {
        return;
    }
    var g = 0;
    if (a && typeof a == "number") {
        g = a;
    }
    var h = this.module + "_" + f,
        e = new Date().getTime(),
        d = {
            id: h,
            n: 1,
            type: 1,
            s: g,
            t: e,
            token: this._calcToken(h, e)
        },
        c = this.ua;
    if (b) {
        d.id += "_" + c.browser;
        d.v = c.version;
    }(new Image()).src = this.logurl + "?" + this._obj2str(d);
};
FEMonitor.fn._obj2str = function(d, b) {
    if (!d) {
        return "";
    }
    var c, a = [];
    for (c in d) {
        if (d.hasOwnProperty(c)) {
            a.push(c + "=" + encodeURIComponent(d[c]));
        }
    }
    return a.join(b || "&");
};
FEMonitor.fn._canSendLog = function() {
    return this.interval === 0 ? true : new Date().getTime() - this.lastSendTime > this.interval * 1000;
};
FEMonitor.fn._cacheLog = function(a) {
    this._logs = this._logs || {};
    if (typeof this._logs[a] === "number") {
        this._logs[a] ++;
    } else {
        this._logs[a] = 0;
    }
};
FEMonitor.fn._sendCache = function() {};
FEMonitor.fn._calcToken = function(b, a) {
    return "";
};
FEMonitor.fn._getBrowser = function() {
    var d = {};
    var b = navigator.userAgent.toLowerCase();
    var c;
    (c = b.match(/rv:([\d.]+)\) like gecko/)) ? d.browser = "IE11": (c = b.match(/msie ([\d.]+)/)) ? d.browser = "IE" : (c = b.match(/firefox\/([\d.]+)/)) ? d.browser = "Firefox" : (c = b.match(/chrome\/([\d.]+)/)) ? d.browser = "Chrome" : (c = b.match(/opera.([\d.]+)/)) ? d.browser = "Opera" : (c = b.match(/version\/([\d.]+).*safari/)) ? d.browser = "Safari" : d.browser = "OtherBrowser";
    d.version = c[1];
    if (d.browser == "IE") {
        var a = parseInt(d.version);
        d.browser = a <= 7 ? "IE6/7" : a == 8 ? "IE8" : "IE9/10";
    }
    return d;
};
var fem = new FEMonitor({
    module: "F_LP_FL_OW"
});
var __$__ = $jex.$,
    listPanel = __$__("hdivResultPanel");
fem.addMonitor(listPanel, "fem_flightListShow", "ShowList");
fem.addMonitor(__$__("btnDepttimeOrderArror"), "fem_orderByTime", "OrderByTime");
fem.addMonitor(__$__("btnPriceOrderArror"), "fem_orderByPrice", "OrderByPrice");
fem.addMonitor(listPanel, "fem_openWrapperList", "OpenWrapperList");
fem.addMonitor(listPanel, "fem_closeWrapperList", "CloseWrapperList");
fem.addMonitor(listPanel, "fem_showTGQ", "ShowTGQ");
fem.addMonitor(listPanel, "fem_booking", "Booking");
var detailPage = __$__("detailPage");
fem.addMonitor(detailPage, "fem_pageNum");
(function() {
    var c = window.SERVER_TIME;
    var a = new Date(c.getTime() + 1000 * 60 * 60 * 24 * 362);
    var b = "http://flight.qunar.com/twell/flight/Search.jsp?";
    window.searchCaution = function() {
        var h = $jex.lightbox,
            j, k = {};
        var o = function(t) {
            var s = t || {};
            var r = "";
            if (t.round) {
                r = '<p>去程：&nbsp;<span class="fb">' + t.departureDate + "</span></p>";
                r = r + '<p>回程：&nbsp;<span class="fb">' + t.arrivalDate + "</span>&nbsp;&nbsp;马上为您显示搜索结果。</p>";
            } else {
                r = '<p>去程：&nbsp;<span class="fb">' + t.departureDate + "</span>&nbsp;&nbsp;马上为您显示搜索结果。</p>";
            }
            return r;
        };
        var e = function(s) {
            var r = '<div class="p_lyr_ct" style="width:522px;"><div class="lyr_in"> <a id="search-caution-close" class="btn_close" href="javascript:;"></a><div class="lyr_ct" style="width: 450px;"><div class="b_alt_day"><div class="p1">目前<span class="fb">' + s.fromCity + '</span>到<span class="fb">' + s.toCity + '</span>机票最远支持搜索以下日期的航班：</div><div class="p2">' + o(s) + '</div><div class="p_btn"><a href="' + s.href + '" class="btn_sure_bl" id="search-caution-ok"><span>确&nbsp;定</span></a></div></div><div class="b_alt_dode clearfix"><a href="http://app.qunar.com/" target="_blank"><p class="m_code_img"><img src="http://simg1.qunarzz.com/site/images/flight/home/img_qnkhd.png"></p><p class="m_code_rt"><span class="h1">为您提供更多航班搜索，<br>我们一直在努力！</span><span class="h3">扫描或点击下载去哪儿旅行客户端</span></p></a></div></div></div></div>';
            return r;
        };
        var n = function() {
            p();
        };
        var p = function() {
            h.hide();
        };
        var l = function() {
            $jex.event.bind($jex.$("search-caution-close"), "click", p);
            $jex.event.bind($jex.$("search-caution-ok"), "click", n);
        };
        var d = function(s, r) {
            return Math.min(s, r);
        };

        function g(t) {
            var s = "";
            for (var r in t) {
                s += "&" + r + "=" + t[r];
            }
            return b + s;
        }
        var i = {
            "国内_oneway": "fi_dom_search",
            "国内_roundtrip": "fi_ont_search",
            "国际_oneway": "fi_int_search",
            "国际_roundtrip": "fi_ont_search",
            "特价_lowestprice": "tejia_fi"
        };
        var q = {
            oneway: "OnewayFlight",
            roundtrip: "RoundTripFlight",
            lowestprice: "DealsFlight"
        };

        function m(r) {
            var s = {
                fromCity: r.fromCity,
                toCity: r.toCity,
                fromDate: r.fd
            };
            if (r.searchType === "roundtrip") {
                s.toDate = r.td;
            }
            if (r.searchType === "lowestprice") {
                s.drange = r.drange;
            }
            s.from = i[r.type + "_" + r.searchType];
            s.searchType = q[r.searchType];
            return s;
        }

        function f(s) {
            try {
                new Image().src = "http://flight.qunar.com/site/track.htm?action=" + s + "&t=" + Math.random();
            } catch (r) {}
        }
        k.check = function(t) {
            this.data = {};
            this.data.fromCity = t.fromCity;
            this.data.toCity = t.toCity;
            var r = false;
            var s = $jex.date.parse(t.fd);
            var v = $jex.date.parse(t.td);
            if ("oneway" === t.searchType) {
                if (s > a) {
                    r = true;
                    this.data.type = t.type;
                    this.data.round = false;
                    this.data.departureDate = $jex.date.format(a);
                    var u = m(t);
                    u.fromDate = this.data.departureDate;
                    this.data.href = g(u);
                }
            } else {
                if ("roundtrip" === t.searchType) {
                    if (s > a || v > a) {
                        r = true;
                        this.data.type = t.type;
                        this.data.round = true;
                        this.data.departureDate = $jex.date.format(new Date(d(s, a)));
                        this.data.arrivalDate = $jex.date.format(new Date(d(v, a)));
                        var u = m(t);
                        u.fromDate = this.data.departureDate;
                        u.toDate = this.data.arrivalDate;
                        this.data.href = g(u);
                    }
                } else {
                    if ("lowestprice" === t.searchType) {
                        if (s > a) {
                            r = true;
                            this.data.type = t.type;
                            this.data.round = false;
                            this.data.departureDate = $jex.date.format(a);
                            this.data.drange = t.drange, this.data.search = t.search;
                            var u = m(t);
                            u.fromDate = this.data.departureDate;
                            this.data.href = g(u);
                        }
                    }
                }
            }
            return r;
        };
        k.show = function() {
            var s = e(this.data);
            h.show(s);
            j = h.content;
            l();
            var r = ["FL", "EQR"].join("|");
            f(r);
        };
        return k;
    }();
})();