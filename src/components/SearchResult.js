import {imageLazyLoading} from "../utils/lazyLoad.js";
import BaseComponent from "./BaseComponent.js";

export default class SearchResult extends BaseComponent {
	constructor({$target, initialData, onImageClick}) {
		super(`
		<ul class="SearchResult"></ul>
		`);
		this.initFlag = true;

		this.$element.addEventListener("click", (e) => {
			const item = e.target.closest(".item");
			if (!item) return;

			const {index} = item.dataset;
			onImageClick(this.data[index]);
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
				this.$element.innerHTML = ``;
				return;
			}
			this.initFlag = false;
			this.$element.innerHTML = `<p>No cats 🐈‍⬛</p>`;
		} else {
			this.$element.innerHTML = this.data
				.map(
					(cat, index) =>
						`<li 
					class="item" 
					data-index=${index} 
					data-url=${cat.url} 
					tooltip=${cat.name.split(" ").join("")}>
          <img src="" alt=${cat.name.split(" ").join("")} />
        </ul>
			`
				)
				.join("");

			imageLazyLoading(this.$element.querySelectorAll(".item"));
		}
	}
}
