import BaseComponent from "./BaseComponent.js";

export default class ImageInfo extends BaseComponent {
	constructor({$target, data}) {
		super(`
			<div class="Modal">
				<dialog class="content-wrapper">
					<header class="title">
						<h3 class="name"></h3>
						<button class="CloseButton">
							<i class="fa-solid fa-xmark closeIcon"></i>
						</button>
					</header>
					<img class="image"/>        
					<ul class="description"></ul>
			</dialog>
			</div>
		`);

		$target.appendChild(this.$element);

		this.$element.addEventListener("click", (e) => {
			if (e.target !== this.$element) return;

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

		const $closeButton = this.$element.querySelector(".CloseButton");
		$closeButton.addEventListener("click", () => {
			console.log($closeButton);
			this.setState({
				visible: false,
				image: null,
			});
		});

		this.setState(data);
	}

	setState(nextData) {
		this.data = nextData;
		this.render();
	}

	render() {
		const $content = this.$element.querySelector(".content-wrapper");

		if (this.data.visible) {
			const {name, url, temperament, origin} = this.data.image;

			this.$element.querySelector(".name").innerText = name;
			this.$element.querySelector(".image").src = url;
			this.$element.querySelector(".image").alt = name;

			const desc = this.$element.querySelector(".description");

			const li1 = document.createElement("li");
			li1.innerText = `Temperament: ${temperament}`;

			const li2 = document.createElement("li");
			li2.innerText = `Origin: ${origin}`;

			desc.innerHTML = "";
			const fragment = document.createDocumentFragment();
			fragment.appendChild(li1);
			fragment.appendChild(li2);
			desc.appendChild(fragment);

			$content.showModal();
			this.$element.style.display = "block";
		} else {
			$content.close();
			this.$element.style.display = "none";
		}
	}
}
