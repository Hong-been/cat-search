import BaseComponent from "../core/Component.js";
import HeaderButtons from "./HeaderButtons.js";
import SearchInput from "./SearchInput.js";
import SearchHistory from "./SearchHistory.js";
import {getLocalStorage, setLocalStorage, getDom} from "../utils/index.js";

const HISTORY_LIMIT = 10;

export default class Header extends BaseComponent {
	constructor(target, props) {
		super(target, props);

		const storageHistory = getLocalStorage("history");
		this.setState({
			currentKeyword: "",
			searchedKeywords: storageHistory ? storageHistory.split(",") : [],
		});
	}

	componentDidMount() {
		const {onSearch, onRandomClick} = this.props;

		const buttons = getDom(".Buttons");
		const searchHeader = getDom(".SearchHeader");
		const searchHistory = getDom(".SearchHistory");

		new HeaderButtons(buttons, {onRandomClick});

		new SearchInput(searchHeader, {
			currentKeyword: this.state.currentKeyword,
			onAddSearchedKeyword: (keyword) => {
				this.setState({
					searchedKeywords:
						this.state.searchedKeywords.length < HISTORY_LIMIT
							? [...this.state.searchedKeywords, keyword]
							: [...this.state.searchedKeywords.slice(1), keyword],
				});
				setLocalStorage("history", [...this.state.searchedKeywords]);
			},
			onSearch,
		});

		this.searchHistory = new SearchHistory(searchHistory, {
			history: this.state.searchedKeywords,
			onKeywordClick: (e) => {
				const keyword = e.target.closest(".searcedKeywordButton");
				if (!keyword) return;

				this.setState({currentKeyword: keyword.innerText});
				onSearch(keyword.innerText);
			},
		});
	}

	template() {
		return `
			<div class="Buttons"></div>
			<h1 class="HeaderTitle">Get Your Cats 🐈</h1>
			<div class="SearchHeader"></div>
			<ul class="SearchHistory"></ul>
	`;
	}
}
