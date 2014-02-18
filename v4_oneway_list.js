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
    var a = "/twell/searchrt_ui/ui_qunar_gsriw.do";
    QLib.setCookieForSpider = function(d) {
        var c = b();
        if (!c) {
            d();
            return;
        }
        c(a, {}, d, {
            onerror: d
        });
    };

    function b() {
        if (window.$jex && $jex.ajax) {
            return $jex.ajax;
        }
    }
    QLib.setUrl = function(c) {
        a = "/twelli/searchrt_ui/ui_qunar_gsriw.do";
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
    var t = this;
    var H = null;
    var f = null;
    var A = null;
    this.infoMgr = function() {
        if (typeof A == "undefined" || A == null) {
            A = new CommonInfoManager();
        }
        return A;
    };
    var F = null;
    this.onewayInfoMgr = function() {
        if (typeof F == "undefined" || F == null) {
            F = new FlightInfoManager();
        }
        return F;
    };
    var l = null;
    this.transferInfoMgr = function() {
        if (typeof l == "undefined" || l == null) {
            l = new FlightInfoManager();
        }
        return l;
    };
    var i = null;
    this.flightEntityMgr = function() {
        if (typeof i == "undefined" || i == null) {
            i = new FlightEntityManager();
        }
        return i;
    };
    this.lowestPrice = function() {
        var I = (this.lowestTransfer() == null) ? Number.MAX_VALUE : this.lowestTransfer().safeLowestPrice();
        var J = (this.lowestOneway() == null) ? Number.MAX_VALUE : this.lowestOneway().safeLowestPrice();
        var K = (this.lowestCompose() == null) ? Number.MAX_VALUE : this.lowestCompose().safeLowestPrice();
        return Math.min(I, J, K);
    };
    this.lowestEntity = function() {
        var I = (this.lowestTransfer() == null) ? Number.MAX_VALUE : this.lowestTransfer().safeLowestPrice();
        var J = (this.lowestOneway() == null) ? Number.MAX_VALUE : this.lowestOneway().safeLowestPrice();
        var K = (this.lowestCompose() == null) ? Number.MAX_VALUE : this.lowestCompose().safeLowestPrice();
        if (I <= J && I <= K) {
            return this.lowestTransfer();
        }
        if (J <= I && J <= K) {
            return this.lowestOneway();
        }
        if (K <= I && K <= J) {
            return this.lowestCompose();
        }
    };
    var p = null;
    this.lowestTransfer = function(I) {
        if (I == null) {
            return p;
        } else {
            if (p == null) {
                p = I;
            } else {
                if (p.safeLowestPrice() > I.safeLowestPrice()) {
                    p = I;
                }
            }
        }
    };
    var u = null;
    this.lowestOneway = function(I) {
        if (I == null) {
            return u;
        } else {
            if (u == null) {
                u = I;
            } else {
                if (u.safeLowestPrice() > I.safeLowestPrice()) {
                    u = I;
                }
            }
        }
    };
    var j = null;
    this.lowestCompose = function(I) {
        if (I == null) {
            return j;
        } else {
            if (j == null) {
                j = I;
            } else {
                if (j.safeLowestPrice() > I.safeLowestPrice()) {
                    j = I;
                }
            }
        }
    };
    this.setSearchService = function(I) {
        if (H) {
            return;
        }
        H = I;
        $jex.event.binding(H, "interSearch", n);
        $jex.event.binding(H, "validQuery", x);
        $jex.event.binding(H, "invalidQuery", B);
        $jex.event.binding(H, "loadedLongwell", D);
        $jex.event.binding(H, "loadedFirstData", E);
        $jex.event.binding(H, "loadedOnewayData", k);
        $jex.event.binding(H, "loadedTransfer", z);
        $jex.event.binding(H, "loadedExtInfo", c);
        $jex.event.binding(H, "loadedAVData", r);
        $jex.event.binding(H, "parsingFlightPriceData", o);
        $jex.event.binding(H, "searchEnd", y);
        $jex.event.binding(H, "onerror", v);
        $jex.event.binding(H, "pastLessSecond", b);
        $jex.event.binding(H, "zyfLoaded", e);
        $jex.event.binding(H, "ipBlock", g);
        $jex.event.binding(H, "getQueryId", w);
        $jex.event.binding(H, "loadedGroupinfo", a);
        this.infoMgr().service(H);
        this.infoMgr().analyzer(this);
        this.infoMgr().entityManager(this.flightEntityMgr());
        t._initial();
    };
    this._initial = function() {
        f = new DataSet({
            defaultSort: [
                ["sortValue", false]
            ],
            filterFunc: {
                "航空公司": function(K, I, J) {
                    return [K.carrierCode()];
                },
                "起飞时间": function(I) {
                    return [I.deptTimeRangeValue()];
                },
                "机型": function(I) {
                    return I.planeType();
                },
                "起降机场": function(I) {
                    return I.airportCodes();
                },
                "方式": function(I) {
                    if (I.type == "compose") {
                        return "transfer";
                    }
                    return I.type;
                },
                "中转城市": function(I) {
                    return I.transferCity();
                }
            },
            pageSize: 30
        });
        if (typeof FlightListUISorter != "undefined") {
            $jex.event.binding(f, "refreshCurrentPage", function(K, L, I, J) {
                FlightListUISorter.resort(K, L, I, J);
            });
        }
    };
    var m = function() {
        $jex.event.trigger(t, "updateFilter", {
            catalog: "航空公司",
            name: this.carrier().zh,
            value: this.flightInfo().ca
        });
        var K = this.deptTimeRange();
        $jex.event.trigger(t, "updateFilter", {
            catalog: "起飞时间",
            name: K.zh,
            value: K.value
        });
        var L = this.plane();
        $jex.foreach(L.type, function(M) {
            $jex.event.trigger(t, "updateFilter", {
                catalog: "机型",
                name: M,
                value: M
            });
        });
        var I = this.deptAirport();
        $jex.event.trigger(t, "updateFilter", {
            catalog: "起降机场",
            group: this.deptCityCode(),
            name: I.ab,
            value: I.key || I.code
        });
        var J = this.arriAirport();
        $jex.event.trigger(t, "updateFilter", {
            catalog: "起降机场",
            group: this.arriCityCode(),
            name: J.ab,
            value: J.key || J.code
        });
    };
    var q = function() {
        var M = this.firstTrip();
        if (this.carrierCode()) {
            $jex.event.trigger(t, "updateFilter", {
                catalog: "航空公司",
                name: M.carrier().zh,
                value: M.flightInfo().ca
            });
        }
        var K = M.deptTimeRange();
        $jex.event.trigger(t, "updateFilter", {
            catalog: "起飞时间",
            name: K.zh,
            value: K.value
        });
        var L = M.plane();
        $jex.foreach(L.type, function(O) {
            $jex.event.trigger(t, "updateFilter", {
                catalog: "机型",
                name: O,
                value: O
            });
        });
        var I = M.deptAirport();
        $jex.event.trigger(t, "updateFilter", {
            catalog: "起降机场",
            group: M.deptCityCode(),
            name: I.ab,
            value: I.key || I.code
        });
        M = this.secondTrip();
        var L = M.plane();
        $jex.foreach(L.type, function(O) {
            $jex.event.trigger(t, "updateFilter", {
                catalog: "机型",
                name: O,
                value: O
            });
        });
        var J = M.arriAirport();
        $jex.event.trigger(t, "updateFilter", {
            catalog: "起降机场",
            group: M.arriCityCode(),
            name: J.ab,
            value: J.key || J.code
        });
        var N = M.deptCity();
        $jex.event.trigger(t, "updateFilter", {
            catalog: "中转城市",
            name: N.zh,
            value: N.en
        });
    };
    this.hasWrapper = function(I) {
        return this.infoMgr().get("vendor", I);
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
        var I = {
            pageCount: f.pageCount(),
            pageSize: f.pageSize(),
            pageIndex: f.pageIndex()
        };
        return I;
    };
    this.resetPageSize = function(I) {
        f.pageSize(I);
        $jex.event.trigger(t, "dataComplete");
    };
    this.gotoPage = function(I) {
        f.gotoPage(I);
        $jex.event.trigger(t, "dataComplete");
    };
    this.sort = function(I) {
        f.setPageIndex(0);
        f.sort(I);
        f.refresh();
        $jex.event.trigger(t, "dataComplete");
    };
    this.setFilter = function(I) {
        f.addFilter(I);
        f.setPageIndex(0);
        f.refresh();
        $jex.event.trigger(t, "dataComplete");
    };
    this.reload = function() {
        f.refreshPage();
        $jex.event.trigger(t, "dataComplete");
    };
    this.syncPriceData = function(L, I, J) {
        var M = function() {
            J();
        };
        var K = L.getWrapperListType();
        H.invoke_flightPriceData(L.key(), I, M, K);
    };

    function d(L) {
        var I = t.infoMgr();
        var O = t.onewayInfoMgr();
        var J = t.flightEntityMgr();
        var N = false;
        var K = false;
        var M = false;
        $jex.foreach(L, function(T, P, R) {
            var Q = f.hasItem(R);
            if (Q) {
                Q.update();
                N = true;
                HotSale.setMinLate(Q);
            } else {
                var S = OnewayFlightEntity.tryCreate(R, I, O, J);
                if (S) {
                    HotSale.setMinLate(S);
                    m.call(S);
                    $jex.event.binding(S, "updating", function() {
                        switch (this.type) {
                            case "oneway":
                                t.lowestOneway(this);
                                break;
                            case "compose":
                                t.lowestCompose(this);
                                break;
                        }
                        if (this.updateSortKey) {
                            this.updateSortKey();
                        } else {
                            $jex.console.error("没有更新排序键的方法", this);
                        }
                    });
                    switch (S.type) {
                        case "oneway":
                            t.lowestOneway(S);
                            M = true;
                            break;
                        case "compose":
                            t.lowestCompose(S);
                            K = true;
                            break;
                    }
                    f.addItem(R, S);
                }
                N = true;
            }
        });
        if (N) {
            if (M) {
                $jex.event.trigger(t, "updateFilter", {
                    catalog: "方式",
                    name: "直达",
                    value: "oneway"
                });
            }
            if (K) {
                $jex.event.trigger(t, "updateFilter", {
                    catalog: "方式",
                    name: "中转联程",
                    value: "transfer"
                });
            }
            $jex.event.trigger(t, "preDataComplete");
            f.refresh();
            $jex.event.trigger(t, "dataComplete");
        }
    }

    function h(L) {
        var J = t.infoMgr();
        var I = t.transferInfoMgr();
        var K = t.flightEntityMgr();
        var M = false;
        $jex.foreach(L, function(R, N, Q) {
            var P = [];
            $jex.foreach(R, function(W, T, V) {
                W.co = V;
                var U = V + "_" + W.da + "-" + W.aa;
                var S = Q.split("|");
                if (V == S[0]) {
                    P[0] = U;
                } else {
                    if (V == S[2]) {
                        P[1] = U;
                    }
                }
                I.addFlightInfoItem(U, W);
                I.addPriceDataItem(U, W.vl);
            });
            var O = TransferFlightEntity.tryCreate(P, J, I, K);
            if (O) {
                q.call(O);
                t.lowestTransfer(O);
                f.addItem(Q, O);
                M = true;
            }
        });
        if (M) {
            $jex.event.trigger(t, "updateFilter", {
                catalog: "方式",
                name: "中转联程",
                value: "transfer"
            });
            f.refresh();
            $jex.event.trigger(t, "dataComplete");
        }
    }

    function n() {
        var I = window.location.href.toString();
        window.location.href = I.replace("oneway_list.htm", "oneway_list_inter.htm");
    }

    function g() {
        window.location.href = "/twell/flight/busy.jsp?ret=" + encodeURIComponent(window.location.href.toString());
    }

    function x() {}

    function B() {}

    function E() {}

    function a(J) {
        if (!J.serc) {
            return;
        }
        var I = J.flightCode.split("|")[0].split("/")[0];
        var K = J.priceData[J.flightCode];
        var L = G(I);
        if (!$jex.$empty(K)) {
            $jex.hash.each(K, function(N, M) {
                M.pr = M.pr + L;
                M.npr = M.npr + L;
                M.bpr = M.bpr + L;
                M.vppr = M.vppr + L;
            });
        }
    }

    function G(I) {
        var J = (parseInt(I.substr(0, 2) + I.substr(I.length - 1), 36) + parseInt("0" + I.substr(2, I.length - 3), 10) * 36 * 36 * 36) % 97;
        return J;
    }

    function C(I) {
        if (!$jex.$empty(I)) {
            $jex.hash.each(I, function(L, K) {
                var J = L.split("|")[0].split("/")[0];
                var M = G(J);
                K.lowpr = K.lowpr + M;
            });
        }
    }

    function D(K) {
        var I = t.infoMgr();
        if (K.oneway_data && K.oneway_data.priceInfo && K.serc) {
            C(K.oneway_data.priceInfo);
        }
        I.addAirportSource(K.airportInfo.out);
        I.addAirportSource(K.airportInfo.ret);
        I.addVendorSource(K.vendors);
        I.addOriginalPrice(K.op);
        I.addInsuranceSum(K.inShow);
        I.addNotWorkVendors(K.notWorkVendors);
        I.addSuperOTAMaxNum(K.SuperOTA_NUM || 0);
        var J = {};
        J[K.arrivalAirport.en] = K.arrivalAirport;
        J[K.departureAirport.en] = K.departureAirport;
        I.addCitySource(J);
        I.deptCityCode(K.departureAirport.en);
        I.arriCityCode(K.arrivalAirport.en);
    }

    function k(K) {
        var I = t.infoMgr();
        var L = t.onewayInfoMgr();
        I.addCarrierSource(K.carrierInfo);
        I.addPlaneSource(K.planeInfo);
        L.addFlightInfoSource(K.flightInfo);
        var J, M = 0;
        $jex.foreach(K.priceData, function(N) {
            $jex.foreach(N, function(O) {
                J = O.carrier;
                M++;
            });
        });
        if (J) {
            s(K, J, M);
        }
        if (K.labelType) {
            L.replacePriceData(K.priceData, K.labelType);
        }
        L.updateRecommendInfo(K.recommendInfo);
        L.addPriceGroupDataSource(K.flightPriceInfo);
        L.addPriceInfoSource(K.priceInfo);
        d(K.priceInfo);
    }

    function z(K) {
        var J = t.infoMgr();
        var I = t.transferInfoMgr();
        J.addAirportSource(K.airportInfo);
        J.addCarrierSource(K.carrierInfo);
        J.addPlaneSource(K.planeInfo);
        J.addCitySource(K.citylist);
        J.addVendorSource(K.vendors, {
            isOverwrite: false
        });
        J.addFlightLineVendorSource(K.flightLineVendors);
        I.addCorrSource(K.corrInfo);
        I.addExtInfoSource(K.extInfo);
        I.addPriceInfoSource(K.priceInfo);
        h(K.data);
    }

    function c(I) {
        var J = t.onewayInfoMgr();
        J.addCorrSource(I.corrInfo);
        J.addExtInfoSource(I.extInfo);
        $jex.console.info("已经加载直飞扩展信息数据");
    }

    function r(J) {
        var I = t.infoMgr();
        var K = t.onewayInfoMgr();
        I.addCarrierSource(J.carrierInfo);
        I.addPlaneSource(J.planeInfo);
        K.updateFlightInfoSource(J.flightInfo);
        d(J.flightInfo);
        $jex.console.info("已经加载AV数据");
    }

    function o(L) {
        var P = L.flightCode,
            N = L.labelType;
        var I = t.infoMgr();
        var M = t.onewayInfoMgr();
        var J = [];
        var K = null;
        var O = 0;
        $jex.foreach(L.priceData, function(R, Q, S) {
            J.push("<b>", "[", S, "] 所返回的报价:", "</b>");
            $jex.foreach(R, function(U) {
                K = U.carrier;
                J.push(U.wr || U.wrjid);
                var T = I.get("vendor", U.wr || U.wrid);
                if (T) {
                    J.push("(", T.name, ")");
                }
                J.push(" , ");
                O++;
            });
        });
        $jex.console.trace(J.join(""));
        s(L, K, O);
        M.replacePriceData(L.priceData, N);
        M.addPriceGroupDataSource(L.flightPriceInfo);
        M.addPriceInfoSource(L.priceInfo);
        M.updateRecommendInfo(L.recommendInfo);
        $jex.console.info("已经加载航班价格数据");
    }

    function s(M, Q, K) {
        var I = ConfigManager.getConfig("NoNeedStatementList") || ["9C"];
        if ($jex.array.indexOf(I, Q) > -1) {
            return;
        }
        var L = 18;
        var O = t.infoMgr();
        var P = O.get("carrier", Q);
        var S = P ? (P.maxvendors || L) : L;
        var N = O.get("notWork");
        if (!N) {
            return;
        }
        var R = N.out;
        if (!R || R < 1) {
            return;
        }
        var T = S - K;
        if (T <= 0) {
            return;
        }
        var J = R.slice(0, T);
        $jex.foreach(M.priceData, function(V, U, W) {
            if (W.indexOf("/") > -1) {
                return $jex.$continue;
            }
            $jex.foreach(J, function(X) {
                var Y = X + "_nw";
                V[Y] = {
                    wrid: X,
                    type: "notWork",
                    sortRank: 10000000
                };
            });
        });
    }

    function w(L) {
        if (!L.serc) {
            return;
        }
        var N = L.queryID;
        var K = N.indexOf(":");
        var M = N.substr(0, K + 1);
        var J = N.substring(K + 1).split("");
        var I = [];
        $jex.array.each(J, function(O) {
            I.push(String.fromCharCode(O.charCodeAt(0) - 1));
        });
        I.reverse();
        L.queryID = M + I.join("");
    }

    function b() {
        if (f.getRecordCount() == 0) {
            $jex.event.trigger(t, "noResult");
        }
    }

    function e(J) {
        if (!J.total) {
            $jex.console.info("no zyf data!");
            return;
        }
        var I = t.infoMgr();
        I.addSource("zyfData", J.list);
    }

    function y() {
        if (f.getRecordCount() == 0) {
            $jex.event.trigger(t, "noResultEnd");
        }
        $jex.console.trace("搜索结束.");
        t.infoMgr().setDataLoad(true);
    }

    function v() {}
})();
var DomesticOnewaySearchService = new(function() {
    var u = false;
    var p = this;
    this.param = {};
    this.oparam = {};
    var o = $jex.isdebug ? "http://local.qunar.com" : "";
    var e = null;
    var s = 0;
    var x = new Date();
    var v = 0;
    var d = 0;
    var i = 0;
    var m = 0;
    var A = "";
    var h = "";
    var z = false;
    var f = false;
    var l = false;
    var w = null;
    this.longwell = function() {
        return w || {};
    };
    var c = [];
    var j = [];
    var b = null;
    var n = null;
    var t = "";
    var k = null;
    var r = false;
    this.isValidQuery = function(B) {
        if (B == null) {
            return r;
        } else {
            r = B;
        }
    };
    var y = null;
    this.queryId = function(B) {
        if (B == null) {
            return y;
        } else {
            y = B;
        }
    };
    var q = null;
    this.tserver = function(B) {
        if (B == null) {
            return q;
        } else {
            q = B;
        }
    };
    this.search = function(D) {
        if (p.searchEnd()) {
            return;
        }
        $jex.merge(this.param, {
            fromCity: D.searchDepartureAirport,
            toCity: D.searchArrivalAirport,
            fromDate: D.searchDepartureTime
        });
        $jex.merge(this.oparam, {
            ex_track: D.ex_track,
            from: D.from
        });
        var C = $jex.date.parse(this.param.fromDate);
        var B = window.SERVER_TIME || new Date();
        if (B.getTime() - C.getTime() > 86400000) {
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
        var B = this;
        var C = o + "/zyf/api/ads.json";
        $jex.ajax(C, {
            dpt: B.param.fromCity,
            arr: B.param.toCity,
            dptDate: B.param.fromDate
        }, function(D) {
            if (D) {
                B._process_zyf(D);
            }
        });
    };
    this.queryNext = function() {
        if (this.searchEnd()) {
            return;
        }
        $jex.console.warn("[queryNext]", new Date().getTime() - e);
        if (this.getTask()) {
            var B = this.getTask();
            $jex.console.info("queryNext: 等待插入任务结束. TaskID:", B);
            setTimeout(function() {
                p.queryNext();
            }, 100);
        } else {
            if (l == false && d != 2) {
                p._invoke_AVData();
            } else {
                if (i != 2 && (d == 2 || (d != 2 && c.length >= 2))) {
                    $jex.console.info("queryNext:处理联程", " transferSearchState:", i, " isValidQuery:", w.isValidQuery, " onewayDatasLength:", c.length);
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
        var E = this.param;
        var C = c;
        var D = {
            "http://www.travelco.com/searchArrivalAirport": E.toCity,
            "http://www.travelco.com/searchDepartureAirport": E.fromCity,
            "http://www.travelco.com/searchDepartureTime": E.fromDate,
            "http://www.travelco.com/searchReturnTime": E.fromDate,
            locale: "zh",
            nextNDays: "0",
            searchLangs: "zh",
            searchType: "OneWayFlight",
            tags: 1,
            mergeFlag: 0
        };
        k = {
            departureCity: E.fromCity,
            arrivalCity: E.toCity,
            departureDate: E.fromDate,
            returnDate: E.fromDate,
            nextNDays: "0",
            searchType: "OneWayFlight",
            searchLangs: "zh",
            locale: "zh"
        };
        $jex.merge(D, this.oparam);
        $jex.merge(k, this.oparam);
        var B = o + "/twell/longwell";
        $jex.ajax(B, D, function(H) {
            u && console.log("longwell回数", H, new Date());
            $jex.console.end("调用longwell");
            if (H.isLimit) {
                $jex.event.trigger(p, "ipBlock");
                return;
            }
            $jex.event.trigger(p, "getQueryId", H);
            w = H;
            p.queryId(H.queryID);
            k.queryID = H.queryID;
            k.serverIP = H.serverIP;
            var G = H.validate;
            if (G) {
                if (G.dept.country != "中国" || G.arri.country != "中国") {
                    $jex.event.trigger(p, "interSearch");
                    return;
                }
                if (G.dept.value == G.arri.value) {
                    $jex.event.trigger(p, "sameCity");
                    return;
                }
                $jex.event.trigger(p, "validateComplete", H.validate);
            }
            if (H.isBackendBusy) {
                $jex.event.trigger(p, "systemBusy");
                return;
            }
            if (H.isValidQuery) {
                p.isValidQuery(true);
                d = 1;
                $jex.event.trigger(p, "validQuery");
            } else {
                p.isValidQuery(false);
                d = 2;
                $jex.event.trigger(p, "invalidQuery");
            } if (!H.isTransferFlightsNeeded) {
                i = 2;
                $jex.event.trigger(p, "TransferDataReady");
            }
            $jex.event.trigger(p, "loadedLongwell", H);
            var F = H.oneway_data || {};
            setTimeout(function() {
                k.deduce = true;
                m = 1;
            }, 1000);
            if (!$jex.$empty(F.priceInfo)) {
                p._process_oneway(F);
            } else {
                $jex.event.trigger(p, "noOnewayData");
                p.queryNext();
            }
        }, {
            onerror: p._onerror
        });
    };
    this._invoke_oneway = function() {
        var D = c;
        if (m == 1) {
            $jex.console.info("本次为deduce jsp调用.");
            var C = o + "/twell/flight/tags/deduceonewayflight_groupdata.jsp";
        } else {
            var C = o + "/twell/flight/tags/onewayflight_groupdata.jsp";
        } if (h) {
            k.flightCode = h;
        }
        var B = h;
        this._lastGinfoData = null;
        $jex.ajax(C, k, function(E) {
            u && console.log("GROUP_DATA回数：", E, new Date());
            if (m == 1) {
                m = 2;
            }
            if (B !== h) {
                p.correctPriceInfo(E, h);
            }
            E.flightCode = B;
            p._process_oneway(E);
            if (k.deduce == true) {
                f = true;
            }
        }, {
            onerror: p._onerror
        });
    };
    this._process_oneway = function(C) {
        var B = c;
        k.status = C.status;
        B.push(C);
        if (!$jex.$empty(C.priceInfo)) {
            $jex.event.trigger(p, "loadedOnewayData", C);
            PAGE_EVENT.trigger("wrapper_loadData", C);
            if (!z) {
                $jex.event.trigger(p, "loadedFirstData", C);
                z = true;
            }
        } else {
            $jex.console.info("直飞价格数据为空.");
        } if (!C.dataCompleted) {
            $jex.console.info("dataCompleted:搜索未结束");
            if (new Date() - e > 60000) {
                $jex.console.info("dataCompleted:超时停止");
                d = 2;
                p.queryNext();
            } else {
                s = $jex.$defined(C.invokeInterval) ? C.invokeInterval * 2 : 100;
                x = new Date().getTime() + s;
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
    this._process_zyf = function(B) {
        $jex.event.trigger(p, "zyfLoaded", B);
    };
    this._invoke_transfer = function() {
        if (p.searchEnd()) {
            return;
        }
        $jex.console.info("---->调用联程");
        var C = $jex.merge({}, k);
        if (i == 1) {
            C.isReSearch = true;
        }
        var B = o + "/twell/flight/tags/OneWayFlight_data_more.jsp";
        $jex.ajax(B, C, function(D) {
            u && console.log("transfer回数：", D, new Date());
            j.push(D);
            p.tserver(D.server);
            if (D.needNewSearch == true) {
                i = 1;
                $jex.console.info("[联程需要再次调用 ] data.needNewSearch:", D.needNewSearch);
                setTimeout(function() {
                    p.queryNext();
                }, 3500);
            } else {
                $jex.event.trigger(p, "TransferDataReady");
                if (!$jex.$empty(D.data)) {
                    $jex.event.trigger(p, "loadedTransfer", D);
                    if (!z) {
                        $jex.event.trigger(p, "loadedFirstData", D);
                        z = true;
                    }
                } else {
                    $jex.event.trigger(p, "noTransferData", D);
                    $jex.console.info("联程价格数据为空.");
                }
                i = 2;
                p.queryNext();
                s = Math.max(new Date() - x, 0);
            }
        }, {
            onerror: p._onerror
        });
    };
    this.syncCurrentFlightCode = function(B) {};
    var a = "all";
    this.invoke_flightPriceData = function(F, D, E, C) {
        a = C;
        if (D) {
            A = F;
        } else {
            h = F;
            A = "";
        }
        var B = function() {
            if (C === a) {
                E && E();
            }
        };
        p._invoke_flightPriceData(F, B);
    };
    this.correctPriceInfo = function(C, D) {
        var B = this._lastGinfoData;
        this._lastGinfoData = null;
        if (B && B.priceData[D]) {
            C.priceData = {};
            C.labelType = null;
            C.priceInfo[D] = B.priceInfo[D];
        }
    };
    this._invoke_flightPriceData = function(E, D) {
        $jex.console.info("[invoke_flightPriceData]开始调用直飞航班价格数据: flightCode:", E);
        var C = o + "/twell/flight/tags/onewayflight_groupinfo.jsp";
        var B = a;
        k.flightCode = E;
        k.label = a;
        this._lastGinfoData = null;
        $jex.ajax(C, k, function(F) {
            u && console.log("groupInfo", F);
            F.flightCode = E;
            F.labelType = B;
            $jex.event.trigger(p, "loadedGroupinfo", F);
            p._lastGinfoData = F;
            $jex.event.trigger(p, "parsingFlightPriceData", F);
            if (D) {
                D();
            }
            $jex.console.info("[invoke_flightPriceData] 处理完毕");
            PAGE_EVENT.trigger("wrapper_loadData", F);
        }, {
            onerror: p._onerror
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
        var D = this.param;
        var B = o + "/twell/flight/DynamicFlightInfo.jsp";
        var C = {
            departureCity: D.fromCity,
            arrivalCity: D.toCity,
            departureDate: D.fromDate,
            fromCity: D.fromCity,
            toCity: D.toCity
        };
        $jex.merge(C, this.oparam);
        $jex.ajax(B, C, function(E) {
            u && console.log("扩展信息回数：", E, new Date());
            b = E;
            $jex.event.trigger(p, "loadedExtInfo", E);
        }, {
            onerror: p._onerror
        });
    };
    this._invoke_AVData = function() {
        $jex.console.info("调用AV数据");
        var B = o + "/twell/flight/OneWayFlight_Info.jsp";
        $jex.ajax(B, k, function(C) {
            u && console.log("AVData回数：", C, new Date());
            n = C;
            $jex.event.trigger(p, "loadedAVData", C);
            l = true;
            if (!$jex.$empty(C.flightInfo)) {
                if (!z) {
                    $jex.event.trigger(p, "loadedFirstData", C);
                    z = true;
                }
            }
            p.queryNext();
        }, {
            onerror: p._onerror
        });
    };
    this._onerror = function() {
        $jex.event.trigger(p, "onerror", arguments);
    };
    var g = [];
    this.insertTask = function() {
        var B = "task" + $jex.globalID();
        g.push(B);
        return B;
    };
    this.getTask = function() {
        if (g.length == 0) {
            return null;
        }
        return g[0];
    };
    this.finishTask = function(C) {
        for (var B = 0; B < g.length; B++) {
            if (g[B] == C) {
                g.splice(B, 1);
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
        var m = function(i) {
            if (h[i] != null) {
                var k = h[i].lowestPrice();
                if (k != null) {
                    return k;
                } else {
                    return s;
                }
            }
        };
        var x = function(i) {
            if (h[i] != null) {
                var k = FlightListUISorter.sortPrice(h[i].carrierCode(), h[i].lowestPrice());
                if (k != null) {
                    return k;
                } else {
                    return s;
                }
            }
        };
        v.sort(function(k, i) {
            return m(k) - m(i);
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
        $jex.foreach(v, function(i) {
            if (h[i].type == "oneway") {
                f = h[i].carrierCode();
                u = m(i);
                if (u != s && f != t && f in I) {
                    if ($jex.array.indexOf(I[f], i) < 0) {
                        I[f].push(i);
                    }
                } else {
                    if (u == s) {
                        j.push(i);
                    } else {
                        c.push(i);
                    }
                }
            } else {
                if (h[i].type == "transfer") {
                    r.push(i);
                } else {
                    if (h[i].type == "compose") {
                        B.push(i);
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
        $jex.foreach(I, function(i) {
            if (i.length > 0) {
                i.sort(function(n, k) {
                    return x(n) - x(k);
                });
                F.push(i[0]);
                i.splice(0, 1);
                l = l.concat(i);
            }
        });
        c = c.concat(l);
        c.sort(function(k, i) {
            return x(k) - x(i);
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
        E.sort(function(k, i) {
            return x(k) - x(i);
        });
        G = G.concat(E, y);
        M = M.concat(G, c, j);
        v.splice(0, v.length);
        $jex.foreach(M, function(i) {
            v.push(i);
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
    b.rend
