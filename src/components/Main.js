import BaseComponent from "./BaseComponent.js";
import SearchResult from "./SearchResult.js";

export default class Main extends BaseComponent {
	constructor({$target, initialData, onImageClick}) {
		super(`<main></main>`);

		$target.appendChild(this.$element);

		this.searchResult = new SearchResult({
			$target: this.$element,
			initialData,
			onImageClick,
		});
	}
}
