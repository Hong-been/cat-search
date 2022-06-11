import Header from "./components/Header.js";
import Main from "./components/Main.js";
import Loading from "./components/Loading.js";
import ImageInfo from "./components/ImageInfo.js";
import {api} from "./utils/api.js";

export default class App {
	$target = null;
	state = {
		data: window.localStorage.getItem("lastestResults")
			? JSON.parse(window.localStorage.getItem("lastestResults"))
			: [],
	};

	constructor($target) {
		this.$target = $target;

		const handleFetch = async (fetch) => {
			try {
				this.loading.setState(true);
				await fetch();
			} catch (e) {
				console.error(e);
				if (confirm("일시적으로 문제가 발생했습니다. 다시 시도할까요?")) {
					return await this.handleFetch(fetch);
				}
			} finally {
				this.loading.setState(false);
			}
		};

		this.header = new Header({
			$target,
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

					window.localStorage.setItem("lastestResults", JSON.stringify(data));
				});
			},
			onRandomClick: async () => {
				handleFetch(async () => {
					const {data} = await api.fetchRandom50();
					this.setState({
						...this.state,
						data,
					});

					window.localStorage.setItem("lastestResults", JSON.stringify(data));
				});
			},
		});

		this.$main = new Main({
			$target,
			initialData: this.state.data,
			onImageClick: async (image) => {
				handleFetch(async () => {
					const {data} = await api.fetchCatById(image.id);

					this.imageInfo.setState({
						visible: true,
						image: data,
					});
				});
			},
		});

		this.loading = new Loading({
			$target,
			data: false,
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
		this.searchResult.setState(this.state.data);
	}
}
