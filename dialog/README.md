## dialog

I'm just a dialog, that's all.

## Compatibility

Chrome 1+ / Firefox 10+ / Opera 9+ / IE 8+

## Feature

- TODO ...

## Usage

#### direct initialization

> Notice: parameter optObj can be set as either an object or a function with a return value of an object

```html
<div id="dialog-1"></div>

<script>
	var dialogObj = $("#dialog-1").dialog(optObj);
</script>
```

#### event-trigger initialization
> Notice: dialog object and bind event type can be obtained by trigger's data() as follows:

```html
<a id="initLink" href="#">init a dialog</a>

<script>
	var $initLink = $("#initLink");
	var type = "click";
	$initLink.bindDialog(type, optObj);
	// get dialog object
	var dialogObj = $initLink.data("dialogObj");
	// unbind dialog event
	var etype = $initLink.data("etype");
	$("#initLink").unbindDialog(etype);
</script>
```

### 参数说明 ###

#### optObj
| 参数        | 类型 | 默认值        | 描述 |
| ------------- |:-----|:--------:| -----:|
| width     | `Number` | 100 | dialog宽度 |
| height     | `Number` | 100 | dialog高度 |
| position     | `String` | "absolute" | dialog定位方式 |
| display     | `String` | - | dialog初始化时是否显示，默认为显示 |
| top     | `Number` | - | dialog垂直位置，默认居中 |
| left     | `Number` | - | dialog水平位置，默认居中 |
| modal     | `Number` | 0 | 是否是模态 |
| draggable     | `Number` | 1 | 是否可以拖动 |
| tpl    | `Object` | {	head: headTplStr,	content: contentTplStr, foot: footTplStr } | 头部、内容区、尾部分别对应的tpl |
| initOnce    | `Number` | 0 | 使用事件触发方式初始化时控制是只初始化一次还是每次触发都初始化一个新的dialog对象 |
| onComplete    | `Function` | - | 初始化结束时可以使用的回调 |
| debug    | `Number` | 1 | 是否是调试，可以给每个dialog对象一个随机背景色方便区分 |

#### type
| 参数        | 类型 | 默认值        | 描述 |
| ------------- |:-----|:--------:| -----:|
| type     | `String` | - | 触发事件类型 |

### 调用函数 ###

| 函数名        | 参数 | 描述 |
| ------------- |:--------:| -----:|
| show     | speed | 显示dialog |
| close     | speed | 关闭（隐藏）dialog |
| destroy     | - | 销毁dialog |
| unBindDialog     | - | 提供显式解除绑定触发初始化事件的方法

## Changelog
* 2014/07/01
    - 给每个dialog增加一个公共类名g-dialog，关闭按钮样式从close改成.g-dialog .close
    - 修复modal dialog默认隐藏时，mask没有同步隐藏的bug
    - 初始化参数增加customBodyClass，在该dialog对象出现时给body加指定的类，用来做自定义dialog和对应的mask
