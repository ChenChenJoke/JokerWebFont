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

然后我们点击链接从微信进入站点。

![image](https://github.com/ChenChenJoke/JokerWebFont/blob/master/webworker/images/weixin3.png?raw=true)

不断点击第一个div可以看到第一个div里面不断出现hello world，但是同时第二个div里的也出现了斐波那契数列的第35个数的计算结果。

![image](https://github.com/ChenChenJoke/JokerWebFont/blob/master/webworker/images/weixin4.png?raw=true)

随着时间的推移，在第四个div中斐波那契数列的第40个元素也随之出现。

![image](https://github.com/ChenChenJoke/JokerWebFont/blob/master/webworker/images/weixin5.png?raw=true)

测试手机型号为iphone7 plus 测试微信版本如下：

![image](https://github.com/ChenChenJoke/JokerWebFont/blob/master/webworker/images/weixin1.png?raw=true)

补充Android下的微信支持情况：

![image](https://github.com/ChenChenJoke/JokerWebFont/blob/master/webworker/images/weixin7.png?raw=true)

微信版本：

![image](https://github.com/ChenChenJoke/JokerWebFont/blob/master/webworker/images/weixin8.png?raw=true)

操作系统：

![image](https://github.com/ChenChenJoke/JokerWebFont/blob/master/webworker/images/weixin9.png?raw=true)

各个浏览器对于webworker的支持

![image](https://github.com/ChenChenJoke/JokerWebFont/blob/master/webworker/images/weixin6.png?raw=true)

> 测试结果：webworker在微信ios版里表现优异，没有出现异常问题。在微信Android版中表现良好（只出现过一次很长时间才执行webworker的情况，初步定位为Android的配置较低计算能力较差）

###FAQ###

用法：
```javascript
1、通过 var worker = new Worker(url) 加载一个 js 文件来创建一个 worker，同时返回一个 worker 实例。
2、通过 worker.postMessage(data) 方法来向 worker 发送数据。
3、绑定 worker.onmessage 方法来接收 worker 发送过来的数据。
4、可以使用 worker.terminate() 来终止一个 worker 的执行。
5、worker新线程：
6、绑定 onmessage 方法来接收主线程发送过来的数据。
7、通过 postMessage(data) 方法来向主线程发送数据。
8、可以使用 self.close() 来终止一个 worker 的执行。
9、最小化 的navigator 对象，包括 onLine、appName、appVersion、userAgent 和 platform 属性
10、setTimeout()、setInterval()、clearTimeout()、clearInterval() 方法
11、XMLHttpRequest 构造函数

12、任何时候都能中止 Worker。在 worker.js 中，我们可以用 self.close()方法，而在页面中，我们可以用 worker.terminal()方法，这时 error 和 message 事件也不会触发了。
13、可以通过importScripts() 引入其他工具js或者第三方类库(类库不能依赖BOM和DOM)



```

问题：

```javascript

1、同样有一个全局对象（worker 对象本身，this 和 self 引用的都是 worker 对象本身
2、Web Worker 中的代码不能访问 DOM
3、只读的 location 对象
4、各个浏览器对Worker的实现不大一致，例如FF里允许worker中创建新的worker,而Chrome中就不行

```

调试：

```javascript
chrome下的chrome://inspect/#workers可以进行调试。
```

> 结论：

```javascript

1、浏览器支持情况良好，几乎主流浏览器包括移动端都支持
2、对微信ios版本支持暂无问题，Android后续进行测试
3、根据他的特性可以做一些延时操作，或者不想阻塞UI线程的操作。
4、由于Worker可以调用XHR的构造函数，所以可以在Worker里发起异步请求（Worder中不能更新 UI线程也就是dom节点上的内容）
5、由于Worker跟父级不同域，所以需要保持用户登录状态的异步请求不可用。
6、Worker总可以嵌套添加ajax。

```

###### 最后大家记得去看文档(尤其mozilla基金会的)： ######
```javascript
https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
https://www.ibm.com/developerworks/cn/web/1112_sunch_webworker/
https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
```




