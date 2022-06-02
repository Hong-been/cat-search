export default class RandomButton {
	constructor({$target, onRandomClick}) {
		const $randomButton = document.createElement("button");
		this.$randomButton = $randomButton;
		this.$randomButton.innerHTML = `<i class="fa-solid fa-shuffle shuffleIcon"></i>`;

		$randomButton.className = "RandomButton";
		$target.appendChild($randomButton);

		$randomButton.addEventListener("click", onRandomClick);
	}
}
