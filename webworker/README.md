# webworker简介
> 估计很多人还没用过webworker，我作为一个low到家的前端工程师。以下我要介绍一下webworker

至 2008 年 W3C 制定出第一个 HTML5 草案开始，HTML5 承载了越来越多崭新的特性和功能。它不但强化了 Web 系统或网页的表现性能，而且还增加了对本地数据库等 Web 应用功能的支持。其中，最重要的一个便是对多线程的支持。在 HTML5 中提出了工作线程（Web Worker）的概念，并且规范出 Web Worker 的三大主要特征：能够长时间运行（响应），理想的启动性能以及理想的内存消耗。Web Worker 允许开发人员编写能够长时间运行而不被用户所中断的后台程序，去执行事务或者逻辑，并同时保证页面对用户的及时响应。本文深入 HTML5 多线程规范，讲述多线程实现原理、方法，同时以实例的形式讲解 HTML5 中多线程编程以及应用。
W3C 中的工作线程规范到目前为止已经定义了出了一系列公共接口，它允许 Web 程序开发人员去创建后台线程在他们的主页面中并发的运行脚本。这将使得线程级别的消息通信成为现实。
随便搭建一个服务器我们上先写两个文件，一个是webworker.html的主文件，另一个是webworker.js需要处理异步任务的处理器。

webworker.html如下：

```javascript
<div id = "hello" style='width:300px;height:300px;background-color:blue;color:red;font-size: 16px'></div> 
<div id = "webworker35" style='width:300px;height:300px;background-color:black;color:white;font-size: 16px'></div> 
<div id = "webworker45" style='width:300px;height:300px;background-color:green;color:yellow;font-size: 16px'></div> 

<script> 
  document.querySelector('#hello').onclick = function() { 
    console.log('hello world'); 
    document.querySelector('#hello').innerHTML += "hello world <br>";

  }; 


 
  var worker35 = new Worker('webworker.js'); 
  worker35.postMessage(35); 
  worker35.onmessage = function(event) { 
    var data = event.data; 
    document.querySelector('#webworker35').innerHTML = data;
    console.log(data);
  }; 
 
  worker35.onerror = function(event) { 
  	// filename、lineno 和 message，分别表示错误的文件名、代码行号和完整的错误信息：
    console.log(event.filename, event.lineno, event.message); 
  }; 


var worker40 = new Worker('webworker.js'); 
  worker40.postMessage(40); 
  worker40.onmessage = function(event) { 
    var data = event.data; 
    document.querySelector('#webworker45').innerHTML = data;
    console.log(data);
  }; 
 
  worker40.onerror = function(event) { 
  	// filename、lineno 和 message，分别表示错误的文件名、代码行号和完整的错误信息：
    console.log(event.filename, event.lineno, event.message); 
  }; 


</script> 

```

webworker.js如下：

```javascript
self.onmessage = function(event) { 
  var data = event.data; 
  var ans = fibonacci(data); 
  this.postMessage(ans); 
}; 
 
function fibonacci(n) { 
  return n < 2 ? n : arguments.callee(n - 1) + arguments.callee(n - 2); 
} 

```

这段代码很简单就是创建两个webworker对象，功能完全一样。有三个div
第一个点击显示hello world!
第二个显示斐波那契数列的第35个数
第三个显示斐波那契数列的第40个数
ps:斐波那契数列如果放入主线程做这件事保证UI卡的死死的，很有可能会出现ANR。所以我们开启了两个后台的worker来操作这件事儿。

为了印证移动端的效果怎么样，我们把页面放在微信中进行访问。随着页面出现我们不断的点击第一个div，希望他一直有操作，证明UI进程没有被卡死。
结果如下图：


![image](https://github.com/ChenChenJoke/JokerWebFont/blob/master/webworker/images/weixin2.png?raw=true)





