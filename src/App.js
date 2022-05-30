import SearchInput from "./components/SearchInput.js";
import RandomButton from "./components/RandomButton.js";
import ThemeButton from "./components/ThemeButton.js";
import SearchResult from "./components/SearchResult.js";
import Loading from "./components/Loading.js";
import ImageInfo from "./components/ImageInfo.js";
import {api} from "./utils/api.js";

export default class App {
	$target = null;
	state = {
		data: window.localStorage.getItem("lastestResults")
			? JSON.parse(window.localStorage.getItem("lastestResults"))
			: [],
		searchedKeyword: [],
	};

	constructor($target) {
		this.$target = $target;

		const $header = document.createElement("header");
		$header.id = "header";
		const $searchHeader = document.createElement("div");
		this.$searchHeader = $searchHeader;
		this.$searchHeader.className = "SearchHeader";

		$header.appendChild(this.$searchHeader);
		$target.appendChild($header);

		const handleFetch = async (fetch) => {
			try {
				this.loading.setState(true);
				await fetch();
			} catch (e) {
				console.error(e);
				alert("일시적으로 서버에 문제가 있습니다. 다시 시도해주세요!");
			} finally {
				this.loading.setState(false);
			}
		};

		this.loading = new Loading({
			$target: $searchHeader,
			data: false,
		});

		this.randomButton = new RandomButton({
			$target: $searchHeader,
			onClick: async () => {
				handleFetch(async () => {
					const {data} = await api.fetchRandom50();
					this.setState({
						...this.state,
						data,
					});
				});
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
				handleFetch(async () => {
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

					window.localStorage.setItem(
						"lastestResults",
						JSON.stringify(this.state.data)
					);
				});
			},
		});

		this.themeButton = new ThemeButton({$target: $searchHeader});
		this.searchResult = new SearchResult({
			$target,
			initialData: this.state.data,
			onClick: async (image) => {
				handleFetch(async () => {
					const {data} = await api.fetchCatById(image.id);

					this.imageInfo.setState({
						visible: true,
						image: data,
					});
				});
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
		this.state = nextData;

		this.searchInput.setState(this.state.searchedKeyword);
		this.searchResult.setState(this.state.data);
	}
}
