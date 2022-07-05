import {LocalStorage} from "./localStorage.js";

class ResultsStorage extends LocalStorage {
	constructor() {
		super();
	}

	get = () => {
		return this.getLocalStorage("lastestResults");
	};

	set = (data) => {
		this.setLocalStorage("lastestResults", JSON.stringify(data));
	};
}

export default new ResultsStorage();
