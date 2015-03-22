



##Web性能优化：图片优化###

浏览器新提供的performance接口精确的告诉我们当访问一个网站页面时当前网页每个处理阶段的精确时间(timestamp)，以方便我们进行前端分析。
它是浏览器的直接实现，比之前在网页中用js设置Date.time或者cookie来分析网页时间上要精确很多。


![alt text](http://www.w3.org/TR/resource-timing/resource-timing-overview-1.png "Title")
```java

readyStart = timing.fetchStart - timing.navigationStart; // 准备新页面时间耗时
redirectTime = timing.redirectEnd - timing.redirectStart; // 重定向耗时
appcacheTime = timing.domainLookupStart - timing.fetchStart; // Appcache 耗时
unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart; // unload 前文档耗时
lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart; // DNS 查询耗时
connectTime = timing.connectEnd - timing.connectStart; // TCP连接耗时
requestTime = timing.responseEnd - timing.requestStart; // request请求耗时
initDomTreeTime = timing.domInteractive - timing.responseEnd; // 请求完毕至DOM加载:
domReadyTime = timing.domComplete - timing.domInteractive; // 解释dom树耗时:
loadTime = timing.loadEventEnd - timing.navigationStart // 从开始至load总耗时:

```

###performanceNavigation(performance.navigation)对象的成员
##### performanceNavigation.type 
返回值应该是0,1,2 中的一个.分别对应三个枚举值:

**0. : TYPE_NAVIGATE  (用户通过常规导航方式访问页面,比如点一个链接，或者一般的get方式.)**

**1. : TYPE_RELOAD  (用户通过刷新,包括JS调用刷新接口等方式访问页面)**

**2. : TYPE_BACK_FORWARD (用户通过后退按钮访问本页面)**

**3. ps:草案中其实还有  TYPE_RESERVED (保留,其他非前三种方式访问.)**

 

#####performanceNavigation.redirectCount

一个只读属性,返回当前页面是几次重定向才过来的.但是这个接口有同源策略限制,即仅能检测同源的重定向.######

bugs:

     1. IE9,当一个同源的页面a连接到地址b(是否于a,c同源都如此),后被重定向到同源页面c时.navigation.redirectCount居然会是1.而不是0,此bug已被IE10 PP2修复.**

###performanceTiming(performance.timing)对象的成员:

 

 

####.navigationStart 

浏览器完成卸载前一个文档的时间(也就是准备加载新页面的那个起始时间).如果没有前一个文档，那么就返回 timing.fetchStart的值.

似乎只有Chrome 非常严格遵守了此草案. 即不把刷新页面 ，以及一个标签页输入地址到指定页面，视为发生文档的卸载

bugs:

     1. IE9,当发生重定向时,.navigationStart 会是0. IE10 PP2 已修复此问题.

     2. IE9-IE10 PP2,的一个问题是刷新当前页面,或在某个标签页输入地址为非相同页面时, 会被视为存在前一个文档，也就是说,其navigationStart会早于fetchStart.(除非在当前页再次输入地址按回车.再次进入该页面，则被视为无前一个文档被卸载.).而实际上这时候navigationStart,是unloadEventEnd的时间.

     3. Firefox7-Firefox10,一个新标签页也会被视为一个有效的文档. 所以这时候,会有值，且不是fetchStart的值.

 

####.unloadEventStart

如果前一个文档，和当前文档同源,返回前一个文档发生unload事件前的时间.如果没有前一个文档，或不同源,则返回0.

bugs:

     1. IE9-IE10 pp2,Chrome17-,在前一个文档与当前文档中间发生重定向时, 且前后两个文档同源时, unloadEventStart,也会返回0

 

####.unloadEventEnd

如果前一个文档和当前文档同源.返回前一个文档发生unload事件的时间. 如果没有前一个文档，或不同源,则返回0.

 

如果,发生了HTTP重定向,或者类似的事情.并且,从导航开始中间的每次重定向，并不都和当前文档同域的话,.则返回0

bugs:

     1. IE9-IE10 pp2,Chrome17-,在前一个文档与当前文档中间发生重定向时, 且前后两个文档同源时, unloadEventEnd,也会返回0

 

 

####.redirectStart

如果,发生了HTTP重定向,或者类似的事情.并且,从导航开始,中间的每次重定向，都和当前文档同域的话,就返回开始重定向的,timing.fetchStart的值.其他情况，则返回0.

bugs:

     1. IE9-IE10 pp2,在页面a,链接到地址b,并重定向到与b同源的页面c时. redirectStart,将为0.即同源策略，居然会考虑导航页.

 

 

####.redirectEnd

如果,发生了HTTP重定向,或者类似的事情.并且,从导航开始,中间的每次重定向，都和当前文档同域的话,就返回最后一次重定向，接收到最后一个字节数据后的那个时间.其他情况则返回0.

bugs:

     1. IE9-IE10 pp2,在页面a,链接到地址b,并重定向到与b同源的页面c时. redirectSEnd,将为0.即同源策略，居然会考虑导航页.

 

 

####.fetchStart

如果一个新的资源(这里是指当前文档)获取被发起,或类似的事情发生,则 fetchStart必须返回用户代理开始检查其相关缓存的那个时间,其他情况则返回开始获取该资源的时间.

 

 

 

####.domainLookupStart 

返回用户代理对当前文档所属域进行DNS查询开始的时间. 如果此请求没有DNS查询过程,如长连接，资源cache,甚至是本地资源等. 那么就返回 fetchStart的值.

bugs:

     1. Firefox7-Firefox10,的实现有错误. 因为其值,并没有遵守标准所描述的对应时间节点.而是默认以navigationStart作为时间起点,并以中间的重定向时间做累加.而得到domainLookupStart的时间.即使这个重定向是非同源的重定向.所消耗的时间都会被计算进去. 那么，这也就解释了，为什么当没有重定向发生时, domainLookupStart - fetchStart, 我们往往会得到一个负值的原因,因为navigationStart,是要早于 fetchStart的.

 

 

####.domainLookupEnd

返回用户代理对结束对当前文档所属域进行DNS查询的时间.如果此请求没有DNS查询过程,如长连接，资源cache,甚至是本地资源等. 那么就返回 fetchStart的值.

bugs:

     1.参考domainLookupStart的bug. End具备相同的问题.


 

####.connectStart

返回用户代理向服务器服务器请求文档，开始建立连接的那个时间,如果此连接是一个长连接,又或者直接从缓存中获取资源（即没有与服务器建立连接）.则返回domainLookupEnd的值.

bugs:

     1. Firefox7 当资源走cache,即并未创建连接时. connentStart 的值为0.

     2. Firefox8-Firefox10,当并未创建连接时,connetStart的值是fetchStart的值，而不是domainLookEnd的值. 但这里涉及到一个惯性问题，因为domainLookupEnd的累积时间就已经背离了标准了，所以即使connectStart遵守标准.也是一个有问题的值.

 

####.connectEnd

返回用户代理向服务器服务器请求文档，建立连接成功后(注意，不是断开连接的时间.)的那个时间.如果此连接是一个长连接，又或直接从缓存中获取资源 （即没有与服务器建立连接）,则返回domainLookupEnd的值.

bugs:

     参考connectStart的问题.connectEnd具备同样的问题.

 

 

如果连接建立失败,而用户代理进行重连,则connectStart和connectEnd则应该是这次重连的相关的值.其中connectEnd必须包括建立连接的时间以及,SSH握手协议和SOCKS认证等时间.

 

 

####.secureConnectionStart

可选特性.用户代理如果没有对应的东东,就要把这个设置为undefined.如果有这个东东,并且是HTTPS协议,那么就要返回开始SSL握手的那个时间. 如果不是HTTPS, 那么就返回0.

补充:Firefox7-10,IE9-IE10 PP2,都木有实现这个api.所以始终是undefined.

 

 

 

####.requestStart

返回从服务器、缓存、本地资源等,开始请求文档的时间. 

 

如果请求中途,连接断开了,并且用户代理进行了重连，并重新请求了资源,那么requestStart就必须为这个新请求所对应的时间.

 

**performance.timing 并不包含一个 单表请求结束的"requestEnd"接口. 原因有两点:**

     1. 用户代理所能确定的请求的结束,并不能代表正确的网络栓书中的结束时间. 所以设计这个属性并没什么用处.

     2. 一些用户代理，如果要封装一个代表HTTP层面的，请求结束时间的接口,成本会非常高昂.

bugs: 
     1. Firefox7,直接走本地缓存时,.requestStart的值将为0. (Firefox8已修复此问题)
 

 

 

####.responseStart

返回用户代理从服务器、缓存、本地资源中，接收到第一个字节数据的时间.

 

 

####.responseEnd

返回用户代理接收到最后一个字符的时间，和当前连接被关闭的时间中，更早的那个. 同样,文档可能来自服务器、缓存、或本地资源.

补充: 此值的读取应该是在我们可以确保真的是Response结束以后. 比如window.onload.  因为考虑到chunked输出的情况. 那么我们脚本执行，并获取该值时，响应还没有结束. 这就会导致获取时间不准确.

 

bugs : 
 

     1. IE10 PP2, 以及Chrome17- ，走本地缓存时.在文档中间的脚本执行时去读取此值, 将为0. IE9本来没有问题,结果IE10 PP2,反倒有了问题.
 

     2. Chrome16-,(Chrome17,已修复此问题.)在地址栏输入相同地址,走本地缓存时. responseEnd的时间，居然早于responseStart的时间. （不得不承认，这简直就是奇葩啊!）
 

     3. Chrome17-,从页面a,到地址b,再重定向到地址c, 此时如果地址c是走缓存.则. ResponseEnd的时间，会遭遇ResponseStart的时间.(好吧,我们把希望寄予Chrome18好了.)
 

 

实现差异:(由于草案中，并未提及,当文档被分段输出后.在中间文档数据，接受过程中,responseEnd应如何处理,导致浏览器实现存在差异.)
* IE9 - IE10 PP2 , Firefox8-Firefox10,在不走存在Response阶段（非走cache的情况下.）.以接收第一个chunked包结束的时间作为.responseEnd的时间.(这将导致后续的一系列问题.)*
*Chrome17-,Firefox7,则在分段数据的接受过程中，不会更新.responseEnd的时间,其值,始终为0.*

 

 

####.domLoading 

返回用户代理把其文档的 "current document readiness" 设置为 "loading"的时候.

(current document readiness 其实就是document.readyState API对应的状态.)

参考:http://dev.w3.org/html5/spec/dom.html#current-document-readiness

 

bugs : 

     1. IE9. 在分段输出文档的情况下，该值总是要晚于最终responseEnd的值. 基于responseEnd的IE实现的bug.这也合情合理.
 

 

实现差异:
     iE9 - IE10 PP2 , 当文档是chunked方式输出的时候.总是要等最后一个chunked被浏览器接收后,domLoading才会有有效值.  也就是说,IE中目前的状况是.domLoading.无论如何，都要晚于responseEnd.其他浏览器则无此问题.  但是这个问题导致我们计算IE下DOM Parse不准确. 即 domInteractive - domLoading 甚至会经常得到0. 
 

 

####.domInteractive

返回用户代理把其文档的 "current document readiness" 设置为 "interactive"的时候.

从标准来说,domReady的状态为"interactive"时,意味着,文档解析结束了. 因为标准中描述, DOM树创建结束后第一件事，就是把 "current document readiness" 设置为"interactive"

参考:http://dev.w3.org/html5/spec/the-end.html#the-end 中第一步.

 

bugs : 

     1. IE9,IE10 PP2 . 在分段输出文档的情况下，该值并不是全部文档解析完成后的时间,而是第一个数据块被解析完成的时间,基于responseEnd的IE实现的bug.经过向后推定这也合情合理.
 
实现差异:(由于草案中，并未提及,文档解析并未结束时,其默认值的应该是多少.导致浏览器实现有差异.)
    按我个人理解，并未解析结束，应该为0. 但是IE似乎对这个东西理解不太一样. 其他浏览器会是0. 但是. IE9-IE10 PP2,则会比较有趣.即使是分段输出,我取到的值.也和onload以后去到的,domInteractive的值是一致的.  导致这一神奇现象的原因是,正式IE系的bug所导. 该时间是错误的引用了,DOM解析完成第一个数据块的时间.而不是整个文档的. 但是纠结起来就要挖掘更深层次的原因了. 因为草案只说该值体现的是,用户代理把"current document readiness" 设置为 "interactive"的时间.如果IE系处理分段输出的html文档，向来都是这样做的。那么该值与其他浏览器的差异。也是可以理解的. 
 

####.domContentLoadedEventStart

返回文档发生 DOMContentLoaded事件的时间.

参考:http://dev.w3.org/html5/spec/the-end.html#the-end  中第4步.
DOMContentLoad和 DOMInteractive 之间差了两个步骤. 其中之一是, 所有open elements出栈 ，然后去看看 待运行的script list中是否有需要运行的脚本,如果有则执行，一直到这个列表为空了.再触发DOMContentLoad.  需要主的是这个待运行脚本列表.有些可能在不同浏览器中，被加入进去的行为可能不同. 比如 document.write写入文档流的脚本，以及script deferr 的脚本.. 所以我们应该知道deferr的脚本也是要他推迟domContentLoaded的，也就是我们最常用的所谓domReady.(至少html5的规范是如此.)
 

 

 

####.domContentLoadedEventEnd

文档的DOMContentLoaded 事件的结束时间.

补充:所谓事件结束的时间，是指，如果DOMContentLoaded事件被开发者注册了回调事件.那么这个时间的End时间减去Start的时间.就会是这个回调执行的大概事件. 当然居于部分浏览器实现可能会有2-3ms的误差. 但是这个时间，基本可以忽略不计. 类似的情况还有后面的.loadEventStart,End. 即 window.onload 所有回调所消耗的时间.




 

####.domComplete

返回用户代理把其文档的 "current document readiness" 设置为 "complete"的时候.




***PS:如果 current document readiness 的某个状态被多次触发，那么对应的  domLoading, domInteractive, domContentLoadedEventStart, domContentLoadedEventEnd and domComplete这些对应的API返回的时间,就应该是这个状态第一次触发的时间.***

 

 

####.loadEventStart

文档触发load事件的时间. 如果load事件没有触发,那么该接口就返回0.
