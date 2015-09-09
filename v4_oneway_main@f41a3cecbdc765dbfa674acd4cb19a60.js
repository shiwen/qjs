function trackAction(e, t, n) {
    if (trackAction.root) {
        e = trackAction.root + "|" + e
    }
    if (trackAction.prefix && e.indexOf("|") > 0 && e.indexOf("&") < 0) {
        e = e.replace(e.substr(0, trackAction.prefix.length), trackAction.prefix)
    }
    if (trackAction.prefix && e.indexOf("&") >= 0) {
        e = e + "&_module=" + trackAction.prefix
    }
    if (CLIENT_TIME && SERVER_TIME) {
        var r = (new Date).getTime() - CLIENT_TIME.getTime() + SERVER_TIME.getTime()
    } else {
        var r = (new Date).getTime()
    }
    var i = "/site/track.htm?action=" + e + "&t=" + r;
    if (t) {
        i += "&rId=" + t
    } else {
        if (trackAction.rid) {
            i += "&rId=" + trackAction.rid
        }
    }
    if (n) i = i.replace("track.htm", "timetrack.htm");
    if (i.length >= 1024) {
        return
    }
    setTimeout(function() {
        try {
            (new Image).src = i
        } catch (e) {}
    }, 0)
}

function UIObject() {
    this._XGUI_ = true;
    this._content_ = [];
    this._childrens_ = [];
    this._GID_ = "XI" + $jex.globalID();
    this._tplsreg = /\{\#([^\}]*?)\}/
}

function ActionDelay(e) {
    this.delay = e;
    this.timer = null
}

function ActionFlow(e) {
    this.actions = {};
    this.logs = [];
    this.interval = e;
    this.tid = null
}

function XControl(e) {
    this._type = "XControl";
    this._setting = e || {};
    this._onInit_funcArr = [];
    XControl.superclass.constructor.call(this, this._setting);
    var t = null;
    this.dataSource = function(e) {
        if (e == null) {
            return t
        } else {
            t = e
        }
    };
    var n = this._setting;
    if (n.handler) {
        for (var r in n.handler) {
            this[r] = n.handler[r]
        }
    }
    if (n.on) {
        for (var i in n.on) {
            $jex.event.binding(this, i, n.on[i])
        }
    }
}

function XSelect(e) {
    XSelect.superclass.constructor.call(this, e);
    this._type = "XSelect";
    this.selectedItem = null;
    this._currOpt = null;
    this._dataSource = [];
    this.dataSource = null
}

function ScriptRequest(e) {
    if (e.funcName) this.funcName = e.funcName;
    this.callbackName = e.callbackName || "__jscallback";
    this.doc = e.doc || document;
    this.win = $jex.getDocumentWindow(this.doc);
    if (e.onerror) $jex.event.add(this, "error", e.onerror);
    if (e.ontimeout) $jex.event.add(this, "timeout", e.ontimeout);
    if (e.oncancel) $jex.event.add(this, "cancel", e.oncancel);
    if (e.oncomplete) $jex.event.add(this, "complete", e.oncomplete)
}

function DateChecker(e, t, n) {
    e = e || 209;
    t = t || 2;
    n = n || 3;
    var r = QunarDate.gtoday();
    var i = new Date(r.getTime() + e * 24 * 36e5);
    var s = new Date(r.getTime() + t * 24 * 36e5);
    this.date1 = s;
    this.setDate1 = function(e) {
        return this.date1 = this.checkDate1(e).recommendDate
    };
    this.getDate1 = function() {
        return QunarDate.format(this.date1)
    };
    this.date2 = new Date(s.getTime() + n * 24 * 36e5);
    this.setDate2 = function(e, t) {
        return this.date2 = this.checkDate2(e, QunarDate.format(this.date1), t).recommendDate
    };
    this.getDate2 = function() {
        return QunarDate.format(this.date2)
    };
    this.checkDate1 = function(e) {
        r = QunarDate.gtoday();
        return this.checkDate(e, r, i, s)
    };
    this.checkDate2 = function(e, t, r) {
        var s = i,
            o;
        if (r) {
            s = QunarDate.parse(r)
        }
        var u = new Date(this.date1.getTime() + n * 24 * 36e5);
        if (u.getTime() > s.getTime()) u = s;
        o = this.date1;
        return this.checkDate(e, o, s, u)
    };
    this.setDelay2 = function(e) {
        n = e || n
    };
    this.checkDate = function(e, t, n, r) {
        var i = null;
        var s = false;
        var o = null;
        var u = "";
        try {
            i = QunarDate.parse(e)
        } catch (a) {
            s = true;
            o = "格式错误";
            u = "日期格式如: " + QunarDate.format(r);
            i = r
        }
        if (isNaN(i)) {
            s = true;
            o = "格式错误";
            u = "日期格式如: " + QunarDate.format(r);
            i = r
        } else if (t.getTime() > i.getTime()) {
            s = true;
            o = "超出范围";
            u = "应选择" + QunarDate.format(t) + "至" + QunarDate.format(n) + "之间的日期";
            i = r
        } else if (i.getTime() > n.getTime()) {
            s = true;
            o = "超出范围";
            u = "应选择" + QunarDate.format(t) + "至" + QunarDate.format(n) + "之间的日期";
            i = r
        }
        return {
            error: s,
            recommend: QunarDate.format(i),
            recommendDate: i,
            value: o,
            tip: u
        }
    };
    this.getMin = function() {
        return QunarDate.gtoday()
    };
    this.getMax = function() {
        return i
    };
    this.resetMax = function(t, n) {
        var s = t || r;
        var o = n || e;
        i = new Date(s.getTime() + o * 24 * 36e5)
    };
    this.setSpan = function(t) {
        e = t
    };
    this.marks = {};
    this.date2Hide = false;
    this.hideDate2 = function() {
        this.date2Hide = true
    };
    this.showDate2 = function() {
        this.date2Hide = false
    };
    this.getTdStyle = function(e, t, n) {
        n = n || i;
        t = t || r;
        var s = e.getTime();
        var o = "";
        if (s == this.date1.getTime()) o += " curr";
        else if (s == this.date2.getTime() && this.date2Hide == false) {
            o += " curr"
        }
        if (e.getDay() == 0 || e.getDay() == 6) o += " holi";
        if (QunarDate.isHoliday(QunarDate.format(e)) && QunarDate.showIcon(QunarDate.format(e))) {
            o += " holi_sp"
        }
        if (s == QunarDate.gtoday().getTime()) o += " today";
        if (!(t.getTime() <= s && s <= n.getTime())) o += " out";
        return o
    };
    this.isInter = false
}

function DateLayer(e, t) {
    function y() {
        o = {};
        p = {};
        u.length = 0;
        a.length = 0;
        f = l = c = h = null
    }

    function b(e) {
        var t = "/site/track.htm?action=fuzzyDatesFlag" + "|" + e + "|&t=" + Date.parse(new Date);
        (new Image).src = t
    }

    function w() {
        var e = this.getAttribute("value");
        b(encodeURIComponent(e));
        var t = this.getAttribute("data-pos");
        var r = QunarDate.parse(e);
        if (r && r.getTime() >= f.getTime() && r.getTime() <= l.getTime()) {
            $jex.event.trigger(n, "selected", [r, t])
        } else {
            $jex.event.trigger(n, "fuzzySelected", [e]);
            d = this.getAttribute("start");
            v = this.getAttribute("end")
        }
    }

    function E() {
        if (!m) {
            n.render(QunarDate.parse(this.getAttribute("ym")), f, l, null, h)
        } else {
            n.fuzzyRenderPanel(QunarDate.parse(this.getAttribute("ym")), f, l, null, h)
        }
        if (m) {
            var e = S(v);
            $jex.addClassName(e, "curr")
        }
    }

    function S(e) {
        if (!p[e]) {
            var t = o[e];
            p[e] = s.getDomNode(t)
        }
        return p[e]
    }

    function x(e) {
        var t, n, e = e || {};
        for (var r = 0, i = u.length; r < i; r++) {
            n = u[r];
            if (e[n]) {
                e[n] = 0
            } else {
                t = S(n);
                $jex.removeClassName(t, "day_sel_area")
            }
        }
    }

    function T(e) {
        u.length = 0;
        $jex.each(e, function(t, n) {
            u[u.length] = t;
            if (e[t]) {
                var r = S(t);
                $jex.addClassName(r, "day_sel_area")
            }
        })
    }

    function N(e) {
        var t = S(QunarDate.format(e));
        $jex.addClassName(t, "curr")
    }

    function C(e) {
        var t = S(QunarDate.format(e));
        $jex.removeClassName(t, "curr")
    }

    function k(e) {
        return e.getFullYear() + "-" + L(e.getMonth() + 1, 2) + "-" + L(e.getDate(), 2)
    }

    function L(e, t) {
        e = e == null ? "" : e + "";
        for (var n = 0, r = t - e.length; n < r; n++) e = "0" + e;
        return e
    }
    this.panel = e;
    var n = this;
    var r = [];
    var i = true;
    if (e.parentNode.parentNode.className.indexOf("toD") > -1) {
        i = false
    }
    var s;
    var o = {};
    var u = [];
    var a = [];
    var f, l, c, h;
    var p = {};
    var d, v, m, g;
    var A = function(e, t) {
        var n = $jex.ie ? "mouseenter" : "mouseover";
        var i = $jex.ie ? "mouseleave" : "mouseout";
        var s;
        for (var o = 0, u = a.length; o < u; o++) {
            s = S(a[o]);
            $jex.event.bind(s, n, function() {
                e(this);
                D(this);
                $jex.addClassName(this, "hover")
            });
            $jex.event.bind(s, i, function() {
                t(this);
                P(this);
                $jex.removeClassName(this, "hover")
            });
            $jex.event.bind(s, "click", w);
            r.push(s)
        }
        if (g) {
            s = S(g);
            $jex.event.bind(s, "click", w)
        }
    };
    var O = function() {
        for (var e = 0; e < 2; e++) {
            var t = s.getDomNode("a" + e);
            $jex.event.bind(t, "mousedown", E);
            r.push(t)
        }
    };
    var M = function() {
        var e = null;
        var n = function(t) {
            clearTimeout(e)
        };
        var r = function(e) {
            x();
            u.length = 0;
            N(t.date1)
        };
        var i = function(t) {
            clearTimeout(e);
            e = setTimeout(function() {
                r(t)
            }, 150)
        };
        A(n, i)
    };
    var _ = function() {
        var e = null;
        var n = function(n) {
            clearTimeout(e);
            var r = n.getAttribute("value");
            var s = QunarDate.parse(r);
            var o = t.date1;
            var u = t.date2;
            var a = {};
            if (i) {
                if (QunarDate.compareDate(o, s) > 0) {
                    a = QunarDate.getDatesOffset(r, QunarDate.format(u))
                } else if (QunarDate.compareDate(s, u) > 0) {
                    a = {}
                } else {
                    a = QunarDate.getDatesOffset(r, QunarDate.format(u))
                }
                C(o);
                N(u)
            } else {
                a = QunarDate.getDatesOffset(QunarDate.format(o), r);
                C(u);
                N(o)
            }
            x(a);
            T(a)
        };
        var r = function() {
            var e = t.date1;
            var n = t.date2;
            var r = QunarDate.getDatesOffset(QunarDate.format(e), QunarDate.format(n));
            N(e);
            N(n);
            x(r);
            T(r)
        };
        var s = function() {
            clearTimeout(e);
            e = setTimeout(function() {
                r()
            }, 150)
        };
        A(n, s)
    };
    var D = function(e) {
        var n = e.getAttribute("start"),
            r = e.getAttribute("end"),
            i = {};
        if (!n || !r) {
            return
        }
        var s = window.SERVER_TIME || new Date;
        if (s > QunarDate.parse(n)) {
            n = QunarDate.format(s)
        }
        C(t.date1);
        C(t.date2);
        N(QunarDate.parse(n));
        N(QunarDate.parse(r));
        i = QunarDate.getDatesOffset(n, r);
        x(i);
        T(i)
    };
    var P = function(e) {
        var t = e.getAttribute("start"),
            n = e.getAttribute("end"),
            r = {};
        if (!t || !n) {
            return
        }
        C(QunarDate.parse(t));
        C(QunarDate.parse(n))
    };
    var H = function() {
        var e = null;
        var t = function(t) {
            clearTimeout(e);
            if (QunarDate.getFuzzyDate(t.getAttribute("value"))) {
                C(QunarDate.parse(v))
            }
        };
        var n = function() {
            var e = QunarDate.getDatesOffset(d, v);
            x(e);
            T(e);
            N(QunarDate.parse(d));
            N(QunarDate.parse(v))
        };
        var r = function() {
            clearTimeout(e);
            e = setTimeout(function() {
                n()
            }, 150)
        };
        A(t, r)
    };
    var B = function() {
        for (var e = 0, t = r.length; e < t; e++) {
            $jex.event.clear(r[e])
        }
        r.length = 0
    };
    var j = function(n, r, i, p, d) {
        if (!window.QunarDate) {
            window.QunarDate = {};
            QunarDate.gtoday = function() {
                var e = window.GSERVER_TIME || new Date;
                return new Date(e.getFullYear(), e.getMonth(), e.getDate())
            }
        }
        c = p || 0;
        f = r || t.getMin();
        l = i || t.getMax();
        h = d || {};
        if (m && p !== null) {
            $jex.foreach(h, function(e, t, r) {
                if (t === 0) {
                    n = e;
                    return
                }
            })
        }
        var v = 0;
        var y = 0;
        s = new UIObject;
        s.text('<div class="ui-calendar">');
        window.QNR && window.QNR.isLocal && s.text('<div class="m-tm-p" style="color:#ff6600;postion:relative;width:0; height:0;"><div class="code" style="position:absolute; left:0; top:0; width: 480px;text-align:center;font-size: 14px;font-weight: bold;line-height: 37px;">出发地时间</div></div>');
        $jex.array.each([0, 1], function(e, r) {
            var i = new Date(n.getFullYear(), n.getMonth() + e - c, 1);
            var p = i.getMonth() + 1;
            var d = QunarDate.convert2digit(p);
            var m = i.getFullYear();
            var g = new Date(m, i.getMonth(), 0);
            var b = new Date(m, i.getMonth(), 1);
            var w = new Date(m, i.getMonth() + 1, 1);
            var E = (new Date(m, p - 1, 1)).getDay() - 1;
            if (E < 0) E = 6;
            var S = (new Date(m, p, 0)).getDate();
            var x = r == 0 ? f.getTime() <= g.getTime() : w.getTime() <= l.getTime();
            s.text('<div class="m-part">');
            s.text("<h3>");
            s.append("<a ", "a" + y++).text(' class="', r ? "downTd" : "upTd", '" ym="', QunarDate.format(r ? b : g), '" style="', x ? "display:block" : "display:none", '" href="javascript:;"></a>', m, "年", p, "月</h3>");
            s.text('<div class="thwrap">');
            s.text('<table cellspacing="0" cellpadding="0" border="0">');
            s.text('<tr class="thead"><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td class="holi">六</td><td class="holi">日</td></tr>');
            s.text("</table>");
            s.text("</div>");
            s.text('<div class="tdwrap">');
            s.text('<table cellspacing="0" cellpadding="0" border="0">');
            var T = 0;
            var N = /out$/;
            var C = "";
            for (var k = 0; k < 42; k++) {
                if (k % 7 == 0) s.text('<tr class="tdate">');
                if (k < E) {
                    s.text('<td class="cnone">&nbsp;</td>')
                } else if (T < S) {
                    T++;
                    var L = T;
                    var A = QunarDate.convert2digit(T);
                    var O = m + "-" + d + "-" + A;
                    var M = new Date(m, p - 1, T);
                    var _ = QunarDate.gtoday();
                    if (QunarDate.compareDate(M, _) === 0) {
                        L = "今天"
                    }
                    if (QunarDate.isHoliday(O) && QunarDate.showIcon && QunarDate.showIcon(O)) {
                        L = QunarDate.getHolidayName(O)
                    }
                    o[O] = v;
                    C = t.getTdStyle(M, f, l);
                    if (!N.test(C)) {
                        a[a.length] = O
                    }
                    if (!!h[O]) {
                        u[u.length] = O;
                        s.append("<td ", v++).text(' value="', O, '" data-pos="', e, '" class=" day_sel_area  ', C, '" >', L, "</td>")
                    } else {
                        s.append("<td ", v++).text(' value="', O, '" data-pos="', e, '" class="', C, '" >', L, "</td>")
                    }
                } else s.text('<td class="cnone">&nbsp;</td>');
                if (k % 7 == 6) s.text("</tr>")
            }
            s.text("</table></div></div>")
        });
        if (t.isInter) {
            s.text('<div class="m-fuzzy-box">');
            s.text(' <ul class="m-fuzzy-lst clrfix">');
            var b = QunarDate.gtoday(),
                w = b.getMonth(),
                E = b.getFullYear();
            var S = 0;
            for (var x = 0; x < 5; x++) {
                month = w + x;
                if (month > 12) {
                    month -= 12;
                    year = E + 1
                } else {
                    year = E
                }
                start = x == 0 ? b : new Date(year, month, 1);
                end = new Date(year, month, (new Date(year, month + 1, 0)).getDate());
                label = start.getMonth() + 1 + "月";
                var T = m == label ? "hover" : "";
                o[label] = v;
                a[a.length] = label;
                s.append("<li ", v++).text(' value="', label, '" start="', k(start), '" end="', k(end), '" class="', T, '">', label, "</li>");
                S++
            }
            var N = QunarDate.getFuzzyDateText0();
            $jex.array.each(N, function(e, t) {
                var n = QunarDate.getFuzzyDate(e);
                if (QunarDate.parse(n.last) > b && S < 10) {
                    if (m == e) {
                        _class = "hover";
                        g = e;
                        o[e] = v
                    } else {
                        a[a.length] = e;
                        o[e] = v;
                        _class = ""
                    }
                    S++;
                    s.append("<li ", v++).text(' value="', n.value, '" start="', n.start, '" end="', n.end, '" class="', _class, '">', e, "</li>")
                }
            });
            s.text(" </ul>");
            s.text("</div>")
        }
        s.text("</div>");
        s.write(e);
        F()
    };
    var F = function() {
        var e = QunarDate.getFuzzyDateText0().slice(5);
        var t = 0;
        $jex.array.each(e, function(e, n) {
            var r = QunarDate.getFuzzyDate(e);
            var i = QunarDate.parse(r.start);
            if (QunarDate.gtoday() < i && t < 5) {
                t++
            } else {
                var s = S(e);
                if (s) s.style.display = "none"
            }
        })
    };
    var I = function() {
        var e = function() {};
        A(e, e)
    };
    this.render = function(e, n, r, i, s, o) {
        m = "";
        B();
        y();
        j(e, n, r, i, s);
        if (t.date2Hide) {
            M()
        } else {
            _()
        }
        O()
    };
    this.fuzzyRenderPanel = function(e, n, r, s, o) {
        var u = QunarDate.getFuzzyDate(e),
            a, f;
        B();
        y();
        if (!u) {
            j(e, n, r, s, o)
        } else {
            m = e;
            var l = window.SERVER_TIME || new Date;
            if (/^\d{1,2}月$/.test(e)) {
                var c = parseInt(e.replace("月", "")) - 1,
                    h = l.getMonth(),
                    p = c < h ? l.getFullYear() + 1 : l.getFullYear(),
                    g = c == h ? l : new Date(p, c, 1),
                    b = new Date(p, c, (new Date(p, c + 1, 0)).getDate());
                u.start = QunarDate.format(g);
                u.end = QunarDate.format(b)
            }
            d = l > QunarDate.parse(u.start) ? QunarDate.format(l) : u.start;
            v = u.end;
            a = QunarDate.getDatesOffset(d, v);
            t.setDate1(d);
            t.setDate2(v);
            f = i ? 0 : QunarDate.parse(d);
            j(QunarDate.gtoday(), f, 0, 0, a);
            N(QunarDate.parse(v))
        }
        H();
        O()
    }
}

function FlashAdUI(e) {
    FlashAdUI.superclass.constructor.call(this, e);
    this._type = "FlashAdUI"
}

function WrapperEntity() {
    this._valCache = {}
}

function VendorEntity() {
    var e = null;
    this.ownerWrapper = function(t) {
        if (t == null) {
            return e
        } else {
            e = t
        }
    };
    var t = null;
    this.dataSource = function(e) {
        if (e == null) {
            if (t == null) {
                $jex.console.error("没有vendor数据", this.wrapperId())
            }
            return t
        } else {
            t = e
        }
    };
    this.get = function(e) {
        var t = this.dataSource();
        return e && t ? t[e] : t
    };
    var n = null;
    this.seq = function(e) {
        if (e) {
            n = e
        } else {
            if (typeof n == "undefined" || n == null) {
                this.checkLine()
            }
            return n
        }
    };
    var r = null;
    this.adwords = function(e) {
        if (e) {
            r = e
        } else {
            if (typeof r == "undefined" || r == null) {
                this.checkLine()
            }
            return r
        }
    };
    var i = null;
    this.comment = function() {
        try {
            if (typeof i == "undefined" || i == null) {
                if (this.dataSource().recommend && this.dataSource().recommend.comment) {
                    i = this.dataSource().recommend.comment
                } else {
                    i = ""
                }
            }
        } catch (e) {
            $jex.console.error(this.wrapperId() + " VendorEntity 缺失 recommend comment 信息");
            i = ""
        }
        return i
    }
}

function WrapperListEntity() {
    var e = null;
    this.commInfoMgr = function(t) {
        if (t == null) {
            return e
        } else {
            e = t
        }
    };
    var t = null;
    this.flightInfoMgr = function(e) {
        if (e == null) {
            return t
        } else {
            t = e
        }
    };
    var n = null;
    this.ownerFlight = function(e) {
        if (e == null) {
            return n
        } else {
            n = e;
            this.commInfoMgr(n.commInfoMgr());
            this.flightInfoMgr(n.flightInfoMgr())
        }
    };
    var r = null;
    this.dataSource = function(e) {
        if (e == null) {
            return r
        } else {
            r = e;
            this._update(e)
        }
    };
    WrapperListEntity.superclass.constructor.call(this)
}

function OnewayFlightWrapperEntity(e) {
    OnewayFlightWrapperEntity.superclass.constructor.call(this, e);
    this._type = "OnewayFlightWrapperEntity"
}

function OnewayFlightWrapperListEntity() {
    OnewayFlightWrapperListEntity.superclass.constructor.call(this)
}

function FlightUI(e) {
    FlightUI.superclass.constructor.call(this, e);
    this._type = "FlightUI";
    this._state = 0;
    if (window["UICacheManager"]) {
        UICacheManager.addToCache(this)
    }
}

function WrapperUI() {
    WrapperUI.superclass.constructor.call(this);
    this.bookingScreenUI = new BookingScreenUI;
    this.bookingLockScreenUI = new BookingLockScreenUI;
    this.starUI = new StarRankUI;
    this.starUI.ownerWrapperUI(this);
    var e = null;
    this.ownerListUI = function(t) {
        if (t == null) {
            return e
        } else {
            e = t
        }
    };
    this.stat = new StatProvider
}

function FlightListUI(e) {
    FlightListUI.superclass.constructor.call(this, e);
    this._type = "FlightListUI";
    this._cachelist = {};
    this.firstCodeClick = false;
    this.secondCodeClick = false
}

function FilterListUI(e) {
    FilterListUI.superclass.constructor.call(this, e);
    this._type = "FilterListUI";
    this._filterConf = e && e.filterConf ? e.filterConf : {};
    this._list = new $jex.List;
    this._cacheItem = {};
    this._filterPanel = []
}

function FilterUI(e) {
    FilterUI.superclass.constructor.call(this, e);
    this._type = "FilterUI";
    var t = null;
    this.ownerList = function(e) {
        if (e == null) {
            return t
        } else {
            t = e
        }
    };
    var n = null;
    this.catalog = function(e) {
        if (e == null) {
            return n
        } else {
            n = e
        }
    };
    var r = false;
    this.visible = function(e) {
        if (e == null) {
            return r
        } else {
            r = e
        }
    };
    this._groups = {};
    this._checkboxes = {};
    this._displayboxes = []
}

function FilterCheckBoxUI(e) {
    FilterCheckBoxUI.superclass.constructor.call(this, e);
    this._type = "FilterCheckBoxUI";
    var t = false;
    this.checked = function(e) {
        if (e == null) {
            return t
        } else {
            t = e
        }
    };
    var n = null;
    this.ownui = function(e) {
        if (e == null) {
            return n
        } else {
            n = e
        }
    }
}

function FilterItemListUI(e) {
    FilterItemListUI.superclass.constructor.call(this, e);
    this._type = "FilterItemListUI";
    var t = null;
    this.owner = function(e) {
        if (e == null) {
            return t
        } else {
            t = e
        }
    };
    this._isNull = false
}

function FilterItemUI(e) {
    FilterItemUI.superclass.constructor.call(this, e);
    this._type = "FilterItemUI";
    var t = null;
    this.owner = function(e) {
        if (e == null) {
            return t
        } else {
            t = e
        }
    };
    var n = null;
    this.catalog = function(e) {
        if (e == null) {
            return n
        } else {
            n = e
        }
    };
    var r = null;
    this.ownerFilter = function(e) {
        if (e == null) {
            return r
        } else {
            r = e
        }
    };
    this._text = []
}

function DomesticOnewayFilterListUI(e) {
    DomesticOnewayFilterListUI.superclass.constructor.call(this, e);
    this._type = "DomesticOnewayFilterListUI"
}

function OnewayFilterCheckBoxUI(e) {
    OnewayFilterCheckBoxUI.superclass.constructor.call(this, e);
    this._type = "OnewayFilterCheckBoxUI";
    this._key = e.key
}

function OnewayFilterUI(e) {
    OnewayFilterUI.superclass.constructor.call(this, e);
    this._type = "OnewayFilterUI"
}

function BookingLockScreenUI(e) {
    BookingLockScreenUI.superclass.constructor.call(this, e)
}

function OnewayFlightUI(e) {
    OnewayFlightUI.superclass.constructor.call(this, e);
    this._type = "OnewayFlightUI";
    this.clicked = false;
    if (ConfigManager.getConfig("pageId") == "onewayDetail") {
        this._state = 1
    }
}

function _logWrapperOpen() {
    $jex.logHelp.lastOpenWrapperTime = (new Date).getTime();
    $jex.logHelp.openWrapperCount = $jex.logHelp.openWrapperCount ? $jex.logHelp.openWrapperCount + 1 : 1;
    $jex.log({
        s: "flight",
        p: "onewayList",
        r: "openWrapper"
    });
    if (!$jex.logHelp.isLogedFirstOpenWrapper) {
        var e = (new Date).getTime() - window.CLIENT_TIME.getTime();
        if (e <= 0 || e > 60 * 60 * 1e3) {
            return
        }
        $jex.log({
            s: "flight",
            p: "onewayList",
            r: "openWrapperDuration",
            duration: e
        });
        $jex.logHelp.isLogedFirstOpenWrapper = true
    }
}

function AVFlightVendorListUI(e) {
    AVFlightVendorListUI.superclass.constructor.call(this, e);
    this._type = "AVFlightVendorListUI";
    var t = null;
    this.owner = function(e) {
        if (e == null) {
            return t
        } else {
            t = e
        }
    };
    this.extui = new FlightInfoExtBarUI
}

function VendorListUI(e) {
    VendorListUI.superclass.constructor.call(this, e);
    this._type = "TransferFlightVendorListUI";
    UICacheManager.addToCache(this)
}

function OnewayFlightVendorListUI(e) {
    OnewayFlightVendorListUI.superclass.constructor.call(this, e);
    this._type = "OnewayFlightVendorListUI";
    var t = null;
    this.owner = function(e) {
        if (e == null) {
            return t
        } else {
            t = e
        }
    };
    var n = null;
    this.dataSource = function(e) {
        if (e == null) {
            return n
        } else {
            n = e
        }
    };
    this.extui = new FlightInfoExtBarUI;
    this.extui.wrapperList(this);
    this.wrlistUI = new OnewayFlightWrapperListUI;
    this.wrlistUI.ownerVendorListUI(this);
    this.mainWrlistUI = new OnewayFlightWrapperListUI;
    this.mainWrlistUI.ownerVendorListUI(this);
    this.mainWrlistUI.isMainFlight(true);
    UICacheManager.addToCache(this)
}

function WrapperListUI(e) {
    WrapperListUI.superclass.constructor.call(this, e);
    var t = null;
    this.ownerVendorListUI = function(e) {
        if (e == null) {
            return t
        } else {
            t = e
        }
    };
    this.placeHolderId = this.newid("wrlistPH");
    this.wrapperHeadId = this.newid("wrapperHd");
    this._wrUIcache = {}
}

function OnewayFlightWrapperListUI(e) {
    OnewayFlightWrapperListUI.superclass.constructor.call(this, e);
    this._type = "OnewayFlightWrapperListUI";
    var t = false;
    this.isMainFlight = function(e) {
        if (e == null) {
            return t
        } else {
            t = e
        }
    };
    this.invokeDataStatus = 0;
    this.enableShareCode = false;
    this.adVendorCount = 0;
    UICacheManager.addToCache(this)
}

function OnewayFlightWrapperUI(e) {
    OnewayFlightWrapperUI.superclass.constructor.call(this, e);
    this._type = "OnewayFlightWrapperUI";
    this.starUI = new OnewayStarRankUI;
    this.starUI.ownerWrapperUI(this);
    this._cache = {};
    this._itemClass = "qvt-column";
    this._isFrist = false;
    UICacheManager.addToCache(this)
}

function FlagshipOnewayFlightWrapperUI(e) {
    FlagshipOnewayFlightWrapperUI.superclass.constructor.call(this, e);
    this._type = "FlagshipOnewayFlightWrapperUI";
    this._itemClass = "qvt-column";
    this.starUI = new OnewayStarRankUI;
    this.starUI.ownerWrapperUI(this);
    UICacheManager.addToCache(this)
}

function FreeManOnewayFlightWrapperUI(e) {
    FreeManOnewayFlightWrapperUI.superclass.constructor.call(this, e);
    this._type = "FreeManOnewayFlightWrapperUI";
    this._itemClass = "qvt-column";
    this.starUI = new OnewayStarRankUI;
    this.starUI.ownerWrapperUI(this);
    UICacheManager.addToCache(this)
}

function OtaOnewayFlightWrapperUI(e) {
    OtaOnewayFlightWrapperUI.superclass.constructor.call(this, e);
    this._type = "OtaOnewayFlightWrapperUI";
    this._itemClass = "qvt-column";
    this.starUI = new OnewayStarRankUI;
    this.starUI.ownerWrapperUI(this);
    UICacheManager.addToCache(this)
}

function YouFeiOnewayFlightWrapperUI(e) {
    YouFeiOnewayFlightWrapperUI.superclass.constructor.call(this, e);
    this._type = "YouFeiOnewayFlightWrapperUI";
    this._itemClass = "qvt-column";
    this.starUI = new OnewayStarRankUI;
    this.starUI.ownerWrapperUI(this);
    UICacheManager.addToCache(this)
}

function ZiyouxingOnewayFlightWrapperUI(e) {
    ZiyouxingOnewayFlightWrapperUI.superclass.constructor.call(this, e);
    this._type = "ZiyouxingOnewayFlightWrapperUI";
    this._itemClass = "qvt-column";
    this.starUI = new OnewayStarRankUI;
    this.starUI.ownerWrapperUI(this);
    UICacheManager.addToCache(this)
}

function TcabinOnewayFlightWrapperUI(e) {
    TcabinOnewayFlightWrapperUI.superclass.constructor.call(this, e);
    this._type = "TcabinOnewayFlightWrapperUI";
    this._itemClass = "qvt-column";
    this.starUI = new OnewayStarRankUI;
    this.starUI.ownerWrapperUI(this);
    UICacheManager.addToCache(this)
}

function PriceKingOnewayFlightWrapperUI(e) {
    PriceKingOnewayFlightWrapperUI.superclass.constructor.call(this, e);
    this._type = "PriceKingOnewayFlightWrapperUI";
    this._itemClass = "qvt-column";
    this.starUI = new OnewayStarRankUI;
    this.starUI.ownerWrapperUI(this);
    UICacheManager.addToCache(this)
}

function YouFeiDaiOnewayFlightWrapperUI(e) {
    YouFeiDaiOnewayFlightWrapperUI.superclass.constructor.call(this, e);
    this._type = "YouFeiDaiOnewayFlightWrapperUI";
    this._itemClass = "qvt-column";
    this.starUI = new OnewayStarRankUI;
    this.starUI.ownerWrapperUI(this);
    UICacheManager.addToCache(this)
}

function FcCabinOnewayFlightWrapperUI(e) {
    FcCabinOnewayFlightWrapperUI.superclass.constructor.call(this, e);
    this._type = "FcCabinOnewayFlightWrapperUI";
    this._itemClass = "qvt-column";
    this.starUI = new OnewayStarRankUI;
    this.starUI.ownerWrapperUI(this);
    UICacheManager.addToCache(this)
}

function BcCabinOnewayFlightWrapperUI(e) {
    BcCabinOnewayFlightWrapperUI.superclass.constructor.call(this, e);
    this._type = "BcCabinOnewayFlightWrapperUI";
    this._itemClass = "qvt-column";
    this.starUI = new OnewayStarRankUI;
    this.starUI.ownerWrapperUI(this);
    UICacheManager.addToCache(this)
}

function FpCabinOnewayFlightWrapperUI(e) {
    FpCabinOnewayFlightWrapperUI.superclass.constructor.call(this, e);
    this._type = "FpCabinOnewayFlightWrapperUI";
    this._itemClass = "qvt-column";
    this.starUI = new OnewayStarRankUI;
    this.starUI.ownerWrapperUI(this);
    UICacheManager.addToCache(this)
}

function PeCabinOnewayFlightWrapperUI(e) {
    PeCabinOnewayFlightWrapperUI.superclass.constructor.call(this, e);
    this._type = "PeCabinOnewayFlightWrapperUI";
    this._itemClass = "qvt-column";
    this.starUI = new OnewayStarRankUI;
    this.starUI.ownerWrapperUI(this);
    UICacheManager.addToCache(this)
}

function HistoryPriceUI(e) {
    HistoryPriceUI.superclass.constructor.call(this, e);
    this._type = "HistoryPriceUI";
    var t = 0;
    this.state = function(e) {
        if (e == null) {
            return t
        } else {
            t = e
        }
    }
}

function FlightInfoExtBarUI(e) {
    FlightInfoExtBarUI.superclass.constructor.call(this, e);
    this._type = "FlightInfoExtBarUI";
    this.hpUI = new HistoryPriceUI;
    var t = null;
    this.wrapperList = function(e) {
        if (e == null) {
            return t
        } else {
            t = e
        }
    }
}

function StarRankUI(e) {
    StarRankUI.superclass.constructor.call(this, e);
    this._type = "StarRankUI";
    this.url = "http://www.qunar.com/bookingFeedback/interface/userRemark.jsp";
    var t = null;
    this.ownerWrapperUI = function(e) {
        if (e == null) {
            return t
        } else {
            t = e
        }
    };
    this.agentUIO = new UIObject;
    this.star_dw = new StarPickerUI({
        name: "dw",
        title: "网站使用",
        desc: ["无法使用", "很难使用", "一般般吧", "使用较方便", "使用很方便，赞！"]
    });
    this.star_db = new StarPickerUI({
        name: "db",
        title: "价格真实",
        desc: ["机票经常售完", "经常遇到支付后要求加价", "经常遇到支付前要求加价", "偶尔遇到售完或要求加价", "从未遇到过售完或要求加价"]
    });
    this.star_ds = new StarPickerUI({
        name: "ds",
        title: "售后服务",
        desc: ["服务很差劲", "服务挺差的", "服务一般", "服务还不错", "服务非常好，赞！"]
    });
    this.starList = [this.star_dw, this.star_db, this.star_ds];
    this.commitOpened = false
}

function StarPickerUI(e) {
    StarPickerUI.superclass.constructor.call(this, e);
    this._type = "StarPickerUI"
}

function OnewayStarRankUI(e) {
    OnewayStarRankUI.superclass.constructor.call(this, e);
    this._type = "OnewayStarRankUI"
}

function StopInfoUI(e) {
    StopInfoUI.superclass.constructor.call(this, e);
    this._type = "StopInfoUI";
    var t = null;
    this.owner = function(e) {
        if (e == null) {
            return t
        } else {
            t = e
        }
    };
    this.placeHolderId = this.newid("MyPH")
}

function OTABlade(e) {
    this.extractor = e;
    this.group = new OTAGroup;
    this._wrLen = 0
}

function OTAInfoExtractor(e) {
    this.flight_map = {};
    this.flight_array = [];
    if (e) {
        $jex.merge(this, e)
    }
}

function OnewayOTAInfoExtractor() {
    OTAInfoExtractor.call(this)
}

function RoundtripOTAInfoExtractor() {
    OTAInfoExtractor.call(this)
}

function OTAFlight(e) {
    this.keycode = e;
    this.wrappers = {};
    this._out = null;
    this._ret = null
}

function OTAOnewayFlight(e) {
    OTAFlight.call(this, e)
}

function OTARoundtripFlight(e) {
    OTAFlight.call(this, e)
}

function OTATransferFlight(e) {
    OTAFlight.call(this, e)
}

function OTAWrapper(e, t) {
    this.flight = e;
    this.info = t
}

function OTAGroup(e) {
    this.opts = $jex.merge({
        debug: false,
        carrier_white_filter: null,
        carrier_black_filter: null,
        elsCount: 10,
        currentDate: new Date,
        fromDate: new Date,
        queryID: ""
    }, e);
    this.resultmap = {};
    this._store = {
        0: [],
        1: [],
        2: [],
        3: []
    }
}

function setIfrmHeight(e, t) {
    var n = QadAdUnits.$E(e);
    if (n) {
        n.style.height = t + "px"
    }
}(function(e) {
    function t() {
        if (System && System.param && System.param.fromCity) {
            var e = System.param.fromCity + "|" + System.param.toCity + "|" + System.param.fromDate
        } else if (System && System.param && System.param.searchDepartureAirport) {
            var e = System.param.searchDepartureAirport + "|" + System.param.searchArrivalAirport + "|" + System.param.searchDepartureTime
        } else {
            return false
        }
        return n(e)
    }

    function n(e) {
        var t = 0;
        var n = e.length;
        var r = 2147483648;
        for (var i = 0; i < n; i++) {
            t = 31 * t + e.charCodeAt(i);
            if (t > r) t %= r
        }
        return t
    }
    e.addHtag = function(e) {
        var n = t();
        if (n != false) {
            e.setRequestHeader("htag", t())
        }
    }
})(window);
(function(e) {
    var t = /(\d{4})-(\d{1,2})-(\d{1,2})/g;
    var n = e.location.href;
    if (t.test(n)) {
        var r = false;
        n = n.replace(t, function(e, t, n, i) {
            var s = t;
            var o = false;
            if (n.length === 1) {
                r = o = true;
                s += "-0" + n
            } else {
                s += "-" + n
            }
            if (i.length === 1) {
                r = o = true;
                s += "-0" + i
            } else {
                s += "-" + i
            }
            if (o) {
                return s
            }
            return e
        });
        if (r) {
            e.location.href = n;
            return
        }
    }
})(window);
var OTA_AD_CONFIG = {
    white_list: "CZ,CA,ZH,3U,FM,HU,MF,MU,SC,BK,KN,JR,JD,8L,9C,GS,KY,UQ,GX,DZ,QW,FU,DR,HO,NS,GJ,TV,AQ,YI,G5,EU,PN,CN",
    black_list: "",
    route_by_white_list: [/\/site\/oneway_list.htm\?/, /\/site\/roundtrip_list_new.htm\?/],
    route_by_black_list: [/\/site\/oneway_list_inter.htm\?/, /\/site\/interroundtrip_compare.htm\?/]
};
var oneway_config = {
    late: 50,
    rank: {
        TITLE: {
            G1: "较可靠,推荐购买",
            G2: "较可靠,推荐购买",
            G3: "可能过期,谨慎购买",
            G4: "需申请,谨慎购买",
            G5: "供参考,可尝试购买"
        },
        GTITLE: {
            AD_G1: ["", "", "", ""],
            AD_G2: ["", "", "", ""],
            AD_G3: ["可能过期", "可能过期", "可能过期", "可能过期"],
            AD_G4: ["需申请", "需申请", "需申请", "需申请"],
            AD_G5: ["仅供参考", "仅供参考", "仅供参考", "仅供参考"],
            nonAD_G1: ["", "", "", ""],
            nonAD_G2: ["", "", "", ""],
            nonAD_G3: ["可能过期", "可能过期", "可能过期", "可能过期"],
            nonAD_G4: ["需申请", "需申请", "需申请", "需申请"],
            nonAD_G5: ["仅供参考", "仅供参考", "仅供参考", "仅供参考"]
        }
    },
    PayCarrierList: {
        CA: true,
        CZ: true,
        "8L": true,
        SC: true,
        JD: true,
        PN: true,
        GS: true,
        HU: true,
        MU: true,
        ZH: true,
        "3U": true
    },
    PayCarrierSort: {
        HU: [],
        "3U": [],
        GS: [],
        MF: [],
        "8L": [],
        PN: [],
        MU: [],
        HO: [],
        JD: [],
        JR: [],
        BK: [],
        CA: [],
        SC: [],
        ZH: [],
        CZ: [],
        TV: []
    },
    StrikingCarrier: {
        "9C": 100
    },
    NonStrikingCarrier: {},
    NoNeedStatementList: ["9C"],
    SpecialRecommend: {
        price: 200
    },
    DefaultTax: {
        FUEL: 0,
        ACF: 50
    },
    SpringHotConfig: {
        springDate: new Date("2009/01/26"),
        startShowDate: new Date("2008/10/01"),
        endShowDate: new Date("2009/03/20"),
        roundtripspringStartDate: new Date("2009/01/11"),
        springStartDate: new Date("2009/01/11"),
        springEndDate: new Date("2009/02/19")
    },
    OnewayListShareConfig: {
        shareCodeNum: 8,
        mainCodeNum: 6,
        showornotshow: {}
    },
    CuxiaoConfig: {
        gnd0907cxcp: {
            name: "川航促销专区",
            text: "直减10元"
        },
        gndcphnair2: {
            name: "海航促销专区",
            text: "后返10元"
        }
    },
    AirlineDirectSelling: ["gndcphnair0", "ws11072515a", "wsairgs00cp", "wsairpn01cp", "wsair8l00cp", "gnd090722cp", "gnd8airczcp", "gndairzh001", "gndairmu003", "gndairca001", "gndairaqi01", "gndairgji01"],
    PakageConfig: ["cpf", "btf", "lpf", "uff", "lcf", "laf", "fpc", "pec", "fcc", "bcc", "bpf", "tnlpf", "tnuff"],
    OnewayListLabels: {
        preferences: {
            text: "已减",
            color: "red",
            classSuffix: "tcabin",
            keepRank: "109",
            sortRank: "58"
        },
        fastPrintTicket: {
            text: "",
            color: "green",
            classSuffix: "ota",
            keepRank: "30",
            sortRank: "111"
        },
        youfei: {
            text: "优飞币抵",
            color: "red",
            classSuffix: "yf",
            keepRank: "107",
            sortRank: "56"
        },
        fakeYoufei: {
            text: "已抵",
            color: "red",
            classSuffix: "csyf",
            keepRank: "108",
            sortRank: "57"
        },
        youfeidai: {
            text: "现付",
            color: "red",
            classSuffix: "youfeidai",
            keepRank: "108",
            sortRank: "57"
        },
        lifan: {
            text: "支付立返",
            color: "red",
            classSuffix: "lifan",
            keepRank: "99",
            sortRank: "55"
        },
        airlineDirectSelling: {
            text: "直营",
            color: "blue",
            classSuffix: "directsell",
            keepRank: "106",
            sortRank: "109"
        },
        freeman: {
            text: "",
            color: "green",
            classSuffix: "fullreturn",
            keepRank: "104",
            sortRank: "107"
        },
        ziyouxing: {
            text: "机票+车券套餐",
            color: "red",
            classSuffix: "ziyouxing",
            keepRank: "103",
            sortRank: "106"
        },
        youngAndOld: {
            text: "青老年",
            color: "red",
            classSuffix: "youngold",
            keepRank: "100",
            sortRank: "80"
        },
        airlineOfficial: {
            text: "官网",
            color: "blue",
            classSuffix: "official",
            keepRank: "105",
            sortRank: "108"
        },
        firstClassCabin: {
            text: "头等舱",
            color: "red",
            classSuffix: "firstcabin",
            keepRank: "110",
            sortRank: "120"
        },
        businessCabin: {
            text: "商务舱",
            color: "red",
            classSuffix: "businesscabin",
            keepRank: "110",
            sortRank: "120"
        },
        specialCabin: {
            text: "超值头等舱",
            color: "red",
            classSuffix: "specialcabin",
            keepRank: "110",
            sortRank: "120",
            addClass: "specialCabin"
        },
        flagshipCoupon: {
            text: "直减20%",
            color: "red",
            classSuffix: "flagship",
            keepRank: "20",
            sortRank: "55"
        },
        transferPackage: {
            text: "中转特价包",
            color: "red",
            classSuffix: "transpg",
            keepRank: "10",
            sortRank: "70"
        },
        youfeiCoin: {
            text: "送优飞币",
            color: "red",
            classSuffix: "youfeicoin",
            keepRank: "102",
            sortRank: "59"
        },
        pickCar: {
            text: "",
            color: "green",
            classSuffix: "pickcar",
            keepRank: "50",
            sortRank: "60"
        },
        hasAgeLimit: {
            text: "年龄限制",
            color: "red",
            classSuffix: "agelimit",
            keepRank: "101",
            sortRank: "81"
        },
        allDays: {
            text: "",
            color: "green",
            classSuffix: "allDays",
            keepRank: "29",
            sortRank: "110"
        },
        freePostage: {
            text: "",
            color: "green",
            classSuffix: "freePostage",
            keepRank: "50",
            sortRank: "50"
        },
        flyfundCanUse: {
            text: "可用飞基金",
            color: "red",
            classSuffix: "flyfund",
            keepRank: "111",
            sortRank: "61"
        },
        flyfundRefund: {
            text: "返飞基金",
            color: "red",
            classSuffix: "flyfund",
            keepRank: "112",
            sortRank: "62"
        },
        FpCabinProduct: {
            text: "高端经济",
            color: "red",
            classSuffix: "FpCabinProduct",
            keepRank: "112",
            sortRank: "111"
        },
        FcCabinProduct: {
            text: "豪华头等",
            color: "red",
            classSuffix: "FcCabinProduct",
            keepRank: "112",
            sortRank: "111"
        },
        BcCabinProduct: {
            text: "商务舱",
            color: "red",
            classSuffix: "BcCabinProduct",
            keepRank: "112",
            sortRank: "111"
        },
        PeCabinProduct: {
            text: "经济舱精选",
            color: "red",
            classSuffix: "PeCabinProduct",
            keepRank: "112",
            sortRank: "111"
        },
        FeiDaRen: {
            text: "飞达人",
            color: "green",
            classSuffix: "FeiDaRen",
            keepRank: "110",
            sortRank: "108"
        }
    }
};
var $jex = {
    ie: 0,
    gecko: 0,
    opera: 0,
    safari: 0,
    isdebug: false,
    testurl: window.location.search.indexOf("&testurl") > 0,
    browser: null,
    mobile: null,
    air: null,
    VOIDFUNC: function() {},
    globalID: function() {
        var e = 0;
        return function() {
            return e++
        }
    }(),
    _innerClass: {},
    register: function(e, t) {
        $jex._innerClass[e] = t
    },
    getClass: function(e) {
        return $jex._innerClass[e]
    },
    $: function(e) {
        return typeof e == "string" ? document.getElementById(e) : e
    },
    _: function(e, t) {
        var n = function() {};
        n.prototype = t.prototype;
        e.prototype = new n
    },
    compare: function(e, t, n) {
        var r = t || {};
        var i = n || {};
        for (var s = 0; s < e.length; s++) {
            var o = e[s];
            if (r[o] != i[o]) {
                return false
            }
        }
        return true
    },
    $defined: function(e) {
        return typeof e != "undefined" && e != null
    },
    $empty: function(e) {
        for (var t in e) {
            if (typeof e[t] == "function") continue;
            return false
        }
        return true
    },
    parseQueryParam: function() {
        var e = {};
        var t = window.location.search.replace("?", "").split("&");
        for (var n = 0; n < t.length; n++) {
            var r = t[n].split("=");
            e[r[0]] = decodeURIComponent(r[1])
        }
        return e
    },
    extendClass: function() {
        var e = Object.prototype.constructor;
        return function(t, n) {
            var r = n.prototype;
            var i = t.prototype;
            var s = function() {};
            s.prototype = r;
            i = t.prototype = new s;
            t.superclass = r;
            i.constructor = t;
            if (r.constructor == e) {
                r.constructor = n
            }
            t.prototype.toString = n.prototype.toString;
            return t
        }
    }(),
    body: function(e) {
        if (!e) e = document;
        return e.body ? e.body : e.getElementsByTagName("body")[0]
    },
    doc: function(e) {
        return e ? e.nodeType == 9 ? e : e.ownerDocument || document : document
    },
    merge: function(e, t) {
        for (var n in t) {
            if (t[n] !== undefined) {
                e[n] = t[n]
            }
        }
        return e
    },
    exec: function(e) {
        return e()
    },
    toInt: function(e, t) {
        var n;
        return isNaN(n = parseInt(e)) ? t : n
    },
    toFloat: function(e, t) {
        var n;
        return isNaN(n = parseFloat(e)) ? t : n
    },
    toBoolean: function(e) {
        if (!e) return false;
        return e == true || (e = e.toUpperCase()) == "TRUE" || e == "1"
    },
    toQueryString: function(e) {
        var t = [];
        $jex.foreach(e, function(e, n, r) {
            if (n > 0) {
                t.push("&")
            }
            t.push(encodeURIComponent(r), "=", encodeURIComponent(e))
        });
        return t.join("")
    },
    text: function(e) {
        return e.innerText || e.textContent
    },
    trim: function(e, t) {
        switch (t) {
            case "l":
                return e.replace(/(^\s*)/g, "");
            case "r":
                return e.replace(/(\s*$)/g, "");
            default:
                return e.replace(/(^\s*)|(\s*$)/g, "")
        }
    },
    stripTag: function(e) {
        return e.replace(/<\/?[^>]+>/gi, "")
    },
    starsWith: function(e, t, n) {
        if (!n) n = 0;
        if (!e || e.length < n + t.length) return false;
        return e.substring(n, t.length) == t
    },
    exists: function(e, t) {
        var n = t.split("."),
            r;
        for (r = 0; r < n.length; r++) {
            if (!e[n[r]]) return false;
            e = e[n[r]]
        }
        return true
    },
    isNull: function(e) {
        return typeof e == "object" && !e
    },
    isNumber: function(e) {
        return typeof e == "number" && isFinite(e) ? true : false
    },
    isArray: function(e) {
        return !!e && e.constructor == Array
    },
    removeElement: function(e) {
        if (e && e.parentNode) e.parentNode.removeChild(e)
    },
    isChildrenOf: function(e, t, n) {
        if (n && e) {
            e = e.parentNode
        }
        while (e) {
            if (e == t) return true;
            e = e.parentNode
        }
        return false
    },
    hasClassName: function(e, t) {
        if (!e) return;
        return this.array.indexOf(e.className.split(/\s+/), t) != -1
    },
    addClassName: function(e, t) {
        if (!e) return;
        if (this.hasClassName(e, t)) return;
        e.className = e.className + " " + t
    },
    removeClassName: function(e, t) {
        if (!e) return;
        if (typeof t == "string") t = [t];
        e.className = this.array.select(e.className.split(/\s+/), function(e) {
            return $jex.array.indexOf(t, e) == -1
        }).join(" ")
    },
    toggleClassName: function(e, t, n, r) {
        if ($jex.hasClassName(e, t)) {
            $jex.removeClassName(e, t);
            if (r) r()
        } else {
            $jex.addClassName(e, t);
            if (n) n()
        }
    },
    createCssText: function(e, t) {
        if (!e) return;
        if (!t) t = document;
        var n = t.createElement("style");
        n.setAttribute("type", "text/css");
        var r = t.getElementsByTagName("head")[0];
        if (!r) return;
        else r.appendChild(n);
        if (n.styleSheet) n.styleSheet.cssText = e;
        else {
            var i = t.createTextNode(e);
            n.appendChild(i)
        }
        return n
    },
    createCssLink: function(e, t) {
        if (!e) return;
        if (!t) t = document;
        if (document.createStyleSheet) document.createStyleSheet(e);
        else {
            var n = t.createElement("link");
            n.setAttribute("rel", "stylesheet");
            n.setAttribute("type", "text/css");
            n.setAttribute("href", e);
            var r = t.getElementsByTagName("head")[0];
            if (!r) return;
            else r.appendChild(n)
        }
    },
    stopPropagation: function(e) {
        if (!e) {
            return
        }
        if (e.stopPropagation) {
            e.stopPropagation()
        } else {
            e.cancelBubble = true
        }
    },
    preventDefault: function(e) {
        if (!e) {
            return
        }
        if (e.preventDefault) {
            e.preventDefault()
        } else {
            e.returnValue = false
        }
    },
    stopEvent: function(e) {
        e = e || window.event;
        $jex.preventDefault(e);
        $jex.stopPropagation(e)
    },
    callback: function(e, t) {
        return function() {
            return t.apply(e, arguments)
        }
    },
    getDocumentWindow: function(e) {
        return e.parentWindow || window
    },
    array: {
        toArray: function(e) {
            if (!e) return [];
            var t = [],
                n;
            for (n = 0; n < e.length; n++) t.push(e[n]);
            return t
        },
        indexOf: function(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                if (e[n] == t) return n;
            return -1
        },
        each: function(e, t, n) {
            if (!e) return;
            for (var r = 0, i = e.length; r < i; r++) {
                t.call(n, e[r], r)
            }
        },
        select: function(e, t) {
            if (!e) return [];
            var n = [],
                r, i;
            for (r = 0, i = e.length; r < i; r++) {
                if (t(e[r])) n.push(e[r])
            }
            return n
        },
        copy: function(e, t, n, r) {
            var i = n || 0,
                s = r || e.length;
            for (; i < s; ++i) {
                t.push(e[i])
            }
        },
        remove: function(e, t, n) {
            var r = 0,
                i, s;
            for (i = 0, s = e.length; i < s; i++) {
                if (e[i] === t || n && e[i] == t) {
                    e.splice(i--, 1);
                    r++
                }
            }
            return r
        },
        map: function(e, t, n) {
            if (typeof e.map === "function") {
                return e.map(t, n)
            }
            var r = e.length;
            var i = new Array(r);
            for (var s = 0; s < r; s++) {
                if (s in e) {
                    i[s] = t.call(n, e[s], s, e)
                }
            }
            return i
        },
        some: function(e, t, n) {
            if (typeof e.some === "function") {
                return e.some(t, n)
            }
            for (var r = 0, i = e.length; r < i; r++) {
                if (r in e && callback.call(n, e[r], r, e)) {
                    return true
                }
            }
            return false
        }
    },
    hash: {
        each: function(e, t) {
            for (var n in e) {
                t(n, e[n])
            }
        }
    },
    each: function(e, t) {
        if (e instanceof Array) {
            this.array.each(e, t)
        } else {
            this.hash.each(e, t)
        }
    },
    $continue: new Object,
    $break: new Object,
    foreach: function(e, t) {
        var n = null;
        if (e instanceof Array) {
            for (var r = 0; r < e.length; r++) {
                var i = e[r];
                n = t(i, r);
                if (n == $jex.$continue) {
                    continue
                }
                if (n == $jex.$break) {
                    break
                }
            }
        } else {
            var r = 0;
            for (var s in e) {
                var i = e[s];
                n = t(i, r, s);
                if (n == $jex.$continue) {
                    continue
                }
                if (n == $jex.$break) {
                    break
                }
                r++
            }
        }
        return n
    },
    event: {
        doclick: function(e) {
            var t = document.getElementById(e);
            if (document.createEvent) {
                var n = document.createEvent("MouseEvents");
                n.initEvent("click", true, false);
                t.dispatchEvent(n)
            } else if (document.createEventObject) {
                t.fireEvent("onclick")
            }
        },
        add: function(e, t, n) {},
        remove: function(e) {},
        bind: function(e, t, n) {
            var r = e == window && t == "unload";
            if (e.addEventListener) {
                var i = false;
                if (t == "focusin") {
                    t = "focus";
                    i = true
                } else if (t == "focusout") {
                    t = "blur";
                    i = true
                }
                e.addEventListener(t, n, i);
                n = this.add(e, t, n, i ? 4 : 1, r)
            } else if (e.attachEvent) {
                n = $jex.callback(e, n);
                e.attachEvent("on" + t, n);
                n = this.add(e, t, n, 2, r)
            } else {
                e["on" + t] = n;
                n = this.add(e, t, n, 3, r)
            }
            return n
        },
        bindDom: function(e, t, n, r) {
            return this.bind(e, t, function(e) {
                if (!e.target) {
                    e.target = e.srcElement
                }
                r.call(n, e, this)
            })
        },
        stop: function(e, t) {
            this.bind(e, t, function(e) {
                $jex.stopEvent(e);
                return false
            })
        },
        trigger: function(e, t, n) {}
    },
    element: {
        hide: function(e) {
            if (!e) return;
            e.style.display = "none";
            return e
        },
        show: function(e) {
            if (!e) return;
            e.style.display = "block";
            return e
        },
        visible: function(e) {
            if (!e) return false;
            return e.style.display != "none"
        },
        toggle: function(e) {
            for (var e = arguments[0], t = 0, n = arguments.length; t < n; t++, e = arguments[t]) {
                e = $jex.$(e);
                if (!e) continue;
                if ($jex.element.visible(e)) $jex.element.hide(e);
                else $jex.element.show(e)
            }
        }
    }
};
$jex.createXMLHttpRequest = $jex.exec(function() {
    var e = 0,
        t = [function() {
            return new XMLHttpRequest
        }, function() {
            return new ActiveXObject("Msxml2.XMLHTTP")
        }, function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }];
    return function() {
        for (var n = e; n < t.length; n++) {
            try {
                e = n;
                return t[n]()
            } catch (r) {}
        }
        return $jex.VOIDFUNC
    }
});
$jex.exec(function() {
    var e = navigator.userAgent,
        t;
    if (/WebKit|KHTML/.test(e)) {
        $jex.browser = "safari";
        $jex.safari = 1
    }
    t = e.match(/AppleWebKit\/([^\s]*)/);
    if (t && t[1]) {
        $jex.safari = $jex.toFloat(t[1]);
        if (/ Mobile\//.test(e)) {
            $jex.mobile = "Apple"
        } else {
            t = e.match(/NokiaN[^\/]*/);
            if (t) $jex.mobile = t[0]
        }
        t = e.match(/AdobeAIR\/([^\s]*)/);
        if (t) $jex.air = t[0]
    } else {
        t = e.match(/Opera[\s\/]([^\s]*)/);
        if (t && t[1]) {
            $jex.opera = $jex.toFloat(t[1]);
            $jex.browser = "opera";
            t = e.match(/Opera Mini[^;]*/);
            if (t) $jex.mobile = t[0]
        } else {
            t = e.match(/MSIE\s([^;]*)/);
            if (t && t[1]) {
                $jex.browser = "ie";
                $jex.ie = $jex.toFloat(t[1])
            } else {
                t = e.match(/Gecko\/([^\s]*)/);
                if (t) {
                    $jex.browser = "gecko";
                    $jex.gecko = 1;
                    t = e.match(/rv:([^\s\)]*)/);
                    if (t && t[1]) {
                        $jex.gecko = $jex.toFloat(t[1])
                    }
                }
            }
        }
    }
    return false
});
$jex.exec(function() {
    var e = -1;
    $jex.boxModel = function() {
        if (e !== -1) return e;
        var t = document.createElement("div");
        t.style.width = t.style.paddingLeft = "1px";
        document.body.appendChild(t);
        e = t.offsetWidth === 2;
        document.body.removeChild(t).style.display = "none";
        return e
    };
    if (window.location.hostname.indexOf("local") >= 0 || window.location.search.indexOf("debug=true") > 0) {
        $jex.isdebug = true
    }
});
$jex.exec(function() {
    function s() {
        if (e) return;
        var s = document.body,
            o = document.createElement("div"),
            u, a, f, l, c, h, p = s.style.marginTop,
            d = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
        c = {
            position: "absolute",
            top: 0,
            left: 0,
            margin: 0,
            border: 0,
            width: "1px",
            height: "1px",
            visibility: "hidden"
        };
        for (h in c) o.style[h] = c[h];
        o.innerHTML = d;
        s.insertBefore(o, s.firstChild);
        u = o.firstChild, a = u.firstChild, l = u.nextSibling.firstChild.firstChild;
        t = a.offsetTop !== 5;
        n = l.offsetTop === 5;
        u.style.overflow = "hidden", u.style.position = "relative";
        r = a.offsetTop === -5;
        s.style.marginTop = "1px";
        i = s.offsetTop === 0;
        s.style.marginTop = p;
        s.removeChild(o);
        e = true
    }
    var e = false,
        t, n, r, i;
    if (document.documentElement["getBoundingClientRect"]) $jex.offset = function(e) {
        if (e === e.ownerDocument.body) return $jex.bodyOffset(e);
        var t = e.getBoundingClientRect(),
            n = e.ownerDocument,
            r = n.body,
            i = n.documentElement,
            s = i.clientTop || r.clientTop || 0,
            o = i.clientLeft || r.clientLeft || 0,
            u = t.top + (self.pageYOffset || $jex.boxModel && i.scrollTop || r.scrollTop) - s,
            a = t.left + (self.pageXOffset || $jex.boxModel && i.scrollLeft || r.scrollLeft) - o;
        return {
            top: u,
            left: a
        }
    };
    else $jex.offset = function(i) {
        if (i === i.ownerDocument.body) return $jex.bodyOffset(i);
        e || s();
        var i = i,
            o = i.offsetParent,
            u = i,
            a = i.ownerDocument,
            f, l = a.documentElement,
            c = a.body,
            h = a.defaultView,
            p = h.getComputedStyle(i, null),
            d = i.offsetTop,
            v = i.offsetLeft;
        while ((i = i.parentNode) && i !== c && i !== l) {
            f = h.getComputedStyle(i, null);
            d -= i.scrollTop, v -= i.scrollLeft;
            if (i === o) {
                d += i.offsetTop, v += i.offsetLeft;
                if (t && !(n && /^t(able|d|h)$/i.test(i.tagName))) d += parseInt(f.borderTopWidth, 10) || 0, v += parseInt(f.borderLeftWidth, 10) || 0;
                u = o, o = i.offsetParent
            }
            if (r && f.overflow !== "visible") d += parseInt(f.borderTopWidth, 10) || 0, v += parseInt(f.borderLeftWidth, 10) || 0;
            p = f
        }
        if (p.position === "relative" || p.position === "static") d += c.offsetTop, v += c.offsetLeft;
        if (p.position === "fixed") d += Math.max(l.scrollTop, c.scrollTop), v += Math.max(l.scrollLeft, c.scrollLeft);
        return {
            top: d,
            left: v
        }
    };
    $jex.bodyOffset = function() {
        e || s();
        var t = body.offsetTop,
            n = body.offsetLeft;
        return {
            top: t,
            left: n
        }
    };
    $jex.pointerX = function(e) {
        return e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)
    }, $jex.pointerY = function(e) {
        return e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop)
    }, $jex.getPageSize = function() {
        var e, t;
        if (window.innerHeight && window.scrollMaxY) {
            e = document.body.scrollWidth;
            t = window.innerHeight + window.scrollMaxY
        } else if (document.body.scrollHeight > document.body.offsetHeight) {
            e = document.body.scrollWidth;
            t = document.body.scrollHeight
        } else {
            e = document.body.offsetWidth;
            t = document.body.offsetHeight
        }
        var n, r;
        if (self.innerHeight) {
            n = self.innerWidth;
            r = self.innerHeight
        } else if (document.documentElement && document.documentElement.clientHeight) {
            n = document.documentElement.clientWidth;
            r = document.documentElement.clientHeight
        } else if (document.body) {
            n = document.body.clientWidth;
            r = document.body.clientHeight
        }
        if (t < r) {
            pageHeight = r
        } else {
            pageHeight = t
        }
        if (e < n) {
            pageWidth = n
        } else {
            pageWidth = e
        }
        return {
            pageWidth: pageWidth,
            pageHeight: pageHeight,
            windowWidth: n,
            windowHeight: r
        }
    }
});
$jex.exec(function() {
    function setObjectValue(e, t, n) {
        if (!e[t]) e[t] = n;
        else if (e[t] instanceof Array) {
            var r = e[t];
            if (n instanceof Array) {
                for (var i = 0; i < n.length; i++) r.push(n[i])
            } else e[t].push(n)
        } else e[t] = [e[t], n]
    }

    function getEventStack(e, t, n) {
        var r, i = e.__x_;
        if (i) {
            r = i[t];
            if (!r) {
                r = [];
                if (n) i[t] = r
            }
        } else {
            r = [];
            if (n) {
                e.__x_ = {};
                e.__x_[t] = r
            }
        }
        return r
    }

    function getEventStackCopy(e, t) {
        var n = [],
            r = e.__x_;
        if (r) {
            if (t) {
                if (r[t]) $jex.array.copy(r[t], n)
            } else {
                $jex.array.each(r, function(e, t) {
                    $jex.arraycopy(t, n)
                })
            }
        }
        return n
    }

    function EventListener(e, t, n, r) {
        this.elem = e;
        this.name = t;
        this.handler = n;
        this.type = r;
        this.refer = -1;
        getEventStack(e, t, true).push(this)
    }
    var readObject = $jex.readObject = function(el, target, id) {
        var obj, text;
        var childs = el.getAttribute("jxChilds") || !target;
        if (text = el.getAttribute("jxObject")) {
            obj = eval("({" + text + "});")
        } else if (text = el.getAttribute("jxValue")) {
            if (_Rp$(text, "%.")) obj = el.getAttribute(text.substring(2));
            else obj = text
        } else if (!childs) obj = el.innerHTML;
        else obj = {};
        if (childs == "1") {
            var els = el.childNodes;
            for (var i = 0; i < els.length; i++) {
                if (els[i].nodeType == 1) {
                    var _id = els[i].getAttribute("jxc");
                    if (_id) readObject(els[i], obj, _id)
                }
            }
        }
        if (id == ".") asd = obj;
        if (target && id) {
            if (id == ".")
                for (var i in obj) setObjectValue(target, i, obj[i]);
            else setObjectValue(target, id, obj)
        }
        return obj
    };
    var events = [];
    var bindingArr = "blur,focus,load,resize,scroll,unload,click," + "mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave," + "change,select,submit,keydown,keypress,keyup,error";
    var bindingEvent = {
        keypress: function(e, t, n, r) {
            return $jex.event.bindDom(e, $jex.ie || $jex.safari ? "keydown" : "keypress", t, r)
        }
    };
    $jex.event.binding = function(e, t, n, r) {
        if (!e) {
            return
        }
        if (arguments.length == 3) {
            r = n;
            n = t;
            t = e
        }
        if (bindingArr.indexOf(n.toLowerCase()) < 0) {
            return $jex.event.add(t, n, r)
        } else {
            if (!bindingEvent[n]) {
                return $jex.event.bindDom(e, n, t, r)
            } else {
                return bindingEvent[n](e, t, n, r)
            }
        }
    };
    $jex.event.addEx = function(e, t, n, r, i) {
        for (var s = 0, o = e.length; s < o; s++) {
            var u = e[s];
            $jex.event.add(u, t, n, r, i)
        }
    };
    $jex.event.add = function(e, t, n, r, i) {
        e = new EventListener(e, t, n, r);
        if (!i) {
            events.push(e);
            e.refer = events.length - 1
        }
        return e
    };
    $jex.event.remove = function(e) {
        e.remove();
        var t = e.refer;
        if (!(t < 0)) {
            var n = events.pop();
            if (t < events.length) {
                events[t] = n;
                n.refer = t
            }
            e.refer = -1
        }
    };
    $jex.event.clear = function(e, t) {
        $jex.array.each(getEventStackCopy(e, t), $jex.event.remove)
    };
    $jex.event.trigger = function(e, t, n) {
        $jex.console.info("[事件触发] name:", t, ", elem:", e, "  , arg:", n);
        var r = [];
        $jex.array.copy(arguments, r, 2);
        this.triggerParam(e, t, r)
    };
    $jex.event.triggerParam = function(e, t, n) {
        $jex.array.each(getEventStackCopy(e, t), function(t) {
            t.apply(e, n)
        })
    };
    $jex.event.click = function(e, t) {
        $jex.event.binding($jex.$(e), "click", function(e) {
            t(e);
            $jex.stopEvent(e)
        })
    };
    $jex.event.within = function(e, t) {
        var n = typeof event != "undefined" ? event.srcElement : t.target;
        var r = false;
        while (n) {
            r = n == e;
            if (r) break;
            n = n.parentNode
        }
        return r
    };
    $jex.errorStack = [];
    window.onerror = function(e) {
        var t = arguments[0] || "";
        var n = arguments[1] || "";
        var r = arguments[2] || "";
        var i = new Image;
        i.src = "http://log.flight.qunar.com/e.gif?emuniquemik=" + t + "|" + n + "|" + r;
        i.onload = function() {
            i = null
        };
        e.toString = $jex.errToString;
        $jex.console.error(e)
    };
    EventListener.prototype.remove = function() {
        if (this.elem) {
            switch (this.type) {
                case 1:
                    this.elem.removeEventListener(this.name, this.handler, false);
                    break;
                case 4:
                    this.elem.removeEventListener(this.name, this.handler, true);
                    break;
                case 2:
                    this.elem.detachEvent("on" + this.name, this.handler);
                    break;
                case 3:
                    this.elem["on" + this.name] = null;
                    break
            }
            $jex.array.remove(getEventStack(this.elem, this.name), this);
            this.elem = this.handler = null
        }
    };
    EventListener.prototype.apply = function(e, t) {
        return this.handler.apply(e, t)
    }
});
$jex.exec(function() {
    function ScriptRequest(e) {
        if (e.funcName) this.funcName = e.funcName;
        this.callbackName = e.callbackName || "callback";
        this.doc = e.doc || document;
        this.win = $jex.getDocumentWindow(this.doc);
        if (e.onerror) $jex.event.add(this, "error", e.onerror);
        if (e.ontimeout) $jex.event.add(this, "timeout", e.ontimeout);
        if (e.oncancel) $jex.event.add(this, "cancel", e.oncancel);
        if (e.oncomplete) $jex.event.add(this, "complete", e.oncomplete)
    }
    ScriptRequest.loadScript = function(e, t) {
        t = t || document;
        var n = t.createElement("script");
        n.type = "text/javascript";
        n.src = e;
        t.getElementsByTagName("head")[0].appendChild(n);
        return n
    };
    ScriptRequest.prototype.send = function(e, t) {
        var n = this.callID = this.funcName ? this.funcName : "XQScript_" + $jex.globalID();
        if (e.indexOf("?") == -1) e = e + "?";
        e += "&" + this.callbackName + "=" + n;
        var r = this;
        var i = this.win;
        var s;
        i[n] = function() {
            if (s) {
                window.clearTimeout(s);
                s = null
            }
            r.release();
            i[n] = null;
            $jex.event.triggerParam(r, "complete", $jex.array.toArray(arguments))
        };
        if (t && t > 0) {
            s = window.setTimeout(function() {
                r.release();
                $jex.event.trigger(r, "timeout")
            }, t)
        }
        this.searchPort = ScriptRequest.loadScript(e, this.doc)
    };
    ScriptRequest.prototype.release = function() {
        if (this.searchPort) {
            $jex.removeElement(this.searchPort);
            this.searchPort = null;
            this.win[this.callID] = $jex.VOIDFUNC;
            return true
        }
        return false
    };
    ScriptRequest.prototype.cancel = function() {
        if (this.release()) $jex.event.trigger(this, "cancel")
    };
    $jex.scriptRequest = ScriptRequest;
    $jex.jsonp = function(e, t, n, r) {
        if (arguments.length == 2 && typeof t == "function") {
            n = t;
            t = {}
        }
        r = r || {};
        r.oncomplete = n;
        var i = r.timeout || {};
        if (e.indexOf("?") == -1) e = e + "?";
        for (var s in t) {
            e += "&" + s + "=" + encodeURIComponent(t[s])
        }
        var o = new ScriptRequest(r);
        o.send(e);
        if (i.time && i.time > 0) {
            window.setTimeout(function() {
                o.cancel();
                i.func()
            }, i.time)
        }
        return o
    };
    $jex.ajax = function(url, data, successhandler, options) {
        options = options || {};
        if ($jex.isdebug && $jex.gecko) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead")
            } catch (e) {
                alert("Permission UniversalBrowserRead denied.")
            }
        }
        var request = $jex.createXMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status >= 200 && request.status < 300 || request.status == 304) {
                    var _result = {
                        result: {}
                    };
                    try {
                        var str = request.responseText;
                        if (str) {
                            str = $jex.trim(str);
                            if (str.charAt(0, 1) == "{") {
                                str = "(" + str + ")"
                            }
                            _result = eval(str);
                            successhandler(_result)
                        } else {
                            if (options.onerror) {
                                options.onerror(request)
                            }
                            $jex.console.error(url, "返回值为空")
                        }
                    } catch (e) {
                        if (options.onerror) {
                            options.onerror(e)
                        }
                        e.toString = $jex.errToString;
                        $jex.console.error(url, e)
                    }
                } else {
                    if (options.onerror) {
                        options.onerror()
                    }
                }
            }
        };
        var token = Math.floor(Math.random() * 1e5);
        data._token = token;
        if (url.indexOf("?") == -1) url = url + "?";
        var method = options.method || "GET";
        if (method === "GET") {
            request.open("GET", url + "&" + $jex.toQueryString(data), true);
            if (options && options.beforeSend && typeof options.beforeSend == "function") {
                options.beforeSend(request)
            }
            request.send(null)
        } else if (method === "POST") {
            request.open("POST", url, true);
            request.setRequestHeader("Content-type", options.contentType || "applacation/json");
            if (options && options.beforeSend && typeof options.beforeSend == "function") {
                options.beforeSend(request)
            }
            request.send(JSON ? JSON.stringify(data) : "")
        }
        $jex.console.info("[接口调用 token=", token, "]", " url:", url, data, successhandler, options, request);
        return request
    };
    var timeMap = {};
    var _consoleStack = [];
    var _filter = {
        INFO: 1,
        WARN: 1
    };
    $jex.errToString = function() {
        var e = ["[ERROR]"];
        for (var t in this) {
            if (typeof this[t] == "function") continue;
            e.push(t, ":", this[t], "<br/>")
        }
        return e.join(" ")
    };
    var _pushToStack = function(e) {
        if (!_filter[e]) {
            return function() {
                _consoleStack.push(arguments)
            }
        } else {
            return $jex.VOIDFUNC
        }
    };
    $jex.console = {
        info: new _pushToStack("INFO"),
        error: new _pushToStack("ERROR"),
        warn: new _pushToStack("WARN"),
        time: new _pushToStack("TIME"),
        trace: new _pushToStack("TRACE")
    };
    if ($jex.isdebug) {}
    $jex.console.start = function(e) {
        timeMap[e] = new Date
    };
    $jex.console.end = function(e) {
        if (timeMap[e]) {
            $jex.console.time("[TIME]", e, ":", new Date - timeMap[e]);
            delete timeMap[e]
        }
    };
    $jex.console.output = function() {
        var e = [];
        for (var t = 0; t < _consoleStack.length; t++) {
            var n = [];
            var r = _consoleStack[t];
            for (var i = 0; i < r.length; i++) {
                n.push(r[i])
            }
            e.push(n.join(""))
        }
        var s = $jex.$("divDebugConsole");
        if (s) {
            s.innerHTML = e.join("<br/>");
            $jex.element.show(s)
        } else {
            alert(e.join("\r\n"))
        }
    };
    $jex.event.binding(document, "keydown", function(e) {
        if (e.keyCode == 121 && e.ctrlKey && e.altKey || e.keyCode == 77 && e.ctrlKey && e.altKey) {
            $jex.console.output()
        }
    })
});
UIObject.prototype.isempty = function() {
    return this._content_.length == 0
};
UIObject.prototype.clear = function() {
    this._content_ = [];
    this._childrens_ = []
};
UIObject.prototype.newid = function(e) {
    return e + this._GID_
};
UIObject.prototype.tpls = function(e) {
    var t = this._content_;
    var n = this._childrens_;
    var r = this._GID_;
    for (var i = 0; i < arguments.length; i++) {
        var s = arguments[i];
        if (s != null) {
            if (s.indexOf("{#") < 0) t.push(s);
            else {
                if (s._XGUI_ == true) {
                    n.push(s);
                    t.push(s)
                } else {
                    t.push(s.replace(this._tplsreg, "$1" + r))
                }
            }
        }
    }
    return this
};
UIObject.prototype.append = function(e) {
    var t = this._content_;
    var n = this._childrens_;
    var r = this._GID_;
    for (var i = 0; i < arguments.length; i++) {
        var s = arguments[i];
        if (s != null) {
            if (i % 2 == 0) t.push(s);
            else {
                if (s._XGUI_ == true) {
                    n.push(s);
                    t.push(s)
                } else t.push(' id="', s, r, '"')
            }
        }
    }
    return this
};
UIObject.prototype.text = function(e) {
    var t = this._content_;
    for (var n = 0; n < arguments.length; n++) t.push(arguments[n]);
    return this
};
UIObject.prototype.getDomNode = function(e) {
    return $jex.$(e + this._GID_, this._document_)
};
UIObject.prototype.initDocument = function(e) {
    this._document_ = e;
    var t = this._childrens_;
    for (var n = 0; n < t.length; n++) t[n].initDocument(e);
    this.initialize()
};
UIObject.prototype.write = function(e) {
    var t = this.toString();
    if (t) {
        e.innerHTML = t;
        this.initDocument($jex.doc(e))
    } else {
        e.innerHTML = ""
    }
};
UIObject.prototype.toString = function() {
    return this._content_.join("")
};
UIObject.prototype.initialize = $jex.VOIDFUNC;
$jex.List = function(e) {
    this._map = {};
    this._size = 0;
    this.addRange(e)
};
$jex.exec(function() {
    var e = new Object;
    $jex.List.prototype.addRange = function(t) {
        var n = this._size;
        if (t) {
            var r = this._map;
            for (var i in t) {
                var s = t[i];
                r[i] = s == null ? e : s;
                n++
            }
        }
        this._size = n
    };
    $jex.List.prototype.firstkey = function() {
        var e = this.keys();
        if (e.length == 0) return null;
        return e[0]
    };
    $jex.List.prototype.first = function() {
        var e = this.keys();
        if (e.length == 0) return null;
        return this.get(e[0])
    };
    $jex.List.prototype.get = function(t) {
        var n = this._map[t];
        return n === e ? null : n
    };
    $jex.List.prototype.put = function(t, n) {
        var r = this._map[t];
        if (typeof r === "undefined") this._size++;
        if (n == null) n = e;
        this._map[t] = n;
        return r
    };
    $jex.List.prototype.keys = function() {
        var e = [];
        var t = this._map;
        for (var n in t) e.push(n);
        return e
    };
    $jex.List.prototype.contains = function(e) {
        return this._map[e] != null
    };
    $jex.List.prototype.remove = function(t) {
        var n = this._map[t];
        if (n != null) this._size--;
        if (n === e) n = null;
        delete this._map[t];
        return n
    };
    $jex.List.prototype.size = function() {
        return this._size
    };
    $jex.List.prototype.clear = function() {
        this._map = {};
        this._size = 0
    };
    $jex.List.prototype.toArray = function() {
        var t = this._map;
        var n = [];
        for (var r in t) {
            v = t[r];
            if (v === e) v = null;
            n.push([r, v])
        }
        return n
    };
    $jex.List.prototype.toString = function() {
        var e = [];
        var t = this._map;
        for (var n in t) {
            e.push(n + ": " + t[n])
        }
        return e.join("\n")
    }
});
ActionDelay.prototype.reset = function(e) {
    this.cancel();
    this.timer = setTimeout(e, this.delay)
};
ActionDelay.prototype.cancel = function() {
    if (this.timer) clearTimeout(this.timer)
};
ActionFlow.prototype.add = function(e, t, n) {
    var r = this.actions[t];
    if (r && r.order < e) return;
    this.actions[t] = {
        order: e,
        key: t,
        func: n
    };
    return this
};
ActionFlow.prototype.remove = function(e) {
    delete this.actions[e]
};
ActionFlow.prototype.start = function() {
    if (this.tid !== null) return;
    var e = false;
    for (var t in this.actions) {
        e = true;
        break
    }
    if (!e) return;
    this.tid = setTimeout($jex.callback(this, this.run), this.interval)
};
ActionFlow.prototype.run = function() {
    clearTimeout(this.tid);
    this.tid = null;
    var e = this.actions,
        t = null;
    for (var n in e) {
        var r = e[n];
        if (!t || r.order < t.order) {
            t = r;
            delete e[n]
        }
    }
    if (t == null) return;
    var i = (new Date).getTime();
    var s;
    try {
        t.func();
        s = "done"
    } catch (o) {
        s = "error:" + o
    }
    this.logs.push([i, s, (new Date).getTime() - i, t.key]);
    this.start()
};
if ($jex.ie > 5 && $jex.ie < 7) {
    try {
        (function() {
            document.execCommand("BackgroundImageCache", false, true);
            $jex.addClassName(document.getElementsByTagName("html")[0], "jx-ie" + $jex.ie * 10)
        })()
    } catch (e) {}
}(function() {
    var e = null;
    $jex.scrollTo = function(t, n) {
        if (!t) return;
        if (e) {
            clearInterval(e)
        }
        n = n || 0;
        var r = $jex.offset(t);
        var i = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var s = Math.floor(r.left);
        var o = Math.floor(r.top);
        window.scrollTo(s, o)
    };
    $jex.define = function(e) {
        return typeof e != "undefined" && e != null
    };
    $jex.extend = function() {
        for (var e = 1, t = arguments.length; e < t; e++) $jex.merge(arguments[0], arguments[e]);
        return arguments[0]
    };
    $jex.element.compareDocumentPosition = function(e, t) {
        return e.compareDocumentPosition ? e.compareDocumentPosition(t) : e.contains ? (e != t && e.contains(t) && 16) + (e != t && t.contains(e) && 8) + (e.sourceIndex >= 0 && t.sourceIndex >= 0 ? (e.sourceIndex < t.sourceIndex && 4) + (e.sourceIndex > t.sourceIndex && 2) : 1) : 0
    };
    $jex.array.inArray = function(e, t) {
        return $jex.array.indexOf(t, e)
    };
    $jex.array.xcopy = function() {
        var e = -1,
            t = arguments.length,
            n, r = arguments[t - 1];
        if (typeof arguments[t - 1] == "number") {
            var i = [r, 0];
            r = arguments[--t - 1];
            while (++e < t - 1) arguments.callee(arguments[e], i);
            Array.prototype.splice.apply(r, i)
        } else
            while (++e < t - 1)
                for (var s = 0, o = arguments[e].length; s < o; s++) r.push(arguments[e][s]);
        return r
    };
    $jex.hash.size = function(e) {
        var t = 0;
        $jex.hash.each(e, function() {
            t++
        });
        return t
    };
    $jex.hash.first = function(e) {
        for (var t in e) {
            return e[t]
        }
        return null
    };
    $jex.logHelp = {};
    $jex.log = function(e) {
        try {
            var t = Math.floor(Math.random() * 1e4);
            var n = "http://log.flight.qunar.com/l.gif?_token=" + t + "&";
            var r = new Image;
            if (e) {
                for (var i in e) {
                    n += encodeURIComponent(i) + "=" + e[i] + "&"
                }
                n = n.substr(0, n.length - 1);
                r.src = n
            }
        } catch (s) {}
    };
    var t = null;
    $jex.cookie = {
        reset: function() {
            t = $jex.cookie._getCookieHash()
        },
        _getCookieHash: function() {
            var e = document.cookie.split(";");
            var t = {};
            for (var n = 0; n < e.length; n++) {
                if (e[n].indexOf("=") != -1) t[$jex.trim(e[n].split("=")[0])] = $jex.trim(unescape(e[n].split("=")[1]))
            }
            return t
        },
        get: function(e) {
            if (!t) {
                t = $jex.cookie._getCookieHash()
            }
            return t[e]
        }
    };
    $jex.merge($jex.event, {
        _readyList: [],
        _isReady: false,
        _bindReady: function() {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", function() {
                    document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                    $jex.event._ready()
                }, false)
            } else if (document.attachEvent) {
                document.attachEvent("onreadystatechange", function() {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        $jex.event._ready()
                    }
                });
                if (document.documentElement.doScroll && window == window.top)(function() {
                    if ($jex.event._isReady) return;
                    try {
                        document.documentElement.doScroll("left")
                    } catch (e) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    $jex.event._ready()
                })()
            }
            $jex.event.bind(window, "load", $jex.event._ready)
        },
        ready: function(e) {
            if ($jex.event._isReady) {
                e()
            } else {
                $jex.event._readyList.push(e)
            }
        },
        _ready: function() {
            if (!$jex.event._isReady) {
                $jex.event._isReady = true;
                for (var e = 0, t = $jex.event._readyList.length; e < t; e++) $jex.event._readyList[e].call(document)
            }
        }
    });
    $jex.event._bindReady();
    $jex.merge($jex.date = {}, {
        _prefix: function(e, t) {
            t = t || 2;
            e = e + "";
            while (e.length < t) {
                e = "0" + e
            }
            return e
        },
        _format: {
            yyyy: function(e) {
                return e.getFullYear().toString()
            },
            MM: function(e) {
                return $jex.date._prefix(e.getMonth() + 1)
            },
            M: function(e) {
                return e.getMonth() + 1 + ""
            },
            HH: function(e) {
                return $jex.date._prefix(e.getHours())
            },
            H: function(e) {
                return e.getHours()
            },
            dd: function(e) {
                return $jex.date._prefix(e.getDate())
            },
            d: function(e) {
                return e.getDate()
            },
            mm: function(e) {
                return $jex.date._prefix(e.getMinutes())
            },
            m: function(e) {
                return e.getMinutes()
            },
            m: function(e) {
                return e.getMinutes()
            },
            ss: function(e) {
                return $jex.date._prefix(e.getSeconds())
            },
            s: function(e) {
                return e.getSeconds()
            }
        },
        format: function(e, t) {
            switch (t) {
                case "yyyy.M.d":
                    return [$jex.date._format["yyyy"](e), $jex.date._format["M"](e), $jex.date._format["d"](e)].join(".");
                case "M月d日":
                    return [$jex.date._format["M"](e) + "月", $jex.date._format["d"](e) + "日"].join("");
                case "MM月dd日":
                    return [$jex.date._format["MM"](e) + "月", $jex.date._format["dd"](e) + "日"].join("-");
                case "yyyy-MM-dd HH:mm:ss":
                    return [$jex.date._format["yyyy"](e), $jex.date._format["MM"](e), $jex.date._format["dd"](e)].join("-") + " " + [$jex.date._format["HH"](e), $jex.date._format["mm"](e), $jex.date._format["ss"](e)].join(":")
            }
            return [$jex.date._format["yyyy"](e), $jex.date._format["MM"](e), $jex.date._format["dd"](e)].join("-")
        },
        parse: function(e) {
            if (!e || typeof e != "string") return e;
            return new Date(e.replace(/-/g, "/"))
        },
        add: function(e, t, n) {
            var r = e;
            if (n == null) {
                n = typeof e == "string"
            }
            if (typeof e == "string") {
                r = new Date(e.replace(/-/g, "/"))
            }
            var i = new Date(r.getTime() + t * 864e5);
            if (n) {
                return $jex.date.format(i)
            } else {
                return i
            }
        },
        getMinute: function(e) {
            var t = e.split(":");
            var n = parseInt(t[0], 10);
            n = n == 0 ? 24 : n;
            var r = parseInt(t[1], 10);
            return n * 60 + r
        },
        getTime: function(e) {
            return parseInt(e.replace(":", ""), 10)
        },
        distance: function(e, t) {
            if (!(e instanceof Date)) {
                e = new Date(e)
            }
            e = new Date(e.getFullYear(), e.getMonth(), e.getDate());
            if (!(t instanceof Date)) {
                t = new Date(t)
            }
            t = new Date(t.getFullYear(), t.getMonth(), t.getDate());
            return (t.getTime() - e.getTime()) / (24 * 60 * 60 * 1e3)
        }
    });
    $jex.template = function(e, t, n) {
        var r = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var i = /\\|'|\r|\n|\u2028|\u2029/g;
        var s = function(e) {
            return "\\" + escapes[e]
        };
        if (!t && n) t = n;
        t = $jex.extend({}, t, r);
        var o = RegExp([(t.escape || noMatch).source, (t.interpolate || noMatch).source, (t.evaluate || noMatch).source].join("|") + "|$", "g");
        var u = 0;
        var a = "__p+='";
        e.replace(o, function(t, n, r, o, f) {
            a += e.slice(u, f).replace(i, s);
            u = f + t.length;
            if (n) {
                a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"
            } else if (r) {
                a += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"
            } else if (o) {
                a += "';\n" + o + "\n__p+='"
            }
            return t
        });
        a += "';\n";
        if (!t.variable) a = "with(obj||{}){\n" + a + "}\n";
        a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            var f = new Function(t.variable || "obj", "$jex", a)
        } catch (l) {
            l.source = a;
            throw l
        }
        var c = function(e) {
            return f.call(this, e, $jex)
        };
        var h = t.variable || "obj";
        c.source = "function(" + h + "){\n" + a + "}";
        return c
    };
    $jex.merge($jex.web = {}, {
        parseQueryString: function(e) {
            var t = /([^\?|\&]\w+)=([^\?|\&]+)/ig;
            var n = {};
            if (e) {
                if (e.charAt(0) == "?") e = e.substr(1);
                while (true) {
                    if (r = t.exec(e)) {
                        n[r[1]] = r[2]
                    } else {
                        break
                    }
                }
            }
            return n
        }
    });
    $jex.web.parameters = $jex.web.parseQueryString(window.location.search)
})();
(function() {
    $jex.lightbox = {
        overlay: null,
        content: null,
        a: {
            display: "none",
            left: "0"
        },
        b: {
            display: "none"
        },
        c: {
            display: "block",
            left: "50%"
        },
        d: {
            display: "block"
        },
        binded: false,
        toBind: function() {
            $jex.lightbox.show(null, null, 1)
        },
        cache: {},
        gid: 1,
        expand: "lightbox_temp",
        removeData: function(e) {
            var t = e[this.expand];
            if (!t) return;
            try {
                delete e[this.expand]
            } catch (n) {
                if (e.removeAttribute) e.removeAttribute(this.expand)
            }
            delete this.cache[t]
        },
        data: function(e, t) {
            var n = e[this.expand] ? e[this.expand] : e[this.expand] = "" + this.gid++;
            if (t != undefined) this.cache[n] = t;
            return this.cache[n]
        },
        _place: function(e) {
            var t = document.compatMode && document.compatMode.toLowerCase() == "css1compat" ? document.documentElement : document.body;
            if (e & 2) {
                var n = (t.clientHeight - this.content.offsetHeight) / 2;
                var r = Math.floor(this.content.offsetWidth / 2);
                $jex.hash.each($jex.extend({}, this.c, {
                    top: (n > 0 ? n : 0) + (window.pageYOffset || t.scrollTop) + "px",
                    marginLeft: 0 - r + "px"
                }), function(e, t) {
                    $jex.lightbox.content.style[e] = t
                })
            }
            if (e & 1) {
                $jex.hash.each($jex.extend({}, this.d, {
                    height: Math.max(t.scrollHeight, t.clientHeight) + "px",
                    width: Math.max(t.scrollWidth, t.clientWidth) + "px"
                }), function(e, t) {
                    $jex.lightbox.overlay.style[e] = t
                })
            }
        },
        show: function(e, t, n) {
            if (!this.overlay) {
                this.overlay = document.body.appendChild(document.createElement("div"));
                this.content = document.body.appendChild(document.createElement("div"));
                this.overlay.className = "lb_overlay";
                this.content.className = "lb_content"
            }
            if (e) {
                this.content.innerHTML = e
            }
            if (!this.binded) {
                this.binded = true;
                var r = $jex.array.xcopy(document.getElementsByTagName("object"), document.getElementsByTagName("select"), document.getElementsByTagName("embed"), []);
                $jex.array.each(r, function(e) {
                    $jex.lightbox.data(e, e.style.visibility);
                    e.style.visibility = "hidden"
                });
                if (window.attachEvent) window.attachEvent("onresize", this.toBind);
                else if (window.addEventListener) window.addEventListener("resize", this.toBind, false)
            }
            this.content.style.visibility = "hidden";
            this.content.style.display = "block";
            if (typeof t == "function") t.call(this);
            this._place(n == null ? 3 : n);
            this.content.style.visibility = "visible";
            var i = $jex.$("msgButton");
            if (i) {
                $jex.event.click(i, function() {
                    $jex.lightbox.hide()
                })
            }
        },
        hide: function() {
            var e = $jex.array.xcopy(document.getElementsByTagName("object"), document.getElementsByTagName("select"), document.getElementsByTagName("embed"), []);
            $jex.array.each(e, function(e) {
                e.style.visibility = $jex.lightbox.data(e) || "inherit";
                $jex.lightbox.removeData(e)
            });
            for (var t in this.a) this.content.style[t] = this.a[t];
            for (var t in this.b) this.overlay.style[t] = this.b[t];
            if (window.detachEvent) window.detachEvent("onresize", this.toBind);
            else if (window.removeEventListener) window.removeEventListener("resize", this.toBind, false);
            this.binded = false
        }
    };
    var e = document.createElement("style");
    e.type = "text/css";
    var t = ".lb_content {display : none ; position : absolute ; z-index:10000 ; left:0 ;}.lb_overlay {display : none ; position : fixed ; *position : absolute ; z-index:10000 ; background-color : #000 ; left : 0px ; top : 0px ; opacity : 0.2 ; filter: Alpha(opacity=20) ;}";
    if (e.styleSheet) e.styleSheet.cssText = t;
    else e.appendChild(document.createTextNode(t));
    document.getElementsByTagName("head")[0].appendChild(e);
    window.$jex = $jex
})();
$jex.hover = function(e) {
    var t = e.delay || 100,
        n = e.isover || !1,
        r = e.act,
        i = e.extra || [],
        s = null,
        o = function(t) {
            n && e.onmouseover.apply(r, [t])
        },
        u = function(t) {
            n || e.onmouseout.apply(r, [t])
        },
        a = function(e) {
            n = !0;
            s && clearTimeout(s);
            s = setTimeout(function() {
                o(e)
            }, t)
        },
        f = function(e) {
            n = !1;
            s && clearTimeout(s);
            s = setTimeout(function() {
                u(e)
            }, t)
        };
    $jex.event.bind(r, "mouseover", a);
    $jex.event.bind(r, "mouseout", f);
    for (var l = 0, c = i.length; l < c; l += 1) {
        $jex.event.bind(i[l], "mouseover", a);
        $jex.event.bind(i[l], "mouseout", f)
    }
};
var DataSet = function(e) {
    this.options = e || {};
    this._init()
};
DataSet.prototype._init = function() {
    this.currentPage = 0;
    this.totalPage = 0;
    this._pageSize = this.options.pageSize || 15;
    this._currentPageData = null;
    this.currentPageDataMap = {};
    this.recordCount = 0;
    this._data = {};
    this._dataMap = [];
    this.filteredDataMap = [];
    this._currentSortArray = this.options.defaultSort || [];
    this._currentSortKey = this._getSortKey(this.options.defaultSort);
    this._sortMatrix = {};
    this._filterMatrix = {};
    this._filters = [];
    this._filtersMap = {}
};
DataSet.prototype.getData = function() {
    return this._data
};
DataSet.prototype.loadData = function(e) {
    var t = this;
    this._init();
    $jex.foreach(e, function(e, n, r) {
        t.addItem(r, e)
    })
};
DataSet.prototype.addItem = function(e, t) {
    $jex.console.info("DataSet.prototype.addItem:", arguments);
    var n = this._data[e];
    this._data[e] = t;
    this._dataMap.push(e);
    this.filteredDataMap.push(e);
    this._filterMatrix[e] = 0;
    if (!n) {
        this.recordCount++;
        this.filteredRecCount++
    }
};
DataSet.prototype._doSort = function(e) {
    var t = this;
    e = e || this._currentSortKey;
    var n = e.replace(/\-(0|1)/g, function(e, t) {
        return "-" + (t == "1" ? "0" : "1")
    });
    if (!this._sortMatrix[e]) {
        this._sortMatrix[e] = [];
        if (this._sortMatrix[n]) {
            this._sortMatrix[e] = this._sortMatrix[n].slice().reverse()
        } else {
            this._sortMatrix[e] = this._dataMap.slice();
            var r = this._currentSortArray;
            var i = this._data;
            var s = {};
            var o = function(e, n, r) {
                if (!s[n]) {
                    s[n] = t._gotSortValue(e, n, r);
                    if (s[n] == null) {
                        s[n] = Number.MAX_VALUE
                    }
                }
                return s[n]
            };
            this._sortMatrix[e].sort(function(e, t) {
                var n, s, u;
                for (var a = 0; a < r.length; a++) {
                    n = r[a][0];
                    s = o(i, e, n);
                    u = o(i, t, n);
                    var f = 0;
                    if (s > u) {
                        f = 1
                    } else if (s == u) {
                        f = 0
                    } else {
                        f = -1
                    }
                    if (r[a][1]) f = -f;
                    if (f == 0) continue;
                    return f
                }
                return 0
            })
        }
    }
    $jex.console.info("DataSet.prototype._doSort:", "_sortKey:", e, "_sortMatrix[_sortKey]:", this._sortMatrix[e])
};
DataSet.prototype._doGroup = function() {
    var e = this.options.group;
    if (!e) return;
    var t = this._group = {};
    var n = this.filteredDataMap;
    for (var r = 0; r < n.length; r++) {
        var i = this._data[n[r]];
        for (var s in e) {
            if (!t[s]) {
                t[s] = {}
            }
            var o = e[s](i);
            if (!t[s][o]) {
                t[s][o] = []
            }
            t[s][o].push(i)
        }
    }
};
DataSet.prototype.currentGroup = function(e) {
    if (e) {
        return this._group[e] || {}
    } else {
        return this._group
    }
};
DataSet.prototype._doAllFilters = function() {
    var e = this;
    if (this._filters.length == 0) {
        this.filteredDataMap = this._sortMatrix[this._currentSortKey]
    } else {
        $jex.foreach(this._filters, function(t) {
            e.doFilter(t)
        })
    }
};
DataSet.prototype.addFilter = function(e) {
    var t = null;
    if (!this._filtersMap[e.name]) {
        var n = Math.pow(2, this._filters.length);
        t = {
            name: e.name,
            type: e.type,
            value: e.value,
            mask: n,
            nmask: ~n
        };
        this._filters.push(t);
        this._filtersMap[t.name] = t;
        this._filterCount = this._filters.length
    } else {
        this._filtersMap[e.name].value = e.value;
        t = this._filtersMap[e.name]
    }
    return t
};
DataSet.prototype.clearAllFilter = function() {
    this._filtersMap = {};
    this._filters = [];
    this._filterMatrix = {}
};
DataSet.prototype.clearFilter = function(e) {
    if (!this._filtersMap[e]) return;
    else this._filtersMap[e].value = [];
    if (this.filteredDataMap) this.filteredDataMap = [];
    else return;
    var t = this._sortMatrix[this._currentSortKey];
    for (var n = 0; n < this._dataMap.length; n++) {
        var r = t[n];
        this._filterMatrix[r] &= this._filtersMap[e].nmask;
        if (!this._filterMatrix[r]) {
            this.filteredDataMap.push(r)
        }
    }
    this.filteredRecCount = this.filteredDataMap.length
};
DataSet.prototype.doFilter = function(e) {
    var t = this;
    var n = e.name,
        r = e.value,
        i = e.type;
    if (!r || r.length == 0) {
        this.clearFilter(n);
        return false
    }
    this.filteredDataMap = [];
    var s = this.addFilter(e);
    if (this.recordCount == 0) return;
    if (!this._currentSortKey || this._currentSortKey == -1) {
        var o = this._dataMap
    } else {
        var o = this._sortMatrix[this._currentSortKey]
    }
    $jex.console.info("DataSet.prototype.doFilter:", "_filter:", s);
    if (o) {
        $jex.foreach(o, function(e) {
            if (t.options.filterFunc && t.options.filterFunc[n]) {
                var r = t.options.filterFunc[n](t._data[e], e, s)
            } else {
                var r = t._data[e][n]
            }
            if (t._checkFilter(t._filtersMap[n], r)) {
                t._filterMatrix[e] &= t._filtersMap[n].nmask
            } else {
                t._filterMatrix[e] |= t._filtersMap[n].mask
            }
            if (!t._filterMatrix[e]) {
                t.filteredDataMap.push(e)
            }
        })
    }
};
DataSet.prototype._checkFilter = function(e, t) {
    var n = false;
    if (e.value.length == 0) {
        return true
    }
    switch (e.type) {
        case 4:
            $jex.foreach(e.value, function(e) {
                t = !$jex.isArray(t) ? [t] : t;
                var r = $jex.array.indexOf(t, e);
                if (r > -1) {
                    n = true;
                    return $jex.$break
                }
            });
            break;
        case 8:
            var r = t.join();
            $jex.foreach(e.value, function(e) {
                if (r.indexOf(e) >= 0) {
                    n = true;
                    return $jex.$break
                }
            });
            break
    }
    $jex.console.info("DataSet.prototype._checkFilter", "_filter:", e, "_value:", t, "result:", n);
    return n
};
DataSet.prototype._gotSortValue = function(e, t, n) {
    var r = e[t][n];
    if (typeof r == "function") {
        return r.call(e[t])
    } else if (r) {
        return r
    } else if (this.options.sortFunc && this.options.sortFunc[n]) {
        return this.options.sortFunc[n](e[t], t, n)
    } else {
        $jex.console.error("DataSet,sort,gotSortValue:", "dataSource[key]:", e[t], "key:", t, "indexStr:", n);
        return 0
    }
};
DataSet.prototype.sort = function(e) {
    var t = e || this._defaultSort;
    this._currentSortArray = t;
    var n = this._getSortKey(t);
    this._currentSortKey = n;
    $jex.console.info("DataSet.prototype.sort: _sortDef:", e, ", _sortKey:", n, ", _currentSortKey:", this._currentSortKey)
};
DataSet.prototype._getSortKey = function(e) {
    var t = [];
    $jex.foreach(e, function(e, n) {
        t.push([e[0], e[1] ? "1" : "0"].join("-"))
    });
    return t.join("|")
};
DataSet.prototype.pageSize = function(e) {
    if (!e) {
        return this._pageSize
    } else {
        this._pageSize = e;
        this.currentPage = 0;
        this._refreshDisplay()
    }
};
DataSet.prototype.pageIndex = function() {
    return this.currentPage
};
DataSet.prototype.pageCount = function() {
    return this._maxPage
};
DataSet.prototype._refreshDisplay = function(e) {
    if (e == null) {
        var e = this.currentPage
    } else {
        this.currentPage = e
    }
    var t = this.filteredDataMap.length / this._pageSize;
    var n = Math.floor(t);
    this._maxPage = n + (t - n == 0 ? 0 : 1);
    if (this._maxPage < 0) {
        this._maxPage = 0
    }
    if (this.currentPage > this._maxPage) {
        this.currentPage = this._maxPage
    }
    var r = this.filteredDataMap.slice();
    $jex.event.trigger(this, "refreshCurrentPage", r, this._data, this.currentPage, this._pageSize, this._currentSortArray);
    var i = [];
    for (var s = this.currentPage * this._pageSize; s < Math.min((this.currentPage + 1) * this._pageSize, r.length); s++) {
        var o = r[s];
        i.push(this._data[o]);
        this.currentPageDataMap[o] = 1
    }
    this._currentPageData = i;
    ScrollShow.num = this.currentPageData() && this.currentPageData().length || 60;
    $jex.console.info("DataSet.prototype._refreshDisplay:", "_page:", e, "this.currentPage:", this.currentPage, "this._maxPage:", this._maxPage)
};
DataSet.prototype.setPageIndex = function(e) {
    this.currentPage = e
};
DataSet.prototype.gotoPage = function(e) {
    e = parseInt(e, 10);
    if (e >= 0) this._refreshDisplay(e);
    else if (e == -1) this._refreshDisplay(this.currentPage - 1);
    else if (e == -2) this._refreshDisplay(this.currentPage + 1)
};
DataSet.prototype.currentPageData = function() {
    return this._currentPageData
};
DataSet.prototype.refreshPage = function() {
    this._refreshDisplay()
};
DataSet.prototype.refresh = function() {
    $jex.console.start("DataSet.prototype.refresh");
    this._sortMatrix = {};
    this._filterMatrix = {};
    $jex.console.start("_doSort");
    this._doSort();
    $jex.console.end("_doSort");
    $jex.console.start("_doAllFilters");
    this._doAllFilters();
    $jex.console.end("_doAllFilters");
    $jex.console.start("_doGroup");
    this._doGroup();
    $jex.console.end("_doGroup");
    $jex.console.start("_refreshDisplay");
    this._refreshDisplay();
    $jex.console.end("_refreshDisplay");
    $jex.console.end("DataSet.prototype.refresh")
};
DataSet.prototype.getRecordCount = function() {
    return this._dataMap.length
};
DataSet.prototype.hasItem = function(e) {
    return this._data[e]
};
DataSet.prototype.getFiltersMap = function(e) {
    if (e) {
        return this._filtersMap[e]
    }
    return this._filtersMap
};
try {
    $jex.extendClass(XControl, UIObject);
    XControl.prototype.update = $jex.VOIDFUNC
} catch (e) {}
XControl.prototype.updateSource = function(e) {
    if (e) {
        this.dataSource(e)
    }
    this.update(this.dataSource())
};
XControl.prototype.initialize = function() {
    for (var e = 0; e < this._onInit_funcArr.length; e++) {
        this._onInit_funcArr[e].call(this)
    }
    this._onInit_funcArr = []
};
XControl.prototype.elem = function() {
    return this._setting.elemId ? $jex.$(this._setting.elemId) : null
};
XControl.prototype.onInit = function(e) {
    if (typeof e == "function") {
        this._onInit_funcArr.push(e)
    }
};
XControl.prototype.render = function(e) {
    var t = e || this.elem();
    if (!t) {
        $jex.console.info("[XControl]没有可供生成HTML的容器", this);
        return
    }
    this.write(t)
};
XControl.prototype.show = function() {};
XControl.prototype.hide = function() {};
XControl.prototype.find = XControl.prototype.getDomNode;
$jex.extendClass(XSelect, XControl);
$jex.register("XSelect", XSelect);
XSelect.prototype.initList = function(e) {
    this.find("curr").innerHTML = "";
    this.find("ulList").innerHTML = "";
    this.dataSource = e;
    this._dataSource = [];
    var t = this;
    var n = 0;
    var r = 0;
    var i = this._items_buffer = new UIObject;
    $jex.console.info("add items , ", e);
    $jex.foreach(e, function(e, i, s) {
        var o = t.createOptionItem(e, i, s);
        t._addNewItem(o, i);
        if (o.selected) {
            n = i
        }
        r++
    });
    i.write(this.find("ulList"));
    var t = this;
    for (var s = 0; s < r; s++) {
        var o = i.getDomNode("item" + s);
        o.index = s;
        o.dataSource = this._dataSource[s];
        $jex.event.binding(o, "mouseover", function(e) {
            t._chooseItem(this.index)
        });
        $jex.event.binding(o, "mousedown", function(e) {
            t.selectItem(this.index);
            $jex.element.hide(t.find("ulList"))
        })
    }
    this.selectItem(n);
    this.initial = true
};
XSelect.prototype.val = function(e) {
    if (e) {
        for (var t = 0; t < this._dataSource.length; t++) {
            var n = this._dataSource[t];
            $jex.console.info("XSelect", this, t, "set value", n, e);
            if (n.value == e) {
                this.selectItem(t);
                break
            }
        }
    } else {
        return this.selectedItem
    }
};
XSelect.prototype.selectItem = function(e) {
    var t = this.selectedItem;
    var n = this._dataSource[e];
    this.selectedItem = n;
    this._chooseItem(e);
    this.find("curr").innerHTML = n.name;
    $jex.console.info("XSelect selectItem", e, n, this);
    if (this._setting.initFire == true || this._setting.initFire == false && this.initial == true) {
        $jex.event.trigger(this, "changeValue", n, t)
    }
};
XSelect.prototype.createOptionItem = function(e, t, n) {
    return e
};
XSelect.prototype.update = function() {
    this.clear();
    var e = this;
    e.text('<div class="cs">');
    e.text("<div>");
    e.text('		<div class="CSContainer">');
    e.append("			<div ", "btnDown", ' class="CSTitleLine">');
    e.text('				<div class="CSButton"> <img src="http://simg1.qunarzz.com/site/images/new_main/icon_MoreNextDays.gif"/> </div>');
    e.text('				<div class="CSTitleText"> ');
    e.append("					<span ", "curr", " ></span>");
    e.text("				</div>");
    e.text("			</div>");
    e.append("			<ul  ", "ulList", ' class="CSList" style="display:none;">');
    e.text("			</ul>");
    e.text("		</div>");
    e.text("</div>");
    e.text("</div>");
    this.onInit(function() {
        var e = this.find("btnDown");
        var t = this.find("ulList");
        var n = this.elem();
        $jex.event.binding(e, "click", function() {
            $jex.element.toggle(t)
        });
        $jex.event.binding(document, "mousedown", function(e) {
            if (!$jex.event.within(n, e)) {
                $jex.element.hide(t)
            }
        });
        if (this._setting.values) {
            this.initList(this._setting.values)
        }
    })
};
XSelect.prototype._addNewItem = function(e, t) {
    var n = this._items_buffer;
    n.append("<li ", "item" + t, ' class="CSOption" ');
    n.text(' title="', e.name, '">', e.name, "</li>");
    this._dataSource.push(e)
};
XSelect.prototype._chooseItem = function(e) {
    var t = this._items_buffer;
    var n = t.getDomNode("item" + e);
    if (this._currOpt) {
        $jex.removeClassName(this._currOpt, "onhover")
    }
    $jex.addClassName(n, "onhover");
    this._currOpt = n
};
var Hogan = {};
(function(e, t) {
    function a(e) {
        return String(e === null || e === undefined ? "" : e)
    }

    function f(e) {
        e = a(e);
        return u.test(e) ? e.replace(n, "&amp;").replace(r, "&lt;").replace(i, "&gt;").replace(s, "&#39;").replace(o, "&quot;") : e
    }
    e.Template = function(e, n, r, i) {
        this.r = e || this.r;
        this.c = r;
        this.options = i;
        this.text = n || "";
        this.buf = t ? [] : ""
    };
    e.Template.prototype = {
        r: function(e, t, n) {
            return ""
        },
        v: f,
        t: a,
        render: function(t, n, r) {
            return this.ri([t], n || {}, r)
        },
        ri: function(e, t, n) {
            return this.r(e, t, n)
        },
        rp: function(e, t, n, r) {
            var i = n[e];
            if (!i) {
                return ""
            }
            if (this.c && typeof i == "string") {
                i = this.c.compile(i, this.options)
            }
            return i.ri(t, n, r)
        },
        rs: function(e, t, n) {
            var r = e[e.length - 1];
            if (!l(r)) {
                n(e, t, this);
                return
            }
            for (var i = 0; i < r.length; i++) {
                e.push(r[i]);
                n(e, t, this);
                e.pop()
            }
        },
        s: function(e, t, n, r, i, s, o) {
            var u;
            if (l(e) && e.length === 0) {
                return false
            }
            if (typeof e == "function") {
                e = this.ls(e, t, n, r, i, s, o)
            }
            u = e === "" || !!e;
            if (!r && u && t) {
                t.push(typeof e == "object" ? e : t[t.length - 1])
            }
            return u
        },
        d: function(e, t, n, r) {
            var i = e.split("."),
                s = this.f(i[0], t, n, r),
                o = null;
            if (e === "." && l(t[t.length - 2])) {
                return t[t.length - 1]
            }
            for (var u = 1; u < i.length; u++) {
                if (s && typeof s == "object" && i[u] in s) {
                    o = s;
                    s = s[i[u]]
                } else {
                    s = ""
                }
            }
            if (r && !s) {
                return false
            }
            if (!r && typeof s == "function") {
                t.push(o);
                s = this.lv(s, t, n);
                t.pop()
            }
            return s
        },
        f: function(e, t, n, r) {
            var i = false,
                s = null,
                o = false;
            for (var u = t.length - 1; u >= 0; u--) {
                s = t[u];
                if (s && typeof s == "object" && e in s) {
                    i = s[e];
                    o = true;
                    break
                }
            }
            if (!o) {
                return r ? false : ""
            }
            if (!r && typeof i == "function") {
                i = this.lv(i, t, n)
            }
            return i
        },
        ho: function(e, t, n, r, i) {
            var s = this.c;
            var o = this.options;
            o.delimiters = i;
            var r = e.call(t, r);
            r = r == null ? String(r) : r.toString();
            this.b(s.compile(r, o).render(t, n));
            return false
        },
        b: t ? function(e) {
            this.buf.push(e)
        } : function(e) {
            this.buf += e
        },
        fl: t ? function() {
            var e = this.buf.join("");
            this.buf = [];
            return e
        } : function() {
            var e = this.buf;
            this.buf = "";
            return e
        },
        ls: function(e, t, n, r, i, s, o) {
            var u = t[t.length - 1],
                a = null;
            if (!r && this.c && e.length > 0) {
                return this.ho(e, u, n, this.text.substring(i, s), o)
            }
            a = e.call(u);
            if (typeof a == "function") {
                if (r) {
                    return true
                } else if (this.c) {
                    return this.ho(a, u, n, this.text.substring(i, s), o)
                }
            }
            return a
        },
        lv: function(e, t, n) {
            var r = t[t.length - 1];
            var i = e.call(r);
            if (typeof i == "function") {
                i = a(i.call(r));
                if (this.c && ~i.indexOf("{{")) {
                    return this.c.compile(i, this.options).render(r, n)
                }
            }
            return a(i)
        }
    };
    var n = /&/g,
        r = /</g,
        i = />/g,
        s = /\'/g,
        o = /\"/g,
        u = /[&<>\"\']/;
    var l = Array.isArray || function(e) {
        return Object.prototype.toString.call(e) === "[object Array]"
    }
})(typeof exports !== "undefined" ? exports : Hogan, true);
(function(e) {
    function u(e) {
        if (e.n.substr(e.n.length - 1) === "}") {
            e.n = e.n.substring(0, e.n.length - 1)
        }
    }

    function a(e) {
        if (e.trim) {
            return e.trim()
        }
        return e.replace(/^\s*|\s*$/g, "")
    }

    function f(e, t, n) {
        if (t.charAt(n) != e.charAt(0)) {
            return false
        }
        for (var r = 1, i = e.length; r < i; r++) {
            if (t.charAt(n + r) != e.charAt(r)) {
                return false
            }
        }
        return true
    }

    function l(e, t, n, r) {
        var i = [],
            s = null,
            o = null;
        while (e.length > 0) {
            o = e.shift();
            if (o.tag == "#" || o.tag == "^" || c(o, r)) {
                n.push(o);
                o.nodes = l(e, o.tag, n, r);
                i.push(o)
            } else if (o.tag == "/") {
                if (n.length === 0) {
                    throw new Error("Closing tag without opener: /" + o.n)
                }
                s = n.pop();
                if (o.n != s.n && !h(o.n, s.n, r)) {
                    throw new Error("Nesting error: " + s.n + " vs. " + o.n)
                }
                s.end = o.i;
                return i
            } else {
                i.push(o)
            }
        }
        if (n.length > 0) {
            throw new Error("missing closing tag: " + n.pop().n)
        }
        return i
    }

    function c(e, t) {
        for (var n = 0, r = t.length; n < r; n++) {
            if (t[n].o == e.n) {
                e.tag = "#";
                return true
            }
        }
    }

    function h(e, t, n) {
        for (var r = 0, i = n.length; r < i; r++) {
            if (n[r].c == e && n[r].o == t) {
                return true
            }
        }
    }

    function p(e) {
        return e.replace(s, "\\\\").replace(n, '\\"').replace(r, "\\n").replace(i, "\\r")
    }

    function d(e) {
        return ~e.indexOf(".") ? "d" : "f"
    }

    function v(e) {
        var t = "";
        for (var n = 0, r = e.length; n < r; n++) {
            var i = e[n].tag;
            if (i == "#") {
                t += m(e[n].nodes, e[n].n, d(e[n].n), e[n].i, e[n].end, e[n].otag + " " + e[n].ctag)
            } else if (i == "^") {
                t += g(e[n].nodes, e[n].n, d(e[n].n))
            } else if (i == "<" || i == ">") {
                t += y(e[n])
            } else if (i == "{" || i == "&") {
                t += b(e[n].n, d(e[n].n))
            } else if (i == "\n") {
                t += E('"\\n"' + (e.length - 1 == n ? "" : " + i"))
            } else if (i == "_v") {
                t += w(e[n].n, d(e[n].n))
            } else if (i === undefined) {
                t += E('"' + p(e[n]) + '"')
            }
        }
        return t
    }

    function m(e, t, n, r, i, s) {
        return "if(_.s(_." + n + '("' + p(t) + '",c,p,1),' + "c,p,0," + r + "," + i + ',"' + s + '")){' + "_.rs(c,p," + "function(c,p,_){" + v(e) + "});c.pop();}"
    }

    function g(e, t, n) {
        return "if(!_.s(_." + n + '("' + p(t) + '",c,p,1),c,p,1,0,0,"")){' + v(e) + "};"
    }

    function y(e) {
        return '_.b(_.rp("' + p(e.n) + '",c,p,"' + (e.indent || "") + '"));'
    }

    function b(e, t) {
        return "_.b(_.t(_." + t + '("' + p(e) + '",c,p,0)));'
    }

    function w(e, t) {
        return "_.b(_.v(_." + t + '("' + p(e) + '",c,p,0)));'
    }

    function E(e) {
        return "_.b(" + e + ");"
    }
    var t = /\S/,
        n = /\"/g,
        r = /\n/g,
        i = /\r/g,
        s = /\\/g,
        o = {
            "#": 1,
            "^": 2,
            "/": 3,
            "!": 4,
            ">": 5,
            "<": 6,
            "=": 7,
            _v: 8,
            "{": 9,
            "&": 10
        };
    e.scan = function(n, r) {
        function S() {
            if (v.length > 0) {
                m.push(new String(v));
                v = ""
            }
        }

        function x() {
            var e = true;
            for (var n = b; n < m.length; n++) {
                e = m[n].tag && o[m[n].tag] < o["_v"] || !m[n].tag && m[n].match(t) === null;
                if (!e) {
                    return false
                }
            }
            return e
        }

        function T(e, t) {
            S();
            if (e && x()) {
                for (var n = b, r; n < m.length; n++) {
                    if (!m[n].tag) {
                        if ((r = m[n + 1]) && r.tag == ">") {
                            r.indent = m[n].toString()
                        }
                        m.splice(n, 1)
                    }
                }
            } else if (!t) {
                m.push({
                    tag: "\n"
                })
            }
            g = false;
            b = m.length
        }

        function N(e, t) {
            var n = "=" + E,
                r = e.indexOf(n, t),
                i = a(e.substring(e.indexOf("=", t) + 1, r)).split(" ");
            w = i[0];
            E = i[1];
            return r + n.length - 1
        }
        var i = n.length,
            s = 0,
            l = 1,
            c = 2,
            h = s,
            p = null,
            d = null,
            v = "",
            m = [],
            g = false,
            y = 0,
            b = 0,
            w = "{{",
            E = "}}";
        if (r) {
            r = r.split(" ");
            w = r[0];
            E = r[1]
        }
        for (y = 0; y < i; y++) {
            if (h == s) {
                if (f(w, n, y)) {
                    --y;
                    S();
                    h = l
                } else {
                    if (n.charAt(y) == "\n") {
                        T(g)
                    } else {
                        v += n.charAt(y)
                    }
                }
            } else if (h == l) {
                y += w.length - 1;
                d = o[n.charAt(y + 1)];
                p = d ? n.charAt(y + 1) : "_v";
                if (p == "=") {
                    y = N(n, y);
                    h = s
                } else {
                    if (d) {
                        y++
                    }
                    h = c
                }
                g = y
            } else {
                if (f(E, n, y)) {
                    m.push({
                        tag: p,
                        n: a(v),
                        otag: w,
                        ctag: E,
                        i: p == "/" ? g - E.length : y + w.length
                    });
                    v = "";
                    y += E.length - 1;
                    h = s;
                    if (p == "{") {
                        if (E == "}}") {
                            y++
                        } else {
                            u(m[m.length - 1])
                        }
                    }
                } else {
                    v += n.charAt(y)
                }
            }
        }
        T(g, true);
        return m
    };
    e.generate = function(t, n, r) {
        var i = 'var _=this;_.b(i=i||"");' + v(t) + "return _.fl();";
        if (r.asString) {
            return "function(c,p,i){" + i + ";}"
        }
        return new e.Template(new Function("c", "p", "i", i), n, e, r)
    };
    e.parse = function(e, t, n) {
        n = n || {};
        return l(e, "", [], n.sectionTags || [])
    }, e.cache = {};
    e.compile = function(e, t) {
        t = t || {};
        var n = e + "||" + !!t.asString;
        var r = this.cache[n];
        if (r) {
            return r
        }
        r = this.generate(this.parse(this.scan(e, t.delimiters), e, t), e, t);
        return this.cache[n] = r
    }
})(typeof exports !== "undefined" ? exports : Hogan);
if (typeof define === "function" && define.amd) {
    define(Hogan)
}(function(e) {
    function r(e, n, r, s, o) {
        var u = [];
        var a = i(e, n, s, o),
            f = "ifr" + o,
            l = "form" + o;
        u.push('<form id="' + l + '" target="' + f + '" action="' + a + '" method="POST">');
        for (var c in r) {
            if (r.hasOwnProperty(c)) {
                u.push('<input type="text" name="' + c + '" value="' + r[c] + '" />')
            }
        }
        u.push('<input id="hostname" name="" value="' + t + '" />');
        u.push('<input id="proxypath" name="" value="' + n + '" />');
        u.push('<input id="crosscall" name="" value="' + s + '" />');
        u.push('<input id="frameid" name="frameid" value="' + o + '" /></form>');
        u.push('<iframe name="' + f + '" id="' + f + '" src="about:blank"></iframe>');
        return u.join("")
    }

    function i(e, n, r, i) {
        var s = t,
            o = e.indexOf("#"),
            u = [e];
        var a = o < 0 ? "#" : e.substr(o);
        u[u.length] = a;
        if (a.replace(/#/g, "").length) {
            u.push("&")
        }
        u[u.length] = "crosspath=" + encodeURIComponent("http://" + s + "/" + n);
        u[u.length] = "&";
        u[u.length] = "crosscall=" + encodeURIComponent(r);
        u[u.length] = "&";
        u[u.length] = "frameid=" + i;
        return u.join("")
    }
    if (typeof e.QNR === "undefined") {
        e.QNR = {}
    }
    var t = e.location.hostname,
        n = e.document;
    QNR.crossDomainPost = function(t, i, s, o) {
        if (!t) {
            return
        }
        o = o || {};
        i = i || {};
        var u = o.timeout || 0,
            a = "crossDomainPost" + (new Date).getTime(),
            f = false;
        var l = function() {
            if (f) {
                return
            }
            if (o.ontimeout) {
                o.ontimeout(t, i, s, a)
            }
            h()
        };
        var c = function(e) {
            if (f) {
                return
            }
            if (o.onsuccess) {
                o.onsuccess(e)
            }
            h()
        };
        var h = function() {
            var t = n.getElementById(a);
            t.parentNode.removeChild(t);
            f = true;
            e[a] = null
        };
        e[a] = c;
        var p = r(t, s, i, a, a),
            d = n.createElement("div");
        d.style.display = "none";
        d.id = a;
        d.innerHTML = p;
        n.body.appendChild(d);
        var v = n.getElementById("form" + a);
        if (/MSIE/i.test(navigator.appVersion)) {
            n.getElementById("ifr" + a).src = 'javascript:\'<script>window.onload=function(){document.write(\\\'<script>document.domain=\\"qunar.com\\";parent.document.getElementById("form' + a + "\").submit();<\\\\/script>\\');document.close();};</script>'";
        } else {
            v.submit()
        }
        if (u) {
            setTimeout(l, u)
        }
    }
})(this);
ScriptRequest.loadScript = function(e, t) {
    t = t || document;
    var n = t.createElement("script");
    n.type = "text/javascript";
    n.src = e;
    t.getElementsByTagName("head")[0].appendChild(n);
    return n
};
ScriptRequest.prototype.send = function(e, t) {
    var n = this.callID = this.funcName ? this.funcName : "XQScript_" + $jex.globalID();
    if (e.indexOf("?") == -1) e = e + "?";
    e += "&" + this.callbackName + "=" + n;
    var r = this;
    var i = this.win;
    var s;
    i[n] = function() {
        if (s) {
            window.clearTimeout(s);
            s = null
        }
        r.release();
        i[n] = null;
        $jex.event.triggerParam(r, "complete", $jex.array.toArray(arguments))
    };
    if (t && t > 0) {
        s = window.setTimeout(function() {
            r.release();
            $jex.event.trigger(r, "timeout")
        }, t)
    }
    this.searchPort = ScriptRequest.loadScript(e, this.doc)
};
ScriptRequest.prototype.release = function() {
    if (this.searchPort) {
        $jex.removeElement(this.searchPort);
        this.searchPort = null;
        this.win[this.callID] = $jex.VOIDFUNC;
        return true
    }
    return false
};
ScriptRequest.prototype.cancel = function() {
    if (this.release()) $jex.event.trigger(this, "cancel")
};
var ConfigManager = new function() {
    var e = {};
    this.setConfig = function(t) {
        $jex.merge(e, t)
    };
    this.getConfig = function() {
        var t = e;
        var n = [];
        for (var r = 0; r < arguments.length; r++) {
            var i = arguments[r];
            n.push(i);
            if (t[i] == null) {
                $jex.console.warn("[ConfigManager][找不到配置]:", n.join("."));
                return null
            } else {
                t = t[i]
            }
        }
        return t
    };
    return this
};
var PriceUtil = {
    getOneWayDiscount: function(e) {
        var t = PriceUtil.getDiscount(e);
        return t.replace(/([\d.]+)/, '<span class="f_tha">$1</span>')
    },
    getDiscount: function(e) {
        if (e <= 0) return "";
        if (e > 9.9) {
            if (e > 10) return "";
            else return "全价"
        } else {
            if (e.toString().length == 1) return e + ".0" + "折";
            else return e + "折"
        }
    },
    getTransferDiscount: function(e) {
        if (e <= 0) return "";
        if (e > 9.9) {
            return ""
        } else {
            if (e.toString().length == 1) return e + ".0" + "折";
            else return e + "折"
        }
    }
};
var FlightUtil = {
    codePatch: function(e) {
        var t = 1;
        var n = "";
        for (var r = 0; r < e.length; r++) {
            if (e.charAt(r) == "/") {
                if (t % 2 == 0) {
                    n += "/ ";
                    t++
                } else {
                    n += "/";
                    t++
                }
            } else n += e.charAt(r)
        }
        return n
    },
    catAdtext: function(e, t) {
        if (!t) t = 19;
        if (!e) return "";
        if (e.length > t) {
            return e.substr(0, t) + "..."
        } else {
            return e
        }
    },
    catText: function(e, t) {
        var n = e.replace(/[^x00-xff]/g, "aa");
        if (n.length > 2 * t) {
            var r = 0;
            for (var i = 0; i < t; i++) {
                var s = e.charAt(i);
                if (/[^x00-xff]/.test(s)) {
                    r++
                } else {
                    r += 2
                }
                if (r >= 2 * t) break
            }
            return e.substr(0, r) + "..."
        } else {
            return e
        }
    },
    starClass: function(e) {
        if (e == null || typeof e != "number" && !/^(\d+.\d+|\d+)$/.test(e)) {
            return ""
        }
        var e = parseFloat(e);
        if (e > 3) {
            return "star30"
        }
        switch (e) {
            case 0:
                return "star00";
            case .5:
                return "star05";
            case 1:
                return "star10";
            case 1.5:
                return "star15";
            case 2:
                return "star20";
            case 2.5:
                return "star25";
            case 3:
                return "star30";
            default:
                return "star00"
        }
    },
    getGTITLE: function(e, t, n, r) {
        if (e == null || t == null) return "";
        if (e >= 100) var i = "AD_";
        else var i = "nonAD_";
        var s = ConfigManager.getConfig("rank", "GTITLE", i + "G" + t);
        if (!s) return "";
        var o = 0;
        if (n <= 5 && n >= 4) {
            o = 0
        } else if (n < 3.9 && n >= 3) {
            o = 1
        } else if (n < 2.9 && n >= 2) {
            o = 2
        } else if (n < 1.9 && n >= 0) {
            o = 3
        }
        if (s[o]) {
            return s[o]
        } else return ""
    },
    timeRange: function(e) {
        var t = e.substr(0, 2);
        var n = e.substr(3, 4);
        var r = parseInt(t, 10);
        var i = parseInt(n, 10);
        if (r >= 0 && r < 10) {
            return [0]
        } else if (r == 10) {
            return i == 0 ? [0, 1] : [1]
        } else if (r > 10 && r < 14) {
            return [1]
        } else if (r == 14) {
            return i == 0 ? [1, 2] : [2]
        } else if (r > 14 && r < 19) {
            return [2]
        } else if (r == 19) {
            return i == 0 ? [2, 3] : [3]
        } else if (r > 19 && r < 24) {
            return [3]
        }
    },
    duration: function(e) {
        var t = Math.floor(e / 60);
        var n = e % 60;
        var r = t ? t + "小时" : "";
        r += n ? n + "分" : "";
        if (r) r = "约" + r;
        return r
    },
    interDuration: function(e) {
        if (e == Number.MAX_VALUE) return "";
        var t = Math.floor(e / 60);
        var n = e % 60;
        if (n >= 24 && n <= 36) {
            t += .5
        } else if (n > 36) {
            t += 1
        }
        var r = t ? t + "小时" : "";
        if (r) r = "约" + r;
        return r
    }
};
(function(e) {
    var t = function() {
            var e = 1;
            return function() {
                return e++
            }
        }(),
        n = function() {
            var e = "local_storage";
            return {
                _store: null,
                _getStore: function() {
                    if (!this._store) {
                        try {
                            this._store = document.createElement("input");
                            this._store.type = "hidden";
                            this._store.addBehavior("#default#userData");
                            document.body.appendChild(this._store)
                        } catch (e) {
                            var t = [];
                            for (var n in e) {
                                t.push(n + ": " + e[n])
                            }
                            document.title = t.join("\n");
                            return false
                        }
                    }
                    return this._store
                },
                get: function(t) {
                    var n = this._getStore();
                    if (!n) return false;
                    n.load(e);
                    return n.getAttribute(t)
                },
                add: function(t) {
                    var n = this._getStore();
                    if (!n) return false;
                    n.load(e);
                    n.setAttribute(t.name, t.value);
                    n.save(e)
                },
                remove: function(t) {
                    var n = this._getStore();
                    if (!n) return false;
                    n.load(e);
                    n.removeAttribute(t);
                    n.save(e)
                },
                clear: function() {
                    var t = this._getStore();
                    if (!t) return false;
                    var n = t.XMLDocument;
                    var r = n.selectSingleNode("ROOTSTUB");
                    for (var i = 0; i < r.attributes.length; ++i) {
                        var s = r.attributes[i];
                        t.removeAttribute(s.baseName)
                    }
                    t.save(e)
                },
                addListItem: function(e, t, n) {
                    n = n || {};
                    var r = this.getList(e, true, n);
                    r[n.isFirst ? "unshift" : "push"](t);
                    this.add({
                        name: e,
                        value: JSON.stringify(r)
                    });
                    return true
                },
                removeListItem: function(e, t, n) {
                    n = n || {};
                    var r = JSON.parse(this.get(e) || "[]"),
                        i, s, o, u = [],
                        a = false;
                    if (r && r.length && r instanceof Array) {
                        for (i = 0, s = r.length; i < s; i++) {
                            o = r[i];
                            if (o.uniqueKey === t) {
                                a = true;
                                continue
                            }
                            if (!(o.expires && o.expires < (new Date).getTime())) {
                                if (!n.isValidItem || n.isValidItem(o)) {
                                    u.push(o)
                                }
                            }
                        }
                        this.add({
                            name: e,
                            value: JSON.stringify(u)
                        })
                    }
                    return a
                },
                removeList: function(e) {
                    this.remove(e)
                },
                getList: function(e, t, n) {
                    if (t) {
                        return this.refreshList(e, n)
                    }
                    return JSON.parse(this.get(e) || "[]")
                },
                refreshList: function(e, t) {
                    var n = JSON.parse(this.get(e) || "[]"),
                        r, i, s, o = [];
                    if (n && n.length && n instanceof Array) {
                        t = t || {};
                        t.data = t.data || {};
                        for (r = 0, i = n.length; r < i; r++) {
                            s = n[r];
                            if (!(s.expires && s.expires < (new Date).getTime())) {
                                if (!t.isValidItem || t.isValidItem(s)) {
                                    o.push($jex.merge(s, t.data[s.uniqueKey] || {}))
                                }
                            }
                        }
                        this.add({
                            name: e,
                            value: JSON.stringify(o)
                        })
                    }
                    return o
                }
            }
        }(),
        r = {
            add: function(e) {
                if (e.name) {
                    var t = e.name + "=" + e.value;
                    if (e.expire) {
                        t += ";expires=" + (new Date((new Date).getTime() + e.expire)).toGMTString()
                    }
                    if (e.domain) {
                        t += ";domain=" + e.domain
                    }
                    if (e.path) {
                        t += ";path=" + e.path
                    }
                    document.cookie = t
                }
            },
            remove: function(e, t) {
                if (e) {
                    var n = e + "=1;expires=" + (new Date((new Date).getTime() - 864e5)).toGMTString();
                    t = t || {};
                    n += ";path=" + (t.path || "/");
                    document.cookie = n;
                    return true
                }
                return false
            },
            get: function(e) {
                var t = document.cookie.split(/;\s*/),
                    n, r;
                for (n = 0; n < t.length; n++) {
                    r = t[n].split("=");
                    if (r[0] == e) {
                        return r[1]
                    }
                }
                return undefined
            },
            getuuidMap: function(e) {
                var t = this.get(e + "Map");
                return t ? JSON.parse(t) : null
            },
            addListItem: function(e, n, r) {
                r = r || {};
                var i = this.getuuidMap(e),
                    s;
                if (!i) {
                    i = ["0"];
                    this.add({
                        name: e + "Map",
                        value: JSON.stringify(i),
                        path: r.path || "/"
                    })
                }
                if (r.isFirst) {
                    s = i[0]
                } else {
                    s = i[i.length - 1]
                }
                var o = this.getList(e, true, s),
                    u = o.slice(0);
                o[r.isFirst ? "unshift" : "push"](n);
                this.add({
                    name: e + s,
                    value: JSON.stringify(o),
                    expires: r.expires || 30 * 864e5,
                    path: r.path || "/"
                });
                if (this.getList(e, false, s).length === o.length) {
                    return true
                } else {
                    this.add({
                        name: e + s,
                        value: JSON.stringify(u),
                        expires: r.expires || 30 * 864e5,
                        path: r.path || "/"
                    });
                    i[r.isFirst ? "unshift" : "push"](t());
                    this.add({
                        name: e + "Map",
                        value: JSON.stringify(i),
                        path: r.path || "/"
                    });
                    return this.addListItem(e, n, r)
                }
            },
            removeListItem: function(e, t, n) {
                var r = this,
                    i = false,
                    s = $jex.$break;
                $jex.$break = false;
                $jex.foreach(r.getuuidMap(e) || [], function(s, o) {
                    var u = JSON.parse(r.get(e + s) || "[]"),
                        o, a, f, l = [];
                    if (u && u.length && u instanceof Array) {
                        for (o = 0, a = u.length; o < a; o++) {
                            f = u[o];
                            if (f.uniqueKey === t) {
                                i = true;
                                continue
                            }
                            if (!(f.expires && f.expires < (new Date).getTime())) {
                                l.push(f)
                            }
                        }
                        n = n || {};
                        r.add({
                            name: e + s,
                            value: JSON.stringify(l),
                            expires: n.expires || 30 * 864e5,
                            path: n.path || "/"
                        })
                    }
                    if (i) {
                        return $jex.$break
                    }
                });
                $jex.$break = s;
                return i
            },
            removeList: function(e) {
                var t = this;
                $jex.each(this.getuuidMap(e) || [], function(n, r) {
                    t.remove(e + n)
                });
                this.remove(e + "Map")
            },
            getList: function(e, t, n) {
                var r = this;
                if (!n) {
                    var i = [];
                    $jex.each(this.getuuidMap(e) || [], function(n, s) {
                        i = i.concat(r.getList(e, t, n))
                    });
                    return i
                } else {
                    if (t) {
                        return this.refreshList(e, {}, n)
                    }
                    return JSON.parse(this.get(e + n) || "[]")
                }
            },
            refreshList: function(e, t, n) {
                var r = this,
                    i = [];
                if (n) {
                    var s = JSON.parse(this.get(e + n) || "[]"),
                        o, u, a;
                    if (s && s.length && s instanceof Array) {
                        t = t || {};
                        t.data = t.data || {};
                        for (o = 0, u = s.length; o < u; o++) {
                            a = s[o];
                            if (!(a.expires && a.expires < (new Date).getTime())) {
                                i.push($jex.merge(a, t.data[a.uniqueKey] || {}))
                            }
                        }
                        this.add({
                            name: e + n,
                            value: JSON.stringify(i),
                            expires: t.expires || 30 * 864e5,
                            path: t.path || "/"
                        })
                    }
                } else {
                    $jex.each(this.getuuidMap(e) || [], function(n, s) {
                        i = i.concat(r.refreshList(e, t, n))
                    })
                }
                return i
            }
        },
        i = {
            add: function(e) {
                localStorage[e.name] = e.value
            },
            get: function(e) {
                return localStorage[e]
            },
            remove: function(e) {
                localStorage.removeItem(e)
            },
            addListItem: function(e, t, n) {
                n = n || {};
                var r = this.getList(e, true, n);
                r[n.isFirst ? "unshift" : "push"](t);
                this.add({
                    name: e,
                    value: JSON.stringify(r)
                });
                return true
            },
            removeListItem: function(e, t, n) {
                n = n || {};
                var r = JSON.parse(this.get(e) || "[]"),
                    i, s, o, u = [],
                    a = false;
                if (r && r.length && r instanceof Array) {
                    for (i = 0, s = r.length; i < s; i++) {
                        o = r[i];
                        if (o.uniqueKey === t) {
                            a = true;
                            continue
                        }
                        if (!(o.expires && o.expires < (new Date).getTime())) {
                            if (!n.isValidItem || n.isValidItem(o)) {
                                u.push(o)
                            }
                        }
                    }
                    this.add({
                        name: e,
                        value: JSON.stringify(u)
                    })
                }
                return a
            },
            removeList: function(e) {
                this.remove(e)
            },
            getList: function(e, t, n) {
                if (t) {
                    return this.refreshList(e, n)
                }
                return JSON.parse(this.get(e) || "[]")
            },
            refreshList: function(e, t) {
                var n = JSON.parse(this.get(e) || "[]"),
                    r, i, s, o = [];
                if (n && n.length && n instanceof Array) {
                    t = t || {};
                    t.data = t.data || {};
                    for (r = 0, i = n.length; r < i; r++) {
                        s = n[r];
                        if (!(s.expires && s.expires < (new Date).getTime())) {
                            if (!t.isValidItem || t.isValidItem(s)) {
                                o.push($jex.merge(s, t.data[s.uniqueKey] || {}))
                            }
                        }
                    }
                    this.add({
                        name: e,
                        value: JSON.stringify(o)
                    })
                }
                return o
            }
        },
        s = e.localStorage ? i : n;
    e.CookieUtil = r;
    e.StorageUtil = s
})(window);
var QunarDate = $jex.exec(function() {
    var e = {
        "2014-04-05": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "清明"
        },
        "2014-05-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "五一"
        },
        "2014-06-02": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "端午"
        },
        "2014-09-08": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "中秋"
        },
        "2014-10-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "国庆"
        },
        "2014-12-25": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "圣诞"
        },
        "2015-01-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "元旦"
        },
        "2015-02-18": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "除夕"
        },
        "2015-02-19": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "春节"
        },
        "2015-03-05": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "元宵"
        },
        "2015-04-05": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "清明"
        },
        "2015-05-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "五一"
        },
        "2015-06-20": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "端午"
        },
        "2015-09-27": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "中秋"
        },
        "2015-10-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "国庆"
        },
        "2015-12-25": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "圣诞"
        },
        "2016-01-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "元旦"
        },
        "2016-02-07": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "除夕"
        },
        "2016-02-08": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "春节"
        },
        "2016-02-22": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "元宵"
        },
        "2016-04-04": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "清明"
        },
        "2016-05-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "五一"
        },
        "2016-06-09": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "端午"
        },
        "2016-09-15": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "中秋"
        },
        "2016-10-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "国庆"
        },
        "2016-12-25": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "圣诞"
        }
    };
    var t = ["今天", "明天", "后天"];
    var n = 24 * 60 * 60 * 1e3;
    var r = ["日", "一", "二", "三", "四", "五", "六"];
    var i = {
        week: "周",
        day: "天",
        before: "前",
        after: "后"
    };
    var s = {
        SECOND: "秒",
        MILLISECOND: "毫秒",
        MINUTE: "分钟",
        HOUR: "小时",
        DAY: "天",
        YEAR: "年"
    };
    var o = null;
    var u = null;
    var a = ["暑假", "抗战胜利日", "中秋&国庆", "双十一", "圣诞", "元旦", "春节", "寒假", "清明", "五一", "端午", "中秋", "国庆"];
    var f = {
        "1月": {
            valid: true
        },
        "2月": {
            valid: true
        },
        "3月": {
            valid: true
        },
        "4月": {
            valid: true
        },
        "5月": {
            valid: true
        },
        "6月": {
            valid: true
        },
        "7月": {
            valid: true
        },
        "8月": {
            valid: true
        },
        "9月": {
            valid: true
        },
        "10月": {
            valid: true
        },
        "11月": {
            valid: true
        },
        "12月": {
            valid: true
        },
        "暑假": {
            valid: true,
            value: "暑假",
            range: "92",
            endRange: "71",
            start: "2015-06-15",
            end: "2015-09-15",
            last: "2015-08-26",
            fuzzy: true
        },
        "抗战胜利日": {
            valid: true,
            value: "抗战胜利日",
            range: "9",
            endRange: "8",
            start: "2015-08-30",
            end: "2015-09-08",
            last: "2015-09-07",
            fuzzy: true
        },
        "中秋&国庆": {
            valid: true,
            value: "中秋&国庆",
            range: "22",
            endRange: "19",
            start: "2015-09-19",
            end: "2015-10-11",
            last: "2015-10-08",
            fuzzy: true
        },
        "双十一": {
            valid: true,
            value: "双十一",
            range: "8",
            endRange: "5",
            start: "2015-11-07",
            end: "2015-11-15",
            last: "2015-11-12",
            fuzzy: true
        },
        "圣诞": {
            valid: true,
            value: "圣诞",
            range: "11",
            endRange: "7",
            start: "2015-12-20",
            end: "2015-12-31",
            last: "2015-12-27",
            fuzzy: true
        },
        "元旦": {
            valid: true,
            value: "元旦",
            range: "11",
            endRange: "9",
            start: "2015-12-26",
            end: "2016-01-06",
            last: "2016-01-04",
            fuzzy: true
        },
        "春节": {
            valid: true,
            value: "春节",
            range: "20",
            endRange: "13",
            start: "2016-02-01",
            end: "2016-02-21",
            last: "2016-02-14",
            fuzzy: true
        },
        "寒假": {
            valid: true,
            value: "寒假",
            range: "36",
            endRange: "29",
            start: "2016-01-23",
            end: "2016-02-28",
            last: "2016-02-21",
            fuzzy: true
        },
        "清明": {
            valid: true,
            value: "清明",
            range: "9",
            endRange: "4",
            start: "2016-04-01",
            end: "2016-04-10",
            last: "2016-04-05",
            fuzzy: true
        },
        "五一": {
            valid: true,
            value: "五一",
            range: "11",
            endRange: "7",
            start: "2016-04-27",
            end: "2016-05-08",
            last: "2016-05-04",
            fuzzy: true
        },
        "端午": {
            valid: true,
            value: "端午",
            range: "14",
            endRange: "11",
            start: "2016-06-01",
            end: "2016-06-15",
            last: "2016-06-12",
            fuzzy: true
        },
        "中秋": {
            valid: true,
            value: "中秋",
            range: "11",
            endRange: "8",
            start: "2016-09-10",
            end: "2016-09-21",
            last: "2016-09-18",
            fuzzy: true
        },
        "国庆": {
            valid: true,
            value: "国庆",
            range: "15",
            endRange: "14",
            start: "2016-09-24",
            end: "2016-10-09",
            last: "2016-10-08",
            fuzzy: true
        }
    };
    return {
        getFuzzyDate: function(e) {
            var t = this.gtoday();
            var n = f[e];
            if (n) {
                if (n.start && n.end) {
                    n.start = n.start;
                    n.end = n.end
                } else {
                    n.start = this.format(this.plus(t, 1));
                    n.end = this.format(this.plus(t, n.range))
                }
            }
            return n
        },
        getMonthFuzzyTime: function(e) {
            var t = window.SERVER_TIME || new Date;
            var n = /^\d{1,2}月$/.test(e) ? parseInt(e.replace("月", "")) - 1 : t.getMonth() + 1;
            var r = t.getMonth(),
                i = n < r ? t.getFullYear() + 1 : t.getFullYear(),
                s = n == r ? t : new Date(i, n, 1),
                o = new Date(i, n, (new Date(i, n + 1, 0)).getDate());
            return {
                start: QunarDate.format(s),
                end: QunarDate.format(o)
            }
        },
        getFuzzyDateText0: function() {
            return a
        },
        getTimeRange: function(e) {
            var t = parseInt(e.replace(/(\d+):\d+/i, "$1"), 10);
            if (t >= 6 && t < 12) {
                return 0
            }
            if (t == 12) {
                return 1
            }
            if (t > 12 && t <= 18) {
                return 2
            }
            return 3
        },
        isHoliday: function(t) {
            return !!e[t]
        },
        parseTimeToNL_et: function(e) {
            if (e >= n) {
                e = n
            }
            return this.parseTimeToNL(e)
        },
        parseTimeToNL: function(e) {
            var t = e % 1e3;
            var n = (e - t) % 6e4;
            var r = (e - n * 1e3 - t) % 36e5;
            var i = (e - r * 6e4 - n * 1e3 - t) % (24 * 36e5);
            var o = (e - i * 36e5 - r * 6e4 - n * 1e3 - t) % (24 * 36e5);
            var u = "";
            if (e < 1e3) u = 1 + s.SECOND;
            else if (e < 6e4) u = parseInt(e / 1e3) + s.SECOND;
            else if (e < 36e5) u = parseInt(e / 6e4) + s.MINUTE;
            else if (e < 24 * 36e5) u = parseInt(e / 36e5) + s.HOUR;
            else if (e < 365 * 24 * 36e5) u = parseInt(e / (24 * 36e5)) + s.DAY;
            else u = parseInt(e / (365 * 24 * 36e5)) + s.YEAR;
            return u
        },
        plus: function(e, t) {
            return new Date(e.getTime() + t * n)
        },
        getMinute: function(e) {
            var t = e.split(":");
            var n = parseInt(t[0], 10);
            var r = parseInt(t[1], 10);
            return n * 60 + r
        },
        today: function() {
            if (o) return o;
            var e = window.SERVER_TIME || new Date;
            return o = new Date(e.getFullYear(), e.getMonth(), e.getDate())
        },
        gtoday: function() {
            if (window.GSERVER_TIME > new Date) {
                GSERVER_TIME = new Date(SERVER_TIME.getFullYear(), SERVER_TIME.getMonth(), SERVER_TIME.getDate())
            }
            var e = window.GSERVER_TIME || new Date;
            return o = new Date(e.getFullYear(), e.getMonth(), e.getDate())
        },
        parse: function(e) {
            var t = e.split("-");
            return new Date(t[0], t[1] - 1, t[2])
        },
        format: function(e) {
            if (typeof e == "number") {
                e = new Date(e)
            }
            return e.getFullYear() + "-" + this.convert2digit(e.getMonth() + 1) + "-" + this.convert2digit(e.getDate())
        },
        convert2digit: function(e) {
            return e < 10 ? "0" + e : e
        },
        compareDate: function(e, t) {
            return e.getTime() - t.getTime()
        },
        getFirstDaysOfMonth: function(e) {
            return new Date(e.getFullYear(), e.getMonth(), 1)
        },
        getLastDaysOfMonth: function(e) {
            return new Date(e.getFullYear(), e.getMonth() + 1, 0)
        },
        getHolidayName: function(t) {
            return e[t]["holidayName"]
        },
        showIcon: function(t) {
            return !e[t]["nodatepickerico"]
        },
        getDateTip: function(n) {
            var s = this.parse(n);
            var o = (s.getTime() - this.gtoday().getTime()) / 1e3 / 3600 / 24;
            var a = "";
            if (o < 3) {
                a = t[o];
                if (this.isHoliday(n)) {
                    a = e[n]["holidayName"]
                }
            } else {
                this.initDataTable();
                if (u[n]) {
                    a = u[n].holidayName
                }
            }
            if (a == "") {
                a = i.week + r[s.getDay()]
            }
            return a
        },
        seconds2days: function(e) {
            var t = 60 * 1e3 * 60 * 24;
            return e / t
        },
        getDatesOffset: function(e, t) {
            var n = {};
            var r = this.compareDate(this.parse(t), this.parse(e));
            var i = this.seconds2days(r);
            var s = this.parse(e);
            for (var o = 1; o < i; o++) {
                s = QunarDate.plus(s, 1);
                var u = this.format(s);
                n[u] = s
            }
            return n
        },
        initDataTable: function() {
            if (u != null) return u;
            u = {};
            for (var t in e) {
                var n = t;
                var r = e[t];
                u[t] = r;
                var s = "";
                var o = "";
                if (r.beforeTime > 0) {
                    for (var a = 1; a <= r.beforeTime; a++) {
                        var f = {};
                        var l = new Date(this.parse(n).getTime() - a * 24 * 3600 * 1e3);
                        var c = this.format(l);
                        f.holidayName = r.holidayName + i.before + a + i.day;
                        f.dayindex = r.dayindex;
                        if (!u[c]) {
                            u[c] = f
                        } else {
                            if (r.dayindex > u[c].dayindex && u[c].beforeTime == null) {
                                u[c] = f
                            }
                        }
                    }
                }
                if (r.afterTime > 0) {
                    for (var a = 1; a <= r.afterTime; a++) {
                        var f = {};
                        var h = new Date(this.parse(n).getTime() + a * 24 * 3600 * 1e3);
                        var p = this.format(h);
                        f.holidayName = r.holidayName + i.after + a + i.day;
                        f.dayindex = r.dayindex;
                        if (!u[p]) {
                            u[p] = f
                        } else {
                            if (r.dayindex > u[p].dayindex && u[this.format(new Date(l))].afterTime == null) {
                                u[p] = f
                            }
                        }
                    }
                }
            }
        }
    }
});
var TraceAnalyzer = function(e) {
    var e = e || {};
    var t = {};
    var n = {};
    this.addParam = function(e, n) {
        t[e] = n
    };
    this.queryInfo = function(e) {
        for (var t in e) {
            var n = e[t];
            this.addParam(t, n)
        }
        return this
    };
    this.otherErr = function(e) {
        this.addParam("err", e);
        return this
    };
    this.__fe = null;
    this.addOpenInfo = function(e, t) {
        for (var n in t) {
            var r = t[n];
            this.addParam(n, r)
        }
        this.addParam("act", "open");
        this.__fe = e;
        return this
    };
    this.sendOpenInfo = function() {
        if (!t.act || !this.__fe) return;
        var e = this.__fe;
        if (e.firstTrip) {
            var n = e.firstTrip().wrappers().size() + "_" + e.secondTrip().wrappers().size()
        } else {
            var n = e.wrappers().size()
        }
        this.addParam("wr", n);
        this.report()
    };
    this.sendTsingOpenInfo = function() {
        if (!t.act || !this.__fe) return;
        var e = this.__fe;
        if (e.firstTrip) {
            var n = e.firstTrip().wrappers().size() + "_" + e.secondTrip().wrappers().size()
        } else {
            var n = e.wrappers().size()
        }
        this.addParam("wr", n);
        this.tsingReport()
    };
    this.addOpenInfo_onewayInter = function(e, t) {
        for (var n in t) {
            var r = t[n];
            this.addParam(n, r)
        }
        this.addParam("act", "open");
        this.__fe = e;
        return this
    };
    this.sendOpenInfo_onewayInter = function() {
        if (!t.act || !this.__fe) return;
        var e = this.__fe;
        if (e.flightType == "oneway") {
            var n = e.flightList.first().value.vendorList.size()
        } else {
            var r = e.flightList.keys();
            var n = e.flightList[r[0]].vendorList.size() + "_" + e.flightList[r[1]].vendorList.size()
        }
        this.addParam("wr", n);
        this.report()
    };
    this.invalidErr = function() {
        this.addParam("invalid", "true");
        return this
    };
    this.justone = function(e, t) {
        if (n[e]) return;
        n[e] = true;
        this.addParam(e, t)
    };
    this.noOnewayErr = function() {
        this.addParam("noOneway", "true");
        return this
    };
    this.noTransErr = function() {
        this.addParam("noTrans", "true");
        return this
    };
    this.noResultErr = function() {
        this.addParam("noResult", "true");
        return this
    };
    this.sameCityErr = function() {
        this.addParam("sameCity", "true");
        return this
    };
    this.report = function() {
        var e = "QSA";
        var n = [];
        for (var r in t) {
            n.push("&", r, "=", encodeURIComponent(t[r]))
        }
        trackAction(e + n.join(""));
        return this
    };
    this.tsingReport = function() {
        var e = "QSA";
        var n = [];
        for (var r in t) {
            n.push("&", r, "=", encodeURIComponent(t[r]))
        }
        TsinghuaOneWayTracker.track("action", e + n.join("") + "&_module=FL", +(new Date));
        return this
    }
};
(function() {
    TraceAnalyzer.create = function() {
        return new TraceAnalyzer
    }
})();
var PAGE_EVENT = function() {
    var e = {};
    return {
        bind: function(t, n) {
            var r = [].slice.apply(arguments);
            r.splice(0, 0, e);
            $jex.event.binding.apply($jex.event, r)
        },
        trigger: function(t, n) {
            var r = [].slice.apply(arguments);
            r.splice(0, 0, e);
            $jex.event.trigger.apply($jex.event, r)
        }
    }
}();
var InfoManager = function() {
    var e = this;
    var t = {
        uiCache: {},
        my_wrappInfo: {},
        my_wrappInfo_s: {},
        my_wrappInfo_bf: {},
        flightInfo: {},
        Recommend_wrapper: {}
    };
    this.getStore = function() {
        return t
    };
    this.addSource = function(n, r, i) {
        var s = i || {};
        var o = s.isTrigger;
        var u = s.isOverwrite || true;
        if (!t[n] && !o) {
            t[n] = r
        } else {
            for (var a in r) {
                t[n][a] = r[a];
                if (o == true) {
                    $jex.event.trigger(e, "add", n, a, r[a])
                }
            }
        }
    };
    this.addItem = function(n, r, i, s) {
        var o = s || {};
        var u = o.isTrigger;
        var a = o.isOverwrite || true;
        t[n] = t[n] || {};
        if (a) {
            t[n][r] = i
        } else {
            if (!t[n][skey]) {
                t[n][r] = i
            }
        }
        if (u == true) {
            $jex.event.trigger(e, "add", n, r, i)
        }
    };
    this.get = function(e, n) {
        var r = t[e];
        if (!r) {
            $jex.console.warn("InfoManager[没有找到对应的信息类别]", e, n, t);
            return null
        }
        if (arguments.length == 1) {
            return r
        }
        if (r[n] == null) {
            $jex.console.warn("InfoManager[没有找到对应的信息]", e, n, t)
        }
        return r[n]
    }
};
$jex.extendClass(FlashAdUI, XControl);
FlashAdUI.config = {
    systembusy: {
        info1: "<span class='textRed'>此ip操作过于频繁，请稍后再来。</span>",
        info2: "搜索结束",
        img: "http://simg1.qunarzz.com/site/images/no_loading.gif"
    },
    searching: {
        info1: "请稍等,您查询的结果正在实时搜索中...",
        info2: "想去哪儿就去哪儿",
        img: "http://simg1.qunarzz.com/site/images/loading.gif"
    },
    noResult: {
        info1: "<span class='textRed'>该航线当前无可售航班<br />请您尝试其他航线或日期</span>",
        info2: "搜索结束<br /><a hidefocus='on' href='#' id='flightReserve' style='display:none;'>预约本航线低价机票</a>",
        img: "http://simg1.qunarzz.com/site/images/no_loading.gif"
    },
    inValidQuery: {
        info1: "<span class='textRed'>抱歉，无直达航班，正试图搜索联程航班。</span>",
        info2: "想去哪儿就去哪儿",
        img: "http://simg1.qunarzz.com/site/images/loading.gif"
    },
    sameCity: {
        info1: "<span class='textRed'>噢噢~Orz 原地打转的话搜不到结果哦！<br />请立即输入目的地城市，想去哪儿就去哪儿！<br />--Qunar 员工语录!<br /><b>您输入出发城市与到达城市相同，请至少修改其中之一。</b></span>",
        info2: "",
        img: "http://simg1.qunarzz.com/site/images/no_loading.gif"
    },
    internopack: {
        info1: "<span class='textRed' style='text-align:left;'><b>没有找到您所查询的航班，可能原因如下：</b><br>1、您所查询的航线在“去哪儿”暂无往返报价，<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可以更改为查询单程报价，也期待您联系<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;010-57603866，协助我们补充航班信息。<br />2、网络暂时繁忙。</span>",
        info2: "",
        img: "http://simg1.qunarzz.com/site/images/no_loading.gif"
    }
};
FlashAdUI.prototype.show = function(e) {
    if (!e) return;
    var t = FlashAdUI.config[e];
    if (!t) return;
    this.clear();
    if (e === "internopack") {
        this.text('<div class="loading1">')
    } else {
        this.text('<div class="loading">')
    }
    this.text('<p class="msg">', t.info1, "</p>");
    this.text('<div><img src="', t.img, '" alt="loading" width="114" height="16" /></div>');
    this.text('<p class="msg2">', t.info2, "</p>");
    this.text("</div>");
    this.render()
};
var LoginControl = {
    isLogin: false,
    user: {
        name: ""
    },
    checkLogin: function() {
        $jex.cookie.reset();
        if (!$jex.cookie.get("_t") || !$jex.cookie.get("_q")) {
            LoginControl.isLogin = false
        } else {
            LoginControl.isLogin = true;
            LoginControl.user.name = $jex.cookie.get("_q").replace("U.", "")
        }
    },
    login: function(e, t, n) {
        if (!e || !t) {
            n(false, "用户名或密码为空");
            return
        }
        var r = "http://user.qunar.com/tloginx.jsp";
        QNR.crossDomainPost(r, {
            username: e,
            password: t,
            remember: 1
        }, "site/proxy.htm", {
            onsuccess: function(e) {
                if (e == 0) {
                    n(true);
                    $jex.event.trigger(LoginControl, "login")
                } else {
                    n(false, "用户名或密码错误")
                }
            }
        })
    }
};
var LockScreen = function(e, t) {
    t = t || {
        msg: "您的前一次搜索已经过去了10分钟，<br />正在为您重新搜索以提供更准确报价",
        lockNow: false
    };
    if ((new Date - CLIENT_TIME) / 1e3 / 60 > 10 || t.lockNow) {
        $jex.event.trigger(window.System.service, "pageWillReload", "timeout");
        var n = ['<div class="p_layer_cont"><div class="layer_inner" style="width: 370px"><div class="e_tit_pop">&nbsp;</div><div class="layer_cont"><div class="pageBoxText" id="pageBoxText">', t.msg, '<br /><img src="http://simg1.qunarzz.com/site/images/loading.gif" />', "</div></div></div></div>"].join("");
        $jex.lightbox.show(n);
        $jex.lightbox.overlay.style.backgroundColor = "#fff";
        setTimeout(function() {
            window.location.reload()
        }, 500)
    } else {
        e()
    }
};
window.LockScreen = LockScreen;
var SingletonUIManager = {};
$jex.exec(function() {
    var e = {};
    var t = {};
    var n = {};
    SingletonUIManager.register = function(t, r, i, s) {
        i = i || $jex.VOIDFUNC;
        s = s || $jex.VOIDFUNC;
        if (e[t] && e[t] != r) {
            n[t].call(e[t])
        }
        i.call(r);
        e[t] = r;
        n[t] = s
    };
    SingletonUIManager.close = function(t) {
        if (n[t]) {
            n[t].call(e[t])
        }
        e[t] = null
    }
});
(function(e) {
    var t = function(e) {
        if (!e) {
            return false
        }
        if (!(this instanceof t)) {
            return new t(e)
        }
        this.uri = "http://log.flight.qunar.com/l.gif";
        this.site = e.site || "flight";
        this.page = e.page || "onewayList";
        if (!e.rule) {
            return false
        }
        this.rule = e.rule;
        delete e.site;
        delete e.page;
        delete e.rule;
        this.param = e;
        this.send()
    };
    t.prototype.send = function() {
        var e = this.uri + "?";
        var t = [];
        t.push("s=" + encodeURIComponent(this.site));
        t.push("p=" + encodeURIComponent(this.page));
        t.push("r=" + encodeURIComponent(this.rule));
        for (var n in this.param) {
            t.push(n + "=" + encodeURIComponent(this.param[n]))
        }
        e += t.join("&");
        try {
            (new Image).src = e
        } catch (r) {}
    };
    var n = {
        trace: t
    };
    e.logsys = n
})(window);
var FlightEntity = function() {
    this.changed = false;
    this._isInLowest = false;
    this._valCache = {}
};
$jex.foreach(["key", "commInfoMgr", "flightInfoMgr", "lowestPrice", "highestPrice", "bfLowestPrice"], function(e) {
    FlightEntity.prototype[e] = function(t) {
        if (t == null) {
            return this._valCache[e]
        } else {
            this._valCache[e] = t
        }
    }
});
FlightEntity.prototype.safeLowestPrice = function() {
    return this.lowestPrice() ? this.lowestPrice() : ConfigManager.getConfig("default", "safePrice")
};
FlightEntity.prototype.flightInfo = function(e) {
    return this.flightInfoMgr().get("flightInfo", this.key())
};
FlightEntity.prototype.getAcf = function() {
    var e = this.extInfo();
    return Number(e.acf) || 0
};
FlightEntity.prototype.getFot = function() {
    var e = this.extInfo();
    return Number(e.fot) || 0
};
FlightEntity.prototype.extInfo = function(e) {
    var t = this.flightInfoMgr();
    var n = this.flightInfo();
    var r = t.get("extInfo", n["co"] + "-" + n["da"] + "-" + n["aa"]) || t.get("extInfo", n["co"]);
    if (!r) {
        $jex.console.trace("[ERROR]没有扩展信息" + this.key());
        return {}
    }
    return r
};
FlightEntity.prototype.arriTimeValue = function() {
    var e = this._valCache["_arriTimeValue"];
    if (typeof e == "undefined" || e == null) {
        var t = this.arriDate().replace(/-/g, "/") + " " + this.flightInfo().at;
        e = (new Date(t)).getTime();
        this._valCache["_arriTimeValue"] = e
    }
    return e
};
FlightEntity.prototype.deptTimeValue = function() {
    var e = this._valCache["_deptTimeValue"];
    if (typeof e == "undefined" || e == null) {
        var t = this.flightInfo().dd.replace(/-/g, "/") + " " + this.flightInfo().dt;
        e = (new Date(t)).getTime();
        this._valCache["_deptTimeValue"] = e
    }
    return e
};
FlightEntity.prototype.deptTimeRange = function() {
    var e = this._valCache["_deptTimeRange"];
    if (typeof e == "undefined" || e == null) {
        var t = FlightUtil.timeRange(this.deptTime());
        var e = [];
        $jex.array.each(t, function(t) {
            e.push(ConfigManager.getConfig("config", "timerange", t.toString()))
        });
        this._valCache["_deptTimeRange"] = e
    }
    return e
};
FlightEntity.prototype.arriTimeRange = function() {
    var e = this._valCache["_arriTimeRange"];
    if (typeof e == "undefined" || e == null) {
        var t = FlightUtil.timeRange(this.arriTime());
        var e = [];
        $jex.array.each(t, function(t) {
            e.push(ConfigManager.getConfig("config", "timerange", t.toString()))
        });
        this._valCache["_arriTimeRange"] = e
    }
    return e
};
FlightEntity.prototype.deptTimeRangeValue = function() {
    var e = this._valCache["_deptTimeRangeValue"];
    if (typeof e == "undefined" || e == null) {
        e = [];
        $jex.array.each(this.deptTimeRange(), function(t) {
            e.push(t.value)
        });
        this._valCache["_deptTimeRangeValue"] = e
    }
    return e
};
FlightEntity.prototype._arriTimeRangeValue = function() {
    var e = this._valCache["_arriTimeRangeValue"];
    if (typeof e == "undefined" || e == null) {
        e = [];
        $jex.array.each(this.arriTimeRange(), function(t) {
            e.push(t.value)
        });
        this._valCache["_arriTimeRangeValue"] = e
    }
    return e
};
FlightEntity.prototype.plane = function() {
    var e = this._valCache["_plane"];
    if (typeof e == "undefined" || e == null) {
        e = this.commInfoMgr().get("plane", this.flightInfo().pt) || ConfigManager.getConfig("default", "plane");
        this._valCache["_plane"] = e
    }
    return e
};
FlightEntity.prototype.planeType = function() {
    var e = this._valCache["_planeType"];
    if (typeof e == "undefined" || e == null) {
        e = this.plane().type;
        this._valCache["_planeType"] = e
    }
    return e
};
FlightEntity.prototype.operationType = function() {
    if (this.flightInfo().pt && (this.flightInfo().pt == "TRN" || this.flightInfo().pt == "BUS")) {
        return "空地联运"
    } else {
        return this.plane().full
    }
};
FlightEntity.prototype.airportCodes = function() {
    var e = this._valCache["_airportCodes"];
    if (typeof e == "undefined" || e == null) {
        e = [this.flightInfo().da, this.flightInfo().aa];
        this._valCache["_airportCodes"] = e
    }
    return e
};
FlightEntity.prototype.deptCity = function() {
    var e = this._valCache["_deptCity"];
    if (typeof e == "undefined" || e == null) {
        e = this.commInfoMgr().get("city", this.deptCityCode()) || ConfigManager.getConfig("default", "city");
        this._valCache["_deptCity"] = e
    }
    return e
};
FlightEntity.prototype.arriCity = function() {
    var e = this._valCache["_arriCity"];
    if (typeof e == "undefined" || e == null) {
        e = this.commInfoMgr().get("city", this.arriCityCode()) || ConfigManager.getConfig("default", "city");
        this._valCache["_arriCity"] = e
    }
    return e
};
FlightEntity.prototype.carrier = function() {
    var e = this._valCache["_carrier"];
    if (typeof e == "undefined" || e == null) {
        e = this.commInfoMgr().get("carrier", this.carrierCode()) || ConfigManager.getConfig("default", "carrier");
        this._valCache["_carrier"] = e
    }
    return e
};
FlightEntity.prototype.carrierCode = function() {
    return this.flightInfo().ca
};
FlightEntity.prototype.isCheapFlight = function() {
    var e = this.carrierCode();
    if (e == "9C" || e == "AQ" || e == "PN") {
        return true
    }
    return false
};
FlightEntity.prototype.CheapFlightMessage = function() {
    var e = this.carrierCode();
    var t = "";
    switch (e) {
        case "9C":
            t = "除商务经济座外，其他机票不提供免费餐饮，免<br/>费行李额度低，详情请咨询春秋航空：95524";
            break;
        case "AQ":
            t = "除6.8折以上票价外，其他机票不提供免费餐饮，免费<br/>行李额度低，详情请咨询九元航空：400-105-1999";
            break;
        case "PN":
            t = "西部航空不提供免费餐饮，免费行李额度低，部分票价<br/>无免费托运行李额，详情咨询西部航空950716";
            break;
        default:
            t = ""
    }
    return t
};
FlightEntity.prototype.fixKMGAirport = function(e) {
    var t = (new Date(this.flightInfo().dd.replace(/-/g, "/"))).getTime();
    var n = (new Date("2013/5/30")).getTime();
    if (t >= n && (e.code === "HFE" || e.key === "HFE")) {
        e = {
            ab: "新桥机场",
            code: "HFE",
            key: "HFE",
            full: "合肥新桥国际机场"
        }
    }
    return e
};
FlightEntity.prototype.deptAirport = function() {
    var e = this._valCache["_deptAirport"];
    if (typeof e == "undefined" || e == null) {
        e = this.commInfoMgr().get("airport", this.flightInfo().da) || ConfigManager.getConfig("default", "airport");
        this._valCache["_deptAirport"] = e
    }
    e = this.fixKMGAirport(e);
    return e
};
FlightEntity.prototype.arriAirport = function() {
    var e = this._valCache["_arriAirport"];
    if (typeof e == "undefined" || e == null) {
        e = this.commInfoMgr().get("airport", this.flightInfo().aa) || ConfigManager.getConfig("default", "airport");
        this._valCache["_arriAirport"] = e
    }
    e = this.fixKMGAirport(e);
    return e
};
FlightEntity.prototype.flightKeyCode = function() {
    return this.code() + "|" + this.deptDate()
};
FlightEntity.prototype.flightHistory = function() {
    return this.flightInfo().hp || this.flightInfo().hisp || []
};
FlightEntity.prototype.code = function() {
    return this.flightInfo().co || ""
};
FlightEntity.prototype.stopover = function() {
    return this.extInfo() && this.extInfo().sp != "0" ? this.extInfo().sp : 0
};
FlightEntity.prototype.spCity = function() {
    return this.extInfo() && this.extInfo().sp == "1" ? this.extInfo().spCity : null
};
FlightEntity.prototype.spAirPort = function() {
    return this.extInfo() && this.extInfo().sp == "1" ? this.extInfo().spAirPort : null
};
FlightEntity.prototype.spInfo = function() {
    var e = 8;
    var t = this.spCity() + " " + this.spAirPort();
    var n = t.length;
    var r = n > e ? t.substring(0, e) : t;
    var i = n > e ? ' title = "' + this.spAirPort() + '" ' : "";
    return {
        sTitle: r,
        setTitle: i
    }
};
FlightEntity.prototype.findCity = function(e) {
    var t = System.service.longwell();
    if (t.departureAirport.codeList.indexOf(e) >= 0) {
        return t.departureAirport.en
    }
    if (t.arrivalAirport.codeList.indexOf(e) >= 0) {
        return t.arrivalAirport.en
    }
};
FlightEntity.prototype.deptCityCode = function() {
    var e = this.flightInfo().dc;
    if (!e) {
        e = this.findCity(this.deptAirportCode())
    }
    return e
};
FlightEntity.prototype.arriCityCode = function() {
    var e = this.flightInfo().ac;
    if (!e) {
        e = this.findCity(this.arriAirportCode())
    }
    return e
};
FlightEntity.prototype.deptDate = function() {
    return this.flightInfo().dd
};
FlightEntity.prototype.deptTime = function() {
    return this.flightInfo().dt
};
FlightEntity.prototype.arriTime = function() {
    return this.flightInfo().at
};
FlightEntity.prototype.deptAirportCode = function() {
    return this.flightInfo().da
};
FlightEntity.prototype.arriAirportCode = function() {
    return this.flightInfo().aa
};
FlightEntity.prototype.dptTower = function() {
    var e = this.flightInfo();
    return e && e.dpttower || ""
};
FlightEntity.prototype.arrTower = function() {
    var e = this.flightInfo();
    return e && e.arrtower || ""
};
FlightEntity.prototype.terminal = function() {
    var e = this.flightInfo();
    return e && e.t || ""
};
FlightEntity.prototype.codeShare = function() {
    var e = this.extInfo();
    return e && e.cs || ""
};
FlightEntity.prototype.transferCity = function() {
    return []
};
FlightEntity.prototype.stops = function() {
    return this.extInfo().sp | 0
};
FlightEntity.prototype.crossDays = function() {
    var e = this.flightInfo();
    return e.cd || 0
};
FlightEntity.prototype.dur = function() {
    var e = this._valCache["_dur"];
    if (typeof e == "undefined" || e == null) {
        e = this.extInfo().fdt;
        if (!e) {
            e = FlightUtil.duration((this.arriTimeValue() - this.deptTimeValue()) / (1e3 * 60))
        }
        this._valCache["_dur"] = e
    }
    return e
};
FlightEntity.prototype.distanceDays = function() {
    var e = this._valCache["_distanceDays"];
    if (typeof e == "undefined" || e == null) {
        if (this.isNextDate()) {
            e = 1
        } else {
            e = 0
        }
        this._valCache["_distanceDays"] = e
    }
    return e
};
FlightEntity.prototype.hasWrapper = function(e) {
    return null
};
FlightEntity.prototype.onTimeRate = function() {
    var e = this.flightInfoMgr().get("corrInfo", this.code());
    return e ? e.correctness : ""
};
FlightEntity.prototype.delayTime = function() {
    var e = this.flightInfoMgr().get("corrInfo", this.code());
    return e ? e.delay : ""
};
FlightEntity.prototype.quasipointRateHTML = function() {
    var e = this.flightInfoMgr().get("corrInfo", this.code());
    var t = "";
    if (e) {
        var n = parseInt(e.correctness.replace("%", ""), 10);
        if (n > 95) {
            t = '<p class="a-pty-rate">约100%</p>'
        } else {
            if (n < 30) {
                t = '<p class="a-pty-rate">低于30%</p>'
            }
            if (n < 60) {
                t = '<p class="a-pty-rate">低于60%</p>'
            } else {
                t = '<p class="a-pty-mint">' + e.correctness + "</p>"
            }
            if (parseInt(e.delay, 10) <= 5) {
                t += '<p class="a-pty-mint">小于5分钟</p>'
            } else if (parseInt(e.delay) <= 120) {
                t += '<p class="a-pty-mint">' + e.delay + "分钟</p>"
            } else {
                t += '<p class="a-pty-mint">2小时以上</p>'
            }
        }
    } else {
        t = '<p class="a-pty-rate">--</p>'
    }
    return t
};
FlightEntity.prototype.getWrapperList = function() {
    return this.flightInfoMgr().get(this.getPriceDataKey(), this.key())
};
FlightEntity.prototype._ajaxLoadList = function(e, t) {
    var n = this.getWrapperListType(),
        r = this;
    var i = this.ajaxStat[n];
    var s = this.commInfoMgr().getDataLoad();
    var o = e.isUserClick;
    var u = true;
    if (i == 3 || !o && !t || i == 1) {
        u = false
    } else {
        this.ajaxStat[n] = 1;
        t && e.loading()
    }
    if (u) {
        this.syncPriceData(e.isMainFlight, function() {
            r.ajaxStat[n] = s ? 3 : 2;
            var t = r.getWrapperListType();
            if (t !== n) return;
            e.loadBack()
        })
    }
};
FlightEntity.prototype.getCurWrapperList = function(e) {
    if (!this.ajaxStat) this.ajaxStat = {};
    var t = this.getWrapperList();
    if (t) {
        e.callBack()
    }
    this._ajaxLoadList(e, !t)
};
FlightEntity.prototype.getWrapperListType = function() {
    return this._wlistType || "all"
};
FlightEntity.prototype.setWrapperListType = function(e) {
    this._wlistType = e;
    var t = this.codeShareFlight && this.codeShareFlight();
    if (t) t.setWrapperListType(e)
};
FlightEntity.prototype.getPriceDataKey = function() {
    var e = this.getWrapperListType();
    return e == "all" ? "my_wrappInfo" : "my_wrappInfo_" + e
};
FlightEntity.prototype.getLowpr = function(e) {
    var t = "lowpr";
    if (e && e != "all") {
        t = e + t
    }
    return this._getPriceInfoValue(t)
};
FlightEntity.prototype.getHipr = function(e) {
    var t = "hipr";
    if (e && e != "all") {
        t = e + t
    }
    return this._getPriceInfoValue(t)
};
FlightEntity.prototype.getWrlen = function(e) {
    var t = "wrlen";
    if (e && e != "all") {
        t = e + t
    }
    return this.priceInfo()[t] || 0
};
FlightEntity.prototype._getPriceInfoValue = function(e) {
    var t = this.priceInfo()[e];
    if (!t || t == 1e5) t = 0;
    return t
};
FlightEntity.prototype.arriDate = function() {
    var e = this.deptDate();
    if (this.isNextDate()) {
        e = QunarDate.parse(e);
        e.setDate(e.getDate() + 1);
        e = QunarDate.format(e)
    }
    return e
};
FlightEntity.prototype.isNextDate = function() {
    return this.arriTime().replace(":", "") * 1 - this.deptTime().replace(":", "") * 1 < 0
};
FlightEntity.prototype.isInLowest = function(e) {
    if (arguments.length == 0) {
        return this._isInLowest
    } else {
        this._isInLowest = e
    }
};
FlightEntity.prototype.getCabinType = function() {
    var e = this.cabinType;
    if (e) {
        return e
    }
    var t = [],
        n, r, i;
    if (this.type == "transfer") {
        t.push("j")
    } else {
        n = this.priceInfo();
        if (!n) {
            return t
        }
        r = this._getPriceInfoValue("bflowpr"), i = n.lpt;
        if (r || i == 1 || i == 2) {
            t.push("bf")
        }
        if (i == null || i == 0) {
            t.push("j")
        }
    }
    this.cabinType = t;
    return t
};
var FlightEntityManager = function() {
    FlightEntityManager.superclass.constructor.call(this)
};
$jex.extendClass(FlightEntityManager, $jex.List);
FlightEntityManager.prototype.getAll = function() {
    return this._map ? this._map : null
};
$jex.foreach(["key", "dataSource", "commInfoMgr", "flightInfoMgr"], function(e) {
    WrapperEntity.prototype[e] = function(t) {
        if (t == null) {
            return this._valCache[e]
        } else {
            this._valCache[e] = t
        }
    }
});
WrapperEntity.prototype.ownerFlight = function(e) {
    if (e == null) {
        return this._valCache["ownerFlight"]
    } else {
        this._valCache["ownerFlight"] = e;
        this.commInfoMgr(e.commInfoMgr());
        this.flightInfoMgr(e.flightInfoMgr())
    }
};
WrapperEntity.prototype.packagePrice = function() {
    return 0
};
WrapperEntity.prototype.bpackagePrice = function() {
    return 0
};
WrapperEntity.prototype.vendor = function() {
    var e = this._valCache["vendor"];
    if (typeof e == "undefined" || e == null) {
        $jex.console.info("[WrapperEntity.vendor] wrapperId:", this.wrapperId(), ",ownerFlight:", this.ownerFlight());
        e = new VendorEntity;
        e.ownerWrapper(this);
        var t = this.commInfoMgr();
        var n;
        if (t) {
            n = this.commInfoMgr().get("vendor", this.wrapperId())
        }
        if (!t || !t) {
            $jex.console.error(this.wrapperId() + "没有vendors扩展信息")
        } else {
            e.dataSource(n)
        }
    }
    this._valCache["vendor"] = e;
    return e
};
WrapperEntity.prototype.groupId = function() {
    var e = this.dataSource().groupId;
    return typeof e !== "undefined" ? e : ""
};
WrapperEntity.prototype.sourceType = function() {
    var e = this.dataSource().sourceType;
    return typeof e !== "undefined" ? e : ""
};
WrapperEntity.prototype.wrapperId = function() {
    return this.dataSource().wr || this.dataSource().wrid || ""
};
WrapperEntity.prototype.isTTS = function() {
    return this.wrapperId().indexOf("tts") == 0 || this.wrapperId().indexOf("wstts") == 0
};
WrapperEntity.prototype.advalue = function() {
    return parseInt(this.dataSource().advalue || this.vendor().seq(), 10)
};
WrapperEntity.prototype.isNoAuth = function() {
    return this.dataSource().isNoAuth == true
};
WrapperEntity.prototype.vendorName = function() {
    if (this.isNoAuth()) {
        return "去哪儿网度假"
    } else {
        return this.vendor().name()
    }
};
WrapperEntity.prototype.isADVendor = function() {
    return this.vendor().seq() > 100 && this.vendor().adwords()
};
WrapperEntity.prototype.comments = function() {
    return []
};
WrapperEntity.prototype.price = function() {
    return this.dataSource().pr
};
WrapperEntity.prototype.isHightLightPrice = function() {
    var e = this.dataSource();
    return e.color
};
WrapperEntity.prototype.cabin = function() {
    return this.dataSource().cabin || ""
};
WrapperEntity.prototype.typeOfCabin = function() {
    return this.dataSource().tc || ""
};
WrapperEntity.prototype.specialCabinInfo = function() {
    var e = "i_cabin_";
    switch (this.typeOfCabin()) {
        case "高端经济":
            e += "gdjjc";
            break;
        case "超级经济":
            e += "cjjjc";
            break;
        case "豪华头等":
            e += "hhtdc";
            break;
        case "尊享经济":
            e += "zxjjc";
            break;
        case "折扣头等":
            e += "zktdc";
            break;
        case "超值头等":
            e += "cztdc";
            break;
        case "超值经济":
            e += "czjjc";
            break;
        case "明珠经济":
            e += "mzjjc";
            break;
        default:
            e = ""
    }
    if (e == "") return false;
    return {
        iconame: e,
        tipmsg: this.dataSource().illustration || "",
        icotext: this.typeOfCabin()
    }
};
WrapperEntity.prototype.isFcCabinProduct = function() {
    return this.dataSource().type == "fcc"
};
WrapperEntity.prototype.isBcCabinProduct = function() {
    return this.dataSource().type == "bcc"
};
WrapperEntity.prototype.isFpCabinProduct = function() {
    return this.dataSource().type == "fpc"
};
WrapperEntity.prototype.isPeCabinProduct = function() {
    return this.dataSource().type == "pec"
};
WrapperEntity.prototype.getCabinProductTipmsg = function() {
    return this.dataSource().illustration || ""
};
WrapperEntity.prototype.isFCabin = function() {
    return this.typeOfCabin().indexOf("头等") > -1
};
WrapperEntity.prototype.isBCabin = function() {
    return this.typeOfCabin().indexOf("公务") > -1 || this.typeOfCabin().indexOf("商务") > -1
};
WrapperEntity.prototype.isTCabin = function() {
    return /^t/i.test(this.dataSource().type)
};
WrapperEntity.prototype.isYoufeiPg = function() {
    return this.dataSource().pgType === 1
};
WrapperEntity.prototype.isNewYoufei = function() {
    return this.dataSource().yfType === 3
};
WrapperEntity.prototype.isYoufei = function() {
    return this.dataSource().yfType && this.dataSource().yfType != 0
};
WrapperEntity.prototype.isShowAfee = function() {
    var e = this.ownerFlight();
    if (e && e.priceInfo && e.priceInfo() && e.priceInfo().hideAfee == true) {
        return false
    }
    return true
};
WrapperEntity.prototype.isYoufeiDai = function() {
    return this.dataSource().type === "lcf" && this.ufdPrice()
};
WrapperEntity.prototype.ufdPrice = function() {
    return this.dataSource().ufd || 0
};
WrapperEntity.prototype.getCarrierCo = function() {
    var e = this.ownerFlight();
    return e ? e.carrier().key.toLowerCase() : ""
};
WrapperEntity.prototype.isCsyf = function() {
    return this.dataSource().yfType == 1
};
WrapperEntity.prototype.isUfee = function() {
    var e = /&ufee=([a-z_-]+)/i;
    var t = this.dataSource().bu;
    var n = t.match(e);
    if (n && n.length == 2 && n[1] && n[1].toLocaleLowerCase() == "true") {
        return true
    } else {
        return false
    }
};
WrapperEntity.prototype.isLCabin = function() {
    return /^l/i.test(this.dataSource().type)
};
WrapperEntity.prototype.isOta = function() {
    return this.dataSource().type == "s" || this.dataSource().type == "sc"
};
WrapperEntity.prototype.isNewOta = function() {
    return this.dataSource().type == "btf" || this.dataSource().type == "bpf"
};
WrapperEntity.prototype.isPgOta = function() {
    return this.dataSource().type == "btf" && this.hasPickCar() && this.giftType() == 1
};
WrapperEntity.prototype.isNewPrivilege = function() {
    return this.dataSource().type == "lpf" || this.dataSource().type == "tn" || this.dataSource().type == "uff" || this.dataSource().type == "nc" || this.dataSource().type == "tnlpf" || this.dataSource().type == "tnuff" || this.dataSource().type == "nclpf"
};
WrapperEntity.prototype.isPgPrivilege = function() {
    return this.dataSource().type == "nc" || this.dataSource().type == "nclpf"
};
WrapperEntity.prototype.isPriceKing = function() {
    return this.dataSource().type && this.dataSource().type.toLowerCase() == "cpf"
};
WrapperEntity.prototype.tgqpr = function() {
    return this.dataSource().tgqpr || false
};
WrapperEntity.prototype.isFreeMan = function() {
    return this.vendor().dataSource().isFreeWrapper == "1"
};
WrapperEntity.prototype.freeTip = function() {
    return this.vendor().dataSource().freeTip || ""
};
WrapperEntity.prototype.freeInfo = function() {
    return this.vendor().dataSource().freeInfo || ""
};
WrapperEntity.prototype.isApplyPrice = function() {
    if (typeof this.dataSource().type != "undefined") {
        return this.dataSource().type == "a"
    }
    return false
};
WrapperEntity.prototype.isAllDays = function() {
    if (this.dataSource().type && this.dataSource().type.toLowerCase() == "cpf" || this.dataSource().type == "lpf" || this.dataSource().type == "uff" || this.dataSource().type == "tnuff" || this.isFcCabinProduct() || this.isBcCabinProduct() || this.isFpCabinProduct() || this.isPeCabinProduct() || this.isOta() || this.isNewOta()) {
        return true
    }
    return false
};
WrapperEntity.prototype.isFakeNormalPrice = function() {
    return false
};
WrapperEntity.prototype.afee = function() {
    return this.dataSource().afee
};
WrapperEntity.prototype.insuranceType = function() {
    return this.dataSource().insuranceType
};
WrapperEntity.prototype.isFreePostage = function() {
    return this.dataSource().isFreePostage === 1
};
WrapperEntity.prototype.afeeInsSum = function() {
    var e = this.commInfoMgr().get("insurancesum");
    var t = this.insuranceType();
    if (t == "i5") {
        return e[t]
    }
    return 0
};
WrapperEntity.prototype.showInsTip = function(e) {
    if (e == null) {
        return this.hasShownInsTip
    } else {
        this.hasShownInsTip = e
    }
};
WrapperEntity.prototype.parValue = function() {
    return this.dataSource().vppr
};
WrapperEntity.prototype.vType = function() {
    return this.dataSource().vt
};
WrapperEntity.prototype.vAmount = function() {
    return parseInt(this.dataSource().va, 10)
};
WrapperEntity.prototype.vPrice = function() {
    return this.dataSource().vup
};
WrapperEntity.prototype.cPrice = function() {
    return this.dataSource().vcp
};
WrapperEntity.prototype.vTitle = function() {
    var e = parseInt(this.vType(), 10);
    switch (e) {
        case 1:
        case 2:
            return "机+车服务";
        case 4:
            return "机+车服务";
        case 6:
            return "机+车券";
        default:
            return ""
    }
};
WrapperEntity.prototype.vDes = function() {
    var e = parseInt(this.vType(), 10);
    switch (e) {
        case 1:
        case 2:
            return "代金券仅供易到新注册用户使用，节假日亦可使用，每次最多使用一张，代金券不可兑换现金。";
        case 4:
            return "每张接送机服务券对应一次机场送机或接机服务（限服务城市），自购买机票之日起6个月内可用，需提前24小时预约，不可单独退款。";
        case 6:
            return "每张代金券可在接机或送机服务中抵消部分金额（限指定服务商及城市使用），自购买机票之日起6个月内可用。";
        default:
            return ""
    }
};
WrapperEntity.prototype.vClass = function() {
    var e = parseInt(this.vType(), 10);
    switch (e) {
        case 1:
        case 2:
            return "ico_quan";
        case 4:
            return "ico_scar";
        case 5:
            return "ico_scar";
        case 6:
            return "ico_quan";
        case 7:
            return "ico_scar";
        case 8:
            return "ico_scar";
        case 9:
            return "ico_scar";
        default:
            return ""
    }
};
WrapperEntity.prototype.carType = function() {
    if (this.dataSource().vn) {
        return this.dataSource().vn
    }
    var e = parseInt(this.vType(), 10);
    switch (e) {
        case 5:
            return "接机服务券";
        case 6:
            return "接送机代金券";
        case 7:
            return "接机代金券";
        case 8:
            return "送机代金券";
        case 9:
            return "接送机代金券";
        case 10:
            return "豪华接送机代金券";
        case 11:
            return "接送机代金券包";
        case 12:
            return "接送机代金券包";
        case 13:
            return "接送机代金券包";
        case 14:
            return "接送机代金券";
        default:
            return ""
    }
};
WrapperEntity.prototype.carInfo = function() {
    var e = parseInt(this.vType(), 10);
    var t;
    switch (e) {
        case 5:
            t = "<p>1. 聚划算：机票+接机;</p>" + "<p>2. 舒适型：凯美瑞、奥迪A6L等同级车型，可乘4人；</p>" + "<p>3. 一口价：包含到达城市一次接机所有费用，如停车费、过路费等；</p>" + "<p>4. 服务好：专业培训，服务贴心。</p>";
            return t;
        case 7:
            t = "<p>1.凭代金券专享15或20公里内免费接机（超出公里部分可能会收取少量费用）</p>" + "<p>2.限到达城市，去哪儿专车供应商，舒适型(奥迪A6L等同级车型)及商务型(别克GL8等同级车型)使用</p>" + "<p>3.自购买机票之日起6个月内可用</p>";
            return t;
        case 8:
            t = "<p>1.每张代金券可在出发城市的送机服务中抵用部分金额</p>" + "<p>2.限出发城市，去哪儿专车供应商，舒适型(奥迪A6L等同级车型)、商务型(别克GL8等同级车型)使用</p>" + "<p>3.自购买机票之日起6个月内可用 </p>";
            return t;
        case 9:
            t = '<p>1. 套餐包含价值<i class="rmb">&yen;</i>' + (this.vPrice() || "") + "接送机代金券" + (this.vAmount() || "") + "张，可直接登录Qunar客户端-车车-接送用车使用</p>" + "<p>2. 凭代金券专享15或20公里内免费接机或送机服务(哈尔滨、杭州、重庆需额外支付少量费用)，限去哪儿专车供应商，舒适型、商务型使用，每次服务仅限使用1张代金券</p>" + "<p>3. 以下20城市通用：北京、上海、广州、深圳、哈尔滨、大连、青岛、郑州、天津、杭州、南京、厦门、海口、三亚、长沙、武汉、成都、重庆、西安、昆明</p>" + "<p>4. 自购买机票之日起180天内可用，详细使用规则请登录Qunar客户端-车车查看</p>";
            return t;
        default:
            return ""
    }
};
WrapperEntity.prototype.vPrd = function() {
    var e = parseInt(this.vType(), 10);
    switch (e) {
        case 1:
        case 2:
            return "租车券";
        case 4:
            return "接送机服务";
        case 5:
            return "接机";
        case 6:
            return "接送机代金券";
        case 7:
            return "代金券";
        case 8:
            return "代金券";
        case 9:
            return "代金券";
        default:
            return ""
    }
};
WrapperEntity.prototype.voucherName = function() {
    return this.dataSource().vn || false
};
WrapperEntity.prototype.vName = function() {
    var e = parseInt(this.vType(), 10);
    switch (e) {
        case 0:
            return "去哪儿团购代金券";
        case 1:
            return "易到租车代金券";
        case 2:
            return "易到租车代金券";
        case 3:
            return "去哪儿酒店代金券";
        case 4:
            return "接送机服务券";
        case 6:
            return "接送机代金券";
        default:
            return ""
    }
};
WrapperEntity.prototype.isZYXWrapper = function() {
    var e = this.vType() == "0" || this.vType() == "1" || this.vType() == "2" || this.vType() == "3" || this.vType() == "4" || this.vType() == "6";
    return e
};
WrapperEntity.prototype.hasPickCar = function() {
    var e = this.vType() !== undefined && !this.isZYXWrapper();
    return e
};
WrapperEntity.prototype.giftInfo = function() {
    var e = parseInt(this.giftType(), 10);
    var t = parseInt(this.vType(), 10);
    var n = "";
    switch (e) {
        case 0:
            return "";
        case 1:
        case 2:
            n = '<p class="tl">买保险赠超值礼包</p>' + '<p style="padding:3px 0 3px 3px">礼包含<span style="color:#FF7301"><i class="rmb"> &yen;</i>' + this.vPrice() + "</span>" + this.carType() + "</p>" + '<p class="ft"><a target="_blank" href="http://flight.qunar.com/site/zhuanti/voucher_gift.htm?voucherType=' + t + "&voucherPrice=" + this.vPrice() + "&saleType=" + e + "&voucherName=" + encodeURIComponent(this.carType()) + '">查看详情</a></p>';
            return n;
        default:
            return ""
    }
};
WrapperEntity.prototype.giftName = function(e) {
    var t = parseInt(this.giftType(), 10);
    if (!e) {
        e = false
    }
    switch (t) {
        case 0:
            return "";
        case 2:
            return e ? "赠接送机券" : "赠&yen;" + this.vPrice() + "接送机券";
        case 1:
            return "接送机券";
        default:
            return ""
    }
};
WrapperEntity.prototype.giftType = function() {
    return this.dataSource().gvt || 0
};
WrapperEntity.prototype.hasGift = function() {
    return this.giftType() == 1 || this.giftType() == 2
};
WrapperEntity.prototype.hasHongbao = function() {
    return this.dataSource() && this.dataSource().rp || false
};
WrapperEntity.prototype.HongbaoPrice = function() {
    return this.dataSource().rp
};
WrapperEntity.prototype.discount = function() {
    return this.dataSource().dis
};
WrapperEntity.prototype.fake = function() {
    return this.dataSource().fk == true
};
WrapperEntity.prototype.hasPrGift = function() {
    return this.dataSource().prgift
};
WrapperEntity.prototype.prGiftNum = function() {
    if (this.dataSource().prgift == 2) {
        return 2
    } else {
        return 1
    }
};
WrapperEntity.prototype.ffdPrice = function() {
    return this.dataSource().ffd || 0
};
WrapperEntity.prototype.getTag = function() {
    return this.dataSource().type || ""
};
WrapperEntity.prototype.bpr = function() {
    if (typeof this.dataSource().bpr != "undefined") {
        return this.dataSource().bpr
    } else {
        return false
    }
};
WrapperEntity.prototype.pid = function() {
    return this.dataSource().pid
};
WrapperEntity.prototype.hasAgeLimit = function() {
    return this.dataSource().type === "q"
};
WrapperEntity.prototype.getTGQInfo = function() {
    var e = this.dataSource();
    if (!e.hasOwnProperty("tgq")) {
        return false
    }
    var t = e.tgq;
    if (t === "" || e.type === "a") {
        return "退改签规定以订单标注规定为准，<br />请联系售票代理商或航空公司咨询。"
    }
    var n = t.split("|"),
        r = [];
    for (var i = 0, s = n.length; i < s; i++) {
        var o = n[i];
        r.push(o.replace(/(.+[:：])/, "<em>$1</em>"))
    }
    return r.join("<br />") + '<p class="tips"><i>*</i>仅供参考,以订单标注的退改签规定为准。</p>'
};
WrapperEntity.prototype.isTao = function() {
    return true
};
WrapperEntity.prototype.isQb = function() {
    return this.dataSource().isQb || false
};
WrapperEntity.prototype.bxfee = function() {
    return this.dataSource().bxfee || 0
};
WrapperEntity.prototype.updateTime = function() {
    return this.dataSource().ut
};
WrapperEntity.prototype.rankgrade = function() {};
WrapperEntity.prototype.ranktitle = function() {
    return ""
};
WrapperEntity.prototype.booking = function(e, t) {
    var n = this;
    LockScreen(function() {
        n._booking(e, t);
        n.adsTrack()
    })
};
WrapperEntity.prototype.adsTrack = function() {
    var e = $jex.parseQueryParam();
    window.criteo_q = window.criteo_q || [];
    window.criteo_q.push({
        event: "setAccount",
        account: 17463
    }, {
        event: "setSiteType",
        type: "d"
    }, {
        event: "viewSearch",
        checkin_date: e.searchDepartureTime || e.fromDate || "",
        checkout_date: e.searchArrivalTime || e.toDate || ""
    }, {
        event: "trackTransaction",
        id: Math.random().toString().substr(2),
        item: [{
            id: e.fromCode + "/" + e.toCode,
            price: 0,
            quantity: 1
        }]
    })
};
WrapperEntity.prototype.rank = function() {
    return this.dataSource().rank || 0
};
WrapperEntity.prototype.rankline = function() {
    return this.dataSource().rankline || 0
};
WrapperEntity.prototype._booking = function(e, t) {
    var n = this._booking_url(e, t);
    this._booking_track()
};
WrapperEntity.prototype._booking_url = function(e, t) {
    var n = this.ownerFlight();
    var r = {
        full: "false",
        fk: this.dataSource().fk ? 1 : 0,
        updatetime: this.dataSource().ut || "",
        inter: "false",
        departureTime: n ? n.deptTime() : "",
        arrivalTime: n ? n.arriTime() : "",
        ccn: this.getVpr()
    };
    switch (n && n.type) {
        case "roundtrip":
            r["isRt"] = 1;
            r["returnDepartureTime"] = this.ownerFlight().secondTrip().deptTime();
            r["returnArrivalTime"] = this.ownerFlight().secondTrip().arriTime();
            break;
        case "onewayInRoundTrip":
            r["isRt"] = 1;
            break
    }
    if (this.isRoundFlight()) {
        r["isRt"] = 1;
        r["returnDepartureTime"] = this.dataSource().flightInfo.secondtrip.dt;
        r["returnArrivalTime"] = this.dataSource().flightInfo.secondtrip.at
    }
    var i = window.location.param().from;
    if (i) {
        r["from"] = i
    }
    this._addEx_track(r);
    if (e) {
        r["stat"] = e.value()
    }
    if (n && n.type == "onewayInTransfer") {
        r["iftrans"] = 1
    }
    if (t) {
        $jex.merge(r, t)
    }
    if (t && t["prt"] === 0) {
        r["prt"] = 0
    }
    var s = this._transBu(r["prt"]);
    return "/booksystem/booking.jsp?" + s + "&" + $jex.toQueryString(r)
};
WrapperEntity.prototype._addEx_track = function(e) {
    var t = window.location.param().ex_track;
    if (!e) {
        return
    }
    e.ex_track = t || ""
};
WrapperEntity.prototype._transBu = function(e) {
    var t = this.dataSource().bu;
    var n = this.dataSource().bbu;
    n = n ? n : t;
    t = t ? t : n;
    var r = e === 0 ? n : t;
    return r
};
WrapperEntity.prototype._booking_track = function() {
    var e = window.location.param();
    var t = this.ownerFlight();
    var n = ["FL", "BU", this.wrapperId(), encodeURIComponent(e.searchDepartureAirport) + "-" + encodeURIComponent(e.searchArrivalAirport), e.searchDepartureTime, encodeURIComponent(t.deptCity().zh) + "-" + encodeURIComponent(t.arriCity().zh), t.deptDate()];
    switch (t.type) {
        case "oneway":
            n.push("DA");
            n.push("OW");
            break;
        case "compose":
            n.push("PA");
            n.push("OW");
            break;
        case "onewayInTransfer":
            n.push("DA");
            if (t.position() == 0) {
                n.push("FST")
            } else {
                n.push("SND")
            }
            break
    }
    n.push(t.code());
    trackAction(n.join("|"))
};
WrapperEntity.prototype.bigLogoUrl = function() {
    return this.dataSource().logoUrl || ""
};
WrapperEntity.prototype.sortRank = function() {
    var e = this.vendor();
    var t = e && e.dataSource().status;
    return t == 0 ? this.dataSource().sortRank || 0 : t == 1 ? 999999 : 1e6
};
WrapperEntity.prototype.isNotWork = function() {
    return this.dataSource().type == "notWork"
};
WrapperEntity.prototype.setVpr = function(e) {
    this._vpr = e
};
WrapperEntity.prototype.getVpr = function() {
    return this._vpr || 0
};
WrapperEntity.prototype.isAnonymityVendor = function() {
    return this.dataSource().type == "anon"
};
WrapperEntity.prototype.coupon = function() {
    return Number(this.dataSource().cd) || 0
};
WrapperEntity.prototype.fanxian = function() {
    return Number(this.dataSource().fx) || 0
};
WrapperEntity.prototype.lijian = function() {
    return Number(this.dataSource().rd) || 0
};
WrapperEntity.prototype.isPlus = function() {
    return this.dataSource().plus || false
};
WrapperEntity.prototype.cat = function() {
    return this.dataSource().cat || 1
};
WrapperEntity.prototype.isAuthorizedVendor = function() {
    return this.dataSource().rz === 1
};
WrapperEntity.prototype.isZzb = function() {
    return this.dataSource().zzb === 1
};
WrapperEntity.prototype.couponAdwords = function() {
    return this.dataSource().caw
};
WrapperEntity.prototype.isRoundFlight = function() {
    return false
};
WrapperEntity.prototype.isShowLijianIcon = function() {
    var e = this.ownerFlight();
    if (e && e.priceInfo && e.priceInfo() && e.priceInfo().hidelj == true) {
        return false
    }
    return true
};
WrapperEntity.prototype.isNiceTgq = function() {
    return this.dataSource().niceTgq || false
};
WrapperEntity.prototype.isExcludeAirline = function() {
    var e = ["ca", "cz"];
    var t = this.getCarrierCo();
    var n = false;
    for (var r = 0; r < e.length; r++) {
        if (t == e[r]) {
            n = true;
            break
        }
    }
    return n
};
WrapperEntity.prototype.isSZCoupon = function() {
    return this.dataSource().cat == 4 && this.vendor() && this.vendor().wrapperId() === "gndairzh001" ? true : false
};
WrapperEntity.prototype.isFlyfundCanUse = function() {
    return this.dataSource().useffd === true || this.dataSource().useffd === "true"
};
WrapperEntity.prototype.getFlyfundRefundNum = function() {
    if (this.dataSource().sendffd) {
        var e = this.dataSource().ffd;
        e = e ? e : 0;
        e = parseInt(e, 10);
        e = isNaN(e) ? 0 : e;
        e = e > 0 ? e : 0;
        return e
    }
    return 0
};
WrapperEntity.prototype.b2bpf = function() {
    return this.dataSource().b2bpf || ""
};
WrapperEntity.prototype.isSelf = function() {
    var e = ConfigManager.getConfig("PakageConfig");
    for (var t = 0; t < e.length; t++) {
        if (this.dataSource().type.toLowerCase() == e[t]) {
            return true
        }
    }
    return false
};
var StatProvider = function() {};
StatProvider.prototype.value = function() {};
VendorEntity.prototype.iataInfo = function() {
    var e = this.dataSource();
    var t = {
        level: 0,
        url: "",
        IATANum: ""
    };
    try {
        if (e.recommend && e.recommend.iata) {
            t.level = e.recommend.iata.level;
            t.url = e.recommend.iata.url;
            t.IATANum = e.recommend.iata.IATANum
        }
    } catch (n) {
        $jex.console.error(this.wrapperId() + " VendorEntity.prototype.iataInfo recommend信息")
    }
    return t
};
VendorEntity.prototype.checkLine = function() {
    if (this._checkLine == true) return;
    var e = this.dataSource();
    if (!e) return;
    var t = this.ownerWrapper().ownerFlight();
    if (t && t.flightInfo()) {
        var n = [t.deptCity().zh, "-", t.arriCity().zh, "|", this.wrapperId()].join("");
        var r = t.commInfoMgr().get("flightLineVendor", n)
    } else {
        var r = null
    }
    this._checkLine = true;
    if (r) {
        this.seq(r.sequenceNum);
        this.ADwords(r.adwords)
    } else {
        this.seq(e.sequenceNum);
        this.adwords(e.adwords)
    }
};
VendorEntity.prototype.wrapperId = function() {
    return this.ownerWrapper().wrapperId()
};
VendorEntity.prototype.rebateTye = function() {
    return this.dataSource() ? this.dataSource().rt : ""
};
VendorEntity.prototype.name = function() {
    if (!this.dataSource()) {
        $jex.console.error(this.wrapperId(), "出现错误!!!!!")
    }
    return this.dataSource() ? this.dataSource().name : ""
};
VendorEntity.prototype.hasDetail = function() {
    return this.dataSource().wrdetail && !$jex.$empty(this.dataSource().wrdetail)
};
VendorEntity.prototype.star = function() {
    return this.dataSource().recommend && this.dataSource().recommend.star ? this.dataSource().recommend.star : 0
};
VendorEntity.prototype.codeName = function() {
    return this.dataSource().codeName
};
VendorEntity.prototype.tss = function() {
    return this.dataSource().tss || 120
};
VendorEntity.prototype.isSuperOTA = function() {
    return this.dataSource().isSuperOTA === "true"
};
VendorEntity.prototype.isWorking = function() {
    return this.dataSource().status == 0
};
VendorEntity.prototype.getStatus = function() {
    return this.dataSource().status
};
VendorEntity.prototype.info = function() {
    return this.dataSource().info || {}
};
VendorEntity.prototype.starRank = function() {
    var e = this.dataSource().star;
    if (!e) {
        return {
            lv: {
                kd: 0,
                dw: 0,
                db: 0,
                ds: 0,
                ts: 0
            },
            count: 0
        }
    } else {
        return {
            lv: {
                kd: (Math.round(e.lv.kd * 10) / 10).toFixed(1),
                dw: (Math.round(e.lv.dw * 10) / 10).toFixed(1),
                db: (Math.round(e.lv.db * 10) / 10).toFixed(1),
                ds: (Math.round(e.lv.ds * 10) / 10).toFixed(1),
                ts: (Math.round(e.lv.ts * 10) / 10).toFixed(1)
            },
            count: e.count
        }
    }
};
VendorEntity.prototype.srv_ICON = function() {
    var e = this.dataSource();
    if (!e) return null;
    var t = e.info.icon;
    if (!t) return null;
    return {
        key: this.__getIconInfo(t).key,
        text: this.__getIconInfo(t).text,
        title: this.__getIconInfo(t).title
    }
};
VendorEntity.prototype.__getIconInfo = function(e) {
    switch (e) {
        case "cata":
            return {
                key: "ico_cata",
                text: "CATA认证",
                title: "获得《中国民用航空运输销售代理业务资格认可证书》"
            };
        case "official":
            return {
                key: "ico_official",
                text: "官网",
                title: "航空公司官网购票，权威服务，值得信赖。"
            };
        case "direct":
            return {
                key: "ico_direct",
                text: "直营",
                title: "航空公司直营旗舰店，实时出票，官方服务保障，购票放心。"
            };
        case "none":
            return {
                key: "ico_nocertify",
                text: "",
                title: ""
            }
    }
    return {
        key: "ico_nocertify",
        text: "",
        title: ""
    }
};
VendorEntity.prototype.isOffical = function() {
    var e = this.dataSource();
    if (!e) return false;
    var t = e.info.icon;
    if (!t) return false;
    if (t == "official") return true;
    return false
};
VendorEntity.prototype.isDirect = function() {
    var e = this.dataSource();
    if (!e) return false;
    var t = e.info.icon;
    if (!t) return false;
    var n = this.__getIconInfo(t).text;
    if (n == "直营") {
        return true
    } else {
        return false
    }
};
VendorEntity.prototype.__getService = function(e) {
    var t = this.dataSource();
    if (!t) {
        $jex.console.error("没有vendor数据:" + e);
        return null
    }
    var n = t.services[e];
    if (!n) return null;
    return {
        key: e,
        title: ConfigManager.getConfig("config", "servicesDesc", e),
        desc: ConfigManager.getConfig("config", "services", e)
    }
};
VendorEntity.prototype.srv_CATA = function() {
    return this.__getService("s1")
};
VendorEntity.prototype.srv_ALLDAY = function() {
    return this.__getService("s2")
};
VendorEntity.prototype.srv_QNHELP = function() {
    return this.__getService("s3")
};
VendorEntity.prototype.srv_CHECKOUT = function() {
    return this.__getService("s4")
};
VendorEntity.prototype.srv_TGQ = function() {
    return this.__getService("s5")
};
VendorEntity.prototype.srv_BAOXIAN = function() {
    return this.__getService("s6")
};
VendorEntity.prototype.srv_QUALITY = function() {
    return false
};
VendorEntity.prototype.srv_FREEMAIL = function() {
    return this.__getService("s8")
};
VendorEntity.prototype.srv_ASSISTANT = function() {
    if (this.__getService("s4")) {
        return {
            key: "s9",
            title: ConfigManager.getConfig("config", "servicesDesc", "s9"),
            desc: ConfigManager.getConfig("config", "services", "s9")
        }
    } else {
        return null
    }
};
VendorEntity.prototype.complaintRate = function() {
    if (this.dataSource().crtext) {
        var e = 99;
        var t = this.dataSource().crtext;
        if (t.indexOf("出票信息可能被遗漏通知") >= 0) {
            e = 1
        }
        if (t.indexOf("支付后才能确认金额，可能要求加价出票") >= 0) {
            e = 2
        }
        if (t.indexOf("退款会出现不能及时到账") >= 0) {
            e = 3
        }
        if (t.indexOf("客服电话难联络") >= 0) {
            e = 4
        }
        if (t.indexOf("暂无用户反馈") >= 0) {
            e = 5
        }
        return {
            rate: 0,
            url: this.dataSource().crurl,
            desc: this.dataSource().crtext,
            descType: e
        }
    }
    return null
};
VendorEntity.prototype.ppc = function() {
    if (this.dataSource().ppc) {
        return this.dataSource().ppc
    }
    return {}
};
VendorEntity.prototype.ppcphone = function() {
    if (this.ppc().pn) {
        return this.ppc().pn
    }
    return ""
};
$jex.extendClass(WrapperListEntity, $jex.List);
WrapperListEntity.prototype.createWrapperEntity = function() {
    $jex.console.error("没有重写createWrapperEntity方法")
};
WrapperListEntity.prototype.update = function() {
    $jex.console.error("没有重写update方法")
};
WrapperListEntity.prototype.sort = function() {
    $jex.console.error("没有重写sort方法");
    return this.keys()
};
WrapperListEntity.prototype._update = function(e) {
    var t = this;
    this.clear();
    $jex.foreach(e, function(e, n, r) {
        $jex.console.info("[WrapperList.update create WrapperEntity] wrdata:", e, ",ownerFlight:", t.ownerFlight());
        var i = t.createWrapperEntity();
        i.dataSource(e);
        i.ownerFlight(t.ownerFlight());
        var s = r || i.wrapperId();
        i.key(s);
        var o = t.commInfoMgr().get("vendor", i.wrapperId());
        if (!t.get(s) && o) {
            t.put(s, i)
        }
    })
};
var OnewayFlightEntity = function() {
    OnewayFlightEntity.superclass.constructor.call(this);
    this.type = "oneway";
    var e = null;
    this.totalTax = function() {
        if (typeof e == "undefined" || e == null) {
            if (this.type != "compose") {
                var t = this.extInfo();
                var n = (t ? parseInt(t.acf, 10) : 0) || ConfigManager.getConfig("default", "acf");
                var r = (t ? parseInt(t.fot, 10) : 0) || ConfigManager.getConfig("default", "fot");
                e = n + r
            } else {
                e = 200
            }
        }
        return e
    };
    var t = this;
    var n = null;
    this.wrappers = function() {
        if (typeof n == "undefined" || n == null) {
            n = new OnewayFlightWrapperListEntity;
            n.ownerFlight(this);
            n.update()
        }
        return n
    }
};
$jex.extendClass(OnewayFlightEntity, FlightEntity);
OnewayFlightEntity.prototype.isCodeShare = function() {
    return !!(this.codeShare() && this.codeShareFlight())
};
OnewayFlightEntity.prototype.isAV = function() {
    return this.lowestPrice() == null
};
OnewayFlightEntity.prototype.getPayCarrier = function() {
    var e = this.flightInfoMgr();
    return e.get("PayCarrier", this.key())
};
OnewayFlightEntity.prototype.getRecommandWrapperData = function() {
    var e = this.flightInfoMgr();
    var t = e.get("Recommend_wrapper", this.key());
    if ($jex.$empty(t)) return null;
    for (var n in t) {
        return t[n]
    }
};
OnewayFlightEntity.prototype.isAV = function() {
    return !this.lowestPrice()
};
OnewayFlightEntity.prototype.getReWrapperEntity = function() {
    if (this.isAV()) return;
    var e = this.getRecommandWrapperData(),
        t;
    if (e) {
        t = this._createWrapper(e)
    }
    return t
};
OnewayFlightEntity.prototype._createWrapper = function(e) {
    if (!e) return null;
    var t = new OnewayFlightWrapperEntity;
    t.dataSource(e);
    t.ownerFlight(this);
    return t
};
OnewayFlightEntity.prototype.getRecommandWrapper = function() {
    var e, t;
    e = this.getReWrapperEntity();
    if (e) {
        t = this.commInfoMgr().get("vendor", e.dataSource().wrid);
        if (!t) return null;
        return {
            entity: e,
            conf: t,
            isPay: e.isADVendor()
        }
    }
};
OnewayFlightEntity.prototype.hasDiscount = function() {
    var e = this.flightInfoMgr().get("priceInfo", this.key());
    if (!e || !e.op) {
        return false
    }
    return this.lowestPrice() / e.op < 1
};
OnewayFlightEntity.prototype.lowestDiscount = function() {
    var e = this.flightInfoMgr().get("priceInfo", this.key());
    if (!e || !e.op) {
        return 0
    }
    return Math.round(this.lowestPrice() / e.op * 100) / 10
};
OnewayFlightEntity.prototype.turelyLowestPrice = function() {
    return this.lowprInfo ? this.lowprInfo.tlp : Number.MAX_VALUE
};
OnewayFlightEntity.prototype.priceGroup = function() {
    return this.flightInfoMgr().get("priceGroup", this.key())
};
OnewayFlightEntity.prototype.lastPriceGroup = function() {
    return this.flightInfoMgr().get("lastPriceGroup", this.key())
};
OnewayFlightEntity.prototype.priceInfo = function() {
    return this.flightInfoMgr().get("priceInfo", this.key())
};
OnewayFlightEntity.prototype.deptCityCode = function() {
    return this.commInfoMgr().deptCityCode()
};
OnewayFlightEntity.prototype.arriCityCode = function() {
    return this.commInfoMgr().arriCityCode()
};
OnewayFlightEntity.prototype.isPriceLock = function() {
    var e = this.priceInfo();
    return e && e["priceLock"] == 1
};
OnewayFlightEntity.prototype.lowestWrapperIds = function() {
    var e = this.flightInfoMgr().get("priceGroup", this.key());
    if (e) {
        return e.lpwr || []
    } else {
        return []
    }
};
OnewayFlightEntity.prototype.lowestBprWrapperIds = function() {
    var e = this.flightInfoMgr().get("priceGroup", this.key());
    return e ? e.lbpwr || [] : []
};
OnewayFlightEntity.prototype.syncPriceData = function(e, t) {
    var n = this.commInfoMgr().analyzer();
    n.syncPriceData(this, e, t)
};
OnewayFlightEntity.prototype.syncCurrentFlightCode = function() {
    var e = this.commInfoMgr().service();
    e.syncCurrentFlightCode(this.key())
};
OnewayFlightEntity.prototype.codeShareFlight = function() {
    return this.commInfoMgr().entityManager().get(this.codeShare() + "|" + this.deptDate())
};
OnewayFlightEntity.prototype.update = function() {
    var e = this.key();
    var t = this.commInfoMgr();
    var n = this.flightInfoMgr();
    this.type = e.indexOf("/") == -1 && e.indexOf("+") == -1 ? "oneway" : "compose";
    this.flightInfo(n.get("flightInfo", e));
    this.lowprInfo = n.get("priceInfo", e);
    this.lowestPrice(this.lowprInfo ? this.lowprInfo.lowpr : null);
    this.bfLowestPrice(this.lowprInfo ? this.lowprInfo.bflowpr : null);
    $jex.event.trigger(this, "updating");
    this.changed = false
};
OnewayFlightEntity.tryCreate = function(e, t, n, r) {
    var i = e;
    var s = t;
    var o = n;
    var u = o.get("flightInfo", e);
    if (!u) {
        return null
    }
    if (!s.get("airport", u["da"])) {
        return null
    }
    if (!s.get("airport", u["aa"])) {
        return null
    }
    if (!s.get("carrier", u["ca"])) {
        return null
    }
    if (!s.get("plane", u["pt"])) {
        return null
    }
    var a = new OnewayFlightEntity;
    a.key(e);
    a.commInfoMgr(s);
    a.flightInfoMgr(o);
    a.update();
    r.put(a.key(), a);
    return a
};
$jex.extendClass(OnewayFlightWrapperEntity, WrapperEntity);
OnewayFlightWrapperEntity.prototype.wrapperId = function() {
    return this.dataSource().wrid
};
OnewayFlightWrapperEntity.prototype.rank = function() {
    return this.groupInfo().rank || 999999
};
OnewayFlightWrapperEntity.prototype.rankline = function() {
    return this.groupInfo().rankline || -2
};
OnewayFlightWrapperEntity.prototype.isApplyPrice = function() {
    return this.dataSource().type == "a" && !this.isFakeNormalPrice()
};
OnewayFlightWrapperEntity.prototype.isSpecialApp = function() {
    return this.dataSource().specialApp
};
OnewayFlightWrapperEntity.prototype.packagePrice = function() {
    return this.dataSource().pg
};
OnewayFlightWrapperEntity.prototype.isRoundFlight = function() {
    return this.dataSource().roundflight == true
};
OnewayFlightWrapperEntity.prototype.bpackagePrice = function() {
    return this.dataSource().bpg
};
OnewayFlightWrapperEntity.prototype.isFakeNormalPrice = function() {
    var e = ["ttsmiao0001", "ttsmiao0003"];
    return $jex.array.indexOf(e, this.wrapperId()) > -1
};
OnewayFlightWrapperEntity.prototype.arank = function() {
    return this.groupInfo().arank || 9999999
};
OnewayFlightWrapperEntity.prototype.rankgrade = function() {
    return this.rankline() || 0
};
OnewayFlightWrapperEntity.prototype.ranktitle = function() {
    var e = this.groupInfo();
    return FlightUtil.getGTITLE(this.advalue(), e.grprank, e.rankline, e.showlevel)
};
OnewayFlightWrapperEntity.prototype.comments = function() {
    return this.groupInfo()["comments"] || []
};
OnewayFlightWrapperEntity.prototype.groupInfo = function() {
    if (this.ownerFlight().priceGroup()) {
        return this.ownerFlight().priceGroup().wrlist[this.key()] || {}
    } else {
        return {}
    }
};
OnewayFlightWrapperEntity.prototype._openBookingUrl = function(e, t) {
    var n = this._booking_url(e, t);
    var r = 1;
    if (t["prt"] === 0) {
        r = 2
    }
    if (t["recom"] === 1) {
        r = 3;
        System.service.genTraceTimeStamp();
        System.analyzer.triggerTrace = true
    }
    System.service.genBookingTimeStamp();
    var i = this.ownerFlight();
    if (i) {
        r += "&package=" + i.code()
    }
    window.open(n);
    this.logBooking();
    $jex.event.trigger($jex.$("hdivResultPanel"), "fem_booking");
    this._bookingBtnTrace();
    TsinghuaOneWayTracker.track("btype", r, System.service.traceTimeStamp, null, "&burl=" + encodeURIComponent(n) + "&wt=" + System.service.wrapperExpandStamp);
    this._booking_track();
    TsinghuaOneWayTracker.trackLowPrChange(i, 1)
};
OnewayFlightWrapperEntity.prototype.logBooking = function() {
    try {
        var e = this;
        var t = e;
        var n = e.ownerFlight();
        var r = t.wrapperId();
        var i = n.code();
        var s = n.deptCity().zh;
        var o = n.arriCity().zh;
        var u = n.deptDate();
        var a = (new Date).getTime() - ($jex.logHelp.lastOpenWrapperTime || window.CLIENT_TIME.getTime());
        var f = $jex.logHelp.openWrapperCount || 1;
        if (a < 3e3 || a > 60 * 60 * 1e3) {
            return
        }
        var l = {
            s: "flight",
            p: "onewayList",
            r: "bookingbtn",
            flightCode: i,
            from: s,
            to: o,
            date: u,
            wrapperid: r,
            duration: a,
            openWrapperCount: f
        };
        $jex.log(l)
    } catch (t) {}
};
OnewayFlightWrapperEntity.prototype._booking = function(e, t) {
    t = t || {};
    if (!t.BookingLocation) {
        if (this.isRoundFlight()) {
            t.BookingLocation = "oneWayList"
        } else {
            var n = this.ownerFlight().getWrapperListType() || "all";
            t.BookingLocation = "list_" + n
        }
    }
    this._openBookingUrl(e, t);
    $jex.event.trigger(window.System.service, "pageWillReload", "booking");
    setTimeout(function() {
        window.location.reload()
    }, 500)
};
OnewayFlightWrapperEntity.prototype._bookingBtnTrace = function() {
    var e = this.ownerFlight();
    var t = e.codeShareFlight();
    TsinghuaOneWayTracker.trackWrappers(e);
    if (t) {
        TsinghuaOneWayTracker.trackWrappers(t)
    }
    if (e._shareFlight) {
        TsinghuaOneWayTracker.trackWrappers(e._shareFlight)
    }
    TsinghuaOneWayTracker.traceFlightList()
};
OnewayFlightWrapperEntity.prototype.cabin = function() {
    return this.dataSource().cabin
};
OnewayFlightWrapperEntity.prototype.tag = function() {
    var e = this.dataSource().type;
    if (e == "bpf") {
        return "btf"
    } else if (e == "nclpf") {
        return "lpf"
    } else if (e == "tnlpf") {
        return "lpf"
    } else if (e == "tnuff") {
        return "tn"
    } else {
        return e
    }
};
OnewayFlightWrapperEntity.prototype.hasPackageprice = function() {
    return this.price()
};
OnewayFlightWrapperEntity.prototype.afeePrice = function() {
    return this.price()
};
OnewayFlightWrapperEntity.prototype.bprPrice = function() {
    return this.bpr()
};
WrapperEntity.prototype.isLowestPr = function() {
    return this.dataSource().prColor
};
WrapperEntity.prototype.isLowestBpr = function() {
    return this.dataSource().bprColor
};
$jex.extendClass(OnewayFlightWrapperListEntity, WrapperListEntity);
OnewayFlightWrapperListEntity.prototype.createWrapperEntity = function() {
    return new OnewayFlightWrapperEntity
};
OnewayFlightWrapperListEntity.prototype.update = function() {
    var e = this.ownerFlight();
    var t = e.getWrapperList();
    this._update(t)
};
OnewayFlightWrapperListEntity.prototype.bigUrlSort = function(e) {
    var t, n, r = this;
    $jex.foreach(e, function(e, i) {
        var s = r.get(e);
        if (s.bigLogoUrl()) {
            t = e;
            n = i;
            return $jex.$break
        }
    });
    if (t) {
        e.splice(n, 1);
        e.splice(0, 0, t)
    }
};
OnewayFlightWrapperListEntity.prototype.sort = function(e) {
    var t = this.keys(),
        n = this;
    e = e || this._sortType;
    this._sortType = e;
    if (e && e == "priceDesc") {
        t.sort(function(e, t) {
            var r = n.get(e);
            var i = n.get(t);
            var s = r.afeePrice() || r.bprPrice();
            var o = i.afeePrice() || i.bprPrice();
            if (!r.vendor().isWorking()) s = 1e5;
            if (!i.vendor().isWorking()) o = 1e5;
            return s - o
        });
        this.bigUrlSort(t)
    } else if (e && e == "priceAsc") {
        t.sort(function(e, t) {
            var r = n.get(e);
            var i = n.get(t);
            var s = r.afeePrice() || r.bprPrice();
            var o = i.afeePrice() || i.bprPrice();
            if (!r.vendor().isWorking()) s = -1e5;
            if (!i.vendor().isWorking()) o = -1e5;
            return -(s - o)
        });
        this.bigUrlSort(t)
    } else {
        t.sort(function(e, t) {
            var r = n.get(e);
            var i = n.get(t);
            return r.sortRank() - i.sortRank()
        })
    }
    this._keysCache = t;
    return t
};
OnewayFlightWrapperListEntity.prototype.wrapperLength = function() {
    var e = this._keysCache || [];
    for (var t = e.length; t > 0; t--) {
        if (this.get(e[t - 1]).isNotWork()) {
            continue
        } else {
            break
        }
    }
    return t
};
$jex.extendClass(FlightUI, XControl);
FlightUI.prototype.state = function(e) {
    if (e == null) {
        return this._state
    } else {
        this._state = e;
        $jex.event.trigger(this, "stateChanged", e, this)
    }
};
FlightUI.prototype.ownerFlightUI = function(e) {
    if (e == null) {
        return this._flightUI
    } else {
        this._flightUI = e
    }
};
FlightUI.prototype.gotoDetailPage = function(e) {
    switch (e.type) {
        case "onewayInTransfer":
            var t = e.owner().flightKeyCode();
            break;
        default:
            var t = e.flightKeyCode();
            break
    }
    var n = window.location.param();
    trackAction("FL|ALL|" + encodeURIComponent(t));
    var r = e.deptCity ? e.deptCity().zh : n.searchDepartureAirport;
    var i = e.arriCity ? e.arriCity().zh : n.searchArrivalAirport;
    var s = e.deptDate ? e.deptDate() : n.searchDepartureTime;
    var o = ["oneway_detail.htm?", "&origional=", encodeURIComponent(t), "&searchDepartureAirport=", encodeURIComponent(r), "&searchArrivalAirport=", encodeURIComponent(i), "&searchDepartureTime=", s, "&searchArrivalTime=", n.searchArrivalTime, "&nextNDays=0", "&arrivalTime=", n.searchArrivalTime, "&listtime=", SERVER_TIME.getTime(), "&code=", e.code(), "&listlp=", e.lowestPrice(), "&sortid=", "&deptcity=", encodeURIComponent(e.deptCity().zh), "&arricity=", encodeURIComponent(e.arriCity().zh), "&tserver=", this.dataSource().commInfoMgr().service().tserver()];
    if (e.getWrapperListType) {
        o.push("&wtype=", e.getWrapperListType())
    }
    if (System.analyzer.lowestOneway()) {
        var u = System.analyzer.lowestOneway().lowestPrice();
        if (e.lowestPrice() == u) {
            o.push("&lowflight=true&lowflightpr=" + u)
        }
    }
    if (n.from) {
        o.push("&from=", n.from)
    }
    LockScreen(function() {
        window.open(o.join(""))
    })
};
FlightUI.prototype.container = function() {
    return this.find("itemRow")
};
FlightUI.prototype.moveToHome = function() {
    if (this._homeNode) {
        if (!this._homeNode.parentNode) {
            return
        }
    }
    var e = $jex.$("hdivResultPanel");
    var t = $jex.$(this.newid("itemBar"));
    e.insertBefore(t, this._homeNode);
    this._homeNode = null
};
FlightUI.prototype.moveToFirst = function() {
    var e = this.dataSource();
    if (e.isAV && e.isAV()) return;
    this.ownerFlightUI().setFirstFlight(this);
    if (this.index == 0) return;
    var t = $jex.$("hdivResultPanel");
    var n = t.childNodes[0],
        r = this.newid("itemBar");
    var i = $jex.$(r);
    if (n.id != r) {
        this._homeNode = i.nextElementSibling || i.nextSibling;
        t.insertBefore(i, n)
    }
};
FlightUI.prototype._getTipHTML = function(e, t, n) {
    if (!e) return;
    var r = {
        content: e,
        panelId: t ? t + this._GID_ : null,
        contentId: n ? n + this._GID_ : null
    };
    var i = $jex.template(["<%if(panelId){%>", '<div class="p-tips-cont" id="<%= panelId%>" >', "<%} else {%>", '<div class="p-tips-cont" >', "<%}%>", '<div class="p-tips-wrap">', '<div class="p-tips-arr p-tips-arr-t"><p class="arr-o">◆</p><p class="arr-i">◆</p></div>', "<%if(contentId){%>", '<div class="p-tips-content" id="<%=contentId%>">', "<%} else {%>", '<div class="p-tips-content">', "<%}%>", "<%= content%>", "</div>", "</div>", "</div>"].join(""));
    return i(r)
};
FlightUI.prototype._getOneFlightAirHTML = function(e) {
    var t = [],
        n = e;
    t.push('<div class="air-wp">');
    t.push('<div class="air-row">');
    t.push('<div class="a-logo"><img width="24" height="24" title="', n.carrier().full, '" alt="', n.carrier().full, '" src="http://simg1.qunarzz.com/site/images/airlines/', n.carrier().key, '.gif"></div>');
    t.push("</div>");
    var r = FlightUtil.codePatch(n.code());
    t.push('<div class="air-row">');
    t.push('<div class="a-name">', n.carrier().zh, "</div>");
    t.push('<div class="a-model">');
    t.push('<span class="n">' + r + "</span>");
    t.push('<span class="n">' + n.operationType() + "</span>");
    var i = n.codeShare(),
        s = n.codeShareFlight();
    if (i && s) {
        t.push('<a class="p-tip-trigger n n-gx"' + ($jex.ie == 6 ? ' href="javascript:;"' : "") + ">" + '<div class="n-gx-tit">共享</div>' + this._getTipHTML('<p><span class="bold">主飞航班:</span>' + s.carrier().zh + i + "</p>") + "</a>")
    }
    t.push("</div>");
    t.push(this._getTagsHtml(n, this.ownerFlightUI().isOnlySelBfCabinType()));
    t.push("</div>");
    t.push("</div>");
    return t.join("")
};
FlightUI.prototype._getDepHtml = function(e) {
    var t = [],
        n = e;
    t.push('<div class="a-dep-time">', n.deptTime(), "</div>");
    if ((n.flightInfo().pt == "TRN" || n.flightInfo().pt == "BUS") && n.flightInfo().tr && n.flightInfo().tr == 1) {
        t.push('    <div class="a-dep-airport">', n.deptCity().zh, "</div>")
    } else {
        t.push('    <div class="a-dep-airport">', n.deptAirport().ab, n.dptTower(), "</div>")
    }
    return t.join("")
};
FlightUI.prototype._getArriHtml = function(e, t) {
    var n = [],
        r = e;
    n.push('<div class="a-arr-time">', r.arriTime());
    n.push(t);
    n.push("</div>");
    if ((r.flightInfo().pt == "TRN" || r.flightInfo().pt == "BUS") && r.flightInfo().tr && r.flightInfo().tr == 2) {
        n.push('    <div class="a-arr-airport">', r.arriCity().zh, "</div>")
    } else {
        n.push('    <div class="a-arr-airport">', r.arriAirport().ab, r.arrTower(), "</div>")
    }
    return n.join("")
};
FlightUI.prototype._getDisanceDaysHtml = function(e) {
    var t = [];
    var n = e.distanceDays();
    if (n) {
        t.push('<a class="t-st p-tip-trigger"' + ($jex.ie == 6 ? ' href="javascript:;"' : "") + '><div class="p-ret"><span class="hv"><i class="cs-day">+' + n + "天</i></span></div>" + this._getTipHTML("<p>当地降落日期<br/>" + e.arriDate() + "</p>") + "</a>")
    }
    return t.join("")
};
FlightUI.prototype._getStopHtmlInfo = function(e) {
    var t = e,
        n = t.stopover(),
        r = {};
    if (n) {
        var i = t.spCity();
        var s = t.spAirPort();
        r.tit = '<div class="ifo"><i class="z">停</i>' + (i ? i : "未知") + "</div>";
        if (i || s) {
            r.cont = "" + (i ? "<p>经停城市：" + i + "</p>" : "") + (s ? "<p>经停机场：" + s + "</p>" : "")
        } else {
            r.cont = "该航班是经停航班"
        }
    }
    return r
};
FlightUI.prototype._getTagsHtml = function() {
    return ""
};
$jex.extendClass(WrapperUI, XControl);
WrapperUI.prototype.update = function(e) {};
WrapperUI.prototype.insert_HEADER = function() {};
WrapperUI.prototype.insert_FOOTER = function() {};
WrapperUI.prototype._getBookingData = function(e, t, n) {
    var r = t;
    n = n || e.dataSource().type;
    n = n && n.toLocaleUpperCase();
    if (typeof t == "undefined") {
        r = e.afeePrice() ? 1 : 0
    }
    if (n && r == 1) {
        n += "I"
    }
    return {
        prt: r
    }
};
WrapperUI.prototype.jumpToBooking = function(e, t, n) {
    var r = this._getBookingData(e, t, n);
    e.booking(this.stat, r)
};
WrapperUI.prototype.insert_IATAIMG = function(e) {
    var t = e;
    var n = t.vendor().iataInfo();
    $jex.console.info("[WrapperUI.insert_IATAIMG] iata:", n, ", wrEn:", t);
    switch (n.level) {
        case 1:
            this.text("<img ");
            if (n.url.indexOf("http") != -1) {
                this.text("onclick=\"window.open('", n.url, "');return false;\"")
            }
            this.text(' align="absmiddle" src="http://simg1.qunarzz.com/site/images/new_main/iatav2.gif" title="经Qunar验证：该网站已获得《中国民用航空运输销售代理业务资格认可证书》" />');
            break;
        default:
            break
    }
};
WrapperUI.prototype.insert_VENDORNAME = function(e) {
    var t = e;
    var n = this.specWR;
    var r = this.superOTA;
    if (r && !t.isApplyPrice()) {
        this.text('<div class="clr_after">');
        this.text('    <div class="imggold">');
        this.text('    	<p class="icon_gold">金牌代理</p>');
        this.text('        <div class="prelative">');
        this.text('            <div class="gold_sumary">');
        this.text("                <b>快速出票：</b>3分钟内出票率在99%以上<br /><b>价格真实：</b>价格准确率在99%以上<br /><b>优质服务：</b>24小时内完成退改签，服务<cite>响应快，在行业内领先 </cite>");
        this.text('           		<p class="jt_arrow"></p>');
        this.text("            </div>");
        this.text("         </div>");
        this.text("    </div>");
        this.append("    <div", "superOTADetail", ' class="fl_summary"><!--显示弹出层内容加hover_gold，不显示去掉该class-->');
        this.text("    	 <h2>", t.vendor().name(), "</h2>");
        this.append("        <p", "superOTATip", ">快速出票、价格真实、优质服务</p>");
        this.text('         <div class="prelative">');
        this.text('            <div class="gold_sumary gold_txtsumry">');
        this.text("                <b>快速出票：</b>3分钟内出票率在99%以上<br /><b>价格真实：</b>价格准确率在99%以上<br /><b>优质服务：</b>24小时内完成退改签，服务<cite>响应快，在行业内领先 </cite>");
        this.text('           		<p class="jt_arrow left110"></p>');
        this.text("            </div> ");
        this.text("         </div>");
        this.text("    </div>");
        this.text("</div>")
    } else if (n) {
        this.text('	<div class="t"><b><img class="img" src="', n.picurl, '">');
        this.text("</b>");
        if (t.vendor().srv_QUALITY()) {
            this.text('<span title="已签署《去哪儿网客户服务规范》，服务有保障。" class="s7">服务保障</span><br />')
        }
        this.text('<span class="s" title="', t.vendor().adwords(), '">', n.text[0], n.text[1], FlightUtil.catAdtext(t.vendor().adwords(), 36 - (n.text[0].length + n.text[1].length)), "</span>");
        this.text("</div>")
    } else {
        this.text('	<div class="t"><b>', t.vendor().name());
        this.text("</b>");
        if (t.vendor().srv_QUALITY()) {
            this.text('<span title="已签署《去哪儿网客户服务规范》，服务有保障。" class="s7">服务保障</span>')
        }
        this.text("</div>")
    }
    this.onInit(function() {
        var e = this.find("superOTATip");
        var t = this.find("superOTADetail");
        if (e && t) {
            $jex.event.bind(e, "mouseover", function() {
                $jex.addClassName(t, "hover_gold")
            });
            $jex.event.bind(e, "mouseout", function() {
                $jex.removeClassName(t, "hover_gold")
            })
        }
    })
};
WrapperUI.prototype.insert_Services = function(e) {
    var t = this;
    var n = e;
    var r = n.vendor();
    this.text('<div class="v"><ul>');
    var i = [r.srv_ASSISTANT(), r.srv_ALLDAY(), r.srv_CHECKOUT(), r.srv_BAOXIAN(), r.srv_FREEMAIL(), r.srv_QNHELP()];
    $jex.foreach(i, function(e) {
        if (e) {
            t.append("<li ", e.key);
            t.text(' class="', e.key, '" alt="', e.title, '" title="', e.title, '">', e.desc, "</li>")
        }
    });
    this.text("</ul></div>")
};
WrapperUI.prototype.insert_RecommendBlog = function(e) {
    var t = e.vendor().complaintRate();
    if (t) {
        if (t.url) {
            t.url = "http://" + t.url.replace("http://", "");
            this.text("<a onclick=\"window.open('", t.url, '\'); $jex.stopEvent(event); return false;" target="_blank">', t.desc, "</a>&nbsp;&nbsp;")
        } else {
            this.text("<span>", t.desc, "</span>&nbsp;&nbsp;")
        }
    } else {}
};
WrapperUI.prototype.insert_CATA = function(e) {
    var t = e.vendor();
    var n = t.srv_CATA();
    if (n) {
        this.text('<div class="', n.key, '" alt="', n.title, '" title="', n.title, '"></div>')
    }
};
WrapperUI.prototype.insert_STAR = function(e) {
    var t = e;
    this.append("<div", "btnStar", ' class="starkb" >');
    this.text('<p class="star ', FlightUtil.starClass(t.vendor().star()), '"></p>');
    this.text('<p class="sbarTitle">网站口碑</p>');
    this.text("</div>");
    if (t.vendor().hasDetail()) {
        this.onInit(function() {
            $jex.event.binding(this.find("btnStar"), this, "click", function(e) {
                SingletonUIManager.register("vendor", this.vdetailUI, function() {
                    if (!this.visible()) {
                        this.updateSource(this.ownerWrapperUI().dataSource().vendor());
                        this.show()
                    } else {
                        this.hide()
                    }
                }, function() {
                    this.hide()
                });
                $jex.stopEvent(e)
            })
        })
    }
};
WrapperUI.prototype.insert_RANK = function(e) {
    var t = e;
    this.text('<p title="', t.rankgrade(), '分/5分" class="sbar"><b class="ids"><b style="width:', t.rankgrade() * 20, '%;" class="id"></b></b><b class="bg"></b></p>');
    this.text('<p class="sbarMsg">', t.ranktitle(), "</p>")
};
WrapperUI.prototype.insert_UPDATETIME = function(e) {
    var t = e;
    var n = t.updateTime();
    var r = "";
    if (n > 0) {
        r = QunarDate.parseTimeToNL(n) + "前更新"
    } else {
        r = "10分钟前更新"
    }
    if (t.isApplyPrice() || this.specWR) {
        return r
    } else {
        return this.bookingScreenUI.getStatusMsg(r)
    }
};
WrapperUI.prototype.insert_PRICE = function(e) {
    var t = e;
    this.insert_PRICE_NORMAL(t)
};
WrapperUI.prototype.insert_PRICE_INSURANCE = function(e) {
    var t = e;
    this.text('<div class="f1booking"> <span class="insure">+', t.afee(), '(保险)</span><span class="naked">&yen;<b>', t.price(), "</b></span> </div>");
    var n = t.isApplyPrice() ? "申 请" : "预 订";
    this.text('<div class="f2booking"> <a class="btn" href="#"> <span>', n, "</span> </a> </div>");
    if (t.bpr()) {
        this.append('<div class="f3booking"> <a', "onlyt", ' class="bbtn" href="#" ');
        this.text('title="', n, '">无保险&yen;', t.bpr(), "</a> </div>")
    }
};
WrapperUI.prototype.insert_PRICE_NORMAL = function(e) {
    var t = e;
    var n = ConfigManager.getConfig("CuxiaoConfig");
    var r = t.wrapperId();
    var i = n[r];
    this.text('<div class="prs">');
    if (i) {
        this.text('<span class="insure">', i.text, "</span>")
    } else if (t.afee()) {
        this.text('<span class="insure">+ ', t.afee(), "</span>")
    } else {
        this.text('<span class="disc">', PriceUtil.getDiscount(t.discount()), "</span>")
    }
    this.text('<span class="pr">&yen;<b>', t.price(), "</b></span>");
    this.text("</div>");
    this.text('<div class="alt">');
    var s = t.ranktitle();
    if (s) {
        this.text(s)
    } else if (t.afee()) {
        this.text("搭售保险")
    } else if (t.parValue()) {
        this.text("票面价：&yen;", t.parValue())
    }
    this.text("</div>");
    this.insert_BOOKING_BUTTON(t);
    this.text('<div class="up">', this.insert_UPDATETIME(t), "</div>")
};
WrapperUI.prototype.insert_BOOKING_BUTTON = function(e) {
    if (e.isApplyPrice()) {
        this.append("<a ", "btnBook", ' class="btnBook" href="#"><span>' + this.bookingScreenUI.getButtonMsg("申 请") + "</span></a>")
    } else {
        if (this.specWR) {
            this.append('<div class="ops"><a ', "btnBook", ' title="预订" class="btnBook" href="#"><span>预 订</span></a></div>')
        } else {
            this.append('<div class="ops"><a ', "btnBook", ' title="' + this.bookingScreenUI.getButtonTips("预订") + '" class="btnBook" href="#"><span>' + this.bookingScreenUI.getButtonMsg("预 订") + "</span></a></div>")
        }
    }
};
var StatProvider = function() {
    this.ownerWrapperEntity = function(e) {
        if (e.isApplyPrice() || e.isFakeNormalPrice()) {
            this.location(4)
        }
        this.fake(e.fake());
        if (e.ownerFlight().lowestPrice() == e.price()) {
            this.lowestStat(e.ownerFlight().lowestWrapperIds ? e.ownerFlight().lowestWrapperIds().length : 1)
        } else {
            this.lowestStat(0)
        }
        if (e.advalue() > 100) {
            this.isAD(true)
        } else {
            this.isAD(false)
        }
    };
    var e = "00";
    this.position = function(t) {
        if (t == null) {
            return e
        } else {
            if (t < 10) {
                e = "0" + t.toString()
            } else {
                e = t.toString()
            }
        }
    };
    var t = "0";
    this.isAD = function(e) {
        if (e == null) {
            return t
        } else {
            if (e) {
                t = "1"
            } else {
                t = "0"
            }
        }
    };
    var n = "0";
    this.fake = function(e) {
        if (e == null) {
            return n
        } else {
            if (e) {
                n = "1"
            } else {
                n = "0"
            }
        }
    };
    var r = 0;
    this.lowestStat = function(e) {
        if (e == null) {
            return r
        } else {
            if (e > 2) {
                r = 2
            } else {
                r = e
            }
        }
    };
    var i = 1;
    this.location = function(e) {
        if (e == null) {
            return i
        } else {
            i = e
        }
    }
};
StatProvider.prototype.value = function() {
    return [this.position(), this.isAD(), this.fake(), this.lowestStat(), this.location()].join("")
};
FlightListUI.flightCount = 0;
$jex.extendClass(FlightListUI, XControl);
FlightListUI.prototype.getSorter = function() {
    if (typeof FlightListUISorter != "undefined") {
        return FlightListUISorter
    }
    return {
        resortPage: function() {},
        open: function() {},
        close: function() {}
    }
};
FlightListUI.prototype.loadData = function(e, t) {
    var n = this;
    this.analyzer = t;
    this.clear();
    this._firstFlightUI = null;
    this.currentDataMap = e;
    this.getSorter().resortPage(e);
    FlightListUI.flightCount = 100;
    $jex.console.start("FlightListUI:loadData:建立数据");
    var r = [];
    $jex.event.trigger(n, "fuiFinish", null);
    $jex.foreach(e, function(e, t) {
        r.push(n._addFlightUI(e, t))
    });
    $jex.console.end("FlightListUI:loadData:建立数据");
    $jex.console.start("FlightListUI:loadData:渲染");
    this.refresh();
    $jex.console.end("FlightListUI:loadData:渲染");
    this._fuiListCache = r;
    this.keepLastOpen();
    $jex.event.trigger(this, "refreshed", r)
};
FlightListUI.prototype.keepLastOpen = function() {
    var e = HoldLastShowFlight.getUrlFlight(),
        t;
    $jex.foreach(this._fuiListCache, function(n, r) {
        if (n.dataSource().flightKeyCode() === e) {
            t = n;
            return false
        }
    });
    if (t) {
        var n = t.dataSource().code();
        var r = HoldLastShowFlight.getUrlType(n) || "all";
        SingletonUIManager.register("flight", t, function() {
            t.dataSource().setWrapperListType(r);
            t.showVendorPanel()
        }, function() {
            t.hideVendorPanel()
        })
    }
};
FlightListUI.prototype.refresh = function() {
    this.render();
    $jex.event.trigger($jex.$("hdivResultPanel"), "fem_flightListShow");
    this.styleList = [];
    this._randomArr = {}
};
FlightListUI.prototype._addFlightUI = function(e, t) {
    var n = this;
    var r = [e.type, "_", e.flightKeyCode()].join("");
    var i = this._cachelist[r],
        s = i;
    if (!i || i.dataSource() != e) {
        switch (e.type) {
            case "oneway":
            case "compose":
                i = new OnewayFlightUI;
                if (i.ownerFlightUI) {
                    i.ownerFlightUI(this)
                }
                break;
            case "transfer":
                i = new TransferFlightUI;
                if (i.ownerFlightUI) {
                    i.ownerFlightUI(this)
                }
                break
        }
        i.dataSource(e);
        i.ownerList = this;
        if (s) {
            s._homeNode = null;
            i._state = s._state
        }
        $jex.event.binding(i, "open", function() {
            $jex.event.trigger(n, "oneItemclicked", this);
            n.getSorter().open(i.dataSource());
            n._track("open", e);
            $jex.event.trigger(n, "openingFui", i);
            try {
                var t = e.firstTrip ? true : false;
                TraceAnalyzer.open = TraceAnalyzer.create().addOpenInfo(e, {
                    da: t ? e.firstTrip().deptCity().zh : e.deptCity().zh,
                    aa: t ? e.secondTrip().arriCity().zh : e.arriCity().zh,
                    co: e.key(),
                    inter: 0,
                    dd: t ? e.firstTrip().deptDate() : e.deptDate(),
                    now: $jex.date.format(SERVER_TIME),
                    ip: CLIENT_IP,
                    transfer: t
                })
            } catch (r) {}
        });
        $jex.event.binding(i, "close", function() {
            n.getSorter().close();
            n._track("close", e);
            $jex.event.trigger(n, "openingFui", null)
        });
        $jex.event.binding(i, "changeFilter", function(e, t, r) {
            $jex.event.trigger(n, "changeFilter", e, t, r)
        });
        this._cachelist[r] = i
    }
    $jex.event.trigger(n, "fuiFinish", i);
    i.index = t;
    i.updateSource();
    this.append("", i, "");
    return i
};
FlightListUI.prototype._track = function(e, t) {
    var n = this;
    var r = ["FL|T|"];
    switch (t.type) {
        case "oneway":
        case "compose":
            r.push("Ow|v", e, "|");
            break;
        case "transfer":
            r.push("Tf|v", e, "|");
            break;
        case "roundtrip":
            r.push("Tf|v", e, "|");
            break
    }
    r.push("p", n.analyzer.currentPageIndex() + 1, "|");
    r.push($jex.array.indexOf(n.currentDataMap, t) + 1, "|");
    switch (t.type) {
        case "oneway":
        case "compose":
            r.push(t.code(), "|");
            break;
        case "transfer":
            r.push(t.firstTrip().code(), "-", t.secondTrip().code(), "|");
            break;
        case "roundtrip":
            r.push(t.firstTrip().code(), "+", t.secondTrip().code(), "|");
            break
    }
    r.push(t.lowestPrice(), "|");
    var i = window.location.param();
    r.push(encodeURIComponent(i.searchDepartureAirport || i.fromCity), "-", encodeURIComponent(i.searchArrivalAirport || i.toCity), "|");
    r.push(i.searchDepartureTime || i.fromDate, "|");
    r.push($jex.date.format(SERVER_TIME), "|");
    switch (t.type) {
        case "oneway":
        case "compose":
            if (t.wrappers()) {
                r.push(t.wrappers().size())
            }
            break;
        case "transfer":
            r.push(t.firstTrip().wrappers().size() + t.secondTrip().wrappers().size());
            break;
        case "roundtrip":
            r.push(t.firstTrip().wrappers().size() + t.secondTrip().wrappers().size());
            break
    }
    trackAction(r.join(""))
};
FlightListUI.prototype.isOnlySelBfCabinType = function(e) {
    var t;
    if (arguments.length) {
        this._isOnlySelBfCabinType = e
    } else {
        return this._isOnlySelBfCabinType
    }
};
FlightListUI.prototype.setFirstFlight = function(e) {
    this.closeFirstFlight();
    var t;
    if (e.index != 0) {
        t = this._fuiListCache.slice(0);
        t.splice(e.index, 1);
        t.splice(0, 0, e);
        this._firstFlightUI = e
    } else {
        t = this._fuiListCache
    }
    $jex.event.trigger(this, "refreshed", t)
};
FlightListUI.prototype.closeFirstFlight = function() {
    if (!this._firstFlightUI) return;
    this._firstFlightUI.moveToHome();
    this._firstFlightUI = null
};
$jex.extendClass(FilterListUI, XControl);
FilterListUI.prototype.addFilter = function(e) {
    if (!e || e.value === "") {
        return
    }
    if (e.value == null) {
        var t = "___defaultvalue"
    } else {
        var t = e.catalog + "-" + e.value
    }
    if (this._cacheItem[t]) {
        return
    }
    this._cacheItem[t] = true;
    var n = this._list.get(e.catalog);
    if (!n) {
        n = new FilterUI(this._filterConf[e.catalog]);
        n.ownerList(this);
        this.bindEvent(n);
        this._list.put(e.catalog, n)
    } else {}
    n.addItem(e)
};
FilterListUI.prototype.bindEvent = function(e) {
    var t = this;
    $jex.event.binding(e, "changeFilter", function(e, n, r, i, s) {
        var o = {
            name: e,
            type: t._filterConf[e] && t._filterConf[e].type ? t._filterConf[e].type : 4,
            value: n
        };
        var u;
        if ($jex.isArray(r)) {
            var a = [];
            for (var f = 0; f < r.length; f++) {
                if (r[f] && r[f].dataSource()) {
                    r[f].sel(true);
                    var l = r[f];
                    var c = l.dataSource().name;
                    a.push(c)
                }
            }
            u = a
        } else {
            var h = r.dataSource().name;
            u = {
                value: i,
                cname: h,
                checked: s
            }
        }
        var p = t._filterPanel.length;
        var d;
        for (d = 0; d < p; d++) {
            var v = t._filterPanel[d];
            if (v.catalog() == e) {
                v.update(u);
                v.render(v.owner().find(e + "filterItem"));
                break
            }
        }
        if (d === p) {
            if (!t._filterPanelListUI) {
                t._filterPanelListUI = new FilterItemListUI;
                t._filterPanelListUI.owner(t)
            }
            var m = t._filterPanelListUI;
            var g = new FilterItemUI;
            g.owner(m);
            g.ownerFilter(this);
            g.catalog(e);
            g.update(u);
            t._filterPanel.push(g);
            m.update();
            if (t._filterPanel.length) {
                m.renderPanel()
            }
        }
        $jex.event.trigger(t, "changeFilter", o, e, n, r, i, s)
    });
    $jex.event.binding(e, "reSelCheckBox", function(t) {
        var n = t[0].getKey(),
            r = n.split("|"),
            i = r[0],
            s = $jex.array.map(t, function(e) {
                return e.getKey().split("|")[2]
            });
        $jex.event.trigger(e, "changeFilter", i, s, t)
    })
};
FilterListUI.prototype.getFilterUI = function(e) {
    var t = this._list.get(e);
    return t && t.visible() ? t : false
};
FilterListUI.prototype.appendFilter = function(e, t) {
    var n = t || {};
    var r = n.attr || "";
    this.append("<div ", e, ' class="item" ' + r + " ></div>")
};
FilterListUI.prototype.layout = function() {};
FilterListUI.prototype.update = function() {};
FilterListUI.prototype.refresh = function() {
    var e = this;
    $jex.foreach(this._list.keys(), function(t) {
        var n = e._list.get(t);
        if (n && n.visible()) {
            n.update();
            n.render(e.find(t));
            $jex.element.show(e.find(t));
            if (!n.firstRefresh) {
                $jex.event.trigger(e, "firstRefresh", n);
                n.firstRefresh = true
            }
        } else {
            $jex.element.hide(e.find(t))
        }
    })
};
FilterListUI.prototype.sendLog = function() {
    var e = $jex.log;
    var t = {
        s: "flight",
        p: "onewayList",
        r: "filterClick"
    };
    var n = {
        "起飞时间": {
            name: "deptTime",
            val_name: {
                0: "morning",
                1: "noon",
                2: "afternoon",
                3: "night"
            }
        },
        "起飞机场": "deptAirport",
        "降落机场": "arriAirport",
        "航空公司": "firm",
        "舱位": {
            name: "canbinType",
            val_name: {
                j: "economy",
                bf: "first"
            }
        },
        "机型": "flightType",
        "方式": "direct"
    };
    return function(r) {
        var i = r.getKey().split("|");
        var s = i[0],
            o = i[2];
        var u = n[s];
        var a;
        if (typeof u == "object") {
            a = u.name + "_" + (u.val_name || {})[o]
        } else {
            a = u
        }
        e($jex.extend({
            filter: a
        }, t))
    }
}();
$jex.extendClass(FilterUI, XControl);
FilterUI.prototype.defaultCheck = function() {
    return this._setting.defaultCheck || false
};
FilterUI.prototype.allName = function() {
    var e = [];
    $jex.foreach(this._displayboxes, function(t) {
        e.push(t.dataSource().name)
    });
    return e
};
FilterUI.prototype.clearFilter = function() {
    var e = this;
    $jex.foreach(this._displayboxes, function(t) {
        t.clearValue(e.defaultCheck())
    });
    var t = this.dataSource().catalog;
    var n = {
        filter: this.dataSource().filter,
        name: t,
        type: this.ownerList()._filterConf[t] && this.ownerList()._filterConf[t].type ? this.ownerList()._filterConf[t].type : 4,
        value: []
    };
    $jex.event.trigger(this.ownerList(), "changeFilter", n)
};
FilterUI.prototype.addItem = function(e) {
    var t = e;
    var n = this._groups;
    var r = t.group || "default";
    var i = t.catalog + "|" + r + "|" + t.value;
    this.catalog(t.catalog);
    if (!n[r]) {
        n[r] = []
    }
    var s = this._checkboxes[i];
    if (!s) {
        s = new FilterCheckBoxUI;
        s.ownui(this);
        s.checked(this.defaultCheck());
        s.dataSource(t);
        s.updateSource();
        this.bindEvent(s);
        this._checkboxes[i] = s;
        n[r].push(s)
    }
    if (n[r].length > 1) {
        this.visible(true)
    }
};
FilterUI.prototype.bindEvent = function(e) {
    var t = this;
    $jex.event.binding(e, "changeCheckbox", function(e, n, r) {
        $jex.event.trigger(t, "changeFilter", t.catalog(), t.getValue(), e, n, r);
        if (r) {
            t.ownerList().sendLog(e)
        }
    })
};
FilterUI.prototype.getValue = function() {
    var e = [];
    $jex.foreach(this._displayboxes, function(t) {
        var n = t.getValue();
        if (n) {
            e.push(n)
        }
    });
    if (e.length == this._displayboxes.length) {
        e = []
    }
    return e
};
FilterUI.prototype.getKey = function() {
    var e = [];
    $jex.foreach(this._displayboxes, function(t) {
        var n = t.getKey();
        var r = t.getValue();
        if (n && r) {
            e.push(n)
        }
    });
    return e
};
FilterUI.prototype.update = function() {
    this.clear();
    this._displayboxes = [];
    var e = this;
    if (this.catalog() == "方式") {
        this.text('<div class="item-direct">')
    } else {
        this.text('<span class="item-name">', this.catalog(), '<i class="arrow-down"></i></span>');
        this.text('<div class="detail-fix">');
        this.text('<div class="item-detail ">')
    }
    $jex.foreach(this._groups, function(t, n, r) {
        if (t.length <= 1) {
            return $jex.$continue
        }
        e.updateGroup(t)
    });
    this.text("</div>");
    this.text("</div>");
    if (this.ownerList().find("newFilter").style.display == "none") {
        this.ownerList().find("newFilter").style.display = "block"
    }
};
FilterUI.prototype.updateGroup = function(e) {
    var t = this;
    var n = 5;
    var r = e.length;
    if (this._setting.sort) {
        var i = this._setting.sort;
        e.sort(function(e, t) {
            if (e.dataSource().catalog == "起飞时间") {
                return i[e.dataSource().key] - i[t.dataSource().key]
            }
            return i[e.dataSource().name] - i[t.dataSource().name]
        })
    }
    if (this.catalog() == "航空公司") {
        var s = Math.floor(r / n);
        var o = [];
        for (var u = 0; u <= s; u++) {
            if (u == s) {
                o = e.slice(u * n)
            } else {
                o = e.slice(u * n, u * n + 5)
            }
            if (o.length) {
                t.text('<div class="item-wrap">');
                $jex.foreach(o, function(e) {
                    t._displayboxes.push(e);
                    e.update();
                    t.append("", e)
                });
                t.text("</div>")
            }
        }
    } else {
        $jex.foreach(e, function(e, n) {
            e._idx = n;
            t._displayboxes.push(e);
            e.update();
            t.append("", e)
        })
    }
};
$jex.extendClass(FilterCheckBoxUI, XControl);
FilterCheckBoxUI.prototype.getValue = function() {
    var e = this.find("chk");
    if (e.checked) {
        return e.value
    } else {
        return ""
    }
};
FilterCheckBoxUI.prototype.clearValue = function(e) {
    this.checked(e);
    var t = this.find("chk");
    if (t) {
        t.checked = e
    }
};
FilterCheckBoxUI.prototype.isShown = function(e) {
    if (typeof e === "undefined") {
        return this._isShown
    }
    this._isShown = e
};
FilterCheckBoxUI.prototype.update = function(e) {
    var t = e || this.dataSource();
    this.clear();
    this.text(' <div class="item-lab" style="display: ' + (this.isShown() ? "" : "none") + ';">');
    this.append("<input ", "chk");
    this.text(' type="checkbox" value="', t.value, '"');
    if (this.checked()) {
        this.text(' checked="checked" ')
    }
    this.text(" />");
    this.tpls('<label for="{#chk}"><span>' + t.name + "</span></label>");
    this.text("</span>");
    this.text("</div>");
    var n = this;
    this.onInit(function() {
        var e = this.find("chk");
        $jex.event.binding(e, this, "click", function() {
            this.checked(e.checked);
            $jex.event.trigger(n, "changeCheckbox", this, this.dataSource().value, e.checked)
        })
    })
};
FilterCheckBoxUI.prototype.sel = function(e) {
    this.checked(e)
};
$jex.extendClass(FilterItemListUI, XControl);
FilterItemListUI.prototype.update = function() {
    var e = this.owner()._filterPanel;
    var t = e.length;
    var n = this;
    this.clear();
    if (!e) {
        return
    }
    for (var r = 0; r < e.length; r++) {
        if (!e[r]._text.length) {
            e.splice(r, 1);
            r--;
            continue
        }
        this.append("<li ", e[r].catalog() + "filterItem", 'class="result-item">');
        this.text(e[r]);
        this.text("</li>")
    }
    if (!e.length) {
        this._isNull = true;
        return
    }
    t = e.length;
    this._isNull = false;
    this.append("<li ", "removeAll", 'class="remove-all">清空所有</li>');
    this.onInit(function() {
        var e = n.find("removeAll");
        var t = n.owner()._filterPanel;
        $jex.event.binding(e, "click", function() {
            n.owner()._filterPanel = [];
            n.update();
            n.renderPanel();
            n.owner().clearAllFilter()
        });
        $jex.foreach(t, function(e) {
            var t = e.catalog() + "filterItem";
            $jex.event.binding(n.find(t), "click", function() {
                e._text = [];
                e.owner().update();
                e.owner().renderPanel();
                e.ownerFilter().clearFilter()
            })
        })
    })
};
FilterItemListUI.prototype.renderPanel = function() {
    var e = this.owner();
    var t = e.find("filterPanel");
    this.render(t);
    if (e.find("filterResult").style.display == "none" && !this._isNull) {
        e.find("filterResult").style.display = "block"
    }
    if (this._isNull && e.find("filterResult").style.display == "block") {
        e.find("filterResult").style.display = "none"
    }
};
$jex.extendClass(FilterItemUI, XControl);
FilterItemUI.prototype.update = function(e) {
    var t, n, r, i;
    this.clear();
    r = this;
    n = this._text.length;
    if ($jex.isArray(e)) {
        this._text = e
    } else {
        for (t = 0; t < n; t++) {
            if (this._text[t] == e.cname && !e.checked) {
                this._text.splice(t, 1);
                break
            }
        }
        if (t === n) {
            this._text.push(e.cname)
        }
        if (!this._text.length) {
            this.owner().update();
            this.owner().renderPanel();
            return
        }
        if (this.catalog() == "起飞时间") {
            this.resort()
        }
    }
    i = this._text;
    var s = this.catalog();
    if (s == "起飞时间") {
        this.text(' <span class="result-text">')
    } else {
        this.text(' <span class="result-text">', this.catalog(), "：")
    }
    if (i.length > 11) {
        i = i.slice(0, 11);
        this.text(i.join("&nbsp;"));
        this.text("...")
    } else {
        this.text(i.join("&nbsp;"))
    }
    this.text(" </span>");
    this.text('<span class="remove-item"></span>')
};
FilterItemUI.prototype.resort = function() {
    this._text = this._text.sort(function(e, t) {
        var n = ["上午", "中午", "下午", "晚上"];
        var r = $jex.array.indexOf(n, e);
        var i = $jex.array.indexOf(n, t);
        return r - i
    })
};
$jex.extendClass(DomesticOnewayFilterListUI, FilterListUI);
DomesticOnewayFilterListUI.prototype.update = function() {
    this.clear();
    this.append("<div ", "newFilter", 'class="m-new-filter " style="display:none;">');
    this.text('<div class="filter-case clrfix">');
    this.text('<ul class="case-wrapper clrfix">');
    this.appendFilter("起飞时间");
    this.appendFilter("起飞机场");
    this.appendFilter("降落机场");
    this.appendFilter("航空公司", {
        moreClass: "airline"
    });
    this.appendFilter("舱位");
    this.appendFilter("机型");
    this.appendFilter("方式");
    this.text("</ul>");
    this.text("</div>");
    this.append("<div ", "filterResult", 'class="filter-result clrfix" style="display:none">');
    this.append("<ul ", "filterPanel", 'class="result-wrapper clrfix J-filterWrap">');
    this.text("</ul>");
    this.text("</div>");
    this.text("</div>");
    this.onInit(function() {
        var e = this;
        var t = ["起飞时间", "起飞机场", "降落机场", "航空公司", "机型", "舱位", "方式"];
        if ($jex.ie == 6) {
            $jex.foreach(t, function(t) {
                var n = e.find(t);
                $jex.event.binding(n, "mouseover", function() {
                    $jex.addClassName(n, "cur")
                });
                $jex.event.binding(n, "mouseout", function() {
                    $jex.removeClassName(n, "cur")
                })
            })
        }
        e.isMoreOpen = 0;
        $jex.event.binding(this.find("filterMoreTitle"), this, "click", function(t) {
            var n = this.find("filterMore");
            var r = this.find("filterMoreTitle");
            $jex.toggleClassName(n, "hide", function() {
                r.innerHTML = '更多筛选条件<i class="ico_up"></i>';
                e.isMoreOpen = 0;
                trackAction("FL|F|Mo|close")
            }, function() {
                r.innerHTML = '收起<i class="ico_down"></i>';
                e.isMoreOpen = 1;
                trackAction("FL|F|Mo|open")
            });
            $jex.stopEvent(t);
            $jex.event.trigger(e, "openMore")
        });
        $jex.event.binding($jex.$(this._setting.elemId), this, "click", function(t) {
            var n = typeof event != "undefined" ? event.srcElement : t.target;
            if (/input|label/i.test(n.tagName)) {
                var r = this.getCurCheckbox(n.id);
                if (r) {
                    var i = r.find("chk");
                    r.checked(i.checked);
                    $jex.event.trigger(r, "changeCheckbox", r, r.dataSource().value, i.checked);
                    $jex.event.trigger(e, "onUserActied")
                }
            }
        })
    })
};
DomesticOnewayFilterListUI.prototype.addFilter = function(e) {
    if (!e || e.value === "") {
        return
    }
    if (e.value == null) {
        var t = "___defaultvalue"
    } else {
        var t = e.value
    }
    if (this._cacheItem[t]) {
        return
    }
    this._cacheItem[t] = true;
    var n = this._list.get(e.catalog);
    if (!n) {
        n = new OnewayFilterUI(this._filterConf[e.catalog]);
        n.ownerList(this);
        n.dataSource(e);
        this.bindEvent(n);
        this._list.put(e.catalog, n)
    } else {}
    n.addItem(e)
};
DomesticOnewayFilterListUI.prototype.clearAllFilter = function() {
    var e = this;
    var t = e.getAllFilterUIs();
    $jex.foreach(t, function(e) {
        $jex.foreach(e._displayboxes, function(t) {
            t.clearValue(e.defaultCheck())
        })
    });
    $jex.event.trigger(e, "changeFilter", {
        isNull: true
    })
};
DomesticOnewayFilterListUI.prototype.getAllFilterUIs = function() {
    var e = this._list.keys();
    var t = [];
    for (var n = 0; n < e.length; n++) {
        var r = this._list.get(e[n]);
        if (r && r.visible()) {
            t.push(r)
        }
    }
    return t
};
DomesticOnewayFilterListUI.prototype.setCheckBoxCache = function(e, t) {
    if (!this._chkBox) this._chkBox = {};
    this._chkBox[e] = t
};
DomesticOnewayFilterListUI.prototype.getCurCheckbox = function(e) {
    return this._chkBox && this._chkBox[e]
};
DomesticOnewayFilterListUI.prototype.appendFilter = function(e, t) {
    var n = t || {};
    var r = n.attr || "";
    var i = n.moreClass || "";
    var s = n.cName || "filter-item";
    this.append("<li ", e, ' class="' + s + (i ? " " + i : "") + '" ' + r + " ></li>")
};
DomesticOnewayFilterListUI.prototype.setTransformLoad = function() {
    this._isTransformLoad = true
};
DomesticOnewayFilterListUI.prototype.layout = function() {
    var e = this;
    var t = this.find("filter_panel"),
        n = this.find("filterMore"),
        r = 0,
        i = false;
    var s = [];
    $jex.foreach(["起飞时间", "方式", "起飞机场", "降落机场", "航空公司", "舱位", "机型"], function(t, n) {
        if (e.getFilterUI(t)) {
            s.push(t)
        }
    });
    if (s.length == 0) {
        $jex.element.hide($jex.$(this._setting.elemId));
        return
    }
    if (s[0] == "航空公司") {
        t.appendChild(this.find("航空公司"));
        if (s[1]) {
            i = true;
            n.appendChild(this.find("机型"))
        }
    } else {
        var o = this._isTransformLoad ? 1 : 0;
        $jex.foreach(s, function(r, s) {
            if (s <= o) {
                t.appendChild(e.find(r))
            } else {
                i = true;
                n.appendChild(e.find(r))
            }
        });
        if (this.getFilterUI("航空公司") && this.getFilterUI("机型")) {
            i = true;
            n.appendChild(this.find("航空公司"))
        }
    }
    $jex.element.show($jex.$(this._setting.elemId));
    $jex.element[i ? "show" : "hide"](this.find("moreFilter"))
};
$jex.extendClass(OnewayFilterCheckBoxUI, FilterCheckBoxUI);
OnewayFilterCheckBoxUI.prototype.update = function(e) {
    this.clear();
    var t = e || this.dataSource();
    var n = this.newid("chk");
    this.ownui().ownerList().setCheckBoxCache(n, this);
    this.text(' <div class="item-lab" style="display: ' + (this.isShown(t.name) ? "" : "none") + ';">');
    this.append("<input ", "chk");
    this.text(' type="checkbox" value="', t.value, '"');
    if (this.checked()) {
        this.text(' checked="checked" ')
    }
    this.text(" />");
    this.tpls('<label for="{#chk}"><span>' + t.name + "</span></label>");
    this.text("</span>");
    this.text("</div>")
};
OnewayFilterCheckBoxUI.prototype.isShown = function(e) {
    var t = true;
    $jex.foreach(this._setting.hiddenLabs || [], function(n) {
        if (n == e) {
            t = false
        }
    });
    return t
};
OnewayFilterCheckBoxUI.prototype.getKey = function() {
    return this._key
};
$jex.extendClass(OnewayFilterUI, FilterUI);
OnewayFilterUI.prototype.addItem = function(e) {
    var t = e;
    var n = this._groups;
    var r = t.group || "default";
    var i = t.catalog + "|" + r + "|" + t.value;
    this.catalog(t.catalog);
    if (!n[r]) {
        n[r] = []
    }
    var s = this._checkboxes[i];
    if (!s) {
        s = new OnewayFilterCheckBoxUI({
            hiddenLabs: ["中转联程"],
            key: i
        });
        s.ownui(this);
        s.checked(this.defaultCheck());
        s.dataSource(t);
        s.updateSource();
        this.bindEvent(s);
        this._checkboxes[i] = s;
        n[r].push(s)
    }
    if (n[r].length > 1) {
        this.visible(true)
    }
};
var HotSale = function() {
    var e = {
        ps: "航班票量较少",
        hot: "一周内热门预订",
        lcc: "除商务经济座外，其他机票不提供免费餐饮，免<br/>费行李额度低，详情请咨询春秋航空：95524",
        lqf: "此航班为临起飞航班，将在1-2小时内起飞，可紧急购票。"
    };
    var t = -1,
        n = 100;
    var r = function(e, r) {
        var i = r.rate || 100;
        r.late = i <= n && i < t
    };
    return {
        init: function() {
            t = ConfigManager.getConfig("late")
        },
        hotSaleInfo: function(t) {
            var n = t.extInfo() || {},
                i = {};
            $jex.foreach(["lcc", "lqf", "hot", "ps", "late"], function(s, o) {
                if (s == "late") r(t, n);
                if (s == "lcc" && t.isCheapFlight()) {
                    n[s] = true
                }
                if (n[s]) {
                    i[s] = e[s];
                    if (s == "late") {
                        i[s] = "航班易晚点，近三个月该航班准点率" + n.rate + "%"
                    }
                    if (s == "lcc") {
                        i[s] = t.CheapFlightMessage()
                    }
                    return $jex.$break
                }
            });
            return i
        },
        setMinLate: function(e) {
            var t = e.extInfo() || {};
            t.rate = 100
        }
    }
}();
$jex.extendClass(BookingLockScreenUI, XControl);
BookingLockScreenUI.prototype.setEntity = function(e) {
    this.entity = e
};
BookingLockScreenUI.prototype.preBooking = function(e, t) {
    this.bFunc = e;
    this._vpr = 0;
    var n = this.entity,
        r = n.isZYXWrapper();
    price = t === 1 && n.afeePrice() ? n.afeePrice() : n.bprPrice(), priceInfo = typeof n.ownerFlight().priceInfo == "function" ? n.ownerFlight().priceInfo() : null;
    oprice = priceInfo ? priceInfo.op : Number.MAX_VALUE, attrs = [], carrierCode = n.ownerFlight().carrierCode();
    var i = n.typeOfCabin().indexOf("经济舱") > -1;
    if (n.isApplyPrice() && (!n.isSpecialApp || !n.isSpecialApp())) {
        if (r) {
            attrs.push("zyxapp")
        } else {
            attrs.push("app")
        }
    } else if (n.ownerFlight().type == "onewayInTransfer") {
        if (r) {
            attrs.push("zyxtransfer")
        } else {
            attrs.push("transfer")
        }
    } else if (n.ownerFlight().type == "compose" && n.isZzb()) {
        attrs.push("composeFlight")
    } else if (n.isRoundFlight()) {
        attrs.push("transfinoneway")
    }
    if (attrs.length > 0) {
        this.showDialog(attrs.join("+"))
    } else {
        e()
    }
};
BookingLockScreenUI.prototype.getMsgInfo = function(e) {
    var t = this.entity;
    var n = t.vPrice();
    var r = t.vAmount();
    var i = t.vName();
    var s = this._vpr || 0;
    var o = e == "transfinoneway" ? t.dataSource().flightInfo : t.ownerFlight().flightInfo();
    var u = t.ownerFlight().commInfoMgr();
    var a = {
        app: {
            txt: "您所选购的是特殊机票产品，机票需要申请，申请成功后将短信通知您。"
        },
        zyxapp: {
            txt: ["您购买的是自由行产品，包括机票和价值", n * r, "元（", n, "元*", r, "张）", i, "。机票需要申请，代理商将在申请成功后与您取得联系。"].join("")
        },
        transfer: {
            txt: ['您预订的是中转联程票，请确定各段价格都有效再付款。为了保证您的权益请阅读<a href="http://www.qunar.com/site/zh/Multi-city.shtml?', (new Date).getTime(), '" target="_blank">《中转联程票购买须知》</a>。'].join("")
        },
        zyxtransfer: {
            txt: ["您所选购的是中转联程的自由行产品，包括机票和价值", n * r, "元（", n, "元*", r, "张）", i, '，请确定各段价格都有效再付款。为了保证您的权益请阅读<a href="http://www.qunar.com/site/zh/Multi-city.shtml?', (new Date).getTime(), '" target="_blank">《中转联程票购买须知》</a>。'].join("")
        },
        composeFlight: {
            txt: "您预订的是中转特价产品，需要在中转地停留并换机，将在出票后告知中转地停留时间。请确认后再付款。"
        }
    };
    if (t.isRoundFlight()) {
        a["transfinoneway"] = {
            txt: ['<div class="d1"><span class="tl">拜年团</span>&nbsp;即将跳转到订单填写页，请确认再付款！</div>', '<div class="d2">', '<p class="p1"><span class="city">', u.getCityNameByCode(o.firsttrip.da).zh, " - ", u.getCityNameByCode(o.firsttrip.aa).zh, '</span>&nbsp;&nbsp;<span class="time">', o.firsttrip.dd + "&nbsp;" + o.firsttrip.dt, '</span>&nbsp;&nbsp;<span class="code">航班号:&nbsp;', o.firsttrip.co, "</p>", '<p class="p2"><span class="city">', u.getCityNameByCode(o.secondtrip.da).zh, " - ", u.getCityNameByCode(o.secondtrip.aa).zh, '</span>&nbsp;&nbsp;<span class="time">', o.secondtrip.dd + "&nbsp;" + o.secondtrip.dt, '</span>&nbsp;&nbsp;<span class="code">航班号:&nbsp;', o.secondtrip.co, "</p></div>"].join("")
        }
    } else {
        a["transfinoneway"] = {
            txt: ""
        }
    }
    var f = a[e],
        l = /app/.test(e),
        c = /transfer/.test(e),
        h = /zyxapp/.test(e),
        p = /zyxtransfer/.test(e),
        d = /composeFlight/.test(e),
        v = /transfinoneway/.test(e);
    f.className = "icon_apply";
    if (l) {
        f.note = '<div class="note">说明：申请机票是指需要代理商向航空公司申请的机票，由于数量有限，代理商对是否申请成功不做承诺。</div>'
    } else if (c) {
        f.className = "icon_transfer";
        f.note = '<div class="note">说明：先确认各段机票价格均有效才能付款，避免某一航班无法预定带来的已购买航班处理的麻烦；每段行程都需要单独缴纳机场建设费和燃油税。</div>'
    } else if (h) {
        magInfo.className = "icon_zyxapply";
        f.note = '<div class="note">说明：申请机票是指需要代理商向航空公司申请的机票，由于数量有限，代理商对是否申请成功不做承诺。</div>'
    } else if (p) {
        f.className = "icon_zyxtransfer";
        f.note = '<div class="note">说明：申请机票是指需要代理商向航空公司申请的机票，由于数量有限，代理商对是否申请成功不做承诺。</div>'
    } else if (v) {
        f.className = "icon_transferinoneway";
        f.note = "<div>说明：春节特别产品，含两段行程（未含税），组合价更优惠。您可选乘其中一程或两程，未使用的航程不可单独退票。</div>"
    } else {
        f.note = ""
    }
    return f
};
BookingLockScreenUI.prototype.showDialog = function(e) {
    $jex.event.trigger(this, "open");
    this.type = e;
    this.addStyleHTML();
    if (window.BookingScreenUI) {
        BookingScreenUI.closeMySelf()
    }
    var t = this.getContainerID();
    var n = this.dlg;
    n.innerHTML = "";
    var r = [];
    var i = this.getMsgInfo(e);
    r.push('<div class="p_layer_cont p_layer_cont_1 ' + e + '">');
    r.push('    <div style="width:440px;" class="layer_inner"> <a id="', t, '_close" href="javascript:void(0);" title="关闭" class="btn_close"></a> ');
    r.push('        <div class="e_tit_pop"><h3>重要提醒</h3></div>');
    r.push('        <div class="layer_cont">');
    r.push('            <div class="b_warn_pop_l clrfix">');
    r.push('            <div class="e_warn_inf"><h3>', i["txt"], "</h3>");
    r.push("            </div>");
    r.push("            </div>");
    r.push('            <div class="b_submit_pop_l"><a id="', t, '_continue" href="javascript:void(0);" class="go-to"><span><b>继续预订</b></span></a><a id="', t, '_cancel" href="javascript:void(0);" class="cancle"><span><b>取　消</b></span></a></div>');
    r.push('            <div class="e_note">', i["note"], "</div>");
    r.push("        </div>");
    r.push("        </div>");
    r.push("    </div>");
    $jex.lightbox.show(r.join(""));
    var s = ["&type=", e, "&act=lock", "&wrid=", this.vendor.wr || this.vendor.wrid, "&wrname=", encodeURIComponent(this.vendor.name)];
    trackAction(s.join(""))
};
BookingLockScreenUI.prototype.setVendorInfo = function(e, t) {
    t.wr = e;
    this.vendor = t
};
BookingLockScreenUI.prototype.closeDialog = function(e) {
    var t = e.target;
    while (t != document) {
        if (t.id == this.getContainerID() + "_close") {
            $jex.lightbox.hide();
            return
        }
        if (t.id == this.getContainerID() + "_cancel") {
            $jex.lightbox.hide();
            var n = ["&type=", this.type, "&act=cancel", "&wrid=", this.vendor.wr || this.vendor.wrid, "&wrname=", encodeURIComponent(this.vendor.name)];
            trackAction(n.join(""));
            return
        }
        if (t.id == this.getContainerID() + "_continue") {
            $jex.lightbox.hide();
            this.bFunc(this._vpr);
            var n = ["&type=", this.type, "&act=continue", "&wrid=", this.vendor.wr || this.vendor.wrid, "&wrname=", encodeURIComponent(this.vendor.name)];
            trackAction(n.join(""));
            return
        }
        if (t.className == "lb_content") {
            return
        }
        t = t.parentNode
    }
    $jex.lightbox.hide();
    return
};
BookingLockScreenUI.prototype.close = function() {};
BookingLockScreenUI.closeMySelf = function() {};
BookingLockScreenUI.prototype.addStyleHTML = function() {
    if (this.__ApplyScreenUI_addstyle == true) return;
    var e = document.createElement("div");
    e.id = this.getContainerID();
    e.style.position = "absolute";
    e.style.zIndex = "999999";
    e.style.width = "450px";
    e.style.height = "231px";
    document.getElementsByTagName("body")[0].appendChild(e);
    this.dlg = e;
    this.clickBind(this.closeDialog);
    this.__ApplyScreenUI_addstyle = true
};
BookingLockScreenUI.prototype.getContainerID = function() {
    if (!this.containerID) {
        this.containerID = "__apply_screen_dialog_container__" + Math.floor(Math.random() * 1e6)
    }
    return this.containerID
};
BookingLockScreenUI.prototype.clickBind = function(e) {
    var t = document;
    var n = this;
    var r = function(t) {
        if (!t.target) {
            t.target = t.srcElement
        }
        e.call(n, t, this)
    };
    if (t.addEventListener) {
        t.addEventListener("click", r, false)
    } else if (t.attachEvent) {
        t.attachEvent("onclick", r)
    }
};
BookingLockScreenUI.prototype.openMark = function() {};
BookingLockScreenUI.prototype.closeMark = function() {};
$jex.extendClass(OnewayFlightUI, FlightUI);
OnewayFlightUI.prototype.getRwstat = function() {
    return new RcmdWrStatProvider
};
OnewayFlightUI.prototype.avlistui = function() {
    if (!this._avlistui) {
        this._avlistui = new AVFlightVendorListUI;
        this._avlistui.owner(this)
    }
    return this._avlistui
};
OnewayFlightUI.prototype.listui = function() {
    if (!this._listui) {
        this._listui = new OnewayFlightVendorListUI;
        this._listui.owner(this)
    }
    return this._listui
};
OnewayFlightUI.prototype._getStaticUI = function(e) {
    var t = [],
        n = e;
    t.push('<div class="c0">&nbsp;</div>');
    t.push('<div class="c1">');
    t.push('<div class="vlc-wp"><div class="vlc-ref"></div><div class="vlc-con">');
    t.push(this._getOneFlightAirHTML(n));
    t.push("</div></div>");
    t.push("</div>");
    t.push('<div class="c2">');
    t.push(this._getDepHtml(n));
    t.push("</div>");
    t.push('<div class="c3">');
    var r = n.stopover();
    if (r) {
        t.push('<div class="bg-tm"><p class="bg bg-z"></p></div>')
    } else {
        t.push('<div class="bg-tm"><p class="bg"></p></div>')
    }
    t.push('<div class="a-zh-wp">');
    t.push('<div class="a-tm-be">' + n.dur() + "</div>");
    if (r) {
        var i = this._getStopHtmlInfo(n);
        if (i && i.tit) {
            t.push('<a class="a-zh-cont p-tip-trigger"' + ($jex.ie == 6 ? ' href="javascript:;"' : "") + ">");
            t.push(i.tit);
            t.push(this._getTipHTML('<p><span class="bold">经停</span></p>' + i.cont));
            t.push("</a>")
        }
    }
    t.push("</div>");
    t.push("</div>");
    t.push('<div class="c4">');
    t.push(this._getArriHtml(n, this._getDisanceDaysHtml(n)));
    t.push("</div>");
    t.push('<div class="c5">');
    t.push('<div class="vlc-wp"><div class="vlc-ref"></div><div class="vlc-con">');
    t.push('<div class="a-pty">' + n.quasipointRateHTML() + "</div>");
    t.push("</div></div>");
    t.push("</div>");
    this._html = t.join("");
    return this._html
};
OnewayFlightUI.prototype.update = function(e) {
    var t = e;
    var n = this.ownerFlightUI().isOnlySelBfCabinType();
    n && t.setWrapperListType("bf");
    this.entity = t;
    this.clear();
    this._homeNode = null;
    this.append("<div", "itemBar", ' class="avt-column');
    if (this.state()) {
        this.text(" avt-column-on ")
    } else if (this.clicked) {
        this.text(" avt-column-clicked")
    }
    this.text('">');
    this.text('<div class="b-avt-lst">');
    this.text(this._getStaticUI(t));
    this.append('<div class="c6">');
    this.append('<div class="vlc-wp"><div class="vlc-ref"></div><div class="vlc-con"', "recommandWrapper", ">");
    this.insert_recommandWrapper(t);
    this.text("</div></div>");
    this.text("</div>");
    this.append('<div class="c7">');
    this.append("<div", "lowPrice", 'class="a-price">');
    this.text(this.getPriceInfoHTML(t));
    this.text("</div>");
    this.insertBookingBtn(t);
    this.text("</div>");
    this.text("</div>");
    this.updateVendors(e);
    this.text("</div>");
    if ($jex.ie !== 6) return;
    this.onInit(function() {
        $jex.hover({
            act: this.find("itemBar"),
            onmouseover: function(e) {
                $jex.addClassName(this, "avt-column-hover")
            },
            onmouseout: function(e) {
                $jex.removeClassName(this, "avt-column-hover")
            }
        })
    })
};
OnewayFlightUI.prototype.updateLowestPrice = function() {
    this.find("lowPrice").innerHTML = this.getPriceInfoHTML(this.entity)
};
OnewayFlightUI.prototype.getPriceInfoHTML = function(e) {
    var t, n = this.ownerFlightUI().isOnlySelBfCabinType();
    if (n) {
        t = e.bfLowestPrice()
    } else {
        t = e.lowestPrice()
    }
    if (t && t == this._lastPrice && this._lastOnlySelBf == n) {
        return this._lastPriceHTML
    }
    this._lastPrice = t;
    this._lastOnlySelBf = n;
    var r = [];
    if (t && t != 1e5) {
        r.push('<div class="a-low-prc"><i class="rmb">&yen;</i>', Price_html_wide.getHTML(t), "</div>");
        !n && r.push('<div class="a-prc-ex">', PriceUtil.getOneWayDiscount(e.lowestDiscount()), "</div>")
    } else {
        r.push('<div class="a-prc-ex"><div>暂无报价</div></div>')
    }
    this._lastPriceHTML = r.join("");
    return this._lastPriceHTML
};
OnewayFlightUI.prototype._getTagsHtml = function() {
    var e = ["lcc", "lqf", "hot", "ps", "late"],
        t = ["廉航", "临起飞", "热门", "票少", "易晚点"];
    return function(n, r) {
        var i = [];
        var s = !this._sinfoHTML;
        var o = [];
        if (!this.sinfoCache) {
            var u = HotSale.hotSaleInfo(n),
                a = [];
            this.sinfoCache = u;
            this.tagCache = [];
            for (var f = 0; f < 5; f++) {
                if (u[e[f]]) {
                    a.push('<a class="tag-wp p-tip-trigger" ' + ($jex.ie == 6 ? 'href="javascript:;"' : "") + ">");
                    a.push('<i class="tag-name">', t[f], "</i>");
                    a.push(this._getTipHTML(u[e[f]]));
                    a.push("</a>");
                    s = false;
                    this.tagCache.push(t[f]);
                    break
                }
            }
            this._sinfoHTML = a.join("")
        }
        if (this._sinfoHTML) {
            i.push(this._sinfoHTML);
            o = this.tagCache.concat()
        }
        if (!n.isAV()) {
            var l = n.priceInfo();
            if (l && l.lpt != null) {
                var c = l.lpt;
                if (c == 1) {
                    s = false;
                    i.push('<a class="tag-wp"><i class="tag-name">头等舱</i></a>');
                    o.push("头等舱")
                } else if (c == 2) {
                    s = false;
                    i.push('<a class="tag-wp"><i class="tag-name">商务舱</i></a>');
                    o.push("商务舱")
                } else if (r) {
                    s = false;
                    i.push('<a class="tag-wp"><i class="tag-name">头等舱</i></a>');
                    o.push("头等舱")
                }
            }
        }
        n.showTag = o;
        _tagsHtmlStr = i.join("");
        if (_tagsHtmlStr) {
            _tagsHtmlStr = '<div class="a-tags">' + _tagsHtmlStr + "</div>"
        }
        return _tagsHtmlStr
    }
}();
OnewayFlightUI.prototype.insertBookingBtn = function(e) {
    var t = e;
    this.text('<div class="a-booking">');
    if (t.lowestPrice() && t.lowestPrice() != 1e5) {
        this.append("<a", "openwrapperbtn", ' data-evtDataId="' + this.newid("") + '"  hidefocus="on" onfocus="this.blur();" title="点击查看订票网站" href="#" class="btn-book"><i class="ico-arr"></i>订&nbsp;&nbsp;票</a>')
    } else {
        if (t.extInfo()) {
            this.append('<p class="c_vmore"><a', "openwrapperbtn", ' data-evtDataId="' + this.newid("") + '" onfocus="this.blur();"  href="#">详&nbsp;&nbsp;细</a></p>')
        }
    }
    this.text("</div>")
};
OnewayFlightUI.prototype.insert_recommandZyf = function(e) {
    function s(e, r, i) {
        var s = null;
        var o = t.lowestPrice();
        for (var u = 0, a = n.length; u < a; u++) {
            s = n[u];
            var f = parseInt(s.tPrice, 10);
            var l = f - o;
            if (s.airline === e && s.dpt === r && s.arr === i && l <= 0) {
                return s
            }
        }
        return null
    }
    var t = e;
    var n = t.commInfoMgr().get("zyfData") || [],
        r = t.flightInfoMgr(),
        i = "/zyf/?";
    var o = r.getZYFReference(t.code());
    if (!o && !r.getZYFAirlines(t.carrierCode())) {
        o = s(t.carrierCode(), t.deptAirportCode(), t.arriAirportCode())
    }
    if (o) {
        var u = !(t.lowestPrice() == null);
        var a = [i, "client=", o.client, "&policyId=" + (o.policyId || 0), "&price=", u ? t.lowestPrice() : "", "&dptDate=" + t.deptDate(), "&from=flightlist_", o.client].join("");
        this.text('<div class="c_zyf" data-carrier="', t.carrier().key, '">');
        this.append("<a", "js-zfy", "");
        this.text('target="_blank" href="', a, '">', o.text || "", "</a></div>");
        if (!r.getZYFReference(t.code())) {
            r.addZYFReference(t.code(), o)
        }
        if (!r.getZYFAirlines(t.carrierCode())) {
            r.addZYFAirlines(t.carrierCode(), 1)
        }
        this.onInit(function() {
            $jex.event.bind(this.find("js-zfy"), "click", function() {
                TsinghuaOneWayTracker.trackZFY(o, t)
            })
        })
    }
};
OnewayFlightUI.prototype.updateVendors = function(e) {
    this.append("<div", "vendorlist", "");
    if (!this.state()) {
        this.text(' style="display:none;" ')
    }
    this.text(">");
    var t = this.vendorListUI();
    if (this.state()) {
        t.dataSource(e);
        t.updateSource();
        this.append("", t, "")
    }
    this.text("</div>")
};
OnewayFlightUI.prototype.isAV = function() {
    return this.dataSource().isAV()
};
OnewayFlightUI.prototype.vendorListUI = function() {
    var e = this.isAV() ? this.avlistui() : this.listui();
    return e
};
OnewayFlightUI.prototype.renderVendorPanel = function() {
    var e = this.vendorListUI();
    e.update(this.dataSource());
    e.render(this.find("vendorlist"))
};
OnewayFlightUI.prototype.changeWrapperTypeList = function(e) {
    if (this.state() == 0) {
        return
    }
    e === "bf" && $jex.log({
        s: "flight",
        p: "onewayList",
        r: "staticLink",
        type: "fcabinTabClick"
    });
    PAGE_EVENT.trigger("wrapper_list_close", this.dataSource());
    this.dataSource().setWrapperListType(e);
    this._isUserClick = true;
    this.renderVendorPanel();
    this._isUserClick = false
};
OnewayFlightUI.prototype.openBtnClickEvent = function() {
    var e = this;
    HoldLastShowFlight.clearLast();
    $jex.event.trigger(e.ownerFlightUI(), "willOpenFui", e);
    LockScreen(function() {
        SingletonUIManager.register("flight", e, function() {
            e.toggleVendorPanel()
        }, function() {
            e.hideVendorPanel()
        })
    })
};
OnewayFlightUI.prototype.toggleVendorPanel = function() {
    if (this.state() === 0) {
        if (this._isUserClick) {
            _logWrapperOpen();
            this.clicked = true
        }
        System.service.genTraceTimeStamp();
        System.analyzer.triggerTrace = true;
        var e = this.ownerFlightUI().isOnlySelBfCabinType();
        this.dataSource().setWrapperListType(e ? "bf" : "all");
        this.showVendorPanel()
    } else {
        this.hideVendorPanel()
    }
};
OnewayFlightUI.prototype.showVendorPanel = function() {
    var e = this.entity;
    this.moveToFirst();
    this.renderVendorPanel();
    $jex.addClassName(this.find("itemBar"), "avt-column-on");
    $jex.element.show(this.find("vendorlist"));
    if (e && e.isPriceLock()) {
        this.update(e)
    }
    $jex.event.trigger($jex.$("hdivResultPanel"), "fem_openWrapperList");
    this.state(1);
    $jex.event.trigger(this, "open")
};
OnewayFlightUI.prototype.hideVendorPanel = function() {
    if (this.state() === 0) return;
    $jex.element.hide(this.find("vendorlist"));
    $jex.removeClassName(this.find("itemBar"), "avt-column-on");
    $jex.event.trigger($jex.$("hdivResultPanel"), "fem_closeWrapperList");
    this.listui().reset();
    this.state(0);
    this.clicked && $jex.addClassName(this.find("itemBar"), "avt-column-clicked");
    PAGE_EVENT.trigger("wrapper_list_close", this.dataSource());
    $jex.event.trigger(this, "close")
};
OnewayFlightUI.prototype.register = function() {
    var e = this;
    SingletonUIManager.register("flight", e, function() {
        e.showVendorPanel()
    }, function() {
        e.hideVendorPanel()
    })
};
OnewayFlightUI.prototype.insert_recommandWrapper = function(e, t) {
    function c() {
        var e = n.find("reCommOtaTip");
        $jex.event.bind(e, "click", function(e) {
            e = e || window.event;
            e.stopPropagation && e.stopPropagation();
            evenr.cancelBubble = true
        })
    }
    e = e || this.entity;
    var n = this;
    if (t) {
        this.clear()
    }
    if (!t && this.isAV()) {
        this.text("&nbsp;");
        return
    }
    var r = this.reWrCache,
        i = e.getRecommandWrapper() || r;
    if (!i) {
        this.text("&nbsp;");
        return
    }
    this.reWrCache = i;
    var s = i.entity,
        o = s.afeePrice() || s.bprPrice(),
        u = s.dataSource(),
        a = s.isOta();
    var f = s.isADVendor() ? u.proPayName : u.proName;
    this.append('<a class="a-rec' + (a ? " p-tip-trigger" : "") + '" hidefocus="on" ' + ($jex.ie == 6 ? 'href="javascript:;" ' : ""), "reWrBtn", '  data-evtDataId="' + this.newid("") + '">');
    this.append('<span class="rec-name">');
    this.text(f, "</span>");
    this.text('<span class="rcpr"><i class="rmb">&yen;</i>', o, "</span>");
    if (a) {
        var l = "" + '<p><span class="bold">商旅优选</span></p>' + "<p>出票迅速：支付后极速出票</p>" + "<p>报销无忧：起飞后可邮寄行程单" + "<p>服务优先：7*24小时全天候服务</p>";
        this.append(this._getTipHTML(l, "reCommOtaTip"));
        if (!t) {
            this.onInit(function() {
                this.onInit(function() {
                    c()
                })
            })
        }
    }
    this.text("</a>");
    if (t) {
        this.find("recommandWrapper").innerHTML = this.toString();
        if (s.isOta()) {
            c()
        }
    }
};
var RcmdWrStatProvider = function() {};
RcmdWrStatProvider.prototype.value = function() {
    return "000002"
};
$jex.extendClass(AVFlightVendorListUI, XControl);
AVFlightVendorListUI.prototype.update = function(e) {
    this.clear();
    this.text('<div class="b-qvt-lst b-qvt-lst-avf">');
    this.text('<div class="e-qvt-hd">');
    this.extui.dataSource(e);
    this.extui.updateSource();
    this.text('<div class="c_fly">');
    this.append("", this.extui, "");
    this.text("</div>");
    this.text("</div>");
    this.text("</div>")
};
$jex.extendClass(VendorListUI, XControl);
VendorListUI.prototype.createHongbaoHtml = function(e) {
    var t = [];
    t.push("<a target='_blank' href='http://quan.qunar.com/bonus/social/w/requestBonus?sourceID=flight_search'><div class='hongbao'>");
    t.push("<div class='hongbaoicon'></div>");
    t.push("<div class='hongbaotext'>领APP支付专享红包，每单最高立减<span><i>&yen;</i>80<em>！</em></span></div>");
    t.push("<div class='hongbaobtn'><span>领红包</span></div>");
    t.push("</div></a>");
    return t.join("")
};
$jex.extendClass(OnewayFlightVendorListUI, VendorListUI);
OnewayFlightVendorListUI.prototype.reset = function() {
    this.wrlistUI.resetInvokeData();
    this.mainWrlistUI.resetInvokeData()
};
OnewayFlightVendorListUI.prototype.insert_header = function(e, t) {
    var n = t.getWrapperHdHolder();
    if (n && e.getWrapperListType() == "all" && !t.isMainFlight()) {
        n.innerHTML = this.createHongbaoHtml(e)
    }
};
OnewayFlightVendorListUI.prototype.update = function(e) {
    var t = e,
        n = t.codeShare(),
        r = t.codeShareFlight();
    t._shareFlight = null;
    if (n && r) {
        var i = t.carrierCode();
        var s = r.carrierCode();
        r.setWrapperListType(e.getWrapperListType());
        r._shareFlight = t;
        this.wrlistUI.applyShareCodeRule(i, s);
        var o = this.mainWrlistUI.applyShareCodeRule(i, s);
        if (o) {
            this.onInit(function() {
                $jex.element.show(this.find("hdivCS"))
            })
        }
    }
    this.clear();
    this.text('<div class="b-qvt-lst">');
    this.insertVendorTypeChange(e);
    this.wrlistUI.dataSource(e);
    this.wrlistUI.updateSource();
    this.wrlistUI.placeHolder();
    this.wrlistUI.insert_footer(e);
    if (n && r) {
        this.append("<div ", "hdivCS", ' class="mainFlist" style="display:none;z-index:2;position: relative;">');
        this.text('<div class="qvt_col_more qvt_col_more_hover mainflist-tit">该航班为代码共享航班，主飞航班为<span class="hl"><em>', r.carrier().zh, "</em>", n, "</span>，参考报价如下：</div>");
        this.mainWrlistUI.dataSource(t.codeShareFlight());
        this.mainWrlistUI.updateSource();
        this.mainWrlistUI.placeHolder();
        this.text("</div>")
    }
    this.text('<div class="qvt_col_hide">');
    this.append("<a ", "btnHide", '  data-evtDataId="' + this.newid("") + '" class="lnk_more lnk_more_hd"  href="##"><i class="ico_down"></i></a>');
    this.text("</div>");
    this.text("</div>");
    this.append("<div", "extAd_panel", ' class="extAD"></div>');
    this.onInit(function() {
        var t = this;
        this.insert_header(e, this.wrlistUI);
        clearTimeout(t._ad_timer);
        t._ad_timer = setTimeout(function() {
            var e = t.newid("extAd");
            var n = t.find("extAd_panel");
            if (n) n.innerHTML = '<iframe id="' + e + '" querystring="chan=flight&pg=list&pos=mid&site=qunar&size=912x90" scrolling="no" frameborder="0" height="0" width="100%" src="/site/adframe/ad.html#' + e + '#now"></iframe>'
        }, 100)
    })
};
OnewayFlightVendorListUI.prototype.insertExtInfo = function(e) {
    if (e.extInfo()) {
        this.extui.dataSource(e);
        this.extui.updateSource();
        this.text('<div class="c_fly">');
        this.append("", this.extui, "");
        this.text("</div>")
    }
};
OnewayFlightVendorListUI.prototype.updateLowerPriceShow = function(e, t) {
    var n = this.owner().newid("");
    var r = new UIObject;
    var i = e.getWrapperListType("all");
    var s = function(e, t, s, o) {
        r.append("<li ", "js_ctype-" + e, "");
        r.text('data-ctype="', e, '" data-evtDataId="' + n + '" ');
        r.text(i == e ? ' class="cur">' : ">", s);
        r.append("<span", "js-" + e + "_lpr", ">");
        r.text('(<a href="##" class="q_prc"><i class="rmb">¥</i>', t, "</a>起)");
        r.text("</span></li>")
    };
    r.text("<ul>");
    var o = [],
        u = [];
    $jex.foreach(["all", "bf"], function(t) {
        var n = e.getLowpr(t);
        if (n) {
            o.push(t);
            u.push(n)
        }
    });
    this.tabsCache = {
        show: o,
        price: u,
        tab: i
    };
    var a = {
        all: "全部报价",
        bf: "头等/商务舱"
    };
    $jex.foreach(o, function(e, t) {
        s(e, u[t], a[e], t == o.length - 1)
    });
    r.text("</ul>");
    if (t && this.find("js-vtype-tab") != null) {
        r.write(this.find("js-vtype-tab"))
    }
    return r
};
OnewayFlightVendorListUI.prototype.insertVendorTypeChange = function(e) {
    this.append("<div ", "js-vType_wrap", ' class="e-qvt-hd">');
    this.append("<div", "js-vtype-tab", ">");
    if (e.priceInfo()) {
        var t = this.updateLowerPriceShow(e);
        t && this.append("", t, "")
    }
    this.text("</div>");
    this.insertExtInfo(e);
    this.text("</div>")
};
$jex.extendClass(WrapperListUI, XControl);
WrapperListUI.prototype.placeHolder = function() {
    var e = this.ownerVendorListUI();
    e.append('<div class="wrapper-list-outer">');
    e.append("<div ", this.wrapperHeadId, 'class="wrapper-list-header"></div>');
    e.append("<div", this.placeHolderId, ' class="e-qvt-ct" style="*zoom: 1;*position: relative;*z-index: 3;">');
    e.append("", this, "</div>");
    e.append("</div>")
};
WrapperListUI.prototype.getWrapperHdHolder = function() {
    var e = this.ownerVendorListUI();
    return e.find(this.wrapperHeadId)
};
WrapperListUI.prototype.getHolder = function() {
    var e = this.ownerVendorListUI();
    return e.find(this.placeHolderId)
};
WrapperListUI.prototype.update = function(e) {
    this.updateSourceEntity(e)
};
WrapperListUI.prototype.filterWrappers = function(e, t) {
    var n = [];
    for (var r = 0; r < e.length; r++) {
        var i = t._map[e[r]];
        if (!(i && i.isRoundFlight && i.isRoundFlight())) n.push(e[r])
    }
    return n
};
WrapperListUI.prototype.splitWrappers = function(e, t) {
    var n = [];
    var r = [];
    for (var i = 0; i < e.length; i++) {
        var s = t._map[e[i]];
        if (s && s.isRoundFlight && s.isRoundFlight()) n.push(e[i]);
        else r.push(e[i])
    }
    return {
        roundList: n,
        singleList: r
    }
};
WrapperListUI.prototype.getSortKey = function() {
    return this._sortType
};
WrapperListUI.prototype.setSortKey = function(e) {
    return this._sortType = e
};
WrapperListUI.prototype.flushRendor = function() {
    this.render(this.getHolder())
};
WrapperListUI.prototype.updateSourceEntity = function(e, t) {
    this.clear();
    clearTimeout(this._drawTimer);
    var n = this;
    var r = e.wrappers();
    r.update();
    var i = t;
    var s = r.sort(this.getSortKey());
    var o = n.splitWrappers(s, r, e);
    s = n.filterWrappers(o.singleList, r, e);
    this._checkLowPriceOTA && this._checkLowPriceOTA(e, s);
    if (i && "all" == e.getWrapperListType()) {
        roundList = o.roundList;
        for (var u = 0; u < roundList.length; u++) {
            if (r._map[roundList[u]].price() && r._map[roundList[u]].price() <= r._map[roundList[u]].ownerFlight().lowestPrice()) s.push(roundList[u])
        }
    }
    var a = 0,
        f = s.length,
        l = 0;
    var c = s.length + 100;
    this.firstIndex = c;
    this.zIndex = c;
    e.hasShownInsTip = false;
    if (e.transShownInsTip) {
        e.hasShownInsTip = true
    }
    var h = function(t) {
        if (!t) n.clear();
        for (; a < f; a++) {
            var i = r.get(s[a]);
            if (!i) {
                $jex.console.error("[WrapperListUI update] 找不到指定的wrapperEntity, key:", s[a], n);
                return $jex.$continue
            }
            if (!e.hasShownInsTip && i.afeeInsSum() && i.afeePrice() && !i.isNotWork() && !(i.coupon() > 0 && i.bprPrice())) {
                e.hasShownInsTip = true;
                i.showInsTip(true)
            }
            n._addWrapperUI(e, i, a)
        }
    };
    clearTimeout(this._drawTimer);
    h(true);
    $jex.console.end("[WrapperListUI update] addwrappers");
    $jex.console.trace("[WrapperListUI update] addwrappers 个数：" + r.size());
    $jex.console.trace("[WrapperListUI update] addwrappers 传送个数：" + r._size);
    if (t) {
        this.onInit(function() {
            this.ownerVendorListUI().updateLowerPriceShow(e, true)
        })
    }
    this._traceWrappers(e)
};
WrapperListUI.prototype._traceWrappers = function(e) {
    TsinghuaOneWayTracker.trackWrappers(e)
};
WrapperListUI.prototype.eachWrappers = function(e) {
    $jex.foreach(this._wrUIcache, function(t) {
        e(t)
    })
};
WrapperListUI.prototype.createWrapperUI = function() {
    $jex.console.error("请替换该方法, WrapperListUI.prototype.createWrapperUI")
};
WrapperListUI.prototype._addWrapperUI = function(e, t, n) {
    var r = e.key() + "^" + t.key();
    var i = this._wrUIcache[r];
    if (!i) {
        i = this.createWrapperUI(e, t, n);
        i.ownerListUI(this);
        this._wrUIcache[r] = i
    }
    if (i && i.stat && i.stat.position) {
        i.stat.position(n + 1)
    }
    i.updateSource(t);
    this.append("", this._wrUIcache[r], "")
};
$jex.extendClass(OnewayFlightWrapperListUI, WrapperListUI);
OnewayFlightWrapperListUI.prototype.updateSourceEntity = function(e) {
    OnewayFlightWrapperListUI.superclass.updateSourceEntity.call(this, e, !this.isMainFlight())
};
OnewayFlightWrapperListUI.prototype._checkLowPriceOTA = function(e, t) {
    if (this.isMainFlight()) {
        return
    }
    try {
        var n = e.wrappers();
        var r = e.lowestPrice();
        var i = false;
        var s = [];
        var o = e.flightInfoMgr();
        var u = e.commInfoMgr();
        if (o && o.getStore().my_wrappInfo) {
            var a = o.getStore().my_wrappInfo[e.key()];
            if (a) {
                for (var f in a) {
                    var l = u.get("vendor", a[f].wrid);
                    if (!l) {
                        s.push(a[f].wrid)
                    }
                }
            }
        }
        var c = [];
        for (var h = 0; h < t.length; h++) {
            var p = n.get(t[h]);
            var d = p.afeePrice() || p.bprPrice();
            c.push([t[h], p.dataSource().pr, p.dataSource().bpr, d].join("~"));
            if (d === r) {
                i = true
            }
        }
        if (!i) {
            var v = new Image;
            var m = "http://log.flight.qunar.com/l.gif?" + "s=flight&p=onewayList&r=lowPriceOTANotRender&flightCode=" + e.key();
            m += "&lowestPrice=" + r;
            m += "&priceList=" + encodeURIComponent(c.join("!"));
            m += "&noVendorInfoID=" + s.join("!");
            v.src = m
        }
    } catch (g) {}
};
OnewayFlightWrapperListUI.prototype.resetInvokeData = function() {
    this.invokeDataStatus = 0
};
OnewayFlightWrapperListUI.prototype.createWrapperUI = function(e, t, n) {
    var r = t.vendor();
    var i = t.getCarrierCo();
    if (r.isDirect() || r.isOffical()) {
        return new FlagshipOnewayFlightWrapperUI
    }
    if (t.isYoufeiDai()) {
        return new YouFeiDaiOnewayFlightWrapperUI
    }
    if (t.isOta() || t.isNewOta()) {
        return new OtaOnewayFlightWrapperUI
    }
    if (t.isFreeMan()) {
        return new FreeManOnewayFlightWrapperUI
    }
    if (t.isZYXWrapper()) {
        return new ZiyouxingOnewayFlightWrapperUI
    }
    if (t.isFcCabinProduct()) {
        return new FcCabinOnewayFlightWrapperUI
    }
    if (t.isBcCabinProduct()) {
        return new BcCabinOnewayFlightWrapperUI
    }
    if (t.isFpCabinProduct()) {
        return new FpCabinOnewayFlightWrapperUI
    }
    if (t.isPeCabinProduct()) {
        return new PeCabinOnewayFlightWrapperUI
    }
    if (t.isYoufei()) {
        return new YouFeiOnewayFlightWrapperUI
    }
    if (t.isNewPrivilege()) {
        if ((i == "ca" || i == "cz" || i == "fm" || i == "mu") && t.isPgPrivilege()) {
            return new OnewayFlightWrapperUI
        }
        return new TcabinOnewayFlightWrapperUI
    }
    if (t.isPriceKing()) {
        return new PriceKingOnewayFlightWrapperUI
    }
    return new OnewayFlightWrapperUI
};
OnewayFlightWrapperListUI.prototype.getMaxCount = function(e) {
    var t = ConfigManager.getConfig("pageId") == "onewayDetail";
    if (t) {
        return 1e7
    }
    var n = 18;
    var r = e.carrier();
    var i = r ? r.maxvendors || n : n;
    return i
};
OnewayFlightWrapperListUI.prototype.insert_footer = function(e) {
    var t = e.getWrapperListType();
    var n = e.getLowpr(t),
        r = e.getHipr(t);
    var i = e.getWrlen(t);
    var s = e.wrappers().size();
    if (i > 1) {
        this.text('<div class="qvt_col_more qvt_col_more_hover">');
        if (i >= 11 || s < i) {
            this.append("<a ", "gotoDetail", 'data-evtdataid="' + this.newid("") + '" data-gotype=' + " nowType " + ' hidefocus="true" class="lnk_more" href="##">更多报价<i class="ico_arr_more"></i></a>')
        }
        this.text('共有<em class="highlight">', i, "</em>个代理商报价");
        if (n) {
            this.text("，报价");
            if (n != r) {
                this.text("范围 ")
            }
            this.text('<i class="rmb">&yen;</i>', n);
            if (r && n != r) {
                this.text(' ~ <i class="rmb">&yen;</i>', r)
            }
        }
        this.text("</div>")
    }
};
OnewayFlightWrapperListUI.prototype.getWrapperFormEntity = function(e) {
    var t = this,
        n = e.key();
    clearTimeout(this._drawTimer);
    clearTimeout(this._ladingTimer);
    this._drawMoreWrapper = null;
    var r = 0;
    var i = this.ownerVendorListUI().owner()._isUserClick;
    var s = this.ownerVendorListUI().owner()._openBtnClick;
    PAGE_EVENT.trigger("wrapper_list_open", e);
    e.getCurWrapperList({
        isUserClick: i,
        isMainFlight: this.isMainFlight(),
        loading: function() {
            r = (new Date).valueOf();
            $jex.console.start("航班价格接口调用[" + n + "]");
            t.loadingPanel(e)
        },
        loadBack: function() {
            t.updateSourceEntity(e);
            if (e.getWrapperListType() == "all") {
                TsinghuaOneWayTracker.trackLowPrChange(e, 0)
            }
            var i = e.wrappers();
            if (i.wrapperLength() === 0) {
                TsinghuaOneWayTracker.noWrapperList(e)
            }
            e.lowestPrice(e.priceInfo().lowpr);
            e.bfLowestPrice(e.priceInfo().bflowpr);
            if (e.type === "oneway") {
                window.DomesticOnewayDataAnalyzer && DomesticOnewayDataAnalyzer.lowestOneway(e)
            } else if (e.type === "compose") {
                window.DomesticOnewayDataAnalyzer && DomesticOnewayDataAnalyzer.lowestCompose(e)
            }
            t.ownerVendorListUI().owner().updateLowestPrice();
            t.ownerVendorListUI().owner().insert_recommandWrapper(undefined, true);
            $jex.event.trigger(PAGE_EVENT, "lowPriceChange");
            t.insert_footer(e);
            clearTimeout(t._ladingTimer);
            var o = (new Date).valueOf() - r;
            var u = s ? 0 : 250;
            if (o < u) {
                t._ladingTimer = setTimeout(function() {
                    t.render(t.getHolder())
                }, u - o)
            } else {
                t.render(t.getHolder())
            }
            $jex.console.end("航班价格接口调用[" + n + "]")
        },
        callBack: function() {
            $jex.console.start("航班价格缓存调用[" + n + "]");
            e.syncCurrentFlightCode();
            t.updateSourceEntity(e);
            $jex.console.end("航班价格缓存调用[" + n + "]")
        }
    })
};
OnewayFlightWrapperListUI.prototype.update = function(e) {
    this.clear();
    this.getWrapperFormEntity(e)
};
OnewayFlightWrapperListUI.prototype.applyShareCodeRule = function(e, t) {
    this.enableShareCode = true;
    if (this.isMainFlight()) {
        this.filterWrappers = OnewayFlightWrapperListUI.filterWrappers_mainCode
    } else {
        this.filterWrappers = OnewayFlightWrapperListUI.filterWrappers_shareCode
    }
    return this.enableShareCode
};
OnewayFlightWrapperListUI.prototype.cancelShareCodeRule = function(e, t) {
    this.enableShareCode = false
};
OnewayFlightWrapperListUI.prototype.loadingPanel = function(e) {
    this.text('<div class="qvt_loadding"><img style="text-align:center;" src="http://simg1.qunarzz.com/site/images/new_main/m_loading.gif" /></div>')
};
OnewayFlightWrapperListUI.filterWrappers_shareCode = function(e, t, n) {
    if (!this.enableShareCode) return e;
    if (ConfigManager.getConfig("pageId") == "onewayDetail") return e;
    var r = [];
    var i = ConfigManager.getConfig("OnewayListShareConfig", "shareCodeNum");
    $jex.foreach(e, function(e) {
        var n = t.get(e);
        if (!n.isNotWork()) {
            r.push(e);
            if (r.length === i) return $jex.$break
        }
    });
    this._insertLowestPrice(n, r);
    return r
};
OnewayFlightWrapperListUI.prototype._insertLowestPrice = function(e, t) {
    var n = e;
    var r = n.lowestWrapperIds()[0];
    var i = n.lowestBprWrapperIds()[0];
    this._pushLowestPrice(e, t, r);
    if (r === i) {
        return
    }
    this._pushLowestPrice(e, t, i)
};
OnewayFlightWrapperListUI.prototype._pushLowestPrice = function(e, t, n) {
    var r = e;
    if ($jex.array.indexOf(t, n) < 0 && r.wrappers().get(n)) {
        t.push(n)
    }
};
OnewayFlightWrapperListUI.filterWrappers_mainCode = function(e, t) {
    if (ConfigManager.getConfig("pageId") == "onewayDetail") return e;
    var n = ConfigManager.getConfig("OnewayListShareConfig", "mainCodeNum");
    e = n && n < e.length ? e.slice(0, n) : e;
    return e
};
OnewayFlightWrapperListUI.clearWrappers_notwork = function(e, t, n) {
    var r = [];
    $jex.foreach(e, function(e) {
        var n = t.get(e);
        if (!n.isNotWork()) {
            r.push(e)
        }
    });
    if (n) r = r.slice(0, n);
    return r
};
$jex.extendClass(OnewayFlightWrapperUI, WrapperUI);
OnewayFlightWrapperUI.prototype.update = function(e) {
    try {
        var t = e;
        var n = this.ownerListUI().zIndex,
            r = this.ownerListUI().firstIndex;
        var i = "";
        if (r == n) {
            i += " qvt-column-first";
            this._isFrist = true
        }
        if (this.ownerListUI()._onlyOne) {
            i += " qvt-column-only"
        }
        if (!t.isShowAfee()) {
            i += " qvt-column-hideAfee"
        }
        this.clear();
        this.set_bookingInfo(t);
        this.append("<div", "flightbar", "");
        this.text(' data-evtDataId="', this.newid(""), '"' + "wid=", '"', e.wrapperId(), '" class="', this._itemClass, i, '">');
        this.zIndex = this.ownerListUI().zIndex;
        this.ownerListUI().zIndex--;
        this.insert_vendorInfo(t);
        this.insert_labelInfo(t);
        this.insert_tgqInfo(t);
        this.insert_PRICE(t);
        this.insert_insureInfo(t);
        this.insert_priceLable(t);
        this.insert_BOOKING_BUTTON(t);
        this.text("</div>");
        this._bindHoverEvent(t)
    } catch (t) {
        this.logError(t, e)
    }
};
OnewayFlightWrapperUI.prototype.logError = function(e, t) {
    var n = new Image;
    var r = e.message;
    var i = [this._type, t.wrapperId()];
    var s = t.ownerFlight() && t.ownerFlight().code();
    i.push(s);
    n.src = "http://log.flight.qunar.com/l.gif?s=flight&p=onewayList&r=wrapperListError&errormsg=" + encodeURIComponent(r) + "&info=" + encodeURIComponent(i.join("|"))
};
OnewayFlightWrapperUI.prototype.set_bookingInfo = function(e) {
    var t = e;
    this.bookingScreenUI.setVendorInfo(t.wrapperId(), t.vendor().dataSource());
    this.bookingLockScreenUI.setEntity(t);
    this.bookingLockScreenUI.setVendorInfo(t.wrapperId(), t.vendor().dataSource())
};
OnewayFlightWrapperUI.prototype.insert_vendorInfo = function(e) {
    var t = e;
    this.text('<div class="v0 clrfix">');
    this.insertVenderName(t);
    this.text("</div>")
};
OnewayFlightWrapperUI.prototype.insertVenderName = function(e) {
    var t = e;
    var n = {
        vendorName: t.vendorName(),
        imgUrl: this._imgUrl ? this._imgUrl : "http://simg1.qunarzz.com/site/images/flight/flight_search/cpc_logo.png"
    };
    var r = $jex.template(['<div class="t-name">', '<%if( imgUrl ){%><img class="t-vendor-icon" src="<%= imgUrl%>" width="22" height="17"><%}%>', '<span class="t-vendor-name"><%= vendorName%></span>', "</div>"].join(""));
    this.text(r(n))
};
OnewayFlightWrapperUI.prototype.insertStarInfo = function(e) {
    var t = e;
    this.text('<div class="t-cmt">');
    this.starUI.displayPanel(t);
    this.text("</div>")
};
OnewayFlightWrapperUI.prototype.insert_tgqInfo = function(e) {
    var t = 0;
    var n = e;
    var r = this._GID_;
    var i, s, o, u;
    o = "退改签";
    s = e.pid() == null ? this.getDefaultTGQInfo(e) : '<img class="p-tips-tgq-img" src="http://simg1.qunarzz.com/site/images/new_main/m_loading.gif" />';
    u = {
        stopClickId: "js-stopClick" + r,
        tgqId: "tgq" + r,
        tgqText: o,
        tgqPanelId: "tgq_notice_panel" + r,
        tgqContentId: "tgq_notice" + r,
        tgqContent: s,
        niceTgq: n.isNiceTgq()
    };
    this.text('<div class="v1">');
    if (this.getDefaultTGQInfo(e)) {
        i = $jex.template(['<div id="<%= stopClickId %>" class="v-tgq">', '<div class="v-tgq-tit" id="<%= tgqId %>"><%= tgqText %></div>', '<div class="p-tips-cont" id="<%= tgqPanelId %>">', '<div class="p-tips-wrap">', '<div class="p-tips-arr p-tips-arr-t" >', '<p class="arr-o">◆</p><p class="arr-i">◆</p>', "</div>", '<div class="p-tips-content" id="<%= tgqContentId %>" >', "<%= tgqContent %>", "</div>", "</div>", "</div>", "</div>", "<%if(niceTgq){%>", '<a class="v-prefer p-tip-trigger" ' + ($jex.ie != 6 ? "" : 'href="javascript:;"') + ">", '<span class="v-prefer-tit"></span>', this._getTipHTML("退改签费用低"), "</a>", "<%}%>"].join(""));
        this.text(i(u));
        t = 1
    }
    if (t === 0) this.text("&nbsp");
    this.text("</div>");
    this.bind_tgqEvent(n)
};
OnewayFlightWrapperUI.prototype.bind_tgqEvent = function(e) {
    var t = e;
    var n = this;
    this.onInit(function() {
        n.loadedTgq = false;
        var e = n.find("tgq");
        var r = false;
        if (e) {
            var i = n.find("tgq_notice_panel");
            $jex.hover({
                act: e,
                extra: [n.find("tgq_notice_panel")],
                onmouseover: function(s) {
                    if (r) {
                        return
                    }
                    if (!n.loadedTgq) {
                        n.requestTgq(n, t)
                    }
                    $jex.addClassName(e, "v-tag-hover");
                    $jex.element.show(i);
                    $jex.event.trigger($jex.$("hdivResultPanel"), "fem_showTGQ");
                    r = true
                },
                onmouseout: function(t) {
                    r = false;
                    $jex.element.hide(i);
                    $jex.removeClassName(e, "v-tag-hover")
                }
            })
        }
    })
};
OnewayFlightWrapperUI.prototype.requestTgq = function(e, t) {
    var n = t;
    var r = e,
        i = n.isYoufei(),
        s = n.lijian();
    var o = "/twell/flight/getTGQ.jsp";
    var u = n.ownerFlight();
    var a = r.find("tgq_notice");
    var f = "";
    var l = n.fanxian();
    var c = n.isPlus();
    var h = true;
    var p = Math.max(n.afeePrice(), n.bprPrice());
    var d = Math.min(n.afeePrice() || Number.MAX_VALUE, n.bprPrice() || Number.MAX_VALUE);
    var v = t.isFcCabinProduct() || t.isBcCabinProduct() || t.isFpCabinProduct() || t.isPeCabinProduct();
    var m = n.dataSource().tgqKey || 0;
    if ((s || l) && c && !(i && s)) {
        p = s ? p + s : p;
        d = s ? d + s : d;
        h = false
    }
    if ((n.isPriceKing() || n.isPgOta() || n.dataSource().type == "nclpf" || n.dataSource().type == "tnlpf" || v) && n.tgqpr()) {
        p = n.tgqpr()
    }
    var g = this.find("tgq");
    var y = this.getDefaultTGQInfo(n);
    $jex.jsonp(o, {
        flightNum: u.flightInfo().co,
        deptAirport: u.deptAirport().code,
        arrAirport: u.arriAirport().code,
        deptDate: u.deptDate().replace(/-/g, ""),
        printPrice: n.parValue(),
        wrapperId: n.wrapperId(),
        cabin: n.cabin(),
        policyId: n.pid(),
        maxSellPrice: p,
        minSellPrice: d,
        tag: n.tag(),
        b2bpf: n.b2bpf(),
        isTHFXLow: h,
        groupId: n.groupId(),
        sourceType: n.sourceType(),
        policyPriceType: m
    }, function(e) {
        r.loadedTgq = true;
        r.logQrcode(n, "floatboxshow", {
            type: "get-tgq"
        });
        if (!e || e && !e.tgqAdult) {
            a.innerHTML = y;
            return
        }
        f = e.tgqAdult;
        a.innerHTML = r.getFullTgqStr(e, n)
    }, {
        timeout: {
            time: 2e3,
            func: function() {
                if (!f) a.innerHTML = y
            }
        }
    })
};
OnewayFlightWrapperUI.prototype.getTgqStr = function(e, t) {
    var n = t;
    var r = 0,
        i, s = e.tgqAdult,
        o = s.timePointCharges,
        u = [],
        a = [],
        f = [],
        l = null;
    var c = "",
        h = "",
        p = '<span class="f_thm"><i class="rmb">¥</i>',
        d = "/人</span>";
    var v = [];
    o && (i = o.length);
    if (s.viewType == 1 && i > 0) {
        s.adultTgq = {};
        for (; r < i; r++) {
            l = o[r];
            c = l.changeFee == -1 ? "不可改期" : p + l.changeFee + d;
            h = l.returnFee == -1 ? "只退机建和燃油" : p + l.returnFee + d;
            u.push("<p>", l.timeText, "</p>");
            a.push("<p>", h, "</p>");
            f.push("<p>", c, "</p>")
        }
        v.push('<table class="tbl-tgq-tip">', '<tr class="nw">', s.hasTime ? "<th>退改签时间点</th>" : "", "<th>退票扣费</th><th>改期加收手续费</th><th>签转</th></tr>", '<tr class="nw">');
        s.hasTime && v.push('     <td class="c1 nw">', u.join(""), "</td>");
        v.push('     <td class="c2 nw">', a.join(""), "</td>");
        v.push('     <td class="c3 nw">', f.join(""), "</td>");
        v.push('     <td class="c4 nw">', s.signText, "</td>");
        v.push("<tr>");
        v.push("</table>");
        v.push('<div class="extra-tip">以上为成人退改签费用标准</div>')
    } else {
        if (s.tgqText) {
            v.push(s.tgqText);
            v.push("<br/><i>*</i>仅供参考,以订单标注的退改签规定为准。")
        }
    }
    return this.getTgqAfterFix(t, v.join(""))
};
OnewayFlightWrapperUI.prototype.getTgqAfterFix = function(e, t) {
    return t
};
OnewayFlightWrapperUI.prototype.getFullTgqStr = function(e, t) {
    var n = e.tgqAdult;
    var r = this.getTgqStr(e, t);
    var i = "";
    if ((n || {}).tgqPercentText) {
        i = '<p class="tgq-tail">' + "舱位(" + n.tgqCabin + ')：票面<i class="rmb">&yen;</i>' + n.basePrice + "<br/>" + n.tgqPercentText + "</p>"
    }
    return r + i
};
OnewayFlightWrapperUI.prototype.getDefaultTGQInfo = function(e) {
    return e.getTGQInfo()
};
OnewayFlightWrapperUI.prototype.insert_labelInfo = function(e) {
    var t = e;
    var n = [];
    try {
        n = this.getLabels(t);
        n = this.sortLabels(n, 3)
    } catch (t) {
        n = []
    }
    this.createLabelUI(n, t);
    this.bind_labelEvent(t)
};
OnewayFlightWrapperUI.prototype.getLabels = function(e) {
    var t = e;
    var n = t.vendor();
    var r = [];
    var i = {};
    var s = ConfigManager.getConfig("OnewayListLabels");
    if (t.isAllDays()) {
        var o = s["allDays"];
        o.content = this._getTipHTML("7*24小时服务");
        r.push(o)
    }
    if (t.isFreePostage()) {
        var u = s["freePostage"];
        u.content = this._getTipHTML("报销凭证免费快递");
        r.push(u)
    }
    return r
};
OnewayFlightWrapperUI.prototype._getCarLabels = function(e, t) {
    var n = t;
    var r = ConfigManager.getConfig("OnewayListLabels");
    var i = r["pickCar"];
    i.content = this._getTipHTML('<img class="p-tips-tgq-img" src="http://simg1.qunarzz.com/site/images/new_main/m_loading.gif" />', "pickCarPanel", "pickCarContent");
    i.needAjax = true;
    e.push(i);
    return e
};
OnewayFlightWrapperUI.prototype._getYoufeiCoinTip = function() {
    if (this._cache["YoufeiCoinTip"]) {
        return this._cache["YoufeiCoinTip"]
    }
    var e = ["<p>优飞币专享活动说明：</p>", "<p>1. 购买“优飞币专享”促机票产品，1优飞币可抵1元现金。</p>", "<p>* 如所拥有优飞币数量小于订单要求数量，则不可使用</p>", "<p>* 如该订单已赠送优飞币，则不可使用原有优飞币</p>", "<p>2. 如何获得优飞币？</p>", "<p>购买带有“送优飞币”标签的机票产品，即可获得与支付金额相等数量的优飞币。</p>", "<p>* 优飞币与订单联系人手机号绑定，有效期为自发币后一年内</p>", "<p>* 如使用优飞币抵扣现金购票，则不可获赠新的优飞币</p>"].join("");
    this._cache["YoufeiCoinTip"] = this._getTipHTML(e);
    return this._cache["YoufeiCoinTip"]
};
OnewayFlightWrapperUI.prototype._getFlyfundTip = function() {
    if (this._cache["FlyfundDescTip"]) {
        return this._cache["FlyfundDescTip"]
    }
    var e = ['<p>1.登录去哪儿网账号，购买带有“<span class="v-tag v-tag-red" style="display: inline-block; float: none;"><span class="v-tag-tit"><span>返XX飞基金</span></span></span>”的机票产品，实际乘坐航班后1-2日即可获得相应的飞基金；</p>', '<p>2.下次购票时，需登录去哪儿网账号，选择带有“<span class="v-tag v-tag-red" style="display: inline-block; float: none;"><span class="v-tag-tit"><span>可用飞基金</span></span></span>”的机票产品，可使用飞基金抵扣机票票价，1飞基金可抵1元现金；如一个订单包含多个乘机人，则飞基金抵扣的金额将平均至每个乘机人；</p>', "<p>3.飞基金仅支持用于支付机票票价，不能用于支付机建费、燃油费、保险费、改签费、升舱费、快递费等费用；</p>", "<p>4.使用飞基金购票发生退票时手续费优先从您使用的飞基金中扣除，不足部分将从您支付的现金中扣除。如飞基金仍有剩余，则原路退回，下次仍可使用。儿童票、婴儿票不能使用飞基金抵扣机票票价。</p>"].join("");
    this._cache["FlyfundDescTip"] = this._getTipHTML(e);
    return this._cache["FlyfundDescTip"]
};
OnewayFlightWrapperUI.prototype.createLabelUI = function(e, t) {
    var n = t;
    var r;
    var i = this;
    this.labelIdList = [];
    this.text('<div class="v2">');
    if (this._type == "FlagshipOnewayFlightWrapperUI" || this._type == "OnewayFlightWrapperUI") {
        this.insertStarInfo(t)
    }
    if (!e.length) {
        this.text("")
    } else {
        $jex.foreach(e, function(e, t) {
            var n = {
                color: e.color,
                addClass: e.classSuffix ? "v-tag-" + e.classSuffix : "",
                dataType: "no-tip",
                labelId: "js_label_" + t + "_" + i._GID_,
                text: e.text,
                content: e.content || "",
                hrefText: $jex.ie == 6 ? 'href="javascript:;"' : ""
            };
            if (e.content && !e.needAjax) {
                n.dataType = e.classSuffix ? "v-tag-" + e.classSuffix : "";
                n.addClass += " p-tip-trigger v-pr-tag"
            }
            i.labelIdList.push(n);
            r = $jex.template(['<a class="v-tag v-tag-<%= color%> <%= addClass%>" data-type="<%= dataType%>" <%= hrefText%> id="<%= labelId %>">', '<div class="v-tag-tit">', "<span><%= text%></span>", "</div>", "<%if(content){%>", "<%= content%>", "<%}%>", "</a>"].join(""));
            i.text(r(n))
        })
    }
    this.text("</div>")
};
OnewayFlightWrapperUI.prototype.bind_labelEvent = function(e) {
    var t = this;
    this.onInit(function() {
        var n = t.labelIdList;
        var r = function(e) {
            e = e || womdow.event;
            if (e.stopPropagation) {
                e.stopPropagation()
            } else {
                e.cancelBubble = true
            }
        };
        $jex.foreach(n, function(n, i) {
            var s = document.getElementById(n.labelId);
            $jex.event.bind(s, "click", r);
            if (n.text == "年龄限制") {
                t.getAgeLimitInfo(n, t, e)
            }
            if (n.addClass == "v-tag-pickcar") {
                t.getPickcarInfo(n, t, e)
            }
        });
        var i = t.find("js-wrapper-logo-tip");
        if (i) {
            $jex.event.bind(i, "click", r)
        }
        var s = t.find("panelStarR");
        if (s) {
            $jex.event.bind(s, "click", r)
        }
        var o = t.find("js-packge-price-tip");
        if (o) {
            $jex.event.bind(o, "click", r)
        }
        var u = t.find("js-gift-icon-tip");
        if (u) {
            $jex.event.bind(u, "click", r)
        }
        var a = t.find("js-hongbao");
        if (a) {
            $jex.event.bind(a, "click", r)
        }
    })
};
OnewayFlightWrapperUI.prototype.getAgeLimitInfo = function(e, t, n) {
    function f() {
        var e = "/twell/flight/getQLN.jsp";
        $jex.jsonp(e, {
            wrapperId: i.wrapperId(),
            policyId: i.pid()
        }, function(e) {
            r.logQrcode(i, "floatboxshow", {
                type: "v-tag-agelimit"
            });
            l(e)
        }, {
            timeout: {
                time: 3e3,
                func: function() {
                    if (!a) {
                        l({})
                    }
                }
            }
        })
    }

    function l(e) {
        a = true;
        var t = "";
        var n = "该产品限制乘机人年龄，下单时请注意相关提示";
        var r = u;
        var i = e.maxAge;
        var s = e.minAge;
        if (i && s) {
            n = "限" + s + "-" + i + "（含）周岁购买"
        } else if (i && !s) {
            n = "限<" + i + "（含）周岁购买"
        } else if (!i && s) {
            n = "限>" + s + "（含）周岁购买"
        } else {
            t = "default-tip"
        }
        $jex.addClassName(o, t);
        r.innerHTML = n;
        $jex.element.show(o)
    }
    var r = this;
    var i = n;
    var s = document.getElementById(e.labelId);
    var o = t.find("ageLimitPanel");
    var u = t.find("ageLimitContent");
    if (s) {
        var a = false;
        $jex.hover({
            act: s,
            extra: [o],
            onmouseover: function(e) {
                if (a) {
                    $jex.element.show(o);
                    return
                }
                f()
            },
            onmouseout: function(e) {
                $jex.element.hide(o)
            }
        })
    }
};
OnewayFlightWrapperUI.prototype.getPickcarInfo = function(e, t, n) {
    function f() {
        var e = "http://ws.qunar.com/voucher/feVoucherAgreement";
        $jex.jsonp(e, {
            agreementKey: "3w" + "_" + i.vType() + "_" + i.giftType()
        }, function(e) {
            r.logQrcode(i, "floatboxshow", {
                type: "v-tag-pickcar"
            });
            l(e)
        }, {
            timeout: {
                time: 3e3,
                func: function() {
                    if (!a) {
                        l({})
                    }
                }
            }
        })
    }

    function l(e) {
        a = true;
        var t = "";
        var n = "购买本产品可得接送机代金券或服务券，详细使用规则请在购买机票后查看订单详情中的使用规则。";
        var r = u;
        var i = e.ret;
        if (i === 0 && e.data) {
            n = e.data
        } else {
            t = ""
        }
        $jex.addClassName(o, t);
        r.innerHTML = n;
        $jex.element.show(o)
    }
    var r = this;
    var i = n;
    var s = document.getElementById(e.labelId);
    var o = t.find("pickCarPanel");
    var u = t.find("pickCarContent");
    if (s) {
        var a = false;
        $jex.hover({
            act: s,
            extra: [o],
            onmouseover: function(e) {
                $jex.element.show(o);
                if (a) {
                    return
                }
                f()
            },
            onmouseout: function(e) {
                $jex.element.hide(o)
            }
        })
    }
};
OnewayFlightWrapperUI.prototype._getTipHTML = function(e, t, n) {
    if (!e) return;
    var r = {
        content: e,
        panelId: t ? t + this._GID_ : null,
        contentId: n ? n + this._GID_ : null
    };
    var i = $jex.template(["<%if(panelId){%>", '<div class="p-tips-cont  js_panel" id="<%= panelId%>" >', "<%} else {%>", '<div class="p-tips-cont  js_panel" >', "<%}%>", '<div class="p-tips-wrap">', '<div class="p-tips-arr p-tips-arr-t"><p class="arr-o">◆</p><p class="arr-i">◆</p></div>', "<%if(contentId){%>", '<div class="p-tips-content" id="<%=contentId%>">', "<%} else {%>", '<div class="p-tips-content">', "<%}%>", "<%= content%>", "</div>", "</div>", "</div>"].join(""));
    return i(r)
};
OnewayFlightWrapperUI.prototype.sortLabels = function(e, t) {
    e.sort(function(e, t) {
        return t.keepRank - e.keepRank
    });
    e = e.slice(0, t);
    e.sort(function(e, t) {
        return t.sortRank - e.sortRank
    });
    return e
};
OnewayFlightWrapperUI.prototype.insert_PRICE = function(e) {
    if (e.isNotWork()) {
        this.text('<div class="v3"><span class="noPrice">暂无报价</span></div><div class="v4">&nbsp;</div>')
    } else {
        var t = e;
        var n = t.afeePrice(),
            r = t.bprPrice(),
            i;
        var s = e.isHightLightPrice();
        n = parseInt(n);
        r = parseInt(r);
        if (n) {
            i = n;
            typeof s == "undefined" ? s = this.isHightLightPrice(t, "pr") : ""
        } else {
            i = r;
            typeof s == "undefined" ? s = this.isHightLightPrice(t, "bpr") : ""
        }
        this.text('<div class="v3">');
        this.priceHTML(i, s ? "t-prc-lp" : "");
        this.text("</div>")
    }
};
OnewayFlightWrapperUI.prototype.insert_priceLable = function(e) {
    var t = e;
    var n = [];
    try {
        n = this.getPriceLabels(t);
        n = this.sortLabels(n, 1)
    } catch (t) {
        n = []
    }
    this.createPriceLabelUI(n, e)
};
OnewayFlightWrapperUI.prototype.getPriceLabels = function(e) {
    var t = e;
    var n = t.vendor();
    var r = [];
    var i = {};
    var s = ConfigManager.getConfig("OnewayListLabels");
    var o = e.isFcCabinProduct() || e.isBcCabinProduct() || e.isFpCabinProduct() || e.isPeCabinProduct();
    if (t.specialCabinInfo() && !o) {
        var u = t.specialCabinInfo();
        if (u.tipmsg == "") {
            u.tipmsg = u.icotext
        }
        var a = u.tipmsg && u.tipmsg.split("&");
        var f = "";
        $jex.each(a, function(e) {
            f += e + "<br/>"
        });
        i = s["specialCabin"];
        i.text = u.icotext;
        i.content = this._getTipHTML(f);
        r.push(i)
    } else if (t.isFCabin() && !o) {
        i = s["firstClassCabin"];
        r.push(i)
    } else if (t.isBCabin() && !o) {
        i = s["businessCabin"];
        r.push(i)
    }
    if (t.hasPickCar() && t.giftType() == 1) {
        r = this._getCarLabels(r, t)
    }
    if (t.isUfee()) {
        i = s["youfeiCoin"];
        i.content = this._getYoufeiCoinTip();
        r.push(i)
    }
    if (t.getFlyfundRefundNum() > 0) {
        i = s["flyfundRefund"];
        i.text = "返" + t.dataSource().ffd + "飞基金";
        i.content = this._getFlyfundTip();
        r.push(i)
    } else if (t.isFlyfundCanUse() === true) {
        i = s["flyfundCanUse"];
        i.content = this._getFlyfundTip();
        r.push(i)
    }
    if (t.hasAgeLimit() && !n.isOffical()) {
        i = s["hasAgeLimit"];
        i.content = this._getTipHTML('<img class="p-tips-tgq-img" src="http://simg1.qunarzz.com/site/images/new_main/m_loading.gif" />', "ageLimitPanel", "ageLimitContent");
        i.needAjax = true;
        r.push(i)
    }
    return r
};
OnewayFlightWrapperUI.prototype.createPriceLabelUI = function(e, t) {
    var n = t;
    var r;
    var i = this;
    this.labelIdList = this.labelIdList || [];
    this.text('<div class="v5">');
    if (t.hasPrGift()) {
        this.insert_prGiftInfo(t, "v-gift-pr")
    }
    if (n.hasHongbao()) {
        this.insert_hongbao(n)
    } else if (t.hasPickCar() && t.giftType() == 2 && t.getCarrierCo() !== "cz") {
        this.insert_giftInfo(t, "v-gift-normal")
    } else if (!e.length) {
        this.text("&nbsp;")
    }
    $jex.foreach(e, function(e, t) {
        var n = {
            color: e.color,
            addClass: e.classSuffix ? "v-tag-" + e.classSuffix : "",
            labelId: "js_price_label_" + t + "_" + i._GID_,
            dataType: "no-tip",
            text: e.text,
            content: e.content || "",
            hrefText: $jex.ie == 6 ? 'href="javascript:;"' : ""
        };
        if (e.content && !e.needAjax) {
            n.dataType = e.classSuffix ? "v-tag-" + e.classSuffix : "";
            n.addClass += " p-tip-trigger"
        }
        i.labelIdList.push(n);
        r = $jex.template(['<a class="v-tag v-tag-<%= color%> <%= addClass%>" data-type="<%= dataType%>" <%= hrefText%> id="<%= labelId %>">', '<div class="v-tag-tit">', "<span><%= text%></span>", "</div>", "<%if(content){%>", "<%= content%>", "<%}%>", "</a>"].join(""));
        i.text(r(n))
    });
    this.text("</div>")
};
OnewayFlightWrapperUI.prototype.isHightLightPrice = function(e, t) {
    if (t == "pr") {
        return e.isLowestPr() || false
    }
    if (t == "bpr") {
        return e.isLowestBpr() || false
    }
};
OnewayFlightWrapperUI.prototype.insert_insureInfo = function(e) {
    var t = e;
    var n = t.afeePrice();
    var r = t.afee();
    var i = "v-gift-normal";
    this.text('<div class="v4">');
    if (t.hasPickCar() && t.giftType() == 1 && t.isShowAfee()) {
        var s = this.insert_carPrice(t)
    } else if (t.isShowAfee() && n && r && this._type !== "YouFeiDaiOnewayFlightWrapperUI") {
        this.text('<div class="v-ins">');
        this.text("+", r, "保险");
        this.text("</div>")
    }
    this.text("</div>")
};
OnewayFlightWrapperUI.prototype.insert_giftInfo = function(e, t) {
    this.append("<div", "js-gift-icon", "");
    this.text(' class="v-gift ', t, '" >', '<div class="gift-wrapper">', "</div>", this._getTipHTML(e.giftInfo(), "js-gift-icon-tip"), "</div>")
};
OnewayFlightWrapperUI.prototype.insert_prGiftInfo = function(e, t) {
    this.append("<div", "js-prgift-icon", "");
    this.text(' class="v-gift ', t, '" >', '<div class="prgift-wrapper">', "x" + e.prGiftNum(), "</div>", this._getTipHTML('<div id="prgift-tip-content' + this._GID_ + '"><img class="p-tips-tgq-img" src="http://simg1.qunarzz.com/site/images/new_main/m_loading.gif" /></div>', "js-prgift-icon-tip"), "</div>")
};
OnewayFlightWrapperUI.prototype.insert_BOOKING_BUTTON = function(e) {
    this.text('<div class="v6">');
    if (e.isNotWork()) {
        var t = this.bookingScreenUI.getButtonMsg("预 订");
        this.text('<div class="v-bk">');
        this.text('<a class="btn-book-org" href="#">' + t + "</a>");
        this.text("</div>")
    } else {
        var n = e.afeePrice(),
            r = e.bprPrice();
        n = parseInt(n);
        r = parseInt(r);
        if (n) {
            this._buttonHTML("pr", e, "btnBook")
        }
        if (!n && r) {
            this._buttonHTML("bpr", e, "lbtnBook")
        }
    }
    this.text("</div>")
};
OnewayFlightWrapperUI.prototype._buttonHTML = function(e, t, n) {
    var r = "";
    var i = this.bookingScreenUI;
    var s = e === "bpr" ? t.bpackagePrice() : t.packagePrice();
    var o = "btn-book-org";
    if (t.isFreeMan()) {
        r = "预 订"
    } else if (t.isApplyPrice() && s > 0) {
        r = "申请套餐";
        o = "btn-apply-org"
    } else if (t.isRoundFlight()) {
        r = "抢购"
    } else if (t.isApplyPrice()) {
        r = "申 请";
        o = "btn-apply-org"
    } else if (s > 0) {
        r = "预订套餐"
    } else {
        r = t.bigLogoUrl() ? "预 订" : i.getButtonMsg("预 订")
    }
    this.text('<div class="t_bk">');
    if (n) {
        this.append("<a", n, ' data-evtDataId="' + this.newid("") + '" class="' + o + '" href="#">' + r + "</span></a>")
    } else {
        this.text('<a class="btn-book-org" href="javascript:void(0)"><span><b>' + r + "</b></span></a>")
    }
    this.text("</div>")
};
OnewayFlightWrapperUI.prototype.logQrcode = function(e, t, n) {
    try {
        n = n || {};
        var r = e;
        var i = e.ownerFlight();
        var s = new Image;
        var o = r.wrapperId();
        var u = i.code();
        var a = i.deptCity().zh;
        var f = i.arriCity().zh;
        var l = i.deptDate();
        var c = {
            s: "flight",
            p: "onewayList",
            r: t,
            flightCode: u,
            from: a,
            to: f,
            date: l,
            wrapperid: o
        };
        var h = $jex.extend({}, c, n);
        $jex.log(h)
    } catch (r) {}
};
OnewayFlightWrapperUI.prototype._bindHoverEvent = function(e) {
    var t = this;
    var n = e;
    var r = null;
    this.onInit(function() {
        var e = this.find("flightbar");
        var i = this.find("js-gift-icon");
        var s = this.find("js-prgift-icon");
        var o = this.find("js_v_type");
        var u = this.find("js-wrapper-logo-tip");
        if ($jex.ie == 6 && e) {
            $jex.hover({
                act: e,
                onmouseover: function(t) {
                    $jex.addClassName(e, "qvt-column-hover")
                },
                onmouseout: function(t) {
                    $jex.removeClassName(e, "qvt-column-hover");
                    $jex.removeClassName(e, "qvt-column-tip-open")
                }
            })
        }
        if (u) {
            $jex.hover({
                act: u,
                onmouseover: function(e) {
                    $jex.addClassName(u, "p-tips-cont-hover")
                },
                onmouseout: function(e) {
                    $jex.removeClassName(u, "p-tips-cont-hover")
                }
            })
        }
        var a = null;
        var f = false;
        if (i) {
            $jex.hover({
                act: i,
                onmouseover: function(e) {
                    $jex.addClassName(i, "gift-icon-open");
                    if (f) {
                        return
                    }
                    f = true;
                    a = setTimeout(function() {
                        t.logQrcode(n, "floatboxshow", {
                            type: "gift-icon"
                        })
                    }, 1e3)
                },
                onmouseout: function(e) {
                    f = false;
                    clearTimeout(a);
                    $jex.removeClassName(i, "gift-icon-open")
                }
            })
        }
        if (s) {
            $jex.hover({
                act: s,
                onmouseover: function(e) {
                    $jex.addClassName(s, "gift-icon-open");
                    t.requestPrGiftContent(t, n)
                },
                onmouseout: function(e) {
                    $jex.removeClassName(s, "gift-icon-open")
                }
            })
        }
        var l = null;
        var c = false;
        o && $jex.hover({
            act: o,
            onmouseover: function(e) {
                if (c) {
                    return
                }
                c = true;
                l = setTimeout(function() {
                    t.logQrcode(n, "floatboxshow", {
                        type: o.getAttribute("data-type")
                    })
                }, 1e3)
            },
            onmouseout: function(e) {
                c = false;
                clearTimeout(l)
            }
        });
        var h = t.labelIdList;
        h.length && $jex.foreach(h, function(e, r) {
            var i = document.getElementById(e.labelId);
            var s = false;
            var o = null;
            $jex.event.bind(i, "mouseover", function(e) {
                var r = i.getAttribute("data-type");
                if (r == "no-tip") {
                    return
                }
                if (s) {
                    return
                }
                s = true;
                o = setTimeout(function() {
                    t.logQrcode(n, "floatboxshow", {
                        type: r
                    })
                }, 1e3)
            });
            $jex.event.bind(i, "mouseout", function(e) {
                s = false;
                clearTimeout(o)
            })
        });
        if (n.hasHongbao()) {
            $jex.hover({
                act: e,
                onmouseover: function(e) {
                    var i = t.find("qrcode-image");
                    var s = i.getAttribute("data-src");
                    i.src = s;
                    r = setTimeout(function() {
                        t.logQrcode(n, "hongbaoQrcode")
                    }, 5e3)
                },
                onmouseout: function(e) {
                    clearTimeout(r)
                }
            })
        }
        if (n.hasPickCar() && n.giftType() == 1 || n.hasHongbao()) {
            $jex.event.bind(e, "mousemove", function(t) {
                var n = t.target || t.srcElement;
                while (!$jex.hasClassName(n, "qvt-column") && n != document) {
                    if ($jex.hasClassName(n, "v-ins") || $jex.hasClassName(n, "hongbao-info")) {
                        break
                    }
                    if ($jex.hasClassName(n, "p-tip-trigger") || $jex.hasClassName(n, "e_qstar") || $jex.hasClassName(n, "v-tgq") || $jex.hasClassName(n, "v-gift") || $jex.hasClassName(n, "v-tag-pickcar")) {
                        $jex.addClassName(e, "qvt-column-tip-open");
                        break
                    }
                    $jex.removeClassName(e, "qvt-column-tip-open");
                    n = n.parentNode
                }
            })
        }
    })
};
OnewayFlightWrapperUI.prototype.requestPrGiftContent = function(e, t) {
    var n = "/twell/flight/getPackageDesc.jsp";
    var r = e.find("prgift-tip-content");
    if (e.prGiftContentLoad) {
        r.innerHTML = e.prGiftContent;
        return
    } else {
        var i = {};
        var s = t.ownerFlight();
        i.amount = t.ffdPrice();
        i.airline = s.code();
        i.dptDate = s.deptDate();
        i.dptTime = s.deptTime();
        i.dpt = s.deptAirportCode();
        i.arr = s.arriAirportCode();
        i.packageCode = t.getTag();
        i.wrapperId = t.wrapperId();
        $jex.ajax(n, i, function(t) {
            var n = "<div class='hd'>赠超值礼包</div>";
            if (t.status == 0 && t.type != 0) {
                var i = t.data.bonusInfoMap;
                var s = 0,
                    o = ["一", "二", "三"];
                n += "<div>";
                for (var u in i) {
                    if (u == "ACCIDENT_INSURANCE") {
                        n += "<p>好礼" + o[s++] + ': 航意险，总金额<i class="rmb"> &yen;</i>' + i[u].amount + "</p>"
                    }
                    if (u == "DELAY_INSURANCE") {
                        n += "<p>好礼" + o[s++] + ': 航延险，总金额<i class="rmb"> &yen;</i>' + i[u].amount + "</p>"
                    }
                    if (u == "CONSTRUCTION") {
                        n += "<p>好礼" + o[s++] + ': 机建费，总金额<i class="rmb"> &yen;</i>' + i[u].amount + "</p>"
                    }
                }
                n += "<p>当您发生退票或者改签时，赠送内容不予退换。</p>";
                n += "</div>";
                e.prGiftContentLoad = true;
                e.prGiftContent = n
            } else {
                n += "<div>系统繁忙,请稍后再试</div>"
            }
            r.innerHTML = n
        }, {
            beforeSend: function(e) {
                if (window.addHtag) window.addHtag(e)
            }
        })
    }
};
OnewayFlightWrapperUI.prototype.priceHTML = function(e, t, n) {
    this.text('<div class="v-prc ', t, '">');
    this.text(Price_html.getHTML(e));
    this.text('<i class="rmb">&yen;</i>');
    this.text("</div>")
};
OnewayFlightWrapperUI.prototype.insert_carPrice = function(e) {
    var t = e.afee();
    var n = e.cPrice() || 0;
    var r = e.vPrice() || 0;
    var i = e.voucherName() ? r : r + n;
    var s = t + n;
    var o = e.carType();
    var u = e.afeePrice();
    this.text('<a class="v-ins p-tip-trigger" ', $jex.ie == 6 ? 'href="javascript:;"' : "", '><span class="v-ins-tit">+', s, '<i class="has-tip">');
    this.text("套餐</i>");
    this.text("</span>");
    this.text(this._getTipHTML(['套餐总价<font color="#ff6600"><i class="rmb">&yen;</i>', u + s, '</font><br>套餐含<i class="rmb">&yen;</i>', i, o, '<i class="plus">+</i><i class="rmb">&yen;</i>', t, "保险"].join(""), "js-packge-price-tip"));
    this.text("</a>");
    return s
};
OnewayFlightWrapperUI.prototype.insert_hongbao = function(e) {
    var t = e;
    var n = t.ownerFlight();
    var r = t.vendor();
    var i = t.HongbaoPrice();
    var s = ["width=" + 100, "height=" + 100, "domain=" + encodeURIComponent(r.info ? r.info().web || "" : ""), "cabin=" + encodeURIComponent(t.cabin ? t.cabin() || "" : ""), "bu=" + encodeURIComponent(t.dataSource().bu || t.dataSource().bbu || "")].join("&");
    var o = "";
    o += '<div class="qrcode"><img src="http://simg1.qunarzz.com/site/images/flight/flight_search/empty.png" id="qrcode-image' + this.newid("") + '" data-src="http://phone.qunar.com/qrcode?sendId=8&bd_source=bd_web2app&' + s + '" ' + ($jex.ie == 6 ? "width=100 height=100" : "") + "></div>";
    o += '<div class="qrdetail">';
    o += '<h3>扫一扫，买保险立减<i class="rmb">&yen;</i>' + i + "</h3>";
    o += '<p>用去哪儿APP扫码下单，买保险会员红包帮您每单抵现<i class="rmb">&yen;</i>' + i + "</p>";
    o += "<p><a>没有会员红包？扫码立即获取！</a></p>";
    o += "</div>";
    o += '<div style="clear:both"></div>';
    this.append("<div", "js-hongbao", 'class="p-tip-trigger v-tag v-tag-red hongbao-info">');
    this.text('<div class="v-tag-tit"><i class="hongbao-icon"></i><span>扫码立减</span></div>');
    this.text(this._getTipHTML(o, "js-hongbao-tip"));
    this.text("</div>")
};
$jex.register("OnewayFlightWrapperUI", OnewayFlightWrapperUI);
$jex.extendClass(FlagshipOnewayFlightWrapperUI, OnewayFlightWrapperUI);
FlagshipOnewayFlightWrapperUI.prototype.insert_vendorInfo = function(e) {
    var t = e;
    var n = e.bigLogoUrl();
    var r = (t.getCarrierCo() || "").toUpperCase();
    this.text('<div class="v0 v0-flagship">');
    if (n) {
        this.text('<div class="v-flag"><img src=', n, "></div>")
    } else {
        if (r) {
            this._imgUrl = "http://simg1.qunarzz.com/site/images/new_airline_logo/small/" + r + ".png"
        }
        this.insertVenderName(t)
    }
    this.text("</div>")
};
FlagshipOnewayFlightWrapperUI.prototype.getLabels = function(e) {
    var t = e;
    var n = t.vendor();
    var r = FlagshipOnewayFlightWrapperUI.superclass.getLabels.call(this, t);
    var i = ConfigManager.getConfig("OnewayListLabels");
    var s = [];
    if (n.isDirect()) {
        var o = i["airlineDirectSelling"];
        o.content = this._getTipHTML(["航空公司直营", "实时自动出票", "标准航司退改签", "7×24小时服务", "等额报销凭证", "机场自取行程单"].join("<br/>"));
        s.push(o)
    } else if (n.isOffical()) {
        s.push(i["airlineOfficial"])
    }
    return r.concat(s)
};
FlagshipOnewayFlightWrapperUI.prototype.getPriceLabels = function(e) {
    var t = e;
    var n;
    var r = t.vendor();
    var i = FlagshipOnewayFlightWrapperUI.superclass.getPriceLabels.call(this, t);
    var s = ConfigManager.getConfig("OnewayListLabels");
    var o = [];
    if (r.isDirect()) {
        var u = this.getCouponLbale(t);
        if (u) {
            o.push(u)
        }
    }
    if (r.isOffical()) {
        n = this.ownerListUI() && this.ownerListUI().dataSource();
        if (n && n.type && n.type == "compose") {
            o.push(s["transferPackage"])
        }
        if (t.hasAgeLimit()) {
            o.push(s["youngAndOld"])
        }
    }
    return i.concat(o)
};
FlagshipOnewayFlightWrapperUI.prototype.getCouponLbale = function(e) {
    var t = ConfigManager.getConfig("OnewayListLabels");
    var n = t["flagshipCoupon"];
    var r;
    if (e.isSZCoupon()) {
        n.text = this.getRebateText(e);
        r = e.couponAdwords() ? e.couponAdwords() : "";
        n.content = r && this._getTipHTML(r);
        return n
    } else if (e.coupon() > 0 && typeof e.vendor === "function" && e.vendor().rebateTye() !== "RM") {
        n.text = this.getRebateText(e);
        r = e.couponAdwords() ? e.couponAdwords() : "";
        n.content = r && this._getTipHTML(r);
        if (n.text == "官网直减" && e.ownerFlight && e.ownerFlight().carrierCode() == "CA") {
            n.text = "国航特惠";
            n.content = this._getTipHTML("该旗舰店机票，已享受" + e.coupon() + "元直减优惠")
        }
        return n
    }
};
FlagshipOnewayFlightWrapperUI.prototype.insert_tgqInfo = function(e) {
    var t = 0;
    var n = e;
    var r = this._GID_;
    var i, s, o, u;
    var a, f;
    o = "退改签";
    s = e.pid() == null ? this.getDefaultTGQInfo(e) : '<img class="p-tips-tgq-img" src="http://simg1.qunarzz.com/site/images/new_main/m_loading.gif" />';
    a = '<div class="p-tips-wrap">';
    f = '<div class="p-tips-arr p-tips-arr-t" >';
    u = {
        stopClickId: "js-stopClick" + r,
        tgqId: "tgq" + r,
        tgqText: o,
        tgqPanelId: "tgq_notice_panel" + r,
        tgqContentId: "tgq_notice" + r,
        tgqContent: s,
        niceTgq: n.isNiceTgq()
    };
    this.text('<div class="v1">');
    if (this.getDefaultTGQInfo(e)) {
        i = $jex.template(['<div id="<%= stopClickId %>" class="v-tgq">', '<div class="v-tgq-tit" id="<%= tgqId %>"><%= tgqText %></div>', '<div class="p-tips-cont" id="<%= tgqPanelId %>">', a, f, '<p class="arr-o">◆</p><p class="arr-i">◆</p>', "</div>", '<div class="p-tips-content" id="<%= tgqContentId %>" >', "<%= tgqContent %>", "</div>", "</div>", "</div>", "</div>", "<%if(niceTgq){%>", '<a class="v-prefer p-tip-trigger" ' + ($jex.ie != 6 ? "" : 'href="javascript:;"') + ">", '<span class="v-prefer-tit"></span>', this._getTipHTML("退改签费用低"), "</a>", "<%}%>"].join(""));
        this.text(i(u));
        t = 1
    }
    if (t === 0) this.text("&nbsp");
    this.text("</div>");
    this.bind_tgqEvent(n)
};
FlagshipOnewayFlightWrapperUI.prototype.bind_tgqEvent = function(e) {
    var t = e;
    var n = this;
    this.onInit(function() {
        n.loadedTgq = false;
        var e = n.find("tgq");
        var r = false;
        if (e) {
            var i = n.find("tgq_notice_panel");
            $jex.hover({
                act: e,
                extra: [n.find("tgq_notice_panel")],
                onmouseover: function(s) {
                    if (r) {
                        return
                    }
                    if (!n.loadedTgq) {
                        n.requestTgq(n, t)
                    }
                    $jex.addClassName(e, "v-tag-hover");
                    $jex.element.show(i);
                    $jex.event.trigger($jex.$("hdivResultPanel"), "fem_showTGQ");
                    r = true
                },
                onmouseout: function(t) {
                    r = false;
                    $jex.element.hide(i);
                    $jex.removeClassName(e, "v-tag-hover")
                }
            })
        }
    })
};
FlagshipOnewayFlightWrapperUI.prototype.getRebateText = function(e) {
    var t = {
        1: "官网直减",
        2: "全民直减",
        3: "折上再减",
        4: "直减20%"
    };
    return function(e) {
        return t[e.cat()] || ""
    }
}();
$jex.register("FlagshipOnewayFlightWrapperUI", FlagshipOnewayFlightWrapperUI);
$jex.extendClass(FreeManOnewayFlightWrapperUI, OnewayFlightWrapperUI);
FreeManOnewayFlightWrapperUI.prototype.insert_vendorInfo = function() {
    var e = "js_v_type" + this._GID_;
    this.text(['<div class="v0">', '<a class="v-type-icon v-type-freeman p-tip-trigger" ', $jex.ie == 6 ? 'href="javascript:;"' : "", ' id="', e, '" data-type="v-type-freeman">', '<span class="ico"></span>', '<span class="t-vendor-name">自由人</span>', this.getFreeManTips(), "</a></div>"].join(""))
};
FreeManOnewayFlightWrapperUI.prototype.getFreeManTips = function() {
    if (this._otaTips) {
        return this._otaTips
    }
    this._otaTips = this._getTipHTML(['<div class="p-tips-img"></div>', '<ul class="p-tips-info clrfix">', '<li class="c1">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">立返现金</p>', '<p class="c-detail">支付后立返现金</p>', "</div>", "</li>", '<li class="c2">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">超值退改</p>', '<p class="c-detail">退改签费用低</p>', "</div>", "</li>", '<li class="c3 c-last">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">全额发票</p>', '<p class="c-detail">提供全额发票</p>', "</div>", "</li>", '<li class="c4">', '<i class="c-ico"></i>', '<div class="c-wrap-row">', '<p class="c-name">跨航司退改签</p>', '<p class="c-detail"></p>', "</div>", "</li>", "</ul>"].join(""), "js-wrapper-logo-tip");
    return this._otaTips
};
FreeManOnewayFlightWrapperUI.prototype.getLabels = function(e) {
    var t = e;
    var n = FreeManOnewayFlightWrapperUI.superclass.getLabels.call(this, t);
    var r = ConfigManager.getConfig("OnewayListLabels");
    var i = [];
    var s = r["freeman"];
    s.content = this._getTipHTML("提供支付金额的超额发票");
    i.push(s);
    return n.concat(i)
};
FreeManOnewayFlightWrapperUI.prototype.getPriceLabels = function(e) {
    var t = e;
    var n = t.fanxian();
    var r = FreeManOnewayFlightWrapperUI.superclass.getPriceLabels.call(this, t);
    var i = ConfigManager.getConfig("OnewayListLabels");
    var s = [];
    var o = i["freeman"];
    if (n) {
        o = i["lifan"];
        o.text = "立返<i class='rmb'>&yen;</i>" + n;
        o.content = this._getTipHTML("订单支付后，立返现金<i class='rmb'>&yen;</i>" + n + "/成人");
        s.push(o)
    }
    return r.concat(s)
};
$jex.register("FreeManOnewayFlightWrapperUI", FreeManOnewayFlightWrapperUI);
$jex.extendClass(OtaOnewayFlightWrapperUI, OnewayFlightWrapperUI);
OtaOnewayFlightWrapperUI.prototype.insert_vendorInfo = function(e) {
    var t = "v-type-ota";
    var n = "商旅优选";
    var r = "js_v_type" + this._GID_;
    if (e.isPgOta && e.isPgOta()) {
        t = "v-type-ota-pg";
        n = "商旅优选(套餐)";
        this._isOtaPkg = true
    }
    if (e.isSelf()) {
        n = "自营" + n
    }
    this.text(['<div class="v0">', '<a class="v-type-icon ', t, ' p-tip-trigger" ', $jex.ie == 6 ? 'href="javascript:;"' : "", ' id="', r, '" data-type="', t, '">', '<span class="ico"></span>', '<span class="t-vendor-name">', n, "</span>", this.getOtaTips(e), "</a></div>"].join(""))
};
OtaOnewayFlightWrapperUI.prototype.getLabels = function(e) {
    var t = e;
    var n = OtaOnewayFlightWrapperUI.superclass.getLabels.call(this, t);
    var r = ConfigManager.getConfig("OnewayListLabels");
    var i = [];
    var s = r["fastPrintTicket"];
    s.content = this._getTipHTML("极速出票");
    i.push(s);
    return n.concat(i)
};
OtaOnewayFlightWrapperUI.prototype.getOtaTips = function(e) {
    if (this._otaTips) {
        return this._otaTips
    }
    var t = this._isOtaPkg ? ['<li class="c4">', '<i class="c-ico"></i>', '<div class="c-wrap-row">', '<p class="c-name">含接送机代金券</p>', '<p class="c-detail">去哪儿专车代金券</p>', "</div>", "</li>"].join("") : "";
    this._otaTips = this._getTipHTML(['<div class="p-tips-img"></div>', '<ul class="p-tips-info clrfix">', '<li class="c1">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">极速出票</p>', '<p class="c-detail">支付后极速出票</p>', "</div>", "</li>", '<li class="c2">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">服务优先</p>', '<p class="c-detail">24小时服务</p>', "</div>", "</li>", '<li class="c3 c-last">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">报销无忧</p>', '<p class="c-detail">提供报销凭证</p>', "</div>", "</li>", t, "</ul>"].join(""), "js-wrapper-logo-tip");
    return this._otaTips
};
$jex.register("OtaOnewayFlightWrapperUI", OtaOnewayFlightWrapperUI);
$jex.extendClass(YouFeiOnewayFlightWrapperUI, OnewayFlightWrapperUI);
YouFeiOnewayFlightWrapperUI.prototype.insert_vendorInfo = function(e) {
    var t = e.isYoufeiPg() ? "v-type-youfei-pg" : "v-type-youfei";
    var n = e.isYoufeiPg() ? "优飞币专享(套餐)" : "优飞币专享";
    var r = "js_v_type" + this._GID_;
    if (e.isSelf()) {
        n = "自营" + n
    }
    this.text(['<div class="v0">', '<a class="v-type-icon ' + t + ' p-tip-trigger" ', $jex.ie == 6 ? 'href="javascript:;"' : "", ' id="', r, '" data-type="', t, '">', '<span class="ico"></span>', '<span class="t-vendor-name">', n, "</span>", this.getYoufeiTips(e), "</a></div>"].join(""))
};
YouFeiOnewayFlightWrapperUI.prototype.getDefaultTGQInfo = function(e) {
    var t = YouFeiOnewayFlightWrapperUI.superclass.getDefaultTGQInfo.call(this, e);
    return this.getTgqAfterFix(e, t)
};
YouFeiOnewayFlightWrapperUI.prototype.getTgqAfterFix = function(e, t) {
    var n = e;
    var r = n.lijian();
    var i = ['<p class="prefix prefix-youfei"><i class="yf-prefix-icon"></i>', "参与优飞币活动的订单若发生退票或改签，视作放弃参与优飞币活动资格，在支付机票退票、改签费时退还", '<i class="rmb">&yen;</i>', r, "去哪儿网优飞币抵扣的机票金额", "</p>", '<p class="yf_tgq_tit">退改签规则：</p>'].join("");
    return i + t
};
YouFeiOnewayFlightWrapperUI.prototype.getPriceLabels = function(e) {
    var t = e;
    var n = YouFeiOnewayFlightWrapperUI.superclass.getPriceLabels.call(this, t);
    var r = [];
    if (t.isCsyf() || t.isNewYoufei()) {
        var i = this.getFakeYoufeiLabel(t)
    } else {
        var i = this.getYoufeiLabel(t)
    }
    i && r.push(i);
    return n.concat(r)
};
YouFeiOnewayFlightWrapperUI.prototype.getFakeYoufeiLabel = function(e) {
    var t = ConfigManager.getConfig("OnewayListLabels");
    var n = t["fakeYoufei"];
    var r = e.lijian();
    n.text = '已省<i class="rmb">&yen;</i>' + r;
    n.content = this._getTipHTML("送" + r + '个优飞币，立抵<i class="rmb">&yen;</i>' + r);
    return n
};
YouFeiOnewayFlightWrapperUI.prototype.getYoufeiLabel = function(e) {
    var t = ConfigManager.getConfig("OnewayListLabels");
    var n = t["youfei"];
    var r = e.lijian();
    n.text = '优飞币抵<i class="rmb">&yen;</i>' + r;
    n.content = this._getTipHTML("可使用" + r + '个优飞币，立抵现金<i class="rmb">&yen;</i>' + r);
    return n
};
YouFeiOnewayFlightWrapperUI.prototype.getYoufeiTips = function(e) {
    var t = ['<div class="v-yf-wrap">', "<p>优飞币专享活动说明：</p>", "<p>1. 购买“优飞币专享”促机票产品，1优飞币可抵1元现金。</p>", "<p>* 如所拥有优飞币数量小于订单要求数量，则不可使用</p>", "<p>* 如该订单已赠送优飞币，则不可使用原有优飞币</p>", "<p>2. 如何获得优飞币？</p>", "<p>购买带有“送优飞币”标签的机票产品，即可获得与支付金额相等数量的优飞币。</p>", "<p>* 优飞币与订单联系人手机号绑定，有效期为自发币后一年内</p>", "<p>* 如使用优飞币抵扣现金购票，则不可获赠新的优飞币</p>", "</div>"].join("");
    var n = e.isYoufeiPg() ? ['<li class="c1">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">含接送机代金券</p>', '<p class="c-detail">去哪儿专车代金券</p>', "</div>", "</li>", '<li class="c2">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">含航意险</p>', '<p class="c-detail">意外保障</p>', "</div>", "</li>", '<li class="c3 c-last">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">确保低价</p>', '<p class="c-detail">超低票价</p>', "</div>", "</li>", '<li class="c4 c-last">', '<i class="c-ico"></i>', '<div class="c-wrap-row">', '<p class="c-name">送优飞币可抵现金</p>', '<p class="c-detail"></p>', "</div>", "</li>"].join("") : ['<li class="c1">', '<i class="c-ico"></i>', '<div class="c-wrap-row">', '<p class="c-name">确保低价</p>', '<p class="c-detail">提供超低票价</p>', "</div>", "</li>", '<li class="c2 c-last">', '<i class="c-ico"></i>', '<div class="c-wrap-row">', '<p class="c-name">送优飞币可抵现金</p>', '<p class="c-detail"></p>', "</div>", "</li>"].join("");
    var r = this._getTipHTML(['<div class="p-tips-img"></div>', '<ul class="p-tips-info clrfix">', n, "</ul>", t].join(""), "js-wrapper-logo-tip");
    return r
};
$jex.register("YouFeiOnewayFlightWrapperUI", YouFeiOnewayFlightWrapperUI);
$jex.extendClass(ZiyouxingOnewayFlightWrapperUI, OnewayFlightWrapperUI);
ZiyouxingOnewayFlightWrapperUI.prototype.insert_vendorInfo = function() {
    var e = this._getTipHTML(['<div class="p-tips-img"></div>', '<ul class="p-tips-info clrfix">', '<li class="c1 c-last">', '<i class="c-ico"></i>', '<div class="c-wrap-row">', '<p class="c-name">车券</p>', '<p class="c-detail">包含接送机服务券/代金券</p>', "</div>", "</li>", "</ul>"].join(""), "js-wrapper-logo-tip");
    var t = "js_v_type" + this._GID_;
    this.text(['<div class="v0">', '<a class="v-type-icon v-type-ziyouxing p-tip-trigger" ', $jex.ie == 6 ? 'href="javascript:;"' : "", ' id="', t, '" data-type="v-type-ziyouxing">', '<span class="ico"></span>', '<span class="t-vendor-name">自由行</span>', e, "</a></div>"].join(""))
};
ZiyouxingOnewayFlightWrapperUI.prototype.getLabels = function(e) {
    var t = e;
    var n = ZiyouxingOnewayFlightWrapperUI.superclass.getLabels.call(this, t);
    var r = [];
    return n.concat(r)
};
ZiyouxingOnewayFlightWrapperUI.prototype.getPriceLabels = function(e) {
    var t = e;
    var n = ZiyouxingOnewayFlightWrapperUI.superclass.getPriceLabels.call(this, t);
    var r = [];
    r.push(this.getZiyouxingLabel(t));
    return n.concat(r)
};
ZiyouxingOnewayFlightWrapperUI.prototype.getZiyouxingLabel = function(e) {
    var t = ConfigManager.getConfig("OnewayListLabels");
    var n = t["ziyouxing"];
    n.text = e.vTitle();
    n.content = this._getTipHTML(e.vDes());
    return n
};
ZiyouxingOnewayFlightWrapperUI.prototype._buttonHTML = function(e, t, n) {
    var r = "";
    var i = this.bookingScreenUI;
    var s = "btn-book-org";
    if (t.isApplyPrice()) {
        r = "申 请";
        s = "btn-apply-org"
    } else {
        r = i.getButtonMsg("预 订")
    }
    this.text('<div class="t_bk">');
    this.append("<a", n, ' data-evtDataId="' + this.newid("") + '" class="' + s + '" href="#">' + r + "</span></a>");
    this.text("</div>")
};
$jex.register("ZiyouxingOnewayFlightWrapperUI", ZiyouxingOnewayFlightWrapperUI);
$jex.extendClass(TcabinOnewayFlightWrapperUI, OnewayFlightWrapperUI);
TcabinOnewayFlightWrapperUI.prototype.insert_vendorInfo = function(e) {
    var t = e.lijian();
    var n = t ? '(<i class="rmb">&yen;</i>' + t + "/人)" : "";
    var r = "v-type-tcabin";
    var i = "低价特惠";
    var s = "js_v_type" + this._GID_;
    if (e.isPgPrivilege && e.isPgPrivilege()) {
        r = "v-type-tcabin-pg";
        i = "低价特惠(套餐)";
        this._isTcabinPkg = true
    }
    if (e.isSelf()) {
        i = "自营" + i
    }
    var o = this._getTcabinTips(e);
    this.text(['<div class="v0">', '<a class="v-type-icon ', r, ' p-tip-trigger" ', $jex.ie == 6 ? 'href="javascript:;"' : "", ' id="', s, '" data-type="', r, '">', '<span class="ico"></span>', '<span class="t-vendor-name">', i, "</span>", o, "</a></div>"].join(""))
};
TcabinOnewayFlightWrapperUI.prototype.getDefaultTGQInfo = function(e) {
    var t = TcabinOnewayFlightWrapperUI.superclass.getDefaultTGQInfo.call(this, e);
    return this.getTgqAfterFix(e, t)
};
TcabinOnewayFlightWrapperUI.prototype.getTgqAfterFix = function(e, t) {
    var n = e;
    var r = n.lijian();
    var i = '<p class="prefix"> 此产品参与<span class="hg">立减</span>促销活动，退票或改签适用以下促销退改签规则： </p>';
    var s = '<p class="suffix"> 附加说明：<br>如立减促销产品退改规则不能满足您的需求，请选购非立减促销产品或放弃立减优惠。（儿童票不参与立减促销活动）</p>';
    return i + t + s
};
TcabinOnewayFlightWrapperUI.prototype.getPriceLabels = function(e) {
    var t = e;
    var n = t.vendor();
    var r = FlagshipOnewayFlightWrapperUI.superclass.getPriceLabels.call(this, t);
    var i = [];
    var s = t.lijian();
    if (s && t.isShowLijianIcon()) {
        i.push(this.getPreferencesLabel(t))
    }
    return r.concat(i)
};
TcabinOnewayFlightWrapperUI.prototype.getPreferencesLabel = function(e) {
    var t = ConfigManager.getConfig("OnewayListLabels");
    var n = t["preferences"];
    var r = e.lijian();
    n.text = '立减<i class="rmb">&yen;</i>' + r;
    return n
};
TcabinOnewayFlightWrapperUI.prototype._getTcabinTips = function(e) {
    var t = !this._isTcabinPkg ? ['<li class="c1 c-last">', '<i class="c-ico"></i>', '<div class="c-wrap-row">', '<p class="c-name">确保低价</p>', '<p class="c-detail">提供超低票价</p>', "</div>", "</li>"].join("") : ['<li class="c1">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">含接送机代金券</p>', '<p class="c-detail">去哪儿专车代金券</p>', "</div>", "</li>", '<li class="c2">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">含航意险</p>', '<p class="c-detail">意外保险</p>', "</div>", "</li>", '<li class="c3 c-last">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">确保低价</p>', '<p class="c-detail">超低票价</p>', "</div>", "</li>"].join("");
    var n = this._getTipHTML(['<div class="p-tips-img"></div>', '<ul class="p-tips-info clrfix">', t, "</ul>"].join(""), "js-wrapper-logo-tip");
    return n
};
$jex.register("TcabinOnewayFlightWrapperUI", TcabinOnewayFlightWrapperUI);
$jex.extendClass(PriceKingOnewayFlightWrapperUI, OnewayFlightWrapperUI);
PriceKingOnewayFlightWrapperUI.prototype.insert_vendorInfo = function(e) {
    var t = "js_v_type" + this._GID_;
    var n = "性价比王";
    if (e.isSelf()) {
        n = "自营" + n
    }
    this.text(['<div class="v0">', '<a class="v-type-icon v-type-priceking p-tip-trigger" ', $jex.ie == 6 ? 'href="javascript:;"' : "", ' id="', t, '" data-type="v-type-priceking">', '<span class="ico"></span>', '<span class="t-vendor-name">', n, "</span>", this.getPriceKingTips(), "</a></div>"].join(""))
};
PriceKingOnewayFlightWrapperUI.prototype.getPriceKingTips = function() {
    if (this._tips) {
        return this._tips
    }
    this._tips = this._getTipHTML(['<div class="p-tips-img"></div>', '<ul class="p-tips-info clrfix">', '<li class="c1 c-last">', '<i class="c-ico"></i>', '<div class="c-wrap-row">', '<p class="c-name">超值退改</p>', '<p class="c-detail"></p>', "</div>", "</li>", "</ul>"].join(""), "js-wrapper-logo-tip");
    return this._tips
};
$jex.register("PriceKingOnewayFlightWrapperUI", PriceKingOnewayFlightWrapperUI);
$jex.extendClass(YouFeiDaiOnewayFlightWrapperUI, OnewayFlightWrapperUI);
YouFeiDaiOnewayFlightWrapperUI.prototype.insert_vendorInfo = function(e) {
    var t = "v-type-youfeidai";
    var n = "非常贷";
    var r = "js_v_type" + this._GID_;
    if (e.isSelf()) {
        n = "自营" + n
    }
    this.text(['<div class="v0">', '<a class="v-type-icon ' + t + ' p-tip-trigger" ', $jex.ie == 6 ? 'href="javascript:;"' : "", ' id="', r, '" data-type="', t, '">', '<span class="ico"></span>', '<span class="t-vendor-name">', n, "</span>", "</a></div>"].join(""))
};
YouFeiDaiOnewayFlightWrapperUI.prototype.getPriceLabels = function(e) {
    var t = e;
    var n = YouFeiOnewayFlightWrapperUI.superclass.getPriceLabels.call(this, t);
    var r = [];
    var i = ConfigManager.getConfig("OnewayListLabels");
    var s = e.ufdPrice();
    if (s) {
        var o = i["youfeidai"];
        var u = e.afeePrice() || e.bprPrice();
        o.text = '贷<i class="rmb">&yen;</i>' + s;
        o.content = this._getTipHTML(["机票总价", u, '元，此次需要付现金<font color="#FF7103">', u - s, "元</font><br>去哪儿网为您提供", s, "元贷款，还款期限为半年。请仔细阅读后预订此产品。参加去哪儿网活动即可抽奖，有机会减免还款。"].join(""));
        o && r.push(o)
    }
    return n.concat(r)
};
$jex.register("YouFeiDaiOnewayFlightWrapperUI", YouFeiDaiOnewayFlightWrapperUI);
(function(e) {
    function i(e) {
        (new Image).src = "http://log.flight.qunar.com/l.gif?s=flight&p=onewayList" + e + "&t=" + (new Date).getTime()
    }

    function s(e) {
        s.superclass.constructor.call(this, e);
        this._type = "FuzzyOnewayFlightWrapperUI"
    }

    function o(e) {
        o.superclass.constructor.call(this, e)
    }
    var t = $jex.ie == 6;
    var n = {
        "早起": 0,
        "正午": 1,
        "午后": 2,
        "晚间": 3
    };
    var r = {
        "早起": "00:00 - 10:00",
        "正午": "10:00 - 14:00",
        "午后": "14:00 - 19:00",
        "晚间": "19:00 - 24:00"
    };
    $jex.extendClass(s, OnewayFlightWrapperUI);
    s.prototype.update = function(e) {
        try {
            var t = e;
            this.wrapperEntity = e;
            var n = t.dataSource();
            var r = this._GID_;
            var i = "";
            this.text('<div class="qvt-column" id="js-flightbar' + r + '">');
            this.insert_vendorInfo(t);
            this.insert_labelInfo(t);
            this.insert_tgqInfo(t);
            this.insert_PRICE(t);
            this.insert_insureInfo(t);
            this.insert_priceLable(t);
            this.insert_BOOKING_BUTTON(t);
            this.text("</div>");
            this._bindHoverEvent(t);
            this.bindBookingEvent(t)
        } catch (t) {
            this.clear()
        }
    };
    s.prototype.insert_vendorInfo = function(e) {
        var t = e;
        var r = t.dataSource();
        var i = r.periodDesc;
        var s = r.timeRange.split("-");
        this.timeRange = s[0] + " - " + s[1];
        this.text('<div class="v0 clrfix">' + '<div class="v-type-icon v-type-time' + (n[i] || 0) + '">' + '<span class="ico"></span>' + '<span class="t-time-name"><em>' + i + "航班</em>" + this.timeRange + "&nbsp;起飞</span>" + "</div>" + "</div>")
    };
    s.prototype.getDefaultTGQInfo = function() {
        return '<em>更改条件：</em>不允许改期<br><em>退票条件：</em>不允许退票 <br><em>签转条件：</em>不可签转<p class="tips"><i>*</i>仅供参考,以订单标注的退改签规定为准。</p>'
    };
    s.prototype.requestTgq = function(e, t) {
        var n = this;
        var r = t;
        var i = "/twell/flight/getTGQ.jsp";
        var s = n.find("tgq_notice");
        var o = "";
        var u = this.getDefaultTGQInfo();
        var a = r.dataSource().wrid;
        var f = r.dataSource().cabin;
        var l = r.dataSource().dd;
        var c = new Date;
        $jex.jsonp(i, {
            needPercentTgqText: false,
            flightNum: "**",
            deptAirport: "*",
            arrAirport: "*",
            deptDate: l.replace(/-/g, ""),
            printPrice: r.parValue() || 1,
            wrapperId: a,
            cabin: f,
            policyId: 0,
            maxSellPrice: 0,
            minSellPrice: 0,
            tag: "EVF",
            isTHFXLow: true
        }, function(e) {
            n.loadedTgq = true;
            if (!e || e && !e.tgqAdult) {
                s.innerHTML = u;
                return
            }
            o = e.tgqAdult;
            s.innerHTML = n.getFullTgqStr(e, r)
        }, {
            timeout: {
                time: 2e3,
                func: function() {
                    if (!o) s.innerHTML = u
                }
            }
        })
    };
    s.prototype.getLabels = function(e) {
        var t = [];
        var n = ConfigManager.getConfig("OnewayListLabels");
        var r = n["allDays"];
        r.content = this._getTipHTML("7*24小时服务");
        t.push(r);
        return t
    };
    s.prototype._buttonHTML = function(e, t, n) {
        var r = "";
        var i = this.bookingScreenUI;
        var s = e === "bpr" ? t.bpackagePrice() : t.packagePrice();
        var o = "btn-book-org";
        r = "预 订";
        this.text('<div class="t_bk">');
        if (n) {
            this.append("<a", n, ' data-evtDataId="' + this.newid("") + '" class="' + o + '" href="#">' + r + "</span></a>")
        } else {
            this.text('<a class="btn-book-org" href="javascript:void(0)"><span><b>' + r + "</b></span></a>")
        }
        this.text("</div>")
    };
    s.prototype.bindBookingEvent = function(e) {
        this.onInit(function() {
            $jex.event.bind(this.find("js-flightbar"), "click", function() {
                LockScreen(function() {
                    var t = e._booking_url();
                    i("&r=fuzzyflight&action=booking");
                    window.open(t)
                })
            })
        })
    };
    s.prototype.getDeptTimeRangeValue = function() {
        if (typeof this._deptTimeRangeValue == "undefined" || this._deptTimeRangeValue == null) {
            this._deptTimeRangeValue = n[this.wrapperEntity.dataSource().periodDesc]
        }
        return this._deptTimeRangeValue
    };
    $jex.extendClass(o, XControl);
    o.prototype.ownerFuzzyFlightUI = function(e) {
        if (arguments.length) {
            this._ownerFuzzyFlightUI = e
        } else {
            return this._ownerFuzzyFlightUI
        }
    };
    o.prototype.updateEntity = function(e) {
        var t = this;
        if (e) {
            this.clear();
            t._cachelist = [];
            for (var n = 0; n < e.length; n++) {
                var r = new OnewayFlightWrapperEntity;
                r.dataSource(e[n]);
                var i = new s({});
                i.update(r);
                t.append("", i, "");
                t._cachelist.push(i)
            }
            t.render()
        }
        var o = t.refresh(),
            u = o.length;
        var a = t.ownerFuzzyFlightUI(),
            f;
        if (u) {
            a.show();
            f = Math.min.apply(null, o);
            a.refreshPrice(f)
        } else {
            a.hide()
        }
    };
    o.prototype.refresh = function() {
        var e = this;
        var t = e.ownerFuzzyFlightUI();
        var n = [];
        var i = (window.System.analyzer.getDataSet().getFiltersMap("起飞时间") || {}).value;
        var s = true;
        $jex.foreach(e._cachelist || [], function(e) {
            var t = $jex.$("js-flightbar" + e._GID_);
            var o = e.wrapperEntity;
            var u = o.dataSource();
            var a = r[u.periodDesc] == e.timeRange;
            if (!i || !i.length || $jex.array.indexOf(i, e.getDeptTimeRangeValue()) > -1 && a) {
                $jex.element.show(t);
                n.push(e.wrapperEntity.afeePrice() || e.wrapperEntity.bprPrice());
                if (s) {
                    $jex.addClassName(t, "qvt-column-first");
                    s = false
                } else {
                    $jex.removeClassName(t, "qvt-column-first")
                }
            } else {
                $jex.element.hide(t)
            }
        });
        return n
    };
    var u = function() {
        var e = function(t) {
            e.superclass.constructor.call(this, t);
            this.firstLoad = true;
            var n = 0;
            this.state = function(e) {
                if (e == null) {
                    return n
                } else {
                    n = e;
                    $jex.event.trigger(this, "stateChanged", e, this)
                }
            }
        };
        $jex.extendClass(e, XControl);
        e.prototype.loadData = function(e) {
            try {
                this.clear();
                this.data = e;
                if (!e) {
                    this.hide();
                    return false
                } else {
                    !this.lock() && this.show()
                }
                var t = function() {
                    var t;
                    var n = e.priceInfo;
                    for (t in n) {
                        return n[t]
                    }
                }();
                this.update(t);
                this.render();
                this.trackLoad();
                this._bindEvent();
                this.fillWrapper()
            } catch (n) {}
        };
        e.prototype.update = function(e) {
            this.dataSource(e);
            this.append("<div", "js-itemBar", ' class="avt-column');
            if (this.state()) {
                this.text(" avt-column-on ")
            }
            this.text('">');
            this.text('<div class="b-avt-lst">');
            this.text(this._getStaticUI());
            this.text("</div>");
            this.updateVendors();
            this.text("</div>")
        };
        e.prototype._getStaticUI = function() {
            var e = this.dataSource();
            var n = [];
            n.push('<div class="c0"></div>');
            n.push('<div class="c1">');
            n.push('<div class="vlc-wp"><div class="vlc-ref"></div><div class="vlc-con">');
            n.push('<div class="air-wp">');
            n.push('<div class="air-row">');
            n.push('<a class="a-name p-tip-trigger fuzzyflight-name" ' + (t ? 'href="javascript:;"' : "") + ">" + '<div class="name-tit"><span class="ico"></span><span class="name-txt">超值飞</span><span class="tri"><div class="arr"><p class="arr-o">◆</p><p class="arr-i">◆</p></div></span></div>' + '<div class="p-tips-cont"><div class="p-tips-wrap">' + '<div class="p-tips-arr p-tips-arr-t"><p class="arr-o">◆</p><p class="arr-i">◆</p></div>' + '<div class="p-tips-content">' + "<dl>" + "<dt>超值飞说明</dt>" + "<dd>您可根据起飞时间段选择购买超值飞产品，实际乘坐航班将在此时间段内起飞；</dd>" + "<dd>出票完成后第一时间将告知您具体航班号、起降时间及机场信息，请您放心购买</dd>" + "</dl>" + "</div>" + "</div></div>" + "</a>");
            n.push("</div>");
            n.push("</div>");
            n.push("</div></div>");
            n.push("</div>");
            var r = System.service.param;
            n.push('<div class="c2">');
            n.push('<div class="vlc-wp"><div class="vlc-ref"></div><div class="vlc-con">');
            n.push('<div class="a-dep-city">' + r.fromCity + "</div>");
            n.push("</div></div>");
            n.push("</div>");
            n.push('<div class="c3"><div class="bg-tm"><p class="bg"></p></div></div>');
            n.push('<div class="c4">');
            n.push('<div class="vlc-wp"><div class="vlc-ref"></div><div class="vlc-con">');
            n.push('<div class="a-arr-city">' + r.toCity + "</div>");
            n.push("</div></div>");
            n.push("</div>");
            n.push('<div class="c5-6"><div class="vlc-wp"><div class="vlc-ref"></div><div class="vlc-con"><div class="a-sure-ticket">保证出票</div></div></div></div>');
            n.push('<div class="c7">');
            n.push('<div class="a-price" id="js-fuzzy-price">');
            n.push(this._getPriceWrapHtml());
            n.push("</div>");
            n.push(this._getOpenBtn());
            n.push("</div>");
            this.text(n.join(""))
        };
        e.prototype._getPriceWrapHtml = function(e) {
            var t = this.dataSource();
            var n = e || t.lowpr;
            var r = t.op;
            var i;
            var s = [];
            if (n && n != 1e5) {
                s.push('<div class="a-low-prc"><i class="rmb">¥</i>' + Price_html_wide.getHTML(n) + "</div>");
                if (r) {
                    i = Math.round(n / t.op * 100) / 10;
                    s.push('<div class="a-prc-ex">' + PriceUtil.getOneWayDiscount(i) + "</div>")
                }
            } else {
                s.push('<div class="a-prc-ex"><div>暂无报价</div></div>')
            }
            return s.join("")
        };
        e.prototype.refreshPrice = function(e) {
            if (e) {
                $jex.$("js-fuzzy-price").innerHTML = this._getPriceWrapHtml(e)
            }
        };
        e.prototype._getOpenBtn = function() {
            var e = [];
            var t = "js-openwrapperbtn" + this._GID_;
            e.push('<div class="a-booking"><a hidefocus="on" onfocus="this.blur();" id="' + t + '" title="点击查看订票网站" href="#" class="btn-book"><i class="ico-arr"></i>订&nbsp;&nbsp;票</a></div>');
            return e.join("")
        };
        e.prototype.fillWrapper = function() {
            var e = this;
            var t = e.wrapperListUI();
            if (e.lastFillWrapper) {
                t.updateEntity();
                return false
            }
            var n = function(e) {
                var t = e.priceData || {};
                var n;
                for (n in t) {
                    return t[n]
                }
            }(this.data);
            t.updateEntity(n);
            if (System.service.isOnewaySearchEnd()) {
                this.lastFillWrapper = true
            }
        };
        e.prototype._bindEvent = function() {
            var e = this;
            var t = this.find("js-itemBar");
            var n = this.find("js-openwrapperbtn");
            var r = this.find("js-vendorlist");
            $jex.event.bind(n, "click", function(n) {
                n = n || window.event;
                n.preventDefault && n.preventDefault();
                var s = "avt-column-on";
                if (!$jex.hasClassName(t, s)) {
                    i("&r=fuzzyflight&action=open");
                    $jex.addClassName(t, "avt-column-on");
                    $jex.element.show(r);
                    e.state(1);
                    e.loadAD();
                    $jex.event.trigger(e, "openAfterFuzzyWrapperList")
                } else {
                    e.hideVendorPanel()
                }
                return false
            });
            $jex.hover({
                act: e.find("js-itemBar"),
                onmouseover: function(e) {
                    $jex.addClassName(this, "avt-column-hover")
                },
                onmouseout: function(e) {
                    $jex.removeClassName(this, "avt-column-hover")
                }
            })
        };
        e.prototype.hideVendorPanel = function() {
            if (this.state() == 0) {
                return false
            }
            $jex.removeClassName(this.find("js-itemBar"), "avt-column-on");
            $jex.element.hide(this.find("js-vendorlist"));
            this.state(0)
        };
        e.prototype.updateVendors = function() {
            var e = "display:block";
            var t = this._GID_;
            if (this.state() == 0) {
                e = "display:none"
            }
            this.text('<div id="js-vendorlist' + t + '" style="' + e + '">');
            this.text('<div class="b-qvt-lst">');
            this.text('<div class="e-qvt-ct" style="*zoom: 1;*position: relative;*z-index: 3;">');
            this.text('<div id="js-wrapper-list' + t + '" ></div>');
            this.text('<div class="fuzzy-notice">具体航班和起降时间将在出票完成后，第一时间短信通知您，请放心购买。</div>');
            this.text("</div>");
            this.text('<div class="qvt_col_hide"><a class="lnk_more lnk_more_hd" href="##"  id="js-hide-list' + t + '"><i class="ico_down"></i></a>' + "</div>");
            this.text("</div>");
            this.append("<div", "extAd_panel", ' class="extAD"></div>');
            this.text("</div>");
            this.onInit(function() {
                var e = this;
                $jex.event.bind(e.find("js-hide-list"), "click", function(t) {
                    t = t || window.event;
                    t.preventDefault && t.preventDefault();
                    e.hideVendorPanel();
                    return false
                })
            })
        };
        e.prototype.loadAD = function() {
            var e = this;
            clearTimeout(e._ad_timer);
            e._ad_timer = setTimeout(function() {
                var t = e.newid("extAd");
                var n = e.find("extAd_panel");
                if (n) {
                    n.innerHTML = '<iframe id="' + t + '" querystring="chan=flight&pg=list&pos=mid&site=qunar&size=912x90" scrolling="no" frameborder="0" height="0" width="100%" src="/site/adframe/ad.html#' + t + '#now"></iframe>'
                }
            }, 100)
        };
        e.prototype.wrapperListUI = function() {
            if (!this.listUI) {
                this.listUI = new o({
                    elemId: "js-wrapper-list" + this._GID_
                });
                this.listUI.ownerFuzzyFlightUI(this)
            }
            return this.listUI
        };
        e.prototype.show = function() {
            if (!this.data) {
                return false
            }
            $jex.element.show(this.elem())
        };
        e.prototype.hide = function() {
            $jex.element.hide(this.elem())
        };
        e.prototype.trackLoad = function() {
            if (this.firstLoad) {
                var e = this.dataSource();
                var t = e.lowpr;
                i("&r=fuzzyflight&action=load&lowPrice=" + t)
            }
            this.firstLoad = false
        };
        e.prototype.lock = function(e) {
            if (arguments.length) {
                this.lockStatus = e
            } else {
                return this.lockStatus
            }
        };
        return e
    }();
    e.FuzzyFlightUI = u
})(window);
$jex.extendClass(FcCabinOnewayFlightWrapperUI, OnewayFlightWrapperUI);
FcCabinOnewayFlightWrapperUI.prototype.insert_vendorInfo = function(e) {
    var t = "v-type-fccabin";
    var n = "头等舱";
    var r = "js_v_type" + this._GID_;
    var i = this._getCabinTips(e);
    if (e.isSelf()) {
        n = "自营" + n
    }
    this.text(['<div class="v0">', '<a class="v-type-icon ', t, ' p-tip-trigger" ', $jex.ie == 6 ? 'href="javascript:;"' : "", ' id="', r, '" data-type="', t, '">', '<span class="ico"></span>', '<span class="t-vendor-name">', n, "</span>", i, "</a></div>"].join(""))
};
FcCabinOnewayFlightWrapperUI.prototype._getCabinTips = function(e) {
    var t = ['<li class="c1">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">尊享豪华服务</p>', '<p class="c-detail">顶级豪华服务，自在随心</p>', "</div>", "</li>", '<li class="c2 c-last">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">服务优先</p>', '<p class="c-detail">24小时服务</p>', "</div>", "</li>"].join("");
    var n = this._getTipHTML(['<div class="p-tips-img"></div>', '<ul class="p-tips-info clrfix">', t, "</ul>"].join(""), "js-wrapper-logo-tip");
    return n
};
FcCabinOnewayFlightWrapperUI.prototype.getPriceLabels = function(e) {
    var t = e;
    var n = FcCabinOnewayFlightWrapperUI.superclass.getPriceLabels.call(this, t);
    var r = ConfigManager.getConfig("OnewayListLabels");
    var i = r["FcCabinProduct"];
    i.text = t.typeOfCabin() || i.text;
    var s = t.getCabinProductTipmsg();
    if (s != "") {
        var o = s && s.split("&");
        var u = "";
        $jex.each(o, function(e) {
            u += e + "<br/>"
        });
        i.content = this._getTipHTML(u)
    }
    n.push(i);
    return n
};
$jex.register("FcCabinOnewayFlightWrapperUI", FcCabinOnewayFlightWrapperUI);
$jex.extendClass(BcCabinOnewayFlightWrapperUI, OnewayFlightWrapperUI);
BcCabinOnewayFlightWrapperUI.prototype.insert_vendorInfo = function(e) {
    var t = "v-type-bccabin";
    var n = "商务舱";
    var r = "js_v_type" + this._GID_;
    var i = this._getCabinTips(e);
    if (e.isSelf()) {
        n = "自营" + n
    }
    this.text(['<div class="v0">', '<a class="v-type-icon ', t, ' p-tip-trigger" ', $jex.ie == 6 ? 'href="javascript:;"' : "", ' id="', r, '" data-type="', t, '">', '<span class="ico"></span>', '<span class="t-vendor-name">', n, "</span>", i, "</a></div>"].join(""))
};
BcCabinOnewayFlightWrapperUI.prototype.getPriceLabels = function(e) {
    var t = e;
    var n = BcCabinOnewayFlightWrapperUI.superclass.getPriceLabels.call(this, t);
    var r = ConfigManager.getConfig("OnewayListLabels");
    var i = r["BcCabinProduct"];
    i.text = t.typeOfCabin() || i.text;
    var s = t.getCabinProductTipmsg();
    if (s != "") {
        var o = s && s.split("&");
        var u = "";
        $jex.each(o, function(e) {
            u += e + "<br/>"
        });
        i.content = this._getTipHTML(u)
    }
    n.push(i);
    return n
};
BcCabinOnewayFlightWrapperUI.prototype._getCabinTips = function(e) {
    var t = ['<li class="c1">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">报销无忧</p>', '<p class="c-detail">提供报销凭证</p>', "</div>", "</li>", '<li class="c2 c-last">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">服务优先</p>', '<p class="c-detail">24小时服务</p>', "</div>", "</li>"].join("");
    var n = this._getTipHTML(['<div class="p-tips-img"></div>', '<ul class="p-tips-info clrfix">', t, "</ul>"].join(""), "js-wrapper-logo-tip");
    return n
};
$jex.register("BcCabinOnewayFlightWrapperUI", BcCabinOnewayFlightWrapperUI);
$jex.extendClass(FpCabinOnewayFlightWrapperUI, OnewayFlightWrapperUI);
FpCabinOnewayFlightWrapperUI.prototype.insert_vendorInfo = function(e) {
    var t = "v-type-lpcabin";
    var n = "全价经济";
    var r = "js_v_type" + this._GID_;
    var i = this._getCabinTips(e);
    if (e.isSelf()) {
        n = "自营" + n
    }
    this.text(['<div class="v0">', '<a class="v-type-icon ', t, ' p-tip-trigger" ', $jex.ie == 6 ? 'href="javascript:;"' : "", ' id="', r, '" data-type="', t, '">', '<span class="ico"></span>', '<span class="t-vendor-name">', n, "</span>", i, "</a></div>"].join(""))
};
FpCabinOnewayFlightWrapperUI.prototype._getCabinTips = function(e) {
    var t = ['<li class="c1">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">报销无忧</p>', '<p class="c-detail">提供报销凭证</p>', "</div>", "</li>", '<li class="c2 c-last">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">服务优先</p>', '<p class="c-detail">24小时服务</p>', "</div>", "</li>"].join("");
    var n = this._getTipHTML(['<div class="p-tips-img"></div>', '<ul class="p-tips-info clrfix">', t, "</ul>"].join(""), "js-wrapper-logo-tip");
    return n
};
FpCabinOnewayFlightWrapperUI.prototype.getPriceLabels = function(e) {
    var t = e;
    var n = FpCabinOnewayFlightWrapperUI.superclass.getPriceLabels.call(this, t);
    var r = ConfigManager.getConfig("OnewayListLabels");
    var i = r["FpCabinProduct"];
    i.text = t.typeOfCabin() || i.text;
    var s = t.getCabinProductTipmsg();
    if (s != "") {
        var o = s && s.split("&");
        var u = "";
        $jex.each(o, function(e) {
            u += e + "<br/>"
        });
        i.content = this._getTipHTML(u)
    }
    n.push(i);
    return n
};
$jex.register("FpCabinOnewayFlightWrapperUI", FpCabinOnewayFlightWrapperUI);
$jex.extendClass(PeCabinOnewayFlightWrapperUI, OnewayFlightWrapperUI);
PeCabinOnewayFlightWrapperUI.prototype.insert_vendorInfo = function(e) {
    var t = "v-type-pecabin";
    var n = "经济舱精选";
    var r = "js_v_type" + this._GID_;
    var i = this._getCabinTips(e);
    if (e.isSelf()) {
        n = "自营" + n
    }
    this.text(['<div class="v0">', '<a class="v-type-icon ', t, ' p-tip-trigger" ', $jex.ie == 6 ? 'href="javascript:;"' : "", ' id="', r, '" data-type="', t, '">', '<span class="ico"></span>', '<span class="t-vendor-name">', n, "</span>", i, "</a></div>"].join(""))
};
PeCabinOnewayFlightWrapperUI.prototype._getCabinTips = function(e) {
    var t = ['<li class="c1">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">尊享超值服务</p>', '<p class="c-detail">经济舱价格享受超值服务</p>', "</div>", "</li>", '<li class="c2 c-last">', '<i class="c-ico"></i>', '<div class="c-wrap">', '<p class="c-name">服务优先</p>', '<p class="c-detail">24小时服务</p>', "</div>", "</li>"].join("");
    var n = this._getTipHTML(['<div class="p-tips-img"></div>', '<ul class="p-tips-info clrfix">', t, "</ul>"].join(""), "js-wrapper-logo-tip");
    return n
};
PeCabinOnewayFlightWrapperUI.prototype.getPriceLabels = function(e) {
    var t = e;
    var n = PeCabinOnewayFlightWrapperUI.superclass.getPriceLabels.call(this, t);
    var r = ConfigManager.getConfig("OnewayListLabels");
    var i = r["PeCabinProduct"];
    i.text = t.typeOfCabin() || i.text;
    var s = t.getCabinProductTipmsg();
    if (s != "") {
        var o = s && s.split("&");
        var u = "";
        $jex.each(o, function(e) {
            u += e + "<br/>"
        });
        i.content = this._getTipHTML(u)
    }
    n.push(i);
    return n
};
$jex.register("PeCabinOnewayFlightWrapperUI", PeCabinOnewayFlightWrapperUI);
$jex.extendClass(HistoryPriceUI, XControl);
$jex.register("HistoryPriceUI", HistoryPriceUI);
HistoryPriceUI.prototype.update = function(e) {
    var t = e.flightHistory();
    if (!t || t.length != 2 || !t[0] || !t[1] || !e.lowestPrice()) {
        this.state(0);
        return
    } else {
        this.state(1)
    }
    this.clear();
    this.append('<span class="y_pt" ', "hlbar");
    this.text(">", this.description(e), "</span>");
    this.onInit(function() {
        $jex.event.binding(this.find("hlbar"), this, "mouseover", function(e) {
            HistoryPriceUI.historyPrice.show(e, this.dataSource())
        });
        $jex.event.binding(this.find("hlbar"), this, "mousemove", function(e) {
            HistoryPriceUI.historyPrice.move(e)
        })
    })
};
HistoryPriceUI.prototype.description = function(e) {
    var t = HistoryPriceUI.AvgPriceIcon(e.flightHistory(), e.lowestPrice());
    return t.msg
};
HistoryPriceUI.languageVars = {
    _HISTORYPRICE: {
        arrow: ["大幅上涨", "小幅上涨", "稳定波动", "小幅下跌", "大幅下跌"],
        noinfo: "暂无走势",
        title: "走势",
        template: ["过去7天最低报价", "出发", "* 仅供参考", "近期："]
    }
};
HistoryPriceUI.AvgPriceIcon = function(e, t) {
    if (e == null) {
        return ""
    }
    var n = HistoryPriceUI.languageVars;
    var r = parseFloat(e[1]);
    var i = parseInt(t);
    var s = "http://simg1.qunarzz.com/flighthistory/icons/";
    var o = "";
    var u = "";
    var a = "";
    if (i >= r * 1.3) {
        u = "icon_history_0.gif";
        a = n._HISTORYPRICE.arrow[0];
        o = "up"
    }
    if (i > r * 1.05 && i < r * 1.3) {
        u = "icon_history_1.gif";
        a = n._HISTORYPRICE.arrow[1];
        o = "up"
    }
    if (i <= r * 1.05 && i >= r * .95) {
        u = "icon_history_2.gif";
        a = n._HISTORYPRICE.arrow[2];
        o = "normal"
    }
    if (i < r * .95 && i > r * .7) {
        u = "icon_history_3.gif";
        a = n._HISTORYPRICE.arrow[3];
        o = "down"
    }
    if (i <= r * .7) {
        u = "icon_history_4.gif";
        a = n._HISTORYPRICE.arrow[4];
        o = "down"
    }
    return {
        msg: a,
        img: "<img src='" + s + u + "' />",
        level: o
    }
};
HistoryPriceUI.historyPrice = new function() {
    var e = this;
    this.getPricePx = function(e) {
        var t = 62;
        var n = 14;
        var r = 76;
        var i = this.pricerange;
        var s = e - i.lowestPrice;
        if (s < 0) return r;
        if (s > i.highestPrice - i.lowestPrice) return 0;
        var o = (i.highestPrice - i.lowestPrice) / Math.abs(n - t);
        return t - (e - i.lowestPrice) / o
    };
    this.praseHistory = function(e) {
        if (!e) return null;
        var t = e[1];
        var n = e[0].split("|");
        var r = parseInt(n[0], 10);
        var i = parseInt(n[2], 10);
        this.pricerange = {
            highestPrice: r,
            lowestPrice: i,
            sevendaysAvgPrice: t
        };
        return this.pricerange
    };
    this.showed = false;
    this.show = function(e, t) {
        var n = HistoryPriceUI.languageVars;
        var r = t.flightInfo();
        var i = QunarDate.format(SERVER_TIME);
        var s = r.dd;
        var o = t.deptCity().en.toUpperCase();
        var u = t.arriCity().en.toUpperCase();
        var a = r.co;
        var f = s + o + u + a;
        var l = "";
        var c = this.praseHistory(t.flightHistory());
        var l = "http://simg1.qunarzz.com/flighthistory/pics/";
        var h = HistoryPriceUI.AvgPriceIcon(t.flightHistory(), t.lowestPrice());
        var p = {
            code: a,
            deptcitycn: t.deptCity().zh,
            arricitycn: t.arriCity().zh,
            deptdate: s,
            imageurl: f,
            pointleft: 0,
            pointtop: this.getPricePx(t.lowestPrice()) - 6
        };
        var d = ['<div class="innerBody"><div class="arrow"><p class="arr_o">◆</p><p class="arr_i">◆</p></div>', "<h5><em>", p.code, "</em> <span>", n._HISTORYPRICE.template[0], " (", n._HISTORYPRICE.template[3], h.msg, ")</span></h5>", '<p class="info"><span>', p.deptcitycn, "</span>-<span>", p.arricitycn, "</span> <span>", p.deptdate, " ", n._HISTORYPRICE.template[1], "</span>	</p>", '<div class="img"><div style="width:250px; height:108px; background-image:url(', l, p.imageurl, ".gif?", QunarDate.format(SERVER_TIME).replace(/-/g, ""), ')">', '<div class="redline" style="left:', p.pointleft, "px; top:", p.pointtop, 'px;"></div>', '</div></div><p class="note">', n._HISTORYPRICE.template[2], "</p></div>"].join("");
        $jex.$("Lw_historyprice").innerHTML = d;
        this.showed = true;
        this.move(e);
        $jex.$("Lw_historyprice").style.visibility = "visible";
        $jex.stopEvent(e);
        return false
    };
    this.move = function(e) {
        if (this.showed == false) return;
        if (!e) e = window.event;
        var t = $jex.pointerX(e) + 40;
        var n = $jex.pointerY(e) - 45;
        $jex.$("Lw_historyprice").style.left = t + "px";
        $jex.$("Lw_historyprice").style.top = n + "px";
        $jex.stopEvent(e);
        return false
    };
    this.hide = function() {
        if (this.showed == false) return;
        $jex.$("Lw_historyprice").style.visibility = "hidden";
        this.showed = false
    };
    $jex.event.binding(document, "mouseover", function() {
        e.hide()
    })
};
$jex.extendClass(FlightInfoExtBarUI, XControl);
FlightInfoExtBarUI.prototype.update = function(e) {
    this.clear();
    var t = e.extInfo();
    this.text('<div id="hdivSort" class="hdivSort"></div>');
    var n = [];
    if (t) {
        if (e.type == "onewayInTransfer") {
            if (t.fdt) {
                n.push("飞行" + t.fdt)
            }
        }
        var r = t.acf && parseInt(t.acf, 10) || 0;
        if (t.fot || r) {
            n.push(["机建/燃油：", '<span class="y_prc"><i class="rmb">&yen;</i>', r, "</span>", '&nbsp;/&nbsp;<span class="y_prc"><i class="rmb">&yen;</i>', t.fot, "</span>"].join(""))
        }
        n.push(t.ml == "true" ? "有餐食" : "无餐食");
        n.push(t.zj && t.zj.info != "" ? "有网上值机" : "无网上值机")
    }
    this.text('<div class="c_fly_info">');
    this.text(n.join('<em class="sep_line">|</em>'));
    this.hpUI.dataSource(e);
    this.hpUI.updateSource();
    if (this.hpUI.state()) {
        if (n.length > 0) {
            this.text('<em class="sep_line">|</em>')
        }
        this.append("近期价格走势：", this.hpUI)
    }
    this.text("</div>");
    if (ConfigManager.getConfig("pageId") !== "onewayDetail" || !this.wrapperList()) return;
    this.onInit(function() {
        var e = this;
        var t = e.wrapperList().wrlistUI;
        var n = e.wrapperList().mainWrlistUI;
        var r = e.wrapperList().wrlistUI.dataSource();
        var i = true;
        var s = false;
        var o = false;
        $jex.console.trace("当前排序值", t.getSortKey());
        switch (t.getSortKey()) {
            case "default":
                i = true;
                break;
            case "priceDesc":
                s = true;
                break;
            case "priceAsc":
                o = true;
                break;
            default:
                i = true;
                break
        }
        $jex.console.trace("各排序值状态", i, s, o);
        var u = new XSelect({
            elemId: "hdivSort",
            initFire: false,
            values: [{
                value: "defalut",
                name: "默认排序",
                selected: i
            }, {
                value: "priceDesc",
                name: "价格由低到高",
                selected: s
            }, {
                value: "priceAsc",
                name: "价格由高到低",
                selected: o
            }],
            on: {
                changeValue: function(e) {
                    t.setSortKey(e.value);
                    t.update(r);
                    t.flushRendor();
                    if (r.codeShare() && r.codeShareFlight()) {
                        n.setSortKey(e.value);
                        n.update(r.codeShareFlight());
                        n.flushRendor()
                    }
                    trackAction("FD|S|" + e.value)
                }
            }
        });
        u.update();
        u.render()
    })
};
var BookingScreenUI = function() {
    this.vendor = null
};
BookingScreenUI.prototype.setVendorInfo = function(e, t) {
    var n = BookingScreenUI.adjustOption;
    if (n.allBusy === true && n.isTimeRange()) {
        t.status = 2
    }
    if (n.allNoWork === true && n.isTimeRange()) {
        t.status = 1
    }
    t.wr = e;
    this.vendor = t
};
BookingScreenUI.adjustOption = {
    allBusy: false,
    allNoWork: false,
    isTimeRange: function() {
        return false
    },
    allBusyTips: function() {
        return ""
    },
    allNoWorkTips: function() {
        return ""
    }
};
BookingScreenUI.prototype.getTimeDesc = function(e) {
    var t = e;
    if (t > 60) {
        var n = Math.floor(t / 60);
        var r = t % 60;
        return n + "小时" + r + "分钟"
    } else if (t < 5) {
        return "5分钟"
    } else {
        return t + "分钟"
    }
};
BookingScreenUI.prototype.isBusy = function() {
    return this.vendor.status == 2
};
BookingScreenUI.prototype.isNowork = function() {
    return this.vendor.status == 1
};
BookingScreenUI.prototype.getButtonTips = function(e) {
    var t = BookingScreenUI.adjustOption;
    switch (this.vendor.status) {
        case 0:
            return e || "";
        case 1:
            var n = "目前为代理商非工作时间，不提供出票服务";
            if (t.allNoWork === true && t.isTimeRange()) {
                n = t.allNoWorkTips() || n
            }
            return n;
        case 2:
            var n = "";
            var r = "目前代理商业务繁忙，暂时无法提供服务，";
            var i = this.vendor.bzt || "";
            if (!i) {
                n = r + "请稍候再来预订"
            } else {
                n = r + "请在" + this.getTimeDesc(i) + "后再来预订"
            }
            if (t.allBusy === true && t.isTimeRange()) {
                n = t.allBusyTips() || n
            }
            break
    }
    return ""
};
BookingScreenUI.prototype.getButtonMsg = function(e) {
    switch (this.vendor.status) {
        case 0:
            return e || "";
        case 1:
            return "暂停服务";
        case 2:
            return "繁忙中"
    }
    return ""
};
BookingScreenUI.prototype.getStatusMsg = function(e) {
    switch (this.vendor.status) {
        case 0:
            return e || "";
        case 1:
            return "不在工作时间";
        case 2:
            return "请稍后预订"
    }
    return ""
};
BookingScreenUI.prototype.preBooking = function(e) {
    switch (this.vendor.status) {
        case 0:
            this.processBooking(e);
            break;
        case 1:
            this.showDialog("nonwork", e);
            break;
        case 2:
            this.showDialog("busy", e);
            break
    }
};
BookingScreenUI.prototype.getDialogMsg = function() {
    switch (this.vendor.status) {
        case 1:
            return "为非工作时间，暂时无法提供服务。";
        case 2:
            var e = "业务繁忙，暂时无法提供服务，";
            var t = this.vendor.bzt || "";
            if (!t) {
                return e + "请稍候再来预订，"
            } else {
                return e + "请在" + this.getTimeDesc(t) + "后再来预订，"
            }
            break
    }
};
BookingScreenUI.prototype.closeDialog = function(e) {
    var t = e.target;
    while (t != document) {
        if (t.id == BookingScreenUI.getContainerID() + "_close") {
            $jex.lightbox.hide();
            return
        }
        if (t.className == "lb_content") {
            return
        }
        t = t.parentNode
    }
    $jex.lightbox.hide();
    return
};
BookingScreenUI.prototype.close = function() {
    if (BookingScreenUI.getDlg()) {
        BookingScreenUI.getDlg().style.display = "none"
    }
};
BookingScreenUI.prototype.showDialog = function(e, t) {
    this.addStyleHTML();
    var n = BookingScreenUI.getContainerID();
    var r = this.vendor;
    var i = BookingScreenUI.getDlg();
    var s = [];
    s.push('<div class="p_layer_cont">');
    s.push('    <div style="width:480px;" class="layer_inner"> <a id="', n, '_close" href="javascript:void(0);" title="关闭" class="btn_close"></a> ');
    s.push('        <div class="e_tit_pop"></div>');
    s.push('        <div class="layer_cont">');
    s.push('            <div class="b_warn_pop_l clrfix">');
    s.push('                <div class="e_warn_ico"> <i class="ico_del_l"></i></div>');
    var o = "目前" + r.name + this.getDialogMsg() + "您可以通过其他代理商网站预订机票。";
    var u = BookingScreenUI.adjustOption;
    if (u.allNoWork === true && u.isTimeRange()) {
        o = u.allNoWorkTips() || o
    }
    s.push('                <div class="e_warn_inf"><h3>', o, "</h3>");
    s.push("                </div>");
    s.push("          </div>");
    s.push('			<table cellpadding="0" cellspacing="0" width="430" class="vinfo">');
    s.push("				<tr>");
    if (r.info.cata) {
        s.push('					<td width="25"><div title="经Qunar验证：该网站已获得《中国民用航空运输销售代理业务资格认可证书》" class="iata"></div></td>')
    } else {
        s.push('					<td width="25"><div title="经Qunar验证：该网站未获得《中国民用航空运输销售代理业务资格认可证书》" class="iata"></div></td>')
    }
    s.push('					<td width="210"><span class="hl">', r.name, "</span></td>");
    s.push('					<td width="195">');
    s.push('						<div class="praise">');
    s.push('							<div class="r" style="width:', parseFloat(r.star.lv.kd) * 2 * 10, '%;"></div>');
    s.push("						</div>");
    s.push("					</td>");
    s.push("				</tr>");
    s.push("				<tr>");
    s.push("					<td></td>");
    s.push('					<td colspan="2"><div class="name">', r.info.cname, "</div>");
    s.push('						<table cellpadding="0" cellspacing="0" class="contact">');
    s.push("							<tr>");
    s.push('								<td colspan="2">出票时间：', r.info.st, "</td>");
    s.push("							</tr>");
    s.push("							<tr>");
    s.push('								<td width="210">客服电话：', r.info.wp, "</td>");
    s.push("								<td>投诉电话：", r.info.nwp, "</td>");
    s.push("							</tr>");
    s.push("							<tr>");
    s.push("								<td>网址：", r.info.web, "</td>");
    s.push("								<td>ICP备案：", r.info.icp, "</td>");
    s.push("							</tr>");
    s.push("						</table></td>");
    s.push("				</tr>");
    s.push("			</table>");
    s.push("            </div>");
    s.push("        </div>");
    s.push("    </div>");
    if (typeof $jex != "undefined") {
        $jex.event.trigger(this, "preshow")
    }
    $jex.lightbox.show(s.join(""));
    var a = ["&type=vstat", "&clickby=", this.vendor.status, "&wrid=", this.vendor.wr || this.vendor.wrid, "&wrname=", encodeURIComponent(this.vendor.name)];
    trackAction(a.join(""))
};
BookingScreenUI.prototype.addStyleHTML = function() {
    if (window.__bookingscreenui_addstyle == true) return;
    var e = document.createElement("div");
    e.id = BookingScreenUI.getContainerID();
    e.style.position = "absolute";
    e.style.zIndex = "999999";
    document.getElementsByTagName("body")[0].appendChild(e);
    this.dlg = e;
    this.clickBind(this.closeDialog);
    window.__bookingscreenui_addstyle = true
};
BookingScreenUI.closeMySelf = function() {
    var e = document.getElementById(BookingScreenUI.getContainerID());
    if (e && e.style.display == "block") {
        e.style.display = "none"
    }
};
BookingScreenUI.getContainerID = function() {
    return "__booking_screen_dialog_container__"
};
BookingScreenUI.getDlg = function() {
    var e = document.getElementById(BookingScreenUI.getContainerID());
    return e
};
BookingScreenUI.prototype.processBooking = function(e) {
    if (typeof e == "function") {
        e()
    } else if (typeof e == "string") {
        window.open(e)
    }
};
BookingScreenUI.prototype.clickBind = function(e) {
    var t = document;
    var n = this;
    _cb = function(t) {
        if (!t.target) {
            t.target = t.srcElement
        }
        e.call(n, t, this)
    };
    if (t.addEventListener) {
        t.addEventListener("click", _cb, false)
    } else if (t.attachEvent) {
        t.attachEvent("onclick", _cb)
    }
};
BookingScreenUI.prototype.getPosition = function() {
    var e, t;
    if (window.pageXOffset) {
        e = window.pageXOffset
    } else if (document.documentElement && document.documentElement.scrollLeft) {
        e = document.documentElement.scrollLeft
    } else if (document.body) {
        e = document.body.scrollLeft
    }
    if (window.pageYOffset) {
        t = window.pageYOffset
    } else if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop
    } else if (document.body) {
        t = document.body.scrollTop
    }
    var n, r;
    if (window.innerWidth) {
        n = window.innerWidth
    } else if (document.documentElement && document.documentElement.clientWidth) {
        n = document.documentElement.clientWidth
    } else if (document.body) {
        n = document.body.clientWidth
    }
    if (window.innerHeight) {
        r = window.innerHeight
    } else if (document.documentElement && document.documentElement.clientHeight) {
        r = document.documentElement.clientHeight
    } else if (document.body) {
        r = document.body.clientHeight
    }
    return {
        scrollTop: t,
        scrollLeft: e,
        clientHeight: r,
        clientWidth: n
    }
};
BookingScreenUI.prototype.openMark = function() {};
BookingScreenUI.prototype.closeMark = function() {};
$jex.extendClass(StarRankUI, XControl);
StarRankUI.prototype.update = function() {};
StarRankUI.prototype.displayPanel = function(e) {
    var t = this;
    var n = this.ownerWrapperUI();
    var r = e.vendor().starRank();
    var i = r.lv["kd"];
    n.append('<div class="e_qstar"', "panelStarR", ">");
    n.text('<span class="e_qtotal">', i, "分</span>");
    n.append("<div", "agent", 'class="p_qstar_twp">');
    n.text("</div>");
    n.text("</div>");
    n.onInit(function() {
        var i = n.find("panelStarR");
        var s = n.find("agent");
        var o = true;
        var u = false;
        var a = null;
        $jex.hover({
            act: i,
            onmouseover: function(f) {
                $jex.addClassName(i, "v-name-hover");
                if (o) {
                    t.updateAgentPanel(e, r);
                    t.agentUIO.write(s);
                    o = false
                }
                $jex.element.show(s);
                trackAction("FL|STAR|SHOW");
                if (u) {
                    return
                }
                u = true;
                a = setTimeout(function() {
                    n && n.logQrcode(e, "floatboxshow", {
                        type: "get-star"
                    })
                }, 1e3)
            },
            onmouseout: function(e) {
                $jex.removeClassName(i, "v-name-hover");
                $jex.element.hide(s);
                u = false;
                clearTimeout(a)
            },
            delay: 10
        })
    })
};
StarRankUI.prototype.showCommit = function() {
    var e = this.ownerWrapperUI();
    var t = e.find("btnstarR");
    var n = e.find("usercomment");
    $jex.addClassName(t.parentNode, "e_btn_cmt_on");
    $jex.element.show(n);
    this.commitOpened = true;
    trackAction("FL|CMT|OPEN")
};
StarRankUI.prototype.hideCommit = function() {
    var e = this.ownerWrapperUI();
    var t = e.find("btnstarR");
    var n = e.find("usercomment");
    if (t) {
        $jex.removeClassName(t.parentNode, "e_btn_cmt_on")
    }
    if (n) {
        $jex.element.hide(n)
    }
    this.commitOpened = false
};
StarRankUI.prototype.updateAgentPanel = function(e, t) {
    var n = this;
    var r = this.agentUIO;
    var i = this.ownerWrapperUI();
    var s = i.find("agent");
    if (!r.isempty()) {
        return
    }
    r.text("<div ", ' class="p_qstar_tip">');
    r.text('<div class="p_tips_arr p_tips_arr_t" ><p class="arr_o">◆</p><p class="arr_i">◆</p></div>');
    r.text('<div class="p_qstar_cont">');
    r.text('<dl class="dl_score_lst">');
    var o = ["满意程度", "网站使用", "价格真实", "售后服务"],
        u = t.lv;
    $jex.foreach(["ts", "dw", "db", "ds"], function(e, t) {
        r.text("<dd>");
        r.text('<span class="sc_lab">', o[t], "</span>");
        r.text('<span class="bg_qstar"><em style="width: ', parseFloat(u[e]) * 2 * 10, '%;"></em></span>');
        r.text('<span class="sc_num"><em class="sc_point">', u[e], "</em>分</span>");
        r.text("</dd>")
    });
    r.text("</dl></div>");
    r.text("</div>")
};
StarRankUI.prototype.updateUserCommentPanel = function(e, t) {
    var n = this;
    var r = e.ownerFlight();
    $jex.foreach(["dw", "db", "ds"], function(e) {
        n["star_" + e].setValue(0);
        n["star_" + e].update()
    });
    this.clear();
    this.text('<div class="p_cmt_cont">');
    this.append("<a ", "cls", ' class="p_close" title="关闭"></a>');
    this.text("<h3>请对网站的服务做出点评</h3>");
    this.append("<form ", "frmCommit", ' action="' + this.url + '" target="ifmPost" method="post" >');
    this.text('			<input type="hidden" name="ispost" value="true" />');
    this.text('			<input type="hidden" name="wrid" value="', e.wrapperId(), '" />');
    this.text('			<input type="hidden" name="depCode" value="', r.deptAirportCode(), '" />');
    this.text('			<input type="hidden" name="arrCode" value="', r.arriAirportCode(), '" />');
    this.text('			<input type="hidden" name="depDate" value="', r.deptDate(), '" />');
    this.text('			<input type="hidden" name="flightNo" value="', r.code(), '" />');
    this.text('			<input type="hidden" name="other" value="" />');
    this.append("		<input ", "callback", ' type="hidden" name="callback" value="" />');
    this.text('<ul class="ul_webser_cmt">');
    this.append("", this.star_dw);
    this.append("", this.star_db);
    this.append("", this.star_ds);
    LoginControl.checkLogin();
    if (LoginControl.isLogin) {
        this.text("<li>");
        this.text('<p class="w_lab">用户名</p>');
        this.text('<p class="w_txt">', LoginControl.user.name, "</p>");
        this.text("</li>");
        this.text("<li>");
        this.text('<p class="w_lab">&nbsp;</p>');
        this.append("<button ", "btnSave", ' class="btn btn_primary"><span><b>提交</b></span></button>');
        this.text("</li>")
    }
    this.text("</ul>");
    if (!LoginControl.isLogin) {
        this.text('<div class="e_login_ifo clrfix">');
        this.text('    <div class="m_sep2">');
        this.text('        <div class="s_lab">用户名</div>');
        this.text('        <div class="s_ctl">');
        this.append("            <input ", "uname", ' type="text" class="inp_t"/>');
        this.text("        </div>");
        this.text("    </div>");
        this.text('    <div class="m_sep2">');
        this.text('         <div class="s_lab">密码</div>');
        this.text('         <div class="s_ctl">');
        this.append("            <input ", "passwd", ' name="" type="password" class="inp_t"/>');
        this.text("         </div>");
        this.text("     </div>");
        this.text("     </div>");
        this.text('<div class="e_login_ifo clrfix">');
        this.text('     <div class="m_login">');
        this.append("           <a ", "btnSaveAndLogin", ' href="##" class="btn btn_primary"><span><b>登录并提交</b></span></a>&nbsp;<span class="txt_a">请登录后发表点评，没有帐号?&nbsp;请');
        this.append('<a href="http://user.qunar.com/reg.jsp" ', "reg", ' target="_blank">注册</a></span>');
        this.text("     </div>");
        this.text("</div>")
    }
    this.text('<div class="e_login_ifo clrfix">');
    this.append("<div ", "msg", ' class="m_login_wwrn"></div>');
    this.text("</div>");
    this.text("</form>");
    this.text("</div>");
    this.onInit(function() {
        $jex.event.click(this.find("reg"), function() {
            window.open("http://user.qunar.com/reg.jsp")
        });
        $jex.event.click(this.find("btnSaveAndLogin"), function() {
            if (!n.checkComment()) {
                return
            }
            LoginControl.login(n.find("uname").value, n.find("passwd").value, function(e, t) {
                if (e) {
                    n.submitComment()
                } else {
                    n.find("msg").innerHTML = '<span class="f_warn">' + t + "</span>"
                }
            })
        });
        $jex.event.click(this.find("btnSave"), function() {
            if (!n.checkComment()) {
                return
            }
            n.submitComment()
        });
        $jex.event.click(this.find("cls"), function() {
            n.hideCommit()
        })
    })
};
StarRankUI.prototype.checkComment = function() {
    var e = this;
    var t = true;
    $jex.foreach(e.starList, function(n) {
        if (!n.getSelectedValue()) {
            e.find("msg").innerHTML = '<span class="f_warn">请选择<b>' + n.title() + "</b>的评分.</span>";
            t = false;
            return $jex.$break
        }
    });
    return t
};
StarRankUI.prototype.submitComment = function() {
    var e = this;
    var t = "callbkId" + $jex.globalID();
    this.find("frmCommit").callback.value = "window.parent." + t;
    window[t] = function(t) {
        e.processComment(t)
    };
    var n = this.find("frmCommit").id;
    if (/MSIE/i.test(navigator.appVersion)) {
        document.getElementById("ifmPost").src = 'javascript:\'<script>window.onload=function(){document.write(\\\'<script>document.domain=\\"qunar.com\\";parent.document.getElementById("' + n + "\").submit();<\\\\/script>\\');document.close();};</script>'"
    } else {
        this.find("frmCommit").submit()
    }
};
StarRankUI.prototype.processComment = function(e) {
    var t = this;
    var n = this.find("msg");
    if (e.success) {
        n.innerHTML = "成功提交"
    } else {
        n.innerHTML = '<span class="f_warn">' + e.msg + "</span>"
    }
    setTimeout(function() {
        $jex.$("ifmPost").src = "about:blank";
        t.hideCommit()
    }, 1e3)
};
StarRankUI.prototype.placeHolder = function(e) {
    var t = this.ownerWrapperUI(),
        n = this;
    t.append("<div ", "usercomment", ' class="p_cmt_tip" ');
    if (!this.commitOpened) {
        t.text(' style="display:none;" ')
    } else {
        t.text(' style="display:block;" ')
    }
    t.text(" >");
    if (this.commitOpened) {
        this.updateUserCommentPanel(e, e.vendor().starRank());
        t.append("", this)
    }
    t.text("</div>");
    t.onInit(function() {
        $jex.event.binding(t.find("usercomment"), "click", function(e) {
            $jex.stopEvent(e);
            return false
        });
        if (n.commitOpened) {
            $jex.addClassName(t.find("usercomment").parentNode, "e_btn_cmt_on")
        }
    })
};
$jex.extendClass(StarPickerUI, XControl);
StarPickerUI.prototype.update = function() {
    var e = this;
    var t = this._setting;
    e.clicked = false;
    this.clear();
    this.text("<li>");
    this.append("<input ", "fldInput", ' name="' + t.name + '" type="hidden" value="0" />');
    this.text('<p class="w_lab">', t.title, "</p>");
    this.text('<p class="w_star">');
    this.append("<span", "sPr", ' class="bg_qstar">');
    this.append("<em ", "shR", ' style="width: 0%;"></em><b class="lst_star">');
    for (var n = 1; n <= 5; n++) {
        this.append("<i ", "sR" + n, ' class="i_star"></i>')
    }
    this.text("</b></span></p>");
    this.append("<p ", "desc", ' class="w_txt"></p>');
    this.text("</li>");
    this.onInit(function() {
        var n = this.find("shR");
        for (var r = 1; r <= 5; r++) {
            (function(r) {
                var i = e.find("sR" + r);
                $jex.event.binding(i, "mouseover", function() {
                    if (e.clicked) return;
                    var i = t.desc[r - 1];
                    if (i) {
                        e.find("desc").innerHTML = i
                    }
                    n.style.width = r * 2 * 10 + "%"
                });
                $jex.event.click(i, function() {
                    if (e.clicked) return;
                    e.setValue(r);
                    e.clicked = true
                })
            })(r)
        }
        var i = this.find("sPr");
        $jex.event.binding(i, "mouseout", function(t) {
            if (!$jex.event.within(i, t)) return;
            e.restore();
            if (!e.getSelectedValue()) {
                e.find("desc").innerHTML = ""
            }
            e.clicked = false
        })
    })
};
StarPickerUI.prototype.restore = function() {
    var e = this.find("desc");
    if (!e) {
        return
    }
    this.setValue(this.value)
};
StarPickerUI.prototype.setValue = function(e) {
    var t = this.find("shR");
    if (!t) {
        this.onInit(function() {
            this.find("shR").style.width = e * 2 * 10 + "%";
            this.selValue = e
        })
    } else {
        t.style.width = e * 2 * 10 + "%";
        this.find("fldInput").value = e;
        this.selValue = e
    }
    this.value = e
};
StarPickerUI.prototype.getValue = function(e) {
    return parseInt(this.find("fldInput").value, 10)
};
StarPickerUI.prototype.title = function(e) {
    return this._setting.title
};
StarPickerUI.prototype.getSelectedValue = function() {
    return this.selValue || 0
};
$jex.extendClass(OnewayStarRankUI, StarRankUI);
OnewayStarRankUI.prototype.insert_btn = function(e) {
    var t = this.ownerWrapperUI();
    t.append("	<a ", "btnstarR", '  data-evtDataId="' + t.newid("") + '"  hidefocus="on" class="btn_cmt" href="##">点评<i class="i_arrb_ud"></i></a>');
    this.placeHolder(e)
};
$jex.extendClass(StopInfoUI, XControl);
StopInfoUI.prototype.placeHolder = function() {
    var e = this.owner();
    e.append("<div", this.placeHolderId, ' class="jtPanel" style="display:none;" >');
    e.append("", this, "</div>")
};
StopInfoUI.prototype.getHolder = function() {
    var e = this.owner();
    return e.find(this.placeHolderId)
};
StopInfoUI.prototype._invoke = function(e) {
    if (this.cache) {
        this.update(e);
        return
    }
    var t = ["/twell/flight/flight_stops.jsp?depCode=", e.deptAirportCode(), "&arrCode=", e.arriAirportCode(), "&flightNo=", e.code(), "&depDate=", window.location.param().searchDepartureTime].join("");
    var n = this;
    $jex.jsonp(t, function(t) {
        n.cache = t;
        n.update(e)
    })
};
StopInfoUI.prototype.update = function(e) {
    this.clear();
    var t = this.cache;
    if (t.data.length <= 0) return;
    this.text('		<div class="ic"></div>');
    this.text('		<div class="hd"><b>经停城市</b>|<b>到达时间</b>|<b>起飞时间</b></div>');
    this.text('		<div class="ct">');
    this.text('			<table cellpadding="0" cellspacing="0">');
    for (var n = 0; n < t.data.length; n++) {
        var r = t.data[n];
        this.text("				<tr>");
        this.text('					<td class="c1">', r.city, "</td>");
        this.text('					<td class="c2">', r.depTime, "</td>");
        this.text('					<td class="c3">', r.arrTime, "</td>");
        this.text("				</tr>")
    }
    this.text("			</table>");
    this.text("		</div>");
    this.render(this.getHolder());
    $jex.element.show(this.getHolder())
};
StopInfoUI.prototype.show = function(e) {
    this._invoke(e)
};
StopInfoUI.prototype.hide = function() {
    $jex.element.hide(this.getHolder())
};
var checkTimeOfStopSale = {
    deal: function(e, t) {
        var n;
        if (window.CLIENT_TIME && window.SERVER_TIME) {
            n = (new Date).getTime() - CLIENT_TIME.getTime() + SERVER_TIME.getTime()
        } else {
            n = (new Date).getTime()
        }
        if ((e.getTime() - n) / (1e3 * 60) <= t) {
            this.showDialog();
            return true
        } else {
            return false
        }
    },
    showDialog: function() {
        var e = [];
        e.push('<div class="p_layer_cont p_player_tss">');
        e.push('    <div style="width:480px;" class="layer_inner"> <a id="msgButton" href="javascript:void(0);" title="关闭" class="btn_close"></a> ');
        e.push('        <div class="e_tit_pop"></div>');
        e.push('        <div class="layer_cont">');
        e.push('            <div class="b_warn_pop_l clrfix">');
        e.push('              <div class="e_warn_ico"> <i class="ico_del_l"></i></div>');
        e.push('              <div class="e_warn_inf"><h3>对不起，该代理商报价已售完，您可以在去哪儿网重新搜索和预订!</h3></div>');
        e.push("            </div>");
        e.push('            <div class="b_submit_pop_l"><a href="javascript:void(0);" class="btn" id="reSearchLine"><span><b>重新搜索</b></span></a></div>');
        e.push("        </div>");
        e.push("      </div>");
        e.push("    </div>");
        $jex.lightbox.show(e.join(""));
        this.bindEvent()
    },
    bindEvent: function() {
        var e = $jex.$("reSearchLine"),
            t = function() {
                window.location.reload()
            };
        if (e.addEventListener) {
            e.addEventListener("click", t, false)
        } else if (e.attachEvent) {
            e.attachEvent("onclick", t)
        }
    }
};
var Price_html;
(function() {
    function s(e) {
        r = [];
        n = [];
        var i = e.length;
        do {
            r[r.length] = i
        } while (--i);
        t = Math.floor(Math.random() * e.length + 1);
        do {
            var s = Math.floor(Math.random() * r.length);
            n[n.length] = r[s];
            r.splice(s, 1)
        } while (--t)
    }

    function o(t) {
        var r = -1 * e * t.length;
        i = [];
        var s = t.split("");
        for (var o = 0; o < n.length; o++) {
            i[i.length] = {
                digit: n[o],
                val: s[n[o] - 1]
            };
            s[n[o] - 1] = Math.floor(Math.random() * 10) + ""
        }
        return "<b style='width:" + Math.abs(r) + "px;left:" + r + "px'>" + s.join("") + "</b>"
    }

    function u(t) {
        var n = 1;
        var r = t;
        var s = [];
        for (var o = 0; o < i.length; o++) {
            var u = -1 * (r - i[o].digit + n) * e + "px";
            s[s.length] = '<b style="left:' + u + '">' + i[o].val + "</b>"
        }
        return s.join("")
    }
    var e = 11;
    Price_html = {
        getHTML: function(t) {
            t += "";
            s(t);
            var n = ['<span class="prc_wp" style="zoom:1;position:relative;overflow:hidden;width:' + e * t.length + 'px" >', '<em class="prc">'];
            n.push(o(t));
            n.push(u(t.length));
            n.push("</em></span>");
            return n.join("")
        }
    };
    var t, n, r, i
})();
var Price_html_wide;
(function() {
    function s(e) {
        r = [];
        n = [];
        var i = e.length;
        do {
            r[r.length] = i
        } while (--i);
        t = Math.floor(Math.random() * e.length + 1);
        do {
            var s = Math.floor(Math.random() * r.length);
            n[n.length] = r[s];
            r.splice(s, 1)
        } while (--t)
    }

    function o(t) {
        var r = -1 * e * t.length;
        i = [];
        var s = t.split("");
        for (var o = 0; o < n.length; o++) {
            i[i.length] = {
                digit: n[o],
                val: s[n[o] - 1]
            };
            s[n[o] - 1] = Math.floor(Math.random() * 10) + ""
        }
        var u = [];
        for (var o = 0; o < s.length; o++) {
            u.push("<i>" + s[o] + "</i>")
        }
        return "<b style='width:" + Math.abs(r) + "px;left:" + r + "px'>" + u.join("") + "</b>"
    }

    function u(t) {
        var n = 1;
        var r = t;
        var s = [];
        for (var o = 0; o < i.length; o++) {
            var u = -1 * (r - i[o].digit + n) * e + "px";
            s[s.length] = '<b style="left:' + u + '">' + i[o].val + "</b>"
        }
        return s.join("")
    }
    var e = 16;
    Price_html_wide = {
        getHTML: function(t) {
            t += "";
            s(t);
            var n = ['<span class="prc_wp" style="width:' + e * t.length + 'px" >', '<em class="prc">'];
            n.push(o(t));
            n.push(u(t.length));
            n.push("</em></span>");
            return n.join("")
        }
    };
    var t, n, r, i
})();
var FlightEventProxy = function() {
    function e(e) {
        var t = e.getAttribute("data-evtDataId");
        return t && UICacheManager.getCache(t)
    }

    function t(t, n) {
        var r = e(t);
        if (!r) return;
        var i = r.dataSource();
        r.stat.ownerWrapperEntity(i);
        LockScreen(function() {
            var e = i.ownerFlight(),
                t = new Date($jex.date.parse(e.deptDate() + " " + e.deptTime())),
                s = i.vendor().tss();
            if (window.checkTimeOfStopSale && checkTimeOfStopSale.deal(t, s)) {
                return
            }
            r.bookingScreenUI.preBooking(function() {
                if (typeof window["BookingPriceCheck"] != "undefined") {
                    if (BookingPriceCheck.check(i, n)) return
                }
                r.bookingLockScreenUI.preBooking(function(e) {
                    i.setVpr(e);
                    r.jumpToBooking(i, n)
                }, n)
            })
        });
        return false
    }

    function n(e) {
        this.$node = $jex.$(e);
        var t = this;
        $jex.event.binding(this.$node, "click", function(e) {
            var n = e.target || window.event.srcElement;
            while (n && n != this) {
                if (n.id && t.clickDo(n.id, n) === false) {
                    $jex.stopEvent(e);
                    break
                }
                n = n.parentNode
            }
        })
    }
    n.prototype = {
        clickDo: function(e, t) {
            if (/^js-stopClick/.test(e)) return false;
            if (!/(js_ctype)|([a-z_-]+)XI\d+/i.test(e)) return;
            var n = this["_" + (RegExp.$1 || RegExp.$2) + "Click"];
            return n && n(t)
        },
        _btnHideClick: function(t) {
            var n = e(t);
            if (!n) return;
            n.owner().hideVendorPanel();
            var r = $jex.offset($jex.$("resultAnchor"));
            if (!/msie 6/.test(window.navigator.userAgent.toLowerCase())) {
                var i = 0,
                    s = $jex.$("js_schwrap"),
                    o;
                if (window.getComputedStyle) {
                    o = window.getComputedStyle(s, null).getPropertyValue("position")
                } else if (s.currentStyle) {
                    o = s.currentStyle.position
                }
                if (o === "static") {
                    i = -2
                }
                if (!($jex.$("top_recommend_id") && $jex.$("top_recommend_id").childNodes.length)) {
                    window.scrollTo(r.left, r.top - 55 - i)
                } else {
                    window.scrollTo(r.left, $jex.offset($jex.$("top_recommend_id")).top + 10 - i)
                }
            } else {
                window.scrollTo(r.left, r.top)
            }
            return false
        },
        _js_ctypeClick: function(t) {
            var n = e(t);
            if (!n) return;
            LockScreen(function() {
                var e = n.dataSource(),
                    r = t.getAttribute("data-ctype");
                System.service.genBookingTimeStamp();
                System.analyzer.triggerTrace = true;
                TsinghuaOneWayTracker.trackTabChange(r, n);
                n.changeWrapperTypeList(r)
            });
            return false
        },
        _btnstarRClick: function(t) {
            var n = e(t);
            if (!n) return;
            var r = n.starUI,
                i = n.dataSource();
            SingletonUIManager.register("vendor", r, function() {
                var e = i.vendor().starRank();
                var t = n.find("usercomment");
                if (r.commitOpened) {
                    r.hideCommit()
                } else {
                    r.updateUserCommentPanel(i, e);
                    r.render(t);
                    r.showCommit()
                }
            }, function() {
                r.hideCommit()
            });
            return false
        },
        _zyxBtnBookClick: function(e) {
            return t(e, 1)
        },
        _btnBookClick: function(e) {
            return t(e, 1)
        },
        _lbtnBookClick: function(e) {
            return t(e, 0)
        },
        _flightbarClick: function(e) {
            return t(e, 1)
        },
        _openwrapperbtnClick: function(t) {
            var n = e(t);
            if (!n) return;
            n._isUserClick = true;
            n._openBtnClick = true;
            n.openBtnClickEvent();
            n._isUserClick = false;
            n._openBtnClick = false;
            return false
        },
        _reWrBtnClick: function(t) {
            var n = e(t);
            if (!n) return;
            var r = n.reWrCache,
                i = r.entity;
            if (i.dataSource().proBooking) {
                var s = {
                    recom: 1,
                    BookingLocation: "kuaishu"
                };
                if (i.isOta()) {
                    var o = i.afeePrice() ? 1 : 0;
                    var u = i.dataSource().type;
                    u = u && u.toLocaleUpperCase();
                    if (u && o == 1) {
                        u += "I"
                    }
                    s.prt = o
                }
                r.entity.setVpr();
                r.entity.booking(n.getRwstat(), s)
            } else {
                n.openBtnClickEvent()
            }
            return false
        },
        _gotoFirstDetailClick: function(t) {
            var n = e(t);
            if (!n) return;
            n.owner().gotoDetailPage(n.dataSource().firstTrip());
            return false
        },
        _gotoSecondDetailClick: function(t) {
            var n = e(t);
            if (!n) return;
            n.owner().gotoDetailPage(n.dataSource().secondTrip());
            return false
        },
        _gotoDetailClick: function(t) {
            $jex.log({
                s: "flight",
                p: "onewayList",
                r: "staticLink",
                type: "morePrice"
            });
            var n = e(t);
            if (!n) return;
            n.ownerVendorListUI().owner().gotoDetailPage(n.dataSource());
            return false
        }
    };
    return n
}();
var HoldLastShowFlight = function() {
    var e = {};
    var t, n;
    e.init = function(t) {
        if (!t.openCode) return;
        e.setData(t)
    };
    e.clearLast = function() {
        t = null
    };
    e.setData = function(e) {
        t = e.openCode;
        if (t) {
            t = decodeURIComponent(t)
        }
        n = e.openType;
        delete e.openCode;
        delete e.openType
    };
    e.getUrlFlight = function() {
        return t
    };
    e.getUrlType = function(e) {
        return e === t && /^(all|bf|s)$/.test(n) ? n : null
    };
    e.goHoldUrl = function(e, t) {
        $jex.ui.lockScreenProgress({}, function() {
            var n = window.location.param();
            n.openCode = encodeURIComponent(e);
            n.openType = t;
            var r = window.location.href.split("?")[0];
            r += "?" + $jex.toQueryString(n);
            location.href = r
        })
    };
    return e
}();
OTABlade.prototype = {
    getLength: function() {
        return this._wrLen
    },
    extract: function(e) {
        this.extractor.extract(e)
    },
    require_wrapperinfo: function(e) {
        var t = this;
        this.group.datasource(this.extractor.result());
        this.group.with_wrappers(function() {
            e.call(t)
        })
    },
    getDiscount: function(e) {
        if (e <= 0) return "";
        if (e > 9.9) {
            if (e > 10) return "";
            else return "全价"
        } else {
            if (e.toString().length == 1) return e + ".0" + "折";
            else return e + "折"
        }
    },
    create_ui: function() {
        var e = new UIObject;
        var t = this.group.opts;
        var n = this.group.sort_by_wrappers(this.extractor.flightType);
        var r = n && n.length || 0;
        this._wrLen = r;
        if (!r) {
            return e
        }
        e.text('<div class="b_fly_pmt">');
        e.text('<div class="e_pmt_tit"><h3>机票推广</h3></div>');
        e.text('<div class="e_pmt_cont"> ');
        for (var i = 0; i < r; i++) {
            var s = n[i];
            var o = s.createBookingUrl(this.group.opts.queryID, window.SERVER_TIME || new Date, i);
            var u = s.info.pr;
            var a = "";
            var f = s.flight.outFi();
            var l = s.flight.retFi();
            var c = "";
            var h = "";
            var p = s.info.tax;
            if (p && p == -1) {}
            if (s.info.afee) {
                u += s.info.afee
            }
            var d = s.flight.showType();
            type = d == "rt" ? '<b class="rt"></b>' : '<b class="tr"></b>';
            e.text('<dl class="dl_pmt_fly">');
            e.text('<dt><a target="_blank" href="', o, '">', t.fromCity, "&nbsp;-&nbsp;", t.toCity, "&nbsp;&nbsp;", f.ca, "</a>", h, "</dt>");
            if (d == "rt") {
                this._createPriceHtml(e, f, "去程");
                this._createPriceHtml(e, l, "回程")
            } else {
                this._createPriceHtml(e, f)
            }
            e.text('<dd><a target="_blank" href="', o, '" class="lnk_bk">订票</a><span class="highlight"><i class="rmb">¥</i><em class="f_tmt">', u, "</em>", a, "</span>&nbsp;", c, "</dd>");
            e.text("</dl>")
        }
        e.text("</div> ");
        e.text("</div>");
        return e
    },
    _createPriceHtml: function(e, t, n) {
        n = n && n + "&nbsp" || "";
        e.text("<dd>" + n, this._fixDD(t.dd) + '<span class="f_tm">', t.dt, "-", t.at);
        if (t.at.replace(":", "") * 1 - t.dt.replace(":", "") * 1 < 0) {
            e.text('<i class="i_1day"></i>')
        }
        e.text("</span>", t.co, "</dd>")
    },
    _getCity: function(e, t) {
        e = e || "";
        t = t || "";
        var n = "";
        if (e.length >= 4 || t.length >= 4 || !e || !t) {
            n = t
        } else {
            n = e + " - " + t
        }
        return n
    },
    _fixDD: function(e) {
        e = e || "";
        try {
            return e.replace(/\d\d\d\d-/, "").replace("-", "/")
        } catch (t) {
            return ""
        }
    },
    load: function(e) {
        var t = this;
        this.require_wrapperinfo(function() {
            var n = t.create_ui();
            e.call(t, n)
        })
    }
};
OTAInfoExtractor.prototype = {
    result: function() {
        return this.flight_array
    },
    add: function(e) {
        if (!this.flight_map[e.key()]) {
            this.flight_map[e.key()] = e;
            this.flight_array.push(e)
        } else {
            this.flight_map[e.key()].priceInfo(e.priceInfo())
        }
    },
    extract: function(e) {}
};
OnewayOTAInfoExtractor.prototype = $jex.merge({
    extract: function(e) {}
}, OTAInfoExtractor);
RoundtripOTAInfoExtractor.prototype = $jex.merge({
    extract: function(e) {}
}, OTAInfoExtractor);
OTAFlight.prototype = {
    key: function() {
        return this.keycode
    },
    flightInfo: function(e, t) {
        if (e) {
            this._out = e
        }
        if (t) {
            this._ret = t
        }
        return [this._out, this._ret]
    },
    outFi: function() {
        if (this.wrInfo() && this.wrInfo().info) {
            return this.wrInfo().info[0]
        } else if (this._out) {
            return this._out
        } else {
            return {}
        }
    },
    retFi: function() {
        if (this.wrInfo() && this.wrInfo().info) {
            return this.wrInfo().info[1]
        } else if (this._ret) {
            return this._ret
        } else {
            return {}
        }
    },
    priceInfo: function(e) {
        if (e) {
            this.pi = e
        }
        return this.pi
    },
    price: function() {
        return this.pi ? this.pi.lowpr : Number.MAX_VALUE
    },
    wrInfo: function(e) {
        if (e) {
            this.info = e
        }
        return this.info
    },
    type: function() {
        if (this.keycode.indexOf("0") == 0) {
            return "rt"
        } else {
            return "ow"
        }
    },
    showType: function() {
        if (this.keycode.indexOf("0") == 0) {
            return "rt"
        } else if (this.keycode.indexOf("/") > 0) {
            return "tf"
        } else {
            return "ow"
        }
    },
    getWrappers: function(e) {
        if (e) {
            if (!this.wrappers[e]) {
                this.wrappers[e] = new OTAWrapper(this, this.wrInfo().wrs[e])
            }
            return this.wrappers[e]
        } else {
            return this.wrappers
        }
    }
};
OTAOnewayFlight.prototype = $jex.merge({}, OTAFlight.prototype);
OTARoundtripFlight.prototype = $jex.merge({}, OTAFlight.prototype);
OTATransferFlight.prototype = $jex.merge({}, OTAFlight.prototype);
OTAWrapper.prototype.createBookingUrl = function(e, t, n) {
    var r = {
        full: "false",
        fk: 0,
        updatetime: this.info.ut,
        inter: "false",
        departureTime: this.flight.outFi().dt,
        arrivalTime: this.flight.outFi().at
    };
    switch (this.flight.type()) {
        case "rt":
            r["isRt"] = 1;
            r["returnDepartureTime"] = this.flight.retFi().dt;
            r["returnArrivalTime"] = this.flight.retFi().at;
            break
    }
    if (t) {
        r["querytime"] = t.getTime()
    }
    r["stat"] = (n < 10 ? "0" + n : n) + "1006";
    return "/booksystem/booking.jsp?" + this.info.bu + "&" + $jex.toQueryString(r)
};
OTAGroup.prototype = {
    WRAPPER_URL: "/twell/flight/flight_ad.jsp",
    CARRIER_COUNT_SETTING: {
        0: {
            0: 0,
            1: 1,
            2: 4,
            3: 5
        },
        1: {
            0: 0,
            1: 0,
            2: 2,
            3: 8
        },
        2: {
            0: 0,
            1: 0,
            2: 0,
            3: 10
        },
        3: {
            0: 0,
            1: 0,
            2: 0,
            3: 0
        },
        "default": {
            0: 2,
            1: 2,
            2: 3,
            3: 3
        }
    },
    options: function(e) {
        for (var t in e) {
            if (e.hasOwnProperty(t)) {
                this.opts[t] = e[t]
            }
        }
    },
    datasource: function(e) {
        this.list = e
    },
    groupByRole: function() {
        var e = this;
        var t = [];
        var n = e.opts;
        $jex.foreach(this.list, function(e) {
            var r = e.outFi().ca;
            if (n.carrier_white_filter !== null && n.carrier_white_filter.indexOf(r) >= 0 || n.carrier_black_filter !== null && n.carrier_black_filter.indexOf(r) < 0 || n.debug) {
                t.push(e)
            }
        });
        t.sort(function(e, t) {
            return e.price() - t.price()
        });
        var r = this.getSetting();
        var i = this._store;
        $jex.foreach(t, function(t) {
            var n = e.timeRange(t.outFi().dt);
            if (i[n].length < r[n]) {
                i[n].push(t);
                e.resultmap[t.key()] = t
            }
        })
    },
    sort_by_wrappers: function(e) {
        var t = this._get_wrappers_info();
        var n = t["codelist"] || [];
        var r = this.resultmap;
        var i = [];
        var s = n.length;
        if (e && e === "ow" && s > 9) s = 9;
        for (var o = 0; o < s; o++) {
            var u = (n[o] || "").split("_");
            var a = u[0];
            var f = u[1];
            if (r[a]) {
                var l = r[a].getWrappers(f);
                if (l) {
                    i.push(l)
                }
            }
        }
        return i
    },
    with_wrappers: function(e) {
        var t = this;
        this.groupByRole();
        var n = {
            type: this.opts.type,
            count: this.opts.elsCount,
            code: this.toCodeString(),
            queryID: this.opts.queryID
        };
        $jex.ajax(t.WRAPPER_URL, n, function(n) {
            t._wrappers_info = n;
            t._with_wrappers();
            e.call(t)
        }, {
            beforeSend: function(e) {
                if (window.addHtag) window.addHtag(e)
            }
        })
    },
    _get_wrappers_info: function() {
        return this._wrappers_info || {
            codemap: {},
            codelist: []
        }
    },
    _with_wrappers: function() {
        var e = this._get_wrappers_info();
        var t = e["codemap"] || {};
        var n = this.resultmap;
        $jex.foreach(t, function(e, t, r) {
            var i = n[r];
            if (!i) return $jex.$continue;
            i.wrInfo(e)
        })
    },
    toCodeString: function() {
        var e = [];
        $jex.foreach(this._store, function(t) {
            $jex.foreach(t, function(t) {
                e.push(t.key())
            })
        });
        return e.join(",")
    },
    getSetting: function(e) {
        var t = this.opts.currentDate;
        var n = this.opts.fromDate;
        var r = this.timeRange(t.getHours().toString()).toString();
        var i = t.getFullYear() == n.getFullYear() && t.getMonth() == n.getMonth() && t.getDate() == n.getDate();
        var s = this.CARRIER_COUNT_SETTING["default"];
        if (i) {
            s = this.CARRIER_COUNT_SETTING[r] || s
        }
        return s
    },
    timeRange: function(e) {
        var t = e.substr(0, 2);
        var n = parseInt(t, 10);
        if (n >= 6 && n < 12) return 0;
        if (n == 12) return 1;
        if (n > 12 && n <= 17) return 2;
        return 3
    }
};
var $OTALOGIC = function() {
    return {
        vatafrom: "",
        vatato: "",
        departureTime: "",
        arrivalTime: "",
        track: function() {
            var e = $OTALOGIC.te1 - $OTALOGIC.ts1;
            var t = $OTALOGIC.te2 - $OTALOGIC.te1;
            var n = $OTALOGIC.te3 - $OTALOGIC.te2;
            var r = new Image;
            var i = (new Date).getTime();
            r.src = ["http://bc.qunar.com/qda_b.html?t=", i, "&pid=", encodeURIComponent($OTALOGIC.id1), "&t0=", $OTALOGIC.te1, "&t1=", e, "&t2=", t, "&t3=", n, "&vatafrom=", $OTALOGIC.vatafrom, "&vatato=", $OTALOGIC.vatato, "&departureTime=", $OTALOGIC.departureTime].join("")
        },
        find_config_by_route: function(e) {
            e = e || "white";
            var t = window.location.toString();
            var n = OTA_AD_CONFIG["route_by_" + e + "_list"];
            for (var r = 0; r < n.length; r++) {
                if (n[r].test(t)) return OTA_AD_CONFIG[e + "_list"]
            }
            return null
        },
        isDebug: function() {
            return AD_Manage.isDebug()
        },
        init: function(e, t, n, r) {
            function i() {
                return ".inter_rc {padding:5px; border-top:1px solid #ccc; } " + ".inter_rc li{float:left;} " + ".inter_rc li.perrc { float:left; display:inline; margin-top:3px;width:100px; height:24px;line-height:22px;background:url(http://simg1.qunarzz.com/site/images/2011/bt_detail.png) 0px 0px no-repeat; } " + ".inter_rc li.perrc .t {float:left;padding:0px 0 0 24px;padding-top:2px9;_padding-top:0px;height:22px;overflow:hidden;} " + ".inter_rc li.pr { width:103px;float:left; display:inline; margin-right:10px; font-family:arial; font-size:14px; color:#0069ca; } " + ".inter_rc li.pr b { font-size:20px; } " + ".inter_rc li.city { width:320px;text-align:center;float:left; display:inline; margin-right:30px; font-size:14px; line-height:30px; color:#0069ca; } " + ".inter_rc li.no_pr{ width:433px;}" + ".inter_rc li.ops { float:right; display:inline; margin-top:5px; } " + ".inter_rc li.ops .btnView { display:block; width:70px; height:22px; line-height:22px; text-align:center; background:url(http://simg1.qunarzz.com/site/images/2011/bt_detail.png) 0px -40px no-repeat; color:#fff; } " + ".inter_rc li.ops .btnView:hover { background-position:0 -67px; color:#fff; } " + ".inter_rc li.ops .btnView:active { background-position:0 -94px; color:#fff; }"
            }

            function s() {
                QNR.AD.createQAd("ifrNTAD_datatop_sec", function(e) {
                    e.params.departureTime = n;
                    e.params.arrivalTime = r;
                    e.getCss = i;
                    e.renderHtmlItem = function(e) {
                        var t = QadAdUnits.parse_clk_url(e);
                        return ['<ul class="inter_rc clrfix">', '	<li class="perrc"><span class="t">推广链接</span></li>', '	<li class="city no_pr">', e.title || "", "</li> ", '	<li class="ops"><a class="btnView" target="_blank" href="', t, '">查看详情</a></li>', "</ul>"].join("")
                    };
                    QadAdUnits.create_iframe_hander(e, function(e) {});
                    e.load()
                })
            }
            this.vatafrom = e;
            this.vatato = t;
            this.departureTime = n;
            this.arrivalTime = r;
            AD_Manage.qad_query = function(n) {
                var r = ["vatafrom=", encodeURIComponent(e), "&vatato=", encodeURIComponent(t)].join("");
                n(r)
            };
            QNR.AD.createQAd("ifrNTAD_datatop", function(e) {
                e.params.departureTime = n;
                e.params.arrivalTime = r;
                e.getCss = i;
                e.renderHtmlItem = function(e) {
                    var t = QadAdUnits.parse_clk_url(e);
                    return ['<ul class="inter_rc clrfix">', '	<li class="perrc"><span class="t">特别推荐</span></li>', '	<li class="city">', e.title || "", "</li> ", '	<li class="pr">¥<b>', e.description || "", "</b></li>", '	<li class="ops"><a class="btnView" target="_blank" href="', t, '">查看详情</a></li>', "</ul>"].join("")
                };
                var t = $OTALOGIC.isDebug();
                QadAdUnits.create_iframe_hander(e, function(e) {
                    if (e == 0 || t) {
                        s()
                    }
                })
            });
            if (window["$OTA"]) {
                $OTA.group.options({
                    carrier_white_filter: $OTALOGIC.find_config_by_route("white"),
                    carrier_black_filter: $OTALOGIC.find_config_by_route("black"),
                    debug: $OTALOGIC.isDebug()
                })
            }
        },
        load_top: function(e) {
            var t = $OTALOGIC.isDebug();
            QNR.AD.createQdeCallback(e, function(e) {
                if (!e || t) {
                    QNR.AD.loadOneAD("ifrNTOPAD")
                }
            })
        },
        load_right: function() {
            function t(e) {
                return document.getElementById(e)
            }

            function n(e) {
                var n = t(e + "_title");
                if (n) n.style.display = "block"
            }

            function r(e) {
                if ($jex.$("ifrNTAD_title_more")) {
                    $jex.$("ifrNTAD_title_more").setAttribute("href", "http://a.qunar.com/more.html?type=flight&adfrom=" + encodeURIComponent($OTALOGIC["vatafrom"]) + "&adto=" + encodeURIComponent($OTALOGIC["vatato"]) + "&adcon=" + ($OTALOGIC["vatacon"] || "") + "&adpos=" + encodeURIComponent(e))
                }
            }

            function i(e, t) {
                return function(r) {
                    if (r > 0) {
                        n(t)
                    }
                    e && e(r)
                }
            }

            function s(e) {
                var n = t("ifrNTAD_patch"),
                    r = n.getAttribute("data-query");
                n.setAttribute("data-query", r + "&rows=" + e);
                $OTALOGIC.ts3 = (new Date).getTime();
                QadAdUnits.create_text_call("ifrNTAD_patch", i(function() {
                    $OTALOGIC.te3 = (new Date).getTime();
                    $OTALOGIC.track()
                }, "ifrNTAD_patch"));
                QNR.AD.loadOneAD("ifrNTAD_patch")
            }

            function o(t) {
                $OTA.group.options({
                    elsCount: t
                });
                $OTALOGIC.ts2 = (new Date).getTime();
                var n = $jex.$("divOTA");
                $OTA.load(function(r) {
                    r.write(n);
                    var i = this.getLength();
                    if (i > 0) {
                        n.style.display = "block"
                    }
                    $OTALOGIC.te2 = (new Date).getTime();
                    t = t - i;
                    if (e) {
                        t = 10
                    }
                    if (t > 0) {
                        s(t)
                    } else {
                        $OTALOGIC.ts3 = $OTALOGIC.te3 = (new Date).getTime();
                        $OTALOGIC.track()
                    }
                });
                var r = (new Date).getTime();
                $jex.event.bind(n, "click", function(e) {
                    var t = e.target || event.srcElement;
                    if (t.tagName == "A") {
                        if ((new Date).getTime() - r > 10 * 60 * 1e3) {
                            LockScreen(null, {
                                msg: "您的前一次搜索已经过去了10分钟，<br />正在为您重新搜索以提供更准确报价",
                                lockNow: true
                            });
                            $jex.stopEvent(e)
                        }
                    }
                })
            }

            function u(e) {
                if (!window["$OTA"]) {
                    $OTALOGIC.ts2 = $OTALOGIC.te2 = (new Date).getTime();
                    $OTALOGIC.ts3 = (new Date).getTime();
                    s(e)
                } else {
                    setTimeout(function() {
                        o(e)
                    }, 3e3)
                }
            }
            var e = $OTALOGIC.isDebug();
            $OTALOGIC.ts1 = (new Date).getTime();
            QadAdUnits.create_text_call("ifrNTAD", i(function(n) {
                $OTALOGIC.te1 = (new Date).getTime();
                var i = t("ifrNTAD"),
                    s = i.getAttribute("data-query");
                if (/vataposition=([a-z_=\d%]+)&?/i.test(s)) {
                    $OTALOGIC.id1 = RegExp.$1
                }
                if (!/\brows=(\d+)/.test(s)) {
                    return
                }
                var o = Number(RegExp.$1);
                var a = /inter/.test(location.pathname) ? "QNR_YzE=_CN" : "QNR_YQ==_CN";
                r(a);
                var f = o - n;
                if (e) {
                    f = 10
                }
                if (f > 0) {
                    u(f)
                } else {
                    $OTALOGIC.ts2 = $OTALOGIC.te2 = $OTALOGIC.ts3 = $OTALOGIC.te3 = (new Date).getTime();
                    $OTALOGIC.track()
                }
            }, "ifrNTAD"))
        }
    }
}();
var TrimPath;
(function() {
    if (typeof LOG == "undefined") {
        LOG = {
            error: function() {}
        }
    }
    if (TrimPath == null) TrimPath = new Object;
    if (TrimPath.evalEx == null) TrimPath.evalEx = function(src) {
        return eval(src)
    };
    var UNDEFINED;
    if (Array.prototype.pop == null) Array.prototype.pop = function() {
        if (this.length === 0) {
            return UNDEFINED
        }
        return this[--this.length]
    };
    if (Array.prototype.push == null) Array.prototype.push = function() {
        for (var e = 0; e < arguments.length; ++e) {
            this[this.length] = arguments[e]
        }
        return this.length
    };
    TrimPath.parseTemplate = function(e, t, n) {
        if (n == null) n = TrimPath.parseTemplate_etc;
        var r = parse(e, t, n);
        var i = TrimPath.evalEx(r, t, 1);
        if (i != null) return new n.Template(t, e, r, i, n);
        return null
    };
    try {
        String.prototype.process = function(e, t) {
            var n = TrimPath.parseTemplate(this, null);
            if (n != null) return n.process(e, t);
            return this
        }
    } catch (e) {}
    TrimPath.parseTemplate_etc = {};
    TrimPath.parseTemplate_etc.statementTag = "forelse|for|if|elseif|else|var|macro";
    TrimPath.parseTemplate_etc.statementDef = {
        "if": {
            delta: 1,
            prefix: "if (",
            suffix: ") {",
            paramMin: 1
        },
        "else": {
            delta: 0,
            prefix: "} else {"
        },
        elseif: {
            delta: 0,
            prefix: "} else if (",
            suffix: ") {",
            paramDefault: "true"
        },
        "/if": {
            delta: -1,
            prefix: "}"
        },
        "for": {
            delta: 1,
            paramMin: 3,
            prefixFunc: function(e, t, n, r) {
                if (e[2] != "in") throw new r.ParseError(n, t.line, "bad for loop statement: " + e.join(" "));
                var i = e[1];
                var s = "__LIST__" + i;
                var o = ["var ", s, " = ", e[3], ";", "var __LENGTH_STACK__;", "if (typeof(__LENGTH_STACK__) == 'undefined' || !__LENGTH_STACK__.length) __LENGTH_STACK__ = new Array();", "__LENGTH_STACK__[__LENGTH_STACK__.length] = 0;", "if ((", s, ") != null) { ", "var __IDX__ = -1; var ", i, "_ct = 0;", "for (var ", i, "_index in ", s, ") {  ", i, "_ct++;", "if (typeof(", s, "[", i, "_index]) == 'function') {continue;}", "__IDX__++; __LENGTH_STACK__[__LENGTH_STACK__.length - 1]++;", "var __KEY__ = ", i, "_index;", "var ", i, " = ", s, "[", i, "_index];"].join("");
                return o
            }
        },
        forelse: {
            delta: 0,
            prefix: "} } if (__LENGTH_STACK__[__LENGTH_STACK__.length - 1] == 0) { if (",
            suffix: ") {",
            paramDefault: "true"
        },
        "/for": {
            delta: -1,
            prefix: "} }; delete __LENGTH_STACK__[__LENGTH_STACK__.length - 1];"
        },
        "var": {
            delta: 0,
            prefix: "var ",
            suffix: ";"
        },
        macro: {
            delta: 1,
            prefixFunc: function(e, t, n, r) {
                var i = e[1].split("(")[0];
                return ["var ", i, " = function", e.slice(1).join(" ").substring(i.length), "{ var _OUT_arr = []; var _OUT = { write: function(m) { if (m) _OUT_arr.push(m); } }; "].join("")
            }
        },
        "/macro": {
            delta: -1,
            prefix: " return _OUT_arr.join(''); };"
        }
    };
    TrimPath.parseTemplate_etc.modifierDef = {
        eat: function(e) {
            return ""
        },
        escape: function(e) {
            return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        },
        capitalize: function(e) {
            return String(e).toUpperCase()
        },
        "default": function(e, t) {
            return e != null ? e : t
        }
    };
    TrimPath.parseTemplate_etc.modifierDef.h = TrimPath.parseTemplate_etc.modifierDef.escape;
    TrimPath.parseTemplate_etc.Template = function(e, t, n, r, i) {
        this.process = function(e, t) {
            if (e == null) e = {};
            if (e._MODIFIERS == null) e._MODIFIERS = {};
            if (e.defined == null) e.defined = function(t) {
                return e[t] != undefined
            };
            for (var n in i.modifierDef) {
                if (e._MODIFIERS[n] == null) e._MODIFIERS[n] = i.modifierDef[n]
            }
            if (t == null) t = {};
            var s = [];
            var o = {
                write: function(e) {
                    s.push(e)
                }
            };
            try {
                r(o, e, t)
            } catch (u) {
                if (t.throwExceptions == true) throw u;
                var a = new String(s.join("") + "[ERROR: " + u.toString() + (u.message ? "; " + u.message : "") + "]");
                a["exception"] = u;
                LOG.error("TEMPLATE:" + a);
                LOG.error("TEMPLATE:" + $H(u).toJSON());
                return ""
            }
            return s.join("")
        };
        this.name = e;
        this.source = t;
        this.sourceFunc = n;
        this.toString = function() {
            return "TrimPath.Template [" + e + "]"
        }
    };
    TrimPath.parseTemplate_etc.ParseError = function(e, t, n) {
        this.name = e;
        this.line = t;
        this.message = n
    };
    TrimPath.parseTemplate_etc.ParseError.prototype.toString = function() {
        return "TrimPath template ParseError in " + this.name + ": line " + this.line + ", " + this.message
    };
    var parse = function(e, t, n) {
        e = cleanWhiteSpace(e);
        var r = ["var TrimPath_Template_TEMP = function(_OUT, _CONTEXT, _FLAGS) { with (_CONTEXT) {"];
        var i = {
            stack: [],
            line: 1
        };
        var s = -1;
        while (s + 1 < e.length) {
            var o = s;
            o = e.indexOf("{", o + 1);
            while (o >= 0) {
                var u = e.indexOf("}", o + 1);
                var a = e.substring(o, u);
                var f = a.match(/^\{(cdata|minify|eval)/);
                if (f) {
                    var l = f[1];
                    var c = o + l.length + 1;
                    var h = e.indexOf("}", c);
                    if (h >= 0) {
                        var p;
                        if (h - c <= 0) {
                            p = "{/" + l + "}"
                        } else {
                            p = e.substring(c + 1, h)
                        }
                        var d = e.indexOf(p, h + 1);
                        if (d >= 0) {
                            emitSectionText(e.substring(s + 1, o), r);
                            var v = e.substring(h + 1, d);
                            if (l == "cdata") {
                                emitText(v, r)
                            } else if (l == "minify") {
                                emitText(scrubWhiteSpace(v), r)
                            } else if (l == "eval") {
                                if (v != null && v.length > 0) r.push("_OUT.write( (function() { " + v + " })() );")
                            }
                            o = s = d + p.length - 1
                        }
                    }
                } else if (e.charAt(o - 1) != "$" && e.charAt(o - 1) != "\\") {
                    var m = e.charAt(o + 1) == "/" ? 2 : 1;
                    if (e.substring(o + m, o + 10 + m).search(TrimPath.parseTemplate_etc.statementTag) == 0) break
                }
                o = e.indexOf("{", o + 1)
            }
            if (o < 0) break;
            var u = e.indexOf("}", o + 1);
            if (u < 0) break;
            emitSectionText(e.substring(s + 1, o), r);
            emitStatement(e.substring(o, u + 1), i, r, t, n);
            s = u
        }
        emitSectionText(e.substring(s + 1), r);
        if (i.stack.length != 0) throw new n.ParseError(t, i.line, "unclosed, unmatched statement(s): " + i.stack.join(","));
        r.push("}}; TrimPath_Template_TEMP");
        return r.join("")
    };
    var emitStatement = function(e, t, n, r, i) {
        var s = e.slice(1, -1).split(" ");
        var o = i.statementDef[s[0]];
        if (o == null) {
            emitSectionText(e, n);
            return
        }
        if (o.delta < 0) {
            if (t.stack.length <= 0) throw new i.ParseError(r, t.line, "close tag does not match any previous statement: " + e);
            t.stack.pop()
        }
        if (o.delta > 0) t.stack.push(e);
        if (o.paramMin != null && o.paramMin >= s.length) throw new i.ParseError(r, t.line, "statement needs more parameters: " + e);
        if (o.prefixFunc != null) n.push(o.prefixFunc(s, t, r, i));
        else n.push(o.prefix);
        if (o.suffix != null) {
            if (s.length <= 1) {
                if (o.paramDefault != null) n.push(o.paramDefault)
            } else {
                for (var u = 1; u < s.length; u++) {
                    if (u > 1) n.push(" ");
                    n.push(s[u])
                }
            }
            n.push(o.suffix)
        }
    };
    var emitSectionText = function(e, t) {
        if (e.length <= 0) return;
        var n = 0;
        var r = e.length - 1;
        while (n < e.length && e.charAt(n) == "\n") n++;
        while (r >= 0 && (e.charAt(r) == " " || e.charAt(r) == "	")) r--;
        if (r < n) r = n;
        if (n > 0) {
            t.push('if (_FLAGS.keepWhitespace == true) _OUT.write("');
            var i = e.substring(0, n).replace("\n", "\\n");
            if (i.charAt(i.length - 1) == "\n") i = i.substring(0, i.length - 1);
            t.push(i);
            t.push('");')
        }
        var s = e.substring(n, r + 1).split("\n");
        for (var o = 0; o < s.length; o++) {
            emitSectionTextLine(s[o], t);
            if (o < s.length - 1) t.push('_OUT.write("\\n");\n')
        }
        if (r + 1 < e.length) {
            t.push('if (_FLAGS.keepWhitespace == true) _OUT.write("');
            var i = e.substring(r + 1).replace("\n", "\\n");
            if (i.charAt(i.length - 1) == "\n") i = i.substring(0, i.length - 1);
            t.push(i);
            t.push('");')
        }
    };
    var emitSectionTextLine = function(e, t) {
        var n = "}";
        var r = -1;
        while (r + n.length < e.length) {
            var i = "${",
                s = "}";
            var o = e.indexOf(i, r + n.length);
            if (o < 0) break;
            if (e.charAt(o + 2) == "%") {
                i = "${%";
                s = "%}"
            }
            var u = e.indexOf(s, o + i.length);
            if (u < 0) break;
            emitText(e.substring(r + n.length, o), t);
            var a = e.substring(o + i.length, u).replace(/\|\|/g, "#@@#").split("|");
            for (var f in a) {
                if (a[f].replace) a[f] = a[f].replace(/#@@#/g, "||")
            }
            t.push("_OUT.write(");
            emitExpression(a, a.length - 1, t);
            t.push(");");
            r = u;
            n = s
        }
        emitText(e.substring(r + n.length), t)
    };
    var emitText = function(e, t) {
        if (e == null || e.length <= 0) return;
        e = e.replace(/\\/g, "\\\\");
        e = e.replace(/\n/g, "\\n");
        e = e.replace(/"/g, '\\"');
        t.push('_OUT.write("');
        t.push(e);
        t.push('");')
    };
    var emitExpression = function(e, t, n) {
        var r = e[t];
        if (t <= 0) {
            n.push(r);
            return
        }
        var i = r.split(":");
        n.push('_MODIFIERS["');
        n.push(i[0]);
        n.push('"](');
        emitExpression(e, t - 1, n);
        if (i.length > 1) {
            n.push(",");
            n.push(i[1])
        }
        n.push(")")
    };
    var cleanWhiteSpace = function(e) {
        e = e.replace(/\t/g, "    ");
        e = e.replace(/\r\n/g, "\n");
        e = e.replace(/\r/g, "\n");
        e = e.replace(/^(\s*\S*(\s+\S+)*)\s*$/, "$1");
        return e
    };
    var scrubWhiteSpace = function(e) {
        e = e.replace(/^\s+/g, "");
        e = e.replace(/\s+$/g, "");
        e = e.replace(/\s+/g, " ");
        e = e.replace(/^(\s*\S*(\s+\S+)*)\s*$/, "$1");
        return e
    };
    TrimPath.parseDOMTemplate = function(e, t, n) {
        if (t == null) t = document;
        var r = t.getElementById(e);
        var i = r.value;
        if (i == null) i = r.innerHTML;
        i = i.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        return TrimPath.parseTemplate(i, e, n)
    };
    TrimPath.processDOMTemplate = function(e, t, n, r, i) {
        return TrimPath.parseDOMTemplate(e, r, i).process(t, n)
    }
})();
var recommendedHotels = {};
recommendedHotels.asciiLength = function(e) {
    var t = 0;
    for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r > 255) {
            t += 2
        } else {
            if (r > 65 && r < 91) {
                t += 2
            } else {
                t++
            }
        }
    }
    return t
};
recommendedHotels.asciiTrimByLength = function(e, t) {
    var n = "...";
    var r = n.length;
    var i = recommendedHotels.asciiLength(e);
    if (i <= t) {
        return e
    } else if (t == r) {
        return n
    } else if (t < r) {
        throw new Error("The arguments is not allowed less than " + r)
    } else {
        var s = i;
        var o = e.length - 1;
        for (; o >= 0; o--) {
            if (s <= t - r) {
                break
            } else {
                var u = e.charCodeAt(o);
                if (u > 255 || u > 65 && u < 91) {
                    s = s - 2
                } else {
                    s = s - 1
                }
            }
        }
        return e.substr(0, o + 1) + n
    }
};
recommendedHotels.fns = [];
recommendedHotels.show = function(e, t, n) {
    var r = recommendedHotels.con;
    var i = recommendedHotels.type;
    var s = recommendedHotels.from;
    var o = decodeURIComponent(recommendedHotels.city);
    var u = recommendedHotels.fromDate;
    var a = ["lijiang", "xianggelila", "akesu", "anshan", "anshun", "antu", "baise", "baoshan", "bayannaoer", "bazhong", "cangnan", "changle", "changshan", "chibei", "chifeng", "chongzuo", "chuxiong", "danyang", "danzhou", "daye", "dengfeng", "dingan", "dongshan", "dongtai", "duyun", "eerduosi", "enping", "ezhou", "fengdu", "fuyang_zhejiang", "geermu", "guigang", "haicheng", "hailuogou", "hami", "honghe", "honghezhou", "huairen", "huangyan", "huayin", "jiangyan", "jiangyou", "jimo", "jingjiang", "jintan", "kaili", "kanasi", "kuerle", "kuitun", "ledong", "lincang", "lingshi", "linzhi", "liuan", "liuyang", "longhai", "mangshi", "meishan", "nanping", "pingnan", "pujiang", "qianan", "qidong", "qinzhou", "qujing", "rikaze", "rudong", "shangqiu", "shannan", "shengsi", "shihezi", "songpan", "suifenhe", "suzhou_anhui", "tianmen", "tieling", "tongliao", "weinan", "wenchang", "wendeng", "wenshan", "wuxue", "wuzhishan", "wuzhou", "xilinguole", "xinglong", "xinzhou", "yanbian", "yangquan", "yining", "yongzhou", "yueqing", "yuhang", "yulin_guangxi", "yuxi", "zhangqiu", "zhongxun"].join().indexOf(e) >= 0 ? 2 : 1;
    var f = false;
    var l = function(e) {
        var t = Number.MAX_VALUE;
        for (var n = 0; n < e.length; n++) {
            if (t >= parseInt(e[n].pr)) {
                t = e[n].pr
            }
        }
        return parseInt(t)
    };
    var c = function(e) {
        var t = Number.MIN_VALUE;
        for (var n = 0; n < e.length; n++) {
            if (t < parseInt(e[n].pr)) {
                t = e[n].pr
            }
        }
        return parseInt(t)
    };
    if (t.length > 0) {
        var h = Number.MAX_VALUE;
        var p = false;
        var d = Number.MIN_VALUE;
        var v = 3;
        var m = 5;
        var g = {
            c: 0,
            l: 2,
            b: 2,
            m: 0
        };
        var y = {
            l: 10,
            b: 9,
            c: 8
        };
        t.sort(function(e, t) {
            var n = y[e.tp] ? y[e.tp] : 0;
            var r = y[t.tp] ? y[t.tp] : 0;
            return n - r
        });
        for (var b = 0; b < t.length; b++) {
            var w = t[b].hs || [];
            for (var E = 0; E < w.length; E++) {
                if (w[E].isGroupPrice === "0") {
                    w[E].isGroupPrice -= 0
                }
            }
            var S = t[b];
            if (w && w.length > 0) {
                var w = t[b].hs = w.slice(0, Math.min(w.length, g[S.tp]));
                if (S.tp == "c") {
                    S.title = o + "最低价酒店";
                    S.footer = "更多";
                    S.footerlink = "http://hotel.qunar.com/search.jsp?toCity=" + recommendedHotels.city + "&fromDate=" + n + "&from=" + s + "-" + S.tp;
                    p = true;
                    d = Math.max(d, c(t[b].hs));
                    m = S.ct
                } else if (S.tp == "b") {
                    S.title = o + "[连锁经济型]酒店推荐";
                    S.stitle = o + "高性价比酒店推荐";
                    S.footer = S.ct > v ? "更多" : "";
                    S.sfooter = "更多";
                    S.footerlink = "http://hotel.qunar.com/search.jsp?toCity=" + recommendedHotels.city + "&fromDate=" + n + "&from=" + s + "-" + S.tp + "m" + "&q=" + encodeURIComponent("经济型酒店");
                    S.sfooterlink = "http://hotel.qunar.com/search.jsp?toCity=" + recommendedHotels.city + "&fromDate=" + n + "&from=" + s + "-" + S.tp;
                    var x = [];
                    for (var T = 0; T < w.length; T++) {
                        if (w[T].st == -1) {
                            x.push(w[T])
                        }
                    }
                    t[b].hs = x;
                    h = Math.min(h, l(t[b].hs))
                } else if (S.tp == "m") {
                    delete S.tp
                } else if (S.tp == "l") {
                    S.title = o + "[豪华型]酒店推荐";
                    S.footer = S.ct > v ? "更多" : "";
                    S.footerlink = "http://hotel.qunar.com/search.jsp?toCity=" + recommendedHotels.city + "&fromDate=" + n + "&from=" + s + "-" + S.tp + "m" + "&q=" + encodeURIComponent("豪华型酒店");
                    h = Math.min(h, l(t[b].hs))
                }
                for (var N = 0; N < w.length; N++) {
                    var C = w[N];
                    if (!C.st) {
                        C.star = ""
                    } else if (C.st == -1) {
                        C.star = "连锁经济型"
                    } else if (C.st == 1) {
                        C.star = "一星级"
                    } else if (C.st == 2) {
                        C.star = "二星级"
                    } else if (C.st == 3) {
                        C.star = "三星级"
                    } else if (C.st == 4) {
                        C.star = "四星级"
                    } else if (C.st == 5) {
                        C.star = "五星级"
                    }
                    C.sname = recommendedHotels.asciiTrimByLength(C.name, 30);
                    C.url = C.detailURL + "/#from=" + s + "-" + S.tp + "&fromDate=" + C.fromDate;
                    C.scbd = C.cbd ? C.cbd.replace(/区/g, "").replace(/县/g, "") : "";
                    C.qtype = C.cbd && a ? C.ar == 1 ? C.ar : 0 : 0;
                    if (C.ap && C.ap.length > 1) {
                        C.ap.sort(function(e, t) {
                            return e.dist - t.dist
                        })
                    }
                    if (C.sd) {
                        var k = C.sd.replace(/([\u0391-\uffe5])/ig, "$1a");
                        if (N == 0) {
                            if (k.length > 39 * 2) {
                                C.sd = k.substring(0, 39 * 2).replace(/([\u0391-\uffe5])a/ig, "$1") + "..."
                            }
                        } else {
                            if (k.length > 40 * 2) {
                                C.sd = k.substring(0, 40 * 2).replace(/([\u0391-\uffe5])a/ig, "$1") + "..."
                            }
                        }
                    }
                }
                f = true
            }
        }
        if (p && h <= d) {
            for (var b = 0; b < t.length; b++) {
                if (t[b].tp == "c") {
                    var w = t[b].hs;
                    var x = [];
                    for (var N = 0; N < w.length; N++) {
                        if (parseInt(w[N].pr) < h) {
                            x.push(w[N])
                        }
                    }
                    t[b].hs = x
                }
            }
        }
    }
    if (f) {
        var L = function() {
            switch (recommendedHotels.type) {
                case 0:
                    return '					{for hotelinfo in hotelinfos}						{if hotelinfo.hs && hotelinfo.hs.length > 0}						<div class="b_htl_pmt">							<div class="e_htl_tit">						        <a class="more" target="_blank" href="${hotelinfo.footerlink}">更多</a><h3>${hotelinfo.title}</h3>						    </div>							<div class="e_pmt_cont">							    {for hotel in hotelinfo.hs}								<dl class="dl_htl_pmt clrfix">						            <dt><img class="tuan" title="${hotel.name}" alt="${hotel.name}" src="http://simg1.qunarzz.com/site/images/flight/flight_v1/ico_fly_tuan.png" width="26" height="12"><a target="_blank" title="${hotel.name}" href="${hotel.url}">						            {if !hotel.isGroupPrice}						            <i class="rmb">&yen;</i><em class="f_tmt">${hotel.pr}</em>起{/if}${hotel.sname}{if hotel.isGroupPrice}{/if}</a></dt>						            <dd>						            <div class="h_img">						            <a target="_blank"  href="${hotel.url}">						            	{if hotel.purl}						            	<img width="61" height="61" src="${hotel.purl}" title="${hotel.name}" />						            	{else}						            	<img width="61" height="61" src="http://simg1.qunarzz.com/site/images/new_main/imgnull.gif" />						            	{/if}						            </a></div>						            <div class="h_ifo">${hotel.sd}</div>						            </dd>						        </dl>						        {/for}						    </div>						</div>						{/if}					{/for}';
                case 1:
                    return '					<div class="cvHotel cvAD_180">					{for hotelinfo in hotelinfos}						{if hotelinfo.hs && hotelinfo.hs.length > 0 && hotelinfo.tp == "b"}							<div class="cvHd">								<div class="t3"></div><div class="t2"></div><div class="t1"></div>								<h3>${hotelinfo.stitle}</h3>							</div>						{/if}						<ul class="cvList">							{for hotel in hotelinfo.hs}							{if hotelinfo.tp == "b"}							<li>								<h4><a href="${hotel.url}" title="${hotel.name}" target="_blank">${hotel.sname}<span class="pr">&yen;${hotel.pr}起</span></a></h4>								{if hotel.ap.length > 0}									{if city == "上海"}										<p>距机场公里数:											{for airp in hotel.ap}												${airp.apname}（${airp.dist}）											{/for}										</p>									{else}										{for airp in hotel.ap}										<p>距${airp.apname}:${airp.dist}公里</p>										{/for}									{/if}								{else}									<p>暂无距离机场数据</p>								{/if}								{if hotel.cbd}									<p>${hotel.star} 位于：<a href="http://hotel.qunar.com/search.jsp?toCity=${toCity}&from=${from}-${hotelinfo.tp}&qtype=${qtype}&q=${encodeURIComponent(hotel.scbd)}" target="_blank">${hotel.cbd}</a></p>								{/if}							</li>							{/for}							{/if}						</ul>						{if hotelinfo.tp == "b"}							<div class="cvFt"><a href="${hotelinfo.sfooterlink}" target="_blank">${hotelinfo.sfooter}</a></div>						{/if}					{/for}					</div>					';
                default:
                    return ""
            }
        }();
        var A = TrimPath.parseTemplate(L);
        var O = A.process({
            city: decodeURIComponent(o),
            city_url: e,
            hotelinfos: t,
            from: s,
            qtype: a,
            fromDate: u,
            toCity: recommendedHotels.city
        });
        if (recommendedHotels.type == 1) {
            var M = false;
            for (var b = 0; b < t.length; b++) {
                if (t[b].tp == "b") {
                    M = true;
                    break
                }
            }
            if (!M) {
                O = ""
            }
        }
        if (O) {
            var _ = document.createElement("style");
            _.setAttribute("type", "text/css");
            var D = ".cvList{margin-bottom:8px;}.cvHotel { clear:both; }.cvHotel a { font-weight:400; color:#0069ca; }.cvHotel a:hover { color:#f60; }.cvHotel .cvHd .t3 { margin:0 3px; height:1px; background-color:#f0f0f0; overflow:hidden; }.cvHotel .cvHd .t2 { margin:0 2px; height:1px; background-color:#f0f0f0; overflow:hidden; }.cvHotel .cvHd .t1 { margin:0 1px; height:1px; background-color:#f0f0f0; overflow:hidden; }.cvHotel .cvHd h3 { padding:5px 10px; border-bottom:1px solid #ccc; font-size:14px; background-color:#f0f0f0; color:#333; }.cvHotel .cvList li { padding:10px 10px 8px; border-bottom:1px solid #efefef; }.cvHotel .cvList h4 { margin-bottom:4px; font-size:14px; }.cvHotel .cvList h4 a { display:block; outline:none; }.cvHotel .cvList .pr { float:right; font-size:12px; color:#f60; cursor:pointer; }.cvHotel .cvList p { padding:2px 0; line-height:18px; }.cvHotel .cvList p.intro { padding-bottom:5px; }.cvHotel .cvList p.bt { clear:both; }.cvHotel .cvList p .rank { float:right; width:125px; }.cvHotel .wi .img { float:left; width:70px; }.cvHotel .wi .img img { padding:1px; border:1px solid #ddd;width:60px;height:60px; }.cvHotel .wi p.intro { margin-left:70px; }.cvHotel .cvFt { float:right;font:normal 12px/17px Arial; }";
            if (_.styleSheet) {
                _.styleSheet.cssText = D
            } else {
                var P = document.createTextNode(D);
                _.appendChild(P)
            }
            var H = document.getElementsByTagName("head")[0];
            H.appendChild(_);
            recommendedHotels.con.innerHTML = O;
            recommendedHotels.con.style.display = "block"
        } else if (recommendedHotels.fns) {
            recommendedHotels.initad()
        }
    } else {
        recommendedHotels.initad()
    }
};
recommendedHotels.initad = function() {
    recommendedHotels.exec = true;
    for (var e = 0; e < recommendedHotels.fns.length; e++) {
        try {
            recommendedHotels.fns[e]()
        } catch (t) {}
    }
    recommendedHotels.fns = []
};
recommendedHotels.addListener = function(e) {
    recommendedHotels.fns.push(e);
    if (recommendedHotels.exec) {
        recommendedHotels.initad()
    }
};
recommendedHotels.query = function(e, t, n, r, i) {
    var s = document.getElementById(n);
    if (!s) {
        throw new Error("推荐酒店初始化错误")
    }
    if (!i) {
        i = 0
    }
    recommendedHotels.fromDate = t;
    recommendedHotels.city = e;
    recommendedHotels.con = s;
    recommendedHotels.type = i;
    recommendedHotels.from = "flight";
    var o = document.createElement("script");
    o.src = "http://hotel.qunar.com/fch.jsp?city=" + e + "&fromDate=" + t + "&callback=recommendedHotels.show";
    var u = document.getElementsByTagName("head")[0];
    u.appendChild(o)
};
(function(e) {
    "$doc:nomunge, $head:nomunge";

    function y(e, t, n, r) {
        var i, s = t.document,
            o = s.getElementById(e);
        if (o) {
            n.id = e;
            if (/MSIE/i.test(navigator.appVersion)) {
                var u = [];
                u.push('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
                for (var a in n) {
                    if (n.hasOwnProperty(a)) {
                        a = a.toLowerCase();
                        if (a === "data") {
                            r.movie = n[a]
                        } else if (a === "styleclass") {
                            u.push(' class="', n[a], '"')
                        } else if (a !== "classid") {
                            u.push(" ", a, '="', n[a], '"')
                        }
                    }
                }
                u.push(">");
                for (var f in r) {
                    if (r.hasOwnProperty(f)) {
                        u.push('<param name="', f, '" value="', r[f], '" />')
                    }
                }
                u.push("</object>");
                o.outerHTML = u.join("");
                i = s.getElementById(n.id)
            } else {
                var l = s.createElement("object");
                l.style.outline = "none";
                l.setAttribute("type", "application/x-shockwave-flash");
                for (var c in n) {
                    if (n.hasOwnProperty(c)) {
                        c = c.toLowerCase();
                        if (c === "styleclass") {
                            l.setAttribute("class", n[c])
                        } else if (c !== "classid") {
                            l.setAttribute(c, n[c])
                        }
                    }
                }
                for (var h in r) {
                    if (r.hasOwnProperty(h) && h.toLowerCase() !== "movie") {
                        var p = s.createElement("param");
                        p.setAttribute("name", h);
                        p.setAttribute("value", r[h]);
                        l.appendChild(p)
                    }
                }
                o.parentNode.replaceChild(l, o);
                i = l
            }
        }
        return i
    }

    function b(e, t, n, r) {
        if (!g()) return null;
        return y(e, t, n, r)
    }

    function w(e) {
        return r.getElementById(e)
    }

    function E(e, t) {
        return e.getAttribute("data-" + t)
    }

    function C(e) {
        var t = [];
        for (var n in e) {
            t.push(n + "=" + encodeURIComponent(e[n]))
        }
        return t.join("&")
    }

    function k(e) {
        var t = x,
            n = "/js.ng/";
        if (e.type === "qde_text") {
            n = e.adurl ? "/" + e.adurl + "?" : "/qadjs12_css.nghtml?"
        }
        var r = N;
        if (e.id === QNR.AD.__cur_qde_ad) {
            N = String(+(new Date)) + parseInt(Math.random() * 1e7, 10)
        }
        var i = ["http://", t, n, "framId=", e.id, "&", e.query, "&tile=", r];
        if (d) {
            i.push("&city=", d)
        }
        if (u) {
            i.push("&adtest=beta")
        }
        if (h) {
            i.push(h)
        }
        return i.join("")
    }

    function L(e) {
        return ft(e.id).urlPath(e)
    }

    function A(e) {
        var t = "";
        switch (e.type) {
            case "qde":
            case "qde_text":
            case "qde_auto":
                t = k(e);
                break;
            case "qad":
                t = L(e);
                break;
            default:
                break
        }
        return t
    }

    function O() {
        return r.createElement("div")
    }

    function M() {
        var e = r.createElement("iframe");
        e.setAttribute("height", 0);
        e.setAttribute("frameBorder", 0);
        e.setAttribute("scrolling", "no");
        e.style.display = "none";
        return e
    }

    function _(e, t) {
        if (t && t.parentNode) {
            t.parentNode.insertBefore(e, t)
        }
    }

    function D(e, t) {
        var n = e === "div" ? O() : M();
        if (t && t.style) {
            n.style.cssText = t.style
        }
        if (e === "iframe") {
            n.style.display = "none"
        }
        return n
    }

    function P(e, t) {
        t = t || "div";
        var n = S(e),
            r = D(t, n);
        return r
    }

    function H(e) {
        var t = P(e, "div"),
            n = w(e);
        if (n && n.parentNode) {
            n.parentNode.insertBefore(t, n)
        }
        return t
    }

    function B(e) {
        var t = r.createElement("script");
        t.charset = "utf-8";
        t.async = true;
        t.src = e;
        s.insertBefore(t, s.lastChild)
    }

    function F(e) {
        if (!j) {
            j = O();
            j.style.display = "none";
            document.body.appendChild(j)
        }
        j.appendChild(e)
    }

    function I() {
        var e = r[t]("abbr"),
            n = [];
        for (var i = 0, s = e.length; i < s; i++) {
            if (E(e[i], "type") && E(e[i], "lazyAD") !== "1") {
                n.push(e[i])
            }
        }
        return n
    }

    function q(e, t) {
        e = e || [];
        t = t || {};
        var n = {},
            r, i, s, u = /chan=([a-z_]+)/,
            a;
        for (var f = 0, c = e.length; f < c; f++) {
            r = e[f];
            i = S(r);
            if (i.type === "qad") {
                i.callback = QNR.AD.getCallbackName(i.id, true)
            }
            s = A(i);
            if (!l && i.type === "qde") {
                a = u.exec(s);
                if (a && a[1]) l = a[1]
            }
            if (s) {
                n[i.id] = s
            }
        }
        return {
            ads: n,
            domain: o
        }
    }

    function U() {
        if (R) {
            setTimeout(function() {
                if (R) {
                    R.parentNode.removeChild(R);
                    R = null
                }
            }, 0)
        }
    }

    function z(e) {
        var t = r.createElement("div");
        t.style.display = "none";
        var n = [];
        f = "http://vata.qunar.com/vata?chan=" + (l || "");
        n.push('<form name="vata_main_form" target="vata_main_frame" action="' + f + '" method="POST">');
        e.ads = e.ads || {};
        for (var i in e.ads) {
            if (e.ads.hasOwnProperty(i)) {
                n.push('<input type="text" name="', i, '" value="', e.ads[i], '" />')
            }
        }
        n.push("</form>");
        n.push("<iframe src='' name='vata_main_frame' id='vata_main_frame'></iframe>");
        t.innerHTML = n.join("");
        R = t;
        F(t);
        if (/MSIE/i.test(navigator.appVersion)) {
            w("vata_main_frame").src = "javascript:'<script>window.onload=function(){document.write(\\'<script>document.domain=\\\"" + o + "\\\";parent.document.vata_main_form.submit();<\\\\/script>\\');document.close();};</script>'"
        } else {
            r.vata_main_form.submit()
        }
    }

    function W(e) {
        var t = I();
        var n = [],
            r, i = function(t) {
                r = E(t, "type");
                if (r === "qde_auto") {
                    rt(t)
                } else if (a === 1 || r === "qde_text") {
                    it(t, e || {})
                } else {
                    n.push(t)
                }
            };
        for (var s = 0, o = t.length; s < o; s++) {
            i(t[s])
        }
        var u = n.length;
        if (u == 1) {
            it(n[0], e || {})
        } else if (u > 1) {
            z(q(n, e))
        }
    }

    function X(e, t) {
        if (e.attachEvent) {
            e.attachEvent("onload", t)
        } else {
            e.onload = t
        }
    }

    function V(e, t) {
        if (e == null || e != e.window) {
            return false
        }
        var n = e.frameElement;
        var r = e.document.body;
        var i = function(s) {
            n.style.display = "";
            var o = r.offsetHeight;
            if (!s) {
                X(e, function() {
                    i(true)
                })
            }
            if (o == 0) {
                n.style.display = "none"
            } else {
                n.style.height = o + "px";
                t && t()
            }
        };
        i()
    }

    function K(e, t) {
        var n = $[t];
        var r = n && n.join("") || "";
        if (r) {
            n.length = 0;
            e.write(r)
        } else {
            ot(t, false)
        }
    }

    function G(e, t) {
        var n = Q[t] || 0;
        Q[t] = "";
        n && e.write(n)
    }

    function Y(e, t) {
        e = e || "ad_queue_all";
        if (!$[e]) {
            $[e] = []
        }
        $[e].push(t)
    }

    function Z(e) {
        return c + (J ? "&rnd=" + e : "") + "#" + e
    }

    function et(e, t, n, r) {
        var i = [];
        if (e) {
            i[i.length] = "<style>" + e + "</style>"
        }
        if (t) {
            i[i.length] = t.replace(/(scr)_(ipt)/gi, "$1$2")
        }
        if (n) {
            i[i.length] = '<script type="text/javascript">' + n + "</script>"
        }
        if (r) {
            i[i.length] = '<script type="text/javascript" src="' + r + '"></script>'
        }
        return i.join("")
    }

    function tt(e, t) {
        var n = Z(e),
            r = P(e, "iframe");
        r.src = n;
        if (t == 1) {
            F(r)
        } else {
            var i = w(e);
            _(r, i)
        }
    }

    function nt(e, t, n) {
        var r = w(e),
            i = P(e, "iframe");
        i.style.display = "";
        i.src = t;
        i.id = n || e;
        r.parentNode.replaceChild(i, r)
    }

    function rt(e) {
        var t = e.getAttribute("data-src");
        if (t) {
            nt(e.id, t)
        }
    }

    function it(e) {
        var t = S(e),
            n = t.id,
            r, i, s = "";
        if (!n) {
            return
        }
        if (t.type === "qde_auto") {
            rt(e)
        } else if (t.type === "qad") {
            t.callback = QNR.AD.getCallbackName(n);
            i = A(t);
            if (i) B(i)
        } else {
            i = A(t);
            if (!i) return;
            if (t.type === "qde_text") {
                s = "call_show=1;";
                r = et("", "", s, i);
                Y(n, r)
            } else {
                r = '<script type="text/javascript" src="' + i + '"></script>';
                Q[n] = r
            }
            tt(n, 0)
        }
    }

    function st(e, t, n, r, i, s) {
        if (n === '<div style="display:none"></div>') {
            ot(e, false);
            return
        }
        var o = w(e),
            u = "",
            f;
        if (!o) return;
        ot(e, true);
        f = n && /top.QNR.AD.run_in_content/.test(n);
        if (!f) f = r && /top.QNR.AD.run_in_content/.test(r);
        if (f) s = 1;
        if (n.indexOf("q_header|qn_header") > -1 || r.indexOf("q_header|qn_header") > -1) {
            w("j-pagecontainer") && (w("j-pagecontainer").style.background = "none")
        } else {
            if (f && /ad_type="([a-z_]+)"/.test(n)) {
                if (RegExp.$1 == "static_shading") {
                    w("j-pagecontainer") && (w("j-pagecontainer").style.background = "none")
                }
            }
        }
        if (a === 1) {
            if (s != 1) {
                r = r || "";
                r = "call_show = 1;" + r
            }
            u = et(t, n, r, i);
            if (f) {
                u = u + "<script>writeContent(document,Current_ad_id);</script>"
            }
            Y(e, u);
            return
        }
        if (s == 1) {
            u = et(t, n, r, i);
            if (u) {
                u = '<script type="text/javascript">Current_ad_id = "' + e + '";</script>' + u
            }
        } else {
            r = "call_show=1;" + r;
            u = et(t, n, r, i);
            s = 0
        }
        Y(e, u);
        tt(e, s)
    }

    function ot(e, t) {
        var n = QNR.AD._DE;
        if (e) {
            if (n[e]) {
                n[e](t);
                delete n[e]
            }
            return
        }
        for (var r in n) {
            n[r](false)
        }
        QNR.AD._DE = {}
    }

    function ut(e) {
        this.$aid = e;
        this.params = {}
    }

    function ft(e, t) {
        if (!at[e]) {
            at[e] = new ut(e)
        }
        t && t(at[e]);
        return at[e]
    }
    if (typeof e.QNR === "undefined") {
        e.QNR = {}
    }
    QNR._AD = {};
    var t = "getElementsByTagName";
    var n = e,
        r = n.document,
        i = r.body,
        s = r[t]("head")[0],
        o = "qunar.com",
        u = false,
        a = 0,
        f, l, c, h, p, d, v;
    try {
        r.domain = o
    } catch (m) {}
    var g = function() {
        var e = n.navigator,
            t = "application/x-shockwave-flash";
        var r = false,
            i, s;
        var o = e.mimeTypes && e.mimeTypes[t] ? e.mimeTypes[t].enabledPlugin : 0;
        if (o) {
            s = o.description;
            if (parseInt(s.substring(s.indexOf(".") - 2), 10) >= 8) {
                r = true
            }
        } else if (n.ActiveXObject) {
            try {
                i = new n.ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                if (i) {
                    r = true
                }
            } catch (u) {}
        }
        g = function() {
            return r
        };
        o = i = s = e = null;
        return r
    };
    var S = function() {
        function n(t) {
            var n = {},
                r;
            if (!t) return {};
            n.id = t.id;
            for (var i = 0, s = e.length; i < s; i++) {
                r = e[i];
                n[r] = E(t, r)
            }
            if (n.type === "qde_text") {
                n["adurl"] = E(t, "adurl")
            }
            return n
        }
        var e = ["type", "style", "query", "main"],
            t = {};
        return function(e) {
            var r, i;
            if (typeof e === "string") {
                r = e
            } else {
                r = e.id;
                i = e
            }
            if (!t[r]) t[r] = n(i || w(r));
            return t[r]
        }
    }();
    var x = "qde.qunar.com",
        T = "a.qunar.com";
    var N = String(+(new Date)) + parseInt(Math.random() * 1e7, 10);
    var j;
    var R;
    var $ = {};
    var J = /MSIE 6\.0/.test(navigator.userAgent);
    var Q = {};
    ut.prototype = {
        constructor: ut,
        createCall: function(e) {
            var t = this;
            QNR._AD[this.$aid] = function(n) {
                e(n, t)
            }
        },
        createDiv: function() {
            return H(this.$aid)
        },
        set: function(e, t) {
            this.params[e] = t;
            return this
        },
        getId: function() {
            return this.$aid
        },
        run_in_iframe: function(e, t) {
            if (typeof t == "undefined") {
                t = 1
            }
            QNR.AD.add_AD_iframe(this.$aid, e, t)
        },
        urlPath: function(e) {
            var t = ["http://", T, "/vataplan?", "framId=", e.id, "&", e.query, "&callback=", e.callback, "&ab=b&tile=", N];
            if (p) {
                t.push(p)
            }
            var n = C(this.params);
            n && t.push("&", n);
            if (d) {
                t.push("&city=", d)
            }
            return t.join("")
        },
        load: function() {
            QNR.AD.loadOneAD(this.$aid)
        }
    };
    var at = {};
    QNR.AD = {
        version: "4.4",
        _AD: {},
        _DE: {},
        run_in_content: st,
        run_queue_list: function() {
            var e = "ad_queue_all";
            var t = $[e];
            var n = t && t.join("") || "";
            if (n) {
                t.length = 0;
                n += '<script type="text/javascript">writeContent(document,"ad_queue_all");</script>';
                Y(e, n);
                tt(e, 1)
            }
            U();
            ot()
        },
        writeHeadScript: G,
        create_div_container: H,
        writeContent: K,
        $inject_flash: b,
        createAdFrame: nt,
        createQAd: ft,
        add_AD_iframe: function(e, t, n) {
            if (!t) return;
            if (n) t = t + '<script type="text/javascript">call_show=1;</script>';
            Y(e, t);
            tt(e, 0)
        },
        init: function(e) {
            u = e.debug || false;
            a = e.type || "";
            if (J) {
                a = 1
            }
            d = e.ip || "";
            h = e.qde_plus || "";
            p = e.qad_plus || "";
            c = e.blank_html || "";
            v = e;
            if (u) {
                x = "qdebeta.qunar.com"
            }
            W(e)
        },
        show: function(e, t) {
            V(e, function() {
                QNR.AD.callWinShowFun(t, e)
            })
        },
        getCallbackName: function(e, t) {
            return (t ? "parent." : "") + "QNR._AD." + e
        },
        callWinShowFun: function(e, t) {
            var n = e + "_win_",
                r = QNR._AD[n];
            if (r) r(e, t)
        },
        createWinShowCall: function(e, t) {
            var n = e + "_win_";
            QNR._AD[n] = t
        },
        createCallback: function(e, t) {
            var n = ft(e);
            n.createCall(function(e) {
                var r = n.createDiv();
                t(r, e)
            })
        },
        createQdeCallback: function(e, t) {
            QNR.AD._DE[e] = function(n) {
                t(n, e)
            }
        },
        callBackQDE: ot,
        change_one_async: function() {
            var e = v;
            e.type = 1;
            QNR.AD.init(e);
            U()
        },
        loadOneAD: function(e) {
            var t = w(e);
            if (t) {
                it(t)
            }
        }
    }
})(this);
QNR.ips = function(e) {
    function o(e, n) {
        s.push(e);
        if (i) {
            return
        }
        var o = t.createElement("script");
        a.callback = function(e) {
            if (r !== null) {
                return
            }
            r = e.city || "";
            u();
            o.parentNode.removeChild(o)
        };
        o.type = "text/javascript";
        o.charset = "utf-8";
        o.src = "http://ws.qunar.com/ips.jcp?callback=QNR.ips.callback&_=" + +(new Date);
        o.async = true;
        var f = t.getElementsByTagName("head");
        container = f ? f[0] : document.documentElement;
        container.insertBefore(o, container.firstChild);
        i = 1;
        setTimeout(function() {
            a.callback({})
        }, n || 2e3)
    }

    function u() {
        for (var e = 0, t = s.length; e < t; e++) {
            s[e].call(null, r)
        }
        s.length = 0
    }

    function a(e, t) {
        e = e || function() {};
        if (r !== null) {
            e.call(null, r)
        } else {
            o(e, t)
        }
    }
    if (typeof e.QNR === "undefined") {
        e.QNR = {}
    }
    var t = e.document,
        n = location.search.match(/debug=city=([^&#]+)/),
        r = n ? decodeURI(n[1]) : null,
        i = 0,
        s = [];
    return a
}(this);
if (typeof AD_Manage === "undefined") {
    var AD_Manage = {}
}
AD_Manage.isDebug = function() {
    var e = location.href;
    return e.indexOf("adtest=beta") > 0 && e.indexOf("adebug") > 0
};
var QadAdUnits = function() {
    function e(e) {
        return typeof e === "string" ? document.getElementById(e) : e
    }

    function t(e) {
        var t = document;
        var n = t.getElementsByTagName("head")[0];
        if (t.createStyleSheet) {
            t.createStyleSheet().cssText = e
        } else {
            var r = t.createElement("style");
            r.textContent = e;
            n.insertBefore(r, n.firstChild)
        }
    }

    function r() {
        if (n) t(n);
        n = null
    }

    function i(e, t) {
        var n = [],
            r = null,
            i = "";
        var u = e.key_data || [];
        for (var a = 0, f = u.length; a < f; a++) {
            r = u[a];
            if (t) {
                i = t(r)
            } else if (r.img) {
                i = s(r)
            } else {
                i = o(r)
            }
            n.push(i)
        }
        return n.join("")
    }

    function s(e) {
        var t = u(e);
        return ['<div class="un_ct">', '<dl class="hn_dl">', '<dt><a target="_blank" href="', t, '">', '<img src="', e.img, '"></a>', "</dt>", '<dd><a target="_blank" href="', t, '" class="hn_d2">', e.title, "</a></dd>", '<dd><a target="_blank" href="', t, '" class="hn_d3">', e.description, "</a></dd>", '<dd><a target="_blank" href="', t, '">', e.show, "</a></dd>", '</dl><div class="clr"></div></div>'].join("")
    }

    function o(e) {
        var t = u(e);
        var n = e.title || "";
        n = n.replace("...", "");
        var r = e.description || "";
        return ['<dl class="dl_spy">', '<dt><a class="lnk_rut" title="', n, '" target="_blank" href="', t, '">', n, "</a></dt>", e.phone ? '<dd><a class="lnk_tel" target="_blank" href="' + t + '">TEL: ' + e.phone || "" + "</a></dd>" : "", '<dd><a title="' + r + '" class="lnk_t" href="', t, '" target="_blank">', r, "</a></dd>", '<dd><a class="lnk_h" target="_blank" href="', t, '">', e.margin ? '<span class="icon_bz" title="商户服务安全双重保障"></span>' : "", e.show || "", "</a></dd>", "</dl>"].join("")
    }

    function u(e) {
        return ["http://clk.qunar.com/q?k=", e.s || "", "&e=", e.e].join("")
    }
    var n = "";
    return {
        $E: e,
        append_style: t,
        renderTextLinkHTML: i,
        appendTextCss: r,
        parse_clk_url: u,
        create_iframe_hander: function(e, t) {
            if (typeof e === "string") e = QNR.AD.createQAd(e);
            e.createCall(function(n) {
                var r = n && n.key_data && n.key_data.length || 0;
                var s = "",
                    o;
                if (r) {
                    var o = e.getCss && e.getCss() || "";
                    if (o) s = '<style type="text/css">' + o + "</style>";
                    s += i(n, e.renderHtmlItem);
                    e.run_in_iframe(s, 1)
                }
                t(r, e)
            })
        },
        create_text_call: function(e, t) {
            QNR.AD.createCallback(e, function(e, n) {
                var r = n && n.key_data && n.key_data.length || 0;
                if (!r) {
                    e.style.display = "none"
                } else {
                    QadAdUnits.appendTextCss();
                    e.innerHTML = QadAdUnits.renderTextLinkHTML(n)
                }
                t(r, n)
            })
        }
    }
}();
(function() {
    function t(e) {
        var t = e && e.key_data && e.key_data.length;
        if (!t) return;
        var n = e.key_data[0].description;
        if (!n) return;
        n = n.replace(/(st)_(yle)/ig, "$1$2");
        n = n.replace(/(scr)_(ipt)/gi, "$1$2");
        return n
    }

    function n(e) {
        return function(n, r) {
            n.style.display = "none";
            html = t(r);
            QNR.AD.add_AD_iframe(e, html, 1)
        }
    }

    function r() {
        var t = e("ifmRightTextlink_title");
        if (t) t.style.display = "block";
        t = e("ifmRightTextlink_footer");
        if (t) t.style.display = "block"
    }

    function i(e, t, n) {
        var r = n && n.key_data && n.key_data.length;
        t.style.display = "none";
        if (!r) {
            return
        }
        var i = '<style type="text/css">' + ".f_org { color: #FF6600; }" + ".ul_listBticket li { display: inline-block; float: left; line-height: 20px; text-align: left; width: 27%; }" + ".ul_listBticket li a { display: block; }" + ".ul_listBticket li a .tit { display: block;}" + ".ul_listBticket li.col_qnr { padding-top: 0; text-align: left; width: 18%; }" + ".ul_listBticket li.col_qnr .txtlnk_qnr { background: none repeat scroll 0 0 #EFEFEF; color: #333; display: inline-block; height: 17px; line-height: 17px; padding: 0 6px; }" + "</style>";
        var s = ['<div class="bannerTK_cont" id="result">'],
            o = n.key_data,
            u, a;
        s.push('<ul class="ul_listBticket clr_after">');
        s.push('<li class="col_qnr"><span class="txtlnk_qnr">去哪儿提供的链接</span></li>');
        for (var f = 0; f < r; f++) {
            u = o[f];
            a = ["http://clk.qunar.com/q?k=", u.s || "", "&e=", u.e].join("");
            s.push('<li><a href="', a, '" target="_blank"><span class="tit">', u.title, '</span> <span class="f_org">', u.show, "</span> </a></li>")
        }
        s.push("</ul></div>");
        var s = i + s.join("");
        QNR.AD.add_AD_iframe(e, s, 1)
    }

    function s(e, t, n) {
        var r = n && n.key_data && n.key_data.length;
        t.style.display = "none";
        if (!r) {
            return
        }
        var i = "text-align:center;";
        var s = "padding-top:8px;";
        if (e == "topicLinkR" || e == "topicLinkL") {
            i = "text-align:right;*padding-right:10px;";
            s = "padding-top:6px;*padding-top:4px;_padding-top:8px;"
        }
        var o = '<style type="text/css">' + ".topicLink { height:24px;color:#333;" + i + "}" + ".topicLink p {" + s + " }" + ".topicLink p a { color:#268fc5; }" + ".topicLink p .ico_vl{ margin-left:2px;vertical-align:middle;margin-top:-2px;*margin-top:2px;_margin-top:-3px;}" + "</style>";
        var u = ['<div class="topicLink">'],
            n = n.key_data,
            a, f;
        for (var l = 0; l < r; l++) {
            f = n[l];
            a = ["http://clk.qunar.com/q?k=", f.s || "", "&e=", f.e].join("");
            u.push('<p><a href="', a, '" target="_blank" title="', f.title + '">', f.description, '<img src="', f.img, '" alt="hot" class="ico_vl"></a></p>')
        }
        u.push("</div>");
        u = o + u.join("");
        QNR.AD.add_AD_iframe(e, u, 1)
    }

    function o(e, t) {
        QNR.AD.createCallback(e, function(e, n) {
            var r = n && n.key_data && n.key_data.length;
            e.style.display = "none";
            var i = document.getElementById(t);
            if (!r) {
                i.parentNode.style.display = "none";
                return
            }
            var s = [];
            for (var o = 0; o < r; o++) {
                var u = n.key_data[o];
                var a = ["http://clk.qunar.com/q?k=", u.s || "", "&e=", u.e].join("");
                s.push('<a style="display:block;padding-bottom:16px;" href="', a, '" target="_blank">', '<img style="display:block;" src="', u.img, '" /></a>')
            }
            i.innerHTML = s.join("")
        })
    }

    function a() {
        return "ad_dyna_" + u++
    }
    var e = QadAdUnits.$E;
    QNR.AD.createCallback("ifrHelperAd", n("ifrHelperAd"));
    QNR.AD.createCallback("ifrCataAd", n("ifrCataAd"));
    QadAdUnits.create_text_call("ifmRightTextlink", function(e) {
        if (e > 0) {
            r()
        }
    });
    QNR.AD.createCallback("listBottomAD", function(e, t) {
        i("listBottomAD", e, t)
    });
    QNR.AD.createCallback("ifrNTOPAD", function(e, t) {
        i("ifrNTOPAD", e, t)
    });
    QNR.AD.createCallback("topicLinkL", function(e, t) {
        s("topicLinkL", e, t)
    });
    QNR.AD.createCallback("topicLinkR", function(e, t) {
        s("topicLinkR", e, t)
    });
    o("ifmRightFlightOwner", "js_rightFlightOwnerBanner");
    o("ifmRightFlightExt", "js_rightFlightExtBanner");
    o("ifmRightHotelInter", "js_rightHotelInter");
    o("ifmOwnFlightRightBottom", "js_ownFlightRightBottom");
    var u = 0;
    AD_Manage.createFlightAD = function(e) {
        var t = QNR.AD.create_div_container(e);
        var n = /inter/.test(location.pathname) ? "QNR_ZDM%3D_CN" : "QNR_YjM%3D_CN";
        var r = QadAdUnits.$E(e);
        e = a();
        var s = e + "_qad",
            o = e + "_qde";
        var u = '<span style="display:none;" data-query="vataposition=' + n + '&tag=0&rows=3&cur_page_num=0&rep=1&f=s" data-type="qad" data-style="width:100%;" id="' + s + '"></span>' + '<div><span style="display:none;" data-style="width:100%;" data-type="qde" data-query="" id="' + o + '"></span></div>';
        t.innerHTML = u;
        var f = AD_Manage.isDebug();
        QNR.AD.createQdeCallback(o, function(e) {
            if (!e || f) {
                QNR.AD.loadOneAD(s)
            }
        });
        QNR.AD.createCallback(s, function(e, t) {
            i(s, e, t)
        });
        var l = r.getAttribute("querystring");
        QadAdUnits.$E(o).setAttribute("data-query", l);
        QNR.AD.__cur_qde_ad = o;
        QNR.AD.loadOneAD(o)
    }
})();
(function() {
    function e(e) {
        return ~location.search.indexOf(e)
    }

    function t(t) {
        function i() {
            r--;
            if (r === 0) t(n)
        }
        var n = {};
        n.type = e("debug=type=open") ? 1 : 0;
        n.debug = e("adtest=beta");
        n.blank_html = "http://www.qunar.com/vataframe/b.html?_=20120830";
        n.qde_plus = "";
        n.qad_plus = "";
        var r = 1;
        if (AD_Manage.qad_query) r++;
        if (AD_Manage.qde_query) r++;
        if (AD_Manage.ip_query) r++;
        if (AD_Manage.qad_query) {
            AD_Manage.qad_query(function(e) {
                if (e) {
                    n.qad_plus = "&" + e.replace(/^&/, "")
                }
                i()
            })
        }
        if (AD_Manage.qde_query) {
            AD_Manage.qde_query(function(e) {
                if (e) {
                    n.qde_plus = "&" + e.replace(/^&/, "")
                }
                i()
            })
        }
        if (AD_Manage.ip_query) {
            AD_Manage.ip_query(function(e) {
                if (e) n.ip = encodeURIComponent(e);
                i()
            })
        }
        i()
    }
    AD_Manage.load = function() {
        t(function(t) {
            if (e("debug=charge=true")) {
                t.qde_plus += "&cm=charged"
            }
            setTimeout(function() {
                QNR.AD.init(t)
            }, 10)
        })
    }
})();
var LazyScrollShow = function() {
    function r() {
        var e = window.document,
            t = e.documentElement["clientHeight"];
        return $jex.boxModel() && t || e.body && e.body["clientHeight"] || t
    }

    function i() {
        var e = window,
            t = "pageYOffset",
            n = "scrollTop";
        return t in e ? e[t] : $jex.boxModel() && e.document.documentElement[n] || e.document.body[n]
    }

    function o() {
        var n = 0;
        try {
            $jex.foreach(e, function(r, i) {
                if (!r) return;
                var o = $jex.offset(r);
                if (t.stop + t.height > o.top - 50) {
                    e[i] = null;
                    s[r.id]()
                } else {
                    n++
                }
            });
            if (n == 0) {
                e = null;
                p()
            }
        } catch (r) {}
    }

    function u(e) {
        var t, n = 0;
        return function() {
            clearTimeout(t);
            var r = (new Date).valueOf();
            if (r - n > 100) e();
            n = r;
            t = setTimeout(e, 100)
        }
    }

    function l(e, t, n) {
        if (e.addEventListener) {
            e.addEventListener(t, n, false)
        } else if (e.attachEvent) {
            e.attachEvent("on" + t, n)
        } else {
            var r = e["on" + t];
            if (r) {
                e["on" + t] = function() {
                    r();
                    n()
                }
            }
        }
    }

    function c(e, t, n) {
        if (e.removeEventListener) {
            e.removeEventListener(t, n, false)
        } else if (e.detachEvent) {
            e.detachEvent("on" + t, n)
        } else {
            if (e["on" + t] === n) e["on" + t] = null
        }
    }

    function h() {
        l(window, "scroll", f);
        l(window, "scroll", m);
        l(window, "resize", a)
    }

    function p() {
        c(window, "scroll", f);
        c(window, "resize", a)
    }

    function d() {
        $jex.foreach(["dFlightPanel", "hdivTrendFlash"], function(e) {
            var t = $jex.$(e);
            t && $jex.element.show(t)
        });
        $jex.foreach(["hotelSearch", "frmTuan"], function(e) {
            var t = $jex.$(e);
            t && $jex.element.show(t.parentNode)
        })
    }

    function v() {
        d();
        setTimeout(function() {
            $jex.foreach(n, function(t) {
                var n = $jex.$(t);
                if (n) e.push(n)
            });
            if (e.length > 0) {
                t = {
                    stop: i(),
                    height: r()
                };
                h();
                o()
            }
        }, 100)
    }

    function m() {
        var e = location.pathname.indexOf("oneway_list.htm") > 0 ? "onewayList" : "roundtripList";
        if (i() + r() >= document.body.offsetHeight && !$jex.logHelp.isLogedPageBottom) {
            $jex.log({
                s: "flight",
                p: e,
                r: "pageBottom"
            });
            $jex.logHelp.isLogedPageBottom = true;
            c(window, "scroll", m)
        }
    }
    var e = [],
        t;
    var n = ["dTrendflashPanel", "hotelSearch", "frmTuan"];
    var s = {
        hotelSearch: function() {
            var e = window.location.param();
            var t = e.searchDepartureTime;
            var n = $jex.date.add(t, 2);
            var r = "http://hotel.qunar.com/render/hotelHotflight.htm?new=1&city=" + encodeURIComponent(e.searchArrivalAirport) + "&fromDate=" + t + "&toDate=" + n + "&frmid=hotelSearch&from=oneway";
            QNR.AD.createAdFrame("hotelSearch", r)
        },
        frmTuan: function() {
            QNR.AD.loadOneAD("frmTuan")
        },
        dTrendflashPanel: function() {
            setTimeout(function() {
                Trendflash && Trendflash.init()
            }, 100)
        }
    };
    var a = u(function() {
        t.height = r();
        o()
    });
    var f = u(function() {
        t.stop = i();
        o()
    });
    return {
        addShow: function(e, t) {
            s[e] = t
        },
        addDoms: function(e) {
            for (var t = 0, r = n.length; t < r; t++) {
                if (n[t] === e) return
            }
            n[t] = e
        },
        start: function() {
            setTimeout(v, 100)
        }
    }
}();
var SearchBtn_track = function() {
    var e = [];
    var t = false;
    var n = function() {
        e = [];
        var t = $(".ch_search_tab .cur");
        var n = t.find("a").text();
        if (n.indexOf("国际") === 0) {
            n = "international"
        }
        if (n.indexOf("国内") === 0) {
            n = "domestic"
        }
        if (n.indexOf("特价") === 0) {
            n = "tejia"
        }
        var r = $(".crl_group");
        var i = $(".crl_group input:checked").map(function(e, t) {
            return t.value
        });
        var s = {
            subject: n,
            flightType: i[0],
            fromCity: r.find("input[name='fromCity']")[0].value,
            toCity: r.find("input[name='toCity']")[0].value,
            fromDate: r.find("input[name='fromDate']")[0].value,
            toDate: r.find("input[name='toDate']")[0].value
        };
        var o = {
            subject: n,
            flightType: i[1],
            fromCity: r.find("input[name='fromCity']")[1].value,
            toCity: r.find("input[name='toCity']")[1].value,
            fromDate: r.find("input[name='fromDate']")[1].value,
            toDate: r.find("input[name='toDate']")[1].value
        };
        var u = {
            subject: n,
            flightType: i[2],
            fromCity: r.find("input[name='fromCity']")[2].value,
            toCity: r.find("input[name='toCity']")[2].value,
            fromDate: r.find("input[name='fromDate']")[2].value
        };
        e.push(s, o, u)
    };
    var r = function(e) {
        if (!t) {
            var n = "/site/track.htm?action=Qhome|search_BtnFlag|" + e + "|&t=" + Date.parse(new Date);
            (new Image).src = n;
            t = true
        }
    };
    var i = function(e, t) {
        for (var n = 0; n < e.length; n++) t(e[n])
    };
    var s = function(e, t) {
        var n = [];
        i(t, function(t) {
            n.push(e(t))
        });
        return n
    };
    var o = function(e) {
        var t = $(".more-line");
        if (e.flightType === "OnewayFlight") {
            delete e.toDate
        }
        if (e.flightType === "MultiTripFlight") {
            e.fromCity = s(function(e, t) {
                if (!e.value) return "noArea";
                return e.value
            }, $.makeArray(t.find("input[name='fromCityMulti']"))).join(",");
            e.toCity = s(function(e, t) {
                if (!e.value) return "noArea";
                return e.value
            }, $.makeArray(t.find("input[name='toCityMulti']"))).join(",");
            e.fromDate = s(function(e, t) {
                if (!e.value) return "noArea";
                return e.value
            }, $.makeArray(t.find("input[name='fromDateMulti']"))).join(",");
            delete e.toDate
        }
    };
    var u = function() {
        n();
        var t = $(".ch_search_tab .cur");
        var i = e[t.index()];
        o(i);
        var s = $.map(i, function(e) {
            return encodeURIComponent(e)
        }).join("|");
        r(s)
    };
    var a = function(e) {
        r(e)
    };
    return u
}();
var searchTrack = function(e) {
    function s() {
        this.onlyOne = false;
        this.config = {
            TJ: {
                type: "特价机票"
            },
            DMT: {
                type: "国内机票"
            },
            INT: {
                type: "international"
            }
        }
    }
    var t, n, r;
    var i = function(e) {
        var t = "/site/track.htm?action=" + window._ba_utm_s + "|" + e + "|&t=" + Date.parse(new Date);
        (new Image).src = t
    };
    e.extend(s.prototype, {
        init: function(e, t, n) {
            var r = this;
            var i = this.config[e];
            i.flt = t;
            if (n) {
                i.mult = n
            }
            this.DMT = this.config["DMT"].flt;
            this.INT = this.config["INT"].flt;
            this.MULT = this.config["INT"].mult;
            this.TJ = this.config["TJ"].flt;
            this.fltType = i;
            this._bindEvents();
            window.searTrack = this
        },
        triggerMult: function(t, n, r) {
            if (t.mults) {
                this._type = t._type;
                e(this).trigger(n, r)
            }
        },
        _updateTime: function(t) {
            var n = this;
            var r = t.activeEl.closest("form");
            var i = r;
            if (r.find("[name='searchType']").val() == "MultiTripFlight") {
                i = t.activeEl.closest(".muti_control")
            }
            var s = i.find("input[name*=fromCity]").val();
            if (!s) {
                s = ""
            }
            if (window.QNR) {
                var o = s.indexOf("(");
                if (o === -1) {
                    o = s.length
                }
                e.ajax({
                    url: "http://flight.qunar.com/twelli/flight/localDate.jsp",
                    data: {
                        depCity: decodeURI(s.substr(0, o))
                    },
                    dataType: "jsonp",
                    success: function(e) {
                        if (!window.QNR) {
                            window.QNR = {}
                        }
                        window.QNR.isLocal = e.isLocal;
                        var t = e.localDate.replace(/-/g, "/");
                        GSERVER_TIME = new Date(t);
                        if (e.isLocal) {
                            n.fltType.flt.$fromDate.data("q-datepicker-fly").args.minDate = GSERVER_TIME
                        }
                    }
                })
            }
        },
        triggerNoData: function() {
            i("noDatalook")
        },
        _getCurType: function() {
            var t = e(".ch_search_tab .cur");
            var n = t.find("a").text();
            if (n.indexOf("国际") === 0) {
                n = "international"
            }
            if (n.indexOf("国内") === 0) {
                n = "domestic"
            }
            if (n.indexOf("特价") === 0) {
                n = "tejia"
            }
            return n
        },
        _bindEvents: function() {
            this._bindFocusEvent();
            this._bindHomeClickBtn();
            this._bindhotCity();
            this._bindSelectSuggest();
            this._bindnoResult();
            this._bindHaveResult()
        },
        _bindHaveResult: function() {
            var s = this;
            var o = function(e, r) {
                var o = r[1];
                var u = r[3];
                s.noflag = false;
                i(r.join("|") + "|" + n);
                if (o !== t && !s.onlyOne) {
                    i("addItem_flag|" + u + "|" + n);
                    s.onlyOne = true
                }
            };
            var u = function(e, t) {
                r = t;
                s.notfind = true
            };
            e.each(this.config, function(t, n) {
                n.flt && e(n.flt.fromCitySuggest).bind("getResultData", o);
                n.flt && e(n.flt.toCitySuggest).bind("getResultData", o)
            });
            e(this).bind("getResultData", o);
            this.MULT && e(this.MULT.fromCitySuggest).bind("getResultData", o);
            this.MULT && e(this.MULT.toCitySuggest).bind("getResultData", o);
            e(this).bind("haveData", u)
        },
        _bindnoResult: function() {
            var t = this;
            var s = function(e, s) {
                if (!t.noflag && !t.notfind) {
                    var o = "suggest-nofind-noData|" + encodeURIComponent(s) + "|" + t._type + "|" + n;
                    i(o);
                    t.noflag = true;
                    t.notfind = false
                }
                if (!t.noflag && t.notfind) {
                    var o = "suggest-nofind|" + encodeURIComponent(s) + "|" + r + "|" + t._type + "|" + n;
                    i(o);
                    t.noflag = true
                }
            };
            e.each(this.config, function(t, n) {
                n.flt && e(n.flt.fromCitySuggest).bind("suggest-nofind", s);
                n.flt && e(n.flt.toCitySuggest).bind("suggest-nofind", s)
            });
            this.MULT && e(this.MULT.fromCitySuggest).bind("suggest-nofind", s);
            this.MULT && e(this.MULT.toCitySuggest).bind("suggest-nofind", s);
            e(this).bind("suggest-nofind", s)
        },
        _bindSelectSuggest: function() {
            var t = this;
            var r = function(e, r) {
                if (!t.sflag) {
                    var s = "suggest-selected|" + r + "|" + t._type + "|" + n;
                    i(s);
                    t.sflag = true
                }
            };
            e(this).bind("suggest-selected", r);
            e.each(this.config, function(t, n) {
                n.flt && e(n.flt.fromCitySuggest).bind("suggest-selected", r);
                n.flt && e(n.flt.toCitySuggest).bind("suggest-selected", r)
            });
            this.MULT && e(this.MULT.fromCitySuggest).bind("suggest-selected", r);
            this.MULT && e(this.MULT.toCitySuggest).bind("suggest-selected", r)
        },
        _bindFocusEvent: function() {
            var s = this;
            n = s.fltType.type;
            var o = function() {
                s.sflag = false;
                n = s.fltType.type;
                if (this.value !== t && this.value === "" && !s.deleteONE) {
                    i("deleteItem_flag|" + this.name + "|" + n);
                    s.deleteONE = true
                }
                if (this.value !== t && !s.onlyOne && !s.deleteONE) {
                    i("addItem_flag|" + this.name + "|" + n);
                    s.onlyOne = true
                }
            };
            var u = function() {
                s.onlyOne = false;
                s.deleteONE = false;
                s.noflag = false;
                s.outflag = false;
                s.notfind = false;
                s._type = this.name;
                t = this.value;
                e(this).keyup(o)
            };
            var a = function() {
                var e = this.name;
                var t = this;
                if (!s.outflag && s.noflag && !s.sflag) {
                    n = s.fltType.type;
                    var o = "suggest-nofind|" + encodeURIComponent(this.value) + "|" + r + "|" + this.name + "|" + n;
                    s.outflag = true;
                    i(o)
                }
            };
            e.each(this.config, function(t, n) {
                n.flt && e(n.flt["$fromCity"]).focus(u);
                n.flt && e(n.flt["$toCity"]).focus(u);
                n.flt && e(n.flt["$fromCity"]).focusout(a);
                n.flt && e(n.flt["$toCity"]).focusout(a)
            });
            this.MULT && e(this.MULT.$form.find('input[name="fromCityMulti"]')).focus(u);
            this.MULT && e(this.MULT.$form.find('input[name="toCityMulti"]')).focus(u);
            this.MULT && e(this.MULT.$form.find('input[name="fromCityMulti"]')).focusout(a);
            this.MULT && e(this.MULT.$form.find('input[name="toCityMulti"]')).focusout(a)
        },
        _bindHomeClickBtn: function() {
            var t = this;
            e.each(this.config, function(n, r) {
                e(r.flt).bind("select_btn", function() {
                    if (!t.onlyOne) {
                        t.onlyOne = true
                    }
                })
            })
        },
        _bindhotCity: function() {
            var t = this;
            e.each(this.config, function(t, n) {
                e(n.flt).bind("no_exhitbit", function(e, t) {
                    i("no_exhitbit|" + t)
                })
            });
            e(this.MULT).bind("no_exhitbit", function(e, t) {
                i("no_exhitbit|" + t)
            })
        }
    });
    return new s
}(jQuery);
(function(e) {
    function n(t) {
        var n = {};
        e("[data-tab]", t).each(function() {
            var i = e(this);
            var s = i.data("tab");
            if (!n[s]) {
                r(t, s, i.data("tab-id"), i.data("tab-active"));
                n[s] = true
            }
        })
    }

    function r(t, n, r, i) {
        if (!n || !r) return;
        var s = i || "active";
        var o = t.find("[data-tab='" + n + "'][data-tab-id='" + r + "']");
        var u = t.find("[data-panel='" + n + "'][data-panel-id='" + r + "']");
        if (o.hasClass(s) && u.is(":visible")) return;
        var a;
        (a = t.find("[data-tab='" + n + "']")).removeClass(s);
        o.addClass(s);
        t.find("[data-panel='" + n + "']").hide().removeClass("js-transition-after js-transition-before");
        u.addClass("js-transition-before");
        u.show();
        setTimeout(function() {
            u.addClass("js-transition-after")
        }, 20);
        var f = t.find("[data-tab='" + n + "'][data-tab-id='" + r + "']:radio");
        if (f.length) {
            f.attr("checked", "checked")
        }
        e.tabs[n] = r;
        e(e.tabs).trigger(n + "-change", [r, o, u, a])
    }
    e.tabs = {};
    var t = e(document.body);
    e.tabs.changeTab = r;
    e.tabs.init = function(i, s) {
        var o = i || t;
        var s = s || "click";
        n(o);
        o.delegate("[data-tab]", s, function(t) {
            var n = e(this).data("tab");
            var i = e(this).data("tab-id");
            var s = e(this).data("tab-active");
            r(o, n, i, s);
            t.stopPropagation()
        })
    }
})(jQuery);
var FlightSearchBoxConf = {
    hotCity: {
        domesticfromtj: [{
            title: "国内热门",
            key: "domesticfrom"
        }, {
            title: "ABCDE",
            key: "ABCDE"
        }, {
            title: "FGHJ",
            key: "FGHJ"
        }, {
            title: "KLMNP",
            key: "KLMNP"
        }, {
            title: "QRSTW",
            key: "QRSTW"
        }, {
            title: "XYZ",
            key: "XYZ"
        }, {
            title: "国际·港澳台",
            key: "特价国际"
        }],
        domesticfrom: [{
            title: "国内热门",
            key: "domesticfrom"
        }, {
            title: "ABCDE",
            key: "ABCDE"
        }, {
            title: "FGHJ",
            key: "FGHJ"
        }, {
            title: "KLMNP",
            key: "KLMNP"
        }, {
            title: "QRSTW",
            key: "QRSTW"
        }, {
            title: "XYZ",
            key: "XYZ"
        }, {
            title: "国际·港澳台",
            key: "国际·港澳台"
        }],
        "domesticto-tj": [{
            title: "国内热门",
            key: "domesticfrom"
        }, {
            title: "ABCDE",
            key: "ABCDE"
        }, {
            title: "FGHJ",
            key: "FGHJ"
        }, {
            title: "KLMNP",
            key: "KLMNP"
        }, {
            title: "QRSTW",
            key: "QRSTW"
        }, {
            title: "XYZ",
            key: "XYZ"
        }, {
            title: "国际·港澳台",
            key: "特价国际"
        }],
        domesticto: [{
            title: "国内热门",
            key: "domesticto"
        }, {
            title: "ABCDE",
            key: "ABCDE"
        }, {
            title: "FGHJ",
            key: "FGHJ"
        }, {
            title: "KLMNP",
            key: "KLMNP"
        }, {
            title: "QRSTW",
            key: "QRSTW"
        }, {
            title: "XYZ",
            key: "XYZ"
        }, {
            title: "国际·港澳台",
            key: "国际·港澳台"
        }],
        interfrom: [{
            title: "国内热门",
            key: "domesticfrom"
        }, {
            title: "ABCDE",
            key: "ABCDE"
        }, {
            title: "FGHJ",
            key: "FGHJ"
        }, {
            title: "KLMNP",
            key: "KLMNP"
        }, {
            title: "QRSTW",
            key: "QRSTW"
        }, {
            title: "XYZ",
            key: "XYZ"
        }, {
            title: "国际·港澳台",
            key: "国际·港澳台"
        }],
        interto: [{
            title: "国际·港澳台",
            key: "国际·港澳台-to"
        }, {
            title: "亚洲/大洋洲",
            key: "亚洲/大洋洲"
        }, {
            title: "美洲",
            key: "美洲"
        }, {
            title: "欧洲",
            key: "欧洲"
        }, {
            title: "非洲",
            key: "非洲"
        }, {
            title: "国内热门",
            key: "domesticto"
        }],
        "interfrom-tj": [{
            title: "国内热门",
            key: "domesticfrom"
        }, {
            title: "ABCDE",
            key: "ABCDE"
        }, {
            title: "FGHJ",
            key: "FGHJ"
        }, {
            title: "KLMNP",
            key: "KLMNP"
        }, {
            title: "QRSTW",
            key: "QRSTW"
        }, {
            title: "XYZ",
            key: "XYZ"
        }, {
            title: "国际·港澳台",
            key: "特价国际"
        }],
        "interto-tj": [{
            title: "国际·港澳台",
            key: "特价国际"
        }, {
            title: "亚洲/大洋洲",
            key: "m亚洲/大洋洲"
        }, {
            title: "美洲",
            key: "m美洲"
        }, {
            title: "欧洲",
            key: "m欧洲"
        }, {
            title: "非洲",
            key: "m非洲"
        }, {
            title: "国内热门",
            key: "domesticfrom"
        }],
        multifrom: [{
            title: "国内热门",
            key: "domesticfrom"
        }, {
            title: "ABCDE",
            key: "ABCDE"
        }, {
            title: "FGHJ",
            key: "FGHJ"
        }, {
            title: "KLMNP",
            key: "KLMNP"
        }, {
            title: "QRSTW",
            key: "QRSTW"
        }, {
            title: "XYZ",
            key: "XYZ"
        }, {
            title: "国际·港澳台",
            key: "特价国际"
        }],
        multito: [{
            title: "国际·港澳台",
            key: "特价国际"
        }, {
            title: "亚洲/大洋洲",
            key: "m亚洲/大洋洲"
        }, {
            title: "美洲",
            key: "m美洲"
        }, {
            title: "欧洲",
            key: "m欧洲"
        }, {
            title: "非洲",
            key: "m非洲"
        }, {
            title: "国内",
            key: "domesticfrom"
        }],
        data: {
            domesticfrom: {
                charSort: true,
                cityList: [{
                    "char": "城市",
                    clshct: true,
                    list: [{
                        name: "上海",
                        country: "中国",
                        code: "SHA"
                    }, {
                        name: "北京",
                        country: "中国",
                        code: "BJS"
                    }, {
                        name: "广州",
                        country: "中国",
                        code: "CAN"
                    }, {
                        name: "昆明",
                        country: "中国",
                        code: "KMG"
                    }, {
                        name: "深圳",
                        country: "中国",
                        code: "SZX"
                    }, {
                        name: "成都",
                        country: "中国",
                        code: "CTU"
                    }, {
                        name: "杭州",
                        country: "中国",
                        code: "HGH"
                    }, {
                        name: "厦门",
                        country: "中国",
                        code: "XMN"
                    }, {
                        name: "天津",
                        country: "中国",
                        code: "TSN"
                    }, {
                        name: "青岛",
                        country: "中国",
                        code: "TAO"
                    }, {
                        name: "重庆",
                        country: "中国",
                        code: "CKG"
                    }, {
                        name: "南京",
                        country: "中国",
                        code: "NKG"
                    }, {
                        name: "沈阳",
                        country: "中国",
                        code: "SHE"
                    }, {
                        name: "西安",
                        country: "中国",
                        code: "SIA"
                    }, {
                        name: "福州",
                        country: "中国",
                        code: "FOC"
                    }, {
                        name: "武汉",
                        country: "中国",
                        code: "WUH"
                    }, {
                        name: "大连",
                        country: "中国",
                        code: "DLC"
                    }, {
                        name: "宁波",
                        country: "中国",
                        code: "NGB"
                    }, {
                        name: "长沙",
                        country: "中国",
                        code: "CSX"
                    }, {
                        name: "海口",
                        country: "中国",
                        code: "HAK"
                    }, {
                        name: "郑州",
                        country: "中国",
                        code: "CGO"
                    }, {
                        name: "南宁",
                        country: "中国",
                        code: "NNG"
                    }, {
                        name: "长春",
                        country: "中国",
                        code: "CGQ"
                    }, {
                        name: "济南",
                        country: "中国",
                        code: "TNA"
                    }, {
                        name: "温州",
                        country: "中国",
                        code: "WNZ"
                    }, {
                        name: "哈尔滨",
                        country: "中国",
                        code: "HRB"
                    }, {
                        name: "乌鲁木齐",
                        country: "中国",
                        code: "URC"
                    }, {
                        name: "晋江",
                        country: "中国",
                        code: "JJN"
                    }, {
                        name: "延吉",
                        country: "中国",
                        code: "YNJ"
                    }, {
                        name: "贵阳",
                        country: "中国",
                        code: "KWE"
                    }]
                }],
                title: "热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            domesticto: {
                charSort: true,
                cityList: [{
                    "char": "城市",
                    clshct: true,
                    list: [{
                        name: "上海",
                        country: "中国",
                        code: "SHA"
                    }, {
                        name: "北京",
                        country: "中国",
                        code: "BJS"
                    }, {
                        name: "广州",
                        country: "中国",
                        code: "CAN"
                    }, {
                        name: "昆明",
                        country: "中国",
                        code: "KMG"
                    }, {
                        name: "西安",
                        country: "中国",
                        code: "SIA"
                    }, {
                        name: "成都",
                        country: "中国",
                        code: "CTU"
                    }, {
                        name: "深圳",
                        country: "中国",
                        code: "SZX"
                    }, {
                        name: "厦门",
                        country: "中国",
                        code: "XMN"
                    }, {
                        name: "乌鲁木齐",
                        country: "中国",
                        code: "URC"
                    }, {
                        name: "南京",
                        country: "中国",
                        code: "NKG"
                    }, {
                        name: "重庆",
                        country: "中国",
                        code: "CKG"
                    }, {
                        name: "杭州",
                        country: "中国",
                        code: "HGH"
                    }, {
                        name: "大连",
                        country: "中国",
                        code: "DLC"
                    }, {
                        name: "长沙",
                        country: "中国",
                        code: "CSX"
                    }, {
                        name: "海口",
                        country: "中国",
                        code: "HAK"
                    }, {
                        name: "哈尔滨",
                        country: "中国",
                        code: "HRB"
                    }, {
                        name: "青岛",
                        country: "中国",
                        code: "TAO"
                    }, {
                        name: "沈阳",
                        country: "中国",
                        code: "SHE"
                    }, {
                        name: "三亚",
                        country: "中国",
                        code: "SYX"
                    }, {
                        name: "济南",
                        country: "中国",
                        code: "TNA"
                    }, {
                        name: "武汉",
                        country: "中国",
                        code: "WUH"
                    }, {
                        name: "郑州",
                        country: "中国",
                        code: "CGO"
                    }, {
                        name: "贵阳",
                        country: "中国",
                        code: "KWE"
                    }, {
                        name: "南宁",
                        country: "中国",
                        code: "NNG"
                    }, {
                        name: "福州",
                        country: "中国",
                        code: "FOC"
                    }, {
                        name: "天津",
                        country: "中国",
                        code: "TSN"
                    }, {
                        name: "长春",
                        country: "中国",
                        code: "CGO"
                    }, {
                        name: "太原",
                        country: "中国",
                        code: "TYN"
                    }, {
                        name: "南昌",
                        country: "中国",
                        code: "KHN"
                    }, {
                        name: "丽江",
                        country: "中国",
                        code: "LJG"
                    }]
                }],
                fuzzy: true,
                hotword: [{
                    "char": "热词",
                    clshct: true,
                    listfuzzy: [{
                        name: "华北",
                        country: "中国"
                    }, {
                        name: "华南",
                        country: "中国"
                    }, {
                        name: "东北",
                        country: "中国"
                    }, {
                        name: "华东",
                        country: "中国"
                    }, {
                        name: "华中",
                        country: "中国"
                    }, {
                        name: "西南",
                        country: "中国"
                    }, {
                        name: "西北",
                        country: "中国"
                    }]
                }],
                title: "热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            interfrom: {
                cityList: [{
                    name: "上海",
                    country: "中国",
                    code: "SHA"
                }, {
                    name: "北京",
                    country: "中国",
                    code: "BJS"
                }, {
                    name: "广州",
                    country: "中国",
                    code: "CAN"
                }, {
                    name: "昆明",
                    country: "中国",
                    code: "KMG"
                }, {
                    name: "西安",
                    country: "中国",
                    code: "SIA"
                }, {
                    name: "成都",
                    country: "中国",
                    code: "CTU"
                }, {
                    name: "深圳",
                    country: "中国",
                    code: "SZX"
                }, {
                    name: "厦门",
                    country: "中国",
                    code: "XMN"
                }, {
                    name: "乌鲁木齐",
                    country: "中国",
                    code: "URC"
                }, {
                    name: "南京",
                    country: "中国",
                    code: "NKG"
                }, {
                    name: "重庆",
                    country: "中国",
                    code: "CKG"
                }, {
                    name: "杭州",
                    country: "中国",
                    code: "HGH"
                }, {
                    name: "大连",
                    country: "中国",
                    code: "DLC"
                }, {
                    name: "长沙",
                    country: "中国",
                    code: "CSX"
                }, {
                    name: "海口",
                    country: "中国",
                    code: "HAK"
                }, {
                    name: "哈尔滨",
                    country: "中国",
                    code: "HRB"
                }, {
                    name: "青岛",
                    country: "中国",
                    code: "TAO"
                }, {
                    name: "沈阳",
                    country: "中国",
                    code: "SHE"
                }, {
                    name: "三亚",
                    country: "中国",
                    code: "SYX"
                }, {
                    name: "济南",
                    country: "中国",
                    code: "TNA"
                }, {
                    name: "武汉",
                    country: "中国",
                    code: "WUH"
                }, {
                    name: "郑州",
                    country: "中国",
                    code: "CGO"
                }, {
                    name: "贵阳",
                    country: "中国",
                    code: "KWE"
                }, {
                    name: "南宁",
                    country: "中国",
                    code: "NNG"
                }, {
                    name: "福州",
                    country: "中国",
                    code: "FOC"
                }, {
                    name: "天津",
                    country: "中国",
                    code: "TSN"
                }, {
                    name: "长春",
                    country: "中国",
                    code: "CGQ"
                }, {
                    name: "太原",
                    country: "中国",
                    code: "TYN"
                }, {
                    name: "南昌",
                    country: "中国",
                    code: "KHN"
                }, {
                    name: "丽江",
                    country: "中国",
                    code: "LJG"
                }],
                title: "热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            ABCDE: {
                charSort: true,
                cityList: [{
                    "char": "A",
                    list: [{
                        name: "阿里",
                        country: "中国",
                        code: "NGQ"
                    }, {
                        name: "阿尔山",
                        country: "中国",
                        code: "YIE"
                    }, {
                        name: "安庆",
                        country: "中国",
                        code: "AQG"
                    }, {
                        name: "阿勒泰",
                        country: "中国",
                        code: "AAT"
                    }, {
                        name: "安康",
                        country: "中国",
                        code: "AKA"
                    }, {
                        name: "鞍山",
                        country: "中国",
                        code: "AOG"
                    }, {
                        name: "安顺",
                        country: "中国",
                        code: "AVA"
                    }, {
                        name: "阿克苏",
                        country: "中国",
                        code: "AKU"
                    }, {
                        name: "阿拉善左旗",
                        country: "中国",
                        code: "AXF"
                    }, {
                        name: "阿拉善右旗",
                        country: "中国",
                        code: "RHT"
                    }]
                }, {
                    "char": "B",
                    list: [{
                        name: "包头",
                        country: "中国",
                        code: "BAV"
                    }, {
                        name: "北海",
                        country: "中国",
                        code: "BHY"
                    }, {
                        name: "北京",
                        country: "中国",
                        code: "BJS"
                    }, {
                        name: "百色",
                        country: "中国",
                        code: "AEB"
                    }, {
                        name: "保山",
                        country: "中国",
                        code: "BSD"
                    }, {
                        name: "博乐",
                        country: "中国",
                        code: "BPL"
                    }, {
                        name: "毕节",
                        country: "中国",
                        code: "BFJ"
                    }, {
                        name: "巴彦淖尔",
                        country: "中国",
                        code: "RLK"
                    }]
                }, {
                    "char": "C",
                    list: [{
                        name: "长治",
                        country: "中国",
                        code: "CSX"
                    }, {
                        name: "池州",
                        country: "中国",
                        code: "JUH"
                    }, {
                        name: "长春",
                        country: "中国",
                        code: "CGQ"
                    }, {
                        name: "常州",
                        country: "中国",
                        code: "CZX"
                    }, {
                        name: "昌都",
                        country: "中国",
                        code: "BPX"
                    }, {
                        name: "朝阳",
                        country: "中国",
                        code: "CHG"
                    }, {
                        name: "常德",
                        country: "中国",
                        code: "CGD"
                    }, {
                        name: "长白山",
                        country: "中国",
                        code: "NBS"
                    }, {
                        name: "成都",
                        country: "中国",
                        code: "CTU"
                    }, {
                        name: "重庆",
                        country: "中国",
                        code: "CKG"
                    }, {
                        name: "长沙",
                        country: "中国",
                        code: "CSX"
                    }, {
                        name: "赤峰",
                        country: "中国",
                        code: "CIF"
                    }]
                }, {
                    "char": "D",
                    list: [{
                        name: "大同",
                        country: "中国",
                        code: "DAT"
                    }, {
                        name: "大连",
                        country: "中国",
                        code: "DLC"
                    }, {
                        name: "东营",
                        country: "中国",
                        code: "DOY"
                    }, {
                        name: "大庆",
                        country: "中国",
                        code: "DQA"
                    }, {
                        name: "丹东",
                        country: "中国",
                        code: "DDG"
                    }, {
                        name: "大理",
                        country: "中国",
                        code: "DLU"
                    }, {
                        name: "敦煌",
                        country: "中国",
                        code: "DNH"
                    }, {
                        name: "达州",
                        country: "中国",
                        code: "DAX"
                    }, {
                        name: "稻城",
                        country: "中国",
                        code: "DCY"
                    }]
                }, {
                    "char": "E",
                    list: [{
                        name: "恩施",
                        country: "中国",
                        code: "ENH"
                    }, {
                        name: "鄂尔多斯",
                        country: "中国",
                        code: "DSN"
                    }, {
                        name: "二连浩特",
                        country: "中国",
                        code: "ERL"
                    }, {
                        name: "额济纳旗",
                        country: "中国",
                        code: "EJN"
                    }]
                }],
                title: "拼音A-E城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            FGHJ: {
                charSort: true,
                cityList: [{
                    "char": "F",
                    list: [{
                        name: "佛山",
                        country: "中国",
                        code: "FUO"
                    }, {
                        name: "福州",
                        country: "中国",
                        code: "FOC"
                    }, {
                        name: "阜阳",
                        country: "中国",
                        code: "FUG"
                    }, {
                        name: "抚远",
                        country: "中国",
                        code: "FYJ"
                    }]
                }, {
                    "char": "G",
                    list: [{
                        name: "贵阳",
                        country: "中国",
                        code: "KWE"
                    }, {
                        name: "桂林",
                        country: "中国",
                        code: "KWL"
                    }, {
                        name: "广州",
                        country: "中国",
                        code: "CAN"
                    }, {
                        name: "广元",
                        country: "中国",
                        code: "GYS"
                    }, {
                        name: "格尔木",
                        country: "中国",
                        code: "GOQ"
                    }, {
                        name: "赣州",
                        country: "中国",
                        code: "KOW"
                    }, {
                        name: "固原",
                        country: "中国",
                        code: "GYU"
                    }]
                }, {
                    "char": "H",
                    list: [{
                        name: "哈密",
                        country: "中国",
                        code: "HMI"
                    }, {
                        name: "呼和浩特",
                        country: "中国",
                        code: "HET"
                    }, {
                        name: "黑河",
                        country: "中国",
                        code: "HEK"
                    }, {
                        name: "海拉尔",
                        country: "中国",
                        code: "HLD"
                    }, {
                        name: "哈尔滨",
                        country: "中国",
                        code: "HRB"
                    }, {
                        name: "海口",
                        country: "中国",
                        code: "HAK"
                    }, {
                        name: "黄山",
                        country: "中国",
                        code: "TXN"
                    }, {
                        name: "杭州",
                        country: "中国",
                        code: "HGH"
                    }, {
                        name: "邯郸",
                        country: "中国",
                        code: "HDG"
                    }, {
                        name: "合肥",
                        country: "中国",
                        code: "HFE"
                    }, {
                        name: "黄龙",
                        country: "中国",
                        code: "JZH"
                    }, {
                        name: "汉中",
                        country: "中国",
                        code: "HZG"
                    }, {
                        name: "和田",
                        country: "中国",
                        code: "HTN"
                    }, {
                        name: "淮安",
                        country: "中国",
                        code: "HIA"
                    }]
                }, {
                    "char": "J",
                    list: [{
                        name: "鸡西",
                        country: "中国",
                        code: "JXA"
                    }, {
                        name: "晋江",
                        country: "中国",
                        code: "JJN"
                    }, {
                        name: "锦州",
                        country: "中国",
                        code: "JNZ"
                    }, {
                        name: "景德镇",
                        country: "中国",
                        code: "JDZ"
                    }, {
                        name: "嘉峪关",
                        country: "中国",
                        code: "JGN"
                    }, {
                        name: "井冈山",
                        country: "中国",
                        code: "JGS"
                    }, {
                        name: "济宁",
                        country: "中国",
                        code: "JNG"
                    }, {
                        name: "九江",
                        country: "中国",
                        code: "JIU"
                    }, {
                        name: "佳木斯",
                        country: "中国",
                        code: "JMU"
                    }, {
                        name: "济南",
                        country: "中国",
                        code: "TNA"
                    }, {
                        name: "加格达奇",
                        country: "中国",
                        code: "JGD"
                    }, {
                        name: "金昌",
                        country: "中国",
                        code: "JIC"
                    }, {
                        name: "揭阳",
                        country: "中国",
                        code: "SWA"
                    }]
                }],
                title: "拼音F-J城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            KLMNP: {
                charSort: true,
                cityList: [{
                    "char": "K",
                    list: [{
                        name: "喀什",
                        country: "中国",
                        code: "KHG"
                    }, {
                        name: "昆明",
                        country: "中国",
                        code: "KMG"
                    }, {
                        name: "康定",
                        country: "中国",
                        code: "KGT"
                    }, {
                        name: "克拉玛依",
                        country: "中国",
                        code: "KRY"
                    }, {
                        name: "库尔勒",
                        country: "中国",
                        code: "KRL"
                    }, {
                        name: "库车",
                        country: "中国",
                        code: "KCA"
                    }, {
                        name: "喀纳斯",
                        country: "中国",
                        code: "KJI"
                    }, {
                        name: "凯里",
                        country: "中国",
                        code: "KJH"
                    }]
                }, {
                    "char": "L",
                    list: [{
                        name: "兰州",
                        country: "中国",
                        code: "LHW"
                    }, {
                        name: "洛阳",
                        country: "中国",
                        code: "LYA"
                    }, {
                        name: "丽江",
                        country: "中国",
                        code: "LJG"
                    }, {
                        name: "荔波",
                        country: "中国",
                        code: "LLB"
                    }, {
                        name: "林芝",
                        country: "中国",
                        code: "LZY"
                    }, {
                        name: "柳州",
                        country: "中国",
                        code: "LZH"
                    }, {
                        name: "泸州",
                        country: "中国",
                        code: "LZO"
                    }, {
                        name: "连云港",
                        country: "中国",
                        code: "LYG"
                    }, {
                        name: "黎平",
                        country: "中国",
                        code: "HZH"
                    }, {
                        name: "连城",
                        country: "中国",
                        code: "LCX"
                    }, {
                        name: "拉萨",
                        country: "中国",
                        code: "LXA"
                    }, {
                        name: "临沧",
                        country: "中国",
                        code: "LNJ"
                    }, {
                        name: "临沂",
                        country: "中国",
                        code: "LYI"
                    }, {
                        name: "吕梁",
                        country: "中国",
                        code: "LLV"
                    }]
                }, {
                    "char": "M",
                    list: [{
                        name: "芒市",
                        country: "中国",
                        code: "LUM"
                    }, {
                        name: "牡丹江",
                        country: "中国",
                        code: "MDG"
                    }, {
                        name: "满洲里",
                        country: "中国",
                        code: "NZH"
                    }, {
                        name: "绵阳",
                        country: "中国",
                        code: "MIG"
                    }, {
                        name: "梅县",
                        country: "中国",
                        code: "MXZ"
                    }, {
                        name: "漠河",
                        country: "中国",
                        code: "OHE"
                    }]
                }, {
                    "char": "N",
                    list: [{
                        name: "南京",
                        country: "中国",
                        code: "NKG"
                    }, {
                        name: "南充",
                        country: "中国",
                        code: "NAO"
                    }, {
                        name: "南宁",
                        country: "中国",
                        code: "NNG"
                    }, {
                        name: "南阳",
                        country: "中国",
                        code: "NNY"
                    }, {
                        name: "南通",
                        country: "中国",
                        code: "NTG"
                    }, {
                        name: "南昌",
                        country: "中国",
                        code: "KHN"
                    }, {
                        name: "那拉提",
                        country: "中国",
                        code: "NLT"
                    }, {
                        name: "宁波",
                        country: "中国",
                        code: "NGB"
                    }]
                }, {
                    "char": "P",
                    list: [{
                        name: "攀枝花",
                        country: "中国",
                        code: "PZI"
                    }, {
                        name: "普洱",
                        country: "中国",
                        code: "SYM"
                    }]
                }],
                title: "拼音K-P城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            QRSTW: {
                charSort: true,
                cityList: [{
                    "char": "Q",
                    list: [{
                        name: "衢州",
                        country: "中国",
                        code: "JUZ"
                    }, {
                        name: "黔江",
                        country: "中国",
                        code: "JIQ"
                    }, {
                        name: "秦皇岛",
                        country: "中国",
                        code: "SHP"
                    }, {
                        name: "庆阳",
                        country: "中国",
                        code: "IQN"
                    }, {
                        name: "且末",
                        country: "中国",
                        code: "IQM"
                    }, {
                        name: "齐齐哈尔",
                        country: "中国",
                        code: "NDG"
                    }, {
                        name: "青岛",
                        country: "中国",
                        code: "TAO"
                    }]
                }, {
                    "char": "R",
                    list: [{
                        name: "日喀则",
                        country: "中国",
                        code: "RKZ"
                    }]
                }, {
                    "char": "S",
                    list: [{
                        name: "深圳",
                        country: "中国",
                        code: "SZX"
                    }, {
                        name: "石家庄",
                        country: "中国",
                        code: "SJW"
                    }, {
                        name: "三亚",
                        country: "中国",
                        code: "SYX"
                    }, {
                        name: "沈阳",
                        country: "中国",
                        code: "SHE"
                    }, {
                        name: "上海",
                        country: "中国",
                        code: "SHA"
                    }, {
                        name: "神农架",
                        country: "中国",
                        code: "HPG"
                    }]
                }, {
                    "char": "T",
                    list: [{
                        name: "唐山",
                        country: "中国",
                        code: "TVS"
                    }, {
                        name: "铜仁",
                        country: "中国",
                        code: "TEN"
                    }, {
                        name: "塔城",
                        country: "中国",
                        code: "TCG"
                    }, {
                        name: "腾冲",
                        country: "中国",
                        code: "TCZ"
                    }, {
                        name: "台州",
                        country: "中国",
                        code: "HYN"
                    }, {
                        name: "天水",
                        country: "中国",
                        code: "THQ"
                    }, {
                        name: "天津",
                        country: "中国",
                        code: "TSN"
                    }, {
                        name: "通辽",
                        country: "中国",
                        code: "TGO"
                    }, {
                        name: "吐鲁番",
                        country: "中国",
                        code: "TLQ"
                    }, {
                        name: "太原",
                        country: "中国",
                        code: "TYN"
                    }]
                }, {
                    "char": "W",
                    list: [{
                        name: "威海",
                        country: "中国",
                        code: "WEH"
                    }, {
                        name: "武汉",
                        country: "中国",
                        code: "WUH"
                    }, {
                        name: "梧州",
                        country: "中国",
                        code: "WUZ"
                    }, {
                        name: "文山",
                        country: "中国",
                        code: "WNH"
                    }, {
                        name: "无锡",
                        country: "中国",
                        code: "WUX"
                    }, {
                        name: "潍坊",
                        country: "中国",
                        code: "WEF"
                    }, {
                        name: "武夷山",
                        country: "中国",
                        code: "WUS"
                    }, {
                        name: "乌兰浩特",
                        country: "中国",
                        code: "HLH"
                    }, {
                        name: "温州",
                        country: "中国",
                        code: "WNZ"
                    }, {
                        name: "乌鲁木齐",
                        country: "中国",
                        code: "URC"
                    }, {
                        name: "万州",
                        country: "中国",
                        code: "WXN"
                    }, {
                        name: "乌海",
                        country: "中国",
                        code: "WUA"
                    }]
                }],
                title: "拼音Q-W城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            XYZ: {
                charSort: true,
                cityList: [{
                    "char": "X",
                    list: [{
                        name: "兴义",
                        country: "中国",
                        code: "ACX"
                    }, {
                        name: "西昌",
                        country: "中国",
                        code: "XIC"
                    }, {
                        name: "厦门",
                        country: "中国",
                        code: "XMN"
                    }, {
                        name: "香格里拉",
                        country: "中国",
                        code: "DIG"
                    }, {
                        name: "西安",
                        country: "中国",
                        code: "SIA"
                    }, {
                        name: "西宁",
                        country: "中国",
                        code: "XNN"
                    }, {
                        name: "襄阳(中国)",
                        country: "中国",
                        code: "XFN"
                    }, {
                        name: "锡林浩特",
                        country: "中国",
                        code: "XIL"
                    }, {
                        name: "西双版纳",
                        country: "中国",
                        code: "JHG"
                    }, {
                        name: "徐州",
                        country: "中国",
                        code: "XUZ"
                    }]
                }, {
                    "char": "Y",
                    list: [{
                        name: "义乌",
                        country: "中国",
                        code: "YIW"
                    }, {
                        name: "永州",
                        country: "中国",
                        code: "LLF"
                    }, {
                        name: "榆林",
                        country: "中国",
                        code: "UYN"
                    }, {
                        name: "扬州",
                        country: "中国",
                        code: "YTY"
                    }, {
                        name: "延安",
                        country: "中国",
                        code: "ENY"
                    }, {
                        name: "运城",
                        country: "中国",
                        code: "YCU"
                    }, {
                        name: "烟台",
                        country: "中国",
                        code: "YNT"
                    }, {
                        name: "银川",
                        country: "中国",
                        code: "INC"
                    }, {
                        name: "宜昌",
                        country: "中国",
                        code: "YIH"
                    }, {
                        name: "宜宾",
                        country: "中国",
                        code: "YBP"
                    }, {
                        name: "宜春",
                        country: "中国",
                        code: "YIC"
                    }, {
                        name: "盐城",
                        country: "中国",
                        code: "YNZ"
                    }, {
                        name: "延吉",
                        country: "中国",
                        code: "YNJ"
                    }, {
                        name: "玉树",
                        country: "中国",
                        code: "YUS"
                    }, {
                        name: "伊宁",
                        country: "中国",
                        code: "YIN"
                    }, {
                        name: "伊春",
                        country: "中国",
                        code: "LDS"
                    }]
                }, {
                    "char": "Z",
                    list: [{
                        name: "珠海",
                        country: "中国",
                        code: "ZUH"
                    }, {
                        name: "昭通",
                        country: "中国",
                        code: "ZAT"
                    }, {
                        name: "张家界",
                        country: "中国",
                        code: "DYG"
                    }, {
                        name: "舟山",
                        country: "中国",
                        code: "HSN"
                    }, {
                        name: "郑州",
                        country: "中国",
                        code: "CGO"
                    }, {
                        name: "中卫",
                        country: "中国",
                        code: "ZHY"
                    }, {
                        name: "芷江",
                        country: "中国",
                        code: "HJJ"
                    }, {
                        name: "湛江",
                        country: "中国",
                        code: "ZHA"
                    }, {
                        name: "遵义",
                        country: "中国",
                        code: "ZYI"
                    }, {
                        name: "张掖",
                        country: "中国",
                        code: "YZY"
                    }, {
                        name: "张家口",
                        country: "中国",
                        code: "ZQZ"
                    }]
                }],
                title: "拼音X-Z城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            },
            "国际·港澳台": {
                charSort: true,
                cityList: [{
                    "char": "城市",
                    clshct: true,
                    list: [{
                        name: "香港",
                        country: "中国香港",
                        code: "HKG"
                    }, {
                        name: "曼谷",
                        country: "泰国",
                        code: "BKK"
                    }, {
                        name: "首尔",
                        country: "韩国",
                        code: "SEL"
                    }, {
                        name: "东京",
                        country: "日本",
                        code: "TYO"
                    }, {
                        name: "普吉",
                        country: "泰国",
                        code: "HKT"
                    }, {
                        name: "新加坡",
                        country: "新加坡",
                        code: "SIN"
                    }, {
                        name: "台北",
                        country: "中国台湾",
                        code: "TPE"
                    }, {
                        name: "清迈",
                        country: "泰国",
                        code: "CNX"
                    }, {
                        name: "吉隆坡",
                        country: "马来西亚",
                        code: "KUL"
                    }, {
                        name: "悉尼",
                        country: "澳大利亚",
                        code: "SYD"
                    }, {
                        name: "澳门",
                        country: "中国澳门",
                        code: "MFM"
                    }, {
                        name: "大阪",
                        country: "日本",
                        code: "OSA"
                    }, {
                        name: "伦敦",
                        country: "英国",
                        code: "LON"
                    }, {
                        name: "洛杉矶",
                        country: "美国",
                        code: "LAX"
                    }, {
                        name: "纽约",
                        country: "美国",
                        code: "NYC"
                    }, {
                        name: "马尼拉",
                        country: "菲律宾",
                        code: "MNL"
                    }, {
                        name: "墨尔本",
                        country: "澳大利亚",
                        code: "MEL"
                    }, {
                        name: "温哥华",
                        country: "加拿大",
                        code: "YVR"
                    }, {
                        name: "巴黎",
                        country: "法国",
                        code: "PAR"
                    }, {
                        name: "槟城",
                        country: "马来西亚",
                        code: "PEN"
                    }, {
                        name: "多伦多",
                        country: "加拿大",
                        code: "YTO"
                    }, {
                        name: "胡志明市",
                        country: "越南",
                        code: "SGN"
                    }, {
                        name: "旧金山",
                        country: "美国",
                        code: "SFO"
                    }, {
                        name: "金边",
                        country: "柬埔寨",
                        code: "PNH"
                    }, {
                        name: "雅加达",
                        country: "印度尼西亚",
                        code: "JKT"
                    }, {
                        name: "济州岛",
                        country: "韩国",
                        code: "CJU"
                    }, {
                        name: "高雄",
                        country: "中国台湾",
                        code: "KHH"
                    }, {
                        name: "釜山",
                        country: "韩国",
                        code: "PUS"
                    }, {
                        name: "暹粒",
                        country: "柬埔寨",
                        code: "REP"
                    }, {
                        name: "法兰克福",
                        country: "德国",
                        code: "FRA"
                    }]
                }],
                fuzzy_c: true,
                fuzzy: true,
                countryList: [{
                    "char": "国家",
                    clshct: true,
                    listCountry: [{
                        name: "中国",
                        country: "中国",
                        code: "CN"
                    }, {
                        name: "韩国",
                        country: "韩国",
                        code: "KR"
                    }, {
                        name: "泰国",
                        country: "泰国",
                        code: "TH"
                    }, {
                        name: "美国",
                        country: "美国",
                        code: "US"
                    }, {
                        name: "加拿大",
                        country: "加拿大",
                        code: "CA"
                    }, {
                        name: "日本",
                        country: "日本",
                        code: "JP"
                    }, {
                        name: "澳大利亚",
                        country: "澳大利亚",
                        code: "AU"
                    }, {
                        name: "英国",
                        country: "英国",
                        code: "GB"
                    }, {
                        name: "法国",
                        country: "法国",
                        code: "FR"
                    }, {
                        name: "马来西亚",
                        country: "马来西亚",
                        code: "MY"
                    }]
                }],
                hotword: [{
                    "char": "热词",
                    clshct: true,
                    listfuzzy: [{
                        name: "东南亚",
                        country: "东南亚"
                    }, {
                        name: "港澳台",
                        country: "港澳台"
                    }, {
                        name: "日韩",
                        country: "日韩"
                    }, {
                        name: "欧洲",
                        country: "欧洲"
                    }, {
                        name: "所有地点",
                        country: "所有地点"
                    }]
                }],
                title: "热门国际城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "国际·港澳台-to": {
                charSort: true,
                cityList: [{
                    "char": "城市",
                    clshct: true,
                    list: [{
                        name: "香港",
                        country: "中国香港",
                        code: "HKG"
                    }, {
                        name: "曼谷",
                        country: "泰国",
                        code: "BKK"
                    }, {
                        name: "首尔",
                        country: "韩国",
                        code: "SEL"
                    }, {
                        name: "东京",
                        country: "日本",
                        code: "TYO"
                    }, {
                        name: "普吉",
                        country: "泰国",
                        code: "HKT"
                    }, {
                        name: "新加坡",
                        country: "新加坡",
                        code: "SIN"
                    }, {
                        name: "台北",
                        country: "中国台湾",
                        code: "TPE"
                    }, {
                        name: "清迈",
                        country: "泰国",
                        code: "CNX"
                    }, {
                        name: "吉隆坡",
                        country: "马来西亚",
                        code: "KUL"
                    }, {
                        name: "悉尼",
                        country: "澳大利亚",
                        code: "SYD"
                    }, {
                        name: "澳门",
                        country: "中国澳门",
                        code: "MFM"
                    }, {
                        name: "大阪",
                        country: "日本",
                        code: "OSA"
                    }, {
                        name: "伦敦",
                        country: "英国",
                        code: "LON"
                    }, {
                        name: "洛杉矶",
                        country: "美国",
                        code: "LAX"
                    }, {
                        name: "纽约",
                        country: "美国",
                        code: "NYC"
                    }, {
                        name: "马尼拉",
                        country: "菲律宾",
                        code: "MNL"
                    }, {
                        name: "墨尔本",
                        country: "澳大利亚",
                        code: "MEL"
                    }, {
                        name: "温哥华",
                        country: "加拿大",
                        code: "YVR"
                    }, {
                        name: "巴黎",
                        country: "法国",
                        code: "PAR"
                    }, {
                        name: "槟城",
                        country: "马来西亚",
                        code: "PEN"
                    }, {
                        name: "多伦多",
                        country: "加拿大",
                        code: "YTO"
                    }, {
                        name: "胡志明市",
                        country: "越南",
                        code: "SGN"
                    }, {
                        name: "旧金山",
                        country: "美国",
                        code: "SFO"
                    }, {
                        name: "金边",
                        country: "柬埔寨",
                        code: "PNH"
                    }, {
                        name: "雅加达",
                        country: "印度尼西亚",
                        code: "JKT"
                    }, {
                        name: "济州岛",
                        country: "韩国",
                        code: "CJU"
                    }, {
                        name: "高雄",
                        country: "中国台湾",
                        code: "KHH"
                    }, {
                        name: "釜山",
                        country: "韩国",
                        code: "PUS"
                    }, {
                        name: "暹粒",
                        country: "柬埔寨",
                        code: "REP"
                    }, {
                        name: "法兰克福",
                        country: "德国",
                        code: "FRA"
                    }]
                }],
                fuzzy_c: true,
                fuzzy: true,
                countryList: [{
                    "char": "国家",
                    clshct: true,
                    listCountry: [{
                        name: "中国",
                        country: "中国",
                        code: "CN"
                    }, {
                        name: "韩国",
                        country: "韩国",
                        code: "KR"
                    }, {
                        name: "泰国",
                        country: "泰国",
                        code: "TH"
                    }, {
                        name: "美国",
                        country: "美国",
                        code: "US"
                    }, {
                        name: "加拿大",
                        country: "加拿大",
                        code: "CA"
                    }, {
                        name: "日本",
                        country: "日本",
                        code: "JP"
                    }, {
                        name: "澳大利亚",
                        country: "澳大利亚",
                        code: "AU"
                    }, {
                        name: "英国",
                        country: "英国",
                        code: "GB"
                    }, {
                        name: "法国",
                        country: "法国",
                        code: "FR"
                    }, {
                        name: "马来西亚",
                        country: "马来西亚",
                        code: "MY"
                    }]
                }],
                hotword: [{
                    "char": "热词",
                    clshct: true,
                    listfuzzy: [{
                        name: "东南亚",
                        country: "东南亚"
                    }, {
                        name: "港澳台",
                        country: "港澳台"
                    }, {
                        name: "日韩",
                        country: "日韩"
                    }, {
                        name: "欧洲",
                        country: "欧洲"
                    }, {
                        name: "所有地点",
                        country: "所有地点"
                    }]
                }],
                title: "热门国际城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "特价国际": {
                charSort: true,
                cityList: [{
                    "char": "城市",
                    clshct: true,
                    list: [{
                        name: "香港",
                        country: "中国香港",
                        code: "HKG"
                    }, {
                        name: "曼谷",
                        country: "泰国",
                        code: "BKK"
                    }, {
                        name: "首尔",
                        country: "韩国",
                        code: "SEL"
                    }, {
                        name: "东京",
                        country: "日本",
                        code: "TYO"
                    }, {
                        name: "普吉",
                        country: "泰国",
                        code: "HKT"
                    }, {
                        name: "新加坡",
                        country: "新加坡",
                        code: "SIN"
                    }, {
                        name: "台北",
                        country: "中国台湾",
                        code: "TPE"
                    }, {
                        name: "清迈",
                        country: "泰国",
                        code: "CNX"
                    }, {
                        name: "吉隆坡",
                        country: "马来西亚",
                        code: "KUL"
                    }, {
                        name: "悉尼",
                        country: "澳大利亚",
                        code: "SYD"
                    }, {
                        name: "澳门",
                        country: "中国澳门",
                        code: "MFM"
                    }, {
                        name: "大阪",
                        country: "日本",
                        code: "OSA"
                    }, {
                        name: "伦敦",
                        country: "英国",
                        code: "LON"
                    }, {
                        name: "洛杉矶",
                        country: "美国",
                        code: "LAX"
                    }, {
                        name: "纽约",
                        country: "美国",
                        code: "NYC"
                    }, {
                        name: "马尼拉",
                        country: "菲律宾",
                        code: "MNL"
                    }, {
                        name: "墨尔本",
                        country: "澳大利亚",
                        code: "MEL"
                    }, {
                        name: "温哥华",
                        country: "加拿大",
                        code: "YVR"
                    }, {
                        name: "巴黎",
                        country: "法国",
                        code: "PAR"
                    }, {
                        name: "槟城",
                        country: "马来西亚",
                        code: "PEN"
                    }, {
                        name: "多伦多",
                        country: "加拿大",
                        code: "YTO"
                    }, {
                        name: "胡志明市",
                        country: "越南",
                        code: "SGN"
                    }, {
                        name: "旧金山",
                        country: "美国",
                        code: "SFO"
                    }, {
                        name: "金边",
                        country: "柬埔寨",
                        code: "PNH"
                    }, {
                        name: "雅加达",
                        country: "印度尼西亚",
                        code: "JKT"
                    }, {
                        name: "济州岛",
                        country: "韩国",
                        code: "CJU"
                    }, {
                        name: "高雄",
                        country: "中国台湾",
                        code: "KHH"
                    }, {
                        name: "釜山",
                        country: "韩国",
                        code: "PUS"
                    }, {
                        name: "暹粒",
                        country: "柬埔寨",
                        code: "REP"
                    }, {
                        name: "法兰克福",
                        country: "德国",
                        code: "FRA"
                    }]
                }],
                title: "热门国际城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "热门城市和国家": {
                fuzzyArea: true,
                cityList: [{
                    name: "香港",
                    country: "中国香港",
                    code: "HKG"
                }, {
                    name: "曼谷",
                    country: "泰国",
                    code: "BKK"
                }, {
                    name: "新加坡",
                    country: "新加坡",
                    code: "SIN"
                }, {
                    name: "马尼拉",
                    country: "菲律宾",
                    code: "MNL"
                }, {
                    name: "墨尔本",
                    country: "澳大利亚",
                    code: "MEL"
                }, {
                    name: "首尔",
                    country: "韩国",
                    code: "SEL"
                }, {
                    name: "澳门",
                    country: "中国澳门",
                    code: "MFM"
                }, {
                    name: "吉隆坡",
                    country: "马来西亚",
                    code: "KUL"
                }, {
                    name: "旧金山",
                    country: "美国",
                    code: "SFO"
                }, {
                    name: "暹粒",
                    country: "柬埔寨",
                    code: "REP"
                }, {
                    name: "台北",
                    country: "中国台湾",
                    code: "TPE"
                }, {
                    name: "普吉",
                    country: "泰国",
                    code: "HKT"
                }, {
                    name: "大阪",
                    country: "日本",
                    code: "OSA"
                }, {
                    name: "巴厘岛",
                    country: "印度尼西亚",
                    code: "DPS"
                }, {
                    name: "伦敦",
                    country: "英国",
                    code: "LON"
                }, {
                    name: "东京",
                    country: "日本",
                    code: "TYO"
                }, {
                    name: "胡志明市",
                    country: "越南",
                    code: "SGN"
                }, {
                    name: "纽约",
                    country: "美国",
                    code: "NYC"
                }, {
                    name: "高雄",
                    country: "中国台湾",
                    code: "KHH"
                }, {
                    name: "釜山",
                    country: "韩国",
                    code: "PUS"
                }, {
                    name: "洛杉矶",
                    country: "美国",
                    code: "LAX"
                }, {
                    name: "悉尼",
                    country: "澳大利亚",
                    code: "SYD"
                }, {
                    name: "苏梅岛",
                    country: "泰国",
                    code: "USM"
                }, {
                    name: "济州岛",
                    country: "韩国",
                    code: "CJU"
                }, {
                    name: "温哥华",
                    country: "加拿大",
                    code: "YVR"
                }, {
                    name: "清迈",
                    country: "泰国",
                    code: "CNX"
                }, {
                    name: "加德满都",
                    country: "尼泊尔",
                    code: "KTM"
                }, {
                    name: "雅加达",
                    country: "印度尼西亚",
                    code: "JKT"
                }, {
                    name: "金边",
                    country: "柬埔寨",
                    code: "PNH"
                }, {
                    name: "迪拜",
                    country: "阿拉伯联合酋长国",
                    code: "DXB"
                }],
                countryList: [{
                    name: "中国",
                    country: "中国",
                    code: "CN"
                }, {
                    name: "韩国",
                    country: "韩国",
                    code: "KR"
                }, {
                    name: "泰国",
                    country: "泰国",
                    code: "TH"
                }, {
                    name: "美国",
                    country: "美国",
                    code: "US"
                }, {
                    name: "加拿大",
                    country: "加拿大",
                    code: "CA"
                }, {
                    name: "日本",
                    country: "日本",
                    code: "JP"
                }, {
                    name: "澳大利亚",
                    country: "澳大利亚",
                    code: "AU"
                }, {
                    name: "英国",
                    country: "英国",
                    code: "GB"
                }, {
                    name: "法国",
                    country: "法国",
                    code: "FR"
                }, {
                    name: "马来西亚",
                    country: "马来西亚",
                    code: "MY"
                }],
                title: "热门城市和国家",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "亚洲/大洋洲": {
                charSort: true,
                fuzzy_c: true,
                fuzzy: true,
                cityList: [{
                    "char": "城市",
                    clshct: true,
                    list: [{
                        name: "香港",
                        country: "中国香港",
                        code: "HKG"
                    }, {
                        name: "新加坡",
                        country: "新加坡",
                        code: "SIN"
                    }, {
                        name: "首尔",
                        country: "韩国",
                        code: "SEL"
                    }, {
                        name: "曼谷",
                        country: "泰国",
                        code: "BKK"
                    }, {
                        name: "吉隆坡",
                        country: "马来西亚",
                        code: "KUL"
                    }, {
                        name: "东京",
                        country: "日本",
                        code: "TYO"
                    }, {
                        name: "台北",
                        country: "中国台湾",
                        code: "TPE"
                    }, {
                        name: "悉尼",
                        country: "澳大利亚",
                        code: "SYD"
                    }, {
                        name: "澳门",
                        country: "中国澳门",
                        code: "MFM"
                    }, {
                        name: "普吉",
                        country: "泰国",
                        code: "HKT"
                    }, {
                        name: "墨尔本",
                        country: "澳大利亚",
                        code: "MEL"
                    }, {
                        name: "胡志明市",
                        country: "越南",
                        code: "SGN"
                    }, {
                        name: "大阪",
                        country: "日本",
                        code: "OSA"
                    }, {
                        name: "巴厘岛",
                        country: "印度尼西亚",
                        code: "DPS"
                    }, {
                        name: "马尼拉",
                        country: "菲律宾",
                        code: "MNL"
                    }, {
                        name: "河内",
                        country: "越南",
                        code: "HAN"
                    }, {
                        name: "加德满都",
                        country: "尼泊尔",
                        code: "KTM"
                    }, {
                        name: "金边",
                        country: "柬埔寨",
                        code: "PNH"
                    }, {
                        name: "雅加达",
                        country: "印度尼西亚",
                        code: "JKT"
                    }, {
                        name: "马累",
                        country: "马尔代夫",
                        code: "MLE"
                    }, {
                        name: "暹粒",
                        country: "柬埔寨",
                        code: "REP"
                    }, {
                        name: "迪拜",
                        country: "阿拉伯联合酋长国",
                        code: "DXB"
                    }, {
                        name: "釜山",
                        country: "韩国",
                        code: "PUS"
                    }, {
                        name: "名古屋",
                        country: "日本",
                        code: "NGO"
                    }, {
                        name: "奥克兰",
                        country: "新西兰",
                        code: "AKL"
                    }, {
                        name: "布里斯班",
                        country: "澳大利亚",
                        code: "BNE"
                    }, {
                        name: "槟城",
                        country: "马来西亚",
                        code: "PEN"
                    }, {
                        name: "高雄",
                        country: "中国台湾",
                        code: "KHH"
                    }, {
                        name: "新德里",
                        country: "印度",
                        code: "DEL"
                    }, {
                        name: "济州岛",
                        country: "韩国",
                        code: "CJU"
                    }]
                }],
                countryList: [{
                    "char": "国家",
                    clshct: true,
                    listCountry: [{
                        name: "新加坡",
                        country: "新加坡",
                        code: "SG"
                    }, {
                        name: "韩国",
                        country: "韩国",
                        code: "KR"
                    }, {
                        name: "泰国",
                        country: "泰国",
                        code: "TH"
                    }, {
                        name: "马来西亚",
                        country: "马来西亚",
                        code: "MY"
                    }, {
                        name: "日本",
                        country: "日本",
                        code: "JP"
                    }, {
                        name: "澳大利亚",
                        country: "澳大利亚",
                        code: "AU"
                    }, {
                        name: "越南",
                        country: "越南",
                        code: "VN"
                    }, {
                        name: "印度尼西亚",
                        country: "印度尼西亚",
                        code: "IN"
                    }, {
                        name: "菲律宾",
                        country: "菲律宾",
                        code: "PH"
                    }, {
                        name: "尼泊尔",
                        country: "尼泊尔",
                        code: "NP"
                    }]
                }],
                hotword: [{
                    "char": "热词",
                    clshct: true,
                    listfuzzy: [{
                        name: "港澳台",
                        country: "港澳台"
                    }, {
                        name: "日韩",
                        country: "日韩"
                    }, {
                        name: "新马泰",
                        country: "新马泰"
                    }, {
                        name: "澳新",
                        country: "澳新"
                    }, {
                        name: "所有地点",
                        country: "所有地点"
                    }]
                }],
                title: "亚洲/大洋洲热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "美洲": {
                charSort: true,
                fuzzy_c: true,
                fuzzy: true,
                cityList: [{
                    "char": "城市",
                    clshct: true,
                    list: [{
                        name: "纽约",
                        country: "美国",
                        code: "NYC"
                    }, {
                        name: "洛杉矶",
                        country: "美国",
                        code: "LAX"
                    }, {
                        name: "多伦多",
                        country: "加拿大",
                        code: "YTO"
                    }, {
                        name: "温哥华",
                        country: "加拿大",
                        code: "YVR"
                    }, {
                        name: "旧金山",
                        country: "美国",
                        code: "SFO"
                    }, {
                        name: "芝加哥",
                        country: "美国",
                        code: "CHI"
                    }, {
                        name: "华盛顿",
                        country: "美国",
                        code: "WAS"
                    }, {
                        name: "西雅图",
                        country: "美国",
                        code: "SEA"
                    }, {
                        name: "波士顿",
                        country: "美国",
                        code: "BOS"
                    }, {
                        name: "底特律",
                        country: "美国",
                        code: "DTT"
                    }, {
                        name: "亚特兰大",
                        country: "美国",
                        code: "ATL"
                    }, {
                        name: "蒙特利尔",
                        country: "加拿大",
                        code: "YMQ"
                    }, {
                        name: "休斯敦",
                        country: "美国",
                        code: "HOU"
                    }, {
                        name: "火奴鲁鲁",
                        country: "美国",
                        code: "HNL"
                    }, {
                        name: "达拉斯",
                        country: "美国",
                        code: "DFW"
                    }, {
                        name: "拉斯维加斯",
                        country: "美国",
                        code: "LAS"
                    }, {
                        name: "费城",
                        country: "美国",
                        code: "PHI"
                    }, {
                        titles: "圣保罗（巴西）",
                        name: "圣保罗",
                        country: "巴西",
                        code: "SAO"
                    }, {
                        name: "明尼阿波利斯",
                        country: "美国",
                        code: "MSP"
                    }, {
                        name: "渥太华",
                        country: "加拿大",
                        code: "YOW"
                    }, {
                        name: "凤凰城",
                        country: "美国",
                        code: "PHX"
                    }, {
                        name: "墨西哥城",
                        country: "墨西哥",
                        code: "MEX"
                    }, {
                        name: "迈阿密",
                        country: "美国",
                        code: "MIA"
                    }, {
                        name: "丹佛",
                        country: "美国",
                        code: "DEN"
                    }, {
                        name: "奥兰多",
                        country: "美国",
                        code: "ORL"
                    }, {
                        name: "卡尔加里",
                        country: "加拿大",
                        code: "YYC"
                    }, {
                        name: "埃德蒙顿",
                        country: "加拿大",
                        code: "YEA"
                    }, {
                        name: "布宜诺斯艾利斯",
                        country: "阿根廷",
                        code: "BUE"
                    }, {
                        name: "里约热内卢",
                        country: "巴西",
                        code: "RIO"
                    }, {
                        name: "匹兹堡",
                        country: "美国",
                        code: "PIT"
                    }]
                }],
                countryList: [{
                    "char": "国家",
                    clshct: true,
                    listCountry: [{
                        name: "美国",
                        country: "美国",
                        code: "US"
                    }, {
                        name: "加拿大",
                        country: "加拿大",
                        code: "CA"
                    }, {
                        name: "巴西",
                        country: "巴西",
                        code: "BR"
                    }, {
                        name: "墨西哥",
                        country: "墨西哥",
                        code: "MX"
                    }, {
                        name: "阿根廷",
                        country: "阿根廷",
                        code: "AR"
                    }]
                }],
                hotword: [{
                    "char": "热词",
                    clshct: true,
                    listfuzzy: [{
                        name: "美国东海岸",
                        country: "美国东海岸"
                    }, {
                        name: "美国西部",
                        country: "美国西部"
                    }, {
                        name: "北美五大湖",
                        country: "北美五大湖"
                    }, {
                        name: "所有地点",
                        country: "所有地点"
                    }]
                }],
                title: "美洲热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "欧洲": {
                charSort: true,
                fuzzy_c: true,
                fuzzy: true,
                cityList: [{
                    "char": "城市",
                    clshct: true,
                    list: [{
                        name: "伦敦",
                        country: "英国",
                        code: "LON"
                    }, {
                        name: "巴黎",
                        country: "法国",
                        code: "PAR"
                    }, {
                        name: "法兰克福",
                        country: "德国",
                        code: "FRA"
                    }, {
                        name: "莫斯科",
                        country: "俄罗斯",
                        code: "MOS"
                    }, {
                        name: "阿姆斯特丹",
                        country: "荷兰",
                        code: "AMS"
                    }, {
                        titles: "罗马（意大利）",
                        name: "罗马",
                        country: "意大利",
                        code: "ROM"
                    }, {
                        name: "米兰",
                        country: "意大利",
                        code: "MIL"
                    }, {
                        name: "马德里",
                        country: "西班牙",
                        code: "MAD"
                    }, {
                        name: "慕尼黑",
                        country: "德国",
                        code: "MUC"
                    }, {
                        name: "柏林",
                        country: "德国",
                        code: "BER"
                    }, {
                        name: "斯德哥尔摩",
                        country: "瑞典",
                        code: "STO"
                    }, {
                        name: "伊斯坦布尔",
                        country: "土耳其",
                        code: "IST"
                    }, {
                        titles: "伯明翰（英国）",
                        name: "伯明翰",
                        country: "英国",
                        code: "BHX"
                    }, {
                        titles: "巴塞罗那(西班牙)",
                        name: "巴塞罗那",
                        country: "西班牙",
                        code: "BCN"
                    }, {
                        name: "雅典",
                        country: "希腊",
                        code: "ATH"
                    }, {
                        name: "哥本哈根",
                        country: "丹麦",
                        code: "CPH"
                    }, {
                        name: "苏黎世",
                        country: "瑞士",
                        code: "ZRH"
                    }, {
                        name: "布鲁塞尔",
                        country: "比利时",
                        code: "BRU"
                    }, {
                        name: "赫尔辛基",
                        country: "芬兰",
                        code: "HEL"
                    }, {
                        name: "爱丁堡",
                        country: "英国",
                        code: "EDI"
                    }, {
                        name: "维也纳",
                        country: "奥地利",
                        code: "VIE"
                    }, {
                        titles: "格拉斯哥（英国）",
                        name: "格拉斯哥",
                        country: "英国",
                        code: "GLA"
                    }, {
                        name: "日内瓦",
                        country: "瑞士",
                        code: "GVA"
                    }, {
                        name: "圣彼得堡",
                        country: "俄罗斯",
                        code: "LED"
                    }, {
                        titles: "都柏林(爱尔兰)",
                        name: "都柏林",
                        country: "爱尔兰",
                        code: "DUB"
                    }, {
                        name: "汉堡",
                        country: "德国",
                        code: "HAM"
                    }, {
                        name: "杜塞尔多夫",
                        country: "德国",
                        code: "DUS"
                    }, {
                        name: "布拉格",
                        country: "捷克",
                        code: "PRG"
                    }, {
                        name: "布达佩斯",
                        country: "匈牙利",
                        code: "BUD"
                    }, {
                        name: "基辅",
                        country: "乌克兰",
                        code: "IEV"
                    }]
                }],
                countryList: [{
                    "char": "国家",
                    clshct: true,
                    listCountry: [{
                        name: "英国",
                        country: "英国",
                        code: "GB"
                    }, {
                        name: "法国",
                        country: "法国",
                        code: "FR"
                    }, {
                        name: "俄罗斯",
                        country: "俄罗斯",
                        code: "RU"
                    }, {
                        name: "荷兰",
                        country: "荷兰",
                        code: "NL"
                    }, {
                        name: "意大利",
                        country: "意大利",
                        code: "IT"
                    }, {
                        name: "西班牙",
                        country: "西班牙",
                        code: "ES"
                    }, {
                        name: "德国",
                        country: "德国",
                        code: "DE"
                    }, {
                        name: "瑞典",
                        country: "瑞典",
                        code: "SE"
                    }, {
                        name: "土耳其",
                        country: "土耳其",
                        code: "TR"
                    }, {
                        name: "希腊",
                        country: "希腊",
                        code: "GR"
                    }]
                }],
                hotword: [{
                    "char": "热词",
                    clshct: true,
                    listfuzzy: [{
                        name: "西欧",
                        country: "西欧"
                    }, {
                        name: "北欧",
                        country: "北欧"
                    }, {
                        name: "中东欧",
                        country: "中东欧"
                    }, {
                        name: "南欧",
                        country: "南欧"
                    }, {
                        name: "所有地点",
                        country: "所有地点"
                    }]
                }],
                title: "欧洲热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "非洲": {
                charSort: true,
                fuzzy_c: true,
                fuzzy: true,
                cityList: [{
                    "char": "城市",
                    clshct: true,
                    list: [{
                        name: "开罗",
                        country: "埃及",
                        code: "CAI"
                    }, {
                        name: "约翰内斯堡",
                        country: "南非",
                        code: "JNB"
                    }, {
                        name: "内罗毕",
                        country: "肯尼亚",
                        code: "NBO"
                    }, {
                        name: "开普敦",
                        country: "南非",
                        code: "CPT"
                    }, {
                        name: "毛里求斯",
                        country: "毛里求斯",
                        code: "MRU"
                    }, {
                        name: "拉各斯",
                        country: "尼日利亚",
                        code: "LOS"
                    }, {
                        name: "喀土穆",
                        country: "苏丹",
                        code: "KRT"
                    }, {
                        name: "亚的斯亚贝巴",
                        country: "埃塞俄比亚",
                        code: "ADD"
                    }, {
                        name: "阿克拉",
                        country: "加纳",
                        code: "ACC"
                    }, {
                        name: "达累斯萨拉姆",
                        country: "坦桑尼亚",
                        code: "DAR"
                    }, {
                        name: "塞舌尔",
                        country: "塞舌尔共和国",
                        code: "SEZ"
                    }, {
                        name: "阿尔及尔",
                        country: "阿尔及利亚",
                        code: "ALG"
                    }, {
                        name: "的黎波里",
                        country: "利比亚",
                        code: "TIP"
                    }, {
                        name: "阿布贾",
                        country: "尼日利亚",
                        code: "ABV"
                    }, {
                        name: "卡萨布兰卡",
                        country: "摩洛哥",
                        code: "CAS"
                    }, {
                        name: "突尼斯",
                        country: "突尼斯",
                        code: "TUN"
                    }]
                }],
                countryList: [{
                    "char": "国家",
                    clshct: true,
                    listCountry: [{
                        name: "埃及",
                        country: "埃及",
                        code: "EG"
                    }, {
                        name: "南非",
                        country: "南非",
                        code: "ZA"
                    }, {
                        name: "肯尼亚",
                        country: "肯尼亚",
                        code: "KE"
                    }, {
                        name: "尼日利亚",
                        country: "尼日利亚",
                        code: "NG"
                    }, {
                        name: "埃塞俄比亚",
                        country: "埃塞俄比亚",
                        code: "ET"
                    }]
                }],
                hotword: [{
                    "char": "热词",
                    clshct: true,
                    clshct: true,
                    listfuzzy: [{
                        name: "非洲南部",
                        country: "非洲南部"
                    }, {
                        name: "北非",
                        country: "北非"
                    }, {
                        name: "东非",
                        country: "东非"
                    }, {
                        name: "所有地点",
                        country: "所有地点"
                    }]
                }],
                title: "非洲热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "m亚洲/大洋洲": {
                charSort: true,
                cityList: [{
                    "char": "城市",
                    clshct: true,
                    list: [{
                        name: "香港",
                        country: "中国香港",
                        code: "HKG"
                    }, {
                        name: "新加坡",
                        country: "新加坡",
                        code: "SIN"
                    }, {
                        name: "首尔",
                        country: "韩国",
                        code: "SEL"
                    }, {
                        name: "曼谷",
                        country: "泰国",
                        code: "BKK"
                    }, {
                        name: "吉隆坡",
                        country: "马来西亚",
                        code: "KUL"
                    }, {
                        name: "东京",
                        country: "日本",
                        code: "TYO"
                    }, {
                        name: "台北",
                        country: "中国台湾",
                        code: "TPE"
                    }, {
                        name: "悉尼",
                        country: "澳大利亚",
                        code: "SYD"
                    }, {
                        name: "澳门",
                        country: "中国澳门",
                        code: "MFM"
                    }, {
                        name: "普吉",
                        country: "泰国",
                        code: "HKT"
                    }, {
                        name: "墨尔本",
                        country: "澳大利亚",
                        code: "MEL"
                    }, {
                        name: "胡志明市",
                        country: "越南",
                        code: "SGN"
                    }, {
                        name: "大阪",
                        country: "日本",
                        code: "OSA"
                    }, {
                        name: "巴厘岛",
                        country: "印度尼西亚",
                        code: "DPS"
                    }, {
                        name: "马尼拉",
                        country: "菲律宾",
                        code: "MNL"
                    }, {
                        name: "河内",
                        country: "越南",
                        code: "HAN"
                    }, {
                        name: "加德满都",
                        country: "尼泊尔",
                        code: "KTM"
                    }, {
                        name: "金边",
                        country: "柬埔寨",
                        code: "PNH"
                    }, {
                        name: "雅加达",
                        country: "印度尼西亚",
                        code: "JKT"
                    }, {
                        name: "马累",
                        country: "马尔代夫",
                        code: "MLE"
                    }, {
                        name: "暹粒",
                        country: "柬埔寨",
                        code: "REP"
                    }, {
                        name: "迪拜",
                        country: "阿拉伯联合酋长国",
                        code: "DXB"
                    }, {
                        name: "釜山",
                        country: "韩国",
                        code: "PUS"
                    }, {
                        name: "名古屋",
                        country: "日本",
                        code: "NGO"
                    }, {
                        name: "奥克兰",
                        country: "新西兰",
                        code: "AKL"
                    }, {
                        name: "布里斯班",
                        country: "澳大利亚",
                        code: "BNE"
                    }, {
                        name: "槟城",
                        country: "马来西亚",
                        code: "PEN"
                    }, {
                        name: "高雄",
                        country: "中国台湾",
                        code: "KHH"
                    }, {
                        name: "新德里",
                        country: "印度",
                        code: "DEL"
                    }, {
                        name: "济州岛",
                        country: "韩国",
                        code: "CJU"
                    }]
                }],
                title: "亚洲/大洋洲热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "m美洲": {
                charSort: true,
                cityList: [{
                    "char": "城市",
                    clshct: true,
                    list: [{
                        name: "纽约",
                        country: "美国",
                        code: "NYC"
                    }, {
                        name: "洛杉矶",
                        country: "美国",
                        code: "LAX"
                    }, {
                        name: "多伦多",
                        country: "加拿大",
                        code: "YTO"
                    }, {
                        name: "温哥华",
                        country: "加拿大",
                        code: "YVR"
                    }, {
                        name: "旧金山",
                        country: "美国",
                        code: "SFO"
                    }, {
                        name: "芝加哥",
                        country: "美国",
                        code: "CHI"
                    }, {
                        name: "华盛顿",
                        country: "美国",
                        code: "WAS"
                    }, {
                        name: "西雅图",
                        country: "美国",
                        code: "SEA"
                    }, {
                        name: "波士顿",
                        country: "美国",
                        code: "BOS"
                    }, {
                        name: "底特律",
                        country: "美国",
                        code: "DTT"
                    }, {
                        name: "亚特兰大",
                        country: "美国",
                        code: "ATL"
                    }, {
                        name: "蒙特利尔",
                        country: "加拿大",
                        code: "YMQ"
                    }, {
                        name: "休斯敦",
                        country: "美国",
                        code: "HOU"
                    }, {
                        name: "火奴鲁鲁",
                        country: "美国",
                        code: "HNL"
                    }, {
                        name: "达拉斯",
                        country: "美国",
                        code: "DFW"
                    }, {
                        name: "拉斯维加斯",
                        country: "美国",
                        code: "LAS"
                    }, {
                        name: "费城",
                        country: "美国",
                        code: "PHI"
                    }, {
                        titles: "圣保罗（巴西）",
                        name: "圣保罗",
                        country: "巴西",
                        code: "SAO"
                    }, {
                        name: "明尼阿波利斯",
                        country: "美国",
                        code: "MSP"
                    }, {
                        name: "渥太华",
                        country: "加拿大",
                        code: "YOW"
                    }, {
                        name: "凤凰城",
                        country: "美国",
                        code: "PHX"
                    }, {
                        name: "墨西哥城",
                        country: "墨西哥",
                        code: "MEX"
                    }, {
                        name: "迈阿密",
                        country: "美国",
                        code: "MIA"
                    }, {
                        name: "丹佛",
                        country: "美国",
                        code: "DEN"
                    }, {
                        name: "奥兰多",
                        country: "美国",
                        code: "ORL"
                    }, {
                        name: "卡尔加里",
                        country: "加拿大",
                        code: "YYC"
                    }, {
                        name: "埃德蒙顿",
                        country: "加拿大",
                        code: "YEA"
                    }, {
                        name: "布宜诺斯艾利斯",
                        country: "阿根廷",
                        code: "BUE"
                    }, {
                        name: "里约热内卢",
                        country: "巴西",
                        code: "RIO"
                    }, {
                        name: "匹兹堡",
                        country: "美国",
                        code: "PIT"
                    }]
                }],
                title: "美洲热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "m欧洲": {
                charSort: true,
                cityList: [{
                    "char": "城市",
                    clshct: true,
                    list: [{
                        name: "伦敦",
                        country: "英国",
                        code: "LON"
                    }, {
                        name: "巴黎",
                        country: "法国",
                        code: "PAR"
                    }, {
                        name: "法兰克福",
                        country: "德国",
                        code: "FRA"
                    }, {
                        name: "莫斯科",
                        country: "俄罗斯",
                        code: "MOS"
                    }, {
                        name: "阿姆斯特丹",
                        country: "荷兰",
                        code: "AMS"
                    }, {
                        titles: "罗马（意大利）",
                        name: "罗马",
                        country: "意大利",
                        code: "ROM"
                    }, {
                        name: "米兰",
                        country: "意大利",
                        code: "MIL"
                    }, {
                        name: "马德里",
                        country: "西班牙",
                        code: "MAD"
                    }, {
                        name: "慕尼黑",
                        country: "德国",
                        code: "MUC"
                    }, {
                        name: "柏林",
                        country: "德国",
                        code: "BER"
                    }, {
                        name: "斯德哥尔摩",
                        country: "瑞典",
                        code: "STO"
                    }, {
                        name: "伊斯坦布尔",
                        country: "土耳其",
                        code: "IST"
                    }, {
                        titles: "伯明翰（英国）",
                        name: "伯明翰",
                        country: "英国",
                        code: "BHX"
                    }, {
                        titles: "巴塞罗那(西班牙)",
                        name: "巴塞罗那",
                        country: "西班牙",
                        code: "BCN"
                    }, {
                        name: "雅典",
                        country: "希腊",
                        code: "ATH"
                    }, {
                        name: "哥本哈根",
                        country: "丹麦",
                        code: "CPH"
                    }, {
                        name: "苏黎世",
                        country: "瑞士",
                        code: "ZRH"
                    }, {
                        name: "布鲁塞尔",
                        country: "比利时",
                        code: "BRU"
                    }, {
                        name: "赫尔辛基",
                        country: "芬兰",
                        code: "HEL"
                    }, {
                        name: "爱丁堡",
                        country: "英国",
                        code: "EDI"
                    }, {
                        name: "维也纳",
                        country: "奥地利",
                        code: "VIE"
                    }, {
                        titles: "格拉斯哥（英国）",
                        name: "格拉斯哥",
                        country: "英国",
                        code: "GLA"
                    }, {
                        name: "日内瓦",
                        country: "瑞士",
                        code: "GVA"
                    }, {
                        name: "圣彼得堡",
                        country: "俄罗斯",
                        code: "LED"
                    }, {
                        titles: "都柏林(爱尔兰)",
                        name: "都柏林",
                        country: "爱尔兰",
                        code: "DUB"
                    }, {
                        name: "汉堡",
                        country: "德国",
                        code: "HAM"
                    }, {
                        name: "杜塞尔多夫",
                        country: "德国",
                        code: "DUS"
                    }, {
                        name: "布拉格",
                        country: "捷克",
                        code: "PRG"
                    }, {
                        name: "布达佩斯",
                        country: "匈牙利",
                        code: "BUD"
                    }, {
                        name: "基辅",
                        country: "乌克兰",
                        code: "IEV"
                    }]
                }],
                title: "欧洲热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "m非洲": {
                charSort: true,
                cityList: [{
                    "char": "城市",
                    clshct: true,
                    list: [{
                        name: "开罗",
                        country: "埃及",
                        code: "CAI"
                    }, {
                        name: "约翰内斯堡",
                        country: "南非",
                        code: "JNB"
                    }, {
                        name: "内罗毕",
                        country: "肯尼亚",
                        code: "NBO"
                    }, {
                        name: "开普敦",
                        country: "南非",
                        code: "CPT"
                    }, {
                        name: "毛里求斯",
                        country: "毛里求斯",
                        code: "MRU"
                    }, {
                        name: "拉各斯",
                        country: "尼日利亚",
                        code: "LOS"
                    }, {
                        name: "喀土穆",
                        country: "苏丹",
                        code: "KRT"
                    }, {
                        name: "亚的斯亚贝巴",
                        country: "埃塞俄比亚",
                        code: "ADD"
                    }, {
                        name: "阿克拉",
                        country: "加纳",
                        code: "ACC"
                    }, {
                        name: "达累斯萨拉姆",
                        country: "坦桑尼亚",
                        code: "DAR"
                    }, {
                        name: "塞舌尔",
                        country: "塞舌尔共和国",
                        code: "SEZ"
                    }, {
                        name: "阿尔及尔",
                        country: "阿尔及利亚",
                        code: "ALG"
                    }, {
                        name: "的黎波里",
                        country: "利比亚",
                        code: "TIP"
                    }, {
                        name: "阿布贾",
                        country: "尼日利亚",
                        code: "ABV"
                    }, {
                        name: "卡萨布兰卡",
                        country: "摩洛哥",
                        code: "CAS"
                    }, {
                        name: "突尼斯",
                        country: "突尼斯",
                        code: "TUN"
                    }]
                }],
                title: "非洲热门城市",
                desc: "可直接输入中文名/拼音/英文名/三字码",
                cls: "inter"
            },
            "国内": {
                cityList: [{
                    name: "上海",
                    country: "中国",
                    code: "SHA"
                }, {
                    name: "北京",
                    country: "中国",
                    code: "BJS"
                }, {
                    name: "广州",
                    country: "中国",
                    code: "CAN"
                }, {
                    name: "昆明",
                    country: "中国",
                    code: "KMG"
                }, {
                    name: "西安",
                    country: "中国",
                    code: "SIA"
                }, {
                    name: "成都",
                    country: "中国",
                    code: "CTU"
                }, {
                    name: "深圳",
                    country: "中国",
                    code: "SZX"
                }, {
                    name: "厦门",
                    country: "中国",
                    code: "XMN"
                }, {
                    name: "乌鲁木齐",
                    country: "中国",
                    code: "URC"
                }, {
                    name: "南京",
                    country: "中国",
                    code: "NKG"
                }, {
                    name: "重庆",
                    country: "中国",
                    code: "CKG"
                }, {
                    name: "杭州",
                    country: "中国",
                    code: "HGH"
                }, {
                    name: "大连",
                    country: "中国",
                    code: "DLC"
                }, {
                    name: "长沙",
                    country: "中国",
                    code: "CSX"
                }, {
                    name: "海口",
                    country: "中国",
                    code: "HAK"
                }, {
                    name: "哈尔滨",
                    country: "中国",
                    code: "HRB"
                }, {
                    name: "青岛",
                    country: "中国",
                    code: "TAO"
                }, {
                    name: "沈阳",
                    country: "中国",
                    code: "SHE"
                }, {
                    name: "三亚",
                    country: "中国",
                    code: "SYX"
                }, {
                    name: "济南",
                    country: "中国",
                    code: "TNA"
                }, {
                    name: "武汉",
                    country: "中国",
                    code: "WUH"
                }, {
                    name: "郑州",
                    country: "中国",
                    code: "CGO"
                }, {
                    name: "贵阳",
                    country: "中国",
                    code: "KWE"
                }, {
                    name: "南宁",
                    country: "中国",
                    code: "NNG"
                }, {
                    name: "福州",
                    country: "中国",
                    code: "FOC"
                }, {
                    name: "天津",
                    country: "中国",
                    code: "TSN"
                }, {
                    name: "长春",
                    country: "中国",
                    code: "CGQ"
                }, {
                    name: "石家庄",
                    country: "中国",
                    code: "SJW"
                }, {
                    name: "太原",
                    country: "中国",
                    code: "TYN"
                }, {
                    name: "兰州",
                    country: "中国",
                    code: "LHW"
                }],
                title: "热门国内城市",
                desc: "可直接输入中文名/拼音/英文名/三字码"
            }
        }
    },
    specPlace: ["所有地点", "中国", "日本", "泰国", "马来西亚", "韩国", "英国", "美国", "澳大利亚", "加拿大", "法国", "德国", "俄罗斯", "菲律宾", "印度", "新西兰", "西班牙", "意大利"]
};
var FlightCalendarConf = {
    HolidayData: {
        "2015-01-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "元旦",
            holidayClass: "yuandan"
        },
        "2015-02-18": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "除夕",
            holidayClass: "chuxi"
        },
        "2015-02-19": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "春节",
            holidayClass: "chunjie"
        },
        "2015-03-05": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "元宵",
            holidayClass: "yuanxiao"
        },
        "2015-04-05": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "清明",
            holidayClass: "qingming"
        },
        "2015-05-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "五一",
            holidayClass: "laodong"
        },
        "2015-06-20": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "端午",
            holidayClass: "duanwu"
        },
        "2015-09-27": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "中秋",
            holidayClass: "zhongqiu"
        },
        "2015-10-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "国庆",
            holidayClass: "guoqing"
        },
        "2015-12-25": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "圣诞",
            holidayClass: "shengdan"
        }
    },
    WorkHoliday: {
        work: ["2015-02-15", "2015-02-28", "2015-09-06", "2015-10-10"],
        vacation: ["2015-02-18", "2015-02-19", "2015-02-20", "2015-02-21", "2015-02-22", "2015-02-23", "2015-02-24", "2015-04-04", "2015-04-05", "2015-04-06", "2015-05-01", "2015-05-02", "2015-05-03", "2015-06-20", "2015-06-21", "2015-06-22", "2015-09-03", "2015-09-04", "2015-09-05", "2015-09-26", "2015-09-27", "2015-10-01", "2015-10-02", "2015-10-03", "2015-10-04", "2015-10-05", "2015-10-06", "2015-10-07"]
    },
    TransDateEx: {
        week: "周",
        day: "天",
        before: "前",
        after: "后"
    },
    fuzzyDate0: ["暑假", "抗战胜利日", "中秋&国庆", "双十一", "圣诞", "元旦", "春节", "寒假", "清明", "五一", "端午", "中秋", "国庆"],
    fuzzyDate: {
        "1月": {
            valid: true
        },
        "2月": {
            valid: true
        },
        "3月": {
            valid: true
        },
        "4月": {
            valid: true
        },
        "5月": {
            valid: true
        },
        "6月": {
            valid: true
        },
        "7月": {
            valid: true
        },
        "8月": {
            valid: true
        },
        "9月": {
            valid: true
        },
        "10月": {
            valid: true
        },
        "11月": {
            valid: true
        },
        "12月": {
            valid: true
        },
        "暑假": {
            valid: true,
            value: "暑假",
            range: "92",
            endRange: "71",
            start: "2015-06-15",
            end: "2015-09-15",
            last: "2015-08-26",
            fuzzy: true
        },
        "抗战胜利日": {
            valid: true,
            value: "抗战胜利日",
            range: "9",
            endRange: "8",
            start: "2015-8-30",
            end: "2015-9-08",
            last: "2015-09-07",
            fuzzy: true
        },
        "中秋&国庆": {
            valid: true,
            value: "中秋&国庆",
            range: "22",
            endRange: "19",
            start: "2015-9-19",
            end: "2015-10-11",
            last: "2015-10-08",
            fuzzy: true
        },
        "双十一": {
            valid: true,
            value: "双十一",
            range: "8",
            endRange: "5",
            start: "2015-11-07",
            end: "2015-11-15",
            last: "2015-11-12",
            fuzzy: true
        },
        "圣诞": {
            valid: true,
            value: "圣诞",
            range: "11",
            endRange: "7",
            start: "2015-12-20",
            end: "2015-12-31",
            last: "2015-12-27",
            fuzzy: true
        },
        "元旦": {
            valid: true,
            value: "元旦",
            range: "11",
            endRange: "9",
            start: "2015-12-26",
            end: "2016-01-06",
            last: "2016-01-04",
            fuzzy: true
        },
        "春节": {
            valid: true,
            value: "春节",
            range: "20",
            endRange: "13",
            start: "2016-02-01",
            end: "2016-02-21",
            last: "2016-02-14",
            fuzzy: true
        },
        "寒假": {
            valid: true,
            value: "寒假",
            range: "36",
            endRange: "29",
            start: "2016-01-23",
            end: "2016-02-28",
            last: "2016-02-21",
            fuzzy: true
        },
        "清明": {
            valid: true,
            value: "清明",
            range: "9",
            endRange: "4",
            start: "2016-04-01",
            end: "2016-04-10",
            last: "2016-04-05",
            fuzzy: true
        },
        "五一": {
            valid: true,
            value: "五一",
            range: "11",
            endRange: "7",
            start: "2016-04-27",
            end: "2016-05-08",
            last: "2016-05-04",
            fuzzy: true
        },
        "端午": {
            valid: true,
            value: "端午",
            range: "14",
            endRange: "11",
            start: "2016-06-01",
            end: "2016-06-15",
            last: "2016-06-12",
            fuzzy: true
        },
        "中秋": {
            valid: true,
            value: "中秋",
            range: "11",
            endRange: "8",
            start: "2016-09-10",
            end: "2016-09-21",
            last: "2016-09-18",
            fuzzy: true
        },
        "国庆": {
            valid: true,
            value: "国庆",
            range: "15",
            endRange: "14",
            start: "2016-9-24",
            end: "2016-10-09",
            last: "2016-10-08",
            fuzzy: true
        }
    }
};
(function(e) {
    function i(e) {
        if (typeof e == "string") {
            if (r.test(e)) {
                return parseInt(e, 10)
            }
        }
        return e
    }

    function s(e, t) {
        if (e.compareDocumentPosition) return e === t || !!(e.compareDocumentPosition(t) & 16);
        if (e.contains && t.nodeType === 1) {
            return e.contains(t) && e !== t
        }
        while (t = t.parentNode)
            if (t === e) return true;
        return false
    }
    if (!e.bui) {
        e.bui = {}
    }
    var t = {};
    var n = {};
    var r = /^\d+$/;
    jQuery.expr[":"].focus = function(e) {
        return e === document.activeElement && (e.type || e.href)
    };
    e.RegisterUI = function(n, r) {
        if (t[n]) return;
        r = r || {};
        t[n] = function(t) {
            var n = this;
            this.el = t;
            this.$el = e(t);
            this._options = {};
            this._plugins = {};
            e.each(r.propertychange || {}, function(e, t) {
                n.on(e + "_changed", t)
            });
            e.each(r.properties || {}, function(e, t) {
                n._options[e] = t
            })
        };
        t[n].prototype = e.extend({
            options: function(t) {
                var n = this;
                e.each(t, function(e, t) {
                    n.set(e, t)
                })
            },
            dom: function() {
                return this.el
            },
            plugins: function(e, t) {
                if (t) {
                    this._plugins[e] = t
                } else {
                    return this._plugins[e]
                }
            },
            data: function(e, t) {
                if (arguments.length == 1) {
                    return this.get(e) || this.$el.data(n + "-" + e)
                } else {
                    this.$el.data(n + "-" + e, t);
                    this.set(e, t)
                }
            },
            set: function(t, n, r) {
                n = i(n);
                var s = {
                    name: t,
                    new_value: n,
                    old_value: this.get(t)
                };
                if (r != true) {
                    e(this).trigger(t + "_before_change", [s])
                }
                this._options[t] = s.new_value;
                if (r != true) {
                    e(this).trigger(t + "_changed", [n])
                }
            },
            get: function(e) {
                return this._options[e]
            },
            on: function(t, n) {
                e(this).bind(t, n)
            },
            un: function(t) {
                e(this).unbind(t)
            },
            fire: function() {
                var t = e(this);
                t.trigger.apply(t, Array.prototype.slice.apply(arguments))
            }
        }, r);
        e.fn[n] = function(r) {
            r = r || {};
            if (e.isPlainObject(r)) {
                return e.each(this, function() {
                    var i = e(this).data(n);
                    if (!i) {
                        var s = new t[n](this);
                        e(this).data(n, s);
                        s.options(r);
                        s.initialize()
                    } else {
                        e(this).data(n).options(r)
                    }
                })
            } else if (typeof r == "string") {
                var i = arguments[0];
                var s = Array.prototype.slice.call(arguments, 1);
                var o = e(this).data(n);
                if (e.isFunction(o[i])) {
                    return o[i].apply(o, s)
                }
            }
            return this
        }
    };
    e.RegisterPlugin = function(e, r, i, s) {
        if (!t[e]) {
            alert("not found UI[" + e + "]");
            return
        }
        var o = n[e] = n[e] || {};
        var u = o[r] = o[r] || {};
        u[i] = s
    };
    e.usePlugin = function(t, r) {
        e.each(n[r], function(n, r) {
            e.each(r, function(e, r) {
                if (t.data(n) === e) {
                    var i = function() {
                        this.ui = t;
                        this.initialize()
                    };
                    i.prototype = r;
                    t.plugins(n, new i)
                }
            })
        })
    };
    var o = e.fn.val;
    jQuery.fn.val = function(t) {
        var n = this[0];
        if (n && n.qcbox) {
            if (t != null) {
                if (e.trim(t) == "") {
                    n.qcbox.showPlaceHolder()
                } else {
                    n.qcbox.hidePlaceHolder()
                }
            }
        }
        return o.apply(this, Array.prototype.slice.apply(arguments))
    };
    e.RegisterUI("qcbox", {
        initialize: function() {
            var t = this;
            var n = this.$el;
            n[0].qcbox = this;
            var r = null;
            var i = this.data("customclass");
            n.parent().find(".qunar-qcbox").remove();
            var s = this.$wrap = n.before('<div class="qunar-qcbox' + (i ? " " + i : "") + '"><div class="qcbox-placeholder"></div><div class="qcbox-prefix"></div><div class="qcbox-info"><b class="iconfont f-location"></b></div></div>').after('<div class="qcbox-fixed js_hotcity"></div>').parent();
            var o = this.$fixed = s.find(".js_hotcity");
            var u = this.$handler = s.find(".qcbox-info b");
            n.addClass("textbox");
            if (this.data("hideicon")) {
                u.hide()
            }
            s.click(function(e) {
                t.fire("qcbox-focus")
            });
            e(document.body).bind("mouseup", function(n) {
                if (e(n.target).closest(".qunar-qcbox").length == 0) {
                    t.fire("qcbox-blur")
                }
            });
            s.mouseup(function(e) {
                n.focus()
            });
            n.bind("blur", function() {
                t.resetPlaceHolder();
                t.$el.closest(".qcbox").removeClass("qcbox_on")
            });
            n.bind("focus", function() {
                t.hidePlaceHolder();
                this.select();
                t.$el.closest(".qcbox").addClass("qcbox_on")
            });
            n.bind("showHotCity", function() {
                t.plugins("hotcity").showHotcity()
            });
            n.keyup(function(e) {
                switch (e.keyCode) {
                    case 9:
                        s.find(".qcbox-placeholder").hide();
                        break;
                    default:
                        break
                }
            });
            this._resetWidth();
            e.usePlugin(t, "qcbox");
            this._resetHotcity();
            this._resetPlaceHolder()
        },
        _resetHotcity: function() {
            function o() {
                var i = r.$el;
                var s = r.$fixed;
                if (!t.initialized) {
                    s.empty();
                    t.$hotcity = s.append("<div class='hotcity'><div>").find(".hotcity");
                    t.initializeStruct();
                    t.initialized = true
                }
                e(t).trigger("hotcity-preshow", [t]);
                t.$hotcity.show();
                n = 1;
                e(t).trigger("hotcity-show")
            }

            function u() {
                if (typeof t == "undefined" || !t.$hotcity) return;
                t.$hotcity.hide();
                n = 0;
                e(t).trigger("hotcity-hide")
            }
            var t = this.plugins("hotcity");
            if (!t) return;
            var n = 0;
            var r = this;
            var i = this.$el;
            var s = this.$wrap;
            t.attachedEl = t.attachedEl || new e;
            this.$el.keydown(function(e) {
                u()
            });
            t.attachedEl = t.attachedEl.add(s.find(".qcbox-info > b , .qcbox-info")).add(s.find(".qcbox-info > b , .qcbox-info > .qcbox-text ").add(s.find(".qcbox-placeholder")));
            e(document).bind("mouseup", function(n) {
                var r;
                if (i[0] === n.target && (r = 1) || ~t.attachedEl.index(n.target) && (r = 2)) {
                    if (!t.$hotcity || !t.$hotcity.is(":visible")) {
                        o()
                    } else {
                        u()
                    }
                    if (r == 2) i.focus();
                    return
                }
                if (!e(n.target).data("hotcity-nogo") && e(n.target).parents("[data-hotcity-nogo]").length == 0) u()
            });
            t.showHotcity = o;
            t.hideHotcity = u;
            return t
        },
        _resetPlaceHolder: function() {
            function r() {
                var n = t.$el.val();
                if (e.trim(n) == "") {
                    i()
                } else {
                    s()
                }
            }

            function i() {
                n.text(t.data("placeholder"));
                n.show()
            }

            function s() {
                n.hide()
            }
            var t = this;
            var n = this.$wrap.find(".qcbox-placeholder");
            r();
            this.showPlaceHolder = i;
            this.hidePlaceHolder = s;
            this.resetPlaceHolder = r
        },
        _resetWidth: function() {
            var e = this.$el;
            var t = this.$wrap;
            var n = this.data("prefix");
            if (n) {
                t.find(".qcbox-prefix").text(n);
                e.css({
                    left: t.find(".qcbox-prefix").outerWidth(true) + "px"
                })
            } else {
                t.find(".qcbox-prefix").remove()
            }
        }
    })
})(jQuery);
(function(e) {
    function s(e) {
        var t = e.offset();
        t["top"] += e.outerHeight();
        return t
    }

    function o(e) {
        return e.closest("table").data("data")[e.attr("data-ind") * 1]
    }

    function u(e) {
        var t = this;
        var n = t.visible();
        var r = e.keyCode;
        if (r === 40 && !n) {
            t.show();
            return
        }
        var i = t.el.find("tr");
        var s = i.filter(".active");
        switch (r) {
            case 38:
            case 40:
                if (n) {
                    t._excludeEl = t._mouseFocus;
                    s.removeClass("active");
                    var u = e.keyCode === 38 ? s.prev() : s.next();
                    if (u.size() === 0) u = i.filter(r === 38 ? ":last" : ":first");
                    var a = t.args.getData || o;
                    var f = a(u);
                    t.setValue(f);
                    u.addClass("active");
                    e.preventDefault();
                    t._trigger("q-suggest-user-action", [e.type, f, r])
                }
                break;
            case 13:
            case 27:
                if (n) {
                    t.hide();
                    t._trigger("q-suggest-user-action", [e.type, t.getValue(), r])
                }
                break;
            case 18:
            case 9:
                break;
            default:
        }
    }

    function a(e, t) {
        if (!this.init) return new qsuggest(e, t);
        else return this.init(e, t)
    }
    var t = function() {
        var e = "data-detect-oninput",
            t = {},
            n = {},
            r = 1,
            i = 1;
        var s = function(e, n, r, i) {
            if (e.addEventListener) e.addEventListener(n, r, false);
            else if (e.attachEvent) e.attachEvent("on" + n, r);
            (t[i] || (t[i] = [])).push({
                t: n,
                h: r
            })
        };
        var o = function(e, n) {
            if (!t[n]) return;
            for (var r = 0, i; i = t[n][r]; r++)
                if (e.removeEventListener) e.removeEventListener(i["t"], i["h"], false);
                else if (e.detachEvent) e.detachEvent("on" + i["t"], i["h"]);
            delete t[n]
        };
        var u = function(e, t) {
            var n = e.value;
            var r = function() {
                var i;
                if ((i = e.value) !== n) {
                    if (r._sleep !== true) t.call(e, i, n);
                    n = e.value
                }
            };
            return r
        };
        var a = navigator.userAgent.toLowerCase();
        return {
            version: "1.3",
            bind: function(t, o) {
                var f, l = o[e];
                if (!l) o[e] = l = r++;
                if (!(f = t.getAttribute(e))) t.setAttribute(e, f = "" + i++);
                var c = u(t, o);
                if ("oninput" in t && !/msie\s9/.test(a) && !/opera/.test(a)) s(t, "input", c, l);
                else {
                    var h;
                    s(t, "focus", function() {
                        if (!h) h = setInterval(c, 100)
                    }, l);
                    s(t, "blur", function() {
                        if (h) {
                            clearInterval(h);
                            h = null
                        }
                    }, l)
                }
                n[l] = {
                    eid: f,
                    checker: c
                };
                return t
            },
            unbind: function(t, r) {
                if (r[e]) {
                    o(t, r[e]);
                    delete n[r[e]]
                }
                return t
            },
            set: function(t, r) {
                var i = t.getAttribute(e);
                if (i) {
                    var s = [];
                    for (var o in n)
                        if (n[o]["eid"] === i) {
                            s.push(n[o]["checker"]);
                            n[o]["checker"]._sleep = true
                        }
                    t.value = r;
                    for (var u = 0, a = s.length; u < a; u++) {
                        s[u].call(t);
                        s[u]._sleep = false
                    }
                } else t.value = r
            }
        }
    }();
    e.qsuggest = {
        version: "1.2"
    };
    var n = e.qsuggest.ROOT_KEY = "q-suggest";
    var r = 0;
    var i = {
        ajax: {
            url: null,
            cache: false,
            success: function() {}
        },
        reader: function(e) {
            return e
        },
        loader: function(e) {
            return e
        },
        max: 10,
        min: 1,
        container: null,
        delay: 100,
        rdelay: 1e3,
        requestWithNothing: false,
        trimQuery: true,
        autoSelect: true,
        css: {
            "z-index": 500
        },
        setValue: function(e) {
            return e
        },
        render: function(e) {
            return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        },
        exattr: function(e) {
            return e
        }
    };
    e.extend(a.prototype, {
        init: function(s, a) {
            this.key = ++r;
            var f = this.ns = n + this.key;
            a = this.args = e.extend(true, {}, i, a || {});
            var l = this.activeEl = e(s);
            var c = this;
            this.el = e('<div class="' + n + (a.customClass ? " " + a.customClass : "") + '"></div>').appendTo(a["container"] || document.body).hide();
            this.el.data(n, this);
            this._handler = null;
            this._ajaxHandler = null;
            this._excludeEl = null;
            this._mouseFocus = null;
            this._last = [];
            this._cache = {};
            this._value = null;
            e.each(a["on"] || {}, function(e, t) {
                l.bind(e + "." + f, t)
            });
            if (a["css"]) this.el.css(c.args["css"]);
            var c = this;
            var h = false;
            l.bind("keydown." + f, function(e) {
                var t = e.keyCode;
                if (t >= 229) {
                    h = true
                }
            });
            t.bind(l[0], function() {
                c._trigger("q-suggest-inputChange");
                c.show()
            });
            l.bind("keydown." + f, function(e) {
                if (h) {
                    h = false;
                    return
                }
                var t = c.args.keyevent || u;
                t.call(c, e);
                h = false
            });
            l.bind("blur." + f, function(e) {
                if (c.visible()) {
                    var t = c.el.find(a.ACT_CLASS || "tr.active");
                    if (t.length > 0) {
                        var n = c.args.getData || o;
                        if (c.args.autoSelect) {
                            var r = n(t);
                            r && c.setValue(r)
                        }
                    } else {
                        c._trigger("q-suggest-noresult", [l])
                    }
                    c.hide()
                }
            });
            e("tr", this.el[0]).live("mouseover." + f + " mouseout." + f + " mousedown." + f, function(t) {
                var n = e.nodeName(t.target, "tr") ? e(t.target) : e(t.target).parents("tr").eq(0);
                if (e(n[0]).attr("data-sug_type") == 1) {
                    t.preventDefault();
                    return
                }
                var r = n[0] != c._excludeEl;
                if (t.type === "mouseover") {
                    if (r) {
                        n.parents().children().removeClass("active");
                        n.addClass("active");
                        c._excludeEl = null
                    }
                    c._mouseFocus = n[0]
                } else if (t.type === "mouseout") {
                    c._mouseFocus = null
                } else {
                    var i = c.args.getData || o;
                    c.setValue(i(n));
                    c.hide();
                    c._trigger("q-suggest-user-action", [t.type, c.getValue(), n.index(), null])
                }
            });
            this._trigger("q-suggest-init", [this]);
            return this
        },
        req: function() {
            var t = this;
            if (t._handler) clearTimeout(t._handler);
            if (t._timeoutHandler) {
                clearTimeout(t._timeoutHandler);
                t._timeoutHandler = null
            }
            if (t._ajaxHandler) {
                t._ajaxHandler = null
            }
            t._handler = setTimeout(function() {
                var n = t.activeEl.val(),
                    r = t.args.loader(n),
                    i = null,
                    s;
                var o = function() {
                    (t.args.draw || t.draw).apply(t, [].slice.call(arguments))
                };
                if (t.args.trimQuery) r = e.trim(r);
                if (!r && !t.args.requestWithNothing) {
                    o(null);
                    return
                }
                if (t._last && t._last[0] === r) {
                    o(t._last[1]);
                    return
                }
                if (t._last && t._last[0] == r) i = t._last;
                else if (t.args.cache && t._cache[r]) i = t._cache[r];
                var u = typeof t.args.ajax.url == "function" ? t.args.ajax.url() : t.args.ajax.url;
                if (i) o((t._last = i)[1]);
                else if (!u) o(null);
                else {
                    u = u.replace(/\*([^*]+)$/, encodeURIComponent(r) + "$1");
                    var a = t.args.ajax.success;
                    t._timeoutHandler = setTimeout(function() {
                        t.hide()
                    }, t.args.rdelay);
                    t._ajaxHandler = e.ajax(e.extend({}, t.args.ajax, {
                        url: u,
                        success: function(e, i) {
                            clearTimeout(t._timeoutHandler);
                            t._timeoutHandler = null;
                            t._ajaxHandler = null;
                            if (n !== t.activeEl.val()) return;
                            var s = t.args.reader.call(t, e, i);
                            if (t.type(s) === "Array") {
                                o(s, e);
                                t._last = t._cache[r] = [r, s, i]
                            }
                            a.apply(this, arguments)
                        }
                    }))
                }
            }, t.args.delay)
        },
        type: function(e) {
            return Object.prototype.toString.call(e).slice(8, -1)
        },
        show: function() {
            this.req()
        },
        hide: function() {
            if (this.visible()) {
                this.el.hide();
                this._trigger("q-suggest-hide")
            }
        },
        draw: function(t, n) {
            this.el.empty();
            var r = this.args.min,
                i = this.args.max,
                o = t ? t.length : 0;
            if (!t || !o || o < r) {
                this.hide();
                return
            }
            var u = t[0].country;
            var a = {
                country: "中国",
                txt: "所有地点",
                val: "所有地点",
                type: 0
            };
            var f = {
                country: u,
                txt: u,
                val: u,
                type: 0
            };
            if (this.args.allPlace && t[o - 1].val != a.val) {
                t.push(a)
            }
            var l = [],
                c = this.args.render,
                h = this.args.exattr,
                p = true;
            l.push('<table cellspacing="0" cellpadding="2"><tbody>');
            e.each(t, function(e, t) {
                if (e >= i) return false;
                var n = "";
                if (t.type !== 1 && p) {
                    p = false;
                    n = ' class="active'
                }
                if (t.exClass) {
                    n = n ? n + " " + t.exClass + '" ' : ' class="' + t.exClass + '" '
                } else {
                    n = n ? n + '" ' : ""
                }
                l.push("<tr", n, ' data-ind="', e, '" ', h(t), "><td>", c(t), "</td></tr>")
            });
            l.push("</tbody></table>");
            this._trigger("q-suggest-beforeshow", [this.el, n]);
            var d = e(l.join("")).appendTo(this.el).data("data", t);
            if (!this.args["container"]) this.el.css(s(this.activeEl));
            this.el.show();
            this._trigger("q-suggest-show", [t])
        },
        dispose: function() {
            this._trigger("q-suggest-dispose");
            this.activeEl.unbind("." + this.ns);
            e(window).unbind("." + this.ns);
            this.el.remove()
        },
        visible: function() {
            return this.el.is(":visible")
        },
        _trigger: function() {
            this.activeEl.triggerHandler.apply(this.activeEl, arguments)
        },
        setValue: function(e) {
            t.set(this.activeEl[0], e);
            this._value = e;
            this._setExtData();
            this._trigger("q-suggest-setvalue", [e, this.activeEl])
        },
        _setExtData: function() {
            var e = this.args.getExtData ? this.args.getExtData(this.el.find("tr.active")) : {};
            this._trigger("q-suggest-setextdata", [e, this.activeEl])
        },
        getValue: function() {
            return this._value
        },
        set: function(e, t) {
            var n = false;
            switch (e) {
                case "container":
                    this.el.appendTo(t || document.body);
                    this.el.css({
                        top: "",
                        left: ""
                    });
                    break
            }
            if (!n)
                for (var r = 0, i = e.split("."), s = i.length, o = this.args; r < s && (r !== s - 1 && (o[i[r]] || (o[i[r]] = {})) || (o[i[r]] = t)); o = o[i[r]], r++) {}
            return t
        },
        get: function(e) {
            for (var t = 0, n = this.args, r = e.split("."), i = r.length; t < i && (n = n[r[t]]); t++) {}
            return n
        }
    });
    e.fn.qsuggest = function() {
        var t = arguments;
        if (arguments.length > 1 && this.data(n)) {
            var r = null;
            if (arguments[0] === "option" || arguments[0] === "setting") this.each(function(i, s) {
                var o = e(s);
                var u = this.data(n);
                if (u) r = r || (t.length > 2 ? u.set(t[1], t[2]) : u.get(t[1]))
            });
            return r
        } else if (arguments.length <= 1) {
            this.each(function(r, i) {
                var s = e(i);
                if (s.data(n)) {
                    s.data(n).dispose();
                    s.removeData(n)
                }
                var o = new a(i, t[0]);
                s.data(n, o)
            })
        }
        return this
    }
})(jQuery);
(function(e) {
    function b(e, t) {
        e = e == null ? "" : e + "";
        for (var n = 0, r = t - e.length; n < r; n++) e = "0" + e;
        return e
    }

    function E(t) {
        if (e.inArray(t, p.work) > -1) {
            return '<span class="ban">班</span>'
        } else if (e.inArray(t, p.vacation) > -1) {
            return "<span>休</span>"
        } else {
            return ""
        }
    }

    function S(e) {
        var t = window.SERVER_TIME || new Date;
        var n = m[e];
        if (n && !n.fuzzy) {
            var r;
            if (n.range) {
                r = n.range
            } else {
                var i = parseInt(e.replace("月", "")) - 1,
                    s = t.getMonth(),
                    o = t.getFullYear(),
                    o = i < s ? t.getFullYear() + 1 : t.getFullYear(),
                    u = i == s ? t : new Date(o, i, 1),
                    a = new Date(o, i, (new Date(o, i + 1, 0)).getDate()),
                    r = parseInt(Math.abs(new Date(g.formatDate(a).replace(/-/g, "/")) - new Date(g.formatDate(u).replace(/-/g, "/"))) / 1e3 / 60 / 60 / 24)
            }
            n.startDate = new Date(u.getTime());
            n.endDate = new Date(u.getTime() + r * 24 * 3600 * 1e3)
        }
        if (n && n.fuzzy) {
            n.startDate = T(n.start);
            n.endDate = T(n.end);
            n.lastDate = T(n.last)
        }
        return n
    }

    function x() {
        return v
    }

    function T(e) {
        var t = e.split("-");
        return new Date(t[0], t[1] - 1, t[2])
    }

    function N(e) {
        var t = {};
        for (var n in e) {
            var r = n;
            var i = e[n];
            t[n] = i;
            var s = "";
            var o = "";
            if (i.beforeTime > 0) {
                for (var u = 1; u <= i.beforeTime; u++) {
                    var a = {};
                    var f = new Date(T(r).getTime() - u * 24 * 3600 * 1e3);
                    var l = C(f);
                    a.holidayName = i.holidayName + d.before + u + d.day;
                    a.dayindex = i.dayindex;
                    if (!t[l]) {
                        t[l] = a
                    } else {
                        if (i.dayindex > t[l].dayindex && t[l].beforeTime == null) {
                            t[l] = a
                        }
                    }
                }
            }
            if (i.afterTime > 0) {
                for (var u = 1; u <= i.afterTime; u++) {
                    var a = {};
                    var c = new Date(T(r).getTime() + u * 24 * 3600 * 1e3);
                    var h = C(c);
                    a.holidayName = i.holidayName + d.after + u + d.day;
                    a.dayindex = i.dayindex;
                    if (!t[h]) {
                        t[h] = a
                    } else {
                        if (i.dayindex > t[h].dayindex && t[C(new Date(f))].afterTime == null) {
                            t[h] = a
                        }
                    }
                }
            }
        }
        return t
    }

    function C(e) {
        if (typeof e == "number") {
            e = new Date(e)
        }
        return e.getFullYear() + "-" + k(e.getMonth() + 1) + "-" + k(e.getDate())
    }

    function k(e) {
        return e < 10 ? "0" + e : e
    }

    function L(e) {
        e.setHours(0);
        e.setMinutes(0);
        e.setSeconds(0);
        e.setMilliseconds(0);
        return e
    }

    function A(e) {
        var t = e.offset();
        t["top"] += e.outerHeight();
        return t
    }

    function O(t) {
        var n;
        if (t && !t.nodeType) n = jQuery.event.fix(t || window.event).target;
        else n = t;
        if (!n) return null;
        var i = e(n).parents("." + r);
        return i.size() > 0 ? i.eq(0).data(r) : null
    }

    function M() {}

    function _(e, t) {
        if (!this.init) return new _(e, t);
        else return this.init(e, t)
    }
    var t = "";
    if (window.location.href.indexOf("oneway_list") > -1) {
        t = "$jex.log({s:'flight',p:'onewayList',r:'searchboxClick',type:'month'});"
    }
    if (window.location.href.indexOf("roundtrip_list_new") > -1) {
        t = "$jex.log({s:'flight',p:'roundtripList',r:'searchboxClick',type:'month'});"
    }
    var n = "";
    if (window.location.href.indexOf("oneway_list") > -1) {
        n = "$jex.log({s:'flight',p:'onewayList',r:'searchboxClick',type:'holiday'});"
    }
    if (window.location.href.indexOf("roundtrip_list_new") > -1) {
        n = "$jex.log({s:'flight',p:'roundtripList',r:'searchboxClick',type:'holiday'});"
    }
    e.fdatepicker = {};
    var r = e.fdatepicker.ROOT_KEY = "q-datepicker-fly";
    var i;
    var s;
    var o;
    var u = [];
    var a = false;
    var f = 0;
    var l = 0;
    var c = FlightCalendarConf;
    var h = c.HolidayData;
    var p = c.WorkHoliday;
    var d = c.TransDateEx;
    var v = c.fuzzyDate0;
    var m = c.fuzzyDate;
    var g = {
        LANG: {
            prev: "",
            next: "",
            day_names: ["日", "一", "二", "三", "四", "五", "六"],
            OUT_OF_RANGE: "超出范围",
            ERR_FORMAT: "格式错误"
        },
        CLASS: {
            group: "g",
            header_mc: "m-h",
            header: "h",
            cld_mc: "m-c",
            cld_wp: "c-wp",
            calendar: "c",
            next: "e-n",
            prev: "e-p",
            title: "t",
            week: "w",
            month: "cm_",
            prc_wp: "m-p",
            tax_wp: "e-t",
            day_default: "st",
            day_selected: "st-a",
            day_othermonth: "st-s",
            day_today: "st-t",
            day_hover: "st-h",
            day_disabled: "st-d",
            day_round: "st-a-r",
            day_holiday: "st-holi-",
            day_area_bg: "st-area"
        },
        WEEKDAYS: 7,
        STARTDAY: 1,
        showOtherMonths: false,
        defaultDay: "",
        disabledDays: "",
        customClass: "",
        customActiveClass: "",
        multi: 2,
        showTip: true,
        linkTo: null,
        linkRules: "",
        refObj: null,
        forceCorrect: true,
        loadMonthStore: [],
        dataStore: {},
        leftBtn: null,
        rightBtn: null,
        curMonthMove: {},
        cldWrap: null,
        hasTax: false,
        formatTitle: function(e) {
            return e.getFullYear() + "年" + (e.getMonth() + 1) + "月"
        },
        showOnInit: false,
        showOnFocus: false,
        container: null,
        minDate: null,
        maxDate: null,
        ui: null,
        sDay: null,
        endDay: null,
        pos: "",
        parseDate: function(e) {
            var t = e.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
            return t ? new Date(t[1], t[2] * 1 - 1, t[3]) : null
        },
        formatDate: function(e) {
            return e.getFullYear() + "-" + b(e.getMonth() + 1, 2) + "-" + b(e.getDate(), 2)
        },
        minuteDate: function(e) {
            var t = window.SERVER_TIME || new Date;
            t = new Date(t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate());
            return (e - t) / (24 * 60 * 60 * 1e3)
        },
        today: function() {
            var e = window.SERVER_TIME || new Date;
            e = new Date(e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate());
            return this.formatDate(e)
        },
        plus: function(e, t) {
            return new Date(e.getTime() + t * 24 * 60 * 60 * 1e3)
        }
    };
    var y = function() {
        var t = this;
        for (var n = 0, r = arguments.length; n < r; n++) e.each(arguments[n], function(e, n) {
            var r;
            if (t.prototype[e] && jQuery.isFunction(t.prototype[e])) r = t.prototype[e];
            t.prototype[e] = n;
            if (r) t.prototype[e]["_PARENT_"] = r
        });
        if (!t.prototype["parent"]) t.prototype["parent"] = function() {
            return arguments.callee.caller["_PARENT_"].apply(this, arguments)
        }
    };
    var w = N(h);
    M.implement = y;
    e.extend(M.prototype, {
        isUI: 1,
        init: function() {
            var t = this,
                n = this.picker,
                r = n.ns;
            t.attachedEl = t.attachedEl || new e;
            e(document).bind("mousedown." + r, function(e) {
                var r, i;
                if (n.activeEl[0] === e.target && (r = 1) || t.attachedEl.index(e.target) != -1 && (r = 2)) {
                    if (!n.visible()) {
                        i = S(n.activeEl.val());
                        t.drawDate = i ? i.startDate : t.drawDate;
                        setTimeout(function() {
                            n.show(t.getDate())
                        }, 0)
                    } else {
                        n.hide()
                    }
                    if (r == 2) n.activeEl.focus();
                    return
                }
                var s;
                if ((s = O(e)) && s.key === n.key) return;
                else n.hide()
            });
            var i = function() {
                if (!n.get("container")) n.getContainer().css(A(n.activeEl))
            };
            i();
            e(window).bind("load." + r + " resize." + r, i);
            n.activeEl.bind("focus." + r, function(e) {
                if (n.get("showOnFocus")) n.show(t.getDate())
            });
            n.activeEl.bind("keydown." + r, function(e) {
                switch (e.keyCode) {
                    case 40:
                        t.setDate(new Date(t.getDate().getTime() + 24 * 60 * 60 * 1e3));
                        var r = t.validate();
                        if (!r.success) {
                            return
                        }
                        n.show(t.getDate());
                        break;
                    case 38:
                        t.setDate(new Date(t.getDate().getTime() - 24 * 60 * 60 * 1e3));
                        var r = t.validate();
                        if (!r.success) {
                            return
                        }
                        n.show(t.getDate());
                        break;
                    case 9:
                    case 27:
                        n.hide();
                        break;
                    default:
                        t.onKeyDown(e)
                }
            })
        },
        _init: function(e) {
            this.picker = e
        },
        select: function(e) {
            this.picker.activeEl.val(this.picker.args.formatDate(e))
        },
        posHandler: function(e, t) {
            var n = this.picker.activeEl.attr("data-pos"),
                r = e,
                i, s = t.parseDate(this.picker.activeEl.val()),
                o = s ? s.getMonth() : (window.SERVER_TIME || new e).getMonth();
            i = new Date(r);
            i.setDate(1);
            return i
        },
        change: function(t, n, r) {
            var i = this;
            var s = i.picker.args,
                o = s.leftBtn,
                u = s.rightBtn,
                a = s.cldWrap;
            var f = i.picker.get("minDate"),
                c = i.picker.get("maxDate");
            var h = r == "+1M" ? false : true;
            var p = new Date(new Date(n.getFullYear(), n.getMonth(), 1));
            var d = s.parseDate(s.formatDate(p));
            var v = s.parseDate(s.formatDate(p));
            v.setMonth(v.getMonth() + 1);
            s.curMonthMove = h ? d : v;
            if (e.inArray(s.curMonthMove.getMonth(), s.loadMonthStore) == -1) {
                i.drawNewMonth(h, s.curMonthMove);
                i.picker._trigger("q-datepicker-change-prc", [t, p, r]);
                h ? a.css({
                    left: "-=" + l + "px"
                }) : "";
                s.loadMonthStore.push(s.curMonthMove.getMonth())
            } else if (s.loadMonthStore.length == 12) {
                var m = a.find(".c");
                var g = h ? m.last().data("month") : m.first().data("month");
                if (s.curMonthMove.getMonth() == g) {
                    h ? m.last().remove() : m.first().remove();
                    i.drawNewMonth(h, s.curMonthMove);
                    i.picker._trigger("q-datepicker-change-prc", [t, p, r]);
                    h ? a.css({
                        left: "-=" + l + "px"
                    }) : a.css({
                        left: "+=" + l + "px"
                    })
                }
            }
            if (h) {
                !f || f.getFullYear() < t.getFullYear() || f.getFullYear() === t.getFullYear() && f.getMonth() < t.getMonth() - 1 ? o.removeClass("e-dis") : o.addClass("e-dis");
                u.removeClass("e-dis")
            } else {
                !c || c.getFullYear() > t.getFullYear() || c.getFullYear() === t.getFullYear() && c.getMonth() > t.getMonth() + 1 ? u.removeClass("e-dis") : u.addClass("e-dis");
                o.removeClass("e-dis")
            }
        },
        renderDateWraper: function(t, n) {
            var r = this;
            r.drawDate = t;
            L(t);
            var i = r.picker.getContainer(),
                s = r.picker.args,
                o = s["CLASS"],
                u = s["LANG"],
                a = s.hasTax,
                f = s.minDate,
                l = s.maxDate;
            var c = [];
            s.dataStore = {};
            s.loadMonthStore.length = 0;
            c.push('<div class="' + o["group"] + '" style="display:none;">');
            c.push('<div class="' + o["header_mc"] + '">');
            c.push('<p class="' + o["next"] + "", !l || l.getFullYear() > t.getFullYear() || l.getFullYear() === t.getFullYear() && l.getMonth() > t.getMonth() + 1 ? "" : " e-dis", '"><span href="#" class="iconfont chevron-right" onclick="QDP.change( event , \'+1M\' );return false;">', u["next"], "</span></p>");
            c.push('<p class="' + o["prev"] + "", !f || f.getFullYear() < t.getFullYear() || f.getFullYear() === t.getFullYear() && f.getMonth() < t.getMonth() ? "" : " e-dis", '"><span href="#" class="iconfont chevron-left" onclick="QDP.change( event , \'-1M\' );return false;">', u["prev"], "</span></p>");
            c.push("</div>");
            c.push('<div class="' + o["cld_mc"] + '">');
            c.push('<div class="' + o["cld_wp"] + '">');
            c.push("</div>");
            c.push("</div>");
            c.push('<div class="' + o["prc_wp"] + '">');
            c.push('<div class="e_r">');
            if (r.picker.isSupportPrc) {
                c.push('    <div class="' + o["tax_wp"] + ' js_prc_change" style="display:none;">');
                c.push('        <span class="' + (a ? "" : "cur") + '" data-set="">未含税</span><span class="' + (a ? "cur" : "") + '" data-set="tax">含税总价</span>');
                c.push("    </div>")
            }
            if (window.QNR.isLocal) {
                c.push("    当前为出发地时间")
            }
            c.push("</div>");
            r.picker.isFuzzy && c.push(r._drawFuzzyDate());
            c.push("</div>");
            c.push("</div>");
            e(c.join("")).appendTo(i.empty()).show();
            s.leftBtn = i.find("." + o["prev"]);
            s.rightBtn = i.find("." + o["next"]);
            s.cldWrap = i.find("." + o["cld_wp"]);
            r.picker.isFuzzy && window.QNR.isLocal && r.bindFuzzyEvent(i)
        },
        bindFuzzyEvent: function(t) {
            var n = t.find(".js_fuzzy_wp .m-fuzzy-box").width();
            t.find(".js_fuzzy_wp").addClass("e_fuzzy_w").bind("mouseenter", function(t) {
                var n = e(this).parent().width() + 15;
                e(this).find(".m-fuzzy-box").animate({
                    width: n + "px"
                }, 200)
            }).bind("mouseleave", function() {
                e(this).find(".m-fuzzy-box").animate({
                    width: n + "px"
                }, 200)
            })
        },
        renderPanelHTML: function(e, t, n) {
            var r = this;
            var i = r.picker.args,
                s = i.multi,
                o = i["CLASS"];
            var u = [],
                a;
            a = r.posHandler(e, i);
            for (var f = 0; f < t; f++) {
                u.push('<div class="' + o["calendar"] + '" data-month="' + a.getMonth() + '">');
                u.push(r._drawTitle(a));
                n ? u.push(r._drawBody(a, n)) : u.push(r._drawBody(a));
                u.push("</div>");
                a.setMonth(a.getMonth() + 1)
            }
            return u.join("")
        },
        drawPanel: function(t, n) {
            var r = this;
            var i = r.picker.args,
                s = r.picker.args.cldWrap;
            var o = r.renderPanelHTML(t, i.multi, n);
            s.empty().append(e(o));
            r.picker.selectUi()
        },
        drawNewMonth: function(t, n, r) {
            var i = this;
            var s = i.picker.args.cldWrap;
            var o = i.renderPanelHTML(n, 1, r);
            t ? e(o).prependTo(s) : e(o).appendTo(s)
        },
        draw: function(t) {
            var n = this;
            var r = n.picker.args;
            var i = S(n.picker.activeEl.val());
            r.activeDate = r.parseDate(n.picker.activeEl.val()) || i && i.startDate;
            n.renderDateWraper(t);
            n.drawPanel(t);
            l = e(n.picker.args.cldWrap.find(".c")[0]).width();
            r.loadMonthStore.push(t.getMonth(), t.getMonth() + 1)
        },
        dispose: function() {
            var t = "." + this.picker.ns;
            e(document).unbind(t);
            e(window).unbind(t)
        },
        getDate: function() {
            var e = this.picker.activeEl.val();
            var t = S(e);
            var n = t && t.valid ? t.startDate : this.picker.get("parseDate")(e);
            return n != n ? null : n
        },
        setDate: function(e) {
            this.picker.activeEl.val(this.picker.get("formatDate")(e))
        },
        onBeforeDraw: function(e) {
            var t = this;
            var n = function(e, t) {
                if (e.getFullYear() > t.getFullYear()) return 1;
                else if (e.getFullYear() === t.getFullYear()) return (e.getMonth() - t.getMonth()) / (Math.abs(e.getMonth() - t.getMonth()) || 1);
                else return -1
            };
            if (this.selectedDate && this.drawDate) e.setTime(this.drawDate.getTime());
            else {
                var r = this.picker,
                    i = r.get("minDate"),
                    s = r.get("maxDate"),
                    o = r.get("multi");
                var u = new Date(e.getFullYear(), e.getMonth() + o - 1, 1);
                if (s && n(u, s) > 0)
                    for (var a = 1; s && o && o > 1 && o - a > 0; a++) {
                        u = new Date(e.getFullYear(), e.getMonth() + o - a - 1, 1);
                        if (n(u, s) <= 0) {
                            u.setMonth(u.getMonth() - o + 1);
                            break
                        }
                    } else u = null;
                if (u && (!i || u.getTime() >= i.getTime())) e.setTime(u.getTime())
            }
        },
        onKeyDown: function(e) {},
        onSet: function() {
            this.selectedDate = null
        },
        _drawTitle: function(e) {
            var t = this.picker.args;
            var n = t["CLASS"];
            var r = [];
            r.push('<div class="' + n["header"] + '">');
            r.push('<div class="' + n["title"] + '">', t.formatTitle(e), "</div>");
            r.push("</div>");
            return r.join("")
        },
        _drawBody: function(t, n) {
            var r = this.picker.args,
                i = r["STARTDAY"],
                s = r["WEEKDAYS"],
                o = r["LANG"],
                u = r["CLASS"],
                a = r.activeDate,
                f = r.minDate,
                l = r.maxDate;
            if (a && a != a) a = null;
            var c = window.SERVER_TIME || new Date;
            var p = [];
            p.push('<div class="thwrap"><table cellspacing="0" cellpadding="0" border="0"><thead><tr>');
            for (var d = 0; d < s; d++) {
                var v = (i + d) % s;
                p.push('<th class="' + u["week"] + v + '">', o["day_names"][v] || "", "</th>")
            }
            p.push("</tr></thead></table></div>");
            p.push('<div class="tdwrap"><table cellspacing="0" cellpadding="0" border="0"><tbody>');
            var m = [];
            var g = t.getFullYear(),
                y = t.getMonth() + 1;
            var b = new Date(g, y - 1, 1);
            var w = 1,
                S = (new Date(g, y, 0)).getDate();
            var x = b.getDay() - i;
            while (x < 0) x += s;
            var T = w - x;
            var N = s - ((1 - T + S) % s || s) + S;
            for (var d = T, C = 0; d <= N; d++, C++) {
                var k = new Date(g, y - 1, d);
                var L = r.formatDate(k);
                if (C % s == 0) m.push("</tr>", "<tr>");
                var v = (i + C) % s;
                m.push('<td class="' + u["week"] + v + " " + u["day_default"]);
                var A = false;
                if (e.grep(["getFullYear", "getMonth", "getDate"], function(e) {
                        return k[e]() == c[e]()
                    }).length == 3) m.push(" " + u["day_today"]);
                if (a != null && a.getTime() == k.getTime()) m.push(" " + u["day_selected"]);
                var O = false;
                if (d < 1 || d > S) {
                    m.push(" " + u["day_othermonth"]);
                    O = true
                }
                var M = r.formatDate(k).replace(/-/g, "") * 1;
                var _ = f && r.formatDate(f).replace(/-/g, "") * 1;
                var D = l && r.formatDate(l).replace(/-/g, "") * 1;
                if (f && M < _ || l && M > D || ~r.disabledDays.toString().indexOf(L)) {
                    if (!O) {
                        m.push(" " + u["day_disabled"])
                    }
                    A = true
                }
                var P = this._getDateClass(k);
                if (P && !O) m.push(" " + P);
                m.push('"');
                if (!A) {
                    m.push(' onclick="QDP.select(event,new Date(' + k.getFullYear() + "," + k.getMonth() + "," + k.getDate() + "));", 'return false;"')
                }
                if (!A && !O) {
                    m.push(" data-sort=" + r.minuteDate(k) + ">")
                } else {
                    m.push('data-info = "disable">')
                }
                if (!O || r.showOtherMonths) {
                    m.push('<div class="t-d">');
                    m.push('   <div class="d-t">');
                    m.push(E(L));
                    m.push("    </div>");
                    m.push('<span class="');
                    var H = h[L];
                    dateText = k.getDate();
                    if (!A && H && H.holidayClass) {
                        m.push(" " + u["day_holiday"] + "default");
                        m.push(" " + u["day_holiday"] + H.holidayClass);
                        dateText = H.holidayName
                    }
                    m.push('">');
                    var B = window.SERVER_TIME || new Date;
                    if (k.getMonth() === B.getMonth() && k.getFullYear() === B.getFullYear() && dateText === B.getDate() && r.minuteDate(k) === 0) {
                        dateText = "今天"
                    }
                    m.push(dateText);
                    m.push("</span>");
                    if (n) {
                        var j = "";
                        var F = "";
                        var I = n[L];
                        if (I) {
                            var q = !r.hasTax ? I.price : I.total_price;
                            j = '<i class="rmb">&yen;</i>' + q;
                            F = (!r.hasTax ? I.isLow : I.isTotalLow) ? "d-b-low" : ""
                        }
                        m.push('    <div class="d-b ' + F + '">' + j + "</div>")
                    } else {
                        m.push('<div class="d-b">&nbsp;</div>')
                    }
                    m.push("</div>")
                } else {
                    m.push("&nbsp;")
                }
                m.push("</td>")
            }
            p.push(m.length > 0 ? m.slice(1, -1).join("") : "");
            if (x + N <= 35) {
                p.push("<tr>");
                for (var d = 0; d < s; d++) {
                    p.push('<td class="w3 st st-s" data-info="disable">&nbsp;</td>')
                }
                p.push("</tr>")
            }
            p.push("</tbody></table></div>");
            return p.join("")
        },
        _drawFuzzyDate: function() {
            var r = [],
                i = this,
                s, o, u;
            var a = 0;
            r.push('<div class="e_fuzzy ' + (window.QNR.isLocal ? "e_fuzzy_w " : "") + 'js_fuzzy_wp">');
            r.push('<i class="iconfont caret-right"></i>');
            r.push('<div class="m-fuzzy-box">');
            r.push(' <ul class="m-fuzzy-lst clrfix">');
            o = i.picker.activeEl.val();
            s = S(o) ? o : "";
            u = x();
            var f = this.picker.args;
            var l = window.SERVER_TIME || new Date,
                c = l.getMonth(),
                h = l.getFullYear();
            for (var p = 0; p < 5; p++) {
                month = c + p;
                if (month > 12) {
                    month -= 12;
                    year = h + 1
                } else {
                    year = h
                }
                start = p == 0 ? l : new Date(year, month, 1);
                end = new Date(year, month, (new Date(year, month + 1, 0)).getDate());
                label = start.getMonth() + 1 + "月";
                val = f.formatDate(start).replace(/-/g, "/");
                iDays = parseInt(Math.abs(new Date(f.formatDate(end).replace(/-/g, "/")) - new Date(f.formatDate(start).replace(/-/g, "/"))) / 1e3 / 60 / 60 / 24);
                r.push('<li data-value="', label, '" data-range="', iDays, '"');
                r.push('onclick="QDP.fuzzyselect(event,new Date(' + (new Date(val)).getFullYear() + "," + (new Date(val)).getMonth() + "," + (new Date(val)).getDate() + "));", t, 'return false;"');
                r.push(">", label, "</li>");
                a++
            }
            e.each(u, function(e, t) {
                var i = S(t);
                _class = s == t ? "st-h" : "";
                if (t == "抗战胜利日" || t == "中秋&国庆") {
                    _class += " st-w"
                }
                if (i.lastDate > SERVER_TIME && a < 9) {
                    r.push('<li data-value="', i.value, '" class="', _class, '" data-range="', i.range, '"');
                    r.push('onclick="QDP.fuzzyselect(event,new Date(' + i.startDate.getFullYear() + "," + i.startDate.getMonth() + "," + i.startDate.getDate() + "));", n, 'return false;"');
                    r.push(">", t, "</li>");
                    a++
                }
            });
            r.push(" </ul>");
            r.push("</div>");
            r.push("</div>");
            return r.join("")
        },
        _getDateClass: function(t) {
            var n = this.picker.args;
            var r = n.formatDate(t);
            var i = "";
            var s = this.picker.activeEl.val();
            var o = S(s);
            var u = o ? n.formatDate(o.startDate) : s;
            var a = parseInt(r.replace(/-/g, ""), 10);
            var f = parseInt(u.replace(/-/g, ""), 10);
            var l, c, p, d, v, m, g;
            var y = this.picker.activeEl.attr("name") == "fromDateMulti";
            if (this.picker.get("linkTo") && !y) {
                m = this.picker.get("linkTo").data(e.fdatepicker.ROOT_KEY);
                l = m.activeEl.val();
                c = S(l);
                p = c ? n.formatDate(c.endDate) : l;
                v = parseInt(u.replace(/-/g, ""));
                ecurrVal = parseInt(p.replace(/-/g, ""));
                n.sDay = u;
                n.endDay = p;
                if (typeof s != "undefined" && a == v) {
                    i = this.addRoundClass("FROM")
                }
                if (m) {
                    if (typeof m.activeEl.val() != "undefined" && a == ecurrVal) {
                        i = this.addRoundClass("BACK")
                    }
                }
                if (a < ecurrVal && a > v) {
                    i = this.addRoundClass("AREAR")
                }
            } else if (this.picker.get("refObj")) {
                g = this.picker.get("refObj").data(e.fdatepicker.ROOT_KEY);
                l = g.activeEl.val();
                c = S(l);
                p = c ? n.formatDate(c.startDate) : l;
                u = o ? n.formatDate(o.endDate) : s;
                v = parseInt(p.replace(/-/g, ""));
                ecurrVal = parseInt(u.replace(/-/g, ""));
                n.sDay = p;
                n.endDay = u;
                if (typeof this.picker.activeEl.val() != "undefined" && a == ecurrVal) {
                    i = this.addRoundClass("BACK")
                }
                if (g) {
                    if (typeof g.activeEl.val() != "undefined" && a == v) {
                        i = this.addRoundClass("FROM")
                    }
                }
                if (a > v && a < ecurrVal) {
                    i = this.addRoundClass("AREAR")
                }
            } else if (o && a >= f) {
                ecurrVal = parseInt(n.formatDate(o.endDate).replace(/-/g, ""));
                v = parseInt(n.formatDate(o.startDate).replace(/-/g, ""));
                n.sDay = n.formatDate(o.startDate);
                n.endDay = n.formatDate(o.endDate);
                if (a < ecurrVal) {
                    i = this.addRoundClass("AREAR")
                }
                if (a == ecurrVal) {
                    i = this.addRoundClass("BACK")
                }
                if (a == v) {
                    i = this.addRoundClass("FROM")
                }
            }
            if (h[r]) i += " " + "holi";
            return e.trim(i)
        }
    });
    window.QDP = {};
    e.each(["select", "change", "_trigger", "fuzzyselect"], function(e, t) {
        window.QDP[t] = function() {
            a = false;
            if (!arguments[0]) return;
            var e = O(arguments[0]);
            if (e && e[t]) {
                if (t === "select" || t === "fuzzyselect") {
                    return e[t].apply(e, Array.prototype.slice.call(arguments))
                } else {
                    return e[t].apply(e, Array.prototype.slice.call(arguments, 1))
                }
            }
        }
    });
    e.extend(_.prototype, {
        init: function(t, n) {
            n = n || {};
            if (n["ui"]) {
                if (n["ui"]["isUI"]) this.ui = n["ui"];
                else if (typeof n["ui"] == "string" && e.fdatepicker.uis[n["ui"]]) this.ui = new e.fdatepicker.uis[n["ui"]]
            }
            if (!this.ui) this.ui = new M;
            this.ui._init(this);
            n = this.args = e.extend(true, {}, g, n || {});
            this.key = ++f;
            var i = this.ns = r + this.key;
            var s = this.activeEl = e(t);
            this.el = e('<div class="' + r + '"></div>').appendTo(this.args["container"] || document.body).hide();
            e(this.el).data(r, this);
            this.ui.init();
            this.lastShowedDate = null;
            this.showedDate = null;
            if (n["showOnInit"]) this.show();
            e.each(n["on"] || {}, function(e, t) {
                s.bind(e + "." + i, t)
            });
            return this
        },
        _trigger: function() {
            this.activeEl.triggerHandler.apply(this.activeEl, arguments)
        },
        select: function() {
            if (arguments.length > 1) {
                var t = arguments[0] || window.event;
                date = arguments[1]
            } else {
                var t = t || window.event;
                date = arguments[0]
            }
            if (t) {
                var n = t.srcElement ? t.srcElement : t.target;
                if (e(n).parents("." + this.args.CLASS["calendar"]).data("index") === 1) {
                    this.activeEl.attr("data-pos", "right")
                }
                if (e(n).parents("." + this.args.CLASS["calendar"]).data("index") === 0) {
                    this.activeEl.attr("data-pos", "left")
                }
            }
            this.ui.select(date);
            this.hide();
            this._trigger("q-datepicker-select", [date])
        },
        setFuzzy: function(e) {
            this.isFuzzy = e
        },
        supportPrice: function(e, t) {
            this.isSupportPrc = e;
            e && this.activeEl.datepirce(t)
        },
        fuzzyselect: function() {
            var t = function(t) {
                e(u).each(function(e, n) {
                    n.fuzzyInput(t);
                    n.autoCheck.call(n)
                })
            };
            e(u).each(function(e, n) {
                n.picker.activeEl.bind("blur." + n.picker.ns, t)
            });
            var n = arguments[0].srcElement || arguments[0].target,
                r, i;
            this.activeEl.attr("data-pos", "left");
            i = e(n).data("value");
            a = true;
            this.activeEl.val(i);
            o = n;
            this.ui.fuzzyselect(arguments[1]);
            this.hide();
            if (this.get("linkTo")) {
                r = this.get("linkTo").data(e.fdatepicker.ROOT_KEY);
                r.activeEl.val(i) && r.ui.fuzzyselect(arguments[1])
            } else if (this.get("refObj")) {
                r = this.get("refObj").data(e.fdatepicker.ROOT_KEY);
                if (r.activeEl.val().indexOf("周") != -1 && i.indexOf("周") != -1) {
                    return
                }
                r.activeEl.val(i);
                r.ui.fuzzyselect(arguments[1])
            }
            this.activeEl.val(i)
        },
        _selectTd: function(t, n, r) {
            for (var i = parseInt(t), s = n; i < s; i++) {
                e("td[data-sort='" + i + "']:not('.st-d')").addClass(g.CLASS["day_area_bg"])
            }
        },
        selectUi: function() {
            var t = this,
                n, r, i, s, a, f, l;
            l = t.activeEl.val();
            var c = t.args.minuteDate(new Date(l.replace(/-/g, "/")));
            var h = t.activeEl[0]["id"];
            var p = S(l);
            var d = this.el;
            s = this.args;
            if (s.sDay) r = s.minuteDate(new Date(s.sDay.replace(/-/g, "/")));
            if (s.endDay) i = s.minuteDate(new Date(s.endDay.replace(/-/g, "/")));
            var v = d.find("td[data-sort='" + r + "']"),
                m = d.find("td[data-sort='" + i + "']");
            d.undelegate(".fly").delegate('td:not(".st-d")', {
                "mouseenter.fly": function(o) {
                    if (e(this).data("info") === "disable") {
                        return
                    }
                    if (S(t.activeEl.val())) {
                        e(this).addClass(s.CLASS["day_hover"]);
                        return
                    }
                    e(this).addClass(s.CLASS["day_hover"]);
                    a = e(this).parents(".ch_sch_form");
                    if (!S(t.activeEl.val()) && a.find("[data-type = 'oneWay']").length < 1) {
                        n = parseInt(e(this).attr("data-sort"));
                        if (r === i && c === r && t.activeEl.attr("name") === "fromDate" && n > i) {
                            return
                        }
                        if (r === i && c === r && t.activeEl.attr("name") === "toDate") {
                            m.addClass(s.CLASS["day_selected"] + " " + g.CLASS["day_round"])
                        }
                        if (n > r - 1 && n < i + 1) {
                            d.find("td").removeClass(s.CLASS["day_area_bg"]);
                            if (c === i) {
                                m.removeClass(s.CLASS["day_selected"]).removeClass("st-a-r");
                                t._selectTd(r + 1, n)
                            } else {
                                v.removeClass(s.CLASS["day_selected"]);
                                t._selectTd(n + 1, i)
                            }
                        }
                        if (n < r) {
                            if (c === i) {} else {
                                d.find("td").removeClass(s.CLASS["day_area_bg"]);
                                v.removeClass(s.CLASS["day_selected"]);
                                t._selectTd(n + 1, i)
                            }
                        }
                        if (n > i) {
                            d.find("td").removeClass(s.CLASS["day_area_bg"]);
                            if (c === i) {
                                t._selectTd(r + 1, n)
                            } else {
                                d.find("td.st-a").removeClass("st-a")
                            }
                        }
                    }
                },
                "mouseleave.fly": function() {
                    if (e(this).data("info") === "disable") {
                        return
                    }
                    if (S(t.activeEl.val())) {
                        e(this).removeClass(s.CLASS["day_hover"]);
                        return
                    }
                    e(this).removeClass(s.CLASS["day_hover"]);
                    if (!p && a && a.find("[data-type = 'oneWay']").length < 1) {
                        d.find("td").removeClass(s.CLASS["day_area_bg"]);
                        v.addClass(s.CLASS["day_selected"]);
                        m.addClass(s.CLASS["day_round"]);
                        t._selectTd(r + 1, i)
                    }
                }
            });
            d.find('li:not(".st-h")').unbind().bind("mouseover", function() {
                e(u).each(function(e, t) {
                    t.picker.activeEl.unbind("blur")
                });
                e(this).addClass(s.CLASS["day_hover"]);
                var n, r;
                var o = 1,
                    f = e(this).attr("data-range");
                var l = d.find(".st-a");
                if (l.length === 0) {
                    l = d.find(".st-a-r")
                }
                d.find(".st-a").removeClass("st-a");
                d.find(".st-area").removeClass("st-area");
                d.find(".st-a-r").removeClass("st-a-r");
                var h = e(this).attr("onclick").match(/\d+/g);
                var p = new Date(h[0], h[1], h[2]);
                o = g.minuteDate(p);
                a = e(this).parents(".ch_sch_form");
                if (a.find("[data-type = 'oneWay']").length < 1) {
                    d.find("td").removeClass(s.CLASS["day_area_bg"]);
                    v.removeClass(s.CLASS["day_selected"]);
                    m.removeClass(s.CLASS["day_selected"] + " " + g.CLASS["day_round"])
                } else {
                    c && d.find("td[data-sort='" + c + "']").removeClass(s.CLASS["day_selected"]);
                    i && m.removeClass(s.CLASS["day_selected"] + " " + g.CLASS["day_round"])
                }
                if (o !== 1) {
                    t._selectTd(parseInt(o) + 1, parseInt(o) + parseInt(f));
                    d.find("td[data-sort='" + (parseInt(o) + parseInt(f)) + "']").addClass(s.CLASS["day_round"])
                } else {
                    if (l.find("span").text() === "今天") {
                        o = 1;
                        t._selectTd(2, f)
                    } else {
                        t._selectTd(2, f)
                    }
                    d.find("td[data-sort='" + f + "']").addClass(s.CLASS["day_round"])
                }
                d.find("td[data-sort='" + o + "']").addClass(s.CLASS["day_round"])
            }).bind("mouseout", function(n) {
                var u = e(".st-h");
                var f = d.find(".st-a");
                var l = d.find(".st-area");
                var h = e(".st-t").find("span").text();
                var p;
                if (u.length > 1) {
                    f.removeClass("st-a");
                    l.removeClass("st-area");
                    d.find(".st-a-r").removeClass("st-a-r");
                    if (o) {
                        var y = e(o).attr("onclick").match(/\d+/g)
                    } else {
                        var y = u.eq(1).attr("onclick").match(/\d+/g)
                    }
                    var b = new Date(y[0], y[1], y[2]);
                    var w = e(this).attr("data-range");
                    var E = g.minuteDate(b);
                    p = d.find("td[data-sort='" + E + "']");
                    p.addClass(s.CLASS["day_round"]);
                    t._selectTd(parseInt(E) + 1, parseInt(E) + parseInt(w));
                    d.find("td[data-sort='" + (parseInt(E) + parseInt(w)) + "']").addClass(s.CLASS["day_round"])
                } else {
                    if (h === "今天") {
                        var E = 0
                    } else {
                        var E = 1
                    }
                    p = d.find("td[data-sort='" + E + "']")
                }
                f.removeClass("st-a");
                l.removeClass("st-area");
                d.find(".st-a-r").removeClass("st-a-r");
                var w = e(this).attr("data-range");
                a = e(this).parents(".ch_sch_form");
                e(this).removeClass(s.CLASS["day_hover"]);
                d.find("td").removeClass(s.CLASS["day_area_bg"]);
                p.addClass(s.CLASS["day_round"]);
                if (a.find("[data-type = 'oneWay']").length < 1) {
                    v.addClass(s.CLASS["day_selected"]);
                    m.addClass(s.CLASS["day_round"]);
                    t._selectTd(r + 1, i)
                } else {
                    c && d.find("td[data-sort='" + c + "']").addClass(s.CLASS["day_selected"]);
                    !c && t._selectTd(r + 1, i);
                    i && m.addClass(s.CLASS["day_round"]);
                    c && d.find(".st-a-r").removeClass("st-a-r")
                }
                r != E && p.removeClass(s.CLASS["day_round"]);
                i != w && d.find("td[data-sort='" + w + "']").removeClass(s.CLASS["day_round"]);
                !c && p.addClass(s.CLASS["day_round"])
            })
        },
        set: function(t, n, r) {
            if (!this.ui.onSet || this.ui.onSet(t, n, r) === false) return;
            if (typeof t === "string") {
                var i = false;
                switch (t) {
                    case "container":
                        this.el.appendTo(e(n).find(".qcbox-fixed") || document.body);
                        this.el.css({
                            top: "",
                            left: ""
                        });
                        break
                }
                for (var s = 0, o = t.split("."), u = o.length, a = this.args; s < u && (s !== u - 1 && (a[o[s]] || (a[o[s]] = {})) || (a[o[s]] = n)); a = a[o[s]], s++) {}
            }
            if (r && this.visible()) {
                this._show(this.showedDate)
            }
        },
        get: function(e) {
            for (var t = 0, n = this.args, r = e.split("."), i = r.length; t < i && (n = n[r[t]]); t++) {}
            return n
        },
        change: function(e) {
            var t = this;
            var n = t.args.cldWrap;
            if (e == "-1M" && t.args.leftBtn.hasClass("e-dis")) {
                return
            } else if (e == "+1M" && t.args.rightBtn.hasClass("e-dis")) {
                return
            }
            if (t._scrolling) {
                return
            }
            var r = typeof e === "string" ? i(e, this.showedDate) : e;
            var s = this.showedDate;
            this.lastShowedDate = this.showedDate;
            this.showedDate = r;
            this.ui.change(s, r, e);
            this._trigger("q-datepicker-change", [s, r, e]);
            t._scrolling = true;
            var o = e == "-1M" ? "+=" : "-=";
            n.animate({
                left: o + l + "px"
            }, "50", function() {
                t._scrolling = false
            })
        },
        show: function(e) {
            var t = this;
            var n, r = t.get("minDate"),
                i = t.get("maxDate");
            searchTrack._updateTime(t);
            setTimeout(function() {
                if (!e) Ctime = window.SERVER_TIME || new Date;
                else Ctime = e;
                n = new Date(Ctime.getFullYear() + "/" + (Ctime.getMonth() + 1) + "/" + Ctime.getDate());
                if (r && n.getTime() < r.getTime()) n.setTime(r.getTime());
                else if (i && n.getTime() > i.getTime()) n.setTime(i.getTime());
                t.ui.onBeforeDraw(n);
                t._show.call(t, n);
                t._trigger("q-datepicker-show", [e])
            }, 100)
        },
        _show: function(t) {
            this.lastShowedDate = this.showedDate;
            this.showedDate = t;
            this.activeEl && e(this.activeEl).trigger("beforeRender");
            if (this.ui.draw(t) !== false);
            this.ui.picker.activeEl.closest(".qcbox").addClass("qcbox_on");
            this.el.show()
        },
        hide: function() {
            if (this.visible()) {
                this.ui.picker.activeEl.closest(".qcbox").removeClass("qcbox_on");
                this.el.hide();
                this._trigger("q-datepicker-hide")
            }
        },
        dispose: function() {
            this.ui.dispose();
            this.el.remove();
            this.activeEl.unbind("." + this.ns);
            this._trigger("q-datepicker-dispose")
        },
        visible: function() {
            return this.el.is(":visible")
        },
        getContainer: function() {
            return this.el
        }
    });
    var D = {
        "+M": function(e, t) {
            var n = e.getDate();
            e.setMonth(e.getMonth() + t);
            if (e.getDate() !== n) e.setDate(0)
        },
        "-M": function(e, t) {
            var n = e.getDate();
            e.setMonth(e.getMonth() - t);
            if (e.getDate() !== n) {
                e.setDate(0)
            }
        },
        "+D": function(e, t) {
            e.setDate(e.getDate() + t)
        },
        "-D": function(e, t) {
            e.setDate(e.getDate() - t)
        },
        "+Y": function(e, t) {
            e.setFullYear(e.getFullYear() + t)
        },
        "-Y": function(e, t) {
            e.setFullYear(e.getFullYear() - t)
        }
    };
    e.extend(e.fdatepicker, {
        uis: [],
        createUI: function(t, n) {
            var r = n && e.fdatepicker.uis[n] ? e.fdatepicker.uis[n] : M;
            var i = function() {};
            e.extend(i, r);
            e.extend(i.prototype = {}, r.prototype);
            if (t) {
                e.fdatepicker.uis[t] = i;
                i.prototype.name = t
            }
            return i
        },
        calcTime: function(e, t) {
            e = (e || "").toString();
            var n;
            if (t) n = new Date(t.getTime());
            else {
                n = new Date;
                var r = e.match(/^\d+/);
                if (r) n.setTime(r[0] * 1)
            }
            var i = /([+-])(\d+)([MDY])/g,
                s;
            while (s = i.exec(e)) {
                var o = s[1] + s[3];
                if (D[o]) D[o](n, s[2] * 1)
            }
            return n
        }
    });
    e.fdatepicker.createUI("qunar").implement({
        init: function() {
            this.parent.apply(this, arguments);
            var e = this,
                t = this.picker;
            if (t.activeEl.attr("name") !== "fromDate" && t.activeEl.attr("name").indexOf("Multi") === -1) {
                s = e;
                u.push(e)
            }
            var n = t.get("customActiveClass");
            t.activeEl.parent().find(".qunar-qcbox").remove();
            var r = this.triggerEl = t.activeEl.before('<div class="qunar-qcbox' + (n ? " " + n : "") + '"><div class="qcbox-placeholder"></div><div class="qcbox-prefix"></div><div class="qcbox-info"><b class="iconfont f-calendar"></b><span class="dp-text"></span></div></div>').after('<div class="qcbox-fixed"></div>').parent();
            var i = this.picker.args.prefix || t.activeEl.data("prefix");
            if (i) {
                r.find(".qcbox-prefix").text(i);
                t.activeEl.css({
                    left: r.find(".qcbox-prefix").outerWidth(true) + "px"
                })
            } else {
                r.find(".qcbox-prefix").remove()
            }
            t.set("container", r[0]);
            this.attachedEl = this.attachedEl.add(r.find(".qcbox-info > b , .qcbox-info")).add(r.find(".qcbox-info > b , .qcbox-info > .dp-text "));
            t.activeEl.attr("maxlength", 10);
            t.activeEl.addClass("textbox");
            t.activeEl.bind("keyup." + t.ns, function(t) {
                e.updateTip(e.validate.call(e))
            }).bind("blur." + t.ns, function(t) {
                e.fuzzyInput(t);
                e.autoCheck.call(e)
            });
            if (t.get("defaultDay") != null) this.setDate(this.getDefaultDate());
            this.updateTip(this.validate());
            this.selectedDate = null;
            this.checkLinked();
            this.forIframe(t)
        },
        forIframe: function(t) {
            e(window).bind("blur." + t.ns, function() {
                t.hide()
            })
        },
        getDefaultDate: function() {
            var e = this.picker;
            var t = i(e.get("defaultDay"));
            var n = e.get("minDate"),
                r = e.get("maxDate");
            if (n && n.getTime() > t.getTime() || r && r.getTime() < t.getTime()) t = n || r;
            return t
        },
        checkLinked: function(t) {
            var n = this.picker,
                r;
            if (!n.get("linkTo") || !(r = n.get("linkTo").data(e.fdatepicker.ROOT_KEY)) || r.ui.name.indexOf("qunar") !== 0) return;
            var s = (n.get("linkRules") || "").split(",");
            var o = this.getDate();
            if (o == null) return;
            if (t) {
                if (t.restPos && t.pos || t.restPos && !r.activeEl.attr("data-pos")) {
                    r.activeEl.attr("data-pos", t.restPos)
                }
            }
            var u = {};
            e.each(["ds", "mind", "maxd"], function(e, t) {
                if (s[e]) u[t] = i(s[e], o)
            });
            var a = r.get("strictMinDate"),
                f = r.get("strictMaxDate");
            if (u["mind"] || a) {
                var l = (u["mind"] ? u["mind"].getTime() : -1) > (a ? a.getTime() : -1) ? u["mind"] : a;
                r.set("minDate", l, false)
            }
            if (u["maxd"] || f) {
                var l = (u["maxd"] ? u["maxd"].getTime() : Number.MAX_VALUE) > (f ? f.getTime() : Number.MAX_VALUE) ? f : u["maxd"];
                r.set("maxDate", l, false)
            }
            r.set(null, null, true);
            var c = r.ui.validate();
            var h = S(n.activeEl.val()),
                p = S(r.activeEl.val());
            if (c && !c["success"] && n.get("forceCorrect") || !h && p) {
                r.select(u["ds"]);
                r.ui.drawDate = null;
                c = r.ui.validate()
            }!p && c && r.ui.updateTip(c);
            var d = "Y";
            return d
        },
        checkRefObj: function(t) {
            var n = this.picker,
                r;
            if (!n.get("refObj") || !(r = n.get("refObj").data(e.fdatepicker.ROOT_KEY)) || r.ui.name.indexOf("qunar") !== 0) return;
            if (!S(r.activeEl.val())) {
                return
            }
            var s = (n.get("linkRules") || "").split(",");
            var o = this.getDate();
            if (o == null) return;
            if (t) {
                if (t.restPos && t.pos || t.restPos && !r.activeEl.attr("data-pos")) {
                    r.activeEl.attr("data-pos", t.restPos)
                }
            }
            var u = {};
            e.each(["ds", "mind", "maxd"], function(e, t) {
                if (s[e]) u[t] = i(s[e], o)
            });
            var a = r.get("strictMinDate"),
                f = r.get("strictMaxDate");
            if (u["mind"] || a) {
                var l = (u["mind"] ? u["mind"].getTime() : -1) > (a ? a.getTime() : -1) ? u["mind"] : a;
                r.set("minDate", l, false)
            }
            if (u["maxd"] || f) {
                var l = (u["maxd"] ? u["maxd"].getTime() : Number.MAX_VALUE) > (f ? f.getTime() : Number.MAX_VALUE) ? f : u["maxd"];
                r.set("maxDate", l, false)
            }
            r.set(null, null, true);
            r.activeEl.val(this.picker.args.today());
            var c = r.ui.validate();
            if (c && !c["success"] && n.get("forceCorrect")) {
                r.select(u["ds"]);
                r.ui.drawDate = null;
                c = r.ui.validate()
            }
            c && r.ui.updateTip(c);
            var h = "Y";
            return h
        },
        select: function(e, t) {
            var n = this.picker;
            this.parent.apply(this, arguments);
            this.selectedDate = e;
            this.drawDate = e;
            if (!t) this.autoCheck()
        },
        fuzzyInput: function(t) {
            var n, r = t.target.value,
                i, s = S(r);
            if (s && s.valid) {
                this.fuzzyselect();
                n = this.picker.get("linkTo") || this.picker.get("refObj");
                i = n && (!S(n.val()) || n.val().indexOf("周") == -1 || r.indexOf("周") == -1);
                i && n.data(e.fdatepicker.ROOT_KEY).ui.setFuzzyDate(r)
            }
        },
        fuzzyselect: function(e, t) {
            console.log(e);
            this.selectedDate = e;
            this.showText("");
            if (!t) this.autoCheck()
        },
        setFuzzyDate: function(e) {
            var t = S(e),
                n = this.picker.activeEl.val();
            if (t) {
                this.picker.activeEl.val(e);
                this.fuzzyselect(t.startDate)
            } else if (!S(n) && this.picker.args.parseDate(n).getTime() >= this.picker.args.parseDate(e).getTime()) {
                return
            } else {
                n = this.picker.args.plus(this.picker.args.parseDate(e), 3);
                this.picker.activeEl.val(this.picker.args.formatDate(n));
                this.autoCheck()
            }
        },
        showText: function(e) {
            var t = this.triggerEl.find(".dp-text");
            t.removeClass("errtext").html(e)
        },
        showErrText: function(e) {
            var t = this.triggerEl.find(".dp-text");
            t.addClass("errtext").html(e)
        },
        autoCheck: function() {
            var e = this.picker,
                t, n;
            var r = e.activeEl.attr("data-pos");
            n = e.activeEl.val();
            t = S(n);
            if (t && t.valid) {
                this.checkLinked({
                    pos: e.args.pos,
                    restPos: r
                });
                e.args.pos = "";
                return
            }
            var i = this.validate();
            if (!i["success"] && e.get("forceCorrect")) {
                this.setDate(this.getDefaultDate());
                this.updateTip(this.validate())
            } else {
                if (i["formatted"]) e.activeEl.val(i["formatted"]);
                this.updateTip(i)
            }
            this.checkLinked({
                pos: e.args.pos,
                restPos: r
            });
            this.checkRefObj({
                pos: e.args.pos,
                restPos: r
            });
            e.args.pos = ""
        },
        updateTip: function(e) {
            if (!this.picker.get("showTip")) return;
            if (!e.success) this.showErrText(e.errmsg);
            else this.showText(e.daytip)
        },
        validate: function() {
            var e = this.picker;
            var t = this.picker.activeEl.val();
            var n = this.getDate();
            var r = this;
            if (n && this.selectedDate && this.selectedDate.getTime() != n.getTime()) this.selectedDate = null;
            var i = "";
            if (n == null) {
                i = e.get("LANG.ERR_FORMAT");
                e._trigger("q-datepicker-error", ["FORMAT", t])
            } else {
                var s = e.get("minDate"),
                    o = e.get("maxDate");
                if (s && s.getTime() > n.getTime() || o && o.getTime() < n.getTime()) {
                    i = e.get("LANG.OUT_OF_RANGE");
                    e.args.pos = "change";
                    e._trigger("q-datepicker-error", ["RANGE", t])
                }
            }
            var u = {
                success: !i,
                errmsg: i,
                formatted: null,
                daytip: null
            };
            if (u["success"]) {
                var f = e.get("formatDate")(n),
                    l;
                switch (e.args.minuteDate(n)) {
                    case 0:
                        if (!a) l = "今天";
                        break;
                    case 1:
                        l = "明天";
                        break;
                    case 2:
                        l = "后天";
                        break;
                    default:
                        l = "周" + e.get("LANG.day_names")[n.getDay()];
                        break
                }
                u["daytip"] = w[f] ? w[f]["holidayName"] : l;
                u["formatted"] = f
            }
            return u
        },
        addRoundClass: function(e) {
            if (e == "FROM") return this.picker.get("CLASS")["day_selected"];
            else if (e == "BACK") {
                return this.picker.get("CLASS")["day_round"]
            } else if (e == "AREAR") {
                return this.picker.get("CLASS")["day_area_bg"]
            }
        }
    });
    e.fn.fdatepicker = function() {
        if (this[0]) {
            if (arguments.length > 1 && this.data(r)) {
                var e = this.data(r);
                if (arguments[0] === "option" || arguments[0] === "setting") return arguments.length > 2 ? e.set(arguments[1], arguments[2]) : e.get(arguments[1])
            } else if (arguments.length <= 1) {
                if (this.data(r)) {
                    this.data(r).dispose();
                    this.removeData(r)
                }
                var t = new _(this[0], arguments[0]);
                this.data(r, t)
            }
        }
        return this
    };
    i = e.fdatepicker.calcTime
})(jQuery);
(function(e) {
    function i(e) {
        var n = e.contentWindow.QunarHistory;
        t = s(n)
    }

    function s(t) {
        function d(e) {
            var t = [],
                n;
            for (var r = 0; r < e.length; r++) {
                n = 0;
                for (var i = 0; i < t.length; i++) {
                    if (e[r].fromCity == t[i].fromCity && e[r].toCity == t[i].toCity) {
                        n = 1;
                        break
                    }
                }
                if (n != 1) {
                    t.push(e[r])
                }
            }
            return t
        }
        var n = t.findEntries("SF");
        var r = t.findEntries("DL");
        var i = [],
            s = [],
            u = [],
            f = [];
        e.each(n, function(e, t) {
            if (o(t)) {
                i.push(a(t));
                return false
            }
        });
        e.each(n, function(e, t) {
            if (!o(t)) {
                s.push(a(t));
                return false
            }
        });
        e.each(r, function(e, t) {
            t.roundtrip = true;
            if (o(t)) {
                u.push(a(t));
                return false
            }
        });
        e.each(r, function(e, t) {
            t.roundtrip = true;
            if (!o(t)) {
                f.push(a(t));
                return false
            }
        });
        var l = [],
            c = [];
        l = l.concat(s).concat(f);
        c = c.concat(i).concat(u);
        l.sort(function(e, t) {
            return parseInt(t.timestamp, 10) - parseInt(e.timestamp, 10)
        });
        c.sort(function(e, t) {
            return parseInt(t.timestamp, 10) - parseInt(e.timestamp, 10)
        });
        var h = [],
            p = [];
        e.each(n, function(e, t) {
            if (o(t)) {
                h.push(a(t))
            } else {
                p.push(a(t))
            }
        });
        e.each(r, function(e, t) {
            t.roundtrip = true;
            if (o(t)) {
                h.push(a(t))
            } else {
                p.push(a(t))
            }
        });
        h.sort(function(e, t) {
            return parseInt(t.timestamp, 10) - parseInt(e.timestamp, 10)
        });
        p.sort(function(e, t) {
            return parseInt(t.timestamp, 10) - parseInt(e.timestamp, 10)
        });
        h = d(h);
        p = d(p);
        return {
            domesticFirst: l[0],
            interFirst: c[0],
            domesticFlightList: p,
            interFlightList: h
        }
    }

    function o(e) {
        var t = e.fromCountry;
        var n = e.toCountry;
        var r = t;
        var i = n;
        if (~t.indexOf("-")) {
            r = t.split("-")[0];
            i = t.split("-")[1]
        }
        e.fromCountry = r;
        e.toCountry = i;
        return u(r) !== "中国" || u(i) !== "中国"
    }

    function u(e) {
        return decodeURIComponent(e)
    }

    function a(t) {
        e.each(t, function(e, n) {
            t[e] = u(n)
        });
        return t
    }
    document.domain = "qunar.com";
    e.qhistory = {};
    var t = null;
    var n = "#ifrmHistory";
    var r = "http://history.qunar.com/history/newhistory.html";
    e.qhistory.init = function(s) {
        var o = e(s.frameid || n);
        o.attr("src", s.src || r);
        o.bind("load", function() {
            i(o[0]);
            var e = {
                flight: t
            };
            var n = s.success || function() {};
            n(e)
        })
    }
})(jQuery);
var FlightCityHistory = function() {
    function n(e, t) {
        e = e == null ? "" : e + "";
        for (var n = 0, r = t - e.length; n < r; n++) e = "0" + e;
        return e
    }

    function o(t) {
        return;
        if (window.QunarHistory.data && window.QunarHistory.data.flight) {
            var n = window.QunarHistory.data.flight
        } else {
            return
        }
        e.length = 0;
        if (t.type == "interfrom") {
            var r = i();
            var o = r.searchDepartureAirport || r.fromCity;
            var u = r.searchArrivalAirport || r.toCity;
            var a = n.interFlightList;
            var f = [];
            for (var l = 0; l < a.length; l++) {
                if (!(s(a[l].fromCity) == o && s(a[l].toCity) == u)) {
                    f.push(a[l])
                }
            }
            f = f.slice(0, 3)
        }
        for (var l = 0; l < f.length; l++) {
            var c = {
                fcity: "",
                tcity: "",
                fcity_abbr: "",
                tcity_abbr: ""
            };
            var h = f[l].fromCity,
                p = f[l].toCity;
            c.fcity = h;
            c.tcity = p;
            var d = s(h);
            var v = s(p);
            c.fcity_abbr = d.length > 5 ? d.slice(0, 4) + ".." : d;
            c.tcity_abbr = v.length > 5 ? v.slice(0, 4) + ".." : v;
            e.push(c)
        }
    }

    function u() {
        return e
    }

    function a() {
        var t;
        if (e.length != 0) {
            t = 1
        }
        return t
    }
    var e = [],
        t = [];
    var r = function(e) {
        return e.getFullYear() + "-" + n(e.getMonth() + 1, 2) + "-" + n(e.getDate(), 2)
    };
    var i = function() {
        var e = {};
        var t = window.location.search.replace("?", "").split("&");
        for (var n = 0; n < t.length; n++) {
            var r = t[n].split("=");
            e[r[0]] = decodeURIComponent(r[1])
        }
        return e
    };
    var s = function(e) {
        return e.indexOf("(") == -1 ? e : e.substring(0, e.indexOf("("))
    };
    return {
        init: o,
        cityHistory: u,
        hisLength: a
    }
}();
(function(e) {
    function n(e, t) {
        this._cache = [];
        this._cFn = e
    }
    if (!e.kit) e.kit = {};
    if (!e.module) e.module = {};
    if (!e.ui) e.ui = {};
    var t = function() {
        var t = {},
            n;
        var r = function() {
            if (!n) {
                n = e('<div style="width: 950px;margin: 0 auto;height:0;position: relative;z-index: 999999;"></div>');
                n.insertBefore(e(":first", document.body))
            }
        };
        t.offset = function() {
            r();
            return n.offset()
        };
        t.size = function() {
            r();
            return [n.width(), e(window).height()]
        };
        t.getNode = function() {
            r();
            return n
        };
        t.getNodeOffset = function(e) {
            var n = t.offset(),
                r = e.offset();
            return {
                left: r.left - n.left,
                top: r.top - n.top
            }
        };
        return function() {
            return t
        }
    }();
    e.module.layer = function(n) {
        var r = t();
        var i = e(n).appendTo(r.getNode()).hide(),
            s = e("[node-type=inner]", i);
        var o = {},
            u = e(o),
            a;
        o.show = function() {
            i.show();
            u.trigger("lay_show");
            return o
        };
        o.hide = function() {
            i.hide();
            u.trigger("lay_hide");
            return o
        };
        o.getOuter = function() {
            return i
        };
        o.getInner = function() {
            return s
        };
        o.getWrapSize = function() {
            return r.size()
        };
        o.getWrapOffset = function(e) {
            return r.getNodeOffset(e)
        };
        o.getSize = function(e) {
            if (e || !a) {
                a = [i.width(), i.height()]
            }
            return a
        };
        o.getDom = function(t) {
            return e("[node-type=" + t + "]", i)
        };
        o.setPosition = function(e) {
            i.css(e);
            return o
        };
        return o
    };
    n.prototype = {
        constructor: n,
        _create: function() {
            var e = this._cFn();
            this._cache.push({
                store: e,
                used: true
            });
            return e
        },
        getOne: function() {
            var e = this._cache;
            for (var t = 0, n = e.length; t < n; t += 1) {
                if (e[t].used === false) {
                    e[t].used = true;
                    return e[t].store
                }
            }
            return this._create()
        },
        _setStat: function(t, n) {
            e.each(this._cache, function(e, r) {
                if (t === r.store) {
                    r.used = n;
                    return false
                }
            })
        },
        setUsed: function(e) {
            this._setStat(e, true)
        },
        setUnused: function(e) {
            this._setStat(e, false)
        },
        getLength: function() {
            return this._cache.length
        }
    };
    e.kit.Reuse = n;
    e.module.dialog = function() {
        return function(t, n) {
            if (!t) throw "dialog no template";
            var r, i, s, o, u, a, f, l, c, h;
            var p = function() {
                s = e.extend({}, n);
                r = e.module.layer(t);
                o = r.getOuter();
                u = r.getInner();
                a = r.getDom("close").click(function() {
                    f()
                })
            };
            p();
            c = r.show;
            h = r.hide;
            f = function(e) {
                if (typeof l === "function" && !e) {
                    if (l() === false) {
                        return false
                    }
                }
                h();
                return i
            };
            i = r;
            i.show = function() {
                c();
                return i
            };
            i.hide = f;
            i.setMiddle = function() {
                var t = i.getWrapSize(),
                    n = r.getSize(true),
                    s = e(window).scrollTop();
                var o = {
                    top: s + (t[1] - n[1]) / 2,
                    left: (t[0] - n[0]) / 2
                };
                if (o.top < s) o.top = s;
                if (o.left < 0) o.left = 0;
                return i.setPosition(o)
            };
            i.setClose = function(e) {
                a[e ? "show" : "hide"]()
            };
            i.setContent = function(e) {
                if (typeof e === "string") {
                    u.html(e)
                } else {
                    u.append(e)
                }
                return i
            };
            i.clearContent = function() {
                u.empty();
                return i
            };
            i.setBeforeHideFn = function(e) {
                l = e
            };
            i.clearBeforeHideFn = function() {
                l = null
            };
            return i
        }
    }();
    e.ui.dialog = function() {
        var t = '<div class="poplayer_box" node-type="outer" style="position:absolute;display:block;left:420px;top:10px;">' + '     <span class="close" node-type="close"></span>' + '     <div class="poplayer_inner" node-type="inner"></div>' + "</div>";
        var n = null;
        var r = function(e) {
            e.clearContent();
            if (n) n.setUnused(e)
        };
        var i = function() {
            var n = e.module.dialog(t);
            e(n).bind("lay_show", function() {
                e.ui.mask.show()
            }).bind("lay_hide", function() {
                e.ui.mask.hide()
            });
            return n
        };
        var s = [];
        var o = function(t) {
            var n = [];
            e.each(s, function(e, r) {
                if (r !== t) n.push(r)
            });
            s = n
        };
        var u = function(t, n) {
            var r = function() {
                o(t);
                if (!n.isHold) {
                    e(t).unbind("lay_hide", r);
                    e(t).unbind("lay_show", i)
                }
            };
            var i = function() {
                s.push(t)
            };
            e(t).bind("lay_hide", r).bind("lay_show", i)
        };
        var a = function() {
            e(document).keydown(function(t) {
                if (s.length === 0) return;
                var n = s[s.length - 1];
                var r = t.keyCode,
                    i = t.target,
                    o = i.nodeName,
                    u = /^input|textarea$/i;
                var a = e.contains(n.getOuter()[0], i);
                if (r === 27) {
                    if (!n.isEsc) return;
                    if (u.test(o) && a && i.type !== "button") return;
                    n.hide()
                } else if (r === 13 || r === 9) {
                    if (!a) {
                        t.preventDefault()
                    }
                }
            })
        };
        return function(t) {
            t = e.extend({
                isEsc: true,
                isHold: false,
                closeBtn: true,
                width: 500
            }, t || {});
            var s = t.isHold;
            if (!n) {
                a();
                n = new e.kit.Reuse(i)
            }
            var o = n.getOne();
            o.getInner().css("width", t.width);
            o.setClose(t.closeBtn);
            if (!s) {
                var f = function() {
                    e(o).unbind("lay_hide", f);
                    r(o)
                };
                e(o).bind("lay_hide", f)
            }
            o.isEsc = t.isEsc;
            u(o, t);
            return o
        }
    }();
    e.ui.mask = function() {
        function s() {
            if (i) {
                t.css({
                    width: e(document).width(),
                    height: Math.max(e(document).height(), e(window).height()),
                    zIndex: 800
                })
            } else {
                t.css({
                    position: "fixed",
                    zIndex: 800
                })
            }
        }

        function o() {
            clearTimeout(r);
            r = setTimeout(s, 500)
        }

        function u() {
            if (i) {
                e(window).bind("resize", o)
            }
        }

        function a() {
            e(window).unbind("resize", o)
        }

        function f() {
            t = e('<div class="poplayer_bg"></div>').appendTo(document.body);
            s();
            return t
        }
        var t, n = 0,
            r, i = e.browser.msie && e.browser.version === "6.0";
        var l = {
            show: function() {
                n++;
                if (n > 1) return;
                if (!t) f();
                u();
                t.show()
            },
            hide: function() {
                if (!t || n <= 0) return;
                n--;
                if (n === 0) {
                    a();
                    t.hide()
                }
            }
        };
        return l
    }()
})(jQuery);
var FlightHotCity = function(e) {
    function s(t) {
        var r = n[t.type];
        var i = n.data;
        var s = [];
        var o = null;
        var u = null;
        if (t.type == "domesticfrom" || t.type == "interfrom") {
            FlightCityHistory.init(t);
            o = FlightCityHistory.cityHistory();
            u = FlightCityHistory.hisLength()
        }
        e.each(r, function(e, t) {
            var n = {
                key: t.key,
                tab: t.title,
                title: i[t.key].title
            };
            s.push(n)
        });
        var a = QTMPL.FlightHotCity.render({
            sort: s,
            type: t.type,
            cityType: t.cityType,
            cityHistory: o,
            hisLength: u,
            width: t.width
        });
        return e(a)
    }

    function o(t, r) {
        var s = t.type + "-flight-hotcity-" + t.cityType;
        e(e.tabs).bind(s + "-change", function(e, t, r, i) {
            var s = r.data("key");
            var o = i;
            f(n.data[s], o)
        });
        e(r).bind("hotcity-show", function() {
            if (t.type == "interto") {
                var s = r.ui.$el.closest("form").find("[name=fromCity]").val();
                if (i == s) {
                    return
                } else {
                    i = s
                }
                var o = r.ui.$wrap.find("[data-panel='interto-flight-hotcity-to'][data-panel-id='dfh-国际·港澳台']");
                var u = {
                    q: s.indexOf("(") == -1 ? s : s.substring(0, s.indexOf("("))
                };
                e.ajax({
                    url: "http://flight.qunar.com/suggest/inter_arrcity_suggest.jsp?sort=F",
                    dataType: "jsonp",
                    data: u || {},
                    timeout: 200,
                    success: function(e) {
                        if (e && e.result && e.result.length > 0) {
                            n.data["国际·港澳台-to"].cityList[0].list = e.result
                        }
                        f(n.data["国际·港澳台-to"], o, "国际·港澳台-to")
                    },
                    error: function() {}
                })
            }
        });
        a(t, r);
        u(t, r)
    }

    function u(t, n) {
        n.$hotcity.delegate(".js_history", "click", function(t) {
            t.preventDefault();
            var r = e(this),
                i = n.ui.$el;
            var s = r.attr("data-fcity"),
                o = r.attr("data-tcity");
            i.val(s);
            i.closest("form").find("[name=toCity]").val(o);
            i.closest("form").find("[name=fromDate]").focus();
            trackAction("QH|HCT|route|" + s + "-" + o);
            n.hideHotcity()
        })
    }

    function a(t, n) {
        n.$hotcity.delegate("a.js-hotcitylist", "click", function(r) {
            r.preventDefault();
            var i = e(this),
                s = n.ui.$el;
            var o = i.data("code");
            o = o ? "(" + o + ")" : "";
            var u = s.data("q-suggest");
            if (u) {
                u.setValue((i.attr("title") || i.text()) + o)
            } else {
                s.val(i.text() + o)
            }
            s.data("country", i.data("country"));
            s.data("valided", true);
            e(t).trigger("setvalue", [s]);
            e(t).trigger("hotcity-select", [i.text()]);
            n.hideHotcity()
        })
    }

    function f(e, t, n) {
        if (t.html() && n != "国际·港澳台-to") {
            return
        }
        var r = QTMPL.FlightHotCityList.render(e);
        t.html(r)
    }

    function l() {
        this.cityType = null;
        this.$dom = null;
        this.data = {}
    }
    var t = ".js_close_flight_hotcity";
    var n = FlightSearchBoxConf.hotCity;
    var r = "";
    var i;
    e.extend(l.prototype, {
        init: function(n) {
            var i = this;
            e.RegisterPlugin("qcbox", "hotcity", "flight", {
                initialize: function() {
                    i.cityType = n.cityType;
                    i.data = n.data;
                    i.type = n.type;
                    i.defaultTab = n.defaultTab;
                    i.width = n.width || r
                },
                initializeStruct: function() {
                    var n = this.ui.$el,
                        r = this.ui,
                        u = this;
                    i.$dom = s(i);
                    this.$hotcity.append(i.$dom);
                    i.$dom.find(t).click(function() {
                        u.hideHotcity()
                    });
                    o(i, u);
                    e.tabs.init(i.$dom)
                }
            })
        },
        switchCity: function(e) {
            this.type = e.type;
            this.width = e.width || r
        }
    });
    return l
}(jQuery);
var FlightSuggest = function(e) {
    function o(e) {
        for (var t = 0, n = e.length; t < n; t++) {
            var r = e;
            r[t].ftype = r[t].type;
            if (r[t].type === 4 || r[t].type === 9) {
                var s = r[t].type;
                var o = t - 1;
                var u = false;
                for (var a = t; a < n && !u; a++) {
                    if (r[a].type === s) {
                        r[a].ftype = r[o].ftype
                    } else {
                        t = a - 1;
                        a = 100;
                        u = true
                    }
                }
            }
            if (r[t].ftype === 3) {
                r[t].ftypename = "city"
            }
            if (r[t].ftype === 1) {
                r[t].ftypename = "city"
            }
            if (r[t].display.indexOf("机场") !== -1 || r[t].display.indexOf("Airport") !== -1) {
                r[t].ftypename = "airport"
            }
            if (r[t].ftype === 6) {
                r[t].ftypename = "attraction"
            }
            if (r[t].ftype === 8) {
                r[t].ftypename = "country"
            }
            if (r[t].ftype === 7) {
                r[t].ftypename = "state"
            }
        }
        i = e
    }

    function u(t, n, i, s, u, a) {
        var l = function(t, n) {
            if (!t) return;
            t = t.result;
            return e(t).not(n).length == 0 && e(n).not(t).length == 0
        };
        var c = [];
        if (t) {
            c = f(t, u);
            if (t.result && t.result.length > 0) {
                o(t.result);
                if (!l(r, t.result)) {
                    var h = [];
                    h.push("getResultData", encodeURIComponent(s.val()), t.result.length, s.attr("name"));
                    e(a).trigger("getResultData", [h]);
                    searchTrack.triggerMult(a, "getResultData", [h])
                }
                r = e.extend({}, t)
            }
        }
        if (c.length === 0) {
            if (r) {
                r.userInput = t.userInput;
                c = c.concat(f(r, u))
            } else {
                c = [0];
                i._trigger("q-suggest-noresult", [s])
            }
        }
        return c
    }

    function f(e, t) {
        var n = e.result || [],
            r = [],
            i = e.userInput.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"),
            s = new RegExp("(" + i + ")", "i"),
            o = t ? "167" : "1678",
            u = new RegExp("[" + o + "]");
        for (var f = 0, l = n.length; f < l; f += 1) {
            var c = n[f];
            r.push({
                txt: a(c, s),
                val: c.key,
                type: u.test(c.type) ? 1 : 0,
                country: c.country,
                code: c.code
            });
            if (c.type === 8 && t) {
                break
            }
        }
        return r
    }

    function l(e) {
        var t = e.closest("table").data("data"),
            n = t[e.attr("data-ind") * 1];
        return n
    }

    function c(t, n, r) {
        var s = n.visible();
        var o = t.keyCode;
        if (o === 40 && !s) {
            n.show();
            return
        }
        if (!s) return;
        var u = n.el.find('tr[data-sug_type="0"]');
        var a = u.filter(".active");
        switch (o) {
            case 38:
            case 40:
                n._excludeEl = n._mouseFocus;
                var f = u.index(a);
                f = t.keyCode === 38 ? f - 1 : f + 1;
                if (f >= u.length) f = 0;
                if (f < 0) f = u.length - 1;
                a.removeClass("active");
                a = u.eq(f);
                var c = "";
                if (a.length > 0) {
                    c = l(a);
                    n.setValue(c.val + (c.code ? "(" + c.code + ")" : ""));
                    a.addClass("active")
                }
                t.preventDefault();
                n._trigger("q-suggest-user-action", [t.type, c.val, o]);
                break;
            case 13:
                if (a.length > 0) {
                    var c = "";
                    var h = null;
                    c = l(a);
                    n.setValue(c.val + (c.code ? "(" + c.code + ")" : ""));
                    var p = a.index();
                    if (c.val === "所有地点") {
                        p = "00";
                        h = "allPlace"
                    } else {
                        h = i[p].ftypename
                    }
                    var d = h + "|" + encodeURIComponent(c.val) + "|" + p;
                    e(r).trigger("suggest-selected", d);
                    searchTrack.triggerMult(r, "suggest-selected", d);
                    trackAction("QH|HCT|suggest|" + c.val)
                };
            case 27:
                n.hide();
                n._trigger("q-suggest-user-action", [t.type, n.getValue(), o]);
                break;
            case 18:
            case 9:
                break
        }
    }

    function h() {}
    var t = "http://www.qunar.com/suggest/livesearch2.jsp?lang=zh&q=*&sa=true&ver=1&callback=?";
    var n = false;
    var r = null;
    var i = null;
    var s;
    var a = function(e, t) {
        var n = e.type,
            r = e.display;
        if (r.indexOf(s) != -1) {
            s = s.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
            t = new RegExp("(" + s + ")", "i")
        }
        r = r.replace(t, '<span class="keyString">$1</span>');
        if (n === 4) {
            r = "·邻近机场：" + r
        } else if (n === 9) {
            r = "·相关城市：" + r
        }
        if (e.length) r += "-" + e.length + "公里";
        if (n === 1) {
            r += "-该城市没有机场"
        } else if (n === 2) {
            r += "-该地区的机场有"
        } else if (n === 6) {
            r += "-该景点没有机场"
        } else if (n === 7) {
            r += "-该目的地为省份"
        } else if (n === 8) {
            r += "-该目的地为国家"
        }
        return r
    };
    e.extend(h.prototype, {
        init: function(n) {
            var r = this;
            e.RegisterPlugin("qcbox", "suggest", n.name, {
                initialize: function() {
                    var o = this.ui.$el;
                    o.qsuggest({
                        ajax: {
                            url: t,
                            dataType: "jsonp",
                            cache: false
                        },
                        delay: 200,
                        allPlace: n.allPlace,
                        render: function(e) {
                            return e.txt
                        },
                        reader: function(e) {
                            return u(e, n.tiptext, this, o, this.args.allPlace, r)
                        },
                        loader: function(e) {
                            return e.replace(/\s/g, "")
                        },
                        container: n.container,
                        exattr: function(e) {
                            return "data-sug_type=" + e.type
                        },
                        keyevent: function(e) {
                            c(e, this, r)
                        },
                        getData: function(e) {
                            var t = e.closest("table").data("data"),
                                n = t[e.attr("data-ind") * 1];
                            return n.val ? n.val + (n.code ? "(" + n.code + ")" : "") : undefined
                        },
                        getExtData: function(e) {
                            if (e.length < 1) {
                                return {}
                            }
                            var t = e.closest("table").data("data"),
                                n = t[e.attr("data-ind") * 1];
                            return n
                        },
                        draw: function(t, n) {
                            this.el.empty();
                            var r = this.args.min,
                                i = this.args.max,
                                s = t ? t.length : 0;
                            if (!t || !s || s < r) {
                                this.hide();
                                return
                            }
                            var o = {
                                country: "中国",
                                txt: "所有地点",
                                val: "所有地点",
                                type: 0
                            };
                            if (this.args.allPlace && t[s - 1].val != o.val) {
                                t.push(o)
                            }
                            var u = [],
                                a = this.args.render,
                                f = this.args.exattr,
                                l = true;
                            u.push('<table cellspacing="0" cellpadding="2"><tbody>');
                            var s = t.length - 1;
                            e.each(t, function(t, n) {
                                if (t >= i) return false;
                                var r = "";
                                if (n.type !== 1 && l) {
                                    l = false;
                                    r = ' class="active'
                                }
                                if (n.exClass) {
                                    r = r ? r + " " + n.exClass + '" ' : ' class="' + n.exClass + '" '
                                } else {
                                    r = r ? r + '" ' : ""
                                }
                                e(searchTrack).trigger("haveData", s);
                                u.push("<tr", r, ' data-ind="', t, '" ', f(n), "><td>", a(n), "</td></tr>")
                            });
                            u.push("</tbody></table>");
                            this._trigger("q-suggest-beforeshow", [this.el, n]);
                            var c = e(u.join("")).appendTo(this.el).data("data", t);
                            if (!this.args["container"]) this.el.css(_calc_pos(this.activeEl));
                            this.el.show();
                            this._trigger("q-suggest-show", [t])
                        },
                        on: {
                            "q-suggest-show": function() {
                                o.bind("keydown.kd", function(e) {
                                    e.keyCode == 13 && e.preventDefault()
                                })
                            },
                            "q-suggest-setextdata": function(e, t, n) {
                                n.data("country", t.country);
                                n.data("valided", true)
                            },
                            "q-suggest-setvalue": function(t, n, i) {
                                e(r).trigger("setvalue", [i])
                            },
                            "q-suggest-noresult": function(t, n) {
                                n.data("country", null);
                                n.data("valided", false);
                                e(r).trigger("setvalue", [n]);
                                e(r).trigger("suggest-noresult")
                            },
                            "q-suggest-hide": function(e) {
                                o.unbind("keydown.kd")
                            },
                            "q-suggest-beforeshow": function(t, n, i) {
                                if (!!i && !!i.c) {
                                    var o = ['<div class="qcity_guess">你要找的是不是<span class="hl">', i.userInput, "</span></div>"];
                                    n.append(o.join(""))
                                }
                                if (i && i.result.length == 0) {
                                    var o = ['<div class="qcity_guess">找不到<span class="hl">', s, "</span></div>"];
                                    n.append(o.join(""));
                                    e(r).bind("suggest-nofind", function(e, t) {
                                        searchTrack.triggerMult(r, "suggest-nofind", t)
                                    });
                                    e(r).trigger("suggest-nofind", s)
                                }
                            },
                            "q-suggest-user-action": function(t, n, s, o) {
                                var u = null;
                                if (n == "mousedown") {
                                    if (s === "所有地点") {
                                        o = "00";
                                        u = "allplace"
                                    } else {
                                        u = i[o].ftypename
                                    }
                                    var a = u + "|" + encodeURIComponent(s) + "|" + o;
                                    e(r).trigger("suggest-selected", a);
                                    searchTrack.triggerMult(r, "suggest-selected", a);
                                    trackAction("QH|HCT|suggest|" + s)
                                }
                            },
                            "q-suggest-inputChange": function(e) {
                                s = o.val().replace(/\s+/g, " ");
                                s = s.replace(/^\s+/, "");
                                s = s.replace(/\s+$/, "")
                            }
                        }
                    })
                }
            })
        },
        isvalid: function() {
            return n
        }
    });
    return h
}(jQuery);
(function(e, t) {
    var n = e.jQuery,
        r = e.document;
    var i = "YSELECTOR",
        s = ".SELECTOR_EVENT",
        o = "hover",
        u = n.browser.msie && n.browser.version === "6.0";
    var a = function() {};
    a.options = {
        emptyHidden: false,
        maxRows: 10,
        index: null,
        onbeforechange: function() {},
        onchange: function() {},
        onselect: function(e) {
            return e || ""
        }
    };
    a.prototype = {
        _init: function(e) {
            var t = this;
            t._setOptions(e || {});
            t._bindEvents()
        },
        _bindEvents: function() {
            function a(e) {
                if (t.option("disable")) {
                    return
                }
                if (u) {
                    t._hide()
                } else {
                    t._show()
                }
                u = !u
            }
            var t = this,
                i = t.option("jquery"),
                u = false;
            var f = null;
            n(r).mouseup(function() {
                f && f.releaseCapture && f.releaseCapture()
            });
            if (t.options.showWhenHover) {
                var l;
                i.find(".yselector_box").hover(function(e) {
                    clearTimeout(l);
                    if (u) {
                        return
                    }
                    a(e)
                }, function(e) {
                    l = setTimeout(function() {
                        a(e)
                    }, 100)
                });
                i.find(".yselector_suggest").hover(function(e) {
                    clearTimeout(l)
                }, function(e) {
                    if (u) {
                        l = setTimeout(function() {
                            if (u) {
                                a(e)
                            }
                        }, 100)
                    }
                })
            }
            i.delegate(".yselector_input", "click" + s, a).delegate(".yselector_arraw", "mousedown" + s, function(e) {
                t.option("input").focus();
                e.preventDefault();
                if (this.setCapture) {
                    this.setCapture()
                }
                a(e)
            }).delegate(".yselector_arraw", "click" + s, function(e) {
                if (this.releaseCapture) {
                    this.releaseCapture()
                }
            }).delegate(".yselector_input", "focusout" + s, function() {
                if (u) {
                    t._hide();
                    u = false
                }
                var e = t.val(),
                    r = t._getByValue(e);
                n(n.fn.yselector.events).trigger("blur", [t, r, t.option("holder")])
            }).delegate(".yselector_suggest ul", "mousedown" + s, function(r) {
                r.preventDefault();
                if (this.setCapture) {
                    this.setCapture();
                    f = this
                }
                var i = r.target,
                    s;
                if (i.tagName === "A") {
                    s = n(i).data("index")
                } else {
                    var o = n(i).parentsUntil(".yselector_suggest", "a");
                    if (o.length == 0) {
                        return
                    }
                    s = o.data("index")
                }
                var u = "";
                if (e.location.href.indexOf("oneway_list") > -1) {
                    u = "onewayList"
                }
                if (e.location.href.indexOf("roundtrip_list_new") > -1) {
                    u = "roundtripList"
                }
                if (parseInt(s, 10) == 0 && u != "") {
                    $jex.log({
                        s: "flight",
                        p: u,
                        r: "searchboxClick",
                        type: "oneWay"
                    })
                }
                t.index(s);
                a(r)
            }).delegate(".yselector_suggest ul", "click" + s, function(e) {
                if (this.releaseCapture) {
                    this.releaseCapture()
                }
            }).delegate(".yselector_suggest ul", "mouseenter" + s, function(e) {
                t._cur().removeClass(o)
            }).delegate(".yselector_input", "keydown" + s, function(e) {
                if (t.option("disable")) {
                    return
                }
                var n = e.keyCode;
                if (n === 37 || n === 38) {
                    t.previous();
                    return false
                } else if (n === 39 || n === 40) {
                    t.next();
                    return false
                } else if (n === 13) {
                    a(e)
                } else if (n === 8) {
                    return false
                }
            })
        },
        _cur: function(e) {
            var t = this,
                n = e == null ? t.option("index") : e,
                r = t.option("suggest").find("a:eq(" + n + ")");
            return r
        },
        _drawHtml: function() {
            var e = this;
            var t = ['<div class="yselector">', '<div class="yselector_box">', '<div class="yselector_arraw"><i class="iconfont f-caret-down"></i></div>', '<span class="yselector_input" tabindex="0"></span>', "</div>", '<div style="display:none;" class="yselector_suggest">', "<ul></ul>", "</div>", "</div>"];
            var r = n(t.join("\n")),
                i = e.option("holder").hide();
            i.after(r);
            e.option("jquery", r);
            e.option("suggest", n(".yselector_suggest", r));
            e.option("input", n(".yselector_input", r))
        },
        _drawSuggest: function() {
            var e = [],
                t, n = this,
                r = n.option("data");
            for (var i = 0, s = r.length; i < s; i++) {
                t = r[i];
                e.push('<li><a data-value="' + t.value + '" hidefocus="on" data-index="' + i + '"');
                e.push(' onclick="return false;" href="javascript:;" tabindex="-1">' + t.text + "</a></li>")
            }
            n.option("suggest").html("<ul>" + e.join("\n") + "</ul>")
        },
        _setOptions: function(e) {
            var t = this;
            t.options = n.extend({}, a.options, e);
            var r = e.rawSelect,
                i = r.options,
                s = r.selectedIndex,
                o = [],
                u;
            for (var f = 0, l = i.length; f < l; f++) {
                u = i[f];
                o.push({
                    value: u.value || u.text,
                    text: u.text
                })
            }
            t.option("holder", n(r));
            t.option("index", e.index != null ? e.index : s);
            t._drawHtml();
            t.setOptions(o)
        },
        _getByValue: function(e, t) {
            if (!e) {
                return
            }
            var n = this.option("data"),
                r;
            t = t || "value";
            for (var i = 0, s = n.length; i < s; i++) {
                r = n[i];
                if (r[t] == e) {
                    return r
                }
            }
        },
        _setByObject: function(e, t) {
            e = e || {};
            if (!t && this.option("index") === e.index) {
                return
            }
            var r = this,
                i = r.option("onselect"),
                s = r.option("onbeforechange"),
                o = r.option("onchange");
            var u = i ? i(e.text) : e.text || "";
            if (r.option("value") && s) {
                s.call(r, {
                    value: r.option("value")
                })
            }
            r.option("value", e.value || "");
            r.option("text", u);
            r.option("index", e.index || 0);
            var a = r.option("holder"),
                f = r.option("input");
            if (a) {
                a[0].selectedIndex = e.index
            }
            if (f) {
                r.option("input").text(u)
            }
            if (o) {
                o.call(r, e)
            }
            n(n.fn.yselector.events).trigger("change", [r, e, r.option("holder")])
        },
        _triggerClass: function(e, t) {
            var n = this;
            if (e === t) {
                return
            }
            n._cur(e).removeClass(o);
            n._cur(t).addClass(o)
        },
        _show: function() {
            var t = this,
                r = t.option("suggest"),
                i = t.option("index"),
                s = t.option("direction");
            this.option("jquery").addClass("yselector_on");
            t._drawSuggest();
            var u = r.find("a");
            u.eq(i).addClass(o);
            r.show();
            var a = t.option("maxRows");
            var f = Math.min(u.size(), a) * u.height();
            var l = t.option("jquery"),
                c;
            switch (s) {
                case "top":
                    c = 0 - f - l.height() - 1;
                    break;
                case "bottom":
                    c = -1;
                    break;
                default:
                    var h = n(e),
                        p = l.offset().top + l.height() + 3,
                        d = h.scrollTop(),
                        v = h.height();
                    if (p + f > d + v) {
                        c = 0 - f - l.height() - 1
                    } else {
                        c = -1
                    }
                    break
            }
            r.find("ul").css("height", f).css("top", c).scrollTop(t.option("index") * u.height())
        },
        _hide: function() {
            this.option("jquery").removeClass("yselector_on");
            this.option("suggest").hide()
        },
        setOptions: function(e) {
            var t = this,
                n = t.option("jquery");
            e = e || [];
            var r = t.option("holder")[0];
            r.length = 0;
            for (var i = 0, s = e.length, o; i < s; i++) {
                o = e[i];
                o.index = i;
                r.options.add(new Option(o.text, o.value))
            }
            t.option("data", e);
            if (!e.length && t.option("emptyHidden")) {
                n.hide()
            } else {
                n.show()
            }
            t._setByObject(e[t.option("index")] || e[0], true)
        },
        first: function() {
            return this.option("data")[0] || {}
        },
        option: function(e, t) {
            if (t != null) {
                this.options[e] = t
            } else {
                return this.options[e]
            }
        },
        previous: function() {
            var e = this,
                t = e.index() - 1;
            if (t < 0) {
                t = e.option("data").length + t
            }
            e.index(t)
        },
        next: function() {
            var e = this;
            e.index(e.option("index") + 1)
        },
        index: function(e) {
            var t = this;
            if (e == null) {
                return t.option("index")
            }
            var n = t.option("data"),
                r = n[e],
                i = t.option("index");
            if (!r) {
                r = t.first();
                e = 0
            }
            t._setByObject(r)
        },
        val: function(e, t) {
            var n = this;
            if (e == null) {
                return n.option("value")
            }
            var r = n._getByValue(e);
            if (r == null) {
                r = n.first()
            }
            n._setByObject(r, t)
        },
        text: function(e) {
            var t = this;
            if (e == null) {
                return t.option("text")
            }
            var n = t._getByValue(e, "text");
            if (n == null) {
                n = t.first()
            }
            t._setByObject(n)
        },
        disable: function() {
            this.option("jquery").addClass("disble");
            this.option("disable", true)
        },
        enable: function() {
            this.option("jquery").removeClass("disble");
            this.option("disable", false)
        },
        _redrawList: function() {
            var e = this.option("holder")[0],
                t = e.options,
                n = [],
                r;
            for (var i = 0, s = t.length; i < s; i++) {
                r = t[i];
                n.push({
                    value: r.value || r.text,
                    text: r.text
                })
            }
            this.setOptions(n)
        },
        remove: function(e) {
            var t = this.option("holder")[0],
                n = t.options;
            n.remove(e);
            this._redrawList()
        },
        add: function(e) {
            var t = this.option("holder")[0],
                n = t.options;
            n.add(e);
            this._redrawList()
        }
    };
    n.fn.extend({
        yselector: function(e) {
            n.fn.yselector.events = {};
            this.each(function(t, r) {
                var s = n(this);
                var o = s.data(i);
                if (!o) {
                    e = e || {};
                    e.rawSelect = s[0];
                    o = new a;
                    s.data(i, o);
                    o._init(e);
                    s.prev(".yselector").hide()
                }
                return o
            })
        }
    })
})(this);
if (typeof window.QTMPL === "undefined") window.QTMPL = {};
window.QTMPL["FlightHotCity"] = new window.Hogan.Template(function(e, t, n) {
    var r = this;
    r.b(n = n || "");
    r.b('<div class="ui-city-sug"');
    if (r.s(r.f("width", e, t, 1), e, t, 0, 34, 60, "{{ }}")) {
        r.rs(e, t, function(e, t, n) {
            n.b(' style="width:');
            n.b(n.v(n.f("width", e, t, 0)));
            n.b('px"')
        });
        e.pop()
    }
    r.b(' data-hotcity-nogo="true">');
    r.b("\n" + n);
    r.b('    <i class="iconfont f-close js_close_flight_hotcity" id="closeXI20"></i>');
    r.b("\n" + n);
    r.b("    ");
    if (r.s(r.f("hisLength", e, t, 1), e, t, 0, 191, 403, "{{ }}")) {
        r.rs(e, t, function(e, t, n) {
            n.b('<div class="m-hst">搜索历史：');
            if (n.s(n.f("cityHistory", e, t, 1), e, t, 0, 231, 381, "{{ }}")) {
                n.rs(e, t, function(e, t, n) {
                    n.b('<span title="');
                    n.b(n.v(n.f("fcity", e, t, 0)));
                    n.b(" - ");
                    n.b(n.v(n.f("tcity", e, t, 0)));
                    n.b('" data-fcity="');
                    n.b(n.v(n.f("fcity", e, t, 0)));
                    n.b('"  data-tcity="');
                    n.b(n.v(n.f("tcity", e, t, 0)));
                    n.b('" class="js_history">');
                    n.b(n.v(n.f("fcity_abbr", e, t, 0)));
                    n.b("&nbsp;-&nbsp;");
                    n.b(n.v(n.f("tcity_abbr", e, t, 0)));
                    n.b("</span>")
                });
                e.pop()
            }
            n.b("</div>")
        });
        e.pop()
    }
    r.b("\n" + n);
    r.b('    <div class="m-hct-nav">');
    r.b("\n" + n);
    if (r.s(r.f("sort", e, t, 1), e, t, 0, 463, 630, "{{ }}")) {
        r.rs(e, t, function(e, t, n) {
            n.b('        <span data-key="');
            n.b(n.v(n.f("key", e, t, 0)));
            n.b('" data-tab="');
            n.b(n.v(n.f("type", e, t, 0)));
            n.b("-flight-hotcity-");
            n.b(n.v(n.f("cityType", e, t, 0)));
            n.b('" data-tab-id="dfh-');
            n.b(n.v(n.f("tab", e, t, 0)));
            n.b('">');
            n.b(n.v(n.f("tab", e, t, 0)));
            n.b('<i class="i1"></i><i class="i2"></i></span>');
            n.b("\n")
        });
        e.pop()
    }
    r.b("    </div>");
    r.b("\n" + n);
    if (r.s(r.f("sort", e, t, 1), e, t, 0, 664, 781, "{{ }}")) {
        r.rs(e, t, function(e, t, n) {
            n.b('    <div data-panel="');
            n.b(n.v(n.f("type", e, t, 0)));
            n.b("-flight-hotcity-");
            n.b(n.v(n.f("cityType", e, t, 0)));
            n.b('" data-panel-id="dfh-');
            n.b(n.v(n.f("tab", e, t, 0)));
            n.b('" class="m-hct-lst"></div>');
            n.b("\n")
        });
        e.pop()
    }
    r.b("</div>");
    return r.fl();
});
if (typeof module !== "undefined") module.exports = window.QTMPL["FlightHotCity"];
if (typeof window.QTMPL === "undefined") window.QTMPL = {};
window.QTMPL["FlightHotCityList"] = new window.Hogan.Template(function(e, t, n) {
    var r = this;
    r.b(n = n || "");
    if (r.s(r.f("charSort", e, t, 1), e, t, 0, 13, 521, "{{ }}")) {
        r.rs(e, t, function(e, t, r) {
            if (r.s(r.f("cityList", e, t, 1), e, t, 0, 27, 507, "{{ }}")) {
                r.rs(e, t, function(e, t, r) {
                    if (r.s(r.f("char", e, t, 1), e, t, 0, 37, 497, "{{ }}")) {
                        r.rs(e, t, function(e, t, r) {
                            r.b('<dl class="e-hct-lst ');
                            if (r.s(r.f("clshct", e, t, 1), e, t, 0, 71, 82, "{{ }}")) {
                                r.rs(e, t, function(e, t, n) {
                                    n.b("e-hct-lst-h")
                                });
                                e.pop()
                            }
                            r.b('">');
                            r.b("\n" + n);
                            r.b("	<dt>");
                            r.b(r.v(r.f("char", e, t, 0)));
                            r.b("</dt>");
                            r.b("\n" + n);
                            r.b("	<dd>");
                            r.b("\n" + n);
                            r.b("		<ul>");
                            r.b("\n" + n);
                            if (r.s(r.f("list", e, t, 1), e, t, 0, 142, 463, "{{ }}")) {
                                r.rs(e, t, function(e, t, n) {
                                    if (!n.s(n.f("titles", e, t, 1), e, t, 1, 0, 0, "")) {
                                        n.b('		    	<li><a class="js-hotcitylist" data-country="');
                                        n.b(n.v(n.f("country", e, t, 0)));
                                        n.b('" data-code="');
                                        n.b(n.v(n.f("code", e, t, 0)));
                                        n.b('" href="#">');
                                        n.b(n.v(n.f("name", e, t, 0)));
                                        n.b("</a></li>");
                                        n.b("\n")
                                    }
                                    if (n.s(n.f("titles", e, t, 1), e, t, 0, 308, 446, "{{ }}")) {
                                        n.rs(e, t, function(e, t, n) {
                                            n.b('		    	<li><a title="');
                                            n.b(n.v(n.f("titles", e, t, 0)));
                                            n.b('" class="js-hotcitylist" data-country="');
                                            n.b(n.v(n.f("country", e, t, 0)));
                                            n.b('" data-code="');
                                            n.b(n.v(n.f("code", e, t, 0)));
                                            n.b('" href="#">');
                                            n.b(n.v(n.f("name", e, t, 0)));
                                            n.b("</a></li>");
                                            n.b("\n")
                                        });
                                        e.pop()
                                    }
                                });
                                e.pop()
                            }
                            r.b("		</ul>");
                            r.b("\n" + n);
                            r.b("	</dd>");
                            r.b("\n" + n);
                            r.b("</dl>");
                            r.b("\n")
                        });
                        e.pop()
                    }
                });
                e.pop()
            }
        });
        e.pop()
    }
    r.b("\n" + n);
    if (r.s(r.f("fuzzy_c", e, t, 1), e, t, 0, 548, 908, "{{ }}")) {
        r.rs(e, t, function(e, t, r) {
            if (r.s(r.f("countryList", e, t, 1), e, t, 0, 565, 891, "{{ }}")) {
                r.rs(e, t, function(e, t, r) {
                    if (r.s(r.f("char", e, t, 1), e, t, 0, 575, 881, "{{ }}")) {
                        r.rs(e, t, function(e, t, r) {
                            r.b('<dl class="e-hct-lst ');
                            if (r.s(r.f("clshct", e, t, 1), e, t, 0, 609, 620, "{{ }}")) {
                                r.rs(e, t, function(e, t, n) {
                                    n.b("e-hct-lst-h")
                                });
                                e.pop()
                            }
                            r.b('">');
                            r.b("\n" + n);
                            r.b('	<span class="e-fuzzy-line"></span>');
                            r.b("\n" + n);
                            r.b("	<dt>");
                            r.b(r.v(r.f("char", e, t, 0)));
                            r.b("</dt>");
                            r.b("\n" + n);
                            r.b("	<dd>");
                            r.b("\n" + n);
                            r.b("		<ul>");
                            r.b("\n" + n);
                            if (r.s(r.f("listCountry", e, t, 1), e, t, 0, 723, 840, "{{ }}")) {
                                r.rs(e, t, function(e, t, n) {
                                    n.b('		    <li><a class="js-hotcitylist" data-country="');
                                    n.b(n.v(n.f("country", e, t, 0)));
                                    n.b('" data-code="');
                                    n.b(n.v(n.f("code", e, t, 0)));
                                    n.b('" href="#">');
                                    n.b(n.v(n.f("name", e, t, 0)));
                                    n.b("</a></li>");
                                    n.b("\n")
                                });
                                e.pop()
                            }
                            r.b("		</ul>");
                            r.b("\n" + n);
                            r.b("	</dd>");
                            r.b("\n" + n);
                            r.b("</dl>");
                            r.b("\n")
                        });
                        e.pop()
                    }
                });
                e.pop()
            }
        });
        e.pop()
    }
    r.b("\n" + n);
    r.b("\n" + n);
    if (r.s(r.f("fuzzy", e, t, 1), e, t, 0, 933, 1281, "{{ }}")) {
        r.rs(e, t, function(e, t, r) {
            if (r.s(r.f("hotword", e, t, 1), e, t, 0, 946, 1268, "{{ }}")) {
                r.rs(e, t, function(e, t, r) {
                    if (r.s(r.f("char", e, t, 1), e, t, 0, 956, 1258, "{{ }}")) {
                        r.rs(e, t, function(e, t, r) {
                            r.b('<dl class="e-hct-lst ');
                            if (r.s(r.f("clshct", e, t, 1), e, t, 0, 990, 1001, "{{ }}")) {
                                r.rs(e, t, function(e, t, n) {
                                    n.b("e-hct-lst-h")
                                });
                                e.pop()
                            }
                            r.b('">');
                            r.b("\n" + n);
                            r.b('	<span class="e-fuzzy-line"></span>');
                            r.b("\n" + n);
                            r.b("	<dt>");
                            r.b(r.v(r.f("char", e, t, 0)));
                            r.b("</dt>");
                            r.b("\n" + n);
                            r.b("	<dd>");
                            r.b("\n" + n);
                            r.b("		<ul>");
                            r.b("\n" + n);
                            if (r.s(r.f("listfuzzy", e, t, 1), e, t, 0, 1102, 1219, "{{ }}")) {
                                r.rs(e, t, function(e, t, n) {
                                    n.b('		    <li><a class="js-hotcitylist" data-country="');
                                    n.b(n.v(n.f("country", e, t, 0)));
                                    n.b('" data-code="');
                                    n.b(n.v(n.f("code", e, t, 0)));
                                    n.b('" href="#">');
                                    n.b(n.v(n.f("name", e, t, 0)));
                                    n.b("</a></li>");
                                    n.b("\n")
                                });
                                e.pop()
                            }
                            r.b("		</ul>");
                            r.b("\n" + n);
                            r.b("	</dd>");
                            r.b("\n" + n);
                            r.b("</dl>");
                            r.b("\n")
                        });
                        e.pop()
                    }
                });
                e.pop()
            }
        });
        e.pop()
    }
    r.b("\n" + n);
    if (!r.s(r.f("charSort", e, t, 1), e, t, 1, 0, 0, "")) {
        r.b("<ul>");
        r.b("\n" + n);
        if (r.s(r.f("cityList", e, t, 1), e, t, 0, 1326, 1434, "{{ }}")) {
            r.rs(e, t, function(e, t, n) {
                n.b('	<li><a class="js-hotcitylist" data-country="');
                n.b(n.v(n.f("country", e, t, 0)));
                n.b('" data-code="');
                n.b(n.v(n.f("code", e, t, 0)));
                n.b('" href="#">');
                n.b(n.v(n.f("name", e, t, 0)));
                n.b("</a></li>");
                n.b("\n")
            });
            e.pop()
        }
        r.b("</ul>");
        r.b("\n")
    }
    r.b("\n" + n);
    r.b("\n" + n);
    if (r.s(r.f("fuzzyArea", e, t, 1), e, t, 0, 1484, 1636, "{{ }}")) {
        r.rs(e, t, function(e, t, r) {
            r.b("<ul>");
            r.b("\n" + n);
            if (r.s(r.f("countryList", e, t, 1), e, t, 0, 1506, 1613, "{{ }}")) {
                r.rs(e, t, function(e, t, n) {
                    n.b('	<li><a class="js-hotcitylist" data-country="');
                    n.b(n.v(n.f("country", e, t, 0)));
                    n.b('" data-code="');
                    n.b(n.v(n.f("code", e, t, 0)));
                    n.b('" href="#">');
                    n.b(n.v(n.f("name", e, t, 0)));
                    n.b("</a></li>");
                    n.b("\n")
                });
                e.pop()
            }
            r.b("</ul>");
            r.b("\n")
        });
        e.pop()
    }
    return r.fl();
});
if (typeof module !== "undefined") module.exports = window.QTMPL["FlightHotCityList"];
if (typeof window.QTMPL === "undefined") window.QTMPL = {};
window.QTMPL["MultiFlightSearchBox_list"] = new window.Hogan.Template(function(e, t, n) {
    var r = this;
    r.b(n = n || "");
    r.b('<div class="muti_control">');
    r.b("\n" + n);
    r.b('    <div class="crl_sp_city">');
    r.b("\n" + n);
    r.b('        <div class="crl_lab">第<span class="hl">');
    r.b(r.v(r.f("trip", e, t, 0)));
    r.b("</span>程</div>");
    r.b("\n" + n);
    r.b('        <div class="controls">');
    r.b("\n" + n);
    r.b('            <div style="z-index: 40;" class="qcbox qcity">');
    r.b("\n" + n);
    r.b('                <div class="qunar-qcbox">');
    r.b("\n" + n);
    r.b('                    <div class="qcbox-prefix">从</div>');
    r.b("\n" + n);
    r.b('                    <div class="qcbox-info"><b></b></div>');
    r.b("\n" + n);
    r.b("                </div>");
    r.b("\n" + n);
    r.b('                <input type="text" value="" name="fromCityMulti" class="textbox" data-qcbox-placeholder="出发地" data-qcbox-prefix="从" data-qcbox-suggest="flight-fromcity" data-qcbox-hotcity="flight" spellcheck="false" autocomplete="off" x-webkit-speech="x-webkit-speech" />');
    r.b("\n" + n);
    r.b('                <div class="qcbox-fixed js-suggestcontainer"></div>');
    r.b("\n" + n);
    r.b("            </div>");
    r.b("\n" + n);
    r.b("        </div>");
    r.b("\n" + n);
    r.b('        <div class="controls">');
    r.b("\n" + n);
    r.b('            <div style="z-index: 30;" class="qcbox qcity">');
    r.b("\n" + n);
    r.b('                <div class="qunar-qcbox">');
    r.b("\n" + n);
    r.b('                    <div class="qcbox-prefix">到</div>');
    r.b("\n" + n);
    r.b('                    <div class="qcbox-info"><b></b></div>');
    r.b("\n" + n);
    r.b("                </div>");
    r.b("\n" + n);
    r.b('                <input type="text" value="" name="toCityMulti" class="textbox" data-qcbox-placeholder="目的地" data-qcbox-prefix="到" data-qcbox-suggest="flight-tocity" data-qcbox-hotcity="flight" spellcheck="false" autocomplete="off" x-webkit-speech="x-webkit-speech" />');
    r.b("\n" + n);
    r.b('                <div class="qcbox-fixed js-suggestcontainer"></div>');
    r.b("\n" + n);
    r.b("            </div>");
    r.b("\n" + n);
    r.b("        </div>");
    r.b("\n" + n);
    r.b("    </div>");
    r.b("\n" + n);
    r.b('    <div class="crl_sp_date">');
    r.b("\n" + n);
    r.b('        <div class="crl_lab">日期</div>');
    r.b("\n" + n);
    r.b('             <div class="controls">');
    r.b("\n" + n);
    r.b('            <div class="qcbox qdate fromD">');
    r.b("\n" + n);
    r.b('                <div class="qunar-qcbox">');
    r.b("\n" + n);
    r.b('                    <div class="qcbox-prefix">往</div>');
    r.b("\n" + n);
    r.b('                    <div class="qcbox-info"><b></b></div>');
    r.b("\n" + n);
    r.b("                </div>");
    r.b("\n" + n);
    r.b('                <input type="text" value="" name="fromDateMulti" class="textbox" spellcheck="false" autocomplete="off" maxlength="10" data-prefix="出发" />');
    r.b("\n" + n);
    r.b("            </div>");
    r.b("\n" + n);
    r.b("        </div>");
    r.b("\n" + n);
    r.b("    </div>");
    r.b("\n" + n);
    r.b('    <div class="crl_sp_del"><i class="iconfont f-close" id="delete');
    r.b(r.v(r.f("trip", e, t, 0)));
    r.b('"></i></div>');
    r.b("\n" + n);
    r.b("</div>");
    r.b("\n");
    return r.fl();
});
if (typeof module !== "undefined") module.exports = window.QTMPL["MultiFlightSearchBox_list"];
var BaseFlightSearchBox = function(e) {
    function E(e) {
        return e.prevAll(".dp-prefix")
    }

    function S(e) {
        e.fdatepicker("setting", "linkTo", null)
    }

    function x(e, t) {
        e.fdatepicker("setting", "linkTo", t);
        t.data("q-datepicker-fly").ui.setFuzzyDate(e.val());
        var n = e.data("q-datepicker-fly").ui;
        n.checkLinked({
            pos: n.picker.args.pos,
            restPos: 0
        })
    }

    function T(e) {
        return e !== ""
    }

    function N(e) {
        var e = new Date(e);
        var t = window.SERVER_TIME || new Date;
        var n = new Date(t.getFullYear(), t.getMonth(), t.getDate());
        if (e.getTime() < n.getTime()) {
            e = new Date(t.getTime() + 2 * 24 * 60 * 60 * 1e3)
        }
        var r = e.getFullYear();
        var i = e.getMonth() + 1;
        var s = e.getDate();
        i = i < 10 ? "0" + i : i;
        s = s < 10 ? "0" + s : s;
        return [r, i, s].join("-")
    }

    function C(e) {
        var t = e.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
        return t ? new Date(t[1], t[2] * 1 - 1, t[3]) : null
    }

    function k(t, n) {
        e.each(n, function(e, n) {
            if (e === "value") {
                var r = t.data("q-suggest");
                if (r) {
                    r.setValue(n)
                }
                t.val(n)
            } else {
                switch (e) {
                    case "country":
                        t.data("country", n);
                        break;
                    case "valided":
                        t.data("valided", n);
                        break
                }
            }
        })
    }

    function L(t) {
        return e.extend({}, t.data(), {
            value: e.trim(t.val())
        })
    }

    function A() {}
    var t = "input[name=fromCity]";
    var n = "input[name=toCity]";
    var r = "input[name=fromDate]";
    var i = "input[name=toDate]";
    var s = ".js-exchagne-city";
    var o = "input[name=from]";
    var u = ".search_selbox";
    var a = "input[name=pfromCity]";
    var f = "input[name=ptoCity]";
    var l = "input[name=pfromDate]";
    var c = ".js-exchagne-pcity";
    var h = "#js_searchtype_domestic";
    var p = "#js_searchtype_international";
    var d = "input[name=search]";
    var v = "input[name=drange]";
    var m = ".js_arrivalDateDiv_disable";
    var g = ".js_arrivalDateDiv";
    var y = ".js-suggestcontainer";
    var b = 3630;
    var w = FlightSearchBoxConf.specPlace;
    e.extend(A.prototype, {
        init: function(y) {
            var b = this;
            if (b._inited) {
                return
            }
            var w = e(y.form);
            var S = y.hotcity;
            var x = y.photcity;
            var T = y.delay || null;
            b.isFuzzy = y.isFuzzy;
            b.placeHolder = y.placeHolder;
            b.pplaceHolder = y.pplaceHolder;
            b.supportPrice = typeof y.supportPrice === "undefined" ? false : y.supportPrice;
            b.form = y.form;
            b.$form = w;
            b.$toDate = w.find(i);
            b.$fromDate = w.find(r);
            b.$fromCity = w.find(t);
            b.$toCity = w.find(n);
            b.$selector = w.find(u);
            b.$pfromCity = w.find(a);
            b.$ptoCity = w.find(f);
            b.$pfromDate = w.find(l);
            b.$pexchange = e(c, w);
            b.$arrDateWp_dis = e(m, w);
            b.$arrDateWp = e(g, w);
            b.$tjDomesticRadio = e(h, w);
            b.$tjInternationalRadio = e(p, w);
            b.$tjSearchRadio = e(d, w);
            b.$tjDateRange = e(v, w);
            b.$exchange = e(s, w);
            b.$from = e(o, w);
            b._initCityInput(S);
            b._initDatePicker(T);
            if (x) {
                b._initpCityInput(x);
                b._initpDatePicker(T)
            }
            b.$selector.yselector({
                showWhenHover: true,
                onchange: function(e) {
                    b._searchType(e.value)
                }
            });
            b._bindEvents();
            b.$toDatePrefix = E(b.$toDate);
            b.$fromDatePrefix = E(b.$fromDate);
            b._inited = true;
            e(b).trigger("initialized");
            b.imfs = y.imfs;
            return b
        },
        _searchType: function(t) {
            var n = this;
            if (t == "OnewayFlight") {
                e("#one-round-ser").show();
                e("#moreway-ser").hide();
                S(n.$fromDate);
                n.$fromDate.attr("data-type", "oneWay");
                n.$arrDateWp_dis.show();
                n.$arrDateWp.hide()
            } else if (t == "RoundTripFlight") {
                e("#one-round-ser").show();
                e("#moreway-ser").hide();
                x(n.$fromDate, n.$toDate);
                n.$fromDate.attr("data-type", "");
                n.$arrDateWp_dis.hide();
                n.$arrDateWp.hide().show()
            } else if (t == "MultiTripFlight") {
                e("#one-round-ser").hide();
                e("#moreway-ser").show();
                if (e("#js_schwrap").className == "b_fly_schwrap b_fly_fixtop") {
                    var r = e("#js_clp_Top");
                    if (r) {
                        r.style.display = "block"
                    }
                }
            }
            return e("#searchType").val()
        },
        _initCityInput: function(t) {
            var n = this;
            var r = n.$fromCity.nextAll(y);
            var i = n.$toCity.nextAll(y);
            var s = n.$fromCity,
                o = n.$toCity;
            var u = new FlightHotCity;
            var a = new FlightHotCity;
            var f = new FlightSuggest;
            var l = new FlightSuggest;
            this.fromCitySuggest = f;
            this.toCitySuggest = l;
            n.fromHotCity = u;
            n.toHotCity = a;
            s.data("qcbox-placeholder", n.placeHolder);
            o.data("qcbox-placeholder", n.placeHolder);
            e.each([u, a, f, l], function(t, r) {
                e(r).bind("setvalue", function(t, r) {
                    n._clearError(r);
                    e(n).trigger("boxchange");
                    e(n).trigger("citychange")
                })
            });
            e(u).bind("hotcity-show", function() {
                try {
                    n.$fromCity.data("q-suggest").hide()
                } catch (t) {}
                if (!this.$dom[0]) {
                    e(n).trigger("no_exhitbit", this.cityType)
                }
                trackAction("QH|HCT|open")
            });
            e(a).bind("hotcity-show", function() {
                try {
                    n.$toCity.data("q-suggest").hide()
                } catch (t) {}
                if (!this.$dom[0]) {
                    e(n).trigger("no_exhitbit", this.cityType)
                }
                trackAction("QH|HCT|open")
            });
            u.init({
                type: t.fromtype,
                cityType: "from",
                defaultTab: t.fromDefaultTab
            });
            f.init({
                name: "flight-fromcity",
                container: r,
                tiptext: s.data("qcbox-placeholder"),
                allPlace: this.isFuzzy
            });
            s.qcbox();
            a.init({
                type: t.totype,
                cityType: "to",
                defaultTab: t.toDefaultTab
            });
            l.init({
                name: "flight-tocity",
                container: i,
                tiptext: o.data("qcbox-placeholder"),
                allPlace: this.isFuzzy
            });
            o.qcbox()
        },
        _initpCityInput: function(t) {
            var n = this;
            var r = n.$pfromCity.nextAll(y);
            var i = n.$ptoCity.nextAll(y);
            var s = n.$pfromCity,
                o = n.$ptoCity;
            var u = new FlightHotCity;
            var a = new FlightHotCity;
            var f = new FlightSuggest;
            var l = new FlightSuggest;
            this.pfromCitySuggest = f;
            this.ptoCitySuggest = l;
            n.pfromHotCity = u;
            n.ptoHotCity = a;
            s.data("qcbox-placeholder", n.pplaceHolder);
            o.data("qcbox-placeholder", n.pplaceHolder);
            e.each([u, a, f, l], function(t, r) {
                e(r).bind("setvalue", function(t, r) {
                    n._clearError(r);
                    e(n).trigger("boxchange");
                    e(n).trigger("citychange")
                })
            });
            e(u).bind("hotcity-show", function() {
                try {
                    n.$pfromCity.data("q-suggest").hide()
                } catch (t) {}
                if (!this.$dom[0]) {
                    e(n).trigger("no_exhitbit", this.cityType)
                }
                trackAction("QH|HCT|open")
            });
            e(a).bind("hotcity-show", function() {
                try {
                    n.$ptoCity.data("q-suggest").hide()
                } catch (t) {}
                if (!this.$dom[0]) {
                    e(n).trigger("no_exhitbit", this.cityType)
                }
                trackAction("QH|HCT|open")
            });
            u.init({
                type: t.fromtype,
                cityType: "from",
                defaultTab: t.fromDefaultTab,
                width: t.hotcityWidth
            });
            f.init({
                name: "flight-fromcity",
                container: r,
                tiptext: s.data("qcbox-placeholder"),
                allPlace: false
            });
            s.qcbox();
            a.init({
                type: t.totype,
                cityType: "to",
                defaultTab: t.toDefaultTab,
                width: t.hotcityWidth
            });
            l.init({
                name: "flight-tocity",
                container: i,
                tiptext: o.data("qcbox-placeholder"),
                allPlace: false
            });
            o.qcbox()
        },
        _initDatePicker: function(t) {
            var n = this;
            var r = typeof SERVER_TIME !== "undefined" ? SERVER_TIME : new Date,
                i = new Date(r.getFullYear(), r.getMonth(), r.getDate()),
                s = new Date(r.getFullYear(), r.getMonth(), r.getDate() + b);
            var o = t ? t.fromDateDelay : 2;
            toDateDelay = t ? t.toDateDelay : 5;
            var u = new Date(r.getFullYear(), r.getMonth(), r.getDate() + o),
                a = new Date(r.getFullYear(), r.getMonth(), r.getDate() + toDateDelay);
            var f = n.$fromDate,
                l = n.$toDate;
            var c = l.fdatepicker({
                ui: "qunar",
                refObj: f,
                defaultDay: a.valueOf(),
                maxDate: s,
                schForm: n,
                on: {
                    "q-datepicker-select": function() {
                        e(n).trigger("boxchange")
                    },
                    "q-datepicker-show": function() {
                        trackAction("QH|DP|open")
                    }
                }
            });
            var h = f.fdatepicker({
                ui: "qunar",
                linkRules: "+7D,+0D",
                minDate: i,
                maxDate: s,
                linkTo: c,
                defaultDay: u.valueOf(),
                schForm: n,
                on: {
                    "q-datepicker-select": function() {
                        e(n).trigger("boxchange")
                    },
                    "q-datepicker-show": function() {
                        trackAction("QH|DP|open")
                    }
                }
            });
            setTimeout(function() {
                f.bind("q-datepicker-select", function() {
                    if (c.is(":visible")) {
                        c.focus();
                        c.data("q-datepicker-fly").show()
                    }
                })
            }, 0);
            if (n.supportPrice) {
                var p = {
                    $fromCity: n.$fromCity,
                    $toCity: n.$toCity,
                    $fromDate: n.$fromDate
                };
                f.data("q-datepicker-fly").supportPrice(true, p);
                l.data("q-datepicker-fly").supportPrice(true, p)
            }
            if (this.isFuzzy) {
                f.data("q-datepicker-fly").setFuzzy(true);
                l.data("q-datepicker-fly").setFuzzy(true)
            }
        },
        _initpDatePicker: function(t) {
            var n = this;
            var r = typeof SERVER_TIME !== "undefined" ? SERVER_TIME : new Date,
                i = new Date(r.getFullYear(), r.getMonth(), r.getDate()),
                s = new Date(r.getFullYear(), r.getMonth(), r.getDate() + b);
            var o = t ? t.fromDateDelay : 2;
            toDateDelay = t ? t.toDateDelay : 5;
            var u = new Date(r.getFullYear(), r.getMonth(), r.getDate() + o),
                a = new Date(r.getFullYear(), r.getMonth(), r.getDate() + toDateDelay);
            var f = n.$pfromDate;
            var l = f.fdatepicker({
                ui: "qunar",
                linkRules: "+3D,+0D",
                minDate: i,
                maxDate: s,
                defaultDay: u.valueOf(),
                on: {
                    "q-datepicker-select": function() {
                        e(n).trigger("boxchange")
                    },
                    "q-datepicker-show": function() {
                        trackAction("QH|DP|open")
                    }
                }
            });
            if (n.supportPrice) {
                var c = {
                    $fromCity: n.$pfromCity,
                    $toCity: n.$ptoCity,
                    $fromDate: n.$pfromDate
                };
                f.data("q-datepicker-fly").supportPrice(true, c)
            }
            if (this.isFuzzy) {}
        },
        parseDate: function(e) {
            return C(e)
        },
        _bindEvents: function() {
            var e = this;
            e._submitCheck();
            e._bindExChangeCityEvent();
            e._bindSearchTypeChangeEvent()
        },
        _bindExChangeCityEvent: function() {
            var e = this;
            e.$exchange.click(function(t) {
                var n = "";
                var r = e.getToCity();
                e.setToCity(e.getFromCity());
                e.setFromCity(r);
                trackAction("QH|FC|change");
                if (window.location.href.indexOf("oneway_list") > -1) {
                    n = "onewayList"
                }
                if (window.location.href.indexOf("roundtrip_list_new") > -1) {
                    n = "roundtripList"
                }
                if (n != "") {
                    $jex.log({
                        s: "flight",
                        p: n,
                        r: "searchboxClick",
                        type: "exchagne"
                    })
                }
                t.preventDefault()
            });
            e.$pexchange.click(function(t) {
                var n = e.getpToCity();
                e.setpToCity(e.getpFromCity());
                e.setpFromCity(n);
                trackAction("QH|FC|change");
                t.preventDefault()
            })
        },
        _bindSearchTypeChangeEvent: function() {
            var e = this;
            var t = e.$form,
                n = e.$fromDate,
                r = e.$toDate,
                i = e.$selector.data("YSELECTOR");
            e.$arrDateWp_dis.click(function() {
                i.val("RoundTripFlight")
            })
        },
        _showError: function(e, t) {
            var n = this;
            var r;
            switch (e) {
                case "from":
                    r = n.$fromCity;
                    break;
                case "to":
                    r = n.$toCity;
                    break;
                case "pfrom":
                    r = n.$pfromCity;
                    break;
                case "pto":
                    r = n.$ptoCity;
                    break
            }
            if (!r.data("org-placeholder")) {
                r.data("org-placeholder", r.data("qcbox-placeholder"))
            }
            r.data("qcbox-placeholder", t);
            r.val("");
            r.parent().parent().addClass("qcbox_err")
        },
        _clearError: function(e) {
            e.data("qcbox-placeholder", e.data("org-placeholder"));
            e.parent().parent().removeClass("qcbox_err")
        },
        _checkCity: function(e, t) {
            var n = this;
            var r = t.value;
            if (T(r) && !t.valided) {
                return false
            }
            return true
        },
        _checkpCity: function(t, n) {
            var r = this;
            var i = n.value;
            if (e.trim(i) === "" || !n.valided) {
                return false
            }
            return true
        },
        _submitCheck: function() {
            var t = this;
            t.$form.submit(function(n) {
                var r = t.getFromCity(),
                    i = t.getToCity();
                var s = true;
                var o = r.value;
                var u = i.value;
                var a = t.$tjDateRange.val();
                if (e("#js_schwrap").hasClass("b_fly_fixtop")) {
                    t.$from.val("zdzl")
                } else {
                    t.$from.val("fi_re_search")
                }
                if (t.$selector && t.$selector.val() == "MultiTripFlight") {
                    s = t.imfs.submitCheck();
                    if (s) {
                        var f = t.imfs.getMultiValue();
                        t.$toCity.val(f.toCity);
                        t.$fromDate.val(f.fromDate);
                        t.$fromCity.val(f.fromCity)
                    }
                    return s
                }
                if (!t._checkCity("from", r)) {
                    r.qcbox.$el.trigger("mouseup");
                    s = false
                } else if (!t._checkCity("to", i)) {
                    i.qcbox.$el.trigger("mouseup");
                    s = false
                }
                if (o === u && T(o) && e.inArray(o, w) == -1) {
                    t._showError("to", "不能和出发地相同");
                    s = false
                }
                if (encodeURIComponent(o) === "%E6%9E%97%E6%B5%A9" && encodeURIComponent(u) === "%E6%B0%B8%E8%83%9C") {
                    t._showError("from", decodeURIComponent("%E5%AF%B9%E4%B8%8D%E8%B5%B7"));
                    t._showError("to", decodeURIComponent("%E4%BB%96%E4%BB%AC%E6%98%AF%E5%86%A4%E5%AE%B6"));
                    s = false
                }
                if (!s) {
                    return false
                }
                var l = {
                    fd: t.fromDate(),
                    td: t.toDate(),
                    fromCity: o,
                    toCity: u,
                    drange: a,
                    type: t._type,
                    searchType: t._searchType()
                };
                var c = SearchCaution;
                if (c.check(l)) {
                    c.show();
                    return false
                }
                e(t).trigger("select_btn");
                $jex.log({
                    action: "oneway_search_start"
                })
            })
        },
        getId: function() {
            return this.form
        },
        setFromCity: function(t) {
            k(this.$fromCity, t);
            this._clearError(this.$fromCity);
            e(this).trigger("boxchange");
            return this
        },
        getFromCity: function() {
            return L(this.$fromCity)
        },
        setpFromCity: function(t) {
            k(this.$pfromCity, t);
            this._clearError(this.$pfromCity);
            e(this).trigger("pboxchange");
            return this
        },
        getpFromCity: function() {
            return L(this.$pfromCity)
        },
        setToCity: function(t) {
            k(this.$toCity, t);
            this._clearError(this.$toCity);
            e(this).trigger("boxchange");
            return this
        },
        getToCity: function() {
            return L(this.$toCity)
        },
        setpToCity: function(t) {
            k(this.$ptoCity, t);
            this._clearError(this.$ptoCity);
            e(this).trigger("pboxchange");
            return this
        },
        getpToCity: function() {
            return L(this.$ptoCity)
        },
        fromDate: function(t) {
            if (t == null) {
                return this.$fromDate.val()
            } else {
                this.$fromDate.data("q-datepicker-fly").select(C(t));
                e(this).trigger("boxchange")
            }
            return this
        },
        pfromDate: function(t) {
            if (t == null) {
                return this.$pfromDate.val()
            } else {
                this.$pfromDate.data("q-datepicker-fly").select(C(t));
                e(this).trigger("boxchange")
            }
            return this
        },
        toDate: function(t) {
            if (t == null) {
                return this.$toDate.val()
            } else {
                this.$toDate.data("q-datepicker-fly").select(C(t));
                e(this).trigger("boxchange")
            }
            return this
        },
        fromParam: function(e) {
            if (e == null) {
                return this.$from.val()
            } else {
                this.$from.val(e)
            }
            return this
        },
        getDom: function() {
            return this.$form
        },
        fill: function(e) {
            if (!e) {
                return
            }
            var t = this;
            t.setFromCity({
                value: (e.searchDepartureAirport || e.fromCity) + (e.fromCode ? "(" + e.fromCode + ")" : ""),
                country: "",
                valided: true
            });
            t.setToCity({
                value: (e.searchArrivalAirport || e.toCity) + (e.toCode ? "(" + e.toCode + ")" : ""),
                country: "",
                valided: true
            });
            trackAction("QH|HCT|history|" + encodeURIComponent(e.fromCity));
            trackAction("QH|HCT|history|" + encodeURIComponent(e.toCity));
            var n = e.searchDepartureTime || e.fromDate,
                r = e.searchArrivalTime || e.toDate;
            n = n.replace(/-/g, "/");
            r = r.replace(/-/g, "/");
            t.fromDate(N(n));
            r ? t.toDate(N(r)) : "";
            if (t.$pfromCity && t.$pfromCity.length) {
                t.setpFromCity({
                    value: e.searchDepartureAirport || e.fromCity,
                    country: "",
                    valided: true
                });
                t.setpToCity({
                    value: e.searchArrivalAirport || e.toCity,
                    country: "",
                    valided: true
                });
                t.pfromDate(N(n))
            }
        }
    });
    return A
}(jQuery);
var BaseMultiFlightSearchBox = function(e) {
    function u(e) {
        return e.prevAll(".dp-prefix")
    }

    function a(e) {
        e.fdatepicker("setting", "linkTo", null);
        e.data("q-datepicker-fly").select(h(e.val()))
    }

    function f(e, t) {
        e.fdatepicker("setting", "linkTo", t);
        e.data("q-datepicker-fly").select(h(e.val()))
    }

    function l(e) {
        return e !== ""
    }

    function c(e) {
        var e = new Date(e.replace(/-/g, "/"));
        var t = window.SERVER_TIME || new Date;
        var n = new Date(t.getFullYear(), t.getMonth(), t.getDate());
        if (e.getTime() < n.getTime()) {
            e = new Date(t.getTime() + 2 * 24 * 60 * 60 * 1e3)
        }
        var r = e.getFullYear();
        var i = e.getMonth() + 1;
        var s = e.getDate();
        i = i < 10 ? "0" + i : i;
        s = s < 10 ? "0" + s : s;
        return [r, i, s].join("-")
    }

    function h(e) {
        var t = e.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
        return t ? new Date(t[1], t[2] * 1 - 1, t[3]) : null
    }

    function p(t, n) {
        e.each(n, function(e, n) {
            if (e === "value") {
                var r = t.data("q-suggest");
                if (r) {
                    r.setValue(n)
                }
                t.val(n)
            } else {
                switch (e) {
                    case "country":
                        t.data("country", n);
                        break;
                    case "valided":
                        t.data("valided", n);
                        break
                }
            }
        })
    }

    function d(t) {
        return e.extend({}, t.data(), {
            value: e.trim(t.val())
        })
    }

    function v() {}
    var t = "input[name=fromCityMulti]";
    var n = "input[name=toCityMulti]";
    var r = "input[name=fromDateMulti]";
    var i = "input[name=toDateMulti]";
    var s = ".js-suggestcontainer";
    var o = 363;
    e.extend(v.prototype, {
        init: function(s) {
            var o = this;
            if (o._inited) {
                return
            }
            this.tripCount = 2;
            this.trip_zh = ["一", "二", "三", "四", "五", "六"];
            var a = e(s.form);
            this.hotCityConfig = s.hotcity;
            this.delay = s.delay || null;
            o.moreSearboxArr = [];
            o.supportPrice = typeof s.supportPrice === "undefined" ? false : s.supportPrice;
            o.form = s.form;
            o.$form = a;
            o.$toDate = a.find(i);
            o.$fromDate = a.find(r);
            o.$fromCity = a.find(t);
            o.$toCity = a.find(n);
            o.placeHolder = {};
            for (var l = 0; l < o.$fromCity.length; l++) {
                o._initCityInput(this.hotCityConfig, o.$fromCity.eq(l), o.$toCity.eq(l), o.$fromDate.eq(l));
                o._initDatePicker(this.delay, o.$fromDate.eq(l), o.$fromCity.eq(l), o.$toCity.eq(l));
                l == 1 && f(o.$fromDate.eq(0), o.$fromDate.eq(1))
            }
            o._bindEvents();
            o.$toDatePrefix = u(o.$toDate);
            o.$fromDatePrefix = u(o.$fromDate);
            o._inited = true;
            e(o).trigger("initialized");
            return o
        },
        _initCityInput: function(t, n, r, i) {
            var o = this;
            var u = n.nextAll(s);
            var a = r.nextAll(s);
            var f = new FlightHotCity;
            var l = new FlightHotCity;
            var c = new FlightSuggest;
            var h = new FlightSuggest;
            this.fromCitySuggest = c;
            this.toCitySuggest = h;
            e.each([f, l, c, h], function(t, n) {
                e(n).bind("setvalue", function(t, n) {
                    o._clearError(n);
                    e(o).trigger("boxchange");
                    e(o).trigger("citychange")
                })
            });
            e(f).bind("hotcity-show", function() {
                if (!this.$dom[0]) {
                    e(o).trigger("no_exhitbit", this.cityType)
                }
                try {
                    n.data("q-suggest").hide()
                } catch (t) {}
                trackAction("QH|HCT|open")
            });
            e(l).bind("hotcity-show", function() {
                if (!this.$dom[0]) {
                    e(o).trigger("no_exhitbit", this.cityType)
                }
                try {
                    r.data("q-suggest").hide()
                } catch (t) {}
                trackAction("QH|HCT|open")
            });
            e(f).bind("hotcity-select", function(e, t) {
                r.focus();
                r.trigger("showHotCity");
                trackAction("QH|HCT|select|" + encodeURIComponent(t))
            });
            e(l).bind("hotcity-select", function(e, t) {
                i.focus();
                i.data("q-datepicker-fly").show();
                trackAction("QH|HCT|select|" + encodeURIComponent(t))
            });
            f.init({
                type: t.fromtype,
                cityType: "from",
                defaultTab: t.fromDefaultTab
            });
            c.init({
                name: "flight-fromcity",
                container: u,
                tiptext: n.data("qcbox-placeholder"),
                typename: "mult"
            });
            n.qcbox();
            l.init({
                type: t.totype,
                cityType: "to",
                defaultTab: t.toDefaultTab
            });
            h.init({
                name: "flight-tocity",
                container: a,
                tiptext: r.data("qcbox-placeholder"),
                typename: "mult"
            });
            r.qcbox();
            o.setCityData(n, {
                value: "",
                country: "",
                valided: true
            });
            o.setCityData(r, {
                value: "",
                country: "",
                valided: true
            });
            n.focus(function() {
                if (!this.value) {
                    o._addLinkedCity(n, "from")
                }
            });
            r.focus(function() {
                if (!this.value) {
                    o._addLinkedCity(r, "to")
                }
            })
        },
        _initDatePicker: function(t, n, r, i) {
            var s = this;
            var u = typeof SERVER_TIME !== "undefined" ? SERVER_TIME : new Date,
                a = new Date(u.getFullYear(), u.getMonth(), u.getDate()),
                f = new Date(u.getFullYear(), u.getMonth(), u.getDate() + o);
            var l = t ? t.fromDateDelay : 2;
            toDateDelay = t ? t.toDateDelay : 5;
            var c = new Date(u.getFullYear(), u.getMonth(), u.getDate() + l),
                h = new Date(u.getFullYear(), u.getMonth(), u.getDate() + toDateDelay);
            var p = n.fdatepicker({
                ui: "qunar",
                linkRules: "+7D,+0D",
                minDate: a,
                maxDate: f,
                linkTo: null,
                single: true,
                defaultDay: c.valueOf(),
                schForm: s,
                on: {
                    "q-datepicker-select": function() {
                        e(s).trigger("boxchange")
                    },
                    "q-datepicker-show": function() {
                        trackAction("QH|DP|open")
                    }
                }
            });
            if (s.supportPrice) {
                var d = {
                    $fromCity: r,
                    $toCity: i,
                    $fromDate: n
                };
                n.data("q-datepicker-fly").supportPrice(true, d)
            }
        },
        parseDate: function(e) {
            return h(e)
        },
        _bindEvents: function() {
            var e = this;
            var t = this;
            e.$form.submit(function(e) {});
            e._bindHoverInfoEvent();
            e._bindAddTripEvent()
        },
        _bindHoverInfoEvent: function() {
            var t = e("#morlinePoint");
            var n = e("#hoverInfo");
            n.bind("mouseover", function() {
                t.show()
            });
            n.bind("mouseout", function() {
                t.hide()
            })
        },
        _bindAddTripEvent: function() {
            var i = this,
                s = i.$form;
            i.zindexCount = 0;
            e("#js_addtrip").click(function() {
                i.tripCount++;
                i.zindexCount++;
                var o = e(QTMPL.MultiFlightSearchBox_list.render({
                    trip: i.tripCount,
                    zindex: 100 - i.zindexCount
                }));
                e("#js_trips_list").append(o);
                var u = i.tripCount - 1,
                    a = s.find(t).eq(u),
                    l = s.find(n).eq(u),
                    c = s.find(r);
                $fromDate = c.eq(u);
                i._initCityInput(i.hotCityConfig, a, l, $fromDate);
                i._initDatePicker(i.delay, $fromDate, a, l);
                f(c.eq(u - 1), $fromDate);
                var h = e("#delete" + i.tripCount);
                i.moreSearboxArr.push({
                    trip: i.tripCount,
                    sbox: o,
                    deleEle: h
                });
                e(i).trigger("addMultiClick", i);
                i._bindDeleteTripEvent(h);
                i.tripCount == 6 && e("#js_addtrip").css("visibility", "hidden")
            })
        },
        _bindDeleteTripEvent: function(t) {
            var n = this;
            t.click(function() {
                var r = parseInt(t[0].id.charAt(6), 10) - 3;
                n.moreSearboxArr[r].sbox.remove();
                n._updateLink(r);
                n._updateTrips(r);
                n.tripCount--;
                n.tripCount < 6 && e("#js_addtrip").css("visibility", "visible")
            })
        },
        _updateTrips: function(e) {
            var t = this;
            t.moreSearboxArr.splice(e, 1);
            for (var n = e; n < t.moreSearboxArr.length; n++) {
                var r = n + 3;
                t.moreSearboxArr[n].trip = r;
                t.moreSearboxArr[n].sbox.find("span")[0].innerHTML = r;
                var i = t.moreSearboxArr[n].sbox.find(".qcbox");
                t.moreSearboxArr[n].deleEle[0].id = "delete" + r
            }
        },
        _updateLink: function(e) {
            e += 2;
            var t = this.$form.find(r);
            if (e < this.tripCount - 1) {
                f(t.eq(e - 1), t.eq(e))
            }
        },
        _addLinkedCity: function(e, r) {
            var i = this.$form.find(t),
                s = this.$form.find(n),
                o = -1;
            var u, a;
            o = r == "from" ? i.index(e) : s.index(e);
            if (r == "from" && o != 0) {
                a = this.getCityData(s.eq(o - 1));
                a.value && this.setCityData(e, {
                    value: a.value,
                    country: "",
                    valided: true
                })
            } else if (r == "to" && o != s.length - 1) {
                u = this.getCityData(i.eq(o + 1));
                u.value && this.setCityData(e, {
                    value: u.value,
                    country: "",
                    valided: true
                })
            }
        },
        _showError: function(e, r, i) {
            var s = this;
            var o;
            switch (e) {
                case "from":
                    o = s.$form.find(t).eq(i);
                    break;
                case "to":
                    o = s.$form.find(n).eq(i);
                    break
            }
            if (!o.data("org-placeholder")) {
                o.data("org-placeholder", o.data("qcbox-placeholder"))
            }
            o.data("qcbox-placeholder", r);
            o.val("");
            o.parent().parent().addClass("qcbox_err")
        },
        _clearError: function(e) {
            e.data("qcbox-placeholder", e.data("org-placeholder"));
            e.parent().parent().removeClass("qcbox_err")
        },
        _checkCity: function(e, t) {
            var n = this;
            var r = t.value;
            if (l(r) && !t.valided) {
                return false
            }
            return true
        },
        submitCheck: function() {
            var e = this,
                r = e.$form;
            var i = r.find(t),
                s = r.find(n);
            var o, u, a, f, c = true;
            for (var h = 0; h < i.length; h++) {
                o = e.getCityData(i.eq(h));
                u = e.getCityData(s.eq(h));
                a = o.value;
                f = u.value;
                if (!l(a) || !e._checkCity("from", o)) {
                    o.qcbox.$el.trigger("mouseup");
                    c = false;
                    break
                } else if (!l(f) || !e._checkCity("to", u)) {
                    u.qcbox.$el.trigger("mouseup");
                    c = false;
                    break
                }
                if (a === f && l(a)) {
                    e._showError("to", "不能和出发地相同", h);
                    c = false;
                    break
                }
            }
            return c
        },
        getId: function() {
            return this.form
        },
        setFromCity: function(e) {
            this.setCityData(this.$fromCity.eq(0), e)
        },
        setCityData: function(t, n) {
            p(t, n);
            this._clearError(t);
            e(this).trigger("boxchange");
            return this
        },
        getCityData: function(e) {
            return d(e)
        },
        fromDate: function(t) {
            if (t == null) {
                return this.$fromDate.val()
            } else {
                this.$fromDate.data("q-datepicker-fly").select(h(t));
                e(this).trigger("boxchange")
            }
            return this
        },
        toDate: function(t) {
            if (t == null) {
                return this.$toDate.val()
            } else {
                this.$toDate.data("q-datepicker-fly").select(h(t));
                e(this).trigger("boxchange")
            }
            return this
        },
        fromParam: function(e) {
            if (e == null) {
                return this.$from.val()
            } else {
                this.$from.val(e)
            }
            return this
        },
        getDom: function() {
            return this.$form
        },
        fill: function(e) {
            if (!e) {
                return
            }
            var t = this;
            t.setCityData(t.$fromCity.eq(0), {
                value: e.searchDepartureAirport || e.fromCity,
                country: "",
                valided: true
            });
            t.setCityData(t.$toCity.eq(0), {
                value: e.searchArrivalAirport || e.toCity,
                country: "",
                valided: true
            });
            trackAction("QH|HCT|history|" + encodeURIComponent(e.fromCity));
            trackAction("QH|HCT|history|" + encodeURIComponent(e.toCity));
            var n = e.searchDepartureTime || e.fromDate;
            n = n.replace(/-/g, "/");
            t.fromDate(c(n))
        },
        getMultiValue: function() {
            var i = /\(([A-Z]{3})\)$/;
            var s = e(t),
                o = e(n),
                u = e(r);
            var a = [],
                f = [],
                l = [];
            for (var c = 0; c < s.length; c++) {
                a.push(s[c].value);
                f.push(o[c].value);
                l.push(u[c].value)
            }
            return {
                fromCity: a.join(","),
                toCity: f.join(","),
                fromDate: l.join(",")
            }
        }
    });
    return v
}(jQuery);
var InterFlightSearchBox = function(e) {
    function n() {
        this._type = "国际"
    }
    var t = "#js_inter_backdate";
    e.extend(n.prototype, BaseFlightSearchBox.prototype, {
        backdatepanel: function() {
            return e(t)
        }
    });
    return n
}(jQuery);
var InterMultiFlightSearchBox = function(e) {
    function n() {}
    var t = "#js_inter_backdate";
    e.extend(n.prototype, BaseMultiFlightSearchBox.prototype, {
        backdatepanel: function() {
            return e(t)
        }
    });
    return n
}(jQuery);
var current = window.SERVER_TIME;
var max = new Date(current.getTime() + 1e3 * 60 * 60 * 24 * 362);
var normalMax;
var rootURL = "http://flight.qunar.com/twell/flight/Search.jsp?";
var SearchCaution = function() {
    function a(e) {
        var t = "";
        for (var n in e) {
            t += "&" + n + "=" + e[n]
        }
        return rootURL + t
    }

    function l(e) {
        var t = {
            fromCity: e.fromCity,
            toCity: e.toCity,
            fromDate: e.fd
        };
        if (e.td) {
            t.toDate = e.td
        }
        t.from = "qunarindex";
        t.searchType = e.type === "特价" ? "DealsFlight" : f[e.searchType];
        return t
    }

    function c(e) {
        try {
            (new Image).src = "http://flight.qunar.com/site/track.htm?action=" + e + "&t=" + Math.random()
        } catch (t) {}
    }
    var e = $.ui.dialog({
            width: 522
        }),
        t = {};
    var n = function(e) {
        var t = e || {};
        var n = "";
        if (e.round) {
            n = "<p>" + (e.type === "特价" ? "从" : "去程") + '：&nbsp;<span class="fb">' + e.departureDate + "</span></p>";
            n = n + "<p>" + (e.type === "特价" ? "到" : "回程") + '：&nbsp;<span class="fb">' + e.arrivalDate + "</span>&nbsp;&nbsp;马上为您显示搜索结果。</p>"
        } else {
            n = "<p>" + (e.type === "特价" ? "从" : "去程") + '：&nbsp;<span class="fb">' + e.departureDate + "</span>&nbsp;&nbsp;马上为您显示搜索结果。</p>"
        }
        return n
    };
    var r = function(e) {
        var t = '<div class="p_lyr_ct" style="width:522px;">' + '<div class="lyr_in"> <a id="search-caution-close" class="btn_close" href="javascript:;"></a>' + '<div class="lyr_ct" style="width: 450px;">' + '<div class="b_alt_day">' + '<div class="p1">目前<span class="fb">' + (e.type === "特价" ? "特价" : e.fromCity + '</span>到<span class="fb">' + e.toCity) + "</span>机票最远支持搜索以下日期的航班：</div>" + '<div class="p2">' + n(e) + "</div>" + '<div class="p_btn">' + '<a href="' + e.href + '" class="btn_sure_bl" id="search-caution-ok"><span>确&nbsp;定</span></a>' + "</div>" + "</div>" + '<div class="b_alt_dode clearfix">' + '<a href="http://app.qunar.com/" target="_blank">' + '<p class="m_code_img"><img src="http://simg4.qunarzz.com/site/images/flight/home/img_qnkhd.png"></p>' + '<p class="m_code_rt">' + '<span class="h1">为您提供更多航班搜索，<br>我们一直在努力！</span>' + '<span class="h3">扫描或点击下载去哪儿旅行客户端</span>' + "</p>" + "</a>" + "</div>" + "</div>" + "</div>" + "</div>";
        return t
    };
    var i = function() {
        s()
    };
    var s = function() {
        e.hide()
    };
    var o = function() {
        $("#search-caution-close").click(s);
        $("#search-caution-ok").click(i)
    };
    var u = function(e, t) {
        return Math.min(e, t)
    };
    var f = {
        oneway: "OnewayFlight",
        roundtrip: "RoundTripFlight"
    };
    var h = function(e, t) {
        var n = t || "-";
        var r = e.getMonth() + 1;
        var i = e.getDate();
        r < 10 && (r = "0" + r);
        i < 10 && (i = "0" + i);
        return e.getFullYear() + n + r + n + i
    };
    t.check = function(e) {
        normalMax = max;
        this.data = {};
        this.data.fromCity = e.fromCity;
        this.data.toCity = e.toCity;
        var t = false;
        var n = new Date(e.fd.replace(/-/g, "/"));
        var r = new Date(e.td.replace(/-/g, "/"));
        if (e.searchType === f.oneway) {
            if (n > normalMax) {
                t = true;
                this.data.type = e.type;
                this.data.round = false;
                this.data.departureDate = h(normalMax);
                var i = l(e);
                i.fromDate = this.data.departureDate;
                this.data.href = a(i)
            }
        } else if (e.searchType === f.roundtrip) {
            if (n > normalMax || r > normalMax) {
                t = true;
                this.data.type = e.type;
                this.data.round = true;
                this.data.departureDate = h(new Date(u(n, normalMax)));
                this.data.arrivalDate = h(new Date(u(r, normalMax)));
                var i = l(e);
                i.fromDate = this.data.departureDate;
                i.toDate = this.data.arrivalDate;
                this.data.href = a(i)
            }
        } else {
            if (n > normalMax) {
                t = true;
                this.data.type = e.type;
                this.data.departureDate = h(normalMax);
                var i = l(e);
                i.fromDate = this.data.departureDate;
                i.drange = e.drange;
                i.search = e.search;
                this.data.href = a(i)
            }
        }
        return t
    };
    t.show = function() {
        var t = r(this.data);
        e.setContent(t);
        e.show();
        e.setMiddle();
        o();
        var n = ["FL", "EQR"].join("|");
        c(n)
    };
    return t
}();
var QunarHistory = new function() {
    document.domain = "qunar.com";
    var e = this;
    var t = [];
    var n = null;
    var r = null;
    var i = null;
    this.ChinaFlightList = [];
    this.InterFlightList = [];
    var s = null;
    this.SFList = null;
    this.DFList = null;
    this.HLList = null;
    this.firstDSF = null;
    this.firstISF = null;
    this.firstDDF = null;
    this.firstIDF = null;
    this.firstChina = null;
    this.firstInter = null;
    this.firstFlight = null;
    this.firstHL = null;
    var o = this.cache = function(e, t) {
        if ((typeof this["_" + e] == "undefined" || this["_" + e] === null) && t) {
            this["_" + e] = t
        }
        return this["_" + e]
    };
    var u = {
        SF: {
            Type: function() {
                return "SF"
            },
            FromCity: function() {
                return e.cache.call(this, "fromCity") || e.cache.call(this, "formCity", decodeURIComponent(this.fromCity))
            },
            ToCity: function() {
                return e.cache.call(this, "toCity") || e.cache.call(this, "toCity", decodeURIComponent(this.toCity))
            },
            FromDate: function() {
                return e.cache.call(this, "fromDate") || e.cache.call(this, "fromDate", QunarDate.format(this.fromDate))
            },
            FromCountry: function() {
                return e.cache.call(this, "fromCountry") || e.cache.call(this, "fromCountry", decodeURIComponent(this.fromCountry).split("-")[0])
            },
            ToCountry: function() {
                return e.cache.call(this, "toCountry") || e.cache.call(this, "toCountry", decodeURIComponent(this.fromCountry).split("-")[1])
            },
            isInter: function() {
                return this.FromCountry() != "中国" || this.ToCountry() != "中国"
            },
            validate: function() {
                return true
            },
            Timestamp: function() {
                return e.cache.call(this, "timestamp") || e.cache.call(this, "timestamp", parseInt(this.timestamp, 10))
            }
        },
        DF: {
            Type: function() {
                return "DF"
            },
            FromCity: function() {
                return e.cache.call(this, "fromCity") || e.cache.call(this, "formCity", decodeURIComponent(this.fromCity))
            },
            ToCity: function() {
                return e.cache.call(this, "toCity") || e.cache.call(this, "toCity", decodeURIComponent(this.toCity))
            },
            FromDate: function() {
                return e.cache.call(this, "fromDate") || e.cache.call(this, "fromDate", QunarDate.format(this.fromDate))
            },
            ToDate: function() {
                return e.cache.call(this, "toDate") || e.cache.call(this, "toDate", QunarDate.format(this.toDate))
            },
            FromCountry: function() {
                return e.cache.call(this, "fromCountry") || e.cache.call(this, "fromCountry", decodeURIComponent(this.fromCountry).split("-")[0])
            },
            ToCountry: function() {
                return e.cache.call(this, "toCountry") || e.cache.call(this, "toCountry", decodeURIComponent(this.fromCountry).split("-")[1])
            },
            isInter: function() {
                return this.FromCountry() != "中国" || this.ToCountry() != "中国"
            },
            validate: function() {
                return true
            },
            Timestamp: function() {
                return e.cache.call(this, "timestamp") || e.cache.call(this, "timestamp", parseInt(this.timestamp, 10))
            }
        },
        HL: {
            ToCity: function() {
                return e.cache.call(this, "toCity") || e.cache.call(this, "toCity", decodeURIComponent(this.toCity))
            },
            FromDate: function() {
                return e.cache.call(this, "fromDate") || e.cache.call(this, "fromDate", QunarDate.format(this.fromDate))
            },
            ToDate: function() {
                return e.cache.call(this, "toDate") || e.cache.call(this, "toDate", QunarDate.format(this.toDate))
            },
            validate: function() {
                return true
            }
        }
    };
    var a = function(t, n) {
        var r = e[t];
        if (!r || r.Timestamp() < n.Timestamp()) {
            e[t] = n
        }
    };
    var f = function(t, n, r) {
        if (!n) return;
        for (var i = 0; i < n.length; i++) {
            for (var s in r) n[i][s] = r[s];
            switch (t) {
                case "SF":
                    if (n[i].isInter()) {
                        a("firstISF", n[i]);
                        a("firstInter", n[i]);
                        e.InterFlightList.push(n[i])
                    } else {
                        a("firstDSF", n[i]);
                        a("firstChina", n[i]);
                        e.ChinaFlightList.push(n[i])
                    }
                    a("firstFlight", n[i]);
                    break;
                case "DL":
                    if (n[i].isInter()) {
                        a("firstIDF", n[i]);
                        a("firstInter", n[i]);
                        e.InterFlightList.push(n[i])
                    } else {
                        a("firstDDF", n[i]);
                        a("firstChina", n[i]);
                        e.ChinaFlightList.push(n[i])
                    }
                    a("firstFlight", n[i]);
                    break;
                case "HL":
                    if (!e.firstHL) {
                        e.firstHL = n[i]
                    }
                    break
            }
        }
        return n
    };
    var l = function(e, t) {
        return -(parseInt(e.timestamp, 10) - parseInt(t.timestamp, 10))
    };
    this.load = function() {
        var e = this;
        var t = $("#ifrmHistory");
        if (t.size()) {
            t.on("load", function() {
                window.jx05CFEventFC.call(e, t.get(0))
            });
            t.attr("src", "http://history.qunar.com/history/newhistory.html")
        }
    };
    this.parseQunarHistory = function() {
        this.SFList = f("SF", n.findEntries("SF"), u["SF"]);
        this.DFList = f("DL", n.findEntries("DL").concat(n.findEntries("IF")), u["DF"]);
        this.HLList = f("HL", n.findEntries("HL"), u["HL"]);
        try {
            $(QunarHistory).trigger("onload")
        } catch (e) {}
    };
    window.jx05CFEventFC = function(t) {
        e.SFlight = r = t.contentWindow.SFlight;
        e.DFlight = i = t.contentWindow.DFlight;
        s = t.contentWindow.HotelDetail;
        e.service = n = t.contentWindow.QunarHistory;
        this.parseQunarHistory()
    }
};
var FlightSearchBox = function(e) {
    function u() {
        var e = a().ex_track;
        if (e) {
            var t = document.createElement("input");
            t.type = "hidden";
            t.value = e;
            t.name = "ex_track"
        }
    }

    function a() {
        var t = {};
        var n = window.location.search.replace("?", "");
        var r = n.split("&");
        e.each(r, function(e, n) {
            var r = n.split("=");
            var i = r[0],
                s = r[1];
            t[i] = s || ""
        });
        return t
    }

    function f(e) {
        var t = i;
        t.init({
            form: o,
            hotcity: {
                fromtype: "interfrom",
                totype: "interfrom",
                fromDefaultTab: "热门",
                toDefaultTab: "热门"
            },
            photcity: {
                fromtype: "multifrom",
                totype: "multito",
                fromDefaultTab: "热门",
                toDefaultTab: "国际热门",
                hotcityWidth: 500
            },
            delay: {
                fromDateDelay: 15,
                toDateDelay: 22
            },
            isFuzzy: true,
            supportPrice: false,
            placeHolder: "输入国家/城市/机场",
            pplaceHolder: "城市名(必填)"
        });
        if (e.param) {
            t.fill(e.param)
        }
        searchTrack.init("INT", t)
    }

    function l(e) {
        this.param = e
    }
    var t = InterFlightSearchBox;
    var n = false;
    var r = null;
    var i = new t;
    var s = a().from;
    var o = "#searchboxForm";
    e.extend(l.prototype, {
        init: function(t) {
            var i = this;
            if (n) {
                return
            }
            r = e(t);
            f(this);
            u();
            setTimeout(function() {
                if (!i.param.isFuzzy) {
                    i.initHistory()
                }
            }, 10);
            n = true;
            return r
        },
        initHistory: function() {
            var t = this;
            if (window.QunarHistory) {
                e.qhistory.init({
                    success: function(t) {
                        window.QunarHistory.data = t;
                        e(QunarHistory).trigger("onload")
                    }
                });
                e(QunarHistory).on("onload", function() {
                    t.loadedHistory = true;
                    if (!QunarHistory.DFList && !QunarHistory.SFList) {
                        e(t.handler).hide()
                    }
                });
                QunarHistory.load()
            }
        }
    });
    return l
}(jQuery);
(function() {
    function i() {
        this._init()
    }
    var e = null,
        t = null;
    var n = /MSIE 6\.0/.test(navigator.userAgent);
    var r = false;
    i.fn = i.prototype;
    i.fn._init = function() {
        this.element = document.getElementById("js_schwrap");
        this._initEvent()
    };
    i.fn._initEvent = function() {
        var e = this;
        var t = document.getElementById("js_clp_Top");
        $jex.event.bind(window, "resize", function() {
            e._updateStyle()
        });
        $jex.event.bind(window, "scroll", function() {
            e._updateStyle()
        });
        if (t) {
            $jex.event.bind(t, "click", function() {
                e.element.className = "b_fly_schwrap";
                t.style.display = "none"
            })
        }
    };
    i.fn._updateStyle = function() {
        var e = this;
        var t = true;
        var i = document.getElementById("js_clp_Top");
        var s = e.getScrollTop();
        if (document.getElementById("searchType").value == "MultiTripFlight" && document.getElementById("js_schwrap").className != "b_fly_schwrap b_fly_fixtop") {
            t = false
        }
        if (s > document.getElementById("js_schwrap").clientHeight && t && !n) {
            r = true;
            e.element.className = "b_fly_schwrap b_fly_fixtop"
        } else {
            r = false;
            e.element.className = "b_fly_schwrap";
            if (i) {
                i.style.display = "none"
            }
        }
    };
    i.fn.getScrollTop = function() {
        return document.documentElement.scrollTop || document.body.scrollTop
    };
    new i
})();
(function() {
    function p() {
        this._init()
    }

    function d() {
        return c.scrollTop || h.scrollTop
    }

    function v() {
        return c.scrollLeft || h.scrollLeft
    }

    function m() {
        return c.clientHeight || h.clientHeight
    }
    var e = document.getElementsByTagName("body")[0];
    var t = null,
        n = null;
    var r = /MSIE 6\.0/.test(navigator.userAgent);
    var i = 10,
        s = i,
        o = 10,
        u = 0,
        a = 990,
        f = 700;
    var l = false;
    var c = document.documentElement;
    var h = document.body;
    p.fn = p.prototype;
    p.fn._init = function() {
        this._createButton()
    };
    p.fn._createButton = function() {
        this.element = document.createElement("div");
        this.element.className = "q-w-pageup";
        e.appendChild(this.element);
        this._setStyle();
        this._initEvent()
    };
    p.fn._initEvent = function() {
        var e = this;
        var t = this.element;
        $jex.event.bind(window, "resize", function() {
            e._refresh()
        });
        $jex.event.bind(window, "scroll", function() {
            e._refresh()
        });
        $jex.event.bind(this.element, "click", function() {
            var t = v();
            if (r) {
                window.scrollTo(t, 0)
            } else {
                e._gotoTop(t)
            }
            trackAction("F|UP")
        })
    };
    p.fn._refresh = function() {
        this._updateStyle()
    };
    p.fn._setStyle = function() {
        if (r) {
            this.element.style.position = "absolute"
        }
        this._updateStyle()
    };
    p.fn._updateStyle = function() {
        if (d() < f && !l) {
            this.element.style.display = "none";
            return
        }
        var e = (document.body.offsetWidth - a) / 2 + v() + 20;
        this.element.style.right = e + "px";
        if (this.element.style.display != "block") this.element.style.display = "block";
        if (r) {
            this.element.style.top = d() + m() - 140 + "px"
        }
    };
    p.fn._gotoTop = function(e) {
        var n = this;
        var r = u = d();
        var i = m();
        if (r > 0) {
            l = true;
            window.scrollTo(e, Math.max(r - s, 0));
            var a = Math.max(r - s, 0) / u;
            this.element.style.top = i * a - this.element.offsetHeight - 60 + "px";
            t = setTimeout(function() {
                s += o;
                n._gotoTop(e)
            }, 10)
        } else {
            t = setTimeout(function() {
                n._reset()
            }, 200)
        }
    };
    p.fn._reset = function() {
        t && clearTimeout(t);
        l = false;
        s = i;
        this.element.style.top = "auto";
        this.element.style.bottom = "60px";
        this.element.style.display = "none"
    }
})();
(function(e) {
    function t() {
        var e = window.navigator.userAgent.toLowerCase(),
            t = function(t) {
                return t.test(e)
            };
        var n = t(/opera/),
            r = t(/\bchrome\b/),
            i = t(/webkit/),
            s = !r && i,
            o = t(/msie/) && document.all && !n,
            u = t(/msie 7/),
            a = t(/msie 8/),
            f = t(/msie 9/),
            l = t(/msie 10/),
            c = o && !u && !a && !f && !l,
            h = t(/trident/) && e.match(/rv:([\d.]+)/) ? true : false,
            p = t(/gecko/) && !i,
            d = t(/mac/),
            v = t(/firefox/);
        if (n) {
            return "opera"
        } else if (r) {
            return "chrome"
        } else if (s) {
            return "safari"
        } else if (c) {
            return "ie6"
        } else if (u) {
            return "ie7"
        } else if (a) {
            return "ie8"
        } else if (f) {
            return "ie9"
        } else if (l) {
            return "ie10"
        } else if (v) {
            return "firefox"
        }
        return "other"
    }

    function n() {
        var e = navigator.userAgent;
        var t = navigator.platform == "Win32" || navigator.platform == "Win64" || navigator.platform == "Windows";
        var n = navigator.platform == "Mac68K" || navigator.platform == "MacPPC" || navigator.platform == "Macintosh" || navigator.platform == "MacIntel";
        if (n) return "mac";
        var r = navigator.platform == "X11" && !t && !n;
        if (r) return "unix";
        var i = String(navigator.platform).indexOf("Linux") > -1;
        if (i) return "linux";
        if (t) {
            var s = e.indexOf("Windows NT 5.0") > -1 || e.indexOf("Windows 2000") > -1;
            if (s) return "win2000";
            var o = e.indexOf("Windows NT 5.1") > -1 || e.indexOf("Windows XP") > -1;
            if (o) return "winxp";
            var u = e.indexOf("Windows NT 5.2") > -1 || e.indexOf("Windows 2003") > -1;
            if (u) return "win2003";
            var a = e.indexOf("Windows NT 6.0") > -1 || e.indexOf("Windows Vista") > -1;
            if (a) return "winvista";
            var f = e.indexOf("Windows NT 6.1") > -1 || e.indexOf("Windows7") > -1;
            if (f) return "win7";
            var l = e.indexOf("Windows NT 6.2") > -1 || e.indexOf("Windows 8") > -1;
            if (l) return "win8"
        }
        return "other"
    }

    function r() {
        var e = window.screen;
        if (!e) {
            return "unknown"
        }
        if (!e.width || !e.height) {
            return "unknown"
        }
        return e.width + "*" + e.height
    }

    function i() {
        var e = r(),
            i = t(),
            s = n();
        (new Image).src = "http://log.flight.qunar.com/l.gif?s=flight&p=onewayList&r=physicsInfo&resolution=" + e + "&browser=" + i + "&os=" + s
    }
    try {
        i()
    } catch (s) {}
})(window);
if (window.addEventListener) {
    window.addEventListener("load", function() {
        var e = 0;
        var t = 1;
        var n = setTimeout(function() {
            try {
                n = setTimeout(arguments.callee, 3e3);
                t++;
                var r = document.getElementsByClassName("gwd_toolbar_control_small").length && document.getElementsByClassName("gwd_toolbar_control_small")[0];
                var i = document.getElementsByClassName("gwd_toolbar_container").length && document.getElementsByClassName("gwd_toolbar_container")[0];
                r && ++e && r.remove();
                i && ++e && i.remove();
                if (e >= 2 || t >= 10) {
                    clearTimeout(n)
                }
            } catch (s) {
                clearTimeout(n)
            }
        }, 3e3)
    }, false)
}(function(e, t) {
    var n = function(e) {
        var t = e + (Math.random() * e * 1e3 / 1e3 >> 0);
        return t / 100
    };
    var r = function(t) {
        this._loading_dom = e("#loader-bq");
        this._ll_box = this._loading_dom;
        this._ll_bar = this._loading_dom.find(".m-loader-inner");
        this._tw = this._ll_box.width();
        this.finTimer = t.timer
    };
    var i = r.prototype;
    i.listenQueryStart = function() {
        var e = this;
        e._startLoad();
        e._loading_dom.show()
    };
    i.listenQueryComplete = function() {
        var e = this;
        e._toComplete()
    };
    i._startLoad = function() {
        var e = this;
        var t = this._ll_bar.width(0);
        var r = this._tw;
        t.stop(true, true).width(0);
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null
        }
        var i = function() {
            var e = n(20);
            var i = r * e;
            r = r - i;
            t.animate({
                width: "+=" + i
            }, 5e3)
        };
        this._timer = setInterval(i, 4e3);
        i();
        this._timeout_timer = setTimeout(function() {
            e._toComplete()
        }, this.finTimer)
    };
    i._toComplete = function() {
        var e = this;
        if (this._timeout_timer) {
            clearTimeout(this._timeout_timer);
            this._timeout_timer = null
        }
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null
        }
        this._ll_bar.stop(true, true).width(this._tw)
    };
    t.LoadingBar = r
})(jQuery, window);
var ScrollShow = function(e, t) {
    function n() {
        var e = window.document,
            t = e.documentElement["clientHeight"];
        return $jex.boxModel() && t || e.body && e.body["clientHeight"] || t
    }

    function r() {
        var e = window,
            t = "pageYOffset",
            n = "scrollTop";
        return t in e ? e[t] : $jex.boxModel() && e.document.documentElement[n] || e.document.body[n]
    }

    function i(e, t, n) {
        if (e.addEventListener) {
            e.addEventListener(t, n, false)
        } else if (e.attachEvent) {
            e.attachEvent("on" + t, n)
        } else {
            var r = e["on" + t];
            if (r) {
                e["on" + t] = function() {
                    r();
                    n()
                }
            }
        }
    }

    function s(e, t, n) {
        if (e.removeEventListener) {
            e.removeEventListener(t, n, false)
        } else if (e.detachEvent) {
            e.detachEvent("on" + t, n)
        } else {
            if (e["on" + t] === n) e["on" + t] = null
        }
    }
    var o = null;
    var u = function() {};
    var a = null;
    var f = null;
    var l = {
        height: n(),
        scrollTop: 0
    };
    return {
        init: function(e, t, n) {
            f = this;
            this.step = t || 15;
            o = e;
            if (n) u = n;
            this.start()
        },
        _bind: function() {
            i(e, "scroll", f.onScroll);
            i(e, "resize", f.onResize)
        },
        _unbind: function() {
            s(e, "scroll", f.onScroll);
            s(e, "resize", f.onResize)
        },
        onScroll: function() {
            l.scrollTop = r();
            f.check()
        },
        onResize: function() {
            l.height = n();
            f.check()
        },
        check: function() {
            if (!f.loaded && f.num > f.step && l.scrollTop + l.height > $jex.offset(o).top + o.offsetHeight + 50) {
                clearTimeout(a);
                var e = document.createElement("div");
                e.innerHTML = '<div class="qvt_loadding"><img class="ico_loading" src="http://simg1.qunarzz.com/site/images/new_main/m_loading.gif" />正在加载，请稍后...</div>';
                o.appendChild(e);
                a = setTimeout(u, 500);
                f.loaded = true
            }
        },
        stop: function() {
            this._unbind();
            this.isStarted = false
        },
        start: function() {
            if (this.isStarted) return;
            this._bind();
            this.isStarted = true
        },
        reset: function(e) {
            this.count = this.step;
            this.start();
            e && e();
            return this
        }
    }
}(window, $jex);
(function(e) {
    var t = $jex.$("js_flight_notice_box");
    var n = function() {
        $jex.removeClassName(t, "hide")
    };
    var r = function() {
        $jex.addClassName(t, "hide")
    };
    var i = function() {
        var e = System.param;
        if (e.searchDepartureAirport) {
            var t = (e.searchDepartureAirport == "北京" || e.searchArrivalAirport == "北京") && e.searchDepartureTime == "2015-09-03"
        } else {
            var t = (e.fromCity == "北京" || e.toCity == "北京") && (e.fromDate == "2015-09-03" || e.toDate == "2015-09-03")
        }
        if (t) {
            n()
        } else {
            r()
        }
    };
    $jex.event.ready(function() {
        i()
    })
})(window)