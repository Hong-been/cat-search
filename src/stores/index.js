import Store from "../core/Store.js";

const loadingStoreInit = {isLoading: false};
const modalStoreInit = {
	isModalShow: false,
	image: {
		name: "",
		url: "",
		temperament: "",
		origin: "",
	},
};

export const loadingStore = new Store(loadingStoreInit);
export const modalStore = new Store(modalStoreInit);
