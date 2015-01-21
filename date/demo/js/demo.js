
document.getElementById("needle").clientWidth > 393 && (document.body.className += " non-opentype");

function flipClock(el, to, from){
    var fore = el.querySelector(".fore")
        , back = el.querySelector(".back")
        , foreText = fore.querySelectorAll(".inn")
        , backText = back.querySelectorAll(".inn")
        , oldText = foreText[0].innerHTML;

    if(oldText == to) return;

    from = from || oldText || "8";

/*    [].map.call(foreText, function(li) {
       li.innerHTML = from;
    });*/

    [].map.call(backText, function(li) {
       li.innerHTML = to;
    });

    document.body.classList.remove("play");
    fore.className = "before back";
    back.className = "active fore";
    document.body.classList.add("play");
}

document.addEventListener && function(DOC, rAF) {

    var timezone = new Date().format()["z"]
        , clocks = DOC.querySelectorAll('i.clock')
        , localClock = DOC.querySelector('i[data-timezone="' + timezone + '"]')
        , flips = DOC.querySelectorAll("#filpClock .flip")
        , countDownflips = DOC.querySelectorAll("#filpCountDown .flip")
        , pad = function(num, len) {
            len = Math.pow(10, len || 2);
            return num < len ? ((len + num) + "").slice(1) : num + "";
        }
        , refresh = function() {
            var now = new Date
                , nowText = now.format("hhmmss")
                , self = arguments.callee;

            if((!self.lastRender || now - self.lastRender > 100)) {
                [].slice.call(clocks).map(function(li) {
                    li.innerHTML = (self.lastRender = now).clone().timezone(li.getAttribute('data-timezone') | 0).format("hh:mm:ss");
                });

                nowText.split("").map(function(li, i) {
                    flips[i] && flipClock(flips[i], li);
                });

                DOC.querySelector("#ymd").innerHTML = now.format("yyyy/MM/dd");
                DOC.querySelector("#week").innerHTML = "Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday".split("|")[now.format()["w"]];
                DOC.querySelector("#unix").innerHTML = now.toUnix();
                DOC.querySelector("#iso").innerHTML = now.toISOString();
                DOC.querySelector("#timezone").innerHTML = now.format()["z"];


                var countDownDiff = new Date(now).diff(new Date(now.getFullYear() + 1, 0, 1)),
                    countDownStr = "";

                countDownStr += pad(countDownDiff.d, 3);
                countDownStr += pad(countDownDiff.h, 2);
                countDownStr += pad(countDownDiff.m, 2);
                countDownStr += pad(countDownDiff.s, 2);
                
                countDownStr.split("").map(function(li, i) {
                    countDownflips[i] && flipClock(countDownflips[i], li);
                });
            }
            
            rAF(self);
        };
    localClock.parentNode.classList.add("cur");
    refresh();
}(document, window.requestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.mozRequestAnimationFrame
|| function(callback){
    setTimeout(callback, 1000 / 60);
});