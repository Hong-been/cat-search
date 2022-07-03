import {imageLazyLoading} from "../utils/index.js";
import BaseComponent from "../core/Component.js";

export default class SearchResult extends BaseComponent {
	constructor(target, props) {
		super(target, props);
	}
	initialState() {
		this.setState({results: this.props.results, initFlag: true});
	}

	template() {
		if (!this.state.results || !this.state.results.length) {
			if (this.state.initFlag) {
				this.state.initFlag = false;
				this.element.innerHTML = ``;
				return;
			}
			this.state.initFlag = false;
			return `
				<ul class="SearchResult">
					<p>No cats 🐈‍⬛</p>
				</ul>`;
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
