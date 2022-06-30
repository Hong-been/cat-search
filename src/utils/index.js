export const getDom = (selector) => {
	return document.querySelector(selector);
};

export const imageLazyLoading = (elements) => {
	const io = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target.querySelector("img");
				img.src = entry.target.dataset.url;

				observer.unobserve(entry.target);
			}
		});
	});

	elements.forEach((element) => io.observe(element));
};

export const getLocalStorage = (key) => {
	return window.localStorage.getItem(key);
};
export const setLocalStorage = (key, value) => {
	console.log(`set localStorage: ${key}`);
	window.localStorage.setItem(key, value);
};

export const deboune = (time, callback) => {
	let timer;
	å;
};