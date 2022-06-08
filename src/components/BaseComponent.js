export default class BaseComponent {
	constructor(htmlString) {
		const template = document.createElement("template");
		template.innerHTML = htmlString;
		this.$element = template.content.firstElementChild;
	}
}
