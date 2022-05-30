export default class RandomButton {
	constructor({$target, onClick}) {
		const $randomButton = document.createElement("button");
		this.$randomButton = $randomButton;
		this.$randomButton.innerText = "랜덤 고양이 |";

		$randomButton.className = "RandomButton";
		$target.insertAdjacentElement("beforeend", $randomButton);

		$randomButton.addEventListener("click", onClick);
	}
}
