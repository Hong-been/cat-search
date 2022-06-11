import BaseComponent from "./BaseComponent.js";

export default class Loading extends BaseComponent {
	constructor({$target, data}) {
		super(`
			<div class="title">Getting🐈 🐈‍⬛ 🐈 🐈‍⬛ 🐈 🐈‍⬛ 🐈 🐈‍⬛ 🐈 🐈‍⬛ 🐈</div>
		`);

		$target.appendChild(this.$element);
		this.setState(data);
	}

	setState(nextData) {
		this.data = nextData;
		this.render();
	}

	render() {
		this.$content = this.$element.querySelector(".content-wrapper");

		if (this.data) {
			this.$element.classList.remove("fadeOut");
			this.$element.classList.add("fadeIn");
		} else {
			this.$element.classList.remove("fadeIn");
			this.$element.classList.add("fadeOut");
		}
	}
}
