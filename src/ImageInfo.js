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
            <span class="name"></span>
            <button class="close">x</button>
          </header>
          <img id="img"/>        
          <ul class="description">
            <li id="temperament"></li>
            <li id="origin"></li>
          </ul>
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
			this.$imageInfo.querySelector(
				"#temperament"
			).innerText = `성격: ${temperament}`;
			this.$imageInfo.querySelector("#origin").innerText = `태생: ${origin}`;

			this.$imageInfo.style.display = "block";
		} else {
			this.$imageInfo.style.display = "none";
		}
	}
}
