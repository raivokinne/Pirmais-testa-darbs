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
