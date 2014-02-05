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
                a[
