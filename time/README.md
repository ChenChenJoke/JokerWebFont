###让一组动画顺序执行###

我相信很多人都碰到过这样的问题，一个绚丽的页面一般都会有很多动画，但是如何让这些动画听话呢？
哎，太无奈了，在此我们拿jquery的动画库animation作为例子吧。
先上一段代码


大家先把下面的的html文档copy下去，写个html文件。
'''javascript
<meta charset="utf-8">
<html>
<style>
div {
	background:#aaa;
	width:18px;
	height:18px;
	position:absolute;
	top:10px;
}

</style>
<body>
	<div id='block1'></div>
	<div id='block2'></div>
</body>
<script src='jquery-1.9.1.js'></script>
'''

###animate.callback###

好了现在我要让两个block交替向右移，一般情况下我们用动画的时候会用到如下方法：

'''javascript
/*方法一*/
$('#block1').animate({left:'+=100'},function() {
	$('#block2').animate({left:'+=100'},function() {
		$('#block1').animate({left:'+=100'},function() {
			$('#block2').animate({left:'+=100'},function() {
				$('#block1').animate({left:'+=100'},function(){
				alert('动画结束');
				});
			});
		});
	});
});

'''
大家看到了 这个方法吧两个小方块，你动一下我动一下 ，交替最后弹出了一个“动画结束”。
这段代码没有什么问题.....但是如果动画比较多呢？一个页面可能 有20个动画比如：

这个是我之前在百度浏览器的时候做的官网
http://liulanqi.baidu.com/

这个是我之前在百度国际化的时候做hiclub的移动官网
http://www.cliponyu.com/mobile/index


这两个动画都非常多，如果用上面的方法简直反人类，幸好jquery给我们提供了更好的方法queue和dequeue



###queue和dequeue###



'''javascript
/*方法二*/
/*
var FUNC=[
	function() {$('#block1').animate({left:'+=100'},aniCB);},
	function() {$('#block2').animate({left:'+=100'},aniCB);},
	function() {$('#block1').animate({left:'+=100'},aniCB);},
	function() {$('#block2').animate({left:'+=100'},aniCB);},
	function() {$('#block1').animate({left:'+=100'},aniCB);},
	function(){alert('动画结束')}
];

var aniCB=function() {
	$(document).dequeue('myAnimation');
}

$(document).queue('myAnimation',FUNC);
aniCB();
'''

1，我首先建立了一个函数数组，里边是一些列需要依次执行的动画
2，然后我定义了一个回调函数，用dequeue方法用来执行队列中的下一个函数
3，接着把这个函数数组放到document上的myAnimation的队列中（可以选择任何元素，我只是为了方便而把这个队列放在document上）
4，最后我开始执行队列中的第一个函数

这样做的好处在于函数数组是线性展开，增减起来非常方便。
而且，当不要要继续进行接下来动画的时候(比如用户点了某个按钮)，只需要清空那个队列即可。而要增加更多则只需要加入队列即可

//清空队列
$(document).queue(“myAnimation”,[]);
//加一个新的函数放在最后
$(document).queue(“myAnimation”,function(){alert(“动画真的结束了！”)});

但是问题出现了，如果要的不仅仅是动画的依次执行，我需要队列中的两个动画并行，或者是3号动画执行到一半的时候4号动画
开始执行这种需求估计就完蛋了。

哎？我们还发现jquery里面还有一个delay来控制的动画时间的。

###delay###

'''javascript

/*第三种方法*/
/*
$(document).ready(function() {
	$('#block1')
	.animate({left: '+=100'})
	.delay(1000)
	.animate({left: '+=100'})
	.delay(1000)
	.animate({left: '+=100'});

	$('#block2')
	.delay(1000)
	.animate({left: '+=100'})
	.delay(1000)
	.animate({left: '+=100'})
	.delay(1000)
	.animate({left: '+=100'});
});*/

'''

我们也得到了跟第一个、第二个例子一样的效果，而且还可以通过时间控制了。这是不是就完整了呢？
但是你可以看到动画的队列是两个元素的队列，并不是一个队列，我们能分别控制他们，但是当我需要
他们交替执行的时候，必须精确的支出时间。在block2元素制动之前我先delay了1000ms。大家如果把
block2的元素后面的第一个delay去掉之后，大家看一下是什么结果。


###Time###

这个类是我在做上面两个官网的时候写的，之所以把它放到最后并不是它做的比上面三种方法好，仅仅是因为
场景不同，上面的方法没有满足的需求。大家可以在我上面发的官网里找到这段代码，
不过fisp压缩之后的代码，估计得还原才能看明白。

'''javascript
/*方法四*/

/*思路一，处理时间、事件顺序，由于事件绑定为初始状态。所以会出现动画还没有执行结束就开始事件阻塞动画。
 *event_list:事件仓库初始化时设定，running时不变
 *run_event_list:事件栈初始化时设定，running时改变先进先出
 * 看了一下jquery的delay，它实现的是单一元素队列，实际上animation的callback就是使用delay来实现
 * 但是delay后面跟的必须是jquery对象，不能是另一个dom的动画方法。
 * */

function Time() {
    this.event_list = [];
    this.run_event_list = [];
    var that = this;
    this.init = function (fn, parameter, time) {
        var delayTime = time ? time : 0;
        return {fn: fn, parameter: parameter, time: delayTime};

    };
    this.sandbox = function () {
        var current_event = that.run_event_list.shift();
        /*延迟执行*/
        setTimeout(function () {
            current_event.fn.apply(window, [current_event.parameter]);
        }, current_event.time);
    };
    this.start = function (outTime) {
        for (var i = 0; i < that.event_list.length; i++) {
            that.run_event_list.push(that.event_list[i]);
        }
        var t = window.setInterval(function () {
            if (that.run_event_list[0]) {
                that.sandbox();
            } else {
                clearInterval(t);
            }
        }, outTime);
        // 时间压出栈为1500毫秒，我在寻找不设定时间的方法。(下一步可能参考deferred来进行修改)

    };
    this.add = function (obj) {
        that.event_list.push(obj);
    }
};


function block1(){
	$('#block1').animate({left: '+=100'})
};
function block2(){
	$('#block1').animate({left: '+=100'})
}
function block3(){
	$('#block1').animate({left: '+=100'})
}
	
function block4(){
	$('#block2').animate({left: '+=100'})
};
function block5(){
	$('#block2').animate({left: '+=100'})
}
function block6(){
	$('#block2').animate({left: '+=100'})
}



var time = new Time();
//time.add(time.init(block1, ''),500);可以为动画单独指定延迟时间

time.add(time.init(block1, ''));
time.add(time.init(block4, ''));
time.add(time.init(block2, ''));
time.add(time.init(block5, ''));
time.add(time.init(block3, ''));
time.add(time.init(block6, ''));

time.start(500);// 可以为动画队列设定总体延迟时间


'''

我们的Time有一个event_list队列控制函数队列，有一个run_event_list一个函数沙箱每个要执行的函数都放在里面，所以
沙箱里永远都只有一个函数，我每去放入event_一个函数，就把event_list的函数拿出去一个执行，直到我们的函数队列
run_event_list中没有函数为止。start函数启动方法函数队列执行的时候，还可以加入每个方法的间隔，另外可以通过
方法的第三个时间参数，单独制定某一个方法延迟的时间。

> notice ：代码我已经上传，需要的同学可以下载一下试一试。