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
    }
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
                if (request.status >= 200 && request.status < 300) {
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
    a.text('				<div class="CSButton"> <img src="http://source.qunar.com/site/images/new_main/icon_MoreNextDays.gif"/> </div>');
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
        } if (q) {
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
        } if (c[d]) {
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
    }
};
var QunarDate = $jex.exec(function() {
    var b = {
        "2013-01-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "元旦"
        },
        "2013-02-09": {
            afterTime: 0,
            beforeTime: 0,
            dayindex: 0,
            holidayName: "除夕"
        },
        "2013-02-10": {
            afterTime: 6,
            beforeTime: 0,
            dayindex: 0,
            holidayName: "春节"
        },
        "2013-02-24": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "元宵"
        },
        "2013-04-04": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "清明"
        },
        "2013-05-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "五一"
        },
        "2013-06-12": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "端午"
        },
        "2013-09-19": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "中秋"
        },
        "2013-10-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "国庆"
        },
        "2013-12-25": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "圣诞"
        },
        "2014-01-01": {
            afterTime: 3,
            beforeTime: 3,
            dayindex: 0,
            holidayName: "元旦"
        }
    };
    var f = ["今天", "明天", "后天"];
    var i = 24 * 60 * 60 * 1000;
    var h = ["日", "一", "二", "三", "四", "五", "六"];
    var c = {
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
    var a = null;
    var d = null;
    return {
        getTimeRange: function(k) {
            var j = parseInt(k.replace(/(\d+):\d+/i, "$1"), 10);
            if (j >= 6 && j < 12) {
                return 0;
            }
            if (j == 12) {
                return 1;
            }
            if (j > 12 && j <= 18) {
                return 2;
            }
            return 3;
        },
        isHoliday: function(j) {
            return !!b[j];
        },
        parseTimeToNL_et: function(j) {
            if (j >= i) {
                j = i;
            }
            return this.parseTimeToNL(j);
        },
        parseTimeToNL: function(o) {
            var n = o % 1000;
            var m = (o - n) % 60000;
            var k = (o - m * 1000 - n) % 3600000;
            var p = (o - k * 60000 - m * 1000 - n) % (24 * 3600000);
            var j = (o - p * 3600000 - k * 60000 - m * 1000 - n) % (24 * 3600000);
            var l = "";
            if (o < 1000) {
                l = 1 + g.SECOND;
            } else {
                if (o < 60000) {
                    l = parseInt(o / 1000) + g.SECOND;
                } else {
                    if (o < 3600000) {
                        l = parseInt(o / 60000) + g.MINUTE;
                    } else {
                        if (o < (24 * 3600000)) {
                            l = parseInt(o / 3600000) + g.HOUR;
                        } else {
                            if (o < (365 * 24 * 3600000)) {
                                l = parseInt(o / (24 * 3600000)) + g.DAY;
                            } else {
                                l = parseInt(o / (365 * 24 * 3600000)) + g.YEAR;
                            }
                        }
                    }
                }
            }
            return l;
        },
        plus: function(j, k) {
            return new Date(j.getTime() + k * i);
        },
        getMinute: function(l) {
            var n = l.split(":");
            var k = parseInt(n[0], 10);
            var j = parseInt(n[1], 10);
            return k * 60 + j;
        },
        today: function() {
            if (a) {
                return a;
            }
            var j = window.SERVER_TIME || new Date();
            return a = new Date(j.getFullYear(), j.getMonth(), j.getDate());
        },
        parse: function(k) {
            var j = k.split("-");
            return new Date(j[0], j[1] - 1, j[2]);
        },
        format: function(j) {
            if (typeof j == "number") {
                j = new Date(j);
            }
            return j.getFullYear() + "-" + this.convert2digit(j.getMonth() + 1) + "-" + this.convert2digit(j.getDate());
        },
        convert2digit: function(j) {
            return j < 10 ? "0" + j : j;
        },
        compareDate: function(k, j) {
            return k.getTime() - j.getTime();
        },
        getFirstDaysOfMonth: function(j) {
            return new Date(j.getFullYear(), j.getMonth(), 1);
        },
        getLastDaysOfMonth: function(j) {
            return new Date(j.getFullYear(), j.getMonth() + 1, 0);
        },
        getHolidayName: function(j) {
            return b[j]["holidayName"];
        },
        getDateTip: function(j) {
            var k = this.parse(j);
            var l = (k.getTime() - this.today().getTime()) / 1000 / 3600 / 24;
            var m = "";
            if (l < 3) {
                m = f[l];
                if (this.isHoliday(j)) {
                    m = b[j]["holidayName"];
                }
            } else {
                this.initDataTable();
                if (d[j]) {
                    m = d[j].holidayName;
                }
            } if (m == "") {
                m = c.week + h[k.getDay()];
            }
            return m;
        },
        seconds2days: function(j) {
            var k = 60 * 1000 * 60 * 24;
            return j / k;
        },
        getDatesOffset: function(q, j) {
            var n = {};
            var k = this.compareDate(this.parse(j), this.parse(q));
            var p = this.seconds2days(k);
            var o = this.parse(q);
            for (var l = 1; l < p; l++) {
                o = QunarDate.plus(o, 1);
                var m = this.format(o);
                n[m] = o;
            }
            return n;
        },
        initDataTable: function() {
            if (d != null) {
                return d;
            }
            d = {};
            for (var t in b) {
                var k = t;
                var o = b[t];
                d[t] = o;
                var n = "";
                var p = "";
                if (o.beforeTime > 0) {
                    for (var l = 1; l <= o.beforeTime; l++) {
                        var q = {};
                        var u = new Date(this.parse(k).getTime() - l * 24 * 3600 * 1000);
                        var m = this.format(u);
                        q.holidayName = o.holidayName + c.before + l + c.day;
                        q.dayindex = o.dayindex;
                        if (!d[m]) {
                            d[m] = q;
                        } else {
                            if ((o.dayindex > d[m].dayindex) && d[m].beforeTime == null) {
                                d[m] = q;
                            }
                        }
                    }
                }
                if (o.afterTime > 0) {
                    for (var l = 1; l <= o.afterTime; l++) {
                        var q = {};
                        var s = new Date(this.parse(k).getTime() + l * 24 * 3600 * 1000);
                        var j = this.format(s);
                        q.holidayName = o.holidayName + c.after + l + c.day;
                        q.dayindex = o.dayindex;
                        if (!d[j]) {
                            d[j] = q;
                        } else {
                            if ((o.dayindex > d[j].dayindex) && d[this.format(new Date(u))].afterTime == null) {
                                d[j] = q;
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
    this.checkDate2 = function(l, j, i) {
        var h = d;
        if (i) {
            h = QunarDate.parse(i);
        }
        var k = new Date(this.date1.getTime() + f * 24 * 3600000);
        if (k.getTime() > h.getTime()) {
            k = h;
        }
        return this.checkDate(l, this.date1, h, k);
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
        } if (i.getDay() == 0 || i.getDay() == 6) {
            k += " holi";
        }
        if (QunarDate.isHoliday(QunarDate.format(i))) {
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
}

function DateLayer(m, z) {
    this.panel = m;
    var g = this;
    var q = [];
    var y = true;
    if (m.parentNode.parentNode.className.indexOf("toD") > -1) {
        y = false;
    }
    var c;
    var b = {};
    var o = [];
    var n = [];
    var u, x, i, B;
    var a = {};

    function C() {
        b = {};
        a = {};
        o.length = 0;
        n.length = 0;
        u = x = i = B = null;
    }

    function t() {
        var F = this.getAttribute("value");
        var H = this.getAttribute("data-pos");
        var G = QunarDate.parse(F);
        if ((G.getTime() >= u.getTime()) && (G.getTime() <= x.getTime())) {
            $jex.event.trigger(g, "selected", [G, H]);
        }
    }

    function A() {
        g.render(QunarDate.parse(this.getAttribute("ym")), u, x, null, B);
    }

    function D(F) {
        if (!a[F]) {
            var G = b[F];
            a[F] = c.getDomNode(G);
        }
        return a[F];
    }

    function p(I) {
        var J, H, I = I || {};
        for (var G = 0, F = o.length; G < F; G++) {
            H = o[G];
            if (I[H]) {
                I[H] = 0;
            } else {
                J = D(H);
                $jex.removeClassName(J, "day_sel_area");
            }
        }
    }

    function l(F) {
        o.length = 0;
        $jex.each(F, function(G, I) {
            o[o.length] = G;
            if (F[G]) {
                var H = D(G);
                $jex.addClassName(H, "day_sel_area");
            }
        });
    }

    function E(G) {
        var F = D(QunarDate.format(G));
        $jex.addClassName(F, "curr");
    }

    function s(G) {
        var F = D(QunarDate.format(G));
        $jex.removeClassName(F, "curr");
    }
    var w = function(L, G) {
        var K = $jex.ie ? "mouseenter" : "mouseover";
        var J = $jex.ie ? "mouseleave" : "mouseout";
        var I;
        for (var H = 0, F = n.length; H < F; H++) {
            I = D(n[H]);
            $jex.event.bind(I, K, function() {
                L(this);
                $jex.addClassName(this, "hover");
            });
            $jex.event.bind(I, J, function() {
                G(this);
                $jex.removeClassName(this, "hover");
            });
            $jex.event.bind(I, "click", t);
            q.push(I);
        }
    };
    var h = function() {
        for (var F = 0; F < 2; F++) {
            var G = c.getDomNode("a" + F);
            $jex.event.bind(G, "mousedown", A);
            q.push(G);
        }
    };
    var d = function() {
        var F = function() {};
        w(F, F);
    };
    var k = function() {
        var I = null;
        var H = function(L) {
            clearTimeout(I);
            var M = L.getAttribute("value");
            var N = QunarDate.parse(M);
            var O = z.date1;
            var J = z.date2;
            var K = {};
            if (y) {
                if (QunarDate.compareDate(O, N) > 0) {
                    K = QunarDate.getDatesOffset(M, QunarDate.format(J));
                } else {
                    if (QunarDate.compareDate(N, J) > 0) {
                        K = {};
                    } else {
                        K = QunarDate.getDatesOffset(M, QunarDate.format(J));
                    }
                }
                s(O);
                E(J);
            } else {
                K = QunarDate.getDatesOffset(QunarDate.format(O), M);
                s(J);
                E(O);
            }
            p(K);
            l(K);
        };
        var F = function() {
            var L = z.date1;
            var J = z.date2;
            var K = QunarDate.getDatesOffset(QunarDate.format(L), QunarDate.format(J));
            E(L);
            E(J);
            p(K);
            l(K);
        };
        var G = function() {
            clearTimeout(I);
            I = setTimeout(function() {
                F();
            }, 150);
        };
        w(H, G);
    };
    var j = function() {
        for (var F = 0, G = q.length; F < G; F++) {
            $jex.event.clear(q[F]);
        }
        q.length = 0;
    };
    var f = function(G, I, K, J, L) {
        i = J || 0;
        u = I || z.getMin();
        x = K || z.getMax();
        B = L || {};
        var F = 0;
        var H = 0;
        c = new UIObject();
        c.text('<div class="dpanel">');
        $jex.array.each([0, 1], function(R, S) {
            var ae = new Date(G.getFullYear(), G.getMonth() + R - i, 1);
            var Y = ae.getMonth() + 1;
            var aa = QunarDate.convert2digit(Y);
            var V = ae.getFullYear();
            var af = new Date(V, ae.getMonth(), 0);
            var P = new Date(V, ae.getMonth(), 1);
            var M = new Date(V, ae.getMonth() + 1, 1);
            var T = new Date(V, Y - 1, 1).getDay() - 1;
            if (T < 0) {
                T = 6;
            }
            var X = new Date(V, Y, 0).getDate();
            var Q = S == 0 ? u.getTime() <= af.getTime() : M.getTime() <= x.getTime();
            c.text('<div class="dpart">');
            c.text('<div class="cld_dbg">' + Y + "</div>");
            c.text("<h3>");
            c.append("<a ", "a" + (H++)).text(' class="', (S ? "downTd" : "upTd"), '" ym="', (QunarDate.format(S ? P : af)), '" style="', (Q ? "display:block" : "display:none"), '" href="javascript:;"></a>', V, "年", Y, "月</h3>");
            c.text('<table cellspacing="0" cellpadding="0" border="0">');
            c.text('<tr class="thead"><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td class="holi">六</td><td class="holi">日</td></tr>');
            var ac = 0;
            var W = /out$/;
            var N = "";
            for (var Z = 0; Z < 42; Z++) {
                if (Z % 7 == 0) {
                    c.text('<tr class="tdate">');
                }
                if (Z < T) {
                    c.text('<td class="cnone">&nbsp;</td>');
                } else {
                    if (ac < X) {
                        ac++;
                        var ag = ac;
                        var ad = QunarDate.convert2digit(ac);
                        var U = V + "-" + aa + "-" + ad;
                        var O = new Date(V, Y - 1, ac);
                        var ab = QunarDate.today();
                        if (QunarDate.compareDate(O, ab) === 0) {
                            ag = "今天";
                        }
                        if (QunarDate.isHoliday(U)) {
                            ag = QunarDate.getHolidayName(U);
                        }
                        b[U] = F;
                        N = z.getTdStyle(O, u, x);
                        if (!W.test(N)) {
                            n[n.length] = U;
                        }
                        if ( !! B[U]) {
                            o[o.length] = U;
                            c.append("<td ", F++).text(' value="', U, '" data-pos="', R, '" class=" day_sel_area  ', N, '" >', ag, "</td>");
                        } else {
                            c.append("<td ", F++).text(' value="', U, '" data-pos="', R, '" class="', N, '" >', ag, "</td>");
                        }
                    } else {
                        c.text('<td class="cnone">&nbsp;</td>');
                    }
                } if (Z % 7 == 6) {
                    c.text("</tr>");
                }
            }
            c.text("</table></div>");
        });
        c.text("</div>");
        c.write(m);
    };
    this.render = function(G, H, F, J, I) {
        j();
        C();
        f(G, H, F, J, I);
        if (z.date2Hide) {
            d();
        } else {
            k();
        }
        h();
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
        } if (i == true) {
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
        img: "http://source.qunar.com/site/images/no_loading.gif"
    },
    searching: {
        info1: "请稍等,您查询的结果正在实时搜索中...",
        info2: "想去哪儿就去哪儿",
        img: "http://source.qunar.com/site/images/loading.gif"
    },
    noResult: {
        info1: "<span class='textRed'>该航线当前无可售航班<br />请您尝试其他航线或日期</span>",
        info2: "搜索结束",
        img: "http://source.qunar.com/site/images/no_loading.gif"
    },
    inValidQuery: {
        info1: "<span class='textRed'>抱歉，无直达航班，正试图搜索联程航班。</span>",
        info2: "想去哪儿就去哪儿",
        img: "http://source.qunar.com/site/images/loading.gif"
    },
    sameCity: {
        info1: "<span class='textRed'>噢噢~Orz 原地打转的话搜不到结果哦！<br />请立即输入目的地城市，想去哪儿就去哪儿！<br />--Qunar 员工语录!<br /><b>您输入出发城市与到达城市相同，请至少修改其中之一。</b></span>",
        info2: "",
        img: "http://source.qunar.com/site/images/no_loading.gif"
    },
    internopack: {
        info1: "<span class='textRed' style='text-align:left;'><b>没有找到您所查询的航班，可能原因如下：</b><br>1、您所查询的航线在“去哪儿”暂无往返报价，<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可以更改为查询单程报价，也期待您联系<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;010-57603866，协助我们补充航班信息。<br />2、网络暂时繁忙。</span>",
        info2: "",
        img: "http://source.qunar.com/site/images/no_loading.gif"
    }
};
FlashAdUI.prototype.show = function(b) {
    if (!b) {
        return;
    }
    var a = FlashAdUI.config[b];
    if (!a) {
        return;
    }
    this.clear();
    if (b === "internopack") {
        this.text('<div class="loading1">');
    } else {
        this.text('<div class="loading">');
    }
    this.text('<p class="msg">', a.info1, "</p>");
    this.text('<div><img src="', a.img, '" alt="loading" width="114" height="16" /></div>');
    this.text('<p class="msg2">', a.info2, "</p>");
    this.text("</div>");
    this.render();
};
var LoginControl = {
    isLogin: false,
    user: {
        name: ""
    },
    checkLogin: function() {
        $jex.cookie.reset();
        if (!$jex.cookie.get("_t") || !$jex.cookie.get("_q")) {
            LoginControl.isLogin = false;
        } else {
            LoginControl.isLogin = true;
            LoginControl.user.name = $jex.cookie.get("_q").replace("U.", "");
        }
    },
    login: function(d, a, c) {
        if (!d || !a) {
            c(false, "用户名或密码为空");
            return;
        }
        var b = "http://user.qunar.com/tloginx.jsp";
        QNR.crossDomainPost(b, {
            username: d,
            password: a,
            remember: 1
        }, "site/proxy.htm", {
            onsuccess: function(f) {
                if (f == 0) {
                    c(true);
                    $jex.event.trigger(LoginControl, "login");
                } else {
                    c(false, "用户名或密码错误");
                }
            }
        });
    }
};
var LockScreen = function(c, b) {
    b = b || {
        msg: "您的前一次搜索已经过去了10分钟，<br />正在为您重新搜索以提供更准确报价",
        lockNow: false
    };
    if (((new Date() - CLIENT_TIME) / 1000 / 60 > 10) || b.lockNow) {
        var a = ['<div class="p_layer_cont"><div class="layer_inner" style="width: 370px"><div class="e_tit_pop">&nbsp;</div><div class="layer_cont"><div id="pageBoxText">', b.msg, '<br /><img src="http://source.qunar.com/site/images/loading.gif" />', "</div></div></div></div>"].join("");
        $jex.lightbox.show(a);
        $jex.lightbox.overlay.style.backgroundColor = "#fff";
        setTimeout(function() {
            window.location.reload();
        }, 500);
    } else {
        c();
    }
};
window.LockScreen = LockScreen;
var SingletonUIManager = {};
$jex.exec(function() {
    var a = {};
    var b = {};
    var c = {};
    SingletonUIManager.register = function(d, h, f, g) {
        f = f || $jex.VOIDFUNC;
        g = g || $jex.VOIDFUNC;
        if (a[d] && a[d] != h) {
            c[d].call(a[d]);
        }
        f.call(h);
        a[d] = h;
        c[d] = g;
    };
    SingletonUIManager.close = function(d) {
        if (c[d]) {
            c[d].call(a[d]);
        }
        a[d] = null;
    };
});
var FlightEntity = function() {
    this.changed = false;
    this._valCache = {};
};
$jex.foreach(["key", "commInfoMgr", "flightInfoMgr", "lowestPrice", "highestPrice"], function(a) {
    FlightEntity.prototype[a] = function(b) {
        if (b == null) {
            return this._valCache[a];
        } else {
            this._valCache[a] = b;
        }
    };
});
FlightEntity.prototype.safeLowestPrice = function() {
    return this.lowestPrice() ? this.lowestPrice() : ConfigManager.getConfig("default", "safePrice");
};
FlightEntity.prototype.flightInfo = function(a) {
    return this.flightInfoMgr().get("flightInfo", this.key());
};
FlightEntity.prototype.getAcf = function() {
    var a = this.extInfo();
    return Number(a.acf) || 0;
};
FlightEntity.prototype.getFot = function() {
    var a = this.extInfo();
    return Number(a.fot) || 0;
};
FlightEntity.prototype.extInfo = function(c) {
    var a = this.flightInfoMgr();
    var d = this.flightInfo();
    var b = a.get("extInfo", d.co + "-" + d.da + "-" + d.aa) || a.get("extInfo", d.co);
    if (!b) {
        $jex.console.trace("[ERROR]没有扩展信息" + this.key());
        return {};
    }
    return b;
};
FlightEntity.prototype.deptTimeValue = function() {
    var b = this._valCache._deptTimeValue;
    if (typeof b == "undefined" || b == null) {
        var a = this.flightInfo().dd.replace(/-/g, "/") + " " + this.flightInfo().dt;
        b = new Date(a).getTime();
        this._valCache._deptTimeValue = b;
    }
    return b;
};
FlightEntity.prototype.deptTimeRange = function() {
    var a = this._valCache._deptTimeRange;
    if (typeof a == "undefined" || a == null) {
        a = ConfigManager.getConfig("config", "timerange", FlightUtil.timeRange(this.deptTime()).toString());
        this._valCache._deptTimeRange = a;
    }
    return a;
};
FlightEntity.prototype.arriTimeRange = function() {
    var a = this._valCache._arriTimeRange;
    if (typeof a == "undefined" || a == null) {
        a = ConfigManager.getConfig("config", "timerange", FlightUtil.timeRange(this.arriTime()).toString());
        this._valCache._arriTimeRange = a;
    }
    return a;
};
FlightEntity.prototype.deptTimeRangeValue = function() {
    var a = this._valCache._deptTimeRangeValue;
    if (typeof a == "undefined" || a == null) {
        a = this.deptTimeRange().value;
        this._valCache._deptTimeRangeValue = a;
    }
    return a;
};
FlightEntity.prototype._arriTimeRangeValue = function() {
    var a = this._valCache._arriTimeRangeValue;
    if (typeof a == "undefined" || a == null) {
        a = this.arriTimeRange().value;
        this._valCache._arriTimeRangeValue = a;
    }
    return a;
};
FlightEntity.prototype.plane = function() {
    var a = this._valCache._plane;
    if (typeof a == "undefined" || a == null) {
        a = this.commInfoMgr().get("plane", this.flightInfo().pt) || ConfigManager.getConfig("default", "plane");
        this._valCache._plane = a;
    }
    return a;
};
FlightEntity.prototype.planeType = function() {
    var a = this._valCache._planeType;
    if (typeof a == "undefined" || a == null) {
        a = this.plane().type;
        this._valCache._planeType = a;
    }
    return a;
};
FlightEntity.prototype.airportCodes = function() {
    var a = this._valCache._airportCodes;
    if (typeof a == "undefined" || a == null) {
        a = [this.flightInfo().da, this.flightInfo().aa];
        this._valCache._airportCodes = a;
    }
    return a;
};
FlightEntity.prototype.deptCity = function() {
    var a = this._valCache._deptCity;
    if (typeof a == "undefined" || a == null) {
        a = this.commInfoMgr().get("city", this.deptCityCode()) || ConfigManager.getConfig("default", "city");
        this._valCache._deptCity = a;
    }
    return a;
};
FlightEntity.prototype.arriCity = function() {
    var a = this._valCache._arriCity;
    if (typeof a == "undefined" || a == null) {
        a = this.commInfoMgr().get("city", this.arriCityCode()) || ConfigManager.getConfig("default", "city");
        this._valCache._arriCity = a;
    }
    return a;
};
FlightEntity.prototype.carrier = function() {
    var a = this._valCache._carrier;
    if (typeof a == "undefined" || a == null) {
        a = this.commInfoMgr().get("carrier", this.carrierCode()) || ConfigManager.getConfig("default", "carrier");
        this._valCache._carrier = a;
    }
    return a;
};
FlightEntity.prototype.carrierCode = function() {
    return this.flightInfo().ca;
};
FlightEntity.prototype.fixKMGAirport = function(c) {
    var a = new Date(this.flightInfo().dd.replace(/-/g, "/")).getTime();
    var b = new Date("2013/5/30").getTime();
    if (a >= b && (c.code === "HFE" || c.key === "HFE")) {
        c = {
            ab: "新桥机场",
            code: "HFE",
            key: "HFE",
            full: "合肥新桥国际机场"
        };
    }
    return c;
};
FlightEntity.prototype.deptAirport = function() {
    var a = this._valCache._deptAirport;
    if (typeof a == "undefined" || a == null) {
        a = this.commInfoMgr().get("airport", this.flightInfo().da) || ConfigManager.getConfig("default", "airport");
        this._valCache._deptAirport = a;
    }
    a = this.fixKMGAirport(a);
    return a;
};
FlightEntity.prototype.arriAirport = function() {
    var a = this._valCache._arriAirport;
    if (typeof a == "undefined" || a == null) {
        a = this.commInfoMgr().get("airport", this.flightInfo().aa) || ConfigManager.getConfig("default", "airport");
        this._valCache._arriAirport = a;
    }
    a = this.fixKMGAirport(a);
    return a;
};
FlightEntity.prototype.flightKeyCode = function() {
    return this.code() + "|" + this.deptDate();
};
FlightEntity.prototype.flightHistory = function() {
    return this.flightInfo().hp || this.flightInfo().hisp || [];
};
FlightEntity.prototype.code = function() {
    return this.flightInfo().co || "";
};
FlightEntity.prototype.stopover = function() {
    return (this.extInfo() && this.extInfo().sp != "0") ? this.extInfo().sp : 0;
};
FlightEntity.prototype.findCity = function(a) {
    var b = System.service.longwell();
    if (b.departureAirport.codeList.indexOf(a) >= 0) {
        return b.departureAirport.en;
    }
    if (b.arrivalAirport.codeList.indexOf(a) >= 0) {
        return b.arrivalAirport.en;
    }
};
FlightEntity.prototype.deptCityCode = function() {
    var a = this.flightInfo().dc;
    if (!a) {
        a = this.findCity(this.deptAirportCode());
    }
    return a;
};
FlightEntity.prototype.arriCityCode = function() {
    var a = this.flightInfo().ac;
    if (!a) {
        a = this.findCity(this.arriAirportCode());
    }
    return a;
};
FlightEntity.prototype.deptDate = function() {
    return this.flightInfo().dd;
};
FlightEntity.prototype.deptTime = function() {
    return this.flightInfo().dt;
};
FlightEntity.prototype.arriTime = function() {
    return this.flightInfo().at;
};
FlightEntity.prototype.deptAirportCode = function() {
    return this.flightInfo().da;
};
FlightEntity.prototype.arriAirportCode = function() {
    return this.flightInfo().aa;
};
FlightEntity.prototype.dptTower = function() {
    var a = this.flightInfo();
    return a && a.dpttower || "";
};
FlightEntity.prototype.arrTower = function() {
    var a = this.flightInfo();
    return a && a.arrtower || "";
};
FlightEntity.prototype.terminal = function() {
    var a = this.flightInfo();
    return a && a.t || "";
};
FlightEntity.prototype.codeShare = function() {
    var a = this.extInfo();
    return a && a.cs || "";
};
FlightEntity.prototype.transferCity = function() {
    return [];
};
FlightEntity.prototype.stops = function() {
    return this.extInfo().sp | 0;
};
FlightEntity.prototype.crossDays = function() {
    var a = this.flightInfo();
    return a.cd || 0;
};
FlightEntity.prototype.dur = function() {
    return this.flightInfo().dur;
};
FlightEntity.prototype.hasWrapper = function(a) {
    return null;
};
FlightEntity.prototype.onTimeRate = function() {
    var a = this.flightInfoMgr().get("corrInfo", this.code());
    return a ? a.correctness : "";
};
FlightEntity.prototype.delayTime = function() {
    var a = this.flightInfoMgr().get("corrInfo", this.code());
    return a ? a.delay : "";
};
FlightEntity.prototype.quasipointRateHTML = function() {
    var c = this.flightInfoMgr().get("corrInfo", this.code());
    var a = "";
    if (c) {
        var b = parseInt(c.correctness.replace("%", ""), 10);
        if (b > 95) {
            a = '<p class="a_pty_rate">约100%</p>';
        } else {
            if (b < 30) {
                a = '<p class="a_pty_rate">低于30%</p>';
            }
            if (b < 60) {
                a = '<p class="a_pty_rate">低于60%</p>';
            } else {
                a = '<p class="a_pty_mint">' + c.correctness + "</p>";
            } if (parseInt(c.delay, 10) <= 5) {
                a += '<p class="a_pty_mint">小于5分钟</p>';
            } else {
                if (parseInt(c.delay) <= 120) {
                    a += '<p class="a_pty_mint">' + c.delay + "分钟</p>";
                } else {
                    a += '<p class="a_pty_mint">2小时以上</p>';
                }
            }
        }
    } else {
        a = '<p class="a_pty_rate">--</p>';
    }
    return a;
};
FlightEntity.prototype.getWrapperList = function() {
    return this.flightInfoMgr().get(this.getPriceDataKey(), this.key());
};
FlightEntity.prototype._ajaxLoadList = function(g, a) {
    var f = this.getWrapperListType(),
        c = this;
    var d = this.ajaxStat[f];
    var b = this.commInfoMgr().getDataLoad();
    var i = g.isUserClick;
    var h = true;
    if (d == 3 || (!i && !a) || d == 1) {
        h = false;
    } else {
        this.ajaxStat[f] = 1;
        a && g.loading();
    } if (h) {
        this.syncPriceData(g.isMainFlight, function() {
            c.ajaxStat[f] = b ? 3 : 2;
            var j = c.getWrapperListType();
            if (j !== f) {
                return;
            }
            g.loadBack();
        });
    }
};
FlightEntity.prototype.getCurWrapperList = function(a) {
    if (!this.ajaxStat) {
        this.ajaxStat = {};
    }
    var b = this.getWrapperList();
    if (b) {
        a.callBack();
    }
    this._ajaxLoadList(a, !b);
};
FlightEntity.prototype.getWrapperListType = function() {
    return this._wlistType || "all";
};
FlightEntity.prototype.setWrapperListType = function(b) {
    this._wlistType = b;
    var a = this.codeShareFlight();
    if (a) {
        a.setWrapperListType(b);
    }
};
FlightEntity.prototype.getPriceDataKey = function() {
    var a = this.getWrapperListType();
    return a == "all" ? "my_wrappInfo" : ("my_wrappInfo_" + a);
};
FlightEntity.prototype.getLowpr = function(b) {
    var a = "lowpr";
    if (b && b != "all") {
        a = b + a;
    }
    return this._getPriceInfoValue(a);
};
FlightEntity.prototype.getHipr = function(b) {
    var a = "hipr";
    if (b && b != "all") {
        a = b + a;
    }
    return this._getPriceInfoValue(a);
};
FlightEntity.prototype.getWrlen = function(b) {
    var a = "wrlen";
    if (b && b != "all") {
        a = b + a;
    }
    return this.priceInfo()[a] || 0;
};
FlightEntity.prototype._getPriceInfoValue = function(a) {
    var b = this.priceInfo()[a];
    if (!b || b == 100000) {
        b = 0;
    }
    return b;
};
FlightEntity.prototype.arriDate = function() {
    var a = this.deptDate();
    if (this.isNextDate()) {
        a = QunarDate.parse(a);
        a.setDate(a.getDate() + 1);
        a = QunarDate.format(a);
    }
    return a;
};
FlightEntity.prototype.isNextDate = function() {
    return this.arriTime().replace(":", "") * 1 - this.deptTime().replace(":", "") * 1 < 0;
};
var FlightEntityManager = function() {
    FlightEntityManager.superclass.constructor.call(this);
};
$jex.extendClass(FlightEntityManager, $jex.List);
FlightEntityManager.prototype.getAll = function() {
    return this._map ? this._map : null;
};

function WrapperEntity() {
    this._valCache = {};
}
$jex.foreach(["key", "dataSource", "commInfoMgr", "flightInfoMgr"], function(a) {
    WrapperEntity.prototype[a] = function(b) {
        if (b == null) {
            return this._valCache[a];
        } else {
            this._valCache[a] = b;
        }
    };
});
WrapperEntity.prototype.ownerFlight = function(a) {
    if (a == null) {
        return this._valCache.ownerFlight;
    } else {
        this._valCache.ownerFlight = a;
        this.commInfoMgr(a.commInfoMgr());
        this.flightInfoMgr(a.flightInfoMgr());
    }
};
WrapperEntity.prototype.packagePrice = function() {
    return 0;
};
WrapperEntity.prototype.bpackagePrice = function() {
    return 0;
};
WrapperEntity.prototype.vendor = function() {
    var a = this._valCache.vendor;
    if (typeof a == "undefined" || a == null) {
        $jex.console.info("[WrapperEntity.vendor] wrapperId:", this.wrapperId(), ",ownerFlight:", this.ownerFlight());
        a = new VendorEntity();
        a.ownerWrapper(this);
        if (!this.commInfoMgr().get("vendor", this.wrapperId())) {
            $jex.console.error(this.wrapperId() + "没有vendors扩展信息");
        }
        a.dataSource(this.commInfoMgr().get("vendor", this.wrapperId()));
    }
    this._valCache.vendor = a;
    return a;
};
WrapperEntity.prototype.wrapperId = function() {
    return this.dataSource().wr || this.dataSource().wrid || "";
};
WrapperEntity.prototype.isTTS = function() {
    return this.wrapperId().indexOf("tts") == 0 || this.wrapperId().indexOf("wstts") == 0;
};
WrapperEntity.prototype.advalue = function() {
    return parseInt(this.dataSource().advalue || this.vendor().seq(), 10);
};
WrapperEntity.prototype.isADVendor = function() {
    return (this.vendor().seq() > 100) && this.vendor().adwords();
};
WrapperEntity.prototype.comments = function() {
    return [];
};
WrapperEntity.prototype.price = function() {
    return this.dataSource().pr;
};
WrapperEntity.prototype.typeOfCabin = function() {
    return this.dataSource().tc || "";
};
WrapperEntity.prototype.isFCabin = function() {
    return this.typeOfCabin().indexOf("头等") > -1;
};
WrapperEntity.prototype.isBCabin = function() {
    return this.typeOfCabin().indexOf("公务") > -1;
};
WrapperEntity.prototype.isTCabin = function() {
    return /^t/i.test(this.dataSource().type);
};
WrapperEntity.prototype.isOta = function() {
    return this.dataSource().type == "s";
};
WrapperEntity.prototype.isApplyPrice = function() {
    if (typeof this.dataSource().type != "undefined") {
        return this.dataSource().type == "a";
    }
    return false;
};
WrapperEntity.prototype.isFakeNormalPrice = function() {
    return false;
};
WrapperEntity.prototype.afee = function() {
    return this.dataSource().afee;
};
WrapperEntity.prototype.parValue = function() {
    return this.dataSource().vppr;
};
WrapperEntity.prototype.discount = function() {
    return this.dataSource().dis;
};
WrapperEntity.prototype.fake = function() {
    return this.dataSource().fk == true;
};
WrapperEntity.prototype.bpr = function() {
    if (typeof this.dataSource().bpr != "undefined") {
        return this.dataSource().bpr;
    } else {
        return false;
    }
};
WrapperEntity.prototype.pid = function() {
    return this.dataSource().pid;
};
WrapperEntity.prototype.getTGQInfo = function() {
    var h = this.dataSource();
    if (!h.hasOwnProperty("tgq")) {
        return false;
    }
    var g = h.tgq;
    if (g === "" || h.type === "a") {
        return "退改签规定以订单标注规定为准，<br />请联系售票代理商或航空公司咨询。";
    }
    var a = g.split("|"),
        f = [];
    for (var c = 0, b = a.length; c < b; c++) {
        var d = a[c];
        f.push(d.replace(/(.+[:：])/, "<em>$1</em>"));
    }
    return f.join("<br />") + '<p class="tips"><i>*</i>仅供参考,以订单标注的退改签规定为准。</p>';
};
WrapperEntity.prototype.isTao = function() {
    return true;
};
WrapperEntity.prototype.isQb = function() {
    return this.dataSource().isQb || false;
};
WrapperEntity.prototype.bxfee = function() {
    return this.dataSource().bxfee || 0;
};
WrapperEntity.prototype.updateTime = function() {
    return this.dataSource().ut;
};
WrapperEntity.prototype.rankgrade = function() {};
WrapperEntity.prototype.ranktitle = function() {
    return "";
};
WrapperEntity.prototype.booking = function(a, c) {
    var b = this;
    LockScreen(function() {
        b._booking(a, c);
    });
};
WrapperEntity.prototype.rank = function() {
    return this.dataSource().rank || 0;
};
WrapperEntity.prototype.rankline = function() {
    return this.dataSource().rankline || 0;
};
WrapperEntity.prototype._booking = function(a, b) {
    var c = this._booking_url(a, b);
    this._booking_track();
};
WrapperEntity.prototype._booking_url = function(b, d) {
    var a = {
        full: "false",
        fk: this.dataSource().fk ? 1 : 0,
        updatetime: this.dataSource().ut,
        inter: "false",
        departureTime: this.ownerFlight().deptTime(),
        arrivalTime: this.ownerFlight().arriTime(),
        ccn: this.getVpr()
    };
    switch (this.ownerFlight().type) {
        case "roundtrip":
            a.isRt = 1;
            a.returnDepartureTime = this.ownerFlight().secondTrip().deptTime();
            a.returnArrivalTime = this.ownerFlight().secondTrip().arriTime();
            break;
        case "onewayInRoundTrip":
            a.isRt = 1;
            break;
    }
    var f = window.location.param().from;
    if (f) {
        a.from = f;
    }
    if (b && this.ownerFlight().type != "onewayInTransfer") {
        a.stat = b.value();
    }
    if (this.ownerFlight().type == "onewayInTransfer") {
        a.iftrans = 1;
    }
    if (d) {
        $jex.merge(a, d);
    }
    if (d && d.prt === 0) {
        a.prt = 0;
    }
    var c = this._transBu(a.prt);
    return "/booksystem/booking.jsp?" + c + "&" + $jex.toQueryString(a);
};
WrapperEntity.prototype._transBu = function(c) {
    var b = this.dataSource().bu;
    var d = this.dataSource().bbu;
    d = d ? d : b;
    b = b ? b : d;
    var a = c === 0 ? d : b;
    return a;
};
WrapperEntity.prototype._booking_track = function() {
    var c = window.location.param();
    var a = this.ownerFlight();
    var b = ["FL", "BU", this.wrapperId(), encodeURIComponent(c.searchDepartureAirport) + "-" + encodeURIComponent(c.searchArrivalAirport), c.searchDepartureTime, encodeURIComponent(a.deptCity().zh) + "-" + encodeURIComponent(a.arriCity().zh), a.deptDate()];
    switch (a.type) {
        case "oneway":
            b.push("DA");
            b.push("OW");
            break;
        case "compose":
            b.push("PA");
            b.push("OW");
            break;
        case "onewayInTransfer":
            b.push("DA");
            if (a.position() == 0) {
                b.push("FST");
            } else {
                b.push("SND");
            }
            break;
    }
    b.push(a.code());
    trackAction(b.join("|"));
};
WrapperEntity.prototype.bigLogoUrl = function() {
    return this.dataSource().logoUrl || "";
};
WrapperEntity.prototype.sortRank = function() {
    var b = this.vendor();
    var a = b && b.dataSource().status;
    return a == 0 ? (this.dataSource().sortRank || 0) : (a == 1 ? 999999 : 1000000);
};
WrapperEntity.prototype.isNotWork = function() {
    return this.dataSource().type == "notWork";
};
WrapperEntity.prototype.setVpr = function(a) {
    this._vpr = a;
};
WrapperEntity.prototype.getVpr = function() {
    return this._vpr || 0;
};
WrapperEntity.prototype.coupon = function() {
    return this.dataSource().cd || 0;
};
WrapperEntity.prototype.couponAdwords = function() {
    return this.dataSource().caw;
};
var StatProvider = function() {};
StatProvider.prototype.value = function() {};

function VendorEntity() {
    var b = null;
    this.ownerWrapper = function(g) {
        if (g == null) {
            return b;
        } else {
            b = g;
        }
    };
    var f = null;
    this.dataSource = function(g) {
        if (g == null) {
            if (f == null) {
                $jex.console.error("没有vendor数据", this.wrapperId());
            }
            return f;
        } else {
            f = g;
        }
    };
    var a = null;
    this.seq = function(g) {
        if (g) {
            a = g;
        } else {
            if (typeof a == "undefined" || a == null) {
                this.checkLine();
            }
            return a;
        }
    };
    var c = null;
    this.adwords = function(g) {
        if (g) {
            c = g;
        } else {
            if (typeof c == "undefined" || c == null) {
                this.checkLine();
            }
            return c;
        }
    };
    var d = null;
    this.comment = function() {
        try {
            if (typeof d == "undefined" || d == null) {
                if (this.dataSource().recommend && this.dataSource().recommend.comment) {
                    d = this.dataSource().recommend.comment;
                } else {
                    d = "";
                }
            }
        } catch (g) {
            $jex.console.error(this.wrapperId() + " VendorEntity 缺失 recommend comment 信息");
            d = "";
        }
        return d;
    };
}
VendorEntity.prototype.iataInfo = function() {
    var a = this.dataSource();
    var b = {
        level: 0,
        url: ""
    };
    try {
        if (a.recommend && a.recommend.iata) {
            b.level = a.recommend.iata.level;
            b.url = a.recommend.iata.url;
        }
    } catch (c) {
        $jex.console.error(this.wrapperId() + " VendorEntity.prototype.iataInfo recommend信息");
    }
    return b;
};
VendorEntity.prototype.checkLine = function() {
    if (this._checkLine == true) {
        return;
    }
    var c = this.dataSource();
    if (!c) {
        return;
    }
    var a = this.ownerWrapper().ownerFlight();
    if (a && a.flightInfo()) {
        var d = [a.deptCity().zh, "-", a.arriCity().zh, "|", this.wrapperId()].join("");
        var b = a.commInfoMgr().get("flightLineVendor", d);
    } else {
        var b = null;
    }
    this._checkLine = true;
    if (b) {
        this.seq(b.sequenceNum);
        this.ADwords(b.adwords);
    } else {
        this.seq(c.sequenceNum);
        this.adwords(c.adwords);
    }
};
VendorEntity.prototype.wrapperId = function() {
    return this.ownerWrapper().wrapperId();
};
VendorEntity.prototype.rebateTye = function() {
    return (this.dataSource() ? this.dataSource().rt : "");
};
VendorEntity.prototype.name = function() {
    if (!this.dataSource()) {
        $jex.console.error(this.wrapperId(), "出现错误!!!!!");
    }
    return (this.dataSource() ? this.dataSource().name : "");
};
VendorEntity.prototype.hasDetail = function() {
    return this.dataSource().wrdetail && !$jex.$empty(this.dataSource().wrdetail);
};
VendorEntity.prototype.star = function() {
    return (this.dataSource().recommend && this.dataSource().recommend.star) ? this.dataSource().recommend.star : 0;
};
VendorEntity.prototype.codeName = function() {
    return this.dataSource().codeName;
};
VendorEntity.prototype.tss = function() {
    return this.dataSource().tss || 120;
};
VendorEntity.prototype.isSuperOTA = function() {
    return this.dataSource().isSuperOTA === "true";
};
VendorEntity.prototype.isWorking = function() {
    return this.dataSource().status == 0;
};
VendorEntity.prototype.getStatus = function() {
    return this.dataSource().status;
};
VendorEntity.prototype.starRank = function() {
    var a = this.dataSource().star;
    if (!a) {
        return {
            lv: {
                kd: 0,
                dw: 0,
                db: 0,
                ds: 0,
                ts: 0
            },
            count: 0
        };
    } else {
        return {
            lv: {
                kd: (Math.round(a.lv.kd * 10) / 10).toFixed(1),
                dw: (Math.round(a.lv.dw * 10) / 10).toFixed(1),
                db: (Math.round(a.lv.db * 10) / 10).toFixed(1),
                ds: (Math.round(a.lv.ds * 10) / 10).toFixed(1),
                ts: (Math.round(a.lv.ts * 10) / 10).toFixed(1)
            },
            count: a.count
        };
    }
};
VendorEntity.prototype.srv_ICON = function() {
    var b = this.dataSource();
    if (!b) {
        return null;
    }
    var a = b.info.icon;
    if (!a) {
        return null;
    }
    return {
        key: this.__getIconInfo(a).key,
        text: this.__getIconInfo(a).text,
        title: this.__getIconInfo(a).title
    };
};
VendorEntity.prototype.__getIconInfo = function(a) {
    switch (a) {
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
                title: ""
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
            };
    }
    return {
        key: "ico_nocertify",
        text: "",
        title: ""
    };
};
VendorEntity.prototype.__getService = function(a) {
    var c = this.dataSource();
    if (!c) {
        $jex.console.error("没有vendor数据:" + a);
        return null;
    }
    var b = c.services[a];
    if (!b) {
        return null;
    }
    return {
        key: a,
        title: ConfigManager.getConfig("config", "servicesDesc", a),
        desc: ConfigManager.getConfig("config", "services", a)
    };
};
VendorEntity.prototype.srv_CATA = function() {
    return this.__getService("s1");
};
VendorEntity.prototype.srv_ALLDAY = function() {
    return this.__getService("s2");
};
VendorEntity.prototype.srv_QNHELP = function() {
    return this.__getService("s3");
};
VendorEntity.prototype.srv_CHECKOUT = function() {
    return this.__getService("s4");
};
VendorEntity.prototype.srv_TGQ = function() {
    return this.__getService("s5");
};
VendorEntity.prototype.srv_BAOXIAN = function() {
    return this.__getService("s6");
};
VendorEntity.prototype.srv_QUALITY = function() {
    return false;
};
VendorEntity.prototype.srv_FREEMAIL = function() {
    return this.__getService("s8");
};
VendorEntity.prototype.srv_ASSISTANT = function() {
    if (this.__getService("s4")) {
        return {
            key: "s9",
            title: ConfigManager.getConfig("config", "servicesDesc", "s9"),
            desc: ConfigManager.getConfig("config", "services", "s9")
        };
    } else {
        return null;
    }
};
VendorEntity.prototype.complaintRate = function() {
    if (this.dataSource().crtext) {
        var a = 99;
        var b = this.dataSource().crtext;
        if (b.indexOf("出票信息可能被遗漏通知") >= 0) {
            a = 1;
        }
        if (b.indexOf("支付后才能确认金额，可能要求加价出票") >= 0) {
            a = 2;
        }
        if (b.indexOf("退款会出现不能及时到账") >= 0) {
            a = 3;
        }
        if (b.indexOf("客服电话难联络") >= 0) {
            a = 4;
        }
        if (b.indexOf("暂无用户反馈") >= 0) {
            a = 5;
        }
        return {
            rate: 0,
            url: this.dataSource().crurl,
            desc: this.dataSource().crtext,
            descType: a
        };
    }
    return null;
};
VendorEntity.prototype.ppc = function() {
    if (this.dataSource().ppc) {
        return this.dataSource().ppc;
    }
    return {};
};
VendorEntity.prototype.ppcphone = function() {
    if (this.ppc().pn) {
        return this.ppc().pn;
    }
    return "";
};

function WrapperListEntity() {
    var d = null;
    this.commInfoMgr = function(f) {
        if (f == null) {
            return d;
        } else {
            d = f;
        }
    };
    var a = null;
    this.flightInfoMgr = function(f) {
        if (f == null) {
            return a;
        } else {
            a = f;
        }
    };
    var c = null;
    this.ownerFlight = function(f) {
        if (f == null) {
            return c;
        } else {
            c = f;
            this.commInfoMgr(c.commInfoMgr());
            this.flightInfoMgr(c.flightInfoMgr());
        }
    };
    var b = null;
    this.dataSource = function(f) {
        if (f == null) {
            return b;
        } else {
            b = f;
            this._update(f);
        }
    };
    WrapperListEntity.superclass.constructor.call(this);
}
$jex.extendClass(WrapperListEntity, $jex.List);
WrapperListEntity.prototype.createWrapperEntity = function() {
    $jex.console.error("没有重写createWrapperEntity方法");
};
WrapperListEntity.prototype.update = function() {
    $jex.console.error("没有重写update方法");
};
WrapperListEntity.prototype.sort = function() {
    $jex.console.error("没有重写sort方法");
    return this.keys();
};
WrapperListEntity.prototype._update = function(b) {
    var a = this;
    this.clear();
    $jex.foreach(b, function(g, c, h) {
        $jex.console.info("[WrapperList.update create WrapperEntity] wrdata:", g, ",ownerFlight:", a.ownerFlight());
        var f = a.createWrapperEntity();
        f.dataSource(g);
        f.ownerFlight(a.ownerFlight());
        var d = h || f.wrapperId();
        f.key(d);
        var i = a.commInfoMgr().get("vendor", f.wrapperId());
        if (!a.get(d) && i) {
            a.put(d, f);
        }
    });
};
var OnewayFlightEntity = function() {
    OnewayFlightEntity.superclass.constructor.call(this);
    this.type = "oneway";
    var c = null;
    this.totalTax = function() {
        if (typeof c == "undefined" || c == null) {
            if (this.type != "compose") {
                var g = this.extInfo();
                var d = (g ? parseInt(g.acf, 10) : 0) || ConfigManager.getConfig("default", "acf");
                var f = (g ? parseInt(g.fot, 10) : 0) || ConfigManager.getConfig("default", "fot");
                c = d + f;
            } else {
                c = 200;
            }
        }
        return c;
    };
    var a = this;
    var b = null;
    this.wrappers = function() {
        if (typeof b == "undefined" || b == null) {
            b = new OnewayFlightWrapperListEntity();
            b.ownerFlight(this);
            b.update();
        }
        return b;
    };
};
$jex.extendClass(OnewayFlightEntity, FlightEntity);
OnewayFlightEntity.prototype.isAV = function() {
    return this.lowestPrice() == null;
};
OnewayFlightEntity.prototype.getPayCarrier = function() {
    var a = this.flightInfoMgr();
    return a.get("PayCarrier", this.key());
};
OnewayFlightEntity.prototype.getRecommandWrapperData = function() {
    var c = this.flightInfoMgr();
    var a = c.get("Recommend_wrapper", this.key());
    if ($jex.$empty(a)) {
        return null;
    }
    for (var b in a) {
        return a[b];
    }
};
OnewayFlightEntity.prototype.isAV = function() {
    return !this.lowestPrice();
};
OnewayFlightEntity.prototype.getReWrapperEntity = function() {
    if (this.isAV()) {
        return;
    }
    var b = this.getRecommandWrapperData(),
        a;
    if (b) {
        a = this._createWrapper(b);
    }
    return a;
};
OnewayFlightEntity.prototype._createWrapper = function(b) {
    if (!b) {
        return null;
    }
    var a = new OnewayFlightWrapperEntity();
    a.dataSource(b);
    a.ownerFlight(this);
    return a;
};
OnewayFlightEntity.prototype.getRecommandWrapper = function() {
    var b, a;
    b = this.getReWrapperEntity();
    if (b) {
        a = this.commInfoMgr().get("vendor", b.dataSource().wrid);
        if (!a) {
            return null;
        }
        return {
            entity: b,
            conf: a,
            isPay: b.isADVendor()
        };
    }
};
OnewayFlightEntity.prototype.lowestDiscount = function() {
    var a = this.flightInfoMgr().get("priceInfo", this.key());
    if (!a || !a.op) {
        return 0;
    }
    return Math.round((this.lowestPrice() / a.op) * 100) / 10;
};
OnewayFlightEntity.prototype.turelyLowestPrice = function() {
    return this.lowprInfo ? this.lowprInfo.tlp : Number.MAX_VALUE;
};
OnewayFlightEntity.prototype.priceGroup = function() {
    return this.flightInfoMgr().get("priceGroup", this.key());
};
OnewayFlightEntity.prototype.lastPriceGroup = function() {
    return this.flightInfoMgr().get("lastPriceGroup", this.key());
};
OnewayFlightEntity.prototype.priceInfo = function() {
    return this.flightInfoMgr().get("priceInfo", this.key());
};
OnewayFlightEntity.prototype.deptCityCode = function() {
    return this.commInfoMgr().deptCityCode();
};
OnewayFlightEntity.prototype.arriCityCode = function() {
    return this.commInfoMgr().arriCityCode();
};
OnewayFlightEntity.prototype.lowestWrapperIds = function() {
    var a = this.flightInfoMgr().get("priceGroup", this.key());
    if (a) {
        return a.lpwr || [];
    } else {
        return [];
    }
};
OnewayFlightEntity.prototype.lowestBprWrapperIds = function() {
    var a = this.flightInfoMgr().get("priceGroup", this.key());
    return a ? a.lbpwr || [] : [];
};
OnewayFlightEntity.prototype.syncPriceData = function(a, b) {
    var c = this.commInfoMgr().analyzer();
    c.syncPriceData(this, a, b);
};
OnewayFlightEntity.prototype.syncCurrentFlightCode = function() {
    var a = this.commInfoMgr().service();
    a.syncCurrentFlightCode(this.key());
};
OnewayFlightEntity.prototype.codeShareFlight = function() {
    return this.commInfoMgr().entityManager().get(this.codeShare() + "|" + this.deptDate());
};
OnewayFlightEntity.prototype.update = function() {
    var c = this.key();
    var b = this.commInfoMgr();
    var a = this.flightInfoMgr();
    this.type = (c.indexOf("/") == -1 && c.indexOf("+") == -1) ? "oneway" : "compose";
    this.flightInfo(a.get("flightInfo", c));
    this.lowprInfo = a.get("priceInfo", c);
    this.lowestPrice(this.lowprInfo ? this.lowprInfo.lowpr : null);
    $jex.event.trigger(this, "updating");
    this.changed = false;
};
OnewayFlightEntity.tryCreate = function(j, g, a, h) {
    var f = j;
    var b = g;
    var i = a;
    var c = i.get("flightInfo", j);
    if (!c) {
        return null;
    }
    if (!b.get("airport", c.da)) {
        return null;
    }
    if (!b.get("airport", c.aa)) {
        return null;
    }
    if (!b.get("carrier", c.ca)) {
        return null;
    }
    if (!b.get("plane", c.pt)) {
        return null;
    }
    var d = new OnewayFlightEntity();
    d.key(j);
    d.commInfoMgr(b);
    d.flightInfoMgr(i);
    d.update();
    h.put(d.key(), d);
    return d;
};

function OnewayFlightWrapperEntity(a) {
    OnewayFlightWrapperEntity.superclass.constructor.call(this, a);
    this._type = "OnewayFlightWrapperEntity";
}
$jex.extendClass(OnewayFlightWrapperEntity, WrapperEntity);
OnewayFlightWrapperEntity.prototype.wrapperId = function() {
    return this.dataSource().wrid;
};
OnewayFlightWrapperEntity.prototype.rank = function() {
    return this.groupInfo().rank || 999999;
};
OnewayFlightWrapperEntity.prototype.rankline = function() {
    return this.groupInfo().rankline || -2;
};
OnewayFlightWrapperEntity.prototype.isApplyPrice = function() {
    return this.dataSource().type == "a" && !this.isFakeNormalPrice();
};
OnewayFlightWrapperEntity.prototype.packagePrice = function() {
    return this.dataSource().pg;
};
OnewayFlightWrapperEntity.prototype.bpackagePrice = function() {
    return this.dataSource().bpg;
};
OnewayFlightWrapperEntity.prototype.isFakeNormalPrice = function() {
    var a = ["ttsmiao0001", "ttsmiao0003"];
    return $jex.array.indexOf(a, this.wrapperId()) > -1;
};
OnewayFlightWrapperEntity.prototype.arank = function() {
    return this.groupInfo().arank || 9999999;
};
OnewayFlightWrapperEntity.prototype.rankgrade = function() {
    return this.rankline() || 0;
};
OnewayFlightWrapperEntity.prototype.ranktitle = function() {
    var a = this.groupInfo();
    return FlightUtil.getGTITLE(this.advalue(), a.grprank, a.rankline, a.showlevel);
};
OnewayFlightWrapperEntity.prototype.comments = function() {
    return this.groupInfo()["comments"] || [];
};
OnewayFlightWrapperEntity.prototype.groupInfo = function() {
    if (this.ownerFlight().priceGroup()) {
        return this.ownerFlight().priceGroup().wrlist[this.key()] || {};
    } else {
        return {};
    }
};
OnewayFlightWrapperEntity.prototype._openBookingUrl = function(b, c) {
    var f = this._booking_url(b, c);
    var d = 1;
    if (c.prt === 0) {
        d = 2;
    }
    if (c.recom === 1) {
        d = 3;
        System.service.genTraceTimeStamp();
        System.analyzer.triggerTrace = true;
    }
    System.service.genBookingTimeStamp();
    var a = this.ownerFlight();
    if (a) {
        d += "&package=" + a.code();
    }
    window.open(f);
    this._bookingBtnTrace();
    TsinghuaOneWayTracker.track("btype", d, System.service.traceTimeStamp, null, "&burl=" + encodeURIComponent(f) + "&wt=" + System.service.wrapperExpandStamp);
    this._booking_track();
    TsinghuaOneWayTracker.trackLowPrChange(a, 1);
};
OnewayFlightWrapperEntity.prototype._booking = function(a, c) {
    c = c || {};
    if (!c.BookingLocation) {
        var b = this.ownerFlight().getWrapperListType() || "all";
        c.BookingLocation = "list_" + b;
    }
    this._openBookingUrl(a, c);
    setTimeout(function() {
        window.location.reload();
    }, 500);
};
OnewayFlightWrapperEntity.prototype._bookingBtnTrace = function() {
    var a = this.ownerFlight();
    var b = a.codeShareFlight();
    TsinghuaOneWayTracker.trackWrappers(a);
    if (b) {
        TsinghuaOneWayTracker.trackWrappers(b);
    }
    if (a._shareFlight) {
        TsinghuaOneWayTracker.trackWrappers(a._shareFlight);
    }
    TsinghuaOneWayTracker.traceFlightList();
};
OnewayFlightWrapperEntity.prototype.cabin = function() {
    return this.dataSource().cabin;
};
OnewayFlightWrapperEntity.prototype.tag = function() {
    return this.dataSource().type;
};
OnewayFlightWrapperEntity.prototype.hasPackageprice = function() {
    return this.price();
};
OnewayFlightWrapperEntity.prototype.afeePrice = function() {
    return this.price();
};
OnewayFlightWrapperEntity.prototype.bprPrice = function() {
    return this.bpr();
};

function OnewayFlightWrapperListEntity() {
    OnewayFlightWrapperListEntity.superclass.constructor.call(this);
}
$jex.extendClass(OnewayFlightWrapperListEntity, WrapperListEntity);
OnewayFlightWrapperListEntity.prototype.createWrapperEntity = function() {
    return new OnewayFlightWrapperEntity();
};
OnewayFlightWrapperListEntity.prototype.update = function() {
    var a = this.ownerFlight();
    var b = a.getWrapperList();
    this._update(b);
};
OnewayFlightWrapperListEntity.prototype.bigUrlSort = function(d) {
    var c, a, b = this;
    $jex.foreach(d, function(g, f) {
        var h = b.get(g);
        if (h.bigLogoUrl()) {
            c = g;
            a = f;
            return $jex.$break;
        }
    });
    if (c) {
        d.splice(a, 1);
        d.splice(0, 0, c);
    }
};
OnewayFlightWrapperListEntity.prototype.sort = function(b) {
    var c = this.keys(),
        a = this;
    b = b || this._sortType;
    this._sortType = b;
    if (b && b == "priceDesc") {
        c.sort(function(g, f) {
            var i = a.get(g);
            var h = a.get(f);
            var j = i.afeePrice() || i.bprPrice();
            var d = h.afeePrice() || h.bprPrice();
            if (!i.vendor().isWorking()) {
                j = 100000;
            }
            if (!h.vendor().isWorking()) {
                d = 100000;
            }
            return (j - d);
        });
        this.bigUrlSort(c);
    } else {
        if (b && b == "priceAsc") {
            c.sort(function(g, f) {
                var i = a.get(g);
                var h = a.get(f);
                var j = i.afeePrice() || i.bprPrice();
                var d = h.afeePrice() || h.bprPrice();
                if (!i.vendor().isWorking()) {
                    j = -100000;
                }
                if (!h.vendor().isWorking()) {
                    d = -100000;
                }
                return -(j - d);
            });
            this.bigUrlSort(c);
        } else {
            c.sort(function(f, d) {
                var h = a.get(f);
                var g = a.get(d);
                return h.sortRank() - g.sortRank();
            });
        }
    }
    this._keysCache = c;
    return c;
};
OnewayFlightWrapperListEntity.prototype.wrapperLength = function() {
    var b = this._keysCache || [];
    for (var a = b.length; a > 0; a--) {
        if (this.get(b[a - 1]).isNotWork()) {
            continue;
        } else {
            break;
        }
    }
    return a;
};

function FlightUI(a) {
    FlightUI.superclass.constructor.call(this, a);
    this._type = "FlightUI";
    this._state = 0;
    if (window.UICacheManager) {
        UICacheManager.addToCache(this);
    }
}
$jex.extendClass(FlightUI, XControl);
FlightUI.prototype.state = function(a) {
    if (a == null) {
        return this._state;
    } else {
        this._state = a;
        $jex.event.trigger(this, "stateChanged", a, this);
    }
};
FlightUI.prototype.ownerFlightUI = function(a) {
    if (a == null) {
        return this._flightUI;
    } else {
        this._flightUI = a;
    }
};
FlightUI.prototype.gotoDetailPage = function(b) {
    switch (b.type) {
        case "onewayInTransfer":
            var a = b.owner().flightKeyCode();
            break;
        default:
            var a = b.flightKeyCode();
            break;
    }
    trackAction("FL|ALL|" + encodeURIComponent(a));
    var d = window.location.param();
    var c = ["oneway_detail.htm?", "&origional=", encodeURIComponent(a), "&searchDepartureAirport=", encodeURIComponent(d.searchDepartureAirport), "&searchArrivalAirport=", encodeURIComponent(d.searchArrivalAirport), "&searchDepartureTime=", d.searchDepartureTime, "&searchArrivalTime=", d.searchArrivalTime, "&nextNDays=0", "&arrivalTime=", d.searchArrivalTime, "&listtime=", SERVER_TIME.getTime(), "&code=", b.code(), "&listlp=", b.lowestPrice(), "&sortid=", "&deptcity=", encodeURIComponent(b.deptCity().zh), "&arricity=", encodeURIComponent(b.arriCity().zh), "&tserver=", this.dataSource().commInfoMgr().service().tserver()];
    if (b.getWrapperListType) {
        c.push("&wtype=", b.getWrapperListType());
    }
    if (d.from) {
        c.push("&from=", d.from);
    }
    LockScreen(function() {
        window.open(c.join(""));
    });
};
FlightUI.prototype.container = function() {
    return this.find("itemRow");
};
FlightUI.prototype.moveToHome = function() {
    if (this._homeNode) {
        if (!this._homeNode.parentNode) {
            return;
        }
    }
    var a = $jex.$("hdivResultPanel");
    var b = $jex.$(this.newid("itemBar"));
    a.insertBefore(b, this._homeNode);
    this._homeNode = null;
};
FlightUI.prototype.moveToFirst = function() {
    var a = this.dataSource();
    if (a.isAV && a.isAV()) {
        return;
    }
    this.ownerFlightUI().setFirstFlight(this);
    if (this.index == 0) {
        return;
    }
    var d = $jex.$("hdivResultPanel");
    var f = d.childNodes[0],
        b = this.newid("itemBar");
    var c = $jex.$(b);
    if (f.id != b) {
        this._homeNode = c.nextElementSibling || c.nextSibling;
        d.insertBefore(c, f);
    }
};

function WrapperUI() {
    WrapperUI.superclass.constructor.call(this);
    this.bookingScreenUI = new BookingScreenUI();
    this.bookingLockScreenUI = new BookingLockScreenUI();
    this.starUI = new StarRankUI();
    this.starUI.ownerWrapperUI(this);
    var a = null;
    this.ownerListUI = function(b) {
        if (b == null) {
            return a;
        } else {
            a = b;
        }
    };
    this.stat = new StatProvider();
}
$jex.extendClass(WrapperUI, XControl);
WrapperUI.prototype.update = function(a) {};
WrapperUI.prototype.insert_HEADER = function() {};
WrapperUI.prototype.insert_FOOTER = function() {};
WrapperUI.prototype._getBookingData = function(d, c, a) {
    var b = c;
    a = a || d.dataSource().type;
    a = a && a.toLocaleUpperCase();
    if (typeof c == "undefined") {
        b = d.afeePrice() ? 1 : 0;
    }
    if (a && b == 1) {
        a += "I";
    }
    return {
        prt: b
    };
};
WrapperUI.prototype.jumpToBooking = function(d, c, a) {
    var b = this._getBookingData(d, c, a);
    d.booking(this.stat, b);
};
WrapperUI.prototype.insert_IATAIMG = function(c) {
    var b = c;
    var a = b.vendor().iataInfo();
    $jex.console.info("[WrapperUI.insert_IATAIMG] iata:", a, ", wrEn:", b);
    switch (a.level) {
        case 1:
            this.text("<img ");
            if (a.url.indexOf("http") != -1) {
                this.text("onclick=\"window.open('", a.url, "');return false;\"");
            }
            this.text(' align="absmiddle" src="http://source.qunar.com/site/images/new_main/iatav2.gif" title="经Qunar验证：该网站已获得《中国民用航空运输销售代理业务资格认可证书》" />');
            break;
        default:
            break;
    }
};
WrapperUI.prototype.insert_VENDORNAME = function(d) {
    var c = d;
    var a = this.specWR;
    var b = this.superOTA;
    if (b && !c.isApplyPrice()) {
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
        this.text("    	 <h2>", c.vendor().name(), "</h2>");
        this.append("        <p", "superOTATip", ">快速出票、价格真实、优质服务</p>");
        this.text('         <div class="prelative">');
        this.text('            <div class="gold_sumary gold_txtsumry">');
        this.text("                <b>快速出票：</b>3分钟内出票率在99%以上<br /><b>价格真实：</b>价格准确率在99%以上<br /><b>优质服务：</b>24小时内完成退改签，服务<cite>响应快，在行业内领先 </cite>");
        this.text('           		<p class="jt_arrow left110"></p>');
        this.text("            </div> ");
        this.text("         </div>");
        this.text("    </div>");
        this.text("</div>");
    } else {
        if (a) {
            this.text('	<div class="t"><b><img class="img" src="', a.picurl, '">');
            this.text("</b>");
            if (c.vendor().srv_QUALITY()) {
                this.text('<span title="已签署《去哪儿网客户服务规范》，服务有保障。" class="s7">服务保障</span><br />');
            }
            this.text('<span class="s" title="', c.vendor().adwords(), '">', a.text[0], a.text[1], FlightUtil.catAdtext(c.vendor().adwords(), 36 - (a.text[0].length + a.text[1].length)), "</span>");
            this.text("</div>");
        } else {
            this.text('	<div class="t"><b>', c.vendor().name());
            this.text("</b>");
            if (c.vendor().srv_QUALITY()) {
                this.text('<span title="已签署《去哪儿网客户服务规范》，服务有保障。" class="s7">服务保障</span>');
            }
            this.text("</div>");
        }
    }
    this.onInit(function() {
        var f = this.find("superOTATip");
        var g = this.find("superOTADetail");
        if (f && g) {
            $jex.event.bind(f, "mouseover", function() {
                $jex.addClassName(g, "hover_gold");
            });
            $jex.event.bind(f, "mouseout", function() {
                $jex.removeClassName(g, "hover_gold");
            });
        }
    });
};
WrapperUI.prototype.insert_Services = function(f) {
    var b = this;
    var d = f;
    var a = d.vendor();
    this.text('<div class="v"><ul>');
    var c = [a.srv_ASSISTANT(), a.srv_ALLDAY(), a.srv_CHECKOUT(), a.srv_BAOXIAN(), a.srv_FREEMAIL(), a.srv_QNHELP()];
    $jex.foreach(c, function(g) {
        if (g) {
            b.append("<li ", g.key);
            b.text(' class="', g.key, '" alt="', g.title, '" title="', g.title, '">', g.desc, "</li>");
        }
    });
    this.text("</ul></div>");
};
WrapperUI.prototype.insert_RecommendBlog = function(b) {
    var a = b.vendor().complaintRate();
    if (a) {
        if (a.url) {
            a.url = "http://" + a.url.replace("http://", "");
            this.text("<a onclick=\"window.open('", a.url, '\'); $jex.stopEvent(event); return false;" target="_blank">', a.desc, "</a>&nbsp;&nbsp;");
        } else {
            this.text("<span>", a.desc, "</span>&nbsp;&nbsp;");
        }
    } else {}
};
WrapperUI.prototype.insert_CATA = function(c) {
    var b = c.vendor();
    var a = b.srv_CATA();
    if (a) {
        this.text('<div class="', a.key, '" alt="', a.title, '" title="', a.title, '"></div>');
    }
};
WrapperUI.prototype.insert_STAR = function(b) {
    var a = b;
    this.append("<div", "btnStar", ' class="starkb" >');
    this.text('<p class="star ', FlightUtil.starClass(a.vendor().star()), '"></p>');
    this.text('<p class="sbarTitle">网站口碑</p>');
    this.text("</div>");
    if (a.vendor().hasDetail()) {
        this.onInit(function() {
            $jex.event.binding(this.find("btnStar"), this, "click", function(c) {
                SingletonUIManager.register("vendor", this.vdetailUI, function() {
                    if (!this.visible()) {
                        this.updateSource(this.ownerWrapperUI().dataSource().vendor());
                        this.show();
                    } else {
                        this.hide();
                    }
                }, function() {
                    this.hide();
                });
                $jex.stopEvent(c);
            });
        });
    }
};
WrapperUI.prototype.insert_RANK = function(b) {
    var a = b;
    this.text('<p title="', a.rankgrade(), '分/5分" class="sbar"><b class="ids"><b style="width:', a.rankgrade() * 20, '%;" class="id"></b></b><b class="bg"></b></p>');
    this.text('<p class="sbarMsg">', a.ranktitle(), "</p>");
};
WrapperUI.prototype.insert_UPDATETIME = function(d) {
    var c = d;
    var b = c.updateTime();
    var a = "";
    if (b > 0) {
        a = QunarDate.parseTimeToNL(b) + "前更新";
    } else {
        a = "10分钟前更新";
    } if (c.isApplyPrice() || this.specWR) {
        return a;
    } else {
        return this.bookingScreenUI.getStatusMsg(a);
    }
};
WrapperUI.prototype.insert_PRICE = function(b) {
    var a = b;
    this.insert_PRICE_NORMAL(a);
};
WrapperUI.prototype.insert_PRICE_INSURANCE = function(c) {
    var b = c;
    this.text('<div class="f1booking"> <span class="insure">+', b.afee(), '(保险)</span><span class="naked">&yen;<b>', b.price(), "</b></span> </div>");
    var a = b.isApplyPrice() ? "申 请" : "预 订";
    this.text('<div class="f2booking"> <a class="btn" href="#"> <span>', a, "</span> </a> </div>");
    if (b.bpr()) {
        this.append('<div class="f3booking"> <a', "onlyt", ' class="bbtn" href="#" ');
        this.text('title="', a, '">无保险&yen;', b.bpr(), "</a> </div>");
    }
};
WrapperUI.prototype.insert_PRICE_NORMAL = function(g) {
    var f = g;
    var b = ConfigManager.getConfig("CuxiaoConfig");
    var a = f.wrapperId();
    var d = b[a];
    this.text('<div class="prs">');
    if (d) {
        this.text('<span class="insure">', d.text, "</span>");
    } else {
        if (f.afee()) {
            this.text('<span class="insure">+ ', f.afee(), "</span>");
        } else {
            this.text('<span class="disc">', PriceUtil.getDiscount(f.discount()), "</span>");
        }
    }
    this.text('<span class="pr">&yen;<b>', f.price(), "</b></span>");
    this.text("</div>");
    this.text('<div class="alt">');
    var c = f.ranktitle();
    if (c) {
        this.text(c);
    } else {
        if (f.afee()) {
            this.text("搭售保险");
        } else {
            if (f.parValue()) {
                this.text("票面价：&yen;", f.parValue());
            }
        }
    }
    this.text("</div>");
    this.insert_BOOKING_BUTTON(f);
    this.text('<div class="up">', this.insert_UPDATETIME(f), "</div>");
};
WrapperUI.prototype.insert_BOOKING_BUTTON = function(a) {
    if (a.isApplyPrice()) {
        this.append("<a ", "btnBook", ' class="btnBook" href="#"><span>' + this.bookingScreenUI.getButtonMsg("申 请") + "</span></a>");
    } else {
        if (this.specWR) {
            this.append('<div class="ops"><a ', "btnBook", ' title="预订" class="btnBook" href="#"><span>预 订</span></a></div>');
        } else {
            this.append('<div class="ops"><a ', "btnBook", ' title="' + this.bookingScreenUI.getButtonTips("预订") + '" class="btnBook" href="#"><span>' + this.bookingScreenUI.getButtonMsg("预 订") + "</span></a></div>");
        }
    }
};
var StatProvider = function() {
    this.ownerWrapperEntity = function(g) {
        if (g.ownerFlight().type == "onewayInTransfer") {
            return;
        }
        if (g.isApplyPrice() || g.isFakeNormalPrice()) {
            this.location(4);
        }
        this.fake(g.fake());
        if (g.ownerFlight().lowestPrice() == g.price()) {
            this.lowestStat(g.ownerFlight().lowestWrapperIds().length);
        } else {
            this.lowestStat(0);
        } if (g.advalue() > 100) {
            this.isAD(true);
        } else {
            this.isAD(false);
        }
    };
    var b = "00";
    this.position = function(g) {
        if (g == null) {
            return b;
        } else {
            if (g < 10) {
                b = "0" + g.toString();
            } else {
                b = g.toString();
            }
        }
    };
    var f = "0";
    this.isAD = function(g) {
        if (g == null) {
            return f;
        } else {
            if (g) {
                f = "1";
            } else {
                f = "0";
            }
        }
    };
    var d = "0";
    this.fake = function(g) {
        if (g == null) {
            return d;
        } else {
            if (g) {
                d = "1";
            } else {
                d = "0";
            }
        }
    };
    var a = 0;
    this.lowestStat = function(g) {
        if (g == null) {
            return a;
        } else {
            if (g > 2) {
                a = 2;
            } else {
                a = g;
            }
        }
    };
    var c = 1;
    this.location = function(g) {
        if (g == null) {
            return c;
        } else {
            c = g;
        }
    };
};
StatProvider.prototype.value = function() {
    return [this.position(), this.isAD(), this.fake(), this.lowestStat(), this.location()].join("");
};

function FlightListUI(a) {
    FlightListUI.superclass.constructor.call(this, a);
    this._type = "FlightListUI";
    this._cachelist = {};
    this.firstCodeClick = false;
    this.secondCodeClick = false;
}
FlightListUI.flightCount = 0;
$jex.extendClass(FlightListUI, XControl);
FlightListUI.prototype.getSorter = function() {
    if (typeof FlightListUISorter != "undefined") {
        return FlightListUISorter;
    }
    return {
        resortPage: function() {},
        open: function() {},
        close: function() {}
    };
};
FlightListUI.prototype.loadData = function(b, d) {
    var a = this;
    this.analyzer = d;
    this.clear();
    this._firstFlightUI = null;
    this.currentDataMap = b;
    this.getSorter().resortPage(b);
    FlightListUI.flightCount = 100;
    $jex.console.start("FlightListUI:loadData:建立数据");
    var c = [];
    $jex.foreach(b, function(g, f) {
        c.push(a._addFlightUI(g, f));
    });
    $jex.console.end("FlightListUI:loadData:建立数据");
    $jex.console.start("FlightListUI:loadData:渲染");
    this.refresh();
    $jex.console.end("FlightListUI:loadData:渲染");
    this._fuiListCache = c;
    this.keepLastOpen();
    $jex.event.trigger(this, "refreshed", c);
};
FlightListUI.prototype.keepLastOpen = function() {
    var d = HoldLastShowFlight.getUrlFlight(),
        b;
    $jex.foreach(this._fuiListCache, function(g, f) {
        if (g.dataSource().flightKeyCode() === d) {
            b = g;
            return false;
        }
    });
    if (b) {
        var a = b.dataSource().code();
        var c = HoldLastShowFlight.getUrlType(a) || "all";
        SingletonUIManager.register("flight", b, function() {
            b.dataSource().setWrapperListType(c);
            b.showVendorPanel();
        }, function() {
            b.hideVendorPanel();
        });
    }
};
FlightListUI.prototype.refresh = function() {
    this.render();
    this.styleList = [];
    this._randomArr = {};
};
FlightListUI.prototype._addFlightUI = function(b, a) {
    var c = this;
    var f = [b.type, "_", b.flightKeyCode()].join("");
    var g = this._cachelist[f],
        d = g;
    if (!g || g.dataSource() != b) {
        switch (b.type) {
            case "oneway":
            case "compose":
                g = new OnewayFlightUI();
                if (g.ownerFlightUI) {
                    g.ownerFlightUI(this);
                }
                break;
            case "transfer":
                g = new TransferFlightUI();
                if (g.ownerFlightUI) {
                    g.ownerFlightUI(this);
                }
                break;
        }
        g.dataSource(b);
        g.ownerList = this;
        if (d) {
            d._homeNode = null;
            g._state = d._state;
        }
        $jex.event.binding(g, "open", function() {
            c.getSorter().open(g.dataSource());
            c._track("open", b);
            try {
                var h = b.firstTrip ? true : false;
                TraceAnalyzer.open = TraceAnalyzer.create().addOpenInfo(b, {
                    da: (h ? b.firstTrip().deptCity().zh : b.deptCity().zh),
                    aa: (h ? b.secondTrip().arriCity().zh : b.arriCity().zh),
                    co: b.key(),
                    inter: 0,
                    dd: (h ? b.firstTrip().deptDate() : b.deptDate()),
                    now: $jex.date.format(SERVER_TIME),
                    ip: CLIENT_IP,
                    transfer: h
                });
            } catch (i) {}
        });
        $jex.event.binding(g, "close", function() {
            c.getSorter().close();
            c._track("close", b);
        });
        $jex.event.binding(g, "changeFilter", function(h, j, i) {
            $jex.event.trigger(c, "changeFilter", h, j, i);
        });
        this._cachelist[f] = g;
    }
    g.index = a;
    g.updateSource();
    this.append("", g, "");
    return g;
};
FlightListUI.prototype._track = function(b, a) {
    var c = this;
    var d = ["FL|T|"];
    switch (a.type) {
        case "oneway":
        case "compose":
            d.push("Ow|v", b, "|");
            break;
        case "transfer":
            d.push("Tf|v", b, "|");
            break;
        case "roundtrip":
            d.push("Tf|v", b, "|");
            break;
    }
    d.push("p", c.analyzer.currentPageIndex() + 1, "|");
    d.push($jex.array.indexOf(c.currentDataMap, a) + 1, "|");
    switch (a.type) {
        case "oneway":
        case "compose":
            d.push(a.code(), "|");
            break;
        case "transfer":
            d.push(a.firstTrip().code(), "-", a.secondTrip().code(), "|");
            break;
        case "roundtrip":
            d.push(a.firstTrip().code(), "+", a.secondTrip().code(), "|");
            break;
    }
    d.push(a.lowestPrice(), "|");
    var f = window.location.param();
    d.push(encodeURIComponent(f.searchDepartureAirport || f.fromCity), "-", encodeURIComponent(f.searchArrivalAirport || f.toCity), "|");
    d.push(f.searchDepartureTime || f.fromDate, "|");
    d.push($jex.date.format(SERVER_TIME), "|");
    switch (a.type) {
        case "oneway":
        case "compose":
            if (a.wrappers()) {
                d.push(a.wrappers().size());
            }
            break;
        case "transfer":
            d.push(a.firstTrip().wrappers().size() + a.secondTrip().wrappers().size());
            break;
        case "roundtrip":
            d.push(a.firstTrip().wrappers().size() + a.secondTrip().wrappers().size());
            break;
    }
    trackAction(d.join(""));
};
FlightListUI.prototype.setFirstFlight = function(a) {
    this.closeFirstFlight();
    var b;
    if (a.index != 0) {
        b = this._fuiListCache.slice(0);
        b.splice(a.index, 1);
        b.splice(0, 0, a);
        this._firstFlightUI = a;
    } else {
        b = this._fuiListCache;
    }
    $jex.event.trigger(this, "refreshed", b);
};
FlightListUI.prototype.closeFirstFlight = function() {
    if (!this._firstFlightUI) {
        return;
    }
    this._firstFlightUI.moveToHome();
    this._firstFlightUI = null;
};

function FilterListUI(a) {
    FilterListUI.superclass.constructor.call(this, a);
    this._type = "FilterListUI";
    this._filterConf = (a && a.filterConf) ? a.filterConf : {};
    this._list = new $jex.List();
    this._cacheItem = {};
}
$jex.extendClass(FilterListUI, XControl);
FilterListUI.prototype.addFilter = function(b) {
    if (!b || b.value === "") {
        return;
    }
    if (b.value == null) {
        var a = "___defaultvalue";
    } else {
        var a = b.catalog + "-" + b.value;
    } if (this._cacheItem[a]) {
        return;
    }
    this._cacheItem[a] = true;
    var c = this._list.get(b.catalog);
    if (!c) {
        c = new FilterUI(this._filterConf[b.catalog]);
        c.ownerList(this);
        this.bindEvent(c);
        this._list.put(b.catalog, c);
    } else {}
    c.addItem(b);
};
FilterListUI.prototype.bindEvent = function(b) {
    var a = this;
    $jex.event.binding(b, "changeFilter", function(c, d, h, i, g) {
        var f = {
            name: c,
            type: (a._filterConf[c] && a._filterConf[c].type) ? a._filterConf[c].type : 4,
            value: d
        };
        $jex.event.trigger(a, "changeFilter", f, c, d, h, i, g);
    });
};
FilterListUI.prototype.getFilterUI = function(a) {
    var b = this._list.get(a);
    return (b && b.visible()) ? b : false;
};
FilterListUI.prototype.appendFilter = function(b, c) {
    var d = c || {};
    var a = d.attr || "";
    this.append("<div ", b, ' class="item" ' + a + " ></div>");
};
FilterListUI.prototype.layout = function() {};
FilterListUI.prototype.update = function() {};
FilterListUI.prototype.refresh = function() {
    var a = this;
    $jex.foreach(this._list.keys(), function(b) {
        var c = a._list.get(b);
        if (c && c.visible()) {
            c.update();
            c.render(a.find(b));
            $jex.element.show(a.find(b));
            if (!c.firstRefresh) {
                $jex.event.trigger(a, "firstRefresh", c);
                c.firstRefresh = true;
            }
        } else {
            $jex.element.hide(a.find(b));
        }
    });
    this.layout();
};

function FilterUI(a) {
    FilterUI.superclass.constructor.call(this, a);
    this._type = "FilterUI";
    var d = null;
    this.ownerList = function(f) {
        if (f == null) {
            return d;
        } else {
            d = f;
        }
    };
    var c = null;
    this.catalog = function(f) {
        if (f == null) {
            return c;
        } else {
            c = f;
        }
    };
    var b = false;
    this.visible = function(f) {
        if (f == null) {
            return b;
        } else {
            b = f;
        }
    };
    this._groups = {};
    this._checkboxes = {};
    this._displayboxes = [];
}
$jex.extendClass(FilterUI, XControl);
FilterUI.prototype.defaultCheck = function() {
    return this._setting.defaultCheck || false;
};
FilterUI.prototype.allName = function() {
    var a = [];
    $jex.foreach(this._displayboxes, function(b) {
        a.push(b.dataSource().name);
    });
    return a;
};
FilterUI.prototype.clearFilter = function() {
    var a = this;
    $jex.foreach(this._displayboxes, function(b) {
        b.clearValue(a.defaultCheck());
    });
    $jex.event.trigger(a, "changeFilter", a.catalog(), a.getValue());
};
FilterUI.prototype.addItem = function(f) {
    var g = f;
    var b = this._groups;
    var c = g.group || "default";
    var a = g.catalog + "|" + c + "|" + g.value;
    this.catalog(g.catalog);
    if (!b[c]) {
        b[c] = [];
    }
    var d = this._checkboxes[a];
    if (!d) {
        d = new FilterCheckBoxUI();
        d.ownui(this);
        d.checked(this.defaultCheck());
        d.dataSource(g);
        d.updateSource();
        this.bindEvent(d);
        this._checkboxes[a] = d;
        b[c].push(d);
    }
    if (b[c].length > 1) {
        this.visible(true);
    }
};
FilterUI.prototype.bindEvent = function(b) {
    var a = this;
    $jex.event.binding(b, "changeCheckbox", function(d, f, c) {
        $jex.event.trigger(a, "changeFilter", a.catalog(), a.getValue(), d, f, c);
    });
};
FilterUI.prototype.getValue = function() {
    var a = [];
    $jex.foreach(this._displayboxes, function(c) {
        var b = c.getValue();
        if (b) {
            a.push(b);
        }
    });
    if (a.length == this._displayboxes.length) {
        a = [];
    }
    return a;
};
FilterUI.prototype.update = function() {
    this.clear();
    this._displayboxes = [];
    var a = this;
    this.text('<span class="flt_lab">', this.catalog(), "</span>");
    this.text('<span class="flt_sel">');
    $jex.foreach(this._groups, function(d, b, c) {
        if (d.length <= 1) {
            return $jex.$continue;
        }
        a.updateGroup(d);
    });
    this.text("</span>");
};
FilterUI.prototype.updateGroup = function(b) {
    var a = this;
    if (this._setting.sort) {
        var c = this._setting.sort;
        b.sort(function(f, d) {
            return c[f.dataSource().name] - c[d.dataSource().name];
        });
    }
    $jex.foreach(b, function(d) {
        a._displayboxes.push(d);
        d.update();
        a.append("", d);
    });
};

function FilterCheckBoxUI(c) {
    FilterCheckBoxUI.superclass.constructor.call(this, c);
    this._type = "FilterCheckBoxUI";
    var b = false;
    this.checked = function(d) {
        if (d == null) {
            return b;
        } else {
            b = d;
        }
    };
    var a = null;
    this.ownui = function(d) {
        if (d == null) {
            return a;
        } else {
            a = d;
        }
    };
}
$jex.extendClass(FilterCheckBoxUI, XControl);
FilterCheckBoxUI.prototype.getValue = function() {
    var a = this.find("chk");
    if (a.checked) {
        return a.value;
    } else {
        return "";
    }
};
FilterCheckBoxUI.prototype.clearValue = function(b) {
    this.checked(b);
    var a = this.find("chk");
    if (a) {
        a.checked = b;
    }
};
FilterCheckBoxUI.prototype.update = function(c) {
    var b = c || this.dataSource();
    this.clear();
    this.text(" <span>");
    this.append("<input ", "chk");
    this.text(' type="checkbox" value="', b.value, '"');
    if (this.checked()) {
        this.text(' checked="checked" ');
    }
    this.text(" />");
    this.tpls('<label for="{#chk}"><span>' + b.name + "</span></label>");
    this.text("</span>");
    var a = this;
    this.onInit(function() {
        var d = this.find("chk");
        $jex.event.binding(d, this, "click", function() {
            this.checked(d.checked);
            $jex.event.trigger(a, "changeCheckbox", this, this.dataSource().value, d.checked);
        });
    });
};

function DomesticOnewayFilterListUI(a) {
    DomesticOnewayFilterListUI.superclass.constructor.call(this, a);
    this._type = "DomesticOnewayFilterListUI";
}
$jex.extendClass(DomesticOnewayFilterListUI, FilterListUI);
DomesticOnewayFilterListUI.prototype.update = function() {
    this.clear();
    this.append("<div ", "moreFilter", ' class="m_flt_more" style="display:none;">');
    this.append("<a", "filterMoreTitle", ' onfocus="this.blur();" href="#">更多筛选条件<i class="ico_up"></i></a>');
    this.text("</div>");
    this.append("<div", "filter_panel", ' class="clrfix"></div>');
    this.append("<div", "filterMore", ' class="hide">');
    this.appendFilter("起飞时间", "m_sep2_1");
    this.appendFilter("方式", "m_sep2_1");
    this.appendFilter("起降机场", "m_sep2_1");
    this.appendFilter("机型", "m_sep2_1");
    this.appendFilter("航空公司", "m_sep_full");
    this.text("</div>");
    this.onInit(function() {
        var a = this;
        a.isMoreOpen = 0;
        $jex.event.binding(this.find("filterMoreTitle"), this, "click", function(b) {
            var c = this.find("filterMore");
            var d = this.find("filterMoreTitle");
            $jex.toggleClassName(c, "hide", function() {
                d.innerHTML = '更多筛选条件<i class="ico_up"></i>';
                a.isMoreOpen = 0;
                trackAction("FL|F|Mo|close");
            }, function() {
                d.innerHTML = '收起<i class="ico_down"></i>';
                a.isMoreOpen = 1;
                trackAction("FL|F|Mo|open");
            });
            $jex.stopEvent(b);
            $jex.event.trigger(a, "openMore");
        });
        $jex.event.binding($jex.$(this._setting.elemId), this, "click", function(d) {
            var f = typeof event != "undefined" ? event.srcElement : d.target;
            if (/input|label/i.test(f.tagName)) {
                var c = this.getCurCheckbox(f.id);
                if (c) {
                    var b = c.find("chk");
                    c.checked(b.checked);
                    $jex.event.trigger(c, "changeCheckbox", c, c.dataSource().value, b.checked);
                }
            }
        });
    });
};
DomesticOnewayFilterListUI.prototype.addFilter = function(b) {
    if (!b || b.value === "") {
        return;
    }
    if (b.value == null) {
        var a = "___defaultvalue";
    } else {
        var a = b.value;
    } if (this._cacheItem[a]) {
        return;
    }
    this._cacheItem[a] = true;
    var c = this._list.get(b.catalog);
    if (!c) {
        c = new OnewayFilterUI(this._filterConf[b.catalog]);
        c.ownerList(this);
        this.bindEvent(c);
        this._list.put(b.catalog, c);
    } else {}
    c.addItem(b);
};
DomesticOnewayFilterListUI.prototype.setCheckBoxCache = function(a, b) {
    if (!this._chkBox) {
        this._chkBox = {};
    }
    this._chkBox[a] = b;
};
DomesticOnewayFilterListUI.prototype.getCurCheckbox = function(a) {
    return this._chkBox && this._chkBox[a];
};
DomesticOnewayFilterListUI.prototype.appendFilter = function(b, a) {
    this.append("<div ", b, ' class="' + a + '"></div>');
};
DomesticOnewayFilterListUI.prototype.setTransformLoad = function() {
    this._isTransformLoad = true;
};
DomesticOnewayFilterListUI.prototype.layout = function() {
    var c = this;
    var b = this.find("filter_panel"),
        g = this.find("filterMore"),
        d = 0,
        h = false;
    var a = [];
    $jex.foreach(["起飞时间", "方式", "起降机场", "航空公司", "机型"], function(k, j) {
        if (c.getFilterUI(k)) {
            a.push(k);
        }
    });
    if (a.length == 0) {
        $jex.element.hide($jex.$(this._setting.elemId));
        return;
    }
    if (a[0] == "航空公司") {
        b.appendChild(this.find("航空公司"));
        if (a[1]) {
            h = true;
            g.appendChild(this.find("机型"));
        }
    } else {
        var f = this._isTransformLoad ? 1 : 0;
        $jex.foreach(a, function(k, j) {
            if (j <= f) {
                b.appendChild(c.find(k));
            } else {
                h = true;
                g.appendChild(c.find(k));
            }
        });
        if (this.getFilterUI("航空公司") && this.getFilterUI("机型")) {
            h = true;
            g.appendChild(this.find("航空公司"));
        }
    }
    $jex.element.show($jex.$(this._setting.elemId));
    $jex.element[h ? "show" : "hide"](this.find("moreFilter"));
};

function OnewayFilterCheckBoxUI(a) {
    OnewayFilterCheckBoxUI.superclass.constructor.call(this, a);
    this._type = "OnewayFilterCheckBoxUI";
}
$jex.extendClass(OnewayFilterCheckBoxUI, FilterCheckBoxUI);
OnewayFilterCheckBoxUI.prototype.update = function(c) {
    var b = c || this.dataSource();
    this.clear();
    var a = this.newid("chk");
    this.ownui().ownerList().setCheckBoxCache(a, this);
    this.text('<label for="' + a + '">');
    this.append("<input ", "chk");
    this.text(' type="checkbox" class="inp_chk" value="', b.value, '"');
    if (this.checked()) {
        this.text(' checked="checked" ');
    }
    this.text(" />" + b.name + "</label>");
};

function OnewayFilterUI(a) {
    OnewayFilterUI.superclass.constructor.call(this, a);
    this._type = "OnewayFilterUI";
}
$jex.extendClass(OnewayFilterUI, FilterUI);
OnewayFilterUI.prototype.addItem = function(f) {
    var g = f;
    var b = this._groups;
    var c = g.group || "default";
    var a = g.catalog + "|" + c + "|" + g.value;
    this.catalog(g.catalog);
    if (!b[c]) {
        b[c] = [];
    }
    var d = this._checkboxes[a];
    if (!d) {
        d = new OnewayFilterCheckBoxUI();
        d.ownui(this);
        d.checked(this.defaultCheck());
        d.dataSource(g);
        d.updateSource();
        this.bindEvent(d);
        this._checkboxes[a] = d;
        b[c].push(d);
    }
    if (b[c].length > 1) {
        this.visible(true);
    }
};
var HotSale = (function() {
    var b = {
        ps: "航班票量较少",
        hot: "一周内热门预订",
        lcc: "廉价航空公司不提供免费餐饮，免费携带的行李额度低，<br />详情咨询春秋航空：021-95524"
    };
    var d = -1,
        a = 100;
    var c = function(g, f) {
        var h = f.rate || 100;
        f.late = (h <= a && h < d);
    };
    return {
        init: function() {
            d = ConfigManager.getConfig("late");
        },
        hotSaleInfo: function(g) {
            var f = g.extInfo() || {}, h = {};
            $jex.foreach(["hot", "ps", "late", "lcc"], function(j, i) {
                if (i == 2) {
                    c(g, f);
                }
                if (i == 3 && (typeof f[j] == "undefined")) {
                    f[j] = g.carrierCode() == "9C";
                }
                if (f[j]) {
                    h[j] = b[j];
                    if (i == 2) {
                        h[j] = "航班易晚点，近三个月该航班准点率" + f.rate + "%";
                    }
                    return $jex.$break;
                }
            });
            return h;
        },
        setMinLate: function(g) {
            var f = g.extInfo() || {};
            f.rate = 100;
        }
    };
})();

function BookingLockScreenUI(a) {
    BookingLockScreenUI.superclass.constructor.call(this, a);
}
$jex.extendClass(BookingLockScreenUI, XControl);
BookingLockScreenUI.prototype.setEntity = function(a) {
    this.entity = a;
};
BookingLockScreenUI.prototype.preBooking = function(f, a) {
    this.bFunc = f;
    this._vpr = 0;
    var d = this.entity,
        c = (a === 1 && d.afeePrice()) ? d.afeePrice() : d.bprPrice(),
        g = typeof d.ownerFlight().priceInfo == "function" ? d.ownerFlight().priceInfo() : null;
    oprice = g ? g.op : Number.MAX_VALUE, attrs = [], carrierCode = d.ownerFlight().carrierCode();
    var b = d.typeOfCabin().indexOf("经济舱") > -1;
    if (d.isApplyPrice()) {
        attrs.push("app");
    } else {
        if (d.ownerFlight().type == "onewayInTransfer") {
            attrs.push("transfer");
        }
    } if (attrs.length > 0) {
        this.showDialog(attrs.join("+"));
    } else {
        f();
    }
};
BookingLockScreenUI.prototype.getMsgInfo = function(c) {
    var f = this._vpr || 0;
    var g = {
        app: {
            txt: "您所选购的是特殊机票产品，机票需要申请，申请成功后将短信通知您。"
        },
        transfer: {
            txt: ['您预订的是中转联程票，请确定各段价格都有效再付款。为了保证您的权益请阅读<a href="http://www.qunar.com/site/zh/Multi-city.shtml?', new Date().getTime(), '" target="_blank">《中转联程票购买须知》</a>。'].join("")
        }
    };
    var b = g[c],
        a = /app/.test(c),
        d = /transfer/.test(c);
    b.className = "icon_apply";
    if (a) {
        b.note = '<div class="note">说明：申请机票是指需要代理商向航空公司申请的机票，由于数量有限，代理商对是否申请成功不做承诺。</div>';
    } else {
        if (d) {
            b.className = "icon_transfer";
            b.note = '<div class="note">说明：先确认各段机票价格均有效才能付款，避免某一航班无法预定带来的已购买航班处理的麻烦；每段行程都需要单独缴纳机场建设费和燃油税。</div>';
        } else {
            b.note = "";
        }
    }
    return b;
};
BookingLockScreenUI.prototype.showDialog = function(d) {
    $jex.event.trigger(this, "open");
    this.type = d;
    this.addStyleHTML();
    if (window.BookingScreenUI) {
        BookingScreenUI.closeMySelf();
    }
    var g = this.getContainerID();
    var f = this.dlg;
    f.innerHTML = "";
    var b = [];
    var c = this.getMsgInfo(d);
    b.push('<div class="p_layer_cont">');
    b.push('    <div style="width:440px;" class="layer_inner"> <a id="', g, '_close" href="javascript:void(0);" title="关闭" class="btn_close"></a> ');
    b.push('        <div class="e_tit_pop"></div>');
    b.push('        <div class="layer_cont">');
    b.push('            <div class="b_warn_pop_l clrfix">');
    b.push('                <div class="e_warn_ico"> <i class="ico_del_l"></i></div>');
    b.push('                <div class="e_warn_inf"><h3>', c.txt, "</h3>");
    b.push("                </div>");
    b.push("                </div>");
    b.push('                <div class="b_submit_pop_l"><a id="', g, '_continue" href="javascript:void(0);" class="btn btn_primary"><span><b>继续预订</b></span></a><a id="', g, '_cancel" href="javascript:void(0);" class="btn"><span><b>取　消</b></span></a></div>');
    b.push('                <div class="e_note">', c.note, "</div>");
    b.push("            </div>");
    b.push("        </div>");
    b.push("    </div>");
    $jex.lightbox.show(b.join(""));
    var a = ["&type=", d, "&act=lock", "&wrid=", (this.vendor.wr || this.vendor.wrid), "&wrname=", encodeURIComponent(this.vendor.name)];
    trackAction(a.join(""));
};
BookingLockScreenUI.prototype.setVendorInfo = function(b, a) {
    a.wr = b;
    this.vendor = a;
};
BookingLockScreenUI.prototype.closeDialog = function(c) {
    var b = c.target;
    while (b != document) {
        if (b.id == this.getContainerID() + "_close") {
            $jex.lightbox.hide();
            return;
        }
        if (b.id == this.getContainerID() + "_cancel") {
            $jex.lightbox.hide();
            var a = ["&type=", this.type, "&act=cancel", "&wrid=", this.vendor.wr || this.vendor.wrid, "&wrname=", encodeURIComponent(this.vendor.name)];
            trackAction(a.join(""));
            return;
        }
        if (b.id == this.getContainerID() + "_continue") {
            $jex.lightbox.hide();
            this.bFunc(this._vpr);
            var a = ["&type=", this.type, "&act=continue", "&wrid=", this.vendor.wr || this.vendor.wrid, "&wrname=", encodeURIComponent(this.vendor.name)];
            trackAction(a.join(""));
            return;
        }
        if (b.className == "lb_content") {
            return;
        }
        b = b.parentNode;
    }
    $jex.lightbox.hide();
    return;
};
BookingLockScreenUI.prototype.close = function() {};
BookingLockScreenUI.closeMySelf = function() {};
BookingLockScreenUI.prototype.addStyleHTML = function() {
    if (this.__ApplyScreenUI_addstyle == true) {
        return;
    }
    var a = document.createElement("div");
    a.id = this.getContainerID();
    a.style.position = "absolute";
    a.style.zIndex = "999999";
    a.style.width = "450px";
    a.style.height = "231px";
    document.getElementsByTagName("body")[0].appendChild(a);
    this.dlg = a;
    this.clickBind(this.closeDialog);
    this.__ApplyScreenUI_addstyle = true;
};
BookingLockScreenUI.prototype.getContainerID = function() {
    if (!this.containerID) {
        this.containerID = "__apply_screen_dialog_container__" + Math.floor(Math.random() * 1000000);
    }
    return this.containerID;
};
BookingLockScreenUI.prototype.clickBind = function(d) {
    var b = document;
    var c = this;
    var a = function(f) {
        if (!f.target) {
            f.target = f.srcElement;
        }
        d.call(c, f, this);
    };
    if (b.addEventListener) {
        b.addEventListener("click", a, false);
    } else {
        if (b.attachEvent) {
            b.attachEvent("onclick", a);
        }
    }
};
BookingLockScreenUI.prototype.openMark = function() {};
BookingLockScreenUI.prototype.closeMark = function() {};

function OnewayFlightUI(a) {
    OnewayFlightUI.superclass.constructor.call(this, a);
    this._type = "OnewayFlightUI";
    if (ConfigManager.getConfig("pageId") == "onewayDetail") {
        this._state = 1;
    }
}
$jex.extendClass(OnewayFlightUI, FlightUI);
OnewayFlightUI.prototype.getRwstat = function() {
    return new RcmdWrStatProvider();
};
OnewayFlightUI.prototype.avlistui = function() {
    if (!this._avlistui) {
        this._avlistui = new AVFlightVendorListUI();
        this._avlistui.owner(this);
    }
    return this._avlistui;
};
OnewayFlightUI.prototype.listui = function() {
    if (!this._listui) {
        this._listui = new OnewayFlightVendorListUI();
        this._listui.owner(this);
    }
    return this._listui;
};
OnewayFlightUI.prototype._getStaticUI = function(b) {
    var c = [],
        d = b;
    c.push('<div class="c0">');
    c.push('<div class="a_logo"><img width="16" height="16" title="', d.carrier().full, '" alt="', d.carrier().full, '" src="http://source.qunar.com/site/images/airlines/small/', d.carrier().key, '.gif"></div>');
    c.push("</div>");
    c.push('<div class="c1">');
    var a = FlightUtil.codePatch(d.code());
    c.push('    <div class="a_name">', d.carrier().zh, a.indexOf("/") > 0 ? "<br/>" : "", "<strong>", a, "</strong></div>");
    c.push('    <div class="a_model">', d.plane().full);
    c.push('<span class="lnk_sta">');
    if (d.stopover()) {
        c.push('<em title="该航班是经停航班" class="lnk_a">经停</em>');
    }
    var g = d.codeShare(),
        f = d.codeShareFlight();
    if (g && f) {
        c.push('<em title="实际乘坐航班：', f.carrier().zh, g, '" class="lnk_a">共享</em>');
    }
    c.push("</span>");
    c.push("</div>");
    c.push("</div>");
    c.push('<div class="c2">');
    c.push('    <div class="a_tm_dep">', d.deptTime(), "</div>");
    c.push('    <div class="a_tm_arv">', d.arriTime());
    if (d.isNextDate()) {
        c.push('<i class="i_1day" title="到达时间为第2天：', d.arriDate(), '"></i>');
    }
    c.push("</div>");
    c.push("</div>");
    c.push('<div class="c3">');
    c.push('    <div class="a_lacal_dep">', d.deptAirport().ab, d.dptTower(), "</div>");
    c.push('    <div class="a_local_arv">', d.arriAirport().ab, d.arrTower(), "</div>");
    c.push("</div>");
    c.push('<div class="c4">', d.quasipointRateHTML(), "</div>");
    this._html = c.join("");
    return this._html;
};
OnewayFlightUI.prototype.update = function(a) {
    var b = a;
    this.entity = b;
    this.clear();
    this._homeNode = null;
    this.append("<div", "itemBar", ' class="avt_column');
    if (this.state()) {
        this.text(" avt_column_on ");
    }
    this.text('">');
    this.text('<div class="b_avt_lst">');
    this.text(this._getStaticUI(b));
    this.append("<div", "recommandWrapper", 'class="c5">');
    this.insert_recommandWrapper(b);
    this.text("</div>");
    this.append("<div", "lowPrice", ' class="c6">');
    this.text(this.getPriceInfoHTML(b));
    this.text("</div>");
    this.text('<div class="c7">');
    this.insertSaleAndCabin(b);
    this.text("</div>");
    this.insertBookingBtn(b);
    this.insert_recommandZyf(b);
    this.text("</div>");
    this.updateVendors(a);
    this.text("</div>");
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
OnewayFlightUI.prototype.updateLowestPrice = function() {
    this.find("lowPrice").innerHTML = this.getPriceInfoHTML(this.entity);
};
OnewayFlightUI.prototype.getPriceInfoHTML = function(c) {
    var b = c.lowestPrice();
    if (b && b == this._lastPrice) {
        return this._lastPriceHTML;
    }
    this._lastPrice = b;
    var a = [];
    if (b) {
        a.push('<div class="a_low_prc">', Price_html.getHTML(b), '<i class="rmb">¥</i></div>');
        a.push('<div class="a_low_dsc">', PriceUtil.getOneWayDiscount(c.lowestDiscount()), "</div>");
    } else {
        a.push('<div class="nopr"><div>暂无报价</div></div>');
    }
    this._lastPriceHTML = a.join("");
    return this._lastPriceHTML;
};
OnewayFlightUI.prototype.insertSaleAndCabin = (function() {
    var c = ["hot", "ps", "late", "lcc"],
        a = ["i_org_hot", "i_org_hot", "dot_gy", "dot_gy"],
        b = ["热门", "票少", "易晚点", "廉航!"];
    return function(j) {
        var k = !this._sinfoHTML;
        if (!this.sinfoCache) {
            var h = HotSale.hotSaleInfo(j),
                f = [];
            this.sinfoCache = h;
            for (var d = 0; d < 4; d++) {
                if (h[c[d]]) {
                    f.push('<div class="a_pct">');
                    if ($jex.ie == 6) {
                        f.push('<i class="', a[d], '" title="', h[c[d]], '">', b[d], "</i>");
                    } else {
                        f.push('<i class="', a[d], '">', b[d], "</i>");
                        f.push(this._getTipHTML(h[c[d]]));
                    }
                    f.push("</div>");
                    k = false;
                    break;
                }
            }
            this._sinfoHTML = f.join("");
        }
        if (this._sinfoHTML) {
            this.text(this._sinfoHTML);
        }
        if (!j.isAV()) {
            var g = j.priceInfo();
            if (g && g.tc) {
                if (~g.tc.indexOf("头等")) {
                    k = false;
                    this.text('<div class="t_st"><i class="i_fst_cls">头等舱</i></div>');
                } else {
                    if (~g.tc.indexOf("公务")) {
                        k = false;
                        this.text('<div class="t_st"><i class="i_fst_bsn">商务舱</i></div>');
                    }
                }
            }
        }
        if (k) {
            this.text("&nbsp");
        }
    };
})();
OnewayFlightUI.prototype._getTipHTML = function(a) {
    return ['<div class="p_tips_cont"><div class="p_tips_wrap"> <div class="p_tips_arr p_tips_arr_t"> <p class="arr_o">◆</p><p class="arr_i">◆</p></div> <div class="p_tips_content"> <p>', a, "</p> </div> </div> </div>"].join("");
};
OnewayFlightUI.prototype.insertBookingBtn = function(a) {
    var b = a;
    this.text('<div class="c8"><div class="a_booking">');
    if (b.lowestPrice()) {
        this.append("<a", "openwrapperbtn", ' data-evtDataId="' + this.newid("") + '"  hidefocus="on" onfocus="this.blur();" title="点击查看订票网站" href="#" class="btn_book"><span><b>订&nbsp;&nbsp;票</b></span></a>');
    } else {
        if (b.extInfo()) {
            this.append('<p class="c_vmore"><a', "openwrapperbtn", ' data-evtDataId="' + this.newid("") + '" onfocus="this.blur();"  href="#">详&nbsp;&nbsp;细</a></p>');
        }
    }
    this.text("</div></div>");
};
OnewayFlightUI.prototype.insert_recommandZyf = function(d) {
    var g = d;
    var c = g.commInfoMgr().get("zyfData") || [],
        j = g.flightInfoMgr(),
        i = "/zyf/?";

    function b(q, s, p) {
        var t = null;
        var u = g.lowestPrice();
        for (var o = 0, m = c.length; o < m; o++) {
            t = c[o];
            var n = parseInt(t.tPrice, 10);
            var k = n - u;
            if (t.airline === q && t.dpt === s && t.arr === p && k <= 0) {
                return t;
            }
        }
        return null;
    }
    var f = j.getZYFReference(g.code());
    if (!f && !j.getZYFAirlines(g.carrierCode())) {
        f = b(g.carrierCode(), g.deptAirportCode(), g.arriAirportCode());
    }
    if (f) {
        var h = !(g.lowestPrice() == null);
        var a = [i, "client=", f.client, "&policyId=" + (f.policyId || 0), "&price=", (h ? g.lowestPrice() : ""), "&dptDate=" + g.deptDate(), "&from=flightlist_", f.client].join("");
        this.text('<div class="c_zyf" data-carrier="', g.carrier().key, '">');
        this.append("<a", "js-zfy", "");
        this.text('target="_blank" href="', a, '">', f.text || "", "</a></div>");
        if (!j.getZYFReference(g.code())) {
            j.addZYFReference(g.code(), f);
        }
        if (!j.getZYFAirlines(g.carrierCode())) {
            j.addZYFAirlines(g.carrierCode(), 1);
        }
        this.onInit(function() {
            $jex.event.bind(this.find("js-zfy"), "click", function() {
                TsinghuaOneWayTracker.trackZFY(f, g);
            });
        });
    }
};
OnewayFlightUI.prototype.updateVendors = function(a) {
    this.append("<div", "vendorlist", "");
    if (!this.state()) {
        this.text(' style="display:none;" ');
    }
    this.text(">");
    var b = this.vendorListUI();
    if (this.state()) {
        b.dataSource(a);
        b.updateSource();
        this.append("", b, "");
    }
    this.text("</div>");
};
OnewayFlightUI.prototype.isAV = function() {
    return this.dataSource().isAV();
};
OnewayFlightUI.prototype.vendorListUI = function() {
    var a = this.isAV() ? this.avlistui() : this.listui();
    return a;
};
OnewayFlightUI.prototype.renderVendorPanel = function() {
    var a = this.vendorListUI();
    a.update(this.dataSource());
    a.render(this.find("vendorlist"));
};
OnewayFlightUI.prototype.changeWrapperTypeList = function(a) {
    if (this.state() == 0) {
        return;
    }
    PAGE_EVENT.trigger("wrapper_list_close", this.dataSource());
    this.dataSource().setWrapperListType(a);
    this._isUserClick = true;
    this.renderVendorPanel();
    this._isUserClick = false;
};
OnewayFlightUI.prototype.openBtnClickEvent = function() {
    var a = this;
    HoldLastShowFlight.clearLast();
    LockScreen(function() {
        SingletonUIManager.register("flight", a, function() {
            a.toggleVendorPanel();
        }, function() {
            a.hideVendorPanel();
        });
    });
};
OnewayFlightUI.prototype.toggleVendorPanel = function() {
    if (this.state() === 0) {
        System.service.genTraceTimeStamp();
        System.analyzer.triggerTrace = true;
        this.dataSource().setWrapperListType("all");
        this.showVendorPanel();
        $jex.event.trigger(this, "open");
    } else {
        this.hideVendorPanel();
    }
};
OnewayFlightUI.prototype.showVendorPanel = function() {
    this.moveToFirst();
    this.renderVendorPanel();
    $jex.addClassName(this.find("itemBar"), "avt_column_on");
    $jex.element.show(this.find("vendorlist"));
    this.state(1);
};
OnewayFlightUI.prototype.hideVendorPanel = function() {
    if (this.state() === 0) {
        return;
    }
    $jex.element.hide(this.find("vendorlist"));
    $jex.removeClassName(this.find("itemBar"), "avt_column_on");
    this.listui().reset();
    this.state(0);
    PAGE_EVENT.trigger("wrapper_list_close", this.dataSource());
    $jex.event.trigger(this, "close");
};
OnewayFlightUI.prototype.insert_recommandWrapper = function(c, j) {
    c = c || this.entity;
    var i = this;
    if (j) {
        this.clear();
    }
    if (!j && this.isAV()) {
        this.text("&nbsp;");
        return;
    }
    var g = this.reWrCache,
        k = c.getRecommandWrapper() || g;
    if (!k) {
        this.text("&nbsp;");
        return;
    }
    this.reWrCache = k;
    var b = k.entity,
        f = b.afeePrice() || b.bprPrice(),
        a = b.dataSource();
    var d = b.isADVendor() ? a.proPayName : a.proName;
    this.text('<p class="a_rtlst">');
    if (b.isOta()) {
        this.append("<span", "reCommOta");
        this.text(' class="sp_slvx"><i class="i_bns_tvl"></i></span>');
    }
    this.append('<a hidefocus="on" href="javascript:;" ', "reWrBtn", '  data-evtDataId="' + this.newid("") + '"  >');
    this.text(d, "</a></p>");
    this.text('<p class="a_rtlst">');
    this.append('<a hidefocus="on" href="javascript:;"', "reWrBtnXI0", '  data-evtDataId="' + this.newid("") + '"  >');
    this.text('<span class="rcpr"><i class="rmb">&yen;</i><b>', f, "</b></span>");
    if (b.dataSource().proBooking) {
        this.text("&nbsp;直接订");
    }
    this.text("</a></p>");
    if (b.isOta()) {
        this.append("<div", "reCommOtaTip", ' class="p_tips_cont" style="display:none;">');
        this.text('<div class="p_tips_wrap" style="left:-180px;">', '<div class="p_tips_arr p_tips_arr_t" style="left:235px;"><p class="arr_o">◆</p><p class="arr_i">◆</p></div>', '<div class="p_tips_content">', '<p>含"优"标签的机票提供高质量的服务保障：</p>', '<p>1.<span class="fb">出票迅速：</span>支付后3分钟内出票</p>', '<p>2.<span class="fb">报销无忧：</span>提供邮寄行程单（即', (b.parValue() + c.getAcf() + c.getFot()), "元的报销凭证）</p>", '<p>3.<span class="fb">服务优先：</span>尊享7*24小时的全天候服务</p>', "</div>", "</div>", "</div>");
        if (!j) {
            this.onInit(function() {
                this.onInit(function() {
                    h();
                });
            });
        }
    }
    if (j) {
        this.find("recommandWrapper").innerHTML = this.toString();
        if (b.isOta()) {
            h();
        }
    }

    function h() {
        var m = i.find("reCommOta");
        var l = i.find("reCommOtaTip");
        $jex.hover({
            act: m,
            onmouseover: function() {
                l.style.display = "block";
            },
            onmouseout: function() {
                l.style.display = "none";
            }
        });
    }
};
var RcmdWrStatProvider = function() {};
RcmdWrStatProvider.prototype.value = function() {
    return "000002";
};

function AVFlightVendorListUI(a) {
    AVFlightVendorListUI.superclass.constructor.call(this, a);
    this._type = "AVFlightVendorListUI";
    var b = null;
    this.owner = function(c) {
        if (c == null) {
            return b;
        } else {
            b = c;
        }
    };
    this.extui = new FlightInfoExtBarUI();
}
$jex.extendClass(AVFlightVendorListUI, XControl);
AVFlightVendorListUI.prototype.update = function(a) {
    this.clear();
    this.text('<div class="b_qvt_lst">');
    this.text('<div class="qvt_arr_t"><p class="arr_o"></p><p class="arr_i"></p></div>');
    this.extui.dataSource(a);
    this.extui.updateSource();
    this.text('<div class="c_fly">');
    this.append("", this.extui, "");
    this.text("</div>");
    this.text("</div>");
};

function OnewayFlightVendorListUI(a) {
    OnewayFlightVendorListUI.superclass.constructor.call(this, a);
    this._type = "OnewayFlightVendorListUI";
    var b = null;
    this.owner = function(d) {
        if (d == null) {
            return b;
        } else {
            b = d;
        }
    };
    var c = null;
    this.dataSource = function(d) {
        if (d == null) {
            return c;
        } else {
            c = d;
        }
    };
    this.extui = new FlightInfoExtBarUI();
    this.extui.wrapperList(this);
    this.wrlistUI = new OnewayFlightWrapperListUI();
    this.wrlistUI.ownerVendorListUI(this);
    this.mainWrlistUI = new OnewayFlightWrapperListUI();
    this.mainWrlistUI.ownerVendorListUI(this);
    this.mainWrlistUI.isMainFlight(true);
    UICacheManager.addToCache(this);
}
$jex.extendClass(OnewayFlightVendorListUI, XControl);
OnewayFlightVendorListUI.prototype.reset = function() {
    this.wrlistUI.resetInvokeData();
    this.mainWrlistUI.resetInvokeData();
};
OnewayFlightVendorListUI.prototype.update = function(c) {
    var h = c,
        f = h.codeShare(),
        d = h.codeShareFlight();
    h._shareFlight = null;
    if (f && d) {
        var g = h.carrierCode();
        var b = d.carrierCode();
        d.setWrapperListType(c.getWrapperListType());
        d._shareFlight = h;
        this.wrlistUI.applyShareCodeRule(g, b);
        var a = this.mainWrlistUI.applyShareCodeRule(g, b);
        if (a) {
            this.onInit(function() {
                $jex.element.show(this.find("hdivCS"));
            });
        }
    }
    this.clear();
    this.insertExtInfo(c);
    this.text('<div class="b_qvt_lst">');
    this.text('<div class="qvt_arr_t"><p class="arr_o">◆</p><p class="arr_i">◆</p></div>');
    this.insertVendorTypeChange(c);
    this.wrlistUI.dataSource(c);
    this.wrlistUI.updateSource();
    this.wrlistUI.placeHolder();
    this.wrlistUI.insert_footer(c);
    if (f && d) {
        this.append("<div ", "hdivCS", ' class="mainFlist" style="display:none;z-index:2;position: relative;">');
        this.text('<div class="qvt_col_more qvt_col_more_hover">该航班为代码共享航班，主飞航班为<span class="hl">', d.carrier().zh, f, "</span>，参考报价如下：</div>");
        this.mainWrlistUI.dataSource(h.codeShareFlight());
        this.mainWrlistUI.updateSource();
        this.mainWrlistUI.placeHolder();
        this.text("</div>");
    }
    this.text('<div class="qvt_col_hide">');
    this.append("<a ", "btnHide", '  data-evtDataId="' + this.newid("") + '" class="lnk_more lnk_more_hd"  href="##">隐藏报价<i class="ico_down"></i></a>');
    this.text("</div>");
    this.text("</div>");
    this.append("<div", "extAd_panel", ' class="extAD"></div>');
    this.onInit(function() {
        var i = this;
        clearTimeout(i._ad_timer);
        i._ad_timer = setTimeout(function() {
            var j = i.newid("extAd");
            var k = i.find("extAd_panel");
            if (k) {
                k.innerHTML = '<iframe id="' + j + '" querystring="chan=flight&pg=list&pos=mid&site=qunar&size=728x90" scrolling="no" frameborder="0" height="0" width="100%" src="/site/adframe/ad.html#' + j + '#now"></iframe>';
            }
        }, 100);
    });
};
OnewayFlightVendorListUI.prototype.insertExtInfo = function(a) {
    if (a.extInfo()) {
        this.extui.dataSource(a);
        this.extui.updateSource();
        this.text('<div class="c_fly">');
        this.append("", this.extui, "");
        this.text("</div>");
    }
};
OnewayFlightVendorListUI.prototype.updateLowerPriceShow = function(d, g) {
    var f = this.owner().newid("");
    var a = new UIObject();
    var b = d.getWrapperListType("all");
    var h = function(l, k, n, m) {
        a.append("<li ", "js_ctype-" + l, "");
        a.text('data-ctype="', l, '" data-evtDataId="' + f + '" ');
        a.text(b == l ? ' class="cur">' : ">", n);
        a.append("<span", "js-" + l + "_lpr", ">");
        a.text('(<a href="##" class="q_prc"><i class="rmb">¥</i>', k, "</a>起)");
        a.text("</span>", m ? "" : '<em class="sep_line">|</em>', "</li>");
    };
    a.text("<ul>");
    var c = [],
        i = [];
    $jex.foreach(["all", "s", "bf"], function(l) {
        var k = d.getLowpr(l);
        if (k) {
            c.push(l);
            i.push(k);
        }
    });
    this.tabsCache = {
        show: c,
        price: i,
        tab: b
    };
    var j = {
        all: "全部报价",
        s: "商旅优选",
        bf: "头等/商务舱"
    };
    $jex.foreach(c, function(l, k) {
        h(l, i[k], j[l], k == c.length - 1);
    });
    a.text("</ul>");
    if (g) {
        a.write(this.find("js-vType_wrap"));
    }
    return a;
};
OnewayFlightVendorListUI.prototype.insertVendorTypeChange = function(a) {
    this.append("<div ", "js-vType_wrap", ' class="e_qvt_hd">');
    if (a.priceInfo()) {
        var b = this.updateLowerPriceShow(a);
        b && this.append("", b, "");
    }
    this.text("</div>");
};

function WrapperListUI(b) {
    WrapperListUI.superclass.constructor.call(this, b);
    var a = null;
    this.ownerVendorListUI = function(c) {
        if (c == null) {
            return a;
        } else {
            a = c;
        }
    };
    this.placeHolderId = this.newid("wrlistPH");
    this._wrUIcache = {};
}
$jex.extendClass(WrapperListUI, XControl);
WrapperListUI.prototype.placeHolder = function() {
    var a = this.ownerVendorListUI();
    a.append("<div", this.placeHolderId, ' style="z-index:3;position: relative;">');
    a.append("", this, "</div>");
};
WrapperListUI.prototype.getHolder = function() {
    var a = this.ownerVendorListUI();
    return a.find(this.placeHolderId);
};
WrapperListUI.prototype.update = function(a) {
    this.updateSourceEntity(a);
};
WrapperListUI.prototype.filterWrappers = function(b, a) {
    return b;
};
WrapperListUI.prototype.getSortKey = function() {
    return this._sortType;
};
WrapperListUI.prototype.setSortKey = function(a) {
    return this._sortType = a;
};
WrapperListUI.prototype.flushRendor = function() {
    this.render(this.getHolder());
};
WrapperListUI.prototype.updateSourceEntity = function(g, a) {
    this.clear();
    clearTimeout(this._drawTimer);
    var q = this;
    var n = g.wrappers();
    n.update();
    var m = n.sort(this.getSortKey());
    m = q.filterWrappers(m, n, g);
    var o = 9;
    var l = Math.ceil(m.length / o);
    var f = 0,
        d = m.length,
        c = 0;
    var p = m.length + 100;
    this.firstIndex = p;
    this.zIndex = p;
    var b = false;
    var k = function(i) {
        if (!i) {
            q.clear();
        }
        var s = (c + 1) * o;
        for (; f < s && f < d; f++) {
            var j = n.get(m[f]);
            if (!j) {
                $jex.console.error("[WrapperListUI update] 找不到指定的wrapperEntity, key:", m[f], q);
                return $jex.$continue;
            }
            q._addWrapperUI(g, j, f);
        }
        if (!i) {
            q.render(q.find("js-wlist_" + c));
        }
        c++;
        b = c < l;
        if (!i && b) {
            q._drawTimer = setTimeout(function() {
                k();
            }, 10);
        }
    };
    clearTimeout(this._drawTimer);
    k(true);
    this._drawMoreWrapper = function() {
        if (b) {
            q._drawTimer = setTimeout(function() {
                k();
            }, 10);
        }
        this._drawMoreWrapper = null;
    };
    for (var h = 0; h < l; h++) {
        this.append('<div class="e_qvt_bd" ', "js-wlist_" + h, "></div>");
    }
    $jex.console.end("[WrapperListUI update] addwrappers");
    $jex.console.trace("[WrapperListUI update] addwrappers 个数：" + n.size());
    $jex.console.trace("[WrapperListUI update] addwrappers 传送个数：" + n._size);
    if (a) {
        this.onInit(function() {
            this.ownerVendorListUI().updateLowerPriceShow(g, true);
        });
    }
    this._traceWrappers(g);
};
WrapperListUI.prototype._traceWrappers = function(a) {
    TsinghuaOneWayTracker.trackWrappers(a);
};
WrapperListUI.prototype.eachWrappers = function(a) {
    $jex.foreach(this._wrUIcache, function(b) {
        a(b);
    });
};
WrapperListUI.prototype.createWrapperUI = function() {
    $jex.console.error("请替换该方法, WrapperListUI.prototype.createWrapperUI");
};
WrapperListUI.prototype._addWrapperUI = function(c, b, a) {
    var d = c.key() + "^" + b.key();
    var f = this._wrUIcache[d];
    if (!f) {
        f = this.createWrapperUI(c, b, a);
        f.ownerListUI(this);
        this._wrUIcache[d] = f;
    }
    if (f && f.stat && f.stat.position) {
        f.stat.position(a + 1);
    }
    f.updateSource(b);
    this.append("", this._wrUIcache[d], "");
};

function OnewayFlightWrapperListUI(b) {
    OnewayFlightWrapperListUI.superclass.constructor.call(this, b);
    this._type = "OnewayFlightWrapperListUI";
    var a = false;
    this.isMainFlight = function(c) {
        if (c == null) {
            return a;
        } else {
            a = c;
        }
    };
    this.invokeDataStatus = 0;
    this.enableShareCode = false;
    this.adVendorCount = 0;
    UICacheManager.addToCache(this);
}
$jex.extendClass(OnewayFlightWrapperListUI, WrapperListUI);
OnewayFlightWrapperListUI.prototype.updateSourceEntity = function(a) {
    OnewayFlightWrapperListUI.superclass.updateSourceEntity.call(this, a, !this.isMainFlight());
};
OnewayFlightWrapperListUI.prototype.resetInvokeData = function() {
    this.invokeDataStatus = 0;
};
OnewayFlightWrapperListUI.prototype.createWrapperUI = function(c, b, a) {
    if (c.type && c.type == "compose") {
        return new TransPackageFlightWrapperUI();
    } else {
        return new OnewayFlightWrapperUI();
    }
};
OnewayFlightWrapperListUI.prototype.getMaxCount = function(c) {
    var b = ConfigManager.getConfig("pageId") == "onewayDetail";
    if (b) {
        return 10000000;
    }
    var f = 18;
    var d = c.carrier();
    var a = d ? (d.maxvendors || f) : f;
    return a;
};
OnewayFlightWrapperListUI.prototype.insert_footer = function(b) {
    var f = b.getWrapperListType();
    var c = b.getLowpr(f),
        d = b.getHipr(f);
    var i = b.getWrlen(f),
        h = 0,
        a;
    var g = b.wrappers();
    if (g.wrapperLength) {
        h = g.wrapperLength();
        a = this.getMaxCount(b);
        if (h < a) {
            i = h;
        }
    }
    if (i > 1) {
        this.text('<div class="qvt_col_more qvt_col_more_hover">');
        this.append("<a ", "gotoDetail", 'data-evtdataid="' + this.newid("") + '" data-gotype= nowType  hidefocus="true" class="lnk_more" href="##">所有报价<i class="ico_arr_more"></i></a>');
        this.text("共有", i, "个代理商报价");
        if (c) {
            this.text("，报价");
            if (c != d) {
                this.text("范围 ");
            }
            this.text('<i class="rmb">&yen;</i>', c);
            if (d && c != d) {
                this.text(' ~ <i class="rmb">&yen;</i>', d);
            }
        }
        this.text("</div>");
    }
};
OnewayFlightWrapperListUI.prototype.getWrapperFormEntity = function(c) {
    var b = this,
        f = c.key();
    clearTimeout(this._drawTimer);
    clearTimeout(this._ladingTimer);
    this._drawMoreWrapper = null;
    var d = 0;
    var g = this.ownerVendorListUI().owner()._isUserClick;
    var a = this.ownerVendorListUI().owner()._openBtnClick;
    PAGE_EVENT.trigger("wrapper_list_open", c);
    c.getCurWrapperList({
        isUserClick: g,
        isMainFlight: this.isMainFlight(),
        loading: function() {
            d = (new Date()).valueOf();
            $jex.console.start("航班价格接口调用[" + f + "]");
            b.loadingPanel(c);
        },
        loadBack: function() {
            b.updateSourceEntity(c);
            if (c.getWrapperListType() == "all") {
                TsinghuaOneWayTracker.trackLowPrChange(c, 0);
            }
            var j = c.wrappers();
            if (j.wrapperLength() === 0) {
                TsinghuaOneWayTracker.noWrapperList(c);
            }
            c.lowestPrice(c.priceInfo().lowpr);
            b.ownerVendorListUI().owner().updateLowestPrice();
            b.ownerVendorListUI().owner().insert_recommandWrapper(undefined, true);
            $jex.event.trigger(PAGE_EVENT, "lowPriceChange");
            b.insert_footer(c);
            clearTimeout(b._ladingTimer);
            var h = (new Date()).valueOf() - d;
            var i = a ? 0 : 250;
            if (h < i) {
                b._ladingTimer = setTimeout(function() {
                    b.render(b.getHolder());
                    b._drawMoreWrapper && b._drawMoreWrapper();
                }, i - h);
            } else {
                b.render(b.getHolder());
                b._drawMoreWrapper && b._drawMoreWrapper();
            }
            $jex.console.end("航班价格接口调用[" + f + "]");
        },
        callBack: function() {
            $jex.console.start("航班价格缓存调用[" + f + "]");
            c.syncCurrentFlightCode();
            b.updateSourceEntity(c);
            b._drawMoreWrapper && b._drawMoreWrapper();
            $jex.console.end("航班价格缓存调用[" + f + "]");
        }
    });
};
OnewayFlightWrapperListUI.prototype.update = function(a) {
    this.clear();
    this.getWrapperFormEntity(a);
};
OnewayFlightWrapperListUI.prototype.applyShareCodeRule = function(b, a) {
    this.enableShareCode = true;
    if (this.isMainFlight()) {
        this.filterWrappers = OnewayFlightWrapperListUI.filterWrappers_mainCode;
    } else {
        this.filterWrappers = OnewayFlightWrapperListUI.filterWrappers_shareCode;
    }
    return this.enableShareCode;
};
OnewayFlightWrapperListUI.prototype.cancelShareCodeRule = function(b, a) {
    this.enableShareCode = false;
};
OnewayFlightWrapperListUI.prototype.loadingPanel = function(a) {
    this.text('<div class="qvt_loadding"><img style="text-align:center;" src="http://source.qunar.com/site/images/new_main/m_loading.gif" /></div>');
};
OnewayFlightWrapperListUI.filterWrappers_shareCode = function(f, d, c) {
    if (!this.enableShareCode) {
        return f;
    }
    if (ConfigManager.getConfig("pageId") == "onewayDetail") {
        return f;
    }
    var b = [];
    var a = ConfigManager.getConfig("OnewayListShareConfig", "shareCodeNum");
    $jex.foreach(f, function(h) {
        var g = d.get(h);
        if (!g.isNotWork()) {
            b.push(h);
            if (b.length === a) {
                return $jex.$break;
            }
        }
    });
    this._insertLowestPrice(c, b);
    return b;
};
OnewayFlightWrapperListUI.prototype._insertLowestPrice = function(a, b) {
    var d = a;
    var c = d.lowestWrapperIds()[0];
    var f = d.lowestBprWrapperIds()[0];
    this._pushLowestPrice(a, b, c);
    if (c === f) {
        return;
    }
    this._pushLowestPrice(a, b, f);
};
OnewayFlightWrapperListUI.prototype._pushLowestPrice = function(a, b, d) {
    var c = a;
    if ($jex.array.indexOf(b, d) < 0 && c.wrappers().get(d)) {
        b.push(d);
    }
};
OnewayFlightWrapperListUI.filterWrappers_mainCode = function(c, b) {
    if (ConfigManager.getConfig("pageId") == "onewayDetail") {
        return c;
    }
    var a = ConfigManager.getConfig("OnewayListShareConfig", "mainCodeNum");
    c = (a && a < c.length) ? c.slice(0, a) : c;
    return c;
};
OnewayFlightWrapperListUI.clearWrappers_notwork = function(d, c, b) {
    var a = [];
    $jex.foreach(d, function(g) {
        var f = c.get(g);
        if (!f.isNotWork()) {
            a.push(g);
        }
    });
    if (b) {
        a = a.slice(0, b);
    }
    return a;
};

function OnewayFlightWrapperUI(a) {
    OnewayFlightWrapperUI.superclass.constructor.call(this, a);
    this._type = "OnewayFlightWrapperUI";
    this.starUI = new OnewayStarRankUI();
    this.starUI.ownerWrapperUI(this);
    this._itemClass = "qvt_column";
    UICacheManager.addToCache(this);
}
$jex.extendClass(OnewayFlightWrapperUI, WrapperUI);
OnewayFlightWrapperUI.prototype.update = function(g) {
    var c = g;
    this.specWR = c.bigLogoUrl();
    var b = c.vendor().isSuperOTA();
    this.clear();
    this.bookingScreenUI.setVendorInfo(c.wrapperId(), c.vendor().dataSource());
    this.bookingLockScreenUI.setEntity(c);
    this.bookingLockScreenUI.setVendorInfo(c.wrapperId(), c.vendor().dataSource());
    this.insert_HEADER(c);
    var f = this.ownerListUI().zIndex,
        a = this.ownerListUI().firstIndex;
    this.append("<div", "flightbar", "");
    this.text(' data-evtDataId="', this.newid(""), '" class="', this._itemClass, a == f ? " qvt_column_first" : "", '" style="z-Index:', f, '" >');
    this.zIndex = this.ownerListUI().zIndex;
    this.ownerListUI().zIndex--;
    this._insertH3(g);
    this.text('<div class="v3">');
    if (c.isOta()) {
        this.insertOta(c);
    } else {
        this.insert_Services(c);
    }
    this.text("</div>");
    this.text('<div class="v4">');
    var d = 0;
    if (c.getTGQInfo()) {
        d = 1;
        this.append("<div", "js-stopClick", ' class="t_st" style="z-index:50;">');
        this.append('<span class="dot_gy"', "tgq", ">退改签</span>");
        this.insert_TGQ(c);
        this.text("</div>");
    }
    if (b && !c.isApplyPrice()) {
        d = 1;
        this.text('<div class="t_st" style="z-index:8;">');
        if ($jex.ie == 6) {
            this.text('<i title="提供足额行程单，推荐商旅用户使用。" class="i_bns_tvl">商旅优选</i>');
        } else {
            this.text('<i class="i_bns_tvl">商旅优选</i>');
            this.text(this._getTipHTML("提供足额行程单，推荐商旅用户使用。"));
        }
        this.text("</div>");
    }
    if (c.isFCabin()) {
        d = 1;
        this.text('<div class="t_st" style="z-index:6;"><i class="i_fst_cls">头等舱</i></div>');
    } else {
        if (c.isBCabin()) {
            d = 1;
            this.text('<div class="t_st" style="z-index:6;"><i class="i_fst_bsn">商务舱</i></div>');
        }
    } if (d === 0) {
        this.text("&nbsp");
    }
    this.insert_AirchinaCoupon(c);
    this.text("</div>");
    this.insert_PRICE(c);
    this.text('<div class="v7">');
    this.insert_BOOKING_BUTTON(c);
    this.text("</div>");
    this.text("</div>");
    this._bindHoverEvent(c);
    this._bindOnInitEvent(c);
};
OnewayFlightWrapperUI.prototype.insert_AirchinaCoupon = function(a) {
    var b = a;
    if (b.coupon() > 0 && (typeof a.vendor === "function" && a.vendor().rebateTye() !== "RM")) {
        this.text('<div class="t_ofc_sep" >');
        this.text('    <p class="direct_red">官网特惠直减', b.coupon(), "元</p>");
        this.text("</div>");
    }
};
OnewayFlightWrapperUI.prototype._getTipHTML = function(a) {
    return ['<div class="p_tips_cont"><div class="p_tips_wrap"> <div class="p_tips_arr p_tips_arr_t"> <p class="arr_o">◆</p> <p class="arr_i">◆</p> </div> <div class="p_tips_content"> <p>', a, "</p> </div> </div> </div>"].join("");
};
OnewayFlightWrapperUI.prototype._bindHoverEvent = function(b) {
    if ($jex.ie != 6) {
        return;
    }
    var a = b;
    this.onInit(function() {
        var c = this.find("flightbar");
        $jex.hover({
            act: c,
            onmouseover: function(d) {
                $jex.addClassName(c, "qvt_column_hover");
            },
            onmouseout: function(d) {
                $jex.removeClassName(c, "qvt_column_hover");
            }
        });
    });
};
OnewayFlightWrapperUI.prototype._bindOnInitEvent = function(b) {
    var a = b;
    this.onInit(function() {
        var f = this;
        f.loadedTgq = false;
        var d = this.find("tgq"),
            c = false;
        var h = a.getTGQInfo();

        function i() {
            var k = "/twell/flight/getTGQ.jsp";
            var n = a.ownerFlight();
            var m = f.find("tgq_notice");
            var l = "";
            $jex.jsonp(k, {
                flightNum: n.flightInfo().co,
                deptAirport: n.deptAirport().code,
                arrAirport: n.arriAirport().code,
                deptDate: n.deptDate().replace(/-/g, ""),
                printPrice: a.parValue(),
                wrapperId: a.wrapperId(),
                cabin: a.cabin(),
                policyId: a.pid(),
                maxSellPrice: Math.max(a.afeePrice(), a.bprPrice()),
                minSellPrice: Math.min(a.afeePrice() || Number.MAX_VALUE, a.bprPrice() || Number.MAX_VALUE),
                tag: a.tag()
            }, function(p) {
                f.loadedTgq = true;
                if (!p || (p && !p.tgqAdult)) {
                    m.innerHTML = h;
                    return;
                }
                l = p.tgqAdult;
                var o = g(p);
                m.innerHTML = o;
            }, {
                timeout: {
                    time: 2000,
                    func: function() {
                        if (!l) {
                            m.innerHTML = h;
                        }
                    }
                }
            });
        }

        function g(o) {
            var p = 0,
                u, t = o.tgqAdult,
                m = t.timePointCharges,
                s = [],
                k = [],
                x = [],
                n = null;
            var w = "",
                y = "",
                l = '<span class="f_thm"><i class="rmb">¥</i>',
                z = "/人</span>";
            var q = [];
            m && (u = m.length);
            if (t.viewType == 1 && u > 0) {
                t.adultTgq = {};
                for (; p < u; p++) {
                    n = m[p];
                    w = n.changeFee == -1 ? "不可改期" : l + n.changeFee + z;
                    y = n.returnFee == -1 ? "只退机建和燃油" : l + n.returnFee + z;
                    s.push("<p>", n.timeText, "</p>");
                    k.push("<p>", y, "</p>");
                    x.push("<p>", w, "</p>");
                }
                q.push('<table class="tbl_tgq_tip">', '<tr class="nw">', t.hasTime ? "<th>退改签时间点</th>" : "", "<th>退票扣费</th><th>改期加收手续费</th><th>签转</th></tr>", '<tr class="nw">');
                t.hasTime && q.push('     <td class="c1 nw">', s.join(""), "</td>");
                q.push('     <td class="c2 nw">', k.join(""), "</td>");
                q.push('     <td class="c3 nw">', x.join(""), "</td>");
                q.push('     <td class="c4 nw">', t.signText, "</td>");
                q.push("<tr>");
                q.push("</table>");
                q.push("<div>以上为成人退改签费用标准</div>");
            } else {
                if (t.tgqText) {
                    q.push(t.tgqText);
                    q.push("<br/><i>*</i>仅供参考,以订单标注的退改签规定为准。");
                }
            }
            return q.join("");
        }
        if (d) {
            var j = this.find("tgq_notice_panel");
            $jex.hover({
                act: d,
                extra: [this.find("tgq_notice_panel")],
                onmouseover: function(k) {
                    if (c) {
                        return;
                    }
                    if (a.pid() && !f.loadedTgq) {
                        i();
                    }
                    $jex.element.show(j);
                    c = true;
                },
                onmouseout: function(k) {
                    c = false;
                    $jex.element.hide(j);
                }
            });
        }
    });
};
OnewayFlightWrapperUI.prototype._insertH3 = function(c) {
    var a = c.vendor();
    var b = a.srv_ICON();
    this.text('<div class="v0">');
    if (b) {
        this.text('<i class="', b.key, '" title="', b.title, '">', b.text, "</i>");
    } else {
        this.text('<i class="ico_nocertify" title=""></i>');
    }
    this.text("</div>");
    if (c.bigLogoUrl()) {
        this._insertSpecWR(c);
    } else {
        if (c.isOta()) {
            this._insterOtaName(c);
        } else {
            this._insertH3Normal(c);
        }
    }
};
OnewayFlightWrapperUI.prototype._insertSpecWR = function(c) {
    var b = c;
    this.text('<div class="v_ofc">');
    this.text('<dl class="dl_ofc clrfix"><dt><img class="ofc_img" src="', b.bigLogoUrl(), '"/></dt>');
    var a = b.couponAdwords() ? b.couponAdwords() : b.vendor().adwords();
    this.text('<dd title="', a, '"><div class="f_txt">', FlightUtil.catAdtext(a, 30), "</div></dd>");
    this.text("</dl>");
    this.text('<div class="t_cmt">');
    this.starUI.displayPanel(b);
    this.text('<div class="e_btn_cmt">');
    this.starUI.insert_btn(b);
    this.text("</div>");
    this.text("</div>");
    this.text("</div>");
};
OnewayFlightWrapperUI.prototype._insterOtaName = function(f) {
    var d = f;
    var c = this.ownerListUI().ownerVendorListUI().owner().entity;
    var a = c.getAcf();
    var b = c.getFot();
    this.text('<div class="v_ofc">');
    this.text('<div class="t_name">', d.vendor().name(), "</div>");
    this.text('<div class="t_cmt">');
    this.text("7*24全天候服务；VIP专线退改签通道；支持报销凭证行程单邮寄，行程单金额：", (d.parValue() + a + b), "元");
    this.text("</div>");
    this.text("</div>");
};
OnewayFlightWrapperUI.prototype._insertH3Normal = function(b) {
    var a = b;
    this.text('<div class="v1">');
    this.text('<div class="t_name">', a.vendor().name());
    if (a.isTCabin()) {
        this.text('<i class="i_bns_thui">特惠</i>');
    }
    this.text("</div>");
    this.text('<div class="t_cmt">');
    this.starUI.displayPanel(a);
    this.text("</div>");
    this.text("</div>");
    this.text('<div class="v2"><div class="e_btn_cmt">');
    this.starUI.insert_btn(a);
    this.text("</div></div>");
};
OnewayFlightWrapperUI.prototype.insertOta = function(d) {
    var c = this.ownerListUI().ownerVendorListUI().owner().entity;
    var a = c.getAcf();
    var b = c.getFot();
    this.text('<div class="t_sv">');
    this.append("<span", "superOtaBtn", ' class="hv_dbt"><i class="ico_youxuan"><b>3</b>分钟出票</i></span>');
    this.append("<div", "superOtaTip", ' class="p_tips_cont">');
    this.text('<div class="p_tips_wrap" style="left:-210px">', '<div class="p_tips_arr p_tips_arr_t" style="left:235px;"><p class="arr_o">◆</p><p class="arr_i">◆</p></div>', '<div class="p_tips_content">', '<p>含"优"标签的机票提供高质量的服务保障：</p>', '<p>1.<span class="fb">出票迅速：</span>支付后3分钟内出票</p>', '<p>2.<span class="fb">报销无忧：</span>提供邮寄行程单（即', (d.parValue() + a + b), "元的报销凭证）</p>", '<p>3.<span class="fb">服务优先：</span>尊享7*24小时的全天候服务</p>', "</div>", "</div>", "</div>", "</div>");
    if ($jex.ie == 6) {
        this.onInit(function() {
            var g = this.find("superOtaBtn");
            var f = this.find("superOtaTip");
            $jex.hover({
                act: g,
                onmouseover: function() {
                    f.style.display = "block";
                },
                onmouseout: function() {
                    f.style.display = "none";
                }
            });
        });
    }
};
OnewayFlightWrapperUI.prototype.insert_Services = function(f) {
    var b = this;
    var d = f;
    var a = d.vendor();
    var c = [a.srv_ASSISTANT(), a.srv_ALLDAY()];
    $jex.foreach(c, function(g) {
        if (g) {
            if ($jex.ie == 6) {
                b.text('<div class="t_sv" ><span class="hv_dbt"', ' title="', g.title, '"><i class="', (g.key == "s9" ? "ico_dbt" : "ico_724"), '"></i>', g.desc, "</span></div>");
            } else {
                b.text('<div class="t_sv" ><span class="hv_dbt"><i class="', (g.key == "s9" ? "ico_dbt" : "ico_724"), '"></i>', g.desc, "</span>", b._getTipHTML(g.title), "</div>");
            }
        }
    });
};
OnewayFlightWrapperUI.prototype.insert_TGQ = function(b) {
    var a = b.getTGQInfo();
    this.append('<div class="p_tips_cont" ', "tgq_notice_panel", ">");
    this.text('<div class="p_tips_wrap" style="left:-160px"><div class="p_tips_arr p_tips_arr_t" style="left:170px"><p class="arr_o">◆</p><p class="arr_i">◆</p></div>');
    this.append('<div class="p_tips_content" ', "tgq_notice", " >");
    if (b.pid() == null) {
        this.text(a);
    } else {
        this.text('<img class="p_tips_tgq_img" src="http://source.qunar.com/site/images/new_main/m_loading.gif" />');
    }
    this.text("</div></div></div>");
};
OnewayFlightWrapperUI.prototype.insert_PRICE = function(a) {
    if (a.isNotWork()) {
        this.text('<div class="v5"><span class="noPrice">暂无报价</span></div><div class="v6">&nbsp;</div>');
    } else {
        this.insert_PRICE_NORMAL(a);
    }
};
OnewayFlightWrapperUI.prototype._disHTML = function(a) {
    this.text(PriceUtil.getOneWayDiscount(a.discount()));
};
OnewayFlightWrapperUI.prototype.priceHTML = function(b, a) {
    this.text('<div class="t_prc ', a, '">' + Price_html.getHTML(b) + '<i class="rmb">&yen;</i></div>');
};
OnewayFlightWrapperUI.prototype.insert_PRICE_NORMAL = function(a) {
    if (a.coupon() > 0 && a.bprPrice()) {
        this.insert_couponPrice(a);
    } else {
        this.insert_normalPrice(a);
    }
};
OnewayFlightWrapperUI.prototype.insert_normalPrice = function(a) {
    var d = a;
    var f = d.afeePrice(),
        b = d.bprPrice();
    f = parseInt(f);
    b = parseInt(b);
    this.text('<div class="v5">');
    if (f) {
        this.priceHTML(f);
    }
    if (b) {
        this.priceHTML(b);
    }
    if (!f || !b) {
        this.text("<div>");
        var c = this._getCuXiao(d);
        if (c) {
            this.text(c);
        } else {
            this._disHTML(d);
        }
        this.text("</div>");
    }
    this.text("</div>");
    this.text('<div class="v6"><div class="t_ins">');
    if (f) {
        this.text("+", d.afee(), "保险");
    } else {
        this.text("&nbsp;");
    }
    this.text("</div></div>");
};
OnewayFlightWrapperUI.prototype.insert_priceForReduction = function(a) {
    var c = a;
    var b = parseInt(c.bprPrice());
    this.text('<div class="v5">');
    this.priceHTML(b);
    this.priceHTML(b + c.coupon(), "t_prc_p");
    this.text('</div><div class="v6"><div class="t_jg_n">&nbsp;&nbsp;现价</div><div class="t_jg_p">&nbsp;&nbsp;原价</div></div>');
};
OnewayFlightWrapperUI.prototype.insert_priceForRM = function(b) {
    var d = b;
    var a = d.coupon();
    var c = parseInt(d.bprPrice());
    this.text('<div class="v5">');
    this.priceHTML(c);
    this._disHTML(d);
    this.text('</div><div class="v6"><div class="t_fanb"><i class="i_fan">返</i><span class="m_fan">&yen;' + a + "</span></div></div>");
};
OnewayFlightWrapperUI.prototype.insert_couponPrice = function(a) {
    var b = a;
    var c = b.vendor();
    if (c && c.rebateTye() === "RM") {
        this.insert_priceForRM(a);
    } else {
        this.insert_priceForReduction(a);
    }
};
OnewayFlightWrapperUI.prototype._getCuXiao = function(d) {
    var b = ConfigManager.getConfig("CuxiaoConfig");
    var a = d.wrapperId();
    var c = b[a];
    return c && c.text || "";
};
OnewayFlightWrapperUI.prototype._buttonHTML = function(d, f, g) {
    var a = "";
    var c = this.bookingScreenUI;
    var b = d === "bpr" ? f.bpackagePrice() : f.packagePrice();
    if (f.isApplyPrice() && b > 0) {
        a = "申请套餐";
    } else {
        if (f.isApplyPrice()) {
            a = "申 请";
        } else {
            if (b > 0) {
                a = "预订套餐";
            } else {
                a = f.bigLogoUrl() ? "预 订" : c.getButtonMsg("预 订");
            }
        }
    }
    this.text('<div class="t_bk">');
    if (g) {
        this.append("<a", g, ' data-evtDataId="' + this.newid("") + '" class="btn_book_org" href="#"><span><b>' + a + "</b></span></a>");
    } else {
        this.text('<a class="btn_book_org" href="#"><span><b>' + a + "</b></span></a>");
    }
    this.text("</div>");
};
OnewayFlightWrapperUI.prototype.insert_Working_BUTTON = function(b) {
    var c = b.afeePrice(),
        a = b.bprPrice();
    c = parseInt(c);
    a = parseInt(a);
    if (c) {
        this._buttonHTML("pr", b, "btnBook");
    }
    if (a) {
        this._buttonHTML("bpr", b);
    }
    if (!c || !a) {
        this.text('<div class="ut">', this.insert_UPDATETIME(b), "</div>");
    }
};
OnewayFlightWrapperUI.prototype.insert_notWorking_BUTTON = function(b) {
    var a = this.bookingScreenUI.getButtonMsg("预 订");
    this.text('<div class="t_bk">');
    this.text('<a class="btn_book_org" href="#"><span><b>' + a + "</b></span></a>");
    this.text("</div>");
    this.text('<div class="ut">', this.insert_UPDATETIME(b), "</div>");
};
OnewayFlightWrapperUI.prototype.insert_BOOKING_BUTTON = function(a) {
    if (a.isNotWork()) {
        this.insert_notWorking_BUTTON(a);
    } else {
        this.insert_Working_BUTTON(a);
    }
};
$jex.register("OnewayFlightWrapperUI", OnewayFlightWrapperUI);

function HistoryPriceUI(b) {
    HistoryPriceUI.superclass.constructor.call(this, b);
    this._type = "HistoryPriceUI";
    var a = 0;
    this.state = function(c) {
        if (c == null) {
            return a;
        } else {
            a = c;
        }
    };
}
$jex.extendClass(HistoryPriceUI, XControl);
$jex.register("HistoryPriceUI", HistoryPriceUI);
HistoryPriceUI.prototype.update = function(a) {
    var b = a.flightHistory();
    if (!b || b.length != 2 || !b[0] || !b[1] || !a.lowestPrice()) {
        this.state(0);
        return;
    } else {
        this.state(1);
    }
    this.clear();
    this.append('<span class="y_pt" ', "hlbar");
    this.text(">", this.description(a), "</span>");
    this.onInit(function() {
        $jex.event.binding(this.find("hlbar"), this, "mouseover", function(c) {
            HistoryPriceUI.historyPrice.show(c, this.dataSource());
        });
        $jex.event.binding(this.find("hlbar"), this, "mousemove", function(c) {
            HistoryPriceUI.historyPrice.move(c);
        });
    });
};
HistoryPriceUI.prototype.description = function(a) {
    var b = HistoryPriceUI.AvgPriceIcon(a.flightHistory(), a.lowestPrice());
    return b.msg;
};
HistoryPriceUI.languageVars = {
    _HISTORYPRICE: {
        arrow: ["大幅上涨", "小幅上涨", "稳定波动", "小幅下跌", "大幅下跌"],
        noinfo: "暂无走势",
        title: "走势",
        template: ["过去7天最低报价", "出发", "* 仅供参考", "近期："]
    }
};
HistoryPriceUI.AvgPriceIcon = function(j, a) {
    if (j == null) {
        return "";
    }
    var d = HistoryPriceUI.languageVars;
    var f = parseFloat(j[1]);
    var g = parseInt(a);
    var i = "http://source.qunar.com/flighthistory/icons/";
    var b = "";
    var h = "";
    var c = "";
    if (g >= f * 1.3) {
        h = "icon_history_0.gif";
        c = d._HISTORYPRICE.arrow[0];
        b = "up";
    }
    if (g > f * 1.05 && g < f * 1.3) {
        h = "icon_history_1.gif";
        c = d._HISTORYPRICE.arrow[1];
        b = "up";
    }
    if (g <= f * 1.05 && g >= f * 0.95) {
        h = "icon_history_2.gif";
        c = d._HISTORYPRICE.arrow[2];
        b = "normal";
    }
    if (g < f * 0.95 && g > f * 0.7) {
        h = "icon_history_3.gif";
        c = d._HISTORYPRICE.arrow[3];
        b = "down";
    }
    if (g <= f * 0.7) {
        h = "icon_history_4.gif";
        c = d._HISTORYPRICE.arrow[4];
        b = "down";
    }
    return {
        msg: c,
        img: "<img src='" + i + h + "' />",
        level: b
    };
};
HistoryPriceUI.historyPrice = new function() {
    var a = this;
    this.getPricePx = function(d) {
        var c = 62;
        var h = 14;
        var b = 76;
        var g = this.pricerange;
        var f = d - g.lowestPrice;
        if (f < 0) {
            return b;
        }
        if (f > g.highestPrice - g.lowestPrice) {
            return 0;
        }
        var i = (g.highestPrice - g.lowestPrice) / Math.abs(h - c);
        return c - ((d - g.lowestPrice) / i);
    };
    this.praseHistory = function(f) {
        if (!f) {
            return null;
        }
        var c = f[1];
        var d = f[0].split("|");
        var g = parseInt(d[0], 10);
        var b = parseInt(d[2], 10);
        this.pricerange = {
            highestPrice: g,
            lowestPrice: b,
            sevendaysAvgPrice: c
        };
        return this.pricerange;
    };
    this.showed = false;
    this.show = function(q, h) {
        var i = HistoryPriceUI.languageVars;
        var s = h.flightInfo();
        var m = QunarDate.format(SERVER_TIME);
        var g = s.dd;
        var j = h.deptCity().en.toUpperCase();
        var l = h.arriCity().en.toUpperCase();
        var c = s.co;
        var o = g + j + l + c;
        var f = "";
        var p = this.praseHistory(h.flightHistory());
        var f = "http://source.qunar.com/flighthistory/pics/";
        var b = HistoryPriceUI.AvgPriceIcon(h.flightHistory(), h.lowestPrice());
        var k = {
            code: c,
            deptcitycn: h.deptCity().zh,
            arricitycn: h.arriCity().zh,
            deptdate: g,
            imageurl: o,
            pointleft: 0,
            pointtop: this.getPricePx(h.lowestPrice()) - 6
        };
        var n = ['<div class="innerBody"><div class="arrow"><p class="arr_o">◆</p><p class="arr_i">◆</p></div>', "<h5><em>", k.code, "</em> <span>", i._HISTORYPRICE.template[0], " (", i._HISTORYPRICE.template[3], b.msg, ")</span></h5>", '<p class="info"><span>', k.deptcitycn, "</span>-<span>", k.arricitycn, "</span> <span>", k.deptdate, " ", i._HISTORYPRICE.template[1], "</span>	</p>", '<div class="img"><div style="width:250px; height:108px; background-image:url(', f, k.imageurl, ".gif?", QunarDate.format(SERVER_TIME).replace(/-/g, ""), ')">', '<div class="redline" style="left:', k.pointleft, "px; top:", k.pointtop, 'px;"></div>', '</div></div><p class="note">', i._HISTORYPRICE.template[2], "</p></div>"].join("");
        $jex.$("Lw_historyprice").innerHTML = n;
        this.showed = true;
        this.move(q);
        $jex.$("Lw_historyprice").style.visibility = "visible";
        $jex.stopEvent(q);
        return false;
    };
    this.move = function(b) {
        if (this.showed == false) {
            return;
        }
        if (!b) {
            b = window.event;
        }
        var d = $jex.pointerX(b) + 40;
        var c = $jex.pointerY(b) - 45;
        $jex.$("Lw_historyprice").style.left = d + "px";
        $jex.$("Lw_historyprice").style.top = c + "px";
        $jex.stopEvent(b);
        return false;
    };
    this.hide = function() {
        if (this.showed == false) {
            return;
        }
        $jex.$("Lw_historyprice").style.visibility = "hidden";
        this.showed = false;
    };
    $jex.event.binding(document, "mouseover", function() {
        a.hide();
    });
};

function FlightInfoExtBarUI(b) {
    FlightInfoExtBarUI.superclass.constructor.call(this, b);
    this._type = "FlightInfoExtBarUI";
    this.hpUI = new HistoryPriceUI();
    var a = null;
    this.wrapperList = function(c) {
        if (c == null) {
            return a;
        } else {
            a = c;
        }
    };
}
$jex.extendClass(FlightInfoExtBarUI, XControl);
FlightInfoExtBarUI.prototype.update = function(b) {
    this.clear();
    var a = b.extInfo();
    this.text('<div id="hdivSort" class="hdivSort"></div>');
    var d = [];
    if (a) {
        if (a.fdt) {
            d.push("飞行" + a.fdt);
        }
        var c = a.acf && parseInt(a.acf, 10) || 0;
        if (a.fot || c) {
            d.push(["机建/燃油：", '<span class="y_prc"><i class="rmb">&yen;</i>', c, "</span>", '&nbsp;/&nbsp;<span class="y_prc"><i class="rmb">&yen;</i>', a.fot, "</span>"].join(""));
        }
        d.push(a.ml == "true" ? "有餐食" : "无餐食");
        d.push(a.zj && a.zj.info != "" ? "有网上值机" : "无网上值机");
    }
    this.text('<div class="c_fly_info">');
    this.text(d.join('<em class="sep_line">|</em>'));
    this.hpUI.dataSource(b);
    this.hpUI.updateSource();
    if (this.hpUI.state()) {
        if (d.length > 0) {
            this.text('<em class="sep_line">|</em>');
        }
        this.append("近期价格走势：", this.hpUI);
    }
    this.text("</div>");
    if (ConfigManager.getConfig("pageId") !== "onewayDetail" || !this.wrapperList()) {
        return;
    }
    this.onInit(function() {
        var h = this;
        var g = h.wrapperList().wrlistUI;
        var i = h.wrapperList().mainWrlistUI;
        var l = h.wrapperList().wrlistUI.dataSource();
        var k = true;
        var m = false;
        var f = false;
        $jex.console.trace("当前排序值", g.getSortKey());
        switch (g.getSortKey()) {
            case "default":
                k = true;
                break;
            case "priceDesc":
                m = true;
                break;
            case "priceAsc":
                f = true;
                break;
            default:
                k = true;
                break;
        }
        $jex.console.trace("各排序值状态", k, m, f);
        var j = new XSelect({
            elemId: "hdivSort",
            initFire: false,
            values: [{
                value: "defalut",
                name: "默认排序",
                selected: k
            }, {
                value: "priceDesc",
                name: "价格由低到高",
                selected: m
            }, {
                value: "priceAsc",
                name: "价格由高到低",
                selected: f
            }],
            on: {
                changeValue: function(n) {
                    g.setSortKey(n.value);
                    g.update(l);
                    g.flushRendor();
                    if (l.codeShare() && l.codeShareFlight()) {
                        i.setSortKey(n.value);
                        i.update(l.codeShareFlight());
                        i.flushRendor();
                    }
                    trackAction("FD|S|" + n.value);
                }
            }
        });
        j.update();
        j.render();
    });
};
var BookingScreenUI = function() {
    this.vendor = null;
};
BookingScreenUI.prototype.setVendorInfo = function(b, a) {
    var c = BookingScreenUI.adjustOption;
    if (c.allBusy === true && c.isTimeRange()) {
        a.status = 2;
    }
    if (c.allNoWork === true && c.isTimeRange()) {
        a.status = 1;
    }
    a.wr = b;
    this.vendor = a;
};
BookingScreenUI.adjustOption = {
    allBusy: false,
    allNoWork: false,
    isTimeRange: function() {
        return false;
    },
    allBusyTips: function() {
        return "";
    },
    allNoWorkTips: function() {
        return "";
    }
};
BookingScreenUI.prototype.getTimeDesc = function(c) {
    var b = c;
    if (b > 60) {
        var d = Math.floor(b / 60);
        var a = b % 60;
        return d + "小时" + a + "分钟";
    } else {
        if (b < 5) {
            return "5分钟";
        } else {
            return b + "分钟";
        }
    }
};
BookingScreenUI.prototype.isBusy = function() {
    return this.vendor.status == 2;
};
BookingScreenUI.prototype.isNowork = function() {
    return this.vendor.status == 1;
};
BookingScreenUI.prototype.getButtonTips = function(b) {
    var f = BookingScreenUI.adjustOption;
    switch (this.vendor.status) {
        case 0:
            return b || "";
        case 1:
            var a = "目前为代理商非工作时间，不提供出票服务";
            if (f.allNoWork === true && f.isTimeRange()) {
                a = f.allNoWorkTips() || a;
            }
            return a;
        case 2:
            var a = "";
            var d = "目前代理商业务繁忙，暂时无法提供服务，";
            var c = this.vendor.bzt || "";
            if (!c) {
                a = d + "请稍候再来预订";
            } else {
                a = d + "请在" + this.getTimeDesc(c) + "后再来预订";
            } if (f.allBusy === true && f.isTimeRange()) {
                a = f.allBusyTips() || a;
            }
            break;
    }
    return "";
};
BookingScreenUI.prototype.getButtonMsg = function(a) {
    switch (this.vendor.status) {
        case 0:
            return a || "";
        case 1:
            return "暂停服务";
        case 2:
            return "繁忙中";
    }
    return "";
};
BookingScreenUI.prototype.getStatusMsg = function(a) {
    switch (this.vendor.status) {
        case 0:
            return a || "";
        case 1:
            return "不在工作时间";
        case 2:
            return "请稍后预订";
    }
    return "";
};
BookingScreenUI.prototype.preBooking = function(a) {
    switch (this.vendor.status) {
        case 0:
            this.processBooking(a);
            break;
        case 1:
            this.showDialog("nonwork", a);
            break;
        case 2:
            this.showDialog("busy", a);
            break;
    }
};
BookingScreenUI.prototype.getDialogMsg = function() {
    switch (this.vendor.status) {
        case 1:
            return "为非工作时间，暂时无法提供服务。";
        case 2:
            var b = "业务繁忙，暂时无法提供服务，";
            var a = this.vendor.bzt || "";
            if (!a) {
                return b + "请稍候再来预订，";
            } else {
                return b + "请在" + this.getTimeDesc(a) + "后再来预订，";
            }
            break;
    }
};
BookingScreenUI.prototype.closeDialog = function(b) {
    var a = b.target;
    while (a != document) {
        if (a.id == BookingScreenUI.getContainerID() + "_close") {
            $jex.lightbox.hide();
            return;
        }
        if (a.className == "lb_content") {
            return;
        }
        a = a.parentNode;
    }
    $jex.lightbox.hide();
    return;
};
BookingScreenUI.prototype.close = function() {
    if (BookingScreenUI.getDlg()) {
        BookingScreenUI.getDlg().style.display = "none";
    }
};
BookingScreenUI.prototype.showDialog = function(h, a) {
    this.addStyleHTML();
    var b = BookingScreenUI.getContainerID();
    var j = this.vendor;
    var g = BookingScreenUI.getDlg();
    var c = [];
    c.push('<div class="p_layer_cont">');
    c.push('    <div style="width:480px;" class="layer_inner"> <a id="', b, '_close" href="javascript:void(0);" title="关闭" class="btn_close"></a> ');
    c.push('        <div class="e_tit_pop"></div>');
    c.push('        <div class="layer_cont">');
    c.push('            <div class="b_warn_pop_l clrfix">');
    c.push('                <div class="e_warn_ico"> <i class="ico_del_l"></i></div>');
    var f = "目前" + j.name + this.getDialogMsg() + "您可以通过其他代理商网站预订机票。";
    var i = BookingScreenUI.adjustOption;
    if (i.allNoWork === true && i.isTimeRange()) {
        f = i.allNoWorkTips() || f;
    }
    c.push('                <div class="e_warn_inf"><h3>', f, "</h3>");
    c.push("                </div>");
    c.push("          </div>");
    c.push('			<table cellpadding="0" cellspacing="0" width="430" class="vinfo">');
    c.push("				<tr>");
    if (j.info.cata) {
        c.push('					<td width="25"><div title="经Qunar验证：该网站已获得《中国民用航空运输销售代理业务资格认可证书》" class="iata"></div></td>');
    } else {
        c.push('					<td width="25"><div title="经Qunar验证：该网站未获得《中国民用航空运输销售代理业务资格认可证书》" class="iata"></div></td>');
    }
    c.push('					<td width="210"><span class="hl">', j.name, "</span></td>");
    c.push('					<td width="195">');
    c.push('						<div class="praise">');
    c.push('							<div class="r" style="width:', (parseFloat(j.star.lv.kd) * 2 * 10), '%;"></div>');
    c.push("						</div>");
    c.push("					</td>");
    c.push("				</tr>");
    c.push("				<tr>");
    c.push("					<td></td>");
    c.push('					<td colspan="2"><div class="name">', j.info.cname, "</div>");
    c.push('						<table cellpadding="0" cellspacing="0" class="contact">');
    c.push("							<tr>");
    c.push('								<td colspan="2">出票时间：', j.info.st, "</td>");
    c.push("							</tr>");
    c.push("							<tr>");
    c.push('								<td width="210">客服电话：', j.info.wp, "</td>");
    c.push("								<td>投诉电话：", j.info.nwp, "</td>");
    c.push("							</tr>");
    c.push("							<tr>");
    c.push("								<td>网址：", j.info.web, "</td>");
    c.push("								<td>ICP备案：", j.info.icp, "</td>");
    c.push("							</tr>");
    c.push("						</table></td>");
    c.push("				</tr>");
    c.push("			</table>");
    c.push("            </div>");
    c.push("        </div>");
    c.push("    </div>");
    if (typeof $jex != "undefined") {
        $jex.event.trigger(this, "preshow");
    }
    $jex.lightbox.show(c.join(""));
    var d = ["&type=vstat", "&clickby=", this.vendor.status, "&wrid=", this.vendor.wr || this.vendor.wrid, "&wrname=", encodeURIComponent(this.vendor.name)];
    trackAction(d.join(""));
};
BookingScreenUI.prototype.addStyleHTML = function() {
    if (window.__bookingscreenui_addstyle == true) {
        return;
    }
    var a = document.createElement("div");
    a.id = BookingScreenUI.getContainerID();
    a.style.position = "absolute";
    a.style.zIndex = "999999";
    document.getElementsByTagName("body")[0].appendChild(a);
    this.dlg = a;
    this.clickBind(this.closeDialog);
    window.__bookingscreenui_addstyle = true;
};
BookingScreenUI.closeMySelf = function() {
    var a = document.getElementById(BookingScreenUI.getContainerID());
    if (a && a.style.display == "block") {
        a.style.display = "none";
    }
};
BookingScreenUI.getContainerID = function() {
    return "__booking_screen_dialog_container__";
};
BookingScreenUI.getDlg = function() {
    var a = document.getElementById(BookingScreenUI.getContainerID());
    return a;
};
BookingScreenUI.prototype.processBooking = function(a) {
    if (typeof a == "function") {
        a();
    } else {
        if (typeof a == "string") {
            window.open(a);
        }
    }
};
BookingScreenUI.prototype.clickBind = function(c) {
    var a = document;
    var b = this;
    _cb = function(d) {
        if (!d.target) {
            d.target = d.srcElement;
        }
        c.call(b, d, this);
    };
    if (a.addEventListener) {
        a.addEventListener("click", _cb, false);
    } else {
        if (a.attachEvent) {
            a.attachEvent("onclick", _cb);
        }
    }
};
BookingScreenUI.prototype.getPosition = function() {
    var b, d;
    if (window.pageXOffset) {
        b = window.pageXOffset;
    } else {
        if (document.documentElement && document.documentElement.scrollLeft) {
            b = document.documentElement.scrollLeft;
        } else {
            if (document.body) {
                b = document.body.scrollLeft;
            }
        }
    } if (window.pageYOffset) {
        d = window.pageYOffset;
    } else {
        if (document.documentElement && document.documentElement.scrollTop) {
            d = document.documentElement.scrollTop;
        } else {
            if (document.body) {
                d = document.body.scrollTop;
            }
        }
    }
    var c, a;
    if (window.innerWidth) {
        c = window.innerWidth;
    } else {
        if (document.documentElement && document.documentElement.clientWidth) {
            c = document.documentElement.clientWidth;
        } else {
            if (document.body) {
                c = document.body.clientWidth;
            }
        }
    } if (window.innerHeight) {
        a = window.innerHeight;
    } else {
        if (document.documentElement && document.documentElement.clientHeight) {
            a = document.documentElement.clientHeight;
        } else {
            if (document.body) {
                a = document.body.clientHeight;
            }
        }
    }
    return {
        scrollTop: d,
        scrollLeft: b,
        clientHeight: a,
        clientWidth: c
    };
};
BookingScreenUI.prototype.openMark = function() {};
BookingScreenUI.prototype.closeMark = function() {};

function StarRankUI(a) {
    StarRankUI.superclass.constructor.call(this, a);
    this._type = "StarRankUI";
    this.url = "http://www.qunar.com/bookingFeedback/interface/userRemark.jsp";
    var b = null;
    this.ownerWrapperUI = function(c) {
        if (c == null) {
            return b;
        } else {
            b = c;
        }
    };
    this.agentUIO = new UIObject();
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
    this.commitOpened = false;
}
$jex.extendClass(StarRankUI, XControl);
StarRankUI.prototype.update = function() {};
StarRankUI.prototype.displayPanel = function(c) {
    var b = this;
    var d = this.ownerWrapperUI();
    var a = c.vendor().starRank();
    d.text('<div class="e_qstar">');
    d.append("<span ", "panelStarR", ' class="bg_qstar">');
    d.text('<em style="width:', (a.lv.kd * 10 * 2), '%;" class="r"></em></span>');
    d.append("<div ", "agent", ' class="p_qstar_tip"></div>');
    d.text("</div>");
    if (a.count) {
        d.text('<span class="u_num">来自', a.count, "位用户</span>");
    } else {
        d.text('<span class="u_num">暂无点评</span>');
    }
    d.onInit(function() {
        var f = d.find("panelStarR");
        var h = d.find("agent");
        var g = true;
        $jex.hover({
            act: f,
            onmouseover: function(i) {
                if (g) {
                    b.updateAgentPanel(c, a);
                    b.agentUIO.write(h);
                    g = false;
                }
                $jex.element.show(h);
                trackAction("FL|STAR|SHOW");
            },
            onmouseout: function(i) {
                $jex.element.hide(h);
            }
        });
    });
};
StarRankUI.prototype.showCommit = function() {
    var b = this.ownerWrapperUI();
    var c = b.find("btnstarR");
    var a = b.find("usercomment");
    $jex.addClassName(c.parentNode, "e_btn_cmt_on");
    $jex.element.show(a);
    this.commitOpened = true;
    trackAction("FL|CMT|OPEN");
};
StarRankUI.prototype.hideCommit = function() {
    var b = this.ownerWrapperUI();
    var c = b.find("btnstarR");
    var a = b.find("usercomment");
    if (c) {
        $jex.removeClassName(c.parentNode, "e_btn_cmt_on");
    }
    if (a) {
        $jex.element.hide(a);
    }
    this.commitOpened = false;
};
StarRankUI.prototype.updateAgentPanel = function(b, g) {
    var a = this;
    var c = this.agentUIO;
    var d = this.ownerWrapperUI();
    var i = d.find("agent");
    if (!c.isempty()) {
        return;
    }
    c.text('<div class="p_qstar_cont"><dl class="dl_score_lst">');
    var h = ["总分：", "满意程度", "网站使用", "价格真实", "售后服务"],
        f = g.lv;
    $jex.foreach(["kd", "ts", "dw", "db", "ds"], function(k, j) {
        c.text(j ? "<dd>" : "<dt>");
        c.text('<span class="sc_lab">', h[j], "</span>");
        c.text('<span class="bg_qstar"><em style="width: ', (parseFloat(f[k]) * 2 * 10), '%;"></em></span>');
        c.text('<span class="sc_num">', f[k], "分</span>");
        c.text(j ? "</dd>" : "</dt>");
    });
    c.text("</dl></div>");
};
StarRankUI.prototype.updateUserCommentPanel = function(c, d) {
    var b = this;
    var a = c.ownerFlight();
    $jex.foreach(["dw", "db", "ds"], function(f) {
        b["star_" + f].setValue(0);
        b["star_" + f].update();
    });
    this.clear();
    this.text('<div class="p_cmt_cont">');
    this.append("<a ", "cls", ' class="p_close" title="关闭"></a>');
    this.text("<h3>请对网站的服务做出点评</h3>");
    this.append("<form ", "frmCommit", ' action="' + this.url + '" target="ifmPost" method="post" >');
    this.text('			<input type="hidden" name="ispost" value="true" />');
    this.text('			<input type="hidden" name="wrid" value="', c.wrapperId(), '" />');
    this.text('			<input type="hidden" name="depCode" value="', a.deptAirportCode(), '" />');
    this.text('			<input type="hidden" name="arrCode" value="', a.arriAirportCode(), '" />');
    this.text('			<input type="hidden" name="depDate" value="', a.deptDate(), '" />');
    this.text('			<input type="hidden" name="flightNo" value="', a.code(), '" />');
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
        this.text("</li>");
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
        this.text("</div>");
    }
    this.text('<div class="e_login_ifo clrfix">');
    this.append("<div ", "msg", ' class="m_login_wwrn"></div>');
    this.text("</div>");
    this.text("</form>");
    this.text("</div>");
    this.onInit(function() {
        $jex.event.click(this.find("reg"), function() {
            window.open("http://user.qunar.com/reg.jsp");
        });
        $jex.event.click(this.find("btnSaveAndLogin"), function() {
            if (!b.checkComment()) {
                return;
            }
            LoginControl.login(b.find("uname").value, b.find("passwd").value, function(f, g) {
                if (f) {
                    b.submitComment();
                } else {
                    b.find("msg").innerHTML = '<span class="f_warn">' + g + "</span>";
                }
            });
        });
        $jex.event.click(this.find("btnSave"), function() {
            if (!b.checkComment()) {
                return;
            }
            b.submitComment();
        });
        $jex.event.click(this.find("cls"), function() {
            b.hideCommit();
        });
    });
};
StarRankUI.prototype.checkComment = function() {
    var a = this;
    var b = true;
    $jex.foreach(a.starList, function(c) {
        if (!c.getSelectedValue()) {
            a.find("msg").innerHTML = '<span class="f_warn">请选择<b>' + c.title() + "</b>的评分.</span>";
            b = false;
            return $jex.$break;
        }
    });
    return b;
};
StarRankUI.prototype.submitComment = function() {
    var a = this;
    var b = "callbkId" + $jex.globalID();
    this.find("frmCommit").callback.value = "window.parent." + b;
    window[b] = function(d) {
        a.processComment(d);
    };
    var c = this.find("frmCommit").id;
    if (/MSIE/i.test(navigator.appVersion)) {
        document.getElementById("ifmPost").src = 'javascript:\'<script>window.onload=function(){document.write(\\\'<script>document.domain=\\"qunar.com\\";parent.document.getElementById("' + c + "\").submit();<\\\\/script>\\');document.close();};<\/script>'";
    } else {
        this.find("frmCommit").submit();
    }
};
StarRankUI.prototype.processComment = function(a) {
    var b = this;
    var c = this.find("msg");
    if (a.success) {
        c.innerHTML = "成功提交";
    } else {
        c.innerHTML = '<span class="f_warn">' + a.msg + "</span>";
    }
    setTimeout(function() {
        $jex.$("ifmPost").src = "about:blank";
        b.hideCommit();
    }, 1000);
};
StarRankUI.prototype.placeHolder = function(b) {
    var c = this.ownerWrapperUI(),
        a = this;
    c.append("<div ", "usercomment", ' class="p_cmt_tip" ');
    if (!this.commitOpened) {
        c.text(' style="display:none;" ');
    } else {
        c.text(' style="display:block;" ');
    }
    c.text(" >");
    if (this.commitOpened) {
        this.updateUserCommentPanel(b, b.vendor().starRank());
        c.append("", this);
    }
    c.text("</div>");
    c.onInit(function() {
        $jex.event.binding(c.find("usercomment"), "click", function(d) {
            $jex.stopEvent(d);
            return false;
        });
        if (a.commitOpened) {
            $jex.addClassName(c.find("usercomment").parentNode, "e_btn_cmt_on");
        }
    });
};

function StarPickerUI(a) {
    StarPickerUI.superclass.constructor.call(this, a);
    this._type = "StarPickerUI";
}
$jex.extendClass(StarPickerUI, XControl);
StarPickerUI.prototype.update = function() {
    var a = this;
    var c = this._setting;
    a.clicked = false;
    this.clear();
    this.text("<li>");
    this.append("<input ", "fldInput", ' name="' + c.name + '" type="hidden" value="0" />');
    this.text('<p class="w_lab">', c.title, "</p>");
    this.text('<p class="w_star">');
    this.append("<span", "sPr", ' class="bg_qstar">');
    this.append("<em ", "shR", ' style="width: 0%;"></em><b class="lst_star">');
    for (var b = 1; b <= 5; b++) {
        this.append("<i ", "sR" + b, ' class="i_star"></i>');
    }
    this.text("</b></span></p>");
    this.append("<p ", "desc", ' class="w_txt"></p>');
    this.text("</li>");
    this.onInit(function() {
        var g = this.find("shR");
        for (var d = 1; d <= 5; d++) {
            (function(h) {
                var i = a.find("sR" + h);
                $jex.event.binding(i, "mouseover", function() {
                    if (a.clicked) {
                        return;
                    }
                    var j = c.desc[h - 1];
                    if (j) {
                        a.find("desc").innerHTML = j;
                    }
                    g.style.width = (h * 2 * 10) + "%";
                });
                $jex.event.click(i, function() {
                    if (a.clicked) {
                        return;
                    }
                    a.setValue(h);
                    a.clicked = true;
                });
            })(d);
        }
        var f = this.find("sPr");
        $jex.event.binding(f, "mouseout", function(h) {
            if (!$jex.event.within(f, h)) {
                return;
            }
            a.restore();
            if (!a.getSelectedValue()) {
                a.find("desc").innerHTML = "";
            }
            a.clicked = false;
        });
    });
};
StarPickerUI.prototype.restore = function() {
    var a = this.find("desc");
    if (!a) {
        return;
    }
    this.setValue(this.value);
};
StarPickerUI.prototype.setValue = function(b) {
    var a = this.find("shR");
    if (!a) {
        this.onInit(function() {
            this.find("shR").style.width = b * 2 * 10 + "%";
            this.selValue = b;
        });
    } else {
        a.style.width = b * 2 * 10 + "%";
        this.find("fldInput").value = b;
        this.selValue = b;
    }
    this.value = b;
};
StarPickerUI.prototype.getValue = function(a) {
    return parseInt(this.find("fldInput").value, 10);
};
StarPickerUI.prototype.title = function(a) {
    return this._setting.title;
};
StarPickerUI.prototype.getSelectedValue = function() {
    return this.selValue || 0;
};

function OnewayStarRankUI(a) {
    OnewayStarRankUI.superclass.constructor.call(this, a);
    this._type = "OnewayStarRankUI";
}
$jex.extendClass(OnewayStarRankUI, StarRankUI);
OnewayStarRankUI.prototype.insert_btn = function(a) {
    var b = this.ownerWrapperUI();
    b.append("	<a ", "btnstarR", '  data-evtDataId="' + b.newid("") + '"  hidefocus="on" class="btn_cmt" href="##">点评<i class="i_arrb_ud"></i></a>');
    this.placeHolder(a);
};

function StopInfoUI(a) {
    StopInfoUI.superclass.constructor.call(this, a);
    this._type = "StopInfoUI";
    var b = null;
    this.owner = function(c) {
        if (c == null) {
            return b;
        } else {
            b = c;
        }
    };
    this.placeHolderId = this.newid("MyPH");
}
$jex.extendClass(StopInfoUI, XControl);
StopInfoUI.prototype.placeHolder = function() {
    var a = this.owner();
    a.append("<div", this.placeHolderId, ' class="jtPanel" style="display:none;" >');
    a.append("", this, "</div>");
};
StopInfoUI.prototype.getHolder = function() {
    var a = this.owner();
    return a.find(this.placeHolderId);
};
StopInfoUI.prototype._invoke = function(b) {
    if (this.cache) {
        this.update(b);
        return;
    }
    var c = ["/twell/flight/flight_stops.jsp?depCode=", b.deptAirportCode(), "&arrCode=", b.arriAirportCode(), "&flightNo=", b.code(), "&depDate=", window.location.param().searchDepartureTime].join("");
    var a = this;
    $jex.jsonp(c, function(d) {
        a.cache = d;
        a.update(b);
    });
};
StopInfoUI.prototype.update = function(a) {
    this.clear();
    var d = this.cache;
    if (d.data.length <= 0) {
        return;
    }
    this.text('		<div class="ic"></div>');
    this.text('		<div class="hd"><b>经停城市</b>|<b>到达时间</b>|<b>起飞时间</b></div>');
    this.text('		<div class="ct">');
    this.text('			<table cellpadding="0" cellspacing="0">');
    for (var b = 0; b < d.data.length; b++) {
        var c = d.data[b];
        this.text("				<tr>");
        this.text('					<td class="c1">', c.city, "</td>");
        this.text('					<td class="c2">', c.depTime, "</td>");
        this.text('					<td class="c3">', c.arrTime, "</td>");
        this.text("				</tr>");
    }
    this.text("			</table>");
    this.text("		</div>");
    this.render(this.getHolder());
    $jex.element.show(this.getHolder());
};
StopInfoUI.prototype.show = function(a) {
    this._invoke(a);
};
StopInfoUI.prototype.hide = function() {
    $jex.element.hide(this.getHolder());
};
var checkTimeOfStopSale = {
    deal: function(c, b) {
        var a;
        if (window.CLIENT_TIME && window.SERVER_TIME) {
            a = (new Date().getTime() - CLIENT_TIME.getTime()) + SERVER_TIME.getTime();
        } else {
            a = new Date().getTime();
        } if (((c.getTime() - a) / (1000 * 60)) <= b) {
            this.showDialog();
            return true;
        } else {
            return false;
        }
    },
    showDialog: function() {
        var a = [];
        a.push('<div class="p_layer_cont p_player_tss">');
        a.push('    <div style="width:480px;" class="layer_inner"> <a id="msgButton" href="javascript:void(0);" title="关闭" class="btn_close"></a> ');
        a.push('        <div class="e_tit_pop"></div>');
        a.push('        <div class="layer_cont">');
        a.push('            <div class="b_warn_pop_l clrfix">');
        a.push('              <div class="e_warn_ico"> <i class="ico_del_l"></i></div>');
        a.push('              <div class="e_warn_inf"><h3>对不起，该代理商报价已售完，您可以在去哪儿网重新搜索和预订!</h3></div>');
        a.push("            </div>");
        a.push('            <div class="b_submit_pop_l"><a href="javascript:void(0);" class="btn" id="reSearchLine"><span><b>重新搜索</b></span></a></div>');
        a.push("        </div>");
        a.push("      </div>");
        a.push("    </div>");
        $jex.lightbox.show(a.join(""));
        this.bindEvent();
    },
    bindEvent: function() {
        var b = $jex.$("reSearchLine"),
            a = function() {
                window.location.reload();
            };
        if (b.addEventListener) {
            b.addEventListener("click", a, false);
        } else {
            if (b.attachEvent) {
                b.attachEvent("onclick", a);
            }
        }
    }
};
var Price_html;
(function() {
    var c = 11;
    Price_html = {
        getHTML: function(k) {
            k += "";
            a(k);
            var j = ['<span class="prc_wp" style="zoom:1;position:relative;overflow:hidden;width:' + c * k.length + 'px" >', '<em class="prc">'];
            j.push(d(k));
            j.push(f(k.length));
            j.push("</em></span>");
            return j.join("");
        }
    };
    var b, i, h, g;

    function a(l) {
        h = [];
        i = [];
        var j = l.length;
        do {
            h[h.length] = j;
        } while (--j);
        b = Math.floor(Math.random() * l.length + 1);
        do {
            var k = Math.floor(Math.random() * h.length);
            i[i.length] = h[k];
            h.splice(k, 1);
        } while (--b);
    }

    function d(l) {
        var m = -1 * c * l.length;
        g = [];
        var j = l.split("");
        for (var k = 0; k < i.length; k++) {
            g[g.length] = {
                digit: i[k],
                val: j[i[k] - 1]
            };
            j[i[k] - 1] = Math.floor(Math.random() * 10) + "";
        }
        return "<b style='width:" + Math.abs(m) + "px;left:" + m + "px'>" + j.join("") + "</b>";
    }

    function f(j) {
        var o = 1;
        var k = j;
        var m = [];
        for (var l = 0; l < g.length; l++) {
            var n = (-1 * (k - g[l].digit + o) * c) + "px";
            m[m.length] = '<b style="left:' + n + '">' + g[l].val + "</b>";
        }
        return m.join("");
    }
})();
var FlightEventProxy = (function() {
        function c(d) {
            var f = d.getAttribute("data-evtDataId");
            return f && UICacheManager.getCache(f);
        }

        function b(h, g) {
            var f = c(h);
            if (!f) {
                return;
            }
            var d = f.dataSource();
            f.stat.ownerWrapperEntity(d);
            LockScreen(function() {
                var j = d.ownerFlight(),
                    k = new Date($jex.date.parse(j.deptDate() + " " + j.deptTime())),
                    i = d.vendor().tss();
                if (window.checkTimeOfStopSale && checkTimeOfStopSale.deal(k, i)) {
                    return;
                }
                f.bookingScreenUI.preBooking(function() {
                    if (typeof window.BookingPriceCheck != "undefined") {
                        if (BookingPriceCheck.check(d, g)) {
                            return;
                        }
                    }
                    f.bookingLockScreenUI.preBooking(function(l) {
                        d.setVpr(l);
                        f.jumpToBooking(d, g);
                    }, g);
                });
            });
            return false;
        }

        function a(f) {
            this.$node = $jex.$(f);
            var d = this;
            $jex.event.binding(this.$node, "click", function(g) {
                var h = g.target || window.event.srcElement;
                while (h && h != this) {
                    if (h.id && d.clickDo(h.id, h) === false) {
                        $jex.stopEvent(g);
                        break;
                    }
                    h = h.parentNode;
                }
            });
        }
        a.prototype = {
            clickDo: function(g, f) {
                if (/^js-stopClick/.test(g)) {
                    return false;
                }
                if (!/(js_ctype)|([a-z_-]+)XI\d+/i.test(g)) {
                    return;
                }
                var d = this["_" + (RegExp.$1 || RegExp.$2) + "Click"];
                return d && d(f);
            },
            _btnHideClick: function(f) {
                var g = c(f);
                if (!g) {
                    return;
                }
                g.owner().hideVendorPanel();
                var d = $jex.offset($jex.$("resultAnchor"));
                window.scrollTo(d.left, d.top);
                return false;
            },
            _js_ctypeClick: function(f) {
                var d = c(f);
                if (!d) {
                    return;
                }
                LockScreen(function() {
                    var g = d.dataSource(),
                        h = f.getAttribute("data-ctype");
                    System.service.genBookingTimeStamp();
                    System.analyzer.triggerTrace = true;
                    TsinghuaOneWayTracker.trackTabChange(h, d);
                    d.changeWrapperTypeList(h);
                });
                return false;
            },
            _btnstarRClick: function(g) {
                var f = c(g);
                i
