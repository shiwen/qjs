(function(c) {
    function b() {
        if (System && System.param && System.param.fromCity) {
            var d = System.param.fromCity + "|" + System.param.toCity + "|" + System.param.fromDate;
        } else {
            if (System && System.param && System.param.searchDepartureAirport) {
                var d = System.param.searchDepartureAirport + "|" + System.param.searchArrivalAirport + "|" + System.param.searchDepartureTime;
            } else {
                return false;
            }
        }
        return a(d);
    }

    function a(k) {
        var j = 0;
        var d = k.length;
        var g = 2147483648;
        for (var f = 0; f < d; f++) {
            j = 31 * j + k.charCodeAt(f);
            if (j > g) {
                j %= g;
            }
        }
        return j;
    }
    c.addHtag = function(f) {
        var d = b();
        if (d != false) {
            f.setRequestHeader("htag", b());
        }
    };
})(window);
(function(c) {
    var b = /(\d{4})-(\d{1,2})-(\d{1,2})/g;
    var a = c.location.href;
    if (b.test(a)) {
        var d = false;
        a = a.replace(b, function(h, k, j, i) {
            var g = k;
            var f = false;
            if (j.length === 1) {
                d = f = true;
                g += "-0" + j;
            } else {
                g += "-" + j;
            }
            if (i.length === 1) {
                d = f = true;
                g += "-0" + i;
            } else {
                g += "-" + i;
            }
            if (f) {
                return g;
            }
            return h;
        });
        if (d) {
            c.location.href = a;
            return;
        }
    }
})(window);
var OTA_AD_CONFIG = {
    white_list: "CJ,CZ,CA,8C,ZH,3U,3Q,2Z,FM,G8,HU,IV,MF,MU,SC,SZ,WH,WU,X2,XO,Z2,NX,CI,BR,GE,BK,CK,G5,WC,PO,9C,KN,JR,KA,JD,9S,8L,CG,VD,J5,9C,GS,NS,OQ,UO,HX,VY,KY",
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
    AirlineDirectSelling: ["gndcphnair0", "ws11072515a", "wsairgs00cp", "wsairpn01cp", "wsair8l00cp", "gnd090722cp", "gnd8airczcp", "gndairzh001", "gndairmu003", "gndairca001", "gndairaqi01", "gndairgji01"]
};

function trackAction(d, b, a) {
    if (trackAction.root) {
        d = trackAction.root + "|" + d;
    }
    if (trackAction.prefix && d.indexOf("|") > 0 && d.indexOf("&") < 0) {
        d = d.replace(d.substr(0, trackAction.prefix.length), trackAction.prefix);
    }
    if (trackAction.prefix && d.indexOf("&") >= 0) {
        d = d + "&_module=" + trackAction.prefix;
    }
    if (CLIENT_TIME && SERVER_TIME) {
        var c = (new Date().getTime() - CLIENT_TIME.getTime()) + SERVER_TIME.getTime();
    } else {
        var c = new Date().getTime();
    }
    var f = "/site/track.htm?action=" + d + "&t=" + c;
    if (b) {
        f += "&rId=" + b;
    } else {
        if (trackAction.rid) {
            f += "&rId=" + trackAction.rid;
        }
    }
    if (a) {
        f = f.replace("track.htm", "timetrack.htm");
    }
    if (f.length >= 1024) {
        return;
    }
    setTimeout(function() {
        try {
            new Image().src = f;
        } catch (g) {}
    }, 0);
}
var $jex = {
    ie: 0,
    gecko: 0,
    opera: 0,
    safari: 0,
    isdebug: false,
    testurl: (window.location.search.indexOf("&testurl") > 0),
    browser: null,
    mobile: null,
    air: null,
    VOIDFUNC: function() {},
    globalID: (function() {
        var a = 0;
        return function() {
            return a++;
        };
    })(),
    _innerClass: {},
    register: function(b, a) {
        $jex._innerClass[b] = a;
    },
    getClass: function(a) {
        return $jex._innerClass[a];
    },
    $: function(a) {
        return (typeof a == "string") ? document.getElementById(a) : a;
    },
    _: function(f, d) {
        var g = function() {};
        g.prototype = d.prototype;
        f.prototype = new g();
    },
    compare: function(b, h, g) {
        var d = h || {};
        var c = g || {};
        for (var a = 0; a < b.length; a++) {
            var f = b[a];
            if (d[f] != c[f]) {
                return false;
            }
        }
        return true;
    },
    $defined: function(a) {
        return typeof a != "undefined" && a != null;
    },
    $empty: function(b) {
        for (var a in b) {
            if (typeof b[a] == "function") {
                continue;
            }
            return false;
        }
        return true;
    },
    parseQueryParam: function() {
        var d = {};
        var b = window.location.search.replace("?", "").split("&");
        for (var a = 0; a < b.length; a++) {
            var c = b[a].split("=");
            d[c[0]] = decodeURIComponent(c[1]);
        }
        return d;
    },
    extendClass: function() {
        var a = Object.prototype.constructor;
        return function(b, g) {
            var c = g.prototype;
            var f = b.prototype;
            var d = function() {};
            d.prototype = c;
            f = b.prototype = new d();
            b.superclass = c;
            f.constructor = b;
            if (c.constructor == a) {
                c.constructor = g;
            }
            b.prototype.toString = g.prototype.toString;
            return b;
        };
    }(),
    body: function(a) {
        if (!a) {
            a = document;
        }
        return a.body ? a.body : a.getElementsByTagName("body")[0];
    },
    doc: function(a) {
        return a ? a.nodeType == 9 ? a : a.ownerDocument || document : document;
    },
    merge: function(b, d) {
        for (var a in d) {
            if (d[a] !== undefined) {
                b[a] = d[a];
            }
        }
        return b;
    },
    exec: function(a) {
        return a();
    },
    toInt: function(b, c) {
        var a;
        return isNaN(a = parseInt(b)) ? c : a;
    },
    toFloat: function(b, c) {
        var a;
        return isNaN(a = parseFloat(b)) ? c : a;
    },
    toBoolean: function(a) {
        if (!a) {
            return false;
        }
        return (a == true || (a = a.toUpperCase()) == "TRUE" || a == "1");
    },
    toQueryString: function(b) {
        var a = [];
        $jex.foreach(b, function(d, f, c) {
            if (f > 0) {
                a.push("&");
            }
            a.push(encodeURIComponent(c), "=", encodeURIComponent(d));
        });
        return a.join("");
    },
    text: function(a) {
        return a.innerText || a.textContent;
    },
    trim: function(b, a) {
        switch (a) {
            case "l":
                return b.replace(/(^\s*)/g, "");
            case "r":
                return b.replace(/(\s*$)/g, "");
            default:
                return b.replace(/(^\s*)|(\s*$)/g, "");
        }
    },
    stripTag: function(a) {
        return a.replace(/<\/?[^>]+>/gi, "");
    },
    starsWith: function(b, a, c) {
        if (!c) {
            c = 0;
        }
        if (!b || b.length < c + a.length) {
            return false;
        }
        return b.substring(c, a.length) == a;
    },
    exists: function(d, a) {
        var c = a.split("."),
            b;
        for (b = 0; b < c.length; b++) {
            if (!d[c[b]]) {
                return false;
            }
            d = d[c[b]];
        }
        return true;
    },
    isNull: function(a) {
        return (typeof a == "object") && !a;
    },
    isNumber: function(a) {
        return typeof a == "number" && isFinite(a) ? true : false;
    },
    isArray: function(a) {
        return !!a && a.constructor == Array;
    },
    removeElement: function(a) {
        if (a && a.parentNode) {
            a.parentNode.removeChild(a);
        }
    },
    isChildrenOf: function(b, a, c) {
        if (c && b) {
            b = b.parentNode;
        }
        while (b) {
            if (b == a) {
                return true;
            }
            b = b.parentNode;
        }
        return false;
    },
    hasClassName: function(b, a) {
        if (!b) {
            return;
        }
        return this.array.indexOf(b.className.split(/\s+/), a) != -1;
    },
    addClassName: function(b, a) {
        if (!b) {
            return;
        }
        if (this.hasClassName(b, a)) {
            return;
        }
        b.className = b.className + " " + a;
    },
    removeClassName: function(a, b) {
        if (!a) {
            return;
        }
        if (typeof b == "string") {
            b = [b];
        }
        a.className = this.array.select(a.className.split(/\s+/), function(c) {
            return ($jex.array.indexOf(b, c) == -1);
        }).join(" ");
    },
    toggleClassName: function(b, a, d, c) {
        if ($jex.hasClassName(b, a)) {
            $jex.removeClassName(b, a);
            if (c) {
                c();
            }
        } else {
            $jex.addClassName(b, a);
            if (d) {
                d();
            }
        }
    },
    createCssText: function(f, d) {
        if (!f) {
            return;
        }
        if (!d) {
            d = document;
        }
        var c = d.createElement("style");
        c.setAttribute("type", "text/css");
        var a = d.getElementsByTagName("head")[0];
        if (!a) {
            return;
        } else {
            a.appendChild(c);
        }
        if (c.styleSheet) {
            c.styleSheet.cssText = f;
        } else {
            var b = d.createTextNode(f);
            c.appendChild(b);
        }
        return c;
    },
    createCssLink: function(a, d) {
        if (!a) {
            return;
        }
        if (!d) {
            d = document;
        }
        if (document.createStyleSheet) {
            document.createStyleSheet(a);
        } else {
            var c = d.createElement("link");
            c.setAttribute("rel", "stylesheet");
            c.setAttribute("type", "text/css");
            c.setAttribute("href", a);
            var b = d.getElementsByTagName("head")[0];
            if (!b) {
                return;
            } else {
                b.appendChild(c);
            }
        }
    },
    stopPropagation: function(a) {
        if (!a) {
            return;
        }
        if (a.stopPropagation) {
            a.stopPropagation();
        } else {
            a.cancelBubble = true;
        }
    },
    preventDefault: function(a) {
        if (!a) {
            return;
        }
        if (a.preventDefault) {
            a.preventDefault();
        } else {
            a.returnValue = false;
        }
    },
    stopEvent: function(a) {
        a = a || window.event;
        $jex.preventDefault(a);
        $jex.stopPropagation(a);
    },
    callback: function(b, a) {
        return function() {
            return a.apply(b, arguments);
        };
    },
    getDocumentWindow: function(a) {
        return a.parentWindow || window;
    },
    array: {
        toArray: function(c) {
            if (!c) {
                return [];
            }
            var b = [],
                a;
            for (a = 0; a < c.length; a++) {
                b.push(c[a]);
            }
            return b;
        },
        indexOf: function(a, b) {
            for (var c = 0, d = a.length; c < d; c++) {
                if (a[c] == b) {
                    return c;
                }
            }
            return -1;
        },
        each: function(a, d, c) {
            if (!a) {
                return;
            }
            for (var b = 0, f = a.length; b < f; b++) {
                d.call(c, a[b], b);
            }
        },
        select: function(a, d) {
            if (!a) {
                return [];
            }
            var b = [],
                c, f;
            for (c = 0, f = a.length; c < f; c++) {
                if (d(a[c])) {
                    b.push(a[c]);
                }
            }
            return b;
        },
        copy: function(d, c, g, b) {
            var f = g || 0,
                a = b || d.length;
            for (; f < a; ++f) {
                c.push(d[f]);
            }
        },
        remove: function(a, d, g) {
            var b = 0,
                c, f;
            for (c = 0, f = a.length; c < f; c++) {
                if (a[c] === d || g && a[c] == d) {
                    a.splice(c--, 1);
                    b++;
                }
            }
            return b;
        },
        map: function(b, g, d) {
            if (typeof b.map === "function") {
                return b.map(g, d);
            }
            var a = b.length;
            var f = new Array(a);
            for (var c = 0; c < a; c++) {
                if (c in b) {
                    f[c] = g.call(d, b[c], c, b);
                }
            }
            return f;
        },
        some: function(b, f, d) {
            if (typeof b.some === "function") {
                return b.some(f, d);
            }
            for (var c = 0, a = b.length; c < a; c++) {
                if (c in b && callback.call(d, b[c], c, b)) {
                    return true;
                }
            }
            return false;
        }
    },
    hash: {
        each: function(c, b) {
            for (var a in c) {
                b(a, c[a]);
            }
        }
    },
    each: function(b, a) {
        if (b instanceof Array) {
            this.array.each(b, a);
        } else {
            this.hash.each(b, a);
        }
    },
    $continue: new Object(),
    $break: new Object(),
    foreach: function(b, g) {
        var a = null;
        if (b instanceof Array) {
            for (var d = 0; d < b.length; d++) {
                var f = b[d];
                a = g(f, d);
                if (a == $jex.$continue) {
                    continue;
                }
                if (a == $jex.$break) {
                    break;
                }
            }
        } else {
            var d = 0;
            for (var c in b) {
                var f = b[c];
                a = g(f, d, c);
                if (a == $jex.$continue) {
                    continue;
                }
                if (a == $jex.$break) {
                    break;
                }
                d++;
            }
        }
        return a;
    },
    event: {
        doclick: function(c) {
            var b = document.getElementById(c);
            if (document.createEvent) {
                var a = document.createEvent("MouseEvents");
                a.initEvent("click", true, false);
                b.dispatchEvent(a);
            } else {
                if (document.createEventObject) {
                    b.fireEvent("onclick");
                }
            }
        },
        add: function(c, a, b) {},
        remove: function(a) {},
        bind: function(f, b, d) {
            var c = (f == window && b == "unload");
            if (f.addEventListener) {
                var a = false;
                if (b == "focusin") {
                    b = "focus";
                    a = true;
                } else {
                    if (b == "focusout") {
                        b = "blur";
                        a = true;
                    }
                }
                f.addEventListener(b, d, a);
                d = this.add(f, b, d, a ? 4 : 1, c);
            } else {
                if (f.attachEvent) {
                    d = $jex.callback(f, d);
                    f.attachEvent("on" + b, d);
                    d = this.add(f, b, d, 2, c);
                } else {
                    f["on" + b] = d;
                    d = this.add(f, b, d, 3, c);
                }
            }
            return d;
        },
        bindDom: function(c, a, d, b) {
            return this.bind(c, a, function(f) {
                if (!f.target) {
                    f.target = f.srcElement;
                }
                b.call(d, f, this);
            });
        },
        stop: function(b, a) {
            this.bind(b, a, function(c) {
                $jex.stopEvent(c);
                return false;
            });
        },
        trigger: function(c, b, a) {}
    },
    element: {
        hide: function(a) {
            if (!a) {
                return;
            }
            a.style.display = "none";
            return a;
        },
        show: function(a) {
            if (!a) {
                return;
            }
            a.style.display = "block";
            return a;
        },
        visible: function(a) {
            if (!a) {
                return false;
            }
            return a.style.display != "none";
        },
        toggle: function(c) {
            for (var c = arguments[0], b = 0, a = arguments.length; b < a; b++, c = arguments[b]) {
                c = $jex.$(c);
                if (!c) {
                    continue;
                }
                if ($jex.element.visible(c)) {
                    $jex.element.hide(c);
                } else {
                    $jex.element.show(c);
                }
            }
        }
    }
};
$jex.createXMLHttpRequest = $jex.exec(function() {
    var b = 0,
        a = [function() {
            return new XMLHttpRequest();
        }, function() {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }, function() {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }];
    return function() {
        for (var c = b; c < a.length; c++) {
            try {
                b = c;
                return a[c]();
            } catch (d) {}
        }
        return $jex.VOIDFUNC;
    };
});
$jex.exec(function() {
    var b = navigator.userAgent,
        a;
    if ((/WebKit|KHTML/).test(b)) {
        $jex.browser = "safari";
        $jex.safari = 1;
    }
    a = b.match(/AppleWebKit\/([^\s]*)/);
    if (a && a[1]) {
        $jex.safari = $jex.toFloat(a[1]);
        if (/ Mobile\//.test(b)) {
            $jex.mobile = "Apple";
        } else {
            a = b.match(/NokiaN[^\/]*/);
            if (a) {
                $jex.mobile = a[0];
            }
        }
        a = b.match(/AdobeAIR\/([^\s]*)/);
        if (a) {
            $jex.air = a[0];
        }
    } else {
        a = b.match(/Opera[\s\/]([^\s]*)/);
        if (a && a[1]) {
            $jex.opera = $jex.toFloat(a[1]);
            $jex.browser = "opera";
            a = b.match(/Opera Mini[^;]*/);
            if (a) {
                $jex.mobile = a[0];
            }
        } else {
            a = b.match(/MSIE\s([^;]*)/);
            if (a && a[1]) {
                $jex.browser = "ie";
                $jex.ie = $jex.toFloat(a[1]);
            } else {
                a = b.match(/Gecko\/([^\s]*)/);
                if (a) {
                    $jex.browser = "gecko";
                    $jex.gecko = 1;
                    a = b.match(/rv:([^\s\)]*)/);
                    if (a && a[1]) {
                        $jex.gecko = $jex.toFloat(a[1]);
                    }
                }
            }
        }
    }
    return false;
});
$jex.exec(function() {
    var a = -1;
    $jex.boxModel = function() {
        if (a !== -1) {
            return a;
        }
        var b = document.createElement("div");
        b.style.width = b.style.paddingLeft = "1px";
        document.body.appendChild(b);
        a = b.offsetWidth === 2;
        document.body.removeChild(b).style.display = "none";
        return a;
    };
    if (window.location.hostname.indexOf("local") >= 0 || window.location.search.indexOf("debug=true") > 0) {
        $jex.isdebug = true;
    }
});
$jex.exec(function() {
    var g = false,
        c, d, b, f;

    function a() {
        if (g) {
            return;
        }
        var o = document.body,
            i = document.createElement("div"),
            k, j, q, l, p, h, m = o.style.marginTop,
            n = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
        p = {
            position: "absolute",
            top: 0,
            left: 0,
            margin: 0,
            border: 0,
            width: "1px",
            height: "1px",
            visibility: "hidden"
        };
        for (h in p) {
            i.style[h] = p[h];
        }
        i.innerHTML = n;
        o.insertBefore(i, o.firstChild);
        k = i.firstChild, j = k.firstChild, l = k.nextSibling.firstChild.firstChild;
        c = (j.offsetTop !== 5);
        d = (l.offsetTop === 5);
        k.style.overflow = "hidden", k.style.position = "relative";
        b = (j.offsetTop === -5);
        o.style.marginTop = "1px";
        f = (o.offsetTop === 0);
        o.style.marginTop = m;
        o.removeChild(i);
        g = true;
    }
    if (document.documentElement.getBoundingClientRect) {
        $jex.offset = function(j) {
            if (j === j.ownerDocument.body) {
                return $jex.bodyOffset(j);
            }
            var l = j.getBoundingClientRect(),
                p = j.ownerDocument,
                m = p.body,
                h = p.documentElement,
                k = h.clientTop || m.clientTop || 0,
                n = h.clientLeft || m.clientLeft || 0,
                o = l.top + (self.pageYOffset || $jex.boxModel && h.scrollTop || m.scrollTop) - k,
                i = l.left + (self.pageXOffset || $jex.boxModel && h.scrollLeft || m.scrollLeft) - n;
            return {
                top: o,
                left: i
            };
        };
    } else {
        $jex.offset = function(m) {
            if (m === m.ownerDocument.body) {
                return $jex.bodyOffset(m);
            }
            g || a();
            var m = m,
                j = m.offsetParent,
                i = m,
                s = m.ownerDocument,
                p, k = s.documentElement,
                n = s.body,
                o = s.defaultView,
                h = o.getComputedStyle(m, null),
                q = m.offsetTop,
                l = m.offsetLeft;
            while ((m = m.parentNode) && m !== n && m !== k) {
                p = o.getComputedStyle(m, null);
                q -= m.scrollTop, l -= m.scrollLeft;
                if (m === j) {
                    q += m.offsetTop, l += m.offsetLeft;
                    if (c && !(d && /^t(able|d|h)$/i.test(m.tagName))) {
                        q += parseInt(p.borderTopWidth, 10) || 0, l += parseInt(p.borderLeftWidth, 10) || 0;
                    }
                    i = j, j = m.offsetParent;
                }
                if (b && p.overflow !== "visible") {
                    q += parseInt(p.borderTopWidth, 10) || 0, l += parseInt(p.borderLeftWidth, 10) || 0;
                }
                h = p;
            }
            if (h.position === "relative" || h.position === "static") {
                q += n.offsetTop, l += n.offsetLeft;
            }
            if (h.position === "fixed") {
                q += Math.max(k.scrollTop, n.scrollTop), l += Math.max(k.scrollLeft, n.scrollLeft);
            }
            return {
                top: q,
                left: l
            };
        };
    }
    $jex.bodyOffset = function() {
        g || a();
        var i = body.offsetTop,
            h = body.offsetLeft;
        return {
            top: i,
            left: h
        };
    };
    $jex.pointerX = function(h) {
        return h.pageX || (h.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    }, $jex.pointerY = function(h) {
        return h.pageY || (h.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    }, $jex.getPageSize = function() {
        var j, h;
        if (window.innerHeight && window.scrollMaxY) {
            j = document.body.scrollWidth;
            h = window.innerHeight + window.scrollMaxY;
        } else {
            if (document.body.scrollHeight > document.body.offsetHeight) {
                j = document.body.scrollWidth;
                h = document.body.scrollHeight;
            } else {
                j = document.body.offsetWidth;
                h = document.body.offsetHeight;
            }
        }
        var i, k;
        if (self.innerHeight) {
            i = self.innerWidth;
            k = self.innerHeight;
        } else {
            if (document.documentElement && document.documentElement.clientHeight) {
                i = document.documentElement.clientWidth;
                k = document.documentElement.clientHeight;
            } else {
                if (document.body) {
                    i = document.body.clientWidth;
                    k = document.body.clientHeight;
                }
            }
        }
        if (h < k) {
            pageHeight = k;
        } else {
            pageHeight = h;
        }
        if (j < i) {
            pageWidth = i;
        } else {
            pageWidth = j;
        }
        return {
            pageWidth: pageWidth,
            pageHeight: pageHeight,
            windowWidth: i,
            windowHeight: k
        };
    };
});
$jex.exec(function() {
    function setObjectValue(target, id, obj) {
        if (!target[id]) {
            target[id] = obj;
        } else {
            if (target[id] instanceof Array) {
                var arr = target[id];
                if (obj instanceof Array) {
                    for (var i = 0; i < obj.length; i++) {
                        arr.push(obj[i]);
                    }
                } else {
                    target[id].push(obj);
                }
            } else {
                target[id] = [target[id], obj];
            }
        }
    }
    var readObject = $jex.readObject = function(el, target, id) {
        var obj, text;
        var childs = el.getAttribute("jxChilds") || !target;
        if (text = el.getAttribute("jxObject")) {
            obj = eval("({" + text + "});");
        } else {
            if (text = el.getAttribute("jxValue")) {
                if (_Rp$(text, "%.")) {
                    obj = el.getAttribute(text.substring(2));
                } else {
                    obj = text;
                }
            } else {
                if (!childs) {
                    obj = el.innerHTML;
                } else {
                    obj = {};
                }
            }
        }
        if (childs == "1") {
            var els = el.childNodes;
            for (var i = 0; i < els.length; i++) {
                if (els[i].nodeType == 1) {
                    var _id = els[i].getAttribute("jxc");
                    if (_id) {
                        readObject(els[i], obj, _id);
                    }
                }
            }
        }
        if (id == ".") {
            asd = (obj);
        }
        if (target && id) {
            if (id == ".") {
                for (var i in obj) {
                    setObjectValue(target, i, obj[i]);
                }
            } else {
                setObjectValue(target, id, obj);
            }
        }
        return obj;
    };

    function getEventStack(obj, name, create) {
        var arr, prop = obj.__x_;
        if (prop) {
            arr = prop[name];
            if (!arr) {
                arr = [];
                if (create) {
                    prop[name] = arr;
                }
            }
        } else {
            arr = [];
            if (create) {
                obj.__x_ = {};
                obj.__x_[name] = arr;
            }
        }
        return arr;
    }

    function getEventStackCopy(obj, name) {
        var arr = [],
            prop = obj.__x_;
        if (prop) {
            if (name) {
                if (prop[name]) {
                    $jex.array.copy(prop[name], arr);
                }
            } else {
                $jex.array.each(prop, function(name, obj) {
                    $jex.arraycopy(obj, arr);
                });
            }
        }
        return arr;
    }
    var events = [];
    var bindingArr = "blur,focus,load,resize,scroll,unload,click,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error";
    var bindingEvent = {
        keypress: function(object, target, eventname, handler) {
            return $jex.event.bindDom(object, $jex.ie || $jex.safari ? "keydown" : "keypress", target, handler);
        }
    };
    $jex.event.binding = function(object, target, eventname, handler) {
        if (!object) {
            return;
        }
        if (arguments.length == 3) {
            handler = eventname;
            eventname = target;
            target = object;
        }
        if (bindingArr.indexOf(eventname.toLowerCase()) < 0) {
            return $jex.event.add(target, eventname, handler);
        } else {
            if (!bindingEvent[eventname]) {
                return $jex.event.bindDom(object, eventname, target, handler);
            } else {
                return bindingEvent[eventname](object, target, eventname, handler);
            }
        }
    };
    $jex.event.addEx = function(objarr, name, handler, type, notmark) {
        for (var i = 0, n = objarr.length; i < n; i++) {
            var obj = objarr[i];
            $jex.event.add(obj, name, handler, type, notmark);
        }
    };
    $jex.event.add = function(obj, name, handler, type, notmark) {
        obj = new EventListener(obj, name, handler, type);
        if (!notmark) {
            events.push(obj);
            obj.refer = events.length - 1;
        }
        return obj;
    };
    $jex.event.remove = function(listener) {
        listener.remove();
        var i = listener.refer;
        if (!(i < 0)) {
            var obj = events.pop();
            if (i < events.length) {
                events[i] = obj;
                obj.refer = i;
            }
            listener.refer = -1;
        }
    };
    $jex.event.clear = function(elem, name) {
        $jex.array.each(getEventStackCopy(elem, name), $jex.event.remove);
    };
    $jex.event.trigger = function(elem, name, arg) {
        $jex.console.info("[事件触发] name:", name, ", elem:", elem, "  , arg:", arg);
        var args = [];
        $jex.array.copy(arguments, args, 2);
        this.triggerParam(elem, name, args);
    };
    $jex.event.triggerParam = function(elem, name, args) {
        $jex.array.each(getEventStackCopy(elem, name), function(func) {
            func.apply(elem, args);
        });
    };
    $jex.event.click = function(elemId, func) {
        $jex.event.binding($jex.$(elemId), "click", function(evt) {
            func(evt);
            $jex.stopEvent(evt);
        });
    };
    $jex.event.within = function(contentEl, evt) {
        var element = typeof event != "undefined" ? event.srcElement : evt.target;
        var isIn = false;
        while (element) {
            isIn = (element == contentEl);
            if (isIn) {
                break;
            }
            element = element.parentNode;
        }
        return isIn;
    };
    $jex.errorStack = [];
    window.onerror = function(e) {
        e.toString = $jex.errToString;
        $jex.console.error(e);
    };

    function EventListener(elem, name, handler, type) {
        this.elem = elem;
        this.name = name;
        this.handler = handler;
        this.type = type;
        this.refer = -1;
        getEventStack(elem, name, true).push(this);
    }
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
                    break;
            }
            $jex.array.remove(getEventStack(this.elem, this.name), this);
            this.elem = this.handler = null;
        }
    };
    EventListener.prototype.apply = function(obj, args) {
        return this.handler.apply(obj, args);
    };
});
$jex.exec(function() {
    function ScriptRequest(option) {
        if (option.funcName) {
            this.funcName = option.funcName;
        }
        this.callbackName = option.callbackName || "callback";
        this.doc = option.doc || document;
        this.win = $jex.getDocumentWindow(this.doc);
        if (option.onerror) {
            $jex.event.add(this, "error", option.onerror);
        }
        if (option.ontimeout) {
            $jex.event.add(this, "timeout", option.ontimeout);
        }
        if (option.oncancel) {
            $jex.event.add(this, "cancel", option.oncancel);
        }
        if (option.oncomplete) {
            $jex.event.add(this, "complete", option.oncomplete);
        }
    }
    ScriptRequest.loadScript = function(url, doc) {
        doc = doc || document;
        var port = doc.createElement("script");
        port.type = "text/javascript";
        port.src = url;
        doc.getElementsByTagName("head")[0].appendChild(port);
        return port;
    };
    ScriptRequest.prototype.send = function(url, timeout) {
        var cid = this.callID = this.funcName ? this.funcName : "XQScript_" + $jex.globalID();
        if (url.indexOf("?") == -1) {
            url = url + "?";
        }
        url += "&" + this.callbackName + "=" + cid;
        var _self = this;
        var _win = this.win;
        var timerid;
        _win[cid] = function() {
            if (timerid) {
                window.clearTimeout(timerid);
                timerid = null;
            }
            _self.release();
            _win[cid] = null;
            $jex.event.triggerParam(_self, "complete", $jex.array.toArray(arguments));
        };
        if (timeout && timeout > 0) {
            timerid = window.setTimeout(function() {
                _self.release();
                $jex.event.trigger(_self, "timeout");
            }, timeout);
        }
        this.searchPort = ScriptRequest.loadScript(url, this.doc);
    };
    ScriptRequest.prototype.release = function() {
        if (this.searchPort) {
            $jex.removeElement(this.searchPort);
            this.searchPort = null;
            this.win[this.callID] = $jex.VOIDFUNC;
            return true;
        }
        return false;
    };
    ScriptRequest.prototype.cancel = function() {
        if (this.release()) {
            $jex.event.trigger(this, "cancel");
        }
    };
    $jex.scriptRequest = ScriptRequest;
    $jex.jsonp = function(url, data, successhandler, options) {
        if (arguments.length == 2 && typeof data == "function") {
            successhandler = data;
            data = {};
        }
        options = options || {};
        options.oncomplete = successhandler;
        var timeout = options.timeout || {};
        if (url.indexOf("?") == -1) {
            url = url + "?";
        }
        for (var k in data) {
            url += "&" + k + "=" + encodeURIComponent(data[k]);
        }
        var req = new ScriptRequest(options);
        req.send(url);
        if (timeout.time && timeout.time > 0) {
            window.setTimeout(function() {
                req.cancel();
                timeout.func();
            }, timeout.time);
        }
        return req;
    };
    $jex.ajax = function(url, data, successhandler, options) {
        options = options || {};
        if ($jex.isdebug && $jex.gecko) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
            } catch (e) {
                alert("Permission UniversalBrowserRead denied.");
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
                                str = "(" + str + ")";
                            }
                            _result = eval(str);
                            successhandler(_result);
                        } else {
                            if (options.onerror) {
                                options.onerror(request);
                            }
                            $jex.console.error(url, "返回值为空");
                        }
                    } catch (e) {
                        if (options.onerror) {
                            options.onerror(e);
                        }
                        e.toString = $jex.errToString;
                        $jex.console.error(url, e);
                    }
                } else {
                    if (options.onerror) {
                        options.onerror();
                    }
                }
            }
        };
        var token = Math.floor(Math.random() * 100000);
        data._token = token;
        if (url.indexOf("?") == -1) {
            url = url + "?";
        }
        var method = options.method || "GET";
        if (method === "GET") {
            request.open("GET", url + "&" + $jex.toQueryString(data), true);
            if (options && options.beforeSend && typeof options.beforeSend == "function") {
                options.beforeSend(request);
            }
            request.send(null);
        } else {
            if (method === "POST") {
                request.open("POST", url, true);
                request.setRequestHeader("Content-type", options.contentType || "applacation/json");
                if (options && options.beforeSend && typeof options.beforeSend == "function") {
                    options.beforeSend(request);
                }
                request.send(JSON.stringify(data));
            }
        }
        $jex.console.info("[接口调用 token=", token, "]", " url:", url, data, successhandler, options, request);
        return request;
    };
    var timeMap = {};
    var _consoleStack = [];
    var _filter = {
        INFO: 1,
        WARN: 1
    };
    $jex.errToString = function() {
        var s = ["[ERROR]"];
        for (var key in this) {
            if (typeof this[key] == "function") {
                continue;
            }
            s.push(key, ":", this[key], "<br/>");
        }
        return s.join(" ");
    };
    var _pushToStack = function(level) {
        if (!_filter[level]) {
            return function() {
                _consoleStack.push(arguments);
            };
        } else {
            return $jex.VOIDFUNC;
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
    $jex.console.start = function(key) {
        timeMap[key] = new Date();
    };
    $jex.console.end = function(key) {
        if (timeMap[key]) {
            $jex.console.time("[TIME]", key, ":", new Date() - timeMap[key]);
            delete timeMap[key];
        }
    };
    $jex.console.output = function() {
        var str = [];
        for (var i = 0; i < _consoleStack.length; i++) {
            var line = [];
            var args = _consoleStack[i];
            for (var j = 0; j < args.length; j++) {
                line.push(args[j]);
            }
            str.push(line.join(""));
        }
        var div = $jex.$("divDebugConsole");
        if (div) {
            div.innerHTML = str.join("<br/>");
            $jex.element.show(div);
        } else {
            alert(str.join("\r\n"));
        }
    };
    $jex.event.binding(document, "keydown", function(ev) {
        if ((ev.keyCode == 121 && ev.ctrlKey && ev.altKey) || (ev.keyCode == 77 && ev.ctrlKey && ev.altKey)) {
            $jex.console.output();
        }
    });
});

function UIObject() {
    this._XGUI_ = true;
    this._content_ = [];
    this._childrens_ = [];
    this._GID_ = "XI" + $jex.globalID();
    this._tplsreg = /\{\#([^\}]*?)\}/;
}
UIObject.prototype.isempty = function() {
    return this._content_.length == 0;
};
UIObject.prototype.clear = function() {
    this._content_ = [];
    this._childrens_ = [];
};
UIObject.prototype.newid = function(a) {
    return a + this._GID_;
};
UIObject.prototype.tpls = function(b) {
    var d = this._content_;
    var a = this._childrens_;
    var f = this._GID_;
    for (var c = 0; c < arguments.length; c++) {
        var g = arguments[c];
        if (g != null) {
            if (g.indexOf("{#") < 0) {
                d.push(g);
            } else {
                if (g._XGUI_ == true) {
                    a.push(g);
                    d.push(g);
                } else {
                    d.push(g.replace(this._tplsreg, "$1" + f));
                }
            }
        }
    }
    return this;
};
UIObject.prototype.append = function(b) {
    var d = this._content_;
    var a = this._childrens_;
    var f = this._GID_;
    for (var c = 0; c < arguments.length; c++) {
        var g = arguments[c];
        if (g != null) {
            if (c % 2 == 0) {
                d.push(g);
            } else {
                if (g._XGUI_ == true) {
                    a.push(g);
                    d.push(g);
                } else {
                    d.push(' id="', g, f, '"');
                }
            }
        }
    }
    return this;
};
UIObject.prototype.text = function(c) {
    var b = this._content_;
    for (var a = 0; a < arguments.length; a++) {
        b.push(arguments[a]);
    }
    return this;
};
UIObject.prototype.getDomNode = function(a) {
    return $jex.$(a + this._GID_, this._document_);
};
UIObject.prototype.initDocument = function(a) {
    this._document_ = a;
    var b = this._childrens_;
    for (var c = 0; c < b.length; c++) {
        b[c].initDocument(a);
    }
    this.initialize();
};
UIObject.prototype.write = function(b) {
    var a = this.toString();
    if (a) {
        b.innerHTML = a;
        this.initDocument($jex.doc(b));
    } else {
        b.innerHTML = "";
    }
};
UIObject.prototype.toString = function() {
    return this._content_.join("");
};
UIObject.prototype.initialize = $jex.VOIDFUNC;
$jex.List = function(a) {
    this._map = {};
    this._size = 0;
    this.addRange(a);
};
$jex.exec(function() {
    var a = new Object();
    $jex.List.prototype.addRange = function(d) {
        var g = this._size;
        if (d) {
            var b = this._map;
            for (var f in d) {
                var c = d[f];
                b[f] = c == null ? a : c;
                g++;
            }
        }
        this._size = g;
    };
    $jex.List.prototype.firstkey = function() {
        var b = this.keys();
        if (b.length == 0) {
            return null;
        }
        return b[0];
    };
    $jex.List.prototype.first = function() {
        var b = this.keys();
        if (b.length == 0) {
            return null;
        }
        return this.get(b[0]);
    };
    $jex.List.prototype.get = function(c) {
        var b = this._map[c];
        return b === a ? null : b;
    };
    $jex.List.prototype.put = function(c, d) {
        var b = this._map[c];
        if (typeof b === "undefined") {
            this._size++;
        }
        if (d == null) {
            d = a;
        }
        this._map[c] = d;
        return b;
    };
    $jex.List.prototype.keys = function() {
        var c = [];
        var b = this._map;
        for (var d in b) {
            c.push(d);
        }
        return c;
    };
    $jex.List.prototype.contains = function(b) {
        return this._map[b] != null;
    };
    $jex.List.prototype.remove = function(c) {
        var b = this._map[c];
        if (b != null) {
            this._size--;
        }
        if (b === a) {
            b = null;
        }
        delete this._map[c];
        return b;
    };
    $jex.List.prototype.size = function() {
        return this._size;
    };
    $jex.List.prototype.clear = function() {
        this._map = {};
        this._size = 0;
    };
    $jex.List.prototype.toArray = function() {
        var c = this._map;
        var b = [];
        for (var d in c) {
            v = c[d];
            if (v === a) {
                v = null;
            }
            b.push([d, v]);
        }
        return b;
    };
    $jex.List.prototype.toString = function() {
        var d = [];
        var c = this._map;
        for (var b in c) {
            d.push(b + ": " + c[b]);
        }
        return d.join("\n");
    };
});

function ActionDelay(a) {
    this.delay = a;
    this.timer = null;
}
ActionDelay.prototype.reset = function(a) {
    this.cancel();
    this.timer = setTimeout(a, this.delay);
};
ActionDelay.prototype.cancel = function() {
    if (this.timer) {
        clearTimeout(this.timer);
    }
};

function ActionFlow(a) {
    this.actions = {};
    this.logs = [];
    this.interval = a;
    this.tid = null;
}
ActionFlow.prototype.add = function(b, a, d) {
    var c = this.actions[a];
    if (c && c.order < b) {
        return;
    }
    this.actions[a] = {
        order: b,
        key: a,
        func: d
    };
    return this;
};
ActionFlow.prototype.remove = function(a) {
    delete this.actions[a];
};
ActionFlow.prototype.start = function() {
    if (this.tid !== null) {
        return;
    }
    var b = false;
    for (var a in this.actions) {
        b = true;
        break;
    }
    if (!b) {
        return;
    }
    this.tid = setTimeout($jex.callback(this, this.run), this.interval);
};
ActionFlow.prototype.run = function() {
    clearTimeout(this.tid);
    this.tid = null;
    var a = this.actions,
        h = null;
    for (var b in a) {
        var c = a[b];
        if (!h || c.order < h.order) {
            h = c;
            delete a[b];
        }
    }
    if (h == null) {
        return;
    }
    var g = new Date().getTime();
    var d;
    try {
        h.func();
        d = "done";
    } catch (f) {
        d = "error:" + f;
    }
    this.logs.push([g, d, new Date().getTime() - g, h.key]);
    this.start();
};
if ($jex.ie > 5 && $jex.ie < 7) {
    try {
        (function() {
            document.execCommand("BackgroundImageCache", false, true);
            $jex.addClassName(document.getElementsByTagName("html")[0], "jx-ie" + ($jex.ie * 10));
        })();
    } catch (e) {}
}(function() {
    var a = null;
    $jex.scrollTo = function(d, c) {
        if (!d) {
            return;
        }
        if (a) {
            clearInterval(a);
        }
        c = c || 0;
        var i = $jex.offset(d);
        var h = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var g = Math.floor(i.left);
        var f = Math.floor(i.top);
        window.scrollTo(g, f);
    };
    $jex.define = function(c) {
        return typeof(c) != "undefined" && c != null;
    };
    $jex.extend = function() {
        for (var d = 1, c = arguments.length; d < c; d++) {
            $jex.merge(arguments[0], arguments[d]);
        }
        return arguments[0];
    };
    $jex.element.compareDocumentPosition = function(d, c) {
        return d.compareDocumentPosition ? d.compareDocumentPosition(c) : d.contains ? (d != c && d.contains(c) && 16) + (d != c && c.contains(d) && 8) + (d.sourceIndex >= 0 && c.sourceIndex >= 0 ? (d.sourceIndex < c.sourceIndex && 4) + (d.sourceIndex > c.sourceIndex && 2) : 1) : 0;
    };
    $jex.array.inArray = function(d, c) {
        return $jex.array.indexOf(c, d);
    };
    $jex.array.xcopy = function() {
        var h = -1,
            c = arguments.length,
            k, j = arguments[c - 1];
        if (typeof arguments[c - 1] == "number") {
            var g = [j, 0];
            j = arguments[--c - 1];
            while (++h < c - 1) {
                arguments.callee(arguments[h], g);
            }
            Array.prototype.splice.apply(j, g);
        } else {
            while (++h < c - 1) {
                for (var f = 0, d = arguments[h].length; f < d; f++) {
                    j.push(arguments[h][f]);
                }
            }
        }
        return j;
    };
    $jex.hash.size = function(d) {
        var c = 0;
        $jex.hash.each(d, function() {
            c++;
        });
        return c;
    };
    $jex.hash.first = function(d) {
        for (var c in d) {
            return d[c];
        }
        return null;
    };
    var b = null;
    $jex.cookie = {
        reset: function() {
            b = $jex.cookie._getCookieHash();
        },
        _getCookieHash: function() {
            var f = document.cookie.split(";");
            var d = {};
            for (var c = 0; c < f.length; c++) {
                if (f[c].indexOf("=") != -1) {
                    d[$jex.trim(f[c].split("=")[0])] = $jex.trim(unescape(f[c].split("=")[1]));
                }
            }
            return d;
        },
        get: function(c) {
            if (!b) {
                b = $jex.cookie._getCookieHash();
            }
            return b[c];
        }
    };
    $jex.merge($jex.event, {
        _readyList: [],
        _isReady: false,
        _bindReady: function() {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", function() {
                    document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                    $jex.event._ready();
                }, false);
            } else {
                if (document.attachEvent) {
                    document.attachEvent("onreadystatechange", function() {
                        if (document.readyState === "complete") {
                            document.detachEvent("onreadystatechange", arguments.callee);
                            $jex.event._ready();
                        }
                    });
                    if (document.documentElement.doScroll && window == window.top) {
                        (function() {
                            if ($jex.event._isReady) {
                                return;
                            }
                            try {
                                document.documentElement.doScroll("left");
                            } catch (c) {
                                setTimeout(arguments.callee, 0);
                                return;
                            }
                            $jex.event._ready();
                        })();
                    }
                }
            }
            $jex.event.bind(window, "load", $jex.event._ready);
        },
        ready: function(c) {
            if ($jex.event._isReady) {
                c();
            } else {
                $jex.event._readyList.push(c);
            }
        },
        _ready: function() {
            if (!$jex.event._isReady) {
                $jex.event._isReady = true;
                for (var d = 0, c = $jex.event._readyList.length; d < c; d++) {
                    $jex.event._readyList[d].call(document);
                }
            }
        }
    });
    $jex.event._bindReady();
    $jex.merge($jex.date = {}, {
        _prefix: function(c, d) {
            d = d || 2;
            c = c + "";
            while (c.length < d) {
                c = "0" + c;
            }
            return c;
        },
        _format: {
            yyyy: function(c) {
                return c.getFullYear().toString();
            },
            MM: function(c) {
                return $jex.date._prefix(c.getMonth() + 1);
            },
            M: function(c) {
                return c.getMonth() + 1 + "";
            },
            HH: function(c) {
                return $jex.date._prefix(c.getHours());
            },
            H: function(c) {
                return c.getHours();
            },
            dd: function(c) {
                return $jex.date._prefix(c.getDate());
            },
            d: function(c) {
                return c.getDate();
            },
            mm: function(c) {
                return $jex.date._prefix(c.getMinutes());
            },
            m: function(c) {
                return c.getMinutes();
            },
            m: function(c) {
                return c.getMinutes();
            },
            ss: function(c) {
                return $jex.date._prefix(c.getSeconds());
            },
            s: function(c) {
                return c.getSeconds();
            }
        },
        format: function(c, d) {
            switch (d) {
                case "MM月dd日":
                    return [$jex.date._format.MM(c) + "月", $jex.date._format.dd(c) + "日"].join("-");
                case "yyyy-MM-dd HH:mm:ss":
                    return [$jex.date._format.yyyy(c), $jex.date._format.MM(c), $jex.date._format.dd(c)].join("-") + " " + [$jex.date._format.HH(c), $jex.date._format.mm(c), $jex.date._format.ss(c)].join(":");
            }
            return [$jex.date._format.yyyy(c), $jex.date._format.MM(c), $jex.date._format.dd(c)].join("-");
        },
        parse: function(c) {
            if (!c || typeof c != "string") {
                return c;
            }
            return new Date(c.replace(/-/g, "/"));
        },
        add: function(c, i, g) {
            var h = c;
            if (g == null) {
                g = (typeof c == "string");
            }
            if (typeof c == "string") {
                h = new Date(c.replace(/-/g, "/"));
            }
            var f = new Date(h.getTime() + (i * 86400000));
            if (g) {
                return $jex.date.format(f);
            } else {
                return f;
            }
        },
        getMinute: function(f) {
            var g = f.split(":");
            var d = parseInt(g[0], 10);
            d = (d == 0) ? 24 : d;
            var c = parseInt(g[1], 10);
            return d * 60 + c;
        },
        getTime: function(c) {
            return parseInt(c.replace(":", ""), 10);
        },
        distance: function(d, c) {
            if (!(d instanceof Date)) {
                d = new Date(d);
            }
            d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            if (!(c instanceof Date)) {
                c = new Date(c);
            }
            c = new Date(c.getFullYear(), c.getMonth(), c.getDate());
            return (c.getTime() - d.getTime()) / (24 * 60 * 60 * 1000);
        }
    });
    $jex.merge($jex.web = {}, {
        parseQueryString: function(f) {
            var d = /([^\?|\&]\w+)=([^\?|\&]+)/ig;
            var c = {};
            if (f) {
                if (f.charAt(0) == "?") {
                    f = f.substr(1);
                }
                while (true) {
                    if ((r = d.exec(f))) {
                        c[r[1]] = r[2];
                    } else {
                        break;
                    }
                }
            }
            return c;
        }
    });
    $jex.web.parameters = $jex.web.parseQueryString(window.location.search);
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
            $jex.lightbox.show(null, null, 1);
        },
        cache: {},
        gid: 1,
        expand: "lightbox_temp",
        removeData: function(c) {
            var f = c[this.expand];
            if (!f) {
                return;
            }
            try {
                delete c[this.expand];
            } catch (d) {
                if (c.removeAttribute) {
                    c.removeAttribute(this.expand);
                }
            }
            delete this.cache[f];
        },
        data: function(d, f) {
            var c = d[this.expand] ? d[this.expand] : (d[this.expand] = "" + this.gid++);
            if (f != undefined) {
                this.cache[c] = f;
            }
            return this.cache[c];
        },
        _place: function(c) {
            var g = (document.compatMode && document.compatMode.toLowerCase() == "css1compat") ? document.documentElement : document.body;
            if (c & 2) {
                var f = (g.clientHeight - this.content.offsetHeight) / 2;
                var d = Math.floor(this.content.offsetWidth / 2);
                $jex.hash.each($jex.extend({}, this.c, {
                    top: ((f > 0 ? f : 0) + (window.pageYOffset || g.scrollTop)) + "px",
                    marginLeft: 0 - d + "px"
                }), function(i, h) {
                    $jex.lightbox.content.style[i] = h;
                });
            }
            if (c & 1) {
                $jex.hash.each($jex.extend({}, this.d, {
                    height: Math.max(g.scrollHeight, g.clientHeight) + "px",
                    width: Math.max(g.scrollWidth, g.clientWidth) + "px"
                }), function(i, h) {
                    $jex.lightbox.overlay.style[i] = h;
                });
            }
        },
        show: function(f, h, d) {
            if (!this.overlay) {
                this.overlay = document.body.appendChild(document.createElement("div"));
                this.content = document.body.appendChild(document.createElement("div"));
                this.overlay.className = "lb_overlay";
                this.content.className = "lb_content";
            }
            if (f) {
                this.content.innerHTML = f;
            }
            if (!this.binded) {
                this.binded = true;
                var g = $jex.array.xcopy(document.getElementsByTagName("object"), document.getElementsByTagName("select"), document.getElementsByTagName("embed"), []);
                $jex.array.each(g, function(i) {
                    $jex.lightbox.data(i, i.style.visibility);
                    i.style.visibility = "hidden";
                });
                if (window.attachEvent) {
                    window.attachEvent("onresize", this.toBind);
                } else {
                    if (window.addEventListener) {
                        window.addEventListener("resize", this.toBind, false);
                    }
                }
            }
            this.content.style.visibility = "hidden";
            this.content.style.display = "block";
            if (typeof h == "function") {
                h.call(this);
            }
            this._place(d == null ? 3 : d);
            this.content.style.visibility = "visible";
            var c = $jex.$("msgButton");
            if (c) {
                $jex.event.click(c, function() {
                    $jex.lightbox.hide();
                });
            }
        },
        hide: function() {
            var d = $jex.array.xcopy(document.getElementsByTagName("object"), document.getElementsByTagName("select"), document.getElementsByTagName("embed"), []);
            $jex.array.each(d, function(f) {
                f.style.visibility = $jex.lightbox.data(f) || "inherit";
                $jex.lightbox.removeData(f);
            });
            for (var c in this.a) {
                this.content.style[c] = this.a[c];
            }
            for (var c in this.b) {
                this.overlay.style[c] = this.b[c];
            }
            if (window.detachEvent) {
                window.detachEvent("onresize", this.toBind);
            } else {
                if (window.removeEventListener) {
                    window.removeEventListener("resize", this.toBind, false);
                }
            }
            this.binded = false;
        }
    };
    var a = document.createElement("style");
    a.type = "text/css";
    var b = ".lb_content {display : none ; position : absolute ; z-index:10000 ; left:0 ;}.lb_overlay {display : none ; position : absolute ; z-index:10000 ; background-color : #000 ; left : 0px ; top : 0px ; opacity : 0.2 ; filter: Alpha(opacity=20) ;}";
    if (a.styleSheet) {
        a.styleSheet.cssText = b;
    } else {
        a.appendChild(document.createTextNode(b));
    }
    document.getElementsByTagName("head")[0].appendChild(a);
    window.$jex = $jex;
})();
$jex.hover = function(z) {
    var y = z.delay || 100,
        x = z.isover || !1,
        w = z.act,
        u = z.extra || [],
        t = null,
        s = function(b) {
            x && z.onmouseover.apply(w, [b]);
        },
        q = function(b) {
            x || z.onmouseout.apply(w, [b]);
        },
        p = function(b) {
            x = !0;
            t && clearTimeout(t);
            t = setTimeout(function() {
                s(b);
            }, y);
        },
        o = function(b) {
            x = !1;
            t && clearTimeout(t);
            t = setTimeout(function() {
                q(b);
            }, y);
        };
    $jex.event.bind(w, "mouseover", p);
    $jex.event.bind(w, "mouseout", o);
    for (var n = 0, a = u.length; n < a; n += 1) {
        $jex.event.bind(u[n], "mouseover", p);
        $jex.event.bind(u[n], "mouseout", o);
    }
};
var DataSet = function(a) {
    this.options = a || {};
    this._init();
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
    this._filtersMap = {};
};
DataSet.prototype.getData = function() {
    return this._data;
};
DataSet.prototype.loadData = function(b) {
    var a = this;
    this._init();
    $jex.foreach(b, function(f, c, d) {
        a.addItem(d, f);
    });
};
DataSet.prototype.addItem = function(b, c) {
    $jex.console.info("DataSet.prototype.addItem:", arguments);
    var a = this._data[b];
    this._data[b] = c;
    this._dataMap.push(b);
    this.filteredDataMap.push(b);
    this._filterMatrix[b] = 0;
    if (!a) {
        this.recordCount++;
        this.filteredRecCount++;
    }
};
DataSet.prototype._doSort = function(a) {
    var b = this;
    a = a || this._currentSortKey;
    var f = a.replace(/\-(0|1)/g, function(i, j) {
        return "-" + (j == "1" ? "0" : "1");
    });
    if (!this._sortMatrix[a]) {
        this._sortMatrix[a] = [];
        if (this._sortMatrix[f]) {
            this._sortMatrix[a] = this._sortMatrix[f].slice().reverse();
        } else {
            this._sortMatrix[a] = this._dataMap.slice();
            var h = this._currentSortArray;
            var d = this._data;
            var g = {};
            var c = function(j, i, k) {
                if (!g[i]) {
                    g[i] = b._gotSortValue(j, i, k);
                    if (g[i] == null) {
                        g[i] = Number.MAX_VALUE;
                    }
                }
                return g[i];
            };
            this._sortMatrix[a].sort(function(o, m) {
                var p, k, j;
                for (var n = 0; n < h.length; n++) {
                    p = h[n][0];
                    k = c(d, o, p);
                    j = c(d, m, p);
                    var l = 0;
                    if (k > j) {
                        l = 1;
                    } else {
                        if (k == j) {
                            l = 0;
                        } else {
                            l = -1;
                        }
                    }
                    if (h[n][1]) {
                        l = (-l);
                    }
                    if (l == 0) {
                        continue;
                    }
                    return l;
                }
                return 0;
            });
        }
    }
    $jex.console.info("DataSet.prototype._doSort:", "_sortKey:", a, "_sortMatrix[_sortKey]:", this._sortMatrix[a]);
};
DataSet.prototype._doGroup = function() {
    var f = this.options.group;
    if (!f) {
        return;
    }
    var d = this._group = {};
    var h = this.filteredDataMap;
    for (var b = 0; b < h.length; b++) {
        var g = this._data[h[b]];
        for (var c in f) {
            if (!d[c]) {
                d[c] = {};
            }
            var a = f[c](g);
            if (!d[c][a]) {
                d[c][a] = [];
            }
            d[c][a].push(g);
        }
    }
};
DataSet.prototype.currentGroup = function(a) {
    if (a) {
        return this._group[a] || {};
    } else {
        return this._group;
    }
};
DataSet.prototype._doAllFilters = function() {
    var a = this;
    if (this._filters.length == 0) {
        this.filteredDataMap = this._sortMatrix[this._currentSortKey];
    } else {
        $jex.foreach(this._filters, function(b) {
            a.doFilter(b);
        });
    }
};
DataSet.prototype.addFilter = function(b) {
    var c = null;
    if (!this._filtersMap[b.name]) {
        var a = Math.pow(2, this._filters.length);
        c = {
            name: b.name,
            type: b.type,
            value: b.value,
            mask: a,
            nmask: ~a
        };
        this._filters.push(c);
        this._filtersMap[c.name] = c;
        this._filterCount = this._filters.length;
    } else {
        this._filtersMap[b.name].value = b.value;
        c = this._filtersMap[b.name];
    }
    return c;
};
DataSet.prototype.clearAllFilter = function() {
    this._filtersMap = {};
    this._filters = [];
    this._filterMatrix = {};
};
DataSet.prototype.clearFilter = function(a) {
    if (!this._filtersMap[a]) {
        return;
    } else {
        this._filtersMap[a].value = [];
    }
    if (this.filteredDataMap) {
        this.filteredDataMap = [];
    } else {
        return;
    }
    var d = this._sortMatrix[this._currentSortKey];
    for (var c = 0; c < this._dataMap.length; c++) {
        var b = d[c];
        this._filterMatrix[b] &= this._filtersMap[a].nmask;
        if (!this._filterMatrix[b]) {
            this.filteredDataMap.push(b);
        }
    }
    this.filteredRecCount = this.filteredDataMap.length;
};
DataSet.prototype.doFilter = function(d) {
    var c = this;
    var a = d.name,
        f = d.value,
        b = d.type;
    if (!f || f.length == 0) {
        this.clearFilter(a);
        return false;
    }
    this.filteredDataMap = [];
    var g = this.addFilter(d);
    if (this.recordCount == 0) {
        return;
    }
    if (!this._currentSortKey || this._currentSortKey == -1) {
        var h = this._dataMap;
    } else {
        var h = this._sortMatrix[this._currentSortKey];
    }
    $jex.console.info("DataSet.prototype.doFilter:", "_filter:", g);
    if (h) {
        $jex.foreach(h, function(j) {
            if (c.options.filterFunc && c.options.filterFunc[a]) {
                var i = c.options.filterFunc[a](c._data[j], j, g);
            } else {
                var i = c._data[j][a];
            }
            if (c._checkFilter(c._filtersMap[a], i)) {
                c._filterMatrix[j] &= c._filtersMap[a].nmask;
            } else {
                c._filterMatrix[j] |= c._filtersMap[a].mask;
            }
            if (!c._filterMatrix[j]) {
                c.filteredDataMap.push(j);
            }
        });
    }
};
DataSet.prototype._checkFilter = function(c, b) {
    var a = false;
    if (c.value.length == 0) {
        return true;
    }
    switch (c.type) {
        case 4:
            $jex.foreach(c.value, function(f) {
                if (f == b) {
                    a = true;
                    return $jex.$break;
                }
            });
            break;
        case 8:
            var d = b.join();
            $jex.foreach(c.value, function(f) {
                if (d.indexOf(f) >= 0) {
                    a = true;
                    return $jex.$break;
                }
            });
            break;
    }
    $jex.console.info("DataSet.prototype._checkFilter", "_filter:", c, "_value:", b, "result:", a);
    return a;
};
DataSet.prototype._gotSortValue = function(d, b, c) {
    var a = d[b][c];
    if (typeof a == "function") {
        return a.call(d[b]);
    } else {
        if (a) {
            return a;
        } else {
            if (this.options.sortFunc && this.options.sortFunc[c]) {
                return this.options.sortFunc[c](d[b], b, c);
            } else {
                $jex.console.error("DataSet,sort,gotSortValue:", "dataSource[key]:", d[b], "key:", b, "indexStr:", c);
                return 0;
            }
        }
    }
};
DataSet.prototype.sort = function(b) {
    var c = b || this._defaultSort;
    this._currentSortArray = c;
    var a = this._getSortKey(c);
    this._currentSortKey = a;
    $jex.console.info("DataSet.prototype.sort: _sortDef:", b, ", _sortKey:", a, ", _currentSortKey:", this._currentSortKey);
};
DataSet.prototype._getSortKey = function(b) {
    var a = [];
    $jex.foreach(b, function(d, c) {
        a.push([d[0], d[1] ? "1" : "0"].join("-"));
    });
    return a.join("|");
};
DataSet.prototype.pageSize = function(a) {
    if (!a) {
        return this._pageSize;
    } else {
        this._pageSize = a;
        this.currentPage = 0;
        this._refreshDisplay();
    }
};
DataSet.prototype.pageIndex = function() {
    return this.currentPage;
};
DataSet.prototype.pageCount = function() {
    return this._maxPage;
};
DataSet.prototype._refreshDisplay = function(f) {
    if (f == null) {
        var f = this.currentPage;
    } else {
        this.currentPage = f;
    }
    var g = (this.filteredDataMap.length) / this._pageSize;
    var a = Math.floor(g);
    this._maxPage = a + ((g - a == 0) ? 0 : 1);
    if (this._maxPage < 0) {
        this._maxPage = 0;
    }
    if (this.currentPage > this._maxPage) {
        this.currentPage = this._maxPage;
    }
    var b = this.filteredDataMap.slice();
    $jex.event.trigger(this, "refreshCurrentPage", b, this._data, this.currentPage, this._pageSize);
    var h = [];
    for (var d = this.currentPage * this._pageSize; d < Math.min((this.currentPage + 1) * this._pageSize, b.length); d++) {
        var c = b[d];
        h.push(this._data[c]);
        this.currentPageDataMap[c] = 1;
    }
    this._currentPageData = h;
    $jex.console.info("DataSet.prototype._refreshDisplay:", "_page:", f, "this.currentPage:", this.currentPage, "this._maxPage:", this._maxPage);
};
DataSet.prototype.setPageIndex = function(a) {
    this.currentPage = a;
};
DataSet.prototype.gotoPage = function(a) {
    a = parseInt(a, 10);
    if (a >= 0) {
        this._refreshDisplay(a);
    } else {
        if (a == -1) {
            this._refreshDisplay(this.currentPage - 1);
        } else {
            if (a == -2) {
                this._refreshDisplay(this.currentPage + 1);
            }
        }
    }
};
DataSet.prototype.currentPageData = function() {
    return this._currentPageData;
};
DataSet.prototype.refreshPage = function() {
    this._refreshDisplay();
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
    $jex.console.end("DataSet.prototype.refresh");
};
DataSet.prototype.getRecordCount = function() {
    return this._dataMap.length;
};
DataSet.prototype.hasItem = function(a) {
    return this._data[a];
};

function XControl(c) {
    this._type = "XControl";
    this._setting = c || {};
    this._onInit_funcArr = [];
    XControl.superclass.constructor.call(this, this._setting);
    var f = null;
    this.dataSource = function(g) {
        if (g == null) {
            return f;
        } else {
            f = g;
        }
    };
    var b = this._setting;
    if (b.handler) {
        for (var a in b.handler) {
            this[a] = b.handler[a];
        }
    }
    if (b.on) {
        for (var d in b.on) {
            $jex.event.binding(this, d, b.on[d]);
        }
    }
}
try {
    $jex.extendClass(XControl, UIObject);
    XControl.prototype.update = $jex.VOIDFUNC;
} catch (e) {}
XControl.prototype.updateSource = function(a) {
    if (a) {
        this.dataSource(a);
    }
    this.update(this.dataSource());
};
XControl.prototype.initialize = function() {
    for (var a = 0; a < this._onInit_funcArr.length; a++) {
        this._onInit_funcArr[a].call(this);
    }
    this._onInit_funcArr = [];
};
XControl.prototype.elem = function() {
    return this._setting.elemId ? $jex.$(this._setting.elemId) : null;
};
XControl.prototype.onInit = function(a) {
    if (typeof a == "function") {
        this._onInit_funcArr.push(a);
    }
};
XControl.prototype.render = function(a) {
    var b = a || this.elem();
    if (!b) {
        $jex.console.info("[XControl]没有可供生成HTML的容器", this);
        return;
    }
    this.write(b);
};
XControl.prototype.show = function() {};
XControl.prototype.hide = function() {};
XControl.prototype.find = XControl.prototype.getDomNode;

function XSelect(a) {
    XSelect.superclass.constructor.call(this, a);
    this._type = "XSelect";
    this.selectedItem = null;
    this._currOpt = null;
    this._dataSource = [];
    this.dataSource = null;
}
$jex.extendClass(XSelect, XControl);
$jex.register("XSelect", XSelect);
XSelect.prototype.initList = function(d) {
    this.find("curr").innerHTML = "";
    this.find("ulList").innerHTML = "";
    this.dataSource = d;
    this._dataSource = [];
    var c = this;
    var h = 0;
    var b = 0;
    var a = this._items_buffer = new UIObject();
    $jex.console.info("add items , ", d);
    $jex.foreach(d, function(l, i, k) {
        var j = c.createOptionItem(l, i, k);
        c._addNewItem(j, i);
        if (j.selected) {
            h = i;
        }
        b++;
    });
    a.write(this.find("ulList"));
    var c = this;
    for (var g = 0; g < b; g++) {
        var f = a.getDomNode("item" + g);
        f.index = g;
        f.dataSource = this._dataSource[g];
        $jex.event.binding(f, "mouseover", function(i) {
            c._chooseItem(this.index);
        });
        $jex.event.binding(f, "mousedown", function(i) {
            c.selectItem(this.index);
            $jex.element.hide(c.find("ulList"));
        });
    }
    this.selectItem(h);
    this.initial = true;
};
XSelect.prototype.val = function(b) {
    if (b) {
        for (var a = 0; a < this._dataSource.length; a++) {
            var c = this._dataSource[a];
            $jex.console.info("XSelect", this, a, "set value", c, b);
            if (c.value == b) {
                this.selectItem(a);
                break;
            }
        }
    } else {
        return this.selectedItem;
    }
};
XSelect.prototype.selectItem = function(b) {
    var a = this.selectedItem;
    var c = this._dataSource[b];
    this.selectedItem = c;
    this._chooseItem(b);
    this.find("curr").innerHTML = c.name;
    $jex.console.info("XSelect selectItem", b, c, this);
    if (this._setting.initFire == true || (this._setting.initFire == false && this.initial == true)) {
        $jex.event.trigger(this, "changeValue", c, a);
    }
};
XSelect.prototype.createOptionItem = function(c, a, b) {
    return c;
};
XSelect.prototype.update = function() {
    this.clear();
    var a = this;
    a.text('<div class="cs">');
    a.text("<div>");
    a.text('		<div class="CSContainer">');
    a.append("			<div ", "btnDown", ' class="CSTitleLine">');
    a.text('				<div class="CSButton"> <img src="http://simg1.qunarzz.com/site/images/new_main/icon_MoreNextDays.gif"/> </div>');
    a.text('				<div class="CSTitleText"> ');
    a.append("					<span ", "curr", " ></span>");
    a.text("				</div>");
    a.text("			</div>");
    a.append("			<ul  ", "ulList", ' class="CSList" style="display:none;">');
    a.text("			</ul>");
    a.text("		</div>");
    a.text("</div>");
    a.text("</div>");
    this.onInit(function() {
        var d = this.find("btnDown");
        var c = this.find("ulList");
        var b = this.elem();
        $jex.event.binding(d, "click", function() {
            $jex.element.toggle(c);
        });
        $jex.event.binding(document, "mousedown", function(f) {
            if (!$jex.event.within(b, f)) {
                $jex.element.hide(c);
            }
        });
        if (this._setting.values) {
            this.initList(this._setting.values);
        }
    });
};
XSelect.prototype._addNewItem = function(c, a) {
    var b = this._items_buffer;
    b.append("<li ", "item" + a, ' class="CSOption" ');
    b.text(' title="', c.name, '">', c.name, "</li>");
    this._dataSource.push(c);
};
XSelect.prototype._chooseItem = function(a) {
    var b = this._items_buffer;
    var c = b.getDomNode("item" + a);
    if (this._currOpt) {
        $jex.removeClassName(this._currOpt, "onhover");
    }
    $jex.addClassName(c, "onhover");
    this._currOpt = c;
};
(function(d) {
    if (typeof d.QNR === "undefined") {
        d.QNR = {};
    }
    var b = d.location.hostname,
        a = d.document;
    QNR.crossDomainPost = function(i, l, p, j) {
        if (!i) {
            return;
        }
        j = j || {};
        l = l || {};
        var q = j.timeout || 0,
            h = "crossDomainPost" + new Date().getTime(),
            k = false;
        var g = function() {
            if (k) {
                return;
            }
            if (j.ontimeout) {
                j.ontimeout(i, l, p, h);
            }
            o();
        };
        var s = function(u) {
            if (k) {
                return;
            }
            if (j.onsuccess) {
                j.onsuccess(u);
            }
            o();
        };
        var o = function() {
            var u = a.getElementById(h);
            u.parentNode.removeChild(u);
            k = true;
            d[h] = null;
        };
        d[h] = s;
        var n = c(i, p, l, h, h),
            m = a.createElement("div");
        m.style.display = "none";
        m.id = h;
        m.innerHTML = n;
        a.body.appendChild(m);
        var t = a.getElementById("form" + h);
        if (/MSIE/i.test(navigator.appVersion)) {
            a.getElementById("ifr" + h).src = 'javascript:\'<script>window.onload=function(){document.write(\\\'<script>document.domain=\\"qunar.com\\";parent.document.getElementById("form' + h + "\").submit();<\\\\/script>\\');document.close();};<\/script>'";
        } else {
            t.submit();
        }
        if (q) {
            setTimeout(g, q);
        }
    };

    function c(i, o, m, q, g) {
        var j = [];
        var n = f(i, o, q, g),
            h = "ifr" + g,
            p = "form" + g;
        j.push('<form id="' + p + '" target="' + h + '" action="' + n + '" method="POST">');
        for (var l in m) {
            if (m.hasOwnProperty(l)) {
                j.push('<input type="text" name="' + l + '" value="' + m[l] + '" />');
            }
        }
        j.push('<input id="hostname" name="" value="' + b + '" />');
        j.push('<input id="proxypath" name="" value="' + o + '" />');
        j.push('<input id="crosscall" name="" value="' + q + '" />');
        j.push('<input id="frameid" name="frameid" value="' + g + '" /></form>');
        j.push('<iframe name="' + h + '" id="' + h + '" src="about:blank"></iframe>');
        return j.join("");
    }

    function f(l, j, k, n) {
        var m = b,
            i = l.indexOf("#"),
            g = [l];
        var h = i < 0 ? "#" : l.substr(i);
        g[g.length] = h;
        if (h.replace(/#/g, "").length) {
            g.push("&");
        }
        g[g.length] = "crosspath=" + encodeURIComponent("http://" + m + "/" + j);
        g[g.length] = "&";
        g[g.length] = "crosscall=" + encodeURIComponent(k);
        g[g.length] = "&";
        g[g.length] = "frameid=" + n;
        return g.join("");
    }
})(this);

function ScriptRequest(a) {
    if (a.funcName) {
        this.funcName = a.funcName;
    }
    this.callbackName = a.callbackName || "__jscallback";
    this.doc = a.doc || document;
    this.win = $jex.getDocumentWindow(this.doc);
    if (a.onerror) {
        $jex.event.add(this, "error", a.onerror);
    }
    if (a.ontimeout) {
        $jex.event.add(this, "timeout", a.ontimeout);
    }
    if (a.oncancel) {
        $jex.event.add(this, "cancel", a.oncancel);
    }
    if (a.oncomplete) {
        $jex.event.add(this, "complete", a.oncomplete);
    }
}
ScriptRequest.loadScript = function(b, c) {
    c = c || document;
    var a = c.createElement("script");
    a.type = "text/javascript";
    a.src = b;
    c.getElementsByTagName("head")[0].appendChild(a);
    return a;
};
ScriptRequest.prototype.send = function(b, c) {
    var g = this.callID = this.funcName ? this.funcName : "XQScript_" + $jex.globalID();
    if (b.indexOf("?") == -1) {
        b = b + "?";
    }
    b += "&" + this.callbackName + "=" + g;
    var a = this;
    var f = this.win;
    var d;
    f[g] = function() {
        if (d) {
            window.clearTimeout(d);
            d = null;
        }
        a.release();
        f[g] = null;
        $jex.event.triggerParam(a, "complete", $jex.array.toArray(arguments));
    };
    if (c && c > 0) {
        d = window.setTimeout(function() {
            a.release();
            $jex.event.trigger(a, "timeout");
        }, c);
    }
    this.searchPort = ScriptRequest.loadScript(b, this.doc);
};
ScriptRequest.prototype.release = function() {
    if (this.searchPort) {
        $jex.removeElement(this.searchPort);
        this.searchPort = null;
        this.win[this.callID] = $jex.VOIDFUNC;
        return true;
    }
    return false;
};
ScriptRequest.prototype.cancel = function() {
    if (this.release()) {
        $jex.event.trigger(this, "cancel");
    }
};
var ConfigManager = new(function() {
    var a = {};
    this.setConfig = function(b) {
        $jex.merge(a, b);
    };
    this.getConfig = function() {
        var b = a;
        var f = [];
        for (var d = 0; d < arguments.length; d++) {
            var c = arguments[d];
            f.push(c);
            if (b[c] == null) {
                $jex.console.warn("[ConfigManager][找不到配置]:", f.join("."));
                return null;
            } else {
                b = b[c];
            }
        }
        return b;
    };
    return this;
})();
var PriceUtil = {
    getOneWayDiscount: function(a) {
        var b = PriceUtil.getDiscount(a);
        return b.replace(/([\d.]+)/, '<span class="f_tha">$1</span>');
    },
    getDiscount: function(a) {
        if (a <= 0) {
            return "";
        }
        if (a > 9.9) {
            if (a > 10) {
                return "";
            } else {
                return "全价";
            }
        } else {
            if (a.toString().length == 1) {
                return a + ".0折";
            } else {
                return a + "折";
            }
        }
    },
    getTransferDiscount: function(a) {
        if (a <= 0) {
            return "";
        }
        if (a > 9.9) {
            return "";
        } else {
            if (a.toString().length == 1) {
                return a + ".0折";
            } else {
                return a + "折";
            }
        }
    }
};
var FlightUtil = {
    codePatch: function(d) {
        var b = 1;
        var f = "";
        for (var a = 0; a < d.length; a++) {
            if (d.charAt(a) == "/") {
                if (b % 2 == 0) {
                    f += "/ ";
                    b++;
                } else {
                    f += "/";
                    b++;
                }
            } else {
                f += d.charAt(a);
            }
        }
        return f;
    },
    catAdtext: function(a, b) {
        if (!b) {
            b = 19;
        }
        if (!a) {
            return "";
        }
        if (a.length > b) {
            return a.substr(0, b) + "...";
        } else {
            return a;
        }
    },
    catText: function(g, b) {
        var f = g.replace(/[^x00-xff]/g, "aa");
        if (f.length > 2 * b) {
            var a = 0;
            for (var d = 0; d < b; d++) {
                var c = g.charAt(d);
                if (/[^x00-xff]/.test(c)) {
                    a++;
                } else {
                    a += 2;
                }
                if (a >= 2 * b) {
                    break;
                }
            }
            return g.substr(0, a) + "...";
        } else {
            return g;
        }
    },
    starClass: function(a) {
        if (a == null || (typeof a != "number" && !/^(\d+.\d+|\d+)$/.test(a))) {
            return "";
        }
        var a = parseFloat(a);
        if (a > 3) {
            return "star30";
        }
        switch (a) {
            case 0:
                return "star00";
            case 0.5:
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
                return "star00";
        }
    },
    getGTITLE: function(b, a, h, g) {
        if (b == null || a == null) {
            return "";
        }
        if (b >= 100) {
            var f = "AD_";
        } else {
            var f = "nonAD_";
        }
        var c = ConfigManager.getConfig("rank", "GTITLE", f + "G" + a);
        if (!c) {
            return "";
        }
        var d = 0;
        if (h <= 5 && h >= 4) {
            d = 0;
        } else {
            if (h < 3.9 && h >= 3) {
                d = 1;
            } else {
                if (h < 2.9 && h >= 2) {
                    d = 2;
                } else {
                    if (h < 1.9 && h >= 0) {
                        d = 3;
                    }
                }
            }
        }
        if (c[d]) {
            return c[d];
        } else {
            return "";
        }
    },
    timeRange: function(c) {
        var a = c.substr(0, 2);
        var b = parseInt(a, 10);
        if (b >= 6 && b < 12) {
            return 0;
        }
        if (b == 12) {
            return 1;
        }
        if (b > 12 && b <= 17) {
            return 2;
        }
        return 3;
    },
    duration: function(c) {
        var a = Math.floor(c / 60);
        var d = c % 60;
        var b = a ? a + "小时" : "";
        b += d ? d + "分" : "";
        if (b) {
            b = "约" + b;
        }
        return b;
    },
    interDuration: function(c) {
        if (c == Number.MAX_VALUE) {
            return "";
        }
        var a = Math.floor(c / 60);
        var d = c % 60;
        if (d >= 24 && d <= 36) {
            a += 0.5;
        } else {
            if (d > 36) {
                a += 1;
            }
        }
        var b = a ? a + "小时" : "";
        if (b) {
            b = "约" + b;
        }
        return b;
    }
};
(function(f) {
    var g = (function() {
            var h = 1;
            return function() {
                return h++;
            };
        })(),
        c = (function() {
            var h = "local_storage";
            return {
                _store: null,
                _getStore: function() {
                    if (!this._store) {
                        try {
                            this._store = document.createElement("input");
                            this._store.type = "hidden";
                            this._store.addBehavior("#default#userData");
                            document.body.appendChild(this._store);
                        } catch (l) {
                            var k = [];
                            for (var j in l) {
                                k.push(j + ": " + l[j]);
                            }
                            document.title = (k.join("\n"));
                            return false;
                        }
                    }
                    return this._store;
                },
                get: function(j) {
                    var i = this._getStore();
                    if (!i) {
                        return false;
                    }
                    i.load(h);
                    return i.getAttribute(j);
                },
                add: function(j) {
                    var i = this._getStore();
                    if (!i) {
                        return false;
                    }
                    i.load(h);
                    i.setAttribute(j.name, j.value);
                    i.save(h);
                },
                remove: function(j) {
                    var i = this._getStore();
                    if (!i) {
                        return false;
                    }
                    i.load(h);
                    i.removeAttribute(j);
                    i.save(h);
                },
                clear: function() {
                    var l = this._getStore();
                    if (!l) {
                        return false;
                    }
                    var n = l.XMLDocument;
                    var k = n.selectSingleNode("ROOTSTUB");
                    for (var m = 0; m < k.attributes.length; ++m) {
                        var j = k.attributes[m];
                        l.removeAttribute(j.baseName);
                    }
                    l.save(h);
                },
                addListItem: function(i, k, j) {
                    j = j || {};
                    var l = this.getList(i, true, j);
                    l[j.isFirst ? "unshift" : "push"](k);
                    this.add({
                        name: i,
                        value: JSON.stringify(l)
                    });
                    return true;
                },
                removeListItem: function(m, q, k) {
                    k = k || {};
                    var o = JSON.parse(this.get(m) || "[]"),
                        l, n, s, p = [],
                        j = false;
                    if (o && o.length && o instanceof Array) {
                        for (l = 0, n = o.length; l < n; l++) {
                            s = o[l];
                            if (s.uniqueKey === q) {
                                j = true;
                                continue;
                            }
                            if (!(s.expires && s.expires < new Date().getTime())) {
                                if (!k.isValidItem || k.isValidItem(s)) {
                                    p.push(s);
                                }
                            }
                        }
                        this.add({
                            name: m,
                            value: JSON.stringify(p)
                        });
                    }
                    return j;
                },
                removeList: function(i) {
                    this.remove(i);
                },
                getList: function(i, k, j) {
                    if (k) {
                        return this.refreshList(i, j);
                    }
                    return JSON.parse(this.get(i) || "[]");
                },
                refreshList: function(k, n) {
                    var p = JSON.parse(this.get(k) || "[]"),
                        m, j, o, l = [];
                    if (p && p.length && p instanceof Array) {
                        n = n || {};
                        n.data = n.data || {};
                        for (m = 0, j = p.length; m < j; m++) {
                            o = p[m];
                            if (!(o.expires && o.expires < new Date().getTime())) {
                                if (!n.isValidItem || n.isValidItem(o)) {
                                    l.push($jex.merge(o, n.data[o.uniqueKey] || {}));
                                }
                            }
                        }
                        this.add({
                            name: k,
                            value: JSON.stringify(l)
                        });
                    }
                    return l;
                }
            };
        })(),
        a = {
            add: function(h) {
                if (h.name) {
                    var i = h.name + "=" + h.value;
                    if (h.expire) {
                        i += ";expires=" + new Date(new Date().getTime() + h.expire).toGMTString();
                    }
                    if (h.domain) {
                        i += ";domain=" + h.domain;
                    }
                    if (h.path) {
                        i += ";path=" + h.path;
                    }
                    document.cookie = i;
                }
            },
            remove: function(h, i) {
                if (h) {
                    var j = h + "=1;expires=" + new Date(new Date().getTime() - 86400000).toGMTString();
                    i = i || {};
                    j += ";path=" + (i.path || "/");
                    document.cookie = j;
                    return true;
                }
                return false;
            },
            get: function(h) {
                var k = document.cookie.split(/;\s*/),
                    j, l;
                for (j = 0; j < k.length; j++) {
                    l = k[j].split("=");
                    if (l[0] == h) {
                        return l[1];
                    }
                }
                return undefined;
            },
            getuuidMap: function(h) {
                var i = this.get(h + "Map");
                return i ? JSON.parse(i) : null;
            },
            addListItem: function(h, l, j) {
                j = j || {};
                var n = this.getuuidMap(h),
                    k;
                if (!n) {
                    n = ["0"];
                    this.add({
                        name: h + "Map",
                        value: JSON.stringify(n),
                        path: j.path || "/"
                    });
                }
                if (j.isFirst) {
                    k = n[0];
                } else {
                    k = n[n.length - 1];
                }
                var m = this.getList(h, true, k),
                    i = m.slice(0);
                m[j.isFirst ? "unshift" : "push"](l);
                this.add({
                    name: h + k,
                    value: JSON.stringify(m),
                    expires: j.expires || 30 * 86400000,
                    path: j.path || "/"
                });
                if (this.getList(h, false, k).length === m.length) {
                    return true;
                } else {
                    this.add({
                        name: h + k,
                        value: JSON.stringify(i),
                        expires: j.expires || 30 * 86400000,
                        path: j.path || "/"
                    });
                    n[j.isFirst ? "unshift" : "push"](g());
                    this.add({
                        name: h + "Map",
                        value: JSON.stringify(n),
                        path: j.path || "/"
                    });
                    return this.addListItem(h, l, j);
                }
            },
            removeListItem: function(i, h, m) {
                var k = this,
                    l = false,
                    j = $jex.$break;
                $jex.$break = false;
                $jex.foreach(k.getuuidMap(i) || [], function(q, p) {
                    var t = JSON.parse(k.get(i + q) || "[]"),
                        p, n, s, o = [];
                    if (t && t.length && t instanceof Array) {
                        for (p = 0, n = t.length; p < n; p++) {
                            s = t[p];
                            if (s.uniqueKey === h) {
                                l = true;
                                continue;
                            }
                            if (!(s.expires && s.expires < new Date().getTime())) {
                                o.push(s);
                            }
                        }
                        m = m || {};
                        k.add({
                            name: i + q,
                            value: JSON.stringify(o),
                            expires: m.expires || 30 * 86400000,
                            path: m.path || "/"
                        });
                    }
                    if (l) {
                        return $jex.$break;
                    }
                });
                $jex.$break = j;
                return l;
            },
            removeList: function(h) {
                var i = this;
                $jex.each(this.getuuidMap(h) || [], function(k, j) {
                    i.remove(h + k);
                });
                this.remove(h + "Map");
            },
            getList: function(h, l, k) {
                var i = this;
                if (!k) {
                    var j = [];
                    $jex.each(this.getuuidMap(h) || [], function(n, m) {
                        j = j.concat(i.getList(h, l, n));
                    });
                    return j;
                } else {
                    if (l) {
                        return this.refreshList(h, {}, k);
                    }
                    return JSON.parse(this.get(h + k) || "[]");
                }
            },
            refreshList: function(l, j, h) {
                var q = this,
                    o = [];
                if (h) {
                    var n = JSON.parse(this.get(l + h) || "[]"),
                        k, m, p;
                    if (n && n.length && n instanceof Array) {
                        j = j || {};
                        j.data = j.data || {};
                        for (k = 0, m = n.length; k < m; k++) {
                            p = n[k];
                            if (!(p.expires && p.expires < new Date().getTime())) {
                                o.push($jex.merge(p, j.data[p.uniqueKey] || {}));
                            }
                        }
                        this.add({
                            name: l + h,
                            value: JSON.stringify(o),
                            expires: j.expires || 30 * 86400000,
                            path: j.path || "/"
                        });
                    }
                } else {
                    $jex.each(this.getuuidMap(l) || [], function(t, s) {
                        o = o.concat(q.refreshList(l, j, t));
                    });
                }
                return o;
            }
        },
        d = {
            add: function(h) {
                localStorage[h.name] = h.value;
            },
            get: function(h) {
                return localStorage[h];
            },
            remove: function(h) {
                delete localStorage[h];
            },
            addListItem: function(h, j, i) {
                i = i || {};
                var k = this.getList(h, true, i);
                k[i.isFirst ? "unshift" : "push"](j);
                this.add({
                    name: h,
                    value: JSON.stringify(k)
                });
                return true;
            },
            removeListItem: function(l, p, j) {
                j = j || {};
                var n = JSON.parse(this.get(l) || "[]"),
                    k, m, q, o = [],
                    h = false;
                if (n && n.length && n instanceof Array) {
                    for (k = 0, m = n.length; k < m; k++) {
                        q = n[k];
                        if (q.uniqueKey === p) {
                            h = true;
                            continue;
                        }
                        if (!(q.expires && q.expires < new Date().getTime())) {
                            if (!j.isValidItem || j.isValidItem(q)) {
                                o.push(q);
                            }
                        }
                    }
                    this.add({
                        name: l,
                        value: JSON.stringify(o)
                    });
                }
                return h;
            },
            removeList: function(h) {
                this.remove(h);
            },
            getList: function(h, j, i) {
                if (j) {
                    return this.refreshList(h, i);
                }
                return JSON.parse(this.get(h) || "[]");
            },
            refreshList: function(j, m) {
                var o = JSON.parse(this.get(j) || "[]"),
                    l, h, n, k = [];
                if (o && o.length && o instanceof Array) {
                    m = m || {};
                    m.data = m.data || {};
                    for (l = 0, h = o.length; l < h; l++) {
                        n = o[l];
                        if (!(n.expires && n.expires < new Date().getTime())) {
                            if (!m.isValidItem || m.isValidItem(n)) {
                                k.push($jex.merge(n, m.data[n.uniqueKey] || {}));
                            }
                        }
                    }
                    this.add({
                        name: j,
                        value: JSON.stringify(k)
                    });
                }
                return k;
            }
        },
        b = f.localStorage ? d : c;
    f.CookieUtil = a;
    f.StorageUtil = b;
})(window);
var QunarDate = $jex.exec(function() {
    var k = {
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
    var h = ["今天", "明天", "后天"];
    var c = 24 * 60 * 60 * 1000;
    var a = ["日", "一", "二", "三", "四", "五", "六"];
    var d = {
        week: "周",
        day: "天",
        before: "前",
        after: "后"
    };
    var g = {
        SECOND: "秒",
        MILLISECOND: "毫秒",
        MINUTE: "分钟",
        HOUR: "小时",
        DAY: "天",
        YEAR: "年"
    };
    var f = null;
    var b = null;
    var j = ["1周之内", "1个月内", "3个月内", "半年内", "1年", "圣诞", "元旦", "春节", "寒假", "清明", "五一", "暑假", "端午", "中秋", "国庆"];
    var i = ["+1周", "+2周", "1个月内", "3个月内", "1年"];
    var l = {
        "1周之内": {
            valid: true,
            value: "1周之内",
            range: 7
        },
        "2周之内": {
            valid: true,
            value: "2周之内",
            range: 14
        },
        "+1周": {
            valid: false,
            value: "2周之内",
            range: 14
        },
        "+2周": {
            valid: false,
            value: "3周之内",
            range: 21
        },
        "3周之内": {
            valid: true,
            value: "3周之内",
            range: 21
        },
        "1个月内": {
            valid: true,
            value: "1个月内",
            range: 30
        },
        "3个月内": {
            valid: true,
            value: "3个月内",
            range: 90
        },
        "半年内": {
            valid: true,
            value: "半年内",
            range: 180
        },
        "1年": {
            valid: true,
            value: "1年",
            range: 360
        },
        "国庆": {
            valid: true,
            value: "国庆",
            range: "13",
            start: "2015-9-27",
            end: "2015-10-10"
        },
        "圣诞": {
            valid: true,
            value: "圣诞",
            range: "6",
            start: "2014-12-22",
            end: "2014-12-28"
        },
        "元旦": {
            valid: true,
            value: "元旦",
            range: "6",
            start: "2014-12-29",
            end: "2015-01-04"
        },
        "春节": {
            valid: true,
            value: "春节",
            range: "13",
            start: "2015-02-15",
            end: "2015-02-28"
        },
        "寒假": {
            valid: true,
            value: "寒假",
            range: "60",
            start: "2015-01-01",
            end: "2015-02-28"
        },
        "清明": {
            valid: true,
            value: "清明",
            range: "6",
            start: "2015-04-02",
            end: "2015-04-08"
        },
        "五一": {
            valid: true,
            value: "五一",
            range: "6",
            start: "2015-04-28",
            end: "2015-05-04"
        },
        "暑假": {
            valid: true,
            value: "暑假",
            range: "60",
            start: "2015-06-01",
            end: "2015-08-01"
        },
        "端午": {
            valid: true,
            value: "端午",
            range: "6",
            start: "2015-06-18",
            end: "2015-06-24"
        },
        "中秋": {
            valid: true,
            value: "中秋",
            range: "6",
            start: "2015-09-24",
            end: "2015-09-30"
        }
    };
    return {
        getFuzzyDate: function(o) {
            var n = this.today();
            var m = l[o];
            if (m) {
                if (m.start && m.end) {
                    m.start = m.start;
                    m.end = m.end;
                } else {
                    m.start = this.format(this.plus(n, 1));
                    m.end = this.format(this.plus(n, m.range));
                }
            }
            return m;
        },
        getFuzzyDateText0: function() {
            return j;
        },
        getFuzzyDateText1: function() {
            return i;
        },
        getTimeRange: function(n) {
            var m = parseInt(n.replace(/(\d+):\d+/i, "$1"), 10);
            if (m >= 6 && m < 12) {
                return 0;
            }
            if (m == 12) {
                return 1;
            }
            if (m > 12 && m <= 18) {
                return 2;
            }
            return 3;
        },
        isHoliday: function(m) {
            return !!k[m];
        },
        parseTimeToNL_et: function(m) {
            if (m >= c) {
                m = c;
            }
            return this.parseTimeToNL(m);
        },
        parseTimeToNL: function(s) {
            var q = s % 1000;
            var p = (s - q) % 60000;
            var n = (s - p * 1000 - q) % 3600000;
            var t = (s - n * 60000 - p * 1000 - q) % (24 * 3600000);
            var m = (s - t * 3600000 - n * 60000 - p * 1000 - q) % (24 * 3600000);
            var o = "";
            if (s < 1000) {
                o = 1 + g.SECOND;
            } else {
                if (s < 60000) {
                    o = parseInt(s / 1000) + g.SECOND;
                } else {
                    if (s < 3600000) {
                        o = parseInt(s / 60000) + g.MINUTE;
                    } else {
                        if (s < (24 * 3600000)) {
                            o = parseInt(s / 3600000) + g.HOUR;
                        } else {
                            if (s < (365 * 24 * 3600000)) {
                                o = parseInt(s / (24 * 3600000)) + g.DAY;
                            } else {
                                o = parseInt(s / (365 * 24 * 3600000)) + g.YEAR;
                            }
                        }
                    }
                }
            }
            return o;
        },
        plus: function(m, n) {
            return new Date(m.getTime() + n * c);
        },
        getMinute: function(p) {
            var q = p.split(":");
            var o = parseInt(q[0], 10);
            var n = parseInt(q[1], 10);
            return o * 60 + n;
        },
        today: function() {
            if (f) {
                return f;
            }
            var m = window.SERVER_TIME || new Date();
            return f = new Date(m.getFullYear(), m.getMonth(), m.getDate());
        },
        parse: function(n) {
            var m = n.split("-");
            return new Date(m[0], m[1] - 1, m[2]);
        },
        format: function(m) {
            if (typeof m == "number") {
                m = new Date(m);
            }
            return m.getFullYear() + "-" + this.convert2digit(m.getMonth() + 1) + "-" + this.convert2digit(m.getDate());
        },
        convert2digit: function(m) {
            return m < 10 ? "0" + m : m;
        },
        compareDate: function(n, m) {
            return n.getTime() - m.getTime();
        },
        getFirstDaysOfMonth: function(m) {
            return new Date(m.getFullYear(), m.getMonth(), 1);
        },
        getLastDaysOfMonth: function(m) {
            return new Date(m.getFullYear(), m.getMonth() + 1, 0);
        },
        getHolidayName: function(m) {
            return k[m]["holidayName"];
        },
        showIcon: function(m) {
            return !k[m]["nodatepickerico"];
        },
        getDateTip: function(m) {
            var n = this.parse(m);
            var o = (n.getTime() - this.today().getTime()) / 1000 / 3600 / 24;
            var p = "";
            if (o < 3) {
                p = h[o];
                if (this.isHoliday(m)) {
                    p = k[m]["holidayName"];
                }
            } else {
                this.initDataTable();
                if (b[m]) {
                    p = b[m].holidayName;
                }
            }
            if (p == "") {
                p = d.week + a[n.getDay()];
            }
            return p;
        },
        seconds2days: function(m) {
            var n = 60 * 1000 * 60 * 24;
            return m / n;
        },
        getDatesOffset: function(u, m) {
            var q = {};
            var n = this.compareDate(this.parse(m), this.parse(u));
            var t = this.seconds2days(n);
            var s = this.parse(u);
            for (var o = 1; o < t; o++) {
                s = QunarDate.plus(s, 1);
                var p = this.format(s);
                q[p] = s;
            }
            return q;
        },
        initDataTable: function() {
            if (b != null) {
                return b;
            }
            b = {};
            for (var x in k) {
                var n = x;
                var s = k[x];
                b[x] = s;
                var q = "";
                var t = "";
                if (s.beforeTime > 0) {
                    for (var o = 1; o <= s.beforeTime; o++) {
                        var u = {};
                        var y = new Date(this.parse(n).getTime() - o * 24 * 3600 * 1000);
                        var p = this.format(y);
                        u.holidayName = s.holidayName + d.before + o + d.day;
                        u.dayindex = s.dayindex;
                        if (!b[p]) {
                            b[p] = u;
                        } else {
                            if ((s.dayindex > b[p].dayindex) && b[p].beforeTime == null) {
                                b[p] = u;
                            }
                        }
                    }
                }
                if (s.afterTime > 0) {
                    for (var o = 1; o <= s.afterTime; o++) {
                        var u = {};
                        var w = new Date(this.parse(n).getTime() + o * 24 * 3600 * 1000);
                        var m = this.format(w);
                        u.holidayName = s.holidayName + d.after + o + d.day;
                        u.dayindex = s.dayindex;
                        if (!b[m]) {
                            b[m] = u;
                        } else {
                            if ((s.dayindex > b[m].dayindex) && b[this.format(new Date(y))].afterTime == null) {
                                b[m] = u;
                            }
                        }
                    }
                }
            }
        }
    };
});

function DateChecker(a, g, f) {
    a = a || 209;
    g = g || 2;
    f = f || 3;
    var b = QunarDate.today();
    var d = new Date(b.getTime() + a * 24 * 3600000);
    var c = new Date(b.getTime() + g * 24 * 3600000);
    this.date1 = c;
    this.setDate1 = function(h) {
        return this.date1 = this.checkDate1(h).recommendDate;
    };
    this.getDate1 = function() {
        return QunarDate.format(this.date1);
    };
    this.date2 = new Date(c.getTime() + f * 24 * 3600000);
    this.setDate2 = function(i, h) {
        return this.date2 = this.checkDate2(i, QunarDate.format(this.date1), h).recommendDate;
    };
    this.getDate2 = function() {
        return QunarDate.format(this.date2);
    };
    this.checkDate1 = function(h) {
        return this.checkDate(h, b, d, c);
    };
    this.checkDate2 = function(m, k, i) {
        var h = d,
            j;
        if (i) {
            h = QunarDate.parse(i);
        }
        var l = new Date(this.date1.getTime() + f * 24 * 3600000);
        if (l.getTime() > h.getTime()) {
            l = h;
        }
        j = this.date1;
        return this.checkDate(m, j, h, l);
    };
    this.setDelay2 = function(h) {
        f = h || f;
    };
    this.checkDate = function(o, l, p, h) {
        var j = null;
        var k = false;
        var i = null;
        var n = "";
        try {
            j = QunarDate.parse(o);
        } catch (m) {
            k = true;
            i = "格式错误";
            n = "日期格式如: " + QunarDate.format(h);
            j = h;
        }
        if (isNaN(j)) {
            k = true;
            i = "格式错误";
            n = "日期格式如: " + QunarDate.format(h);
            j = h;
        } else {
            if (l.getTime() > j.getTime()) {
                k = true;
                i = "超出范围";
                n = "应选择" + QunarDate.format(l) + "至" + QunarDate.format(p) + "之间的日期";
                j = h;
            } else {
                if (j.getTime() > p.getTime()) {
                    k = true;
                    i = "超出范围";
                    n = "应选择" + QunarDate.format(l) + "至" + QunarDate.format(p) + "之间的日期";
                    j = h;
                }
            }
        }
        return {
            error: k,
            recommend: QunarDate.format(j),
            recommendDate: j,
            value: i,
            tip: n
        };
    };
    this.getMin = function() {
        return b;
    };
    this.getMax = function() {
        return d;
    };
    this.resetMax = function(i, j) {
        var k = i || b;
        var h = j || a;
        d = new Date(k.getTime() + h * 24 * 3600000);
    };
    this.setSpan = function(h) {
        a = h;
    };
    this.marks = {};
    this.date2Hide = false;
    this.hideDate2 = function() {
        this.date2Hide = true;
    };
    this.showDate2 = function() {
        this.date2Hide = false;
    };
    this.getTdStyle = function(i, j, h) {
        h = h || d;
        j = j || b;
        var l = i.getTime();
        var k = "";
        if (l == this.date1.getTime()) {
            k += " curr";
        } else {
            if (l == this.date2.getTime() && this.date2Hide == false) {
                k += " curr";
            }
        }
        if (i.getDay() == 0 || i.getDay() == 6) {
            k += " holi";
        }
        if (QunarDate.isHoliday(QunarDate.format(i)) && QunarDate.showIcon(QunarDate.format(i))) {
            k += " holi_sp";
        }
        if (l == b.getTime()) {
            k += " today";
        }
        if (!(j.getTime() <= l && l <= h.getTime())) {
            k += " out";
        }
        return k;
    };
    this.isInter = false;
}

function DateLayer(s, w) {
    this.panel = s;
    var m = this;
    var H = [];
    var M = true;
    if (s.parentNode.parentNode.className.indexOf("toD") > -1) {
        M = false;
    }
    var a;
    var h = {};
    var c = [];
    var G = [];
    var O, y, A, D;
    var b = {};
    var d, i, k, L;

    function j() {
        h = {};
        b = {};
        c.length = 0;
        G.length = 0;
        O = y = A = D = null;
    }

    function u(P) {
        var Q = "/site/track.htm?action=fuzzyDatesFlag|" + P + "|&t=" + Date.parse(new Date());
        new Image().src = Q;
    }

    function E() {
        var P = this.getAttribute("value");
        u(encodeURIComponent(P));
        var R = this.getAttribute("data-pos");
        var Q = QunarDate.parse(P);
        if (Q && (Q.getTime() >= O.getTime()) && (Q.getTime() <= y.getTime())) {
            $jex.event.trigger(m, "selected", [Q, R]);
        } else {
            $jex.event.trigger(m, "fuzzySelected", [P]);
            d = this.getAttribute("start");
            i = this.getAttribute("end");
        }
    }

    function I() {
        if (!k) {
            m.render(QunarDate.parse(this.getAttribute("ym")), O, y, null, D);
        } else {
            m.fuzzyRenderPanel(QunarDate.parse(this.getAttribute("ym")), O, y, null, D);
        }
        if (k) {
            var P = p(i);
            $jex.addClassName(P, "curr");
        }
    }

    function p(P) {
        if (!b[P]) {
            var Q = h[P];
            b[P] = a.getDomNode(Q);
        }
        return b[P];
    }

    function N(S) {
        var T, R, S = S || {};
        for (var Q = 0, P = c.length; Q < P; Q++) {
            R = c[Q];
            if (S[R]) {
                S[R] = 0;
            } else {
                T = p(R);
                $jex.removeClassName(T, "day_sel_area");
            }
        }
    }

    function l(P) {
        c.length = 0;
        $jex.each(P, function(Q, S) {
            c[c.length] = Q;
            if (P[Q]) {
                var R = p(Q);
                $jex.addClassName(R, "day_sel_area");
            }
        });
    }

    function z(Q) {
        var P = p(QunarDate.format(Q));
        $jex.addClassName(P, "curr");
    }

    function n(Q) {
        var P = p(QunarDate.format(Q));
        $jex.removeClassName(P, "curr");
    }
    var q = function(V, Q) {
        var U = $jex.ie ? "mouseenter" : "mouseover";
        var T = $jex.ie ? "mouseleave" : "mouseout";
        var S;
        for (var R = 0, P = G.length; R < P; R++) {
            S = p(G[R]);
            $jex.event.bind(S, U, function() {
                V(this);
                F(this);
                $jex.addClassName(this, "hover");
            });
            $jex.event.bind(S, T, function() {
                Q(this);
                J(this);
                $jex.removeClassName(this, "hover");
            });
            $jex.event.bind(S, "click", E);
            H.push(S);
        }
        if (L) {
            S = p(L);
            $jex.event.bind(S, "click", E);
        }
    };
    var f = function() {
        for (var P = 0; P < 2; P++) {
            var Q = a.getDomNode("a" + P);
            $jex.event.bind(Q, "mousedown", I);
            H.push(Q);
        }
    };
    var t = function() {
        var S = null;
        var R = function(T) {
            clearTimeout(S);
        };
        var P = function(T) {
            N();
            c.length = 0;
            z(w.date1);
        };
        var Q = function(T) {
            clearTimeout(S);
            S = setTimeout(function() {
                P(T);
            }, 150);
        };
        q(R, Q);
    };
    var g = function() {
        var S = null;
        var R = function(V) {
            clearTimeout(S);
            var W = V.getAttribute("value");
            var X = QunarDate.parse(W);
            var Y = w.date1;
            var T = w.date2;
            var U = {};
            if (M) {
                if (QunarDate.compareDate(Y, X) > 0) {
                    U = QunarDate.getDatesOffset(W, QunarDate.format(T));
                } else {
                    if (QunarDate.compareDate(X, T) > 0) {
                        U = {};
                    } else {
                        U = QunarDate.getDatesOffset(W, QunarDate.format(T));
                    }
                }
                n(Y);
                z(T);
            } else {
                U = QunarDate.getDatesOffset(QunarDate.format(Y), W);
                n(T);
                z(Y);
            }
            N(U);
            l(U);
        };
        var P = function() {
            var V = w.date1;
            var T = w.date2;
            var U = QunarDate.getDatesOffset(QunarDate.format(V), QunarDate.format(T));
            z(V);
            z(T);
            N(U);
            l(U);
        };
        var Q = function() {
            clearTimeout(S);
            S = setTimeout(function() {
                P();
            }, 150);
        };
        q(R, Q);
    };
    var F = function(R) {
        var S = R.getAttribute("start"),
            P = R.getAttribute("end"),
            Q = {};
        if (!S || !P) {
            return;
        }
        n(w.date1);
        n(w.date2);
        z(QunarDate.parse(S));
        z(QunarDate.parse(P));
        Q = QunarDate.getDatesOffset(S, P);
        N(Q);
        l(Q);
    };
    var J = function(R) {
        var S = R.getAttribute("start"),
            P = R.getAttribute("end"),
            Q = {};
        if (!S || !P) {
            return;
        }
        n(QunarDate.parse(S));
        n(QunarDate.parse(P));
    };
    var x = function() {
        var S = null;
        var R = function(T) {
            clearTimeout(S);
            if (QunarDate.getFuzzyDate(T.getAttribute("value"))) {
                n(QunarDate.parse(i));
            }
        };
        var P = function() {
            var T = QunarDate.getDatesOffset(d, i);
            N(T);
            l(T);
            z(QunarDate.parse(d));
            z(QunarDate.parse(i));
        };
        var Q = function() {
            clearTimeout(S);
            S = setTimeout(function() {
                P();
            }, 150);
        };
        q(R, Q);
    };
    var o = function() {
        for (var P = 0, Q = H.length; P < Q; P++) {
            $jex.event.clear(H[P]);
        }
        H.length = 0;
    };
    var C = function(Q, T, V, U, W) {
        A = U || 0;
        O = T || w.getMin();
        y = V || w.getMax();
        D = W || {};
        if (k && U !== null) {
            $jex.foreach(D, function(Z, X, Y) {
                if (X === 0) {
                    Q = Z;
                    return;
                }
            });
        }
        var P = 0;
        var S = 0;
        a = new UIObject();
        a.text('<div class="ui-calendar">');
        $jex.array.each([0, 1], function(ac, ad) {
            var ap = new Date(Q.getFullYear(), Q.getMonth() + ac - A, 1);
            var aj = ap.getMonth() + 1;
            var al = QunarDate.convert2digit(aj);
            var ag = ap.getFullYear();
            var aq = new Date(ag, ap.getMonth(), 0);
            var aa = new Date(ag, ap.getMonth(), 1);
            var X = new Date(ag, ap.getMonth() + 1, 1);
            var ae = new Date(ag, aj - 1, 1).getDay() - 1;
            if (ae < 0) {
                ae = 6;
            }
            var ai = new Date(ag, aj, 0).getDate();
            var ab = ad == 0 ? O.getTime() <= aq.getTime() : X.getTime() <= y.getTime();
            a.text('<div class="m-part">');
            a.text("<h3>");
            a.append("<a ", "a" + (S++)).text(' class="', (ad ? "downTd" : "upTd"), '" ym="', (QunarDate.format(ad ? aa : aq)), '" style="', (ab ? "display:block" : "display:none"), '" href="javascript:;"></a>', ag, "年", aj, "月</h3>");
            a.text('<div class="thwrap">');
            a.text('<table cellspacing="0" cellpadding="0" border="0">');
            a.text('<tr class="thead"><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td class="holi">六</td><td class="holi">日</td></tr>');
            a.text("</table>");
            a.text("</div>");
            a.text('<div class="tdwrap">');
            a.text('<table cellspacing="0" cellpadding="0" border="0">');
            var an = 0;
            var ah = /out$/;
            var Y = "";
            for (var ak = 0; ak < 42; ak++) {
                if (ak % 7 == 0) {
                    a.text('<tr class="tdate">');
                }
                if (ak < ae) {
                    a.text('<td class="cnone">&nbsp;</td>');
                } else {
                    if (an < ai) {
                        an++;
                        var ar = an;
                        var ao = QunarDate.convert2digit(an);
                        var af = ag + "-" + al + "-" + ao;
                        var Z = new Date(ag, aj - 1, an);
                        var am = QunarDate.today();
                        if (QunarDate.compareDate(Z, am) === 0) {
                            ar = "今天";
                        }
                        if (QunarDate.isHoliday(af) && QunarDate.showIcon && QunarDate.showIcon(af)) {
                            ar = QunarDate.getHolidayName(af);
                        }
                        h[af] = P;
                        Y = w.getTdStyle(Z, O, y);
                        if (!ah.test(Y)) {
                            G[G.length] = af;
                        }
                        if (!!D[af]) {
                            c[c.length] = af;
                            a.append("<td ", P++).text(' value="', af, '" data-pos="', ac, '" class=" day_sel_area  ', Y, '" >', ar, "</td>");
                        } else {
                            a.append("<td ", P++).text(' value="', af, '" data-pos="', ac, '" class="', Y, '" >', ar, "</td>");
                        }
                    } else {
                        a.text('<td class="cnone">&nbsp;</td>');
                    }
                }
                if (ak % 7 == 6) {
                    a.text("</tr>");
                }
            }
            a.text("</table></div></div>");
        });
        if (w.isInter) {
            a.text('<div class="m-fuzzy-box">');
            a.text(' <ul class="m-fuzzy-lst clrfix">');
            var R = k == "1周之内" && !M ? QunarDate.getFuzzyDateText1() : QunarDate.getFuzzyDateText0();
            $jex.array.each(R, function(Y, X) {
                var Z = QunarDate.getFuzzyDate(Y);
                if (k == Y) {
                    _class = "hover";
                    L = Y;
                    h[Y] = P;
                } else {
                    G[G.length] = Y;
                    h[Y] = P;
                    _class = "";
                }
                a.append("<li ", P++).text(' value="', Z.value, '" start="', Z.start, '" end="', Z.end, '" class="', _class, '">', Y, "</li>");
            });
            a.text(" </ul>");
            a.text("</div>");
        }
        a.text("</div>");
        a.write(s);
        B();
    };
    var B = function() {
        var P = QunarDate.getFuzzyDateText0().slice(5);
        var Q = 0;
        $jex.array.each(P, function(T, R) {
            var V = QunarDate.getFuzzyDate(T);
            var S = QunarDate.parse(V.start);
            if (QunarDate.today() < S && Q < 5) {
                Q++;
            } else {
                var U = p(T);
                if (U) {
                    U.style.display = "none";
                }
            }
        });
    };
    var K = function() {
        var P = function() {};
        q(P, P);
    };
    this.render = function(Q, R, P, T, S) {
        k = "";
        o();
        j();
        C(Q, R, P, T, S);
        if (w.date2Hide) {
            t();
        } else {
            g();
        }
        f();
    };
    this.fuzzyRenderPanel = function(R, T, P, W, U) {
        var Q = QunarDate.getFuzzyDate(R),
            S, V;
        o();
        j();
        if (!Q) {
            C(R, T, P, W, U);
        } else {
            k = R;
            d = Q.start;
            i = Q.end;
            S = QunarDate.getDatesOffset(d, i);
            w.setDate1(d);
            w.setDate2(i);
            V = M ? 0 : QunarDate.parse(d);
            C(QunarDate.today(), V, 0, 0, S);
            z(QunarDate.parse(i));
        }
        x();
        f();
    };
}
var TraceAnalyzer = function(a) {
    var a = a || {};
    var c = {};
    var b = {};
    this.addParam = function(d, f) {
        c[d] = f;
    };
    this.queryInfo = function(g) {
        for (var f in g) {
            var d = g[f];
            this.addParam(f, d);
        }
        return this;
    };
    this.otherErr = function(d) {
        this.addParam("err", d);
        return this;
    };
    this.__fe = null;
    this.addOpenInfo = function(g, h) {
        for (var f in h) {
            var d = h[f];
            this.addParam(f, d);
        }
        this.addParam("act", "open");
        this.__fe = g;
        return this;
    };
    this.sendOpenInfo = function() {
        if (!c.act || !this.__fe) {
            return;
        }
        var g = this.__fe;
        if (g.firstTrip) {
            var d = g.firstTrip().wrappers().size() + "_" + g.secondTrip().wrappers().size();
        } else {
            var d = g.wrappers().size();
        }
        this.addParam("wr", d);
        this.report();
    };
    this.sendTsingOpenInfo = function() {
        if (!c.act || !this.__fe) {
            return;
        }
        var g = this.__fe;
        if (g.firstTrip) {
            var d = g.firstTrip().wrappers().size() + "_" + g.secondTrip().wrappers().size();
        } else {
            var d = g.wrappers().size();
        }
        this.addParam("wr", d);
        this.tsingReport();
    };
    this.addOpenInfo_onewayInter = function(g, h) {
        for (var f in h) {
            var d = h[f];
            this.addParam(f, d);
        }
        this.addParam("act", "open");
        this.__fe = g;
        return this;
    };
    this.sendOpenInfo_onewayInter = function() {
        if (!c.act || !this.__fe) {
            return;
        }
        var h = this.__fe;
        if (h.flightType == "oneway") {
            var d = h.flightList.first().value.vendorList.size();
        } else {
            var g = h.flightList.keys();
            var d = h.flightList[g[0]].vendorList.size() + "_" + h.flightList[g[1]].vendorList.size();
        }
        this.addParam("wr", d);
        this.report();
    };
    this.invalidErr = function() {
        this.addParam("invalid", "true");
        return this;
    };
    this.justone = function(d, f) {
        if (b[d]) {
            return;
        }
        b[d] = true;
        this.addParam(d, f);
    };
    this.noOnewayErr = function() {
        this.addParam("noOneway", "true");
        return this;
    };
    this.noTransErr = function() {
        this.addParam("noTrans", "true");
        return this;
    };
    this.noResultErr = function() {
        this.addParam("noResult", "true");
        return this;
    };
    this.sameCityErr = function() {
        this.addParam("sameCity", "true");
        return this;
    };
    this.report = function() {
        var f = "QSA";
        var g = [];
        for (var d in c) {
            g.push("&", d, "=", encodeURIComponent(c[d]));
        }
        trackAction(f + g.join(""));
        return this;
    };
    this.tsingReport = function() {
        var f = "QSA";
        var g = [];
        for (var d in c) {
            g.push("&", d, "=", encodeURIComponent(c[d]));
        }
        TsinghuaOneWayTracker.track("action", f + g.join("") + "&_module=FL", +new Date());
        return this;
    };
};
(function() {
    TraceAnalyzer.create = function() {
        return new TraceAnalyzer();
    };
})();
var PAGE_EVENT = (function() {
    var a = {};
    return {
        bind: function(d, c) {
            var b = [].slice.apply(arguments);
            b.splice(0, 0, a);
            $jex.event.binding.apply($jex.event, b);
        },
        trigger: function(d, c) {
            var b = [].slice.apply(arguments);
            b.splice(0, 0, a);
            $jex.event.trigger.apply($jex.event, b);
        }
    };
})();
var InfoManager = function() {
    var b = this;
    var a = {
        uiCache: {},
        my_wrappInfo: {},
        my_wrappInfo_s: {},
        my_wrappInfo_bf: {},
        flightInfo: {},
        Recommend_wrapper: {}
    };
    this.getStore = function() {
        return a;
    };
    this.addSource = function(d, j, f) {
        var g = f || {};
        var i = g.isTrigger;
        var h = g.isOverwrite || true;
        if (!a[d] && !i) {
            a[d] = j;
        } else {
            for (var c in j) {
                a[d][c] = j[c];
                if (i == true) {
                    $jex.event.trigger(b, "add", d, c, j[c]);
                }
            }
        }
    };
    this.addItem = function(c, j, g, d) {
        var f = d || {};
        var i = f.isTrigger;
        var h = f.isOverwrite || true;
        a[c] = a[c] || {};
        if (h) {
            a[c][j] = g;
        } else {
            if (!a[c][skey]) {
                a[c][j] = g;
            }
        }
        if (i == true) {
            $jex.event.trigger(b, "add", c, j, g);
        }
    };
    this.get = function(c, d) {
        var f = a[c];
        if (!f) {
            $jex.console.warn("InfoManager[没有找到对应的信息类别]", c, d, a);
            return null;
        }
        if (arguments.length == 1) {
            return f;
        }
        if (f[d] == null) {
            $jex.console.warn("InfoManager[没有找到对应的信息]", c, d, a);
        }
        return f[d];
    };
};

function FlashAdUI(a) {
    FlashAdUI.superclass.constructor.call(this, a);
    this._type = "FlashAdUI";
}
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
            info1: "<span class='textRed'>噢噢~Orz 原地打转的话搜不到结果哦！<br />请立即输入目的地城市，想去哪儿就去哪�