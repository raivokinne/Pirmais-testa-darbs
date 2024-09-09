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

$user_id = $_GET['id'] ?? null;

if ($user_id) {
	$sql = "SELECT * FROM users WHERE id = :user_id";
	$stmt = $pdo->prepare($sql);
	$stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

	$stmt->execute();
	$user = $stmt->fetch(PDO::FETCH_ASSOC);

	if ($user) {
		header('Content-Type: application/json');
		echo json_encode($user);
	} else {
		http_response_code(404);
		echo json_encode(["error" => "Lietotājs netika atrasts."]);
	}
} else {
	http_response_code(400);
	echo json_encode(["error" => "Nepieciešams lietotāja ID."]);
}
