import {imageLazyLoading} from "../utils/lazyLoad.js";

export default class SearchResult {
	$searchResult = null;
	data = null;
	onClick = null;

	constructor({$target, initialData, onClick}) {
		this.initFlag = true;
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
			if (this.initFlag) {
				this.initFlag = false;
				this.$searchResult.innerHTML = ``;
				return;
			}
			this.initFlag = false;
			this.$searchResult.innerHTML = `
      <p>No cats 🐈‍⬛</p>`;
			return;
		}

		this.$searchResult.innerHTML = this.data
			.map(
				(cat, index) => `
          <li class="item" data-index=${index} data-url=${
					cat.url
				} tooltip=${cat.name.split(" ").join("")}
				}>
            <img src="" alt=${cat.name.split(" ").join("")} />
          </ul>
        `
			)
			.join("");

		imageLazyLoading(this.$searchResult.querySelectorAll(".item"));
	}
}