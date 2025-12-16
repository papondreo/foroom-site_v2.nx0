
let loadScriptAsync = function(uri) {
	if (typeof document === "undefined") return new Promise((resolve) => {
		resolve();
	});
	let scripts = document.querySelectorAll("script");
	for (let script of scripts) {
		if (script.src === uri) {
			return new Promise((resolve) => {
				resolve();
			});
		}
	}
	return new Promise((resolve) => {
		let tag = document.createElement('script');
		tag.src = uri;
		tag.async = true;
		tag.onload = () => {
			resolve();
		};
		let firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	});
};

export default loadScriptAsync;
