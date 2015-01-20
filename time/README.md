####让一组动画顺序执行###

我相信很多人都碰到过这样的问题，一个绚丽的页面一般都会有很多动画，但是如何让这些动画听话呢？
哎，太无奈了，在此我们拿jquery的动画库animation作为例子吧。
先上一段代码


大家先把下面的
'''java
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

