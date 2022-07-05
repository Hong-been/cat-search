export class LocalStorage {
	getLocalStorage = (key) => {
		return window.localStorage.getItem(key);
	};

	setLocalStorage = (key, value) => {
		console.log(`set localStorage: ${key}`);
		window.localStorage.setItem(key, value);
	};
}

export default new LocalStorage();
