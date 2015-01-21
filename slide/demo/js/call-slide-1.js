$(function(){
	var slideOptions = {
		offset: 0,
		navSize: 1,
		itemSize: 154,
		scrollDuration: 500,
		autoScroll: true,
		autoDuration: 4000,
		containerId: ".slide-wrap",
		data: [{
			"content": "<img src='resource/animal-thumbnail.png'>",
			"id": 1
		}, {
			"content": "<img src='resource/city-thumbnail.png'>",
			"id": 2
		}, {
			"content": "<img src='resource/landscape-thumbnail.png'>",
			"id": 3
		}, {
			"content": "<img src='resource/sky-thumbnail.png'>",
			"id": 4
		}]
	};
	var Slide = new cycletabs.NavUI();
	Slide.init(slideOptions);
});