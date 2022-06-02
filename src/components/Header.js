import RandomButton from "./RandomButton.js";
import ThemeButton from "./ThemeButton.js";
import SearchInput from "./SearchInput.js";
import SearchHistory from "./SearchHistory.js";

const HISTORY_LIMIT = 10;

export default class Header {
	constructor({$target, onSearch, onRandomClick}) {
		this.state = {
			currentKeyword: "",
			searchedKeywords: window.localStorage.getItem("history").split(",") || [],
		};

		const $header = document.createElement("header");
		$header.id = "Header";
		const $searchHeader = document.createElement("div");
		$searchHeader.className = "SearchHeader";

		$target.appendChild($header);

		this.themeButton = new ThemeButton({$target: $header});

		this.randomButton = new RandomButton({
			$target: $header,
			onRandomClick,
		});

		const $h1 = document.createElement("h1");
		$h1.classList.add("HeaderTitle");
		$h1.innerText = "Get Your Cats 🐈";
		$header.appendChild($h1);

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
				window.localStorage.setItem("history", [
					...this.state.searchedKeywords,
				]);
			},
			onSearch,
		});

		this.searchHistory = new SearchHistory({
			$target: $header,
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
