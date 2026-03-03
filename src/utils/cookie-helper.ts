export function getCookie(name: string) {
	const cookies = document.cookie.split("; ");
	const cookie = cookies.find(c => c.startsWith(name + "="));
	return cookie ? cookie.split("=")[1] : null;
}

export function setCookie(
	name: string,
	value: string,
	days: number = 7,
	path: string = "/"
) {
	const expires = new Date();
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=${path}`;
}

export function removeCookie(name: string, path: string = "/") {
	document.cookie = `${name}=; expires=${new Date(0).toUTCString()}; path=${path}`;
}