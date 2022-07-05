import BaseComponent from "../core/Component.js";

export default class SearchInput extends BaseComponent {
	constructor(target, props) {
		super(target, props);

		this.element.addEventListener("submit", (e) => {
			e.preventDefault();
			this.searchInput = this.element.querySelector(".SearchInput");
			const value = this.searchInput.value;

			this.props.onAddSearchedKeyword(value);
			this.props.onSearch(value);
		});

		this.element.addEventListener("click", (e) => {
			const SearchInput = e.target.closest(".SearchInput");
			if (SearchInput) {
				SearchInput.value = "";
			}
		});
	}

	initialState() {
		this.setState({currentKeyword: this.props.currentKeyword});
	}

	template() {
		return `
		<form>
			<input type="text" placeholder="Search Cats 🐈" autofocus class="SearchInput" value=${this.state.currentKeyword}></input>
	</form>
	`;
	}
}
