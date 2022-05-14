class SearchResult {
	$searchResult = null;
	data = null;
	onClick = null;

	constructor({$target, initialData, onClick}) {
		this.$searchResult = document.createElement("ul");
		this.$searchResult.className = "SearchResult";
		$target.appendChild(this.$searchResult);

		this.data = initialData;
		this.onClick = onClick;
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
				(cat) => `
          <li class="item">
            <img src=${cat.url} alt=${cat.name} />
          </ul>
        `
			)
			.join("");

		this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
			$item.addEventListener("click", () => {
				this.onClick(this.data[index]);
			});
		});
	}
}
