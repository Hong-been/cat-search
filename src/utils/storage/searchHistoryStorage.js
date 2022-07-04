import {LocalStorage} from "./localStorage.js";

class SearchHistoryStorage extends LocalStorage {
	constructor() {
		super();
		this.limit = 10;
		this.storage = this.get(); //set
	}

	add = (keyword) => {
		if (this.storage.size > this.limit) {
			const firstKeyword = [...this.storage][0];
			this.remove(firstKeyword);
		}

		this.storage.add(keyword);
		this.setLocalStorage("history", JSON.stringify([...this.storage]));
		return this.storage;
	};

	remove = (key) => {
		this.storage.delete(key);
		this.setLocalStorage("history", JSON.stringify([...this.storage]));
		return this.storage;
	};

	// set 으로 반환
	get = () => {
		const storageHistory = this.getLocalStorage("history");
		return storageHistory
			? new Set(JSON.parse(storageHistory.split(",")))
			: new Set();
	};
}

export default new SearchHistoryStorage();
