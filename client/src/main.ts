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

const apiKey = '0923ac6a20bc532cfa3f2a1e11287da8';
const city = 'Cesis';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=lv`;

async function getWeather() {
	try {
		const response = await fetch(url);
		const data = await response.json();

		const temperature = data.main.temp;
		const description = data.weather[0].description;
		const iconCode = data.weather[0].icon;

		const weatherBox = document.getElementById('weather');
		if (!weatherBox) {
			throw new Error('Weather box not found');
		}
		weatherBox.innerHTML = `
            <h2>Laikapstākļi Cēsīs</h2>
            <p>Temperatūra: ${temperature}°C</p>
            <p>Apraksts: ${description}</p>
            <img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather icon">
        `;
	} catch (error) {
		console.error('Kļūda iegūstot datus:', error);
	}
}

getWeather();

document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('inputForm') as HTMLFormElement;

	form.addEventListener('submit', async (event: Event) => {
		event.preventDefault();

		const formData = new FormData(form);

		try {
			const response = await fetch('http://localhost:8080/', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const result = await response.text();
				alert(result);
			} else {
				alert('Kļūda: ' + response.statusText);
			}
		} catch (error) {
			console.error('Kļūda:', error);
			alert('Kļūda, nosūtot datus.');
		}
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('editForm') as HTMLFormElement;

	const urlParams = new URLSearchParams(window.location.search);
	const userId = urlParams.get('id');

	if (userId) {
		fetchUserData(userId);
	}

	form.addEventListener('submit', async (event: Event) => {
		event.preventDefault();

		const formData = new FormData(form);

		try {
			const response = await fetch('http://localhost:8080/edit.php', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const result = await response.text();
				alert(result);
			} else {
				alert('Kļūda: ' + response.statusText);
			}
		} catch (error) {
			console.error('Kļūda:', error);
			alert('Kļūda, nosūtot datus.');
		}
	});

	async function fetchUserData(userId: string) {
		try {
			const response = await fetch(`edit.php?id=${userId}`);
			if (response.ok) {
				const userData = await response.json();
				populateForm(userData);
			} else {
				alert('Kļūda, iegūstot lietotāja datus.');
			}
		} catch (error) {
			console.error('Kļūda:', error);
			alert('Kļūda, iegūstot lietotāja datus.');
		}
	}

	function populateForm(userData: any) {
		(document.getElementById('user_id') as HTMLInputElement).value = userData.id;
		(document.getElementById('first_name') as HTMLInputElement).value = userData.first_name;
		(document.getElementById('last_name') as HTMLInputElement).value = userData.last_name;
		(document.getElementById('phone') as HTMLInputElement).value = userData.phone;
		(document.getElementById('personal_code') as HTMLInputElement).value = userData.personal_code;
	}
});

document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('deleteForm') as HTMLFormElement;

	form.addEventListener('submit', async (event: Event) => {
		event.preventDefault();

		const formData = new FormData(form);

		try {
			const response = await fetch('http://localhost:8080/delete.php', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const result = await response.text();
				alert(result);
			} else {
				alert('Kļūda: ' + response.statusText);
			}
		} catch (error) {
			console.error('Kļūda:', error);
			alert('Kļūda, nosūtot datus.');
		}
	});
});
