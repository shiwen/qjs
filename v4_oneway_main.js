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
    AirlineDirectSelling: ["gnd090722cp"]
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
    } if (a) {
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
        } if (c.styleSheet) {
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
    stopEvent: function(a) {
        if (window.event) {
            event.returnValue = false;
            event.cancelBubble = true;
        } else {
            a.preventDefault();
            a.stopPropagation();
        }
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
        each: function(a, c) {
            if (!a) {
                return;
            }
            for (var b = 0, d = a.length; b < d; b++) {
                c(a[b], b);
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
        a = [
            function() {
                return new XMLHttpRequest();
            },
            function() {
                return new ActiveXObject("Msxml2.XMLHTTP");
            },
            function() {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
        ];
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
        } if (h < k) {
            pageHeight = k;
        } else {
            pageHeight = h;
        } if (j < i) {
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
        } if (childs == "1") {
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
        request.open("GET", url + "&" + $jex.toQueryString(data), true);
        request.send(null);
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
        }, q = function(b) {
            x || z.onmouseout.apply(w, [b]);
        }, p = function(b) {
            x = !0;
            t && clearTimeout(t);
            t = setTimeout(function() {
                s(b);
            }, y);
        }, o = function(b) {
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
                    } if (h[n][1]) {
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
DataSet.prototype.clearFilter = function(a) {
    if (!this._filtersMap[a]) {
        return;
    } else {
        this._filtersMap[a].value = [];
    } if (this.filteredDataMap) {
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
            } if (c._checkFilter(c._filtersMap[a], i)) {
                c._filterMatrix[j] &= c._filtersMap[a].nmask;
            } else {
                c._filterMatrix[j] |= c._filtersMap[a].mask;
            } if (!c._filterMatrix[j]) {
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
    XControl.supercla
