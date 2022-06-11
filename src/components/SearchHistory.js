import BaseComponent from "./BaseComponent.js";

export default class SearchHistory extends BaseComponent {
	constructor({$target, initialState, onKeywordClick}) {
		super(`<ul class="searchHistory"></ul>`);

		$target.appendChild(this.$element);
		this.$element.addEventListener("click", onKeywordClick);

		this.state = initialState;
		this.render();
	}
	setState(nextState) {
		this.state = nextState;
		this.render();
	}
	render() {
		this.$element.innerHTML = this.state.history
			? this.state.history
					.map((word) => {
						return `
        <li class="searcedKeyword">
          <button class="searcedKeywordButton blueSquire">${word}</button>
        </li>`;
					})
					.join("")
			: `<div>Try to search cats!</div>`;
	}
}
