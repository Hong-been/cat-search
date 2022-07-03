import BaseComponent from "../core/Component.js";
import {loadingStore} from "../stores/index.js";

export default class Loading extends BaseComponent {
	constructor(target, props) {
		super(target, props);
		loadingStore.subscribe(this.render.bind(this));
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
