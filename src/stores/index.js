import Store from "../core/Store.js";

const loadingStoreInit = {isLoading: false};

const EMPTY_IMAGE = {
	name: "",
	url: "",
	temperament: "",
	origin: "",
};
const modalStoreInit = {isModalShow: false, image: EMPTY_IMAGE};

export const loadingStore = new Store(loadingStoreInit);
export const modalStore = new Store(modalStoreInit);
