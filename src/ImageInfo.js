class ImageInfo {
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

			this.$imageInfo.innerHTML = `
        <dialog class="content-wrapper" open>
          <header class="title">
            <span>${name}</span>
            <button class="close">x</button>
          </header>
          <img src="${url}" alt="${name}"/>        
          <ul class="description">
            <li>성격: ${temperament}</li>
            <li>태생: ${origin}</li>
          </ul>
        </dialog>`;

			const closeButton = this.$imageInfo.querySelector(".close");
			closeButton.addEventListener("click", () => {
				this.setState({
					visible: false,
					image: null,
				});
			});
			this.$imageInfo.style.display = "block";
		} else {
			this.$imageInfo.style.display = "none";
		}
	}
}
