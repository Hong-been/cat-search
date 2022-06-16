import BaseModal from "./BaseModal.js";

export default class Loading extends BaseModal {
	constructor({$target, data}) {
		super(`
			<div class="loading">
				<span class="loader"></span>
				<span>Getting🐈 🐈‍⬛ 🐈 🐈‍⬛ 🐈 🐈‍⬛ 🐈 🐈‍⬛ 🐈 🐈‍⬛ 🐈</span>
			</div>
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
