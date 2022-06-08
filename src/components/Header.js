import RandomButton from "./RandomButton.js";
import ThemeButton from "./ThemeButton.js";
import SearchInput from "./SearchInput.js";
import SearchHistory from "./SearchHistory.js";
import BaseComponent from "./BaseComponent.js";

const HISTORY_LIMIT = 10;

export default class Header extends BaseComponent {
	constructor({$target, onSearch, onRandomClick}) {
		super(`
			<header id="Header">
				<div class="Buttons"></div>
				<h1 class="HeaderTitle">Get Your Cats 🐈</h1>
				<div class="SearchHeader"></div>
			</header>
		`);

		this.state = {
			currentKeyword: "",
			searchedKeywords: window.localStorage.getItem("history").split(",") || [],
		};

		$target.appendChild(this.$element);

		const $buttons = this.$element.querySelector(".Buttons");
		this.themeButton = new ThemeButton({$target: $buttons});
		this.randomButton = new RandomButton({
			$target: $buttons,
			onRandomClick,
		});

		const $searchHeader = this.$element.querySelector(".SearchHeader");
		this.searchInput = new SearchInput({
			$target: $searchHeader,
			initialState: {currentKeyword: this.state.currentKeyword},
			onAddSearchedKeyword: (keyword) => {
				this.setState({
					...this.state,
					searchedKeywords:
						this.state.searchedKeywords.length < HISTORY_LIMIT
							? [...this.state.searchedKeywords, keyword]
							: [...this.state.searchedKeywords.slice(1), keyword],
				});
				window.localStorage.setItem("history", [
					...this.state.searchedKeywords,
				]);
			},
			onSearch,
		});

		this.searchHistory = new SearchHistory({
			$target: this.$element,
			initialState: {history: this.state.searchedKeywords},
			onKeywordClick: (e) => {
				const keyword = e.target.closest(".searcedKeywordButton");
				if (!keyword) return;

				this.setState({...this.state, currentKeyword: keyword.innerText});
				onSearch(keyword.innerText);
			},
		});
	}
	setState(nextState) {
		this.state = nextState;
		this.searchInput.setState({currentKeyword: this.state.currentKeyword});
		this.searchHistory.setState({history: this.state.searchedKeywords});
	}
}
