export default class RandomButton {
	constructor({$target, onRandomClick}) {
		const $randomButton = document.createElement("button");
		this.$randomButton = $randomButton;
		this.$randomButton.innerText = "Random Cats";

		$randomButton.className = "RandomButton";
		$target.appendChild($randomButton);

		$randomButton.addEventListener("click", onRandomClick);
	}
}
