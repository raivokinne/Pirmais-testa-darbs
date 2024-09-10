
const button = document.getElementById('rotate-btn');

if (!button) {
	throw new Error('Button not found');
}

button.addEventListener('click', () => {
	document.body.classList.add('rotate-right-left');

	setTimeout(() => {
		document.body.classList.remove('rotate-right-left');
	}, 2000);
});
