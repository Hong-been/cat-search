import BaseComponent from "../core/Component.js";
import SearchResult from "./SearchResult.js";

export default class Main extends BaseComponent {
	constructor(target, props) {
		super(target, props);

		new SearchResult(this.element, {
			results: this.props.results,
			onImageClick: this.props.onImageClick,
		});
	}
}
