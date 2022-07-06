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
			<input type="text" placeholder="country, breed, temperament" autofocus class="SearchInput" value="${this.state.currentKeyword}"></input>
			<p class="searchExample">✏️ ex) Russia, United States, 먼치킨, 러시안블루, 페르시안, 샴, 스노우슈, Playful, Loving, Energetic</p>
	</form>
	`;
	}
}
