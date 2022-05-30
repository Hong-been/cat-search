export default class ImageInfo {
	$imageInfo = null;
	data = null;

	constructor({$target, data}) {
		const $imageInfo = document.createElement("div");
		$imageInfo.className = "Modal";
		this.$imageInfo = $imageInfo;
		$target.appendChild($imageInfo);

		$imageInfo.addEventListener("click", (e) => {
			if (e.target !== $imageInfo) return;

			this.setState({
				visible: false,
				image: null,
			});
		});

		window.addEventListener("keydown", (e) => {
			if (e.key === "Esc" || e.key === "Escape") {
				this.setState({
					visible: false,
					image: null,
				});
			}
		});

		this.$imageInfo.innerHTML = `
        <dialog class="content-wrapper" open>
          <header class="title">
            <h2 class="name"></h2>
            <button class="close">❌</button>
          </header>
          <img id="img"/>        
          <ul class="description"></ul>
        </dialog>`;

		const closeButton = this.$imageInfo.querySelector(".close");
		closeButton.addEventListener("click", () => {
			this.setState({
				visible: false,
				image: null,
			});
		});

		this.data = data;
		this.render();
	}

	setState(nextData) {
		this.data = nextData;
		this.render();
	}

	render() {
		if (this.data.visible) {
			const {name, url, temperament, origin} = this.data.image;

			this.$imageInfo.querySelector(".name").innerText = name;
			this.$imageInfo.querySelector("#img").src = url;
			this.$imageInfo.querySelector("#img").alt = name;

			const desc = this.$imageInfo.querySelector(".description");

			const fragment = document.createDocumentFragment();

			const li1 = document.createElement("li");
			li1.innerText = `성격: ${temperament}`;

			const li2 = document.createElement("li");
			li2.innerText = `태생: ${origin}`;

			fragment.appendChild(li1);
			fragment.appendChild(li2);

			desc.innerHTML = "";
			desc.appendChild(fragment);

			this.$imageInfo.style.display = "block";
		} else {
			this.$imageInfo.style.display = "none";
		}
	}
}
