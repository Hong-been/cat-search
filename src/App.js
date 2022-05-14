console.log("app is running!");

class App {
	$target = null;
	state = {
		data: [],
		isLoading: false,
		searchedKeyword: [],
	};

	constructor($target) {
		this.$target = $target;

		const $searchHeader = document.createElement("header");
		this.$searchHeader = $searchHeader;
		this.$searchHeader.className = "SearchHeader";
		$target.appendChild(this.$searchHeader);

		this.loading = new Loading({
			$target: $searchHeader,
			data: false,
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
				this.setState({
					...this.state,
					isLoading: true,
				});

				try {
					const {data} = await api.fetchCats(keyword);
					data
						? this.setState({
								...this.state,
								data,
								isLoading: false,
						  })
						: this.setState({
								...this.state,
								data: [],
								isLoading: false,
						  });
				} catch (e) {
					console.error(e);
					this.setState({
						...this.state,
						isLoading: false,
					});
					alert("일시적으로 서버에 문제가 있습니다.");
				}
			},
			onRandomClick: async () => {
				this.setState({
					...this.state,
					isLoading: true,
				});

				// random50 fetch해서 뿌리기
				try {
					const {data} = await api.fetchRandom50();
					this.setState({
						data,
						isLoading: false,
					});
				} catch (e) {
					console.error(e);
					this.setState({
						...this.state,
						isLoading: false,
					});
					alert("일시적으로 서버에 문제가 있습니다.");
				}
			},
		});

		this.searchResult = new SearchResult({
			$target,
			initialData: this.state.data,
			onClick: async (image) => {
				this.setState({
					...this.state,
					isLoading: true,
				});

				// fetch해서 image에 temperament,origin 추가해서 넘기기
				try {
					const {data} = await api.fetchCatById(image.id);
					this.setState({
						...this.state,
						isLoading: false,
					});

					this.imageInfo.setState({
						visible: true,
						image: data,
					});
				} catch (e) {
					console.error(e);
					this.setState({
						...this.state,
						isLoading: false,
					});
					alert("일시적으로 서버에 문제가 있습니다.");
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
		console.log(this, nextData);
		this.state = nextData;

		this.searchInput.setState(this.state.searchedKeyword);
		this.searchResult.setState(this.state.data);
		this.loading.setState(this.state.isLoading);
	}
}
