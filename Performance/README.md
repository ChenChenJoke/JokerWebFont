



##Web性能优化：图片优化###

浏览器新提供的performance接口精确的告诉我们当访问一个网站页面时当前网页每个处理阶段的精确时间(timestamp)，以方便我们进行前端分析。
它是浏览器的直接实现，比之前在网页中用js设置Date.time或者cookie来分析网页时间上要精确很多。


![alt text](http://www.w3.org/TR/resource-timing/resource-timing-overview-1.png "Title")
'''java

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

'''
