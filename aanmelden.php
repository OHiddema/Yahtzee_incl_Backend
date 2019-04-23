<?php

require_once "connect.php";

$sql = "SELECT username, password FROM users WHERE username = ?";
$stmt = $con->prepare($sql);
if ($stmt->bind_param("s", $_POST['q1']) === false) {
  die('binding parameters failed');
}
$stmt->execute() or die($con->error);
$stmt->store_result();


if ($stmt->num_rows() == 0) {                     //username niet gevonden
  $stmt->close();
  $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  $stmt = $con->prepare($sql);
  if ($stmt->bind_param("ss", $_POST['q1'], $_POST['q2']) === false) {
    die('binding parameters failed');
  }
  $stmt->execute();
  $stmt->close();
  echo "0";
} else {                                          //username gevonden               
  $stmt->close();
  echo "1";
}

?> 