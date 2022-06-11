import BaseModal from "./BaseModal.js";

export default class ImageInfo extends BaseModal {
	constructor({$target, data}) {
		super(`
			<header class="title">
			<h3 class="name"></h3>
			<button class="CloseButton">
				<i class="fa-solid fa-xmark closeIcon"></i>
			</button>
			</header>
			<img class="image"/>        
			<ul class="description"></ul>
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
		this.$contents = this.$element.querySelector(".content-wrapper");

		const $name = this.$element.querySelector(".name");
		const $image = this.$element.querySelector(".image");
		const $desc = this.$element.querySelector(".description");

		$name.innerText = "";
		$image.src = "";
		$image.alt = "";
		$desc.innerHTML = "";

		if (this.data.visible) {
			const {name, url, temperament, origin} = this.data.image;

			$name.innerText = name;
			$image.src = url;
			$image.alt = name;

			const li1 = document.createElement("li");
			const li2 = document.createElement("li");

			li1.innerText = `Temperament: ${temperament}`;
			li2.innerText = `Origin: ${origin}`;

			const fragment = document.createDocumentFragment();
			fragment.appendChild(li1);
			fragment.appendChild(li2);
			$desc.appendChild(fragment);

			this.$element.classList.remove("fadeOut");
			this.$element.classList.add("fadeIn");
		} else {
			this.$element.classList.remove("fadeIn");
			this.$element.classList.add("fadeOut");
		}
	}
}
