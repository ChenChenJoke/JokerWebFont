## Slide 组件 ##

Slide 组件可用于元素的轮播切换（包括Tab的轮播切换）。

由于该组件代码复杂配置多，目前本文档未能很好的覆盖其所有方面，也希望其他使用者能够一起进来维护文档。

### 兼容性 ###

已知兼容：

- IE6-10/Firefox/Chrome/Safari
- ltr/rtl

### 使用示例 ###

使用实例（Fis2中），具体实现可以参见Demo或者主站的广告轮播、新闻、皮肤盒子等模块：

```html
<div class="slide-wrap"></div>
```

```javascript
var Slide = require("home:widget/ui/cycletabs/cycletabs.js");
var slide = new Slide.NavUI();
var options = {
    containerId: ".slide-wrap",
    itemSize: 100,
    data: [{
        "content": "<p>content 1</p>",
        "id": 1
    }, {
        "content": "<p>content 2</p>",
        "id": 2
    }]
};
slide.init(options);
```

```css
.ui-nav .wrap { overflow: hidden; }
.ui-nav .nav-item-list { position: relative; }
.ui-nav .prev, .ui-nav .next { cursor: pointer; }

.slide-wrap { position: relative; width: 100px; }
.slide-wrap .nav-item { float: left; width: 100px; }
.slide-wrap .prev, .slide-wrap .next { position: absolute; z-index: 1; }
.slide-wrap .prev { left: 0; }
.slide-wrap .next { right: 0; }
```

### 参数说明 ###

| 参数        | 类型 | 默认值        | 描述 |
| ------------- |:-----|:--------:| -----:|
| offset     | `Number` | 1 | 默认选中项的偏移量 |
| navSize     | `Number` | 3 | 一屏呈现的项数 |
| itemSize     | `Number` | - | 每一项的像素宽度 |
| scrollDuration     | `Number` | 300 | 滚动过程花费的时间 |
| autoScroll     | `Bool` | false | 是否自动滚动 |
| autoDuration    | `Number` | 5000 | 两次滚动的时间间隔 |
| containerId    | `String` | - | 轮播容器的选择器 |
| dir    | `String` | "ltr" | 页面的文字流 |
| direction    | `String` | "h" | 滚动的轴向，"h"为横向滚动，可选"v"表示纵向滚动 |
| autoScrollDirection    | `String` | "forward" | 自动滚动发生的方向，值"forward"表示前向或向下滚动，可选项"backforward"表示向后或向上滚动 |
| data    | `Array` | - | 数组的每一项是一个包含属性"content"和idKey的key-value对象（"content"是该项的HTML字符串，idKey是该项的标识值） |
| idKey    | `String` | "id" | 第一项的idKey值 |
| quickSwitch    | `Boolean` | false | 快捷切换的控制开关 |
| showTitle    | `Boolean` | false | 为每项添加title属性的开关，可选项true将为每一项添加title属性值为其内容本身 |
| hoverContainerId	| `String` | - | hover容器（有了它就不再仅限于containerId指定的容器了），mouseenter时停止自动滚动，mouseleave时恢复自动滚动 |

**备注：**后期有升级一个显示当前项和总项数的设置，烦请 @坤哥 帮忙补全一下~

### 调用函数 ###

| 函数名        | 参数 | 描述 |
| ------------- |:--------:| -----:|
| switchNext     | - | 切换到下一项 |
| switchPrev     | - | 切换到前一项 |
| switchTo     | `Number` | 切换到第指定index的项数 |
| resize     | `Number` | 对外提供resize接口，在窗口宽度改变时根据参数同步调整

### 外部事件 ###
| 事件名        | 参数 | 描述 |
| ------------- |:--------:| -----:|
| e_click_prev     | - | 切换到前一项时抛出 |
| e_click_next    | - | 切换到下一项时抛出 |
| e_click_nav    | `Number` | 点击某一项时抛出，传递该项index序号 |
| e_hover_nav    | `Number` | hover到某一项时抛出，传递该项index序号 |
| e_click_switch    | `Number` | 点击快捷切换quickSwitch时抛出，传递被点击项index序号 |
| e_toggle    | `Object` | 点击当前项时抛出，传递{index: 当前项index序号} |
| e_change    | `Object` | 切换当前项时抛出，传递{isInit: 是否是初始化标识, index: 当前项index序号, itemObj:当前项对应的数据对象 |
