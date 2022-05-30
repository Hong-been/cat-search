export const darkColors = {
	background: "#000000",
	color: "#ffffff",
};
export const lightColors = {
	background: "#ffffff",
	color: "#000000",
};

export const isDarkTheme =
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: Dark)").matches;
