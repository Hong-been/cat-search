import {imageLazyLoading} from "../utils/index.js";
import BaseComponent from "../core/Component.js";

export default class SearchResult extends BaseComponent {
	constructor(target, props) {
		super(target, props);
	}
	initialState() {
		this.setState({results: this.props.results});
	}

	template() {
		if (this.state.results === null) {
			return `<p class="message">⬆️ Search cats here! ⬆️</p>`;
		}

		if (!this.state.results.length) {
			return `<p class="message">No cats 😿</p>`;
		}

		return `
		<ul class="SearchResult">
			${this.state.results
				.map((cat, index) => {
					return index < 3
						? `<li 
						class="item" 
						data-index=${index} 
						data-url=${cat.url} 
						tooltip=${cat.name.split(" ").join("")}>
						<img src="${cat.url}" alt=${cat.name.split(" ").join("")} />
					</li>
				`
						: `<li 
					class="item lazyLoading" 
					data-index=${index} 
					data-url=${cat.url} 
					tooltip=${cat.name.split(" ").join("")}>
          <img src="" alt=${cat.name.split(" ").join("")} />
        </li>
			`;
				})
				.join("")}
		</ul>
		`;
	}

	componentDidMount() {
		this.element.addEventListener("click", (e) => {
			const item = e.target.closest(".item");
			if (!item) return;

			const {index} = item.dataset;
			this.props.onImageClick(this.state.results[index]);
		});

		imageLazyLoading(this.element.querySelectorAll(".lazyLoading"));
	}
}
