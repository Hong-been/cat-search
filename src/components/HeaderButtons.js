import Theme from "../utils/theme.js";
import BaseComponent from "../core/Component.js";

export default class HeaderButtons extends BaseComponent {
	constructor(target, props) {
		super(target, props);
	}

	initialState() {
		this.setState({isDarkTheme: Theme.isDarkTheme()});
	}

	componentDidMount() {
		const themeButton = document.querySelector(".themeButton");
		const randomButton = document.querySelector(".randomButton");

		themeButton.addEventListener("click", () => {
			const isNextDark = !this.state.isDarkTheme;

			this.setState({isDarkTheme: isNextDark});
			isNextDark ? Theme.toggleToTheme("dark") : Theme.toggleToTheme("light");
		});

		randomButton.addEventListener("click", (e) => {
			this.props.onRandomClick();
		});
	}

	template() {
		return `
		<button class="blueSquire randomButton">
			<i class="fa-solid fa-paw shuffleIcon"></i>
			<span>Random</span>
			<i class="fa-solid fa-paw shuffleIcon"></i>
		</button>
		<button class="blueSquire themeButton">
			${
				this.state?.isDarkTheme
					? `<i class="fa-solid fa-moon themeIcon"></i>`
					: `<i class="fa-solid fa-sun themeIcon"></i>`
			}
		</button>`;
	}
}
