import BaseComponent from "../core/Component.js";

export default class SearchInput extends BaseComponent {
	constructor(target, props) {
		super(target, props);
		this.setState({currentKeyword: this.props.currentKeyword});
	}

	componentDidMount() {
		this.searchInput = this.element.querySelector(".SearchInput");

		this.element.addEventListener("submit", (e) => {
			e.preventDefault();

			const value = this.searchInput.value;

			this.props.onAddSearchedKeyword(value);
			this.props.onSearch(value);
		});
	}

	template() {
		return `
		<form>
			<input type="text" placeholder="Search Cats 🐈" autofocus class="SearchInput" value=${this.state.currentKeyword}></input>
	</form>
	`;
	}
}
