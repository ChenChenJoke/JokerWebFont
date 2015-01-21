!function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t(require, exports, module) : t();
}(this, function() {
    Date.extend && Date.toLunar && Date.extend({
        toLyl: function(e) {
            var t, n, o;
            return e = new Date(e), t = e.toLunar(), d = e.format(), n = parseInt(t.cm, 10), 
            o = parseInt(t.cd, 10), n = n > 6 ? n - 7 : n - 1, d.jl = (n + o - 1) % 6, d;
        }
    });
});