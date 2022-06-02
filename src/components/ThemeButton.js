import {isDarkTheme} from "../utils/theme.js";
import {darkColors, lightColors} from "../utils/theme.js";

export default class ThemeButton {
	constructor({$target}) {
		const $themeToggle = document.createElement("button");
		$themeToggle.classList.add("ThemeButton");
		this.$themeToggle = $themeToggle;

		$target.insertAdjacentElement("afterbegin", $themeToggle);

		$themeToggle.addEventListener("click", () => this.setState(!this.state));
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
		this.$themeToggle.innerHTML = message;

		if (this.state) {
			for (const [key, value] of Object.entries(darkColors)) {
				document.documentElement.style.setProperty(`--${key}`, `${value}`);
			}
		} else {
			for (const [key, value] of Object.entries(lightColors)) {
				document.documentElement.style.setProperty(`--${key}`, `${value}`);
			}
		}
	}
}