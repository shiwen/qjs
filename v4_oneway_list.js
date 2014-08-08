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
                    var h = o ? m.first
