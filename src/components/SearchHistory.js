import BaseComponent from "../core/Component.js";

export default class SearchHistory extends BaseComponent {
	constructor(target, props) {
		super(target, props);
		this.setState({history: this.props.history});
	}

	componentDidMount() {
		this.element.addEventListener("click", this.props.onKeywordClick);
	}

	template() {
		return `
		${
			this.state.history
				? this.state.history
						.map((word) => {
							return `
		<li class="searcedKeyword">
			<button class="searcedKeywordButton blueSquire">${word}</button>
		</li>`;
						})
						.join("")
				: `<p>Search Cats!</p>`
		}`;
	}
}
