import BaseComponent from "../core/Component.js";
import {loadingStore} from "../stores/index.js";
import {ScrollController} from "../utils/scrollController.js";

export default class Loading extends BaseComponent {
	constructor(target, props) {
		super(target, props);
		loadingStore.subscribe(this.render.bind(this));
	}

	componentDidMount() {
		if (loadingStore.state.isLoading) {
			ScrollController.blockScroll();
		} else {
			ScrollController.nonBlockScroll();
		}
	}

	template() {
		return loadingStore.state.isLoading
			? `
			<div class="Modal">
				<div class="loading">
					<span class="loader"></span>
				</div>	
			</div>`
			: ``;
	}
}
