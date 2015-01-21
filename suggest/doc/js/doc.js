;;(function(WIN, DOC, undef) {
	var byId = function(id) {return DOC.getElementById(id)},
		SPACE = " ",
		on = DOC.addEventListener ? function(el,type,callback){
			el.addEventListener(type, callback, !1);
		} : function(el,type,callback){
			el.attachEvent("on" + type, callback);
		},
		bind = function(el, type, fun) {
			on(el, type, function(e) {
				e = e || WIN.event;
				var el = e.srcElement || e.target;
				fun.call(el, e);
			});
		},
		contains = function(parent, el) {
			return parent === DOC || parent !== el && (parent.contains ? parent.contains(el) : !!(parent.compareDocumentPosition(el) & 16));
		},
		CLASSLIST = !!(WIN.Element && Element.prototype.hasOwnProperty("classList")),
		hasClass = CLASSLIST ? function(el, cls) {
			return el.classList.contains(cls);
		} : function(el, cls){
			return -1 < (SPACE + el.className + SPACE).indexOf(SPACE + cls + SPACE);
		},
		addClass = CLASSLIST ? function(el, cls) {
			el.classList.add(cls);
		} : function(el,cls) {
			if (!hasClass(el,cls)) el.className += (el.className ? SPACE : "") + cls;
		},
		removeClass = CLASSLIST ? function(el,cls) {
			el.classList.remove(cls);
		} : function(el,cls) {
			if(!hasClass(el,cls)) return;
			var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
			el.className = el.className.replace(reg, SPACE);
		},
		mouseleave = !!inputWrap && inputWrap.onmouseleave !== undef,
		btnSave = byId("btnSave"),
		tipSave = byId("tipSave"),
		tipSave2 = byId("tipSave2"),
		testForm = byId("testForm"),
		
		testSearch = byId("testSearch"),
		testSearchInput = byId("testSearchInput"),
		inputWrap = testSearchInput.parentNode,
		testSearchBtn = byId("testSearchBtn"),
		sWatch = byId("sWatch"),
		sTimer = 0,
		sTpl = '当前项序号:<em>#{i}</em>当前项内容:<em>#{s}</em>关键词:<em>#{q}</em><br>定时器状态:<em>#{t}</em>是否隐藏(提示层内容未重置):<em>#{isHide}</em>上/下键速度:<em>#{pressDelay}</em><br>缓存数据:<em>#{cache}</em>',
		
		testSug = sug("testSearchInput", {
			classNameQuery: "sug-query",
			classNameQueryNull: "sug-querynull",
			charset: "gbk",
			requestQuery: "wd",
			url: 'http://suggestion.baidu.com/su',
			callbackFn: "baidu.sug",
			callbackDataKey: "s"
		});
	
	
	
	
	bind(testSearch, "mouseover", function(e) {
		this === testSearchBtn && addClass(this, "btn_hover");
		//this === inputWrap && !mouseleave && !contains(this, e.relatedTarget || this) && addClass(this, "input-wrap_hover");
	});
	
	bind(testSearch, "mouseout", function(e) {
		if(this === testSearchBtn) {
			removeClass(this, "btn_click");
			DOC.activeElement && DOC.activeElement !== testSearchInput && removeClass(this, "btn_hover");
		}
		//this === inputWrap && !mouseleave && !contains(this, e.relatedTarget || this) && removeClass(this, "input-wrap_hover");
	});
	
	bind(testSearch, "mousedown", function(e) {
		
		//点击框边缘使输入框获焦
		this === inputWrap && DOC.activeElement && DOC.activeElement !== testSearchInput && setTimeout(function() {
			testSearchInput.focus()
		}, 16);
	})
	
	//IE || OP
	if(mouseleave) {
		inputWrap.onmouseleave = function() {
			removeClass(this, "input-wrap_hover");
		}
		inputWrap.onmouseenter = function() { 
			addClass(this, "input-wrap_hover");
		}
	} else {
		on(inputWrap, "mouseover", function(e) {
			var el = (e || WIN.e).relatedTarget || this;
			this !== el && !contains(this, el) && addClass(this, "input-wrap_hover");
		});
		on(inputWrap, "mouseout", function(e) {
			var el = (e || WIN.e).relatedTarget || this;
			this !== el && !contains(this, el) && removeClass(this, "input-wrap_hover");
		});
	}
	
	on(testSearchInput, "focus", function() {
		addClass(inputWrap, "input-wrap_focus");
		addClass(testSearchBtn, "btn_hover");
		
		
		!sTimer && (sTimer = setInterval(function() {
			sWatch.innerHTML = sTpl.replaceTpl({
				i: testSug.i,
				s: testSug.s && testSug.s.innerHTML,
				q: testSug.q || null,
				pressDelay: testSug.o.pressDelay,
				t: testSug.t ? "1" : "0",
				isHide: !!testSug.isHide,
				cache: function() {
					var data = testSug.cache,
						ret = [],
						k;
					for(k in data) ret.push(k);
					return "[ " + ret.join(", ") + " ]";
				}()
			});
		},150));
	});
	
	on(testSearchInput, "blur", function() {
		if(!testSearchInput.value) {
			removeClass(inputWrap, "input-wrap_focus");
			removeClass(testSearchBtn, "btn_hover");
		}
		
		clearInterval(sTimer);
		sTimer = 0;
		setTimeout(function() {
			sWatch.innerHTML = sTpl.replaceTpl({
				i: testSug.i,
				s: testSug.s && testSug.s.innerHTML,
				q: testSug.q || null,
				pressDelay: testSug.o.pressDelay,
				t: testSug.t ? "1" : "0",
				isHide: !!testSug.isHide,
				cache: function() {
					var data = testSug.cache,
						ret = [],
						k;
					for(k in data) ret.push(k);
					return "[ " + ret.join(", ") + " ]";
				}()
			});
		}, 100);
	});
	
	on(testSearchBtn, "mousedown", function() {
		addClass(testSearchBtn, "btn_click");
	});
	on(testSearchBtn, "mouseup", function() {
		removeClass(testSearchBtn, "btn_click");
	});
	
	
	//render form's value
	;;(function(data) {
		var li,
			input,
			value,
			type;		
		for(li in data) {
			input = testForm[li];
			value = data[li];
			
			if(input) {
				type = {}.toString.call(value);
				
				//Undefind...
				if(value === undef) value = "";
				
				//String
				else if(value + "" === value) value = '"' + value + '"';
				
				//Object
				else if(type === "[object Object]") value = function() {
					return "{}";
				}();
				
				//Array
				else if(type === "[object Array]") value = function() {
					return "[]";
				}();
				
				else {
					type = typeof value;
					
					if(type !== "number" && type !== "boolean") value = "";
				}
				
				input.value = value;
			}
		}
	})(testSug.o);
	
	
	on(testForm, "submit", function() {
		var els = testForm.elements,
			l = testForm.length,
			li,
			text = tipSave.innerHTML;
			
			
		while(l--) {
			li = els[l];
			if(!li.disabled && li.name) {
				try{
					eval("testSug.o." + li.name + "=" + (li.value || undef));
				} catch(e) {
					tipSave.innerHTML = tipSave2.innerHTML = "保存失败，请检查参数格式！";
					addClass(tipSave, "tip-save_error");
					addClass(tipSave2, "tip-save_error");
					tipSave2.style.display = "";
					setTimeout(function() {
						tipSave2.style.display = "none";
						removeClass(tipSave, "tip-save_error");
						removeClass(tipSave2, "tip-save_error");
						tipSave.innerHTML = text;
					}, 1000);
					
					
					return;	
				}
			}
		}
		
		//globalEval("alert('" + ret + "')")
		//alert(ret.join("testSug.o."))
		
		//show tip
		tipSave.innerHTML = tipSave2.innerHTML = "保存成功！";
		addClass(tipSave, "tip-save");
		tipSave2.style.display = "";
		setTimeout(function() {
			tipSave2.style.display = "none";
			removeClass(tipSave, "tip-save");
			tipSave.innerHTML = text;
		}, 1000);
	});
	
	on(btnSave, "mousedown", function() {
		addClass(btnSave, "btn-save_click");
	});
	on(btnSave, "mouseup", function() {
		removeClass(btnSave, "btn-save_click");
	});
	on(btnSave, "mouseout", function() {
		removeClass(btnSave, "btn-save_click");
	});
	
})(window, document);