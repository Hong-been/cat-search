import RandomButton from "./RandomButton.js";
import ThemeButton from "./ThemeButton.js";
import SearchInput from "./SearchInput.js";
import SearchHistory from "./SearchHistory.js";

const HISTORY_LIMIT = 5;

export default class Header {
	constructor({$target, onSearch, onRandomClick}) {
		this.state = {
			currentKeyword: "",
			searchedKeywords: [],
		};

		const $header = document.createElement("header");
		$header.id = "header";
		const $searchHeader = document.createElement("div");
		$searchHeader.className = "SearchHeader";

		$target.appendChild($header);

		this.themeButton = new ThemeButton({$target: $header});

		this.randomButton = new RandomButton({
			$target: $header,
			onRandomClick,
		});

		$header.appendChild($searchHeader);
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
			},
			onSearch,
		});

		this.searchHistory = new SearchHistory({
			$target: $header,
			initialState: {history: this.state.searchedKeywords},
			onKeywordClick: (e) => {
				const keyword = e.target.closest(".searcedKeyword");
				if (!keyword) return;

				this.setState({...this.state, currentKeyword: keyword.innerText});
				onSearch(keyword);
			},
		});
	}
	setState(nextState) {
		this.state = nextState;
		this.searchInput.setState({currentKeyword: this.state.currentKeyword});
		this.searchHistory.setState({history: this.state.searchedKeywords});
	}
}
