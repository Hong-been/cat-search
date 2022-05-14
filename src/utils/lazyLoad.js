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
