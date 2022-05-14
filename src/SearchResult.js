class SearchResult {
	$searchResult = null;
	data = null;
	onClick = null;

	constructor({$target, initialData, onClick}) {
		this.$searchResult = document.createElement("ul");
		this.$searchResult.className = "SearchResult";
		$target.appendChild(this.$searchResult);

		this.data = initialData;

		this.$searchResult.addEventListener("click", (e) => {
			const item = e.target.closest(".item");
			if (!item) return;

			const {index} = item.dataset;
			onClick(this.data[index]);
		});

		this.render();
	}

	setState(nextData) {
		this.data = nextData;
		this.render();
	}

	render() {
		if (!this.data || !this.data.length) {
			this.$searchResult.innerHTML = `
      <div class="item">
        <p>검색결과가 없습니다.</p>
      </div>`;

			return;
		}

		this.$searchResult.innerHTML = this.data
			.map(
				(cat, index) => `
          <li class="item" data-index=${index}>
            <img src=${cat.url} alt=${cat.name} />
          </ul>
        `
			)
			.join("");
	}
}
