const API_ENDPOINT =
	"https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const api = {
	fetchCats: async (keyword) => {
		try {
			const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);

			if (res.ok) {
				return await res.json();
			} else {
				throw new Error("HTTP error");
			}
		} catch (e) {
			throw new Error(`something wrong! ${e.message}`);
		}
	},
	fetchRandom50: async () => {
		try {
			const res = await fetch(`${API_ENDPOINT}/api/cats/random50`);

			if (res.ok) {
				return await res.json();
			} else {
				throw new Error("HTTP error");
			}
		} catch (e) {
			throw new Error(`something wrong! ${e.message}`);
		}
	},
	fetchCatById: async (id) => {
		try {
			const res = await fetch(`${API_ENDPOINT}/api/cats/${id}`);

			if (res.ok) {
				return await res.json();
			} else {
				throw new Error("HTTP error");
			}
		} catch (e) {
			throw new Error(`something wrong! ${e.message}`);
		}
	},
};
