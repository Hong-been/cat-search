import {isDarkTheme} from "../utils/theme.js";
import {darkColors, lightColors} from "../utils/theme.js";
import BaseComponent from "../core/Component.js";

export default class HeaderButtons extends BaseComponent {
	constructor(target, props) {
		super(target, props);
		this.setState({isDarkTheme});
	}

	componentDidMount() {
		const themeButton = document.querySelector(".themeButton");
		const randomButton = document.querySelector(".randomButton");

		themeButton.addEventListener("click", (e) => {
			const curTheme = this.state.isDarkTheme;
			this.setState({isDarkTheme: !curTheme});
		});

		randomButton.addEventListener("click", (e) => {
			this.props.onRandomClick();
		});
	}

	template() {
		const themeColors = this.state.isDarkTheme ? darkColors : lightColors;
		for (const [key, value] of Object.entries(themeColors)) {
			document.documentElement.style.setProperty(`--${key}`, `${value}`);
		}

		return `
		<button class="blueSquire themeButton">
			${
				this.state?.isDarkTheme
					? `<i class="fa-solid fa-moon themeIcon"></i>`
					: `<i class="fa-solid fa-sun themeIcon"></i>`
			}
		</button>
    <button class="blueSquire randomButton">
			<i class="fa-solid fa-shuffle shuffleIcon"></i>
		</button>`;
	}
}
