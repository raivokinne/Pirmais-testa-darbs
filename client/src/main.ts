document.addEventListener('DOMContentLoaded', () => {
	async function fetchUserData() {
		try {
			const response = await fetch('http://localhost:8080/');
			if (response.ok) {
				const userData = await response.json();
				const selectElement = document.getElementById('select') as HTMLSelectElement;

				selectElement.innerHTML = '';

				for (const user of userData) {
					const option = document.createElement('option');
					option.value = user.id;
					option.textContent = user.first_name + ' ' + user.last_name;
					selectElement.appendChild(option);
				}
			} else {
				alert('Kļūda, iegūstot lietotāja datus.');
			}
		} catch (error) {
			console.error('Kļūda:', error);
			alert('Kļūda, iegūstot lietotāja datus.');
		}
	}

	fetchUserData();
});

document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('inputForm') as HTMLFormElement;

	form.addEventListener('submit', async (event: Event) => {
		event.preventDefault();

		const formData = new FormData(form);

		try {
			const response = await fetch('http://localhost:8080/create.php', {
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

	async function fetchUserData() {
		try {
			const response = await fetch('http://localhost:8080/');
			if (response.ok) {
				const userData = await response.json();
				const selectElement = document.getElementById('select1') as HTMLSelectElement;

				selectElement.innerHTML = '';

				for (const user of userData) {
					const option = document.createElement('option');
					option.value = user.id;
					option.textContent = user.first_name + ' ' + user.last_name;
					selectElement.appendChild(option);
				}
			} else {
				alert('Kļūda, iegūstot lietotāja datus.');
			}
		} catch (error) {
			console.error('Kļūda:', error);
			alert('Kļūda, iegūstot lietotāja datus.');
		}
	}

	fetchUserData();

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
