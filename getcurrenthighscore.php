<?php

require_once "connect.php";

$sql = "SELECT highscore FROM users WHERE username = ?";
$stmt = $con->prepare($sql);
if ($stmt->bind_param("s", $_POST['q1']) === false) {
  die('binding parameters failed');
}
$stmt->execute() or die($con->error);
$stmt->bind_result($hs);
$stmt->fetch();
$stmt->close();
echo $hs;

?> 