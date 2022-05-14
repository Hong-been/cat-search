const API_ENDPOINT =
	"https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
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

export const api = {
	fetchCats: async (keyword) => {
		return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
	},
	fetchRandom50: async () => {
		return request(`${API_ENDPOINT}/api/cats/random50`);
	},
	fetchCatById: async (id) => {
		return request(`${API_ENDPOINT}/api/cats/${id}`);
	},
};
