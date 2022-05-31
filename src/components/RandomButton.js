export default class RandomButton {
	constructor({$target, onRandomClick}) {
		const $randomButton = document.createElement("button");
		this.$randomButton = $randomButton;
		this.$randomButton.innerText = "랜덤 고양이 |";

		$randomButton.className = "RandomButton";
		$target.insertAdjacentElement("beforeend", $randomButton);

		$randomButton.addEventListener("click", onRandomClick);
	}
}
