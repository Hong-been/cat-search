const TEMPLATE = '<input type="text">';

export default class SearchInput {
	constructor({
		$target,
		initialData,
		onAddSearchedKeyword,
		onSearch,
		onRandomClick,
	}) {
		const $searchInput = document.createElement("input");
		this.$searchInput = $searchInput;
		this.$searchInput.placeholder = "고양이를 검색해보세요. |";
		this.$searchInput.autofocus = true;
		this.$searchInput.addEventListener("click", () => {
			this.$searchInput.value = "";
		});

		const $randomButton = document.createElement("button");
		this.$randomButton = $randomButton;
		this.$randomButton.innerText = "랜덤 고양이를 불러옵니다. |";

		$searchInput.className = "SearchInput";
		$target.appendChild($searchInput);

		$randomButton.className = "RandomButton";
		$target.appendChild($randomButton);

		const $dataList = document.createElement("ul");
		this.$dataList = $dataList;
		this.$dataList.id = "searchOptions";
		$target.insertAdjacentElement("afterend", this.$dataList);
		this.$dataList.addEventListener("click", (e) => {
			const keyword = e.target.closest(".searcedKeyword");
			if (!keyword) return;

			this.$searchInput.value = keyword.innerText;
			onSearch(keyword.innerText);
		});

		this.timer = null;
		$searchInput.addEventListener("keydown", (e) => {
			if (e.key !== "Enter") return;

			if (this.timer) clearTimeout(this.timer);

			this.timer = setTimeout(() => {
				onAddSearchedKeyword(e.target.value);
				onSearch(e.target.value);
			}, 200);
		});

		$randomButton.addEventListener("click", () => {
			onRandomClick();
		});

		this.data = initialData;
		this.render();
	}
	setState(nextData) {
		this.data = nextData;
		this.render();
	}

	render() {
		this.$dataList.innerHTML = this.data
			.map((word) => {
				return `
        <li class="searcedKeyword">
          <button>${word}</button>
        </li>`;
			})
			.join("");
	}
}
