import BaseComponent from "./BaseComponent.js";

export default class Loading extends BaseComponent {
	constructor({$target, data}) {
		super(`
			<div class="Modal">
				<dialog class="content-wrapper">
					<p class="title">🐈 🐈‍⬛ 🐈 🐈‍⬛ 🐈 🐈‍⬛ 🐈 🐈‍⬛ 🐈 🐈‍⬛ 🐈</p>
				</dialog>
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
		const $content = this.$element.querySelector(".content-wrapper");

		if (this.data) {
			$content.showModal();
			this.$element.style.display = "block";
		} else {
			$content.close();
			this.$element.style.display = "none";
		}
	}
}
