import BaseComponent from "./core/Component.js";
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import Loading from "./components/Loading.js";
import ImageInfo from "./components/ImageInfo.js";
import {loadingStore, modalStore} from "./stores/index.js";
import {api} from "./utils/api.js";
import ResultsStorage from "./utils/storage/resultsStorage.js";

export default class App extends BaseComponent {
	constructor(target) {
		super(target);
	}
	initialState() {
		const lastest = ResultsStorage.get();
		this.setState({
			data: lastest ? JSON.parse(lastest) : [],
		});
	}

	componentDidMount() {
		const handleFetch = async (fetch) => {
			try {
				loadingStore.setState({isLoading: true});
				await fetch();
			} catch (e) {
				console.error(e);
				alert("일시적으로 문제가 발생했습니다. 잠시 뒤 다시 시도해주세요.");
			} finally {
				loadingStore.setState({isLoading: false});
			}
		};

		const headerRoot = document.querySelector("#header");
		const mainRoot = document.querySelector("#main");
		const loadingModalRoot = document.querySelector("#loadingModal");
		const imageModalRoot = document.querySelector("#imageModal");

		new Header(headerRoot, {
			onSearch: async (keyword) => {
				handleFetch(async () => {
					const {data} = await api.fetchCats(keyword);
					data ? this.setState({data}) : this.setState({data: []});
					ResultsStorage.set(data);
				});
			},
			onRandomClick: async () => {
				handleFetch(async () => {
					const {data} = await api.fetchRandom50();
					this.setState({data});
					ResultsStorage.set(data);
				});
			},
		});

		new Main(mainRoot, {
			results: this.state.data,
			onImageClick: async (image) => {
				handleFetch(async () => {
					const {data} = await api.fetchCatById(image.id);
					modalStore.setState({isModalShow: true, image: data});
				});
			},
		});

		new Loading(loadingModalRoot);
		new ImageInfo(imageModalRoot);
	}

	template() {
		return `
		<div id="root">
			<header id="header"></header>
			<main id="main"></main>
			<div id="loadingModal"></div>
			<div id="imageModal"></div>
		</div>`;
	}
}
