<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$dsn = 'mysql:host=localhost;dbname=test1;charset=utf8';
$username = 'raivo';
$password = 'rembo276';

try {
	$pdo = new PDO($dsn, $username, $password);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	die("Savienojuma kļūda: " . $e->getMessage());
}

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$phone = $_POST['phone'];
$personal_code = $_POST['personal_code'];

if (preg_match('/^\d{8,15}$/', $phone) && preg_match('/^\d{11}$/', $personal_code)) {
	if (preg_match('/[^a-zA-Z]/', $first_name) || preg_match('/[^a-zA-Z]/', $last_name)) {
		echo "Neatbilstoši dati: vards vai uzvards ir nepareizā formātā.";
	} else if (preg_match('/[^0-9]/', $phone) || preg_match('/[^0-9]/', $personal_code)) {
		echo "Neatbilstoši dati: tālruņa numurs vai personas kods ir nepareizā formātā.";
	} else {
		$sql = "SELECT * FROM users WHERE phone = :phone OR personal_code = :personal_code";
		$stmt = $pdo->prepare($sql);

		$stmt->bindParam(':phone', $phone);
		$stmt->bindParam(':personal_code', $personal_code);

		$stmt->execute();
		$user = $stmt->fetch(PDO::FETCH_ASSOC);

		if ($user) {
			echo "Lietotaņs jau eksistē.";
			exit;
		}

		$sql = "INSERT INTO users (first_name, last_name, phone, personal_code) VALUES (:first_name, :last_name, :phone, :personal_code)";
		$stmt = $pdo->prepare($sql);

		$stmt->bindParam(':first_name', $first_name);
		$stmt->bindParam(':last_name', $last_name);
		$stmt->bindParam(':phone', $phone);
		$stmt->bindParam(':personal_code', $personal_code);

		try {
			$stmt->execute();
			echo "Dati veiksmīgi ievadīti.";
		} catch (PDOException $e) {
			echo "Kļūda ievadot datus: " . $e->getMessage();
		}
	}
} else {
	echo "Neatbilstoši dati: tālruņa numurs vai personas kods ir nepareizā formātā.";
}
