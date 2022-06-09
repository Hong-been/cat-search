import {imageLazyLoading} from "../utils/lazyLoad.js";
import BaseComponent from "./BaseComponent.js";

export default class SearchResult extends BaseComponent {
	constructor({$target, initialData, onClick}) {
		super(`
		<main>
			<ul class="SearchResult"></ul>
		</main>
		`);
		this.initFlag = true;

		this.$searchResult = this.$element.querySelector(".SearchResult");
		this.$searchResult.addEventListener("click", (e) => {
			const item = e.target.closest(".item");
			if (!item) return;

			const {index} = item.dataset;
			onClick(this.data[index]);
		});

		$target.appendChild(this.$element);
		this.setState(initialData);
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
			this.$searchResult.innerHTML = `<p>No cats 🐈‍⬛</p>`;
		} else {
			this.$searchResult.innerHTML = this.data
				.map(
					(cat, index) =>
						`<li 
					class="item" 
					data-index=${index} 
					data-url=${cat.url} 
					tooltip=${cat.name.split(" ").join("")}}>
          <img src="" alt=${cat.name.split(" ").join("")} />
        </ul>
			`
				)
				.join("");

			imageLazyLoading(this.$searchResult.querySelectorAll(".item"));
		}
	}
}
