!function(WIN, DOC, undef) {

WIN.console = WIN.console || function() {
    var wrap = DOC.createElement("div"),
        G = {};

    !function(types, li) {
        types = types.split("|");
        while(li = types.shift()) !function(li) {
            G["is" + li] = function(obj) {
                return li === {}.toString.call(obj).replace(/^\[object (\w+)\]$/, "$1");
            }
        }(li);
    }("String|Array|Object|Number");


    G.isElement = function(obj) {
        return WIN.HTMLElement ? obj instanceof HTMLElement : G.isObject(obj) && G.isString(obj.tagName) && obj.nodeType > 0;
    }

    G.isWindow = function(o) {
        var d;
        return !!o && /[wl]]/.test({}.toString.call(o)) || o === (d = o.document) && d !== o;
    }

    G.each = function(obj, iterator, context) {
        var i = 0,
            li;
        if(G.isArray(obj)) {
            for(li = obj.length; i < li; i++)
                if(iterator.call(context, obj[i], i, obj) === false) break;
        } else if(G.isObject(obj)) {
            for(li in obj) {
                if(obj.hasOwnProperty(li))
                    if(iterator.call(context, obj[li], li, obj) === false) break;
            }
        }
    }

    G.htmlEncode = function(s) {
        return s.replace(/[&<>'"]/g, function(li){
            return "&" + {
                "&"   : "amp"
                , "<" : "lt"
                , ">" : "gt"
                , "'" : "#39"
                , '"' : "quot"
            }[li] + ";"
        })
    }

    wrap.style.cssText = "width: 100%; height: 145px; background: rgb(34, 40, 42); position: absolute; bottom: 0; left: 0; overflow: auto; font: 12px/1.3 consolas, monospace, verdana, Helvetica, Tahoma, Arial, 微软雅黑; color: #ccc; text-indent: 7px; border-top: 1px solid #000;";

    wrap.innerHTML = '<p style="color:#999">console.log(123, "123", 1+2)</p>';

    !function(body) {
        if(body) body.appendChild(wrap);
        else {
            var self = arguments.callee;
            setTimeout(function() {
                self(DOC.body);
            }, 64);
        }
    }(DOC.body);
    return {
        log: function() {
            var args = [].slice.call(arguments),
                ret = [];

            G.each(args, function(li) {
                ret.push(function() {
                    var tmp = [];
                    if(G.isObject(li)) {
                        if(G.isElement(li)) {
                            var tmpEl = li.cloneNode(!1);
                            return '<em style="color:rgb(70,119,174);font-style:italic;">Element</em> ' + G.htmlEncode(tmpEl.outerHTML);
                        }

                        if(li === window) return '<em style="color:rgb(70,119,174);font-style:italic;">Element</em> <span style="color:rgb(122,192,91)">window</span>';

                        if(li === document) return '<em style="color:rgb(70,119,174);font-style:italic;">Element</em> <span style="color:rgb(122,192,91)">document</span>';

                        G.each(li, function(k, v) {
                           tmp.push(v + ": " + k)
                        });

                        return '<em style="color:rgb(70,119,174);font-style:italic;">Object</em> {' + G.htmlEncode(tmp.join(", ")) + '}';
                    }
                    return G.htmlEncode(li + "");
                }());
            });

            wrap.innerHTML += '<p>' + ret.join(" ") + '</p>';
            setTimeout(function() {
                wrap.scrollTop = wrap.scrollHeight;  
            }, 64);
        }
    }
}();

}(window, document);