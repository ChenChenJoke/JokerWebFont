# jQuery bubble plugin

A bubble plugin for jQuery.

## Compatibility

- IE 8-10, Firefox, Opera, Chrome, Safari
- ltr / rtl
- Windows / Mac

## Depends

- jQuery 1.4+

## TODO

## Demo

http://view.gitlab.pro/chenguangyin/bubble/raw/master/demo/index.html

## Usage

```javascript
var test1 = $("#demo1").bubble({
	'wrapOpt': {
		'modId': 'test01',
		'content': 'test01test01test01test01'
	}
});

var test2 = $("#demo2").bubble({
	'wrapOpt': {
		'modId': 'test02',
		'content': 'test02test02test02test02test02',
		'direc': 'b',
		'before': '<p style="color: #f90;">before wrapOpt.content</p>',
		'after': '<p style="color: gray;">after wrapOpt.content</p>'
	},
	'moreOpt': {
		'direc': 'l', 
		'microDirec': 'aa', 
		'url': 'http://www.baidu.com', 
		'content': ''
	},
	'btnOpt': {
		'direc': 'r', 
		'content': 'Click me!'
	}
});

var test3 = $("#demo3").bubble({
	'wrapOpt': {
		'modId': 'test03',
		'content': 'test03test03test03test03test03',
		'direc': 'l'
	},
	'moreOpt': {
		'direc': 'r',
		'microDirec': 'ah',
		'url': 'http://www.baidu.com',
		'content': ''
	}, 
	'pos': {
	    'left': 20,
	    'top': 50
    }
});

var test4 = $("#demo4").bubble({
	'wrapOpt': {
		'modId': 'test04',
		'content': 'test04',
		'direc': 'l'
	},
	'btnOpt': {
		'direc': 'r', 
		'content': 'Click me!'
	}, 
	'callback': {
		'ui-bubble_close': function(wrap, e) {
			alert(wrap.css('width'))
		},
		'ui-bubble_more': function(wrap, e) {
			alert(e.which)
		},
		'ui-btn': function(wrap, e) {
			alert("btn")
		}
	}
});
```


## Parameter

|name  |  default | description |
| ------------- |:-----:| -----:|
| wrapOpt| {'direc': 't'} |气泡内容和位置信息|
| moreOpt| {'direc': 'r','microDirec': 'av','url': '#'} |气泡内容和位置信息|
| btnOpt| {'direc': 'r'} |气泡内容和位置信息|
| pos| {'left': 0,'top': 0}|气泡位置相对于生成气泡元素或fixObj左上角的偏移量|
| callback| null|事件绑定通过类名和方法(可有两个参数，wrap：气泡对象；e：事件)的映射。当点击拥有类名的a标签时触发对应事件。可选|

### Parameter details description

#### opt.wrapOpt
|name  |  default | description |
| ------------- |:-----:| -----:|
| modId| ""|用于统计参数和自定义样式，为空时自动向上遍历获得最近的modId，可选，推荐必填|
| direc| "t"|用于控制arrow的方向，共有四个值t,b,l,r,默认为t，可选|
| content| ""|主体内容，可为HTML字符串，必填|
| before| ""|主体内容前面的额外内容，可为HTML字符串，可选|
| after| ""|主体内容后面的额外内容，可为HTML字符串，可选|

#### opt.moreOpt
|name  |  default | description |
| ------------- |:-----:| -----:|
| direc| "r"|更多链接的位置，r,t,b,l.可选. 参考http://ui.i18n.pro/demo/#arrow |
| microDirec| "av"|更多链接align的位置，aa,av,ah.可选. 参考http://ui.i18n.pro/demo/#arrow |
| url| "#"|更多链接的链接。可选|
| content| ""|更多链接的内容，为空时不显示更多链接，可选|

#### opt.btnOpt
|name  |  default | description |
| ------------- |:-----:| -----:|
| direc| "r"|按钮的位置，l，r，可选. 参考http://ui.i18n.pro/demo/#button |
| content| "t"|按钮的内容，为空时不显示按钮，可选|

#### opt.pos
|name  |  default | description |
| ------------- |:-----:| -----:|
| left| 0|气泡位置距离生成气泡元素左上角的距离，可选. 默认值0|
| top| 0|可选. 默认值0|


## Release History

* 2013/11/27 - v1.0.0 - First release


## Authors

* [chenguangyin](http://gitlab.pro/u/chenguangyin)