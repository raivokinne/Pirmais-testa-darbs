<?php
header("Access-Control-Allow-Origin: *");
$dsn = 'mysql:host=localhost;dbname=test1;charset=utf8';
$username = 'raivo';
$password = 'rembo276';

try {
	$pdo = new PDO($dsn, $username, $password);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	die("Savienojuma kļūda: " . $e->getMessage());
}

$user_id = $_POST['user_id'] ?? null;

if ($user_id) {
	$sql = "DELETE FROM users WHERE id = :user_id";
	$stmt = $pdo->prepare($sql);
	$stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

	try {
		$stmt->execute();

		if ($stmt->rowCount() > 0) {
			echo "Lietotājs veiksmīgi izdzēsts.";
		} else {
			echo "Lietotājs netika atrasts.";
		}
	} catch (PDOException $e) {
		echo "Kļūda dzēšot datus: " . $e->getMessage();
	}
} else {
	echo "Nepieciešams lietotāja ID.";
}
