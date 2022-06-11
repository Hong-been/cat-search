import BaseComponent from "./BaseComponent.js";

export default class BaseModal extends BaseComponent {
	constructor(modalContents) {
		super(`
			<div class="Modal fadeOut">
				<div class="content-wrapper">
        ${modalContents}
				</div>
			</div>
		`);
	}
}
