(function preloadImages(images) {
	images.forEach((image) => {
		new Image().src = image.url;
	});
})(
	window.localStorage.getItem("lastestResults")
		? JSON.parse(window.localStorage.getItem("lastestResults")).slice(0, 3)
		: []
);
