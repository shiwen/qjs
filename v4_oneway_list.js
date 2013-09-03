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
    b.track = function(j, d, h, g, f) {
        var l = "/site/trace.htm?" + j + "=" + d + "&c=" + c;
        if (h) {
            l += "&t=" + h;
        }
        if (g) {
            l += "&p=" + g;
        }
        if (f) {
            l += f;
        }
        if (l.length >= 1500) {
            return;
        }
        try {
            new Image().src = l;
        } catch (k) {}
    };
    b.traceFlist = function(d) {
        var e = [];
        $jex.foreach(d, function(h) {
            var g = h.dataSource(),
                j, f;
            if (g.type === "transfer") {
                j = g.firstTrip();
                f = g.secondTrip();
                e.push([g.firstTrip().code() + "/" + g.secondTrip().code(), g.lowestPrice(), g.lowestDiscount(), g.secondTrip().deptDate(), [j.stopover() ? 1 : 0, j.codeShare() ? 1 : 0, j.isNextDate() ? 1 : 0].join(","), [f.stopover() ? 1 : 0, f.codeShare() ? 1 : 0, f.isNextDate() ? 1 : 0].join(",")].join("|"));
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
                    n = ["hot", "ps", "late", "lcc"];
                if (u) {
                    for (var l = 0; l < 4; l++) {
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
    b.trackWrappers = function(k) {
        var o = System.service.wrapperExpandStamp && System.service.wrapperExpandStamp >= System.service.traceTimeStamp ? System.service.wrapperExpandStamp : System.service.traceTimeStamp;
        var h = k.code();
        var s = k.codeShare(),
            e = k.codeShareFlight();
        if (s && e) {
            if (h !== s) {
                h += ">" + s;
            }
        }
        if (a[h + o]) {
            return;
        } else {
            a[h + o] = true;
        }
        var r = k.wrappers();
        var p = r._keysCache;
        var g = [];
        var t = [];
        var l = "";
        var n = parseInt(k.lowestPrice(), 10);
        var f = parseFloat(k.flightHistory()[1]);
        var d = k.extInfo();
        if (n && f) {
            if (n > f * 1.05) {
                l += "1";
            } else {
                if (n <= f * 1.05 && n >= f * 0.95) {
                    l += "0";
                } else {
                    if (n < f * 0.95) {
                        l += "-1";
                    }
                }
            }
        } else {
            l += "*";
        } if (d && d.ml === "true") {
            l += "1";
        } else {
            l += "0";
        } if (d && d.zj && d.zj.info) {
            l += "1";
        } else {
            l += "0";
        }
        $jex.foreach(p, function(w, u) {
            var v = r.get(w);
            var y = 0;
            if (v.bigLogoUrl()) {
                y = 1;
            } else {
                if (v.vendor().isSuperOTA()) {
                    y = 2;
                }
            }
            g.push([v.wrapperId(), v.afeePrice() || 0, v.bprPrice() || 0, v.afee(), y, v.isApplyPrice() ? 1 : 0, k.type && k.type == "compose" ? "1" : "0"].join("|"));
            var x = v.vendor().starRank();
            var z = x && x.lv || 0;
            var A = v.vendor();
            t.push([v.wrapperId(), z ? [z.kd, z.ts, z.dw, z.db, z.ds].join(",") : 0, x ? x.count : 0, v.updateTime(), A.srv_CATA() ? 1 : 0, A.srv_ASSISTANT() ? 1 : 0, A.srv_ALLDAY() ? 1 : 0, v.getTGQInfo() ? 1 : 0, v.isFCabin() ? 1 : 0, A.isSuperOTA() ? 1 : 0].join("|"));
        });
        var q = "";
        if (k.type == "onewayInTransfer") {
            q = "&package=" + k.owner().firstTrip().code() + "/" + k.owner().secondTrip().code();
        } else {
            q = "&package=" + k.code();
        }
        var m = 0;
        if (k.priceInfo) {
            m = k.priceInfo().wrlen;
        }
        var j = k.getWrapperListType && k.getWrapperListType() || "";
        if (g.length > 0) {
            this.track("wlist", g.join("^"), System.service.traceTimeStamp, null, "&num=" + m + "&code=" + h + "&detail=" + l + q + "&wt=" + o + "&wtype=" + j);
        }
        if (t.length > 0) {
            this.track("wstatus", t.join("^"), System.service.traceTimeStamp, null, "&code=" + h + q + "&wt=" + o + "&wtype=" + j);
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
        $jex.foreach(w, function(z, y) {
            m = k.get(z);
            e.push(m);
            s = m.afeePrice() || m.bprPrice();
            if (s == l) {
                j = 1;
            }
        });
        var t, r;
        var p = e.sort(function(z, y) {
            t = z.afeePrice() || z.bprPrice();
            r = y.afeePrice() || y.bprPrice();
            return t - r;
        });
        var v = p[0].afeePrice() || p[0].bprPrice();
        var g = x + "^" + f + "^" + j + "^";
        var h;
        if (n.lowestPrice() != n.priceInfo().lowpr) {
            h = n.lastPriceGroup() ? n.lastPriceGroup().lpwr : "";
        } else {
            h = n.priceGroup().lpwr;
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
    b.trackTabChange = function(k, f) {
        var h = f.vendorListUI().tabsCache || {};
        var g = h.show || [],
            e = h.price || [];
        var d = f.dataSource().code();
        var j = ["&type=", k, "&tabs=", g.join("^"), "&lowps=", e.join("^"), "&fcode=", d, "&ct=", System.service.wrapperExpandStamp].join("");
        this.track("tabclick", "", System.service.traceTimeStamp, null, j);
    };
    b.bookingHoldTrack = function(g, e, k, f) {
        var d = g.ownerFlight();
        d = d._shareFlight || d;
        var h = 0;
        if (CLIENT_TIME && SERVER_TIME) {
            h = (new Date().getTime() - CLIENT_TIME.getTime()) + SERVER_TIME.getTime();
        } else {
            h = new Date().getTime();
        }
        var j = [d.code(), d.getWrapperListType(), g.wrapperId(), g.vendor().name(), e, k || 0, f || 0, h].join("|");
        this.track("fIntercept", j, System.service.traceTimeStamp, null, "&wt=" + (System.service.wrapperExpandStamp || ""));
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
        addListener: function(j, k, h, d) {
            if (j.addEventListener) {
                j.addEventListener(k, h, (d));
            } else {
                if (j.attachEvent) {
                    j.attachEvent("on" + k, h);
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
            setCookie: function(h, d, o, s, m, n) {
                var r = "",
                    l, q, p, j = "";
                if (!h) {
                    return false;
                }
                for (l in d) {
                    if (d.hasOwnProperty(l)) {
                        r += "&" + encodeURIComponent(l) + "=" + encodeURIComponent(d[l]);
                    }
                }
                r = r.replace(/^&/, "");
                if (o) {
                    j = new Date();
                    j.setTime(j.getTime() + o * 1000);
                    j = j.toGMTString();
                }
                q = h + "=" + r;
                p = q + ((o) ? "; expires=" + j : "") + ((s) ? "; path=" + s : "") + ((typeof m !== "undefined") ? "; domain=" + (m !== null ? m : e.site_domain) : "") + ((n) ? "; secure" : "");
                if (q.length < 4000) {
                    g.cookie = p;
                    return (r === this.getCookie(h));
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
                this.log = function(k, n, o) {};
            }
            for (d in this.plugins) {
                if (h[d] && typeof h[d].enabled !== "undefined" && h[d].enabled === false) {
                    e.disabled_plugins[d] = 1;
                    continue;
                } else {
                    if (e.disabled_plugins[d]) {
                        delete e.disabled_plugins[d];
                    }
                } if (this.plugins.hasOwnProperty(d) && typeof this.plugins[d].init === "function") {
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
            n.push([m, j || {},
                o || null
            ]);
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
        addVar: function(h, j) {
            if (typeof h === "string") {
                e.vars[h] = j;
            } else {
                if (typeof h === "object") {
                    var l = h,
                        d;
                    for (d in l) {
                        if (l.hasOwnProperty(d)) {
                            e.vars[d] = l[d];
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
            var j, l, h, d = 0;
            for (j in this.plugins) {
                if (this.plugins.hasOwnProperty(j)) {
                    if (e.disabled_plugins[j]) {
                        continue;
                    }
                    if (!this.plugins[j].is_complete()) {
                        return this;
                    }
                }
            }
            e.fireEvent("before_beacon", e.vars);
            if (!e.beacon_url) {
                return this;
            }
            l = e.beacon_url + "?v=" + encodeURIComponent(BOOMR.version) + "&u=" + encodeURIComponent(g.URL.replace(/#.*/, ""));
            for (j in e.vars) {
                if (e.vars.hasOwnProperty(j)) {
                    d++;
                    l += "&" + encodeURIComponent(j) + "=" + encodeURIComponent(e.vars[j]);
                }
            }
            if (d) {
                h = new Image();
                h.src = l;
            }
            return this;
        }
    };
    var f = function(d) {
        return function(h, j) {
            this.log(h, d, "boomerang" + (j ? "." + j : ""));
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
                c.log = function(d, h, j) {
                    console.log(j + ": [" + h + "] ", d);
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
            } if (d) {
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
            var k, d, h, e, j = {
                    t_done: 1,
                    t_resp: 1,
                    t_page: 1
                }, g = 0,
                l, f, m = [];
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
            } if (b.timers.hasOwnProperty("t_postrender")) {
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
                        k = parseInt(e.s, 10);
                    }
                }
            }
            if (k) {
                BOOMR.addVar("rt.start", "cookie");
            } else {
                k = b.navigationStart;
            }
            BOOMR.removeVar("t_done", "t_page", "t_resp", "r", "r2");
            for (l in b.timers) {
                if (!b.timers.hasOwnProperty(l)) {
                    continue;
                }
                f = b.timers[l];
                if (typeof f.delta !== "number") {
                    if (typeof f.start !== "number") {
                        f.start = k;
                    }
                    f.delta = f.end - f.start;
                }
                if (isNaN(f.delta)) {
                    continue;
                }
                if (j.hasOwnProperty(l)) {
                    BOOMR.addVar(l, f.delta);
                } else {
                    m.push(l + "|" + f.delta);
                }
                g++;
            }
            if (g) {
                BOOMR.addVar("r", d);
                if (h !== d) {
                    BOOMR.addVar("r2", h);
                }
                if (m.length) {
                    BOOMR.addVar("t_other", m.join(","));
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
        setVarsFromCookie: function(m) {
            var j = parseInt(m.ba, 10),
                l = parseFloat(m.be, 10),
                k = parseInt(m.l, 10) || 0,
                f = parseFloat(m.le, 10) || 0,
                d = m.ip.replace(/\.\d+$/, "0"),
                n = parseInt(m.t, 10),
                h = this.user_ip.replace(/\.\d+$/, "0"),
                g = Math.round((new Date().getTime()) / 1000);
            if (d === h && n >= g - this.cookie_exp) {
                this.complete = true;
                BOOMR.addVar({
                    bw: j,
                    lat: k,
                    bw_err: l,
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
var DomesticOnewayDataAnalyzer = new(function() {
    var u = this;
    var I = null;
    var f = null;
    var B = null;
    this.infoMgr = function() {
        if (typeof B == "undefined" || B == null) {
            B = new CommonInfoManager();
        }
        return B;
    };
    var G = null;
    this.onewayInfoMgr = function() {
        if (typeof G == "undefined" || G == null) {
            G = new FlightInfoManager();
        }
        return G;
    };
    var m = null;
    this.transferInfoMgr = function() {
        if (typeof m == "undefined" || m == null) {
            m = new FlightInfoManager();
        }
        return m;
    };
    var j = null;
    this.flightEntityMgr = function() {
        if (typeof j == "undefined" || j == null) {
            j = new FlightEntityManager();
        }
        return j;
    };
    this.lowestPrice = function() {
        var J = (this.lowestTransfer() == null) ? Number.MAX_VALUE : this.lowestTransfer().safeLowestPrice();
        var K = (this.lowestOneway() == null) ? Number.MAX_VALUE : this.lowestOneway().safeLowestPrice();
        var L = (this.lowestCompose() == null) ? Number.MAX_VALUE : this.lowestCompose().safeLowestPrice();
        return Math.min(J, K, L);
    };
    this.lowestEntity = function() {
        var J = (this.lowestTransfer() == null) ? Number.MAX_VALUE : this.lowestTransfer().safeLowestPrice();
        var K = (this.lowestOneway() == null) ? Number.MAX_VALUE : this.lowestOneway().safeLowestPrice();
        var L = (this.lowestCompose() == null) ? Number.MAX_VALUE : this.lowestCompose().safeLowestPrice();
        if (J <= K && J <= L) {
            return this.lowestTransfer();
        }
        if (K <= J && K <= L) {
            return this.lowestOneway();
        }
        if (L <= J && L <= K) {
            return this.lowestCompose();
        }
    };
    var q = null;
    this.lowestTransfer = function(J) {
        if (J == null) {
            return q;
        } else {
            if (q == null) {
                q = J;
            } else {
                if (q.safeLowestPrice() > J.safeLowestPrice()) {
                    q = J;
                }
            }
        }
    };
    var v = null;
    this.lowestOneway = function(J) {
        if (J == null) {
            return v;
        } else {
            if (v == null) {
                v = J;
            } else {
                if (v.safeLowestPrice() > J.safeLowestPrice()) {
                    v = J;
                }
            }
        }
    };
    var k = null;
    this.lowestCompose = function(J) {
        if (J == null) {
            return k;
        } else {
            if (k == null) {
                k = J;
            } else {
                if (k.safeLowestPrice() > J.safeLowestPrice()) {
                    k = J;
                }
            }
        }
    };
    this.setSearchService = function(J) {
        if (I) {
            return;
        }
        I = J;
        $jex.event.binding(I, "interSearch", o);
        $jex.event.binding(I, "validQuery", y);
        $jex.event.binding(I, "invalidQuery", C);
        $jex.event.binding(I, "loadedLongwell", E);
        $jex.event.binding(I, "loadedFirstData", F);
        $jex.event.binding(I, "loadedOnewayData", l);
        $jex.event.binding(I, "loadedTransfer", A);
        $jex.event.binding(I, "loadedExtInfo", c);
        $jex.event.binding(I, "loadedAVData", s);
        $jex.event.binding(I, "parsingFlightPriceData", p);
        $jex.event.binding(I, "searchEnd", z);
        $jex.event.binding(I, "onerror", w);
        $jex.event.binding(I, "pastLessSecond", b);
        $jex.event.binding(I, "zyfLoaded", e);
        $jex.event.binding(I, "ipBlock", g);
        $jex.event.binding(I, "getQueryId", x);
        $jex.event.binding(I, "loadedGroupinfo", a);
        this.infoMgr().service(I);
        this.infoMgr().analyzer(this);
        this.infoMgr().entityManager(this.flightEntityMgr());
        u._initial();
    };
    this._initial = function() {
        f = new DataSet({
            defaultSort: [
                ["sortValue", false]
            ],
            filterFunc: {
                "航空公司": function(L, J, K) {
                    return [L.carrierCode()];
                },
                "起飞时间": function(J) {
                    return [J.deptTimeRangeValue()];
                },
                "机型": function(J) {
                    return J.planeType();
                },
                "起降机场": function(J) {
                    return J.airportCodes();
                },
                "方式": function(J) {
                    if (J.type == "compose") {
                        return "transfer";
                    }
                    return J.type;
                },
                "中转城市": function(J) {
                    return J.transferCity();
                }
            }
        });
        if (typeof FlightListUISorter != "undefined") {
            $jex.event.binding(f, "refreshCurrentPage", function(L, M, J, K) {
                FlightListUISorter.resort(L, M, J, K);
            });
        }
    };
    var n = function() {
        $jex.event.trigger(u, "updateFilter", {
            catalog: "航空公司",
            name: this.carrier().zh,
            value: this.flightInfo().ca
        });
        var L = this.deptTimeRange();
        $jex.event.trigger(u, "updateFilter", {
            catalog: "起飞时间",
            name: L.zh,
            value: L.value
        });
        var M = this.plane();
        $jex.foreach(M.type, function(N) {
            $jex.event.trigger(u, "updateFilter", {
                catalog: "机型",
                name: N,
                value: N
            });
        });
        var J = this.deptAirport();
        $jex.event.trigger(u, "updateFilter", {
            catalog: "起降机场",
            group: this.deptCityCode(),
            name: J.ab,
            value: J.key || J.code
        });
        var K = this.arriAirport();
        $jex.event.trigger(u, "updateFilter", {
            catalog: "起降机场",
            group: this.arriCityCode(),
            name: K.ab,
            value: K.key || K.code
        });
    };
    var r = function() {
        var N = this.firstTrip();
        if (this.carrierCode()) {
            $jex.event.trigger(u, "updateFilter", {
                catalog: "航空公司",
                name: N.carrier().zh,
                value: N.flightInfo().ca
            });
        }
        var L = N.deptTimeRange();
        $jex.event.trigger(u, "updateFilter", {
            catalog: "起飞时间",
            name: L.zh,
            value: L.value
        });
        var M = N.plane();
        $jex.foreach(M.type, function(P) {
            $jex.event.trigger(u, "updateFilter", {
                catalog: "机型",
                name: P,
                value: P
            });
        });
        var J = N.deptAirport();
        $jex.event.trigger(u, "updateFilter", {
            catalog: "起降机场",
            group: N.deptCityCode(),
            name: J.ab,
            value: J.key || J.code
        });
        N = this.secondTrip();
        var M = N.plane();
        $jex.foreach(M.type, function(P) {
            $jex.event.trigger(u, "updateFilter", {
                catalog: "机型",
                name: P,
                value: P
            });
        });
        var K = N.arriAirport();
        $jex.event.trigger(u, "updateFilter", {
            catalog: "起降机场",
            group: N.arriCityCode(),
            name: K.ab,
            value: K.key || K.code
        });
        var O = N.deptCity();
        $jex.event.trigger(u, "updateFilter", {
            catalog: "中转城市",
            name: O.zh,
            value: O.en
        });
    };
    this.hasWrapper = function(J) {
        return this.infoMgr().get("vendor", J);
    };
    this.resultData = function() {
        return f.currentPageData();
    };
    this.currentPageIndex = function() {
        return f.currentPage;
    };
    this.getDataSet = function() {
        return f;
    };
    this.getData = function() {
        return f.getData();
    };
    this.pageInfo = function() {
        var J = {
            pageCount: f.pageCount(),
            pageSize: f.pageSize(),
            pageIndex: f.pageIndex()
        };
        return J;
    };
    this.resetPageSize = function(J) {
        f.pageSize(J);
        $jex.event.trigger(u, "dataComplete");
    };
    this.gotoPage = function(J) {
        f.gotoPage(J);
        $jex.event.trigger(u, "dataComplete");
    };
    this.sort = function(J) {
        f.setPageIndex(0);
        f.sort(J);
        f.refresh();
        $jex.event.trigger(u, "dataComplete");
    };
    this.setFilter = function(J) {
        f.addFilter(J);
        f.setPageIndex(0);
        f.refresh();
        $jex.event.trigger(u, "dataComplete");
    };
    this.reload = function() {
        f.refreshPage();
        $jex.event.trigger(u, "dataComplete");
    };
    this.syncPriceData = function(M, J, K) {
        var N = function() {
            K();
        };
        var L = M.getWrapperListType();
        I.invoke_flightPriceData(M.key(), J, N, L);
    };

    function d(M) {
        var J = u.infoMgr();
        var P = u.onewayInfoMgr();
        var K = u.flightEntityMgr();
        var O = false;
        var L = false;
        var N = false;
        $jex.foreach(M, function(U, Q, S) {
            var R = f.hasItem(S);
            if (R) {
                R.update();
                O = true;
                HotSale.setMinLate(R);
            } else {
                var T = OnewayFlightEntity.tryCreate(S, J, P, K);
                if (T) {
                    HotSale.setMinLate(T);
                    n.call(T);
                    $jex.event.binding(T, "updating", function() {
                        switch (this.type) {
                            case "oneway":
                                u.lowestOneway(this);
                                break;
                            case "compose":
                                u.lowestCompose(this);
                                break;
                        }
                        if (this.updateSortKey) {
                            this.updateSortKey();
                        } else {
                            $jex.console.error("没有更新排序键的方法", this);
                        }
                    });
                    switch (T.type) {
                        case "oneway":
                            u.lowestOneway(T);
                            N = true;
                            break;
                        case "compose":
                            u.lowestCompose(T);
                            L = true;
                            break;
                    }
                    f.addItem(S, T);
                }
                O = true;
            }
        });
        if (O) {
            if (N) {
                $jex.event.trigger(u, "updateFilter", {
                    catalog: "方式",
                    name: "直达",
                    value: "oneway"
                });
            }
            if (L) {
                $jex.event.trigger(u, "updateFilter", {
                    catalog: "方式",
                    name: "中转联程",
                    value: "transfer"
                });
            }
            $jex.event.trigger(u, "preDataComplete");
            f.refresh();
            $jex.event.trigger(u, "dataComplete");
        }
    }

    function h(M) {
        var K = u.infoMgr();
        var J = u.transferInfoMgr();
        var L = u.flightEntityMgr();
        var N = false;
        $jex.foreach(M, function(S, O, R) {
            var Q = [];
            $jex.foreach(S, function(X, U, W) {
                X.co = W;
                var V = W + "_" + X.da + "-" + X.aa;
                var T = R.split("|");
                if (W == T[0]) {
                    Q[0] = V;
                } else {
                    if (W == T[2]) {
                        Q[1] = V;
                    }
                }
                J.addFlightInfoItem(V, X);
                J.addPriceDataItem(V, X.vl);
            });
            var P = TransferFlightEntity.tryCreate(Q, K, J, L);
            if (P) {
                r.call(P);
                u.lowestTransfer(P);
                f.addItem(R, P);
                N = true;
            }
        });
        if (N) {
            $jex.event.trigger(u, "updateFilter", {
                catalog: "方式",
                name: "中转联程",
                value: "transfer"
            });
            f.refresh();
            $jex.event.trigger(u, "dataComplete");
        }
    }

    function o() {
        var J = window.location.href.toString();
        window.location.href = J.replace("oneway_list.htm", "oneway_list_inter.htm");
    }

    function g() {
        window.location.href = "/twell/flight/busy.jsp?ret=" + encodeURIComponent(window.location.href.toString());
    }

    function y() {}

    function C() {}

    function F() {}

    function a(K) {
        if (!K.serc) {
            return;
        }
        var J = K.flightCode.split("|")[0].split("/")[0];
        var L = K.priceData[K.flightCode];
        var M = H(J);
        if (!$jex.$empty(L)) {
            $jex.hash.each(L, function(O, N) {
                N.pr = N.pr + M;
                N.npr = N.npr + M;
                N.bpr = N.bpr + M;
                N.vppr = N.vppr + M;
            });
        }
    }

    function H(J) {
        var K = (parseInt(J.substr(0, 2) + J.substr(J.length - 1), 36) + parseInt("0" + J.substr(2, J.length - 3), 10) * 36 * 36 * 36) % 97;
        return K;
    }

    function D(J) {
        if (!$jex.$empty(J)) {
            $jex.hash.each(J, function(M, L) {
                var K = M.split("|")[0].split("/")[0];
                var N = H(K);
                L.lowpr = L.lowpr + N;
            });
        }
    }

    function E(L) {
        var J = u.infoMgr();
        if (L.oneway_data && L.oneway_data.priceInfo && L.serc) {
            D(L.oneway_data.priceInfo);
        }
        J.addAirportSource(L.airportInfo.out);
        J.addAirportSource(L.airportInfo.ret);
        J.addVendorSource(L.vendors);
        J.addOriginalPrice(L.op);
        J.addNotWorkVendors(L.notWorkVendors);
        J.addSuperOTAMaxNum(L.SuperOTA_NUM || 0);
        var K = {};
        K[L.arrivalAirport.en] = L.arrivalAirport;
        K[L.departureAirport.en] = L.departureAirport;
        J.addCitySource(K);
        J.deptCityCode(L.departureAirport.en);
        J.arriCityCode(L.arrivalAirport.en);
    }

    function l(L) {
        var J = u.infoMgr();
        var M = u.onewayInfoMgr();
        J.addCarrierSource(L.carrierInfo);
        J.addPlaneSource(L.planeInfo);
        M.addFlightInfoSource(L.flightInfo);
        var K, N = 0;
        $jex.foreach(L.priceData, function(O) {
            $jex.foreach(O, function(P) {
                K = P.carrier;
                N++;
            });
        });
        if (K) {
            t(L, K, N);
        }
        if (L.labelType) {
            M.replacePriceData(L.priceData, L.labelType);
        }
        M.updateRecommendInfo(L.recommendInfo);
        M.addPriceGroupDataSource(L.flightPriceInfo);
        M.addPriceInfoSource(L.priceInfo);
        d(L.priceInfo);
    }

    function A(L) {
        var K = u.infoMgr();
        var J = u.transferInfoMgr();
        K.addAirportSource(L.airportInfo);
        K.addCarrierSource(L.carrierInfo);
        K.addPlaneSource(L.planeInfo);
        K.addCitySource(L.citylist);
        K.addVendorSource(L.vendors, {
            isOverwrite: false
        });
        K.addFlightLineVendorSource(L.flightLineVendors);
        J.addCorrSource(L.corrInfo);
        J.addExtInfoSource(L.extInfo);
        J.addPriceInfoSource(L.priceInfo);
        h(L.data);
    }

    function c(J) {
        var K = u.onewayInfoMgr();
        K.addCorrSource(J.corrInfo);
        K.addExtInfoSource(J.extInfo);
        $jex.console.info("已经加载直飞扩展信息数据");
    }

    function s(K) {
        var J = u.infoMgr();
        var L = u.onewayInfoMgr();
        J.addCarrierSource(K.carrierInfo);
        J.addPlaneSource(K.planeInfo);
        L.updateFlightInfoSource(K.flightInfo);
        d(K.flightInfo);
        $jex.console.info("已经加载AV数据");
    }

    function p(M) {
        var Q = M.flightCode,
            O = M.labelType;
        var J = u.infoMgr();
        var N = u.onewayInfoMgr();
        var K = [];
        var L = null;
        var P = 0;
        $jex.foreach(M.priceData, function(S, R, T) {
            K.push("<b>", "[", T, "] 所返回的报价:", "</b>");
            $jex.foreach(S, function(V) {
                L = V.carrier;
                K.push(V.wr || V.wrjid);
                var U = J.get("vendor", V.wr || V.wrid);
                if (U) {
                    K.push("(", U.name, ")");
                }
                K.push(" , ");
                P++;
            });
        });
        $jex.console.trace(K.join(""));
        t(M, L, P);
        N.replacePriceData(M.priceData, O);
        N.addPriceGroupDataSource(M.flightPriceInfo);
        N.addPriceInfoSource(M.priceInfo);
        N.updateRecommendInfo(M.recommendInfo);
        $jex.console.info("已经加载航班价格数据");
    }

    function t(N, R, L) {
        var J = ConfigManager.getConfig("NoNeedStatementList") || ["9C"];
        if ($jex.array.indexOf(J, R) > -1) {
            return;
        }
        var M = 18;
        var P = u.infoMgr();
        var Q = P.get("carrier", R);
        var T = Q ? (Q.maxvendors || M) : M;
        var O = P.get("notWork");
        if (!O) {
            return;
        }
        var S = O.out;
        if (!S || S < 1) {
            return;
        }
        var U = T - L;
        if (U <= 0) {
            return;
        }
        var K = S.slice(0, U);
        $jex.foreach(N.priceData, function(W, V, X) {
            if (X.indexOf("/") > -1) {
                return $jex.$continue;
            }
            $jex.foreach(K, function(Y) {
                var Z = Y + "_nw";
                W[Z] = {
                    wrid: Y,
                    type: "notWork",
                    sortRank: 10000000
                };
            });
        });
    }

    function x(M) {
        if (!M.serc) {
            return;
        }
        var O = M.queryID;
        var L = O.indexOf(":");
        var N = O.substr(0, L + 1);
        var K = O.substring(L + 1).split("");
        var J = [];
        $jex.array.each(K, function(P) {
            J.push(String.fromCharCode(P.charCodeAt(0) - 1));
        });
        J.reverse();
        M.queryID = N + J.join("");
    }

    function b() {
        if (f.getRecordCount() == 0) {
            $jex.event.trigger(u, "noResult");
        }
    }

    function e(K) {
        if (!K.total) {
            $jex.console.info("no zyf data!");
            return;
        }
        var J = u.infoMgr();
        J.addSource("zyfData", K.list);
    }

    function z() {
        if (f.getRecordCount() == 0) {
            $jex.event.trigger(u, "noResultEnd");
        }
        $jex.console.trace("搜索结束.");
        u.infoMgr().setDataLoad(true);
    }

    function w() {}
})();
var DomesticOnewaySearchService = new(function() {
    var v = false;
    var q = this;
    this.param = {};
    this.oparam = {};
    var p = $jex.isdebug ? "http://local.qunar.com" : "";
    var e = null;
    var t = 0;
    var y = new Date();
    var w = 0;
    var d = 0;
    var j = 0;
    var n = 0;
    var B = "";
    var h = "";
    var A = false;
    var f = false;
    var m = false;
    var x = null;
    this.longwell = function() {
        return x || {};
    };
    var c = [];
    var k = [];
    var b = null;
    var o = null;
    var u = "";
    var l = null;
    var s = false;
    this.isValidQuery = function(C) {
        if (C == null) {
            return s;
        } else {
            s = C;
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
    var r = null;
    this.tserver = function(C) {
        if (C == null) {
            return r;
        } else {
            r = C;
        }
    };
    this.search = function(E) {
        if (q.searchEnd()) {
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
        this._invoke_longwell();
        w = 1;
        e = new Date();
        setTimeout(function() {
            $jex.event.trigger(q, "pastLessSecond");
        }, 15000);
    };
    this.queryZYF = function() {
        var C = this;
        var D = p + "/zyf/api/ads.json";
        $jex.ajax(D, {
            dpt: C.param.fromCity,
            arr: C.param.toCity,
            dptDate: C.param.fromDate
        }, function(E) {
            if (E) {
                C._process_zyf(E);
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
                q.queryNext();
            }, 100);
        } else {
            if (m == false && d != 2) {
                q._invoke_AVData();
            } else {
                if (j != 2 && (d == 2 || (d != 2 && c.length >= 2))) {
                    $jex.console.info("queryNext:处理联程", " transferSearchState:", j, " isValidQuery:", x.isValidQuery, " onewayDatasLength:", c.length);
                    q._invoke_transfer();
                } else {
                    $jex.console.info("queryNext:处理直飞");
                    setTimeout(function() {
                        q._invoke_oneway();
                    }, t);
                }
            }
        }
    };
    this.genTraceTimeStamp = function() {
        if (CLIENT_TIME && SERVER_TIME) {
            q.traceTimeStamp = (new Date().getTime() - CLIENT_TIME.getTime()) + SERVER_TIME.getTime();
        } else {
            q.traceTimeStamp = new Date().getTime();
        }
    };
    this.genBookingTimeStamp = function() {
        if (CLIENT_TIME && SERVER_TIME) {
            q.wrapperExpandStamp = (new Date().getTime() - CLIENT_TIME.getTime()) + SERVER_TIME.getTime();
        } else {
            q.wrapperExpandStamp = new Date().getTime();
        }
    };
    this.genFilterTimeStamp = function() {
        if (CLIENT_TIME && SERVER_TIME) {
            q.filterTimeStamp = (new Date().getTime() - CLIENT_TIME.getTime()) + SERVER_TIME.getTime();
        } else {
            q.filterTimeStamp = new Date().getTime();
        }
    };
    this._invoke_longwell = function() {
        $jex.console.start("调用longwell");
        var F = this.param;
        var D = c;
        var E = {
            "http://www.travelco.com/searchArrivalAirport": F.toCity,
            "http://www.travelco.com/searchDepartureAirport": F.fromCity,
            "http://www.travelco.com/searchDepartureTime": F.fromDate,
            "http://www.travelco.com/searchReturnTime": F.fromDate,
            locale: "zh",
            nextNDays: "0",
            searchLangs: "zh",
            searchType: "OneWayFlight",
            tags: 1
        };
        l = {
            departureCity: F.fromCity,
            arrivalCity: F.toCity,
            departureDate: F.fromDate,
            returnDate: F.fromDate,
            nextNDays: "0",
            searchType: "OneWayFlight",
            searchLangs: "zh",
            locale: "zh"
        };
        $jex.merge(E, this.oparam);
        $jex.merge(l, this.oparam);
        var C = p + "/twell/longwell";
        $jex.ajax(C, E, function(I) {
            v && console.log("longwell回数", I, new Date());
            $jex.console.end("调用longwell");
            if (I.isLimit) {
                $jex.event.trigger(q, "ipBlock");
                return;
            }
            $jex.event.trigger(q, "getQueryId", I);
            x = I;
            q.queryId(I.queryID);
            l.queryID = I.queryID;
            l.serverIP = I.serverIP;
            var H = I.validate;
            if (H) {
                if (H.dept.country != "中国" || H.arri.country != "中国") {
                    $jex.event.trigger(q, "interSearch");
                    return;
                }
                if (H.dept.value == H.arri.value) {
                    $jex.event.trigger(q, "sameCity");
                    return;
                }
                $jex.event.trigger(q, "validateComplete", I.validate);
            }
            if (I.isBackendBusy) {
                $jex.event.trigger(q, "systemBusy");
                return;
            }
            if (I.isValidQuery) {
                q.isValidQuery(true);
                d = 1;
                $jex.event.trigger(q, "validQuery");
            } else {
                q.isValidQuery(false);
                d = 2;
                $jex.event.trigger(q, "invalidQuery");
            } if (!I.isTransferFlightsNeeded) {
                j = 2;
                $jex.event.trigger(q, "TransferDataReady");
            }
            $jex.event.trigger(q, "loadedLongwell", I);
            var G = I.oneway_data || {};
            setTimeout(function() {
                l.deduce = true;
                n = 1;
            }, 1000);
            if (!$jex.$empty(G.priceInfo)) {
                q._process_oneway(G);
            } else {
                $jex.event.trigger(q, "noOnewayData");
                q.queryNext();
            }
        }, {
            onerror: q._onerror
        });
    };
    this._invoke_oneway = function() {
        var E = c;
        if (n == 1) {
            $jex.console.info("本次为deduce jsp调用.");
            var D = p + "/twell/flight/tags/deduceonewayflight_groupdata.jsp";
        } else {
            var D = p + "/twell/flight/tags/onewayflight_groupdata.jsp";
        } if (h) {
            l.flightCode = h;
        }
        var C = h;
        this._lastGinfoData = null;
        $jex.ajax(D, l, function(F) {
            v && console.log("GROUP_DATA回数：", F, new Date());
            if (n == 1) {
                n = 2;
            }
            if (C !== h) {
                q.correctPriceInfo(F, h);
            }
            F.flightCode = C;
            q._process_oneway(F);
            if (l.deduce == true) {
                f = true;
            }
        }, {
            onerror: q._onerror
        });
    };
    this._process_oneway = function(D) {
        var C = c;
        l.status = D.status;
        C.push(D);
        if (!$jex.$empty(D.priceInfo)) {
            $jex.event.trigger(q, "loadedOnewayData", D);
            PAGE_EVENT.trigger("wrapper_loadData", D);
            if (!A) {
                $jex.event.trigger(q, "loadedFirstData", D);
                A = true;
            }
        } else {
            $jex.console.info("直飞价格数据为空.");
        } if (!D.dataCompleted) {
            $jex.console.info("dataCompleted:搜索未结束");
            if (new Date() - e > 60000) {
                $jex.console.info("dataCompleted:超时停止");
                d = 2;
                q.queryNext();
            } else {
                t = $jex.$defined(D.invokeInterval) ? D.invokeInterval * 2 : 100;
                y = new Date().getTime() + t;
                $jex.console.info("dataCompleted:继续搜索直飞,", t);
                q.queryNext();
            }
        } else {
            $jex.console.info("dataCompleted:搜索结束 , deduceJSPState:", n);
            if (n == 2) {
                d = 2;
            } else {
                n = 1;
            }
            this.queryNext();
        }
    };
    this._process_zyf = function(C) {
        $jex.event.trigger(q, "zyfLoaded", C);
    };
    this._invoke_transfer = function() {
        if (q.searchEnd()) {
            return;
        }
        $jex.console.info("---->调用联程");
        var D = $jex.merge({}, l);
        if (j == 1) {
            D.isReSearch = true;
        }
        var C = p + "/twell/flight/tags/OneWayFlight_data_more.jsp";
        $jex.ajax(C, D, function(E) {
            v && console.log("transfer回数：", E, new Date());
            k.push(E);
            q.tserver(E.server);
            if (E.needNewSearch == true) {
                j = 1;
                $jex.console.info("[联程需要再次调用 ] data.needNewSearch:", E.needNewSearch);
                setTimeout(function() {
                    q.queryNext();
                }, 3500);
            } else {
                $jex.event.trigger(q, "TransferDataReady");
                if (!$jex.$empty(E.data)) {
                    $jex.event.trigger(q, "loadedTransfer", E);
                    if (!A) {
                        $jex.event.trigger(q, "loadedFirstData", E);
                        A = true;
                    }
                } else {
                    $jex.event.trigger(q, "noTransferData", E);
                    $jex.console.info("联程价格数据为空.");
                }
                j = 2;
                q.queryNext();
                t = Math.max(new Date() - y, 0);
            }
        }, {
            onerror: q._onerror
        });
    };
    this.syncCurrentFlightCode = function(C) {};
    var a = "all";
    this.invoke_flightPriceData = function(G, E, F, D) {
        a = D;
        if (E) {
            B = G;
        } else {
            h = G;
            B = "";
        }
        var C = function() {
            if (D === a) {
                F && F();
            }
        };
        q._invoke_flightPriceData(G, C);
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
    this._invoke_flightPriceData = function(F, E) {
        $jex.console.info("[invoke_flightPriceData]开始调用直飞航班价格数据: flightCode:", F);
        var D = p + "/twell/flight/tags/onewayflight_groupinfo.jsp";
        var C = a;
        l.flightCode = F;
        l.label = a;
        this._lastGinfoData = null;
        $jex.ajax(D, l, function(G) {
            v && console.log("groupInfo", G);
            G.flightCode = F;
            G.labelType = C;
            $jex.event.trigger(q, "loadedGroupinfo", G);
            q._lastGinfoData = G;
            $jex.event.trigger(q, "parsingFlightPriceData", G);
            if (E) {
                E();
            }
            $jex.console.info("[invoke_flightPriceData] 处理完毕");
            PAGE_EVENT.trigger("wrapper_loadData", G);
        }, {
            onerror: q._onerror
        });
    };
    this.searchEnd = function() {
        if (w == 2) {
            return true;
        }
        if (w != 2 && d == 2 && j == 2) {
            w = 2;
            $jex.event.trigger(q, "searchEnd");
            $jex.console.info("searchEND ::: OK ");
            return true;
        }
        return false;
    };
    this.isSearchEnd = function() {
        return w == 2;
    };
    this._invoke_ExtInfo = function() {
        $jex.console.info("调用扩展信息及准点率");
        var E = this.param;
        var C = p + "/twell/flight/DynamicFlightInfo.jsp";
        var D = {
            departureCity: E.fromCity,
            arrivalCity: E.toCity,
            departureDate: E.fromDate,
            fromCity: E.fromCity,
            toCity: E.toCity
        };
        $jex.merge(D, this.oparam);
        $jex.ajax(C, D, function(F) {
            v && console.log("扩展信息回数：", F, new Date());
            b = F;
            $jex.event.trigger(q, "loadedExtInfo", F);
        }, {
            onerror: q._onerror
        });
    };
    this._invoke_AVData = function() {
        $jex.console.info("调用AV数据");
        var C = p + "/twell/flight/OneWayFlight_Info.jsp";
        $jex.ajax(C, l, function(D) {
            v && console.log("AVData回数：", D, new Date());
            o = D;
            $jex.event.trigger(q, "loadedAVData", D);
            m = true;
            if (!$jex.$empty(D.flightInfo)) {
                if (!A) {
                    $jex.event.trigger(q, "loadedFirstData", D);
                    A = true;
                }
            }
            q.queryNext();
        }, {
            onerror: q._onerror
        });
    };
    this._onerror = function() {
        $jex.event.trigger(q, "onerror", arguments);
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
    var l = 1000;
    var n = {};

    function c(o) {
        var p = System.service.param;
        return {
            queryID: System.service.queryId(),
            departureCity: p.fromCity,
            arrivalCity: p.toCity,
            departureDate: p.fromDate,
            returnDate: p.fromDate,
            flightCode: o.split("_")[0],
            label: o.split("_")[1]
        };
    }

    function b(o) {
        var p = f(o);
        p.param = p.param || c(o);
        p.param.interceptTime = p.lastTime;
        return p.param;
    }

    function f(o) {
        n[o] = n[o] || {};
        return n[o];
    }

    function k(p, o) {
        var q = b(p);
        $jex.ajax(a, q, o, {
            onerror: function() {
                o();
            }
        });
    }

    function d(p, r) {
        var q = r.lastTime;

        function o(s) {
            if (r.lastTime > q) {
                return;
            }
            if (s.ret === false) {
                h(p);
            } else {
                r.interval = s.interval;
                r.data = $jex.extend(r.data || {}, s.priceData);
                r.lastTime = s.interceptTime;
            }
        }
        k(p, function(s) {
            if (s) {
                o(s);
            }
            m(p);
        });
    }

    function j(o) {
        m(o);
    }

    function m(o) {
        var p = f(o);
        if (p._timer === -1) {
            return;
        }
        clearTimeout(p._timer);
        p._timer = setTimeout(function() {
            if (p.lastTime) {
                d(o, p);
            } else {
                m(o);
            }
        }, p.interval || g);
    }

    function h(o) {
        var p = n[o];
        if (p) {
            clearTimeout(p._timer);
            p._timer = -1;
        }
    }
    var e = {};
    e.initData = function(o, q) {
        var p = f(o);
        p.lastTime = q;
        p.interval = l;
        p.data = {};
    };
    e.pause = function(o) {
        h(o);
    };
    e.start = function(o) {
        var p = f(o);
        if (p._timer === -1) {
            p._timer = null;
        }
        p.interval = l;
        j(o);
    };
    e.getPriceInfo = function(p, o) {
        var q = n[p];
        return q && q.data && q.data[o];
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
TransferFlightEntity.tryCreate = function(j, f, c, g) {
    var a = j[0];
    var e = j[1];
    var b = SingleTripFlightEntity.tryCreate(a, f, c);
    var h = SingleTripFlightEntity.tryCreate(e, f, c);
    if (!b || !h) {
        return null;
    }
    var d = new TransferFlightEntity();
    d.key(j);
    d.firstTrip(b);
    d.secondTrip(h);
    d.commInfoMgr(f);
    d.flightInfoMgr(c);
    d.update();
    g.put(j, d);
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
var FlightListUISorter = {};
$jex.exec(function() {
    var b = null;
    var a = null;
    FlightListUISorter.userSorted = function(c) {
        if (c == null) {
            return a;
        } else {
            a = c;
        }
    };
    FlightListUISorter.open = function(c) {
        if (c.isAV && c.isAV()) {
            return;
        }
        b = c;
        var d = $jex.offset($jex.$("resultAnchor"));
        window.scrollTo(d.left, d.top);
    };
    FlightListUISorter.close = function() {
        b = null;
    };
    FlightListUISorter.resortPage = function(e) {
        if (!b) {
            return;
        }
        for (var d = 0, c = e.length; d < c; d++) {
            if (e[d] === b) {
                e.splice(d, 1);
                e.splice(0, 0, b);
                break;
            }
        }
    };
    FlightListUISorter.sortPrice = function(f, d) {
        var c = ConfigManager.getConfig("NonStrikingCarrier", f);
        if (c) {
            d -= c;
        }
        var e = ConfigManager.getConfig("StrikingCarrier", f);
        if (e) {
            d += e;
        }
        return d;
    };
    FlightListUISorter.resort = function(v, h, w, L) {
        var s = 999999;
        if (FlightListUISorter.userSorted()) {
            return {};
        }
        $jex.console.start("FlightListUISorter.resort");
        var M = [];
        var m = function(k) {
            if (h[k] != null) {
                var n = h[k].lowestPrice();
                if (n != null) {
                    return n;
                } else {
                    return s;
                }
            }
        };
        var x = function(k) {
            if (h[k] != null) {
                var n = FlightListUISorter.sortPrice(h[k].carrierCode(), h[k].lowestPrice());
                if (n != null) {
                    return n;
                } else {
                    return s;
                }
            }
        };
        v.sort(function(n, k) {
            return m(n) - m(k);
        });
        var q;
        var t;
        var N;
        var j = [];
        var D = 0;
        for (var J = 0; J < v.length; J++) {
            var H = v[J];
            if (h[H].type == "oneway") {
                q = H;
                t = h[H].carrierCode();
                N = m(H) + h[H].totalTax();
                D = J;
                v.splice(D, 1);
                break;
            }
        }
        var B = [];
        var e;
        var d;
        var r = [];
        var C;
        var K;
        var I = ConfigManager.getConfig("PayCarrierSort");
        for (var z in I) {
            if (I.hasOwnProperty(z)) {
                I[z] = [];
            }
        }
        var F = [];
        var l = [];
        var f, u;
        var c = [];
        $jex.foreach(v, function(k) {
            if (h[k].type == "oneway") {
                f = h[k].carrierCode();
                u = m(k);
                if (u != s && f != t && f in I) {
                    if ($jex.array.indexOf(I[f], k) < 0) {
                        I[f].push(k);
                    }
                } else {
                    if (u == s) {
                        j.push(k);
                    } else {
                        c.push(k);
                    }
                }
            } else {
                if (h[k].type == "transfer") {
                    r.push(k);
                } else {
                    if (h[k].type == "compose") {
                        B.push(k);
                    }
                }
            }
        });
        if (B.length > 0) {
            d = m(B[0]) + h[B[0]].totalTax();
            if (d < N) {
                e = B[0];
                B.splice(0, 1);
            }
        }
        if (r.length > 0) {
            K = m(r[0]) + h[r[0]].totalTax();
            if (K < N) {
                C = r[0];
                r.splice(0, 1);
            }
        }
        $jex.foreach(I, function(k) {
            if (k.length > 0) {
                k.sort(function(p, n) {
                    return x(p) - x(n);
                });
                F.push(k[0]);
                k.splice(0, 1);
                l = l.concat(k);
            }
        });
        c = c.concat(l);
        c.sort(function(n, k) {
            return x(n) - x(k);
        });
        c = c.concat(B);
        c = c.concat(r);
        var G = [];
        var o;
        var g = [];
        if (q != undefined && q != "") {
            G.push(q);
        }
        if (e != undefined && e != "") {
            G.push(e);
        }
        if (C != undefined && C != "") {
            G.push(C);
        }
        g = g.concat(F);
        if (G.length < 15) {
            o = 15 - G.length - F.length;
            g = g.concat(c.splice(0, o));
        }
        var y = [];
        var E = [];
        for (var J = 0, A = g.length; J < A; J++) {
            if (h[g[J]].type != "transfer" && h[g[J]].type != "compose") {
                E.push(g[J]);
            } else {
                y.push(g[J]);
            }
        }
        E.sort(function(n, k) {
            return x(n) - x(k);
        });
        G = G.concat(E, y);
        M = M.concat(G, c, j);
        v.splice(0, v.length);
        $jex.foreach(M, function(n) {
            v.push(n);
        });
        $jex.event.trigger(FlightListUISorter, "dosort", v, h);
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
    b.renderPrevpage = function(j) {
        a.append("<a ", "prev", ' href="#" value="-1"> 上一页 </a>');
        d.push("prev");
    };
    b.renderNextpage = function(j) {
        a.append("<a ", "next", ' href="#" value="-2">下一页 </a>');
        d.push("next");
    };
    b.renderPage = function(j, k) {
        if (k) {
            a.text("<em>", j + 1, "</em>");
        } else {
            a.append("<a ", "p" + j).text(' href="#" value="', j, '">', j + 1, "</a>");
            d.push("p" + j);
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
            (function(m) {
                $jex.event.binding(j.find(m), "click", function(n) {
                    j.go(parseInt(this.getAttribute("value"), 10));
                    $jex.stopEvent(n);
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
    b.renderPrevpage = function(j) {
        a.append("<a ", "prev", ' href="#" value="-1"> 上一页 </a> ');
        d.push("prev");
    };
    b.renderNextpage = function(j) {
        a.append("<a ", "next", ' href="#" value="-2">下一页 </a> ');
        d.push("next");
    };
    b.renderPage = function(j, k) {
        if (k) {
            a.text("<em>", j + 1, "</em> ");
        } else {
            a.append("<a ", "p" + j).text(' href="#" value="', j, '">', j + 1, "</a> ");
            d.push("p" + j);
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
        var l = ['<div class="b_pop_bjprc">', '<div class="e_btm_fliter"></div>', '<div class="e_box_fliter"></div>', '<div class="e_pop_bjprc">', '<div class="m_pop_bjprc">', "<h3>", f, '</h3><div class="prc_bjpop"><em id="js-progress_loading" style="width: 1%"></em></div></div></div></div>'].join("");
        $jex.lightbox.show(l);
        $jex.lightbox.overlay.style.backgroundColor = "#fff";
        var j = $jex.$("js-progress_loading");
        var o = 0,
            n = 100,
            m = 20,
            q = 0;
        var p = Math.floor(g / m);

        function k() {
            j.style.width = Math.ceil(a(q, o, n, m)) + "%";
            if (q < m) {
                q++;
                setTimeout(k, p);
            } else {
                h && h();
            }
        }
        k();
    };
})();

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
        this.moveToFirst();
        var a = this.vlistui();
        a.dataSource(this.dataSource());
        a.updateSource();
        a.render(this.find("vendorlist"));
        $jex.element.show(this.find("vendorlist"));
        $jex.addClassName(this.find("itemBar"), "avt_column_on");
        this.state(1);
        $jex.event.trigger(this, "open");
    } else {
        this.hideVendorPanel();
    }
};
TransferFlightUI.prototype.hideVendorPanel = function() {
    $jex.element.hide(this.find("vendorlist"));
    $jex.removeClassName(this.find("itemBar"), "avt_column_on");
    this.state(0);
    $jex.event.trigger(this, "close");
};
TransferFlightUI.prototype._insertColums = function(c, a) {
    var d = a ? c.secondTrip() : c.firstTrip();
    this.text('<div class="c0">');
    this.text('    <div class="a_logo"><img width="16" height="16" title="', d.carrier().full, '" alt="', d.carrier().full, '" src="http://source.qunar.com/site/images/airlines/small/', d.carrier().key, '.gif"></div>');
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
    this.text('<div class="a_tm_arv">', d.arriTime());
    if (d.isNextDate()) {
        this.text('<i class="i_1day" title="到达时间为第2天：', d.arriDate(), "&nbsp;", d.arriTime(), '"></i>');
    }
    this.text("</div>");
    this.text("</div>");
    this.text('<div class="c3">');
    this.text('    <div class="a_lacal_dep">', d.deptAirport().ab, d.dptTower(), "</div>");
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
    var c = new TransferFlightWrapperListUI({
        handler: {
            createWrapperUI: function() {
                return new SingleTripFlightWrapperUI();
            }
        }
    });
    c.dataSource(d);
    c.updateSource();
    this.append("<div", f.id, ' style="z-index:' + f.zIndex + ';position:relative;">');
    var a = f.id + "_h";
    this.text('<div class="e_qvt_route">');
    this.text('<div class="m_route_ifo">');
    this.append("", b, "");
    this.text("</div>");
    this.append("<h3 ", a, "");
    this.text(">第", f.msg, "程&nbsp;", g.deptCity().zh, "&nbsp;-&nbsp;", g.arriCity().zh, "</h3>");
    this.text("</div>");
    this.append("", c, "");
    if (g.wrappers().size() > 4) {
        this.text('<div class="qvt_col_more qvt_col_more_hover">');
        this.append("<a", f.goid, '  data-evtDataId="' + this.newid("") + '"  hidefocus="true" href="#" class="lnk_more">第' + f.msg + '程所有报价<i class="ico_arr_more"></i></a>');
        this.text("</div>");
    }
    this.text("</div>");
    this.onInit(function() {
        var e = this;
        setTimeout(function() {
            try {
                var h = e.find(a);
                if (h.offsetHeight > 30) {
                    $jex.addClassName(h.parentNode, "e_qvt_route_oth");
                }
            } catch (j) {}
        }, 10);
    });
    b = c = d = f = null;
};
TransferFlightVendorListUI.prototype.update = function(a) {
    this.clear();
    this.text('<div class="b_qvt_lst">');
    this.text('<div class="qvt_arr_t"><p class="arr_o">◆</p><p class="arr_i">◆</p></div>');
    this.text('<div class="e_qvt_warn">');
    this.text('    <p>每段航班需分别缴纳税费，请确认两航班均有效再付款。详情查看《<a target="_blank" href="http://www.qunar.com/site/zh/Multi-city.shtml?', new Date().getTime(), '">中转程机票购买须知</a>》</p>');
    this.text("</div>");
    var d = false,
        c = null;
    var b = {
        id: "transfer_p1",
        zIndex: 3,
        goid: "gotoFirstDetail",
        msg: "一"
    };
    c = a.firstTrip();
    if (c.type && c.type == "compose") {
        b.msg = "一，二";
        d = true;
    }
    this._insertOneWrapper(c, b);
    c = a.secondTrip();
    b.id = "transfer_p2";
    b.goid = "gotoSecondDetail";
    b.zIndex = 2;
    if (d == true) {
        if (c.type && c.type == "compose") {
            b.msg = "三，四";
        } else {
            b.msg = "三";
        }
    } else {
        if (c.type && c.type == "compose") {
            b.msg = "二，三";
        } else {
            b.msg = "二";
        }
    }
    this._insertOneWrapper(c, b);
    this.text('<div class="qvt_col_hide">');
    this.append("<a ", "btnHide", ' data-evtDataId="' + this.newid("") + '" class="lnk_more lnk_more_hd"  href="##">隐藏报价<i class="ico_down"></i></a>');
    this.text("</div>");
    this.text("</div>");
    this.append("<div", "extAd_panel", ' class="extAD"></div>');
    this.onInit(function() {
        var e = this;
        clearTimeout(e._ad_timer);
        e._ad_timer = setTimeout(function() {
            var f = e.newid("extAd");
            var g = e.find("extAd_panel");
            if (g) {
                g.innerHTML = '<iframe id="' + f + '" querystring="chan=flight&pg=list&pos=mid&site=qunar&size=728x90" scrolling="no" frameborder="0" height="0" width="100%" src="/site/adframe/ad.html#' + f + '#now"></iframe>';
            }
        }, 100);
    });
    c = b = a = null;
};

function TransPackageFlightWrapperUI(a) {
    TransPackageFlightWrapperUI.superclass.constructor.call(this, a);
    this._type = "TransPackageFlightWrapperUI";
    this._itemClass = "qvt_column qvt_column_transep";
}
$jex.extendClass(TransPackageFlightWrapperUI, OnewayFlightWrapperUI);
TransPackageFlightWrapperUI.prototype._insertH3 = function(a) {
    this.text('<div class="vsep"><dl><dt>中转</dt><dd>特价包</dd></dl></div>');
    TransPackageFlightWrapperUI.superclass._insertH3.call(this, a);
};
TransPackageFlightWrapperUI.prototype.insert_BOOKING_BUTTON = function(a) {
    this._buttonHTML("bpr", a);
};
$jex.register("TransPackageFlightWrapperUI", TransPackageFlightWrapperUI);

function TransferFlightWrapperListUI(a) {
    TransferFlightWrapperListUI.superclass.constructor.call(this, a);
}
$jex.extendClass(TransferFlightWrapperListUI, WrapperListUI);

function SingleTripFlightWrapperUI(a) {
    SingleTripFlightWrapperUI.superclass.constructor.call(this, a);
    this._type = "SingleTripFlightWrapperUI";
}
$jex.extendClass(SingleTripFlightWrapperUI, OnewayFlightWrapperUI);
var RoundTripFlightRecommend = function(a) {
    this.packagelist = a.packagelist.normal;
    if (this._isEmptyObj(this.packagelist)) {
        return;
    }
    this.ele = document.getElementById("divOTA");
    if (!this.ele) {
        return;
    }
    this.reData = [];
    this.out = a.out || {};
    this.re = a.re || {};
    this.outSuffix = this._getSuffix(this.out);
    this.reSuffix = this._getSuffix(this.re);
    this.from = this.outSuffix.split("-")[0];
    this.to = this.outSuffix.split("-")[1];
    this.host = "http://flight.qunar.com/twell/flight/Search.jsp?";
    this.param = {
        from: "flight_youce_wangfantuijian",
        searchType: "RoundTripFlight",
        fromCity: this.outSuffix.split("-")[0],
        toCity: this.outSuffix.split("-")[1]
    };
    this.init();
    this.render();
    this.bindEvent();
};
RoundTripFlightRecommend.prototype = {
    constructor: RoundTripFlightRecommend,
    init: function() {
        var m = this,
            g = 0;
        for (i in this.packagelist) {
            var d = this.packagelist[i],
                b = i;
            var c = b.split("|")[0],
                a = b.split("|")[1];
            var j = new Date($jex.date.parse(c)).getTime(),
                l = new Date($jex.date.parse(a)).getTime();
            if ((l - j) / (1000 * 60 * 60 * 24) <= 9) {
                var f = parseInt(m.out[c + "|" + m.outSuffix].pr, 10),
                    e = parseInt(m.re[a + "|" + m.reSuffix].pr, 10),
                    k = f + e,
                    h = parseInt(d.pr, 10);
                if (h < k) {
                    if (g > 8) {
                        break;
                    }
                    g++;
                    m.reData.push(m.buildData(h, k, e, c, a));
                }
            }
        }
        this._sort_reData();
    },
    render: function() {
        if (this.reData.length < 1) {
            return;
        }
        var c = 0,
            b = this.reData.length,
            a = [],
            f = [],
            d = document.createElement("div");
        for (; c < b; c++) {
            a.push(e(this.reData[c]));
        }

        function e(h) {
            var g = ["<li>", '<a href="', h.url, '" target="_blank" class="a_blk">', '   <div class="m1"><span class="s_day">', h.o, '去</span>&nbsp;&nbsp;<span class="s_day">', h.r, '回</span>&nbsp;&nbsp;<span class="s_prc s_oldprc"><i class="rmb">&yen;</i>', h.tp, "</span></div>", '   <div class="m2">特价包&nbsp;&nbsp;<span class="s_prc"><i class="rmb">&yen;</i>', h.p, '</span>&nbsp;&nbsp;<span class="highlight">节省<span class="s_prc"><i class="rmb">&yen;</i>', h.d, "</span></span></div>", "</a>", "</li>"].join("");
            return g;
        }
        f.push('<div class="b_rec_sqwp">');
        f.push('    <div class="b_rec_sq">');
        f.push('        <div class="bg_sq"></div>');
        f.push('        <div class="e_sq_tit"> 往返一起买 </div>');
        f.push('        <div class="e_sq_cont">');
        f.push('            <div class="m_sq_ct">', this.from, '<i class="ico_wf_sq"></i>', this.to, "</div>");
        f.push('            <ul class="ul_wf_rec">');
        f.push(a.join(""));
        f.push("             </ul>");
        f.push("        </div>");
        f.push("    </div>");
        f.push("</div>");
        d.id = "reRoundFlightPackage";
        d.innerHTML = f.join("");
        this.ele.parentNode.insertBefore(d, this.ele);
    },
    bindEvent: function() {
        if (this.reData.length < 1) {
            return;
        }
    },
    _sort_reData: function() {
        this.reData.sort(function(d, c) {
            return new Date(d.rt).getTime() - new Date(c.rt).getTime();
        });
    },
    _getSuffix: function(b) {
        var a;
        for (i in b) {
            a = i.split("|")[1];
            break;
        }
        return a;
    },
    _isEmptyObj: function(b) {
        for (var a in b) {
            return false;
        }
        return true;
    },
    buildData: function(b, k, f, e, a) {
        this.param.fromDate = e;
        this.param.toDate = a;
        var g = k - b,
            c = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        e = e.replace(/-/g, "/");
        a = a.replace(/-/g, "/");
        var j = c[new Date(e).getDay()],
            h = c[new Date(a).getDay()];
        return {
            p: b,
            d: g,
            rp: f,
            o: e.substring(e.indexOf("/") + 1),
            r: a.substring(a.indexOf("/") + 1),
            rt: a,
            url: this.host + $jex.toQueryString(this.param),
            tp: k
        };
    }
};
var SpringHotRoundtrip = (new function() {
    var service = DomesticOnewaySearchService;
    var analyzer = DomesticOnewayDataAnalyzer;
    this.initialize = function(args) {
        this.args = args;
        this._DATACACHE = {};
        this.config = args.config;
        this.searchDate = args.searchDate;
        this.isToday = ($jex.date.format(this.searchDate) == $jex.date.format(SERVER_TIME));
        this.offsetToday = Math.floor((this.searchDate - $jex.date.parse($jex.date.format(SERVER_TIME))) / 24 / 3600000);
        this.dc = args.dc;
        this.ac = args.ac;
        var _cityStr = this.dc + "-" + this.ac;
        var _queryStr = [$jex.date.format(this.searchDate), "|", _cityStr].join("");
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
                    var day210 = 210 * 24 * 60 * 60 * 1000;
                    var idx = 1;
                    _OUT.write('<ul class="ul_flt_date">');
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
                                if (day.date == currentDate) {
                                    _OUT.write(' class="cur" id="js-sevenday_cur"');
                                }
                                _OUT.write(">");
                                _OUT.write('<p class="date">');
                                _OUT.write(_MODIFIERS.GetTitle(day.date));
                                _OUT.write("</p>");
                                if ((deptDate - (SERVER_TIME || new Date())) <= day210) {
                                    _OUT.write('<p class="price">');
                                    if (day.price > 0) {
                                        _OUT.write('<i class="rmb">&yen;</i>');
                                        _OUT.write(day.price);
                                    } else {
                                        _OUT.write("查看");
                                    }
                                    _OUT.write("</p>");
                                }
                                _OUT.write("</li>");
                            }
                            var idx = idx + 1;
                        }
                    }
                    _OUT.write('<li class="prc_cld" ><p id="priceCd" class=\'m_pc\'>价格<br>日历</p><div style="display: none;" id="priceCalendar" class="prCd"></div></li>');
                    _OUT.write("</ul>");
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
                    _OUT.write('     <h3><span class="close" onclick="SpringHotRoundtrip.closePriceCalendar()"></span><span id="pcDown" class="prev" ');
                    if (prevMonth) {
                        _OUT.write("onclick=\"SpringHotRoundtrip.getPriceData('" + prevMonthDate + "')\"");
                    } else {
                        _OUT.write(' style="visibility:hidden;cursor:default;"');
                    }
                    _OUT.write('></span><span class="next" id="pcUp" ');
                    if (nextMonth) {
                        _OUT.write("onclick=\"SpringHotRoundtrip.getPriceData('" + nextMonthDate + "')\"");
                    } else {
                        _OUT.write(' style="visibility:hidden;cursor:default;"');
                    }
                    _OUT.write('></span><span class="ymd">');
                    _OUT.write(date.getFullYear());
                    _OUT.write("年 ");
                    _OUT.write(date.getMonth() + 1);
                    _OUT.write('月</span></h3><table cellspacing="0" cellpadding="0" border="0">     <tr>     <th>一</th>     <th>二</th>     <th>三</th>     <th>四</th>     <th>五</th>     <th class="sday">六</th>     <th class="sday">日</th>     </tr>');
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
                    _OUT.write("</table>");
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
    this.tempalte_roundtripprice = function(context, __onerror) {
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
                    _OUT.write('    <div class="Lw_TitleDiv">');
                    _OUT.write(fromCity);
                    _OUT.write("-");
                    _OUT.write(toCity);
                    _OUT.write(" ");
                    _OUT.write(deptDate);
                    _OUT.write('去 往返价格</div>    <table cellspacing="0" cellpadding="0" class="doubleLowPrice">    <tr>        <th class="date">回程日期</th>        <th>回程最低</th>        <th>往返最低</th>        <th>&nbsp;</th>    </tr>    <tr>');
                    var __LIST__info = infos;
                    if ((__LIST__info) != null) {
                        var info_ct = 0;
                        for (var info_index in __LIST__info) {
                            info_ct++;
                            if (typeof(__LIST__info[info_index]) == "function") {
                                continue;
                            }
                            var info = __LIST__info[info_index];
                            _OUT.write('    <tr onmouseover="$jex.addClassName(this,\'highLight\')" onmouseout="$jex.removeClassName(this,\'highLight\')">        <td class="date">');
                            _OUT.write(info.returnDate);
                            _OUT.write('</td>        <td><a href="');
                            _OUT.write(info.returnUrl);
                            _OUT.write('&from=oneway_search" onclick="trackAction(\'FL|O2R|O\')" target="_blank">');
                            if (info.returnPrice == returnLowestPrice) {
                                _OUT.write("<em>&yen;</em><strong>");
                                _OUT.write(info.returnPrice);
                                _OUT.write("</strong>");
                            } else {
                                _OUT.write("&yen;");
                                _OUT.write(info.returnPrice);
                            }
                            _OUT.write('</a></td>        <td><a href="');
                            _OUT.write(info.packageUrl);
                            _OUT.write('&from=oneway_search" onclick="trackAction(\'FL|O2R|R\')" target="_blank"');
                            if (info.deltaPrice > 0) {
                                _OUT.write('class="lowAd"');
                            }
                            _OUT.write(">");
                            if (info.lowestPrice == roundtripLowestPrice) {
                                _OUT.write("<em>&yen;</em><strong>");
                                _OUT.write(info.lowestPrice);
                                _OUT.write("</strong>");
                            } else {
                                _OUT.write("&yen;");
                                _OUT.write(info.lowestPrice);
                            }
                            _OUT.write("</a></td>");
                            if (info.deltaPrice > 0) {
                                _OUT.write('            <td delta="');
                                _OUT.write(info.deltaPrice);
                                _OUT.write('" class="lowAd">(再省&yen;');
                                _OUT.write(info.deltaPrice);
                                _OUT.write(")</td>");
                            } else {
                                _OUT.write('            <td delta="');
                                _OUT.write(info.deltaPrice);
                                _OUT.write('"></td>');
                            }
                            _OUT.write("    </tr >");
                        }
                    }
                    _OUT.write("    </table>");
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
    this.load = function() {
        if (!service.isValidQuery()) {
            this.sevenday();
            return;
        }
        var _goDate = $jex.date.format(this.searchDate);
        if (this.offsetToday > 0) {
            var x = new Date(this.searchDate.getTime() - Math.min(3, this.offsetToday) * 24 * 3600000);
            _goDate = $jex.date.format(x);
        }
        var _count = 90;
        var _URL = ["http://ws.qunar.com/all_lp.jcp?", "from=", encodeURIComponent(this.dc), "&to=", encodeURIComponent(this.ac), "&goDate=", _goDate, "&backDate=", _goDate, "&count=", _count, "&packto=", $jex.date.format(this.searchDate), "&packreturn=", $jex.date.format(new Date(this.searchDate.getTime() + 2 * 24 * 3600000)), "&packcount=9", "&output=json&n=", Math.random()].join("");
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
        this.rtFlightRecommend = new RoundTripFlightRecommend(data);
        this.sevenday();
        this.updateSevenDayToday();
        this.springRoundRecommend_Load();
    };
    this.updateSevenDayToday = function(price) {
        price = analyzer.lowestPrice();
        if (!price || price == Number.MAX_VALUE) {
            return;
        }
        this.nowprice = price;
        var curLi = $jex.$("js-sevenday_cur");
        if (curLi) {
            var p = curLi.getElementsByTagName("p");
            if (p[1]) {
                p[1].innerHTML = '<i class="rmb">&yen;</i>' + price;
                $jex.$("searchDateBar").style.display = "block";
            }
        }
        var c = $jex.$("pcurrentDate");
        if (c) {
            c.getElementsByTagName("span")[0].innerHTML = '<i class="rmb">&yen;</i><b>' + price + "</b>";
        }
        if (this.cacheData && this.cacheData.out && this.cacheData.out[this._queryStr]) {
            this.cacheData.out[this._queryStr].pr = this.nowprice;
        } else {
            this.cacheData = {
                out: {}
            };
            this.cacheData.out[this._queryStr] = {
                pr: this.nowprice,
                dt: $jex.date.format(this.searchDate)
            };
        }
    };
    this.sevenday = function() {
        var hostDiv = $jex.$("searchDateBar");
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
        var offsetToday = this.offsetToday,
            min = 3;
        if (offsetToday > 207) {
            min += (offsetToday - 207);
        }
        var _startDate = new Date(this.searchDate.getTime() - Math.min(min, offsetToday) * 24 * 3600000);
        this.eachDay(function(day) {
            var _dstr = $jex.date.format(day);
            _data[_dstr] = {
                date: _dstr,
                price: getDatePrice(_dstr)
            };
            if (getDatePrice(_dstr) == 0) {
                _noPriceData.push(true);
            }
            return true;
        }, _startDate, 7);
        if (_noPriceData.length < 7) {
            $jex.element.show($jex.$("searchDateBar"));
            $jex.element.show($jex.$("searchDateBar_bottom"));
        }
        $jex.$("searchDateBar").innerHTML = this.template_sevenday({
            days: _data,
            currentDate: $jex.date.format(this.searchDate),
            _MODIFIERS: {
                GetTitle: function(date) {
                    return date.replace(/.*\d{4}-(.*)/, "$1") + " " + ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][$jex.date.parse(date).getDay()];
                }
            }
        });
        var ul = $jex.$("searchDateBar").getElementsByTagName("ul")[0];
        if (ul) {
            var lis = ul.getElementsByTagName("li");
            $jex.array.each(lis, function(li, i) {
                if ($jex.ie == 6) {
                    $jex.hover({
                        act: li,
                        onmouseover: function() {
                            $jex.addClassName(li, "hover");
                        },
                        onmouseout: function() {
                            $jex.removeClassName(li, "hover");
                        }
                    });
                }
                if (i >= 7) {
                    return;
                }
                $jex.event.bind(li, "click", function() {
                    var deptDate = li.getAttribute("date");
                    var url = window.location.research(null, null, deptDate, deptDate);
                    if (/&sd_idx=/.test(url)) {
                        url = url.replace(/&sd_idx=\d/, "&sd_idx=" + i);
                    } else {
                        url += ("&sd_idx=" + i);
                    } if (/&SearchLocation=/.test(url)) {
                        url = url.replace(/&SearchLocation=[a-z_-]+/i, "&SearchLocation=sevenday_search");
                    } else {
                        url += "&SearchLocation=sevenday_search";
                    }
                    window.location = url;
                });
            });
        }
        if (true) {
            this.cpbind = true;
            $jex.$("priceCd").style.visibility = "visible";
            this._index = -1;
            $jex.event.bind($jex.$("priceCd"), "click", function(evt) {
                if (self.cacheData && !self.cpshow) {
                    $jex.stopEvent(evt);
                    if (self.searchDate.getMonth() == SERVER_TIME.getMonth()) {
                        self.getPriceData($jex.date.format(self.searchDate));
                    } else {
                        self.getPriceData([self.searchDate.getFullYear(), "-", self.searchDate.getMonth() + 1, "-01"].join(""));
                    }
                }
            });
            $jex.event.bind(document, "keydown", this._keydownFunc);
            $jex.event.bind(document, "click", function(ev) {
                var ev = ev || window.event;
                var el = ev.target || ev.srcElement;
                if ($jex.element.compareDocumentPosition($jex.$("priceCalendar"), el) & 16) {
                    return;
                } else {
                    self.closePriceCalendar();
                }
            });
        }
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
        if ($jex.$("roundtripVendor")) {
            $jex.$("roundtripVendor").innerHTML = this.template_roundtripvendor(_templateContext);
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
        $jex.$("dSpringPanel").innerHTML = this.template_returnsuggestion({
            data: _data,
            inSpringtrip: false
        });
        if (size > 0) {
            $jex.element.show($jex.$("dSpringPanel"));
        } else {
            $jex.element.hide($jex.$("dSpringPanel"));
        }
    };
    this._keydownFunc = function(event) {
        if (!this.cpshow) {
            return;
        }
        var _ev = event || window.event;
        var _targetElement = Event.element(event);
        var _keyCode = _ev.keyCode;
        var _isK = ($("priceCalendar").style.display != "none");
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
    this.getPriceData = function(_dateStr) {
        if ($jex.date.parse(_dateStr).getMonth() == SERVER_TIME.getMonth()) {
            _dateStr = $jex.date.format(SERVER_TIME);
            var _qtime = _dateStr;
        } else {
            var _qtime = _dateStr.replace(_dateStr.split("-")[2], "01");
        }
        this._dateStr = _dateStr;
        var _URL = ["http://ws.qunar.com/all_lp.jcp?", "from=", encodeURIComponent(this.dc), "&to=", encodeURIComponent(this.ac), "&goDate=", _qtime, "&backDate=", _qtime, "&count=", 35, "&packto=", $jex.date.format(this.searchDate), "&packreturn=", $jex.date.format(new Date(this.searchDate.getTime() + 2 * 24 * 3600000)), "&packcount=7", "&output=json&n=", Math.random()].join("");
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
        var _theDate;
        var _dateArr = [];
        var _date = $jex.date.parse(this._dateStr);
        if (!this._sdate) {
            this._sdate = _date;
        }
        var _maxDate = new Date(210 * 24 * 3600 * 1000 + SERVER_TIME.getTime());
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
                } else {
                    var _toUrl = false;
                } if (_priceData) {
                    _dateArr.push([_timeStr, _priceData.pr, _priceData.url, _theDate.getDate()]);
                } else {
                    _dateArr.push([_timeStr, false, _toUrl, _theDate.getDate()]);
                }
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
            currentDate: $jex.date.format(this.searchDate)
        };
        var _html = this.template_pricecalendar(_templateContext);
        $jex.$("priceCalendar").innerHTML = _html;
        $jex.element.show($jex.$("priceCalendar"));
        $jex.addClassName($jex.$("priceCd").parentNode, "prc_cld_on");
        this.cpshow = true;
        return;
    };
    this.closePriceCalendar = function() {
        $jex.element.hide($jex.$("priceCalendar"));
        $jex.removeClassName($jex.$("priceCd").parentNode, "prc_cld_on");
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
                    dt: $jex.date.format(this.searchDate),
                    url: this.createCanlederUrl($jex.date.format(this.searchDate))
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
        return _url;
    };
    this.createCanlederUrl = function(toDate) {
        var param = window.location.param();
        var _url = "/twell/flight/Search.jsp?fromCity=" + encodeURIComponent(param.searchDepartureAirport) + "&toCity=" + encodeURIComponent(param.searchArrivalAirport) + "&fromDate=" + toDate + "&toDate=" + toDate + "&searchType=OnewayFlight";
        return _url;
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
    a.check = function(k, h) {
        var c = k.ownerFlight();
        if (c.type == "onewayInTransfer") {
            return;
        }
        var g = c.getWrapperListType(),
            l = k.dataSource().type;
        var m = c.key() + "_" + g,
            o = k.wrapperId() + "_" + l;
        var d = PriceCheckService.getPriceInfo(m, o);
        if (d) {
            h = h || 0;
            var b = h == 1 ? d.pr : d.bpr,
                n = h == 1 ? k.afeePrice() : k.bprPrice();
            if (b !== n) {
                var j = c._shareFlight || c;
                PAGE_EVENT.trigger("wrapper_price_change", j.flightKeyCode(), g);
                try {
                    TsinghuaOneWayTracker.bookingHoldTrack(k, h, b, n);
                } catch (f) {}
                return true;
            }
        }
    };
    return a;
})();
var dflightTool = new function() {
        this.initialize = function(args) {
            if (this.initialized) {
                return;
            }
            var service = DomesticOnewaySearchService;
            var analyzer = DomesticOnewayDataAnalyzer;
            var param = window.location.param();
            this.args = args = $jex.merge({
                fromCity: param.searchDepartureAirport,
                toCity: param.searchArrivalAirport,
                startDate: param.searchDepartureTime,
                alllowestprice: analyzer.lowestPrice(),
                DATA_RECOMMEND_AIRLINE: "http://ws.qunar.com/recommendAirline.jcp",
                DATA_RECOMMEND_AIRLINE_SINGLE: "http://ws.qunar.com/recommend"
            }, args || {});
            this.fromCity = args.fromCity;
            this.toCity = args.toCity;
            this.startDate = args.startDate;
            this.alllowestprice = args.alllowestprice;
            this.DATA_RECOMMEND_AIRLINE = args.DATA_RECOMMEND_AIRLINE;
            this.DATA_RECOMMEND_AIRLINE_SINGLE = args.DATA_RECOMMEND_AIRLINE_SINGLE;
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
        this.template_dflight_recommendtools = function(context, __onerror) {
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
                    var dis = _CONTEXT.now.ds || 0;
                    dis = PriceUtil.getDiscount(dis);
                    dis = dis.replace(/([\d.]+)/, '<b class="f_thm">$1</b>');
                    with(_CONTEXT) {
                        _OUT.write('<span class="m_lab">临近航线低价推荐</span><span>');
                        _OUT.write(now.dc);
                        _OUT.write("-");
                        _OUT.write(now.ac);
                        _OUT.write('</span><span class="f_thm">');
                        _OUT.write(now.dt);
                        _OUT.write('</span><span class="highligh"><i class="rmb">&yen;</i>');
                        _OUT.write(now.pr);
                        _OUT.write("</span><span>");
                        _OUT.write(dis);
                        _OUT.write('</span><a href="');
                        _OUT.write(now.url);
                        _OUT.write('" class="m_view">查看</a>');
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
        this.startSpecial = function(args) {
            this.initialize(args);
            var _fromCity = encodeURIComponent(this.fromCity);
            var _toCity = encodeURIComponent(this.toCity);
            var _startDate = this.startDate;
            var _params = "from=" + _fromCity + "&to=" + _toCity + "&start_date=" + _startDate + "&version=" + Math.random();
            var sr_single = new ScriptRequest({
                funcName: "dflightTool.special",
                callbackName: "callback"
            });
            sr_single.send(this.DATA_RECOMMEND_AIRLINE_SINGLE + "?" + _params);
        };
        this.makeurl = function(item) {
            var param = window.location.param();
            var _url = "oneway_list.htm?searchDepartureAirport=" + encodeURIComponent(item.dc) + "&searchArrivalAirport=" + encodeURIComponent(item.ac) + "&searchDepartureTime=" + item.dt + "&arrivalTime=" + param.searchDepartureTime + "&nextNDays=0&searchType=OneWayFlight&startSearch=true&from=near_airport";
            return _url;
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
        this.special = function(data) {
            if (!data.records || data.records.length < 1) {
                return;
            }
            var self = this,
                _d = [].concat(data.records),
                dc = this.fromCity,
                ac = this.toCity;
            var f = function(o1) {
                if (o1.ac == ac && o1.dc != dc) {
                    return -1;
                }
                if (o1.ac != ac && o1.dc == dc) {
                    return 0;
                }
                if (o1.ac != ac && o1.dc != dc) {
                    return 1;
                }
            };
            _d = _d.sort(function(a, b) {
                return f(a) - f(b);
            });
            this._cacheD = _d;
            this.updateSpecial(this.alllowestprice);
        };
        this.updateSpecial = function(alllp) {
            if (!this._cacheD) {
                return;
            }
            var dc = this.fromCity;
            var ac = this.toCity;
            var _d = this._cacheD;
            var lp = null;
            $jex.array.each(_d, function(item) {
                if (alllp - item.pr >= 200) {
                    lp = item;
                }
            });
            if (lp == null || alllp > 99999) {
                if (SpringHotRoundtrip && SpringHotRoundtrip.onshow) {
                    $jex.element.show($jex.$("roundtripVendor"));
                }
                $jex.element.hide($jex.$("dflightRecommendPanel"));
                return;
            }
            lp.url = this.makeurl(lp) + "&from=tejia_near_search";
            $jex.$("dflightRecommendPanel").innerHTML = this.template_dflight_recommendtools({
                now: lp,
                dc: dc,
                ac: ac,
                sub: alllp - lp.pr
            });
            $jex.element.show($jex.$("dflightRecommendPanel"));
            $jex.element.hide($jex.$("roundtripVendor"));
        };
    };
window.dflightTool = dflightTool;
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

function createUrl(f, e, d, a, c) {
    if (!$jex.define(f) || !$jex.define(e) || !$jex.define(d) || !$jex.define(a) || !$jex.define(c)) {
        return;
    }
    var b = "/site/oneway_list.htm?searchDepartureAirport=" + encodeURIComponent(f) + "&searchArrivalAirport=" + encodeURIComponent(e) + "&searchDepartureTime=" + d + "&arrivalTime=" + a + "&nextNDays=0&searchType=OneWayFlight&startSearch=true&from=sr_trendflash";
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
                zh: "上午",
                value: 0
            },
            "1": {
                zh: "中午",
                value: 1
            },
            "2": {
                zh: "下午",
                value: 2
            },
            "3": {
                zh: "晚上",
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
            s9: "担保通"
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
            s9: "担保通实现金牌机票服务安全保障"
        }
    }
});
var flightResultController = function(a, b) {
    this.service = a;
    this.analyzer = b;
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
    this.resultList = new FlightListUI({
        elemId: "hdivResultPanel"
    });
    this.filterGroup = new DomesticOnewayFilterListUI({
        elemId: "hdivfilterPanel",
        filterConf: {
            "起降机场": {
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
            }
        },
        on: {
            changeFilter: function(e, c, d, g, h, f) {
                SingletonUIManager.close("flight");
                b.analyzer.setFilter(e);
                a();
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
        var j = [];
        var h = [];
        var c = this.filterGroup;
        $jex.foreach(["起飞时间", "机型", "航空公司", "起降机场", "方式"], function(l, k) {
            var m = c.getFilterUI(l);
            if (m) {
                j.push(m);
            }
            h[k] = m ? 1 : 0;
        });
        var d = b.getCheckGrpArr(j);
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
            value: 15,
            name: "15"
        }, {
            value: 30,
            name: "30"
        }, {
            value: 60,
            name: "60"
        }],
        on: {
            changeValue: function(c) {
                b.analyzer.resetPageSize(c.value);
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
    this.pager = new OnewayPagerUI({
        elemId: "hdivPager",
        on: {
            changePage: function(c) {
                b.analyzer.gotoPage(c);
                var d = $jex.offset($jex.$("resultAnchor"));
                window.scrollTo(d.left, d.top - 31);
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
                a();
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
                a();
            }
        }
    });
    this.statusbar = new OneWaySearchStatusbar({
        elemId: "progTip",
        service: b.service,
        analyzer: b.analyzer
    });
    this.statusbar.render();
};
flightResultController.prototype.bindUI = function() {
    var b = this;
    var f = this.filterGroup;
    var e = this.pager;
    var a = this.resultList;
    $jex.event.binding(b.analyzer, "updateFilter", function(h) {
        f.addFilter(h);
    });
    $jex.event.binding(b.analyzer, "dataComplete", function() {
        setTimeout(function() {
            $jex.console.start("dataComplete:更新过滤项");
            f.refresh();
            $jex.console.end("dataComplete:更新过滤项");
        }, 0);
        $jex.console.start("dataComplete:显示列表");
        a.loadData(b.analyzer.resultData(), b.analyzer);
        $jex.console.end("dataComplete:显示列表");
        setTimeout(function() {
            $jex.console.start("dataComplete:更新页码");
            e.update(b.analyzer.pageInfo());
            $jex.console.end("dataComplete:更新页码");
        }, 0);
    });
    var d, g;
    var c;
    TsinghuaOneWayTracker.setTimerToSaveTrack = function() {
        clearTimeout(c);
        c = setTimeout(function() {
            if (d) {
                System.service.genTraceTimeStamp();
                System.analyzer.triggerTrace = true;
                TsinghuaOneWayTracker.trackOnRefreshed(d);
                b.trackFilters();
                TsinghuaOneWayTracker.track("query", encodeURIComponent(location.search), System.service.traceTimeStamp);
                System.analyzer.triggerTrace = false;
            }
        }, 3000);
    };
    TsinghuaOneWayTracker.clearTimerToSaveTrack = function() {
        clearTimeout(c);
    };
    TsinghuaOneWayTracker.traceFlightList = function() {
        if (System.analyzer.triggerTrace && d) {
            TsinghuaOneWayTracker.clearTimerToSaveTrack();
            b.trackFilters();
            TsinghuaOneWayTracker.track("query", encodeURIComponent(location.search), System.service.traceTimeStamp);
            TsinghuaOneWayTracker.trackOnRefreshed(d);
            System.analyzer.triggerTrace = false;
        }
    };
    $jex.event.binding(a, "refreshed", function(h) {
        if (!g) {
            System.service.genFilterTimeStamp();
            TsinghuaOneWayTracker.setTimerToSaveTrack();
            g = true;
        }
        TsinghuaOneWayTracker.traceFlightList();
        d = h;
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
    $jex.event.binding(b, "click", function(d) {
        $jex.stopEvent(d);
        if (a.state()) {
            c.className = "i_arr_ud_up";
            a.state(false);
        } else {
            c.className = "i_arr_ud_down";
            a.state(true);
        }
        $jex.event.trigger(a, "clickSort", [
            [a._setting.sortKey, a.state()]
        ]);
    });
};
(function() {
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
    } catch (k) {
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
        var o = document.getElementsByTagName("head").item[0];
        css = document.createElement("link");
        css.href = "styles/" + f.loadDynamicCss + ".css";
        css.rel = "stylesheet";
        css.type = "text/css";
        o.appendChild(css);
    }
    window.System = {
        service: DomesticOnewaySearchService,
        analyzer: DomesticOnewayDataAnalyzer,
        param: f
    };
    var j = DomesticOnewaySearchService;
    var h = DomesticOnewayDataAnalyzer;
    h.setSearchService(j);
    window.SS = j;
    var a = new flightResultController(j, h);
    var m = new FlashAdUI({
        elemId: "hdivResultPanel"
    });
    var b = function() {
        if (!window.SearchBoxCreate) {
            setTimeout(b, 10);
            return;
        }
        SearchBoxCreate(f);
        $jex.element.show($jex.$("queryTicketState").parentNode);
        $jex.element.hide($jex.$("forecast").parentNode);
    };
    var c = new CACTI_monitoring({
        url: "http://bmrg.qunar.com/f",
        pageId: "DomesticOnewayList",
        timerList: ["t_done", "t_firstData"]
    });
    var l = 0;

    function r() {
        if (l === 1) {
            c.send();
        }
        l++;
    }
    $jex.event.bind(window, "load", function() {
        r();
    });
    var p = false;
    var n = function() {
        if (p) {
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
            dflightTool.startSpecial();
            $jex.console.end("第一屏,七日低价 ");
            setTimeout(function() {
                $jex.console.start("第一屏,侧边推荐酒店 ");
                recommendedHotels.query(encodeURIComponent(f.searchArrivalAirport), f.searchDepartureTime, "HotelRecommended", "oneway-list", 0);
                $jex.console.end("第一屏,侧边推荐酒店");
            }, 0);
            $jex.console.start("第一屏,加载广告 ");
            var e = j.longwell();
            AD_Manage.qde_query = function(u) {
                var t = ["&to=", e.arrivalAirport.en, "&from=", e.departureAirport.en, "&cnkey=", encodeURIComponent(e.departureAirport.zh), "&s=", encodeURIComponent(f.searchDepartureAirport), "&s1=", encodeURIComponent(f.searchArrivalAirport), "&fromDate=", f.searchDepartureTime, "&st=oneway", "&pt=dmst"].join("");
                u(t);
            };
            $OTALOGIC.init(f.searchDepartureAirport, f.searchArrivalAirport, f.searchDepartureTime);
            $OTALOGIC.load_top("ifrmVendorBanner");
            $OTALOGIC.load_right();
            AD_Manage.load();
            $jex.console.end("第一屏,加载广告 ");
            LazyScrollShow.start();
            $jex.console.end("第一屏数据耗时");
        }, 0);
        p = true;
    };
    var d = function(y) {
        if (typeof QunarHistory == "undefined" || !QunarHistory || !QunarHistory.SFlight) {
            setTimeout(function() {
                d(y);
            }, 500);
            return;
        }
        var t = y;
        var e = encodeURIComponent(t.dept.input);
        var z = encodeURIComponent(t.dept.country);
        var s = encodeURIComponent(t.arri.input);
        var u = encodeURIComponent(t.arri.country);
        var x = new Date(f.searchDepartureTime.replace(/-/g, "/"));
        var w = new QunarHistory.SFlight(e, s, new Date().getTime());
        w.addDate(x);
        w.addCountry(z + "-" + u);
        QunarHistory.service.addNode(w);
    };

    function q() {
        $jex.event.binding(j, "expireQuery", function() {
            var e = window.location.research(null, null, $jex.date.add(SERVER_TIME, 1, true), $jex.date.add(SERVER_TIME, 3, true));
            top.location.href = e;
            return;
        });
        $jex.event.binding(j, "validateComplete", function(e) {
            setTimeout(function() {
                if (j.isValidQuery()) {
                    d(e);
                }
            }, 0);
        });
        $jex.event.binding(j, "invalidQuery", function() {
            TraceAnalyzer.all.invalidErr();
        });
        $jex.event.binding(j, "noTransferData", function() {
            TraceAnalyzer.all.noTransErr();
        });
        $jex.event.binding(j, "sameCity", function() {
            m.show("sameCity");
            TraceAnalyzer.all.sameCityErr();
        });
        $jex.event.binding(h, "noResultEnd", function() {
            m.show("noResult");
            TraceAnalyzer.all.noResultErr().tsingReport();
        });
        $jex.event.binding(j, "loadedFirstData", function() {
            n();
        });
        $jex.event.binding(j, "noOnewayData", function() {
            n();
            TraceAnalyzer.all.noOnewayErr();
        });
        $jex.event.binding(j, "searchEnd", function() {
            n();
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
    $jex.event.binding(j, "loadedLongwell", function(e) {
        $OTA.group.options({
            queryID: e.queryID
        });
    });
    $jex.event.binding(j, "loadedOnewayData", function(e) {
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
    c.start("t_firstData");
    j.search(f);
    setTimeout(function() {
        b();
    }, 10);
    $jex.console.end("初始化所耗时");
})();
