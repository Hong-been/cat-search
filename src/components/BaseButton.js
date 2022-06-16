import BaseComponent from "./BaseComponent.js";

export default class BlueSquireButton extends BaseComponent {
	constructor({children, onClick}) {
		super(`
    <button class="blueSquire" onClick=${onClick}>${children}</button>
		`);
	}
}
