export default class SearchInput {
	constructor({$target, initialState, onAddSearchedKeyword, onSearch}) {
		this.state = initialState;

		const $searchForm = document.createElement("form");
		const $searchInput = document.createElement("input");

		this.$searchInput = $searchInput;
		this.$searchInput.placeholder = "Search";
		this.$searchInput.autofocus = true;
		this.$searchInput.addEventListener("click", () => {
			this.$searchInput.value = "";
		});

		$searchInput.className = "SearchInput";
		$searchForm.appendChild($searchInput);
		$target.insertAdjacentElement("afterbegin", $searchForm);

		$searchForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const value = $searchInput.value;

			onAddSearchedKeyword(value);
			onSearch(value);
		});
		this.state = initialState;
		this.render();
	}
	setState(nextState) {
		this.state = nextState;
		this.render();
	}
	render() {
		this.$searchInput.value = this.state.currentKeyword;
	}
}
