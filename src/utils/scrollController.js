class ScrollControl {
	blockScroll() {
		this.scrollPosition = window.pageYOffset;
		document.body.style.overflow = "hidden";
		document.body.style.position = "fixed";
		document.body.style.top = `-${this.scrollPosition}px`;
		document.body.style.width = "100%";
	}
	nonBlockScroll() {
		document.body.style.removeProperty("overflow");
		document.body.style.removeProperty("position");
		document.body.style.removeProperty("top");
		document.body.style.removeProperty("width");
		window.scrollTo(0, this.scrollPosition);
	}
}

export const ScrollController = new ScrollControl();
