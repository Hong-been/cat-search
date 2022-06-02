export default class Loading {
	data = null;

	constructor({$target, data}) {
		const $loading = document.createElement("div");
		$loading.className = "Modal";
		this.$loading = $loading;
		$target.appendChild($loading);

		this.data = data;

		this.render();
	}

	setState(nextData) {
		this.data = nextData;
		this.render();
	}

	render() {
		if (this.data) {
			this.$loading.innerHTML = `
        <dialog class="content-wrapper" open>
          <p class="title">🐈..🐈..🐈..</p>
        </dialog>`;
			this.$loading.style.display = "block";
		} else {
			this.$loading.style.display = "none";
		}
	}
}
