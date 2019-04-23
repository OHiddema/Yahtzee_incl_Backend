<?php

require_once "connect.php";

$sql = "UPDATE users SET highscore = ? WHERE username = ?";
$stmt = $con->prepare($sql);
if ($stmt->bind_param("is", $_POST['q2'], $_POST['q1']) === false) {
  die('binding parameters failed');
}
$stmt->execute() or die($con->error);
$stmt->close();

?> 