import BaseComponent from "./core/Component.js";
import Header from "./components/Header.js";
import SearchResult from "./components/SearchResult.js";
import Loading from "./components/Loading.js";
import ImageInfo from "./components/ImageInfo.js";
import {loadingStore, modalStore} from "./stores/index.js";
import Api from "./utils/api.js";
import {getDom} from "./utils/index.js";
import ResultsStorage from "./utils/storage/resultsStorage.js";
import "./styles/app.css";
import "./styles/modal.css";
import "./styles/buttonSquire.css";

export default class App extends BaseComponent {
	constructor(target) {
		super(target);
	}

	initialState() {
		const lastest = ResultsStorage.get();
		this.setState({
			currentKeyword: "",
			data: lastest ? JSON.parse(lastest) : null,
		});
	}

	componentDidMount() {
		loadingStore.unsubscribeAll();
		modalStore.unsubscribeAll();

		const handleFetch = async (fetch) => {
			try {
				loadingStore.setState({isLoading: true});
				await fetch();
			} catch (e) {
				console.error(e);
				alert("잠시 뒤 다시 시도해주세요 :)");
			} finally {
				loadingStore.setState({isLoading: false});
			}
		};

		const headerRoot = getDom("#header");
		const mainRoot = getDom("#main");
		const loadingModalRoot = getDom("#loadingModal");
		const imageModalRoot = getDom("#imageModal");

		new Header(headerRoot, {
			currentKeyword: this.state.currentKeyword,
			onSearch: async (keyword) => {
				handleFetch(async () => {
					const {data} = await Api.fetchCats(keyword);
					data
						? this.setState({data, currentKeyword: keyword})
						: this.setState({data: [], currentKeyword: keyword});
					ResultsStorage.set(data);
				});
			},
			onRandomClick: async () => {
				handleFetch(async () => {
					const {data} = await Api.fetchRandom50();
					this.setState({data, currentKeyword: ""});
					ResultsStorage.set(data);
				});
			},
		});

		new SearchResult(mainRoot, {
			results: this.state.data,
			onImageClick: async (image) => {
				handleFetch(async () => {
					const {data} = await Api.fetchCatById(image.id);
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
