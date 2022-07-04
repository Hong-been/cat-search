class Api {
	constructor() {
		this.API_ENDPOINT =
			"https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";
	}

	fetchCats = async (keyword) => {
		return this._request(`${this.API_ENDPOINT}/api/cats/search?q=${keyword}`);
	};
	fetchRandom50 = async () => {
		return this._request(`${this.API_ENDPOINT}/api/cats/random50`);
	};
	fetchCatById = async (id) => {
		return this._request(`${this.API_ENDPOINT}/api/cats/${id}`);
	};

	_request = async (url) => {
		try {
			const res = await fetch(url);

			if (res.ok) {
				return await res.json();
			} else {
				if (res.status === 400) {
					throw new Error("wrong approach!");
				}
				throw new Error("HTTP error");
			}
		} catch (e) {
			throw new Error(`something wrong! ${e.message}`);
		}
	};
}

export default new Api();
