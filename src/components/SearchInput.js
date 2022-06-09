import BaseComponent from "./BaseComponent.js";

export default class SearchInput extends BaseComponent {
	constructor({$target, initialState, onAddSearchedKeyword, onSearch}) {
		super(`
			<form>
				<input type="text" placeholder="Search Cats 🐈" autofocus class="SearchInput">
		</form>
		`);

		this.$searchInput = this.$element.querySelector(".SearchInput");
		this.$element.addEventListener("submit", (e) => {
			e.preventDefault();

			const value = this.$searchInput.value;

			onAddSearchedKeyword(value);
			onSearch(value);
		});

		$target.appendChild(this.$element);
		this.setState(initialState);
	}
	setState(nextState) {
		this.state = nextState;
		this.render();
	}
	render() {
		this.$searchInput.value = this.state.currentKeyword;
	}
}
