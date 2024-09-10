function createConfetti(container: HTMLElement) {
	const confettiElement = document.createElement('div');
	confettiElement.classList.add('confetti');
	container.appendChild(confettiElement);

	const size = Math.random() * 10 + 5 + 'px';
	const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
	const left = Math.random() * 100 + '%';
	const duration = Math.random() * 3 + 2 + 's';
	const delay = Math.random() * 2 + 's';

	confettiElement.style.width = size;
	confettiElement.style.height = size;
	confettiElement.style.backgroundColor = color;
	confettiElement.style.left = left;
	confettiElement.style.top = '-10vh';
	confettiElement.style.animationDuration = duration;
	confettiElement.style.animationDelay = delay;

	setTimeout(() => {
		confettiElement.remove();
	}, (parseFloat(duration) + parseFloat(delay)) * 1000);
}

const confettiContainer = document.getElementById('confetti-container');

if (!confettiContainer) {
	throw new Error('Confetti container not found');
}

for (let i = 0; i < 100; i++) {
	createConfetti(confettiContainer);
}

setInterval(() => createConfetti(confettiContainer), 200);
