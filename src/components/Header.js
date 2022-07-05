import BaseComponent from "../core/Component.js";
import HeaderButtons from "./HeaderButtons.js";
import SearchInput from "./SearchInput.js";
import SearchHistory from "./SearchHistory.js";
import {getDom} from "../utils/index.js";
import SearchHistoryStorage from "../utils/storage/searchHistoryStorage.js";

export default class Header extends BaseComponent {
	constructor(target, props) {
		super(target, props);
	}

	initialState() {
		this.setState({
			searchedKeywords: SearchHistoryStorage.get(),
		});
	}

	componentDidMount() {
		const {onSearch, onRandomClick} = this.props;

		const buttons = getDom(".Buttons");
		const searchHeader = getDom(".SearchHeader");
		const searchHistory = getDom(".SearchHistory");

		new HeaderButtons(buttons, {onRandomClick});

		new SearchInput(searchHeader, {
			currentKeyword: this.props.currentKeyword,
			onAddSearchedKeyword: (keyword) => {
				const newHistory = SearchHistoryStorage.add(keyword);
				this.setState({searchedKeywords: newHistory});
			},
			onSearch,
		});

		new SearchHistory(searchHistory, {
			history: this.state.searchedKeywords,
			onKeywordClick: (e) => {
				const keyword = e.target.closest(".searcedKeywordButton");
				if (keyword) {
					this.setState({currentKeyword: keyword.innerText});
					onSearch(keyword.innerText);
				}
			},
			onDeleteClick: (e) => {
				const deleteButton = e.target.closest(".deleteKeywordButton");
				if (deleteButton) {
					const keyword = deleteButton.dataset.keyword;
					const newHistory = SearchHistoryStorage.remove(keyword);
					this.setState({searchedKeywords: newHistory});
				}
			},
		});
	}

	template() {
		return `
			<div class="Buttons"></div>
			<h1 class="HeaderTitle">Search Cats 🐈</h1>
			<div class="SearchHeader"></div>
			<ul class="SearchHistory"></ul>
	`;
	}
}
