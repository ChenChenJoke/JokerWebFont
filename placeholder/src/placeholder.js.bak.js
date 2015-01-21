window.G || (window.G = {});

/*
1. value方式模拟没有语义，破坏真实value值，在form提交等情况下造成问题，故使用物理方式模拟

2. 优先考虑原生placeholder支持

3. API设计链式绑定，可选value值指定，优先级最高，其次placeholder属性值（省略则使用placeholder属性值）


调用：
G.placeholder.bind(el, val, cls)

el:
1. string(id)
2. dom集合(类似getElementsByTagName)
3. array[string, dom](id 或者 dom)

val：
提示内容，可省略，为兼容HTML5推荐使用placeholder属性

cls:
placeholder层对应className，省略默认为"placeholder"
*/
G.placeholder = {
    
    //检测是否原生支持support（如webkit）
    support: function() {
        var needle = document.createElement("INPUT"),
            
            //更新：chrome的placeholder存在bug
            is = !!("placeholder" in needle);
        needle = null;
        return is;
    }(),
    
    //更新：增加chrome的判断，因其placeholder存在bug
    isChrome: function() {
        return /chrome/.test(navigator.userAgent.toLowerCase());
    }(),
    
    byId: function(id) {
        return "string" === typeof id ? document.getElementById(id) : id;
    },
    
    on: document.addEventListener ? function(el, type, callback){
        el.addEventListener(type, callback, !1 );
    } : function(el, type, callback){
        el.attachEvent( "on" + type, callback );
    },
    
    map: function(obj, fun) {
        var i = 0,
            l = obj.length;
        for(; i < l; i++) {
            fun && fun.call(this, obj[i]);
        }
    },
    
    /*
    getCoords: function(el){
        var box = el.getBoundingClientRect(),
            doc = el.ownerDocument,
            body = doc.body,
            html = doc.documentElement,
            clientTop = html.clientTop || body.clientTop || 0,
            clientLeft = html.clientLeft || body.clientLeft || 0,
            top  = box.top  + (self.pageYOffset || html.scrollTop  ||  body.scrollTop ) - clientTop,
            left = box.left + (self.pageXOffset || html.scrollLeft ||  body.scrollLeft) - clientLeft;
        return {"x": left, "y": top};
    },
    */
    
    addSupport: function(el, val, cls) {
        //获取dom后修正val
        val = val || el.getAttribute("placeholder");
        
        if(!val) {
            return;
        }
        
        //特别处理chrome
        (this.isChrome || el.tagName === "TEXTAREA") && (el.placeholder = "");
        
        var wrap = el.parentNode.insertBefore(document.createElement("SPAN"), el),
            holder = wrap.cloneNode(false);
            
        this.holder = holder;
        wrap.style.cssText = "display:inline-block;position:relative;z-index:10;";
        wrap.appendChild(el);
        
        holder.innerHTML = val;
        
        //先预设为display:none提升体验
        holder.style.cssText = "position:absolute;display:none;top:0;left:0;text-indent:3px;pointer-events:none;color:#999;*padding-top:1px;-moz-user-select:none;-webkit-user-select:none;-khtml-user-select:none;line-height:" + el.offsetHeight + "px";
        holder.className = cls;
        wrap.appendChild(holder);
        /*
        绝对定位方式，但需保证外层无相对定位 或 自定义style
        var holder = document.createElement("SPAN");
        holder.innerHTML = val;
        holder.style.cssText = "position:absolute;top:" + Math.round(this.getCoords(el).y) + "px;left:" + Math.round(this.getCoords(el).x) +"px;text-indent:3px;pointer-events:none;color:#999;*padding-top:1px;-moz-user-select:none;-webkit-user-select:none;-khtml-user-select:none;line-height:" + el.offsetHeight + "px";
        holder.className = cls;
        el.parentNode.insertBefore(holder, el);
        */
        
        //检查input是否默认有值
        setTimeout(function() {
            holder.style.display = el.value ? "none" : "";
        }, 16);
        
        //转移click事件（不能用mousedown）
        this.on(holder, "click", function() {
            el.focus();
        });
        
        this.on(el, "focus", function() {
            holder.style.display = "none";
        });
        
        this.on(el, "blur", function() {
            holder.style.display = el.value ? "none" : "";
        });
    },
    
    //更新，增加外部修改接口
    set: function(val) {
        var holder = this.holder;
        this.support && !this.isChrome ? holder.placeholder = val : holder.innerHTML = val;
        return this;
    },
    
    bind: function(el, val, cls) {
        if(!el) {
            return this;
        }
        
        //更新增加chrome判断(增加textarea类型的始终模拟，因默认的样式控制和换行存在问题)
        else if(this.support && !this.isChrome && !el.tagName === "TEXTAREA") {
            this.holder = this.byId(el);
            return this;
        }
        
        val = val || "";
        cls = cls || "placeholder";
        
        //string
        if(typeof el === "string") {
            (el = this.byId(el)) && this.addSupport(el, val, cls);
        }
        
        //数组或dom集合
        else {
            this.map(el, function(item) {
                (item = this.byId(item)) && this.addSupport(item, val, cls);
            })
        }
        
        return this;
    }
}