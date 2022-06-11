import BaseComponent from "./BaseComponent.js";

export default class RandomButton extends BaseComponent {
	constructor({$target, onRandomClick}) {
		super(`
		<button class="blueSquire">
			<i class="fa-solid fa-shuffle shuffleIcon"></i>
		</button>`);
		this.$element.addEventListener("click", onRandomClick);

		$target.appendChild(this.$element);
	}
}
