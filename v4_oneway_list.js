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
        } if (d && d.ml === "true") {
            k += "1";
        } else {
            k += "0";
        } if (d && d.zj && d.zj.info) {
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
                var j, d, h, e, i = {
                        t_done: 1,
                        t_resp: 1,
                        t_page: 1
                    }, g = 0,
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
                    BOOMR.ad
