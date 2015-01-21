$(function(){
	var tabOptions = {
		offset: 1,
		navSize: 3,
		itemSize: 80,
		scrollDuration: 500,
		autoScroll: false,
		containerId: ".tabs-wrap",
		data:[{
			"content": "<a href='javascript:;'>Movie</a>",
			"id": 1
		}, {
			"content": "<a href='javascript:;'>Picture</a>",
			"id": 1
		}, {
			"content": "<a href='javascript:;'>Software</a>",
			"id": 1
		}, {
			"content": "<a href='javascript:;'>News</a>",
			"id": 1
		}, {
			"content": "<a href='javascript:;'>Games</a>",
			"id": 1
		}]
	};
	var Tabs = new cycletabs.NavUI();
	Tabs.init(tabOptions);
});