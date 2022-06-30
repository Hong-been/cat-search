import BaseComponent from "../core/Component.js";
import {modalStore} from "../stores/index.js";
import {ScrollController} from "../utils/scrollController.js";

export default class ImageInfo extends BaseComponent {
	constructor(target, props) {
		super(target, props);
		modalStore.subscribe(this.render.bind(this));
	}

	componentDidMount() {
		if (modalStore.state.isModalShow) {
			ScrollController.blockScroll();
		} else {
			ScrollController.nonBlockScroll();
		}

		this.element.addEventListener("click", (e) => {
			if (
				e.target.closest(".closeButton") ||
				!e.target.closest(".content-wrapper")
			) {
				modalStore.setState({isModalShow: false});
				return;
			}
		});

		window.addEventListener("keydown", (e) => {
			if (e.key === "Esc" || e.key === "Escape") {
				modalStore.setState({isModalShow: false});
			}
		});
	}

	template() {
		const {name, url, temperament, origin} = modalStore.state.image;
		return modalStore.state.isModalShow
			? `
		<div class="Modal">
			<div class="content-wrapper">
				<header class="title">
				<h1 class="name">${name}</h1>
				<button class="blueSquire closeButton">
					<i class="fa-solid fa-xmark closeIcon"></i>
				</button>
				</header>
				<img class="image" src="${url}" alt="${name}"/>
				<ul class="description">
					<li>성격: ${temperament}</li>
					<li>오리진: ${origin}</li>
				</ul>
			</div>
		</div>
		`
			: ``;
	}
}
