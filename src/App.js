import SearchInput from "./SearchInput.js";
import RandomButton from "./RandomButton.js";
import ThemeButton from "./ThemeButton.js";
import SearchResult from "./SearchResult.js";
import Loading from "./Loading.js";
import ImageInfo from "./ImageInfo.js";
import {api} from "./api.js";

export default class App {
	$target = null;
	state = {
		data: window.sessionStorage.getItem("lastestResults")
			? JSON.parse(window.sessionStorage.getItem("lastestResults"))
			: [],
		searchedKeyword: [],
	};

	constructor($target) {
		console.log(this);
		this.$target = $target;

		const $searchHeader = document.createElement("header");
		this.$searchHeader = $searchHeader;
		this.$searchHeader.className = "SearchHeader";
		$target.appendChild(this.$searchHeader);

		this.loading = new Loading({
			$target: $searchHeader,
			data: false,
		});

		this.randomButton = new RandomButton({
			$target: $searchHeader,
			onClick: async () => {
				this.loading.setState(true);

				try {
					const {data} = await api.fetchRandom50();
					this.setState({
						...this.state,
						data,
					});
				} catch (e) {
					console.error(e);
					alert("일시적으로 서버에 문제가 있습니다.");
				} finally {
					this.loading.setState(false);
				}
			},
		});

		this.searchInput = new SearchInput({
			$target: $searchHeader,
			initialData: [],
			onAddSearchedKeyword: (keyword) => {
				this.setState({
					...this.state,
					searchedKeyword:
						this.state.searchedKeyword.length < 5
							? [...this.state.searchedKeyword, keyword]
							: [...this.state.searchedKeyword.slice(1), keyword],
				});
			},
			onSearch: async (keyword) => {
				this.loading.setState(true);

				try {
					const {data} = await api.fetchCats(keyword);
					data
						? this.setState({
								...this.state,
								data,
						  })
						: this.setState({
								...this.state,
								data: [],
						  });

					window.sessionStorage.setItem(
						"lastestResults",
						JSON.stringify(this.state.data)
					);
				} catch (e) {
					console.error(e);
					alert("일시적으로 서버에 문제가 있습니다.");
				} finally {
					this.loading.setState(false);
				}
			},
		});

		this.themeButton = new ThemeButton({
			$target: $searchHeader,
		});

		this.searchResult = new SearchResult({
			$target,
			initialData: this.state.data,
			onClick: async (image) => {
				this.loading.setState(true);

				try {
					const {data} = await api.fetchCatById(image.id);

					this.imageInfo.setState({
						visible: true,
						image: data,
					});
				} catch (e) {
					console.error(e);
					alert("일시적으로 서버에 문제가 있습니다.");
				} finally {
					this.loading.setState(false);
				}
			},
		});

		this.imageInfo = new ImageInfo({
			$target,
			data: {
				visible: false,
				image: null,
			},
		});
	}

	setState(nextData) {
		console.log(nextData);

		this.state = nextData;

		this.searchInput.setState(this.state.searchedKeyword);
		this.searchResult.setState(this.state.data);
	}
}
