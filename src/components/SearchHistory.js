export default class SearchHistory {
	constructor({$target, initialState, onKeywordClick}) {
		const $dataList = document.createElement("ul");
		this.$dataList = $dataList;
		this.$dataList.classList.add("searchHistory");
		$target.appendChild(this.$dataList);

		this.$dataList.addEventListener("click", onKeywordClick);

		this.state = initialState;
		this.render();
	}
	setState(nextState) {
		this.state = nextState;
		this.render();
	}
	render() {
		this.$dataList.innerHTML = this.state.history
			.map((word) => {
				return `
        <li class="searcedKeyword">
          <button>${word}</button>
        </li>`;
			})
			.join("");
	}
}
