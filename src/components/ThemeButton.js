import {isDarkTheme} from "../utils/theme.js";
import {darkColors, lightColors} from "../utils/theme.js";
import BaseComponent from "./BaseComponent.js";

export default class ThemeButton extends BaseComponent {
	constructor({$target}) {
		super(`<button class="ThemeButton"></button>`);

		$target.insertAdjacentElement("afterbegin", this.$element);
		this.$element.addEventListener("click", () => this.setState(!this.state));
		this.setState(isDarkTheme);
	}
	setState(newState) {
		this.state = newState;
		this.render();
	}

	render() {
		const message = this.state
			? `<i class="fa-solid fa-sun sunIcon"></i>`
			: `<i class="fa-solid fa-moon moonIcon"></i>`;
		this.$element.innerHTML = message;

		const themeColors = this.state ? lightColors : darkColors;
		for (const [key, value] of Object.entries(themeColors)) {
			document.documentElement.style.setProperty(`--${key}`, `${value}`);
		}
	}
}
