!function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t(require, exports, module) : t();
}(this, function() {
    Date.extend && Date.extend({
        toFl: function(e) {
            var t = new Date(e).format();
            return t.y += 543, t;
        }
    });
});