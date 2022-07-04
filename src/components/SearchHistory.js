import BaseComponent from "../core/Component.js";

export default class SearchHistory extends BaseComponent {
	constructor(target, props) {
		super(target, props);
	}

	initialState() {
		this.setState({history: this.props.history});
	}

	componentDidMount() {
		this.element.addEventListener("click", this.props.onKeywordClick);
		this.element.addEventListener("click", this.props.onDeleteClick);
	}

	template() {
		let templateString = ``;
		this.state.history
			? this.state.history.forEach((word) => {
					templateString += `
		<li class="searcedKeyword blueSquire">
			<button class="searcedKeywordButton">${word}</button>
			<button class="deleteKeywordButton" data-keyword=${word}>
				<i class="fa-solid fa-xmark closeIcon"></i>
			</button>
		</li>`;
			  })
			: `<p>Search Cats!</p>`;

		return templateString;
	}
}
